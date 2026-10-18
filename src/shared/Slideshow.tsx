import { useEffect, useState, useRef, useCallback } from "react";
import "keen-slider/keen-slider.min.css";
import { type KeenSliderPlugin, useKeenSlider } from "keen-slider/react";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  CheckCircle2,
  X,
  Code2,
  Terminal,
} from "lucide-react";

import slide1 from "../assets/img/site.jpg";
import slide2 from "../assets/img/app.jpg";
import slide3 from "../assets/img/web.png";
import slide4 from "../assets/img/soft.png";
import slide5 from "../assets/img/business.jpg";
import slide6 from "../assets/img/android.png";
import slide7 from "../assets/img/support.jpeg";
import slide8 from "../assets/img/seo.jpg";
import { useI18n, toLangHref } from "./i18n/i18n.tsx";
import { Link } from "react-router-dom";
import { useAnimePerspectiveTilt } from "../hooks/useAnimePerspectiveTilt";
import { useMagnetic } from "../hooks/useMagnetic";
import { createTimeline, stagger, SPRING_PRESETS, EASINGS, prefersReducedMotion } from "../lib/anime/animeCore";

type Lang = "ru" | "ro" | "en";

const UI_STRINGS: Record<string, Record<Lang, string>> = {
  projectsTitle: {
    ru: "Флагманские решения & Проекты",
    ro: "Soluții Flagship & Proiecte",
    en: "Flagship Solutions & Engineering Projects",
  },
  exploreArchitecture: {
    ru: "Подробнее о проекте",
    ro: "Detalii despre proiect",
    en: "Explore Architecture",
  },
  exploreService: {
    ru: "Перейти к услуге",
    ro: "Accesează serviciul",
    en: "View Service",
  },
  projectSpecs: {
    ru: "Ключевые архитектурные решения",
    ro: "Soluții arhitecturale cheie",
    en: "Key Architecture Decisions",
  },
  techStackApplied: {
    ru: "Используемые технологии",
    ro: "Tehnologii aplicate",
    en: "Technologies Applied",
  },
  close: {
    ru: "Закрыть",
    ro: "Închide",
    en: "Close",
  },
  discussSimilar: {
    ru: "Заказать аналогичное решение",
    ro: "Comandă o soluție similară",
    en: "Order a Similar Solution",
  },
};

interface SlideData {
  id: number;
  img: string;
  category: { ru: string; ro: string; en: string };
  tags: string[];
  metrics: string;
  slug: string;
  translations: Record<Lang, { title: string; text: string; details?: string[] }>;
}

const slides: SlideData[] = [
  {
    id: 1,
    img: slide1,
    category: {
      ru: "Full-Stack Разработка",
      ro: "Dezvoltare Full-Stack",
      en: "Full-Stack Engineering",
    },
    tags: ["React 19", "Spring Boot", "TypeScript", "PostgreSQL", "Docker"],
    metrics: "Sub-second LCP • Enterprise Grade",
    slug: "/service",
    translations: {
      ru: {
        title: "Разработка сайтов и веб-приложений любой сложности",
        text: "на React + Spring (TypeScript + Java 17/21)",
        details: [
          "Архитектура микросервисов и монолитов высокой доступности",
          "Полная типизация TypeScript + строгие контракты Spring Boot",
          "Интеграция реляционных БД и распределённого кеширования",
        ],
      },
      ro: {
        title: "Dezvoltarea site-urilor și aplicațiilor web de orice complexitate",
        text: "pe React + Spring (TypeScript + Java 17/21)",
        details: [
          "Arhitectură microservicii și monolit de înaltă disponibilitate",
          "Tipizare strictă TypeScript + contracte Spring Boot",
          "Integrare baze de date relaționale și cache distribuit",
        ],
      },
      en: {
        title: "Development of websites and web applications of any complexity",
        text: "with React + Spring (TypeScript + Java 17/21)",
        details: [
          "High-availability microservices & enterprise monolithic architecture",
          "End-to-end TypeScript typing + rigorous Spring Boot API contracts",
          "Scalable relational DBs & distributed caching integration",
        ],
      },
    },
  },
  {
    id: 2,
    img: slide2,
    category: {
      ru: "Индивидуальные Проекты",
      ro: "Proiecte Individuale",
      en: "Custom Architecture",
    },
    tags: ["Next-Gen UI", "Tailwind CSS", "Custom CRM", "REST / GraphQL"],
    metrics: "Bespoke Design • 100% Scalable",
    slug: "/services/custom-orders",
    translations: {
      ru: {
        title: "Разработка сайтов по индивидуальному заказу",
        text: "Проектирование под ваши уникальные бизнес-процессы",
        details: [
          "Глубокий анализ требований и прототипирование сценариев",
          "Уникальный брендированный интерфейс без шаблонных решений",
          "Плавная интеграция с существующими ERP/CRM системами",
        ],
      },
      ro: {
        title: "Dezvoltarea site-urilor la comandă",
        text: "Proiectare adaptată proceselor dumneavoastră unice de afaceri",
        details: [
          "Analiză aprofundată a cerințelor și prototipare funcțională",
          "Interfață personalizată fără șabloane generice",
          "Integrare cu sisteme ERP/CRM existente",
        ],
      },
      en: {
        title: "Custom website development",
        text: "Engineered specifically for your unique business workflows",
        details: [
          "In-depth requirements discovery & high-fidelity user workflows",
          "Bespoke branded digital experiences with zero generic templates",
          "Frictionless integration with legacy CRM/ERP infrastructures",
        ],
      },
    },
  },
  {
    id: 3,
    img: slide3,
    category: {
      ru: "SPA & PWA Приложения",
      ro: "Aplicații SPA & PWA",
      en: "SPA & Progressive Web Apps",
    },
    tags: ["PWA", "Service Workers", "Offline First", "Web Push", "IndexedDB"],
    metrics: "Installable App • Offline Capable",
    slug: "/guide",
    translations: {
      ru: {
        title: "Разработка SPA и PWA веб-приложений",
        text: "Настоящий app-like опыт прямо в мобильном и настольном браузере",
        details: [
          "Мгновенная установка на домашний экран смартфонов и ПК",
          "Автономная работа в оффлайн-режиме через Service Worker",
          "Push-уведомления и фоновая синхронизация данных",
        ],
      },
      ro: {
        title: "Dezvoltarea aplicațiilor web SPA și PWA",
        text: "Experiență similară aplicațiilor native în browser",
        details: [
          "Instalare instantanee pe ecranul principal pe mobil și desktop",
          "Funcționare offline prin Service Worker",
          "Notificări push și sincronizare în fundal",
        ],
      },
      en: {
        title: "Development of SPA and PWA web applications",
        text: "Native-like performance and fluidity right inside modern browsers",
        details: [
          "One-click installation to mobile and desktop home screens",
          "Resilient offline operation with background Service Workers",
          "Engaging Web Push notifications and seamless background sync",
        ],
      },
    },
  },
  {
    id: 4,
    img: slide4,
    category: {
      ru: "Корпоративное ПО",
      ro: "Software Corporativ",
      en: "Enterprise Software",
    },
    tags: ["High-Load", "Spring Security", "JWT / OAuth2", "Redis", "Kafka"],
    metrics: "Bank-Grade Security • 99.99% Uptime",
    slug: "/services/quality-guarantee",
    translations: {
      ru: {
        title: "Разработка комплексных программных решений",
        text: "Для автоматизации и масштабирования ключевых операций",
        details: [
          "Многоуровневая авторизация на базе Spring Security и JWT",
          "Аудит безопасности, защита от OWASP уязвимостей",
          "Масштабируемые базы данных с репликацией",
        ],
      },
      ro: {
        title: "Crearea site-urilor și aplicațiilor web complexe",
        text: "Pentru automatizarea și scalarea operațiunilor cheie",
        details: [
          "Autorizare pe mai multe niveluri bazată pe Spring Security și JWT",
          "Audit de securitate, protecție împotriva vulnerabilităților OWASP",
          "Baze de date scalabile cu replicare",
        ],
      },
      en: {
        title: "Creation of complex software & web applications",
        text: "Empowering businesses to automate and scale core operations",
        details: [
          "Multi-tenant RBAC permissions powered by Spring Security & OAuth2",
          "Hardened OWASP Top-10 security compliance and audit trails",
          "Fault-tolerant replicated databases and distributed queues",
        ],
      },
    },
  },
  {
    id: 5,
    img: slide5,
    category: {
      ru: "Бизнес Решения",
      ro: "Soluții de Afaceri",
      en: "Business Platforms",
    },
    tags: ["E-Commerce", "Payments", "SEO Optimized", "Analytics", "Vite"],
    metrics: "Conversion Focused • Lightning Fast",
    slug: "/service",
    translations: {
      ru: {
        title: "Разработка сайтов для малого и среднего бизнеса",
        text: "Современные конверсионные витрины и корпоративные порталы",
        details: [
          "Быстрый цикл запуска с гарантией качества кода",
          "Интеграция платёжных шлюзов и автоматической рассылки",
          "Интуитивные панели управления для сотрудников компании",
        ],
      },
      ro: {
        title: "Dezvoltarea site-urilor pentru afaceri mici și mijlocii",
        text: "Showroom-uri digitale moderne și portaluri corporative",
        details: [
          "Ciclu rapid de lansare cu garanția calității codului",
          "Integrare gateway-uri de plată și notificări automate",
          "Panouri administrative intuitive pentru angajați",
        ],
      },
      en: {
        title: "Development of websites for small and medium businesses",
        text: "Conversion-optimized platforms designed to drive real growth",
        details: [
          "Rapid time-to-market coupled with pristine code quality",
          "Secure payment gateways and automated transactional messaging",
          "Intuitive custom admin consoles tailored for your team",
        ],
      },
    },
  },
  {
    id: 6,
    img: slide6,
    category: {
      ru: "Мобильная Разработка",
      ro: "Dezvoltare Mobilă",
      en: "Mobile Engineering",
    },
    tags: ["Android 10-16", "Java 17+", "Kotlin", "Material 3", "REST APIs"],
    metrics: "Native Performance • Google Play Ready",
    slug: "/service",
    translations: {
      ru: {
        title: "Разработка Android приложений под заказ",
        text: "Современные мобильные сервисы с нативной скоростью работы",
        details: [
          "Поддержка широкого парка устройств от Android 10 до 16",
          "Материальный адаптивный дизайн по гайдлайнам Google",
          "Сквозная синхронизация с бэкендом и локальное кэширование",
        ],
      },
      ro: {
        title: "Dezvoltarea aplicațiilor Android la comandă",
        text: "Servicii mobile moderne cu viteză nativă de execuție",
        details: [
          "Compatibilitate extinsă pentru Android versiunile 10 - 16",
          "Design adaptiv conform ghidurilor Material 3 de la Google",
          "Sincronizare completă cu backend-ul și cache local",
        ],
      },
      en: {
        title: "Custom Android application development",
        text: "Robust mobile clients delivering high frame rate fluidity",
        details: [
          "Extensive device coverage spanning Android 10 through 16",
          "Pixel-perfect Material 3 design conforming to Google guidelines",
          "Rock-solid backend synchronization with offline database caching",
        ],
      },
    },
  },
  {
    id: 7,
    img: slide7,
    category: {
      ru: "Решения Под Ключ",
      ro: "Soluții la Cheie",
      en: "Turnkey Infrastructure",
    },
    tags: ["DevOps", "Nginx", "SSL / TLS", "Cloud Hosting", "CI/CD"],
    metrics: "Zero Downtime Deploy • SSL A+",
    slug: "/service",
    translations: {
      ru: {
        title: "Сайты под ключ: домен, хостинг, безопасность и запуск",
        text: "Полный комплекс работ от первой строки кода до развёртывания",
        details: [
          "Настройка веб-серверов Nginx с HTTP/2 и TLS-шифрованием",
          "Автоматизированные пайплайны сборки и непрерывного деплоя",
          "Мониторинг доступности и резервное копирование по расписанию",
        ],
      },
      ro: {
        title: "Site-uri la cheie, pachet complet de găzduire și domeniu",
        text: "Servicii complete de la prima linie de cod până la lansare",
        details: [
          "Configurare servere Nginx cu HTTP/2 și criptare TLS",
          "Conducte automatizate de compilare și implementare CI/CD",
          "Monitorizare disponibilitate și backup automatizat",
        ],
      },
      en: {
        title: "Turnkey websites: hosting, domains, security and launch",
        text: "Complete end-to-end execution from architecture to production",
        details: [
          "High-performance Nginx reverse proxies with HTTP/2 and TLS 1.3",
          "Automated containerized CI/CD build pipelines for zero-downtime updates",
          "24/7 uptime monitoring and scheduled automated snapshot backups",
        ],
      },
    },
  },
  {
    id: 8,
    img: slide8,
    category: {
      ru: "Поддержка & SEO",
      ro: "Mentenanță & SEO",
      en: "Maintenance & SEO",
    },
    tags: ["Technical SEO", "Core Web Vitals", "Security Patches", "Analytics"],
    metrics: "100 Lighthouse • Top Search Ranks",
    slug: "/services/expert-consulting",
    translations: {
      ru: {
        title: "Техническая поддержка и SEO-оптимизация",
        text: "Гарантия стабильной работы и роста позиций в поисковой выдаче",
        details: [
          "Регулярные обновления зависимостей и аудит производительности",
          "Оптимизация Core Web Vitals (LCP, CLS, INP) до зелёной зоны",
          "Внедрение структурированных микроданных Schema.org",
        ],
      },
      ro: {
        title: "Suport tehnic și optimizare SEO avansată",
        text: "Stabilitate garantată și creștere continuă a vizibilității",
        details: [
          "Actualizări regulate de securitate și audit de viteză",
          "Optimizare Core Web Vitals (LCP, CLS, INP) pentru scor maxim",
          "Date structurate Schema.org pentru indexare perfectă",
        ],
      },
      en: {
        title: "Ongoing maintenance, technical support and SEO mastery",
        text: "Sustained peak performance, rock-solid security and organic growth",
        details: [
          "Proactive dependency vulnerability audits and security patching",
          "Core Web Vitals (LCP, CLS, INP) fine-tuning for top 1% page speeds",
          "Comprehensive Schema.org semantic microdata for organic rank dominance",
        ],
      },
    },
  },
];

/** Autoplay plugin with pause on hover */
const AutoPlay: KeenSliderPlugin = (slider) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let mouseOver = false;

  function clear() {
    if (timeout) clearTimeout(timeout);
    timeout = null;
  }

  function nextWithDelay() {
    clear();
    if (mouseOver) return;
    const delay = 4200;
    timeout = setTimeout(() => slider.next(), delay);
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseenter", () => {
      mouseOver = true;
      clear();
    });
    slider.container.addEventListener("mouseleave", () => {
      mouseOver = false;
      nextWithDelay();
    });
    nextWithDelay();
  });

  slider.on("dragStarted", clear);
  slider.on("animationEnded", nextWithDelay);
  slider.on("updated", nextWithDelay);
};

export default function Slideshow() {
  const [current, setCurrent] = useState(0);
  const [activeModalSlide, setActiveModalSlide] = useState<SlideData | null>(null);
  const { lang } = useI18n();

  // 3D Perspective Tilt on the showcase stage with Anime.js spring physics
  const { ref: stageTiltRef, glareRef, onMouseMove, onMouseLeave } =
    useAnimePerspectiveTilt<HTMLDivElement>({
      maxTiltX: 3.5,
      maxTiltY: 3.5,
      liftZ: 10,
      scale: 1.008,
      glare: true,
    });

  // Magnetic interactive navigation controls
  const prevBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.35, maxDistance: 14 });
  const nextBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.35, maxDistance: 14 });

  // Refs for animated text in active slide
  const activeSlideContentRef = useRef<HTMLDivElement | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slideChanged(s) {
        const nextIdx = s.track.details.rel;
        setCurrent(nextIdx);
        // Trigger Anime.js spring entrance on slide change
        triggerSlideEntrance();
      },
      created(s) {
        setCurrent(s.track.details.rel);
      },
    },
    [AutoPlay]
  );

  const triggerSlideEntrance = useCallback(() => {
    if (prefersReducedMotion()) return;
    const container = activeSlideContentRef.current;
    if (!container) return;

    const badges = container.querySelectorAll("[data-anime-badge]");
    const texts = container.querySelectorAll("[data-anime-text]");

    const tl = createTimeline({
      defaults: {
        ease: SPRING_PRESETS.snappy,
      },
    });

    if (texts.length > 0) {
      (tl as any).add(texts, {
        opacity: [0, 1],
        translateY: [18, 0],
        duration: 550,
        delay: stagger(60),
        ease: EASINGS.easeOutCubic,
      }, 0);
    }

    if (badges.length > 0) {
      (tl as any).add(badges, {
        opacity: [0, 1],
        scale: [0.85, 1],
        translateY: [10, 0],
        duration: 500,
        delay: stagger(40),
        ease: SPRING_PRESETS.bouncy,
      }, 120);
    }
  }, []);

  useEffect(() => {
    instanceRef.current?.update();
  }, [instanceRef, lang]);

  const activeSlide = slides[current] || slides[0];

  return (
    <div className="relative mx-auto max-w-[76rem] xl:max-w-[84rem] px-4 sm:px-6 py-6 sm:py-10">
      {/* ── Section Eyebrow Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-2">
            <Layers className="h-3.5 w-3.5 text-primary" />
            <span>Interactive Engineering Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            {UI_STRINGS.projectsTitle[lang] || UI_STRINGS.projectsTitle.ru}
          </h2>
        </div>

        {/* Quick Category Indicator */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-foreground">
            {activeSlide.category[lang] || activeSlide.category.ru}
          </span>
          <span className="text-border">•</span>
          <span>{activeSlide.metrics}</span>
        </div>
      </div>

      {/* ── 3D Perspective Stage Frame with Anime.js Spring Physics ── */}
      <div
        ref={stageTiltRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/80 bg-slate-950 [perspective:1200px] [transform-style:preserve-3d]"
      >
        {/* Pointer Specular Glare Layer */}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 opacity-0"
        />

        {/* KeenSlider Slides */}
        <div ref={sliderRef} className="keen-slider">
          {slides.map((s, index) => {
            const tr = s.translations[lang] ?? s.translations["ru"];
            const isSlideActive = index === current;

            return (
              <div
                key={s.id}
                className="keen-slider__slide relative h-[26rem] sm:h-[32rem] md:h-[38rem] flex items-end justify-start bg-slate-950"
              >
                {/* Background Image with Deep Contrast */}
                <img
                  src={s.img}
                  alt={tr.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out scale-100 hover:scale-105"
                />

                {/* Cinematic Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20 z-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent z-1" />

                {/* Ambient Edge Glow Border */}
                <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none z-10" />

                {/* Slide Foreground Content Layer */}
                <div
                  ref={isSlideActive ? activeSlideContentRef : undefined}
                  className="relative z-10 p-6 sm:p-10 md:p-14 max-w-3xl space-y-4"
                >
                  {/* Category Pill + Metric */}
                  <div
                    data-anime-badge
                    className="flex flex-wrap items-center gap-2.5"
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/20 backdrop-blur-md px-3 py-1 text-xs font-semibold text-primary-foreground shadow-xs">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      {s.category[lang] || s.category.ru}
                    </span>
                    <span className="rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-xs text-white/90 font-mono">
                      {s.metrics}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    data-anime-text
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md"
                  >
                    {tr.title}
                  </h3>

                  {/* Text description */}
                  <p
                    data-anime-text
                    className="text-sm sm:text-base md:text-lg text-slate-200/90 font-normal leading-relaxed max-w-2xl drop-shadow-sm"
                  >
                    {tr.text}
                  </p>

                  {/* Interactive Tech Badges */}
                  <div
                    data-anime-badge
                    className="flex flex-wrap items-center gap-2 pt-1"
                  >
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-medium text-slate-200 transition-all duration-200 hover:scale-105 hover:border-primary/50 hover:bg-slate-800"
                      >
                        <Terminal className="h-3 w-3 text-primary" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions: Explore Architecture Modal & Direct Link */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setActiveModalSlide(s)}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <span>{UI_STRINGS.exploreArchitecture[lang] || UI_STRINGS.exploreArchitecture.ru}</span>
                      <Code2 className="h-4 w-4" />
                    </button>

                    <Link
                      to={toLangHref(s.slug, lang)}
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-5 py-2.5 text-sm font-semibold transition-all active:scale-95 cursor-pointer"
                    >
                      <span>{UI_STRINGS.exploreService[lang] || UI_STRINGS.exploreService.ru}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Magnetic Prev Arrow Button */}
        <div
          ref={prevBtnRef as any}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:inline-block"
        >
          <button
            type="button"
            onClick={() => instanceRef.current?.prev()}
            className="flex items-center justify-center h-12 w-12 rounded-2xl bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-xl transition-transform active:scale-90 cursor-pointer outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>

        {/* Magnetic Next Arrow Button */}
        <div
          ref={nextBtnRef as any}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:inline-block"
        >
          <button
            type="button"
            onClick={() => instanceRef.current?.next()}
            className="flex items-center justify-center h-12 w-12 rounded-2xl bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-xl transition-transform active:scale-90 cursor-pointer outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Interactive Slide Progress Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                const abs = instanceRef.current?.track.details.abs ?? 0;
                instanceRef.current?.moveToIdx(abs + i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer outline-none ${
                current === i
                  ? "h-2 w-8 bg-primary shadow-md shadow-primary/50"
                  : "h-2 w-2 bg-white/40 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Expandable Project Architecture Modal Presentation ── */}
      {activeModalSlide && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md transition-opacity"
          onClick={() => setActiveModalSlide(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-border/60">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {activeModalSlide.category[lang] || activeModalSlide.category.ru}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {activeModalSlide.translations[lang]?.title ||
                    activeModalSlide.translations.ru.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalSlide(null)}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Image Preview */}
            <div className="relative rounded-2xl overflow-hidden h-48 sm:h-56 border border-border/60">
              <img
                src={activeModalSlide.img}
                alt="Architecture Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
            </div>

            {/* Architecture Highlights */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                {UI_STRINGS.projectSpecs[lang] || UI_STRINGS.projectSpecs.ru}
              </h4>
              <ul className="space-y-2.5">
                {(
                  activeModalSlide.translations[lang]?.details ||
                  activeModalSlide.translations.ru.details ||
                  []
                ).map((detail, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Badges in Modal */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {UI_STRINGS.techStackApplied[lang] || UI_STRINGS.techStackApplied.ru}
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModalSlide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground"
                  >
                    <Terminal className="h-3.5 w-3.5 text-primary" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-border/60 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModalSlide(null)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {UI_STRINGS.close[lang] || UI_STRINGS.close.ru}
              </button>
              <Link
                to={toLangHref(activeModalSlide.slug, lang)}
                onClick={() => {
                  setActiveModalSlide(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <span>{UI_STRINGS.discussSimilar[lang] || UI_STRINGS.discussSimilar.ru}</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
