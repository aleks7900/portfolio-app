import {useI18n} from "../../shared/i18n/i18n.tsx";
import {useAuth} from "../../shared/auth/auth.tsx";
import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Input} from "../../components/ui/input.tsx";
import {Button} from "../../components/ui/button.tsx";

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
    const [loading, setLoading] = useState(false);

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
                    className="fixed inset-0 z-[100] grid items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.18}}
                >
                    <motion.div
                        initial={{opacity: 0, y: 12, scale: 0.98}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: 8, scale: 0.98}}
                        transition={{type: "spring", stiffness: 420, damping: 32, mass: 0.6}}
                        className="w-full max-w-md rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl"
                    >
                        <div className="mb-6 text-xl font-bold tracking-tight text-foreground">{t("login")}</div>

                        {err && (
                            <div
                                className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive font-medium">
                                {err}
                            </div>
                        )}

                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setLoading(true);
                                setErr(null);
                                try {
                                    await login(email, password);
                                    onClose();
                                } catch (e) {
                                    if (e instanceof Error) setErr(e.message);
                                    else setErr("Login error");
                                } finally {
                                    setLoading(false);
                                }
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">{t("email")}</label>
                                <Input
                                    ref={emailRef}
                                    value={email}
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">{t("password")}</label>
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.currentTarget.value)}
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="pt-2 flex items-center justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onClose}
                                >
                                    {t("cancel")}
                                </Button>
                                <Button
                                    type="submit"
                                    variant="glow"
                                    loading={loading}
                                >
                                    {t("sign_in")}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
