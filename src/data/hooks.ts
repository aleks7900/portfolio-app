import {useCallback, useMemo} from "react";
import {useSearchParams} from "react-router-dom";
import type {Filters, Product} from "./types.ts";

export function useQueryFilters(defaults: Filters) {
    const [params, setParams] = useSearchParams();
    const fromUrl: Filters = useMemo(() => ({
        q: params.get("q") ?? defaults.q,
        min: parseNum(params.get("min")) ?? defaults.min,
        max: parseNum(params.get("max")) ?? defaults.max,
        brands: (params.get("brand") ?? "").split(",").filter(Boolean),
        inStockOnly: params.get("stock") === "1" ? true : defaults.inStockOnly,
        sort: (params.get("sort") as Filters["sort"]) || defaults.sort,
        page: parseInt(params.get("page") || String(defaults.page), 10) || defaults.page,
        perPage: parseInt(params.get("perPage") || String(defaults.perPage), 10) || defaults.perPage,
    }), [params, defaults]);
    const update = useCallback((next: Filters) => {
        const sp = new URLSearchParams();
        if (next.q) sp.set("q", next.q);
        if (next.min !== undefined) sp.set("min", String(next.min));
        if (next.max !== undefined) sp.set("max", String(next.max));
        if (next.brands.length) sp.set("brand", next.brands.join(","));
        if (next.inStockOnly) sp.set("stock", "1");
        if (next.sort !== "relevance") sp.set("sort", next.sort);
        if (next.page > 1) sp.set("page", String(next.page));
        if (next.perPage !== defaults.perPage) sp.set("perPage", String(next.perPage));
        // ✅ не триггерим лишний апдейт, если ничего не изменилось
        const nextStr = sp.toString();
        const currStr = params.toString();
        if (nextStr !== currStr) {
            setParams(sp, { replace: true });
        }
    }, [setParams, defaults.perPage, params]);
    return {filters: fromUrl, setFiltersUrl: update};
}

function parseNum(v: string | null) {
    if (!v) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
}

export function applyFilters(data: Product[], f: Filters, cat?: string, sub?: string) {
    let out = data.filter(p => {
        if (cat && p.category !== cat) return false;
        if (sub && p.subcategory !== sub) return false;
        if (f.q && !(p.title + " " + p.brand).toLowerCase().includes(f.q.toLowerCase())) return false;
        if (f.min !== undefined && p.price < f.min) return false;
        if (f.max !== undefined && p.price > f.max) return false;
        if (f.brands.length && !f.brands.includes(p.brand)) return false;
        if (f.inStockOnly && !p.inStock) return false;
        return true;
    });
    out = out.sort((a, b) => {
        switch (f.sort) {
            case "price_asc":
                return a.price - b.price;
            case "price_desc":
                return b.price - a.price;
            case "brand_az":
                return a.brand.localeCompare(b.brand);
            default:
                return 0;
        }
    });
    return out;
}