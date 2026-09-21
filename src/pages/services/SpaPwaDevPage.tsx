// src/pages/guide/SpaPwaDevPage.tsx
import {toLangHref, useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Разработка SPA и PWA веб-приложений
 * Маршрут: <Route path="/guide/spa-pwa" element={<SpaPwaDevPage />} />
 * Требует i18n-ключи spa_* (ru/ro словари).
 */

export default function SpaPwaDevPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("spa_toc_intro")},
        {id: "benefits", title: t("spa_toc_benefits")},
        {id: "capabilities", title: t("spa_toc_capabilities")},
        {id: "performance", title: t("spa_toc_performance")},
        {id: "offline", title: t("spa_toc_offline")},
        {id: "install", title: t("spa_toc_install")},
        {id: "security", title: t("spa_toc_security")},
        {id: "integration", title: t("spa_toc_integration")},
        {id: "deployment", title: t("spa_toc_deployment")},
        {id: "pricing", title: t("spa_toc_pricing")},
        {id: "faq", title: t("spa_toc_faq")},
    ];

    const features = [
        t("spa_feat_fast"),
        t("spa_feat_ui"),
        t("spa_feat_scalable"),
        t("spa_feat_accessible"),
        t("spa_feat_multilang"),
        t("spa_feat_analytics"),
    ];

    const cachingRows = [
        {strat: t("spa_cache_assets"), best: t("spa_cache_best_assets"), notes: t("spa_cache_notes_assets")},
        {strat: t("spa_cache_pages"), best: t("spa_cache_best_pages"), notes: t("spa_cache_notes_pages")},
        {strat: t("spa_cache_api"), best: t("spa_cache_best_api"), notes: t("spa_cache_notes_api")},
        {strat: t("spa_cache_images"), best: t("spa_cache_best_images"), notes: t("spa_cache_notes_images")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("spa_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("spa_title_t")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("spa_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("spa_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("spa_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spa_intro_bul1")}</li>
                                <li>{t("spa_intro_bul2")}</li>
                                <li>{t("spa_intro_bul3")}</li>
                                <li>{t("spa_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spa_benefits_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {features.map((c, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <p className="text-zinc-700 dark:!text-white">{c}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("spa_benefits_note")}</p>
                        </div>
                    </section>

                    {/* Capabilities */}
                    <section id="capabilities" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spa_capabilities_title")}</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium mb-2">{t("spa_cap_spa_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                        <li>{t("spa_cap_spa_1")}</li>
                                        <li>{t("spa_cap_spa_2")}</li>
                                        <li>{t("spa_cap_spa_3")}</li>
                                    </ul>
                                </div>
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium mb-2">{t("spa_cap_pwa_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                        <li>{t("spa_cap_pwa_1")}</li>
                                        <li>{t("spa_cap_pwa_2")}</li>
                                        <li>{t("spa_cap_pwa_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("spa_cap_note")}</p>
                        </div>
                    </section>

                    {/* Performance */}
                    <section id="performance" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spa_perf_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spa_perf_1")}</li>
                                <li>{t("spa_perf_2")}</li>
                                <li>{t("spa_perf_3")}</li>
                                <li>{t("spa_perf_4")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spa_perf_note")}</p>
                        </div>
                    </section>

                    {/* Offline & caching */}
                    <section id="offline" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spa_offline_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-4">{t("spa_offline_p1")}</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("spa_tbl_strategy")}</th>
                                        <th className="text-left p-3">{t("spa_tbl_bestfor")}</th>
                                        <th className="text-left p-3">{t("spa_tbl_notes")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {cachingRows.map((r, i) => (
                                        <tr key={i}>
                                            <td className="p-3">{r.strat}</td>
                                            <td className="p-3">{r.best}</td>
                                            <td className="p-3">{r.notes}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("spa_offline_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("spa_offline_tip_1")}</li>
                                    <li>{t("spa_offline_tip_2")}</li>
                                    <li>{t("spa_offline_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Installability */}
                    <section id="install" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spa_install_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("spa_install_manifest_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("spa_install_manifest_1")}</li>
                                        <li>{t("spa_install_manifest_2")}</li>
                                        <li>{t("spa_install_manifest_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("spa_install_sw_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("spa_install_sw_1")}</li>
                                        <li>{t("spa_install_sw_2")}</li>
                                        <li>{t("spa_install_sw_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("spa_install_note")}</p>
                        </div>
                    </section>

                    {/* Security */}
                    <section id="security" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spa_security_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spa_sec_1")}</li>
                                <li>{t("spa_sec_2")}</li>
                                <li>{t("spa_sec_3")}</li>
                                <li>{t("spa_sec_4")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spa_security_note")}</p>
                        </div>
                    </section>

                    {/* Integration */}
                    <section id="integration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spa_integration_title")}</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("spa_integ_backend_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 text-zinc-700 dark:!text-white space-y-1 text-sm">
                                        <li>{t("spa_integ_backend_1")}</li>
                                        <li>{t("spa_integ_backend_2")}</li>
                                        <li>{t("spa_integ_backend_3")}</li>
                                    </ul>
                                </div>
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("spa_integ_third_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 text-zinc-700 dark:!text-white space-y-1 text-sm">
                                        <li>{t("spa_integ_third_1")}</li>
                                        <li>{t("spa_integ_third_2")}</li>
                                        <li>{t("spa_integ_third_3")}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Deployment */}
                    <section id="deployment" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spa_deploy_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spa_deploy_1")}</li>
                                <li>{t("spa_deploy_2")}</li>
                                <li>{t("spa_deploy_3")}</li>
                                <li>{t("spa_deploy_4")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spa_deploy_note")}</p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:!bg-zinc-700 p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("spa_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("spa_pricing_1")}</li>
                                <li>{t("spa_pricing_2")}</li>
                                <li>{t("spa_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("spa_pricing_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("spa_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("spa_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("spa_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("spa_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("spa_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("spa_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("spa_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm dark:!text-white text-white">
                            <h2 className="text-xl font-semibold">{t("spa_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("spa_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href={toLangHref("/contacts", lang)}
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("spa_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.hash = "callback";
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("spa_cta_btn_callback")}
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
                        "@type": "WebApplication",
                        name: t("spa_seo_name"),
                        applicationCategory: "BusinessApplication",
                        operatingSystem: "Web",
                        description: t("spa_seo_description"),
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
