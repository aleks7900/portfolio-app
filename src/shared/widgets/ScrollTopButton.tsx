import {useEffect, useMemo, useState} from "react";
import {createPortal} from "react-dom";

type Props = {
    /** Если скролл не у window — селектор контейнера (напр. "#app-scroll-root") */
    containerSelector?: string;
    /** Порог появления, px */
    threshold?: number;
    /** Позиция: "left" | "right" */
    side?: "left" | "right";
};

export default function ScrollTopButton({
                                            containerSelector,
                                            threshold = 300,
                                            side = "left", // вы просили слева
                                        }: Props) {
    const [visible, setVisible] = useState(false);

    const container = useMemo<HTMLElement | Window>(() => {
        if (containerSelector) {
            const el = document.querySelector<HTMLElement>(containerSelector);
            if (el) return el;
        }
        return window;
    }, [containerSelector]);

    useEffect(() => {
        const el = container as HTMLElement | Window;

        const getScrollTop = () => {
            if (el === window) return window.scrollY || document.documentElement.scrollTop || 0;
            return (el as HTMLElement).scrollTop;
        };

        const onScroll = () => setVisible(getScrollTop() > threshold);

        // первичная проверка
        onScroll();

        if (el === window) {
            window.addEventListener("scroll", onScroll, {passive: true});
            return () => window.removeEventListener("scroll", onScroll);
        } else {
            (el as HTMLElement).addEventListener("scroll", onScroll, {passive: true});
            return () => (el as HTMLElement).removeEventListener("scroll", onScroll);
        }
    }, [container, threshold]);

    const scrollToTop = () => {
        const el = container as HTMLElement | Window;
        if (el === window) window.scrollTo({top: 0, behavior: "smooth"});
        else (el as HTMLElement).scrollTo({top: 0, behavior: "smooth"});
    };

    // Портал в <body> — независим от контекстов наложения
    return createPortal(
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={[
                "fixed bottom-6 z-[9999]",
                side === "left" ? "left-6" : "right-6",
                "flex items-center justify-center rounded-full shadow-lg",
                "bg-gray-900 text-white dark:bg-white dark:text-black",
                "p-3 transition-all duration-300 hover:bg-gray-700 dark:hover:bg-gray-200",
                visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4",
            ].join(" ")}
        >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path fill="currentColor" d="M12 4l-7 7h4v9h6v-9h4z"/>
            </svg>
        </button>,
        document.body
    );
}
