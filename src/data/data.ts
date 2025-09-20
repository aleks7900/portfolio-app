import {Hammer, type LucideProps, Ruler, ScanLine, Sparkles, Users} from "lucide-react";
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
        slug: "laser-cutting",
        icon: ScanLine,
        title: "Лазерная резка",
        titleKey: "services_laser_title",
        descKey: "services_laser_desc",
        lead: "Высокоточная резка листового металла с минимальными заусенцами.",
        hero: "/images/services/laser.jpg",
        features: ["Толщина до 20 мм", "Чистый рез без доработки", "Высокая скорость"],
        sections: [
            {
                heading: "Применение",
                html: `<ul class="list-disc pl-5 space-y-1">
          <li>Листы из нержавеющей стали</li>
          <li>Алюминий, медь, черный металл</li>
          <li>Фигурные детали по чертежам</li>
        </ul>`
            }
        ],
        faqs: [
            {q: "Какая точность?", a: "До 0,1 мм при правильной настройке оборудования."}
        ]
    },
    {
        id: 2,
        slug: "design-engineering",
        icon: Ruler, // можешь заменить на другой символ, например Hammer или PencilRuler
        title: "Конструкторское проектирование",
        titleKey: "services_design_title",
        descKey: "services_design_desc",
        lead: "Разработка чертежей и 3D-моделей для металлоконструкций любой сложности.",
        hero: "/images/services/design.jpg",
        features: [
            "Индивидуальные проекты",
            "3D-моделирование в CAD",
            "Оптимизация конструкции под производство"
        ],
        sections: [
            {
                heading: "Что входит",
                html: `<ul class="list-disc pl-5 space-y-1">
              <li>Создание рабочих чертежей</li>
              <li>Подготовка разверток и спецификаций</li>
              <li>Проработка узлов и соединений</li>
              <li>Подбор материалов и технологий</li>
            </ul>`
            }
        ],
        faqs: [
            {q: "Можно ли заказать проект под ключ?", a: "Да, мы разрабатываем проект и сопровождаем его до готового изделия."}
        ]
    },
    {
        id: 3,
        slug: "bending",
        icon: Hammer,
        title: "Гибка",
        titleKey: "services_bending_title",
        descKey: "services_bending_desc",
        lead: "Прецизионная гибка металла на прессах.",
        hero: "/images/services/bending.jpg",
        features: ["Гибка до 3 м", "Радиусы по требованию", "Многократные операции"],
        sections: [
            {
                heading: "Примеры",
                html: `<ul class="list-disc pl-5 space-y-1">
          <li>Короба и профили</li>
          <li>Углы 90° и произвольные</li>
          <li>Технические детали для конструкций</li>
        </ul>`
            }
        ],
        faqs: [
            {q: "Какое отклонение угла?", a: "Не более ±1°."}
        ]
    },
    {
        id: 4,
        slug: "rolling",
        icon: Sparkles,
        title: "Вальцовка",
        titleKey: "services_rolling_title",
        descKey: "services_rolling_desc",
        lead: "Формирование цилиндров и дуг из листового металла.",
        hero: "/images/services/rolling.jpg",
        features: ["Диаметр от 100 мм", "Длина до 2,5 м", "Равномерная геометрия"],
        sections: [
            {
                heading: "Где применяется",
                html: `<p>Трубы, кожухи, корпуса, емкости из листового металла.</p>`
            }
        ],
        faqs: [
            {q: "Минимальная толщина?", a: "От 1 мм."}
        ]
    },
    {
        id: 5,
        slug: "drilling-cutting",
        icon: Ruler,
        title: "Отверстие в листовом материале и трубе",
        titleKey: "services_drilling_title",
        descKey: "services_drilling_desc",
        lead: "Высверливание и вырезание отверстий в листах и трубах.",
        hero: "/images/services/drilling.jpg",
        features: ["Разные диаметры", "Точная геометрия", "Без деформации края"],
        sections: [
            {
                heading: "Виды отверстий",
                html: `<ul class="list-disc pl-5 space-y-1">
          <li>Круглые</li>
          <li>Прямоугольные</li>
          <li>Фигурные по заказу</li>
        </ul>`
            }
        ],
        faqs: [
            {q: "Максимальный диаметр?", a: "До 120 мм."}
        ]
    },
    {
        id: 6,
        slug: "bandsaw-cutting",
        icon: Hammer,
        title: "Торцовка на ленточной пиле",
        titleKey: "services_bandsaw_title",
        descKey: "services_bandsaw_desc",
        lead: "Резка труб и профилей под прямым или заданным углом.",
        hero: "/images/services/bandsaw.jpg",
        features: ["Чистый срез", "Толстостенные трубы", "Большие партии"],
        sections: [
            {heading: "Преимущества", html: `<p>Минимум отходов и высокая производительность.</p>`}
        ],
        faqs: [
            {q: "Какие углы доступны?", a: "От 0° до 60°."}
        ]
    },
    {
        id: 7,
        slug: "pipe-connection",
        icon: ScanLine,
        title: "Врезка труба в трубу",
        titleKey: "services_pipe_title",
        descKey: "services_pipe_desc",
        lead: "Аккуратная врезка с обеспечением герметичности соединений.",
        hero: "/images/services/pipe.jpg",
        features: ["Разные диаметры", "Точная геометрия", "Под сварку"],
        sections: [
            {heading: "Применение", html: `<p>Конструкции из труб, инженерные сети.</p>`}
        ],
        faqs: [
            {q: "Можно ли под углом?", a: "Да, выполняем врезку под любым углом."}
        ]
    },
    {
        id: 8,
        slug: "grinder-cutting",
        icon: Ruler,
        title: "Резка болгаркой",
        titleKey: "services_grinder_title",
        descKey: "services_grinder_desc",
        lead: "Резка металла ручной углошлифовальной машинкой.",
        hero: "/images/services/grinder.jpg",
        features: ["Быстро", "Удобно", "Для небольших объемов"],
        sections: [
            {heading: "Когда используется", html: `<p>Для мелких партий и нестандартных операций.</p>`}
        ],
        faqs: [
            {q: "Толщина металла?", a: "До 10 мм."}
        ]
    },
    {
        id: 9,
        slug: "welding",
        icon: Hammer,
        title: "Сварка",
        titleKey: "services_welding_title",
        descKey: "services_welding_desc",
        lead: "Соединение металлических деталей сваркой разных типов.",
        hero: "/images/services/welding.jpg",
        features: ["MIG/MAG", "TIG", "Ручная дуговая"],
        sections: [
            {
                heading: "Где применяется",
                html: `<p>Металлоконструкции, трубы, каркасы, опоры.</p>`
            }
        ],
        faqs: [
            {q: "Есть ли сертифицированные сварщики?", a: "Да, все работы выполняют специалисты с опытом более 10 лет."}
        ]
    },
    {
        id: 10,
        slug: "stiffener",
        icon: Sparkles,
        title: "Установка ребра жёсткости («ласточка»)",
        titleKey: "services_stiffener_title",
        descKey: "services_stiffener_desc",
        lead: "Повышение прочности изделий за счёт установки усилителей.",
        hero: "/images/services/stiffener.jpg",
        features: ["Надёжность конструкции", "Увеличение ресурса", "Снижение вибраций"],
        sections: [
            {heading: "Применение", html: `<p>Рамы, корпуса, опоры.</p>`}
        ],
        faqs: [
            {q: "Можно ли установить на готовое изделие?", a: "Да, выполняем доработку уже готовых конструкций."}
        ]
    },
    {
        id: 11,
        slug: "leg-installation",
        icon: Ruler,
        title: "Забивание ножки",
        titleKey: "services_leg_title",
        descKey: "services_leg_desc",
        lead: "Монтаж и фиксация опорных ножек в конструкции.",
        hero: "/images/services/leg.jpg",
        features: ["Прочная фиксация", "Ровная установка", "Быстрое выполнение"],
        sections: [
            {heading: "Примеры", html: `<p>Мебельные и промышленные конструкции.</p>`}
        ],
        faqs: [
            {q: "Под какие материалы?", a: "Сталь, нержавейка, алюминий."}
        ]
    },
    {
        id: 12,
        slug: "acid-treatment",
        icon: Sparkles,
        title: "Обработка кислотой",
        titleKey: "services_acid_title",
        descKey: "services_acid_desc",
        lead: "Химическая обработка для очистки и защиты металла.",
        hero: "/images/services/acid.jpg",
        features: ["Удаление окалины", "Защита от коррозии", "Гладкая поверхность"],
        sections: [
            {heading: "Особенности", html: `<p>Применяется для нержавейки и других сплавов.</p>`}
        ],
        faqs: [
            {q: "Безопасно ли?", a: "Все работы выполняются в соответствии с нормами безопасности."}
        ]
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