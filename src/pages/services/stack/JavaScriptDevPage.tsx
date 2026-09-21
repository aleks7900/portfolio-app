/**
 * Страница: JavaScript в разработке
 * Маршрут: <Route path="/services/javascript" element={<JavaScriptDevPage />} />
 * Требует i18n-ключи js_* (ru/ro словари).
 */
import {toLangHref, useI18n} from "../../../shared/i18n/i18n.tsx";


export default function JavaScriptDevPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("js_toc_intro")},
        {id: "why", title: t("js_toc_why")},
        {id: "paradigms", title: t("js_toc_paradigms")},
        {id: "frontend", title: t("js_toc_frontend")},
        {id: "backend", title: t("js_toc_backend")},
        {id: "tooling", title: t("js_toc_tooling")},
        {id: "quality", title: t("js_toc_quality")},
        {id: "performance", title: t("js_toc_performance")},
        {id: "security", title: t("js_toc_security")},
        {id: "patterns", title: t("js_toc_patterns")},
        {id: "faq", title: t("js_toc_faq")},
    ];

    const patternCards = [
        "js_pat_modularity",
        "js_pat_state",
        "js_pat_async",
        "js_pat_api",
        "js_pat_i18n",
        "js_pat_accessibility",
    ];

    const toolingCards = [
        "js_tool_ts",
        "js_tool_vite",
        "js_tool_testing",
        "js_tool_lint",
        "js_tool_ci",
        "js_tool_docs",
    ];

    const qualityBullets = [
        "js_quality_tests",
        "js_quality_types",
        "js_quality_review",
        "js_quality_metrics",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("js_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("js_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("js_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("js_toc_title", {defaultValue: "Содержание"})}
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
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">{t("js_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("js_intro_bul1")}</li>
                                <li>{t("js_intro_bul2")}</li>
                                <li>{t("js_intro_bul3")}</li>
                                <li>{t("js_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Why JS */}
                    <section id="why" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("js_why_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("js_why_speed"), t("js_why_scope"), t("js_why_ux"), t("js_why_community")].map((c, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <p className="text-zinc-700">{c}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("js_why_note")}</p>
                        </div>
                    </section>

                    {/* Paradigms */}
                    <section id="paradigms" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("js_paradigms_title")}</h2>
                            <p className="text-zinc-700 mb-3">{t("js_paradigms_p1")}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("js_paradigms_fp"), t("js_paradigms_oop"), t("js_paradigms_reactive"), t("js_paradigms_isomorphic")].map((s) => (
                                    <div key={s} className="rounded-xl border p-4 text-sm">
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Frontend */}
                    <section id="frontend" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("js_frontend_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("js_frontend_spa")}</li>
                                <li>{t("js_frontend_pwa")}</li>
                                <li>{t("js_frontend_ssg")}</li>
                                <li>{t("js_frontend_access")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("js_frontend_note")}</p>
                        </div>
                    </section>

                    {/* Backend */}
                    <section id="backend" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("js_backend_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("js_backend_node")}</li>
                                <li>{t("js_backend_api")}</li>
                                <li>{t("js_backend_workers")}</li>
                                <li>{t("js_backend_streams")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("js_backend_note")}</p>
                        </div>
                    </section>

                    {/* Tooling */}
                    <section id="tooling" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("js_tooling_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {toolingCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700">
                                <p className="font-medium">{t("js_tooling_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("js_tooling_tip_1")}</li>
                                    <li>{t("js_tooling_tip_2")}</li>
                                    <li>{t("js_tooling_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Quality */}
                    <section id="quality" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("js_quality_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                {qualityBullets.map((k) => <li key={k}>{t(k)}</li>)}
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("js_quality_note")}</p>
                        </div>
                    </section>

                    {/* Performance */}
                    <section id="performance" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("js_performance_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("js_perf_cdn"), t("js_perf_cache"), t("js_perf_images"), t("js_perf_streaming")].map((p) => (
                                    <div key={p} className="rounded-xl border p-4 text-sm">
                                        {p}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("js_performance_note")}</p>
                        </div>
                    </section>

                    {/* Security */}
                    <section id="security" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("js_security_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("js_sec_https")}</li>
                                <li>{t("js_sec_cors")}</li>
                                <li>{t("js_sec_rate")}</li>
                                <li>{t("js_sec_logs")}</li>
                                <li>{t("js_sec_deps")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("js_security_note")}</p>
                        </div>
                    </section>

                    {/* Patterns */}
                    <section id="patterns" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("js_patterns_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {patternCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("js_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("js_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("js_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("js_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("js_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("js_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("js_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("js_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("js_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href={toLangHref("/contacts", lang)}
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("js_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.hash = "callback";
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("js_cta_btn_callback")}
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
                        serviceType: t("seo_js_headline"),
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
