import {toLangHref, useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Разработка сайтов-визиток
 * Маршрут: <Route path="/services/web-vcard" element={<WebVCardPage />} />
 * Требует i18n-ключи vcard_* (ru/ro словари).
 */

export default function WebVCardPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("vcard_toc_intro")},
        {id: "benefits", title: t("vcard_toc_benefits")},
        {id: "structure", title: t("vcard_toc_structure")},
        {id: "design", title: t("vcard_toc_design")},
        {id: "content", title: t("vcard_toc_content")},
        {id: "seo", title: t("vcard_toc_seo")},
        {id: "portfolio", title: t("vcard_toc_portfolio")},
        {id: "pricing", title: t("vcard_toc_pricing")},
        {id: "faq", title: t("vcard_toc_faq")},
    ];

    const features = [
        t("vcard_feat_fast"),
        t("vcard_feat_responsive"),
        t("vcard_feat_contact"),
        t("vcard_feat_ssl"),
        t("vcard_feat_hosting"),
        t("vcard_feat_cms"),
    ];

    const structure = [
        t("vcard_block_hero"),
        t("vcard_block_about"),
        t("vcard_block_services"),
        t("vcard_block_gallery"),
        t("vcard_block_reviews"),
        t("vcard_block_contacts"),
        t("vcard_block_footer"),
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("vcard_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("vcard_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("vcard_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("vcard_toc_title", {defaultValue: "Содержание"})}
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
                                {t("vcard_toc_intro")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("vcard_intro_bul1")}</li>
                                <li>{t("vcard_intro_bul2")}</li>
                                <li>{t("vcard_intro_bul3")}</li>
                                <li>{t("vcard_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("vcard_benefits_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {features.map((c, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <p className="text-zinc-700 dark:!text-white">{c}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("vcard_benefits_note")}
                            </p>
                        </div>
                    </section>

                    {/* Structure */}
                    <section id="structure" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("vcard_structure_title")}
                            </h2>
                            <p className="text-zinc-700 dark:!text-white mb-4">
                                {t("vcard_structure_p1")}
                            </p>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("vcard_tbl_block")}</th>
                                        <th className="text-left p-3">{t("vcard_tbl_goal")}</th>
                                        <th className="text-left p-3">{t("vcard_tbl_notes")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {[
                                        {
                                            b: structure[0],
                                            g: t("vcard_tbl_goal_hero"),
                                            n: t("vcard_tbl_note_hero"),
                                        },
                                        {
                                            b: structure[1],
                                            g: t("vcard_tbl_goal_about"),
                                            n: t("vcard_tbl_note_about"),
                                        },
                                        {
                                            b: structure[2],
                                            g: t("vcard_tbl_goal_services"),
                                            n: t("vcard_tbl_note_services"),
                                        },
                                        {
                                            b: structure[3],
                                            g: t("vcard_tbl_goal_gallery"),
                                            n: t("vcard_tbl_note_gallery"),
                                        },
                                        {
                                            b: structure[4],
                                            g: t("vcard_tbl_goal_reviews"),
                                            n: t("vcard_tbl_note_reviews"),
                                        },
                                        {
                                            b: structure[5],
                                            g: t("vcard_tbl_goal_contacts"),
                                            n: t("vcard_tbl_note_contacts"),
                                        },
                                        {
                                            b: structure[6],
                                            g: t("vcard_tbl_goal_footer"),
                                            n: t("vcard_tbl_note_footer"),
                                        },
                                    ].map((r, idx) => (
                                        <tr key={idx}>
                                            <td className="p-3">{r.b}</td>
                                            <td className="p-3">{r.g}</td>
                                            <td className="p-3">{r.n}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("vcard_structure_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("vcard_structure_tip_cta")}</li>
                                    <li>{t("vcard_structure_tip_speed")}</li>
                                    <li>{t("vcard_structure_tip_access")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Design */}
                    <section id="design" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("vcard_design_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("vcard_design_rule_brand"),
                                    t("vcard_design_rule_grid"),
                                    t("vcard_design_rule_contrast"),
                                    t("vcard_design_rule_icons")].map((r) => (
                                    <div key={r}
                                         className="rounded-xl border p-4 text-zinc-700 dark:!text-white text-sm">
                                        {r}
                                    </div>
                                ))}
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("vcard_design_check_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("vcard_design_check_1")}</li>
                                    <li>{t("vcard_design_check_2")}</li>
                                    <li>{t("vcard_design_check_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Content */}
                    <section id="content" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("vcard_content_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("vcard_content_copy")}</li>
                                <li>{t("vcard_content_images")}</li>
                                <li>{t("vcard_content_contacts")}</li>
                                <li>{t("vcard_content_policy")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("vcard_content_note")}
                            </p>
                        </div>
                    </section>

                    {/* SEO */}
                    <section id="seo" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("vcard_seo_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("vcard_seo_meta")}</li>
                                <li>{t("vcard_seo_speed")}</li>
                                <li>{t("vcard_seo_schema")}</li>
                                <li>{t("vcard_seo_local")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("vcard_seo_note")}</p>
                        </div>
                    </section>

                    {/* Portfolio */}
                    <section id="portfolio" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("vcard_portfolio_title")}
                            </h2>
                            <p className="text-zinc-700 dark:!text-white">
                                {t("vcard_portfolio_p1")}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="/portfolio"
                                    className="inline-flex items-center rounded-xl border px-4 py-2 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-600"
                                >
                                    {t("vcard_portfolio_btn")}
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:!bg-zinc-700 p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("vcard_pricing_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("vcard_pricing_1")}</li>
                                <li>{t("vcard_pricing_2")}</li>
                                <li>{t("vcard_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("vcard_pricing_note")}
                            </p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("vcard_toc_faq")}
                            </h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("vcard_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("vcard_faq_a1")}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("vcard_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("vcard_faq_a2")}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("vcard_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("vcard_faq_a3")}
                                    </p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm dark:!text-white text-white">
                            <h2 className="text-xl font-semibold">{t("vcard_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("vcard_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href={toLangHref("/contacts", lang)}
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("vcard_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.hash = "callback";
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("vcard_cta_btn_callback")}
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
                        serviceType: t("vcard_seo_service"),
                        areaServed: "Moldova",
                        description: t("vcard_seo_desc"),
                        provider: {
                            "@type": "LocalBusiness",
                            name: t("vcard_seo_brand"),
                        },
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
