import {toLangHref, useI18n} from "../../../shared/i18n/i18n.tsx";
import SEO from "../../../shared/SEO.tsx";

/**
 * Страница: TypeScript в разработке
 * Маршрут: <Route path="/services/typescript" element={<TypeScriptDevPage />} />
 * Требует i18n-ключи ts_* (ru/ro словари ниже).
 */
export default function TypeScriptDevPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("ts_toc_intro")},
        {id: "benefits", title: t("ts_toc_benefits")},
        {id: "stack", title: t("ts_toc_stack")},
        {id: "patterns", title: t("ts_toc_patterns")},
        {id: "tooling", title: t("ts_toc_tooling")},
        {id: "types", title: t("ts_toc_types")},
        {id: "testing", title: t("ts_toc_testing")},
        {id: "performance", title: t("ts_toc_performance")},
        {id: "security", title: t("ts_toc_security")},
        {id: "migration", title: t("ts_toc_migration")},
        {id: "pricing", title: t("ts_toc_pricing")},
        {id: "faq", title: t("ts_toc_faq")},
    ];

    const patternCards = [
        "ts_pat_result",
        "ts_pat_discriminated",
        "ts_pat_generics",
        "ts_pat_narrowing",
        "ts_pat_exhaustive",
        "ts_pat_ioc",
        "ts_pat_dto",
        "ts_pat_moduleboundaries",
    ];

    const typeBlocks = [
        "ts_types_branded",
        "ts_types_readonly",
        "ts_types_template",
        "ts_types_utility",
        "ts_types_zod",
        "ts_types_never",
    ];

    const tooling = [
        "ts_tool_eslint",
        "ts_tool_prettier",
        "ts_tool_projectrefs",
        "ts_tool_tsup",
        "ts_tool_vitest",
        "ts_tool_playwright",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            <SEO titleKey="ts_title" descriptionKey="ts_intro" pathname="/dev/typescript" />
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-indigo-700 font-semibold">
                    {t("ts_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("ts_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("ts_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("ts_toc_title", {defaultValue: "Содержание"})}
                        </h2>
                        <ul className="space-y-2 text-sm">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <a className="text-zinc-700 hover:text-indigo-700" href={`#${s.id}`}>
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
                            <h2 className="text-xl font-semibold mb-3">{t("ts_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("ts_intro_bul1")}</li>
                                <li>{t("ts_intro_bul2")}</li>
                                <li>{t("ts_intro_bul3")}</li>
                                <li>{t("ts_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("ts_benefits_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("ts_ben_bugs"), t("ts_ben_refactor"), t("ts_ben_docs"), t("ts_ben_speed")].map((c, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <p className="text-zinc-700">{c}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("ts_benefits_note")}</p>
                        </div>
                    </section>

                    {/* Tech stack */}
                    <section id="stack" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("ts_stack_title")}</h2>
                            <p className="text-zinc-700 mb-3">{t("ts_stack_p1")}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("ts_stack_front"), t("ts_stack_back"), t("ts_stack_types"), t("ts_stack_ci")].map((s) => (
                                    <div key={s} className="rounded-xl border p-4 text-sm">{s}</div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("ts_stack_note")}</p>
                        </div>
                    </section>

                    {/* Patterns */}
                    <section id="patterns" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("ts_patterns_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {patternCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">{t(k)}</div>
                                ))}
                            </div>
                            <div className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700">
                                <p className="font-medium">{t("ts_patterns_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("ts_patterns_tip_1")}</li>
                                    <li>{t("ts_patterns_tip_2")}</li>
                                    <li>{t("ts_patterns_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Tooling */}
                    <section id="tooling" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("ts_tooling_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {tooling.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">{t(k)}</div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("ts_tooling_note")}</p>
                        </div>
                    </section>

                    {/* Types */}
                    <section id="types" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("ts_types_title")}</h2>
                            <p className="text-zinc-700 mb-3">{t("ts_types_p1")}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {typeBlocks.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">{t(k)}</div>
                                ))}
                            </div>
                            <pre
                                className="mt-4 overflow-x-auto rounded-xl bg-zinc-900 text-zinc-50 p-4 text-xs leading-relaxed">
{`type Result<T> = { ok: true; data: T } | { ok: false; error: string }\n\nfunction parseJson<T>(raw: string): Result<T> {\n  try {\n    return { ok: true, data: JSON.parse(raw) as T };\n  } catch (e) {\n    return { ok: false, error: (e as Error).message };\n  }\n}`}              </pre>
                            <p className="text-sm text-zinc-600 mt-2">{t("ts_types_code_hint")}</p>
                        </div>
                    </section>

                    {/* Testing */}
                    <section id="testing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("ts_testing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("ts_testing_unit")}</li>
                                <li>{t("ts_testing_integration")}</li>
                                <li>{t("ts_testing_e2e")}</li>
                                <li>{t("ts_testing_coverage")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("ts_testing_note")}</p>
                        </div>
                    </section>

                    {/* Performance */}
                    <section id="performance" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("ts_performance_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("ts_perf_cdn"), t("ts_perf_cache"), t("ts_perf_images"), t("ts_perf_build")].map((p) => (
                                    <div key={p} className="rounded-xl border p-4 text-sm">{p}</div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("ts_performance_note")}</p>
                        </div>
                    </section>

                    {/* Security */}
                    <section id="security" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("ts_security_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("ts_sec_types")}</li>
                                <li>{t("ts_sec_jwt")}</li>
                                <li>{t("ts_sec_rate")}</li>
                                <li>{t("ts_sec_logs")}</li>
                                <li>{t("ts_sec_secrets")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("ts_security_note")}</p>
                        </div>
                    </section>

                    {/* Migration */}
                    <section id="migration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("ts_migration_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("ts_migration_from_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                        <li>{t("ts_migration_from_1")}</li>
                                        <li>{t("ts_migration_from_2")}</li>
                                        <li>{t("ts_migration_from_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("ts_migration_process_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                        <li>{t("ts_migration_proc_1")}</li>
                                        <li>{t("ts_migration_proc_2")}</li>
                                        <li>{t("ts_migration_proc_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("ts_migration_note")}</p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("ts_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("ts_pricing_1")}</li>
                                <li>{t("ts_pricing_2")}</li>
                                <li>{t("ts_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("ts_pricing_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("ts_toc_faq")}</h2>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <details key={i} className="group rounded-xl border p-4">
                                        <summary
                                            className="cursor-pointer font-medium flex items-center justify-between">
                                            {t(`ts_faq_q${i}` as const)}
                                            <span
                                                className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                        </summary>
                                        <p className="mt-2 text-zinc-700">{t(`ts_faq_a${i}` as const)}</p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-indigo-600 to-blue-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("ts_cta_title")}</h2>
                            <p className="text-indigo-50 mt-1">{t("ts_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href={toLangHref("/contacts", lang)}
                                   className="inline-flex items-center rounded-xl bg-white text-indigo-700 px-4 py-2 font-medium hover:bg-indigo-50">
                                    {t("ts_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.hash = "callback";
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("ts_cta_btn_callback")}
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
                        serviceType: t("ts_seo_headline"),
                        areaServed: ["MD", "RO", "UA"],
                        offers: {
                            "@type": "Offer",
                            priceSpecification: {"@type": "PriceSpecification", priceCurrency: "MDL"},
                        },
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}

