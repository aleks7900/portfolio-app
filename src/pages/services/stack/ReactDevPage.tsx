// src/pages/services/ReactDevPage.tsx
import {toLangHref, useI18n} from "../../../shared/i18n/i18n.tsx";

export default function ReactDevPage() {
    const {t, lang} = useI18n();

    const tf = (k: string, fb: string) => {
        const v = t(k);
        return v === k || !v ? fb : v;
    };

    const sections = [
        {id: "intro", title: t("react_toc_intro")},
        {id: "benefits", title: t("react_toc_benefits")},
        {id: "stack", title: t("react_toc_stack")},
        {id: "features", title: t("react_toc_features")},
        {id: "patterns", title: t("react_toc_patterns")},
        {id: "performance", title: t("react_toc_performance")},
        {id: "security", title: t("react_toc_security")},
        {id: "testing", title: t("react_toc_testing")},
        {id: "tooling", title: t("react_toc_tooling")},
        {id: "seo", title: t("react_toc_seo")},
        {id: "pricing", title: t("react_toc_pricing")},
        {id: "faq", title: t("react_toc_faq")},
    ];

    const featureCards = [
        "react_feat_components",
        "react_feat_typescript",
        "react_feat_state",
        "react_feat_routing",
        "react_feat_ssr",
        "react_feat_accessibility",
    ];

    const patternCards = [
        "react_pat_hooks",
        "react_pat_code_splitting",
        "react_pat_caching",
        "react_pat_forms",
        "react_pat_i18n",
        "react_pat_offline",
    ];

    const perfCards = [
        "react_perf_memoz",
        "react_perf_images",
        "react_perf_cdn",
        "react_perf_rum",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-sky-700 font-semibold">
                    {t("react_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("react_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("react_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("react_toc_title", {defaultValue: "Содержание"})}
                        </h2>
                        <ul className="space-y-2 text-sm">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <a className="text-zinc-700 hover:text-sky-700" href={`#${s.id}`}>
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
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">{t("react_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("react_intro_bul1")}</li>
                                <li>{t("react_intro_bul2")}</li>
                                <li>{t("react_intro_bul3")}</li>
                                <li>{t("react_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("react_benefits_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("react_ben_speed"), t("react_ben_quality"), t("react_ben_scaling"), t("react_ben_support")].map((c, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <p className="text-zinc-700">{c}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("react_benefits_note")}</p>
                        </div>
                    </section>

                    {/* Tech stack */}
                    <section id="stack" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("react_stack_title")}</h2>
                            <p className="text-zinc-700 mb-3">{t("react_stack_p1")}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("react_stack_front"), t("react_stack_back"), t("react_stack_db"), t("react_stack_devops")].map((s) => (
                                    <div key={s} className="rounded-xl border p-4 text-sm">{s}</div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("react_stack_note")}</p>
                        </div>
                    </section>

                    {/* Core features */}
                    <section id="features" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("react_features_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {featureCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">{t(k)}</div>
                                ))}
                            </div>
                            <div className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700">
                                <p className="font-medium">{t("react_features_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("react_features_tip_1")}</li>
                                    <li>{t("react_features_tip_2")}</li>
                                    <li>{t("react_features_tip_3")}</li>
                                    <li>{t("react_features_tip_4")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Patterns */}
                    <section id="patterns" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("react_patterns_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {patternCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">{t(k)}</div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("react_patterns_note")}</p>
                        </div>
                    </section>

                    {/* Performance */}
                    <section id="performance" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("react_performance_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {perfCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">{t(k)}</div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("react_performance_note")}</p>
                        </div>
                    </section>

                    {/* Security */}
                    <section id="security" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("react_security_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("react_sec_csp")}</li>
                                <li>{t("react_sec_xss_csrf")}</li>
                                <li>{t("react_sec_deps")}</li>
                                <li>{t("react_sec_authz")}</li>
                                <li>{t("react_sec_logs")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("react_security_note")}</p>
                        </div>
                    </section>

                    {/* Testing */}
                    <section id="testing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("react_testing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("react_test_unit")}</li>
                                <li>{t("react_test_e2e")}</li>
                                <li>{t("react_test_access")}</li>
                                <li>{t("react_test_preview")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("react_testing_note")}</p>
                        </div>
                    </section>

                    {/* Tooling */}
                    <section id="tooling" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("react_tooling_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("react_tool_vite")}</li>
                                <li>{t("react_tool_tailwind")}</li>
                                <li>{t("react_tool_state")}</li>
                                <li>{t("react_tool_data")}</li>
                                <li>{t("react_tool_forms")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("react_tooling_note")}</p>
                        </div>
                    </section>

                    {/* SEO */}
                    <section id="seo" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("react_seo_title_block")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("react_seo_speed")}</li>
                                <li>{t("react_seo_schema")}</li>
                                <li>{t("react_seo_breadcrumbs")}</li>
                                <li>{t("react_seo_sitemap")}</li>
                                <li>{t("react_seo_meta")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("react_seo_note")}</p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("react_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("react_pricing_1")}</li>
                                <li>{t("react_pricing_2")}</li>
                                <li>{t("react_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("react_pricing_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("react_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("react_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("react_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("react_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("react_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("react_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("react_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-sky-600 to-indigo-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("react_cta_title")}</h2>
                            <p className="text-sky-50 mt-1">{t("react_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href={toLangHref("/contacts", lang)}
                                   className="inline-flex items-center rounded-xl bg-white text-sky-700 px-4 py-2 font-medium hover:bg-sky-50">
                                    {t("react_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.hash = "callback";
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("react_cta_btn_callback")}
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
                        serviceType: t("react_seo_headline"),
                        areaServed: ["MD", "RO", "UA"],
                        provider: {"@type": "Organization", name: tf("org_name", "Alex-Lab")},
                        inLanguage: "ru-RU"
                    }),
                }}
            />
        </main>
    );
}
