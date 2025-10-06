import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Прочее из нержавейки
 * Маршрут: <Route path="/guide/other-stainless" element={<OtherStainlessPage />} />
 * Требует i18n-ключи other_* (ru/ro словари).
 */

export default function OtherStainlessPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("other_toc_intro")},
        {id: "categories", title: t("other_toc_categories")},
        {id: "materials", title: t("other_toc_materials")},
        {id: "finishing", title: t("other_toc_finishing")},
        {id: "design", title: t("other_toc_design")},
        {id: "options", title: t("other_toc_options")},
        {id: "pricing", title: t("other_toc_pricing")},
        {id: "faq", title: t("other_toc_faq")},
    ];

    const cats = [
        {k: "other_cat_showcases"},
        {k: "other_cat_sport"},
        {k: "other_cat_signs"},
        {k: "other_cat_bbq"},
        {k: "other_cat_tanks"},
        {k: "other_cat_decor"},
        {k: "other_cat_custom"},
    ];

    const options = [
        {k: "other_opt_glass"},
        {k: "other_opt_wood"},
        {k: "other_opt_powder"},
        {k: "other_opt_logos"},
        {k: "other_opt_wheels"},
        {k: "other_opt_sanitary"},
        {k: "other_opt_docs"},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("other_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("other_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("other_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("other_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("other_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("other_intro_b1")}</li>
                                <li>{t("other_intro_b2")}</li>
                                <li>{t("other_intro_b3")}</li>
                                <li>{t("other_intro_b4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Categories */}
                    <section id="categories" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("other_categories_title")}</h2>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {cats.map((c) => (
                                    <div key={c.k} className="rounded-xl border p-4">
                                        <p className="font-medium">{t(`${c.k}_title`)}</p>
                                        <p className="text-sm text-zinc-600 dark:!text-white/80 mt-1">
                                            {t(`${c.k}_desc`)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("other_categories_note")}</p>
                        </div>
                    </section>

                    {/* Materials */}
                    <section id="materials" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("other_materials_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-4">{t("other_materials_p1")}</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("other_tbl_grade")}</th>
                                        <th className="text-left p-3">{t("other_tbl_finish")}</th>
                                        <th className="text-left p-3">{t("other_tbl_use")}</th>
                                        <th className="text-left p-3">{t("other_tbl_note")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {[
                                        {
                                            g: "AISI 304",
                                            f: t("other_row_304_finish"),
                                            u: t("other_row_304_use"),
                                            n: t("other_row_304_note")
                                        },
                                        {
                                            g: "AISI 316",
                                            f: t("other_row_316_finish"),
                                            u: t("other_row_316_use"),
                                            n: t("other_row_316_note")
                                        },
                                        {
                                            g: "AISI 430",
                                            f: t("other_row_430_finish"),
                                            u: t("other_row_430_use"),
                                            n: t("other_row_430_note")
                                        },
                                    ].map(r => (
                                        <tr key={r.g}>
                                            <td className="p-3">{r.g}</td>
                                            <td className="p-3">{r.f}</td>
                                            <td className="p-3">{r.u}</td>
                                            <td className="p-3">{r.n}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("other_materials_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("other_materials_tip_1")}</li>
                                    <li>{t("other_materials_tip_2")}</li>
                                    <li>{t("other_materials_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Finishing */}
                    <section id="finishing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("other_finishing_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("other_finishing_surface_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("other_finishing_surface_1")}</li>
                                        <li>{t("other_finishing_surface_2")}</li>
                                        <li>{t("other_finishing_surface_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("other_finishing_weld_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("other_finishing_weld_1")}</li>
                                        <li>{t("other_finishing_weld_2")}</li>
                                        <li>{t("other_finishing_weld_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("other_finishing_note")}</p>
                        </div>
                    </section>

                    {/* Design */}
                    <section id="design" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("other_design_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4 text-sm">
                                    <p className="font-medium mb-2">{t("other_design_blocking_title")}</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>{t("other_design_blocking_1")}</li>
                                        <li>{t("other_design_blocking_2")}</li>
                                        <li>{t("other_design_blocking_3")}</li>
                                    </ul>
                                </div>
                                <div className="rounded-xl border p-4 text-sm">
                                    <p className="font-medium mb-2">{t("other_design_docs_title")}</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>{t("other_design_docs_1")}</li>
                                        <li>{t("other_design_docs_2")}</li>
                                        <li>{t("other_design_docs_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("other_design_check_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("other_design_check_1")}</li>
                                    <li>{t("other_design_check_2")}</li>
                                    <li>{t("other_design_check_3")}</li>
                                    <li>{t("other_design_check_4")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Options / комплектация */}
                    <section id="options" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("other_options_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {options.map(o => (
                                    <div key={o.k}
                                         className="rounded-xl border p-4 text-zinc-700 dark:!text-white text-sm">
                                        {t(o.k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("other_options_note")}</p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:!bg-zinc-700 p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("other_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("other_pricing_1")}</li>
                                <li>{t("other_pricing_2")}</li>
                                <li>{t("other_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("other_pricing_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("other_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("other_faq_q1")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("other_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("other_faq_q2")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("other_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("other_faq_q3")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("other_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm dark:!text-white text-white">
                            <h2 className="text-xl font-semibold">{t("other_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("other_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("other_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.('/#callback', '_self');
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("other_cta_btn_callback")}
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
                        "@type": "Service",
                        name: t("other_seo_name"),
                        serviceType: "Custom stainless steel products",
                        areaServed: "Moldova",
                        description: t("other_intro"),
                        hasOfferCatalog: {
                            "@type": "OfferCatalog",
                            name: t("other_categories_title"),
                            itemListElement: cats.map((c, i) => ({
                                "@type": "Offer",
                                position: i + 1,
                                itemOffered: {
                                    "@type": "Product",
                                    name: t(`${c.k}_title`)
                                }
                            }))
                        },
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
