import {toLangHref, useI18n} from "../../shared/i18n/i18n.tsx";

export default function Footer() {
    const {t, lang} = useI18n();
    return (
        <footer className="border-t bg-white/60 dark:bg-black/40 dark:border-white/10">
            <div
                className="mx-auto max-w-[72rem] xl:max-w-[80rem] 2xl:max-w-[90rem] px-4 sm:px-6 py-8 text-sm text-gray-500 dark:text-gray-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span>© {new Date().getFullYear()} Alex-LAB</span>
                <div className="flex items-center gap-4">
                    <a href={toLangHref("/about", lang)} className="hover:underline">{t("footer_about")}</a>
                    <a href={toLangHref("/contacts", lang)} className="hover:underline">{t("footer_contacts")}</a>
                    <a href={toLangHref("/web/calc", lang)} className="hover:underline">Web calc</a>
                    <a href={toLangHref("/guide", lang)} className="hover:underline">{t("footer_guide")}</a>
                </div>
            </div>
        </footer>
    );
}