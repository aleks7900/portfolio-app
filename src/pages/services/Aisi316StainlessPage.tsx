import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Нержавеющая сталь AISI 316
 * Маршрут: <Route path="/guide/aisi316-stainless" element={<Aisi316StainlessPage />} />
 * Требует i18n-ключи aisi316_* (ru/ro словари).
 */

export default function Aisi316StainlessPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("aisi316_toc_intro")},
        {id: "properties", title: t("aisi316_toc_properties")},
        {id: "composition", title: t("aisi316_toc_composition")},
        {id: "advantages", title: t("aisi316_toc_advantages")},
        {id: "applications", title: t("aisi316_toc_applications")},
        {id: "comparison", title: t("aisi316_toc_comparison")},
        {id: "processing", title: t("aisi316_toc_processing")},
        {id: "faq", title: t("aisi316_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("aisi316_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("aisi316_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("aisi316_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("aisi316_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("aisi316_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("aisi316_intro_bul1")}</li>
                                <li>{t("aisi316_intro_bul2")}</li>
                                <li>{t("aisi316_intro_bul3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Properties */}
                    <section id="properties" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("aisi316_properties_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("aisi316_prop_corrosion")}</li>
                                <li>{t("aisi316_prop_strength")}</li>
                                <li>{t("aisi316_prop_temperature")}</li>
                                <li>{t("aisi316_prop_magnetic")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Composition */}
                    <section id="composition" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("aisi316_composition_title")}
                            </h2>
                            <p className="mb-4">{t("aisi316_composition_p1")}</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("aisi316_tbl_element")}</th>
                                        <th className="text-left p-3">{t("aisi316_tbl_percent")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    <tr>
                                        <td className="p-3">Cr (Хром)</td>
                                        <td className="p-3">16–18%</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">Ni (Никель)</td>
                                        <td className="p-3">10–14%</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">Mo (Молибден)</td>
                                        <td className="p-3">2–3%</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">C, Mn, Si и др.</td>
                                        <td className="p-3">≤1%</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* Advantages */}
                    <section id="advantages" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi316_adv_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("aisi316_adv_1")}</li>
                                <li>{t("aisi316_adv_2")}</li>
                                <li>{t("aisi316_adv_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Applications */}
                    <section id="applications" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("aisi316_app_title")}
                            </h2>
                            <p>{t("aisi316_app_intro")}</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>{t("aisi316_app_food")}</li>
                                <li>{t("aisi316_app_medical")}</li>
                                <li>{t("aisi316_app_marine")}</li>
                                <li>{t("aisi316_app_arch")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Comparison with AISI 304 */}
                    <section id="comparison" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi316_comp_title")}</h2>
                            <p>{t("aisi316_comp_p1")}</p>
                            <div className="mt-3 overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="p-3">{t("aisi316_tbl_param")}</th>
                                        <th className="p-3">AISI 304</th>
                                        <th className="p-3">AISI 316</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    <tr>
                                        <td className="p-3">{t("aisi316_comp_corrosion")}</td>
                                        <td className="p-3">Хорошая</td>
                                        <td className="p-3">Отличная (с Mo)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">{t("aisi316_comp_cost")}</td>
                                        <td className="p-3">Ниже</td>
                                        <td className="p-3">Выше</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">{t("aisi316_comp_use")}</td>
                                        <td className="p-3">Общепромышленное</td>
                                        <td className="p-3">Морское, химическое</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* Processing & Care */}
                    <section id="processing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi316_proc_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("aisi316_proc_weld")}</li>
                                <li>{t("aisi316_proc_cut")}</li>
                                <li>{t("aisi316_proc_polish")}</li>
                                <li>{t("aisi316_proc_clean")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("aisi316_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex justify-between">
                                        {t("aisi316_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("aisi316_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex justify-between">
                                        {t("aisi316_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("aisi316_faq_a2")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white shadow-sm">
                            <h2 className="text-xl font-semibold">{t("aisi316_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("aisi316_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="/contacts"
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("aisi316_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("aisi316_cta_btn_callback")}
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
                        headline: t("aisi316_seo_headline"),
                        about: [
                            "AISI 316 stainless steel",
                            "Properties",
                            "Applications",
                            "Comparison with AISI 304",
                        ],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
