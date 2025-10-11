import {useI18n} from "../shared/i18n/i18n.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {ChevronDown, ChevronRight} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {createPortal} from "react-dom";
import {CATS} from "../data/catalog/categories.ts";

/** Кнопка подкатегории: ширина = по контенту */
const BTN = [
    // раскладка
    "inline-flex items-center justify-between gap-2 self-start",
    // размеры
    "rounded-lg px-5 py-3 text-base font-medium",
    // оформление + тени
    "bg-white text-black no-underline shadow-lg transition",
    "hover:!bg-black hover:!text-white hover:!shadow-2xl hover:!shadow-black/40",
    // фокус/актив
    "focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]",
    // ширина по содержимому
    "w-full",
    // текст/перенос
    "text-left whitespace-normal break-words leading-snug overflow-visible",
].join(" ");

function useAnchorRect<T extends HTMLElement>() {
    const ref = React.useRef<T | null>(null);
    const [rect, setRect] = React.useState<DOMRect | null>(null);
    const update = React.useCallback(() => {
        if (!ref.current) return;
        setRect(ref.current.getBoundingClientRect());
    }, []);
    React.useLayoutEffect(() => {
        update();
        const on = () => update();
        window.addEventListener("resize", on);
        window.addEventListener("scroll", on, true);
        return () => {
            window.removeEventListener("resize", on);
            window.removeEventListener("scroll", on, true);
        };
    }, [update]);
    return {ref, rect, refresh: update};
}

export default function DesktopCatalog() {
    const {t} = useI18n();
    const navigate = useNavigate();
    const location = useLocation();

    const {ref: btnRef, rect} = useAnchorRect<HTMLButtonElement>();
    const [open, setOpen] = useState(false);

    React.useEffect(() => setOpen(false), [location.pathname]);
    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    const menuStyle: React.CSSProperties | undefined = React.useMemo(() => {
        if (!rect) return undefined;

        const viewportW = window.innerWidth;
        const viewportH = window.innerHeight;

        const maxSheetW = Math.min(1100, viewportW - 24);
        const sheetW = Math.max(720, Math.min(maxSheetW, Math.floor(viewportW * 0.7)));

        const left = Math.min(Math.max(12, Math.round(rect.left)), viewportW - sheetW - 12);

        const spaceBelow = viewportH - rect.bottom;
        const openUp = spaceBelow < 280 && rect.top > viewportH / 2;

        const maxH = Math.floor(viewportH * 0.8);

        const base: React.CSSProperties = {
            position: "fixed",
            left,
            width: sheetW,
            zIndex: 9999,
            maxHeight: maxH,
            overflowY: "auto",
            scrollbarGutter: "stable both-edges", // НЕ прыгать при появлении скролла
        };

        if (openUp) {
            return {...base, bottom: Math.round(viewportH - rect.top + 8)};
        }
        return {...base, top: Math.round(rect.bottom + 8)};
    }, [rect]);

    const backdropStyle: React.CSSProperties = {
        position: "fixed",
        inset: 0,
        zIndex: 900,
        background: "rgba(0,0,0,0.2)",
    };

    const sheetVariants = {
        hidden: {opacity: 0, y: -8, scale: 0.98},
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: {
                type: "spring", stiffness: 420, damping: 30, mass: 0.6,
                when: "beforeChildren", staggerChildren: 0.03,
            },
        },
        exit: {opacity: 0, y: -6, scale: 0.98, transition: {duration: 0.15}},
    } as const;
    const colVariants = {hidden: {opacity: 0, y: 6}, visible: {opacity: 1, y: 0}} as const;
    const itemVariants = {hidden: {opacity: 0, x: -6}, visible: {opacity: 1, x: 0}} as const;

    return (
        <div className="relative z-50 !rounded-3xl">
            {/* ЛОКАЛЬНЫЕ КАДРЫ АНИМАЦИИ ДЛЯ ПЕРЕЛИВАЮЩЕГОСЯ ГРАДИЕНТА */}
            <style>{`
        @keyframes rv-gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        /* Светящаяся кайма на ховере */
        @keyframes rv-glow {
          0%,100% { box-shadow: 0 0 0 rgba(0,0,0,0); }
          50% { box-shadow: 0 8px 28px rgba(0,0,0,0.35); }
        }
      `}</style>

            <button
                ref={btnRef}
                className="relative z-10 inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium no-underline focus:outline-none focus:ring-2 active:scale-[0.99]"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen(v => !v)}
            >
                {/* Анимированный фон */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{
                        background:
                            "linear-gradient(90deg, #60a5fa, #34d399, #f59e0b, #ef4444, #8b5cf6, #60a5fa)",
                        backgroundSize: "300% 300%",
                        animation: "rv-gradient-flow 8s linear infinite",
                        filter: "saturate(1.1)",
                    }}
                />
                {/* Тонкая глянец-подсветка сверху */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.06))",
                        mixBlendMode: "overlay",
                    }}
                />
                {/* Контент кнопки поверх */}
                <span className="relative z-10 text-white drop-shadow-[0_1px_0_rgba(0,0,0,0.45)]">
          {t("nav_catalog")}
        </span>
                <ChevronDown
                    className={`relative z-10 h-4 w-4 text-white drop-shadow-[0_1px_0_rgba(0,0,0,0.45)] transition-transform ${open ? "rotate-180" : ""}`}/>

                {/* Обводка + мягкое свечение на ховере */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/20"
                />
            </button>

            {createPortal(
                <>
                    <AnimatePresence>
                        {open && (
                            <motion.button
                                key="backdrop"
                                aria-hidden
                                style={backdropStyle}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.15}}
                                onClick={() => setOpen(false)}
                            />
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {open && menuStyle && (
                            <motion.div
                                key="catalog-sheet"
                                style={menuStyle}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={sheetVariants}
                                className="rounded-2xl border bg-white p-4 pr-5 drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] dark:bg-gray-800 dark:border-white/10 overscroll-contain"
                                role="menu"
                            >
                                {/* GRID вместо flex-wrap */}
                                <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
                                    {CATS.map(cat => (
                                        <motion.div
                                            key={cat.key}
                                            variants={colVariants}
                                            className="flex flex-col min-w-0"
                                        >
                                            <div
                                                className="sticky top-0 z-10 -mx-1 mb-2 px-1 py-1 text-sm font-semibold text-gray-700/90 backdrop-blur-[2px] dark:text-gray-100">
                                                {t(cat.labelKey)}
                                            </div>

                                            <div className="flex flex-col w-full gap-2">
                                                {cat.children?.map((sub, idx) => (
                                                    <motion.button
                                                        key={sub.key}
                                                        role="menuitem"
                                                        title={t(sub.labelKey)}
                                                        onClick={() => {
                                                            navigate(`/catalog/${cat.key}/${sub.key}`);
                                                            setOpen(false);
                                                        }}
                                                        className={BTN}
                                                        variants={itemVariants}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 120,
                                                            damping: 24,
                                                            mass: 0.4,
                                                            delay: idx * 0.02,
                                                        }}
                                                        whileHover={{x: 2}}
                                                        whileTap={{scale: 0.985}}
                                                    >
                                                            <span className="block max-w-full whitespace-normal break-words leading-snug pr-2">
                                                              {t(sub.labelKey)}
                                                            </span>
                                                        <ChevronRight className="h-4 w-4 shrink-0"/>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>,
                document.body
            )}
        </div>
    );
}
