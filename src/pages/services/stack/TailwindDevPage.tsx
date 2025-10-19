// src/pages/services/TailwindDevPage.tsx

import {toLangHref, useI18n} from "../../../shared/i18n/i18n.tsx";

/**
 * Страница: Tailwind CSS в разработке
 * Маршрут: <Route path="/services/tailwind" element={<TailwindDevPage />} />
 * Требует i18n-ключи tailwind_* (ru/ro словари).
 */

export default function TailwindDevPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("tailwind_toc_intro")},
        {id: "benefits", title: t("tailwind_toc_benefits")},
        {id: "setup", title: t("tailwind_toc_setup")},
        {id: "utilities", title: t("tailwind_toc_utilities")},
        {id: "components", title: t("tailwind_toc_components")},
        {id: "responsive", title: t("tailwind_toc_responsive")},
        {id: "theming", title: t("tailwind_toc_theming")},
        {id: "performance", title: t("tailwind_toc_performance")},
        {id: "a11y", title: t("tailwind_toc_a11y")},
        {id: "plugins", title: t("tailwind_toc_plugins")},
        {id: "bestpractices", title: t("tailwind_toc_bestpractices")},
        {id: "faq", title: t("tailwind_toc_faq")},
    ];

    const benefitCards = [
        "tailwind_ben_speed",
        "tailwind_ben_consistency",
        "tailwind_ben_scale",
        "tailwind_ben_designsystem",
    ];

    const utilityCards = [
        "tailwind_util_layout",
        "tailwind_util_spacing",
        "tailwind_util_typography",
        "tailwind_util_colors",
        "tailwind_util_effects",
        "tailwind_util_interactivity",
    ];

    const componentTips = [
        "tailwind_cmp_tip_variants",
        "tailwind_cmp_tip_states",
        "tailwind_cmp_tip_extract",
        "tailwind_cmp_tip_accessibility",
    ];

    const pluginCards = [
        "tailwind_pl_forms",
        "tailwind_pl_typography",
        "tailwind_pl_aspect",
        "tailwind_pl_container",
        "tailwind_pl_animate",
        "tailwind_pl_custom",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("tailwind_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("tailwind_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("tailwind_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("tailwind_toc_title", {defaultValue: "Содержание"})}
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
                                {t("tailwind_toc_intro")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("tailwind_intro_bul1")}</li>
                                <li>{t("tailwind_intro_bul2")}</li>
                                <li>{t("tailwind_intro_bul3")}</li>
                                <li>{t("tailwind_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("tailwind_benefits_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {benefitCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4">
                                        <p className="text-zinc-700 dark:!text-white">{t(k)}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("tailwind_benefits_note")}
                            </p>
                        </div>
                    </section>

                    {/* Setup */}
                    <section id="setup" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("tailwind_setup_title")}
                            </h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">
                                {t("tailwind_setup_p1")}
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("tailwind_setup_vite"),
                                    t("tailwind_setup_postcss"),
                                    t("tailwind_setup_content"),
                                    t("tailwind_setup_cli"),
                                ].map((s) => (
                                    <div key={s} className="rounded-xl border p-4 text-sm">
                                        {s}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("tailwind_setup_note")}
                            </p>
                        </div>
                    </section>

                    {/* Utilities */}
                    <section id="utilities" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("tailwind_utilities_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {utilityCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("tailwind_util_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("tailwind_util_tip_1")}</li>
                                    <li>{t("tailwind_util_tip_2")}</li>
                                    <li>{t("tailwind_util_tip_3")}</li>
                                    <li>{t("tailwind_util_tip_4")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Components */}
                    <section id="components" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("tailwind_components_title")}
                            </h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">
                                {t("tailwind_components_p1")}
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("tailwind_components_card"),
                                    t("tailwind_components_button"),
                                    t("tailwind_components_form"),
                                    t("tailwind_components_navbar"),
                                ].map((c) => (
                                    <div key={c} className="rounded-xl border p-4 text-sm">
                                        {c}
                                    </div>
                                ))}
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("tailwind_components_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    {componentTips.map((k) => (
                                        <li key={k}>{t(k)}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Responsive */}
                    <section id="responsive" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("tailwind_responsive_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("tailwind_resp_breakpoints")}</li>
                                <li>{t("tailwind_resp_container")}</li>
                                <li>{t("tailwind_resp_grid")}</li>
                                <li>{t("tailwind_resp_accessibility")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("tailwind_responsive_note")}</p>
                        </div>
                    </section>

                    {/* Theming */}
                    <section id="theming" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("tailwind_theming_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("tailwind_theme_tokens_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("tailwind_theme_colors")}</li>
                                        <li>{t("tailwind_theme_typography")}</li>
                                        <li>{t("tailwind_theme_spacing")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("tailwind_theme_modes_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("tailwind_theme_darkmode")}</li>
                                        <li>{t("tailwind_theme_cva")}</li>
                                        <li>{t("tailwind_theme_rtl")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("tailwind_theming_note")}</p>
                        </div>
                    </section>

                    {/* Performance */}
                    <section id="performance" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("tailwind_performance_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("tailwind_perf_jit"),
                                    t("tailwind_perf_tree_shake"),
                                    t("tailwind_perf_minify"),
                                    t("tailwind_perf_images"),
                                ].map((p) => (
                                    <div key={p} className="rounded-xl border p-4 text-sm">
                                        {p}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("tailwind_performance_note")}</p>
                        </div>
                    </section>

                    {/* Accessibility */}
                    <section id="a11y" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("tailwind_a11y_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("tailwind_a11y_focus")}</li>
                                <li>{t("tailwind_a11y_contrast")}</li>
                                <li>{t("tailwind_a11y_motion")}</li>
                                <li>{t("tailwind_a11y_semantics")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("tailwind_a11y_note")}</p>
                        </div>
                    </section>

                    {/* Plugins */}
                    <section id="plugins" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("tailwind_plugins_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {pluginCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("tailwind_plugins_note")}</p>
                        </div>
                    </section>

                    {/* Best practices */}
                    <section id="bestpractices" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("tailwind_best_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("tailwind_best_layering"),
                                    t("tailwind_best_extractive"),
                                    t("tailwind_best_aria"),
                                    t("tailwind_best_lint"),
                                ].map((p) => (
                                    <div key={p} className="rounded-xl border p-4 text-sm">
                                        {p}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("tailwind_best_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("tailwind_toc_faq")}
                            </h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("tailwind_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("tailwind_faq_a1")}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("tailwind_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("tailwind_faq_a2")}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("tailwind_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("tailwind_faq_a3")}
                                    </p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm dark:!text-white text-white">
                            <h2 className="text-xl font-semibold">{t("tailwind_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("tailwind_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href={toLangHref("/contacts", lang)}
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("tailwind_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("tailwind_cta_btn_callback")}
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
                        serviceType: t("tailwind_seo_headline"),
                        areaServed: ["MD", "RO", "UA"],
                        offers: {
                            "@type": "Offer",
                            priceSpecification: {
                                "@type": "PriceSpecification",
                                priceCurrency: "MDL",
                            },
                        },
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
