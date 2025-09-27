import {useI18n} from "../../shared/i18n/i18n.tsx"

/**
 * Страница: Обработка кислотой нержавейки
 * Маршрут: <Route path="/guide/acid-stainless" element={<AcidTreatmentStainlessPage />} />
 * Требует i18n-ключи acid_* (ru/ro словари).
 */

export default function AcidTreatmentStainlessPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("acid_toc_intro")},
        {id: "purpose", title: t("acid_toc_purpose")},
        {id: "methods", title: t("acid_toc_methods")},
        {id: "safety", title: t("acid_toc_safety")},
        {id: "quality", title: t("acid_toc_quality")},
        {id: "applications", title: t("acid_toc_applications")},
        {id: "mistakes", title: t("acid_toc_mistakes")},
        {id: "faq", title: t("acid_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("acid_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("acid_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("acid_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">{t("acid_toc_title", {defaultValue: "Содержание"})}</h2>
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
                            <h2 className="text-xl font-semibold mb-3">{t("acid_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("acid_intro_bul1")}</li>
                                <li>{t("acid_intro_bul2")}</li>
                                <li>{t("acid_intro_bul3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Purpose */}
                    <section id="purpose" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("acid_purpose_title")}</h2>
                            <p>{t("acid_purpose_p1")}</p>
                            <ul className="list-disc pl-5 mt-3 space-y-1">
                                <li>{t("acid_purpose_1")}</li>
                                <li>{t("acid_purpose_2")}</li>
                                <li>{t("acid_purpose_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Methods */}
                    <section id="methods" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("acid_methods_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4">{t("acid_method_gel")}</div>
                                <div className="rounded-xl border p-4">{t("acid_method_bath")}</div>
                                <div className="rounded-xl border p-4">{t("acid_method_spray")}</div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("acid_methods_note")}</p>
                        </div>
                    </section>

                    {/* Safety */}
                    <section id="safety" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("acid_safety_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("acid_safety_1")}</li>
                                <li>{t("acid_safety_2")}</li>
                                <li>{t("acid_safety_3")}</li>
                                <li>{t("acid_safety_4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Quality */}
                    <section id="quality" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("acid_quality_title")}</h2>
                            <p>{t("acid_quality_p1")}</p>
                            <ul className="list-disc pl-5 mt-3 space-y-1">
                                <li>{t("acid_quality_1")}</li>
                                <li>{t("acid_quality_2")}</li>
                                <li>{t("acid_quality_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Applications */}
                    <section id="applications" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("acid_applications_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("acid_app_1")}</li>
                                <li>{t("acid_app_2")}</li>
                                <li>{t("acid_app_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Mistakes */}
                    <section id="mistakes" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("acid_mistakes_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("acid_mistake_1")}</li>
                                <li>{t("acid_mistake_2")}</li>
                                <li>{t("acid_mistake_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("acid_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("acid_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2">{t("acid_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("acid_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2">{t("acid_faq_a2")}</p>
                                </details>
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
                        headline: t("acid_seo_headline"),
                        about: ["Acid treatment", "Stainless steel", "Surface cleaning", "Passivation"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
