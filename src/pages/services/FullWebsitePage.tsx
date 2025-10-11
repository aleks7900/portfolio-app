import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Сайты под ключ
 * Маршрут: <Route path="/guide/full-package" element={<FullWebsitePage />} />
 * Требует i18n-ключи full_* (ru/ro словари).
 */

export default function FullWebsitePage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("full_toc_intro")},
        {id: "stages", title: t("full_toc_stages")},
        {id: "domain", title: t("full_toc_domain")},
        {id: "hosting", title: t("full_toc_hosting")},
        {id: "seo", title: t("full_toc_seo")},
        {id: "support", title: t("full_toc_support")},
        {id: "faq", title: t("full_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("full_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("full_title_t")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("full_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("full_toc_title", {defaultValue: "Содержание"})}
                        </h2>
                        <ul className="space-y-2 text-sm">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <a
                                        className="text-zinc-700 hover:text-emerald-700"
                                        href={`#${s.id}`}
                                    >
                                        {s.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* MAIN */}
                <article className="lg:col-span-9 space-y-12">
                    {/* Intro */}
                    <section id="intro" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">
                                {t("full_toc_intro")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("full_intro_bul1")}</li>
                                <li>{t("full_intro_bul2")}</li>
                                <li>{t("full_intro_bul3")}</li>
                                <li>{t("full_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Stages */}
                    <section id="stages" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("full_stages_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("full_stage_idea"), t("full_stage_design"), t("full_stage_dev"), t("full_stage_launch")].map((s, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <p className="text-zinc-700 dark:!text-white">{s}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Domain */}
                    <section id="domain" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("full_domain_title")}
                            </h2>
                            <p className="text-zinc-700 mb-3 dark:!text-white">{t("full_domain_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("full_domain_1")}</li>
                                <li>{t("full_domain_2")}</li>
                                <li>{t("full_domain_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Hosting */}
                    <section id="hosting" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("full_hosting_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("full_hosting_1")}</li>
                                <li>{t("full_hosting_2")}</li>
                                <li>{t("full_hosting_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* SEO */}
                    <section id="seo" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("full_seo_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("full_seo_1")}</li>
                                <li>{t("full_seo_2")}</li>
                                <li>{t("full_seo_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("full_seo_note")}</p>
                        </div>
                    </section>

                    {/* Support */}
                    <section id="support" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("full_support_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("full_support_1")}</li>
                                <li>{t("full_support_2")}</li>
                                <li>{t("full_support_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("full_toc_faq")}
                            </h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("full_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">
                      ▾
                    </span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("full_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("full_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">
                      ▾
                    </span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("full_faq_a2")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white shadow-sm">
                            <h2 className="text-xl font-semibold">{t("full_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("full_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="/contacts"
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("full_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("full_cta_btn_callback")}
                                </a>
                            </div>
                        </div>
                    </section>
                </article>
            </div>

            {/* SEO JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TechArticle",
                        headline: t("full_seo_headline"),
                        about: [
                            "Сайты под ключ",
                            "Разработка сайтов",
                            "Домен и хостинг",
                            "SEO и поддержка",
                        ],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
