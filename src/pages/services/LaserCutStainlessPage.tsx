import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Лазерная резка нержавейки
 * Маршрут: <Route path="/guide/laser-stainless" element={<LaserCutStainlessPage />} />
 * Требует i18n-ключи laser_* (ru/ro словари).
 */

export default function LaserCutStainlessPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("laser_toc_intro")},
        {id: "capabilities", title: t("laser_toc_capabilities")},
        {id: "materials", title: t("laser_toc_materials")},
        {id: "quality", title: t("laser_toc_quality")},
        {id: "design", title: t("laser_toc_design")},
        {id: "tolerances", title: t("laser_toc_tolerances")},
        {id: "files", title: t("laser_toc_files")},
        {id: "pricing", title: t("laser_toc_pricing")},
        {id: "mistakes", title: t("laser_toc_mistakes")},
        {id: "faq", title: t("laser_toc_faq")},
    ];

    const rules = [
        {k: "laser_rule_slot", v: t("laser_rule_slot")},
        {k: "laser_rule_hole", v: t("laser_rule_hole")},
        {k: "laser_rule_bridge", v: t("laser_rule_bridge")},
        {k: "laser_rule_text", v: t("laser_rule_text")},
        {k: "laser_rule_edge", v: t("laser_rule_edge")},
        {k: "laser_rule_tab", v: t("laser_rule_tab")},
        {k: "laser_rule_minpart", v: t("laser_rule_minpart")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("laser_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("laser_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("laser_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">{t("laser_toc_title", {defaultValue: "Содержание"})}</h2>
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
                            <h2 className="text-xl font-semibold mb-3">{t("laser_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("laser_intro_bul1")}</li>
                                <li>{t("laser_intro_bul2")}</li>
                                <li>{t("laser_intro_bul3")}</li>
                                <li>{t("laser_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Capabilities */}
                    <section id="capabilities" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("laser_capabilities_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("laser_cap_speed"), t("laser_cap_accuracy"), t("laser_cap_repeat"), t("laser_cap_complex")].map((c, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <p className="text-zinc-700 dark:!text-white">{c}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("laser_cap_note")}</p>
                        </div>
                    </section>

                    {/* Materials & Thickness */}
                    <section id="materials" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("laser_materials_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-4">{t("laser_materials_p1")}</p>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("laser_tbl_thickness")}</th>
                                        <th className="text-left p-3">{t("laser_tbl_kerf")}</th>
                                        <th className="text-left p-3">{t("laser_tbl_tolerance")}</th>
                                        <th className="text-left p-3">{t("laser_tbl_notes")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {[
                                        {
                                            thk: "0.5–1.0 mm",
                                            kerf: "~0.08–0.15 mm",
                                            tol: "±0.10–0.15 mm",
                                            note: t("laser_tbl_row_thin")
                                        },
                                        {
                                            thk: "1.5–3.0 mm",
                                            kerf: "~0.12–0.20 mm",
                                            tol: "±0.15–0.20 mm",
                                            note: t("laser_tbl_row_mid")
                                        },
                                        {
                                            thk: "4–6 mm",
                                            kerf: "~0.18–0.25 mm",
                                            tol: "±0.20–0.30 mm",
                                            note: t("laser_tbl_row_thick")
                                        },
                                        {
                                            thk: "8–10 mm",
                                            kerf: "~0.22–0.30 mm",
                                            tol: "±0.30–0.50 mm",
                                            note: t("laser_tbl_row_max")
                                        },
                                    ].map((r) => (
                                        <tr key={r.thk}>
                                            <td className="p-3">{r.thk}</td>
                                            <td className="p-3">{r.kerf}</td>
                                            <td className="p-3">{r.tol}</td>
                                            <td className="p-3">{r.note}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("laser_materials_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("laser_materials_tip_gas")}</li>
                                    <li>{t("laser_materials_tip_marks")}</li>
                                    <li>{t("laser_materials_tip_warp")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Cut quality & finishing */}
                    <section id="quality" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("laser_quality_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("laser_quality_edge_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("laser_quality_edge_1")}</li>
                                        <li>{t("laser_quality_edge_2")}</li>
                                        <li>{t("laser_quality_edge_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("laser_quality_finish_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("laser_quality_finish_1")}</li>
                                        <li>{t("laser_quality_finish_2")}</li>
                                        <li>{t("laser_quality_finish_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("laser_quality_note")}</p>
                        </div>
                    </section>

                    {/* Design rules */}
                    <section id="design" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("laser_design_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {rules.map((r) => (
                                    <div key={r.k} className="rounded-xl border p-4 text-zinc-700 dark:!text-white text-sm">{r.v}</div>
                                ))}
                            </div>
                            <div className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("laser_design_check_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("laser_design_check_1")}</li>
                                    <li>{t("laser_design_check_2")}</li>
                                    <li>{t("laser_design_check_3")}</li>
                                    <li>{t("laser_design_check_4")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Tolerances */}
                    <section id="tolerances" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("laser_tolerances_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("laser_tolerances_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("laser_tolerances_1")}</li>
                                <li>{t("laser_tolerances_2")}</li>
                                <li>{t("laser_tolerances_3")}</li>
                                <li>{t("laser_tolerances_4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Files */}
                    <section id="files" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("laser_files_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("laser_files_ok_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("laser_files_ok_1")}</li>
                                        <li>{t("laser_files_ok_2")}</li>
                                        <li>{t("laser_files_ok_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("laser_files_bad_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("laser_files_bad_1")}</li>
                                        <li>{t("laser_files_bad_2")}</li>
                                        <li>{t("laser_files_bad_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("laser_files_note")}</p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:!bg-zinc-700 p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("laser_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("laser_pricing_1")}</li>
                                <li>{t("laser_pricing_2")}</li>
                                <li>{t("laser_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("laser_pricing_note")}</p>
                        </div>
                    </section>

                    {/* Mistakes */}
                    <section id="mistakes" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("laser_mistakes_title")}</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("laser_mist_draw_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 text-zinc-700 dark:!text-white space-y-1">
                                        <li>{t("laser_mist_draw_1")}</li>
                                        <li>{t("laser_mist_draw_2")}</li>
                                        <li>{t("laser_mist_draw_3")}</li>
                                    </ul>
                                </div>
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("laser_mist_measure_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 text-zinc-700 dark:!text-white space-y-1">
                                        <li>{t("laser_mist_measure_1")}</li>
                                        <li>{t("laser_mist_measure_2")}</li>
                                        <li>{t("laser_mist_measure_3")}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("laser_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("laser_faq_q1")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("laser_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("laser_faq_q2")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("laser_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("laser_faq_q3")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("laser_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm dark:!text-white text-white">
                            <h2 className="text-xl font-semibold">{t("laser_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("laser_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("laser_cta_btn_contact")}
                                </a>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    (window as any).open?.('/#callback', '_self');
                                }}
                                   className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10">
                                    {t("laser_cta_btn_callback")}
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
                        headline: t("laser_seo_headline"),
                        about: ["Laser cutting", "Stainless steel", "Design rules", "Tolerances"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
