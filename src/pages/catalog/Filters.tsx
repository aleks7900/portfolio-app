import {useEffect, useMemo, useRef, useState} from "react";
import {ChevronDown, Eraser} from "lucide-react";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import {BASE_URL} from "../../shared/api/api.ts";

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
                                           // Новые необязательные пропсы для автоподстановки из выбранного раздела каталога
                                           autoCategory,
                                           autoSubcategory,
                                           sectionKey, // меняется при каждом выборе раздела -> сбрасывает ручной режим
                                       }: {
    value: FiltersValue;
    onChange: (v: FiltersValue) => void;
    autoCategory?: string;
    autoSubcategory?: string;
    sectionKey?: string | number;
}) {
    const {t} = useI18n();

    const [qDraft, setQDraft] = useState(value.q);
    const [open, setOpen] = useState(false);

    // Справочники
    const [categories, setCategories] = useState<string[]>([]);
    const [subcategories, setSubcategories] = useState<string[]>([]);
    const [isLoadingCats] = useState(false);
    const [isLoadingSubs, setIsLoadingSubs] = useState(false);

    // Флаг: пользователь вручную менял категорию/подкатегорию
    const [manualOverride, setManualOverride] = useState(false);
    const lastSectionRef = useRef<string | number | undefined>(undefined);

    useEffect(() => setQDraft(value.q), [value.q]);

    useEffect(() => {
        const id = setTimeout(() => {
            if (qDraft !== value.q) onChange({...value, q: qDraft});
        }, 300);
        return () => clearTimeout(id);
    }, [qDraft]); // eslint-disable-line

    const set = <K extends keyof FiltersValue>(k: K, v: FiltersValue[K]) =>
        onChange({...value, [k]: v});

    const hasActive =
        (value.brand?.trim()?.length ?? 0) > 0 ||
        value.min !== undefined ||
        value.max !== undefined ||
        value.inStockOnly ||
        (value.category?.trim()?.length ?? 0) > 0 ||
        (value.subcategory?.trim()?.length ?? 0) > 0 ||
        value.sort !== "title,asc";

    // ===== Справочники: загрузка =====
    const API = BASE_URL;

    // Загружаем категории при монтировании
    useEffect(() => {
        fetch(`${API}/api/categories`, {credentials: "omit"})
            .then(r => r.json())
            .then(setCategories)
            .catch(console.error);
    }, [API]);

    const loadSubcategories = async (cat: string) => {
        setIsLoadingSubs(true);
        try {
            if (!cat) {
                // Если категории нет — можно подтянуть "все" подкатегории (по желанию)
                setSubcategories([]);
                return;
            }
            const url = `${API}/api/subcategories?category=${encodeURIComponent(cat)}`;
            const resp = await fetch(url, {credentials: "omit"});
            const data: string[] = await resp.json();
            setSubcategories(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
            setSubcategories([]);
        } finally {
            setIsLoadingSubs(false);
        }
    };

    useEffect(() => {
        loadSubcategories(value.category);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value.category]);

    // Если текущая subcategory выпала из набора — сбросим
    useEffect(() => {
        if (value.subcategory && subcategories.length > 0 && !subcategories.includes(value.subcategory)) {
            set("subcategory", "");
        }
        if (!value.category && value.subcategory) {
            set("subcategory", "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subcategories]);

    // ===== АВТОПОДСТАНОВКА от выбранного раздела каталога =====
    // Сбрасываем ручной режим при смене sectionKey
    useEffect(() => {
        if (lastSectionRef.current !== sectionKey) {
            lastSectionRef.current = sectionKey;
            setManualOverride(false);
        }
    }, [sectionKey]);

    // Применяем autoCategory/autoSubcategory, если нет ручного переопределения
    useEffect(() => {
        if (manualOverride) return;

        // Если пришла autoCategory — применяем её
        if (typeof autoCategory === "string" && autoCategory !== value.category) {
            // меняем сразу категорию; саб подтянется отдельным эффектом + проверкой
            set("category", autoCategory);
            // если автосабкат есть и мы уже знаем список — поставим его, иначе дождёмся загрузки
            if (autoSubcategory && subcategories.includes(autoSubcategory)) {
                set("subcategory", autoSubcategory);
            } else if (!autoSubcategory) {
                set("subcategory", "");
            }
            return; // дождёмся обновления сабов
        }

        // Категория совпала/не задана — попробуем применить только сабкат
        if (autoSubcategory && autoSubcategory !== value.subcategory && subcategories.includes(autoSubcategory)) {
            set("subcategory", autoSubcategory);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoCategory, autoSubcategory, manualOverride, subcategories]);

    // ===== placeholders =====
    const categoryPlaceholder = useMemo(
        () => t("filterscategoryPlaceholder") ?? "---",
        [t]
    );
    const subcategoryPlaceholder = useMemo(
        () =>
            value.category
                ? (t("filterssubcategoryPlaceholder") ?? "---")
                : (t("filterssubcategoryPickCategoryFirst") ?? "— выберите категорию —"),
        [t, value.category]
    );

    // ===== handlers =====
    const onCategoryChange = (newCat: string) => {
        setManualOverride(true);
        // смена категории сбрасывает подкатегорию (пока не выбрана из нового списка)
        onChange({...value, category: newCat, subcategory: ""});
    };

    const onSubcategoryChange = (newSub: string) => {
        setManualOverride(true);
        set("subcategory", newSub);
    };

    const onClear = () => {
        setManualOverride(false);
        onChange({
            q: "",
            brand: "",
            min: undefined,
            max: undefined,
            inStockOnly: false,
            category: "",
            subcategory: "",
            sort: "title,asc",
        });
    };

    return (
        <div className="rounded-2xl border p-4 dark:-white/10 dark:bg-black/40">
            {/* Тогглер dropdown */}
            <button
                type="button"
                onClick={() => setOpen((s) => !s)}
                aria-expanded={open}
                className="flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm font-semibold
                   !bg-white !text-black shadow
                   hover:!bg-black hover:!text-white hover:!shadow-lg
                   focus:outline-none focus:ring-2 focus:ring-black/40 active:scale-[0.99]
                   dark:bg-neutral-900 dark:text-white dark:hover:bg-black"
            >
        <span className="inline-flex items-center gap-2">
          {t('filterstitle')}
            {hasActive && (
                <span className="ml-2 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium
                             dark:border-white/20">
              •
            </span>
            )}
        </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}/>
            </button>

            {/* Контент фильтров */}
            {open && (
                <div className="mt-4">
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
                            <label
                                className="block text-xs text-gray-500 dark:text-gray-400">{t('filterscategory')}</label>
                            <select
                                value={value.category}
                                onChange={(e) => onCategoryChange(e.currentTarget.value)}
                                className="mt-1 w-full rounded-xl px-3 py-2 text-sm
                                       !bg-white !text-black
                                       dark:!bg-gray-300 dark:!text-black"
                            >
                                <option value="">{isLoadingCats ? "…" : categoryPlaceholder}</option>
                                {categories.map((c) => (
                                    <option key={c} value={c}>{t(c.toLowerCase())}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                className="block text-xs text-gray-500 dark:text-gray-400">{t('filterssubcategory')}</label>
                            <select
                                value={value.subcategory}
                                onChange={(e) => onSubcategoryChange(e.currentTarget.value)}
                                disabled={!value.category || isLoadingSubs}
                                className="mt-1 w-full rounded-xl px-3 py-2 text-sm
                           !bg-white !text-black
                           disabled:opacity-60 disabled:cursor-not-allowed
                           dark:!bg-gray-300 dark:!text-black"
                            >
                                <option value="">{isLoadingSubs ? "…" : subcategoryPlaceholder}</option>
                                {subcategories.map((s) => (
                                    <option key={s} value={s}>{t(s.toLowerCase())}</option>
                                ))}
                            </select>
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
                            onClick={onClear}
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
            )}
        </div>
    );
}
