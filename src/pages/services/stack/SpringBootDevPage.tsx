/**
 * Страница: Spring Boot разработка
 * Маршрут: <Route path="/services/spring-boot" element={<SpringBootDevPage />} />
 * Требует i18n-ключи springboot_* (ru/ro словари).
 */
import {toLangHref, useI18n} from "../../../shared/i18n/i18n.tsx";


export default function SpringBootDevPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("springboot_toc_intro")},
        {id: "benefits", title: t("springboot_toc_benefits")},
        {id: "stack", title: t("springboot_toc_stack")},
        {id: "architecture", title: t("springboot_toc_architecture")},
        {id: "features", title: t("springboot_toc_features")},
        {id: "data", title: t("springboot_toc_data")},
        {id: "security", title: t("springboot_toc_security")},
        {id: "testing", title: t("springboot_toc_testing")},
        {id: "integrations", title: t("springboot_toc_integrations")},
        {id: "deployment", title: t("springboot_toc_deployment")},
        {id: "monitoring", title: t("springboot_toc_monitoring")},
        {id: "migration", title: t("springboot_toc_migration")},
        {id: "pricing", title: t("springboot_toc_pricing")},
        {id: "faq", title: t("springboot_toc_faq")},
    ];

    const featureCards = [
        "springboot_feat_rest",
        "springboot_feat_graphql",
        "springboot_feat_websocket",
        "springboot_feat_scheduling",
        "springboot_feat_batch",
        "springboot_feat_cache",
        "springboot_feat_files",
        "springboot_feat_docs",
    ];

    const integrationCards = [
        "springboot_int_payment",
        "springboot_int_crm",
        "springboot_int_erp",
        "springboot_int_mq",
        "springboot_int_search",
        "springboot_int_analytics",
    ];

    const securityBullets = [
        "springboot_sec_auth",
        "springboot_sec_jwt",
        "springboot_sec_roles",
        "springboot_sec_rate",
        "springboot_sec_audit",
        "springboot_sec_headers",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("springboot_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("springboot_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("springboot_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("springboot_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("springboot_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("springboot_intro_bul1")}</li>
                                <li>{t("springboot_intro_bul2")}</li>
                                <li>{t("springboot_intro_bul3")}</li>
                                <li>{t("springboot_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("springboot_benefits_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("springboot_ben_speed"), t("springboot_ben_scaling"), t("springboot_ben_reliability"), t("springboot_ben_costs")].map(
                                    (c, i) => (
                                        <div key={i} className="rounded-xl border p-4">
                                            <p className="text-zinc-700 dark:!text-white">{c}</p>
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("springboot_benefits_note")}</p>
                        </div>
                    </section>

                    {/* Tech stack */}
                    <section id="stack" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("springboot_stack_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("springboot_stack_p1")}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("springboot_stack_java"), t("springboot_stack_spring"), t("springboot_stack_db"), t("springboot_stack_devops")].map(
                                    (s) => (
                                        <div key={s} className="rounded-xl border p-4 text-sm">
                                            {s}
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("springboot_stack_note")}</p>
                        </div>
                    </section>

                    {/* Architecture */}
                    <section id="architecture" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("springboot_arch_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("springboot_arch_monolith")}</li>
                                <li>{t("springboot_arch_modular")}</li>
                                <li>{t("springboot_arch_microservices")}</li>
                                <li>{t("springboot_arch_hexagonal")}</li>
                            </ul>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("springboot_arch_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("springboot_arch_tip_1")}</li>
                                    <li>{t("springboot_arch_tip_2")}</li>
                                    <li>{t("springboot_arch_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Features */}
                    <section id="features" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("springboot_features_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {featureCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("springboot_features_note")}</p>
                        </div>
                    </section>

                    {/* Data & Persistence */}
                    <section id="data" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("springboot_data_title")}</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("springboot_tbl_topic")}</th>
                                        <th className="text-left p-3">{t("springboot_tbl_tools")}</th>
                                        <th className="text-left p-3">{t("springboot_tbl_note")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {[
                                        {
                                            f: t("springboot_tbl_rel_db"),
                                            ex: "PostgreSQL, MySQL, Flyway/Liquibase",
                                            n: t("springboot_tbl_rel_note"),
                                        },
                                        {
                                            f: t("springboot_tbl_nosql"),
                                            ex: "MongoDB, Redis",
                                            n: t("springboot_tbl_nosql_note"),
                                        },
                                        {
                                            f: t("springboot_tbl_jpa"),
                                            ex: "Spring Data JPA, Querydsl",
                                            n: t("springboot_tbl_jpa_note"),
                                        },
                                        {
                                            f: t("springboot_tbl_migrations"),
                                            ex: "Liquibase/Flyway",
                                            n: t("springboot_tbl_migrations_note"),
                                        },
                                        {
                                            f: t("springboot_tbl_storage"),
                                            ex: "S3/MinIO",
                                            n: t("springboot_tbl_storage_note"),
                                        },
                                    ].map((r, i) => (
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
                                <p className="font-medium">{t("springboot_data_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("springboot_data_tip_1")}</li>
                                    <li>{t("springboot_data_tip_2")}</li>
                                    <li>{t("springboot_data_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Security */}
                    <section id="security" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("springboot_security_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                {securityBullets.map((k) => (
                                    <li key={k}>{t(k)}</li>
                                ))}
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("springboot_security_note")}</p>
                        </div>
                    </section>

                    {/* Testing */}
                    <section id="testing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("springboot_testing_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("springboot_test_unit"), t("springboot_test_integration"), t("springboot_test_contract"), t("springboot_test_e2e")].map(
                                    (p) => (
                                        <div key={p} className="rounded-xl border p-4 text-sm">
                                            {p}
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("springboot_testing_note")}</p>
                        </div>
                    </section>

                    {/* Integrations */}
                    <section id="integrations" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("springboot_integrations_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {integrationCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("springboot_integrations_note")}</p>
                        </div>
                    </section>

                    {/* Deployment */}
                    <section id="deployment" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("springboot_deploy_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("springboot_deploy_container")}</li>
                                <li>{t("springboot_deploy_ci")}</li>
                                <li>{t("springboot_deploy_scaling")}</li>
                                <li>{t("springboot_deploy_bluegreen")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("springboot_deploy_note")}</p>
                        </div>
                    </section>

                    {/* Monitoring */}
                    <section id="monitoring" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("springboot_monitor_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("springboot_monitor_metrics"), t("springboot_monitor_logs"), t("springboot_monitor_tracing"), t("springboot_monitor_alerting")].map(
                                    (p) => (
                                        <div key={p} className="rounded-xl border p-4 text-sm">
                                            {p}
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("springboot_monitor_note")}</p>
                        </div>
                    </section>

                    {/* Migration */}
                    <section id="migration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("springboot_migration_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("springboot_migration_from_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("springboot_migration_from_1")}</li>
                                        <li>{t("springboot_migration_from_2")}</li>
                                        <li>{t("springboot_migration_from_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("springboot_migration_process_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("springboot_migration_proc_1")}</li>
                                        <li>{t("springboot_migration_proc_2")}</li>
                                        <li>{t("springboot_migration_proc_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("springboot_migration_note")}</p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:!bg-zinc-700 p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springboot_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("springboot_pricing_1")}</li>
                                <li>{t("springboot_pricing_2")}</li>
                                <li>{t("springboot_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("springboot_pricing_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("springboot_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("springboot_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("springboot_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("springboot_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("springboot_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("springboot_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("springboot_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm dark:!text-white text-white">
                            <h2 className="text-xl font-semibold">{t("springboot_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("springboot_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href={toLangHref("/contacts", lang)}
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("springboot_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("springboot_cta_btn_callback")}
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
                        serviceType: t("springboot_seo_headline"),
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
