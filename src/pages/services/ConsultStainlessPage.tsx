import {useI18n} from "../../shared/i18n/i18n.tsx"

/**
 * Страница: Консультации специалистов
 * Маршрут: <Route path="/guide/consult-stainless" element={<ConsultStainlessPage />} />
 * Требует i18n-ключи consult_* (ru/ro словари).
 */

export default function ConsultStainlessPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("consult_toc_intro")},
        {id: "benefits", title: t("consult_toc_benefits")},
        {id: "areas", title: t("consult_toc_areas")},
        {id: "process", title: t("consult_toc_process")},
        {id: "recommendations", title: t("consult_toc_recommendations")},
        {id: "pricing", title: t("consult_toc_pricing")},
        {id: "faq", title: t("consult_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 mt-16">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("consult_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("consult_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("consult_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">{t("consult_toc_title", {defaultValue: "Содержание"})}</h2>
                        <ul className="space-y-2 text-sm">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <a className="text-zinc-700 hover:text-emerald-700" href={`#${s.id}`}>
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
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("consult_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("consult_intro_bul1")}</li>
                                <li>{t("consult_intro_bul2")}</li>
                                <li>{t("consult_intro_bul3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("consult_benefits_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("consult_benefit1"), t("consult_benefit2"), t("consult_benefit3"), t("consult_benefit4")].map((c, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <p className="text-zinc-700 dark:!text-white">{c}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Areas of consultation */}
                    <section id="areas" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("consult_areas_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("consult_area_design")}</li>
                                <li>{t("consult_area_welding")}</li>
                                <li>{t("consult_area_surface")}</li>
                                <li>{t("consult_area_maintenance")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Process */}
                    <section id="process" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("consult_process_title")}</h2>
                            <ol className="list-decimal pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("consult_process_step1")}</li>
                                <li>{t("consult_process_step2")}</li>
                                <li>{t("consult_process_step3")}</li>
                                <li>{t("consult_process_step4")}</li>
                            </ol>
                        </div>
                    </section>

                    {/* Recommendations */}
                    <section id="recommendations" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("consult_recommendations_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("consult_recommendations_intro")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("consult_recommendation1")}</li>
                                <li>{t("consult_recommendation2")}</li>
                                <li>{t("consult_recommendation3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("consult_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("consult_pricing_1")}</li>
                                <li>{t("consult_pricing_2")}</li>
                                <li>{t("consult_pricing_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("consult_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("consult_faq_q1")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("consult_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("consult_faq_q2")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("consult_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("consult_faq_q3")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("consult_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("consult_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("consult_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("consult_cta_btn_contact")}
                                </a>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    (window as any).open?.('/#callback', '_self');
                                }}
                                   className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10">
                                    {t("consult_cta_btn_callback")}
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
                        headline: t("consult_seo_headline"),
                        about: ["Consulting", "Stainless steel", "Expert advice", "Recommendations"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
