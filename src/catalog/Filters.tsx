import React, {useEffect, useState} from "react";
import {Filter as FilterIcon, Search} from "lucide-react";
import type {Filters} from "./types";
import {BRANDS} from "./data";
import {useI18n} from "../shared/i18n";

export default function CatalogFilters({value, onChange}: { value: Filters; onChange: (v: Filters) => void }) {
    const {t} = useI18n();
    const [local, setLocal] = useState<Filters>(value);
    useEffect(() => setLocal(value), [value]);
    const set = (patch: Partial<Filters>) => setLocal({...local, ...patch});
    return (
        <div className="rounded-2xl border bg-white p-4 shadow-sm dark:bg-black dark:border-white/10">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium"><FilterIcon
                className="h-4 w-4"/> {t("filters")}</div>
            <div className="grid gap-4">
                <label>
                    <span className="mb-1 block text-sm font-medium">{t("search_placeholder")}</span>
                    <div className="relative">
                        <Search
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"/>
                        <input value={local.q} onChange={(e) => set({q: e.currentTarget.value})}
                               placeholder={t("search_placeholder")}
                               className="w-full rounded-xl border pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"/>
                    </div>
                </label>
                <div>
                    <div className="mb-1 text-sm font-medium">{t("price")}</div>
                    <div className="flex items-center gap-2">
                        <input inputMode="numeric" pattern="[0-9]*" value={local.min ?? ""}
                               onChange={(e) => set({min: e.currentTarget.value ? Number(e.currentTarget.value) : undefined})}
                               placeholder={t("min")}
                               className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"/>
                        <span>—</span>
                        <input inputMode="numeric" pattern="[0-9]*" value={local.max ?? ""}
                               onChange={(e) => set({max: e.currentTarget.value ? Number(e.currentTarget.value) : undefined})}
                               placeholder={t("max")}
                               className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"/>
                    </div>
                </div>
                <div>
                    <div className="mb-2 text-sm font-medium">{t("brand")}</div>
                    <div className="grid gap-2">
                        {BRANDS.map((b) => {
                            const checked = local.brands.includes(b);
                            return (
                                <label key={b} className="inline-flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={checked}
                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                               const next = new Set(local.brands);
                                               if (e.currentTarget.checked) next.add(b); else next.delete(b);
                                               set({brands: Array.from(next)});
                                           }}/>
                                    <span>{b}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <label className="inline-flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={local.inStockOnly}
                               onChange={(e) => set({inStockOnly: e.currentTarget.checked})}/> {t("in_stock_only")}
                    </label>
                </div>
                <div>
                    <div className="mb-1 text-sm font-medium">{t("sort")}</div>
                    <select value={local.sort} onChange={(e) => set({sort: e.currentTarget.value as Filters["sort"]})}
                            className="w-full rounded-xl border px-3 py-2 dark:bg-black dark:border-white/20">
                        <option value="relevance">{t("sort_relevance")}</option>
                        <option value="price_asc">{t("sort_price_asc")}</option>
                        <option value="price_desc">{t("sort_price_desc")}</option>
                        <option value="brand_az">{t("sort_brand_az")}</option>
                    </select>
                </div>
                <div>
                    <div className="mb-1 text-sm font-medium">{t("per_page")}</div>
                    <select value={local.perPage}
                            onChange={(e) => set({perPage: Number(e.currentTarget.value), page: 1})}
                            className="w-full rounded-xl border px-3 py-2 dark:bg-black dark:border-white/20">
                        {[6, 9, 12].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
                <button onClick={() => onChange(local)}
                        className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90">{t("apply_filters")}</button>
                <button onClick={() => onChange({
                    q: "",
                    min: undefined,
                    max: undefined,
                    brands: [],
                    inStockOnly: false,
                    sort: "relevance",
                    page: 1,
                    perPage: value.perPage
                })}
                        className="rounded-xl border px-4 py-2 text-sm hover:bg:black hover:text:white dark:border-white/20 dark:hover:bg-white dark:hover:text-black">{t("clear")}</button>
            </div>
        </div>
    );
}