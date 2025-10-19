import {toLangHref, useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Индивидуальная разработка веб-приложений (Custom Web Apps)
 * Маршрут: <Route path="/services/custom-apps" element={<CustomOrdersPage />} />
 * Требует i18n-ключи custom_* (ru/ro словари ниже).
 */

export default function CustomOrdersPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("custom_app_toc_intro")},
        {id: "usecases", title: t("custom_app_toc_usecases")},
        {id: "process", title: t("custom_app_toc_process")},
        {id: "requirements", title: t("custom_app_toc_requirements")},
        {id: "design", title: t("custom_app_toc_design")},
        {id: "stack", title: t("custom_app_toc_stack")},
        {id: "features", title: t("custom_app_toc_features")},
        {id: "integrations", title: t("custom_app_toc_integrations")},
        {id: "pricing", title: t("custom_app_toc_pricing")},
        {id: "terms", title: t("custom_app_toc_terms")},
        {id: "faq", title: t("custom_app_toc_faq")},
    ];

    const featureCards = [
        "custom_feat_unique_ui",
        "custom_feat_performance",
        "custom_feat_security",
        "custom_feat_scalability",
        "custom_feat_multilang",
        "custom_feat_seo",
        "custom_feat_analytics",
        "custom_feat_accessibility",
    ];

    const integrationCards = [
        "custom_int_payments",
        "custom_int_maps",
        "custom_int_crm",
        "custom_int_erp",
        "custom_int_storage",
        "custom_int_analytics",
    ];

    const processSteps = [
        "custom_proc_brief",
        "custom_proc_estimate",
        "custom_proc_design",
        "custom_proc_dev",
        "custom_proc_test",
        "custom_proc_launch",
        "custom_proc_support",
    ];

    const reqRows = [
        {
            f: t("custom_app_req_business_goals"),
            ex: t("custom_app_req_business_goals_ex"),
            n: t("custom_app_req_business_goals_note"),
        },
        {
            f: t("custom_app_req_functionality"),
            ex: t("custom_app_req_functionality_ex"),
            n: t("custom_app_req_functionality_note"),
        },
        {
            f: t("custom_app_req_deadlines"),
            ex: "2–6 " + t("custom_app_req_weeks"),
            n: t("custom_app_req_deadlines_note"),
        },
        {
            f: t("custom_app_req_content"),
            ex: t("custom_app_req_content_ex"),
            n: t("custom_app_req_content_note"),
        },
        {
            f: t("custom_app_req_integrations"),
            ex: t("custom_app_req_integrations_ex"),
            n: t("custom_app_req_integrations_note"),
        },
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("custom_app_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("custom_app_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("custom_app_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("custom_app_toc_title")}
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
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">
                                {t("custom_app_toc_intro")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("custom_app_intro_bul1")}</li>
                                <li>{t("custom_app_intro_bul2")}</li>
                                <li>{t("custom_app_intro_bul3")}</li>
                                <li>{t("custom_app_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Use cases */}
                    <section id="usecases" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("custom_app_usecases_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    t("custom_app_use_ecommerce"),
                                    t("custom_app_use_corporate"),
                                    t("custom_app_use_configurators"),
                                    t("custom_app_use_portals"),
                                ].map((c, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <p className="text-zinc-700 dark:!text-white">{c}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("custom_app_usecases_note")}
                            </p>
                        </div>
                    </section>

                    {/* Process */}
                    <section id="process" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("custom_app_process_title")}
                            </h2>
                            <ol className="list-decimal pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                {processSteps.map((k) => (
                                    <li key={k}>{t(k)}</li>
                                ))}
                            </ol>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("custom_app_process_note")}
                            </p>
                        </div>
                    </section>

                    {/* Requirements */}
                    <section id="requirements" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("custom_app_requirements_title")}
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("custom_app_tbl_field")}</th>
                                        <th className="text-left p-3">{t("custom_app_tbl_example")}</th>
                                        <th className="text-left p-3">{t("custom_app_tbl_note")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {reqRows.map((r, i) => (
                                        <tr key={i}>
                                            <td className="p-3">{r.f}</td>
                                            <td className="p-3">{r.ex}</td>
                                            <td className="p-3">{r.n}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("custom_app_requirements_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("custom_app_requirements_tip_1")}</li>
                                    <li>{t("custom_app_requirements_tip_2")}</li>
                                    <li>{t("custom_app_requirements_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Design */}
                    <section id="design" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("custom_app_design_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("custom_app_design_wireframes")}</li>
                                <li>{t("custom_app_design_ui")}</li>
                                <li>{t("custom_app_design_prototypes")}</li>
                                <li>{t("custom_app_design_guidelines")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("custom_app_design_note")}
                            </p>
                        </div>
                    </section>

                    {/* Tech stack */}
                    <section id="stack" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("custom_app_stack_title")}
                            </h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">
                                {t("custom_app_stack_p1")}
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("custom_app_stack_front"), t("custom_app_stack_back"), t("custom_app_stack_db"), t("custom_app_stack_devops")].map(
                                    (s) => (
                                        <div key={s} className="rounded-xl border p-4 text-sm">
                                            {s}
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("custom_app_stack_note")}
                            </p>
                        </div>
                    </section>

                    {/* Features */}
                    <section id="features" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("custom_app_features_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {featureCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("custom_app_features_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("custom_app_features_tip_1")}</li>
                                    <li>{t("custom_app_features_tip_2")}</li>
                                    <li>{t("custom_app_features_tip_3")}</li>
                                    <li>{t("custom_app_features_tip_4")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Integrations */}
                    <section id="integrations" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("custom_app_integrations_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {integrationCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("custom_app_integrations_note")}
                            </p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:!bg-zinc-700 p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("custom_app_pricing_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("custom_app_pricing_1")}</li>
                                <li>{t("custom_app_pricing_2")}</li>
                                <li>{t("custom_app_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("custom_app_pricing_note")}
                            </p>
                        </div>
                    </section>

                    {/* Terms */}
                    <section id="terms" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("custom_app_terms_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">
                                        {t("custom_app_terms_delivery_title")}
                                    </h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("custom_app_terms_delivery_1")}</li>
                                        <li>{t("custom_app_terms_delivery_2")}</li>
                                        <li>{t("custom_app_terms_delivery_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">
                                        {t("custom_app_terms_support_title")}
                                    </h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("custom_app_terms_support_1")}</li>
                                        <li>{t("custom_app_terms_support_2")}</li>
                                        <li>{t("custom_app_terms_support_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("custom_app_terms_note")}
                            </p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("custom_app_toc_faq")}
                            </h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("custom_app_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("custom_app_faq_a1")}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("custom_app_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("custom_app_faq_a2")}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("custom_app_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("custom_app_faq_a3")}
                                    </p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm dark:!text-white text-white">
                            <h2 className="text-xl font-semibold">{t("custom_app_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("custom_app_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href={toLangHref("/contacts", lang)}
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("custom_app_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("custom_app_cta_btn_callback")}
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
                        serviceType: t("custom_app_seo_headline"),
                        areaServed: ["MD", "RO", "UA"],
                        offers: {
                            "@type": "Offer",
                            priceSpecification: {
                                "@type": "PriceSpecification",
                                priceCurrency: "MDL"
                            }
                        },
                        inLanguage: "ru-RU"
                    }),
                }}
            />
        </main>
    );
}
