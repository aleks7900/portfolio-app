import React, {useEffect, useMemo, useState} from "react";
import type {Product} from "../../data/types.ts";
import {useAuth} from "../../shared/auth/auth.tsx";
import {
    createProduct,
    deleteProductById,
    listProducts,
    type ProductQuery,
    updateProduct
} from "../../shared/api/repo.ts";
import Container from "../../shared/Container.tsx";


// ——— состояния редактирования / подтверждения ———
type EditState =
    | { mode: "none" }
    | { mode: "edit"; draft: Product }
    | { mode: "create"; draft: Product };

type ConfirmState =
    | { open: false }
    | { open: true; kind: "delete"; product: Product }
    | { open: true; kind: "save-edit"; draft: Product }
    | { open: true; kind: "save-create"; draft: Product };

// ——— хелперы ———
const emptyProduct = (): Product => ({
    id: 0,            // сервер сгенерирует; можно не показывать поле ввода ID
    title: "",
    brand: "",
    price: 0,
    inStock: true,
    category: "",
    subcategory: "",
});

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
}

function PaginationControls({
                                page,
                                size,
                                totalPages,            // null → скрываем next/prev
                                onPrev,
                                onNext,
                                onSizeChange,
                            }: {
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
        <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
            <label className="flex items-center gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-300">Показывать по:</span>
                <select
                    className="rounded-lg border px-2 py-1 text-sm dark:border-white/20 dark:bg-black"
                    value={size}
                    onChange={(e) => onSizeChange(Number(e.currentTarget.value))}
                >
                    {[10, 20, 50].map((s) => (
                        <option key={s} value={s}>{s}</option>
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

export default function ProductsPrivate() {
    const {user} = useAuth();
    const isAdmin = !!user?.isAdmin;

    // данные с бэка
    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    // локальные UI состояния
    const [query, setQuery] = useState("");
    const [confirm, setConfirm] = useState<ConfirmState>({open: false});
    const [edit, setEdit] = useState<EditState>({mode: "none"});

    // пример базовой пагинации на клиенте (если на бэке её нет — можно убрать)
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);

    const [totalPages, setTotalPages] = useState<number | null>(null);

    const isMobile = useMediaQuery("(max-width: 1024px)");

    // ——— загрузка списка (вместо localStorage/SEED) ———
    async function fetchProducts() {
        setLoading(true);
        setErr(null);
        try {
            const params: ProductQuery = {q: query || undefined, page, size};
            const data = await listProducts(params);
            // Поддержим 2 схемы: Page<Product> ИЛИ Product[]
            // поддерживаем оба варианта: Page<Product> ИЛИ Product[]
            if (Array.isArray(data)) {
                // массив без метаданных — пагинацию показать нельзя
                setItems(data);
                setTotalPages(null);
            } else {
                // Spring Data Page<T>

                console.log(data);
                console.log(data.content);

                setItems(data.content);
                setTotalPages(typeof data.totalPages === "number" ? data.totalPages : null);
                // синхронизируем номер/размер страницы, если бэк их вернул
                if (typeof data.number === "number") setPage(data.number);
                if (typeof data.size === "number") setSize(data.size);
            }
            // если это Page — можно читать totalPages и пр. из data
        } catch (e: unknown) {
            if (e instanceof Error) {
                setErr(e.message);
            } else {
                setErr("Ошибка загрузки");
            }
        } finally {
            setLoading(false); // ← ВАЖНО: снимаем индикатор загрузки
        }
    }

    useEffect(() => {
        fetchProducts();
        // при внешних изменениях обновим список
        const onUpdated = () => fetchProducts();
        window.addEventListener("products:updated", onUpdated as EventListener);
        return () => window.removeEventListener("products:updated", onUpdated as EventListener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, page, size]);

    const filtered = useMemo(() => items, [items]); // фильтрацию теперь делает бэк (по query)

    // useMemo(
    //     () => Array.from(new Set(items.map((p) => p.brand))).filter(Boolean).sort(),
    //     [items]
    // );
    // useMemo(
    //     () => Array.from(new Set(items.map((p) => p.category))).filter(Boolean).sort(),
    //     [items]
    // );
    // useMemo(
    //     () => Array.from(new Set(items.map((p) => p.subcategory))).filter(Boolean).sort(),
    //     [items]
    // );

    const startCreate = () => {
        if (!isAdmin) return;
        setEdit({mode: "create", draft: emptyProduct()});
    };

    const startEdit = (p: Product) => {
        if (!isAdmin) return;
        setEdit({mode: "edit", draft: {...p}});
    };

    const askRemove = (p: Product) =>
        isAdmin && setConfirm({open: true, kind: "delete", product: p});

    const setDraft = <K extends keyof Product>(key: K, val: Product[K]) => {
        if (edit.mode === "none") return;
        setEdit({...edit, draft: {...edit.draft, [key]: val}});
    };

    const askSaveFromForm = () => {
        if (edit.mode === "edit") setConfirm({open: true, kind: "save-edit", draft: edit.draft});
        if (edit.mode === "create") setConfirm({open: true, kind: "save-create", draft: edit.draft});
    };

    const handleConfirm = async () => {
        if (!confirm.open) return;
        try {
            if (confirm.kind === "delete") {
                await deleteProductById(confirm.product.id);
            } else if (confirm.kind === "save-edit") {
                await updateProduct(confirm.draft);
            } else if (confirm.kind === "save-create") {
                // убираем id из объекта
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {id: _omit, ...withoutId} = confirm.draft;
                await createProduct(withoutId);
            }
            window.dispatchEvent(new CustomEvent("products:updated"));
            setConfirm({open: false});
            setEdit({mode: "none"});
        } catch (e: unknown) {
            if (e instanceof Error) {
                alert(e.message);
            } else {
                alert("Ошибка сохранения");
            }
        }
    };

    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <Container>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        {isAdmin ? "Мои продукты (админ)" : "Мои продукты"}
                    </h2>

                    <div className="flex w-full items-center gap-2 sm:w-auto">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.currentTarget.value)}
                            placeholder="Поиск (id, название, бренд, категория)"
                            className="w-full sm:w-72 rounded-xl border px-3 py-2 text-sm dark:bg-black dark:border-white/20"
                        />
                        {isAdmin && (
                            <button
                                onClick={startCreate}
                                className="shrink-0 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
                            >
                                Новый продукт
                            </button>
                        )}
                    </div>
                </div>

                {/* Статусы */}
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
                                    <tr><Td colSpan={8} className="py-10 text-center text-gray-500">Загрузка…</Td></tr>
                                ) : filtered.length === 0 ? (
                                    <tr><Td colSpan={8} className="py-10 text-center text-gray-500">Ничего не
                                        найдено</Td></tr>
                                ) : (
                                    filtered.map((p) => (
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
                            ) : filtered.length === 0 ? (
                                <div
                                    className="rounded-2xl border p-6 text-center text-sm text-gray-500 dark:border-white/10">
                                    Ничего не найдено
                                </div>
                            ) : (
                                filtered.map((p) => (
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
                                {/* ID показываем только в режиме edit */}
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
                                        value={edit.draft.brand}
                                        onChange={(e) => setDraft("brand", e.currentTarget.value)}
                                        className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-black"
                                    />
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
                                        value={edit.draft.category}
                                        onChange={(e) => setDraft("category", e.currentTarget.value)}
                                        className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-black"
                                    />
                                </Field>

                                <Field label="Подкатегория">
                                    <input
                                        value={edit.draft.subcategory}
                                        onChange={(e) => setDraft("subcategory", e.currentTarget.value)}
                                        className="w-full rounded-xl border px-3 py-2 dark:border-white/20 dark:bg-black"
                                    />
                                </Field>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-2">
                                <button
                                    onClick={askSaveFromForm}
                                    className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                >
                                    Сохранить
                                </button>
                                <button
                                    onClick={() => setEdit({mode: "none"})}
                                    className="rounded-xl border px-4 py-2 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
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
                            className="relative w-full max-w-md rounded-2xl border bg-white p-5 shadow-xl dark:border-white/10 dark:bg-neutral-900">
                            <div className="text-lg font-semibold">
                                {confirm.kind === "delete" && "Удалить продукт?"}
                                {confirm.kind === "save-edit" && "Сохранить изменения?"}
                                {confirm.kind === "save-create" && "Добавить продукт?"}
                            </div>
                            <div className="mt-3 text-sm text-gray-700 dark:text-gray-200">
                                {confirm.kind === "delete" && <>Вы действительно хотите
                                    удалить <b>{confirm.product.title}</b>?</>}
                                {confirm.kind === "save-edit" && <>Сохранить изменения
                                    для <b>{confirm.draft.title || `#${confirm.draft.id}`}</b>?</>}
                                {confirm.kind === "save-create" && <>Добавить новый
                                    продукт <b>{confirm.draft.title || "без названия"}</b>?</>}
                            </div>
                            <div className="mt-6 flex justify-end gap-2">
                                <button
                                    onClick={() => setConfirm({open: false})}
                                    className="rounded-xl border px-4 py-2 text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                                >
                                    Отмена
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                >
                                    Подтвердить
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </section>
    );
}

/* ——— мини-компоненты ——— */
function Th({children, className = ""}: { children: React.ReactNode; className?: string }) {
    return <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${className}`}>{children}</th>;
}

function Td({children, className = "", colSpan}: { children: React.ReactNode; className?: string; colSpan?: number; }) {
    return <td colSpan={colSpan} className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
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

function ActionBtn({children, onClick, danger, className = ""}: {
    children: React.ReactNode;
    onClick?: () => void;
    danger?: boolean;
    className?: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition
        ${danger ? "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400"
                : "border border-gray-300 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"}
        ${className}`}
        >
            {children}
        </button>
    );
}
