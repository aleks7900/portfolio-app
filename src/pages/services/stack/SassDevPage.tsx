import {useI18n} from "../../../shared/i18n/i18n.tsx";

export default function SassDevPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("sass_toc_intro")},
        {id: "benefits", title: t("sass_toc_benefits")},
        {id: "stack", title: t("sass_toc_stack")},
        {id: "architecture", title: t("sass_toc_architecture")},
        {id: "features", title: t("sass_toc_features")},
        {id: "theming", title: t("sass_toc_theming")},
        {id: "performance", title: t("sass_toc_performance")},
        {id: "tooling", title: t("sass_toc_tooling")},
        {id: "migration", title: t("sass_toc_migration")},
        {id: "guidelines", title: t("sass_toc_guidelines")},
        {id: "faq", title: t("sass_toc_faq")},
    ];

    const featureCards = [
        "sass_feat_variables",
        "sass_feat_mixins",
        "sass_feat_functions",
        "sass_feat_nesting",
        "sass_feat_partials",
        "sass_feat_modules",
        "sass_feat_conditionals",
        "sass_feat_loops",
    ];

    const guidelineRows = [
        {r1: "sass_guideline_bem", r2: "sass_guideline_tokens", r3: "sass_guideline_responsive"},
        {r1: "sass_guideline_dark", r2: "sass_guideline_aria", r3: "sass_guideline_debt"},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("sass_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("sass_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("sass_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("sass_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("sass_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("sass_intro_bul1")}</li>
                                <li>{t("sass_intro_bul2")}</li>
                                <li>{t("sass_intro_bul3")}</li>
                                <li>{t("sass_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("sass_benefits_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("sass_ben_speed"), t("sass_ben_consistency"), t("sass_ben_scaling"), t("sass_ben_maintain")]
                                    .map((c, i) => (
                                        <div key={i} className="rounded-xl border p-4">
                                            <p className="text-zinc-700 dark:!text-white">{c}</p>
                                        </div>
                                    ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("sass_benefits_note")}</p>
                        </div>
                    </section>

                    {/* Tech stack */}
                    <section id="stack" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("sass_stack_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("sass_stack_p1")}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("sass_stack_front"), t("sass_stack_build"), t("sass_stack_css"), t("sass_stack_ci")]
                                    .map((s) => (
                                        <div key={s} className="rounded-xl border p-4 text-sm">{s}</div>
                                    ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("sass_stack_note")}</p>
                        </div>
                    </section>

                    {/* Architecture */}
                    <section id="architecture" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("sass_arch_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("sass_arch_p1")}</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("sass_tbl_folder")}</th>
                                        <th className="text-left p-3">{t("sass_tbl_purpose")}</th>
                                        <th className="text-left p-3">{t("sass_tbl_example")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {[
                                        {f: "abstracts/", p: t("sass_arch_abs"), e: "_variables.scss, _mixins.scss"},
                                        {f: "base/", p: t("sass_arch_base"), e: "_reset.scss, _typography.scss"},
                                        {f: "components/", p: t("sass_arch_components"), e: "_button.scss, _card.scss"},
                                        {f: "layout/", p: t("sass_arch_layout"), e: "_grid.scss, _header.scss"},
                                        {f: "pages/", p: t("sass_arch_pages"), e: "_home.scss"},
                                        {f: "themes/", p: t("sass_arch_themes"), e: "_dark.scss, _light.scss"},
                                        {f: "vendors/", p: t("sass_arch_vendors"), e: "_recharts.scss"},
                                    ].map((r, i) => (
                                        <tr key={i}>
                                            <td className="p-3">{r.f}</td>
                                            <td className="p-3">{r.p}</td>
                                            <td className="p-3">{r.e}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("sass_arch_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("sass_arch_tip_1")}</li>
                                    <li>{t("sass_arch_tip_2")}</li>
                                    <li>{t("sass_arch_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Core features */}
                    <section id="features" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("sass_features_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {featureCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">{t(k)}</div>
                                ))}
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("sass_features_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("sass_features_tip_1")}</li>
                                    <li>{t("sass_features_tip_2")}</li>
                                    <li>{t("sass_features_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Theming */}
                    <section id="theming" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("sass_theming_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("sass_theme_tokens")}</li>
                                <li>{t("sass_theme_modes")}</li>
                                <li>{t("sass_theme_scaling")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("sass_theming_note")}</p>
                        </div>
                    </section>

                    {/* Performance */}
                    <section id="performance" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("sass_performance_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("sass_perf_split"), t("sass_perf_purge"), t("sass_perf_minify"), t("sass_perf_critical")]
                                    .map((p) => (
                                        <div key={p} className="rounded-xl border p-4 text-sm">{p}</div>
                                    ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("sass_performance_note")}</p>
                        </div>
                    </section>

                    {/* Tooling */}
                    <section id="tooling" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("sass_tooling_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    t("sass_tool_dart"),
                                    t("sass_tool_postcss"),
                                    t("sass_tool_autoprefixer"),
                                    t("sass_tool_stylelint"),
                                ].map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">{k}</div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("sass_tooling_note")}</p>
                        </div>
                    </section>

                    {/* Migration */}
                    <section id="migration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("sass_migration_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("sass_migration_from_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("sass_migration_from_css")}</li>
                                        <li>{t("sass_migration_from_less")}</li>
                                        <li>{t("sass_migration_from_cssinjs")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("sass_migration_process_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("sass_migration_proc_audit")}</li>
                                        <li>{t("sass_migration_proc_layers")}</li>
                                        <li>{t("sass_migration_proc_refactor")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("sass_migration_note")}</p>
                        </div>
                    </section>

                    {/* Guidelines */}
                    <section id="guidelines" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("sass_guidelines_title")}</h2>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {guidelineRows.flatMap((row) => [row.r1, row.r2, row.r3]).map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">{t(k)}</div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("sass_guidelines_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("sass_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("sass_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("sass_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("sass_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("sass_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("sass_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("sass_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("sass_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("sass_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("sass_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("sass_cta_btn_callback")}
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
                        serviceType: t("sass_seo_headline"),
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
