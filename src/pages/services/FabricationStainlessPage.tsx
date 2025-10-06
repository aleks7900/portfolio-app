import {useI18n} from "../../shared/i18n/i18n.tsx"

/**
 * Страница: Изготовление изделий из нержавейки
 * Маршрут: <Route path="/guide/fabric-stainless" element={<FabricationStainlessPage />} />
 * Требует i18n-ключи fabric_* (ru/ro словари)
 */

export default function FabricationStainlessPage() {
    const {t} = useI18n()

    const sections = [
        {id: "intro", title: t("fabric_toc_intro")},
        {id: "stages", title: t("fabric_toc_stages")},
        {id: "equipment", title: t("fabric_toc_equipment")},
        {id: "materials", title: t("fabric_toc_materials")},
        {id: "quality", title: t("fabric_toc_quality")},
        {id: "custom", title: t("fabric_toc_custom")},
        {id: "faq", title: t("fabric_toc_faq")},
    ]

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("fabric_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("fabric_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("fabric_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("fabric_toc_title")}
                        </h2>
                        <ul className="space-y-2 text-sm">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <a
                                        href={`#${s.id}`}
                                        className="text-zinc-700 hover:text-emerald-700"
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
                            <h2 className="text-xl font-semibold mb-3">{t("fabric_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("fabric_intro_bul1")}</li>
                                <li>{t("fabric_intro_bul2")}</li>
                                <li>{t("fabric_intro_bul3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Stages */}
                    <section id="stages" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("fabric_stages_title")}</h2>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>{t("fabric_stage_design")}</li>
                                <li>{t("fabric_stage_cutting")}</li>
                                <li>{t("fabric_stage_bending")}</li>
                                <li>{t("fabric_stage_welding")}</li>
                                <li>{t("fabric_stage_polishing")}</li>
                                <li>{t("fabric_stage_quality")}</li>
                            </ol>
                        </div>
                    </section>

                    {/* Equipment */}
                    <section id="equipment" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("fabric_equipment_title")}</h2>
                            <p className="mb-3">{t("fabric_equipment_intro")}</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("fabric_equipment_laser")}</li>
                                <li>{t("fabric_equipment_press")}</li>
                                <li>{t("fabric_equipment_weld")}</li>
                                <li>{t("fabric_equipment_polish")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Materials */}
                    <section id="materials" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("fabric_materials_title")}</h2>
                            <p>{t("fabric_materials_p1")}</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>{t("fabric_mat_304")}</li>
                                <li>{t("fabric_mat_316")}</li>
                                <li>{t("fabric_mat_321")}</li>
                                <li>{t("fabric_mat_430")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Quality */}
                    <section id="quality" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("fabric_quality_title")}</h2>
                            <p>{t("fabric_quality_p1")}</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>{t("fabric_quality_ctrl1")}</li>
                                <li>{t("fabric_quality_ctrl2")}</li>
                                <li>{t("fabric_quality_ctrl3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Custom orders */}
                    <section id="custom" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("fabric_custom_title")}</h2>
                            <p>{t("fabric_custom_intro")}</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>{t("fabric_custom_point1")}</li>
                                <li>{t("fabric_custom_point2")}</li>
                                <li>{t("fabric_custom_point3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("fabric_toc_faq")}</h2>
                            <details className="group rounded-xl border p-4">
                                <summary className="cursor-pointer font-medium flex justify-between">
                                    {t("fabric_faq_q1")}
                                    <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                </summary>
                                <p className="mt-2 text-zinc-700 dark:text-white">{t("fabric_faq_a1")}</p>
                            </details>
                            <details className="group rounded-xl border p-4">
                                <summary className="cursor-pointer font-medium flex justify-between">
                                    {t("fabric_faq_q2")}
                                    <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                </summary>
                                <p className="mt-2 text-zinc-700 dark:text-white">{t("fabric_faq_a2")}</p>
                            </details>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
                            <h2 className="text-xl font-semibold">{t("fabric_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("fabric_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("fabric_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        ;(window as any).open?.("/#callback", "_self")
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("fabric_cta_btn_callback")}
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
                        serviceType: "Изготовление изделий из нержавеющей стали",
                        headline: t("fabric_seo_headline"),
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    )
}
