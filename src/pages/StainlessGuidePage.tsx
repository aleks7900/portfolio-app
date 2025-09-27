import {useI18n} from "../shared/i18n/i18n.tsx";

/**
 * Страница: Гид по нержавейке
 * Маршрут: <Route path="/guide/stainless" element={<StainlessGuidePage />} />
 * Требует i18n-ключи из ru.json/ro.json (guide_*).
 */

export default function StainlessGuidePage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("guide_toc_intro")},
        {id: "grades", title: t("guide_toc_grades")},
        {id: "finishes", title: t("guide_toc_finishes")},
        {id: "care", title: t("guide_toc_care")},
        {id: "measure", title: t("guide_toc_measure")},
        {id: "faq", title: t("guide_toc_faq")},
    ];

    const finishes = [
        {
            title: t("guide_fin_2b_title"),
            desc: t("guide_fin_2b_desc"),
            ra: t("guide_fin_2b_ra"),
            use: t("guide_fin_2b_use"),
        },
        {
            title: t("guide_fin_ba_title"),
            desc: t("guide_fin_ba_desc"),
            ra: t("guide_fin_ba_ra"),
            use: t("guide_fin_ba_use"),
        },
        {
            title: t("guide_fin_no4_title"),
            desc: t("guide_fin_no4_desc"),
            ra: t("guide_fin_no4_ra"),
            use: t("guide_fin_no4_use"),
        },
        {
            title: t("guide_fin_hl_title"),
            desc: t("guide_fin_hl_desc"),
            ra: t("guide_fin_hl_ra"),
            use: t("guide_fin_hl_use"),
        },
        {
            title: t("guide_fin_vib_title"),
            desc: t("guide_fin_vib_desc"),
            ra: t("guide_fin_vib_ra"),
            use: t("guide_fin_vib_use"),
        },
        {
            title: t("guide_fin_mirror_title"),
            desc: t("guide_fin_mirror_desc"),
            ra: t("guide_fin_mirror_ra"),
            use: t("guide_fin_mirror_use"),
        },
        {
            title: t("guide_fin_bead_title"),
            desc: t("guide_fin_bead_desc"),
            ra: t("guide_fin_bead_ra"),
            use: t("guide_fin_bead_use"),
        },
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 mt-18">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("guide_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("guide_title")}
                </h1>
                <p className="mt-3 text-zinc-600 dark:!text-black max-w-3xl">
                    {t("guide_intro")}
                </p>
            </header>

            {/* CONTENT LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {/* Можно вынести в ключ guide_toc_title при желании */}
                            Содержание
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
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 dark:!text-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">{t("guide_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("guide_intro_bul1")}</li>
                                <li>{t("guide_intro_bul2")}</li>
                                <li>{t("guide_intro_bul3")}</li>
                                <li>{t("guide_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Grades 304 vs 316 */}
                    <section id="grades" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 dark:text-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("guide_grades_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-4">
                                {t("guide_grades_p1")}
                            </p>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50">
                                    <tr>
                                        <th className="text-left dark:!text-black p-3">{t("guide_tbl_head_param")}</th>
                                        <th className="text-left dark:!text-black p-3">{t("guide_tbl_head_304")}</th>
                                        <th className="text-left dark:!text-black p-3">{t("guide_tbl_head_316")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    <tr>
                                        <td className="p-3">{t("guide_tbl_row_comp")}</td>
                                        <td className="p-3">{t("guide_tbl_row_comp_304")}</td>
                                        <td className="p-3">{t("guide_tbl_row_comp_316")}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">{t("guide_tbl_row_corr")}</td>
                                        <td className="p-3">{t("guide_tbl_row_corr_304")}</td>
                                        <td className="p-3">{t("guide_tbl_row_corr_316")}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">{t("guide_tbl_row_mag")}</td>
                                        <td className="p-3">{t("guide_tbl_row_mag_304")}</td>
                                        <td className="p-3">{t("guide_tbl_row_mag_316")}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">{t("guide_tbl_row_food")}</td>
                                        <td className="p-3">{t("guide_tbl_row_food_304")}</td>
                                        <td className="p-3">{t("guide_tbl_row_food_316")}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">{t("guide_tbl_row_price")}</td>
                                        <td className="p-3">{t("guide_tbl_row_price_304")}</td>
                                        <td className="p-3">{t("guide_tbl_row_price_316")}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">{t("guide_tbl_row_where")}</td>
                                        <td className="p-3">{t("guide_tbl_row_where_304")}</td>
                                        <td className="p-3">{t("guide_tbl_row_where_316")}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("guide_grades_note_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("guide_grades_note_bul1")}</li>
                                    <li>{t("guide_grades_note_bul2")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Finishes */}
                    <section id="finishes" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 dark:text-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("guide_finishes_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-4">
                                {t("guide_finishes_p1")}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {finishes.map((f) => (
                                    <div key={f.title} className="rounded-xl border p-4">
                                        <h3 className="font-medium">{f.title}</h3>
                                        <p className="text-sm text-zinc-700 dark:!text-white mt-1">{f.desc}</p>
                                        <div className="flex gap-3 text-xs mt-2">
                                            <span
                                                className="inline-flex items-center rounded-full border px-2 py-0.5">Ra {f.ra}</span>
                                            <span className="inline-flex items-center rounded-full border px-2 py-0.5">
                                                {t("guide_fin_tip").slice(0, 0) /* no-op to ensure key in bundle */}
                                                {t("guide_fin_2b_use").slice(0, 0) /* no-op to preload */}
                                                {t("guide_fin_ba_use").slice(0, 0)}
                                                {t("guide_fin_no4_use").slice(0, 0)}
                                                {t("guide_fin_hl_use").slice(0, 0)}
                                                {t("guide_fin_vib_use").slice(0, 0)}
                                                {t("guide_fin_mirror_use").slice(0, 0)}
                                                {t("guide_fin_bead_use").slice(0, 0)}
                                                {t("guide_finishes_title").slice(0, 0)}
                                                {/* label: Применение: */} {t("guide_tbl_row_where")} : {f.use}
                      </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 text-sm text-zinc-600">
                                <p>{t("guide_fin_tip")}</p>
                            </div>
                        </div>
                    </section>

                    {/* Care */}
                    <section id="care" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 dark:bg-zinc-700 dark:!text-white shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("guide_care_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("guide_care_do")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("guide_care_do_1")}</li>
                                        <li>{t("guide_care_do_2")}</li>
                                        <li>{t("guide_care_do_3")}</li>
                                        <li>{t("guide_care_do_4")}</li>
                                        <li>{t("guide_care_do_5")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("guide_care_dont")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("guide_care_dont_1")}</li>
                                        <li>{t("guide_care_dont_2")}</li>
                                        <li>{t("guide_care_dont_3")}</li>
                                        <li>{t("guide_care_dont_4")}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-zinc-600">
                                <p>{t("guide_care_teastain")}</p>
                            </div>
                        </div>
                    </section>

                    {/* Measurement mistakes */}
                    <section id="measure" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 dark:bg-zinc-700 dark:text-white shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("guide_measure_title")}</h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("guide_meas_rail_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 text-zinc-700 dark:!text-white space-y-1">
                                        <li>{t("guide_meas_rail_1")}</li>
                                        <li>{t("guide_meas_rail_2")}</li>
                                        <li>{t("guide_meas_rail_3")}</li>
                                        <li>{t("guide_meas_rail_4")}</li>
                                    </ul>
                                </div>

                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("guide_meas_top_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 text-zinc-700 dark:!text-white space-y-1">
                                        <li>{t("guide_meas_top_1")}</li>
                                        <li>{t("guide_meas_top_2")}</li>
                                        <li>{t("guide_meas_top_3")}</li>
                                        <li>{t("guide_meas_top_4")}</li>
                                    </ul>
                                </div>

                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("guide_meas_canopy_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 text-zinc-700 dark:!text-white space-y-1">
                                        <li>{t("guide_meas_canopy_1")}</li>
                                        <li>{t("guide_meas_canopy_2")}</li>
                                        <li>{t("guide_meas_canopy_3")}</li>
                                    </ul>
                                </div>

                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("guide_meas_case_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 text-zinc-700 dark:!text-white space-y-1">
                                        <li>{t("guide_meas_case_1")}</li>
                                        <li>{t("guide_meas_case_2")}</li>
                                        <li>{t("guide_meas_case_3")}</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("guide_meas_check_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("guide_meas_check_1")}</li>
                                    <li>{t("guide_meas_check_2")}</li>
                                    <li>{t("guide_meas_check_3")}</li>
                                    <li>{t("guide_meas_check_4")}</li>
                                    <li>{t("guide_meas_check_5")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 dark:bg-zinc-700 dark:text-white shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("guide_faq_title")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("guide_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("guide_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("guide_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("guide_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("guide_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("guide_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("guide_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("guide_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="/contacts"
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("guide_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("guide_cta_btn_callback")}
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
                        headline: t("guide_seo_headline"),
                        about: ["AISI 304", "AISI 316", "Stainless finishes", "Care", "Measurement"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
