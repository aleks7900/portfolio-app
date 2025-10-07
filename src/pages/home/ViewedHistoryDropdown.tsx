// src/components/ViewedHistoryDropdown.tsx
import React, {useCallback} from "react";
import { formatDistanceToNow } from "date-fns";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import {useViewedProducts} from "../../hooks/useViewedProducts.ts";
import type {ViewedProduct} from "../../data/localViewed.ts"; // optional, you can remove if not installed


type Props = {
    maxItems?: number;
    onOpenProduct?: (p: ViewedProduct) => void; // called when user clicks item
    className?: string;
};

export const ViewedHistoryDropdown: React.FC<Props> = ({ maxItems = 8, onOpenProduct, className }) => {
    const { items, remove, clear, refresh } = useViewedProducts();
    const { t, lang } = useI18n();

    const tf = useCallback((key: string, fallback: string) => {
        try {
            return t(key) as string;
        } catch {
            return fallback;
        }
    }, [lang]);

    const shown = items.slice(0, maxItems);

    return (
        <div className={`relative ${className ?? ""}`}>
            <div className="bg-white dark:bg-slate-800 shadow rounded-md w-80 p-2">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">{tf("viewed_history_title", "Просмотренные товары")}</h4>
                    <div className="text-xs flex gap-2 items-center">
                        <button
                            onClick={() => { clear(); }}
                            className="text-red-500 hover:underline text-xs"
                        >
                            {tf("viewed_history_clear", "Очистить")}
                        </button>
                        <button
                            onClick={() => refresh()}
                            className="text-gray-500 hover:underline text-xs"
                        >
                            {tf("viewed_history_refresh", "Обновить")}
                        </button>
                    </div>
                </div>

                {shown.length === 0 ? (
                    <div className="text-sm text-gray-500 p-4">
                        {tf("viewed_history_empty", "Вы ещё не смотрели товары.")}
                    </div>
                ) : (
                    <ul className="flex flex-col gap-2 max-h-64 overflow-auto">
                        {shown.map((item) => (
                            <li key={item.id} className="flex items-center gap-3 p-1 hover:bg-slate-50 dark:hover:bg-slate-700 rounded">
                                <button
                                    onClick={() => onOpenProduct ? onOpenProduct(item) : window.location.assign(item.slug ?? "#")}
                                    className="flex items-center gap-3 w-full text-left"
                                >
                                    <div className="w-12 h-12 bg-gray-100 dark:bg-slate-700 rounded overflow-hidden flex-shrink-0">
                                        {item.img ? <img src={item.img} alt={item.title} className="w-full h-full object-cover" /> : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">no image</div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium truncate">{item.title}</div>
                                        <div className="text-xs text-gray-500">
                                            {typeof item.price === "number" ? `${item.price} ${tf("currency", "MDL")}` : ""}
                                            {" "}
                                            <span className="ml-1">
                        {item.timestamp ? formatDistanceToNow(new Date(item.timestamp), { addSuffix: true }) : ""}
                      </span>
                                        </div>
                                    </div>
                                </button>

                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={() => remove(item.id)}
                                        className="text-xs text-gray-400 hover:text-red-500 px-2"
                                        aria-label={tf("viewed_history_remove_entry", "Удалить")}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-2 text-xs text-gray-500">
                    {tf("viewed_history_note", "История хранится в браузере — видна только вам.")}
                </div>
            </div>
        </div>
    );
};
