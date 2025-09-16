import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {ArrowUpRight, Hammer, Info, Languages, LogIn, LogOut, Menu, Moon, Phone, Sun, User, X} from "lucide-react";
import {useTheme} from "./theme/theme.tsx";
import {useI18n} from "./i18n/i18n.tsx";
import {useAuth} from "./auth/auth.tsx";
import Container from "./Container";
import DesktopCatalog from "../dropdowns/DesktopCatalog.tsx";
import MobileCatalog from "../dropdowns/MobileCatalog.tsx";
import LoginDialog from "../modals/Login.tsx";
import ConfirmDialog from "./modals/ConfirmDialog.tsx";
import AdminMenu from "../pages/admin/AdminMenu.tsx";


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

// Вариант «металла» для шапки: 'brushed' | 'perforated' | 'rivets'
type MetalVariant = "brushed" | "perforated" | "rivets";

const METAL_VARIANT: MetalVariant = "brushed";

const metalPatternByVariant: Record<MetalVariant, string> = {
    brushed: [
        "before:bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_6px,rgba(0,0,0,0.08)_6px,rgba(0,0,0,0.08)_12px)]",
        "before:opacity-80",
        "before:mix-blend-overlay",
    ].join(" "),
    perforated: [
        "before:bg-[radial-gradient(circle,rgba(0,0,0,0.7)_1.2px,transparent_1.4px)]",
        "before:bg-[length:14px_14px]",
        "before:opacity-60",
    ].join(" "),
    rivets: [
        "before:bg-[radial-gradient(circle,rgba(255,255,255,0.35)_2px,transparent_2.4px)]",
        "before:bg-[length:48px_48px]",
        "before:bg-[position:12px_12px]",
        "before:opacity-70",
    ].join(" "),
} as const;

export default function Navbar() {
    const {t} = useI18n();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);      // ← состояние модалки
    const {isAuth, logout, user} = useAuth();                   // ← авторизация

    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const linkBase = "group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition";
    const linkClass = ({isActive}: {
        isActive: boolean
    }) => [linkBase, isActive ? "bg-black text-white shadow dark:bg-white dark:text-black" : "hover:bg-black/5 dark:hover:bg-white/10"].join(" ");
    return (
        <header
            className={[
                "fixed inset-x-0 top-0 z-50",
                "supports-[backdrop-filter]:backdrop-blur-md",
                "border-b border-white/10 dark:border-white/10",
                // базовая прозрачность — фон убираем, пусть рисуют псевдослои
                "bg-transparent dark:bg-transparent",
                // Лёгкий стальной блик поверх
                "after:pointer-events-none after:absolute after:inset-0 after:rounded-none",
                "after:bg-[linear-gradient(145deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.02)_35%,rgba(0,0,0,0.20)_100%)]",
                "after:opacity-90",
                // Паттерн металлообработки в before
                "before:pointer-events-none before:absolute before:inset-0 before:rounded-none",
                metalPatternByVariant[METAL_VARIANT],
            ].join(" ")}
            style={{
                boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.08), 0 8px 30px rgba(0,0,0,0.25)",
            }}
        >
            <Container>
                <div className="flex h-36 items-center justify-between">
                    <a
                        className="flex items-center gap-2 font-semibold tracking-tight"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/");
                        }}
                    >
                        <img
                            src="/src/assets/logo.png"     // путь к твоей картинке
                            alt="Logo"
                            className="w-36 min-w-[4rem] min-h-[4rem] object-cover"
                        />
                        <span className="text-lg">{t("brandLogo")}</span>
                    </a>
                    <nav className="hidden md:flex items-center gap-2">
                        <div className="flex items-center gap-2">
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
                                    <AdminMenu/>
                                    <button onClick={() => setConfirmOpen(true)}
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
                        </div>
                        <div className="flex justify-end gap-2">
                            <LangToggle/>
                            <ThemeToggleBtn/>
                        </div>
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

            {/* Модалка подтверждения */}
            <ConfirmDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                title="Выйти из профиля?"
                message={
                    <>
                        Вы действительно хотите выйти{user?.email ? (
                        <> (<span className="font-medium">{user.email}</span>)</>
                    ) : null}
                        ?
                    </>
                }
                confirmText="Выйти"
                cancelText="Отмена"
                onConfirm={async () => {
                    logout();
                }}
            />
        </header>
    );
}