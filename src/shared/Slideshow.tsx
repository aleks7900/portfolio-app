import {useEffect, useState} from "react";
import "keen-slider/keen-slider.min.css";
import {type KeenSliderPlugin, useKeenSlider} from "keen-slider/react";

import slide1 from "../assets/img/site.jpg";
import slide2 from "../assets/img/app.jpg";
import slide3 from "../assets/img/web.png";
import slide4 from "../assets/img/soft.png";
import slide5 from "../assets/img/business.jpg";
import slide6 from "../assets/img/android.png";
import slide7 from "../assets/img/support.jpeg";
import slide8 from "../assets/img/seo.jpg";
import {useI18n} from "./i18n/i18n.tsx";

type Lang = "ru" | "ro" | "en";

interface Slide {
    id: number;
    img: string;
    translations: Record<Lang, { title: string; text: string }>;
}

/** массив слайдов */
const slides: Slide[] = [
    {
        id: 1,
        img: slide1,
        translations: {
            ru: {
                title: "Разработка сайтов и веб приложений любой сложности",
                text: "на React + Spring (Typescript + Java 17/21)"
            },
            ro: {
                title: "Dezvoltarea site-urilor și aplicațiilor web de orice complexitate",
                text: "pe React + Spring (TypeScript + Java 17/21)"
            },
            en: {
                title: "Development of websites and web applications of any complexity",
                text: "with React + Spring (TypeScript + Java 17/21)"
            },
        },
    },
    {
        id: 2,
        img: slide2,
        translations: {
            ru: { title: "Разработка сайтов по индивидуальному заказу", text: "Работаем по индивидуальным заказам" },
            ro: { title: "Dezvoltarea site-urilor la comandă", text: "Lucrăm conform cerințelor individuale" },
            en: { title: "Custom website development", text: "We work according to your individual requirements" },
        },
    },
    {
        id: 3,
        img: slide3,
        translations: {
            ru: { title: "Разработка SPA и PWA веб-приложений", text: "И не только" },
            ro: { title: "Dezvoltarea aplicațiilor web SPA și PWA", text: "Și multe altele" },
            en: { title: "Development of SPA and PWA web applications", text: "And much more" },
        },
    },
    {
        id: 4,
        img: slide4,
        translations: {
            ru: { title: "Разработка сайтов и веб приложений любой сложности", text: "По вашим требованиям" },
            ro: { title: "Crearea site-urilor și aplicațiilor web complexe", text: "Conform cerințelor dumneavoastră" },
            en: { title: "Creation of complex websites and web applications", text: "According to your requirements" },
        },
    },
    {
        id: 5,
        img: slide5,
        translations: {
            ru: { title: "Разработка сайтов для малого и среднего бизнеса", text: "Любая сложность работ" },
            ro: { title: "Dezvoltarea site-urilor pentru afaceri mici și mijlocii", text: "Orice nivel de complexitate" },
            en: { title: "Development of websites for small and medium businesses", text: "Any level of complexity" },
        },
    },
    {
        id: 6,
        img: slide6,
        translations: {
            ru: { title: "Разработка Android приложений под заказ", text: "Android 10-16, Java 17+" },
            ro: { title: "Dezvoltarea aplicațiilor Android la comandă", text: "Android 10-16, Java 17+" },
            en: { title: "Custom Android app development", text: "Android 10–16, Java 17+" },
        },
    },
    {
        id: 7,
        img: slide7,
        translations: {
            ru: {
                title: "Сайты под ключ, полный пакет услуг по размещению и регистрации домена",
                text: "Полный комплекс поддержки"
            },
            ro: {
                title: "Site-uri la cheie, pachet complet de servicii pentru găzduire și domeniu",
                text: "Suport complet și întreținere"
            },
            en: {
                title: "Turnkey websites — full package of hosting and domain services",
                text: "Comprehensive support and maintenance"
            },
        },
    },
    {
        id: 8,
        img: slide8,
        translations: {
            ru: { title: "Поддержка и сопровождение", text: "В течении года" },
            ro: { title: "Suport și mentenanță", text: "Pe parcursul unui an" },
            en: { title: "Support and maintenance", text: "Throughout the year" },
        },
    }
];

/** Плагин автоплей: 3–5 сек, пауза при hover и во время взаимодействий */
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
        const delay = 3000 + Math.random() * 2000; // 3–5s
        timeout = setTimeout(() => slider.next(), delay);
    }

    slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clear();
        });
        slider.container.addEventListener("mouseout", () => {
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

    const {lang} = useI18n();

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            slideChanged(s) {
                setCurrent(s.track.details.rel);
            },
            created(s) {
                setCurrent(s.track.details.rel);
            },
        },
        [AutoPlay]
    );

    useEffect(() => {
        instanceRef.current?.update();
    }, [instanceRef, lang]);
    // реагируем на переключение языка и обновляем текущий слайд

    return (
        <div className="relative mx-auto max-w-[76rem] xl:max-w-[84rem] px-4 sm:px-6">
            {/* Слайды */}
            <div ref={sliderRef} className="keen-slider rounded-3xl overflow-hidden shadow-2xl border border-border/60">
                {slides.map((s) => {
                    const t: { title: string; text: string } = s.translations[lang] ?? s.translations["ru"];
                    return (
                        <div
                            key={s.id}
                            className="keen-slider__slide relative h-[22rem] sm:h-[28rem] md:h-[36rem] max-h-[60vh] flex items-center justify-center bg-slate-900"
                        >
                            <img
                                src={s.img}
                                alt={t.title}
                                className="absolute inset-0 h-full w-full object-cover scale-105"
                            />
                            {/* Rich gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/30 z-1" />

                            <div className="relative z-10 text-center text-white px-6 sm:px-12 md:px-24 max-w-4xl mx-auto space-y-4">
                                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-md">
                                    {t.title}
                                </h2>
                                <p className="text-base sm:text-xl md:text-2xl text-slate-200 font-normal leading-relaxed drop-shadow-sm">
                                    {t.text}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Стрелки */}
            <button
                onClick={() => instanceRef.current?.prev()}
                className="absolute left-7 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 shadow-lg transition-all duration-150 active:scale-95 z-20 cursor-pointer outline-none"
                aria-label="Previous Slide"
            >
                <span className="text-2xl select-none leading-none">‹</span>
            </button>

            <button
                onClick={() => instanceRef.current?.next()}
                className="absolute right-7 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 shadow-lg transition-all duration-150 active:scale-95 z-20 cursor-pointer outline-none"
                aria-label="Next Slide"
            >
                <span className="text-2xl select-none leading-none">›</span>
            </button>

            {/* Точки */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            const abs = instanceRef.current?.track.details.abs ?? 0;
                            instanceRef.current?.moveToIdx(abs + i);
                        }}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`transition-all duration-300 rounded-full cursor-pointer outline-none ${
                            current === i
                                ? "h-2.5 w-7 bg-primary shadow-md"
                                : "h-2.5 w-2.5 bg-white/50 hover:bg-white/80"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
