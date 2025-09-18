import {useI18n} from "../shared/i18n/i18n.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {ChevronDown, ChevronRight} from "lucide-react";

const CATS = [
    {
        key: "electronics", labelKey: "cat_electronics", children: [
            {key: "laptops", labelKey: "sub_laptops"},
            {key: "phones", labelKey: "sub_phones"},
            {key: "tablets", labelKey: "sub_tablets"},
        ]
    },
    {
        key: "home", labelKey: "cat_home", children: [
            {key: "vacuum", labelKey: "sub_vacuum"},
            {key: "fridges", labelKey: "sub_fridges"},
        ]
    },
    {
        key: "accessories", labelKey: "cat_accessories", children: [
            {key: "headphones", labelKey: "sub_headphones"},
            {key: "chargers", labelKey: "sub_chargers"},
        ]
    },
];

const BTN =
    "flex items-center justify-between rounded-lg px-5 py-3 text-base font-medium " +
    "bg-white text-black no-underline shadow-lg transition " +
    "hover:!bg-black hover:!text-white hover:!shadow-2xl hover:!shadow-black/40 " +
    "focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]";

export default function DesktopCatalog() {
    const {t} = useI18n();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const location = useLocation();


    // Закрыть при клике вне меню
    React.useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!containerRef.current) return;
            if (!containerRef.current.contains(e.target as Node)) setOpen(false);
        }

        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);


    // Закрыть при смене маршрута
    React.useEffect(() => {
        setOpen(false);
    }, [location.pathname]);


    // Закрыть по Escape
    React.useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }

        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);


    return (
        <div className="relative" ref={containerRef}>
            <button
                className="relative z-10 inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium
             !bg-red-200 !text-black no-underline shadow transition-colors
             hover:!bg-red-500 hover:!text-white hover:shadow-xl
             focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-[0.99] mix-blend-normal"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen(v => !v)}
            >
                {t("nav_catalog")}
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}/>
            </button>
            {open && (
                <div role="menu"
                     className="absolute left-0 mt-2 w-[680px] rounded-2xl border bg-white p-4 drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] dark:bg-gray-800 dark:border-white/10">
                    <div className="grid grid-cols-3 gap-4">
                        {CATS.map(cat => (
                            <div key={cat.key}>
                                <div
                                    className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">{t(cat.labelKey)}</div>
                                <div className="grid">
                                    {cat.children?.map(sub => (
                                        <button
                                            key={sub.key}
                                            role="menuitem"
                                            onClick={() => {
                                                navigate(`/catalog/${cat.key}/${sub.key}`);
                                                setOpen(false);
                                            }}
                                            className={BTN}
                                        >
                                            <span>{t(sub.labelKey)}</span>
                                            <ChevronRight className="h-4 w-4"/>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}