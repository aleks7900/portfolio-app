// src/pages/services/QualityGuaranteePage.tsx
import {toLangHref, useI18n} from "../../shared/i18n/i18n.tsx";

export default function QualityGuaranteePage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("qa_toc_intro")},
        {id: "principles", title: t("qa_toc_principles")},
        {id: "process", title: t("qa_toc_process")},
        {id: "standards", title: t("qa_toc_standards")},
        {id: "testing", title: t("qa_toc_testing")},
        {id: "slo", title: t("qa_toc_slo")},
        {id: "incidents", title: t("qa_toc_incidents")},
        {id: "docs", title: t("qa_toc_docs")},
        {id: "faq", title: t("qa_toc_faq")},
    ];

    const principleCards = [
        "qa_principle_codequality",
        "qa_principle_security",
        "qa_principle_performance",
        "qa_principle_observability",
        "qa_principle_ux",
        "qa_principle_docs",
    ];

    const testingRows = [
        {
            m: t("qa_test_unit"),
            d: t("qa_test_unit_desc"),
            n: t("qa_test_unit_note"),
        },
        {
            m: t("qa_test_integration"),
            d: t("qa_test_integration_desc"),
            n: t("qa_test_integration_note"),
        },
        {
            m: t("qa_test_e2e"),
            d: t("qa_test_e2e_desc"),
            n: t("qa_test_e2e_note"),
        },
        {
            m: t("qa_test_performance"),
            d: t("qa_test_performance_desc"),
            n: t("qa_test_performance_note"),
        },
        {
            m: t("qa_test_security"),
            d: t("qa_test_security_desc"),
            n: t("qa_test_security_note"),
        },
        {
            m: t("qa_test_accessibility"),
            d: t("qa_test_accessibility_desc"),
            n: t("qa_test_accessibility_note"),
        },
    ];

    const docsBullets = [
        "qa_docs_arch",
        "qa_docs_codestyle",
        "qa_docs_runbooks",
        "qa_docs_testreports",
        "qa_docs_release_notes",
        "qa_docs_slo_book",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-indigo-700 font-semibold">
                    {t("qa_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("qa_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("qa_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("qa_toc_title")}
                        </h2>
                        <ul className="space-y-2 text-sm">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <a
                                        className="text-zinc-700 hover:text-indigo-700"
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
                                {t("qa_toc_intro")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("qa_intro_bul1")}</li>
                                <li>{t("qa_intro_bul2")}</li>
                                <li>{t("qa_intro_bul3")}</li>
                                <li>{t("qa_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Principles */}
                    <section id="principles" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("qa_principles_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {principleCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("qa_principles_note")}
                            </p>
                        </div>
                    </section>

                    {/* Process */}
                    <section id="process" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("qa_process_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("qa_proc_requirements")}</li>
                                <li>{t("qa_proc_arch_review")}</li>
                                <li>{t("qa_proc_codereview")}</li>
                                <li>{t("qa_proc_cicd")}</li>
                                <li>{t("qa_proc_testing_pyramid")}</li>
                                <li>{t("qa_proc_release")}</li>
                            </ul>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("qa_process_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("qa_process_tip_1")}</li>
                                    <li>{t("qa_process_tip_2")}</li>
                                    <li>{t("qa_process_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Standards */}
                    <section id="standards" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("qa_standards_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("qa_std_owasp")}</li>
                                <li>{t("qa_std_secure_sdls")}</li>
                                <li>{t("qa_std_coding_guides")}</li>
                                <li>{t("qa_std_privacy")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("qa_standards_note")}
                            </p>
                        </div>
                    </section>

                    {/* Testing */}
                    <section id="testing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("qa_testing_title")}
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("qa_tbl_method")}</th>
                                        <th className="text-left p-3">{t("qa_tbl_desc")}</th>
                                        <th className="text-left p-3">{t("qa_tbl_note")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {testingRows.map((r, i) => (
                                        <tr key={i}>
                                            <td className="p-3">{r.m}</td>
                                            <td className="p-3">{r.d}</td>
                                            <td className="p-3">{r.n}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 rounded-xl bg-indigo-50 border border-indigo-200 p-4 text-indigo-900">
                                <p className="font-medium">{t("qa_testing_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("qa_testing_tip_1")}</li>
                                    <li>{t("qa_testing_tip_2")}</li>
                                    <li>{t("qa_testing_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* SLO/SLA */}
                    <section id="slo" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("qa_slo_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("qa_slo_availability")}</li>
                                <li>{t("qa_slo_latency")}</li>
                                <li>{t("qa_slo_errorbudget")}</li>
                                <li>{t("qa_sla_support")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("qa_slo_note")}</p>
                        </div>
                    </section>

                    {/* Incidents & Support */}
                    <section id="incidents" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("qa_incidents_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("qa_inc_triage")}</li>
                                <li>{t("qa_inc_postmortem")}</li>
                                <li>{t("qa_inc_patch")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("qa_incidents_note")}
                            </p>
                        </div>
                    </section>

                    {/* Documentation */}
                    <section id="docs" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("qa_docs_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                {docsBullets.map((k) => (
                                    <li key={k}>{t(k)}</li>
                                ))}
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("qa_docs_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("qa_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("qa_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("qa_faq_a1")}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("qa_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("qa_faq_a2")}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("qa_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("qa_faq_a3")}
                                    </p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-indigo-600 to-sky-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("qa_cta_title")}</h2>
                            <p className="text-indigo-50 mt-1">{t("qa_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href={toLangHref("/contacts", lang)}
                                    className="inline-flex items-center rounded-xl bg-white text-indigo-700 px-4 py-2 font-medium hover:bg-indigo-50"
                                >
                                    {t("qa_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.hash = "callback";
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("qa_cta_btn_callback")}
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
                        serviceType: t("qa_seo_headline"),
                        areaServed: ["MD", "RO", "EU"],
                        inLanguage: "ru-RU",
                        offers: {
                            "@type": "Offer",
                            priceSpecification: {
                                "@type": "PriceSpecification",
                                priceCurrency: "MDL"
                            }
                        }
                    }),
                }}
            />
        </main>
    );
}
