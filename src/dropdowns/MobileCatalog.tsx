import {useI18n} from "../shared/i18n/i18n.tsx";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {ChevronDown} from "lucide-react";
import {CATS} from "../data/catalog/categories.ts";

export default function MobileCatalog({onDone}: { onDone: () => void }) {
    const {t} = useI18n();
    const navigate = useNavigate();
    const [open, setOpen] = useState<string | null>(null);

    // === Блокируем фоновый скролл страницы, пока открыт каталог ===
    useEffect(() => {
        const y = window.scrollY;
        // Способ без "скачка" страницы
        document.body.style.position = "fixed";
        document.body.style.top = `-${y}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
        (document.documentElement as HTMLElement).style.overscrollBehavior = "contain";

        return () => {
            const top = document.body.style.top;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";
            (document.documentElement as HTMLElement).style.overscrollBehavior = "";
            // вернёмся туда, где пользователь был до открытия
            const restoreY = top ? -parseInt(top, 10) : 0;
            window.scrollTo(0, restoreY);
        };
    }, []);

    // При клике на заголовок — аккордеон
    const catRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const toggle = (key: string) => {
        setOpen(v => (v === key ? null : key));
        requestAnimationFrame(() => catRefs.current[key]?.scrollIntoView({block: "nearest", behavior: "smooth"}));
    };

    return (
        <div
            className={[
                // Автоматическая высота панели: берём 85% высоты малого вьюпорта (svh) или всё окно минус 88px шапки/отступов
                "max-h-[min(85svh,calc(100svh-88px))] overflow-y-auto overscroll-contain",
                "rounded-xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10",
            ].join(" ")}
            style={{WebkitOverflowScrolling: "touch"}}
            role="dialog"
            aria-label={t("nav_catalog")}
        >
            {CATS.map(cat => (
                <div key={cat.key} ref={el => (catRefs.current[cat.key] = el)}
                     className="border-b last:border-none border-black/5 dark:border-white/10">
                    <button
                        onClick={() => toggle(cat.key)}
                        className="flex w-full items-center justify-between px-4 py-4 text-base"
                        aria-expanded={open === cat.key}
                        aria-controls={`cat-${cat.key}`}
                    >
                        <span className="font-medium text-left pr-3">{t(cat.labelKey)}</span>
                        <ChevronDown
                            className={`h-5 w-5 shrink-0 transition-transform ${open === cat.key ? "rotate-180" : ""}`}/>
                    </button>

                    <div
                        id={`cat-${cat.key}`}
                        className={[
                            open === cat.key ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                            "grid transition-[grid-template-rows] duration-200 ease-out",
                        ].join(" ")}
                    >
                        <div className="min-h-0 overflow-y-auto max-h-[min(70svh,calc(100svh-128px))] p-2"
                             style={{WebkitOverflowScrolling: "touch"}}>
                            {cat.children?.map(sub => (
                                <button
                                    key={sub.key}
                                    onClick={() => {
                                        setOpen(null);
                                        onDone();
                                        navigate(`/catalog/${cat.key}/${sub.key}`);
                                    }}
                                    className="block w-full rounded-lg px-3 py-3 text-left text-sm hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10"
                                >
                                    {t(sub.labelKey)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
