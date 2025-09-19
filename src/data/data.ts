import {Hammer, type LucideProps, Ruler, ScanLine, Sparkles} from "lucide-react";
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
        slug: "laser",
        icon: ScanLine,
        title: "Лазерная резка",
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
            {q: "Сколько длится?", a: "Обычно 30–60 минут."},
            {q: "Нужно ли оставлять устройство?", a: "Нет, базовую диагностику делаем при вас."},
        ],
    },
    {
        id: 2,
        slug: "laptop-repair",
        icon: Hammer,
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
            {
                q: "Сохранятся ли данные?",
                a: "Да, работы проводим без форматирования. Предупредим, если потребуется перенос."
            },
        ],
    },
    {
        id: 3,
        slug: "data-recovery",
        icon: Sparkles,
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
            {q: "Сроки?", a: "От нескольких часов до нескольких дней — зависит от состояния носителя."},
        ],
    },
    {
        id: 4,
        slug: "data-recovery",
        icon: Ruler,
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
            {q: "Сроки?", a: "От нескольких часов до нескольких дней — зависит от состояния носителя."},
        ],
    },
    {
        id: 5,
        slug: "data-recovery",
        icon: Ruler,
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
            {q: "Сроки?", a: "От нескольких часов до нескольких дней — зависит от состояния носителя."},
        ],
    },
    {
        id: 6,
        slug: "data-recovery",
        icon: Ruler,
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
            {q: "Сроки?", a: "От нескольких часов до нескольких дней — зависит от состояния носителя."},
        ],
    },
    {
        id: 7,
        slug: "data-recovery",
        icon: Ruler,
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
            {q: "Сроки?", a: "От нескольких часов до нескольких дней — зависит от состояния носителя."},
        ],
    },
    {
        id: 8,
        slug: "data-recovery",
        icon: Ruler,
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
            {q: "Сроки?", a: "От нескольких часов до нескольких дней — зависит от состояния носителя."},
        ],
    },
    {
        id: 9,
        slug: "data-recovery",
        icon: Ruler,
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
            {q: "Сроки?", a: "От нескольких часов до нескольких дней — зависит от состояния носителя."},
        ],
    },
    {
        id: 10,
        slug: "data-recovery",
        icon: Ruler,
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
            {q: "Сроки?", a: "От нескольких часов до нескольких дней — зависит от состояния носителя."},
        ],
    },
    {
        id: 11,
        slug: "data-recovery",
        icon: Ruler,
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
            {q: "Сроки?", a: "От нескольких часов до нескольких дней — зависит от состояния носителя."},
        ],
    },
    {
        id: 12,
        slug: "data-recovery",
        icon: Ruler,
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
            {q: "Сроки?", a: "От нескольких часов до нескольких дней — зависит от состояния носителя."},
        ],
    },
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
            { q: "Какая гарантия предоставляется?", a: "На все изделия – от 12 до 24 месяцев в зависимости от типа продукции." },
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
            { q: "Можно ли внести изменения в процессе?", a: "Да, согласуем корректировки на любом этапе работы." },
        ],
    },
    {
        slug: "expert-consulting",
        icon: Hammer, // символ опыта и мастерства
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
            { q: "Консультация платная?", a: "Базовая консультация бесплатна, расширенные услуги – по договорённости." },
        ],
    },
];