import React, {useCallback, useEffect, useMemo, useState} from "react";
import type {Product} from "../../data/types.ts";
import {useAuth} from "../../shared/auth/auth.tsx";
import {
    createProduct,
    deleteProductById,
    listProducts,
    type ProductQuery,
    type ProductsPage,
    updateProduct
} from "../../shared/api/repo.ts";
import Container from "../../shared/Container.tsx";
import useMediaQuery from "../../shared/theme/mediaQuery.tsx";
import {AnimatePresence, motion} from "framer-motion";
import {useI18n} from "../../shared/i18n/i18n.tsx";

type EditState =
    | { mode: "none" }
    | { mode: "edit"; draft: Product }
    | { mode: "create"; draft: Product };

type ConfirmState =
    | { open: false }
    | { open: true; kind: "delete"; product: Product }
    | { open: true; kind: "save-edit"; draft: Product }
    | { open: true; kind: "save-create"; draft: Product };

const emptyProduct = (): Product => ({
    id: 0,
    title: "",
    brand: "",
    price: 0,
    inStock: true,
    category: "",
    subcategory: "",
    description: "",   // <-- обязательное поле
    availability: "",  // <-- обязательное поле
    // опциональные можно не трогать:
    // imgLinks: [],
    // specs: {},
    // rating: 0,
    // reviews: [],
});

function toNum(v: unknown, def = 0) {
    return typeof v === "number" ? v : def;
}

export default function ProductsPrivate() {
    const {user} = useAuth();
    const isAdmin = !!user?.isAdmin;
    const {t} = useI18n();

    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [err, setErr] = useState<string | null>(null);

    const [query, setQuery] = useState<string>("");

    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(20);
    const [totalPages, setTotalPages] = useState<number | null>(null);

    const [edit, setEdit] = useState<EditState>({mode: "none"});
    const [confirm, setConfirm] = useState<ConfirmState>({open: false});

    // ---- Сортировка ----
    const [sortKey, setSortKey] = useState<keyof Product | null>(null);
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

    const handleSort = (key: keyof Product) => {
        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
    };

    const sortedItems = useMemo(() => {
        if (!sortKey) return items;
        return [...items].sort((a, b) => {
            const v1 = a[sortKey] as unknown;
            const v2 = b[sortKey] as unknown;

            // null/undefined в конец
            if (v1 == null && v2 == null) return 0;
            if (v1 == null) return 1;
            if (v2 == null) return -1;

            // Булево как 1/0
            const coerce = (v: unknown) =>
                typeof v === "number" ? v
                    : typeof v === "boolean" ? (v ? 1 : 0)
                        : typeof v === "string" ? v
                            : String(v);

            const aC = coerce(v1);
            const bC = coerce(v2);

            if (typeof aC === "number" && typeof bC === "number") {
                return sortDir === "asc" ? aC - bC : bC - aC;
            }
            // строковое сравнение с localeCompare
            const cmp = String(aC).localeCompare(String(bC), undefined, {numeric: true, sensitivity: "base"});
            return sortDir === "asc" ? cmp : -cmp;
        });
    }, [items, sortKey, sortDir]);

    // ---- Подсказочные списки ----
    const brands = useMemo(
        () => Array.from(new Set(items.map((p) => p.brand).filter(Boolean))).sort(),
        [items]
    );
    const categories = useMemo(
        () => Array.from(new Set(items.map((p) => p.category).filter(Boolean))).sort(),
        [items]
    );
    const subcategories = useMemo(
        () => Array.from(new Set(items.map((p) => p.subcategory).filter(Boolean))).sort(),
        [items]
    );

    const isMobile = useMediaQuery("(max-width: 1024px)");

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setErr(null);
        try {
            const params: ProductQuery = {q: query || undefined, page, size};
            const data: ProductsPage = await listProducts(params);
            setItems(data.content);
            setTotalPages(typeof data.totalPages === "number" ? data.totalPages : null);
            setPage(toNum(data.number, page));
            setSize(toNum(data.size, size));
        } catch (e: unknown) {
            setErr(e instanceof Error ? e.message : t("pp_error_loading"));
        } finally {
            setLoading(false);
        }
    }, [query, page, size, t]);

    useEffect(() => {
        fetchProducts();
        const onUpdated = () => fetchProducts();
        window.addEventListener("products:updated", onUpdated as EventListener);
        return () => window.removeEventListener("products:updated", onUpdated as EventListener);
    }, [fetchProducts]);

    useEffect(() => {
        const opened = (isAdmin && edit.mode !== "none") || confirm.open;
        const onKey = (e: KeyboardEvent) => {
            if (!opened) return;
            if (e.key === "Escape") {
                if (confirm.open) setConfirm({open: false});
                else setEdit({mode: "none"});
            }
        };
        if (opened) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", onKey);
        }
        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", onKey);
        };
    }, [isAdmin, edit.mode, confirm.open]);

    const startCreate = () => {
        if (!isAdmin) return;
        setEdit({mode: "create", draft: emptyProduct()});
    };

    const startEdit = (p: Product) => {
        if (!isAdmin) return;
        setEdit({mode: "edit", draft: {...p}});
    };

    const askRemove = (p: Product) => {
        if (!isAdmin) return;
        setConfirm({open: true, kind: "delete", product: p});
    };

    const setDraft = <K extends keyof Product>(key: K, val: Product[K]) => {
        if (edit.mode === "none") return;
        setEdit({...edit, draft: {...edit.draft, [key]: val}});
    };

    const askSaveFromForm = () => {
        if (edit.mode === "edit") setConfirm({open: true, kind: "save-edit", draft: edit.draft});
        if (edit.mode === "create") setConfirm({open: true, kind: "save-create", draft: edit.draft});
    };

    async function doDelete(p: Product) {
        await deleteProductById(p.id);
        window.dispatchEvent(new CustomEvent("products:updated"));
    }

    async function doSave(draft: Product, mode: "edit" | "create") {
        if (mode === "edit") {
            await updateProduct(draft);
        } else {
            const {id: _omit, ...withoutId} = draft;
            await createProduct(withoutId);
        }
        window.dispatchEvent(new CustomEvent("products:updated"));
    }

    const handleConfirm = async () => {
        if (!confirm.open) return;
        try {
            if (confirm.kind === "delete") await doDelete(confirm.product);
            if (confirm.kind === "save-edit") await doSave(confirm.draft, "edit");
            if (confirm.kind === "save-create") await doSave(confirm.draft, "create");
            setConfirm({open: false});
            setEdit({mode: "none"});
        } catch (e: unknown) {
            alert(e instanceof Error ? e.message : t("pp_error_saving"));
        }
    };

    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <Container>
                {/* Заголовок + поиск + новая запись */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        {isAdmin ? t("pp_title_admin") : t("pp_title_user")}
                    </h2>

                    <div className="flex w-full items-center gap-2 sm:w-auto">
                        <input
                            value={query}
                            onChange={(e) => {
                                setPage(0);
                                setQuery(e.currentTarget.value);
                            }}
                            placeholder={t("pp_search_placeholder")}
                            className="w-full sm:w-72 rounded-xl border px-3 py-2 text-sm dark:bg-zinc-800 dark:border:white/20 dark:border-white/20"
                        />
                        {isAdmin && (
                            <button
                                onClick={startCreate}
                                className="shrink-0 rounded-xl !bg-gray-900 px-4 py-2 text-sm font-medium !text-white
                                         hover:!bg-yellow-500 hover:!text-black hover:shadow-lg
                                         focus:outline-none focus:ring-2 focus:ring-yellow-400 active:scale-[0.99]
                                         dark:bg-white dark:text-black dark:hover:bg-yellow-400"
                            >
                                {t("pp_newProduct_btn")}
                            </button>
                        )}
                    </div>
                </div>

                {/* Ошибки */}
                {err && (
                    <div
                        className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-200">
                        {err}
                    </div>
                )}

                {/* --- Таблица (desktop) и карточки (mobile) --- */}
                {!isMobile ? (
                    <Container>
                        <div className="mt-6 overflow-x-auto rounded-2xl border dark:border-white/10 sm:block">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-600 dark:bg-white/5 dark:text-gray-300">
                                <tr>
                                    <Th
                                        sortable
                                        sortKey="id"
                                        currentKey={sortKey}
                                        sortDir={sortDir}
                                        onSort={handleSort}
                                    >
                                        {t("pp_th_id")}
                                    </Th>
                                    <Th
                                        sortable
                                        sortKey="title"
                                        currentKey={sortKey}
                                        sortDir={sortDir}
                                        onSort={handleSort}
                                    >
                                        {t("pp_th_title")}
                                    </Th>
                                    <Th
                                        sortable
                                        sortKey="brand"
                                        currentKey={sortKey}
                                        sortDir={sortDir}
                                        onSort={handleSort}
                                    >
                                        {t("pp_th_brand")}
                                    </Th>
                                    <Th
                                        sortable
                                        sortKey="price"
                                        currentKey={sortKey}
                                        sortDir={sortDir}
                                        onSort={handleSort}
                                    >
                                        {t("pp_th_price")}
                                    </Th>
                                    <Th
                                        sortable
                                        sortKey="inStock"
                                        currentKey={sortKey}
                                        sortDir={sortDir}
                                        onSort={handleSort}
                                    >
                                        {t("pp_th_inStock")}
                                    </Th>
                                    <Th
                                        sortable
                                        sortKey="category"
                                        currentKey={sortKey}
                                        sortDir={sortDir}
                                        onSort={handleSort}
                                    >
                                        {t("pp_th_category")}
                                    </Th>
                                    <Th
                                        sortable
                                        sortKey="subcategory"
                                        currentKey={sortKey}
                                        sortDir={sortDir}
                                        onSort={handleSort}
                                    >
                                        {t("pp_th_subcategory")}
                                    </Th>
                                    <Th className="text-right">{t("pp_th_actions")}</Th>
                                </tr>
                                </thead>
                                <tbody className="divide-y dark:divide-white/10">
                                {loading ? (
                                    <tr>
                                        <Td colSpan={8} className="py-10 text-center text-gray-500">
                                            {t("pp_loading")}
                                        </Td>
                                    </tr>
                                ) : sortedItems.length === 0 ? (
                                    <tr>
                                        <Td colSpan={8} className="py-10 text-center text-gray-500">
                                            {t("pp_nothing")}
                                        </Td>
                                    </tr>
                                ) : (
                                    sortedItems.map((p) => (
                                        <tr key={p.id} className="hover:bg-black/5 dark:hover:bg-white/5">
                                            <Td>{p.id}</Td>
                                            <Td className="font-medium">{t(p.title)}</Td>
                                            <Td>{p.brand}</Td>
                                            <Td>${p.price}</Td>
                                            <Td>
                                                {p.inStock ? <Badge ok>{t("pp_inStock_yes")}</Badge> :
                                                    <Badge>{t("pp_inStock_no")}</Badge>}
                                            </Td>
                                            <Td>{t(p.category)}</Td>
                                            <Td>{t(p.subcategory)}</Td>
                                            <Td className="text-right">
                                                {isAdmin ? (
                                                    <>
                                                        <ActionBtn
                                                            onClick={() => startEdit(p)}>{t("pp_action_edit")}</ActionBtn>
                                                        <ActionBtn danger className="ml-2" onClick={() => askRemove(p)}>
                                                            {t("pp_action_delete")}
                                                        </ActionBtn>
                                                    </>
                                                ) : (
                                                    <span className="text-gray-400">{t("pp_view_only")}</span>
                                                )}
                                            </Td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>

                        <PaginationControls
                            page={page}
                            size={size}
                            totalPages={totalPages}
                            onPrev={() => setPage((p) => Math.max(0, p - 1))}
                            onNext={() => setPage((p) => (totalPages != null ? Math.min(totalPages - 1, p + 1) : p))}
                            onSizeChange={(n) => {
                                setPage(0);
                                setSize(n);
                            }}
                        />
                    </Container>
                ) : (
                    <Container>
                        <div className="mt-6 space-y-3">
                            {loading ? (
                                <div
                                    className="rounded-2xl border p-6 text-center text-sm text-gray-500 dark:border-white/10">
                                    {t("pp_loading")}
                                </div>
                            ) : sortedItems.length === 0 ? (
                                <div
                                    className="rounded-2xl border p-6 text-center text-sm text-gray-500 dark:border-white/10">
                                    {t("pp_nothing")}
                                </div>
                            ) : (
                                sortedItems.map((p) => (
                                    <div key={p.id}
                                         className="rounded-2xl border p-4 shadow-sm dark:border-white/10 dark:bg-black/40">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="text-base font-semibold leading-tight">{p.title}</div>
                                                <div
                                                    className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">ID: {p.id}</div>
                                            </div>
                                            <div className="shrink-0">
                                                {p.inStock ? <Badge ok>{t("pp_inStock_yes")}</Badge> :
                                                    <Badge>{t("pp_inStock_no")}</Badge>}
                                            </div>
                                        </div>
                                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                            <LabelValue label={t("pp_lbl_brand")} value={p.brand || "—"}/>
                                            <LabelValue label={t("pp_lbl_price")} value={`$${p.price}`}/>
                                            <LabelValue label={t("pp_lbl_category")} value={p.category || "—"}/>
                                            <LabelValue label={t("pp_lbl_subcategory")} value={p.subcategory || "—"}/>
                                        </div>
                                        {isAdmin && (
                                            <div className="mt-3 flex flex-wrap justify-end gap-2">
                                                <ActionBtn
                                                    onClick={() => startEdit(p)}>{t("pp_action_edit")}</ActionBtn>
                                                <ActionBtn danger
                                                           onClick={() => askRemove(p)}>{t("pp_action_delete")}</ActionBtn>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        <PaginationControls
                            page={page}
                            size={size}
                            totalPages={totalPages}
                            onPrev={() => setPage((p) => Math.max(0, p - 1))}
                            onNext={() => setPage((p) => (totalPages != null ? Math.min(totalPages - 1, p + 1) : p))}
                            onSizeChange={(n) => {
                                setPage(0);
                                setSize(n);
                            }}
                        />
                    </Container>
                )}

                {/* ===== Модалка редактирования/создания (с анимацией) ===== */}
                <AnimatePresence>
                    {isAdmin && edit.mode !== "none" && (
                        <motion.div
                            key="edit-modal"
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                            onMouseDown={(e) => {
                                if (e.target === e.currentTarget) setEdit({mode: "none"});
                            }}
                            initial={{backgroundColor: "rgba(0,0,0,0)"}}
                            animate={{backgroundColor: "rgba(0,0,0,0.40)"}}
                            exit={{backgroundColor: "rgba(0,0,0,0)"}}
                            transition={{duration: 0.18}}
                        >
                            <motion.div
                                initial={{opacity: 0, y: 12, scale: 0.98}}
                                animate={{opacity: 1, y: 0, scale: 1}}
                                exit={{opacity: 0, y: 8, scale: 0.98}}
                                transition={{type: "spring", stiffness: 420, damping: 32, mass: 0.6}}
                                className="w-full max-w-2xl rounded-2xl border bg-white p-6 shadow-xl dark:border-white/10 dark:bg-gray-700"
                            >
                                <div className="mb-4 text-lg font-semibold">
                                    {edit.mode === "edit" ? t("pp_modal_edit_title") : t("pp_modal_create_title")}
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    {edit.mode === "edit" && (
                                        <Field label={t("pp_field_id")}>
                                            <input
                                                type="number"
                                                value={edit.draft.id}
                                                disabled
                                                className="w-full cursor-not-allowed rounded-xl border px-3 py-2 opacity-70 dark:border-white/20 dark:bg-gray-700"
                                            />
                                        </Field>
                                    )}

                                    <Field label={t("pp_field_title")}>
                                        <input
                                            value={edit.draft.title}
                                            onChange={(e) => setDraft("title", e.currentTarget.value)}
                                            className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-gray-400"
                                        />
                                    </Field>

                                    <Field label={t("pp_field_brand")}>
                                        <input
                                            list="brands"
                                            value={edit.draft.brand}
                                            onChange={(e) => setDraft("brand", e.currentTarget.value)}
                                            className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-gray-400"
                                        />
                                        <datalist id="brands">
                                            {brands.map((b) => (
                                                <option key={b} value={b}/>
                                            ))}
                                        </datalist>
                                    </Field>

                                    <Field label={t("pp_field_price")}>
                                        <input
                                            type="number"
                                            value={edit.draft.price}
                                            onChange={(e) => setDraft("price", Number(e.currentTarget.value))}
                                            className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-gray-400"
                                        />
                                    </Field>

                                    <Field label={t("pp_field_inStock")}>
                                        <label className="inline-flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={edit.draft.inStock}
                                                onChange={(e) => setDraft("inStock", e.currentTarget.checked)}
                                            />
                                            {t("pp_field_inStock_checkbox")}
                                        </label>
                                    </Field>

                                    <Field label={t("pp_field_category")}>
                                        <input
                                            list="cats"
                                            value={edit.draft.category}
                                            onChange={(e) => setDraft("category", e.currentTarget.value)}
                                            className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-gray-400"
                                        />
                                        <datalist id="cats">
                                            {categories.map((c) => (
                                                <option key={c} value={c}/>
                                            ))}
                                        </datalist>
                                    </Field>

                                    <Field label={t("pp_field_subcategory")}>
                                        <input
                                            list="subs"
                                            value={edit.draft.subcategory}
                                            onChange={(e) => setDraft("subcategory", e.currentTarget.value)}
                                            className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-gray-400"
                                        />
                                        <datalist id="subs">
                                            {subcategories.map((s) => (
                                                <option key={s} value={s}/>
                                            ))}
                                        </datalist>
                                    </Field>
                                </div>

                                <div className="mt-6 flex flex-wrap items-center gap-2">
                                    {/* Подтвердить */}
                                    <button
                                        onClick={askSaveFromForm}
                                        className="rounded-xl !bg-green-600 px-4 py-2 text-sm font-medium !text-white
                                               hover:!bg-green-700 hover:shadow-lg
                                               focus:outline-none focus:ring-2 focus:ring-green-400 active:scale-[0.99]
                                               dark:bg-green-500 dark:hover:bg-green-400"
                                    >
                                        {t("pp_btn_save")}
                                    </button>

                                    {/* Отмена */}
                                    <button
                                        onClick={() => setEdit({mode: "none"})}
                                        className="rounded-xl border px-4 py-2 text-sm font-medium
                                               bg-white text-black shadow dark:hover:text-black dark:text-black
                                               hover:bg-black hover:text-white hover:shadow-lg
                                               focus:outline-none focus:ring-2 focus:ring-black/40 active:scale-[0.99]
                                               dark:bg-neutral-900 dark:hover:bg-black/70"
                                    >
                                        {t("pp_btn_cancel")}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ===== Модалка подтверждения (с анимацией) ===== */}
                <AnimatePresence>
                    {confirm.open && (
                        <motion.div
                            key="confirm-modal"
                            role="dialog"
                            aria-modal="true"
                            className="fixed inset-0 z-[120] flex items-center justify-center p-4"
                            onMouseDown={(e) => {
                                if (e.target === e.currentTarget) setConfirm({open: false});
                            }}
                            initial={{backgroundColor: "rgba(0,0,0,0)"}}
                            animate={{backgroundColor: "rgba(0,0,0,0.40)"}}
                            exit={{backgroundColor: "rgba(0,0,0,0)"}}
                            transition={{duration: 0.18}}
                        >
                            <motion.div
                                initial={{opacity: 0, y: 12, scale: 0.98}}
                                animate={{opacity: 1, y: 0, scale: 1}}
                                exit={{opacity: 0, y: 8, scale: 0.98}}
                                transition={{type: "spring", stiffness: 420, damping: 32, mass: 0.6}}
                                className="w-3/5 max-w-md rounded-2xl border bg-white p-5 shadow-xl dark:border-white/10 dark:bg-neutral-900"
                            >
                                <div className="text-lg font-semibold">
                                    {confirm.kind === "delete" && t("pp_confirm_delete_title")}
                                    {confirm.kind === "save-edit" && t("pp_confirm_saveEdit_title")}
                                    {confirm.kind === "save-create" && t("pp_confirm_saveCreate_title")}
                                </div>

                                <div className="mt-3 text-sm text-gray-700 dark:text-gray-200">
                                    {confirm.kind === "delete" && (
                                        <>
                                            {t("pp_confirm_delete_desc")} «{confirm.product.title}»
                                        </>
                                    )}
                                    {confirm.kind === "save-edit" && (
                                        <>
                                            {t("pp_confirm_saveEdit_desc")} «{confirm.draft.title || `#${confirm.draft.id}`}»
                                        </>
                                    )}
                                    {confirm.kind === "save-create" && (
                                        <>
                                            {t("pp_confirm_saveCreate_desc")} «{confirm.draft.title || t("pp_field_title")}»
                                        </>
                                    )}
                                </div>

                                <div className="mt-6 flex justify-end gap-2">
                                    <button
                                        onClick={() => setConfirm({open: false})}
                                        className="rounded-xl border px-4 py-2 text-sm font-medium
                                               bg-white text-black shadow
                                               hover:bg-black hover:text-black hover:shadow-lg
                                               focus:outline-none focus:ring-2 focus:ring-black/40 active:scale-[0.99]
                                               dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text:white dark:hover:text-black"
                                    >
                                        {t("pp_confirm_btn_cancel")}
                                    </button>

                                    <button
                                        onClick={handleConfirm}
                                        className="rounded-xl px-4 py-2 text-sm font-medium text-white shadow-sm
                                                   focus:outline-none focus:ring-2 active:scale-[0.99]
                                                   !bg-rose-600 hover:!bg-rose-700 focus:ring-rose-400"
                                    >
                                        {confirm.kind === "delete"
                                            ? t("pp_confirm_btn_delete")
                                            : t("pp_confirm_btn_save")}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Container>
        </section>
    );
}

/* ========= Мини-компоненты ========= */

function Th({
                children,
                className = "",
                sortable,
                sortKey,
                currentKey,
                sortDir,
                onSort,
            }: {
    children: React.ReactNode;
    className?: string;
    sortable?: boolean;
    sortKey?: keyof Product;
    currentKey?: keyof Product | null;
    sortDir?: "asc" | "desc";
    onSort?: (key: keyof Product) => void;
}) {
    const isClickable = !!(sortable && sortKey && onSort);
    const active = currentKey === sortKey;

    return (
        <th
            className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isClickable ? "cursor-pointer select-none" : ""} ${className}`}
            onClick={isClickable ? () => onSort!(sortKey!) : undefined}
            role={isClickable ? "button" : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onKeyDown={isClickable ? (e) => {
                if (e.key === "Enter" || e.key === " ") onSort!(sortKey!);
            } : undefined}
            aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
            title={isClickable ? (active ? (sortDir === "asc" ? "▲" : "▼") : "↕") : undefined}
        >
            <div className="flex items-center gap-1">
                {children}
                {isClickable && (
                    <span className="text-[10px] opacity-70">
            {active ? (sortDir === "asc" ? "▲" : "▼") : "↕"}
          </span>
                )}
            </div>
        </th>
    );
}

function Td({
                children,
                className = "",
                colSpan,
            }: {
    children: React.ReactNode;
    className?: string;
    colSpan?: number;
}) {
    return (
        <td colSpan={colSpan} className={`px-4 py-3 align-middle ${className}`}>
            {children}
        </td>
    );
}

function Field({label, children}: { label: string; children: React.ReactNode }) {
    return (
        <label className="block">
            <div className="mb-1 text-sm font-medium">{label}</div>
            {children}
        </label>
    );
}

function LabelValue({label, value}: { label: string; value: React.ReactNode }) {
    return (
        <div className="rounded-xl border p-2 text-xs dark:border-white/10">
            <div className="mb-1 text-[11px] uppercase text-gray-500 dark:text-gray-400">{label}</div>
            <div className="font-medium text-gray-900 dark:text-gray-200">{value}</div>
        </div>
    );
}

function Badge({children, ok = false}: { children: React.ReactNode; ok?: boolean }) {
    return ok ? (
        <span
            className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
      {children}
    </span>
    ) : (
        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
      {children}
    </span>
    );
}

function ActionBtn({
                       children,
                       onClick,
                       danger,
                       className = "",
                   }: {
    children: React.ReactNode;
    onClick?: () => void;
    danger?: boolean;
    className?: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition
        ${
                danger
                    ? "!bg-rose-600 !text-white hover:!bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400"
                    : "border text-black border-gray-300 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            }
        ${className}`}
        >
            {children}
        </button>
    );
}

function PaginationControls({
                                className = "",
                                page,
                                size,
                                totalPages,
                                onPrev,
                                onNext,
                                onSizeChange,
                            }: {
    className?: string;
    page: number;
    size: number;
    totalPages: number | null;
    onPrev: () => void;
    onNext: () => void;
    onSizeChange: (n: number) => void;
}) {
    const hasPrev = page > 0;
    const hasNext = totalPages != null ? page < totalPages - 1 : false;

    const {t} = useI18n();

    return (
        <div className={`mt-5 flex flex-wrap items-center justify-end gap-3 ${className}`}>
            <label className="flex items-center gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-300">{t("pp_pager_perPageLabel")}</span>
                <select
                    className="rounded-lg border px-2 py-1 text-sm dark:border-white/20 dark:bg-black"
                    value={size}
                    onChange={(e) => onSizeChange(Number(e.currentTarget.value))}
                >
                    {[10, 20, 50].map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </label>

            {totalPages != null && totalPages > 1 && (
                <div className="flex items-center gap-2">
                    <button
                        onClick={onPrev}
                        disabled={!hasPrev}
                        className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50 dark:border-white/20 dark:text-black"
                    >
                        {t("pp_pager_prev")}
                    </button>
                    <span className="text-sm tabular-nums text-gray-600 dark:text-gray-300">
            {page + 1} / {totalPages}
          </span>
                    <button
                        onClick={onNext}
                        disabled={!hasNext}
                        className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50 dark:border-white/20 dark:text-black"
                    >
                        {t("pp_pager_next")}
                    </button>
                </div>
            )}
        </div>
    );
}
