import {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import CatalogFilters, {type FiltersValue} from "./Filters.tsx";
import type {Product} from "../../data/types.ts";
import {listProducts, type ProductQuery} from "../../shared/api/repo.ts";
import Container from "../../shared/Container.tsx";
import {CatalogGrid} from "./Grid.tsx";
import ProductDetails from "../modals/ProductDetails.tsx";

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
        return { totalPages: p.totalPages, number: p.number, size: p.size };
    }
    if (isRecord(payload) && isRecord((payload as WrapperPage).page)) {
        const p = (payload as WrapperPage).page;
        return { totalPages: p.totalPages, number: p.number, size: p.size };
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

    // обработчик изменения фильтров из дочернего компонента
    const handleChange = (next: FiltersValue) => {
        // при смене фильтров — сбрасываем на страницу 0
        setPage(0);
        setFilters(next);
    };

    const [selected, setSelected] = useState<Product | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    return (
        <section className="scroll-mt-24 py-16 sm:py-20">
            <Container>
                <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
                    {/* ФИЛЬТРЫ */}
                    <aside className="lg:top-24 lg:self-start">
                        <CatalogFilters value={filters} onChange={handleChange}/>
                    </aside>

                    {/* КОНТЕНТ */}
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
                onClose={() => setDetailsOpen(false)}
            />
        </section>
    );
}