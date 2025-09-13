import type {Product} from "./types";

export const PRODUCTS: Product[] = [
    {
        id: 1,
        title: "UltraBook 13",
        brand: "Acelon",
        price: 1200,
        inStock: true,
        category: "electronics",
        subcategory: "laptops"
    },
    {
        id: 2,
        title: "NotePro 15",
        brand: "Bytek",
        price: 950,
        inStock: false,
        category: "electronics",
        subcategory: "laptops"
    },
    {
        id: 3,
        title: "PixelOne X",
        brand: "Phonia",
        price: 800,
        inStock: true,
        category: "electronics",
        subcategory: "phones"
    },
    {
        id: 4,
        title: "TabMini",
        brand: "Acelon",
        price: 499,
        inStock: true,
        category: "electronics",
        subcategory: "tablets"
    },
    {
        id: 5,
        title: "SilentVac 3000",
        brand: "HomeMax",
        price: 300,
        inStock: true,
        category: "home",
        subcategory: "vacuum"
    },
    {
        id: 6,
        title: "CoolBox 200L",
        brand: "Nordix",
        price: 1100,
        inStock: false,
        category: "home",
        subcategory: "fridges"
    },
    {
        id: 7,
        title: "BassPods",
        brand: "Phonia",
        price: 150,
        inStock: true,
        category: "accessories",
        subcategory: "headphones"
    },
    {
        id: 8,
        title: "FastCharge 65W",
        brand: "Bytek",
        price: 49,
        inStock: true,
        category: "accessories",
        subcategory: "chargers"
    },
    {
        id: 9,
        title: "NoteLite 14",
        brand: "Acelon",
        price: 700,
        inStock: true,
        category: "electronics",
        subcategory: "laptops"
    },
    {
        id: 10,
        title: "BassPods Pro",
        brand: "Phonia",
        price: 220,
        inStock: false,
        category: "accessories",
        subcategory: "headphones"
    },
];

export const BRANDS = Array.from(new Set(PRODUCTS.map(p => p.brand))).sort();

const LS_KEY = "admin_products";

export function loadAdminProducts(seed: Product[] = PRODUCTS): Product[] {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return [...seed];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as Product[]) : [...seed];
    } catch {
        return [...seed];
    }
}

export function saveAdminProducts(items: Product[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("products:updated"));
}