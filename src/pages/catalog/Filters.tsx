import {useEffect, useState} from "react";
import {Eraser} from "lucide-react";
import {useI18n} from "../../shared/i18n/i18n.tsx";

export type FiltersValue = {
    q: string;
    brand: string;
    min?: number;
    max?: number;
    inStockOnly: boolean;
    category: string;
    subcategory: string;
    sort: string; // "price,asc" | "price,desc" | "title,asc" ...
};

export default function CatalogFilters({
                                           value,
                                           onChange,
                                       }: {
    value: FiltersValue;
    onChange: (v: FiltersValue) => void;
}) {
    const {t} = useI18n();

    const [qDraft, setQDraft] = useState(value.q);

    useEffect(() => setQDraft(value.q), [value.q]);

    useEffect(() => {
        const id = setTimeout(() => {
            if (qDraft !== value.q) onChange({...value, q: qDraft});
        }, 300);
        return () => clearTimeout(id);
    }, [qDraft]); // eslint-disable-line

    const set = <K extends keyof FiltersValue>(k: K, v: FiltersValue[K]) =>
        onChange({...value, [k]: v});

    return (
        <div className="rounded-2xl border p-4 dark:-white/10 dark:bg-black/40">
            <div className="text-sm font-semibold">{t('filterstitle')}</div>

            {/* поиск */}
            <div className="mt-3">
                <label className="block text-xs text-gray-500 dark:text-gray-400">{t('filterssearch')}</label>
                <input
                    value={qDraft}
                    onChange={(e) => setQDraft(e.currentTarget.value)}
                    placeholder={t('filterssearchPlaceholder')}
                    className="mt-1 w-full rounded-xl  px-3 py-2 text-sm
                             !bg-white !text-black
                             dark:!bg-gray-300 dark:!text-black"
                />
            </div>

            {/* бренд */}
            <div className="mt-3">
                <label className="block text-xs text-gray-500 dark:text-gray-400">{t('filtersbrand')}</label>
                <input
                    value={value.brand}
                    onChange={(e) => set("brand", e.currentTarget.value)}
                    placeholder={t('filtersbrandPlaceholder')}
                    className="mt-1 w-full rounded-xl  px-3 py-2 text-sm
                             !bg-white !text-black
                             dark:!bg-gray-300 dark:!text-black"
                />
            </div>

            {/* диапазон цен */}
            <div className="mt-3 grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">{t('filtersmin')}</label>
                    <input
                        type="number"
                        value={value.min ?? ""}
                        onChange={(e) => set("min", e.currentTarget.value ? Number(e.currentTarget.value) : undefined)}
                        className="mt-1 w-full rounded-xl  px-3 py-2 text-sm
                             !bg-white !text-black
                             dark:!bg-gray-300 dark:!text-black"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">{t('filtersmax')}</label>
                    <input
                        type="number"
                        value={value.max ?? ""}
                        onChange={(e) => set("max", e.currentTarget.value ? Number(e.currentTarget.value) : undefined)}
                        className="mt-1 w-full rounded-xl  px-3 py-2 text-sm
                             !bg-white !text-black
                             dark:!bg-gray-300 dark:!text-black"
                    />
                </div>
            </div>

            {/* наличие */}
            <div className="mt-3">
                <label className="inline-flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={value.inStockOnly}
                        onChange={(e) => set("inStockOnly", e.currentTarget.checked)}
                    />
                    {t('filtersinStockOnly')}
                </label>
            </div>

            {/* категория / подкатегория */}
            <div className="mt-3 grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">{t('filterscategory')}</label>
                    <input
                        value={value.category}
                        onChange={(e) => set("category", e.currentTarget.value)}
                        className="mt-1 w-full rounded-xl  px-3 py-2 text-sm
                             !bg-white !text-black
                             dark:!bg-gray-300 dark:!text-black"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">{t('filterssubcategory')}</label>
                    <input
                        value={value.subcategory}
                        onChange={(e) => set("subcategory", e.currentTarget.value)}
                        className="mt-1 w-full rounded-xl  px-3 py-2 text-sm
                             !bg-white !text-black
                             dark:!bg-gray-300 dark:!text-black"
                    />
                </div>
            </div>

            {/* сортировка */}
            <div className="mt-3">
                <label className="block text-xs text-gray-500 dark:text-gray-400">{t('filterssort')}</label>
                <select
                    value={value.sort}
                    onChange={(e) => set("sort", e.currentTarget.value)}
                    className="mt-1 w-full rounded-xl  px-3 py-2 text-sm
                             !bg-white !text-black
                             dark:!bg-gray-300 dark:!text-black"
                >
                    <option value="title,asc">{t('filterssortTitleAsc')}</option>
                    <option value="title,desc">{t('filterssortTitleDesc')}</option>
                    <option value="price,asc">{t('filterssortPriceAsc')}</option>
                    <option value="price,desc">{t('filterssortPriceDesc')}</option>
                </select>
            </div>

            {/* сброс */}
            <div className="mt-4">
                <button
                    onClick={() =>
                        onChange({
                            q: "",
                            brand: "",
                            min: undefined,
                            max: undefined,
                            inStockOnly: false,
                            category: "",
                            subcategory: "",
                            sort: "title,asc",
                        })
                    }
                    className="w-72 inline-flex items-center justify-center gap-2
                             rounded-xl border px-4 py-2 text-sm font-medium
                             !bg-white !text-black shadow
                             hover:!bg-black hover:!text-white hover:!shadow-lg
                             focus:outline-none focus:ring-2 focus:ring-black/40 active:scale-[0.99]
                             dark:bg-neutral-900 dark:text-white dark:hover:bg-black"
                >
                    <Eraser className="h-4 w-4"/>
                    <span>{t("filtersclear") ?? "Cброс"}</span>
                </button>
            </div>
        </div>
    );
}
