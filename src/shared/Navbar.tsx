import React, {useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {
    ArrowUpRight,
    ChevronDown,
    ChevronRight,
    Hammer,
    Info,
    Languages,
    LogIn,
    LogOut,
    Menu,
    Moon,
    Phone,
    Sun,
    User,
    X
} from "lucide-react";
import {useTheme} from "./theme/theme.tsx";
import {useI18n} from "./i18n/i18n.tsx";
import {useAuth} from "./auth/auth.tsx";
import Container from "./Container";

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


function LangToggle() {
    const {lang, setLang} = useI18n();
    const next = lang === "ru" ? "en" : "ru";
    return (
        <button
            className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => setLang(next)}>
            <Languages className="h-4 w-4"/> {next.toUpperCase()}
        </button>
    );
}

function ThemeToggleBtn() {
    const {theme, toggle} = useTheme();
    return (
        <button className="rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/10" onClick={toggle} aria-label="Theme">
            {theme === "dark" ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
        </button>
    );
}

function DesktopCatalog() {
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

function MobileCatalog({onDone}: { onDone: () => void }) {
    const {t} = useI18n();
    const navigate = useNavigate();
    const [open, setOpen] = useState<string | null>(null);
    return (
        <div className="rounded-xl bg-gray-50 dark:bg-white/5">
            {CATS.map(cat => (
                <div key={cat.key} className="border-b last:border-none border-black/5 dark:border-white/10">
                    <button onClick={() => setOpen(v => v === cat.key ? null : cat.key)}
                            className="flex w-full items-center justify-between px-4 py-3 text-base">
                        <span>{t(cat.labelKey)}</span>
                        <ChevronDown
                            className={`h-4 w-4 transition-transform ${open === cat.key ? "rotate-180" : ""}`}/>
                    </button>
                    {open === cat.key && (
                        <div className="p-2">
                            {cat.children?.map(sub => (
                                <button key={sub.key} onClick={() => {
                                    navigate(`/catalog/${cat.key}/${sub.key}`);
                                    onDone();
                                }}
                                        className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-black/5 dark:hover:bg-white/10">
                                    {t(sub.labelKey)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

function LoginDialog({open, onClose}: { open: boolean; onClose: () => void }) {
    const {t} = useI18n();
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState<string | null>(null);
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[100] grid items-center justify-center bg-black/40 p-4" role="dialog"
             aria-modal="true">
            <div
                className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-xl dark:bg-black dark:border-white/10">
                <div className="mb-4 text-lg font-semibold">{t("login")}</div>
                {err && <div
                    className="mb-3 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">{err}</div>}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            await login(email, password);
                            onClose();
                        } catch (e) {
                            if (e instanceof Error) {
                                setErr(e.message);
                            } else {
                                setErr("Login error");
                            }
                        }
                    }}
                >
                    <label className="block text-sm font-medium">{t("email")}</label>
                    <input value={email} onChange={(e) => setEmail(e.currentTarget.value)} type="email"
                           className="mt-1 w-full rounded-xl border px-3 py-2 dark:bg-black dark:border-white/20"
                           placeholder="you@example.com"/>
                    <label className="mt-3 block text-sm font-medium">{t("password")}</label>
                    <input value={password} onChange={(e) => setPassword(e.currentTarget.value)} type="password"
                           className="mt-1 w-full rounded-xl border px-3 py-2 dark:bg-black dark:border-white/20"
                           placeholder="••••••••"/>
                    <div className="mt-5 flex items-center gap-2">
                        <button type="submit"
                                className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90">{t("sign_in")}</button>
                        <button type="button" onClick={onClose}
                                className="rounded-xl border px-4 py-2 text-sm hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black">{t("cancel")}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function Navbar() {
    const {t} = useI18n();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);      // ← состояние модалки
    const {isAuth, logout} = useAuth();                   // ← авторизация
    const linkBase = "group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition";
    const linkClass = ({isActive}: {
        isActive: boolean
    }) => [linkBase, isActive ? "bg-black text-white shadow dark:bg-white dark:text-black" : "hover:bg-black/5 dark:hover:bg-white/10"].join(" ");
    return (
        <header
            className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b dark:bg-black/60 dark:supports-[backdrop-filter]:bg-black/40 dark:border-white/10">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <a className="flex items-center gap-2 font-semibold tracking-tight" href="#" onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                    }}>
                        <span
                            className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">R</span>
                        <span className="text-lg">{t("brandLogo")}</span>
                    </a>
                    <nav className="hidden md:flex items-center gap-2">
                        <DesktopCatalog/>
                        <NavLink to="/service" className={linkClass} end><Hammer
                            className="h-4 w-4"/> {t("nav_service")}</NavLink>
                        <NavLink to="/contacts" className={linkClass} end><Phone
                            className="h-4 w-4"/> {t("nav_contacts")}</NavLink>
                        <NavLink to="/about" className={linkClass} end><Info className="h-4 w-4"/> {t("nav_about")}
                        </NavLink>
                        <NavLink to="/contacts"
                                 className={() => "ml-1 inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90"}>{t("cta_contact")}
                            <ArrowUpRight className="ml-1 h-4 w-4"/></NavLink>
                        {isAuth ? (
                            <>
                                <NavLink to="/products"
                                         className={({isActive}) => `group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm ${isActive ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-black/5 dark:hover:bg-white/10"}`}>
                                    <User className="h-4 w-4"/> {t("nav_products_private")}
                                </NavLink>
                                <button onClick={logout}
                                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
                                    <LogOut className="h-4 w-4"/> {t("logout")}
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setShowLogin(true)}
                                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
                                <LogIn className="h-4 w-4"/> {t("login")}
                            </button>
                        )}
                        <LangToggle/>
                        <ThemeToggleBtn/>
                    </nav>
                    <div className="md:hidden flex items-center gap-1">
                        {isAuth ? (
                            <NavLink to="/products"
                                     className={() => "rounded-xl px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"}
                                     aria-label="Account">
                                <User className="h-5 w-5"/>
                            </NavLink>
                        ) : (
                            <button onClick={() => setShowLogin(true)}
                                    className="rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/10"
                                    aria-label="Login">
                                <LogIn className="h-5 w-5"/>
                            </button>
                        )}
                        <LangToggle/>
                        <ThemeToggleBtn/>
                        <button className="rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/10"
                                onClick={() => setOpen(v => !v)} aria-label="Menu">{open ? <X className="h-5 w-5"/> :
                            <Menu className="h-5 w-5"/>}</button>
                    </div>
                </div>
                {open && (
                    <div className="md:hidden pb-4">
                        <div className="grid gap-2">
                            <MobileCatalog onDone={() => setOpen(false)}/>
                            <NavLink to="/service" onClick={() => setOpen(false)}
                                     className={({isActive}) => ["flex items-center gap-3 rounded-xl px-4 py-3 text-base", isActive ? "bg-black text-white dark:bg-white dark:text-black" : "bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"].join(" ")}><Hammer
                                className="h-4 w-4"/> {t("nav_service")}</NavLink>
                            <NavLink to="/contacts" onClick={() => setOpen(false)}
                                     className={({isActive}) => ["flex items-center gap-3 rounded-xl px-4 py-3 text-base", isActive ? "bg-black text-white dark:bg-white dark:text-black" : "bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"].join(" ")}><Phone
                                className="h-4 w-4"/> {t("nav_contacts")}</NavLink>
                            <NavLink to="/about" onClick={() => setOpen(false)}
                                     className={({isActive}) => ["flex items-center gap-3 rounded-xl px-4 py-3 text-base", isActive ? "bg-black text-white dark:bg-white dark:text-black" : "bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"].join(" ")}><Info
                                className="h-4 w-4"/> {t("nav_about")}</NavLink>
                        </div>
                    </div>
                )}
            </Container>
            {/* Модалка логина */}
            <LoginDialog open={showLogin} onClose={() => setShowLogin(false)}/>
        </header>
    );
}