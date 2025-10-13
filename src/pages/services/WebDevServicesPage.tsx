import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Разработка сайтов и веб‑приложений
 * Маршрут: <Route path="/services/web-dev" element={<WebDevServicesPage />} />
 * Требует i18n‑ключи web_* (ru/ro словари).
 */

export default function WebDevServicesPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("web_toc_intro")},
        {id: "capabilities", title: t("web_toc_capabilities")},
        {id: "stack", title: t("web_toc_stack")},
        {id: "workflow", title: t("web_toc_workflow")},
        {id: "security", title: t("web_toc_security")},
        {id: "requirements", title: t("web_toc_requirements")},
        {id: "pricing", title: t("web_toc_pricing")},
        {id: "faq", title: t("web_toc_faq")},
    ];

    const capabilities = [
        t("web_cap_sites"),
        t("web_cap_spa_pwa"),
        t("web_cap_ecommerce"),
        t("web_cap_integrations"),
        t("web_cap_speed"),
        t("web_cap_seo"),
    ];

    const workflow = [
        {k: "web_flow_discovery", v: t("web_flow_discovery")},
        {k: "web_flow_prototype", v: t("web_flow_prototype")},
        {k: "web_flow_development", v: t("web_flow_development")},
        {k: "web_flow_testing", v: t("web_flow_testing")},
        {k: "web_flow_deploy", v: t("web_flow_deploy")},
        {k: "web_flow_support", v: t("web_flow_support")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("web_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("web_title_t")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("web_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("web_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("web_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("web_intro_bul1")}</li>
                                <li>{t("web_intro_bul2")}</li>
                                <li>{t("web_intro_bul3")}</li>
                                <li>{t("web_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Capabilities */}
                    <section id="capabilities" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("web_capabilities_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {capabilities.map((c, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <p className="text-zinc-700 dark:!text-white">{c}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("web_cap_note")}</p>
                        </div>
                    </section>

                    {/* Tech Stack */}
                    <section id="stack" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("web_stack_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-4">{t("web_stack_p1")}</p>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("web_tbl_layer")}</th>
                                        <th className="text-left p-3">{t("web_tbl_tech")}</th>
                                        <th className="text-left p-3">{t("web_tbl_notes")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {[
                                        {
                                            layer: t("web_tbl_frontend"),
                                            tech: "React 19, Vite, TypeScript, Tailwind CSS v4",
                                            note: t("web_tbl_fe_note")
                                        },
                                        {
                                            layer: t("web_tbl_backend"),
                                            tech: "Spring Boot 3.x, Java 17/21, REST, WebSocket",
                                            note: t("web_tbl_be_note")
                                        },
                                        {
                                            layer: t("web_tbl_db"),
                                            tech: "PostgreSQL, Redis, Liquibase",
                                            note: t("web_tbl_db_note")
                                        },
                                        {
                                            layer: t("web_tbl_infra"),
                                            tech: "Docker Compose, Nginx, CI/CD",
                                            note: t("web_tbl_infra_note")
                                        },
                                        {
                                            layer: t("web_tbl_observ"),
                                            tech: "Logging, Metrics, Alerts",
                                            note: t("web_tbl_obs_note")
                                        },
                                    ].map((r) => (
                                        <tr key={r.layer as string}>
                                            <td className="p-3">{r.layer}</td>
                                            <td className="p-3">{r.tech}</td>
                                            <td className="p-3">{r.note}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("web_stack_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("web_stack_tip_perf")}</li>
                                    <li>{t("web_stack_tip_accessibility")}</li>
                                    <li>{t("web_stack_tip_scaling")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Workflow */}
                    <section id="workflow" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("web_workflow_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {workflow.map((r) => (
                                    <div key={r.k}
                                         className="rounded-xl border p-4 text-zinc-700 dark:!text-white text-sm">
                                        {r.v}
                                    </div>
                                ))}
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("web_workflow_check_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("web_workflow_check_1")}</li>
                                    <li>{t("web_workflow_check_2")}</li>
                                    <li>{t("web_workflow_check_3")}</li>
                                    <li>{t("web_workflow_check_4")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Security & Quality */}
                    <section id="security" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("web_security_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("web_security_practices_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("web_security_practices_1")}</li>
                                        <li>{t("web_security_practices_2")}</li>
                                        <li>{t("web_security_practices_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("web_quality_ci_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("web_quality_ci_1")}</li>
                                        <li>{t("web_quality_ci_2")}</li>
                                        <li>{t("web_quality_ci_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("web_security_note")}</p>
                        </div>
                    </section>

                    {/* Requirements (briefs & assets) */}
                    <section id="requirements" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("web_requirements_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("web_requirements_ok_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("web_requirements_ok_1")}</li>
                                        <li>{t("web_requirements_ok_2")}</li>
                                        <li>{t("web_requirements_ok_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("web_requirements_bad_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("web_requirements_bad_1")}</li>
                                        <li>{t("web_requirements_bad_2")}</li>
                                        <li>{t("web_requirements_bad_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("web_requirements_note")}</p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:!bg-zinc-700 p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("web_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("web_pricing_1")}</li>
                                <li>{t("web_pricing_2")}</li>
                                <li>{t("web_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("web_pricing_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("web_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("web_faq_q1")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("web_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("web_faq_q2")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("web_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("web_faq_q3")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("web_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm dark:!text-white text-white">
                            <h2 className="text-xl font-semibold">{t("web_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("web_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="/contacts"
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("web_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("web_cta_btn_callback")}
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
                        "@type": "ProfessionalService",
                        name: t("web_seo_name"),
                        description: t("web_seo_description"),
                        areaServed: "MD",
                        serviceType: ["Web development", "SPA/PWA", "E-commerce"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
