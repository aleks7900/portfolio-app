import {useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Разработка сайтов интернет-магазинов
 * Маршрут: <Route path="/services/ecommerce" element={<EcommerceDevPage />} />
 * Требует i18n-ключи ecommerce_* (ru/ro словари).
 */

export default function EcommerceDevPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("ecommerce_toc_intro")},
        {id: "benefits", title: t("ecommerce_toc_benefits")},
        {id: "stack", title: t("ecommerce_toc_stack")},
        {id: "features", title: t("ecommerce_toc_features")},
        {id: "integrations", title: t("ecommerce_toc_integrations")},
        {id: "catalog", title: t("ecommerce_toc_catalog")},
        {id: "checkout", title: t("ecommerce_toc_checkout")},
        {id: "shipping", title: t("ecommerce_toc_shipping")},
        {id: "seo", title: t("ecommerce_toc_seo")},
        {id: "performance", title: t("ecommerce_toc_performance")},
        {id: "security", title: t("ecommerce_toc_security")},
        {id: "admin", title: t("ecommerce_toc_admin")},
        {id: "migration", title: t("ecommerce_toc_migration")},
        {id: "pricing", title: t("ecommerce_toc_pricing")},
        {id: "faq", title: t("ecommerce_toc_faq")},
    ];

    const featureCards = [
        "ecommerce_feat_variations",
        "ecommerce_feat_filters",
        "ecommerce_feat_multilang",
        "ecommerce_feat_multicurrency",
        "ecommerce_feat_promos",
        "ecommerce_feat_reviews",
        "ecommerce_feat_wishlist",
        "ecommerce_feat_compare",
    ];

    const integrationCards = [
        "ecommerce_int_payments",
        "ecommerce_int_delivery",
        "ecommerce_int_crm",
        "ecommerce_int_erp",
        "ecommerce_int_analytics",
        "ecommerce_int_marketplaces",
    ];

    const adminBullets = [
        "ecommerce_admin_orders",
        "ecommerce_admin_products",
        "ecommerce_admin_content",
        "ecommerce_admin_users",
        "ecommerce_admin_permissions",
        "ecommerce_admin_audit",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("ecommerce_badge")}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-zinc-900">
                    {t("ecommerce_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("ecommerce_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("ecommerce_toc_title", {defaultValue: "Содержание"})}
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
                                {t("ecommerce_toc_intro")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("ecommerce_intro_bul1")}</li>
                                <li>{t("ecommerce_intro_bul2")}</li>
                                <li>{t("ecommerce_intro_bul3")}</li>
                                <li>{t("ecommerce_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("ecommerce_benefits_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("ecommerce_ben_speed"), t("ecommerce_ben_conversion"), t("ecommerce_ben_scaling"), t("ecommerce_ben_support")].map(
                                    (c, i) => (
                                        <div key={i} className="rounded-xl border p-4">
                                            <p className="text-zinc-700 dark:!text-white">{c}</p>
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("ecommerce_benefits_note")}
                            </p>
                        </div>
                    </section>

                    {/* Tech stack */}
                    <section id="stack" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("ecommerce_stack_title")}
                            </h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">
                                {t("ecommerce_stack_p1")}
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("ecommerce_stack_front"), t("ecommerce_stack_back"), t("ecommerce_stack_db"), t("ecommerce_stack_devops")].map(
                                    (s) => (
                                        <div key={s} className="rounded-xl border p-4 text-sm">
                                            {s}
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("ecommerce_stack_note")}
                            </p>
                        </div>
                    </section>

                    {/* Core features */}
                    <section id="features" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("ecommerce_features_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {featureCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("ecommerce_features_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("ecommerce_features_tip_1")}</li>
                                    <li>{t("ecommerce_features_tip_2")}</li>
                                    <li>{t("ecommerce_features_tip_3")}</li>
                                    <li>{t("ecommerce_features_tip_4")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Integrations */}
                    <section id="integrations" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("ecommerce_integrations_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {integrationCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("ecommerce_integrations_note")}
                            </p>
                        </div>
                    </section>

                    {/* Catalog management */}
                    <section id="catalog" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("ecommerce_catalog_title")}
                            </h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">
                                {t("ecommerce_catalog_p1")}
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("ecommerce_tbl_field")}</th>
                                        <th className="text-left p-3">{t("ecommerce_tbl_example")}</th>
                                        <th className="text-left p-3">{t("ecommerce_tbl_note")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {[
                                        {
                                            f: t("ecommerce_tbl_sku"),
                                            ex: "SKU-12345",
                                            n: t("ecommerce_tbl_sku_note"),
                                        },
                                        {
                                            f: t("ecommerce_tbl_title"),
                                            ex: t("ecommerce_tbl_title_ex"),
                                            n: t("ecommerce_tbl_title_note"),
                                        },
                                        {
                                            f: t("ecommerce_tbl_price"),
                                            ex: "1999.00",
                                            n: t("ecommerce_tbl_price_note"),
                                        },
                                        {
                                            f: t("ecommerce_tbl_attrs"),
                                            ex: t("ecommerce_tbl_attrs_ex"),
                                            n: t("ecommerce_tbl_attrs_note"),
                                        },
                                        {
                                            f: t("ecommerce_tbl_media"),
                                            ex: "image-1.jpg, image-2.jpg",
                                            n: t("ecommerce_tbl_media_note"),
                                        },
                                    ].map((r, i) => (
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
                                <p className="font-medium">{t("ecommerce_catalog_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("ecommerce_catalog_tip_1")}</li>
                                    <li>{t("ecommerce_catalog_tip_2")}</li>
                                    <li>{t("ecommerce_catalog_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Checkout */}
                    <section id="checkout" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("ecommerce_checkout_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("ecommerce_checkout_steps")}</li>
                                <li>{t("ecommerce_checkout_validation")}</li>
                                <li>{t("ecommerce_checkout_guest")}</li>
                                <li>{t("ecommerce_checkout_recovery")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("ecommerce_checkout_note")}
                            </p>
                        </div>
                    </section>

                    {/* Shipping & Pickup */}
                    <section id="shipping" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("ecommerce_shipping_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("ecommerce_shipping_methods_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("ecommerce_shipping_courier")}</li>
                                        <li>{t("ecommerce_shipping_pickup")}</li>
                                        <li>{t("ecommerce_shipping_regional")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("ecommerce_shipping_calc_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("ecommerce_shipping_by_weight")}</li>
                                        <li>{t("ecommerce_shipping_by_volume")}</li>
                                        <li>{t("ecommerce_shipping_zones")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("ecommerce_shipping_note")}
                            </p>
                        </div>
                    </section>

                    {/* SEO */}
                    <section id="seo" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("ecommerce_seo_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("ecommerce_seo_speed")}</li>
                                <li>{t("ecommerce_seo_schema")}</li>
                                <li>{t("ecommerce_seo_breadcrumbs")}</li>
                                <li>{t("ecommerce_seo_sitemap")}</li>
                                <li>{t("ecommerce_seo_meta")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("ecommerce_seo_note")}</p>
                        </div>
                    </section>

                    {/* Performance */}
                    <section id="performance" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("ecommerce_performance_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("ecommerce_perf_cdn"), t("ecommerce_perf_cache"), t("ecommerce_perf_images"), t("ecommerce_perf_streaming")].map(
                                    (p) => (
                                        <div key={p} className="rounded-xl border p-4 text-sm">
                                            {p}
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("ecommerce_performance_note")}
                            </p>
                        </div>
                    </section>

                    {/* Security */}
                    <section id="security" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("ecommerce_security_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("ecommerce_sec_https")}</li>
                                <li>{t("ecommerce_sec_jwt")}</li>
                                <li>{t("ecommerce_sec_rate")}</li>
                                <li>{t("ecommerce_sec_logs")}</li>
                                <li>{t("ecommerce_sec_pci")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("ecommerce_security_note")}
                            </p>
                        </div>
                    </section>

                    {/* Admin & Analytics */}
                    <section id="admin" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("ecommerce_admin_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                {adminBullets.map((k) => (
                                    <li key={k}>{t(k)}</li>
                                ))}
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("ecommerce_admin_note")}
                            </p>
                        </div>
                    </section>

                    {/* Migration */}
                    <section id="migration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("ecommerce_migration_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">
                                        {t("ecommerce_migration_from_title")}
                                    </h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("ecommerce_migration_from_1")}</li>
                                        <li>{t("ecommerce_migration_from_2")}</li>
                                        <li>{t("ecommerce_migration_from_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">
                                        {t("ecommerce_migration_process_title")}
                                    </h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("ecommerce_migration_proc_1")}</li>
                                        <li>{t("ecommerce_migration_proc_2")}</li>
                                        <li>{t("ecommerce_migration_proc_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("ecommerce_migration_note")}
                            </p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:!bg-zinc-700 p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("ecommerce_pricing_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("ecommerce_pricing_1")}</li>
                                <li>{t("ecommerce_pricing_2")}</li>
                                <li>{t("ecommerce_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("ecommerce_pricing_note")}
                            </p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("ecommerce_toc_faq")}
                            </h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("ecommerce_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">
                      ▾
                    </span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("ecommerce_faq_a1")}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("ecommerce_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">
                      ▾
                    </span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("ecommerce_faq_a2")}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("ecommerce_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">
                      ▾
                    </span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("ecommerce_faq_a3")}
                                    </p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm dark:!text-white text-white">
                            <h2 className="text-xl font-semibold">{t("ecommerce_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("ecommerce_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="/contacts"
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("ecommerce_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("ecommerce_cta_btn_callback")}
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
                        serviceType: t("ecommerce_seo_headline"),
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
