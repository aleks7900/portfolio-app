import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Нержавеющая сталь AISI 321
 * Маршрут: <Route path="/guide/aisi321" element={<AISI321Page />} />
 * Требует i18n-ключи aisi321_* (ru/ro словари).
 */

export default function AISI321Page() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("aisi321_toc_intro")},
        {id: "composition", title: t("aisi321_toc_composition")},
        {id: "properties", title: t("aisi321_toc_properties")},
        {id: "applications", title: t("aisi321_toc_applications")},
        {id: "welding", title: t("aisi321_toc_welding")},
        {id: "corrosion", title: t("aisi321_toc_corrosion")},
        {id: "comparison", title: t("aisi321_toc_comparison")},
        {id: "faq", title: t("aisi321_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("aisi321_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("aisi321_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("aisi321_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("aisi321_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("aisi321_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("aisi321_intro_bul1")}</li>
                                <li>{t("aisi321_intro_bul2")}</li>
                                <li>{t("aisi321_intro_bul3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Composition */}
                    <section id="composition" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi321_composition_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">
                                {t("aisi321_composition_p1")}
                            </p>
                            <table className="min-w-full text-sm border divide-y">
                                <thead className="bg-zinc-50 dark:!text-black">
                                <tr>
                                    <th className="p-3 text-left">{t("aisi321_tbl_element")}</th>
                                    <th className="p-3 text-left">{t("aisi321_tbl_percent")}</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y">
                                <tr>
                                    <td className="p-3">Cr</td>
                                    <td className="p-3">17–19%</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Ni</td>
                                    <td className="p-3">9–12%</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Ti</td>
                                    <td className="p-3">≥5×C%</td>
                                </tr>
                                <tr>
                                    <td className="p-3">C</td>
                                    <td className="p-3">≤0.08%</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Mn</td>
                                    <td className="p-3">≤2%</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Si</td>
                                    <td className="p-3">≤1%</td>
                                </tr>
                                </tbody>
                            </table>
                            <p className="text-sm text-zinc-600 mt-3">{t("aisi321_composition_note")}</p>
                        </div>
                    </section>

                    {/* Properties */}
                    <section id="properties" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi321_properties_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("aisi321_prop_1")}</li>
                                <li>{t("aisi321_prop_2")}</li>
                                <li>{t("aisi321_prop_3")}</li>
                                <li>{t("aisi321_prop_4")}</li>
                                <li>{t("aisi321_prop_5")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Applications */}
                    <section id="applications" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi321_applications_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                    <li>{t("aisi321_app_1")}</li>
                                    <li>{t("aisi321_app_2")}</li>
                                    <li>{t("aisi321_app_3")}</li>
                                </ul>
                                <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                    <li>{t("aisi321_app_4")}</li>
                                    <li>{t("aisi321_app_5")}</li>
                                    <li>{t("aisi321_app_6")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Welding */}
                    <section id="welding" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi321_welding_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white">{t("aisi321_welding_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 mt-3 text-zinc-700 dark:!text-white">
                                <li>{t("aisi321_weld_1")}</li>
                                <li>{t("aisi321_weld_2")}</li>
                                <li>{t("aisi321_weld_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Corrosion Resistance */}
                    <section id="corrosion" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi321_corrosion_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white">{t("aisi321_corrosion_p1")}</p>
                        </div>
                    </section>

                    {/* Comparison */}
                    <section id="comparison" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi321_comparison_title")}</h2>
                            <table className="min-w-full text-sm border divide-y">
                                <thead className="bg-zinc-50 dark:!text-black">
                                <tr>
                                    <th className="p-3 text-left">{t("aisi321_tbl_grade")}</th>
                                    <th className="p-3 text-left">{t("aisi321_tbl_feature")}</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y">
                                <tr>
                                    <td className="p-3">AISI 304</td>
                                    <td className="p-3">{t("aisi321_cmp_304")}</td>
                                </tr>
                                <tr>
                                    <td className="p-3">AISI 316</td>
                                    <td className="p-3">{t("aisi321_cmp_316")}</td>
                                </tr>
                                <tr>
                                    <td className="p-3">AISI 321</td>
                                    <td className="p-3 font-medium text-emerald-700">{t("aisi321_cmp_self")}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi321_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("aisi321_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("aisi321_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("aisi321_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("aisi321_faq_a2")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("aisi321_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("aisi321_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="/contacts"
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("aisi321_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("aisi321_cta_btn_callback")}
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
                        headline: t("aisi321_seo_headline"),
                        about: [
                            "Stainless steel AISI 321",
                            "Titanium stabilized steel",
                            "Corrosion resistance",
                            "Welding and heat resistance",
                        ],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
