import React, {useEffect, useMemo, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {useNavigate} from "react-router-dom";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import type {Product} from "../../data/types.ts";
import {suggestProducts} from "../../shared/api/repo.ts";
import Container from "../../shared/Container.tsx";
import {Search} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";

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

    // === Слежение за фокусом ===
    const [focused, setFocused] = useState(false);

    // === Демо-набор текста поверх пустого инпута ===
    const demoPhrases = useMemo(
        () => [
            tf("search_demo_1", "нержавейка 2 мм"),
            tf("search_demo_2", "лист 1000×2000"),
            tf("search_demo_3", "гибка профиля"),
            tf("search_demo_4", "лазерная резка трубы")
        ],
        [t]
    );
    const [demoText, setDemoText] = useState("");
    const [phraseIdx, setPhraseIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [demoMode, setDemoMode] = useState<"typing" | "pausing" | "deleting">("typing");

    useEffect(() => {
        const active = !focused && !open && q.trim() === "";
        if (!active) {
            setDemoText("");
            setCharIdx(0);
            setDemoMode("typing");
            return;
        }
        const phrase = demoPhrases[phraseIdx % demoPhrases.length] || "";
        const typingSpeed = 110;
        const deletingSpeed = 55;
        const pauseDelay = 1200;

        let timer: number | undefined;
        if (demoMode === "typing") {
            timer = window.setInterval(() => {
                setCharIdx((i) => {
                    if (i < phrase.length) {
                        const next = i + 1;
                        setDemoText(phrase.slice(0, next));
                        return next;
                    } else {
                        window.clearInterval(timer);
                        setDemoMode("pausing");
                        return i;
                    }
                });
            }, typingSpeed);
        } else if (demoMode === "pausing") {
            timer = window.setTimeout(() => setDemoMode("deleting"), pauseDelay) as unknown as number;
        } else if (demoMode === "deleting") {
            timer = window.setInterval(() => {
                setCharIdx((i) => {
                    if (i > 0) {
                        const next = i - 1;
                        setDemoText(phrase.slice(0, next));
                        return next;
                    } else {
                        window.clearInterval(timer);
                        setDemoMode("typing");
                        setPhraseIdx((p) => (p + 1) % demoPhrases.length);
                        return 0;
                    }
                });
            }, deletingSpeed);
        }

        return () => timer && window.clearInterval(timer);
    }, [focused, open, q, demoMode, phraseIdx, demoPhrases]);

    // Слушатель внешнего открытия поиска
    useEffect(() => {
        const onOpen = () => {
            setOpen(true);
            document.getElementById("home-search")?.scrollIntoView({behavior: "smooth", block: "start"});
            setTimeout(() => inputRef.current?.focus(), 50);
        };
        window.addEventListener("open-search", onOpen as EventListener);
        return () => window.removeEventListener("open-search", onOpen as EventListener);
    }, [inputRef]);

    // Загрузка подсказок
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

    // Закрытие по клику вне
    const menuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!open) return;
            const target = e.target as Node;
            if ((inputRef.current && inputRef.current.contains(target)) || (menuRef.current && menuRef.current.contains(target))) {
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
            if (open && activeIdx >= 0 && activeIdx < suggestions.length) submit(suggestions[activeIdx].title); else submit(q);
        }
    };

    const portalStyle: React.CSSProperties | undefined = useMemo(() => {
        if (!rect) return undefined;
        return {
            position: "absolute",
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            zIndex: 60
        };
    }, [rect]);

    const dropdownVariants = {
        hidden: {opacity: 0, y: -8, scale: 0.98},
        visible: {opacity: 1, y: 0, scale: 1, transition: {type: "spring", stiffness: 420, damping: 30, mass: 0.6}},
        exit: {opacity: 0, y: -4, scale: 0.98, transition: {duration: 0.15}},
    } as const;

    const demoActive = q.trim() === "" && !focused; // показываем поверх пустого инпута

    return (
        <Container>
            <div className="w-full">
                <div className="mx-auto max-w-4xl px-4">
                    <label id="home-search" className="block">
                        <motion.div initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.25}}
                                    className="mt-12 mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                            {tf("search_all_products", "Поиск по товарам")}
                        </motion.div>

                        <div className="relative group">
                            <motion.input
                                ref={inputRef}
                                value={q}
                                onChange={(e) => setQ(e.currentTarget.value)}
                                onFocus={() => {
                                    setFocused(true);
                                    if (suggestions.length) setOpen(true);
                                }}
                                onBlur={() => setFocused(false)}
                                onKeyDown={onKeyDown}
                                placeholder={demoActive ? "" : tf("search_placeholder", "Введите название, бренд, категорию…")}
                                aria-label={tf("search_all_products", "Поиск по товарам")}
                                whileFocus={{scale: 1.003}}
                                transition={{type: "spring", stiffness: 500, damping: 30, mass: 0.4}}
                                className="w-full rounded-2xl border px-4 pr-20 py-3 text-base shadow-sm outline-none transition-shadow duration-200 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.08)]
                                dark:border-white/15 dark:bg-neutral-900 dark:text-white dark:focus:shadow-[0_0_0_3px_rgba(255,255,255,0.15)]"
                            />

                            {/* Имитация набора — только когда поле пустое и не в фокусе */}
                            {demoActive && (
                                <div aria-hidden
                                     className="pointer-events-none absolute left-4 right-20 top-1/2 -translate-y-1/2 text-base text-gray-400 dark:text-gray-500 whitespace-nowrap overflow-hidden">
                                    <span className="font-[mono] tracking-tight">{demoText}</span>
                                    <motion.span initial={{opacity: 1}} animate={{opacity: [1, 0, 1]}}
                                                 transition={{duration: 0.9, repeat: Infinity}}
                                                 className="ml-0.5 inline-block h-[1.25rem] w-[2px] align-[-2px] bg-gray-400 dark:bg-gray-500"/>
                                </div>
                            )}

                            {/* Кнопка поиска */}
                            <motion.button type="button" onClick={() => submit(q)} whileTap={{scale: 0.97}}
                                           whileHover={{y: -1}}
                                           className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 h-8 px-5 rounded-2xl bg-white text-black font-medium shadow-lg
                                           hover:!bg-black hover:!text-white active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-black/30
                                           dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
                                           aria-label={tf("search_action", "Искать")}>
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
                                <motion.div ref={menuRef} layout
                                            className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur dark:border-white/10 dark:bg-neutral-900/95">
                                    <motion.div className="transition-opacity duration-150 ease-out" layout>
                                        {loading && (
                                            <div className="p-3">
                                                <div className="space-y-2">
                                                    <div
                                                        className="h-3 w-1/2 rounded bg-black/10 animate-pulse dark:bg-white/10"/>
                                                    <div
                                                        className="h-3 w-1/3 rounded bg-black/10 animate-pulse dark:bg-white/10"/>
                                                </div>
                                            </div>
                                        )}

                                        {!loading && suggestions.length === 0 && (
                                            <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
                                                        transition={{duration: 0.15}}
                                                        className="p-3 text-sm text-gray-500 dark:text-gray-400">
                                                {tf("search_no_results", "Ничего не найдено")}
                                            </motion.div>
                                        )}

                                        {!loading && suggestions.length > 0 && (
                                            <motion.ul className="max-h-[60vh] overflow-y-auto py-1" layout>
                                                {suggestions.map((p, idx) => {
                                                    const active = idx === activeIdx;
                                                    return (
                                                        <li key={p.id}>
                                                            <motion.button type="button"
                                                                           onMouseEnter={() => setActiveIdx(idx)}
                                                                           onMouseDown={() => submit(p.title)}
                                                                           initial={false}
                                                                           animate={{backgroundColor: active ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0)"}}
                                                                           transition={{duration: 0.12}}
                                                                           whileHover={{x: 2}} whileTap={{scale: 0.995}}
                                                                           className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm dark:${active ? "bg-white/10" : ""}`}>
                                                                <div className="min-w-0">
                                                                    <div
                                                                        className="truncate font-medium">{t(p.title.toLowerCase())}</div>
                                                                    <div
                                                                        className="truncate text-xs text-gray-500 dark:text-gray-400">{(p.brand || "—")} {t(p.category) ? ` • ${t(p.category)}${t(p.subcategory) ? `/${t(p.subcategory)}` : ""}` : ""}</div>
                                                                </div>
                                                                <motion.div layout initial={{opacity: 0, y: 2}}
                                                                            animate={{opacity: 1, y: 0}}
                                                                            className="shrink-0 text-sm font-semibold tabular-nums">
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
