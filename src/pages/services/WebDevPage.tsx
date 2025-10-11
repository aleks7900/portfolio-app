import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Разработка сайтов и веб-приложений любой сложности
 * Маршрут: <Route path="/services/web-dev" element={<WebDevPage />} />
 * Требует i18n-ключи webdev_* (ru/ro словари)
 */

export default function WebDevPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("webdev_toc_intro")},
        {id: "advantages", title: t("webdev_toc_advantages")},
        {id: "technologies", title: t("webdev_toc_technologies")},
        {id: "stages", title: t("webdev_toc_stages")},
        {id: "optimization", title: t("webdev_toc_optimization")},
        {id: "faq", title: t("webdev_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("webdev_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("webdev_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("webdev_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">{t("webdev_toc_title")}</h2>
                        <ul className="space-y-2 text-sm dark:!text-white">
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
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-3">{t("webdev_toc_intro")}</h2>
                            <p className="text-zinc-700 mb-4 dark:!text-white">{t("webdev_intro_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("webdev_intro_bul1")}</li>
                                <li>{t("webdev_intro_bul2")}</li>
                                <li>{t("webdev_intro_bul3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Advantages */}
                    <section id="advantages" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("webdev_advantages_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("webdev_adv_speed"), t("webdev_adv_responsive"), t("webdev_adv_secure"), t("webdev_adv_seo")].map((a, i) => (
                                    <div key={i} className="rounded-xl border p-4 text-zinc-700 dark:!text-white">
                                        {a}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("webdev_adv_note")}</p>
                        </div>
                    </section>

                    {/* Technologies */}
                    <section id="technologies" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("webdev_tech_title")}</h2>
                            <p className="text-zinc-700 mb-3 dark:!text-white">{t("webdev_tech_intro")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("webdev_tech_frontend")}</li>
                                <li>{t("webdev_tech_backend")}</li>
                                <li>{t("webdev_tech_db")}</li>
                                <li>{t("webdev_tech_devops")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Stages */}
                    <section id="stages" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("webdev_stages_title")}</h2>
                            <ol className="list-decimal pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("webdev_stage_1")}</li>
                                <li>{t("webdev_stage_2")}</li>
                                <li>{t("webdev_stage_3")}</li>
                                <li>{t("webdev_stage_4")}</li>
                                <li>{t("webdev_stage_5")}</li>
                            </ol>
                        </div>
                    </section>

                    {/* Optimization */}
                    <section id="optimization" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("webdev_opt_title")}</h2>
                            <p className="text-zinc-700 mb-3 dark:!text-white">{t("webdev_opt_intro")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("webdev_opt_speed")}</li>
                                <li>{t("webdev_opt_accessibility")}</li>
                                <li>{t("webdev_opt_security")}</li>
                                <li>{t("webdev_opt_scalability")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("webdev_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex justify-between">
                                        {t("webdev_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("webdev_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex justify-between">
                                        {t("webdev_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("webdev_faq_a2")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("webdev_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("webdev_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="/contacts"
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("webdev_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("webdev_cta_btn_callback")}
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
                        headline: t("webdev_seo_headline"),
                        about: ["Web development", "React", "Spring", "SEO optimization"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
