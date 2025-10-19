/**
 * Страница: PostgreSQL в разработке
 * Маршрут: <Route path="/services/postgresql" element={<PostgreSQLDevPage />} />
 * Требует i18n-ключи postgres_* (ru/ro словари).
 */
import {toLangHref, useI18n} from "../../../shared/i18n/i18n.tsx";


export default function PostgreSQLDevPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("postgres_toc_intro")},
        {id: "advantages", title: t("postgres_toc_advantages")},
        {id: "architecture", title: t("postgres_toc_architecture")},
        {id: "features", title: t("postgres_toc_features")},
        {id: "extensions", title: t("postgres_toc_extensions")},
        {id: "performance", title: t("postgres_toc_performance")},
        {id: "security", title: t("postgres_toc_security")},
        {id: "backup", title: t("postgres_toc_backup")},
        {id: "migration", title: t("postgres_toc_migration")},
        {id: "integration", title: t("postgres_toc_integration")},
        {id: "faq", title: t("postgres_toc_faq")},
    ];

    const featureCards = [
        "postgres_feat_jsonb",
        "postgres_feat_cte",
        "postgres_feat_partitioning",
        "postgres_feat_indexes",
        "postgres_feat_triggers",
        "postgres_feat_views",
        "postgres_feat_roles",
        "postgres_feat_replication",
    ];

    const extensionCards = [
        "postgres_ext_postgis",
        "postgres_ext_pgvector",
        "postgres_ext_timescaledb",
        "postgres_ext_fdw",
        "postgres_ext_uuid",
        "postgres_ext_pgcrypto",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("postgres_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900">
                    {t("postgres_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("postgres_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("postgres_toc_title", {defaultValue: "Содержание"})}
                        </h2>
                        <ul className="space-y-2 text-sm">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <a
                                        className="text-zinc-700 hover:text-emerald-700"
                                        href={`#${s.id}`}
                                    >
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
                            <h2 className="text-xl font-semibold mb-3">{t("postgres_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("postgres_intro_bul1")}</li>
                                <li>{t("postgres_intro_bul2")}</li>
                                <li>{t("postgres_intro_bul3")}</li>
                                <li>{t("postgres_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Advantages */}
                    <section id="advantages" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("postgres_adv_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("postgres_adv_open"), t("postgres_adv_reliable"), t("postgres_adv_scalable"), t("postgres_adv_extensible")].map(
                                    (c, i) => (
                                        <div key={i} className="rounded-xl border p-4">
                                            {c}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Architecture */}
                    <section id="architecture" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("postgres_arch_title")}</h2>
                            <p className="text-zinc-700 mb-3">{t("postgres_arch_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("postgres_arch_proc")}</li>
                                <li>{t("postgres_arch_shared")}</li>
                                <li>{t("postgres_arch_wal")}</li>
                                <li>{t("postgres_arch_bgwriter")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Features */}
                    <section id="features" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("postgres_features_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {featureCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Extensions */}
                    <section id="extensions" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("postgres_extensions_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {extensionCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Performance */}
                    <section id="performance" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("postgres_perf_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("postgres_perf_indexing")}</li>
                                <li>{t("postgres_perf_queryplan")}</li>
                                <li>{t("postgres_perf_vacuum")}</li>
                                <li>{t("postgres_perf_monitoring")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Security */}
                    <section id="security" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("postgres_sec_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("postgres_sec_ssl")}</li>
                                <li>{t("postgres_sec_roles")}</li>
                                <li>{t("postgres_sec_policies")}</li>
                                <li>{t("postgres_sec_audit")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Backup */}
                    <section id="backup" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("postgres_backup_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("postgres_backup_pgdump")}</li>
                                <li>{t("postgres_backup_wal")}</li>
                                <li>{t("postgres_backup_hot")}</li>
                                <li>{t("postgres_backup_restore")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Migration */}
                    <section id="migration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("postgres_migration_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("postgres_migration_from_mysql")}</li>
                                <li>{t("postgres_migration_from_sqlite")}</li>
                                <li>{t("postgres_migration_from_oracle")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Integration */}
                    <section id="integration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("postgres_integration_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("postgres_int_spring")}</li>
                                <li>{t("postgres_int_node")}</li>
                                <li>{t("postgres_int_python")}</li>
                                <li>{t("postgres_int_django")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("postgres_toc_faq")}</h2>
                            <details className="group rounded-xl border p-4">
                                <summary className="cursor-pointer font-medium flex items-center justify-between">
                                    {t("postgres_faq_q1")}
                                    <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                </summary>
                                <p className="mt-2 text-zinc-700">{t("postgres_faq_a1")}</p>
                            </details>
                            <details className="group rounded-xl border p-4">
                                <summary className="cursor-pointer font-medium flex items-center justify-between">
                                    {t("postgres_faq_q2")}
                                    <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                </summary>
                                <p className="mt-2 text-zinc-700">{t("postgres_faq_a2")}</p>
                            </details>
                            <details className="group rounded-xl border p-4">
                                <summary className="cursor-pointer font-medium flex items-center justify-between">
                                    {t("postgres_faq_q3")}
                                    <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                </summary>
                                <p className="mt-2 text-zinc-700">{t("postgres_faq_a3")}</p>
                            </details>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("postgres_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("postgres_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href={toLangHref("/contacts", lang)}
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("postgres_cta_btn_contact")}
                                </a>
                                <a href="#"
                                   onClick={(e) => {
                                       e.preventDefault();
                                       (window as any).open?.("/#callback", "_self");
                                   }}
                                   className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10">
                                    {t("postgres_cta_btn_callback")}
                                </a>
                            </div>
                        </div>
                    </section>
                </article>
            </div>

            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        serviceType: t("postgres_seo_headline"),
                        areaServed: ["MD", "RO", "UA"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
