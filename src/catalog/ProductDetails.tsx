import {useEffect, useRef} from "react";
import type {Product} from "./types";
import {useI18n} from "../shared/i18n";

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
    const dialogRef = useRef<HTMLDivElement | null>(null);

    // Закрытие по ESC
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

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
            className="fixed inset-0 z-[100] grid place-items-center bg-black/40 p-4"
            role="dialog"
            aria-modal="true"
            onMouseDown={(e) => {
                // клик по подложке
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                ref={dialogRef}
                className="w-11/12 md:w-4/5 lg:w-3/5 max-w-3xl rounded-2xl border bg-white p-6 shadow-xl dark:bg-black dark:border-white/10"
            >
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Изображение (заглушка) */}
                    <div className="rounded-xl bg-gray-100 aspect-video md:aspect-square dark:bg-white/10"/>

                    {/* Текст */}
                    <div>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-semibold">{product.title}</h3>
                                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {product.brand}
                                </div>
                            </div>
                            <div className="text-lg font-semibold">${product.price}</div>
                        </div>

                        <div className="mt-3">{badge}</div>

                        <dl className="mt-6 space-y-2 text-sm">
                            <div className="flex gap-3">
                                <dt className="w-28 shrink-0 text-gray-500 dark:text-gray-400">ID</dt>
                                <dd>{product.id}</dd>
                            </div>
                            <div className="flex gap-3">
                                <dt className="w-28 shrink-0 text-gray-500 dark:text-gray-400">{t("brand")}</dt>
                                <dd>{product.brand}</dd>
                            </div>
                            <div className="flex gap-3">
                                <dt className="w-28 shrink-0 text-gray-500 dark:text-gray-400">Category</dt>
                                <dd>{product.category} / {product.subcategory}</dd>
                            </div>
                        </dl>

                        {/* Кнопки */}
                        <div className="mt-6 flex flex-wrap items-center gap-2">
                            <button
                                type="button"
                                className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                onClick={onClose}
                            >
                                {t("cancel")}
                            </button>
                            {/* пример дополнительного действия: */}
                            <button
                                type="button"
                                className="rounded-xl border px-4 py-2 text-sm hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black"
                            >
                                {t("more")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}