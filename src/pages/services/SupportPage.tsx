import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Поддержка и сопровождение
 * Маршрут: <Route path="/guide/support" element={<SupportPage />} />
 * Требует i18n-ключи support_* (ru/ro словари).
 */

export default function SupportPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("support_toc_intro")},
        {id: "maintenance", title: t("support_toc_maintenance")},
        {id: "updates", title: t("support_toc_updates")},
        {id: "security", title: t("support_toc_security")},
        {id: "growth", title: t("support_toc_growth")},
        {id: "faq", title: t("support_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("support_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("support_title_t")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("support_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("support_toc_title", {defaultValue: "Содержание"})}
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
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">{t("support_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("support_intro_bul1")}</li>
                                <li>{t("support_intro_bul2")}</li>
                                <li>{t("support_intro_bul3")}</li>
                                <li>{t("support_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Maintenance */}
                    <section id="maintenance" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("support_maintenance_title")}</h2>
                            <p className="mb-3 text-zinc-700">{t("support_maintenance_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("support_maintenance_1")}</li>
                                <li>{t("support_maintenance_2")}</li>
                                <li>{t("support_maintenance_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Updates */}
                    <section id="updates" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("support_updates_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("support_updates_1")}</li>
                                <li>{t("support_updates_2")}</li>
                                <li>{t("support_updates_3")}</li>
                                <li>{t("support_updates_4")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("support_updates_note")}</p>
                        </div>
                    </section>

                    {/* Security */}
                    <section id="security" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("support_security_title")}</h2>
                            <p className="mb-3 text-zinc-700">{t("support_security_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("support_security_1")}</li>
                                <li>{t("support_security_2")}</li>
                                <li>{t("support_security_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Growth */}
                    <section id="growth" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("support_growth_title")}</h2>
                            <p className="text-zinc-700 mb-3">{t("support_growth_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("support_growth_1")}</li>
                                <li>{t("support_growth_2")}</li>
                                <li>{t("support_growth_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("support_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex justify-between">
                                        {t("support_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("support_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex justify-between">
                                        {t("support_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("support_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex justify-between">
                                        {t("support_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("support_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section>
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("support_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("support_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("support_cta_btn_contact")}
                                </a>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    (window as any).open?.('/#callback', '_self');
                                }}
                                   className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10">
                                    {t("support_cta_btn_callback")}
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
                        headline: t("support_seo_headline"),
                        about: ["Website maintenance", "Technical support", "Updates", "Security"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}

