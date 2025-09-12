import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {BrowserRouter, NavLink, Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import {
    ArrowUpRight,
    ChevronDown,
    ChevronRight,
    Filter,
    Hammer,
    Info,
    Languages,
    Menu,
    Moon,
    Phone,
    Search,
    Sun,
    X
} from "lucide-react";
import {motion} from "framer-motion";

// ============================
// i18n — минимальный локальный движок
// ============================
type Lang = "ru" | "en";
type Dictionary = Record<Lang, Record<string, string>>;

const dict: Dictionary = {
    ru: {
        brandlogo: "ReactOne",
        nav_service: "Сервис",
        nav_contacts: "Контакты",
        nav_about: "О нас",
        nav_catalog: "Каталог товаров",
        // Категории
        cat_electronics: "Электроника",
        cat_home: "Бытовая техника",
        cat_accessories: "Аксессуары",
        sub_laptops: "Ноутбуки",
        sub_phones: "Смартфоны",
        sub_tablets: "Планшеты",
        sub_vacuum: "Пылесосы",
        sub_fridges: "Холодильники",
        sub_headphones: "Наушники",
        sub_chargers: "Зарядки",

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

        // Каталог
        catalog_title: "Каталог",
        catalog_lead: "Выберите категорию и подкатегорию или воспользуйтесь поиском и фильтрами.",
        catalog_selected: "Вы выбрали:",
        search_placeholder: "Поиск по товарам...",
        filters: "Фильтры",
        price: "Цена",
        min: "Мин",
        max: "Макс",
        brand: "Бренд",
        availability: "Наличие",
        in_stock_only: "Только в наличии",
        apply_filters: "Применить",
        clear: "Сброс",
        nothing_found: "Ничего не найдено",
    },
    en: {
        brandlogo: "ReactOne",
        nav_service: "Service",
        nav_contacts: "Contacts",
        nav_about: "About",
        nav_catalog: "Catalog",
        // Categories
        cat_electronics: "Electronics",
        cat_home: "Home appliances",
        cat_accessories: "Accessories",
        sub_laptops: "Laptops",
        sub_phones: "Phones",
        sub_tablets: "Tablets",
        sub_vacuum: "Vacuum cleaners",
        sub_fridges: "Fridges",
        sub_headphones: "Headphones",
        sub_chargers: "Chargers",

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

        catalog_title: "Catalog",
        catalog_lead: "Choose a category & subcategory or use search and filters.",
        catalog_selected: "Selected:",
        search_placeholder: "Search products...",
        filters: "Filters",
        price: "Price",
        min: "Min",
        max: "Max",
        brand: "Brand",
        availability: "Availability",
        in_stock_only: "In stock only",
        apply_filters: "Apply",
        clear: "Clear",
        nothing_found: "Nothing found",
    },
};

const I18nCtx = createContext<{ lang: Lang; t: (k: string) => string; setLang: (l: Lang) => void } | null>(null);

function useI18n() {
    const ctx = useContext(I18nCtx);
    if (!ctx) throw new Error("I18n provider missing");
    return ctx;
}

function I18nProvider({children}: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "ru");
    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang]);
    const t = useCallback((k: string) => dict[lang][k] ?? k, [lang]);
    const value = useMemo(() => ({lang, t, setLang}), [lang, t]);
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

function ThemeProvider({children}: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "light");
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") root.classList.add("dark"); else root.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);
    const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
    const value = useMemo(() => ({theme, toggle}), [theme, toggle]);
    return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

// ============================
// Навигация: бренд, переключатели, каталог с вложенным меню
// ============================
function Brand() {
    const {t} = useI18n();
    const navigate = useNavigate();
    return (
        <a className="flex items-center gap-2 font-semibold tracking-tight" href="#" onClick={(e) => {
            e.preventDefault();
            navigate("/");
        }}>
            <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">R</span>
            <span className="text-lg">{t("brandlogo")}</span>
        </a>
    );
}

function ThemeToggle() {
    const {theme, toggle} = useTheme();
    return (
        <button className="rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/10" onClick={toggle}
                aria-label="Toggle theme" title="Theme">
            {theme === "dark" ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
        </button>
    );
}

function LangToggle() {
    const {lang, setLang} = useI18n();
    const next = lang === "ru" ? "en" : "ru";
    return (
        <button
            className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => setLang(next)} title="Language">
            <Languages className="h-4 w-4"/> {next.toUpperCase()}
        </button>
    );
}

type Cat = { key: string; labelKey: string; children?: { key: string; labelKey: string }[] };
const CATEGORIES: Cat[] = [
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

function DesktopCatalogMenu() {
    const {t} = useI18n();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    return (
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
                className="group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
                {t("nav_catalog")} <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}/>
            </button>
            {open && (
                <div
                    className="absolute right-0 mt-2 w-[680px] rounded-2xl border bg-white p-4 shadow-lg dark:bg-black dark:border-white/10">
                    <div className="grid grid-cols-3 gap-4">
                        {CATEGORIES.map((cat) => (
                            <div key={cat.key}>
                                <div
                                    className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">{t(cat.labelKey)}</div>
                                <div className="grid">
                                    {cat.children?.map((sub) => (
                                        <button key={sub.key} onClick={() => navigate(`/catalog/${cat.key}/${sub.key}`)}
                                                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
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

function MobileCatalogMenu({onNavigate}: { onNavigate: () => void }) {
    const {t} = useI18n();
    const navigate = useNavigate();
    const [open, setOpen] = useState<string | null>(null);
    return (
        <div className="rounded-xl bg-gray-50 dark:bg-white/5">
            {CATEGORIES.map((cat) => (
                <div key={cat.key} className="border-b last:border-none border-black/5 dark:border-white/10">
                    <button onClick={() => setOpen((v) => (v === cat.key ? null : cat.key))}
                            className="flex w-full items-center justify-between px-4 py-3 text-base">
                        <span>{t(cat.labelKey)}</span>
                        <ChevronDown
                            className={`h-4 w-4 transition-transform ${open === cat.key ? "rotate-180" : ""}`}/>
                    </button>
                    {open === cat.key && (
                        <div className="p-2">
                            {cat.children?.map((sub) => (
                                <button key={sub.key} onClick={() => {
                                    navigate(`/catalog/${cat.key}/${sub.key}`);
                                    onNavigate();
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

function Navbar() {
    const {t} = useI18n();
    const [open, setOpen] = useState(false);
    const linkBase = "group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition";
    const linkClass = ({isActive}: {
        isActive: boolean
    }) => [linkBase, isActive ? "bg-black text-white shadow dark:bg-white dark:text-black" : "hover:bg-black/5 dark:hover:bg-white/10"].join(" ");
    return (
        <header
            className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b dark:bg-black/60 dark:supports-[backdrop-filter]:bg-black/40 dark:border-white/10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex h-16 items-center justify-between">
                    <Brand/>
                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-2">
                        <DesktopCatalogMenu/>
                        <NavLink to="/service" className={linkClass} end>
                            <Hammer className="h-4 w-4"/> {t("nav_service")}
                        </NavLink>
                        <NavLink to="/contacts" className={linkClass} end>
                            <Phone className="h-4 w-4"/> {t("nav_contacts")}
                        </NavLink>
                        <NavLink to="/about" className={linkClass} end>
                            <Info className="h-4 w-4"/> {t("nav_about")}
                        </NavLink>
                        <NavLink to="/contacts"
                                 className={() => "ml-1 inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90"}>
                            {t("cta_contact")} <ArrowUpRight className="ml-1 h-4 w-4"/>
                        </NavLink>
                        <LangToggle/>
                        <ThemeToggle/>
                    </nav>

                    {/* Mobile toggle */}
                    <div className="md:hidden flex items-center gap-1">
                        <LangToggle/>
                        <ThemeToggle/>
                        <button className="rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/10"
                                onClick={() => setOpen((v) => !v)} aria-label="Открыть меню">
                            {open ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                        </button>
                    </div>
                </div>

                {/* Mobile nav panel */}
                {open && (
                    <div className="md:hidden pb-4">
                        <div className="grid gap-2">
                            <MobileCatalogMenu onNavigate={() => setOpen(false)}/>
                            <NavLink to="/service" onClick={() => setOpen(false)}
                                     className={({isActive}) => ["flex items-center gap-3 rounded-xl px-4 py-3 text-base", isActive ? "bg-black text-white dark:bg-white dark:text-black" : "bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"].join(" ")}>
                                <Hammer className="h-4 w-4"/> {t("nav_service")}
                            </NavLink>
                            <NavLink to="/contacts" onClick={() => setOpen(false)}
                                     className={({isActive}) => ["flex items-center gap-3 rounded-xl px-4 py-3 text-base", isActive ? "bg-black text-white dark:bg-white dark:text-black" : "bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"].join(" ")}>
                                <Phone className="h-4 w-4"/> {t("nav_contacts")}
                            </NavLink>
                            <NavLink to="/about" onClick={() => setOpen(false)}
                                     className={({isActive}) => ["flex items-center gap-3 rounded-xl px-4 py-3 text-base", isActive ? "bg-black text-white dark:bg-white dark:text-black" : "bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"].join(" ")}>
                                <Info className="h-4 w-4"/> {t("nav_about")}
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

// ============================
// Секции/страницы
// ============================
function Hero() {
    const {t} = useI18n();
    const navigate = useNavigate();
    return (
        <section className="pt-28 sm:pt-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}
                            className="grid gap-8 sm:gap-10 md:grid-cols-2 md:items-center">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                            <span
                                className="underline decoration-gray-300 dark:decoration-white/20">{t("hero_title")}</span>
                        </h1>
                        <p className="mt-4 max-w-prose text-gray-600 dark:text-gray-300">{t("hero_sub")}</p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <button onClick={() => navigate("/service")}
                                    className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90">
                                {t("hero_to_services")}
                            </button>
                            <button onClick={() => navigate("/contacts")}
                                    className="rounded-xl border px-4 py-2 text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                                {t("hero_to_contacts")}
                            </button>
                        </div>
                    </div>
                    <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-black dark:border-white/10">
                        <div className="grid grid-cols-2 gap-4">
                            <ServiceCard titleKey="services_spa" descKey="services_spa_desc"/>
                            <ServiceCard titleKey="services_opt" descKey="services_opt_desc"/>
                            <ServiceCard titleKey="services_base" descKey="services_base_desc"/>
                            <ServiceCard titleKey="services_uikit" descKey="services_uikit_desc"/>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Section({titleKey, leadKey, children}: { titleKey: string; leadKey: string; children: React.ReactNode }) {
    const {t} = useI18n();
    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <motion.h2 initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                           transition={{duration: 0.4}} className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    {t(titleKey)}
                </motion.h2>
                <motion.p initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                          transition={{duration: 0.45, delay: 0.05}}
                          className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-300">
                    {t(leadKey)}
                </motion.p>
                <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                            transition={{duration: 0.5, delay: 0.08}} className="mt-8">
                    {children}
                </motion.div>
            </div>
        </section>
    );
}

function ServiceCard({titleKey, descKey}: { titleKey: string; descKey: string }) {
    const {t} = useI18n();
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-black dark:border-white/10">
            <div className="flex items-center gap-3">
                <div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white dark:bg-white dark:text-black">
                    <Hammer className="h-5 w-5"/>
                </div>
                <h3 className="text-base font-medium">{t(titleKey)}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{t(descKey)}</p>
            <button
                className="mt-4 inline-flex items-center rounded-xl border px-4 py-2 text-sm hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black transition">
                {t("more")} <ArrowUpRight className="ml-2 h-4 w-4"/>
            </button>
        </div>
    );
}

function ServicePage() {
    return (
        <>
            <Hero/>
            <Section titleKey="service_title" leadKey="service_lead">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <ServiceCard titleKey="services_spa" descKey="services_spa_desc"/>
                    <ServiceCard titleKey="services_opt" descKey="services_opt_desc"/>
                    <ServiceCard titleKey="services_base" descKey="services_base_desc"/>
                </div>
            </Section>
        </>
    );
}

function ContactsPage() {
    const {t} = useI18n();
    return (
        <Section titleKey="contacts_title" leadKey="contacts_lead">
            <form onSubmit={(e) => {
                e.preventDefault();
                alert("Demo");
            }} className="max-w-xl space-y-4">
                <div>
                    <label className="block text-sm font-medium">{t("contacts_name")}</label>
                    <input
                        className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"
                        placeholder={t("contacts_name")}/>
                </div>
                <div>
                    <label className="block text-sm font-medium">{t("contacts_email")}</label>
                    <input type="email"
                           className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"
                           placeholder="you@example.com"/>
                </div>
                <div>
                    <label className="block text-sm font-medium">{t("contacts_msg")}</label>
                    <textarea
                        className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"
                        placeholder={t("contacts_msg")} rows={4}/>
                </div>
                <button type="submit"
                        className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90">
                    {t("contacts_send")}
                </button>
            </form>
        </Section>
    );
}

// ============================
// Каталог: демо-данные, поиск и фильтры
// ============================
type Product = {
    id: number; title: string; brand: string; price: number; inStock: boolean;
    category: string; subcategory: string;
};
const PRODUCTS: Product[] = [
    {
        id: 1,
        title: "UltraBook 13",
        brand: "Acelon",
        price: 1200,
        inStock: true,
        category: "electronics",
        subcategory: "laptops"
    },
    {
        id: 2,
        title: "NotePro 15",
        brand: "Bytek",
        price: 950,
        inStock: false,
        category: "electronics",
        subcategory: "laptops"
    },
    {
        id: 3,
        title: "PixelOne X",
        brand: "Phonia",
        price: 800,
        inStock: true,
        category: "electronics",
        subcategory: "phones"
    },
    {
        id: 4,
        title: "TabMini",
        brand: "Acelon",
        price: 499,
        inStock: true,
        category: "electronics",
        subcategory: "tablets"
    },
    {
        id: 5,
        title: "SilentVac 3000",
        brand: "HomeMax",
        price: 300,
        inStock: true,
        category: "home",
        subcategory: "vacuum"
    },
    {
        id: 6,
        title: "CoolBox 200L",
        brand: "Nordix",
        price: 1100,
        inStock: false,
        category: "home",
        subcategory: "fridges"
    },
    {
        id: 7,
        title: "BassPods",
        brand: "Phonia",
        price: 150,
        inStock: true,
        category: "accessories",
        subcategory: "headphones"
    },
    {
        id: 8,
        title: "FastCharge 65W",
        brand: "Bytek",
        price: 49,
        inStock: true,
        category: "accessories",
        subcategory: "chargers"
    },
];
const BRANDS = Array.from(new Set(PRODUCTS.map(p => p.brand))).sort();

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function CatalogFilters({
                            value,
                            onChange,
                        }: {
    value: { q: string; min?: number; max?: number; brands: Set<string>; inStockOnly: boolean };
    onChange: (v: { q: string; min?: number; max?: number; brands: Set<string>; inStockOnly: boolean }) => void;
}) {
    const {t} = useI18n();
    const [local, setLocal] = useState(value);
    useEffect(() => setLocal(value), [value]);
    const set = (patch: Partial<typeof local>) => setLocal({...local, ...patch});

    return (
        <div className="rounded-2xl border bg-white p-4 shadow-sm dark:bg-black dark:border-white/10">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                <Filter className="h-4 w-4"/> {t("filters")}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                {/* Поиск */}
                <label className="sm:col-span-3">
                    <span className="mb-1 block text-sm font-medium">Search</span>
                    <div className="relative">
                        <Search
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"/>
                        <input value={local.q} onChange={(e) => set({q: e.target.value})}
                               placeholder={t("search_placeholder")}
                               className="w-full rounded-xl border pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"/>
                    </div>
                </label>

                {/* Цена */}
                <div>
                    <div className="mb-1 text-sm font-medium">{t("price")}</div>
                    <div className="flex items-center gap-2">
                        <input inputMode="numeric" pattern="[0-9]*" value={local.min ?? ""}
                               onChange={(e) => set({min: e.target.value ? Number(e.target.value) : undefined})}
                               placeholder={t("min")}
                               className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"/>
                        <span>—</span>
                        <input inputMode="numeric" pattern="[0-9]*" value={local.max ?? ""}
                               onChange={(e) => set({max: e.target.value ? Number(e.target.value) : undefined})}
                               placeholder={t("max")}
                               className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"/>
                    </div>
                </div>

                {/* Бренд */}
                <div>
                    <div className="mb-2 text-sm font-medium">{t("brand")}</div>
                    <div className="grid gap-2">
                        {BRANDS.map((b) => (
                            <label key={b} className="inline-flex items-center gap-2 text-sm">
                                <input type="checkbox" checked={local.brands.has(b)} onChange={(e) => {
                                    const setB = new Set(local.brands);
                                    if (e.currentTarget.checked) {
                                        setB.add(b);
                                    } else {
                                        setB.delete(b);
                                    }
                                    set({brands: setB});
                                }}/>
                                <span>{b}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Наличие */}
                <div>
                    <div className="mb-2 text-sm font-medium">{t("availability")}</div>
                    <label className="inline-flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={local.inStockOnly}
                               onChange={(e) => set({inStockOnly: e.target.checked})}/>
                        {t("in_stock_only")}
                    </label>
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
                <button onClick={() => onChange(local)}
                        className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90">{t("apply_filters")}</button>
                <button onClick={() => onChange({
                    q: "",
                    min: undefined,
                    max: undefined,
                    brands: new Set(),
                    inStockOnly: false
                })}
                        className="rounded-xl border px-4 py-2 text-sm hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black">{t("clear")}</button>
            </div>
        </div>
    );
}

function CatalogGrid({items}: { items: Product[] }) {
    const {t} = useI18n();
    if (!items.length) return <div
        className="rounded-2xl border bg-white p-6 text-sm text-gray-600 shadow-sm dark:bg-black dark:border-white/10 dark:text-gray-300">{t("nothing_found")}</div>;
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
                <div key={p.id}
                     className="rounded-2xl border bg-white p-4 shadow-sm dark:bg-black dark:border-white/10">
                    <div className="h-36 rounded-xl bg-gray-100 dark:bg-white/10"/>
                    <div className="mt-3 flex items-start justify-between">
                        <div>
                            <div className="text-sm font-medium">{p.title}</div>
                            <div className="text-xs text-gray-500">{p.brand}</div>
                        </div>
                        <div className="text-sm font-semibold">${p.price}</div>
                    </div>
                    <div className="mt-2 text-xs">
                        {p.inStock ? <span
                                className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">In stock</span> :
                            <span
                                className="rounded-full bg-rose-100 px-2 py-1 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">Out of stock</span>}
                    </div>
                </div>
            ))}
        </div>
    );
}

function applyFilters(data: Product[], params: {
    q: string;
    min?: number;
    max?: number;
    brands: Set<string>;
    inStockOnly: boolean;
    cat?: string;
    sub?: string
}) {
    return data.filter((p) => {
        if (params.cat && p.category !== params.cat) return false;
        if (params.sub && p.subcategory !== params.sub) return false;
        if (params.q && !(`${p.title} ${p.brand}`.toLowerCase().includes(params.q.toLowerCase()))) return false;
        if (params.min !== undefined && p.price < params.min) return false;
        if (params.max !== undefined && p.price > params.max) return false;
        if (params.brands.size && !params.brands.has(p.brand)) return false;
        if (params.inStockOnly && !p.inStock) return false;
        return true;
    });
}

type Filters = { q: string; min?: number; max?: number; brands: Set<string>; inStockOnly: boolean };

function CatalogPage() {
    const {t} = useI18n();
    const {category, subcategory} = useParams();
    const query = useQuery();
    const [filters, setFilters] = useState<Filters>({
        q: query.get("q") ?? "",
        min: undefined,
        max: undefined,
        brands: new Set<string>(),
        inStockOnly: false,
    });

    const filtered = useMemo(() => applyFilters(PRODUCTS, {
        ...filters,
        cat: category,
        sub: subcategory
    }), [filters, category, subcategory]);

    return (
        <Section titleKey="catalog_title" leadKey="catalog_lead">
            <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
                <div className="lg:sticky lg:top-24 lg:self-start">
                    <CatalogFilters value={filters} onChange={(next) => setFilters(next)}/>
                </div>
                <div className="space-y-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        {t("catalog_selected")}
                        <span
                            className="ml-2 rounded-full bg-gray-100 px-3 py-1 dark:bg-white/10">{category || "—"}{subcategory ? ` / ${subcategory}` : ""}</span>
                    </div>
                    <CatalogGrid items={filtered}/>
                </div>
            </div>
        </Section>
    );
}

function AboutPage() {
    const {t} = useI18n();
    return (
        <Section titleKey="about_title" leadKey="about_lead">
            <div className="prose max-w-none prose-p:leading-relaxed dark:prose-invert"><p>{t("about_p1")}</p>
                <p>{t("about_p2")}</p></div>
        </Section>
    );
}

function Footer() {
    const {t} = useI18n();
    return (
        <footer className="border-t bg-white/60 dark:bg-black/40 dark:border-white/10">
            <div
                className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm text-gray-500 dark:text-gray-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span>© {new Date().getFullYear()} ReactOne</span>
                <div className="flex items-center gap-4">
                    <NavLink to="/about" className="hover:underline">{t("footer_about")}</NavLink>
                    <NavLink to="/contacts" className="hover:underline">{t("footer_contacts")}</NavLink>
                </div>
            </div>
        </footer>
    );
}

function Layout({children}: { children: React.ReactNode }) {
    return (
        <div
            className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 dark:from-black dark:to-neutral-950 dark:text-white">
            <Navbar/>
            {children}
            <Footer/>
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
                            <Route path="/" element={<ServicePage/>}/>
                            <Route path="/service" element={<ServicePage/>}/>
                            <Route path="/contacts" element={<ContactsPage/>}/>
                            <Route path="/about" element={<AboutPage/>}/>
                            <Route path="/catalog/:category" element={<CatalogPage/>}/>
                            <Route path="/catalog/:category/:subcategory" element={<CatalogPage/>}/>
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </ThemeProvider>
        </I18nProvider>
    );
}
