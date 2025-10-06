import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Резка профильного проката
 * Маршрут: <Route path="/guide/cut-profile" element={<CutProfilePage />} />
 * Требует i18n-ключи cutprofile_* (ru/ro словари).
 */

export default function CutProfilePage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("cutprofile_toc_intro")},
        {id: "methods", title: t("cutprofile_toc_methods")},
        {id: "equipment", title: t("cutprofile_toc_equipment")},
        {id: "accuracy", title: t("cutprofile_toc_accuracy")},
        {id: "quality", title: t("cutprofile_toc_quality")},
        {id: "safety", title: t("cutprofile_toc_safety")},
        {id: "faq", title: t("cutprofile_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("cutprofile_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("cutprofile_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("cutprofile_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("cutprofile_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("cutprofile_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("cutprofile_intro_bul1")}</li>
                                <li>{t("cutprofile_intro_bul2")}</li>
                                <li>{t("cutprofile_intro_bul3")}</li>
                                <li>{t("cutprofile_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Methods */}
                    <section id="methods" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("cutprofile_methods_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium mb-2">{t("cutprofile_method_band")}</h3>
                                    <p className="text-sm text-zinc-700 dark:!text-white">{t("cutprofile_method_band_desc")}</p>
                                </div>
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium mb-2">{t("cutprofile_method_abrasive")}</h3>
                                    <p className="text-sm text-zinc-700 dark:!text-white">{t("cutprofile_method_abrasive_desc")}</p>
                                </div>
                                <div className="rounded-xl border p-4 sm:col-span-2">
                                    <h3 className="font-medium mb-2">{t("cutprofile_method_manual")}</h3>
                                    <p className="text-sm text-zinc-700 dark:!text-white">{t("cutprofile_method_manual_desc")}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Equipment */}
                    <section id="equipment" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("cutprofile_equipment_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("cutprofile_equipment_1")}</li>
                                <li>{t("cutprofile_equipment_2")}</li>
                                <li>{t("cutprofile_equipment_3")}</li>
                                <li>{t("cutprofile_equipment_4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Accuracy */}
                    <section id="accuracy" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("cutprofile_accuracy_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("cutprofile_accuracy_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("cutprofile_accuracy_1")}</li>
                                <li>{t("cutprofile_accuracy_2")}</li>
                                <li>{t("cutprofile_accuracy_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Quality */}
                    <section id="quality" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("cutprofile_quality_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-medium mb-2">{t("cutprofile_quality_surface")}</h3>
                                    <ul className="list-disc pl-5 text-zinc-700 dark:!text-white space-y-1">
                                        <li>{t("cutprofile_quality_1")}</li>
                                        <li>{t("cutprofile_quality_2")}</li>
                                        <li>{t("cutprofile_quality_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("cutprofile_quality_end")}</h3>
                                    <ul className="list-disc pl-5 text-zinc-700 dark:!text-white space-y-1">
                                        <li>{t("cutprofile_quality_4")}</li>
                                        <li>{t("cutprofile_quality_5")}</li>
                                        <li>{t("cutprofile_quality_6")}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Safety */}
                    <section id="safety" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("cutprofile_safety_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("cutprofile_safety_1")}</li>
                                <li>{t("cutprofile_safety_2")}</li>
                                <li>{t("cutprofile_safety_3")}</li>
                                <li>{t("cutprofile_safety_4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("cutprofile_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex justify-between">
                                        {t("cutprofile_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("cutprofile_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex justify-between">
                                        {t("cutprofile_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("cutprofile_faq_a2")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white shadow-sm">
                            <h2 className="text-xl font-semibold">{t("cutprofile_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("cutprofile_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("cutprofile_cta_btn_contact")}
                                </a>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    (window as any).open?.('/#callback', '_self');
                                }}
                                   className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10">
                                    {t("cutprofile_cta_btn_callback")}
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
                        headline: t("cutprofile_seo_headline"),
                        about: ["Cutting", "Profile pipes", "Bandsaw", "Abrasive cutting", "Manual grinding"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
