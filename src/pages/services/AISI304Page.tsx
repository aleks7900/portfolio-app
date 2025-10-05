import {useI18n} from "../../shared/i18n/i18n.tsx"

/**
 * Страница: Нержавеющая сталь AISI 304
 * Маршрут: <Route path="/guide/aisi-304" element={<AISI304Page />} />
 * Требует i18n-ключи aisi_* (ru/ro словари).
 */

export default function AISI304Page() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("aisi_toc_intro")},
        {id: "composition", title: t("aisi_toc_composition")},
        {id: "properties", title: t("aisi_toc_properties")},
        {id: "applications", title: t("aisi_toc_applications")},
        {id: "advantages", title: t("aisi_toc_advantages")},
        {id: "comparison", title: t("aisi_toc_comparison")},
        {id: "processing", title: t("aisi_toc_processing")},
        {id: "care", title: t("aisi_toc_care")},
        {id: "faq", title: t("aisi_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("aisi_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("aisi_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("aisi_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("aisi_toc_title", {defaultValue: "Содержание"})}
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
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("aisi_toc_intro")}</h2>
                            <p className="text-zinc-700 dark:text-white">{t("aisi_intro_p1")}</p>
                            <ul className="list-disc pl-5 mt-3 space-y-1 text-zinc-700 dark:text-white">
                                <li>{t("aisi_intro_bul1")}</li>
                                <li>{t("aisi_intro_bul2")}</li>
                                <li>{t("aisi_intro_bul3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Composition */}
                    <section id="composition" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi_comp_title")}</h2>
                            <p className="mb-3">{t("aisi_comp_p1")}</p>
                            <table className="min-w-full text-sm border divide-y">
                                <thead className="bg-zinc-50 dark:text-black">
                                <tr>
                                    <th className="text-left p-3">{t("aisi_comp_element")}</th>
                                    <th className="text-left p-3">{t("aisi_comp_percent")}</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y">
                                {[
                                    {el: "C", pct: "≤ 0.08 %"},
                                    {el: "Cr", pct: "18.0–20.0 %"},
                                    {el: "Ni", pct: "8.0–10.5 %"},
                                    {el: "Mn", pct: "≤ 2.0 %"},
                                    {el: "Si", pct: "≤ 1.0 %"},
                                    {el: "S / P", pct: "≤ 0.045 %"},
                                ].map((r) => (
                                    <tr key={r.el}>
                                        <td className="p-3">{r.el}</td>
                                        <td className="p-3">{r.pct}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Properties */}
                    <section id="properties" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi_prop_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("aisi_prop_corrosion")}</li>
                                <li>{t("aisi_prop_strength")}</li>
                                <li>{t("aisi_prop_forming")}</li>
                                <li>{t("aisi_prop_welding")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Applications */}
                    <section id="applications" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi_app_title")}</h2>
                            <p>{t("aisi_app_p1")}</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>{t("aisi_app_kitchen")}</li>
                                <li>{t("aisi_app_arch")}</li>
                                <li>{t("aisi_app_industry")}</li>
                                <li>{t("aisi_app_furniture")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Advantages */}
                    <section id="advantages" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi_adv_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("aisi_adv_hygiene"), t("aisi_adv_durability"), t("aisi_adv_recycle"), t("aisi_adv_aesthetic")].map((a, i) => (
                                    <div key={i} className="rounded-xl border p-4 text-sm">{a}</div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Comparison with other grades */}
                    <section id="comparison" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi_cmp_title")}</h2>
                            <p className="mb-3">{t("aisi_cmp_p1")}</p>
                            <table className="min-w-full text-sm border divide-y">
                                <thead className="bg-zinc-50 dark:text-black">
                                <tr>
                                    <th className="text-left p-3">{t("aisi_cmp_grade")}</th>
                                    <th className="text-left p-3">{t("aisi_cmp_char")}</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y">
                                <tr>
                                    <td className="p-3">AISI 304</td>
                                    <td className="p-3">{t("aisi_cmp_304")}</td>
                                </tr>
                                <tr>
                                    <td className="p-3">AISI 316</td>
                                    <td className="p-3">{t("aisi_cmp_316")}</td>
                                </tr>
                                <tr>
                                    <td className="p-3">AISI 430</td>
                                    <td className="p-3">{t("aisi_cmp_430")}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Processing & Welding */}
                    <section id="processing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi_proc_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("aisi_proc_cut")}</li>
                                <li>{t("aisi_proc_bend")}</li>
                                <li>{t("aisi_proc_weld")}</li>
                                <li>{t("aisi_proc_polish")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Care */}
                    <section id="care" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi_care_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("aisi_care_clean")}</li>
                                <li>{t("aisi_care_avoid")}</li>
                                <li>{t("aisi_care_restore")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi_toc_faq")}</h2>
                            <div className="space-y-4">
                                {[1, 2, 3].map((n) => (
                                    <details key={n} className="group rounded-xl border p-4">
                                        <summary
                                            className="cursor-pointer font-medium flex items-center justify-between">
                                            {t(`aisi_faq_q${n}`)}
                                            <span
                                                className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                        </summary>
                                        <p className="mt-2 text-zinc-700 dark:text-white">{t(`aisi_faq_a${n}`)}</p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("aisi_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("aisi_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("aisi_cta_btn_contact")}
                                </a>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    (window as any).open?.('/#callback', '_self');
                                }}
                                   className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10">
                                    {t("aisi_cta_btn_callback")}
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
                        headline: t("aisi_seo_headline"),
                        about: ["AISI 304", "Stainless steel", "Properties", "Applications"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
