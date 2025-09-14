import {apiFetch} from "./api.ts";

export type Product = {
    id: number;
    title: string;
    brand: string;
    price: number;
    inStock: boolean;
    category: string;
    subcategory: string;
    // добавьте поля по надобности
};

// Пагинация бэкенда (если есть). Если нет — можно не использовать.
export type Page<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number; // текущая страница (0-based)
    size: number;
};

export type ProductQuery = {
    q?: string;
    page?: number; // 0-based
    size?: number;
    sort?: string; // например "price,asc" или "createdAt,desc"
    brand?: string;
    min?: number;
    max?: number;
    category?: string;
    subcategory?: string;
};

export type ProductsPage = {
    content: Product[];
    totalPages: number | null;
    number: number; // 0-based
    size: number;
};

function toNum(v: unknown, def = 0) {
    return typeof v === "number" ? v : def;
}

/** Возвращает всегда одинаковую форму {content, totalPages, number, size} */
export async function listProducts(params: ProductQuery = {}): Promise<ProductsPage> {
    const usp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v === undefined || v === null || v === "") continue;
        usp.set(k, String(v));
    }
    const query = usp.toString();

    // Получаем как есть
    const data: unknown = await apiFetch<unknown>(`/api/products${query ? `?${query}` : ""}`);

    // Нормализуем
    let content: Product[] = [];
    let totalPages: number | null = null;
    let number = toNum(params.page, 0);
    let size = toNum(params.size, 20);

    if (Array.isArray(data)) {
        // вариант: просто массив
        content = data as Product[];
    } else if (
        data &&
        typeof data === "object" &&
        "content" in data &&
        Array.isArray((data as { content: unknown }).content)
    ) {
        // вариант: Spring Data Page<T>
        const d = data as { content: Product[]; totalPages?: number; number?: number; size?: number };
        content = d.content;
        totalPages = typeof d.totalPages === "number" ? d.totalPages : null;
        number = toNum(d.number, number);
        size = toNum(d.size, size);
    } else if (data && typeof data === "object" && "_embedded" in data) {
        // вариант: HAL (HATEOAS)
        const emb = (data as { _embedded: Record<string, unknown> })._embedded;
        const firstKey = Object.keys(emb)[0];
        const maybeArr = emb[firstKey];
        if (Array.isArray(maybeArr)) {
            content = maybeArr as Product[];
        }

        const p = (data as { page?: { totalPages?: number; number?: number; size?: number } }).page;
        if (p) {
            totalPages = typeof p.totalPages === "number" ? p.totalPages : null;
            number = toNum(p.number, number);
            size = toNum(p.size, size);
        }
    } else {
        content = [];
    }

    return { content, totalPages, number, size };
}

export async function getProduct(id: number | string): Promise<Product> {
    return apiFetch(`/api/products/${id}`);
}

export async function createProduct(p: Omit<Product, "id"> & Partial<Pick<Product, "id">>): Promise<Product> {
    return apiFetch(`/api/products`, { method: "POST", body: p });
}

export async function updateProduct(p: Product): Promise<Product> {
    return apiFetch(`/api/products/${p.id}`, { method: "PUT", body: p });
}

export async function deleteProductById(id: number | string): Promise<void> {
    return apiFetch(`/api/products/${id}`, { method: "DELETE" });
}
