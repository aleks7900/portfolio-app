import {useState} from "react";
import "keen-slider/keen-slider.min.css";
import {type KeenSliderPlugin, useKeenSlider} from "keen-slider/react";

import slide1 from "../assets/img/slide1.jpg";
import slide2 from "../assets/img/slide2.jpg";
import slide3 from "../assets/img/slide3.jpg";

const slides = [
    {id: 1, title: "Добро пожаловать!", text: "SPA на React + TS", img: slide1 },
    {id: 2, title: "Каталог товаров", text: "Фильтры, поиск, сортировка", img: slide2},
    {id: 3, title: "Тёмная тема и i18n", text: "Адаптивно и современно", img: slide3},
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
        // старт
        nextWithDelay();
    });

    // пауза на взаимодействиях
    slider.on("dragStarted", clear);
    slider.on("animationEnded", nextWithDelay);
    slider.on("updated", nextWithDelay);
};

export default function Slideshow() {
    const [current, setCurrent] = useState(0);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            slideChanged(s) {
                setCurrent(s.track.details.rel);
            },
        },
        [AutoPlay] // подключили плагин
    );

    return (
        <div className="relative mx-auto max-w-6xl">
            {/* Слайды */}
            <div ref={sliderRef} className="keen-slider rounded-2xl overflow-hidden shadow">
                {slides.map((s) => (
                    <div
                        key={s.id}
                        className="keen-slider__slide relative h-[400px] flex items-center justify-center bg-gray-200 dark:bg-black"
                    >
                        <img
                            src={s.img}
                            alt={s.title}
                            className="absolute inset-0 h-full w-full object-cover opacity-70"
                        />
                        <div className="relative z-10 text-center text-white px-4">
                            <h2 className="text-3xl font-bold">{s.title}</h2>
                            <p className="mt-2">{s.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Стрелки */}
            <button
                onClick={() => instanceRef.current?.prev()}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/70"
                aria-label="Prev"
            >
                ‹
            </button>
            <button
                onClick={() => instanceRef.current?.next()}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/70"
                aria-label="Next"
            >
                ›
            </button>

            {/* Точки */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => instanceRef.current?.moveToIdx(i)}
                        className={`h-3 w-3 rounded-full transition ${
                            current === i ? "bg-white" : "bg-white/50 hover:bg-white/80"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}