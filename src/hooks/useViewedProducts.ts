// src/hooks/useViewedProducts.ts
import { useEffect, useState, useCallback } from "react";
import {clearViewed, getViewed, pushViewed, removeViewed, type ViewedProduct} from "../data/localViewed.ts";

export function useViewedProducts() {
    const [items, setItems] = useState<ViewedProduct[]>(() => getViewed());

    // handle storage changes from other tabs
    useEffect(() => {
        function onStorage(e: StorageEvent) {
            if (e.key === null || e.key === undefined) {
                // fallback: read anyway
                setItems(getViewed());
                return;
            }
            if (e.key === "rvsteel_viewed_products_v1") {
                setItems(getViewed());
            }
        }
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const add = useCallback((product: Omit<ViewedProduct, "timestamp">, max = 20) => {
        const updated = pushViewed(product, max);
        setItems(updated);
    }, []);

    const remove = useCallback((id: number) => {
        const updated = removeViewed(id);
        setItems(updated);
    }, []);

    const clear = useCallback(() => {
        const updated = clearViewed();
        setItems(updated);
    }, []);

    const refresh = useCallback(() => {
        setItems(getViewed());
    }, []);

    return { items, add, remove, clear, refresh };
}
