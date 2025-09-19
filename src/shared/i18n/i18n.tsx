import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";

export type Lang = "ru" | "en";
export type Dictionary = Record<Lang, Record<string, string>>;
// eslint-disable-next-line react-refresh/only-export-components
export const dict: Dictionary = {
    ru: {
        brandLogo: "",
        nav_service: "Сервис",
        nav_contacts: "Контакты",
        nav_about: "О нас",
        nav_catalog: "Каталог",
// Каталог меню
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
// Hero/общие
        cta_contact: "Связаться",
        hero_title: "Изготовление металлоконструкций из нержавейки",
        hero_sub: "Базовая модель с верхней панелью навигации и каталогом.",
        hero_to_services: "К услугам",
        hero_to_contacts: "Связаться",
// Секции
        service_title: "Сервис",
        service_lead: "Пример списка услуг. Замените на ваши предложения.",
        contacts_title: "Контакты",
        contacts_lead: "Демо-форма. Подключите обработчик.",
        contacts_name: "Имя",
        contacts_email: "Email",
        contacts_msg: "Сообщение",
        contacts_send: "Отправить",
        about_title: "О нас",
        about_lead: "Коротко о компании и ценностях.",
        about_p1: "Мы создаём быстрые и стабильные интерфейсы.",
        about_p2: "Стек: React, TS, Tailwind, Vite/Next.js, Framer Motion.",
        more: "Подробнее",
        footer_about: "О нас",
        footer_contacts: "Контакты",
// Каталог
        catalog_title: "Каталог",
        catalog_lead: "Выберите категорию и фильтруйте.",
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
        sort: "Сортировка",
        per_page: "Товаров на странице",
        found: "Найдено",
        in_stock: "В наличии",
        out_of_stock: "Нет в наличии",
        nothing_found: "Ничего не найдено",
        sort_relevance: "По релевантности",
        sort_price_asc: "Цена ↑",
        sort_price_desc: "Цена ↓",
        sort_brand_az: "Бренд A→Z",
        back: "Назад",
        next: "Вперёд",
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

        login: "Войти",
        logout: "Выйти",
        email: "Email",
        password: "Пароль",
        sign_in: "Войти",
        cancel: "Отмена",
        need_auth: "Эта страница доступна только авторизованным пользователям.",
        nav_products_private: "Мои товары",

        // ru
        search_all_products: "Поиск по товарам",
        search_placehold: "Поиск по товарам, брендам, категориям…",
        search: "Искать",

        cat_metal: "МЕТАЛЛОПРОКАТ",
        cat_vini: "ВИНИФИКАЦИЯ",
        cat_furniture: "МЕБЕЛЬ ИЗ НЕРЖАВЕЙКИ",

        cat_metal_sheet: "ЛИСТ НЕРЖАВЕЙКИ",
        cat_metal_profile_pipe: "ПРОФИЛЬНАЯ ТРУБА ИЗ НЕРЖАВЕЙКИ",
        cat_metal_round_pipe: "КРУГЛАЯ ТРУБА ИЗ НЕРЖАВЕЙКИ",
        cat_metal_strip: "ПОЛОСКА ИЗ НЕРЖАВЕЙКИ",
        cat_metal_angle: "УГОЛОК ИЗ НЕРЖАВЕЙКИ",
        cat_metal_rod: "ПРУТОК ИЗ НЕРЖАВЕЙКИ",

        cat_vini_tanks: "ЁМКОСТИ",
        cat_vini_pumps: "НАСОСЫ",
        cat_vini_fittings: "ФИТИНГИ",

        cat_furniture_tables: "СТОЛЫ",
        cat_furniture_shelves: "ПОЛКИ",
        cat_furniture_legs: "ОПОРЫ",

        about_intro1: "Мы — команда специалистов по обработке металла, которая превращает ваши идеи в готовые изделия. Наш опыт и <b>современное оборудование</b> позволяют выполнять широкий спектр работ — от простой резки до сложных сварных конструкций.",
        about_intro2: "Наша компания специализируется на профессиональной обработке нержавеющей стали и металлоконструкций, предлагая полный цикл услуг — от раскроя листового металла до сборки готовых изделий. Мы помогаем клиентам реализовать как простые проекты, так и сложные конструкции, требующие высокой точности и надежности.",

        about_strengths_title: "Наши сильные стороны",
        about_strengths_1: "<b>Современное оборудование</b> — используем гильотины, вальцовочные и гибочные станки, ленточные пилы и сварочные аппараты последнего поколения. Это позволяет выполнять операции быстро, точно и с минимальными потерями материала.",
        about_strengths_2: "<b>Широкий спектр услуг</b> — резка, гибка, вальцовка, сверление, сварка, финишная обработка и многое другое. Все работы выполняются в одном месте.",
        about_strengths_3: "<b>Квалифицированные мастера</b> — команда специалистов с многолетним опытом гарантирует прочность и аккуратность каждой детали.",
        about_strengths_4: "<b>Индивидуальный подход</b> — работаем как с типовыми заказами, так и по вашим чертежам, эскизам и идеям.",
        about_strengths_5: "<b>Качество</b> — каждый шов и изгиб проходят проверку, изделия выглядят безупречно технически и визуально.",
        about_strengths_6: "<b>Прозрачные цены</b> — понятный прайс-лист без скрытых платежей.",
        about_strengths_7: "<b>Соблюдение сроков</b> — оптимизированные процессы позволяют сдавать заказы вовремя.",

        about_services_title: "Наши услуги",
        about_services_1: "<b>Резка металла</b> — на гильотине, ленточной пиле и болгаркой, точная под ваши размеры.",
        about_services_2: "<b>Гибка и вальцовка</b> — создаём изгибы, цилиндры и конусы любой сложности.",
        about_services_3: "<b>Сверление и вырезка отверстий</b> — в листовом металле, профильных и круглых трубах.",
        about_services_4: "<b>Сварка</b> — конструктивные, шлифованные и полированные швы, а также сварка точками.",
        about_services_5: "<b>Изготовление соединений труб</b> — врезка под углом 90° и 45°.",
        about_services_6: "<b>Финишная обработка</b> — снятие заусенцев, шлифовка, полировка и кислотная обработка.",
        about_services_7: "<b>Замеры на объекте</b> — выезд специалистов в Кишинёве и за его пределами.",

        about_clients_title: "Наши клиенты",
        about_clients: "С нами сотрудничают частные заказчики, строительные компании, производственные предприятия и сфера HoReCa. Мы изготавливаем как отдельные элементы (столешницы, стойки, каркасы), так и целые конструкции для объектов в Кишинёве и по всей Молдове.",

        about_approach_title: "Наш подход",
        about_approach1: "Мы строим долгосрочные отношения с клиентами. Для нас важно, чтобы каждая выполненная работа становилась примером качества и профессионализма. Наша цель — не просто выполнить заказ, а предложить решение, которое будет служить долго и выгодно выделяться среди аналогов.",
        about_approach2: "Мы ценим доверие клиентов и всегда стремимся предложить лучший результат — будь то изготовление конструкций, деталей или декоративных элементов.",

        about_why_title: "Почему выбирают нас",
        about_why_1: "<b>Точность и качество</b> — используем профессиональное оборудование, выдерживаем размеры до миллиметра.",
        about_why_2: "<b>Комплексный подход</b> — от подготовки материала до финальной сварки и полировки.",
        about_why_3: "<b>Индивидуальные решения</b> — работаем как с типовыми заказами, так и по вашим чертежам.",
        about_why_4: "<b>Прозрачные цены</b> — понятный прайс-лист на все виды работ.",
        about_why_5: "<b>Скорость выполнения</b> — оптимизированные процессы позволяют сдавать заказы в срок.",

        about_open_map: "Открыть маршрут в Google Maps"


    },
    en: {
        brandLogo: "",
        nav_service: "Service",
        nav_contacts: "Contacts",
        nav_about: "About",
        nav_catalog: "Catalog",
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
        hero_title: "Quick start SPA on React + TS",
        hero_sub: "Minimal model with top nav and catalog.",
        hero_to_services: "To services",
        hero_to_contacts: "Contact",
        service_title: "Service",
        service_lead: "Sample services list.",
        contacts_title: "Contacts",
        contacts_lead: "Demo form. Hook your handler.",
        contacts_name: "Name",
        contacts_email: "Email",
        contacts_msg: "Message",
        contacts_send: "Send",
        about_title: "About",
        about_lead: "About company and values.",
        about_p1: "We build fast, stable interfaces.",
        about_p2: "Stack: React, TS, Tailwind, Vite/Next.js, Framer Motion.",
        more: "Learn more",
        footer_about: "About",
        footer_contacts: "Contacts",
        catalog_title: "Catalog",
        catalog_lead: "Pick a category and filter.",
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
        sort: "Sort",
        per_page: "Items per page",
        found: "Found",
        in_stock: "In stock",
        out_of_stock: "Out of stock",
        nothing_found: "Nothing found",
        sort_relevance: "Relevance",
        sort_price_asc: "Price ↑",
        sort_price_desc: "Price ↓",
        sort_brand_az: "Brand A→Z",
        back: "Back",
        next: "Next",
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

        login: "Login",
        logout: "Logout",
        email: "Email",
        password: "Password",
        sign_in: "Sign in",
        cancel: "Cancel",
        need_auth: "This page is available to authenticated users only.",
        nav_products_private: "My products",
// en
        search_all_products: "Search products",
        search_placehold: "Search products, brands, categories…",
        search: "Search",

        cat_metal: "МЕТАЛЛОПРОКАТ",
        cat_vini: "ВИНИФИКАЦИЯ",
        cat_furniture: "МЕБЕЛЬ ИЗ НЕРЖАВЕЙКИ",

        cat_metal_sheet: "ЛИСТ НЕРЖАВЕЙКИ",
        cat_metal_profile_pipe: "ПРОФИЛЬНАЯ ТРУБА ИЗ НЕРЖАВЕЙКИ",
        cat_metal_round_pipe: "КРУГЛАЯ ТРУБА ИЗ НЕРЖАВЕЙКИ",
        cat_metal_strip: "ПОЛОСКА ИЗ НЕРЖАВЕЙКИ",
        cat_metal_angle: "УГОЛОК ИЗ НЕРЖАВЕЙКИ",
        cat_metal_rod: "ПРУТОК ИЗ НЕРЖАВЕЙКИ",

        cat_vini_tanks: "ЁМКОСТИ",
        cat_vini_pumps: "НАСОСЫ",
        cat_vini_fittings: "ФИТИНГИ",

        cat_furniture_tables: "СТОЛЫ",
        cat_furniture_shelves: "ПОЛКИ",
        cat_furniture_legs: "ОПОРЫ",


        about_intro1: "Suntem o echipă de specialiști în prelucrarea metalului, care transformă ideile dvs. în produse finite. Experiența și <b>echipamentele moderne</b> ne permit să executăm o gamă largă de lucrări — de la tăiere simplă până la construcții sudate complexe.",
        about_intro2: "Compania noastră este specializată în prelucrarea profesională a oțelului inoxidabil și a construcțiilor metalice, oferind un ciclu complet de servicii — de la debitare până la asamblare.",

        about_strengths_title: "Punctele noastre forte",
        about_strengths_1: "<b>Echipamente moderne</b> — ghilotine, mașini de roluit și îndoit, fierăstraie cu bandă și aparate de sudură de ultimă generație. Acest lucru permite realizarea operațiunilor rapid, precis și cu pierderi minime de material.",
        about_strengths_2: "<b>Gamă largă de servicii</b> — debitare, îndoire, roluire, găurire, sudură, finisare și multe altele. Toate lucrările se realizează într-un singur loc.",
        about_strengths_3: "<b>Meșteri calificați</b> — echipa noastră cu mulți ani de experiență garantează rezistența și precizia fiecărui detaliu.",
        about_strengths_4: "<b>Abordare individuală</b> — lucrăm atât cu comenzi tipice, cât și după schițele și desenele dvs.",
        about_strengths_5: "<b>Calitate</b> — fiecare cusătură și fiecare îndoire sunt verificate, produsele arată impecabil atât tehnic, cât și vizual.",
        about_strengths_6: "<b>Prețuri transparente</b> — listă de prețuri clară, fără costuri ascunse.",
        about_strengths_7: "<b>Respectarea termenelor</b> — procese optimizate care permit livrarea comenzilor la timp.",

        about_services_title: "Serviciile noastre",
        about_services_1: "<b>Debitarea metalului</b> — cu ghilotina, fierăstrăul cu bandă și polizorul, precis conform dimensiunilor dvs.",
        about_services_2: "<b>Îndoire și roluire</b> — realizăm îndoiri, cilindri și conuri de orice complexitate.",
        about_services_3: "<b>Găurire și decupare</b> — în tablă, țevi profilate și țevi rotunde.",
        about_services_4: "<b>Sudură</b> — cusături constructive, șlefuite și polisate, precum și sudură prin puncte.",
        about_services_5: "<b>Îmbinări de țevi</b> — decupare la unghi de 90° și 45°.",
        about_services_6: "<b>Finisare</b> — îndepărtarea bavurilor, șlefuire, lustruire și tratare acidă.",
        about_services_7: "<b>Măsurători pe șantier</b> — deplasarea specialiștilor în Chișinău și în afara orașului.",

        about_clients_title: "Clienții noștri",
        about_clients: "Colaborăm cu clienți privați, companii de construcții, întreprinderi de producție și HoReCa. Realizăm atât elemente separate (blaturi, cadre, structuri), cât și construcții complete pentru obiective din Chișinău și din toată Moldova.",

        about_approach_title: "Abordarea noastră",
        about_approach1: "Construim relații pe termen lung cu clienții. Este important pentru noi ca fiecare lucrare realizată să devină un exemplu de calitate și profesionalism. Scopul nostru nu este doar să executăm o comandă, ci să oferim o soluție care să reziste mult timp și să se evidențieze prin valoare.",
        about_approach2: "Prețuim încrederea clienților și oferim mereu cel mai bun rezultat — fie că este vorba de construcții, piese sau elemente decorative.",

        about_why_title: "De ce să ne alegeți",
        about_why_1: "<b>Precizie și calitate</b> — folosim echipamente profesionale și respectăm dimensiunile la milimetru.",
        about_why_2: "<b>Abordare complexă</b> — de la pregătirea materialului până la sudură și finisare.",
        about_why_3: "<b>Soluții individuale</b> — lucrăm atât cu comenzi standard, cât și după desene personalizate.",
        about_why_4: "<b>Prețuri transparente</b> — listă clară pentru toate tipurile de lucrări.",
        about_why_5: "<b>Rapiditate</b> — procese optimizate care permit predarea comenzilor la timp.",

        about_open_map: "Deschide ruta în Google Maps"

    },
};


const I18nCtx = createContext<{ lang: Lang; t: (k: string) => string; setLang: (l: Lang) => void } | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
    const ctx = useContext(I18nCtx);
    if (!ctx) throw new Error("I18n provider missing");
    return ctx;
}

export function I18nProvider({children}: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "ru");
    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang]);
    const t = useCallback((k: string) => dict[lang][k] ?? k, [lang]);
    const value = useMemo(() => ({lang, t, setLang}), [lang, t]);
    return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

// Утилита для безопасного вывода форматированного перевода:
export function TransHTML({k}: { k: string }) {
    const {t} = useI18n();
    return <span dangerouslySetInnerHTML={{__html: t(k)}}/>;
}