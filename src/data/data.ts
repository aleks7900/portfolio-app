import {
    BarChart3,
    Bot,
    Brain,
    Code,
    Globe,
    Laptop,
    type LucideProps,
    Monitor,
    Puzzle,
    Ruler,
    Server,
    Smartphone,
    Sparkles,
    Users,
    Workflow
} from "lucide-react";
import * as react from "react";

export type Service = {
    id: number;
    slug: string;
    icon: react.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
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
        id: 1,
        slug: "web",
        icon: Globe,
        title: "Разработка сайтов и веб приложений любой сложности",
        titleKey: "web_title",
        descKey: "web_text",
        lead: "на React + Spring (Typescript + Java 17/21)",
        hero: "",
        features: [],
        sections: [],
        faqs: []
    },
    {
        id: 2,
        slug: "spa",
        icon: Laptop,
        title: "Разработка SPA и PWA веб-приложений",
        titleKey: "spa_title",
        descKey: "spa_text",
        lead: "",
        hero: "",
        features: [],
        sections: [],
        faqs: []
    },
    {
        id: 3,
        slug: "individual",
        icon: Code,
        title: "Разработка сайтов по индивидуальному заказу",
        titleKey: "individual_title",
        descKey: "individual_text",
        lead: "",
        hero: "",
        features: [],
        sections: [],
        faqs: []
    },
    {
        id: 4,
        slug: "business",
        icon: Monitor,
        title: "Разработка сайтов для малого и среднего бизнеса",
        titleKey: "business_title",
        descKey: "business_text",
        lead: "",
        hero: "",
        features: [],
        sections: [],
        faqs: []
    },
    {
        id: 5,
        slug: "site",
        icon: Server,
        title: "Разработка сайтов и веб приложений любой сложности",
        titleKey: "site_title",
        descKey: "site_text",
        lead: "",
        hero: "",
        features: [],
        sections: [],
        faqs: []
    },
    {
        id: 6,
        slug: "visit",
        icon: Smartphone,
        title: "Разработка сайтов визиток",
        titleKey: "visit_title",
        descKey: "visit_text",
        lead: "",
        hero: "",
        features: [],
        sections: [],
        faqs: []
    },
    {
        id: 7,
        slug: "market",
        icon: BarChart3,
        title: "Разработка сайтов интернет-магазинов",
        titleKey: "market_title",
        descKey: "market_text",
        lead: "",
        hero: "",
        features: [],
        sections: [],
        faqs: []
    },
    {
        id: 8,
        slug: "lending",
        icon: Laptop,
        title: "Разработка сайтов лендингов",
        titleKey: "lending_title",
        descKey: "lending_text",
        lead: "",
        hero: "",
        features: [],
        sections: [],
        faqs: []
    },
    {
        id: 9,
        slug: "android",
        icon: Bot,
        title: "Разработка Android приложений под заказ",
        titleKey: "android_title",
        descKey: "android_text",
        lead: "",
        hero: "",
        features: [],
        sections: [],
        faqs: []
    },
    {
        id: 10,
        slug: "full",
        icon: Brain,
        title: "Сайты под ключ, полный пакет услуг по размещению и регистрации домена",
        titleKey: "full_title",
        descKey: "full_text",
        lead: "",
        hero: "",
        features: [],
        sections: [],
        faqs: []
    },
    {
        id: 11,
        slug: "content",
        icon: Puzzle,
        title: "Наполнение контентом",
        titleKey: "content_title",
        descKey: "content_text",
        lead: "",
        hero: "",
        features: [],
        sections: [],
        faqs: []
    },
    {
        id: 12,
        slug: "support",
        icon: Workflow,
        title: "Поддержка и сопровождение",
        titleKey: "support_title",
        descKey: "support_text",
        lead: "",
        hero: "",
        features: [],
        sections: [],
        faqs: []
    }
];

export type Advantage = {
    slug: string;
    icon: react.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
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

export const ADV: Advantage[] = [
    {
        slug: "quality-guarantee",
        icon: Sparkles, // подойдёт как символ качества
        title: "Гарантия качества",
        titleKey: "adv_quality_title",
        descKey: "adv_quality_desc",
        lead: "Мы гарантируем надёжность и долговечность всех наших изделий и услуг.",
        hero: "/images/advantages/quality.jpg",
        features: ["Сертифицированные материалы", "Контроль на каждом этапе", "Гарантия до 24 месяцев"],
        sections: [
            {
                heading: "Что включает",
                html: `
          <ul class="list-disc pl-5 space-y-1">
            <li>Тщательная проверка качества</li>
            <li>Соблюдение международных стандартов</li>
            <li>Документальное подтверждение гарантии</li>
          </ul>
        `,
            },
            {
                heading: "Почему это важно",
                html: `
          <p>Надёжность продукции – основа доверия клиентов и долгосрочного сотрудничества.</p>
        `,
            },
        ],
        faqs: [
            {
                q: "Какая гарантия предоставляется?",
                a: "На все изделия – от 12 до 24 месяцев в зависимости от типа продукции."
            },
        ],
    },
    {
        slug: "custom-orders",
        icon: Ruler, // символ индивидуальных размеров
        title: "Индивидуальные заказы",
        titleKey: "adv_custom_title",
        descKey: "adv_custom_desc",
        lead: "Мы создаём проекты по индивидуальным чертежам и требованиям заказчика.",
        hero: "/images/advantages/custom.jpg",
        features: ["Гибкий подход", "Учет всех пожеланий", "Оптимизация под бюджет"],
        sections: [
            {
                heading: "Наши возможности",
                html: `
          <ul class="list-disc pl-5 space-y-1">
            <li>Изготовление по чертежам клиента</li>
            <li>Помощь в разработке дизайна</li>
            <li>Производство любых объемов</li>
          </ul>
        `,
            },
            {
                heading: "Преимущества",
                html: `
          <p>Вы получаете изделие, которое максимально соответствует вашим потребностям и условиям эксплуатации.</p>
        `,
            },
        ],
        faqs: [
            {q: "Можно ли внести изменения в процессе?", a: "Да, согласуем корректировки на любом этапе работы."},
        ],
    },
    {
        slug: "expert-consulting",
        icon: Users, // символ опыта и мастерства
        title: "Консультации специалистов",
        titleKey: "adv_consult_title",
        descKey: "adv_consult_desc",
        lead: "Наши инженеры и мастера помогут подобрать оптимальные решения под ваши задачи.",
        hero: "/images/advantages/consulting.jpg",
        features: ["Бесплатная консультация", "Опыт более 10 лет", "Рекомендации по материалам и технологиям"],
        sections: [
            {
                heading: "Что мы предлагаем",
                html: `
          <ul class="list-disc pl-5 space-y-1">
            <li>Подбор оптимальных материалов</li>
            <li>Расчет стоимости и сроков</li>
            <li>Технические рекомендации</li>
          </ul>
        `,
            },
            {
                heading: "Для кого",
                html: `
          <p>Наши консультации подходят как частным клиентам, так и компаниям, планирующим масштабные проекты.</p>
        `,
            },
        ],
        faqs: [
            {q: "Консультация платная?", a: "Базовая консультация бесплатна, расширенные услуги – по договорённости."},
        ],
    },
];