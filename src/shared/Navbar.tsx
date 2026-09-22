import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  Hammer,
  Info,
  Languages,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Phone,
  Sun,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./theme/theme.tsx";
import { toLangHref, useI18n } from "./i18n/i18n.tsx";
import { useAuth } from "./auth/auth.tsx";
import Container from "./Container";
import DesktopCatalog from "../dropdowns/DesktopCatalog.tsx";
import MobileCatalog from "../dropdowns/MobileCatalog.tsx";
import LoginDialog from "../pages/modals/Login.tsx";
import ConfirmDialog from "./modals/ConfirmDialog.tsx";
import AdminMenu from "../pages/admin/AdminMenu.tsx";
import logoImg from "@/assets/alex-lab-logo.png";
import logoDImg from "@/assets/alex-lab-logo-dark.png";
import { AnimatedBrandIcon } from "./AnimatedBrandIcon.tsx";

type LangCode = "ru" | "ro" | "en";

const LANGS: Array<{ code: LangCode; label: string }> = [
  { code: "ru", label: "RU" },
  { code: "ro", label: "RO" },
  { code: "en", label: "EN" },
];

export function LangToggle() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as LangCode | null;
      if (!saved) {
        const navLang = (navigator.language || "ru").toLowerCase();
        const base = navLang.split("-")[0];
        const auto: LangCode = base.startsWith("ro")
          ? "ro"
          : base.startsWith("en")
          ? "en"
          : "ru";
        setLang(auto);
        localStorage.setItem("lang", auto);
        document.documentElement.lang = auto;
      }
    } catch {
      document.documentElement.lang = lang;
    }
  }, [lang, setLang]);

  React.useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current?.contains(e.target as Node) ||
        btnRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  const currentLabel =
    LANGS.find((l) => l.code === lang)?.label ?? lang.toUpperCase();

  const applyLang = (next: LangCode) => {
    setLang(next);
    try {
      localStorage.setItem("lang", next);
    } catch {
      /* empty */
    }
    document.documentElement.lang = next;
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-foreground/80 hover:text-foreground bg-secondary/60 hover:bg-secondary border border-border/80 shadow-xs transition-all duration-150 outline-none select-none cursor-pointer active:scale-95"
      >
        <Languages className="h-3.5 w-3.5 text-primary" />
        <span>{currentLabel}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            role="listbox"
            aria-label="Select language"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-xl bg-card/95 backdrop-blur-xl shadow-xl border border-border p-1.5"
          >
            {LANGS.map(({ code, label }) => {
              const selected = code === lang;
              return (
                <button
                  key={code}
                  role="option"
                  aria-selected={selected}
                  onClick={() => applyLang(code)}
                  className={`w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer outline-none ${
                    selected
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  <span>{label}</span>
                  {selected && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ThemeToggleBtn() {
  const { theme, toggle } = useTheme();
  return (
    <button
      className="inline-flex items-center justify-center h-9 w-9 rounded-xl text-foreground bg-secondary/60 hover:bg-secondary border border-border/80 shadow-xs transition-all duration-150 outline-none select-none cursor-pointer active:scale-95"
      onClick={toggle}
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4 text-amber-400" />
        ) : (
          <Moon className="h-4 w-4 text-indigo-500" />
        )}
      </motion.div>
    </button>
  );
}

export default function Navbar() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { isAuth, logout, user } = useAuth();
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const scrollTop = () =>
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "relative inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-150 select-none",
      isActive
        ? "text-primary bg-primary/10 dark:bg-primary/20 font-semibold"
        : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
    ].join(" ");

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-200 glass-header">
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            to={toLangHref("/", lang)}
            onClick={scrollTop}
            className="flex items-center gap-3 font-semibold tracking-tight transition-opacity hover:opacity-90 cursor-pointer group"
          >
            <AnimatedBrandIcon size={38} />
            <div className="flex items-center">
              <img
                src={logoImg}
                alt="Alex-Lab Logo"
                width={160}
                height={40}
                className="h-10 w-auto object-contain block dark:hidden"
              />
              <img
                src={logoDImg}
                alt="Alex-Lab Logo"
                width={160}
                height={40}
                className="h-10 w-auto object-contain hidden dark:block"
              />
            </div>
            {t("brandLogo") ? (
              <span className="hidden sm:inline-block text-base font-bold tracking-tight text-foreground">
                {t("brandLogo")}
              </span>
            ) : null}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <DesktopCatalog />

            <NavLink
              to={toLangHref("/service", lang)}
              className={navLinkClass}
              end
              onClick={scrollTop}
            >
              <Hammer className="h-4 w-4" /> {t("nav_service")}
            </NavLink>

            <NavLink
              to={toLangHref("/contacts", lang)}
              className={navLinkClass}
              end
              onClick={scrollTop}
            >
              <Phone className="h-4 w-4" /> {t("nav_contacts")}
            </NavLink>

            <NavLink
              to={toLangHref("/about", lang)}
              className={navLinkClass}
              end
              onClick={scrollTop}
            >
              <Info className="h-4 w-4" /> {t("nav_about")}
            </NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {!isAuth && (
              <NavLink
                to={toLangHref("/contacts", lang)}
                onClick={scrollTop}
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20 hover:shadow-md hover:shadow-emerald-600/30 transition-all duration-150 active:scale-95"
              >
                <span>{t("cta_contact")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </NavLink>
            )}

            {isAuth ? (
              <>
                <AdminMenu />
                <button
                  onClick={() => setConfirmOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-foreground/80 hover:text-foreground bg-secondary/60 hover:bg-secondary border border-border/80 shadow-xs transition-all duration-150 outline-none select-none cursor-pointer active:scale-95"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>{t("logout")}</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-foreground/80 hover:text-foreground bg-secondary/60 hover:bg-secondary border border-border/80 shadow-xs transition-all duration-150 outline-none select-none cursor-pointer active:scale-95"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>{t("login")}</span>
              </button>
            )}

            <div className="h-5 w-px bg-border/80 mx-1" />

            <LangToggle />
            <ThemeToggleBtn />
          </div>

          {/* Mobile Right Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <LangToggle />
            <ThemeToggleBtn />
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl text-foreground bg-secondary/60 hover:bg-secondary border border-border/80 shadow-xs transition-all outline-none select-none cursor-pointer active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden border-t border-border/60 pb-6 pt-3"
            >
              <div className="flex flex-col gap-3">
                <MobileCatalog onDone={() => setOpen(false)} />

                <div className="grid gap-1 border-t border-border/60 pt-3">
                  <NavLink
                    to={toLangHref("/service", lang)}
                    onClick={() => {
                      setOpen(false);
                      scrollTop();
                    }}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/15 text-primary font-semibold"
                          : "text-foreground/80 hover:bg-accent",
                      ].join(" ")
                    }
                  >
                    <Hammer className="h-4 w-4 text-primary" />
                    <span>{t("nav_service")}</span>
                  </NavLink>

                  <NavLink
                    to={toLangHref("/contacts", lang)}
                    onClick={() => {
                      setOpen(false);
                      scrollTop();
                    }}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/15 text-primary font-semibold"
                          : "text-foreground/80 hover:bg-accent",
                      ].join(" ")
                    }
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{t("nav_contacts")}</span>
                  </NavLink>

                  <NavLink
                    to={toLangHref("/about", lang)}
                    onClick={() => {
                      setOpen(false);
                      scrollTop();
                    }}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/15 text-primary font-semibold"
                          : "text-foreground/80 hover:bg-accent",
                      ].join(" ")
                    }
                  >
                    <Info className="h-4 w-4 text-primary" />
                    <span>{t("nav_about")}</span>
                  </NavLink>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-border/60">
                  {!isAuth ? (
                    <>
                      <NavLink
                        to={toLangHref("/contacts", lang)}
                        onClick={() => {
                          setOpen(false);
                          scrollTop();
                        }}
                        className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                      >
                        <span>{t("cta_contact")}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </NavLink>
                      <button
                        onClick={() => {
                          setOpen(false);
                          setShowLogin(true);
                        }}
                        className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
                      >
                        <LogIn className="h-4 w-4" />
                        <span>{t("login")}</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <AdminMenu />
                      <button
                        onClick={() => {
                          setOpen(false);
                          setConfirmOpen(true);
                        }}
                        className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{t("logout")}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      {/* Login Modal */}
      <LoginDialog open={showLogin} onClose={() => setShowLogin(false)} />

      {/* Logout Confirmation */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Выйти из профиля?"
        message={
          <>
            Вы действительно хотите выйти
            {user?.email ? (
              <>
                {" "}
                (<span className="font-medium text-foreground">{user.email}</span>)
              </>
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