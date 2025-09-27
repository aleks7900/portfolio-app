/**
 * Страница: Конструкторское проектирование изделий из нержавейки
 * Маршрут: <Route path="/guide/design-stainless" element={<DesignStainlessPage />} />
 * Требует i18n-ключи design_* (ru/ro словари).
 */
import {useI18n} from "../../shared/i18n/i18n.tsx";


export default function DesignStainlessPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("design_toc_intro")},
        {id: "principles", title: t("design_toc_principles")},
        {id: "materials", title: t("design_toc_materials")},
        {id: "connections", title: t("design_toc_connections")},
        {id: "ergonomics", title: t("design_toc_ergonomics")},
        {id: "tolerances", title: t("design_toc_tolerances")},
        {id: "docs", title: t("design_toc_docs")},
        {id: "mistakes", title: t("design_toc_mistakes")},
        {id: "faq", title: t("design_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 dark:text-white font-semibold">
                    {t("design_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("design_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("design_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("design_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("design_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("design_intro_bul1")}</li>
                                <li>{t("design_intro_bul2")}</li>
                                <li>{t("design_intro_bul3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Principles */}
                    <section id="principles" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("design_principles_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white">{t("design_principles_p1")}</p>
                            <ul className="list-disc pl-5 mt-3 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("design_principles_1")}</li>
                                <li>{t("design_principles_2")}</li>
                                <li>{t("design_principles_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Materials */}
                    <section id="materials" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("design_materials_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("design_materials_p1")}</p>
                            <p className="text-zinc-700 dark:!text-white">{t("design_materials_p2")}</p>
                        </div>
                    </section>

                    {/* Connections */}
                    <section id="connections" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("design_connections_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4">{t("design_conn_welding")}</div>
                                <div className="rounded-xl border p-4">{t("design_conn_bolts")}</div>
                                <div className="rounded-xl border p-4">{t("design_conn_gluing")}</div>
                                <div className="rounded-xl border p-4">{t("design_conn_other")}</div>
                            </div>
                        </div>
                    </section>

                    {/* Ergonomics */}
                    <section id="ergonomics" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("design_ergonomics_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("design_ergonomics_1")}</li>
                                <li>{t("design_ergonomics_2")}</li>
                                <li>{t("design_ergonomics_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Tolerances */}
                    <section id="tolerances" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("design_tolerances_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-2">{t("design_tolerances_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("design_tolerances_1")}</li>
                                <li>{t("design_tolerances_2")}</li>
                                <li>{t("design_tolerances_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Docs */}
                    <section id="docs" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("design_docs_title")}</h2>
                            <ul className="list-disc pl-5 text-zinc-700 dark:!text-white">
                                <li>{t("design_docs_drawings")}</li>
                                <li>{t("design_docs_specs")}</li>
                                <li>{t("design_docs_3d")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("design_docs_note")}</p>
                        </div>
                    </section>

                    {/* Mistakes */}
                    <section id="mistakes" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("design_mistakes_title")}</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("design_mist_struct_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                        <li>{t("design_mist_struct_1")}</li>
                                        <li>{t("design_mist_struct_2")}</li>
                                    </ul>
                                </div>
                                <div className="rounded-xl border p-4">
                                    <h3 className="font-medium">{t("design_mist_erg_title")}</h3>
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                        <li>{t("design_mist_erg_1")}</li>
                                        <li>{t("design_mist_erg_2")}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("design_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("design_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("design_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("design_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("design_faq_a2")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("design_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("design_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("design_cta_btn_contact")}
                                </a>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    (window as any).open?.('/#callback', '_self');
                                }}
                                   className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10">
                                    {t("design_cta_btn_callback")}
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
                        headline: t("design_seo_headline"),
                        about: ["Stainless steel", "Engineering design", "Connections", "Tolerances"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
