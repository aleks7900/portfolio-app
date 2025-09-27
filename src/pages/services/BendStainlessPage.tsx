/**
 * Страница: Гибка нержавейки
 * Маршрут: <Route path="/guide/bending-stainless" element={<BendStainlessPage />} />
 * Требует i18n-ключи bend_* (ru/ro словари).
 */
import {useI18n} from "../../shared/i18n/i18n.tsx";


export default function BendStainlessPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("bend_toc_intro")},
        {id: "basics", title: t("bend_toc_basics")},
        {id: "materials", title: t("bend_toc_materials")},
        {id: "kfactor", title: t("bend_toc_kfactor")},
        {id: "design", title: t("bend_toc_design")},
        {id: "tolerances", title: t("bend_toc_tolerances")},
        {id: "files", title: t("bend_toc_files")},
        {id: "pricing", title: t("bend_toc_pricing")},
        {id: "mistakes", title: t("bend_toc_mistakes")},
        {id: "faq", title: t("bend_toc_faq")}
    ];

    const rules = [
        {k: "bend_rule_min_radius", v: t("bend_rule_min_radius")},
        {k: "bend_rule_min_flange", v: t("bend_rule_min_flange")},
        {k: "bend_rule_hole_to_bend", v: t("bend_rule_hole_to_bend")},
        {k: "bend_rule_bend_relief", v: t("bend_rule_bend_relief")},
        {k: "bend_rule_grain", v: t("bend_rule_grain")},
        {k: "bend_rule_seq", v: t("bend_rule_seq")},
        {k: "bend_rule_springback", v: t("bend_rule_springback")}
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 dark:text-white font-semibold">{t("bend_badge")}</p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">{t("bend_title")}</h1>
                <p className="mt-3 text-zinc-600 dark:!text-white/80 max-w-3xl">{t("bend_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div
                        className="sticky top-4 rounded-2xl border bg-white dark:bg-zinc-700 p-4 shadow-sm dark:!text-white">
                        <h2 className="text-sm font-semibold text-zinc-700 dark:!text-white mb-3">{t("bend_toc_title", {defaultValue: "Содержание"})}</h2>
                        <ul className="space-y-2 text-sm">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <a className="text-zinc-700 dark:!text-white hover:text-emerald-700"
                                       href={`#${s.id}`}>{s.title}</a>
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
                            <h2 className="text-xl font-semibold mb-3">{t("bend_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("bend_intro_bul1")}</li>
                                <li>{t("bend_intro_bul2")}</li>
                                <li>{t("bend_intro_bul3")}</li>
                                <li>{t("bend_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Basics */}
                    <section id="basics" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("bend_basics_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("bend_basics_air"), t("bend_basics_coining"), t("bend_basics_radii"), t("bend_basics_springback")].map((c, i) => (
                                    <div key={i} className="rounded-xl border p-4"><p
                                        className="text-zinc-700 dark:!text-white">{c}</p></div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 dark:!text-white/80 mt-3">{t("bend_basics_note")}</p>
                        </div>
                    </section>

                    {/* Materials & Radii */}
                    <section id="materials" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("bend_materials_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-4">{t("bend_materials_p1")}</p>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("bend_tbl_thickness")}</th>
                                        <th className="text-left p-3">{t("bend_tbl_inner_radius")}</th>
                                        <th className="text-left p-3">{t("bend_tbl_min_flange")}</th>
                                        <th className="text-left p-3">{t("bend_tbl_notes")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {[
                                        {thk: "0.5–0.8 mm", rad: "≥ 0.5t", fl: "≥ 2.0t", note: t("bend_tbl_row_thin")},
                                        {
                                            thk: "1.0–1.5 mm",
                                            rad: "≥ 0.8–1.0t",
                                            fl: "≥ 2.5t",
                                            note: t("bend_tbl_row_mid")
                                        },
                                        {
                                            thk: "2.0–3.0 mm",
                                            rad: "≥ 1.0–1.5t",
                                            fl: "≥ 3.0t",
                                            note: t("bend_tbl_row_thick")
                                        },
                                        {
                                            thk: "4.0–5.0 mm",
                                            rad: "≥ 1.5–2.0t",
                                            fl: "≥ 3.5–4.0t",
                                            note: t("bend_tbl_row_max")
                                        },
                                    ].map((r) => (
                                        <tr key={r.thk}>
                                            <td className="p-3">{r.thk}</td>
                                            <td className="p-3">{r.rad}</td>
                                            <td className="p-3">{r.fl}</td>
                                            <td className="p-3">{r.note}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("bend_materials_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("bend_materials_tip_grain")}</li>
                                    <li>{t("bend_materials_tip_finish")}</li>
                                    <li>{t("bend_materials_tip_scratch")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* K-factor & Allowance */}
                    <section id="kfactor" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("bend_kfactor_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("bend_kfactor_p1")}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4 text-sm text-zinc-700 dark:!text-white">
                                    <h3 className="font-medium mb-1">{t("bend_kfactor_formula_ba")}</h3>
                                    <p>{t("bend_kfactor_formula_ba_desc")}</p>
                                </div>
                                <div className="rounded-xl border p-4 text-sm text-zinc-700 dark:!text-white">
                                    <h3 className="font-medium mb-1">{t("bend_kfactor_formula_bd")}</h3>
                                    <p>{t("bend_kfactor_formula_bd_desc")}</p>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 dark:!text-white/80 mt-3">{t("bend_kfactor_note")}</p>
                        </div>
                    </section>

                    {/* Design rules */}
                    <section id="design" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("bend_design_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {rules.map((r) => (
                                    <div key={r.k}
                                         className="rounded-xl border p-4 text-zinc-700 dark:!text-white text-sm">{r.v}</div>
                                ))}
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("bend_design_check_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("bend_design_check_1")}</li>
                                    <li>{t("bend_design_check_2")}</li>
                                    <li>{t("bend_design_check_3")}</li>
                                    <li>{t("bend_design_check_4")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Tolerances */}
                    <section id="tolerances" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("bend_tolerances_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("bend_tolerances_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("bend_tolerances_1")}</li>
                                <li>{t("bend_tolerances_2")}</li>
                                <li>{t("bend_tolerances_3")}</li>
                                <li>{t("bend_tolerances_4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Files */}
                    <section id="files" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("bend_files_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("bend_files_ok_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("bend_files_ok_1")}</li>
                                        <li>{t("bend_files_ok_2")}</li>
                                        <li>{t("bend_files_ok_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("bend_files_bad_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("bend_files_bad_1")}</li>
                                        <li>{t("bend_files_bad_2")}</li>
                                        <li>{t("bend_files_bad_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 dark:!text-white/80 mt-3">{t("bend_files_note")}</p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("bend_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("bend_pricing_1")}</li>
                                <li>{t("bend_pricing_2")}</li>
                                <li>{t("bend_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 dark:!text-white/80 mt-3">{t("bend_pricing_note")}</p>
                        </div>
                    </section>

                    {/* Mistakes */}
                    <section id="mistakes" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("bend_mistakes_title")}</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("bend_mist_draw_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 text-zinc-700 dark:!text-white space-y-1">
                                        <li>{t("bend_mist_draw_1")}</li>
                                        <li>{t("bend_mist_draw_2")}</li>
                                        <li>{t("bend_mist_draw_3")}</li>
                                    </ul>
                                </div>
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("bend_mist_process_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 text-zinc-700 dark:!text-white space-y-1">
                                        <li>{t("bend_mist_process_1")}</li>
                                        <li>{t("bend_mist_process_2")}</li>
                                        <li>{t("bend_mist_process_3")}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("bend_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("bend_faq_q1")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("bend_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("bend_faq_q2")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("bend_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("bend_faq_q3")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("bend_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm dark:!text-white text-white">
                            <h2 className="text-xl font-semibold">{t("bend_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("bend_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">{t("bend_cta_btn_contact")}</a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.('/#callback', '_self');
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("bend_cta_btn_callback")}
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
                        headline: t("bend_seo_headline"),
                        about: ["Stainless bending", "K-factor", "Bend allowance", "Tolerances"],
                        inLanguage: "ru-RU"
                    })
                }}
            />
        </main>
    );
}
