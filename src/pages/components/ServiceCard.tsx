import {SERVICES} from "../../data/data.ts";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import {Hammer} from "lucide-react";
import {Link} from "react-router-dom";

export default function ServiceCard({titleKey, descKey, s}: { titleKey: string; descKey: string; s: (typeof SERVICES)[number] }) {
    const {t} = useI18n();
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-black dark:border-white/10">
            <div className="flex items-center gap-3">
                <div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white dark:bg-white dark:text-black">
                    <Hammer className="h-5 w-5"/>
                </div>
                <h3 className="text-base font-medium">{t(titleKey)}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{t(descKey)}</p>
            <Link
                to={`/services/${s.slug}`}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 border text-sm hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black transition shadow-2xl"
            >
                {t("more") ?? "Подробнее"}
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M8 5l8 7-8 7V5z"/>
                </svg>
            </Link>
        </div>
    );
}