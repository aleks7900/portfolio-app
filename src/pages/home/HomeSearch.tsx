import React, {useEffect, useMemo, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {useNavigate} from "react-router-dom";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import type {Product} from "../../data/types.ts";
import {suggestProducts} from "../../shared/api/repo.ts";
import Container from "../../shared/Container.tsx";
import {Search} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";

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

    // сверху у тебя уже есть inputRef, setOpen, setQ и т.п.
    useEffect(() => {
        const onOpen = () => {
            setOpen(true);
            document.getElementById("home-search")?.scrollIntoView({behavior: "smooth", block: "start"});
            setTimeout(() => inputRef.current?.focus(), 50);
        };
        window.addEventListener("open-search", onOpen as EventListener);
        return () => window.removeEventListener("open-search", onOpen as EventListener);
    }, [inputRef]);

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
    const menuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!open) return;
            const target = e.target as Node;
            if (
                (inputRef.current && inputRef.current.contains(target)) ||
                (menuRef.current && menuRef.current.contains(target))
            ) {
                return;
            }
            setOpen(false);
        };
        document.addEventListener("click", onDocClick);
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
                submit(s.title);
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
            zIndex: 60,
        };
    }, [rect]);

    // Варианты анимаций
    const dropdownVariants = {
        hidden: {opacity: 0, y: -8, scale: 0.98},
        visible: {opacity: 1, y: 0, scale: 1, transition: {type: "spring", stiffness: 420, damping: 30, mass: 0.6}},
        exit: {opacity: 0, y: -4, scale: 0.98, transition: {duration: 0.15}},
    } as const;

    return (
        <Container>
            <div className="w-full">
                <div className="mx-auto max-w-4xl px-4">
                    <label id="home-search" className="block">
                        <motion.div
                            initial={{opacity: 0, y: 6}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.25}}
                            className="mt-12 mb-2 text-lg font-medium text-gray-700 dark:text-gray-200"
                        >
                            {tf("search_all_products", "Поиск по товарам")}
                        </motion.div>

                        <div className="relative group">
                            <motion.input
                                ref={inputRef}
                                value={q}
                                onChange={(e) => setQ(e.currentTarget.value)}
                                onFocus={() => {
                                    if (suggestions.length) setOpen(true);
                                }}
                                onKeyDown={onKeyDown}
                                placeholder={tf("search_placeholder", "Введите название, бренд, категорию…")}
                                aria-label={tf("search_all_products", "Поиск по товарам")}
                                whileFocus={{scale: 1.003}}
                                transition={{type: "spring", stiffness: 500, damping: 30, mass: 0.4}}
                                className="w-full rounded-2xl border px-4 pr-20 py-3 text-base shadow-sm outline-none
                           transition-shadow duration-200
                           focus:shadow-[0_0_0_3px_rgba(0,0,0,0.08)]
                           dark:border-white/15 dark:bg-neutral-900 dark:text-white dark:focus:shadow-[0_0_0_3px_rgba(255,255,255,0.15)]"
                            />

                            {/* Большая кнопка поиска справа */}
                            <motion.button
                                type="button"
                                onClick={() => submit(q)}
                                whileTap={{scale: 0.97}}
                                whileHover={{y: -1}}
                                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-2
                           h-8 px-5 rounded-2xl bg-white text-black font-medium
                           shadow-lg hover:!bg-black hover:!text-white active:scale-[0.99]
                           focus:outline-none focus:ring-2 focus:ring-black/30
                           dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
                                aria-label={tf("search_action", "Искать")}
                            >
                                <Search className="h-5 w-5 transition-transform duration-200 group-hover:rotate-12"/>
                                <span className="hidden sm:inline">{tf("search_button", "Найти")}</span>
                            </motion.button>
                        </div>
                    </label>
                </div>

                {/* Портал с подсказками */}
                {createPortal(
                    <AnimatePresence>
                        {open && rect && (
                            <motion.div style={portalStyle} initial="hidden" animate="visible" exit="exit"
                                        variants={dropdownVariants}>
                                <motion.div
                                    ref={menuRef}
                                    layout
                                    className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur
                             dark:border-white/10 dark:bg-neutral-900/95"
                                >
                                    <motion.div className="transition-opacity duration-150 ease-out" layout>
                                        {loading && (
                                            <div className="p-3">
                                                {/* скелетон вместо текста Загрузка… */}
                                                <div className="space-y-2">
                                                    <div
                                                        className="h-3 w-1/2 rounded bg-black/10 animate-pulse dark:bg-white/10"/>
                                                    <div
                                                        className="h-3 w-1/3 rounded bg-black/10 animate-pulse dark:bg-white/10"/>
                                                </div>
                                            </div>
                                        )}

                                        {!loading && suggestions.length === 0 && (
                                            <motion.div
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1}}
                                                transition={{duration: 0.15}}
                                                className="p-3 text-sm text-gray-500 dark:text-gray-400"
                                            >
                                                {tf("search_no_results", "Ничего не найдено")}
                                            </motion.div>
                                        )}

                                        {!loading && suggestions.length > 0 && (
                                            <motion.ul className="max-h-[60vh] overflow-y-auto py-1" layout>
                                                {suggestions.map((p, idx) => {
                                                    const active = idx === activeIdx;
                                                    return (
                                                        <li key={p.id}>
                                                            <motion.button
                                                                type="button"
                                                                onMouseEnter={() => setActiveIdx(idx)}
                                                                onMouseDown={() => submit(p.title)}
                                                                initial={false}
                                                                animate={{backgroundColor: active ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0)"}}
                                                                transition={{duration: 0.12}}
                                                                whileHover={{x: 2}}
                                                                whileTap={{scale: 0.995}}
                                                                className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm
                                  dark:${active ? "bg-white/10" : ""}`}
                                                            >
                                                                <div className="min-w-0">
                                                                    <div
                                                                        className="truncate font-medium">{p.title}</div>
                                                                    <div
                                                                        className="truncate text-xs text-gray-500 dark:text-gray-400">
                                                                        {(p.brand || "—")}
                                                                        {p.category ? ` • ${p.category}${p.subcategory ? `/${p.subcategory}` : ""}` : ""}
                                                                    </div>
                                                                </div>
                                                                <motion.div
                                                                    layout
                                                                    initial={{opacity: 0, y: 2}}
                                                                    animate={{opacity: 1, y: 0}}
                                                                    className="shrink-0 text-sm font-semibold tabular-nums"
                                                                >
                                                                    ${p.price}
                                                                </motion.div>
                                                            </motion.button>
                                                        </li>
                                                    );
                                                })}
                                            </motion.ul>
                                        )}

                                        <div
                                            className="border-t p-2 text-right text-xs text-gray-500 dark:border-white/10 dark:text-gray-400">
                                            {tf("search_hint", "Enter — искать, ↑/↓ — выбрать, Esc — закрыть")}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
            </div>
            <div className="mb-4"/>
        </Container>
    );
}
