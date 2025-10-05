// src/pages/home/HomeSearch.tsx
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import {createPortal} from "react-dom";
import {History, Search} from "lucide-react";

import Container from "../../shared/Container";
import {dict, useI18n} from "../../shared/i18n/i18n.tsx";
import type {Product as ApiProduct} from "../../shared/api/repo";
import {suggestProducts} from "../../shared/api/repo";
import {useDebounced} from "../../data/hooks/useDebounced.ts";
import {useAnchorRect} from "../../shared/useAnchorRect.ts";


// ---------- i18n helpers ----------
// Ищем по всем namespace текущего языка лучшую строку и возвращаем её КЛЮЧ
function norm(s: string) {
    return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function findBestI18nKeyByDict(lang: "ru" | "ro", phrase: string): string | null {
    const q = norm(phrase);
    if (!q) return null;

    const bundle = dict[lang] || {};
    const matches: Array<{ key: string; value: string; score: number }> = [];

    for (const key of Object.keys(bundle)) {
        const v = bundle[key];
        if (typeof v !== "string") continue;
        const nv = norm(v);
        if (!nv) continue;
        if (nv === q) matches.push({key, value: v, score: 3});
        else if (nv.startsWith(q)) matches.push({key, value: v, score: 2});
        else if (nv.includes(q)) matches.push({key, value: v, score: 1});
    }

    if (!matches.length) return null;
    matches.sort((a, b) => b.score - a.score || a.key.length - b.key.length || a.value.length - b.value.length);
    return matches[0].key;
}

// ---------- компонент ----------
export default function HomeSearch() {
    const navigate = useNavigate();

    // i18n: берем и t, и сам i18n
    const {t, lang} = useI18n();

    // локализатор с фоллбеком
    const tf = useCallback((key: string, fallback: string) => {
        try {
            return t(key) as string;
        } catch {
            return fallback;
        }
    }, [lang]);

    const [q, setQ] = useState("");
    const qDebounced = useDebounced(q, 250);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<ApiProduct[]>([]);
    const [activeIdx, setActiveIdx] = useState<number>(-1);

    const {ref: inputRef, rect} = useAnchorRect<HTMLInputElement>();

    // === Слежение за фокусом ===
    const [focused, setFocused] = useState(false);

    const phrasesRef = useRef<string[]>([]);
    // === Демо-набор поверх пустого инпута ===
    useEffect(() => {
        phrasesRef.current = [
            tf("search_demo_1", "производственный стол из нержавейки"),
            tf("search_demo_2", "мойка для кухни horeca"),
            tf("search_demo_3", "барная станция из металла"),
            tf("search_demo_4", "перила и поручни из нержавеющей стали"),
            tf("search_demo_5", "производственный стол из нержавейки"),
            tf("search_demo_6", "мойка horeca из нержавейки"),
            tf("search_demo_7", "барная станция из металла"),
            tf("search_demo_8", "перила и поручни из нержавейки"),
            tf("search_demo_9", "стеллаж складской из нержавейки"),
            tf("search_demo_10", "подтоварник из нержавеющей стали"),
            tf("search_demo_11", "рабочий каркас под оборудование"),
            tf("search_demo_12", "короб из нержавейки на заказ"),
            tf("search_demo_13", "кафейная стойка из металла"),
            tf("search_demo_14", "крышка для мойки из нержавейки"),
            tf("search_demo_15", "жаровня и гриль из нержавейки"),
            tf("search_demo_16", "фартук из листовой нержавейки"),
            tf("search_demo_17", "тележка сервировочная из нержавейки"),
            tf("search_demo_18", "настенная полка из нержавейки"),
            tf("search_demo_19", "шкаф для инвентаря из нержавейки"),
            tf("search_demo_20", "стол-тумба с ящиками из металла"),
            tf("search_demo_21", "мойка с двумя чашами"),
            tf("search_demo_22", "производственная вытяжка из нержавейки"),
            tf("search_demo_23", "подиум под оборудование"),
            tf("search_demo_24", "решётка водоотводная из нержавейки"),
        ];
    }, [lang]);

    const [demoText, setDemoText] = useState("");
    const [phraseIdx, setPhraseIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [demoMode] = useState<"typing" | "pausing" | "deleting">("typing");

    // Обновляем демо-текст по индексу символа/фразы
    useEffect(() => {
        const list = phrasesRef.current;
        if (!list.length) return;
        const phrase = list[phraseIdx % list.length] || "";
        const next = phrase.slice(0, charIdx);

        setDemoText(prev => (prev === next ? prev : next));
    }, [charIdx, phraseIdx, lang]);

    // Строго один тик за раз (без setInterval)
    useEffect(() => {
        // Печатаем только когда ничего не введено и не открыт оверлей
        if (open) return;
        if (q.trim().length > 0) return;
        if (!demoMode) return;

        const list = phrasesRef.current;
        if (!list.length) return;

        const full = list[phraseIdx % list.length];
        const typing = charIdx < full.length;

        const id = window.setTimeout(() => {
            if (typing) {
                setCharIdx(c => c + 1);                 // печатаем
            } else {
                setCharIdx(0);                           // сброс
                setPhraseIdx(i => (i + 1) % list.length);// следующая фраза
            }
        }, typing ? 40 : 900);

        return () => clearTimeout(id);
    }, [open, q, demoMode, phraseIdx, charIdx, lang]);

    // Слушатель внешнего открытия поиска
    useEffect(() => {
        const onOpen = () => {
            setOpen(true);
            document.getElementById("home-search")?.scrollIntoView({behavior: "smooth", block: "start"});
            setTimeout(() => (inputRef.current as HTMLInputElement | null)?.focus(), 50);
        };
        window.addEventListener("open-search", onOpen as EventListener);
        return () => window.removeEventListener("open-search", onOpen as EventListener);
    }, [inputRef]);

    // ====== Загрузка подсказок: СНАЧАЛА локаль → ПОТОМ сервер ======
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
                // ✨ берем ключ локализации, если совпадает
                const key = findBestI18nKeyByDict(lang, query);
                const queryForServer = key ?? query;

                const items = await suggestProducts(queryForServer, 8);
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
    }, [qDebounced, lang]);

    // Закрытие по клику вне
    const menuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!open) return;
            const target = e.target as Node;
            if (!menuRef.current?.contains(target) && target !== inputRef.current) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [open, inputRef]);

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (!open && e.key === "ArrowDown" && suggestions.length) {
            setOpen(true);
            setActiveIdx(0);
            return;
        }
        if (!open) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIdx((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            submit(q);
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    };

    // ---------- История поиска (LocalStorage) ----------
    const [history, setHistory] = useState<string[]>([]);
    const HISTORY_KEY = `search_history_${lang}`;
    const HISTORY_MAX = 12;

    const loadHistory = useCallback(() => {
        try {
            const raw = localStorage.getItem(HISTORY_KEY);
            if (!raw) return setHistory([]);
            const arr = JSON.parse(raw);
            if (Array.isArray(arr)) setHistory(arr.filter(x => typeof x === "string"));
        } catch {
            setHistory([]);
        }
    }, [HISTORY_KEY]);

    const saveHistory = useCallback((arr: string[]) => {
        try {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(arr));
        } catch {
            /* ignore quota */
        }
    }, [HISTORY_KEY]);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    const pushHistory = (query: string) => {
        const qn = norm(query);
        if (!qn) return;
        setHistory(prev => {
            const next = [query, ...prev.filter(x => norm(x) !== qn)].slice(0, HISTORY_MAX);
            saveHistory(next);
            return next;
        });
    };

    const clearHistory = () => {
        setHistory([]);
        saveHistory([]);
    };

    const submit = (query: string) => {
        const key = findBestI18nKeyByDict(lang, query);
        const qForRoute = (key ?? query).trim();
        if (qForRoute) pushHistory(query);

        const usp = new URLSearchParams();
        if (qForRoute) usp.set("q", qForRoute);
        usp.set("page", "0");
        usp.set("size", "12");
        navigate(`/catalog?${usp.toString()}`);
        setOpen(false);
    };

    // ---------- UI (остался твоим) ----------
    const portalStyle = React.useMemo(() => {
        if (!rect) return undefined as never;
        return {
            position: "absolute" as const,
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            zIndex: 60,
        };
    }, [rect]);

    const dropdownVariants = {
        hidden: {opacity: 0, y: -8, scale: 0.98},
        visible: {opacity: 1, y: 0, scale: 1, transition: {type: "spring", stiffness: 420, damping: 30, mass: 0.6}},
        exit: {opacity: 0, y: -4, scale: 0.98, transition: {duration: 0.15}},
    } as const;

    const demoActive = q.trim() === "" && !focused;

    // показываем историю, если фокус в инпуте и поле пустое (или нет подсказок)
    const showHistory = (focused && open) && history.length > 0 && q.trim() === "";

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
                                onChange={(e) => {
                                    setQ(e.currentTarget.value);
                                    // при очистке поля и наличии истории — открыть дропдаун
                                    const v = e.currentTarget.value.trim();
                                    if (v === "" && history.length > 0) setOpen(true);
                                }}
                                onFocus={() => {
                                    setFocused(true);
                                    // открываем историю, если нет подсказок
                                    if (suggestions.length) setOpen(true);
                                    else if (history.length) setOpen(true);
                                }}
                                onBlur={() => setFocused(false)}
                                onKeyDown={onKeyDown}
                                placeholder={demoActive ? "" : tf("search_placeholder", "Введите название, бренд, категорию…")}
                                aria-label={tf("search_all_products", "Поиск по товарам")}
                                whileFocus={{scale: 1.003}}
                                transition={{type: "spring", stiffness: 500, damping: 30, mass: 0.4}}
                                className="w-full rounded-2xl border px-4 pr-20 py-3 text-base shadow-sm outline-none transition-shadow duration-200 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.08)] dark:border-white/15 dark:!bg-zinc-800 dark:!text-white dark:focus:shadow-[0_0_0_3px_rgba(255,255,255,0.15)]"
                            />

                            {/* Имитация набора поверх пустого поля */}
                            {demoActive && (
                                <div
                                    aria-hidden
                                    className="pointer-events-none absolute left-4 right-20 top-1/2 -translate-y-1/2 text-base text-gray-400 dark:text-gray-500 whitespace-nowrap overflow-hidden"
                                >
                                    <span className="dark:!text-white tracking-tight">{demoText}</span>
                                    <motion.span
                                        initial={{opacity: 1}}
                                        animate={{opacity: [1, 0, 1]}}
                                        transition={{duration: 0.9, repeat: Infinity}}
                                        className="ml-0.5 inline-block h-[1.25rem] w-[2px] align-[-2px] bg-gray-400 dark:bg-gray-500"
                                    />
                                </div>
                            )}

                            {/* Кнопка поиска */}
                            <motion.button
                                type="button"
                                onClick={() => submit(q)}
                                whileTap={{scale: 0.97}}
                                whileHover={{y: -1}}
                                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 h-8 px-5 rounded-2xl bg-white text-black font-medium shadow-lg hover:!bg-black hover:!text-white active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-black/30 dark:text-black dark:hover:bg-black dark:hover:text-white"
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
                        {(open && rect) && (
                            <motion.div style={portalStyle} initial="hidden" animate="visible" exit="exit"
                                        variants={dropdownVariants}>
                                <motion.div
                                    ref={menuRef}
                                    layout
                                    className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur dark:border-white/10 dark:bg-neutral-900/95"
                                >
                                    <motion.div className="transition-opacity duration-150 ease-out" layout>
                                        {/* === История поиска === */}
                                        {showHistory && (
                                            <div className="py-2">
                                                <div className="flex items-center justify-between px-3 pb-1">
                                                    <div
                                                        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                                        <History className="h-4 w-4"/>
                                                        {tf("search_recent", "Недавние запросы")}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onMouseDown={(e) => {
                                                            e.preventDefault();
                                                            clearHistory();
                                                        }}
                                                        className="text-xs text-gray-500 hover:text-black "
                                                        aria-label={tf("search_clear_history", "Очистить историю")}
                                                    >
                                                        {tf("search_clear_history", "Очистить")}
                                                    </button>
                                                </div>

                                                <ul className="max-h-[40vh] overflow-y-auto py-1">
                                                    {history.map((h) => (
                                                        <li key={h} className="relative">
                                                            <button
                                                                type="button"
                                                                onMouseDown={(e) => {
                                                                    e.preventDefault();
                                                                    setQ(h);
                                                                    submit(h);
                                                                }}
                                                                className="flex w-full items-center justify-between gap-2 px-3 py-2 pr-12 text-left dark:!bg-zinc-800 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                                                            >
                                                                <span className="truncate">{h}</span>
                                                                <span
                                                                    className="shrink-0 inline-flex items-center gap-1 text-xs text-gray-500">
                                                                  {tf("search_repeat", "Повторить")}
                                                                </span>
                                                            </button>
                                                            {/*<button*/}
                                                            {/*    type="button"*/}
                                                            {/*    aria-label={tf("search_remove_entry", "Удалить из истории")}*/}
                                                            {/*    onMouseDown={(e) => {*/}
                                                            {/*        e.preventDefault();*/}
                                                            {/*        removeFromHistory(h);*/}
                                                            {/*    }}*/}
                                                            {/*    className="!text-black hover:!text-red-600 absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10 "*/}
                                                            {/*    title={tf("search_remove_entry", "Удалить из истории")}*/}
                                                            {/*>*/}
                                                            {/*    <X className="h-4 w-4 !text-black hover:!text-red-600"/>*/}
                                                            {/*</button>*/}
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Разделитель, если дальше будут подсказки */}
                                                {(!loading && suggestions.length > 0) && (
                                                    <div className="mx-3 my-2 h-px bg-black/10 dark:bg-white/10"/>
                                                )}
                                            </div>
                                        )}

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

                                        {!loading && suggestions.length === 0 && !showHistory && (
                                            <div className="p-3 text-sm text-gray-500 dark:text-gray-400">
                                                {tf("search_nothing_found", "Ничего не найдено")}
                                            </div>
                                        )}
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
            </div>
        </Container>
    );
}
