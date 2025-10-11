import {useEffect, useState} from "react";
import "keen-slider/keen-slider.min.css";
import {type KeenSliderPlugin, useKeenSlider} from "keen-slider/react";
import {useTranslation} from "react-i18next";

import slide1 from "../assets/img/site.jpg";
import slide2 from "../assets/img/app.jpg";
import slide3 from "../assets/img/web.png";
import slide4 from "../assets/img/soft.png";
import slide5 from "../assets/img/business.jpg";
import slide6 from "../assets/img/android.png";
import slide7 from "../assets/img/support.jpeg";
import slide8 from "../assets/img/seo.jpg";

/** Двухъязычный массив слайдов */
const slides = [
    {
        id: 1,
        img: slide1,
        translations: {
            ru: {title: "Разработка сайтов и веб приложений любой сложности", text: "на React + Spring (Typescript + Java 17/21)"},
            ro: {title: "Produse din oțel inoxidabil", text: "Și multe altele"},
        },
    },
    {
        id: 2,
        img: slide2,
        translations: {
            ru: {title: "Разработка сайтов по индивидуальному заказу", text: "Работаем по индивидуальным заказам"},
            ro: {title: "Сomenzi individuale", text: "Lucrăm pe comenzi individuale"},
        },
    },
    {
        id: 3,
        img: slide3,
        translations: {
            ru: {title: "Разработка SPA и PWA веб-приложений", text: "И не только"},
            ro: {title: "Tăiere cu laser", text: "Pe echipamente moderne"},
        },
    },
    {
        id: 4,
        img: slide4,
        translations: {
            ru: {title: "Разработка сайтов и веб приложений любой сложности", text: "По вашим требованиям"},
            ro: {title: "Sudarea tuturor tipurilor de îmbinări", text: "Sudarea țevilor, blaturilor, rafturilor"},
        },
    },
    {
        id: 5,
        img: slide5,
        translations: {
            ru: {title: "Разработка сайтов для малого и среднего бизнеса", text: "Любая сложность работ"},
            ro: {title: "Lucrări de lăcătușerie", text: "Orice nivel de complexitate"},
        },
    },
    {
        id: 6,
        img: slide6,
        translations: {
            ru: {title: "Разработка Android приложений под заказ", text: "Android 10-16, Java 17+"},
            ro: {title: "Îndoire și rulare a metalului", text: "Conform cerințelor clientului"},
        },
    },
    {
        id: 7,
        img: slide7,
        translations: {
            ru: {title: "Сайты под ключ, полный пакет услуг по размещению и регистрации домена", text: "Полный комплекс поддержки"},
            ro: {title: "Îndoire și rulare a metalului", text: "Conform cerințelor clientului"},
        },
    },
    {
        id: 8,
        img: slide8,
        translations: {
            ru: {title: "Поддержка и сопровождение", text: "В течении года"},
            ro: {title: "Îndoire și rulare a metalului", text: "Conform cerințelor clientului"},
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

    const {i18n} = useTranslation();
    const lang = ((i18n.resolvedLanguage || i18n.language || "ru").toLowerCase().startsWith("ro")) ? "ro" : "ru";

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
        <div className="relative mx-auto max-w-[72rem] xl:max-w-[80rem] 2xl:max-w-[90rem]">
            {/* Слайды */}
            <div ref={sliderRef} className="keen-slider rounded-2xl overflow-hidden shadow">
                {slides.map((s) => {
                    const t = s.translations[lang];
                    return (
                        <div
                            key={s.id}
                            className="keen-slider__slide relative h-[40rem] max-h-[55vh] md:max-h-[55dvh] flex items-center justify-center bg-gray-200 dark:bg-black"
                        >
                            <img
                                src={s.img}
                                alt={t.title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="relative z-0 text-center text-white px-28">
                                <h2 className="text-5xl font-bold drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
                                    {t.title}
                                </h2>
                                <p className="text-3xl mt-2 drop-shadow-[0_3px_4px_rgba(0,0,0,0.8)]">
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
                className="group absolute left-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center
                 rounded-2xl px-5 py-3 text-base font-medium
                 !bg-white !text-black no-underline shadow transition-colors
                 hover:!bg-red-500 hover:!text-white hover:shadow-xl
                 focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-[0.99] z-10"
                aria-label="Prev"
            >
                <span className="leading-none select-none text-3xl h-10">‹</span>
            </button>

            <button
                onClick={() => instanceRef.current?.next()}
                className="group absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center
                 rounded-2xl px-5 py-3 text-base font-medium
                 !bg-white !text-black no-underline shadow transition-colors
                 hover:!bg-red-500 hover:!text-white hover:shadow-xl
                 focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-[0.99] z-10"
                aria-label="Next"
            >
                <span className="leading-none select-none text-3xl h-10">›</span>
            </button>

            {/* Точки */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            const abs = instanceRef.current?.track.details.abs ?? 0;
                            instanceRef.current?.moveToIdx(abs + i); // ✅ вместо moveToIdx(i)
                        }}
                        aria-label={`Go to slide ${i + 1}`}
                        className={[
                            "h-3.5 w-3.5 rounded-full transition transform duration-200",
                            "!focus:outline-none !focus:ring-2 !focus:ring-red-400",
                            current === i
                                ? "!bg-red-300 !shadow-xl !shadow-red-500/40 !ring-2 !ring-white scale-110"
                                : "!bg-white/80 dark:!bg-white/50 hover:!bg-red-300 hover:!shadow",
                        ].join(" ")}
                    />
                ))}
            </div>
        </div>
    );
}
