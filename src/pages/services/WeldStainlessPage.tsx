/**
 * Страница: Сварка нержавейки
 * Маршрут: <Route path="/guide/weld-stainless" element={<WeldStainlessPage />} />
 * Требует i18n-ключи weld_* (ru/ro словари).
 * Основано на LaserCutStainlessPage.tsx:contentReference[oaicite:1]{index=1}
 */
import {useI18n} from "../../shared/i18n/i18n.tsx";


export default function WeldStainlessPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("weld_toc_intro")},
        {id: "capabilities", title: t("weld_toc_capabilities")},
        {id: "materials", title: t("weld_toc_materials")},
        {id: "quality", title: t("weld_toc_quality")},
        {id: "design", title: t("weld_toc_design")},
        {id: "tolerances", title: t("weld_toc_tolerances")},
        {id: "files", title: t("weld_toc_files")},
        {id: "pricing", title: t("weld_toc_pricing")},
        {id: "mistakes", title: t("weld_toc_mistakes")},
        {id: "faq", title: t("weld_toc_faq")},
    ];

    const rules = [
        {k: "weld_rule_joint_prep", v: t("weld_rule_joint_prep")},
        {k: "weld_rule_gap", v: t("weld_rule_gap")},
        {k: "weld_rule_heat", v: t("weld_rule_heat")},
        {k: "weld_rule_sequence", v: t("weld_rule_sequence")},
        {k: "weld_rule_shield", v: t("weld_rule_shield")},
        {k: "weld_rule_finish", v: t("weld_rule_finish")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("weld_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("weld_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("weld_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("weld_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("weld_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("weld_intro_bul1")}</li>
                                <li>{t("weld_intro_bul2")}</li>
                                <li>{t("weld_intro_bul3")}</li>
                                <li>{t("weld_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Capabilities */}
                    <section id="capabilities" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("weld_capabilities_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("weld_cap_tig"), t("weld_cap_mig"), t("weld_cap_spot"), t("weld_cap_thickness")].map((c, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <p className="text-zinc-700 dark:!text-white">{c}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("weld_cap_note")}</p>
                        </div>
                    </section>

                    {/* Materials & Filler */}
                    <section id="materials" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("weld_materials_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-4">{t("weld_materials_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("weld_materials_1")}</li>
                                <li>{t("weld_materials_2")}</li>
                                <li>{t("weld_materials_3")}</li>
                            </ul>

                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("weld_materials_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("weld_materials_tip_filler")}</li>
                                    <li>{t("weld_materials_tip_clean")}</li>
                                    <li>{t("weld_materials_tip_gas")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Weld quality & finishing */}
                    <section id="quality" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("weld_quality_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("weld_quality_bead_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("weld_quality_bead_1")}</li>
                                        <li>{t("weld_quality_bead_2")}</li>
                                        <li>{t("weld_quality_bead_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("weld_quality_finish_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("weld_quality_finish_1")}</li>
                                        <li>{t("weld_quality_finish_2")}</li>
                                        <li>{t("weld_quality_finish_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("weld_quality_note")}</p>
                        </div>
                    </section>

                    {/* Design rules */}
                    <section id="design" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("weld_design_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {rules.map((r) => (
                                    <div key={r.k}
                                         className="rounded-xl border p-4 text-zinc-700 dark:!text-white text-sm">{r.v}</div>
                                ))}
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("weld_design_check_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("weld_design_check_1")}</li>
                                    <li>{t("weld_design_check_2")}</li>
                                    <li>{t("weld_design_check_3")}</li>
                                    <li>{t("weld_design_check_4")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Tolerances */}
                    <section id="tolerances" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("weld_tolerances_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("weld_tolerances_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("weld_tolerances_1")}</li>
                                <li>{t("weld_tolerances_2")}</li>
                                <li>{t("weld_tolerances_3")}</li>
                                <li>{t("weld_tolerances_4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Files */}
                    <section id="files" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("weld_files_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("weld_files_ok_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("weld_files_ok_1")}</li>
                                        <li>{t("weld_files_ok_2")}</li>
                                        <li>{t("weld_files_ok_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("weld_files_bad_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("weld_files_bad_1")}</li>
                                        <li>{t("weld_files_bad_2")}</li>
                                        <li>{t("weld_files_bad_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("weld_files_note")}</p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:!bg-zinc-700 p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("weld_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("weld_pricing_1")}</li>
                                <li>{t("weld_pricing_2")}</li>
                                <li>{t("weld_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("weld_pricing_note")}</p>
                        </div>
                    </section>

                    {/* Mistakes */}
                    <section id="mistakes" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("weld_mistakes_title")}</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("weld_mist_joint_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 text-zinc-700 dark:!text-white space-y-1">
                                        <li>{t("weld_mist_joint_1")}</li>
                                        <li>{t("weld_mist_joint_2")}</li>
                                        <li>{t("weld_mist_joint_3")}</li>
                                    </ul>
                                </div>
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("weld_mist_heat_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 text-zinc-700 dark:!text-white space-y-1">
                                        <li>{t("weld_mist_heat_1")}</li>
                                        <li>{t("weld_mist_heat_2")}</li>
                                        <li>{t("weld_mist_heat_3")}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("weld_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("weld_faq_q1")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("weld_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("weld_faq_q2")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("weld_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("weld_faq_q3")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("weld_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm dark:!text-white text-white">
                            <h2 className="text-xl font-semibold">{t("weld_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("weld_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="/contacts"
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("weld_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("weld_cta_btn_callback")}
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
                        headline: t("weld_seo_headline"),
                        about: ["Welding", "Stainless steel", "TIG", "MIG", "Spot welding"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
