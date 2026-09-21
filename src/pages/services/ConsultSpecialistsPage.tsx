import {toLangHref, useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Разработка веб-приложений (SPA/PWA/SSR, React + Spring)
 * Маршрут: <Route path="/services/webapps" element={<WebAppDevPage />} />
 * Требуются i18n-ключи webapp_* (ru/ro словари).
 */

export default function ConsultSpecialistsPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("webapp_toc_intro")},
        {id: "benefits", title: t("webapp_toc_benefits")},
        {id: "features", title: t("webapp_toc_features")},
        {id: "stack", title: t("webapp_toc_stack")},
        {id: "process", title: t("webapp_toc_process")},
        {id: "cases", title: t("webapp_toc_cases")},
        {id: "pricing", title: t("webapp_toc_pricing")},
        {id: "faq", title: t("webapp_toc_faq")},
    ];

    const benefitCards = [
        "webapp_ben_speed",
        "webapp_ben_quality",
        "webapp_ben_scaling",
        "webapp_ben_security",
    ];

    const featureCards = [
        "webapp_feat_spa",
        "webapp_feat_pwa",
        "webapp_feat_ssr",
        "webapp_feat_dashboard",
        "webapp_feat_integrations",
        "webapp_feat_payments",
        "webapp_feat_i18n",
        "webapp_feat_accessibility",
    ];

    const stackCards = [
        "webapp_stack_react",
        "webapp_stack_ts",
        "webapp_stack_vite",
        "webapp_stack_tailwind",
        "webapp_stack_spring",
        "webapp_stack_java",
        "webapp_stack_postgres",
        "webapp_stack_nginx",
        "webapp_stack_docker",
        "webapp_stack_monitoring",
    ];

    const processSteps = [
        "webapp_proc_1",
        "webapp_proc_2",
        "webapp_proc_3",
        "webapp_proc_4",
        "webapp_proc_5",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("webapp_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("webapp_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("webapp_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("webapp_toc_title")}
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
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("webapp_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("webapp_intro_bul1")}</li>
                                <li>{t("webapp_intro_bul2")}</li>
                                <li>{t("webapp_intro_bul3")}</li>
                                <li>{t("webapp_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("webapp_benefits_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {benefitCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4">
                                        <p className="text-zinc-700 dark:!text-white">{t(k)}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("webapp_benefits_note")}</p>
                        </div>
                    </section>

                    {/* Features */}
                    <section id="features" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("webapp_features_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {featureCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700">
                                <p className="font-medium">{t("webapp_features_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("webapp_features_tip_1")}</li>
                                    <li>{t("webapp_features_tip_2")}</li>
                                    <li>{t("webapp_features_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Tech Stack */}
                    <section id="stack" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("webapp_stack_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {stackCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("webapp_stack_note")}</p>
                        </div>
                    </section>

                    {/* Process */}
                    <section id="process" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("webapp_process_title")}</h2>
                            <ol className="list-decimal pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                {processSteps.map((k) => (
                                    <li key={k}>{t(k)}</li>
                                ))}
                            </ol>
                            <p className="text-sm text-zinc-600 mt-3">{t("webapp_process_note")}</p>
                        </div>
                    </section>

                    {/* Cases */}
                    <section id="cases" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("webapp_cases_title")}</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("webapp_tbl_case")}</th>
                                        <th className="text-left p-3">{t("webapp_tbl_problem")}</th>
                                        <th className="text-left p-3">{t("webapp_tbl_result")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {[1, 2, 3].map((i) => (
                                        <tr key={i}>
                                            <td className="p-3">{t(`webapp_case${i}_name`)}</td>
                                            <td className="p-3">{t(`webapp_case${i}_problem`)}</td>
                                            <td className="p-3">{t(`webapp_case${i}_result`)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("webapp_cases_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("webapp_cases_tip_1")}</li>
                                    <li>{t("webapp_cases_tip_2")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("webapp_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("webapp_pricing_1")}</li>
                                <li>{t("webapp_pricing_2")}</li>
                                <li>{t("webapp_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3 ">{t("webapp_pricing_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("webapp_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("webapp_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("webapp_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("webapp_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("webapp_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("webapp_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("webapp_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("webapp_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("webapp_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href={toLangHref("/contacts", lang)}
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("webapp_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.hash = "callback";
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("webapp_cta_btn_callback")}
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
                        "@type": "Service",
                        serviceType: t("webapp_seo_headline"),
                        offers: {
                            "@type": "Offer",
                            priceSpecification: {"@type": "PriceSpecification", priceCurrency: "MDL"}
                        },
                        hasOfferCatalog: {
                            "@type": "OfferCatalog",
                            name: t("webapp_seo_catalog"),
                            itemListElement: [
                                {"@type": "Offer", itemOffered: {"@type": "SoftwareApplication", name: "SPA/PWA"}},
                                {"@type": "Offer", itemOffered: {"@type": "SoftwareApplication", name: "SSR/CSR"}},
                                {
                                    "@type": "Offer",
                                    itemOffered: {"@type": "SoftwareApplication", name: "Admin/Dashboard"}
                                }
                            ]
                        },
                        areaServed: ["MD", "RO", "UA"],
                        inLanguage: "ru-RU"
                    }),
                }}
            />
        </main>
    );
}
