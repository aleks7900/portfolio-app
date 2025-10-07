// src/lib/localViewed.ts
export type ViewedProduct = {
    id: number;
    title: string;
    brand?: string;
    price?: number | null;
    img?: string | null;     // thumbnail path
    category: string;
    subcategory: string;
    timestamp: number;       // ms since epoch
};

const STORAGE_KEY = "rvsteel_viewed_products_v1";
const DEFAULT_MAX = 20;

function readStorage(): ViewedProduct[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as ViewedProduct[];
        // Basic validation
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(p => p && p.id).slice(0, 200);
    } catch {
        return [];
    }
}

function writeStorage(items: ViewedProduct[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
        // ignore quota errors
    }
}

/**
 * Add or bump a viewed product.
 * - newest items are at start [0]
 */
export function pushViewed(product: Omit<ViewedProduct, "timestamp">, max = DEFAULT_MAX) {
    const now = Date.now();
    const items = readStorage();
    // remove existing with same id
    const filtered = items.filter(p => p.id !== product.id);
    // add new at start
    const newItem: ViewedProduct = { ...product, timestamp: now };
    filtered.unshift(newItem);
    // limit length
    const final = filtered.slice(0, Math.max(1, max));
    writeStorage(final);
    // return final for convenience
    return final;
}

export function getViewed(): ViewedProduct[] {
    return readStorage();
}

export function removeViewed(id: number) {
    const items = readStorage().filter(p => p.id !== id);
    writeStorage(items);
    return items;
}

export function clearViewed() {
    writeStorage([]);
    return [];
}
