import {useI18n} from "../shared/i18n/i18n.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {ChevronDown, ChevronRight} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {createPortal} from "react-dom";
import {CATS} from "../data/catalog/categories.ts";

const BTN = [
    "flex items-center justify-between gap-2 rounded-lg px-5 py-3 text-base font-medium",
    "bg-white text-black no-underline shadow-lg transition",
    "hover:!bg-black hover:!text-white hover:!shadow-2xl hover:!shadow-black/40",
    "focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]",
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

    React.useEffect(() => {
        setOpen(false);
    }, [location.pathname]);
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
        };

        if (openUp) {
            return {
                ...base,
                bottom: Math.round(viewportH - rect.top + 8),
            };
        }
        return {
            ...base,
            top: Math.round(rect.bottom + 8),
        };
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
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 420,
                damping: 30,
                mass: 0.6,
                when: "beforeChildren",
                staggerChildren: 0.03,
            },
        },
        exit: {opacity: 0, y: -6, scale: 0.98, transition: {duration: 0.15}},
    } as const;
    const colVariants = {hidden: {opacity: 0, y: 6}, visible: {opacity: 1, y: 0}} as const;
    const itemVariants = {hidden: {opacity: 0, x: -6}, visible: {opacity: 1, x: 0}} as const;

    return (
        <div className="relative z-50">
            <button
                ref={btnRef}
                className="relative z-10 inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium !bg-red-200 !text-black no-underline shadow transition-colors hover:!bg-red-500 hover:!text-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-[0.99] mix-blend-normal"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen(v => !v)}
            >
                {t("nav_catalog")}
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}/>
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
                                className="rounded-2xl border bg-white p-4 drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] dark:bg-gray-800 dark:border-white/10 overscroll-contain"
                                role="menu"
                            >
                                <div className="flex flex-wrap gap-6">
                                    {CATS.map(cat => (
                                        <motion.div key={cat.key} variants={colVariants}
                                                    className="flex flex-col min-w-[260px] max-w-[340px]">
                                            <div
                                                className="sticky top-0 z-10 -mx-1 mb-2 px-1 py-1 text-sm font-semibold text-gray-700/90 backdrop-blur-[2px] dark:text-gray-100">
                                                {t(cat.labelKey)}
                                            </div>
                                            <div className="flex flex-col items-stretch w-full">
                                                {cat.children?.map((sub, idx) => (
                                                    <motion.button
                                                        key={sub.key}
                                                        role="menuitem"
                                                        title={t(sub.labelKey)}
                                                        onClick={() => {
                                                            navigate(`/catalog/${cat.key}/${sub.key}`);
                                                            setOpen(false);
                                                        }}
                                                        className={BTN + " w-full"}
                                                        variants={itemVariants}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 120,
                                                            damping: 24,
                                                            mass: 0.4,
                                                            delay: idx * 0.02
                                                        }}
                                                        whileHover={{x: 2}}
                                                        whileTap={{scale: 0.985}}
                                                    >
                                                        <span
                                                            className="block grow leading-snug break-words whitespace-normal text-left pr-2">{t(sub.labelKey)}</span>
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