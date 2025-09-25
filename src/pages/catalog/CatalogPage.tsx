import {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import CatalogFilters, {type FiltersValue} from "./Filters.tsx";
import type {Product} from "../../data/types.ts";
import {listProducts, type ProductQuery} from "../../shared/api/repo.ts";
import Container from "../../shared/Container.tsx";
import {CatalogGrid} from "./Grid.tsx";
import ProductDetails from "../modals/ProductDetails.tsx";
import {track, trackPageView} from "../../lib/analytics.ts";

// --- type guards ---
type PageLike = { content: Product[]; totalPages?: number; number?: number; size?: number };
type WrapperPage = { page: { content: Product[]; totalPages?: number; number?: number; size?: number } };
type Embedded = { _embedded: { products: Product[] } };
type ItemsWrap = { items: Product[] };

function isRecord(x: unknown): x is Record<string, unknown> {
    return typeof x === "object" && x !== null;
}

function extractProducts(payload: unknown): Product[] {
    if (Array.isArray(payload)) return payload as Product[];
    if (isRecord(payload) && Array.isArray((payload as PageLike).content)) return (payload as PageLike).content;
    if (isRecord(payload) && isRecord((payload as WrapperPage).page) && Array.isArray((payload as WrapperPage).page.content)) {
        return (payload as WrapperPage).page.content;
    }
    if (isRecord(payload) && isRecord((payload as Embedded)._embedded) && Array.isArray((payload as Embedded)._embedded.products)) {
        return (payload as Embedded)._embedded.products;
    }
    if (isRecord(payload) && Array.isArray((payload as ItemsWrap).items)) return (payload as ItemsWrap).items;
    return [];
}

function extractPageMeta(payload: unknown): { totalPages?: number; number?: number; size?: number } {
    if (isRecord(payload) && Array.isArray((payload as PageLike).content)) {
        const p = payload as PageLike;
        return {totalPages: p.totalPages, number: p.number, size: p.size};
    }
    if (isRecord(payload) && isRecord((payload as WrapperPage).page)) {
        const p = (payload as WrapperPage).page;
        return {totalPages: p.totalPages, number: p.number, size: p.size};
    }
    return {};
}

function toQuery(v: FiltersValue, page: number, size: number): ProductQuery {
    return {
        q: v.q || undefined,
        brand: v.brand || undefined,
        min: v.min ?? undefined,
        max: v.max ?? undefined,
        inStock: v.inStockOnly || undefined,
        category: v.category || undefined,
        subcategory: v.subcategory || undefined,
        sort: v.sort || undefined,
        page,
        size,
    };
}

function fromSearchParams(sp: URLSearchParams, routeCat?: string, routeSub?: string): FiltersValue {
    return {
        q: sp.get("q") ?? "",
        brand: sp.get("brand") ?? "",
        min: sp.get("min") ? Number(sp.get("min")) : undefined,
        max: sp.get("max") ? Number(sp.get("max")) : undefined,
        inStockOnly: sp.get("inStock") === "true",
        category: routeCat ?? sp.get("category") ?? "",
        subcategory: routeSub ?? sp.get("subcategory") ?? "",
        sort: sp.get("sort") ?? "title,asc",
    };
}

export default function CatalogPage() {

    const {category, subcategory} = useParams();
    const [sp, setSp] = useSearchParams();

    // номер страницы/размер (0-based)
    const [page, setPage] = useState(() => Number(sp.get("page") ?? 0));
    const [size, setSize] = useState(() => Number(sp.get("size") ?? 12));

    // значение фильтров = единственный «источник правды»
    const [filters, setFilters] = useState<FiltersValue>(() => fromSearchParams(sp, category, subcategory));

    // данные
    const [items, setItems] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    // синхронизация URL при смене фильтров/страницы
    useEffect(() => {
        const next = new URLSearchParams();

        if (filters.q) next.set("q", filters.q);
        if (filters.brand) next.set("brand", filters.brand);
        if (filters.min != null) next.set("min", String(filters.min));
        if (filters.max != null) next.set("max", String(filters.max));
        if (filters.inStockOnly) next.set("inStock", "true");
        if (filters.category) next.set("category", filters.category);
        if (filters.subcategory) next.set("subcategory", filters.subcategory);
        if (filters.sort) next.set("sort", filters.sort);

        next.set("page", String(page));
        next.set("size", String(size));

        setSp(next, {replace: true});
    }, [filters, page, size, setSp]);

    // когда меняются route-параметры (клик по категории в navbar) — переинициализируем фильтры и страницу
    useEffect(() => {
        // читаем «свежие» фильтры из URL с приоритетом route-параметров
        const next = fromSearchParams(sp, category, subcategory);

        // если реально что-то изменилось — обновляем стейт и сбрасываем на первую страницу
        setPage(0);
        setFilters(next);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, subcategory]);

    // загрузка с бэка
    async function fetchPage() {
        setLoading(true);
        setErr(null);
        try {
            const qp = toQuery(filters, page, size);
            const payload = await listProducts(qp);

            const items = extractProducts(payload);
            setItems(items);

            // метаданные страницы — если бэк их прислал
            const meta = extractPageMeta(payload);
            if (meta.totalPages != null) setTotalPages(meta.totalPages);
            else setTotalPages(1); // если массив — считаем, что одна «страница»

            if (meta.number != null) setPage(meta.number);
            if (meta.size != null) setSize(meta.size);
        } catch (e: unknown) {
            setErr(e instanceof Error ? e.message : "Load error");
        } finally {
            setLoading(false);
        }
    }

    // грузим при любом изменении
    useEffect(() => {
        fetchPage();
        // также реагируем на внешние обновления каталога
        const onUpd = () => fetchPage();
        window.addEventListener("products:updated", onUpd as EventListener);
        return () => window.removeEventListener("products:updated", onUpd as EventListener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, page, size]);

    useEffect(() => {
        trackPageView({
            path: window.location.pathname + window.location.search,
            title: document.title,
            referrer: document.referrer || null,
        });
    }, [filters, page, size]);

    // обработчик изменения фильтров из дочернего компонента
    const handleChange = (next: FiltersValue) => {
        // при смене фильтров — сбрасываем на страницу 0
        setPage(0);
        setFilters(next);
    };

    const [selected, setSelected] = useState<Product | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    // + время открытия для подсчёта длительности
    const [openedAt, setOpenedAt] = useState<number | null>(null);

    return (
        <section className="scroll-mt-24 py-16 sm:py-20">
            <Container>
                <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
                    {/* ФИЛЬТРЫ */}
                    <aside className="lg:top-24 lg:self-start">
                        <CatalogFilters value={filters} onChange={handleChange}/>
                    </aside>

                    {/* КОНТЕНТ */}
                    <div className="hidden">
                        🔹 Основные общие ключи

                        изделия из нержавеющей стали

                        продукция из нержавейки

                        нержавеющая сталь купить

                        мебель из нержавеющей стали

                        оборудование из нержавейки

                        производство из нержавейки

                        нержавейка под заказ

                        конструкция из нержавейки

                        цена нержавейки изделия

                        магазин изделий из нержавейки

                        🔹 Столы и тумбы

                        производственные столы из нержавейки

                        стол из нержавейки для кухни

                        стол нержавеющий для кафе

                        стол нержавейка для ресторана

                        рабочий стол из нержавейки

                        разделочный стол нержавейка

                        стол с бортиком из нержавейки

                        стол с ящиками из нержавейки

                        стол с полкой из нержавейки

                        тумба из нержавеющей стали

                        🔹 Мойки

                        мойка из нержавейки для кухни

                        производственные мойки нержавейка

                        мойка для ресторана нержавейка

                        двойная мойка нержавейка

                        мойка с крылом из нержавейки

                        мойка для общепита нержавейка

                        раковина из нержавейки купить

                        кухонная мойка из нержавейки

                        моечная ванна нержавейка

                        мойка сварная из нержавейки

                        🔹 Стеллажи, полки, подтоварники

                        стеллаж из нержавейки

                        производственный стеллаж нержавейка

                        полки из нержавейки

                        настенные полки из нержавейки

                        подтоварник нержавейка

                        подставка из нержавейки

                        каркас из нержавейки

                        стеллаж для кухни нержавейка

                        складской стеллаж из нержавейки

                        полка кухонная нержавейка

                        🔹 Барные станции и мебель

                        барная станция из нержавейки

                        барная стойка нержавейка

                        оборудование бара из нержавейки

                        барная мойка нержавейка

                        станция бармена из нержавейки

                        мебель для бара нержавейка

                        коктейльная станция нержавейка

                        стол барный нержавейка

                        барная тумба из нержавейки

                        станция для напитков нержавейка

                        🔹 Перила, поручни, ограждения

                        перила из нержавейки

                        поручни из нержавейки

                        лестничные перила нержавейка

                        ограждения из нержавейки

                        балюстрада из нержавейки

                        поручни для ванной нержавейка

                        перила для крыльца нержавейка

                        перила для балкона нержавейка

                        опорные поручни нержавейка

                        перила сварные из нержавейки

                        🔹 Кухонное и производственное оборудование

                        гриль из нержавейки

                        жаровня нержавейка

                        стол для пиццы нержавейка

                        тележка из нержавейки

                        оборудование общепит нержавейка

                        вытяжка из нержавейки

                        шкаф из нержавейки

                        подкатная тележка нержавейка

                        фартук из нержавейки

                        оборудование кафе нержавейка

                        🔹 Ящики, коробки, каркасы

                        короб из нержавейки

                        ящик из нержавейки

                        каркас под оборудование нержавейка

                        шкаф-тумба нержавейка

                        контейнер из нержавейки

                        урна из нержавейки

                        бак из нержавейки

                        лоток нержавейка

                        ящик с дверцей нержавейка

                        корзина нержавейка

                        🔹 Декор и архитектура

                        козырек из нержавейки

                        навес из нержавейки

                        декоративные элементы нержавейка

                        мебель для улицы нержавейка

                        перила для террасы нержавейка

                        дизайн из нержавейки

                        каркас лестницы нержавейка

                        архитектурные изделия нержавейка

                        ограждение террасы нержавейка

                        поручни для инвалидов нержавейка

                        🔹 SEO-варианты с географией и услугами

                        изделия из нержавейки Кишинев

                        нержавейка Молдова

                        производство из нержавейки под заказ

                        купить стол нержавейка Кишинев

                        изготовление изделий из нержавейки

                        заказ нержавейки Кишинев

                        изготовление мебели нержавейка

                        сварка нержавейки под заказ

                        ремонт изделий из нержавейки

                        интернет магазин изделий из нержавейки

                    </div>
                    <div className="hidden">

                        🔹 Termeni generali

                        produse din oțel inoxidabil

                        mobilier inox

                        echipamente inox

                        confecții inox

                        construcții inox

                        inox la comandă

                        articole inox

                        inox prelucrare

                        preț produse inox

                        magazin produse inox

                        🔹 Mese și dulapuri

                        mese de lucru inox

                        masă inox bucătărie

                        masă inox restaurant

                        masă inox cafenea

                        masă profesională inox

                        masă de tranșare inox

                        masă cu blat inox

                        masă inox cu sertare

                        masă inox cu poliță

                        dulap inox

                        🔹 Chiuvete

                        chiuvetă inox bucătărie

                        chiuvetă profesională inox

                        chiuvetă inox restaurant

                        chiuvetă dublă inox

                        chiuvetă cu aripă inox

                        chiuvetă inox horeca

                        lavoar inox

                        chiuvetă inox catering

                        vană inox spălare

                        chiuvetă sudată inox

                        🔹 Rafturi, polițe, suporturi

                        raft inox

                        raft profesional inox

                        polițe inox

                        poliță inox perete

                        suport marfă inox

                        suport inox bucătărie

                        cadru inox

                        raft inox bucătărie

                        raft depozit inox

                        poliță de perete inox

                        🔹 Stații bar și mobilier horeca

                        stație bar inox

                        tejghea inox

                        echipamente bar inox

                        chiuvetă bar inox

                        stație barman inox

                        mobilier bar inox

                        stație cocktail inox

                        masă bar inox

                        dulap bar inox

                        stație băuturi inox

                        🔹 Balustrade, mânere, garduri

                        balustrade inox

                        mânere inox

                        balustradă scară inox

                        gard inox

                        balustradă inox exterior

                        bară sprijin inox

                        balustradă balcon inox

                        mână curent inox

                        balustradă rampă inox

                        balustradă sudată inox

                        🔹 Echipamente de bucătărie și producție

                        grătar inox

                        plită inox

                        masă pizza inox

                        cărucior inox

                        echipamente horeca inox

                        hotă inox

                        dulap profesional inox

                        cărucior transport inox

                        panou inox

                        echipamente bucătărie inox

                        🔹 Sertare, cutii, carcase

                        cutie inox

                        sertar inox

                        cadru echipament inox

                        dulap tip coloană inox

                        container inox

                        coș inox

                        rezervor inox

                        tavă inox

                        sertar cu ușă inox

                        coș de gunoi inox

                        🔹 Decorațiuni și arhitectură

                        copertină inox

                        acoperiș inox

                        elemente decorative inox

                        mobilier exterior inox

                        balustradă terasă inox

                        design inox

                        cadru scară inox

                        produse arhitecturale inox

                        gard terasă inox

                        bare sprijin persoane cu dizabilități inox

                        🔹 Variante cu geolocație și servicii

                        produse inox Chișinău

                        inox Moldova

                        producție inox la comandă

                        masă inox Chișinău

                        confecții inox personalizate

                        comandă inox Chișinău

                        mobilier inox la comandă

                        sudură inox la comandă

                        reparații produse inox

                        magazin online produse inox
                    </div>

                    <div className="space-y-4">
                        {/* статус */}
                        {err && (
                            <div
                                className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-200">
                                {err}
                            </div>
                        )}

                        {/* grid карточек */}
                        <CatalogGrid
                            items={items}
                            loading={loading}
                            onOpen={(p) => {
                                setSelected(p);
                                setDetailsOpen(true);
                                setOpenedAt(Date.now());

                                // 🔹 событие "открыли детали товара"
                                track("product_details_open", {
                                    productId: p.id,
                                    title: p.title,
                                    category: p.category,
                                    subcategory: p.subcategory,
                                    // можно добавить текущий список фильтров для контекста
                                    filters,
                                });
                            }}
                        />

                        {/* ПАГИНАЦИЯ */}
                        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                            <label className="flex items-center gap-2 text-sm">
                                <span className="text-gray-600 dark:text-gray-300">per page:</span>
                                <select
                                    className="rounded-lg border px-2 py-1 text-sm dark:border-white/20 dark:bg-black"
                                    value={size}
                                    onChange={(e) => {
                                        setPage(0);
                                        setSize(Number(e.currentTarget.value));
                                    }}
                                >
                                    {[12, 24, 48].map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            {totalPages != null && totalPages > 1 && (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                                        disabled={page <= 0}
                                        className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50 dark:border-white/20"
                                    >
                                        ◀ Prev
                                    </button>
                                    <span className="tabular-nums text-sm text-gray-600 dark:text-gray-300">
                                        {page + 1} / {totalPages}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setPage((p) => (totalPages != null ? Math.min(totalPages - 1, p + 1) : p))
                                        }
                                        disabled={totalPages != null ? page >= totalPages - 1 : true}
                                        className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50 dark:border-white/20"
                                    >
                                        Next ▶
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>

            {/* Модалка деталей товара */}
            <ProductDetails
                product={selected}
                open={detailsOpen}
                onClose={
                    () => {
                        setDetailsOpen(false);

                        // 🔹 событие "закрыли детали товара" + длительность
                        if (selected) {
                            const durationMs =
                                openedAt != null ? Math.max(0, Date.now() - openedAt) : undefined;

                            track("product_details_close", {
                                productId: selected.id,
                                title: selected.title,
                                durationMs,
                            });
                        }
                        setSelected(null);
                        setOpenedAt(null);
                    }}
            />
        </section>
    );
}