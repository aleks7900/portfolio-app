import {useEffect, useState} from "react";

/**
 * Возвращает значение с задержкой (debounce).
 * @param value любое значение
 * @param delay задержка в мс (по умолчанию 300)
 */
export function useDebounced<T>(value: T, delay: number = 300): T {
    const [debounced, setDebounced] = useState<T>(value);

    useEffect(() => {
        const id = window.setTimeout(() => setDebounced(value), delay);
        return () => window.clearTimeout(id);
    }, [value, delay]);

    return debounced;
}