import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Разработка Android‑приложений под заказ
 * Маршрут: <Route path="/services/android-dev" element={<AndroidDevPage />} />
 * Требует i18n‑ключи android_* (ru/ro словари).
 */
export default function AndroidDevPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("android_toc_intro")},
        {id: "capabilities", title: t("android_toc_capabilities")},
        {id: "platforms", title: t("android_toc_platforms")},
        {id: "stack", title: t("android_toc_stack")},
        {id: "process", title: t("android_toc_process")},
        {id: "integrations", title: t("android_toc_integrations")},
        {id: "quality", title: t("android_toc_quality")},
        {id: "artifacts", title: t("android_toc_artifacts")},
        {id: "pricing", title: t("android_toc_pricing")},
        {id: "mistakes", title: t("android_toc_mistakes")},
        {id: "faq", title: t("android_toc_faq")},
    ];

    const features = [
        t("android_feat_perf"),
        t("android_feat_uiux"),
        t("android_feat_offline"),
        t("android_feat_security"),
    ];

    const processSteps = [
        t("android_proc_1"),
        t("android_proc_2"),
        t("android_proc_3"),
        t("android_proc_4"),
        t("android_proc_5"),
    ];

    const integrations = [
        t("android_int_payments"),
        t("android_int_maps"),
        t("android_int_push"),
        t("android_int_social"),
        t("android_int_analytics"),
        t("android_int_bluetooth")
    ];

    const qaItems = [
        t("android_quality_testing"),
        t("android_quality_crash"),
        t("android_quality_performance"),
        t("android_quality_accessibility"),
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("android_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("android_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("android_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("android_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("android_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("android_intro_bul1")}</li>
                                <li>{t("android_intro_bul2")}</li>
                                <li>{t("android_intro_bul3")}</li>
                                <li>{t("android_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Capabilities */}
                    <section id="capabilities" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("android_capabilities_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {features.map((c, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <p className="text-zinc-700 dark:!text-white">{c}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("android_cap_note")}</p>
                        </div>
                    </section>

                    {/* Platforms & Versions */}
                    <section id="platforms" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("android_platforms_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-4">{t("android_platforms_p1")}</p>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("android_tbl_version")}</th>
                                        <th className="text-left p-3">{t("android_tbl_minSdk")}</th>
                                        <th className="text-left p-3">{t("android_tbl_targetSdk")}</th>
                                        <th className="text-left p-3">{t("android_tbl_notes")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {[
                                        {
                                            v: "Android 10–12",
                                            min: "API 29–31",
                                            target: t("android_tbl_target_current"),
                                            note: t("android_tbl_row_10_12")
                                        },
                                        {
                                            v: "Android 13–14",
                                            min: "API 33–34",
                                            target: t("android_tbl_target_current"),
                                            note: t("android_tbl_row_13_14")
                                        },
                                        {
                                            v: "Android 15–16",
                                            min: t("android_tbl_min_recommended"),
                                            target: t("android_tbl_target_latest"),
                                            note: t("android_tbl_row_15_16")
                                        },
                                    ].map((r) => (
                                        <tr key={r.v}>
                                            <td className="p-3">{r.v}</td>
                                            <td className="p-3">{r.min}</td>
                                            <td className="p-3">{r.target}</td>
                                            <td className="p-3">{r.note}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("android_platforms_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("android_platforms_tip_64bit")}</li>
                                    <li>{t("android_platforms_tip_permissions")}</li>
                                    <li>{t("android_platforms_tip_backward")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Tech Stack */}
                    <section id="stack" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("android_stack_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("android_stack_client_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("android_stack_langs")}</li>
                                        <li>{t("android_stack_ui")}</li>
                                        <li>{t("android_stack_network")}</li>
                                        <li>{t("android_stack_storage")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("android_stack_server_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("android_stack_backend")}</li>
                                        <li>{t("android_stack_auth")}</li>
                                        <li>{t("android_stack_push")}</li>
                                        <li>{t("android_stack_monitoring")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("android_stack_note")}</p>
                        </div>
                    </section>

                    {/* Development Process */}
                    <section id="process" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("android_process_title")}</h2>
                            <ol className="list-decimal pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                {processSteps.map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ol>
                        </div>
                    </section>

                    {/* Integrations */}
                    <section id="integrations" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("android_integrations_title")}</h2>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {integrations.map((item, i) => (
                                    <div key={i}
                                         className="rounded-xl border p-4 text-sm text-zinc-700 dark:!text-white">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Quality, Performance & Security */}
                    <section id="quality" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("android_quality_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("android_quality_tests_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        {qaItems.map((q, i) => (
                                            <li key={i}>{q}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("android_security_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("android_sec_store")}</li>
                                        <li>{t("android_sec_network")}</li>
                                        <li>{t("android_sec_obfuscation")}</li>
                                        <li>{t("android_sec_hardening")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("android_quality_note")}</p>
                        </div>
                    </section>

                    {/* Project Artifacts */}
                    <section id="artifacts" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("android_artifacts_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("android_artifacts_you_get")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("android_artifacts_apk_aab")}</li>
                                        <li>{t("android_artifacts_source")}</li>
                                        <li>{t("android_artifacts_docs")}</li>
                                        <li>{t("android_artifacts_ci")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("android_artifacts_from_you")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("android_artifacts_design")}</li>
                                        <li>{t("android_artifacts_api")}</li>
                                        <li>{t("android_artifacts_texts")}</li>
                                        <li>{t("android_artifacts_keys")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("android_artifacts_note")}</p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:!bg-zinc-700 p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("android_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("android_pricing_1")}</li>
                                <li>{t("android_pricing_2")}</li>
                                <li>{t("android_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("android_pricing_note")}</p>
                        </div>
                    </section>

                    {/* Common Mistakes */}
                    <section id="mistakes" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("android_mistakes_title")}</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("android_mist_scope_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 text-zinc-700 dark:!text-white space-y-1">
                                        <li>{t("android_mist_scope_1")}</li>
                                        <li>{t("android_mist_scope_2")}</li>
                                        <li>{t("android_mist_scope_3")}</li>
                                    </ul>
                                </div>
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("android_mist_quality_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 text-zinc-700 dark:!text-white space-y-1">
                                        <li>{t("android_mist_quality_1")}</li>
                                        <li>{t("android_mist_quality_2")}</li>
                                        <li>{t("android_mist_quality_3")}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("android_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("android_faq_q1")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("android_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("android_faq_q2")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("android_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("android_faq_q3")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("android_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("android_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("android_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="/contacts"
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("android_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("android_cta_btn_callback")}
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
                        name: t("android_seo_name"),
                        description: t("android_seo_desc"),
                        areaServed: ["Moldova", "Romania", "EU"],
                        serviceType: "Android app development",
                        offers: {"@type": "Offer", availability: "https://schema.org/InStock"},
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
