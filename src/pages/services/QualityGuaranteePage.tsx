import {useI18n} from "../../shared/i18n/i18n.tsx"

/**
 * Страница: Гарантия качества
 * Маршрут: <Route path="/guide/quality-stainless" element={<QualityGuaranteePage />} />
 * Требует i18n-ключи quality_* (ru/ro словари).
 */

export default function QualityGuaranteePage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("quality_toc_intro")},
        {id: "principles", title: t("quality_toc_principles")},
        {id: "control", title: t("quality_toc_control")},
        {id: "certificates", title: t("quality_toc_certificates")},
        {id: "process", title: t("quality_toc_process")},
        {id: "faq", title: t("quality_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 mt-16">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("quality_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("quality_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("quality_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("quality_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("quality_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("quality_intro_bul1")}</li>
                                <li>{t("quality_intro_bul2")}</li>
                                <li>{t("quality_intro_bul3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Principles */}
                    <section id="principles" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("quality_principles_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("quality_principle_1"), t("quality_principle_2"), t("quality_principle_3"), t("quality_principle_4")].map((p, i) => (
                                    <div key={i}
                                         className="rounded-xl border p-4 text-zinc-700 dark:!text-white">{p}</div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Control */}
                    <section id="control" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("quality_control_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("quality_control_1")}</li>
                                <li>{t("quality_control_2")}</li>
                                <li>{t("quality_control_3")}</li>
                                <li>{t("quality_control_4")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("quality_control_note")}</p>
                        </div>
                    </section>

                    {/* Certificates */}
                    <section id="certificates" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("quality_cert_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("quality_cert_iso_title")}</h3>
                                    <p>{t("quality_cert_iso_text")}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("quality_cert_gost_title")}</h3>
                                    <p>{t("quality_cert_gost_text")}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Process */}
                    <section id="process" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("quality_process_title")}</h2>
                            <ol className="list-decimal pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("quality_process_1")}</li>
                                <li>{t("quality_process_2")}</li>
                                <li>{t("quality_process_3")}</li>
                                <li>{t("quality_process_4")}</li>
                            </ol>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("quality_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("quality_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("quality_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("quality_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("quality_faq_a2")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("quality_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("quality_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("quality_cta_btn_contact")}
                                </a>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    (window as any).open?.('/#callback', '_self');
                                }}
                                   className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10">
                                    {t("quality_cta_btn_callback")}
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
                        headline: t("quality_seo_headline"),
                        about: ["Quality assurance", "Stainless steel", "Certificates", "Processes"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
