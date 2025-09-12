export type Product = {
    id: number;
    title: string;
    brand: string;
    price: number;
    inStock: boolean;
    category: string;
    subcategory: string;
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