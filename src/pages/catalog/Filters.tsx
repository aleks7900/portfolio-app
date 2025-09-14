import { useEffect, useState } from "react";

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
    // управляемые поля без локального «state копии».
    // единственное — делаем маленький debounce для q
    const [qDraft, setQDraft] = useState(value.q);

    useEffect(() => setQDraft(value.q), [value.q]);

    useEffect(() => {
        const id = setTimeout(() => {
            if (qDraft !== value.q) onChange({ ...value, q: qDraft });
        }, 300);
        return () => clearTimeout(id);
    }, [qDraft]); // eslint-disable-line

    const set = <K extends keyof FiltersValue>(k: K, v: FiltersValue[K]) =>
        onChange({ ...value, [k]: v });

    return (
        <div className="rounded-2xl border p-4 dark:border-white/10 dark:bg-black/40">
            <div className="text-sm font-semibold">Filters</div>

            {/* поиск */}
            <div className="mt-3">
                <label className="block text-xs text-gray-500 dark:text-gray-400">Search</label>
                <input
                    value={qDraft}
                    onChange={(e) => setQDraft(e.currentTarget.value)}
                    placeholder="id / title / brand / category"
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                />
            </div>

            {/* бренд */}
            <div className="mt-3">
                <label className="block text-xs text-gray-500 dark:text-gray-400">Brand</label>
                <input
                    value={value.brand}
                    onChange={(e) => set("brand", e.currentTarget.value)}
                    placeholder="e.g. Bytek"
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                />
            </div>

            {/* диапазон цен */}
            <div className="mt-3 grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">Min</label>
                    <input
                        type="number"
                        value={value.min ?? ""}
                        onChange={(e) => set("min", e.currentTarget.value ? Number(e.currentTarget.value) : undefined)}
                        className="mt-1 w-full rounded-xl border px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">Max</label>
                    <input
                        type="number"
                        value={value.max ?? ""}
                        onChange={(e) => set("max", e.currentTarget.value ? Number(e.currentTarget.value) : undefined)}
                        className="mt-1 w-full rounded-xl border px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
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
                    in stock only
                </label>
            </div>

            {/* категория / подкатегория (простые инпуты: серверная фильтрация) */}
            <div className="mt-3 grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">Category</label>
                    <input
                        value={value.category}
                        onChange={(e) => set("category", e.currentTarget.value)}
                        className="mt-1 w-full rounded-xl border px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">Subcategory</label>
                    <input
                        value={value.subcategory}
                        onChange={(e) => set("subcategory", e.currentTarget.value)}
                        className="mt-1 w-full rounded-xl border px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                    />
                </div>
            </div>

            {/* сортировка */}
            <div className="mt-3">
                <label className="block text-xs text-gray-500 dark:text-gray-400">Sort</label>
                <select
                    value={value.sort}
                    onChange={(e) => set("sort", e.currentTarget.value)}
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                >
                    <option value="title,asc">Title ↑</option>
                    <option value="title,desc">Title ↓</option>
                    <option value="price,asc">Price ↑</option>
                    <option value="price,desc">Price ↓</option>
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
                    className="w-full rounded-xl border px-3 py-2 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}