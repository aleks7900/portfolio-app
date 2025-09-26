// src/home/FeaturedRow.tsx
import {useEffect, useMemo, useRef, useState} from "react";
import type {Product} from "../../data/types.ts";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import ProductDetails from "../modals/ProductDetails.tsx";
import Container from "../../shared/Container.tsx";

type Props = {
    title?: string;
    category?: string;
    subcategory?: string;
    limit?: number;
};

// Универсальный парсер возможных ответов бэка
function extractProducts(payload: any): any[] {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.content)) return payload.content;           // page-like
    if (payload.page?.content && Array.isArray(payload.page.content)) {
        return payload.page.content;
    }
    if (payload._embedded?.products && Array.isArray(payload._embedded.products)) {
        return payload._embedded.products;                                  // HATEOAS
    }
    if (payload.items && Array.isArray(payload.items)) return payload.items;
    return [];
}

// Маппер к вашему типу Product (переводит snake_case → camelCase и ставит дефолты)
function toProduct(x: any): Product {
    return {
        id: Number(x.id ?? x.productId ?? 0),
        title: String(x.title ?? x.name ?? ""),
        brand: String(x.brand ?? "—"),
        description: String(x.description ?? ""),
        price: Number(x.price ?? 0),
        inStock: Boolean(x.inStock ?? x.in_stock ?? x.available ?? false),
        availability: String(x.availability ?? x.status ?? ""),
        category: String(x.category ?? ""),
        subcategory: String(x.subcategory ?? ""),
        imgLinks: Array.isArray(x.imgLinks)
            ? x.imgLinks
            : typeof x.img_links === "string"
                ? x.img_links.split(";").map((s: string) => s.trim()).filter(Boolean)
                : [],
    } as Product;
}

export default function FeaturedRow({
                                        title,
                                        category,
                                        subcategory,
                                        limit = 12,
                                    }: Props) {
    const {t} = useI18n();

    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [selected, setSelected] = useState<Product | null>(null);
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const openDetails = (p: Product) => {
        setSelected(p);
        setOpen(true);
    };

    useEffect(() => {
        const ac = new AbortController();

        const params = new URLSearchParams();
        if (category) params.set("category", category);
        if (subcategory) params.set("subcategory", subcategory);
        if (limit) params.set("limit", String(limit));

        // Если ваш бэк ожидает другие имена параметров (page/size и т.д.), скорректируйте здесь
        const url = `/products${params.toString() ? `?${params.toString()}` : ""}`;

        async function run() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(url, {signal: ac.signal});
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }
                const json = await res.json();
                const raw = extractProducts(json);
                const mapped = raw.map(toProduct);

                // На всякий случай сортируем в том же духе, что было локально
                mapped.sort(
                    (a, b) => Number(b.inStock) - Number(a.inStock) || b.id - a.id
                );

                setItems(limit ? mapped.slice(0, limit) : mapped);
            } catch (e: any) {
                if (e.name !== "AbortError") {
                    setError(e.message ?? "Failed to load");
                    setItems([]);
                }
            } finally {
                setLoading(false);
            }
        }

        run();
        return () => ac.abort();
    }, [category, subcategory, limit]);

    const data = useMemo(() => items, [items]);

    const scrollBy = (dir: 1 | -1) => {
        const el = ref.current;
        if (!el) return;
        const step = Math.round(el.clientWidth * 0.9) * dir;
        el.scrollBy({left: step, behavior: "smooth"});
    };

    // Скелеты при загрузке
    const skeleton = (
        <section className="mt-10">
            <Container>
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
                        {title ?? "Популярное"}
                    </h3>
                    <div className="hidden sm:flex gap-2">
                        <div className="h-8 w-10 rounded-xl border animate-pulse"/>
                        <div className="h-8 w-10 rounded-xl border animate-pulse"/>
                    </div>
                </div>
                <div className="relative overflow-x-hidden pb-2 -mb-2">
                    <div className="inline-flex w-max gap-4">
                        {Array.from({length: Math.min(limit, 8)}).map((_, i) => (
                            <div
                                key={i}
                                className="w-[240px] sm:w-[260px] lg:w-[300px] rounded-2xl border bg-white p-4 shadow-sm dark:bg-black dark:border-white/10"
                            >
                                <div className="h-40 rounded-xl bg-gray-100 dark:bg-white/10 animate-pulse"/>
                                <div className="mt-3 h-5 w-3/4 rounded bg-gray-100 dark:bg-white/10 animate-pulse"/>
                                <div className="mt-2 h-4 w-1/2 rounded bg-gray-100 dark:bg-white/10 animate-pulse"/>
                                <div className="mt-3 h-6 w-24 rounded-full bg-gray-100 dark:bg-white/10 animate-pulse"/>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );

    if (loading) return skeleton;
    if (error) return null; // тихо скрываем ряд при ошибке загрузки
    if (!data.length) return null;

    return (
        <section className="mt-10">
            <Container>
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
                        {title ?? "Популярное"}
                    </h3>
                    <div className="hidden sm:flex gap-2">
                        <button
                            type="button"
                            onClick={() => scrollBy(-1)}
                            className="rounded-xl border px-3 py-1 text-sm hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black"
                        >
                            ←
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollBy(1)}
                            className="rounded-xl border px-3 py-1 text-sm hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black"
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* Контейнер скролла */}
                <div
                    ref={ref}
                    className="relative overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory pb-2 -mb-2"
                    style={{WebkitOverflowScrolling: "touch"}}
                >
                    <div className="inline-flex w-max gap-4">
                        {data.map((p) => (
                            <article
                                key={p.id}
                                role="button"
                                tabIndex={0}
                                onClick={() => openDetails(p)}
                                className="snap-start cursor-pointer flex-none
                                          w-[240px] sm:w-[260px] lg:w-[300px]
                                          rounded-2xl border bg-white p-4 shadow-sm outline-none
                                          hover:ring-2 hover:ring-gray-300 ring-offset-2 ring-offset-white
                                          dark:bg-black dark:border-white/10 dark:ring-offset-black
                "
                            >
                                {/* Картинка: берем первую ссылку при наличии */}
                                <div
                                    className="h-40 rounded-xl bg-gray-100 dark:bg-white/10 overflow-hidden flex items-center justify-center">
                                    {p.imgLinks?.[0] ? (
                                        <img
                                            src={p.imgLinks[0]}
                                            alt={p.title}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="text-xs text-gray-400 select-none">no image</div>
                                    )}
                                </div>

                                <div className="mt-3 flex items-start justify-between">
                                    <div>
                                        <div className="text-sm font-medium line-clamp-2">{p.title}</div>
                                        <div className="text-xs text-gray-500">{p.brand}</div>
                                    </div>
                                    <div className="text-sm font-semibold">${p.price}</div>
                                </div>

                                <div className="mt-2 text-xs">
                                    {p.inStock ? (
                                        <span
                                            className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      {t("in_stock")}
                    </span>
                                    ) : (
                                        <span
                                            className="rounded-full bg-rose-100 px-2 py-1 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                      {t("out_of_stock")}
                    </span>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* градиенты */}
                    <div
                        className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-white to-transparent dark:from-black sm:block"/>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-white to-transparent dark:from-black sm:block"/>
                </div>
            </Container>

            <ProductDetails product={selected} open={open} onClose={() => setOpen(false)}/>
        </section>
    );
}
