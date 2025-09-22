import React, {useEffect, useMemo, useState} from "react";

// галерея
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import {AnimatePresence, motion} from "framer-motion";
import {ChevronLeft, ChevronRight, X} from "lucide-react";
import type {Product} from "../../data/types.ts";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import SafeImg from "../../data/SafeImg.tsx";

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

    // список изображений
    const images = useMemo<string[]>(() => {
        if (product?.imgLinks?.length) return product.imgLinks;
        return ["/img/placeholder-1.jpg", "/img/placeholder-2.jpg"];
    }, [product]);

    // основной слайдер + превью
    const [sliderRef, inst] = useKeenSlider({loop: true});
    const [thumbsRef, thumbs] = useKeenSlider({
        slides: {perView: Math.min(4, images.length), spacing: 8},
    });

    // lightbox (полноэкранная картинка)
    const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
        open: false,
        index: 0,
    });

    // Esc закрывает модалку product details
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    // Привязка кликов по превью к основному слайдеру
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

    // Сброс вкладки при открытии товара
    useEffect(() => {
        if (open) setTab("details");
    }, [open, product?.id]);

    // если окно закрыто или нет товара — ничего не рендерим
    if (!open || !product) return null;

    const badge = product.availability == 'ORDER_ON_DEMAND' ? (
            <span
                className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {t("order_on_demand")}
                  </span>
        ) : (
            <span
                className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                    {t("out_of_stock")}
                  </span>
        );
    {/*{p.inStock ? (*/}
    {/*    <span*/}
    {/*        className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">*/}
    {/*    {t("in_stock")}*/}
    {/*  </span>*/}
    {/*) : (*/}
    {/*    <span*/}
    {/*        className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">*/}
    {/*    {t("out_of_stock")}*/}
    {/*  </span>*/}
    {/*)}*/}

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-12"
                    role="dialog"
                    aria-modal="true"
                    onMouseDown={(e) => e.target === e.currentTarget && onClose()}
                    initial={{backgroundColor: "rgba(0,0,0,0)"}}
                    animate={{backgroundColor: "rgba(0,0,0,0.40)"}}
                    exit={{backgroundColor: "rgba(0,0,0,0)"}}
                    transition={{duration: 0.18}}
                >
                    <motion.div
                        initial={{opacity: 0, y: 12, scale: 0.98}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: 8, scale: 0.98}}
                        transition={{type: "spring", stiffness: 420, damping: 32, mass: 0.6}}
                        className="w-11/12 sm:w-4/5 md:w-2/3 lg:w-3/5 xl:w-1/2 max-w-2xl rounded-2xl border bg-white p-8 shadow-xl dark:bg-black dark:border-white/10"
                    >
                        {/* Заголовок */}
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-semibold">{t(product.title.toLowerCase())}</h3>
                                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {product.brand}
                                </div>
                            </div>
                            <div className="text-lg font-semibold whitespace-nowrap">${product.price}</div>
                        </div>

                        {/* Галерея */}
                        <div className="mt-6">
                            <div className="relative">
                                <div
                                    ref={sliderRef}
                                    className="keen-slider overflow-hidden rounded-xl bg-gray-100 dark:bg-white/10 aspect-video md:aspect-[4/3]"
                                >
                                    {images.map((src, i) => (
                                        <div key={i} className="keen-slider__slide flex items-center justify-center">
                                            <SafeImg
                                                src={src}
                                                alt={`${product.title} ${i + 1}`}
                                                className="h-full w-full cursor-zoom-in object-cover"
                                                loading="lazy"
                                                decoding="async"
                                                referrerPolicy="no-referrer"
                                                draggable={false}
                                                onClick={() => setLightbox({open: true, index: i})}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Кнопки навигации по слайдам */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            aria-label="Previous slide"
                                            onClick={() => inst.current?.prev()}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl border bg-white/90 p-2 shadow hover:bg-white dark:bg-black/70 dark:hover:bg-black/80 dark:border-white/10"
                                        >
                                            <ChevronLeft className="h-5 w-5"/>
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Next slide"
                                            onClick={() => inst.current?.next()}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border bg-white/90 p-2 shadow hover:bg-white dark:bg.black/70 dark:hover:bg-black/80 dark:border-white/10"
                                        >
                                            <ChevronRight className="h-5 w-5"/>
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Превьюшки */}
                            <div ref={thumbsRef} className="keen-slider mt-3">
                                {images.map((src, i) => (
                                    <div
                                        key={i}
                                        className="keen-slider__slide !w-20 cursor-pointer overflow-hidden rounded-lg border bg-white dark:bg-black dark:border-white/10"
                                    >
                                        <SafeImg
                                            src={src}
                                            alt={`thumb ${i + 1}`}
                                            className="h-20 w-full object-cover"
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
                                ID: {product.id} • {t(product.category.toLowerCase())} / {t(product.subcategory.toLowerCase())}
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
                                            {t(product.title.toLowerCase())} — {product.brand}. Отличный выбор. Цена:
                                            Договорная. {product.availability == 'ORDER_ON_DEMAND' ? t("order_on_demand") : t("out_of_stock")}
                                        </p>
                                    </div>
                                )}

                                {tab === "specs" && (
                                    <div className="grid gap-2 sm:grid-cols-2 text-sm">
                                        {product.specs ? (
                                            Object.entries(product.specs).map(([k, v]) => (
                                                <div key={k} className="flex gap-3">
                                                    <div
                                                        className="w-32 shrink-0 text-gray-500 dark:text-gray-400">{k}</div>
                                                    <div className="font-medium">{v}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-gray-500 dark:text-gray-400">Характеристики не
                                                указаны.</div>
                                        )}
                                    </div>
                                )}

                                {tab === "reviews" && (
                                    <div className="space-y-3">
                                        {product.reviews?.length ? (
                                            product.reviews.map((r) => (
                                                <div key={r.id}
                                                     className="rounded-xl border p-3 text-sm dark:border-white/10">
                                                    <div className="flex items-center justify-between">
                                                        <div className="font-medium">{r.author}</div>
                                                        <div
                                                            className="text-amber-600 dark:text-amber-400">★ {r.rating}</div>
                                                    </div>
                                                    <div
                                                        className="mt-1 text-gray-600 dark:text-gray-300">{r.text}</div>
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
                        </div>
                    </motion.div>

                    {/* LIGHTBOX: полноэкранное изображение */}
                    <AnimatePresence>
                        {lightbox.open && (
                            <motion.div
                                key="lightbox"
                                className="fixed inset-0 z-[10000]"
                                initial={{backgroundColor: "rgba(0,0,0,0)"}}
                                animate={{backgroundColor: "rgba(0,0,0,0.9)"}}
                                exit={{backgroundColor: "rgba(0,0,0,0)"}}
                                transition={{duration: 0.18}}
                                onMouseDown={(e) => e.target === e.currentTarget && setLightbox({
                                    open: false,
                                    index: 0
                                })}
                            >
                                {/* Закрыть (крестик) */}
                                <button
                                    type="button"
                                    aria-label="Close"
                                    onClick={() => setLightbox({open: false, index: 0})}
                                    className="absolute right-4 top-4 z-[10001] rounded-full border bg-white/90 p-2 shadow hover:bg-white dark:bg-black/70 dark:hover:bg-black/80 dark:border-white/10"
                                >
                                    <X className="h-5 w-5"/>
                                </button>

                                {/* Стрелки в лайтбоксе */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            aria-label="Previous image"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setLightbox((s) => ({
                                                    open: true,
                                                    index: (s.index - 1 + images.length) % images.length,
                                                }));
                                            }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 z-[10001] rounded-xl border bg-white/90 p-2 shadow hover:bg-white dark:bg-black/70 dark:hover:bg-black/80 dark:border-white/10"
                                        >
                                            <ChevronLeft className="h-6 w-6"/>
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Next image"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setLightbox((s) => ({
                                                    open: true,
                                                    index: (s.index + 1) % images.length,
                                                }));
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 z-[10001] rounded-xl border bg-white/90 p-2 shadow hover:bg-white dark:bg-black/70 dark:hover:bg-black/80 dark:border-white/10"
                                        >
                                            <ChevronRight className="h-6 w-6"/>
                                        </button>
                                    </>
                                )}

                                {/* Само изображение */}
                                <motion.div
                                    key={lightbox.index}
                                    initial={{opacity: 0, scale: 0.98}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.98}}
                                    transition={{type: "spring", stiffness: 420, damping: 32, mass: 0.6}}
                                    className="absolute inset-0 m-auto flex max-h-[95vh] max-w-[95vw] items-center justify-center"
                                >
                                    <SafeImg
                                        src={images[lightbox.index]}
                                        alt={`image ${lightbox.index + 1}`}
                                        className="h-auto w-auto max-h-[95vh] max-w-[95vw] select-none object-contain"
                                        draggable={false}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
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
