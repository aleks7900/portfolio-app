import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Нержавеющая сталь AISI 430
 * Маршрут: <Route path="/guide/aisi-430" element={<AISI430Page />} />
 * Требует i18n-ключи aisi430_* (ru/ro словари).
 */

export default function AISI430Page() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("aisi430_toc_intro")},
        {id: "composition", title: t("aisi430_toc_composition")},
        {id: "properties", title: t("aisi430_toc_properties")},
        {id: "applications", title: t("aisi430_toc_applications")},
        {id: "advantages", title: t("aisi430_toc_advantages")},
        {id: "limitations", title: t("aisi430_toc_limitations")},
        {id: "processing", title: t("aisi430_toc_processing")},
        {id: "comparison", title: t("aisi430_toc_comparison")},
        {id: "faq", title: t("aisi430_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("aisi430_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("aisi430_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("aisi430_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("aisi430_toc_title", {defaultValue: "Содержание"})}
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
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">
                                {t("aisi430_toc_intro")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("aisi430_intro_bul1")}</li>
                                <li>{t("aisi430_intro_bul2")}</li>
                                <li>{t("aisi430_intro_bul3")}</li>
                                <li>{t("aisi430_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Composition */}
                    <section id="composition" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("aisi430_composition_title")}
                            </h2>
                            <table className="min-w-full text-sm border divide-y">
                                <thead className="bg-zinc-50 dark:!text-black">
                                <tr>
                                    <th className="text-left p-3">
                                        {t("aisi430_tbl_element")}
                                    </th>
                                    <th className="text-left p-3">
                                        {t("aisi430_tbl_percent")}
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y">
                                {[
                                    {el: "C", val: "≤ 0.12%"},
                                    {el: "Cr", val: "16.0–18.0%"},
                                    {el: "Ni", val: "≤ 0.75%"},
                                    {el: "Mn", val: "≤ 1.00%"},
                                    {el: "Si", val: "≤ 1.00%"},
                                    {el: "P", val: "≤ 0.040%"},
                                    {el: "S", val: "≤ 0.030%"},
                                ].map((r) => (
                                    <tr key={r.el}>
                                        <td className="p-3">{r.el}</td>
                                        <td className="p-3">{r.val}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("aisi430_composition_note")}
                            </p>
                        </div>
                    </section>

                    {/* Properties */}
                    <section id="properties" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("aisi430_properties_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("aisi430_prop_corrosion")}</li>
                                <li>{t("aisi430_prop_strength")}</li>
                                <li>{t("aisi430_prop_weld")}</li>
                                <li>{t("aisi430_prop_magnetic")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("aisi430_properties_note")}
                            </p>
                        </div>
                    </section>

                    {/* Applications */}
                    <section id="applications" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("aisi430_applications_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    t("aisi430_app_kitchen"),
                                    t("aisi430_app_decor"),
                                    t("aisi430_app_auto"),
                                    t("aisi430_app_vent"),
                                ].map((a, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        {a}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Advantages */}
                    <section id="advantages" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("aisi430_advantages_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("aisi430_adv_cost")}</li>
                                <li>{t("aisi430_adv_form")}</li>
                                <li>{t("aisi430_adv_clean")}</li>
                                <li>{t("aisi430_adv_recycle")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Limitations */}
                    <section id="limitations" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("aisi430_limitations_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("aisi430_lim_weld")}</li>
                                <li>{t("aisi430_lim_temp")}</li>
                                <li>{t("aisi430_lim_corrosion")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Processing */}
                    <section id="processing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("aisi430_processing_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("aisi430_proc_cut")}</li>
                                <li>{t("aisi430_proc_bend")}</li>
                                <li>{t("aisi430_proc_polish")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Comparison */}
                    <section id="comparison" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("aisi430_comparison_title")}
                            </h2>
                            <p className="text-zinc-700 dark:!text-white mb-4">
                                {t("aisi430_comparison_text")}
                            </p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("aisi430_toc_faq")}
                            </h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("aisi430_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("aisi430_faq_a1")}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("aisi430_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("aisi430_faq_a2")}
                                    </p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("aisi430_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("aisi430_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="/contacts"
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("aisi430_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("aisi430_cta_btn_callback")}
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
                        headline: t("aisi430_seo_headline"),
                        about: ["Stainless steel AISI 430", "Ferritic steel", "Applications", "Composition"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
