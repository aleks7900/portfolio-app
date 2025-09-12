import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, useNavigate, useParams } from "react-router-dom";
import { Menu, X, ArrowUpRight, Hammer, Phone, Info, Moon, Sun, Languages, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

// ============================
// i18n — минимальный локальный движок
// ============================
type Lang = "ru" | "en";
type Dictionary = Record<Lang, Record<string, string>>;

const dict: Dictionary = {
    ru: {
        brand: "ReactOne",
        nav_service: "Сервис",
        nav_contacts: "Контакты",
        nav_about: "О нас",
        nav_catalog: "Каталог товаров",
        cat_laptops: "Ноутбуки",
        cat_phones: "Смартфоны",
        cat_accessories: "Аксессуары",
        cta_contact: "Связаться",
        hero_title: "Лёгкий старт одностраничника на React + TS",
        hero_sub: "Базовая модель с верхней панелью навигации: Сервис, Контакты, О нас. Добавляйте блоки, меняйте стили, подключайте данные — всё уже готово к расширению.",
        hero_to_services: "К услугам",
        hero_to_contacts: "Связаться",
        service_title: "Сервис",
        service_lead: "Пример списка услуг. Замените на ваши реальные предложения.",
        contacts_title: "Контакты",
        contacts_lead: "Небольшая форма-заглушка. Подключите ваш обработчик или сервис почты.",
        contacts_name: "Имя",
        contacts_email: "Email",
        contacts_msg: "Сообщение",
        contacts_send: "Отправить",
        about_title: "О нас",
        about_lead: "Короткий текст о компании и ценностях. Секция легко расширяется под кейсы, команду и вакансии.",
        about_p1: "Мы создаём быстрые и стабильные интерфейсы. Любим прозрачные процессы, Code Review и метрики качества.",
        about_p2: "Стек: React, TypeScript, Tailwind, shadcn/ui, Vite/Next.js, Framer Motion.",
        more: "Подробнее",
        footer_about: "О нас",
        footer_contacts: "Контакты",
        services_audit: "Аудит фронтенда",
        services_audit_desc: "Разбираем производительность, доступность и структуру проекта.",
        services_uikit: "UI-Кит",
        services_uikit_desc: "Единые компоненты, темы и токены дизайна для масштабирования.",
        services_ssr: "SPA/SSR",
        services_ssr_desc: "Клиентская навигация, роутинг и SEO-дружественные страницы.",
        services_integr: "Интеграции",
        services_integr_desc: "Подключаем API, обновляем данные, формы и аналитики.",
        services_spa: "Разработка SPA",
        services_spa_desc: "Одностраничные приложения на React.",
        services_opt: "Оптимизация",
        services_opt_desc: "Code-splitting, lazy, кеширование и Lighthouse 95+.",
        services_base: "Компонентная база",
        services_base_desc: "Атомарные/компаунд-компоненты, документация, сторибук.",
        catalog_title: "Каталог",
        catalog_lead: "Выберите категорию в меню сверху — откроется страница с заглушкой.",
        catalog_selected: "Вы выбрали категорию:",
    },
    en: {
        brand: "ReactOne",
        nav_service: "Service",
        nav_contacts: "Contacts",
        nav_about: "About",
        nav_catalog: "Catalog",
        cat_laptops: "Laptops",
        cat_phones: "Phones",
        cat_accessories: "Accessories",
        cta_contact: "Contact",
        hero_title: "Quick start single page on React + TS",
        hero_sub: "A minimal model with a top nav: Service, Contacts, About. Extend blocks, tweak styles, wire data.",
        hero_to_services: "To services",
        hero_to_contacts: "Contact",
        service_title: "Service",
        service_lead: "Sample services list. Replace with your offerings.",
        contacts_title: "Contacts",
        contacts_lead: "Small demo form. Connect your handler or email service.",
        contacts_name: "Name",
        contacts_email: "Email",
        contacts_msg: "Message",
        contacts_send: "Send",
        about_title: "About",
        about_lead: "Brief about the company and values. Extend with cases, team, jobs.",
        about_p1: "We build fast and stable interfaces. We value transparent processes, code review and quality metrics.",
        about_p2: "Stack: React, TypeScript, Tailwind, shadcn/ui, Vite/Next.js, Framer Motion.",
        more: "Learn more",
        footer_about: "About",
        footer_contacts: "Contacts",
        services_audit: "Frontend audit",
        services_audit_desc: "Performance, a11y and architecture analysis.",
        services_uikit: "UI Kit",
        services_uikit_desc: "Unified components, themes and design tokens.",
        services_ssr: "SPA/SSR",
        services_ssr_desc: "Client navigation, routing and SEO-friendly pages.",
        services_integr: "Integrations",
        services_integr_desc: "Wire APIs, live data, forms and analytics.",
        services_spa: "SPA development",
        services_spa_desc: "Single-page apps with React.",
        services_opt: "Optimization",
        services_opt_desc: "Code-splitting, lazy, caching and Lighthouse 95+.",
        services_base: "Component base",
        services_base_desc: "Atomic/compound components, docs, Storybook.",
        catalog_title: "Catalog",
        catalog_lead: "Pick a category from the top menu — a placeholder page will open.",
        catalog_selected: "You selected category:",
    },
};

const I18nCtx = createContext<{ lang: Lang; t: (k: string) => string; setLang: (l: Lang) => void } | null>(null);
function useI18n() {
    const ctx = useContext(I18nCtx);
    if (!ctx) throw new Error("I18n provider missing");
    return ctx;
}

function I18nProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "ru");
    useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);
    const t = useCallback((k: string) => dict[lang][k] ?? k, [lang]);
    const value = useMemo(() => ({ lang, t, setLang }), [lang, t]);
    return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

// ============================
// Темы — тёмная/светлая через класс на <html>
// ============================
type Theme = "light" | "dark";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void } | null>(null);
function useTheme() {
    const ctx = useContext(ThemeCtx);
    if (!ctx) throw new Error("Theme provider missing");
    return ctx;
}
function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "light");
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") root.classList.add("dark"); else root.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);
    const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
    const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
    return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

// ============================
// UI Компоненты
// ============================
function Brand() {
    const { t } = useI18n();
    const navigate = useNavigate();
    return (
        <a
            className="flex items-center gap-2 font-semibold tracking-tight"
            href="#"
            onClick={(e) => { e.preventDefault(); navigate("/"); }}
        >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">R</span>
            <span className="text-lg">{t("brand")}</span>
        </a>
    );
}

function ThemeToggle() {
    const { theme, toggle } = useTheme();
    return (
        <button
            className="rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/10"
            onClick={toggle}
            aria-label="Toggle theme"
            title="Theme"
        >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
    );
}

function LangToggle() {
    const { lang, setLang } = useI18n();
    const next = lang === "ru" ? "en" : "ru";
    return (
        <button
            className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => setLang(next)}
            title="Language"
        >
            <Languages className="h-4 w-4" /> {next.toUpperCase()}
        </button>
    );
}

function CatalogDropdown({ onNavigate }: { onNavigate?: () => void }) {
    const { t } = useI18n();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const go = (slug: string) => {
        navigate(`/catalog/${slug}`);
        setOpen(false);
        onNavigate?.();
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                onBlur={(e) => {
                    // Закрываем, если фокус ушёл за пределы дропдауна
                    if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) setOpen(false);
                }}
                className="group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
            >
                {t("nav_catalog")} <ChevronDown className="h-4 w-4 transition-transform group-aria-expanded:rotate-180" aria-hidden />
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white p-2 shadow-lg dark:bg-black dark:border-white/10">
                    <button onClick={() => go("laptops")} className="w-full text-left rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
                        {t("cat_laptops")}
                    </button>
                    <button onClick={() => go("phones")} className="w-full text-left rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
                        {t("cat_phones")}
                    </button>
                    <button onClick={() => go("accessories")} className="w-full text-left rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg:white/10">
                        {t("cat_accessories")}
                    </button>
                </div>
            )}
        </div>
    );
}

function Navbar() {
    const { t } = useI18n();
    const [open, setOpen] = useState(false);
    const [mobileCatOpen, setMobileCatOpen] = useState(false);

    const linkBase = "group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition";
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        [linkBase, isActive ? "bg-black text-white shadow dark:bg-white dark:text-black" : "hover:bg-black/5 dark:hover:bg-white/10"].join(" ");

    return (
        <header className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b dark:bg-black/60 dark:supports-[backdrop-filter]:bg-black/40 dark:border-white/10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex h-16 items-center justify-between">
                    <Brand />

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-2">
                        <CatalogDropdown />
                        <NavLink to="/service" className={linkClass} end>
                            <Hammer className="h-4 w-4" /> {t("nav_service")}
                        </NavLink>
                        <NavLink to="/contacts" className={linkClass} end>
                            <Phone className="h-4 w-4" /> {t("nav_contacts")}
                        </NavLink>
                        <NavLink to="/about" className={linkClass} end>
                            <Info className="h-4 w-4" /> {t("nav_about")}
                        </NavLink>
                        <NavLink
                            to="/contacts"
                            className={() => "ml-1 inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90"}
                        >
                            {t("cta_contact")} <ArrowUpRight className="ml-1 h-4 w-4" />
                        </NavLink>
                        <LangToggle />
                        <ThemeToggle />
                    </nav>

                    {/* Mobile toggle */}
                    <div className="md:hidden flex items-center gap-1">
                        <LangToggle />
                        <ThemeToggle />
                        <button className="rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setOpen((v) => !v)} aria-label="Открыть меню">
                            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile nav panel */}
                {open && (
                    <div className="md:hidden pb-4">
                        <div className="grid gap-2">
                            {/* Каталог (аккордеон) */}
                            <div className="rounded-xl bg-gray-50 dark:bg-white/5">
                                <button onClick={() => setMobileCatOpen((v) => !v)} className="flex w-full items-center justify-between px-4 py-3 text-base">
                                    <span>{t("nav_catalog")}</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileCatOpen ? "rotate-180" : ""}`} />
                                </button>
                                {mobileCatOpen && (
                                    <div className="border-t border-black/5 dark:border-white/10 p-2">
                                        <NavLink to="/catalog/laptops" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">{t("cat_laptops")}</NavLink>
                                        <NavLink to="/catalog/phones" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg:white/10">{t("cat_phones")}</NavLink>
                                        <NavLink to="/catalog/accessories" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">{t("cat_accessories")}</NavLink>
                                    </div>
                                )}
                            </div>

                            <NavLink to="/service" onClick={() => setOpen(false)} className={({ isActive }) => ["flex items-center gap-3 rounded-xl px-4 py-3 text-base", isActive ? "bg-black text-white dark:bg:white dark:text-black" : "bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"].join(" ") }>
                                <Hammer className="h-4 w-4" /> {t("nav_service")}
                            </NavLink>
                            <NavLink to="/contacts" onClick={() => setOpen(false)} className={({ isActive }) => ["flex items-center gap-3 rounded-xl px-4 py-3 text-base", isActive ? "bg-black text-white dark:bg:white dark:text:black" : "bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"].join(" ") }>
                                <Phone className="h-4 w-4" /> {t("nav_contacts")}
                            </NavLink>
                            <NavLink to="/about" onClick={() => setOpen(false)} className={({ isActive }) => ["flex items-center gap-3 rounded-xl px-4 py-3 text-base", isActive ? "bg-black text-white dark:bg:white dark:text:black" : "bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"].join(" ") }>
                                <Info className="h-4 w-4" /> {t("nav_about")}
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

// Секции/страницы
function Hero() {
    const { t } = useI18n();
    const navigate = useNavigate();
    return (
        <section className="pt-28 sm:pt-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid gap-8 sm:gap-10 md:grid-cols-2 md:items-center">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                            <span className="underline decoration-gray-300 dark:decoration-white/20">{t("hero_title")}</span>
                        </h1>
                        <p className="mt-4 max-w-prose text-gray-600 dark:text-gray-300">{t("hero_sub")}</p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <button onClick={() => navigate("/service")} className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90">
                                {t("hero_to_services")}
                            </button>
                            <button onClick={() => navigate("/contacts")} className="rounded-xl border px-4 py-2 text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                                {t("hero_to_contacts")}
                            </button>
                        </div>
                    </div>
                    <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-black dark:border-white/10">
                        <div className="grid grid-cols-2 gap-4">
                            <ServiceCard titleKey="services_audit" descKey="services_audit_desc" />
                            <ServiceCard titleKey="services_uikit" descKey="services_uikit_desc" />
                            <ServiceCard titleKey="services_ssr" descKey="services_ssr_desc" />
                            <ServiceCard titleKey="services_integr" descKey="services_integr_desc" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Section({ titleKey, leadKey, children }: { titleKey: string; leadKey: string; children: React.ReactNode }) {
    const { t } = useI18n();
    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    {t(titleKey)}
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05 }} className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-300">
                    {t(leadKey)}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }} className="mt-8">
                    {children}
                </motion.div>
            </div>
        </section>
    );
}

function ServiceCard({ titleKey, descKey }: { titleKey: string; descKey: string }) {
    const { t } = useI18n();
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-black dark:border-white/10">
            <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white dark:bg-white dark:text-black">
                    <Hammer className="h-5 w-5" />
                </div>
                <h3 className="text-base font-medium">{t(titleKey)}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{t(descKey)}</p>
            <button className="mt-4 inline-flex items-center rounded-xl border px-4 py-2 text-sm hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black transition">
                {t("more")} <ArrowUpRight className="ml-2 h-4 w-4" />
            </button>
        </div>
    );
}

function ServicePage() {
    return (
        <>
            <Hero />
            <Section titleKey="service_title" leadKey="service_lead">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <ServiceCard titleKey="services_spa" descKey="services_spa_desc" />
                    <ServiceCard titleKey="services_opt" descKey="services_opt_desc" />
                    <ServiceCard titleKey="services_base" descKey="services_base_desc" />
                </div>
            </Section>
        </>
    );
}

function ContactsPage() {
    const { t } = useI18n();
    return (
        <Section titleKey="contacts_title" leadKey="contacts_lead">
            <form onSubmit={(e) => { e.preventDefault(); alert("Demo"); }} className="max-w-xl space-y-4">
                <div>
                    <label className="block text-sm font-medium">{t("contacts_name")}</label>
                    <input className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20" placeholder={t("contacts_name")} />
                </div>
                <div>
                    <label className="block text-sm font-medium">{t("contacts_email")}</label>
                    <input type="email" className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20" placeholder="you@example.com" />
                </div>
                <div>
                    <label className="block text-sm font-medium">{t("contacts_msg")}</label>
                    <textarea className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20" placeholder={t("contacts_msg")} rows={4} />
                </div>
                <button type="submit" className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90">
                    {t("contacts_send")}
                </button>
            </form>
        </Section>
    );
}

function AboutPage() {
    const { t } = useI18n();
    return (
        <Section titleKey="about_title" leadKey="about_lead">
            <div className="prose max-w-none prose-p:leading-relaxed dark:prose-invert">
                <p>{t("about_p1")}</p>
                <p>{t("about_p2")}</p>
            </div>
        </Section>
    );
}

function CatalogPage() {
    const { t } = useI18n();
    const { slug } = useParams();
    return (
        <Section titleKey="catalog_title" leadKey="catalog_lead">
            <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-black dark:border-white/10">
                <p className="text-sm text-gray-600 dark:text-gray-300">{t("catalog_selected")} <b>{slug}</b></p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Заглушки карточек товара */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="rounded-xl border p-4 dark:border-white/10">
                            <div className="h-28 rounded-lg bg-gray-100 dark:bg-white/10" />
                            <div className="mt-3 h-4 w-2/3 rounded bg-gray-100 dark:bg-white/10" />
                            <div className="mt-2 h-4 w-1/3 rounded bg-gray-100 dark:bg-white/10" />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}

function Footer() {
    const { t } = useI18n();
    return (
        <footer className="border-t bg-white/60 dark:bg-black/40 dark:border-white/10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm text-gray-500 dark:text-gray-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span>© {new Date().getFullYear()} ReactOne</span>
                <div className="flex items-center gap-4">
                    <NavLink to="/about" className="hover:underline">{t("footer_about")}</NavLink>
                    <NavLink to="/contacts" className="hover:underline">{t("footer_contacts")}</NavLink>
                </div>
            </div>
        </footer>
    );
}

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 dark:from-black dark:to-neutral-950 dark:text-white">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}

// ============================
// Корневой компонент с роутером, темой и i18n
// ============================
export default function App() {
    return (
        <I18nProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<ServicePage />} />
                            <Route path="/service" element={<ServicePage />} />
                            <Route path="/contacts" element={<ContactsPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/catalog/:slug" element={<CatalogPage />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </ThemeProvider>
        </I18nProvider>
    );
}
