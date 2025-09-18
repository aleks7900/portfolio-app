import React, {useEffect, useRef} from "react";
import {createPortal} from "react-dom";

type Props = {
    open: boolean;
    title?: string;
    message?: string | React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void | Promise<void>;
    onClose: () => void;
};

export default function ConfirmDialog({
                                          open,
                                          title = "Подтверждение",
                                          message = "Вы уверены?",
                                          confirmText = "Да",
                                          cancelText = "Отмена",
                                          onConfirm,
                                          onClose,
                                      }: Props) {
    const firstRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "Tab") {
                // простой focus trap: не даём уйти за пределы модалки
                const focusable = Array.from(
                    document.querySelectorAll<HTMLElement>(
                        '[data-confirm-root] button, [data-confirm-root] a, [data-confirm-root] input'
                    )
                ).filter((el) => !el.hasAttribute("disabled"));
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener("keydown", onKey);
        // авто-фокус на «Отмена»
        const t = setTimeout(() => firstRef.current?.focus(), 0);
        return () => {
            clearTimeout(t);
            document.removeEventListener("keydown", onKey);
        };
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[9999]"
            onMouseDown={(e) => {
                // клик по фону — закрыть
                if (e.target === e.currentTarget) onClose();
            }}
        >
            {/* фон */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
            {/* окно */}
            <div
                data-confirm-root
                className="absolute left-1/2 top-1/2 w-[92vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2
                   rounded-2xl border bg-white p-5 shadow-xl
                   dark:border-white/10 dark:bg-neutral-900"
            >
                <div className="text-lg font-semibold">{title}</div>
                <div className="mt-3 text-sm text-gray-700 dark:text-gray-200">{message}</div>

                <div className="mt-6 flex justify-end gap-3">
                    {/* Войти */}
                    <button
                        onClick={async () => {
                            await onConfirm();
                            onClose();
                        }}
                        className="rounded-xl border px-4 py-2 text-sm font-medium
                               bg-white text-black shadow
                               hover:!bg-black hover:!text-white hover:shadow-lg
                               focus:outline-none focus:ring-2 focus:ring-black/40 active:scale-[0.99]
                               dark:bg-white dark:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
                    >
                        {confirmText}
                    </button>
                    {/* Отмена */}
                    <button
                        ref={firstRef}
                        onClick={onClose}
                        className="rounded-xl border px-4 py-2 text-sm font-medium
                                   !bg-white !text-black shadow transition-colors
                                   hover:!bg-rose-600 hover:!text-white hover:shadow-lg
                                   focus:outline-none focus:ring-2 focus:!ring-rose-400 active:scale-[0.99]
                                   dark:!bg-neutral-900 dark:!text-white dark:hover:!bg-rose-500"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
