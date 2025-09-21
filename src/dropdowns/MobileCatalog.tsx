// src/components/MobileCatalog.tsx
import React from "react";
import {ChevronDown, ChevronRight} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useI18n} from "../shared/i18n/i18n.tsx";
import {CATS} from "../data/catalog/categories.ts";
import {AnimatePresence, motion} from "framer-motion";

/** Кнопка подкатегории: ширина по контенту + тень */
const SUB_BTN = [
    "inline-flex items-center justify-between gap-2 self-start",
    "rounded-lg px-4 py-3 text-base font-medium",
    "bg-white text-black no-underline shadow-lg transition",
    "hover:!bg-black hover:!text-white hover:!shadow-2xl hover:!shadow-black/40",
    "focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]",
    "w-full", // важно: не растягиваем на всю ширину
    "text-left whitespace-normal break-words leading-snug overflow-visible",
].join(" ");

type OpenMap = Record<string, boolean>;

export default function MobileCatalog() {
    const {t} = useI18n();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState<OpenMap>({});

    const toggle = (key: string) =>
        setOpen((m) => ({...m, [key]: !m[key]}));

    const itemVariants = {hidden: {opacity: 0, x: -6}, visible: {opacity: 1, x: 0}};

    return (
        <div className="w-full p-3">
            <div className="mb-3 text-lg font-semibold">{t("nav_catalog")}</div>

            <ul className="flex flex-col gap-2">
                {CATS.map((cat) => {
                    const isOpen = !!open[cat.key];
                    return (
                        <li key={cat.key} className="rounded-2xl bg-white dark:bg-gray-800">
                            {/* Кнопка секции (категория) */}
                            <button
                                className="w-full flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium
                           bg-white text-black dark:bg-gray-800 dark:text-white
                           border border-black/10 dark:border-white/15 shadow-sm
                           focus:outline-none focus-visible:ring-0 outline-none
                           active:scale-[0.99]"
                                onClick={() => toggle(cat.key)}
                                aria-expanded={isOpen}
                                aria-controls={`sec-${cat.key}`}
                            >
                                <span className="truncate">{t(cat.labelKey)}</span>
                                <ChevronDown
                                    className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}/>
                            </button>

                            {/* Контейнер списка подкатегорий */}
                            <div
                                id={`sec-${cat.key}`}
                                className={[
                                    "w-full transition-[max-height] duration-300 ease-out",
                                    isOpen
                                        ? "max-h-[70svh] overflow-y-auto no-scrollbar pr-2 [scrollbar-gutter:stable] touch-pan-y border-t border-black/5 dark:border-white/10"
                                        : "max-h-0 overflow-hidden pointer-events-none py-0",
                                ].join(" ")}
                            >
                                <div className="px-3 pb-3 pt-1">
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.ul
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                className="flex flex-col gap-2"
                                            >
                                                {cat.children?.map((sub, idx) => (
                                                    <motion.li
                                                        key={sub.key}
                                                        variants={itemVariants}
                                                        transition={{delay: idx * 0.02}}
                                                    >
                                                        <button
                                                            className={SUB_BTN}
                                                            onClick={() => {
                                                                navigate(`/catalog/${cat.key}/${sub.key}`);
                                                            }}
                                                            title={t(sub.labelKey)}
                                                        >
                              <span className="block max-w-full whitespace-normal break-words leading-snug pr-2">
                                {t(sub.labelKey)}
                              </span>
                                                            <ChevronRight className="h-4 w-4 shrink-0"/>
                                                        </button>
                                                    </motion.li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
