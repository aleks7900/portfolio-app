import {toLangHref, useI18n} from "../../../shared/i18n/i18n.tsx";
import SEO from "../../../shared/SEO.tsx";

/**
 * Страница: Nginx в разработке (настройка, оптимизация, деплой)
 * Маршрут: <Route path="/services/nginx" element={<NginxDevPage />} />
 * Требует i18n-ключи nginx_* (ru/ro словари).
 */

export default function NginxDevPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("nginx_toc_intro")},
        {id: "benefits", title: t("nginx_toc_benefits")},
        {id: "stack", title: t("nginx_toc_stack")},
        {id: "reverse", title: t("nginx_toc_reverse")},
        {id: "ssl", title: t("nginx_toc_ssl")},
        {id: "http3", title: t("nginx_toc_http3")},
        {id: "caching", title: t("nginx_toc_caching")},
        {id: "compression", title: t("nginx_toc_compression")},
        {id: "security", title: t("nginx_toc_security")},
        {id: "spa", title: t("nginx_toc_spa")},
        {id: "media", title: t("nginx_toc_media")},
        {id: "observability", title: t("nginx_toc_observability")},
        {id: "devops", title: t("nginx_toc_devops")},
        {id: "migration", title: t("nginx_toc_migration")},
        {id: "pricing", title: t("nginx_toc_pricing")},
        {id: "faq", title: t("nginx_toc_faq")},
    ];

    const featureCards = [
        "nginx_feat_reverse_proxy",
        "nginx_feat_load_balancing",
        "nginx_feat_blue_green",
        "nginx_feat_zero_downtime",
        "nginx_feat_rate_limit",
        "nginx_feat_cors",
        "nginx_feat_security_headers",
        "nginx_feat_static_spa",
    ];

    const integrationCards = [
        "nginx_int_certbot",
        "nginx_int_cloudflare",
        "nginx_int_prom_grafana",
        "nginx_int_fail2ban",
        "nginx_int_prerender",
        "nginx_int_ci_cd",
    ];

    const opsBullets = [
        "nginx_ops_reload_strategy",
        "nginx_ops_syntax_test",
        "nginx_ops_rollbacks",
        "nginx_ops_logs_rotate",
        "nginx_ops_backup",
        "nginx_ops_audit",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            <SEO titleKey="nginx_title" descriptionKey="nginx_intro" pathname="/dev/nginx" />
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("nginx_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("nginx_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("nginx_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("nginx_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("nginx_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("nginx_intro_bul1")}</li>
                                <li>{t("nginx_intro_bul2")}</li>
                                <li>{t("nginx_intro_bul3")}</li>
                                <li>{t("nginx_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("nginx_benefits_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("nginx_ben_speed"), t("nginx_ben_stability"), t("nginx_ben_security"), t("nginx_ben_scalability")].map(
                                    (c, i) => (
                                        <div key={i} className="rounded-xl border p-4">
                                            <p className="text-zinc-700 dark:!text-white">{c}</p>
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("nginx_benefits_note")}</p>
                        </div>
                    </section>

                    {/* Tech stack */}
                    <section id="stack" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("nginx_stack_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("nginx_stack_p1")}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("nginx_stack_core"), t("nginx_stack_tls"), t("nginx_stack_http3"), t("nginx_stack_observability")].map(
                                    (s) => (
                                        <div key={s} className="rounded-xl border p-4 text-sm">
                                            {s}
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("nginx_stack_note")}</p>
                        </div>
                    </section>

                    {/* Core features */}
                    <section id="reverse" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("nginx_features_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {featureCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("nginx_features_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("nginx_features_tip_1")}</li>
                                    <li>{t("nginx_features_tip_2")}</li>
                                    <li>{t("nginx_features_tip_3")}</li>
                                    <li>{t("nginx_features_tip_4")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* SSL/TLS */}
                    <section id="ssl" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("nginx_ssl_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("nginx_ssl_lets_encrypt")}</li>
                                <li>{t("nginx_ssl_hsts")}</li>
                                <li>{t("nginx_ssl_ocsp")}</li>
                                <li>{t("nginx_ssl_ciphers")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("nginx_ssl_note")}</p>
                        </div>
                    </section>

                    {/* HTTP/3 */}
                    <section id="http3" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("nginx_http3_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("nginx_http3_enable")}</li>
                                <li>{t("nginx_http3_alt_svc")}</li>
                                <li>{t("nginx_http3_fallback")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("nginx_http3_note")}</p>
                        </div>
                    </section>

                    {/* Caching */}
                    <section id="caching" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("nginx_caching_title")}</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("nginx_tbl_directive")}</th>
                                        <th className="text-left p-3">{t("nginx_tbl_example")}</th>
                                        <th className="text-left p-3">{t("nginx_tbl_note")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {[
                                        {
                                            d: t("nginx_tbl_proxy_cache_path"),
                                            ex: "proxy_cache_path /var/cache/nginx keys_zone=STATIC:10m max_size=1g;",
                                            n: t("nginx_tbl_cache_path_note")
                                        },
                                        {
                                            d: t("nginx_tbl_cache_control"),
                                            ex: "location ~* \\.(js|css|png|jpg)$ { expires 7d; add_header Cache-Control public; }",
                                            n: t("nginx_tbl_cache_control_note")
                                        },
                                        {d: t("nginx_tbl_etag"), ex: "etag on;", n: t("nginx_tbl_etag_note")},
                                    ].map((r, i) => (
                                        <tr key={i}>
                                            <td className="p-3">{r.d}</td>
                                            <td className="p-3">{r.ex}</td>
                                            <td className="p-3">{r.n}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("nginx_caching_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("nginx_caching_tip_1")}</li>
                                    <li>{t("nginx_caching_tip_2")}</li>
                                    <li>{t("nginx_caching_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Compression */}
                    <section id="compression" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("nginx_compression_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("nginx_compress_gzip")}</li>
                                <li>{t("nginx_compress_brotli")}</li>
                                <li>{t("nginx_compress_min_types")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("nginx_compression_note")}</p>
                        </div>
                    </section>

                    {/* Security */}
                    <section id="security" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("nginx_security_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("nginx_sec_limit_req")}</li>
                                <li>{t("nginx_sec_waf")}</li>
                                <li>{t("nginx_sec_headers")}</li>
                                <li>{t("nginx_sec_bot_protect")}</li>
                                <li>{t("nginx_sec_logs")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("nginx_security_note")}</p>
                        </div>
                    </section>

                    {/* SPA routing */}
                    <section id="spa" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("nginx_spa_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("nginx_spa_history_fallback")}</li>
                                <li>{t("nginx_spa_prerender")}</li>
                                <li>{t("nginx_spa_sitemap_robots")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("nginx_spa_note")}</p>
                        </div>
                    </section>

                    {/* Media & static */}
                    <section id="media" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("nginx_media_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("nginx_media_p1")}</p>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("nginx_media_uploads_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("nginx_media_locations")}</li>
                                        <li>{t("nginx_media_cache_busting")}</li>
                                        <li>{t("nginx_media_cdn")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("nginx_media_images_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("nginx_media_webp_avif")}</li>
                                        <li>{t("nginx_media_thumb_rules")}</li>
                                        <li>{t("nginx_media_ranges")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("nginx_media_note")}</p>
                        </div>
                    </section>

                    {/* Observability */}
                    <section id="observability" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("nginx_observability_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("nginx_obs_access_logs"), t("nginx_obs_error_logs"), t("nginx_obs_metrics"), t("nginx_obs_dashboards")].map(
                                    (p) => (
                                        <div key={p} className="rounded-xl border p-4 text-sm">
                                            {p}
                                        </div>
                                    )
                                )}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("nginx_observability_note")}</p>
                        </div>
                    </section>

                    {/* DevOps / Integrations */}
                    <section id="devops" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("nginx_integrations_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {integrationCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("nginx_integrations_note")}</p>

                            <div className="mt-6 rounded-xl border p-4">
                                <h3 className="font-medium mb-2">{t("nginx_ops_title")}</h3>
                                <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                    {opsBullets.map((k) => <li key={k}>{t(k)}</li>)}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Migration */}
                    <section id="migration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("nginx_migration_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("nginx_migration_from_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("nginx_migration_from_apache")}</li>
                                        <li>{t("nginx_migration_from_caddy")}</li>
                                        <li>{t("nginx_migration_from_lb")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("nginx_migration_process_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("nginx_migration_proc_1")}</li>
                                        <li>{t("nginx_migration_proc_2")}</li>
                                        <li>{t("nginx_migration_proc_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("nginx_migration_note")}</p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:!bg-zinc-700 p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("nginx_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("nginx_pricing_1")}</li>
                                <li>{t("nginx_pricing_2")}</li>
                                <li>{t("nginx_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("nginx_pricing_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("nginx_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("nginx_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("nginx_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("nginx_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("nginx_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("nginx_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("nginx_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm dark:!text-white text-white">
                            <h2 className="text-xl font-semibold">{t("nginx_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("nginx_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href={toLangHref("/contacts", lang)}
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("nginx_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.hash = "callback";
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("nginx_cta_btn_callback")}
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
                        serviceType: t("nginx_seo_headline"),
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
