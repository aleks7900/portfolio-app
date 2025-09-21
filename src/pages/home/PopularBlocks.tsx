// src/home/PopularBlocks.tsx
import {useEffect, useRef, useState} from "react";
import Container from "../../shared/Container.tsx";
import {useNavigate} from "react-router-dom";
import {listProducts} from "../../shared/api/repo.ts";
import type {Product} from "../../data/types.ts";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import SafeImg from "../../data/SafeImg.tsx";

/* ---------- helpers ---------- */
// ---------- types & guards ----------
type PageLike<T> = { content: T[] };
type WrapperPage<T> = { page: { content: T[] } };
type EmbeddedProducts = { _embedded: { products: Product[] } };
type ItemsWrapper<T> = { items: T[] };

function isRecord(x: unknown): x is Record<string, unknown> {
    return typeof x === "object" && x !== null;
}
function isArrayOfProducts(x: unknown): x is Product[] {
    return Array.isArray(x);
}

// ---------- safe extractor (без any) ----------
function extractProducts(payload: unknown): Product[] {
    // 1) Сам массив
    if (isArrayOfProducts(payload)) return payload;

    // 2) { content: [...] }
    if (isRecord(payload) && isArrayOfProducts((payload as PageLike<Product>).content)) {
        return (payload as PageLike<Product>).content;
    }

    // 3) { page: { content: [...] } }
    if (
        isRecord(payload) &&
        isRecord((payload as WrapperPage<Product>).page) &&
        isArrayOfProducts((payload as WrapperPage<Product>).page.content)
    ) {
        return (payload as WrapperPage<Product>).page.content;
    }

    // 4) { _embedded: { products: [...] } }
    if (
        isRecord(payload) &&
        isRecord((payload as EmbeddedProducts)._embedded) &&
        isArrayOfProducts((payload as EmbeddedProducts)._embedded.products)
    ) {
        return (payload as EmbeddedProducts)._embedded.products;
    }

    // 5) { items: [...] }
    if (isRecord(payload) && isArrayOfProducts((payload as ItemsWrapper<Product>).items)) {
        return (payload as ItemsWrapper<Product>).items;
    }

    return [];
}

type BlockState = {
    loading: boolean;
    error: string | null;
    items: Product[];
};

function useProductsBlock(params: Parameters<typeof listProducts>[0]) {
    const [state, setState] = useState<BlockState>({loading: true, error: null, items: []});

    useEffect(() => {
        let cancelled = false;

        async function run() {
            setState((s) => ({...s, loading: true, error: null}));
            try {
                const payload = await listProducts(params);
                const items = extractProducts(payload);
                if (!cancelled) setState({loading: false, error: null, items});
            } catch (e: unknown) {
                if (!cancelled) {
                    setState({
                        loading: false,
                        error: e instanceof Error ? e.message : "Load error",
                        items: [],
                    });
                }
            }
        }

        run();
        return () => {
            cancelled = true;
        };
    }, [params]);

    return state;
}

export function ProductsBlock({
                                  title,
                                  query,
                                  seeAllLink,
                              }: {
    title: string;
    query: Parameters<typeof listProducts>[0];
    seeAllLink: string;
}) {
    const state = useProductsBlock(query);
    const navigate = useNavigate();
    const {t} = useI18n();

    return (
        <section className="scroll-mt-24 py-12 sm:py-16">
            <Container>
                <Block
                    title={title}
                    state={state}
                    onSeeAll={() => navigate(seeAllLink)}
                    t={t}
                />
            </Container>
        </section>
    );
}

/* ---------- UI блок ---------- */

function Block({
                   title,
                   state,
                   onSeeAll,
                   t,
               }: {
    title: string;
    state: BlockState;
    onSeeAll: () => void;
    t: (key: string) => string;
}) {
    return (
        <div>
            <div className="mb-4 flex items-end justify-between">
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
                <button
                    onClick={onSeeAll}
                    className="rounded-xl border px-3 py-1.5 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                >
                    {t("see_all")}
                </button>
            </div>

            {state.error && (
                <div
                    className="mb-3 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-200">
                    {state.error}
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {state.loading
                    ? Array.from({length: 8}).map((_, i) => (
                        <div
                            key={i}
                            className="h-40 animate-pulse rounded-2xl border bg-gray-100 dark:border-white/10 dark:bg-white/5"
                        />
                    ))
                    : state.items.map((p) => <ProductCard key={p.id} p={p}/>)}
            </div>
        </div>
    );
}

/* ---------- Внутренний мини-слайдер для картинок ---------- */

function ImageCarousel({
                           images,
                           alt,
                       }: {
    images: string[];
    alt: string;
}) {
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

    if (images.length === 0) {
        return (
            <div
                className="mb-3 flex h-28 w-full items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400 dark:bg-white/5">
                no image
            </div>
        );
    }

    if (images.length === 1) {
        return (
            <div className="mb-3 h-28 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-white/5">
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
            className="group relative mb-3 h-28 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-white/5"
            role="region"
            aria-roledescription="carousel"
            aria-label={alt}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {/* Лента */}
            <div
                className="flex h-full w-full transition-transform duration-300 ease-out"
                style={{transform: `translateX(-${idx * 100}%)`}}
            >
                {images.map((src, i) => (
                    <div key={i} className="h-28 w-full flex-none">
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

            {/* Стрелки */}
            <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl border bg-white/90 px-2 py-1 text-xs opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100 dark:border-white/10 dark:bg-black/60"
            >
                ←
            </button>
            <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border bg-white/90 px-2 py-1 text-xs opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100 dark:border-white/10 dark:bg-black/60"
            >
                →
            </button>

            {/* Точки */}
            <div className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-center gap-1">
                {images.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIdx(i);
                        }}
                        aria-label={`Go to image ${i + 1}`}
                        className={[
                            "pointer-events-auto inline-block h-1 w-1 shrink-0 rounded-full transition",
                            "p-0 border-0 appearance-none bg-transparent m-0 align-middle",
                            i === idx ? "bg-black/80 dark:bg-white" : "bg-black/30 dark:bg-white/40",
                        ].join(" ")}
                    />
                ))}
            </div>
        </div>
    );
}

/* ---------- Карточка товара ---------- */

function ProductCard({p}: { p: Product }) {
    const navigate = useNavigate();
    const {t} = useI18n();

    const images = Array.isArray(p.imgLinks) ? p.imgLinks.filter(Boolean) : [];

    return (
        <article
            className="group rounded-2xl border p-4 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-black/40"
            role="button"
            onClick={() => navigate(`/catalog?q=${encodeURIComponent(p.title)}&page=0&size=12`)}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    navigate(`/catalog?q=${encodeURIComponent(p.title)}&page=0&size=12`);
                }
            }}
        >
            <ImageCarousel images={images} alt={p.title}/>

            <div className="text-sm text-gray-500 dark:text-gray-400">{p.brand || "\u2014"}</div>
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
        </article>
    );
}
