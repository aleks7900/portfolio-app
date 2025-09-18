export type Product = {
    id: number | string;
    name: string;
    category?: string;
    price: number;
    // доп. поля при необходимости
};

export type PageInfo = {
    size: number;           // размер страницы
    totalElements: number;  // всего записей
    totalPages: number;     // всего страниц
    number: number;         // номер страницы (0-based от бэка)
};

type AnyEmbedded =
    | { products?: Product[] }
    | Record<string, Product[]>;

type HalProductsResponse = {
    _embedded?: AnyEmbedded;
    embedded?: AnyEmbedded;   // на случай «без подчёркивания»
    page?: PageInfo;
    _links?: unknown;
    [k: string]: unknown;
};

export function normalizeProductsResponse(resp: HalProductsResponse) {
    const embedded =
        resp._embedded ??
        resp.embedded ??
        resp.embededd ??
        {};

    // пытаемся найти массив продуктов по ключу products
    const products =
        (embedded as AnyEmbedded).products ??
        // если ключ другой, берём первый массив из embedded
        (Object.values(embedded).find(v => Array.isArray(v)) as Product[] | undefined) ??
        [];

    const page: PageInfo = resp.page ?? {
        size: products.length,
        totalElements: products.length,
        totalPages: 1,
        number: 0,
    };

    return {products, page};
}