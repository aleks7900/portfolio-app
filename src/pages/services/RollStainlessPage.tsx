/**
 * Страница: Вальцовка нержавейки
 * Маршрут: <Route path="/guide/roll-stainless" element={<RollStainlessPage />} />
 * Требует i18n-ключи roll_* (ru/ro словари).
 */
import {useI18n} from "../../shared/i18n/i18n.tsx";


export default function RollStainlessPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("roll_toc_intro")},
        {id: "capabilities", title: t("roll_toc_capabilities")},
        {id: "materials", title: t("roll_toc_materials")},
        {id: "quality", title: t("roll_toc_quality")},
        {id: "design", title: t("roll_toc_design")},
        {id: "tolerances", title: t("roll_toc_tolerances")},
        {id: "files", title: t("roll_toc_files")},
        {id: "pricing", title: t("roll_toc_pricing")},
        {id: "mistakes", title: t("roll_toc_mistakes")},
        {id: "faq", title: t("roll_toc_faq")},
    ];

    const rules = [
        {k: "roll_rule_min_diam", v: t("roll_rule_min_diam")},
        {k: "roll_rule_step", v: t("roll_rule_step")},
        {k: "roll_rule_edge", v: t("roll_rule_edge")},
        {k: "roll_rule_thickness", v: t("roll_rule_thickness")},
        {k: "roll_rule_taper", v: t("roll_rule_taper")},
        {k: "roll_rule_cone", v: t("roll_rule_cone")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("roll_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("roll_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("roll_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("roll_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("roll_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("roll_intro_bul1")}</li>
                                <li>{t("roll_intro_bul2")}</li>
                                <li>{t("roll_intro_bul3")}</li>
                                <li>{t("roll_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Capabilities */}
                    <section id="capabilities" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("roll_capabilities_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("roll_cap_diam"), t("roll_cap_length"), t("roll_cap_cone"), t("roll_cap_repeat")].map((c, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <p className="text-zinc-700 dark:!text-white">{c}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("roll_cap_note")}</p>
                        </div>
                    </section>

                    {/* Materials & Thickness */}
                    <section id="materials" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("roll_materials_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-4">{t("roll_materials_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("roll_materials_1")}</li>
                                <li>{t("roll_materials_2")}</li>
                                <li>{t("roll_materials_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Quality */}
                    <section id="quality" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("roll_quality_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("roll_quality_1")}</li>
                                <li>{t("roll_quality_2")}</li>
                                <li>{t("roll_quality_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Design rules */}
                    <section id="design" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("roll_design_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {rules.map((r) => (
                                    <div key={r.k}
                                         className="rounded-xl border p-4 text-zinc-700 dark:!text-white text-sm">{r.v}</div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Tolerances */}
                    <section id="tolerances" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("roll_tolerances_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("roll_tolerances_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("roll_tolerances_1")}</li>
                                <li>{t("roll_tolerances_2")}</li>
                                <li>{t("roll_tolerances_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Files */}
                    <section id="files" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("roll_files_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("roll_files_ok_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("roll_files_ok_1")}</li>
                                        <li>{t("roll_files_ok_2")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("roll_files_bad_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("roll_files_bad_1")}</li>
                                        <li>{t("roll_files_bad_2")}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("roll_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("roll_pricing_1")}</li>
                                <li>{t("roll_pricing_2")}</li>
                                <li>{t("roll_pricing_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Mistakes */}
                    <section id="mistakes" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("roll_mistakes_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("roll_mistake_1")}</li>
                                <li>{t("roll_mistake_2")}</li>
                                <li>{t("roll_mistake_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("roll_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("roll_faq_q1")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("roll_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("roll_faq_q2")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("roll_faq_a2")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("roll_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("roll_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("roll_cta_btn_contact")}
                                </a>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    (window as any).open?.('/#callback', '_self');
                                }}
                                   className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10">
                                    {t("roll_cta_btn_callback")}
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
                        headline: t("roll_seo_headline"),
                        about: ["Rolling", "Stainless steel", "Cylinders", "Cones"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
