import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {
    ArrowUpRight,
    Hammer,
    Info,
    Languages,
    LogIn,
    LogOut,
    Menu,
    Moon,
    Phone,
    Search,
    Sun,
    User,
    X
} from "lucide-react";
import {useTheme} from "./theme/theme.tsx";
import {useI18n} from "./i18n/i18n.tsx";
import {useAuth} from "./auth/auth.tsx";
import Container from "./Container";
import DesktopCatalog from "../dropdowns/DesktopCatalog.tsx";
import MobileCatalog from "../dropdowns/MobileCatalog.tsx";
import LoginDialog from "../pages/modals/Login.tsx";
import ConfirmDialog from "./modals/ConfirmDialog.tsx";
import AdminMenu from "../pages/admin/AdminMenu.tsx";


function LangToggle() {
    const {lang, setLang} = useI18n();
    const next = lang === "ru" ? "en" : "ru";
    return (
        <button
            className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium
                    bg-white !text-black no-underline shadow-lg transition
                    hover:bg-neutral-800 hover:shadow-2xl hover:shadow-black/40
                    visited:!text-black focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]"
            onClick={() => setLang(next)}>
            <Languages className="h-4 w-4"/> {next.toUpperCase()}
        </button>
    );
}

function ThemeToggleBtn() {
    const {theme, toggle} = useTheme();
    return (
        <button className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium
                    bg-white !text-black no-underline shadow-lg transition
                    hover:bg-neutral-800 hover:shadow-2xl hover:shadow-black/40
                    visited:!text-black focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]"
                onClick={toggle} aria-label="Theme">
            {theme === "dark" ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
        </button>
    );
}

// Вариант «металла» для шапки: 'brushed' | 'perforated' | 'rivets'
type MetalVariant = "brushed" | "perforated" | "rivets";

const METAL_VARIANT: MetalVariant = "brushed";

const metalPatternByVariant: Record<MetalVariant, string> = {
    brushed: [
        // полосы шлифовки
        "before:bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_6px,rgba(0,0,0,0.08)_6px,rgba(0,0,0,0.08)_12px)]",
        // затемнение края
        "before:bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.4))]",
        "before:bg-blend-overlay",
        "before:opacity-90",
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

// Крупная непрозрачная кнопка: чёрный текст, на ховере тёмно-серая + большая тень
const BTN =
    "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium " +
    "bg-white !text-black no-underline shadow-lg transition " +                             // ← !text-black
    "hover:bg-neutral-800 hover:!text-white hover:shadow-2xl hover:shadow-black/40 " +      // ← hover:!text-white
    "visited:!text-black " +                                                                 // ← visited
    "focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]";

const BTN_ICON =
    "rounded-2xl p-3 text-base font-medium " +
    "bg-white !text-black no-underline shadow-lg transition " +
    "hover:bg-neutral-800 hover:!text-white hover:!shadow-2xl hover:!shadow-black/40 " +
    "visited:!text-black " +
    "focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]";

// Кнопка "Связаться" со спец. зелёным ховером
const BTN_CTA =
    "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium " +
    "bg-white !text-black no-underline shadow-lg transition " +
    "hover:bg-green-600 hover:!text-white hover:shadow-2xl hover:shadow-green-600/50 " +
    "visited:!text-black " +
    "focus:outline-none focus:ring-2 focus:ring-green-500 active:scale-[0.99]";

export default function Navbar() {
    const {t} = useI18n();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);      // ← состояние модалки
    const {isAuth, logout, user} = useAuth();                   // ← авторизация

    const [confirmOpen, setConfirmOpen] = React.useState(false);

    // рядом с другими useState
    const [showSearchBtn, setShowSearchBtn] = useState(false);

// константа порога (пиксели)
    const SCROLL_TRIGGER = 220;

    const openSearch = () => {
        const fire = () => window.dispatchEvent(new Event("open-search"));
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(fire, 0); // дождаться рендера главной
        } else {
            fire();
        }
    };

    React.useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setShowSearchBtn(window.scrollY > SCROLL_TRIGGER);
                    ticking = false;
                });
                ticking = true;
            }
        };
        onScroll(); // выставить начальное состояние
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const linkClass = ({isActive}: { isActive: boolean }) =>
        [BTN, isActive ? "bg-neutral-900 text-white" : ""].join(" ");
    return (
        <header
            className={[
                "fixed inset-x-0 top-0 z-[9999] isolate",                      // ← isolate создаёт свой стек
                "supports-[backdrop-filter]:backdrop-blur-md",
                "border-b border-white/10 dark:border-white/10",
                "bg-transparent dark:bg-transparent",
                "before:content-[''] before:absolute before:inset-0 before:z-0", // ← под контент
                "after:content-['']  after:absolute  after:inset-0  after:z-0",
                "after:bg-[linear-gradient(145deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.02)_35%,rgba(0,0,0,0.20)_100%)] after:opacity-85",
                "before:pointer-events-none after:pointer-events-none",
                metalPatternByVariant[METAL_VARIANT],
            ].join(" ")}
            style={{boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.08), 0 8px 30px rgba(0,0,0,0.25)"}}
        >
            <Container>
                <div className="relative z-10 flex h-36 items-center justify-between">
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
                        <div className="flex justify-end gap-2 items-center">
                            {/* ПОЯВЛЯЮЩАЯСЯ КНОПКА ПОИСКА */}
                            <button
                                type="button"
                                aria-label="Search"
                                onClick={openSearch} // ← замени на свой обработчик, если нужно открыть модалку/фокус инпут
                                className={[
                                    "rounded-2xl p-3 text-base font-medium bg-white !text-black no-underline shadow-lg transition " +
                                    "hover:bg-neutral-800 hover:!shadow-2xl hover:!shadow-black/40 " +
                                    "visited:!text-black focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]",
                                    // плавное появление/исчезновение, без «дёрганья»
                                    "transition-opacity duration-200",
                                    showSearchBtn ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-1"
                                ].join(" ")}
                            >
                                <Search className="h-5 w-5"/>
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <DesktopCatalog/>
                            <NavLink to="/service" className={linkClass} end><Hammer
                                className="h-4 w-4"/> {t("nav_service")}</NavLink>
                            <NavLink to="/contacts" className={linkClass} end><Phone
                                className="h-4 w-4"/> {t("nav_contacts")}</NavLink>
                            <NavLink to="/about" className={linkClass} end><Info className="h-4 w-4"/> {t("nav_about")}
                            </NavLink>
                            <NavLink to="/contacts"
                                     className={() => BTN_CTA}>{t("cta_contact")}<ArrowUpRight
                                className="ml-1 h-4 w-4"/></NavLink>
                            {isAuth ? (
                                <>
                                    <AdminMenu/>
                                    <button onClick={() => setConfirmOpen(true)}
                                            className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium
                                                    bg-white !text-black no-underline shadow-lg transition
                                                    hover:bg-neutral-800 hover:shadow-2xl hover:shadow-black/40
                                                    visited:!text-black focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]">
                                        <LogOut className="h-4 w-4"/> {t("logout")}
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => setShowLogin(true)}
                                        className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium
                                                bg-white !text-black no-underline shadow-lg transition
                                                hover:bg-neutral-800 hover:shadow-2xl hover:shadow-black/40
                                                visited:!text-black focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]">
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
                                     className={() => BTN}
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
                        <button className={BTN}
                                onClick={() => setOpen(v => !v)} aria-label="Menu">{open ? <X className="h-5 w-5"/> :
                            <Menu className="h-5 w-5"/>}</button>
                    </div>
                </div>
                {open && (
                    <div
                        className="md:hidden pb-4 relative z-20
                                   !bg-white/90 dark:!bg-black/90
                                   !shadow-xl !rounded-b-2xl
                                   supports-[backdrop-filter]:backdrop-blur-md">
                        <div className="grid gap-2">
                            <MobileCatalog onDone={() => setOpen(false)}/>
                            <NavLink to="/service" onClick={() => setOpen(false)}
                                     className={({isActive}) => [BTN, "justify-start", isActive ? "bg-neutral-900 text-white" : ""].join(" ")}><Hammer
                                className="h-4 w-4"/> {t("nav_service")}</NavLink>
                            <NavLink to="/contacts" onClick={() => setOpen(false)}
                                     className={({isActive}) => [BTN, "justify-start", isActive ? "bg-neutral-900 text-white" : ""].join(" ")}><Phone
                                className="h-4 w-4"/> {t("nav_contacts")}</NavLink>
                            <NavLink to="/about" onClick={() => setOpen(false)}
                                     className={({isActive}) => [BTN, "justify-start", isActive ? "bg-neutral-900 text-white" : ""].join(" ")}><Info
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