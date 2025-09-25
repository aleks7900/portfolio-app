import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";

export type DOMRectLike = Pick<DOMRect, "top" | "left" | "right" | "bottom" | "width" | "height">;

export function useAnchorRect<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [rect, setRect] = useState<DOMRectLike | null>(null);

    const update = useCallback(() => {
        const el = ref.current;
        if (!el) {
            setRect(null);
            return;
        }
        const r = el.getBoundingClientRect();
        setRect({
            top: r.top,
            left: r.left,
            right: r.right,
            bottom: r.bottom,
            width: r.width,
            height: r.height,
        });
    }, []);

    // первый замер
    useLayoutEffect(() => {
        update();
    }, [update]);

    // следим за ресайзом/скроллом/шрифтами
    useEffect(() => {
        update();
        const onScroll = () => update();
        const onResize = () => update();

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        // если поддерживается ResizeObserver — обновляем при изменении размеров самого элемента
        let ro: ResizeObserver | undefined;
        if (typeof ResizeObserver !== "undefined" && ref.current) {
            ro = new ResizeObserver(() => update());
            ro.observe(ref.current);
        }

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            ro?.disconnect();
        };
    }, [update]);

    return { ref, rect, refresh: update } as const;
}