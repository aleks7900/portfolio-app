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
                className="group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen(v => !v)}
            >
                {t("nav_catalog")} <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}/>
            </button>
            {open && (
                <div role="menu"
                     className="absolute left-0 mt-2 w-[680px] rounded-2xl border bg-white p-4 shadow-lg dark:bg-black dark:border-white/10">
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
                                            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
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