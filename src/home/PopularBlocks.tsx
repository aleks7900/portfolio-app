import {useEffect, useState} from "react";
import Container from "../shared/Container";
import {useNavigate} from "react-router-dom";
import {listProducts, type ProductsPage} from "../shared/api/repo.ts";
import type {Product} from "../data/types.ts";

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
                const page: ProductsPage = await listProducts(params || {});
                if (!cancelled) setState({loading: false, error: null, items: page.content});
            } catch (e: unknown) {
                if (!cancelled) setState({
                    loading: false,
                    error: e instanceof Error ? e.message : "Load error",
                    items: []
                });
            }
        }

        run();
        return () => {
            cancelled = true;
        };
    }, [JSON.stringify(params)]); // простая мемо-зависимость

    return state;
}

export default function PopularBlocks() {
    // «популярное»: возьмём самые дорогие как заглушку сортировки
    const popular = useProductsBlock({page: 0, size: 8, sort: "price,desc"});

    // «ноутбуки»
    const laptops = useProductsBlock({
        page: 0,
        size: 8,
        sort: "title,asc",
        category: "electronics",
        subcategory: "laptops",
    });

    const navigate = useNavigate();

    return (
        <section className="scroll-mt-24 py-12 sm:py-16">
            <Container>
                <Block
                    title="Популярные товары"
                    state={popular}
                    onSeeAll={() => navigate("/catalog?sort=price,desc&page=0&size=12")}
                />
                <div className="mt-10 sm:mt-14"/>
                <Block
                    title="Ноутбуки"
                    state={laptops}
                    onSeeAll={() =>
                        navigate("/catalog?category=electronics&subcategory=laptops&sort=title,asc&page=0&size=12")
                    }
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
               }: {
    title: string;
    state: BlockState;
    onSeeAll: () => void;
}) {
    return (
        <div>
            <div className="mb-4 flex items-end justify-between">
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
                <button
                    onClick={onSeeAll}
                    className="rounded-xl border px-3 py-1.5 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                >
                    Смотреть всё
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

/* ---------- Карточка товара ---------- */

function ProductCard({p}: { p: Product }) {
    const navigate = useNavigate();

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
            {/* Превью-заглушка: можно заменить на реальное изображение, если есть p.images[0] */}
            <div
                className="mb-3 h-28 w-full rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/10 dark:to-white/5"/>

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
            в наличии
          </span>
                ) : (
                    <span
                        className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
            нет на складе
          </span>
                )}
            </div>
        </article>
    );
}