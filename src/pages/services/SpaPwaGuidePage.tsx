import {useI18n} from "../../shared/i18n/i18n.tsx";


/**
 * Страница: Гид по разработке SPA/PWA на React + Spring
 * Маршрут (пример): <Route path="/guides/spa-pwa" element={<SpaPwaGuidePage />} />
 * Требуются ключи i18n: spaguide_* (ru/ro словари ниже)
 */
export default function SpaPwaGuidePage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("spaguide_toc_intro")},
        {id: "concepts", title: t("spaguide_toc_concepts")},
        {id: "architecture", title: t("spaguide_toc_architecture")},
        {id: "stack", title: t("spaguide_toc_stack")},
        {id: "routing", title: t("spaguide_toc_routing")},
        {id: "state", title: t("spaguide_toc_state")},
        {id: "forms", title: t("spaguide_toc_forms")},
        {id: "auth", title: t("spaguide_toc_auth")},
        {id: "api", title: t("spaguide_toc_api")},
        {id: "caching", title: t("spaguide_toc_caching")},
        {id: "pwa", title: t("spaguide_toc_pwa")},
        {id: "performance", title: t("spaguide_toc_performance")},
        {id: "testing", title: t("spaguide_toc_testing")},
        {id: "cicd", title: t("spaguide_toc_cicd")},
        {id: "security", title: t("spaguide_toc_security")},
        {id: "i18n", title: t("spaguide_toc_i18n")},
        {id: "seo", title: t("spaguide_toc_seo")},
        {id: "a11y", title: t("spaguide_toc_a11y")},
        {id: "analytics", title: t("spaguide_toc_analytics")},
        {id: "monitoring", title: t("spaguide_toc_monitoring")},
        {id: "deployment", title: t("spaguide_toc_deployment")},
        {id: "faq", title: t("spaguide_toc_faq")},
    ];

    const perfCards = [
        "spaguide_perf_code_split",
        "spaguide_perf_images",
        "spaguide_perf_cache",
        "spaguide_perf_streaming",
        "spaguide_perf_lazy",
        "spaguide_perf_bundle",
    ];

    const apiBullets = [
        "spaguide_api_rest",
        "spaguide_api_openapi",
        "spaguide_api_validation",
        "spaguide_api_errors",
        "spaguide_api_rate",
        "spaguide_api_observability",
    ];

    const securityBullets = [
        "spaguide_sec_https",
        "spaguide_sec_cors",
        "spaguide_sec_csrf",
        "spaguide_sec_jwt",
        "spaguide_sec_owasp",
        "spaguide_sec_logs",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("spaguide_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("spaguide_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("spaguide_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("spaguide_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("spaguide_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spaguide_intro_bul1")}</li>
                                <li>{t("spaguide_intro_bul2")}</li>
                                <li>{t("spaguide_intro_bul3")}</li>
                                <li>{t("spaguide_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Concepts */}
                    <section id="concepts" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spaguide_concepts_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                <div className="rounded-xl border p-4">{t("spaguide_concept_spa")}</div>
                                <div className="rounded-xl border p-4">{t("spaguide_concept_pwa")}</div>
                                <div className="rounded-xl border p-4">{t("spaguide_concept_ssr")}</div>
                                <div className="rounded-xl border p-4">{t("spaguide_concept_isr")}</div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_concepts_note")}</p>
                        </div>
                    </section>

                    {/* Architecture */}
                    <section id="architecture" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spaguide_arch_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4 text-sm">
                                    <h3 className="font-medium mb-1">{t("spaguide_arch_front_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>{t("spaguide_arch_front_router")}</li>
                                        <li>{t("spaguide_arch_front_state")}</li>
                                        <li>{t("spaguide_arch_front_forms")}</li>
                                        <li>{t("spaguide_arch_front_query")}</li>
                                    </ul>
                                </div>
                                <div className="rounded-xl border p-4 text-sm">
                                    <h3 className="font-medium mb-1">{t("spaguide_arch_back_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>{t("spaguide_arch_back_spring")}</li>
                                        <li>{t("spaguide_arch_back_security")}</li>
                                        <li>{t("spaguide_arch_back_docs")}</li>
                                        <li>{t("spaguide_arch_back_db")}</li>
                                    </ul>
                                </div>
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("spaguide_arch_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("spaguide_arch_tip_1")}</li>
                                    <li>{t("spaguide_arch_tip_2")}</li>
                                    <li>{t("spaguide_arch_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Stack */}
                    <section id="stack" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spaguide_stack_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("spaguide_stack_p1")}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4 text-sm">{t("spaguide_stack_front")}</div>
                                <div className="rounded-xl border p-4 text-sm">{t("spaguide_stack_back")}</div>
                                <div className="rounded-xl border p-4 text-sm">{t("spaguide_stack_db")}</div>
                                <div className="rounded-xl border p-4 text-sm">{t("spaguide_stack_devops")}</div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_stack_note")}</p>
                        </div>
                    </section>

                    {/* Routing */}
                    <section id="routing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("spaguide_routing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spaguide_routing_nested")}</li>
                                <li>{t("spaguide_routing_loader")}</li>
                                <li>{t("spaguide_routing_error")}</li>
                                <li>{t("spaguide_routing_access")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_routing_note")}</p>
                        </div>
                    </section>

                    {/* State */}
                    <section id="state" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("spaguide_state_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spaguide_state_local")}</li>
                                <li>{t("spaguide_state_global")}</li>
                                <li>{t("spaguide_state_server")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_state_note")}</p>
                        </div>
                    </section>

                    {/* Forms */}
                    <section id="forms" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("spaguide_forms_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spaguide_forms_validation")}</li>
                                <li>{t("spaguide_forms_mask")}</li>
                                <li>{t("spaguide_forms_accessibility")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_forms_note")}</p>
                        </div>
                    </section>

                    {/* Auth */}
                    <section id="auth" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("spaguide_auth_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spaguide_auth_flow")}</li>
                                <li>{t("spaguide_auth_refresh")}</li>
                                <li>{t("spaguide_auth_roles")}</li>
                                <li>{t("spaguide_auth_storage")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_auth_note")}</p>
                        </div>
                    </section>

                    {/* API */}
                    <section id="api" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spaguide_api_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                {apiBullets.map((k) => (
                                    <li key={k}>{t(k)}</li>
                                ))}
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_api_note")}</p>
                        </div>
                    </section>

                    {/* Caching */}
                    <section id="caching" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("spaguide_caching_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spaguide_cache_rq")}</li>
                                <li>{t("spaguide_cache_sw")}</li>
                                <li>{t("spaguide_cache_headers")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_caching_note")}</p>
                        </div>
                    </section>

                    {/* PWA */}
                    <section id="pwa" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spaguide_pwa_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                <div className="rounded-xl border p-4">{t("spaguide_pwa_manifest")}</div>
                                <div className="rounded-xl border p-4">{t("spaguide_pwa_serviceworker")}</div>
                                <div className="rounded-xl border p-4">{t("spaguide_pwa_offline")}</div>
                                <div className="rounded-xl border p-4">{t("spaguide_pwa_push")}</div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_pwa_note")}</p>
                        </div>
                    </section>

                    {/* Performance */}
                    <section id="performance" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spaguide_performance_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {perfCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_performance_note")}</p>
                        </div>
                    </section>

                    {/* Testing */}
                    <section id="testing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("spaguide_testing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spaguide_test_unit")}</li>
                                <li>{t("spaguide_test_integration")}</li>
                                <li>{t("spaguide_test_e2e")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_testing_note")}</p>
                        </div>
                    </section>

                    {/* CI/CD */}
                    <section id="cicd" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("spaguide_cicd_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spaguide_cicd_build")}</li>
                                <li>{t("spaguide_cicd_quality")}</li>
                                <li>{t("spaguide_cicd_deploy")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_cicd_note")}</p>
                        </div>
                    </section>

                    {/* Security */}
                    <section id="security" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spaguide_security_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                {securityBullets.map((k) => (
                                    <li key={k}>{t(k)}</li>
                                ))}
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_security_note")}</p>
                        </div>
                    </section>

                    {/* i18n */}
                    <section id="i18n" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("spaguide_i18n_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spaguide_i18n_struct")}</li>
                                <li>{t("spaguide_i18n_interpolation")}</li>
                                <li>{t("spaguide_i18n_seo")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_i18n_note")}</p>
                        </div>
                    </section>

                    {/* SEO */}
                    <section id="seo" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("spaguide_seo_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spaguide_seo_meta")}</li>
                                <li>{t("spaguide_seo_schema")}</li>
                                <li>{t("spaguide_seo_breadcrumbs")}</li>
                                <li>{t("spaguide_seo_sitemap")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_seo_note")}</p>
                        </div>
                    </section>

                    {/* Accessibility */}
                    <section id="a11y" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("spaguide_a11y_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spaguide_a11y_keyboard")}</li>
                                <li>{t("spaguide_a11y_aria")}</li>
                                <li>{t("spaguide_a11y_contrast")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_a11y_note")}</p>
                        </div>
                    </section>

                    {/* Analytics */}
                    <section id="analytics" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("spaguide_analytics_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spaguide_analytics_events")}</li>
                                <li>{t("spaguide_analytics_funnels")}</li>
                                <li>{t("spaguide_analytics_heatmaps")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_analytics_note")}</p>
                        </div>
                    </section>

                    {/* Monitoring */}
                    <section id="monitoring" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("spaguide_monitoring_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spaguide_monitoring_logs")}</li>
                                <li>{t("spaguide_monitoring_metrics")}</li>
                                <li>{t("spaguide_monitoring_traces")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_monitoring_note")}</p>
                        </div>
                    </section>

                    {/* Deployment */}
                    <section id="deployment" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("spaguide_deploy_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spaguide_deploy_container")}</li>
                                <li>{t("spaguide_deploy_nginx")}</li>
                                <li>{t("spaguide_deploy_cdn")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spaguide_deploy_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spaguide_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("spaguide_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("spaguide_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("spaguide_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("spaguide_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("spaguide_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("spaguide_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("spaguide_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("spaguide_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="/contacts"
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("spaguide_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("spaguide_cta_btn_callback")}
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
                        headline: t("spaguide_seo_headline"),
                        about: ["SPA", "PWA", "React", "Spring Boot"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}