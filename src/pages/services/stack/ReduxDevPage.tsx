import {toLangHref, useI18n} from "../../../shared/i18n/i18n.tsx";
import SEO from "../../../shared/SEO.tsx";

/**
 * Страница: Redux в разработке (консалтинг, интеграция, аудит)
 * Маршрут: <Route path="/services/redux" element={<ReduxDevPage />} />
 * Требует i18n‑ключи redux_* (ru/ro словари).
 */
export default function ReduxDevPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("redux_toc_intro")},
        {id: "benefits", title: t("redux_toc_benefits")},
        {id: "toolkit", title: t("redux_toc_toolkit")},
        {id: "architecture", title: t("redux_toc_architecture")},
        {id: "state", title: t("redux_toc_state")},
        {id: "async", title: t("redux_toc_async")},
        {id: "tests", title: t("redux_toc_tests")},
        {id: "performance", title: t("redux_toc_performance")},
        {id: "bestpractices", title: t("redux_toc_bestpractices")},
        {id: "migration", title: t("redux_toc_migration")},
        {id: "examples", title: t("redux_toc_examples")},
        {id: "faq", title: t("redux_toc_faq")},
    ];

    const benefitCards = [
        "redux_ben_scalable",
        "redux_ben_predictable",
        "redux_ben_typesafe",
        "redux_ben_devexp",
    ];

    const toolkitCards = [
        "redux_toolkit_slices",
        "redux_toolkit_query",
        "redux_toolkit_immer",
        "redux_toolkit_middlewares",
        "redux_toolkit_rtkQueryCache",
        "redux_toolkit_entityAdapter",
    ];

    const archBullets = [
        "redux_arch_featureFolders",
        "redux_arch_ducks",
        "redux_arch_modules",
        "redux_arch_monorepo",
    ];

    const stateTableRows = [
        {
            f: t("redux_tbl_slice"),
            ex: "userSlice, cartSlice",
            n: t("redux_tbl_slice_note"),
        },
        {
            f: t("redux_tbl_selector"),
            ex: "selectCartTotal(state)",
            n: t("redux_tbl_selector_note"),
        },
        {
            f: t("redux_tbl_action"),
            ex: "cart/addItem, user/logout",
            n: t("redux_tbl_action_note"),
        },
        {
            f: t("redux_tbl_thunk"),
            ex: "fetchProducts()",
            n: t("redux_tbl_thunk_note"),
        },
        {
            f: t("redux_tbl_cache"),
            ex: "rtk-query: productsApi.endpoints.getById",
            n: t("redux_tbl_cache_note"),
        },
    ];

    const asyncBullets = [
        "redux_async_thunks",
        "redux_async_rtkQuery",
        "redux_async_websocket",
        "redux_async_retry",
    ];

    const perfCards = [
        "redux_perf_memo",
        "redux_perf_selector",
        "redux_perf_splitting",
        "redux_perf_immutable",
    ];

    const bestBullets = [
        "redux_best_strict",
        "redux_best_actionContracts",
        "redux_best_errorHandling",
        "redux_best_folderNaming",
        "redux_best_testing",
    ];

    const examplesCards = [
        "redux_ex_cart",
        "redux_ex_auth",
        "redux_ex_filters",
        "redux_ex_infiniteScroll",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            <SEO titleKey="redux_title" descriptionKey="redux_intro" pathname="/dev/redux" />
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("redux_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("redux_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("redux_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("redux_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("redux_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("redux_intro_bul1")}</li>
                                <li>{t("redux_intro_bul2")}</li>
                                <li>{t("redux_intro_bul3")}</li>
                                <li>{t("redux_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("redux_benefits_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {benefitCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4">
                                        <p className="text-zinc-700">{t(k)}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("redux_benefits_note")}</p>
                        </div>
                    </section>

                    {/* Redux Toolkit */}
                    <section id="toolkit" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("redux_toolkit_title")}</h2>
                            <p className="text-zinc-700 mb-3">{t("redux_toolkit_p1")}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {toolkitCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("redux_toolkit_note")}</p>
                        </div>
                    </section>

                    {/* Architecture */}
                    <section id="architecture" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("redux_arch_title")}</h2>
                            <p className="text-zinc-700 mb-3">{t("redux_arch_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                {archBullets.map((k) => (
                                    <li key={k}>{t(k)}</li>
                                ))}
                            </ul>
                            <div className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700">
                                <p className="font-medium">{t("redux_arch_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("redux_arch_tip_1")}</li>
                                    <li>{t("redux_arch_tip_2")}</li>
                                    <li>{t("redux_arch_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* State model */}
                    <section id="state" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("redux_state_title")}</h2>
                            <p className="text-zinc-700 mb-3">{t("redux_state_p1")}</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50">
                                    <tr>
                                        <th className="text-left p-3">{t("redux_tbl_field")}</th>
                                        <th className="text-left p-3">{t("redux_tbl_example")}</th>
                                        <th className="text-left p-3">{t("redux_tbl_note")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {stateTableRows.map((r, i) => (
                                        <tr key={i}>
                                            <td className="p-3">{r.f}</td>
                                            <td className="p-3">{r.ex}</td>
                                            <td className="p-3">{r.n}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("redux_state_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("redux_state_tip_1")}</li>
                                    <li>{t("redux_state_tip_2")}</li>
                                    <li>{t("redux_state_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Async */}
                    <section id="async" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("redux_async_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                {asyncBullets.map((k) => (
                                    <li key={k}>{t(k)}</li>
                                ))}
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("redux_async_note")}</p>
                        </div>
                    </section>

                    {/* Tests */}
                    <section id="tests" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("redux_tests_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("redux_tests_unit"), t("redux_tests_integration"), t("redux_tests_rtkQuery"), t("redux_tests_msws")].map((p) => (
                                    <div key={p} className="rounded-xl border p-4 text-sm">
                                        {p}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("redux_tests_note")}</p>
                        </div>
                    </section>

                    {/* Performance */}
                    <section id="performance" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("redux_performance_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {perfCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("redux_performance_note")}</p>
                        </div>
                    </section>

                    {/* Best practices */}
                    <section id="bestpractices" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("redux_best_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                {bestBullets.map((k) => (
                                    <li key={k}>{t(k)}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Migration */}
                    <section id="migration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("redux_migration_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("redux_migration_from_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                        <li>{t("redux_migration_from_context")}</li>
                                        <li>{t("redux_migration_from_mobx")}</li>
                                        <li>{t("redux_migration_from_zustand")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("redux_migration_process_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                        <li>{t("redux_migration_proc_audit")}</li>
                                        <li>{t("redux_migration_proc_mapping")}</li>
                                        <li>{t("redux_migration_proc_testing")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("redux_migration_note")}</p>
                        </div>
                    </section>

                    {/* Examples */}
                    <section id="examples" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("redux_examples_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {examplesCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("redux_examples_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("redux_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("redux_faq_q1")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("redux_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("redux_faq_q2")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("redux_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("redux_faq_q3")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("redux_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("redux_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("redux_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href={toLangHref("/contacts", lang)}
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("redux_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.hash = "callback";
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("redux_cta_btn_callback")}
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
                        serviceType: t("redux_seo_headline"),
                        areaServed: ["MD", "RO", "UA"],
                        offers: {
                            "@type": "Offer",
                            priceSpecification: {
                                "@type": "PriceSpecification",
                                priceCurrency: "MDL",
                            },
                        },
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
