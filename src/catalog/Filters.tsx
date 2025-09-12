import React from "react";
import {Filter as FilterIcon, Search} from "lucide-react";
import type {Filters} from "./types";
import {BRANDS} from "./data";
import {useI18n} from "../shared/i18n";

export default function CatalogFilters({
                                           value,
                                           onChange,
                                       }: {
    value: Filters;
    onChange: (v: Filters) => void;
}) {
    const { t } = useI18n();

    const set = (patch: Partial<Filters>) => onChange({ ...value, ...patch });

    const onPriceMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.currentTarget.value.trim();
        set({ min: v === "" ? undefined : Number(v) });
    };

    const onPriceMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.currentTarget.value.trim();
        set({ max: v === "" ? undefined : Number(v) });
    };

    const toggleBrand = (b: string, checked: boolean) => {
        const next = new Set(value.brands);
        if (checked) {
            next.add(b);
        } else {
            next.delete(b);
        }
        set({ brands: Array.from(next) });
    };

    return (
        <div className="rounded-2xl border bg-white p-4 shadow-sm dark:bg-black dark:border-white/10">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                <FilterIcon className="h-4 w-4" /> {t("filters")}
            </div>

            <div className="grid gap-4">
                {/* Поиск */}
                <label>
          <span className="mb-1 block text-sm font-medium">
            {t("search_placeholder")}
          </span>
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            value={value.q}
                            onChange={(e) => set({ q: e.currentTarget.value, page: 1 })}
                            placeholder={t("search_placeholder")}
                            className="w-full rounded-xl border pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"
                        />
                    </div>
                </label>

                {/* Цена */}
                <div>
                    <div className="mb-1 text-sm font-medium">{t("price")}</div>
                    <div className="flex items-center gap-2">
                        <input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={value.min ?? ""}
                            onChange={onPriceMin}
                            placeholder={t("min")}
                            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"
                        />
                        <span>—</span>
                        <input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={value.max ?? ""}
                            onChange={onPriceMax}
                            placeholder={t("max")}
                            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"
                        />
                    </div>
                </div>

                {/* Бренд */}
                <div>
                    <div className="mb-2 text-sm font-medium">{t("brand")}</div>
                    <div className="grid gap-2">
                        {BRANDS.map((b) => {
                            const checked = value.brands.includes(b);
                            return (
                                <label key={b} className="inline-flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            toggleBrand(b, e.currentTarget.checked)
                                        }
                                    />
                                    <span>{b}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Наличие */}
                <div>
                    <label className="inline-flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={value.inStockOnly}
                            onChange={(e) => set({ inStockOnly: e.currentTarget.checked, page: 1 })}
                        />
                        {t("in_stock_only")}
                    </label>
                </div>

                {/* Сортировка */}
                <div>
                    <div className="mb-1 text-sm font-medium">{t("sort")}</div>
                    <select
                        value={value.sort}
                        onChange={(e) => set({ sort: e.currentTarget.value as Filters["sort"], page: 1 })}
                        className="w-full rounded-xl border px-3 py-2 dark:bg-black dark:border-white/20"
                    >
                        <option value="relevance">{t("sort_relevance")}</option>
                        <option value="price_asc">{t("sort_price_asc")}</option>
                        <option value="price_desc">{t("sort_price_desc")}</option>
                        <option value="brand_az">{t("sort_brand_az")}</option>
                    </select>
                </div>

                {/* Товаров на странице */}
                <div>
                    <div className="mb-1 text-sm font-medium">{t("per_page")}</div>
                    <select
                        value={value.perPage}
                        onChange={(e) => set({ perPage: Number(e.currentTarget.value), page: 1 })}
                        className="w-full rounded-xl border px-3 py-2 dark:bg-black dark:border-white/20"
                    >
                        {[6, 9, 12].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Сброс */}
            <div className="mt-4 flex items-center gap-2">
                <button
                    onClick={() =>
                        onChange({
                            ...value,
                            q: "",
                            min: undefined,
                            max: undefined,
                            brands: [],
                            inStockOnly: false,
                            sort: "relevance",
                            page: 1,
                        })
                    }
                    className="rounded-xl border px-4 py-2 text-sm hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black"
                >
                    {t("clear")}
                </button>
            </div>
        </div>
    );
}