import Container from "../../shared/Container.tsx";
import {useNavigate} from "react-router-dom";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import ImageWithFallback from "../../data/ImageWithFallback.tsx";
import placeholderImg from '@/assets/img/elementor-placeholder-image.png';
import {useViewedProducts} from "../../hooks/useViewedProducts.ts";
import type {ViewedProduct} from "../../data/localViewed.ts";
import {useCallback} from "react";

export function ViewedHistoryBlock({
                                       title,
                                       seeAllLink,
                                       limit = 8,
                                   }: {
    title?: string;         // defaults to i18n
    seeAllLink?: string;    // optional "See all" link
    limit?: number;
}) {
    const {t} = useI18n();
    
    const {items, clear} = useViewedProducts();
    const list = items.slice(0, limit);

    if (list.length === 0) return null; // render nothing if no history

    return (
        <section className="scroll-mt-24 py-12 sm:py-16">
            <Container>
                <div>
                    <div className="mb-4 flex items-end justify-between">
                        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                            {title ?? t("viewed_history_title")}
                        </h3>

                        <div className="flex items-center gap-2">
                            {seeAllLink ? (
                                <SeeAllButton to={seeAllLink} label={t("see_all")}/>
                            ) : null}
                            <button
                                onClick={() => clear()}
                                className="rounded-xl border px-3 py-1.5 text-sm hover:!shadow-2xl hover:bg-black/5 dark:!text-black dark:border-white/20 dark:hover:!bg-zinc-900 dark:hover:!text-white"
                            >
                                {t("viewed_history_clear")}
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {list.map((v) => (
                            <ViewedCard key={v.id} v={v}/>
                        ))}
                    </div>

                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {t("viewed_history_note")}
                    </div>
                </div>
            </Container>
        </section>
    );
}

function SeeAllButton({to, label}: { to: string; label: string }) {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(to)}
            className="rounded-xl border px-3 py-1.5 text-sm hover:!shadow-2xl hover:bg-black/5 dark:!text-black dark:border-white/20 dark:hover:!bg-zinc-900 dark:hover:!text-white"
        >
            {label}
        </button>
    );
}

/* ---------- Minimal card for ViewedProduct ---------- */

function ViewedCard({v}: { v: ViewedProduct }) {
    const navigate = useNavigate();
    const {t} = useI18n();

    const go = () => {
        if (v.title) {
            navigate(`/catalog?q=${encodeURIComponent(v.title)}&page=0&size=12`);
        } else {
            // fallback: no slug/title -> do nothing
        }
        requestAnimationFrame(() => window.scrollTo({top: 0, behavior: "smooth"}));
    };

    const tf = useCallback((key: string, fallback: string) => {
        try {
            return t(key) as string;
        } catch {
            return fallback;
        }
    }, [t]);

    const img = v.img ?? placeholderImg;

    return (
        <article
            className="group rounded-2xl border p-4 hover:!shadow-2xl transition !bg-gray-100 dark:border-white/10 dark:!bg-black/40"
            role="button"
            onClick={go}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter") go();
            }}
        >
            <div className="mb-3 h-48 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-white/5">
                <ImageWithFallback
                    src={img}
                    alt={t(v.title.toLowerCase()) ?? "viewed product"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    fallback={placeholderImg}
                />
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">{v.brand ? t(v.brand.toLowerCase()) : "RVSteel"}</div>
            <div className="mt-0.5 line-clamp-2 font-medium">{t(v.title.toLowerCase()) ?? tf("untitled_product", "Товар")}</div>

            <div className="mt-2 flex items-center justify-between text-sm">
                <div className="text-gray-600 dark:text-gray-300">{t("viewed_history_title")}</div>
                <div className="font-semibold tabular-nums">
                    {typeof v.price === "number" ? `$${v.price}` : ""}
                </div>
            </div>
        </article>
    );
}