// src/home/PopularBlocks.tsx
import {useEffect, useMemo, useState} from "react";
import type {Product} from "../data/types.ts";
import {loadAdminProducts} from "../data/data.ts";
import ProductDetails from "../modals/ProductDetails.tsx";
import {NavLink} from "react-router-dom";
import Container from "../shared/Container"; // ⬅️ добавили

type CardProps = { p: Product; onOpen: (p: Product) => void };

function ProductCard({p, onOpen}: CardProps) {
    return (
        <article
            role="button"
            tabIndex={0}
            onClick={() => onOpen(p)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen(p);
                }
            }}
            className="
        cursor-pointer rounded-2xl border bg-white p-4 shadow-sm outline-none
        hover:ring-2 hover:ring-gray-300 ring-offset-2 ring-offset-white
        dark:bg-black dark:border-white/10 dark:ring-offset-black
      "
        >
            <div className="h-40 rounded-xl bg-gray-100 dark:bg-white/10"/>
            <div className="mt-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{p.title}</div>
                    <div className="truncate text-xs text-gray-500">{p.brand}</div>
                </div>
                <div className="shrink-0 text-sm font-semibold">${p.price}</div>
            </div>
            <div className="mt-2 text-xs">
                {p.inStock ? (
                    <span
                        className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">В наличии</span>
                ) : (
                    <span
                        className="rounded-full bg-rose-100 px-2 py-1 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">Нет в наличии</span>
                )}
            </div>
        </article>
    );
}

export default function PopularBlocks() {
    const [items, setItems] = useState<Product[]>(() => loadAdminProducts());
    const [selected, setSelected] = useState<Product | null>(null);
    const [open, setOpen] = useState(false);
    const openDetails = (p: Product) => {
        setSelected(p);
        setOpen(true);
    };

    useEffect(() => {
        const reload = () => setItems(loadAdminProducts());
        window.addEventListener("products:updated", reload);
        window.addEventListener("storage", reload);
        return () => {
            window.removeEventListener("products:updated", reload);
            window.removeEventListener("storage", reload);
        };
    }, []);

    const popular = useMemo(() => {
        return items
            .slice()
            .sort((a, b) =>
                Number(b.inStock) - Number(a.inStock) ||
                (b.rating ?? 0) - (a.rating ?? 0) ||
                b.id - a.id
            )
            .slice(0, 8);
    }, [items]);

    const laptops = useMemo(() => {
        return items
            .filter(p => p.category === "electronics" && p.subcategory === "laptops")
            .slice(0, 8);
    }, [items]);

    if (!items.length) return null;

    return (
        <section className="mt-10">
            <Container>
                <div className="space-y-10">
                    {/* Популярные */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-lg sm:text-xl font-semibold tracking-tight">Популярные</h3>
                            <NavLink
                                to="/catalog/electronics"
                                className="text-sm underline decoration-dotted underline-offset-4 hover:opacity-80"
                            >
                                Смотреть все
                            </NavLink>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {popular.map(p => (
                                <ProductCard key={p.id} p={p} onOpen={openDetails}/>
                            ))}
                        </div>
                    </div>

                    {/* Ноутбуки */}
                    {laptops.length > 0 && (
                        <div>
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="text-lg sm:text-xl font-semibold tracking-tight">Ноутбуки</h3>
                                <NavLink
                                    to="/catalog/electronics/laptops"
                                    className="text-sm underline decoration-dotted underline-offset-4 hover:opacity-80"
                                >
                                    Смотреть все
                                </NavLink>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {laptops.map(p => (
                                    <ProductCard key={p.id} p={p} onOpen={openDetails}/>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Container>

            {/* Модалка деталей */}
            <ProductDetails product={selected} open={open} onClose={() => setOpen(false)}/>
        </section>
    );
}
