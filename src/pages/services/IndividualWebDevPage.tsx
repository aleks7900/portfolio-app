import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Разработка сайтов по индивидуальному заказу
 * Маршрут: <Route path="/guide/individual" element={<IndividualWebDevPage />} />
 * Требует i18n-ключи individual_* (ru/ro словари).
 */

export default function IndividualWebDevPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("individual_toc_intro")},
        {id: "approach", title: t("individual_toc_approach")},
        {id: "stages", title: t("individual_toc_stages")},
        {id: "tech", title: t("individual_toc_tech")},
        {id: "design", title: t("individual_toc_design")},
        {id: "integration", title: t("individual_toc_integration")},
        {id: "seo", title: t("individual_toc_seo")},
        {id: "pricing", title: t("individual_toc_pricing")},
        {id: "faq", title: t("individual_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("individual_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("individual_title_t")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("individual_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("individual_toc_title", {defaultValue: "Содержание"})}
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
                                {t("individual_toc_intro")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("individual_intro_bul1")}</li>
                                <li>{t("individual_intro_bul2")}</li>
                                <li>{t("individual_intro_bul3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Approach */}
                    <section id="approach" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("individual_approach_title")}
                            </h2>
                            <p className="text-zinc-700 mb-3 dark:!text-white">{t("individual_approach_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("individual_approach_1")}</li>
                                <li>{t("individual_approach_2")}</li>
                                <li>{t("individual_approach_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Stages */}
                    <section id="stages" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("individual_stages_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4 dark:!text-white">
                                {[t("individual_stage_1"), t("individual_stage_2"), t("individual_stage_3"), t("individual_stage_4")].map((s, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Technologies */}
                    <section id="tech" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("individual_tech_title")}</h2>
                            <p className="text-zinc-700 mb-3 dark:!text-white">{t("individual_tech_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 dark:!text-white">
                                <li>{t("individual_tech_front")}</li>
                                <li>{t("individual_tech_back")}</li>
                                <li>{t("individual_tech_db")}</li>
                                <li>{t("individual_tech_cloud")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Design */}
                    <section id="design" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("individual_design_title")}</h2>
                            <p className="text-zinc-700 mb-3 dark:!text-white">{t("individual_design_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 dark:!text-white">
                                <li>{t("individual_design_ux")}</li>
                                <li>{t("individual_design_ui")}</li>
                                <li>{t("individual_design_brand")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Integration */}
                    <section id="integration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("individual_integration_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 dark:!text-white">
                                <li>{t("individual_integration_crm")}</li>
                                <li>{t("individual_integration_payment")}</li>
                                <li>{t("individual_integration_analytics")}</li>
                                <li>{t("individual_integration_api")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* SEO */}
                    <section id="seo" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("individual_seo_title")}</h2>
                            <p className="text-zinc-700 mb-3 dark:!text-white">{t("individual_seo_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 dark:!text-white">
                                <li>{t("individual_seo_1")}</li>
                                <li>{t("individual_seo_2")}</li>
                                <li>{t("individual_seo_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("individual_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 dark:!text-white">
                                <li>{t("individual_pricing_1")}</li>
                                <li>{t("individual_pricing_2")}</li>
                                <li>{t("individual_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("individual_pricing_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("individual_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("individual_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("individual_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("individual_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("individual_faq_a2")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("individual_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("individual_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="/contacts"
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("individual_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("individual_cta_btn_callback")}
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
                        headline: t("individual_seo_headline"),
                        about: ["Website development", "Custom design", "Frontend", "Backend"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
