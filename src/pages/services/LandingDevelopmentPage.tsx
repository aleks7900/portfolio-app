import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Разработка сайтов-лендингов
 * Маршрут: <Route path="/guide/landing" element={<LandingDevelopmentPage />} />
 * Требует i18n-ключи landing_* (ru/ro словари).
 */

export default function LandingDevelopmentPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("landing_toc_intro")},
        {id: "goals", title: t("landing_toc_goals")},
        {id: "structure", title: t("landing_toc_structure")},
        {id: "design", title: t("landing_toc_design")},
        {id: "optimization", title: t("landing_toc_optimization")},
        {id: "integration", title: t("landing_toc_integration")},
        {id: "pricing", title: t("landing_toc_pricing")},
        {id: "faq", title: t("landing_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("landing_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("landing_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("landing_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("landing_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">
                                {t("landing_toc_intro")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("landing_intro_bul1")}</li>
                                <li>{t("landing_intro_bul2")}</li>
                                <li>{t("landing_intro_bul3")}</li>
                                <li>{t("landing_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Goals */}
                    <section id="goals" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("landing_goals_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("landing_goal_conversion"), t("landing_goal_sales"), t("landing_goal_leads"), t("landing_goal_brand")].map((g, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        {g}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("landing_goals_note")}
                            </p>
                        </div>
                    </section>

                    {/* Structure */}
                    <section id="structure" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("landing_structure_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("landing_structure_block1")}</li>
                                <li>{t("landing_structure_block2")}</li>
                                <li>{t("landing_structure_block3")}</li>
                                <li>{t("landing_structure_block4")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("landing_structure_note")}
                            </p>
                        </div>
                    </section>

                    {/* Design */}
                    <section id="design" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("landing_design_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-medium mb-2">{t("landing_design_visual_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>{t("landing_design_visual_1")}</li>
                                        <li>{t("landing_design_visual_2")}</li>
                                        <li>{t("landing_design_visual_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("landing_design_ui_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>{t("landing_design_ui_1")}</li>
                                        <li>{t("landing_design_ui_2")}</li>
                                        <li>{t("landing_design_ui_3")}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Optimization */}
                    <section id="optimization" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("landing_optimization_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("landing_optimization_speed")}</li>
                                <li>{t("landing_optimization_seo")}</li>
                                <li>{t("landing_optimization_mobile")}</li>
                                <li>{t("landing_optimization_a11y")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Integration */}
                    <section id="integration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("landing_integration_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("landing_integration_crm")}</li>
                                <li>{t("landing_integration_analytics")}</li>
                                <li>{t("landing_integration_email")}</li>
                                <li>{t("landing_integration_forms")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("landing_pricing_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("landing_pricing_1")}</li>
                                <li>{t("landing_pricing_2")}</li>
                                <li>{t("landing_pricing_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("landing_toc_faq")}
                            </h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex justify-between">
                                        {t("landing_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("landing_faq_a1")}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex justify-between">
                                        {t("landing_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("landing_faq_a2")}
                                    </p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">
                                {t("landing_cta_title")}
                            </h2>
                            <p className="text-emerald-50 mt-1">{t("landing_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="/contacts"
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("landing_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("landing_cta_btn_callback")}
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
                        headline: t("landing_seo_headline"),
                        about: [
                            "Landing page development",
                            "Conversion optimization",
                            "Web design",
                            "Lead generation",
                        ],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
