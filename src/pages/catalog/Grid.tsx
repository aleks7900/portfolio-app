// src/catalog/Grid.tsx
import {useRef, useState} from "react";
import type {Product} from "../../data/types";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import SafeImg from "../../data/SafeImg.tsx";

type Props = {
    items: Product[];
    openDetails: (e: React.MouseEvent, p: Product) => void;
    onKeyOpen: (e: React.KeyboardEvent, p: Product) => void;
};

export default function CatalogGrid({items, openDetails, onKeyOpen}: Props) {
    const {t} = useI18n();

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => {
                const images = Array.isArray(p.imgLinks) ? p.imgLinks.filter(Boolean) : [];

                return (
                    <div
                        key={p.id}
                        role="button"
                        tabIndex={0}
                        onClick={(e) => openDetails(e, p)}
                        onKeyDown={(e) => onKeyOpen(e, p)}
                        className="cursor-pointer rounded-2xl border bg-white p-4 shadow-sm outline-none ring-offset-2 ring-offset-white hover:ring-2 hover:ring-gray-300 dark:bg-black dark:border-white/10 dark:ring-offset-black"
                    >
                        <ImageCarousel images={images} alt={p.title}/>

                        <div className="text-sm text-gray-500 dark:text-gray-400">{p.brand || "—"}</div>
                        <div className="mt-0.5 line-clamp-2 font-medium">{p.title}</div>

                        <div className="mt-2 flex items-center justify-between text-sm">
                            <div className="text-gray-600 dark:text-gray-300">
                                {p.category}
                                {p.subcategory ? ` / ${p.subcategory}` : ""}
                            </div>
                            <div className="font-semibold tabular-nums">${p.price}</div>
                        </div>

                        <div className="mt-2 text-xs">
                            {p.inStock ? (
                                <span
                                    className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {t("in_stock")}
                </span>
                            ) : (
                                <span
                                    className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                  {t("out_of_stock")}
                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/* ---------- Встроенный мини-слайдер ---------- */

function ImageCarousel({images, alt}: { images: string[]; alt: string }) {
    const [idx, setIdx] = useState(0);
    const wrap = (n: number) => (n + images.length) % images.length;
    const go = (n: number) => setIdx(wrap(n));
    const next = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        go(idx + 1);
    };
    const prev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        go(idx - 1);
    };

    // свайп
    const startX = useRef<number | null>(null);
    const onTouchStart = (e: React.TouchEvent) => {
        e.stopPropagation();
        startX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        e.stopPropagation();
        if (startX.current == null) return;
        const dx = e.changedTouches[0].clientX - startX.current;
        startX.current = null;
        const threshold = 30;
        if (dx > threshold) prev();
        else if (dx < -threshold) next();
    };

    // клавиатура
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            e.stopPropagation();
            prev();
        } else if (e.key === "ArrowRight") {
            e.stopPropagation();
            next();
        }
    };

    if (!images?.length) {
        return (
            <div
                className="mb-3 flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-100 text-xs text-gray-400 dark:bg-white/10">
                no image
            </div>
        );
    }

    if (images.length === 1) {
        return (
            <div className="mb-3 h-36 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-white/10">
                <SafeImg
                    src={images[0]}
                    alt={alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                />
            </div>
        );
    }

    return (
        <div
            className="group relative mb-3 h-36 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-white/10"
            role="region"
            aria-roledescription="carousel"
            aria-label={alt}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {/* лента */}
            <div
                className="flex h-full w-full transition-transform duration-300 ease-out"
                style={{transform: `translateX(-${idx * 100}%)`}}
            >
                {images.map((src, i) => (
                    <div key={i} className="h-36 w-full flex-none">
                        <SafeImg
                            src={src}
                            alt={`${alt} ${i + 1}/${images.length}`}
                            className="h-full w-full select-none object-cover"
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>

            {/* маленькие стрелки */}
            <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-1 top-1/2 -translate-y-1/2 rounded-md border bg-white/90 p-0.5 text-[10px] opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100 dark:border-white/10 dark:bg-black/60"
            >
                ←
            </button>
            <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md border bg-white/90 p-0.5 text-[10px] opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100 dark:border-white/10 dark:bg-black/60"
            >
                →
            </button>

            {/* маленькие кружки */}
            <div className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-center gap-1.5">
                {images.map((_, i) => (
                    <span
                        key={i}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setIdx(i);
                            }
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIdx(i);
                        }}
                        aria-label={`Go to image ${i + 1}`}
                        className={[
                            "pointer-events-auto inline-block h-2 w-2 shrink-0 rounded-full transition",
                            i === idx ? "bg-black dark:bg-white" : "bg-black/30 dark:bg-white/40",
                        ].join(" ")}
                    />
                ))}
            </div>
        </div>
    );
}
