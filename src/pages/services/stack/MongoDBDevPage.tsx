import {toLangHref, useI18n} from "../../../shared/i18n/i18n.tsx";

/**
 * Страница: Разработка и интеграция MongoDB
 * Маршрут: <Route path="/services/mongodb" element={<MongoDBDevPage />} />
 * Требует i18n-ключи mongodb_* (ru/ro словари).
 */
export default function MongoDBDevPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("mongodb_toc_intro")},
        {id: "benefits", title: t("mongodb_toc_benefits")},
        {id: "design", title: t("mongodb_toc_design")},
        {id: "features", title: t("mongodb_toc_features")},
        {id: "operations", title: t("mongodb_toc_operations")},
        {id: "data", title: t("mongodb_toc_data")},
        {id: "performance", title: t("mongodb_toc_performance")},
        {id: "security", title: t("mongodb_toc_security")},
        {id: "migration", title: t("mongodb_toc_migration")},
        {id: "pricing", title: t("mongodb_toc_pricing")},
        {id: "faq", title: t("mongodb_toc_faq")},
    ];

    const featureCards = [
        "mongodb_feat_schema", // гибкая схема, Embedding/Referencing
        "mongodb_feat_agg", // Aggregation Framework & $lookup
        "mongodb_feat_text", // полнотекст и поиск
        "mongodb_feat_geo", // гео-запросы
        "mongodb_feat_txn", // транзакции
        "mongodb_feat_time", // time-series
        "mongodb_feat_triggers", // Triggers/Change Streams
        "mongodb_feat_srvless", // Atlas Serverless/Functions
    ];

    const opsCards = [
        "mongodb_ops_replica", // Replica Set, автоматическое failover
        "mongodb_ops_shard", // Sharding по ключу
        "mongodb_ops_backup", // бэкапы/пойнт-ин-тайм
        "mongodb_ops_monitor", // мониторинг/алерты
        "mongodb_ops_ci", // миграции и CI/CD
        "mongodb_ops_observ", // трассировка и логирование
    ];

    const dataTable = [
        {
            f: t("mongodb_tbl_collection"),
            ex: "products",
            n: t("mongodb_tbl_collection_note"),
        },
        {f: t("mongodb_tbl_docid"), ex: "ObjectId(…)", n: t("mongodb_tbl_docid_note")},
        {f: t("mongodb_tbl_indexes"), ex: "{ sku: 1 }, { price: 1 }", n: t("mongodb_tbl_indexes_note")},
        {f: t("mongodb_tbl_rel"), ex: t("mongodb_tbl_rel_ex"), n: t("mongodb_tbl_rel_note")},
        {f: t("mongodb_tbl_schema"), ex: "JSON Schema", n: t("mongodb_tbl_schema_note")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("mongodb_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("mongodb_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("mongodb_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("mongodb_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("mongodb_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("mongodb_intro_bul1")}</li>
                                <li>{t("mongodb_intro_bul2")}</li>
                                <li>{t("mongodb_intro_bul3")}</li>
                                <li>{t("mongodb_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("mongodb_benefits_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("mongodb_ben_flex"), t("mongodb_ben_speed"), t("mongodb_ben_scale"), t("mongodb_ben_cost")].map((c, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <p className="text-zinc-700 dark:!text-white">{c}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("mongodb_benefits_note")}</p>
                        </div>
                    </section>

                    {/* Design & Modeling */}
                    <section id="design" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("mongodb_design_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("mongodb_design_p1")}</p>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                {[t("mongodb_design_embed"), t("mongodb_design_ref"), t("mongodb_design_schema"), t("mongodb_design_workload")].map((s) => (
                                    <div key={s} className="rounded-xl border p-4">{s}</div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("mongodb_design_note")}</p>
                        </div>
                    </section>

                    {/* Features */}
                    <section id="features" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("mongodb_features_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {featureCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">{t(k)}</div>
                                ))}
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("mongodb_features_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("mongodb_features_tip_1")}</li>
                                    <li>{t("mongodb_features_tip_2")}</li>
                                    <li>{t("mongodb_features_tip_3")}</li>
                                    <li>{t("mongodb_features_tip_4")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Operations */}
                    <section id="operations" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("mongodb_ops_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {opsCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">{t(k)}</div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("mongodb_ops_note")}</p>
                        </div>
                    </section>

                    {/* Data model */}
                    <section id="data" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("mongodb_data_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("mongodb_data_p1")}</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("mongodb_tbl_field")}</th>
                                        <th className="text-left p-3">{t("mongodb_tbl_example")}</th>
                                        <th className="text-left p-3">{t("mongodb_tbl_note")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {dataTable.map((r, i) => (
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
                                <p className="font-medium">{t("mongodb_data_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("mongodb_data_tip_1")}</li>
                                    <li>{t("mongodb_data_tip_2")}</li>
                                    <li>{t("mongodb_data_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Performance */}
                    <section id="performance" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("mongodb_performance_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("mongodb_perf_indexes"), t("mongodb_perf_profiler"), t("mongodb_perf_cache"), t("mongodb_perf_bulk")].map((p) => (
                                    <div key={p} className="rounded-xl border p-4 text-sm">{p}</div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("mongodb_performance_note")}</p>
                        </div>
                    </section>

                    {/* Security */}
                    <section id="security" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("mongodb_security_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("mongodb_sec_auth")}</li>
                                <li>{t("mongodb_sec_tls")}</li>
                                <li>{t("mongodb_sec_roles")}</li>
                                <li>{t("mongodb_sec_audit")}</li>
                                <li>{t("mongodb_sec_backup")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("mongodb_security_note")}</p>
                        </div>
                    </section>

                    {/* Migration */}
                    <section id="migration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("mongodb_migration_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("mongodb_migration_from_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("mongodb_migration_from_1")}</li>
                                        <li>{t("mongodb_migration_from_2")}</li>
                                        <li>{t("mongodb_migration_from_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("mongodb_migration_process_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("mongodb_migration_proc_1")}</li>
                                        <li>{t("mongodb_migration_proc_2")}</li>
                                        <li>{t("mongodb_migration_proc_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("mongodb_migration_note")}</p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:!bg-zinc-700 p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("mongodb_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("mongodb_pricing_1")}</li>
                                <li>{t("mongodb_pricing_2")}</li>
                                <li>{t("mongodb_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("mongodb_pricing_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("mongodb_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("mongodb_faq_q1")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("mongodb_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("mongodb_faq_q2")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("mongodb_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("mongodb_faq_q3")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("mongodb_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm dark:!text-white text-white">
                            <h2 className="text-xl font-semibold">{t("mongodb_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("mongodb_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href={toLangHref("/contacts", lang)}
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("mongodb_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("mongodb_cta_btn_callback")}
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
                        serviceType: t("mongodb_seo_headline"),
                        areaServed: ["MD", "RO", "UA"],
                        offers: {
                            "@type": "Offer",
                            priceSpecification: {"@type": "PriceSpecification", priceCurrency: "MDL"}
                        },
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
