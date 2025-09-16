import React, {useEffect, useMemo, useState} from "react";
import type {Product} from "../../data/types.ts";
import {useI18n} from "../../shared/i18n/i18n.tsx";

// галерея
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function ProductDetails({
                                           product,
                                           open,
                                           onClose,
                                       }: {
    product: Product | null;
    open: boolean;
    onClose: () => void;
}) {
    const {t} = useI18n();
    const [tab, setTab] = useState<"details" | "specs" | "reviews">("details");

    // ХУКИ ВСЕГДА ВЫЗЫВАЕМ (без условных return до них)
    const images = useMemo<string[]>(() => {
        if (product?.images?.length) return product.images;
        // заглушки, если нет картинок
        return ["/img/placeholder-1.jpg", "/img/placeholder-2.jpg"];
    }, [product]);

    const [sliderRef, inst] = useKeenSlider({loop: true});
    const [thumbsRef, thumbs] = useKeenSlider({
        slides: {perView: Math.min(4, images.length), spacing: 8},
    });

    // Esc для закрытия
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    // Клик по превью -> переход к слайду
    useEffect(() => {
        if (!inst.current || !thumbs.current) return;
        const main = inst.current;
        const t = thumbs.current;
        const cleanups = Array.from(t.container.children).map((el, i) => {
            const h = () => main.moveToIdx(i);
            el.addEventListener("click", h);
            return () => el.removeEventListener("click", h);
        });
        return () => cleanups.forEach((fn) => fn());
    }, [inst, thumbs, images.length]);

    // Сброс вкладки при открытии нового товара
    useEffect(() => {
        if (open) setTab("details");
    }, [open, product?.id]);

    // После хуков — условный рендер
    if (!open || !product) return null;

    const badge = product.inStock ? (
        <span
            className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
      {t("in_stock")}
    </span>
    ) : (
        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
      {t("out_of_stock")}
    </span>
    );

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-12"
            role="dialog"
            aria-modal="true"
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="
                  w-11/12 sm:w-4/5 md:w-2/3 lg:w-3/5 xl:w-1/2
                  max-w-2xl
                  rounded-2xl border bg-white p-8 shadow-xl
                  dark:bg-black dark:border-white/10
                "
            >
                {/* Заголовок */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-semibold">{product.title}</h3>
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {product.brand}
                        </div>
                    </div>
                    <div className="text-lg font-semibold whitespace-nowrap">${product.price}</div>
                </div>

                {/* Галерея */}
                <div className="mt-6">
                    <div
                        ref={sliderRef}
                        className="keen-slider overflow-hidden rounded-xl bg-gray-100 dark:bg-white/10 aspect-video md:aspect-[4/3]"
                    >
                        {images.map((src, i) => (
                            <div key={i} className="keen-slider__slide flex items-center justify-center">
                                <img
                                    src={src}
                                    alt={`${product.title} ${i + 1}`}
                                    className="h-full w-full object-cover"
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>

                    <div ref={thumbsRef} className="keen-slider mt-3">
                        {images.map((src, i) => (
                            <div
                                key={i}
                                className="keen-slider__slide !w-20 cursor-pointer overflow-hidden rounded-lg border bg-white dark:bg-black dark:border-white/10"
                            >
                                <img
                                    src={src}
                                    alt={`thumb ${i + 1}`}
                                    className="h-16 w-full object-cover"
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Статусы */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                    {badge}
                    {typeof product.rating === "number" && (
                        <div className="text-sm text-amber-600 dark:text-amber-400">
                            ★ {product.rating.toFixed(1)}
                        </div>
                    )}
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {product.id} • {product.category} / {product.subcategory}
                    </div>
                </div>

                {/* Вкладки */}
                <div className="mt-6">
                    <div className="flex flex-wrap gap-2">
                        <TabBtn active={tab === "details"} onClick={() => setTab("details")}>
                            Детали
                        </TabBtn>
                        <TabBtn active={tab === "specs"} onClick={() => setTab("specs")}>
                            Характеристики
                        </TabBtn>
                        <TabBtn active={tab === "reviews"} onClick={() => setTab("reviews")}>
                            Отзывы
                        </TabBtn>
                    </div>

                    <div className="mt-4 rounded-2xl border p-4 dark:border-white/10">
                        {tab === "details" && (
                            <div className="prose max-w-none text-sm dark:prose-invert">
                                <p>
                                    {product.title} — {product.brand}. Отличный выбор для ежедневной работы и
                                    учёбы. Цена: ${product.price}.{" "}
                                    {product.inStock ? "В наличии." : "Нет в наличии."}
                                </p>
                            </div>
                        )}

                        {tab === "specs" && (
                            <div className="grid gap-2 sm:grid-cols-2 text-sm">
                                {product.specs ? (
                                    Object.entries(product.specs).map(([k, v]) => (
                                        <div key={k} className="flex gap-3">
                                            <div className="w-32 shrink-0 text-gray-500 dark:text-gray-400">{k}</div>
                                            <div className="font-medium">{v}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500 dark:text-gray-400">
                                        Характеристики не указаны.
                                    </div>
                                )}
                            </div>
                        )}

                        {tab === "reviews" && (
                            <div className="space-y-3">
                                {product.reviews?.length ? (
                                    product.reviews.map((r) => (
                                        <div key={r.id} className="rounded-xl border p-3 text-sm dark:border-white/10">
                                            <div className="flex items-center justify-between">
                                                <div className="font-medium">{r.author}</div>
                                                <div className="text-amber-600 dark:text-amber-400">★ {r.rating}</div>
                                            </div>
                                            <div className="mt-1 text-gray-600 dark:text-gray-300">{r.text}</div>
                                            <div className="mt-1 text-xs text-gray-400">
                                                {new Date(r.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500 dark:text-gray-400">Отзывов пока нет.</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Кнопки */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                    {/* Cancel */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border px-4 py-2 text-sm font-medium
                                   !bg-white !text-black shadow
                                   hover:!bg-black hover:!text-white hover:shadow-lg
                                   focus:outline-none focus:ring-2 focus:ring-black/40 active:scale-[0.99]
                                   dark:bg-neutral-900 dark:text-white dark:hover:bg-black"
                    >
                        {t("cancel")}
                    </button>

                    {/* More */}
                    <button
                        type="button"
                        className="rounded-xl border px-4 py-2 text-sm font-medium
                                   !bg-white !text-black shadow
                                   hover:!bg-black hover:!text-white hover:shadow-lg
                                   focus:outline-none focus:ring-2 focus:ring-black/40 active:scale-[0.99]
                                   dark:bg-neutral-900 dark:text-white dark:hover:bg-black"
                    >
                        {t("more")}
                    </button>
                </div>
            </div>
        </div>
    );
}

function TabBtn({
                    active,
                    onClick,
                    children,
                }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={`rounded-xl px-3 py-1.5 text-sm ${
                active
                    ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                    : "border dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10"
            }`}
        >
            {children}
        </button>
    );
}