import React, {useMemo, useState} from "react";
import Container from "../shared/Container";
import type {Product} from "../catalog/types";
import {loadAdminProducts, PRODUCTS as SEED, saveAdminProducts} from "../catalog/data";
import {useAuth} from "../shared/auth.tsx";

type EditState =
    | { mode: "none" }
    | { mode: "edit"; draft: Product; index: number }
    | { mode: "create"; draft: Product };

const emptyProduct = (idHint: number): Product => ({
    id: idHint,
    title: "",
    brand: "",
    price: 0,
    inStock: true,
    category: "",
    subcategory: "",
});

export default function ProductsPrivate() {
    const [items, setItems] = useState<Product[]>(() => loadAdminProducts(SEED));
    const [edit, setEdit] = useState<EditState>({mode: "none"});
    const [query, setQuery] = useState("");

    const {user} = useAuth();            // ← кто вошёл
    const isAdmin = !!user?.isAdmin;       // ← права

    const brands = useMemo(
        () => Array.from(new Set(items.map((p) => p.brand))).filter(Boolean).sort(),
        [items]
    );
    const categories = useMemo(
        () => Array.from(new Set(items.map((p) => p.category))).filter(Boolean).sort(),
        [items]
    );
    const subcategories = useMemo(
        () => Array.from(new Set(items.map((p) => p.subcategory))).filter(Boolean).sort(),
        [items]
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return items;
        return items.filter(
            (p) =>
                String(p.id).includes(q) ||
                p.title.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.subcategory.toLowerCase().includes(q)
        );
    }, [items, query]);

    const startCreate = () => {
        if (!isAdmin) return;                // защита
        const nextId = Math.max(0, ...items.map((p) => p.id)) + 1;
        setEdit({mode: "create", draft: emptyProduct(nextId)});
    };

    const startEdit = (idx: number) => isAdmin && setEdit({mode: "edit", draft: {...items[idx]}, index: idx});

    const remove = (idx: number) => {
        if (!isAdmin) return;
        const next = items.slice();
        next.splice(idx, 1);
        setItems(next);
        saveAdminProducts(next);
    };

    const save = () => {
        if (edit.mode === "none") return;
        const next = items.slice();
        if (edit.mode === "edit") {
            next[edit.index] = edit.draft;
        } else {
            next.push(edit.draft);
        }
        setItems(next);
        saveAdminProducts(next);
        setEdit({mode: "none"});
    };

    const setDraft = <K extends keyof Product>(key: K, val: Product[K]) => {
        if (edit.mode === "none") return;
        setEdit({...edit, draft: {...edit.draft, [key]: val}});
    };

    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <Container>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        {isAdmin ? "Мои продукты (админ)" : "Мои продукты"}
                    </h2>

                    <div className="flex items-center gap-2">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.currentTarget.value)}
                            placeholder="Поиск (id, название, бренд, категория)"
                            className="w-72 max-w-full rounded-xl border px-3 py-2 text-sm dark:bg-black dark:border-white/20"
                        />
                        {isAdmin && (
                            <button
                                onClick={startCreate}
                                className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
                            >
                                Новый продукт
                            </button>
                        )}
                    </div>
                </div>

                {/* Таблица */}
                <div className="mt-6 overflow-x-auto rounded-2xl border dark:border-white/10">
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
                        {filtered.map((p, idx) => (
                            <tr key={p.id} className="hover:bg-black/5 dark:hover:bg-white/5">
                                <Td>{p.id}</Td>
                                <Td className="font-medium">{p.title}</Td>
                                <Td>{p.brand}</Td>
                                <Td>${p.price}</Td>
                                <Td>
                                    {p.inStock ? (
                                        <span
                                            className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                        да
                      </span>
                                    ) : (
                                        <span
                                            className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                        нет
                      </span>
                                    )}
                                </Td>
                                <Td>{p.category}</Td>
                                <Td>{p.subcategory}</Td>
                                <Td className="text-right">
                                    {isAdmin ? (
                                        <>
                                            <button
                                                onClick={() => startEdit(idx)}
                                                className="rounded-lg border px-3 py-1 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                                            >
                                                Редактировать
                                            </button>
                                            <button
                                                onClick={() => remove(idx)}
                                                className="ml-2 rounded-lg border px-3 py-1 text-rose-600 hover:bg-rose-50 dark:border-white/20 dark:hover:bg-rose-500/10"
                                            >
                                                Удалить
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-gray-400">Только просмотр</span>
                                    )}
                                </Td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <Td colSpan={8} className="text-center py-8 text-gray-500">
                                    Ничего не найдено
                                </Td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Модалка редактирования/создания */}
                {isAdmin && edit.mode !== "none" && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
                        <div
                            className="w-full max-w-2xl rounded-2xl border bg-white p-6 shadow-xl dark:bg-black dark:border-white/10">
                            <div className="mb-4 text-lg font-semibold">
                                {edit.mode === "edit" ? "Редактировать товар" : "Новый товар"}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="ID">
                                    <input
                                        type="number"
                                        value={edit.draft.id}
                                        onChange={(e) => setDraft("id", Number(e.currentTarget.value))}
                                        className="w-full rounded-xl border px-3 py-2 dark:bg-black dark:border-white/20"
                                    />
                                </Field>

                                <Field label="Название">
                                    <input
                                        value={edit.draft.title}
                                        onChange={(e) => setDraft("title", e.currentTarget.value)}
                                        className="w-full rounded-xl border px-3 py-2 dark:bg-black dark:border-white/20"
                                    />
                                </Field>

                                <Field label="Бренд">
                                    <input
                                        list="brands"
                                        value={edit.draft.brand}
                                        onChange={(e) => setDraft("brand", e.currentTarget.value)}
                                        className="w-full rounded-xl border px-3 py-2 dark:bg-black dark:border-white/20"
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
                                        className="w-full rounded-xl border px-3 py-2 dark:bg-black dark:border-white/20"
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
                                        className="w-full rounded-xl border px-3 py-2 dark:bg-black dark:border-white/20"
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
                                        className="w-full rounded-xl border px-3 py-2 dark:bg-black dark:border-white/20"
                                    />
                                    <datalist id="subs">
                                        {subcategories.map((s) => (
                                            <option key={s} value={s}/>
                                        ))}
                                    </datalist>
                                </Field>
                            </div>

                            <div className="mt-6 flex items-center gap-2">
                                <button
                                    onClick={save}
                                    className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                >
                                    Сохранить
                                </button>
                                <button
                                    onClick={() => setEdit({mode: "none"})}
                                    className="rounded-xl border px-4 py-2 text-sm hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black"
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </section>
    );
}

/* ——— мини-компоненты для таблицы/формы ——— */
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