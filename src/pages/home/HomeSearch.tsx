import React, {useEffect, useMemo, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {useNavigate} from "react-router-dom";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import type {Product} from "../../data/types.ts";
import {suggestProducts} from "../../shared/api/repo.ts";
import Container from "../../shared/Container.tsx";
import {Search} from "lucide-react";

// Если нет вашего i18n-хука, замени на простую функцию:
// const t = (_k: string, d: string) => d;

function useAnchorRect<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [rect, setRect] = useState<DOMRect | null>(null);

    useEffect(() => {
        const update = () => {
            if (ref.current) setRect(ref.current.getBoundingClientRect());
        };
        update();
        window.addEventListener("resize", update);
        window.addEventListener("scroll", update, true);
        return () => {
            window.removeEventListener("resize", update);
            window.removeEventListener("scroll", update, true);
        };
    }, []);

    return {ref, rect, refresh: () => ref.current && setRect(ref.current.getBoundingClientRect())};
}

function useDebounced<T>(value: T, delay = 250) {
    const [v, setV] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setV(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return v;
}

export default function HomeSearch() {
    const {t} = useI18n();

    // если перевода нет и t возвращает сам ключ — показываем fallback
    const tf = (key: string, fallback: string) => {
        const v = t(key);
        return v === key || !v ? fallback : v;
    };

    const navigate = useNavigate();

    const [q, setQ] = useState("");
    const qDebounced = useDebounced(q, 250);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [activeIdx, setActiveIdx] = useState<number>(-1);

    const {ref: inputRef, rect} = useAnchorRect<HTMLInputElement>();

    // грузим подсказки с бэка
    useEffect(() => {
        let cancelled = false;

        async function load() {
            const query = qDebounced.trim();
            if (!query) {
                if (!cancelled) {
                    setSuggestions([]);
                    setOpen(false);
                    setActiveIdx(-1);
                }
                return;
            }
            setLoading(true);
            try {
                const items = await suggestProducts(query, 8);
                if (!cancelled) {
                    setSuggestions(items);
                    setOpen(items.length > 0);
                    setActiveIdx(items.length ? 0 : -1);
                }
            } catch {
                if (!cancelled) {
                    setSuggestions([]);
                    setOpen(false);
                    setActiveIdx(-1);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [qDebounced]);

    // закрытие по клику вне
    // 1) refs
    const menuRef = useRef<HTMLDivElement | null>(null);

// 2) Вне-клик — по "click" и с проверкой на меню
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!open) return;
            const target = e.target as Node;
            // если клик внутри инпута или меню — не закрываем
            if (
                (inputRef.current && inputRef.current.contains(target)) ||
                (menuRef.current && menuRef.current.contains(target))
            ) {
                return;
            }
            setOpen(false);
        };
        document.addEventListener("click", onDocClick);  // ⬅ было mousedown
        return () => document.removeEventListener("click", onDocClick);
    }, [open, inputRef]);

    const submit = (query: string) => {
        const usp = new URLSearchParams();
        if (query.trim()) usp.set("q", query.trim());
        usp.set("page", "0");
        usp.set("size", "12");
        navigate(`/catalog?${usp.toString()}`);
        setOpen(false);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            setOpen(false);
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setActiveIdx((i) => Math.min((suggestions.length ? i : -1) + 1, suggestions.length - 1));
            return;
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIdx((i) => Math.max(i - 1, 0));
            return;
        }
        if (e.key === "Enter") {
            e.preventDefault();
            if (open && activeIdx >= 0 && activeIdx < suggestions.length) {
                const s = suggestions[activeIdx];
                submit(s.title); // при желании можно подставить бренд/категорию
            } else {
                submit(q);
            }
        }
    };

    // позиция портала (под input)
    const portalStyle: React.CSSProperties | undefined = useMemo(() => {
        if (!rect) return undefined;
        return {
            position: "absolute",
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            zIndex: 60, // поверх слайдера
        };
    }, [rect]);

    return (
        <Container>
            <div className="w-full">
                <div className="mx-auto max-w-4xl px-4">
                    <label className="block">
                        <div className="mt-12 mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                            {tf("search_all_products", "Поиск по товарам")}
                        </div>

                        <div className="relative">
                            <input
                                ref={inputRef}
                                value={q}
                                onChange={(e) => setQ(e.currentTarget.value)}
                                onFocus={() => {
                                    if (suggestions.length) setOpen(true);
                                }}
                                onKeyDown={onKeyDown}
                                placeholder={tf("search_placeholder", "Введите название, бренд, категорию…")}
                                className="w-full rounded-2xl border px-4 pr-20 py-3 text-base shadow-sm
                                                    dark:border-white/15 dark:bg-neutral-900 dark:text-white"
                                aria-label={tf("search_all_products", "Поиск по товарам")}
                            />

                            {/* Большая кнопка поиска справа */}
                            <button
                                type="button"
                                onClick={() => submit(q)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-2
                                             h-8 px-5 rounded-2xl bg-white text-black font-medium
                                             shadow-lg hover:!bg-black hover:!text-white active:scale-[0.99]
                                             focus:outline-none focus:ring-2 focus:ring-black/30
                                             dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
                                aria-label={tf("search_action", "Искать")}
                            >
                                {/* ВАЖНО: без классов цвета — иконка унаследует color от кнопки */}
                                <Search className="h-5 w-5" />
                                <span className="hidden sm:inline">{tf("search_button", "Найти")}</span>
                            </button>
                        </div>
                    </label>

                </div>

                {/* Портал с подсказками */}
                {open && rect && createPortal(
                    <div style={portalStyle}>
                        <div
                            ref={menuRef}
                            className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur dark:border-white/10 dark:bg-neutral-900/95">
                            <div className="transition-opacity duration-150 ease-out">
                                {loading && (
                                    <div className="p-3 text-sm text-gray-500 dark:text-gray-400">
                                        {tf("search_loading", "Загрузка…")}
                                    </div>
                                )}

                                {!loading && suggestions.length === 0 && (
                                    <div className="p-3 text-sm text-gray-500 dark:text-gray-400">
                                        {tf("search_no_results", "Ничего не найдено")}
                                    </div>
                                )}

                                {!loading && suggestions.length > 0 && (
                                    <ul className="max-h-[60vh] overflow-y-auto py-1">
                                        {suggestions.map((p, idx) => {
                                            const active = idx === activeIdx;
                                            return (
                                                <li key={p.id}>
                                                    <button
                                                        type="button"
                                                        onMouseEnter={() => setActiveIdx(idx)}
                                                        onMouseDown={() => submit(p.title)}
                                                        className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm
                                     ${active ? "bg-black/5 dark:bg-white/10" : ""}`}
                                                    >
                                                        <div className="min-w-0">
                                                            <div className="truncate font-medium">{p.title}</div>
                                                            <div
                                                                className="truncate text-xs text-gray-500 dark:text-gray-400">
                                                                {(p.brand || "—")}
                                                                {p.category ? ` • ${p.category}${p.subcategory ? `/${p.subcategory}` : ""}` : ""}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="shrink-0 text-sm font-semibold tabular-nums">${p.price}</div>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}

                                <div
                                    className="border-t p-2 text-right text-xs text-gray-500 dark:border-white/10 dark:text-gray-400">
                                    {tf("search_hint", "Enter — искать, ↑/↓ — выбрать, Esc — закрыть")}
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
            <div className="mb-4"></div>
        </Container>
    );
}
