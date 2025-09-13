import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import FiltersPanel from "./Filters";
import { CatalogGrid } from "./Grid";
import { loadAdminProducts } from "./data";   // ← импортируем
import type {Filters, Product} from "./types";
import { applyFilters, useQueryFilters } from "./hooks";
import { useI18n } from "../shared/i18n";
import ProductDetails from "./ProductDetails.tsx";

export default function CatalogPage() {
    const { t } = useI18n();
    const { category, subcategory } = useParams();
    const location = useLocation();

    const defaults: Filters = {
        q: "",
        min: undefined,
        max: undefined,
        brands: [],
        inStockOnly: false,
        sort: "relevance",
        page: 1,
        perPage: 9,
    };

    // ✅ товары из localStorage/seed
    const [products, setProducts] = useState<Product[]>(() => loadAdminProducts());

    const { filters, setFiltersUrl } = useQueryFilters(defaults);

    const [selected, setSelected] = useState<Product | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    // ловим кастомное событие админки + cross-tab обновления
    useEffect(() => {
        const reload = () => setProducts(loadAdminProducts());
        window.addEventListener("products:updated", reload);
        window.addEventListener("storage", reload); // если редактируют в другой вкладке
        return () => {
            window.removeEventListener("products:updated", reload);
            window.removeEventListener("storage", reload);
        };
    }, []);

    // список брендов для чекбоксов — из актуальных данных
    const brandOptions = useMemo(
        () =>
            Array.from(new Set(products.map((p) => p.brand).filter(Boolean))).sort(),
        [products]
    );

    // фильтрация
    const filtered = useMemo(
        () => applyFilters(products, filters, category, subcategory),
        [products, filters, category, subcategory]
    );

    // скелетоны
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const tmr = window.setTimeout(() => setLoading(false), 250);
        return () => window.clearTimeout(tmr);
    }, [location.pathname, location.search, products]);

    // пагинация
    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total / filters.perPage));
    const pageSafe = Math.min(filters.page, pages);
    const start = (pageSafe - 1) * filters.perPage;
    const pageItems = filtered.slice(start, start + filters.perPage);

    useEffect(() => {
        // если после добавления/удаления текущая страница стала «пустой»
        if (filters.page !== pageSafe) {
            setFiltersUrl({ ...filters, page: pageSafe });
        }
    }, [pages, pageSafe]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("catalog_title")}</h2>
                <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-300">{t("catalog_lead")}</p>
                <div className="mt-8 grid gap-6 lg:grid-cols-[280px,1fr]">
                    <div className="llg:static"><FiltersPanel
                        value={filters}
                        onChange={(v) => setFiltersUrl({ ...v, page: 1 })}
                        brandsOptions={brandOptions}
                    /></div>
                    <div className="space-y-4">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            {t("catalog_selected")} <span
                            className="ml-2 rounded-full bg-gray-100 px-3 py-1 dark:bg-white/10">{category || "—"}{subcategory ? ` / ${subcategory}` : ""}</span>
                            <span className="ml-2">• {t("found")}: {total}</span>
                        </div>
                        <CatalogGrid
                            items={pageItems}
                            loading={loading}
                            onOpen={(p) => {
                                setSelected(p);
                                setDetailsOpen(true);
                            }}
                        />
                        <Pagination page={filters.page} pages={pages}
                                    onPage={(p) => setFiltersUrl({...filters, page: p})}/>
                    </div>
                </div>
            </div>

            {/* Модалка деталей товара */}
            <ProductDetails
                product={selected}
                open={detailsOpen}
                onClose={() => setDetailsOpen(false)}
            />

        </section>
    );
}

function Pagination({page, pages, onPage}: { page: number; pages: number; onPage: (p: number) => void }) {
    const {t} = useI18n();
    if (pages <= 1) return null;
    const nums = Array.from({length: pages}, (_, i) => i + 1);
    return (
        <div className="flex flex-wrap items-center gap-2">
            <button disabled={page === 1} onClick={() => onPage(page - 1)}
                    className="rounded-xl border px-3 py-2 text-sm disabled:opacity-40">{t("back")}</button>
            {nums.map(n => (<button key={n} onClick={() => onPage(n)}
                                    className={`rounded-xl px-3 py-2 text-sm ${n === page ? "bg-gray-900 text-white dark:bg-white dark:text-black" : "border"}`}>{n}</button>))}
            <button disabled={page === pages} onClick={() => onPage(page + 1)}
                    className="rounded-xl border px-3 py-2 text-sm disabled:opacity-40">{t("next")}</button>
        </div>
    );
}