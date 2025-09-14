import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import CatalogFilters, {type FiltersValue} from "./Filters.tsx";
import type {Product} from "../../data/types.ts";
import {listProducts, type ProductQuery, type ProductsPage} from "../../shared/api/repo.ts";
import Container from "../../shared/Container.tsx";

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

    const { category, subcategory } = useParams();
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

        setSp(next, { replace: true });
    }, [filters, page, size, setSp]);

    // загрузка с бэка
    async function fetchPage() {
        setLoading(true);
        setErr(null);
        try {
            const qp = toQuery(filters, page, size);
            const res: ProductsPage = await listProducts(qp);
            setItems(res.content);
            setTotalPages(res.totalPages);
            // синхронизация (если бэк вернул другие значения)
            setPage(res.number);
            setSize(res.size);
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

    return (
        <section className="scroll-mt-24 py-16 sm:py-20">
            <Container>
                <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
                    {/* ФИЛЬТРЫ */}
                    <aside className="lg:top-24 lg:self-start">
                        <CatalogFilters value={filters} onChange={handleChange} />
                    </aside>

                    {/* КОНТЕНТ */}
                    <div className="space-y-4">
                        {/* статус */}
                        {err && (
                            <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-200">
                                {err}
                            </div>
                        )}

                        {/* grid карточек */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {loading
                                ? Array.from({ length: size }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-40 animate-pulse rounded-2xl border bg-gray-100 dark:border-white/10 dark:bg-white/5"
                                    />
                                ))
                                : items.map((p) => (
                                    <article
                                        key={p.id}
                                        className="rounded-2xl border p-4 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-black/40"
                                    >
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{p.brand || "\u2014"}</div>
                                        <div className="mt-1 line-clamp-2 font-medium">{p.title}</div>
                                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                            {p.category} / {p.subcategory || "\u2014"}
                                        </div>
                                        <div className="mt-3 font-semibold">${p.price}</div>
                                        <div className="mt-2 text-xs">
                                            {p.inStock ? (
                                                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                            in stock
                          </span>
                                            ) : (
                                                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                            out of stock
                          </span>
                                            )}
                                        </div>
                                    </article>
                                ))}
                        </div>

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
        </section>
    );
}