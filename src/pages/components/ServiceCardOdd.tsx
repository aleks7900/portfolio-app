import {SERVICES} from "../../data/data.ts";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import {ArrowRight} from "lucide-react";
import {Link} from "react-router-dom";

export default function ServiceCardOdd({titleKey, descKey, s}: {
    titleKey: string;
    descKey: string;
    s: (typeof SERVICES)[number]
}) {
    const {t} = useI18n();
    return (
        <div className="rounded-2xl !bg-gray-300 min-h-full p-6 shadow-sm dark:!bg-gray-700 dark:border-white/10">
            <div className="flex items-center gap-3">
                <div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white dark:bg-white dark:text-black">
                    <s.icon className="min-h-6 min-w-6 h-6 w-6"/>
                </div>
                <h3 className="text-2xl font-medium">{t(titleKey)}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{t(descKey)}</p>
            <Link
                to={`/services/${s.slug}`}
                className="mt-6 inline-flex items-center justify-center gap-2
                         rounded-2xl border px-8 py-4 text-base font-medium
                         !bg-white !text-black shadow
                         hover:!bg-black hover:!text-white hover:shadow-lg
                         focus:outline-none focus:ring-2 focus:ring-black/40 active:scale-[0.99]
                         dark:bg-white dark:text-black dark:hover:bg-neutral-800 dark:hover:text-white transition"
            >
                {t("more") ?? "Подробнее"}
                <ArrowRight className="h-5 w-5"/>
            </Link>
        </div>
    );
}