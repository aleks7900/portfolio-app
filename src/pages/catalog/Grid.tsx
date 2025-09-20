import React from "react";
import type {Product} from "../../data/types.ts";
import {useI18n} from "../../shared/i18n/i18n.tsx";

export function CatalogGrid({
                                items,
                                loading,
                                onOpen,
                            }: {
    items: Product[];
    loading: boolean;
    onOpen?: (p: Product) => void;
}) {
    const {t} = useI18n();
    if (loading) return <SkeletonGrid/>;
    if (!items.length)
        return (
            <div
                className="rounded-2xl border bg-white p-6 text-sm text-gray-600 shadow-sm dark:bg-black dark:border-white/10 dark:text-gray-300">
                {t("nothing_found")}
            </div>
        );

    const openDetails = (e: React.MouseEvent, p: Product) => {
        e.preventDefault();           // 🔒 не навигируем
        e.stopPropagation();          // 🔒 не всплываем
        onOpen?.(p);
    };

    const onKeyOpen = (e: React.KeyboardEvent, p: Product) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen?.(p);
        }
    };

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
                // Делаем кликабельной всю карточку (без <a/>)
                <div
                    key={p.id}
                    role="button"
                    tabIndex={0}
                    onClick={(e) => openDetails(e, p)}
                    onKeyDown={(e) => onKeyOpen(e, p)}
                    className="rounded-2xl border bg-white p-4 shadow-sm outline-none ring-offset-2 ring-offset-white
                     hover:ring-2 hover:ring-gray-300 dark:bg-black dark:border-white/10 dark:ring-offset-black cursor-pointer"
                >
                    <div className="h-36 rounded-xl bg-gray-100 dark:bg-white/10" draggable={false}/>

                    <div className="mt-3 flex items-start justify-between">
                        <div>
                            {/* НИКАКИХ <a href> внутри карточки */}
                            <div className="text-sm font-medium">{p.title}</div>
                            <div className="text-xs text-gray-500">{p.brand}</div>
                        </div>
                        <div className="text-sm font-semibold">${p.price}</div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <div className="text-xs">
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

                        <button
                            type="button"                 // 🔒 явно НЕ submit
                            onClick={(e) => openDetails(e, p)}
                            className="rounded-xl border px-3 py-1 text-xs hover:!bg-black hover:!text-white dark:!border-white/20 dark:!bg-gray-300 dark:hover:!bg-white dark:!text-black dark:hover:!text-black"
                        >
                            {t("more")}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function SkeletonGrid() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({length: 9}).map((_, i) => (
                <div
                    key={i}
                    className="rounded-2xl border bg-white p-4 shadow-sm dark:bg-black dark:border-white/10 animate-pulse"
                >
                    <div className="h-36 rounded-xl bg-gray-100/70 dark:bg-white/10"/>
                    <div className="mt-3 h-4 w-2/3 rounded bg-gray-100/70 dark:bg-white/10"/>
                    <div className="mt-2 h-4 w-1/3 rounded bg-gray-100/70 dark:bg-white/10"/>
                </div>
            ))}
        </div>
    );
}