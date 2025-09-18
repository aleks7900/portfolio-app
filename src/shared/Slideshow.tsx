import {useState} from "react";
import "keen-slider/keen-slider.min.css";
import {type KeenSliderPlugin, useKeenSlider} from "keen-slider/react";

import slide1 from "../assets/img/slide1.jpg";
import slide2 from "../assets/img/slide2.jpg";
import slide3 from "../assets/img/slide3.png";
import slide4 from "../assets/img/slide4.jpg";
import slide5 from "../assets/img/slide5.jpg";
import slide6 from "../assets/img/slide6.jpg";
import slide7 from "../assets/img/slide7.png";

const slides = [
    {id: 1, title: "Металлоконструкции из нержавеющей стали", text: "Быстро и в срок", img: slide1},
    {id: 2, title: "Металлоконструкции из нержавеющей стали", text: "Быстро и в срок", img: slide2},
    {id: 3, title: "Лазерная резка", text: "На современном оборудовании", img: slide3},
    {id: 3, title: "Большой ассортимент материалов", text: "Все виды нержавеющей стали", img: slide4},
    {id: 3, title: "Основа - нержавеющая сталь", text: "Работаем с нержавейкой", img: slide5},
    {id: 3, title: "Слесарные работы", text: "Любая сложность работ", img: slide6},
    {id: 3, title: "Гибка и вальцовка металла", text: "По требованиям заказчика", img: slide7},
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

    // 1) useKeenSlider — добавь created:
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            slideChanged(s) {
                setCurrent(s.track.details.rel);
            },
            created(s) {                      // ← добавили
                setCurrent(s.track.details.rel);
            },
        },
        [AutoPlay]
    );

    return (
        <div className="relative mx-auto max-w-[72rem] xl:max-w-[80rem] 2xl:max-w-[90rem]">
            {/* Слайды */}
            <div ref={sliderRef} className="keen-slider rounded-2xl overflow-hidden shadow">
                {slides.map((s, i) => (
                    <div
                        key={i}
                        className="keen-slider__slide relative h-[400px] flex items-center justify-center bg-gray-200 dark:bg-black"
                    >
                        <img
                            src={s.img}
                            alt={s.title}
                            className="absolute inset-0 h-full w-full object-cover opacity-70"
                        />
                        <div className="relative z-0 text-center text-white px-4">
                            <h2 className="text-5xl font-bold drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
                                {s.title}
                            </h2>
                            <p className="text-3xl mt-2 drop-shadow-[0_3px_4px_rgba(0,0,0,0.8)]">
                                {s.text}
                            </p>
                        </div>
                    </div>
                ))}
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
                        onClick={() => instanceRef.current?.moveToIdx(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        // важные моменты:
                        // - у активной: !bg-red-500, !shadow-xl, !ring-2, scale-110
                        // - у неактивной: более светлый фон + hover усиливает
                        className={[
                            "h-3.5 w-3.5 rounded-full transition transform duration-200",
                            "!focus:outline-none !focus:ring-2 !focus:ring-red-400",
                            current === i
                                ? "!bg-red-300 !shadow-xl !shadow-red-500/40 !ring-2 !ring-white scale-110"
                                : "!bg-white/80 dark:!bg-white/50 hover:!bg-red-300 hover:!shadow"
                        ].join(" ")}
                    />
                ))}
            </div>
        </div>
    );
}