// src/pages/services/SpringSecurityDevPage.tsx

import {toLangHref, useI18n} from "../../../shared/i18n/i18n.tsx";

/**
 * Страница: Spring Security в разработке
 * Маршрут: <Route path="/services/spring-security" element={<SpringSecurityDevPage />} />
 * Требует i18n-ключи springsec_* (ru/ro словари).
 */

export default function SpringSecurityDevPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("springsec_toc_intro")},
        {id: "concepts", title: t("springsec_toc_concepts")},
        {id: "auth", title: t("springsec_toc_auth")},
        {id: "authz", title: t("springsec_toc_authz")},
        {id: "oauth2", title: t("springsec_toc_oauth2")},
        {id: "jwt", title: t("springsec_toc_jwt")},
        {id: "sessions", title: t("springsec_toc_sessions")},
        {id: "csrf", title: t("springsec_toc_csrf")},
        {id: "cors", title: t("springsec_toc_cors")},
        {id: "methods", title: t("springsec_toc_methods")},
        {id: "multitenancy", title: t("springsec_toc_multitenancy")},
        {id: "testing", title: t("springsec_toc_testing")},
        {id: "hardening", title: t("springsec_toc_hardening")},
        {id: "observability", title: t("springsec_toc_observability")},
        {id: "integration", title: t("springsec_toc_integration")},
        {id: "migration", title: t("springsec_toc_migration")},
        {id: "pricing", title: t("springsec_toc_pricing")},
        {id: "faq", title: t("springsec_toc_faq")},
    ];

    const conceptCards = [
        "springsec_concepts_filters",
        "springsec_concepts_chain",
        "springsec_concepts_authmanager",
        "springsec_concepts_context",
        "springsec_concepts_userdetails",
        "springsec_concepts_password",
    ];

    const authMethods = [
        "springsec_auth_formlogin",
        "springsec_auth_basic",
        "springsec_auth_token",
        "springsec_auth_sso",
        "springsec_auth_2fa",
        "springsec_auth_webauthn",
    ];

    const hardeningList = [
        "springsec_hard_headers",
        "springsec_hard_ratelimit",
        "springsec_hard_ipfilter",
        "springsec_hard_audit",
        "springsec_hard_secrets",
        "springsec_hard_dependency",
    ];

    const observabilityList = [
        "springsec_obs_auditlog",
        "springsec_obs_events",
        "springsec_obs_metrics",
        "springsec_obs_tracing",
        "springsec_obs_alerts",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("springsec_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("springsec_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("springsec_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("springsec_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("springsec_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("springsec_intro_bul1")}</li>
                                <li>{t("springsec_intro_bul2")}</li>
                                <li>{t("springsec_intro_bul3")}</li>
                                <li>{t("springsec_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Core concepts */}
                    <section id="concepts" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_concepts_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {conceptCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("springsec_concepts_note")}</p>
                        </div>
                    </section>

                    {/* Authentication */}
                    <section id="auth" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_auth_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {authMethods.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700">
                                <p className="font-medium">{t("springsec_auth_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("springsec_auth_tip_1")}</li>
                                    <li>{t("springsec_auth_tip_2")}</li>
                                    <li>{t("springsec_auth_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Authorization */}
                    <section id="authz" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_authz_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("springsec_authz_roles")}</li>
                                <li>{t("springsec_authz_method")}</li>
                                <li>{t("springsec_authz_spel")}</li>
                                <li>{t("springsec_authz_acl")}</li>
                                <li>{t("springsec_authz_attrbased")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("springsec_authz_note")}</p>
                        </div>
                    </section>

                    {/* OAuth2/OpenID Connect */}
                    <section id="oauth2" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_oauth2_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("springsec_oauth2_login")}</li>
                                <li>{t("springsec_oauth2_client")}</li>
                                <li>{t("springsec_oauth2_resource")}</li>
                                <li>{t("springsec_oauth2_opaque")}</li>
                                <li>{t("springsec_oauth2_keyrotation")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* JWT */}
                    <section id="jwt" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_jwt_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("springsec_jwt_stateless")}</li>
                                <li>{t("springsec_jwt_refresh")}</li>
                                <li>{t("springsec_jwt_blacklist")}</li>
                                <li>{t("springsec_jwt_rolesclaims")}</li>
                                <li>{t("springsec_jwt_revocation")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("springsec_jwt_note")}</p>
                        </div>
                    </section>

                    {/* Sessions */}
                    <section id="sessions" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_sessions_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("springsec_sessions_management")}</li>
                                <li>{t("springsec_sessions_concurrency")}</li>
                                <li>{t("springsec_sessions_store")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* CSRF */}
                    <section id="csrf" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_csrf_title")}</h2>
                            <p className="text-zinc-700 mb-3">{t("springsec_csrf_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("springsec_csrf_when")}</li>
                                <li>{t("springsec_csrf_tokens")}</li>
                                <li>{t("springsec_csrf_spa")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* CORS */}
                    <section id="cors" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_cors_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("springsec_cors_global")}</li>
                                <li>{t("springsec_cors_perroute")}</li>
                                <li>{t("springsec_cors_preflight")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Method security */}
                    <section id="methods" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_methods_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("springsec_methods_prepost")}</li>
                                <li>{t("springsec_methods_secured")}</li>
                                <li>{t("springsec_methods_authorities")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("springsec_methods_note")}</p>
                        </div>
                    </section>

                    {/* Multitenancy */}
                    <section id="multitenancy" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_multitenancy_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("springsec_multi_strategy")}</li>
                                <li>{t("springsec_multi_resolver")}</li>
                                <li>{t("springsec_multi_isolation")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Testing */}
                    <section id="testing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_testing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("springsec_test_slices")}</li>
                                <li>{t("springsec_test_withmockuser")}</li>
                                <li>{t("springsec_test_jwtfactory")}</li>
                                <li>{t("springsec_test_containers")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("springsec_testing_note")}</p>
                        </div>
                    </section>

                    {/* Hardening */}
                    <section id="hardening" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_hard_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {hardeningList.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("springsec_hard_note")}</p>
                        </div>
                    </section>

                    {/* Observability */}
                    <section id="observability" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_obs_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                {observabilityList.map((k) => (
                                    <li key={k}>{t(k)}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Integration examples */}
                    <section id="integration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_integration_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {["springsec_int_react",
                                    "springsec_int_gateway",
                                    "springsec_int_keycloak",
                                    "springsec_int_kerberos",
                                    "springsec_int_ldap",
                                    "springsec_int_graphql"].map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("springsec_integration_note")}</p>
                        </div>
                    </section>

                    {/* Migration */}
                    <section id="migration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_migration_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("springsec_migration_from_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                        <li>{t("springsec_migration_from_1")}</li>
                                        <li>{t("springsec_migration_from_2")}</li>
                                        <li>{t("springsec_migration_from_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("springsec_migration_process_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                        <li>{t("springsec_migration_proc_1")}</li>
                                        <li>{t("springsec_migration_proc_2")}</li>
                                        <li>{t("springsec_migration_proc_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("springsec_migration_note")}</p>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section id="pricing" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_pricing_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("springsec_pricing_1")}</li>
                                <li>{t("springsec_pricing_2")}</li>
                                <li>{t("springsec_pricing_3")}</li>
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("springsec_pricing_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">{t("springsec_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("springsec_faq_q1")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("springsec_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("springsec_faq_q2")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("springsec_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("springsec_faq_q3")}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">{t("springsec_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("springsec_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("springsec_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href={toLangHref("/contacts", lang)}
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("springsec_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("springsec_cta_btn_callback")}
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
                        serviceType: t("springsec_seo_headline"),
                        areaServed: ["MD", "RO", "UA"],
                        audience: {"@type": "BusinessAudience", audienceType: "B2B/B2C"},
                        offers: {
                            "@type": "Offer",
                            priceSpecification: {"@type": "PriceSpecification", priceCurrency: "MDL"}
                        },
                        provider: {"@type": "Organization", name: "Alex-Lab"},
                        inLanguage: "ru-RU"
                    }),
                }}
            />
        </main>
    );
}
