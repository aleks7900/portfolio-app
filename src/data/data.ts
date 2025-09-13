import type {Product} from "./types.ts";

export const PRODUCTS: Product[] = [
    {
        id: 1, title: "UltraBook 13", brand: "Acelon", price: 1200, inStock: true,
        category: "electronics", subcategory: "laptops",
        images: ["/img/products/1-1.jpg", "/img/products/1-2.jpg", "/img/products/1-3.jpg"],
        specs: { "Процессор": "Core i7", "ОЗУ": "16 ГБ", "Накопитель": "512 ГБ SSD", "Вес": "1.2 кг" },
        rating: 4.6,
        reviews: [
            { id: "r1", author: "Иван", rating: 5, text: "Отличная батарея!", date: "2025-08-22" },
            { id: "r2", author: "Мария", rating: 4, text: "Лёгкий и быстрый.", date: "2025-09-01" },
        ],
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
    {
        id: 9,
        title: "NoteLite 14",
        brand: "Acelon",
        price: 700,
        inStock: true,
        category: "electronics",
        subcategory: "laptops"
    },
    {
        id: 10,
        title: "BassPods Pro",
        brand: "Phonia",
        price: 220,
        inStock: false,
        category: "accessories",
        subcategory: "headphones"
    },
];

export const BRANDS = Array.from(new Set(PRODUCTS.map(p => p.brand))).sort();

const LS_KEY = "admin_products";

export function loadAdminProducts(seed: Product[] = PRODUCTS): Product[] {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return [...seed];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as Product[]) : [...seed];
    } catch {
        return [...seed];
    }
}

export function saveAdminProducts(items: Product[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
    // сообщаем всем страницам
    window.dispatchEvent(new CustomEvent("products:updated"));
}

export type Service = {
    slug: string;
    titleKey: string;
    descKey: string;
    title: string;
    lead: string;
    hero?: string;                // url/путь картинки
    sections: { heading: string; html: string }[];
    features?: string[];          // маркеры преимуществ
    priceFrom?: number;           // «от …»
    duration?: string;            // длительность
    faqs?: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
    {
        slug: "diagnostics",
        title: "Компьютерная диагностика",
        titleKey: "services_diagnostics_title",
        descKey: "services_diagnostics_desc",
        lead: "Быстро выявим причину неисправности: железо, драйверы, система.",
        hero: "/images/services/diagnostics.jpg",
        features: ["Экспресс-проверка 30 мин", "Отчёт с рекомендациями", "Гарантия на работу"],
        priceFrom: 200,
        duration: "от 30 минут",
        sections: [
            {
                heading: "Что входит",
                html: `
          <ul class="list-disc pl-5 space-y-1">
            <li>Проверка SMART/памяти/температур</li>
            <li>Сканирование драйверов и журналов событий</li>
            <li>Оценка состояния ОС и автозагрузки</li>
          </ul>
        `,
            },
            {
                heading: "Почему мы",
                html: `
          <p>Работаем бережно, без потери данных. Детальный отчёт и понятные рекомендации, без навязываний.</p>
        `,
            },
        ],
        faqs: [
            { q: "Сколько длится?", a: "Обычно 30–60 минут." },
            { q: "Нужно ли оставлять устройство?", a: "Нет, базовую диагностику делаем при вас." },
        ],
    },
    {
        slug: "laptop-repair",
        title: "Ремонт ноутбуков",
        titleKey: "services_diagnostics_title",
        descKey: "services_diagnostics_desc",
        lead: "Замена компонентов, пайка, чистка, термопаста, восстановление зарядки.",
        hero: "/images/services/laptop-repair.jpg",
        features: ["Оригинальные запчасти", "Чистка и термопаста в каждом ремонте", "Гарантия до 6 мес"],
        priceFrom: 600,
        duration: "от 1 часа",
        sections: [
            {
                heading: "Типовые работы",
                html: `
          <ul class="list-disc pl-5 space-y-1">
            <li>Замена клавиатуры/экрана/батареи/SSD</li>
            <li>Чистка системы охлаждения</li>
            <li>Ремонт разъёмов, петель, платы питания</li>
          </ul>
        `,
            },
            {
                heading: "Процесс",
                html: `
          <ol class="list-decimal pl-5 space-y-1">
            <li>Диагностика и смета</li>
            <li>Согласование сроков и стоимости</li>
            <li>Ремонт и финальное тестирование</li>
          </ol>
        `,
            },
        ],
        faqs: [
            { q: "Сохранятся ли данные?", a: "Да, работы проводим без форматирования. Предупредим, если потребуется перенос." },
        ],
    },
    {
        slug: "data-recovery",
        title: "Восстановление данных",
        titleKey: "services_diagnostics_title",
        descKey: "services_diagnostics_desc",
        lead: "SSD, HDD, флешки. От логических до аппаратных неисправностей.",
        hero: "/images/services/data-recovery.jpg",
        features: ["Конфиденциально", "Безопасные методики", "Предварительная оценка"],
        priceFrom: 900,
        duration: "зависит от объёма",
        sections: [
            {
                heading: "Когда возможно",
                html: `
          <p>Удаление, форматирование, битая таблица, «сырой» раздел, сбои прошивки.</p>
        `,
            },
            {
                heading: "Не делайте",
                html: `
          <p>Не перезаписывайте носитель. Чем меньше действий — тем выше шанс восстановления.</p>
        `,
            },
        ],
        faqs: [
            { q: "Сроки?", a: "От нескольких часов до нескольких дней — зависит от состояния носителя." },
        ],
    },
];