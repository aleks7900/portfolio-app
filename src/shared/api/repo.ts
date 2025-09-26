// src/shared/api/repo.ts
import {apiFetch} from "./api.ts";
import type {Product as DomainProduct} from "../../data/types"; // единый доменный тип на фронте

// Снаружи репозитория экспортируем тот же тип (для совместимости импортов)
export type Product = DomainProduct;

export type ProductQuery = {
    q?: string;
    page?: number;   // 0-based
    size?: number;
    sort?: string;   // "price,asc" / "createdAt,desc"
    brand?: string;
    min?: number;
    max?: number;
    category?: string;
    subcategory?: string;
    inStock?: boolean;
};

export type ProductsPage = {
    content: Product[];
    totalPages: number | null;
    number: number;  // 0-based
    size: number;
};

function toNum(v: unknown, def = 0) {
    return typeof v === "number" ? v : def;
}

/* ====================== API <-> DOMAIN адаптеры ======================= */

// Минимальная модель, которую реально отдаёт бэкенд
type ApiProduct = {
    id: number | string;
    title?: string | null;
    brand?: string | null;
    price?: number | null;
    inStock?: boolean | null;
    category?: string | null;
    subcategory?: string | null;

    // поле, на которое ругались компоненты — делаем нормальные дефолты
    description?: string | null;
    availability?: string | null;

    imgLinks?: string[] | null;
    // ...добавьте при необходимости прочие поля API
};

function toDomain(p: ApiProduct): Product {
    return {
        id: typeof p.id === "string" ? Number(p.id) : (p.id ?? 0),
        title: p.title ?? "",
        brand: p.brand ?? "",
        price: p.price ?? 0,
        inStock: p.inStock ?? true,
        category: p.category ?? "",
        subcategory: p.subcategory ?? "",

        // обязательные поля доменной модели (нужны в ProductsPrivate / HomeSearch)
        description: p.description ?? "",
        availability: p.availability ?? "",

        // опциональные поля, если они есть в вашей доменной модели
        imgLinks: p.imgLinks ?? [],
    };
}

function toApi(p: Product): ApiProduct {
    return {
        id: p.id,
        title: p.title,
        brand: p.brand || undefined,
        price: p.price,
        inStock: p.inStock,
        category: p.category,
        subcategory: p.subcategory || undefined,
        description: p.description || undefined,
        availability: p.availability || undefined,
        imgLinks: p.imgLinks && p.imgLinks.length ? p.imgLinks : undefined,
    };
}

/* ============================ Публичный API ============================ */

/** Возвращает всегда одинаковую форму {content, totalPages, number, size} */
export async function listProducts(params: ProductQuery = {}): Promise<ProductsPage> {
    const usp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v === undefined || v === null || v === "") continue;
        usp.set(k, String(v));
    }
    const query = usp.toString();

    // Получаем «как есть» (массив, Spring Page, HAL и т.д.)
    const data: unknown = await apiFetch<unknown>(`/api/products${query ? `?${query}` : ""}`);

    // Нормализуем
    let content: Product[] = [];
    let totalPages: number | null = null;
    let number = toNum(params.page, 0);
    let size = toNum(params.size, 20);

    if (Array.isArray(data)) {
        // просто массив
        content = (data as ApiProduct[]).map(toDomain);
    } else if (
        data &&
        typeof data === "object" &&
        "content" in data &&
        Array.isArray((data as { content: unknown }).content)
    ) {
        // Spring Data Page<T>
        const d = data as { content: ApiProduct[]; totalPages?: number; number?: number; size?: number };
        content = (d.content ?? []).map(toDomain);
        totalPages = typeof d.totalPages === "number" ? d.totalPages : null;
        number = toNum(d.number, number);
        size = toNum(d.size, size);
    } else if (data && typeof data === "object" && "_embedded" in data) {
        // HAL (HATEOAS)
        const emb = (data as { _embedded: Record<string, unknown> })._embedded;
        const firstKey = Object.keys(emb)[0];
        const maybeArr = emb[firstKey];
        if (Array.isArray(maybeArr)) {
            content = (maybeArr as ApiProduct[]).map(toDomain);
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

    return {content, totalPages, number, size};
}

/** Подсказки для поиска: берём первые N результатов через серверную фильтрацию */
export async function suggestProducts(q: string, size = 8): Promise<Product[]> {
    if (!q.trim()) return [];
    // берём первую страницу с сортировкой по названию
    const page = await listProducts({q, page: 0, size, sort: "title,asc"});
    return page.content;
}

export async function getProduct(id: number | string): Promise<Product> {
    const data = await apiFetch<ApiProduct>(`/api/products/${id}`);
    return toDomain(data);
}

export async function createProduct(p: Omit<Product, "id">): Promise<Product> {
    // сервер генерирует id
    const created = await apiFetch<ApiProduct>("/api/products", {
        method: "POST",
        body: toApi({...p, id: 0} as Product)
    });
    return toDomain(created);
}

export async function updateProduct(p: Product): Promise<Product> {
    const updated = await apiFetch<ApiProduct>(`/api/products/${p.id}`, {method: "PUT", body: toApi(p)});
    return toDomain(updated);
}

export async function deleteProductById(id: number | string): Promise<void> {
    await apiFetch<void>(`/api/products/${id}`, {method: "DELETE"});
}
