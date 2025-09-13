import {useEffect, useRef, useState} from "react";

type Props = {
    /** Если скролл не у window, передай селектор контейнера (например, "#app-scroll-root" или "main") */
    containerSelector?: string;
    /** Порог появления (px) */
    threshold?: number;
};

export default function ScrollTopButton({containerSelector, threshold = 300}: Props) {
    const [visible, setVisible] = useState(false);
    const containerRef = useRef<HTMLElement | Window | null>(null);

    // Ищем контейнер после маунта и при смене селектора
    useEffect(() => {
        const pick = () => {
            if (containerSelector) {
                const node = document.querySelector<HTMLElement>(containerSelector);
                containerRef.current = node ?? window;
            } else {
                containerRef.current = window;
            }
        };
        pick();

        // если контейнер появляется позже (ленивая разметка), пробуем ещё пару раз
        if (containerSelector && containerRef.current === window) {
            const t = setTimeout(pick, 0);
            const t2 = setTimeout(pick, 200);
            return () => {
                clearTimeout(t);
                clearTimeout(t2);
            };
        }
    }, [containerSelector]);

    // Следим за скроллом контейнера
    useEffect(() => {
        const el = containerRef.current ?? window;

        const getScrollTop = () => {
            if (el === window) return window.scrollY || document.documentElement.scrollTop || 0;
            return (el as HTMLElement).scrollTop;
        };

        const onScroll = () => setVisible(getScrollTop() > threshold);

        // первичный вызов (если уже проскроллено)
        onScroll();

        if (el === window) {
            window.addEventListener("scroll", onScroll, {passive: true});
            return () => window.removeEventListener("scroll", onScroll);
        } else {
            (el as HTMLElement).addEventListener("scroll", onScroll, {passive: true});
            return () => (el as HTMLElement).removeEventListener("scroll", onScroll);
        }
    }, [threshold]);

    const scrollToTop = () => {
        const el = containerRef.current ?? window;
        if (el === window) window.scrollTo({top: 0, behavior: "smooth"});
        else (el as HTMLElement).scrollTo({top: 0, behavior: "smooth"});
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={[
                // позиция СЛЕВА снизу + высокий слой
                "fixed bottom-6 left-6 z-[999]",
                // вид/анимация
                "flex items-center justify-center rounded-full shadow-lg",
                "bg-gray-900 text-white dark:bg-white dark:text-black",
                "p-3 transition-all duration-300 hover:bg-gray-700 dark:hover:bg-gray-200",
                visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4",
            ].join(" ")}
        >
            {/* простая SVG-иконка ↑ (не требует сторонних пакетов) */}
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path fill="currentColor" d="M12 4l-7 7h4v9h6v-9h4z"/>
            </svg>
        </button>
    );
}
