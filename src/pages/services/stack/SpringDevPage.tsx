/**
 * Страница: Spring разработка (Backend на Java 17/21, Spring Boot 3.5+)
 * Маршрут: <Route path="/services/spring" element={<SpringDevPage />} />
 * Требует i18n-ключи spring_* (ru/ro словари).
 */
import {toLangHref, useI18n} from "../../../shared/i18n/i18n.tsx";


export default function SpringDevPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("spring_toc_intro")},
        {id: "benefits", title: t("spring_toc_benefits")},
        {id: "arch", title: t("spring_toc_arch")},
        {id: "modules", title: t("spring_toc_modules")},
        {id: "security", title: t("spring_toc_security")},
        {id: "data", title: t("spring_toc_data")},
        {id: "integration", title: t("spring_toc_integration")},
        {id: "testing", title: t("spring_toc_testing")},
        {id: "devops", title: t("spring_toc_devops")},
        {id: "performance", title: t("spring_toc_performance")},
        {id: "observability", title: t("spring_toc_observability")},
        {id: "migration", title: t("spring_toc_migration")},
        {id: "pricing", title: t("spring_toc_pricing")},
        {id: "faq", title: t("spring_toc_faq")},
    ];

    const moduleCards = [
        "spring_mod_web",
        "spring_mod_security",
        "spring_mod_data",
        "spring_mod_cloud",
        "spring_mod_batch",
        "spring_mod_integration",
    ];

    const dataBullets = [
        "spring_data_jpa",
        "spring_data_querydsl",
        "spring_data_flyway",
        "spring_data_cache",
        "spring_data_jsonb",
        "spring_data_multitenancy",
    ];

    const integrationCards = [
        "spring_int_rest",
        "spring_int_graphql",
        "spring_int_kafka",
        "spring_int_rabbit",
        "spring_int_s3",
        "spring_int_payment_webhooks",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("spring_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("spring_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("spring_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("spring_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("spring_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spring_intro_bul1")}</li>
                                <li>{t("spring_intro_bul2")}</li>
                                <li>{t("spring_intro_bul3")}</li>
                                <li>{t("spring_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spring_benefits_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("spring_ben_speed"), t("spring_ben_reliability"), t("spring_ben_scaling"), t("spring_ben_security")].map(
                                    (c, i) => (
                                        <div key={i} className="rounded-xl border p-4">
                                            <p className="text-zinc-700 dark:!text-white">{c}</p>
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("spring_benefits_note")}</p>
                        </div>
                    </section>

                    {/* Architecture */}
                    <section id="arch" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spring_arch_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("spring_arch_p1")}</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("spring_arch_layer")}</th>
                                        <th className="text-left p-3">{t("spring_arch_responsibility")}</th>
                                        <th className="text-left p-3">{t("spring_arch_notes")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {[
                                        {
                                            l: t("spring_arch_api"),
                                            r: t("spring_arch_api_resp"),
                                            n: t("spring_arch_api_note"),
                                        },
                                        {
                                            l: t("spring_arch_service"),
                                            r: t("spring_arch_service_resp"),
                                            n: t("spring_arch_service_note"),
                                        },
                                        {
                                            l: t("spring_arch_repo"),
                                            r: t("spring_arch_repo_resp"),
                                            n: t("spring_arch_repo_note"),
                                        },
                                        {
                                            l: t("spring_arch_infra"),
                                            r: t("spring_arch_infra_resp"),
                                            n: t("spring_arch_infra_note"),
                                        },
                                    ].map((row, i) => (
                                        <tr key={i}>
                                            <td className="p-3">{row.l}</td>
                                            <td className="p-3">{row.r}</td>
                                            <td className="p-3">{row.n}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("spring_arch_tip")}</p>
                        </div>
                    </section>

                    {/* Modules */}
                    <section id="modules" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spring_modules_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {moduleCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("spring_modules_note")}</p>
                        </div>
                    </section>

                    {/* Security */}
                    <section id="security" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spring_security_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spring_sec_auth")}</li>
                                <li>{t("spring_sec_jwt")}</li>
                                <li>{t("spring_sec_opa")}</li>
                                <li>{t("spring_sec_rate")}</li>
                                <li>{t("spring_sec_logs")}</li>
                                <li>{t("spring_sec_compliance")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spring_security_note")}</p>
                        </div>
                    </section>

                    {/* Data */}
                    <section id="data" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spring_data_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                {dataBullets.map((k) => (
                                    <li key={k}>{t(k)}</li>
                                ))}
                            </ul>
                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("spring_data_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("spring_data_tip_1")}</li>
                                    <li>{t("spring_data_tip_2")}</li>
                                    <li>{t("spring_data_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Integration */}
                    <section id="integration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spring_integration_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {integrationCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("spring_integration_note")}</p>
                        </div>
                    </section>

                    {/* Testing */}
                    <section id="testing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spring_testing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spring_test_unit")}</li>
                                <li>{t("spring_test_integration")}</li>
                                <li>{t("spring_test_contract")}</li>
                                <li>{t("spring_test_e2e")}</li>
                                <li>{t("spring_test_ci")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spring_testing_note")}</p>
                        </div>
                    </section>

                    {/* DevOps */}
                    <section id="devops" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spring_devops_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("spring_devops_p1")}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("spring_devops_ci"), t("spring_devops_cd"), t("spring_devops_containers"), t("spring_devops_ops")].map(
                                    (s) => (
                                        <div key={s} className="rounded-xl border p-4 text-sm">
                                            {s}
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("spring_devops_note")}</p>
                        </div>
                    </section>

                    {/* Performance */}
                    <section id="performance" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spring_performance_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("spring_perf_threads"), t("spring_perf_db"), t("spring_perf_cache"), t("spring_perf_async")].map(
                                    (p) => (
                                        <div key={p} className="rounded-xl border p-4 text-sm">
                                            {p}
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("spring_performance_note")}</p>
                        </div>
                    </section>

                    {/* Observability */}
                    <section id="observability" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spring_observ_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spring_observ_metrics")}</li>
                                <li>{t("spring_observ_tracing")}</li>
                                <li>{t("spring_observ_logs")}</li>
                                <li>{t("spring_observ_health")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spring_observ_note")}</p>
                        </div>
                    </section>

                    {/* Migration */}
                    <section id="migration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spring_migration_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("spring_migration_from_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("spring_migration_from_1")}</li>
                                        <li>{t("spring_migration_from_2")}</li>
                                        <li>{t("spring_migration_from_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("spring_migration_process_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("spring_migration_proc_1")}</li>
                                        <li>{t("spring_migration_proc_2")}</li>
                                        <li>{t("spring_migration_proc_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("spring_migration_note")}</p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:!bg-zinc-700 p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("spring_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spring_pricing_1")}</li>
                                <li>{t("spring_pricing_2")}</li>
                                <li>{t("spring_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spring_pricing_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spring_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("spring_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("spring_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("spring_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("spring_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("spring_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("spring_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm dark:!text-white text-white">
                            <h2 className="text-xl font-semibold">{t("spring_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("spring_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href={toLangHref("/contacts", lang)}
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("spring_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("spring_cta_btn_callback")}
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
                        serviceType: t("spring_seo_headline"),
                        areaServed: ["MD", "RO", "UA"],
                        provider: {
                            "@type": "Organization",
                            name: "Alex-Lab",
                        },
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
