

// Если у вас уже есть тип — используйте его
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

export async function listProducts(params: ProductQuery = {}): Promise<Product[] | Page<Product>> {
    const usp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v === undefined || v === null || v === "") continue;
        usp.set(k, String(v));
    }
    const query = usp.toString();
    // Если бек возвращает Page<T> — отрендерим пагинацию.
    // Если просто массив — тоже ок.
    return apiFetch(`/api/products${query ? `?${query}` : ""}`);
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
