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
import {useTranslation} from "react-i18next";
import logoImg from '@/assets/alex-lab-logo.png';
import logoDImg from '@/assets/alex-lab-logo-dark.png';

const navbarGradient = `
  /* Light/Dark palettes via CSS variable */
  :root {
    /* light: blue → violet → pink → amber (loop) */
    --nbg: linear-gradient(120deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6);
  }
  /* when .dark is present on html/body container */
  .dark, .dark :root {
    /* dark: cyan → deep blue → purple → slate (loop) */
    --nbg: linear-gradient(120deg, #0ea5e9, #1e3a8a, #4c1d95, #0f172a, #0ea5e9);
  }
  @keyframes navbar-glow-flow {
    0% { background-position: 0% 50%; filter: brightness(1); }
    50% { background-position: 100% 50%; filter: brightness(1.2); }
    100% { background-position: 0% 50%; filter: brightness(1); }
  }
`;


function LangToggle() {
    const {setLang} = useI18n();

    const {i18n} = useTranslation();
    const next = (i18n.resolvedLanguage || i18n.language || "ru").startsWith("ro") ? "ru" : "ro";


    return (
        <button
            className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium
                 !bg-slate-900 !text-white no-underline shadow-lg transition
                 hover:!bg-slate-400 hover:!shadow-2xl hover:!shadow-black/40
                 visited:text-black focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]"
            onClick={() => {
                setLang(next);                          // твой контекст
                i18n.changeLanguage(next);
                try {
                    localStorage.setItem("lang", next);
                } catch { /* empty */
                }
                document.documentElement.lang = next;
            }}
        >
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
            {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400"/> : <Moon className="h-5 w-5 text-sky-500"/>}
        </button>
    );
}

// Крупная непрозрачная кнопка: чёрный текст, на ховере тёмно-серая + большая тень
const BTN =
    "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium " +
    "bg-white !text-black no-underline shadow-lg transition " +                             // ← !text-black
    "hover:bg-neutral-800 hover:!text-white hover:shadow-2xl hover:shadow-black/40 " +      // ← hover:!text-white
    "visited:!text-black " +                                                                 // ← visited
    "focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]";

const BTN_YLW =
    "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium " +
    "bg-yellow-400 !text-black no-underline shadow-lg transition " +                             // ← !text-black
    "hover:bg-amber-500 hover:!text-white hover:shadow-2xl hover:shadow-black/40 " +      // ← hover:!text-white
    "visited:!text-black dark:!bg-amber-500 dark:hover:!bg-yellow-700 " +                                                                 // ← visited
    "focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]";

const BTN_GRAY =
    "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium " +
    "bg-slate-500 !text-white no-underline shadow-lg transition " +                             // ← !text-black
    "hover:bg-slate-900 hover:!text-white hover:shadow-2xl hover:shadow-black/40 " +      // ← hover:!text-white
    "visited:text-black dark:!bg-slate-700 dark:hover:!bg-gray-900 " +                                                                 // ← visited
    "focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]";

const BTN_BLUE =
    "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium " +
    "bg-sky-600 !text-white no-underline shadow-lg transition " +                             // ← !text-black
    "hover:bg-sky-900 hover:!text-white hover:shadow-2xl hover:shadow-black/40 " +      // ← hover:!text-white
    "visited:text-black dark:!bg-sky-800 dark:hover:!bg-black " +                                                                 // ← visited
    "focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.99]";

// Кнопка "Связаться" со спец. зелёным ховером
const BTN_CTA =
    "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-medium " +
    "bg-green-600 !text-white no-underline shadow-lg transition " +
    "hover:bg-emerald-300 hover:!text-black hover:shadow-2xl hover:shadow-green-600/50 " +
    "visited:text-black " +
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

    const scrollTop = () =>
        requestAnimationFrame(() => window.scrollTo({top: 0, behavior: "smooth"}));

    const linkClassYlw = ({isActive}: { isActive: boolean }) =>
        [BTN_YLW, isActive ? "bg-neutral-900 !text-white" : ""].join(" ");

    const linkClassBlue = ({isActive}: { isActive: boolean }) =>
        [BTN_BLUE, isActive ? "bg-neutral-900 !text-white" : ""].join(" ");

    const linkClassGray = ({isActive}: { isActive: boolean }) =>
        [BTN_GRAY, isActive ? "bg-neutral-900 !text-white" : ""].join(" ");

    return (
        <header
            className="fixed inset-x-0 top-0 z-[9999] isolate supports-[backdrop-filter]:backdrop-blur-md
                        border-b border-white/10 dark:border-white/10 before:content-[''] before:absolute before:inset-0 before:z-0
                        after:content-[''] after:absolute after:inset-0 after:z-0 before:pointer-events-none after:pointer-events-none"
            style={{
                // 1) Статичный деликатный узор (очень маленькие альфы)
                // 2) Белый и серый overlay-слои для «приглушения»
                // 3) Живой градиент (движется только последний слой)
                backgroundImage: [
                    'radial-gradient(circle at 12% 22%, rgba(255,255,255,0.35) 0%, transparent 22%)',
                    'radial-gradient(circle at 88% 78%, rgba(255,255,255,0.3) 0%, transparent 18%)',
                    'repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0, rgba(255,255,255,0.025) 100px, transparent 2px, transparent 10px)',
                    'linear-gradient(0deg, rgba(255,255,255, var(--nbg-overlay)), rgba(255,255,255, var(--nbg-overlay)))',
                    'linear-gradient(0deg, rgba(128,128,128, var(--nbg-gray)), rgba(128,128,128, var(--nbg-gray)))',
                    'var(--nbg)',
                ].join(', '),
                // размеры для каждого слоя: паттерн — авто; градиент — растянут и анимируется
                backgroundSize: ['auto', 'auto', 'auto', 'auto', 'auto', '300% 300%',
                ].join(', '),
                // закрепляем узор, двигаем только нижний градиент
                backgroundPosition: ['0% 0%', '0% 0%', '0% 0%', '0% 0%', '0% 0%', '0% 50%',
                ].join(', '),
                backgroundBlendMode: ['overlay','overlay','overlay','normal','normal','normal'].join(', '),
                animation: 'navbar-glow-flow 12s ease-in-out infinite',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.08), 0 6px 24px rgba(0,0,0,0.22)',
            }}>
            <style>{navbarGradient}</style>
            <Container>
                <div className="relative z-10 flex h-36 items-center justify-between">
                    <a
                        className="flex items-center gap-2 font-semibold tracking-tight"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/");
                            scrollTop();
                        }}
                    >
                        <img
                            src={logoImg}    // путь к твоей картинке
                            alt="Logo"
                            className="w-52 min-w-[4rem] min-h-[4rem] object-cover logo block dark:!hidden"
                        />
                        <img
                            src={logoDImg}     // путь к твоей картинке
                            alt="Logo"
                            className="w-52 min-w-[4rem] min-h-[4rem] object-cover logo hidden dark:!block"
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
                            <NavLink to="/service" className={linkClassYlw} end onClick={scrollTop}><Hammer
                                className="h-4 w-4"/> {t("nav_service")}</NavLink>
                            <NavLink to="/contacts" className={linkClassGray} end onClick={scrollTop}><Phone
                                className="h-4 w-4"/> {t("nav_contacts")}</NavLink>
                            <NavLink to="/about" className={linkClassBlue} end onClick={scrollTop}><Info
                                className="h-4 w-4"/> {t("nav_about")}
                            </NavLink>
                            {!isAuth ? (<NavLink to="/contacts"
                                                 className={() => BTN_CTA}
                                                 onClick={scrollTop}>{t("cta_contact")}<ArrowUpRight
                                className="ml-1 h-4 w-4"/></NavLink>) : (<></>)}
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
                                <LogIn className="h-5 w-5 !text-black hover:text-black"/>
                            </button>
                        )}
                        <LangToggle/>
                        <ThemeToggleBtn/>
                        <button className={BTN}
                                onClick={() => setOpen(v => !v)} aria-label="Menu">{open ?
                            <X className="h-5 w-5 !text-black hover:text-black"/> :
                            <Menu className="h-5 w-5 !text-black hover:text-black"/>}</button>
                    </div>
                </div>
                {open && (
                    <div
                        className="md:hidden pb-4 relative z-20
                                   !bg-white/90 dark:!bg-zinc-700
                                   !shadow-xl !rounded-b-2xl
                                   supports-[backdrop-filter]:backdrop-blur-md">
                        <div className="grid gap-2">
                            <MobileCatalog onDone={() => setOpen(false)}/>
                            <NavLink to="/service" onClick={() => {
                                setOpen(false);
                                scrollTop();
                            }}
                                     className={({isActive}) => [BTN, "justify-start", isActive ? "bg-neutral-900 text-white" : ""].join(" ")}><Hammer
                                className="h-4 w-4"/> {t("nav_service")}</NavLink>
                            <NavLink to="/contacts" onClick={() => {
                                setOpen(false);
                                scrollTop();
                            }}
                                     className={({isActive}) => [BTN, "justify-start", isActive ? "bg-neutral-900 text-white" : ""].join(" ")}><Phone
                                className="h-4 w-4"/> {t("nav_contacts")}</NavLink>
                            <NavLink to="/about" onClick={() => {
                                setOpen(false);
                                scrollTop();
                            }}
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