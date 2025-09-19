import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";

export type Lang = "ru" | "ro";
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

        services_laser_title: "Лазерная резка",
        services_laser_desc: "Высокоточная резка листового металла с минимальными заусенцами.",

        services_shearing_title: "Рубка (гильотина)",
        services_shearing_desc: "Прямая рубка листового металла на гильотине.",

        services_bending_title: "Гибка",
        services_bending_desc: "Прецизионная гибка металла на прессах.",

        services_rolling_title: "Вальцовка",
        services_rolling_desc: "Формирование цилиндров и дуг из листового металла.",

        services_drilling_title: "Отверстие в листовом материале и трубе",
        services_drilling_desc: "Высверливание и вырезание отверстий в листах и трубах.",

        services_bandsaw_title: "Торцовка на ленточной пиле",
        services_bandsaw_desc: "Резка труб и профилей под прямым или заданным углом.",

        services_pipe_title: "Врезка труба в трубу",
        services_pipe_desc: "Аккуратная врезка труб с обеспечением герметичности соединений.",

        services_grinder_title: "Резка болгаркой",
        services_grinder_desc: "Резка металла ручной углошлифовальной машинкой.",

        services_welding_title: "Сварка",
        services_welding_desc: "Соединение металлических деталей сваркой MIG/MAG, TIG или ручной дуговой.",

        services_stiffener_title: "Установка ребра жёсткости («ласточка»)",
        services_stiffener_desc: "Повышение прочности изделий за счёт установки усилителей.",

        services_leg_title: "Забивание ножки",
        services_leg_desc: "Монтаж и фиксация опорных ножек в конструкции.",

        services_acid_title: "Обработка кислотой",
        services_acid_desc: "Химическая обработка для очистки и защиты металла.",

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

        about_open_map: "Открыть маршрут в Google Maps",

        adv_quality_title: "Гарантия качества",
        adv_quality_desc: "Мы гарантируем надёжность и долговечность всех наших изделий и услуг.",

        adv_custom_title: "Индивидуальные заказы",
        adv_custom_desc: "Мы создаём проекты по индивидуальным чертежам и требованиям заказчика.",

        adv_consult_title: "Консультации специалистов",
        adv_consult_desc: "Наши инженеры и мастера помогут подобрать оптимальные решения под ваши задачи."
    },
    ro: {
        brandLogo: "",
        nav_service: "Servicii",
        nav_contacts: "Contacte",
        nav_about: "Despre noi",
        nav_catalog: "Catalog",

        // Catalog meniu
        cat_electronics: "Electronice",
        cat_home: "Electrocasnice",
        cat_accessories: "Accesorii",
        sub_laptops: "Laptopuri",
        sub_phones: "Telefoane",
        sub_tablets: "Tablete",
        sub_vacuum: "Aspiratoare",
        sub_fridges: "Frigidere",
        sub_headphones: "Căști",
        sub_chargers: "Încărcătoare",

        // Hero/comun
        cta_contact: "Contactați-ne",
        hero_title: "Construcții metalice din inox",
        hero_sub: "Model de bază cu navigație superioară și catalog.",
        hero_to_services: "Servicii",
        hero_to_contacts: "Contacte",

        // Secțiuni
        service_title: "Servicii",
        service_lead: "Exemplu de listă a serviciilor. Înlocuiți cu oferta dvs.",
        contacts_title: "Contacte",
        contacts_lead: "Formular demo. Conectați procesarea.",
        contacts_name: "Nume",
        contacts_email: "Email",
        contacts_msg: "Mesaj",
        contacts_send: "Trimiteți",
        about_title: "Despre noi",
        about_lead: "Pe scurt despre companie și valori.",
        about_p1: "Creăm interfețe rapide și stabile.",
        about_p2: "Stack: React, TS, Tailwind, Vite/Next.js, Framer Motion.",
        more: "Mai multe detalii",
        footer_about: "Despre noi",
        footer_contacts: "Contacte",

        // Catalog
        catalog_title: "Catalog",
        catalog_lead: "Alegeți o categorie și aplicați filtre.",
        catalog_selected: "Ați selectat:",
        search_placeholder: "Căutare produse...",
        filters: "Filtre",
        price: "Preț",
        min: "Min",
        max: "Max",
        brand: "Marcă",
        availability: "Disponibilitate",
        in_stock_only: "Doar în stoc",
        apply_filters: "Aplică",
        clear: "Resetează",
        sort: "Sortare",
        per_page: "Produse pe pagină",
        found: "Găsite",
        in_stock: "În stoc",
        out_of_stock: "Stoc epuizat",
        nothing_found: "Nu s-a găsit nimic",
        sort_relevance: "Relevanță",
        sort_price_asc: "Preț ↑",
        sort_price_desc: "Preț ↓",
        sort_brand_az: "Marcă A→Z",
        back: "Înapoi",
        next: "Înainte",

        // Servicii IT demo
        services_laser_title: "Tăiere cu laser",
        services_laser_desc: "Tăiere de înaltă precizie a tablei metalice cu margini curate.",

        services_shearing_title: "Foarfecare (Tăiere la ghilotină)",
        services_shearing_desc: "Tăiere dreaptă a tablei metalice pe ghilotină.",

        services_bending_title: "Îndoire",
        services_bending_desc: "Îndoire precisă a metalului pe prese hidraulice.",

        services_rolling_title: "Rularea (Valțuirea)",
        services_rolling_desc: "Formarea cilindrilor și arcurilor din tablă metalică.",

        services_drilling_title: "Găurire și decupare",
        services_drilling_desc: "Realizarea găurilor și decupajelor în table și țevi.",

        services_bandsaw_title: "Tăiere pe ferăstrău cu bandă",
        services_bandsaw_desc: "Tăierea țevilor și profilelor la unghi drept sau înclinat.",

        services_pipe_title: "Racord țeavă în țeavă",
        services_pipe_desc: "Îmbinare precisă a țevilor prin decupare și ajustare.",

        services_grinder_title: "Tăiere cu polizor unghiular",
        services_grinder_desc: "Tăiere manuală a metalului cu polizor unghiular.",

        services_welding_title: "Sudură",
        services_welding_desc: "Îmbinarea pieselor metalice prin sudură MIG/MAG, TIG sau arc electric.",

        services_stiffener_title: "Montarea nervurii de rigidizare („rândunică”)",
        services_stiffener_desc: "Consolidarea structurii prin instalarea de elemente de rigidizare.",

        services_leg_title: "Montarea piciorului",
        services_leg_desc: "Fixarea și montarea picioarelor de susținere în construcții.",

        services_acid_title: "Tratament cu acid",
        services_acid_desc: "Curățarea și protecția metalului prin tratament chimic.",

        // Auth
        login: "Autentificare",
        logout: "Deconectare",
        email: "Email",
        password: "Parolă",
        sign_in: "Conectare",
        cancel: "Anulează",
        need_auth: "Această pagină este disponibilă doar utilizatorilor autentificați.",
        nav_products_private: "Produsele mele",

        // Search
        search_all_products: "Căutare produse",
        search_placehold: "Căutați produse, mărci, categorii…",
        search: "Căutare",

        // Catalog categorii speciale
        cat_metal: "PROFIL METALIC",
        cat_vini: "VINIFICAȚIE",
        cat_furniture: "MOBILĂ DIN INOX",

        cat_metal_sheet: "TABLĂ DIN INOX",
        cat_metal_profile_pipe: "ȚEAVĂ PROFILATĂ DIN INOX",
        cat_metal_round_pipe: "ȚEAVĂ ROTUNDĂ DIN INOX",
        cat_metal_strip: "FÂȘIE DIN INOX",
        cat_metal_angle: "COLȚAR DIN INOX",
        cat_metal_rod: "BARĂ DIN INOX",

        cat_vini_tanks: "REZERVOARE",
        cat_vini_pumps: "POMPE",
        cat_vini_fittings: "FITTINGURI",

        cat_furniture_tables: "MESE",
        cat_furniture_shelves: "RAFTURI",
        cat_furniture_legs: "SUPORTURI",

        // Despre noi (detaliat)
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

        about_open_map: "Deschide ruta în Google Maps",

        adv_quality_title: "Garanția calității",
        adv_quality_desc: "Garantăm fiabilitatea și durabilitatea tuturor produselor și serviciilor noastre.",

        adv_custom_title: "Comenzi individuale",
        adv_custom_desc: "Realizăm proiecte conform desenelor și cerințelor clientului.",

        adv_consult_title: "Consultanța specialiștilor",
        adv_consult_desc: "Inginerii și meșterii noștri vă ajută să alegeți soluții optime pentru proiectele dvs."

    }
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