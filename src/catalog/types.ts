export type Review = {
    id: string;
    author: string;
    rating: number; // 1..5
    text: string;
    date: string;   // ISO
};

export type Product = {
    id: number;
    title: string;
    brand: string;
    price: number;
    inStock: boolean;
    category: string;
    subcategory: string;

    // ↓ новые, опциональные
    images?: string[];                        // ['/img/products/1-1.jpg', ...]
    specs?: Record<string, string>;           // { 'Процессор': '…', 'Вес': '…' }
    rating?: number;                          // средняя оценка
    reviews?: Review[];                       // отзывы
};

export type Filters = {
    q: string;
    min?: number;
    max?: number;
    brands: string[];
    inStockOnly: boolean;
    sort: "relevance" | "price_asc" | "price_desc" | "brand_az";
    page: number;
    perPage: number;
};