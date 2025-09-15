import React from "react";
import {ChevronDown} from "lucide-react";
import {Link} from "react-router-dom";

export default function AdminMenu() {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement | null>(null);

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
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
            >
                Админка <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}/>
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border bg-white p-2 shadow-xl
                        dark:border-white/10 dark:bg-neutral-900">
                    <MenuItem to="/admin/products" label="Мои товары" onClick={() => setOpen(false)}/>
                    <MenuItem to="/admin/users" label="Пользователи" onClick={() => setOpen(false)}/>
                    <MenuItem to="/admin/requests" label="Заявки" onClick={() => setOpen(false)}/>
                </div>
            )}
        </div>
    );
}

function MenuItem({to, label, onClick}: { to: string; label: string; onClick: () => void }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="block rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
        >
            {label}
        </Link>
    );
}
