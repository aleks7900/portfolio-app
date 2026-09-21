import React, {useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import {Button} from "../../components/ui/button.tsx";

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
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onMouseDown={(e) => {
                // клик по фону — закрыть
                if (e.target === e.currentTarget) onClose();
            }}
        >
            {/* фон */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            {/* окно */}
            <div
                data-confirm-root
                className="relative w-[92vw] max-w-[500px] rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl"
            >
                <div className="text-xl font-bold tracking-tight text-foreground">{title}</div>
                <div className="mt-3 text-sm text-muted-foreground leading-relaxed">{message}</div>

                <div className="mt-6 flex justify-end gap-3">
                    <Button
                        ref={firstRef}
                        variant="outline"
                        onClick={onClose}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant="default"
                        onClick={async () => {
                            await onConfirm();
                            onClose();
                        }}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    );
}
