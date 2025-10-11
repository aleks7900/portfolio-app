import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Разработка сайтов для малого и среднего бизнеса
 * Маршрут: <Route path="/services/web-business" element={<BusinessWebDevPage />} />
 * Требует i18n-ключи business_* (ru/ro словари).
 */

export default function BusinessWebDevPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("business_toc_intro")},
        {id: "benefits", title: t("business_toc_benefits")},
        {id: "solutions", title: t("business_toc_solutions")},
        {id: "stack", title: t("business_toc_stack")},
        {id: "process", title: t("business_toc_process")},
        {id: "pricing", title: t("business_toc_pricing")},
        {id: "faq", title: t("business_toc_faq")},
    ];

    const steps = [
        t("business_step_analysis"),
        t("business_step_prototype"),
        t("business_step_design"),
        t("business_step_development"),
        t("business_step_testing"),
        t("business_step_launch"),
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("business_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("business_title_t")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("business_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("business_toc_title")}
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
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-3">
                                {t("business_toc_intro")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("business_intro_bul1")}</li>
                                <li>{t("business_intro_bul2")}</li>
                                <li>{t("business_intro_bul3")}</li>
                                <li>{t("business_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("business_benefits_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("business_ben_vis"), t("business_ben_clients"), t("business_ben_automation"), t("business_ben_sales")].map((b, i) => (
                                    <div key={i}
                                         className="rounded-xl border p-4 text-zinc-700 dark:text-white">{b}</div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("business_benefits_note")}
                            </p>
                        </div>
                    </section>

                    {/* Solutions */}
                    <section id="solutions" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("business_solutions_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("business_sol_catalog")}</li>
                                <li>{t("business_sol_shop")}</li>
                                <li>{t("business_sol_booking")}</li>
                                <li>{t("business_sol_corporate")}</li>
                                <li>{t("business_sol_custom")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("business_solutions_note")}
                            </p>
                        </div>
                    </section>

                    {/* Stack */}
                    <section id="stack" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("business_stack_title")}
                            </h2>
                            <table className="min-w-full text-sm border divide-y">
                                <thead className="bg-zinc-50 dark:text-black">
                                <tr>
                                    <th className="text-left p-3">{t("business_tbl_layer")}</th>
                                    <th className="text-left p-3">{t("business_tbl_tech")}</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y">
                                <tr>
                                    <td className="p-3">{t("business_tbl_front")}</td>
                                    <td className="p-3">React + TypeScript + Tailwind CSS</td>
                                </tr>
                                <tr>
                                    <td className="p-3">{t("business_tbl_back")}</td>
                                    <td className="p-3">Spring Boot + Java 21 + PostgreSQL</td>
                                </tr>
                                <tr>
                                    <td className="p-3">{t("business_tbl_api")}</td>
                                    <td className="p-3">REST API, JWT Auth, SEO JSON-LD</td>
                                </tr>
                                <tr>
                                    <td className="p-3">{t("business_tbl_host")}</td>
                                    <td className="p-3">Docker, Nginx, VPS Linux</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Process */}
                    <section id="process" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("business_process_title")}
                            </h2>
                            <ol className="list-decimal pl-5 space-y-1">
                                {steps.map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ol>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("business_process_note")}
                            </p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("business_pricing_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("business_price_landing")}</li>
                                <li>{t("business_price_corp")}</li>
                                <li>{t("business_price_shop")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("business_pricing_note")}
                            </p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("business_toc_faq")}
                            </h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("business_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">
                                            ▾
                                        </span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("business_faq_a1")}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("business_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">
                                            ▾
                                        </span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("business_faq_a2")}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("business_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">
                                            ▾
                                        </span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("business_faq_a3")}
                                    </p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("business_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("business_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="/contacts"
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("business_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("business_cta_btn_callback")}
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
                        headline: t("business_seo_headline"),
                        about: [
                            "Web development",
                            "Small business websites",
                            "Corporate sites",
                            "E-commerce solutions",
                        ],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
