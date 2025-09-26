import React from "react";
import {ChevronDown} from "lucide-react";
import {Link} from "react-router-dom";
import {useI18n} from "../../shared/i18n/i18n.tsx";

export default function AdminMenu() {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement | null>(null);

    const {t} = useI18n();

    React.useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-black hover:bg-black/5 dark:hover:bg-white/10 hover:shadow-2xl"
            >
                {t("admin_menu")} <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}/>
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border bg-white p-2 shadow-xl
                        dark:border-white/10 dark:!bg-gray-800">
                    <MenuItem to="/admin/products" label="admin_menu_produse" onClick={() => setOpen(false)}/>
                    <MenuItem to="/admin/users" label="admin_menu_userii" onClick={() => setOpen(false)}/>
                    <MenuItem to="/admin/requests" label="admin_menu_aplic" onClick={() => setOpen(false)}/>
                    <MenuItem to="/admin/analytics" label="admin_menu_analytics" onClick={() => setOpen(false)}/>
                </div>
            )}
        </div>
    );
}

function MenuItem({to, label, onClick}: { to: string; label: string; onClick: () => void }) {
    const {t} = useI18n();

    return (
        <Link
            to={to}
            onClick={onClick}
            className="block rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
        >
            {t(label)}
        </Link>
    );
}
