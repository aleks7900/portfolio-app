import {useI18n} from "../shared/i18n/i18n.tsx";
import {useAuth} from "../shared/auth/auth.tsx";
import {useState} from "react";

export default function LoginDialog({open, onClose}: { open: boolean; onClose: () => void }) {
    const {t} = useI18n();
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState<string | null>(null);
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[100] grid items-center justify-center bg-black/40 p-4" role="dialog"
             aria-modal="true">
            <div
                className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-xl dark:bg-black dark:border-white/10">
                <div className="mb-4 text-lg font-semibold">{t("login")}</div>
                {err && <div
                    className="mb-3 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">{err}</div>}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            await login(email, password);
                            onClose();
                        } catch (e) {
                            if (e instanceof Error) {
                                setErr(e.message);
                            } else {
                                setErr("Login error");
                            }
                        }
                    }}
                >
                    <label className="block text-sm font-medium">{t("email")}</label>
                    <input value={email} onChange={(e) => setEmail(e.currentTarget.value)} type="email"
                           className="mt-1 w-full rounded-xl border px-3 py-2 dark:bg-black dark:border-white/20"
                           placeholder="you@example.com"/>
                    <label className="mt-3 block text-sm font-medium">{t("password")}</label>
                    <input value={password} onChange={(e) => setPassword(e.currentTarget.value)} type="password"
                           className="mt-1 w-full rounded-xl border px-3 py-2 dark:bg-black dark:border-white/20"
                           placeholder="••••••••"/>
                    <div className="mt-5 flex items-center gap-2">
                        <button type="submit"
                                className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90">{t("sign_in")}</button>
                        <button type="button" onClick={onClose}
                                className="rounded-xl border px-4 py-2 text-sm hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black">{t("cancel")}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
