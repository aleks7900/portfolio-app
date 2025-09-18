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
            {q: "Сколько длится?", a: "Обычно 30–60 минут."},
            {q: "Нужно ли оставлять устройство?", a: "Нет, базовую диагностику делаем при вас."},
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
            {
                q: "Сохранятся ли данные?",
                a: "Да, работы проводим без форматирования. Предупредим, если потребуется перенос."
            },
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
            {q: "Сроки?", a: "От нескольких часов до нескольких дней — зависит от состояния носителя."},
        ],
    },
];