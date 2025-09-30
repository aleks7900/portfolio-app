import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Индивидуальные заказы из нержавейки
 * Маршрут: <Route path="/guide/custom-stainless" element={<CustomStainlessPage />} />
 * Требует i18n-ключи custom_* (ru/ro словари).
 */

export default function CustomStainlessPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("custom_toc_intro")},
        {id: "types", title: t("custom_toc_types")},
        {id: "materials", title: t("custom_toc_materials")},
        {id: "process", title: t("custom_toc_process")},
        {id: "design", title: t("custom_toc_design")},
        {id: "quality", title: t("custom_toc_quality")},
        {id: "pricing", title: t("custom_toc_pricing")},
        {id: "faq", title: t("custom_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 mt-16">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("custom_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("custom_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("custom_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("custom_toc_title", {defaultValue: "Содержание"})}
                        </h2>
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
                            <h2 className="text-xl font-semibold mb-3">{t("custom_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("custom_intro_bul1")}</li>
                                <li>{t("custom_intro_bul2")}</li>
                                <li>{t("custom_intro_bul3")}</li>
                                <li>{t("custom_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Types */}
                    <section id="types" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("custom_types_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("custom_type_balustrade"), t("custom_type_sinks"), t("custom_type_stands"), t("custom_type_boxes")].map((c, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <p className="text-zinc-700 dark:!text-white">{c}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("custom_types_note")}</p>
                        </div>
                    </section>

                    {/* Materials */}
                    <section id="materials" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("custom_materials_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-4">{t("custom_materials_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("custom_materials_304")}</li>
                                <li>{t("custom_materials_316")}</li>
                                <li>{t("custom_materials_polish")}</li>
                                <li>{t("custom_materials_other")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Process */}
                    <section id="process" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("custom_process_title")}</h2>
                            <ol className="list-decimal pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("custom_process_step1")}</li>
                                <li>{t("custom_process_step2")}</li>
                                <li>{t("custom_process_step3")}</li>
                                <li>{t("custom_process_step4")}</li>
                            </ol>
                        </div>
                    </section>

                    {/* Design */}
                    <section id="design" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("custom_design_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("custom_design_rule1")}</li>
                                <li>{t("custom_design_rule2")}</li>
                                <li>{t("custom_design_rule3")}</li>
                                <li>{t("custom_design_rule4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Quality */}
                    <section id="quality" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("custom_quality_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white">{t("custom_quality_text")}</p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("custom_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("custom_pricing_1")}</li>
                                <li>{t("custom_pricing_2")}</li>
                                <li>{t("custom_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("custom_pricing_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("custom_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("custom_faq_q1")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("custom_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("custom_faq_q2")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("custom_faq_a2")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("custom_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("custom_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("custom_cta_btn_contact")}
                                </a>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    (window as any).open?.('/#callback', '_self');
                                }}
                                   className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10">
                                    {t("custom_cta_btn_callback")}
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
                        headline: t("custom_seo_headline"),
                        about: ["Custom stainless steel", "Individual orders", "Balustrades", "Sinks", "Boxes"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
