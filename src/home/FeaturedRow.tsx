// src/home/FeaturedRow.tsx
import {useEffect, useMemo, useRef, useState} from "react";
import type {Product} from "../catalog/types";
import {loadAdminProducts} from "../catalog/data";
import {useI18n} from "../shared/i18n";
import ProductDetails from "../catalog/ProductDetails";
import Container from "../shared/Container"; // ⬅️ добавляем

type Props = {
    title?: string;
    category?: string;
    subcategory?: string;
    limit?: number;
};

export default function FeaturedRow({
                                        title,
                                        category,
                                        subcategory,
                                        limit = 12,
                                    }: Props) {
    const {t} = useI18n();
    const [items, setItems] = useState<Product[]>(() => loadAdminProducts());
    const ref = useRef<HTMLDivElement | null>(null);

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

    const data = useMemo(() => {
        let arr = items;
        if (category) arr = arr.filter((p) => p.category === category);
        if (subcategory) arr = arr.filter((p) => p.subcategory === subcategory);
        return arr
            .slice()
            .sort((a, b) => Number(b.inStock) - Number(a.inStock) || b.id - a.id)
            .slice(0, limit);
    }, [items, category, subcategory, limit]);

    const scrollBy = (dir: 1 | -1) => {
        const el = ref.current;
        if (!el) return;
        const step = Math.round(el.clientWidth * 0.9) * dir;
        el.scrollBy({left: step, behavior: "smooth"});
    };

    if (!data.length) return null;

    return (
        <section className="mt-10">
            <Container>
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
                        {title ?? "Популярное"}
                    </h3>
                    <div className="hidden sm:flex gap-2">
                        <button
                            type="button"
                            onClick={() => scrollBy(-1)}
                            className="rounded-xl border px-3 py-1 text-sm hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black"
                        >
                            ←
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollBy(1)}
                            className="rounded-xl border px-3 py-1 text-sm hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black"
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* Контейнер скролла */}
                <div
                    ref={ref}
                    className="relative overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory pb-2 -mb-2"
                    style={{WebkitOverflowScrolling: "touch"}}
                >
                    <div className="inline-flex w-max gap-4">
                        {data.map((p) => (
                            <article
                                key={p.id}
                                role="button"
                                tabIndex={0}
                                onClick={() => openDetails(p)}
                                className="
                  snap-start cursor-pointer flex-none
                  w-[240px] sm:w-[260px] lg:w-[300px]
                  rounded-2xl border bg-white p-4 shadow-sm outline-none
                  hover:ring-2 hover:ring-gray-300 ring-offset-2 ring-offset-white
                  dark:bg-black dark:border-white/10 dark:ring-offset-black
                "
                            >
                                <div className="h-40 rounded-xl bg-gray-100 dark:bg-white/10"/>
                                <div className="mt-3 flex items-start justify-between">
                                    <div>
                                        <div className="text-sm font-medium">{p.title}</div>
                                        <div className="text-xs text-gray-500">{p.brand}</div>
                                    </div>
                                    <div className="text-sm font-semibold">${p.price}</div>
                                </div>
                                <div className="mt-2 text-xs">
                                    {p.inStock ? (
                                        <span
                                            className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      {t("in_stock")}
                    </span>
                                    ) : (
                                        <span
                                            className="rounded-full bg-rose-100 px-2 py-1 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                      {t("out_of_stock")}
                    </span>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* градиенты */}
                    <div
                        className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-white to-transparent dark:from-black sm:block"/>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-white to-transparent dark:from-black sm:block"/>
                </div>
            </Container>

            <ProductDetails product={selected} open={open} onClose={() => setOpen(false)}/>
        </section>
    );
}
