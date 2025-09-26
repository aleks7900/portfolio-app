import {useI18n} from "../../shared/i18n/i18n.tsx";
import {useAuth} from "../../shared/auth/auth.tsx";
import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export default function LoginDialog({
                                        open,
                                        onClose,
                                    }: {
    open: boolean;
    onClose: () => void;
}) {
    const {t} = useI18n();
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState<string | null>(null);

    const overlayRef = useRef<HTMLDivElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    // ESC закрывает диалог, авто-фокус на email, запрет прокрутки фона
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (open) {
            document.addEventListener("keydown", onKey);
            setTimeout(() => emailRef.current?.focus(), 50);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
            setErr(null);
        };
    }, [open, onClose]);

    const handleOverlayMouseDown = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) onClose();
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    ref={overlayRef}
                    role="dialog"
                    aria-modal="true"
                    onMouseDown={handleOverlayMouseDown}
                    className="fixed inset-0 z-[100] grid items-center justify-center p-4"
                    initial={{backgroundColor: "rgba(0,0,0,0)"}}
                    animate={{backgroundColor: "rgba(0,0,0,0.40)"}}
                    exit={{backgroundColor: "rgba(0,0,0,0)"}}
                    transition={{duration: 0.18}}
                >
                    <motion.div
                        initial={{opacity: 0, y: 12, scale: 0.98}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: 8, scale: 0.98}}
                        transition={{type: "spring", stiffness: 420, damping: 32, mass: 0.6}}
                        className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-xl dark:!bg-gray-700 dark:border-white/10"
                    >
                        <div className="mb-4 text-lg font-semibold">{t("login")}</div>

                        {err && (
                            <div
                                className="mb-3 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                                {err}
                            </div>
                        )}

                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                try {
                                    await login(email, password);
                                    onClose();
                                } catch (e) {
                                    if (e instanceof Error) setErr(e.message);
                                    else setErr("Login error");
                                }
                            }}
                        >
                            <label className="block text-sm font-medium">{t("email")}</label>
                            <input
                                ref={emailRef}
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                                type="email"
                                className="mt-1 w-full rounded-xl border px-3 py-2 dark:bg-zinc-800 dark:border-white/20"
                                placeholder="you@example.com"
                            />

                            <label className="mt-3 block text-sm font-medium">{t("password")}</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                type="password"
                                className="mt-1 w-full rounded-xl border px-3 py-2 dark:bg-zinc-800 dark:border-white/20"
                                placeholder="••••••••"
                            />

                            <div className="mt-5 flex items-center gap-2">
                                {/* Войти */}
                                <button
                                    type="submit"
                                    className="rounded-xl border px-4 py-2 text-sm font-medium
                             bg-white text-black shadow
                             hover:!bg-black hover:!text-white hover:shadow-lg
                             focus:outline-none focus:ring-2 focus:ring-black/40 active:scale-[0.99]
                             dark:bg-white dark:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
                                >
                                    {t("sign_in")}
                                </button>

                                {/* Отмена */}
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-xl border px-4 py-2 text-sm font-medium
                             bg-white text-black shadow
                             hover:!bg-rose-600 hover:!text-white hover:shadow-lg
                             focus:outline-none focus:ring-2 focus:!ring-rose-400 active:scale-[0.99]
                             dark:bg-neutral-900 dark:text-black dark:hover:bg-rose-500"
                                >
                                    {t("cancel")}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
