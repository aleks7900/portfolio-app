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


/* =========================
   ВСПОМОГАТЕЛЬНЫЕ ТИПЫ/ХЕЛПЕРЫ
   ========================= */

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
    id: 0, // сервер создаст
    title: "",
    brand: "",
    price: 0,
    inStock: true,
    category: "",
    subcategory: "",
});

function toNum(v: unknown, def = 0) {
    return typeof v === "number" ? v : def;
}

/* =========================
   ОСНОВНОЙ КОМПОНЕНТ
   ========================= */

export default function ProductsPrivate() {
    const {user} = useAuth();
    const isAdmin = !!user?.isAdmin;

    // список
    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [err, setErr] = useState<string | null>(null);

    // фильтр по строке (серверный q)
    const [query, setQuery] = useState<string>("");

    // пагинация (0-based)
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(20);
    const [totalPages, setTotalPages] = useState<number | null>(null);

    // редактирование / подтверждение
    const [edit, setEdit] = useState<EditState>({mode: "none"});
    const [confirm, setConfirm] = useState<ConfirmState>({open: false});

    // подсказочные списки
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

    // загрузка с бэка
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
            setErr(e instanceof Error ? e.message : "Ошибка загрузки");
        } finally {
            setLoading(false);
        }
    }, [query, page, size]);

    useEffect(() => {
        fetchProducts();
        const onUpdated = () => fetchProducts();
        window.addEventListener("products:updated", onUpdated as EventListener);
        return () => window.removeEventListener("products:updated", onUpdated as EventListener);
    }, [fetchProducts]);

    // действия
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
            const {id: _omit, ...withoutId} = draft; // сервер сгенерирует id
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
            alert(e instanceof Error ? e.message : "Ошибка сохранения");
        }
    };

    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <Container>
                {/* Заголовок + поиск + новая запись */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        {isAdmin ? "Мои продукты (админ)" : "Мои продукты"}
                    </h2>

                    <div className="flex w-full items-center gap-2 sm:w-auto">
                        <input
                            value={query}
                            onChange={(e) => {
                                setPage(0);
                                setQuery(e.currentTarget.value);
                            }}
                            placeholder="Поиск (id, название, бренд, категория)"
                            className="w-full sm:w-72 rounded-xl border px-3 py-2 text-sm dark:bg-black dark:border-white/20"
                        />
                        {isAdmin && (
                            <button
                                onClick={startCreate}
                                className="shrink-0 rounded-xl !bg-gray-900 px-4 py-2 text-sm font-medium !text-white
                                         hover:!bg-yellow-500 hover:!text-black hover:shadow-lg
                                         focus:outline-none focus:ring-2 focus:ring-yellow-400 active:scale-[0.99]
                                         dark:bg-white dark:text-black dark:hover:bg-yellow-400"
                            >
                                Новый продукт
                            </button>

                        )}
                    </div>
                </div>

                {/* Статус */}
                {err && (
                    <div
                        className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-200">
                        {err}
                    </div>
                )}

                {!isMobile ? (
                    <Container>
                        {/* ——— Desktop: таблица (>= sm) ——— */}
                        <div className="mt-6 overflow-x-auto rounded-2xl border dark:border-white/10 sm:block">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-600 dark:bg-white/5 dark:text-gray-300">
                                <tr>
                                    <Th>ID</Th>
                                    <Th>Название</Th>
                                    <Th>Бренд</Th>
                                    <Th>Цена</Th>
                                    <Th>Наличие</Th>
                                    <Th>Категория</Th>
                                    <Th>Подкатегория</Th>
                                    <Th className="text-right">Действия</Th>
                                </tr>
                                </thead>
                                <tbody className="divide-y dark:divide-white/10">
                                {loading ? (
                                    <tr>
                                        <Td colSpan={8} className="py-10 text-center text-gray-500">
                                            Загрузка…
                                        </Td>
                                    </tr>
                                ) : items.length === 0 ? (
                                    <tr>
                                        <Td colSpan={8} className="py-10 text-center text-gray-500">
                                            Ничего не найдено
                                        </Td>
                                    </tr>
                                ) : (
                                    items.map((p) => (
                                        <tr key={p.id} className="hover:bg-black/5 dark:hover:bg-white/5">
                                            <Td>{p.id}</Td>
                                            <Td className="font-medium">{p.title}</Td>
                                            <Td>{p.brand}</Td>
                                            <Td>${p.price}</Td>
                                            <Td>{p.inStock ? <Badge ok>да</Badge> : <Badge>нет</Badge>}</Td>
                                            <Td>{p.category}</Td>
                                            <Td>{p.subcategory}</Td>
                                            <Td className="text-right">
                                                {isAdmin ? (
                                                    <>
                                                        <ActionBtn
                                                            onClick={() => startEdit(p)}>Редактировать</ActionBtn>
                                                        <ActionBtn danger className="ml-2" onClick={() => askRemove(p)}>
                                                            Удалить
                                                        </ActionBtn>
                                                    </>
                                                ) : (
                                                    <span className="text-gray-400">Только просмотр</span>
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
                        {/* ——— Mobile: карточки ( < sm ) ——— */}
                        <div className="mt-6 space-y-3 sm:hidden">
                            {loading ? (
                                <div
                                    className="rounded-2xl border p-6 text-center text-sm text-gray-500 dark:border-white/10">
                                    Загрузка…
                                </div>
                            ) : items.length === 0 ? (
                                <div
                                    className="rounded-2xl border p-6 text-center text-sm text-gray-500 dark:border-white/10">
                                    Ничего не найдено
                                </div>
                            ) : (
                                items.map((p) => (
                                    <div key={p.id}
                                         className="rounded-2xl border p-4 shadow-sm dark:border-white/10 dark:bg-black/40">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="text-base font-semibold leading-tight">{p.title}</div>
                                                <div
                                                    className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">ID: {p.id}</div>
                                            </div>
                                            <div className="shrink-0">{p.inStock ? <Badge ok>в наличии</Badge> :
                                                <Badge>нет</Badge>}</div>
                                        </div>
                                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                            <LabelValue label="Бренд" value={p.brand || "—"}/>
                                            <LabelValue label="Цена" value={`$${p.price}`}/>
                                            <LabelValue label="Категория" value={p.category || "—"}/>
                                            <LabelValue label="Подкатегория" value={p.subcategory || "—"}/>
                                        </div>
                                        {isAdmin && (
                                            <div className="mt-3 flex flex-wrap justify-end gap-2">
                                                <ActionBtn onClick={() => startEdit(p)}>Редактировать</ActionBtn>
                                                <ActionBtn danger onClick={() => askRemove(p)}>Удалить</ActionBtn>
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

                {/* Модалка редактирования/создания */}
                {isAdmin && edit.mode !== "none" && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
                        <div
                            className="w-full max-w-2xl rounded-2xl border bg-white p-6 shadow-xl dark:border-white/10 dark:bg-black">
                            <div className="mb-4 text-lg font-semibold">
                                {edit.mode === "edit" ? "Редактировать товар" : "Новый товар"}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {edit.mode === "edit" && (
                                    <Field label="ID">
                                        <input
                                            type="number"
                                            value={edit.draft.id}
                                            disabled
                                            className="w-full cursor-not-allowed rounded-xl border px-3 py-2 opacity-70 dark:border-white/20 dark:bg-black"
                                        />
                                    </Field>
                                )}

                                <Field label="Название">
                                    <input
                                        value={edit.draft.title}
                                        onChange={(e) => setDraft("title", e.currentTarget.value)}
                                        className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-black"
                                    />
                                </Field>

                                <Field label="Бренд">
                                    <input
                                        list="brands"
                                        value={edit.draft.brand}
                                        onChange={(e) => setDraft("brand", e.currentTarget.value)}
                                        className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-black"
                                    />
                                    <datalist id="brands">
                                        {brands.map((b) => (
                                            <option key={b} value={b}/>
                                        ))}
                                    </datalist>
                                </Field>

                                <Field label="Цена">
                                    <input
                                        type="number"
                                        value={edit.draft.price}
                                        onChange={(e) => setDraft("price", Number(e.currentTarget.value))}
                                        className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-black"
                                    />
                                </Field>

                                <Field label="Наличие">
                                    <label className="inline-flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={edit.draft.inStock}
                                            onChange={(e) => setDraft("inStock", e.currentTarget.checked)}
                                        />
                                        есть на складе
                                    </label>
                                </Field>

                                <Field label="Категория">
                                    <input
                                        list="cats"
                                        value={edit.draft.category}
                                        onChange={(e) => setDraft("category", e.currentTarget.value)}
                                        className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-black"
                                    />
                                    <datalist id="cats">
                                        {categories.map((c) => (
                                            <option key={c} value={c}/>
                                        ))}
                                    </datalist>
                                </Field>

                                <Field label="Подкатегория">
                                    <input
                                        list="subs"
                                        value={edit.draft.subcategory}
                                        onChange={(e) => setDraft("subcategory", e.currentTarget.value)}
                                        className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-black"
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
                                    Сохранить
                                </button>

                                {/* Отмена */}
                                <button
                                    onClick={() => setEdit({mode: "none"})}
                                    className="rounded-xl border px-4 py-2 text-sm font-medium
                                           !bg-white !text-black shadow
                                           hover:!bg-black hover:!text-white hover:shadow-lg
                                           focus:outline-none focus:ring-2 focus:ring-black/40 active:scale-[0.99]
                                           dark:bg-neutral-900 dark:text-white dark:hover:bg-black"
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Модалка подтверждения */}
                {confirm.open && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        className="fixed inset-0 z-[120] flex items-center justify-center p-4"
                        onMouseDown={(e) => {
                            if (e.target === e.currentTarget) setConfirm({open: false});
                        }}
                    >
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"/>
                        <div
                            className="relative w-3/5 max-w-md rounded-2xl border bg-white p-5 shadow-xl dark:border-white/10 dark:bg-neutral-900">
                            <div className="text-lg font-semibold">
                                {confirm.kind === "delete" && "Удалить продукт?"}
                                {confirm.kind === "save-edit" && "Сохранить изменения?"}
                                {confirm.kind === "save-create" && "Добавить продукт?"}
                            </div>

                            <div className="mt-3 text-sm text-gray-700 dark:text-gray-200">
                                {confirm.kind === "delete" && (
                                    <>Вы действительно хотите удалить <b>{confirm.product.title}</b>?</>
                                )}
                                {confirm.kind === "save-edit" && (
                                    <>Сохранить изменения для <b>{confirm.draft.title || `#${confirm.draft.id}`}</b>?</>
                                )}
                                {confirm.kind === "save-create" && (
                                    <>Добавить новый продукт <b>{confirm.draft.title || "без названия"}</b>?</>
                                )}
                            </div>

                            <div className="mt-6 flex justify-end gap-2">
                                {/* Отмена */}
                                <button
                                    onClick={() => setConfirm({open: false})}
                                    className="rounded-xl border px-4 py-2 text-sm font-medium
                                               !bg-white !text-black shadow
                                               hover:!bg-black hover:!text-white hover:shadow-lg
                                               focus:outline-none focus:ring-2 focus:ring-black/40 active:scale-[0.99]
                                               dark:bg-neutral-900 dark:text-white dark:hover:bg-black"
                                >
                                    Отмена
                                </button>

                                {/* Удалить */}
                                <button
                                    onClick={handleConfirm}
                                    className="rounded-xl !bg-rose-600 px-4 py-2 text-sm font-medium !text-white
                                               hover:!bg-rose-700 hover:shadow-lg
                                               focus:outline-none focus:ring-2 focus:ring-rose-400 active:scale-[0.99]"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </section>
    );
}

/* =========================
   МИНИ-КОМПОНЕНТЫ
   ========================= */

function Th({children, className = ""}: { children: React.ReactNode; className?: string }) {
    return <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${className}`}>{children}</th>;
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
                    : "border border-gray-300 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
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

    return (
        <div className={`flex flex-wrap items-center justify-end gap-3 ${className}`}>
            <label className="flex items-center gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-300">Показывать по:</span>
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
                        className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50 dark:border-white/20"
                    >
                        ◀ Пред
                    </button>
                    <span className="text-sm tabular-nums text-gray-600 dark:text-gray-300">
            {page + 1} / {totalPages}
          </span>
                    <button
                        onClick={onNext}
                        disabled={!hasNext}
                        className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50 dark:border-white/20"
                    >
                        След ▶
                    </button>
                </div>
            )}
        </div>
    );
}
