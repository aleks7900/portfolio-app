// src/home/FeaturedCategories.tsx
import React, {useRef} from "react";
import Container from "../../shared/Container.tsx";
import {useNavigate} from "react-router-dom";
import {SUBCAT_IMAGES} from "../../data/catalog/catImages.ts";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import {CATS} from "../../data/catalog/categories.ts";
import ImageWithFallback from "../../data/ImageWithFallback.tsx";

function RowScroller({
                         children,
                     }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const scroll = (dir: 1 | -1) => {
        const el = ref.current;
        if (!el) return;
        el.scrollBy({left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth"});
    };
    return (
        <div className="relative">
            <div
                ref={ref}
                className="overflow-x-auto scroll-smooth pb-2 -mb-2"
                style={{WebkitOverflowScrolling: "touch"}}
            >
                <div className="inline-flex w-max gap-5 pr-1">
                    {children}
                </div>
            </div>

            {/* стрелки */}
            <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Prev"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:!bg-black hover:!shadow-2xl hover:!text-white dark:bg-black/80 dark:hover:bg-black"
            >
                <span className="leading-none select-none text-3xl h-10">‹</span>
            </button>
            <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Next"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:!bg-black hover:!shadow-2xl hover:!text-white dark:bg-black/80 dark:hover:bg-black"
            >
                <span className="leading-none select-none text-3xl h-10">›</span>
            </button>
        </div>
    );
}

function SubcatCard({
                        category, subKey, label,
                        onClick,
                    }: {
    category: string;
    subKey: string;
    label: string;
    onClick: () => void;
}) {

    console.log(`${category}/${subKey}`);
    const subcatimage = SUBCAT_IMAGES[`${category}/${subKey}`];
    console.log(subcatimage);
    const img = subcatimage ?? "/src/assets/img/elementor-placeholder-image.png";
    return (
        <button
            onClick={onClick}
            className="w-[260px] shrink-0 rounded-xl border bg-white p-4 text-left shadow-sm transition
                 hover:shadow-md dark:border-white/10 dark:bg-black"
        >
            <div className="h-40 overflow-hidden rounded-lg bg-gray-50 dark:bg-white/10">
                <ImageWithFallback src={img} alt="" className="h-full w-full object-contain" fallback="/src/assets/img/elementor-placeholder-image.png"/>
            </div>
            <div className="mt-3 text-sm font-semibold tracking-tight">
                {label}
            </div>
        </button>
    );
}

export default function FeaturedCategories() {
    const {t} = useI18n();
    const navigate = useNavigate();

    return (
        <section className="mt-12">
            <Container>
                <h2 className="mb-6 text-center text-2xl font-semibold tracking-tight">
                    {t("home_catalog_title") ?? "Категории продукции"}
                </h2>

                <div className="space-y-8">
                    {CATS.map(cat => (
                        <div key={cat.key} className="rounded-2xl border shadow-sm dark:border-white/10">
                            {/* полоса заголовка */}
                            <div
                                className="rounded-t-2xl !bg-gray-700 px-5 py-3 text-center text-white dark:!bg-neutral-900">
                                <div className="text-base sm:text-lg font-semibold tracking-wide">
                                    {t(cat.labelKey)}
                                </div>
                            </div>

                            {/* горизонтальный ряд карточек */}
                            <div className="p-4 sm:p-5">
                                <RowScroller>
                                    {cat.children.map(sub => (
                                        <SubcatCard
                                            key={sub.key}
                                            category={cat.key}
                                            subKey={sub.key}
                                            label={t(sub.labelKey)}
                                            onClick={() => navigate(`/catalog/${cat.key}/${sub.key}`)}
                                        />
                                    ))}
                                </RowScroller>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
