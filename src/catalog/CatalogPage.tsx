import {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import FiltersPanel from "./Filters";
import {CatalogGrid} from "./Grid";
import {PRODUCTS} from "./data";
import type {Filters} from "./types";
import {applyFilters, useQueryFilters} from "./hooks";
import {useI18n} from "../shared/i18n";

export default function CatalogPage() {
    const {t} = useI18n();
    const {category, subcategory} = useParams();
    const defaults: Filters = {
        q: "",
        min: undefined,
        max: undefined,
        brands: [],
        inStockOnly: false,
        sort: "relevance",
        page: 1,
        perPage: 9
    };
    const {filters, setFiltersUrl} = useQueryFilters(defaults);
    const [loading, setLoading] = useState(false);
    const filtered = useMemo(() => applyFilters(PRODUCTS, filters, category, subcategory), [filters, category, subcategory]);
    // ✅ Лоадер запускается только когда реально изменился URL (по факту)
    useEffect(() => {
        setLoading(true);
        const t = window.setTimeout(() => setLoading(false), 250);
        return () => window.clearTimeout(t);
    }, []);
    const total = filtered.length;
    const start = (filters.page - 1) * filters.perPage;
    const pageItems = filtered.slice(start, start + filters.perPage);
    const pages = Math.max(1, Math.ceil(total / filters.perPage));
    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("catalog_title")}</h2>
                <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-300">{t("catalog_lead")}</p>
                <div className="mt-8 grid gap-6 lg:grid-cols-[280px,1fr]">
                    <div className="lg:sticky lg:top-24 lg:self-start"><FiltersPanel value={filters}
                                                                                     onChange={(v) => setFiltersUrl({
                                                                                         ...v,
                                                                                         page: 1
                                                                                     })}/></div>
                    <div className="space-y-4">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            {t("catalog_selected")} <span
                            className="ml-2 rounded-full bg-gray-100 px-3 py-1 dark:bg-white/10">{category || "—"}{subcategory ? ` / ${subcategory}` : ""}</span>
                            <span className="ml-2">• {t("found")}: {total}</span>
                        </div>
                        <CatalogGrid items={pageItems} loading={loading}/>
                        <Pagination page={filters.page} pages={pages}
                                    onPage={(p) => setFiltersUrl({...filters, page: p})}/>
                    </div>
                </div>
            </div>
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