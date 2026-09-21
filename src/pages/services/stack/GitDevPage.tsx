import {toLangHref, useI18n} from "../../../shared/i18n/i18n.tsx";
import SEO from "../../../shared/SEO.tsx";

/**
 * Страница: Git — рабочие процессы и best practices
 * Маршрут: <Route path="/services/git" element={<GitDevPage />} />
 * Требует i18n-ключи git_* (ru/ro словари).
 */
export default function GitDevPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("git_toc_intro")},
        {id: "benefits", title: t("git_toc_benefits")},
        {id: "workflow", title: t("git_toc_workflow")},
        {id: "branching", title: t("git_toc_branching")},
        {id: "code_review", title: t("git_toc_code_review")},
        {id: "ci_cd", title: t("git_toc_ci_cd")},
        {id: "hooks", title: t("git_toc_hooks")},
        {id: "repo", title: t("git_toc_repo")},
        {id: "security", title: t("git_toc_security")},
        {id: "migration", title: t("git_toc_migration")},
        {id: "faq", title: t("git_toc_faq")},
    ];

    const benefitCards = [
        "git_ben_traceability",
        "git_ben_parallel",
        "git_ben_code_quality",
        "git_ben_delivery",
    ];

    const workflowSteps = [
        "git_flow_step_plan",
        "git_flow_step_branch",
        "git_flow_step_commit",
        "git_flow_step_test",
        "git_flow_step_review",
        "git_flow_step_merge",
        "git_flow_step_release",
    ];

    const branchingCards = [
        "git_branch_main",
        "git_branch_develop",
        "git_branch_feature",
        "git_branch_hotfix",
        "git_branch_release",
    ];

    const reviewTips = [
        "git_review_small_prs",
        "git_review_templates",
        "git_review_checks",
        "git_review_blocking",
    ];

    const ciItems = [
        "git_ci_linters",
        "git_ci_tests",
        "git_ci_build",
        "git_ci_release",
    ];

    const hookCards = [
        "git_hook_precommit",
        "git_hook_commitmsg",
        "git_hook_prepush",
        "git_hook_custom",
    ];

    const repoRows = [
        {
            f: "README.md",
            ex: t("git_repo_readme_ex"),
            n: t("git_repo_readme_note"),
        },
        {
            f: ".gitignore",
            ex: t("git_repo_ignore_ex"),
            n: t("git_repo_ignore_note"),
        },
        {
            f: "CONTRIBUTING.md",
            ex: t("git_repo_contrib_ex"),
            n: t("git_repo_contrib_note"),
        },
        {
            f: ".gitattributes",
            ex: t("git_repo_attr_ex"),
            n: t("git_repo_attr_note"),
        },
        {
            f: ".github/workflows/*.yml",
            ex: t("git_repo_ci_ex"),
            n: t("git_repo_ci_note"),
        },
    ];

    const securityList = [
        "git_sec_signed_commits",
        "git_sec_secrets_scan",
        "git_sec_branch_protection",
        "git_sec_access_policies",
        "git_sec_dependency_audit",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            <SEO titleKey="git_title" descriptionKey="git_intro" pathname="/dev/git" />
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("git_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("git_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("git_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("git_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("git_toc_intro")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("git_intro_bul1")}</li>
                                <li>{t("git_intro_bul2")}</li>
                                <li>{t("git_intro_bul3")}</li>
                                <li>{t("git_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Benefits */}
                    <section id="benefits" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("git_benefits_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {benefitCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4">
                                        <p className="text-zinc-700 dark:!text-white">{t(k)}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("git_benefits_note")}</p>
                        </div>
                    </section>

                    {/* Workflow */}
                    <section id="workflow" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("git_workflow_title")}</h2>
                            <ol className="list-decimal pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                {workflowSteps.map((k) => (
                                    <li key={k}>{t(k)}</li>
                                ))}
                            </ol>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700 dark:!text-black">
                                <p className="font-medium">{t("git_workflow_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("git_workflow_tip_1")}</li>
                                    <li>{t("git_workflow_tip_2")}</li>
                                    <li>{t("git_workflow_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Branching model */}
                    <section id="branching" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("git_branching_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {branchingCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("git_branching_note")}</p>
                        </div>
                    </section>

                    {/* Code review */}
                    <section id="code_review" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("git_review_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                {reviewTips.map((k) => (
                                    <li key={k}>{t(k)}</li>
                                ))}
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("git_review_note")}</p>
                        </div>
                    </section>

                    {/* CI/CD */}
                    <section id="ci_cd" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("git_ci_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {ciItems.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">{t(k)}</div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("git_ci_note")}</p>
                        </div>
                    </section>

                    {/* Hooks */}
                    <section id="hooks" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("git_hooks_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {hookCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">{t(k)}</div>
                                ))}
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                                <p className="font-medium">{t("git_hooks_tip_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("git_hooks_tip_1")}</li>
                                    <li>{t("git_hooks_tip_2")}</li>
                                    <li>{t("git_hooks_tip_3")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Repo structure */}
                    <section id="repo" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("git_repo_title")}</h2>
                            <p className="text-zinc-700 dark:!text-white mb-3">{t("git_repo_p1")}</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border divide-y">
                                    <thead className="bg-zinc-50 dark:!text-black">
                                    <tr>
                                        <th className="text-left p-3">{t("git_tbl_file")}</th>
                                        <th className="text-left p-3">{t("git_tbl_example")}</th>
                                        <th className="text-left p-3">{t("git_tbl_note")}</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {repoRows.map((r, i) => (
                                        <tr key={i}>
                                            <td className="p-3">{r.f}</td>
                                            <td className="p-3">{r.ex}</td>
                                            <td className="p-3">{r.n}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("git_repo_note")}</p>
                        </div>
                    </section>

                    {/* Security */}
                    <section id="security" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("git_security_title")}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                {securityList.map((k) => (
                                    <li key={k}>{t(k)}</li>
                                ))}
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">{t("git_security_note")}</p>
                        </div>
                    </section>

                    {/* Migration */}
                    <section id="migration" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("git_migration_title")}</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium mb-2">{t("git_migration_from_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("git_migration_from_1")}</li>
                                        <li>{t("git_migration_from_2")}</li>
                                        <li>{t("git_migration_from_3")}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">{t("git_migration_process_title")}</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                        <li>{t("git_migration_proc_1")}</li>
                                        <li>{t("git_migration_proc_2")}</li>
                                        <li>{t("git_migration_proc_3")}</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("git_migration_note")}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("git_toc_faq")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("git_faq_q1")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("git_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("git_faq_q2")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("git_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("git_faq_q3")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">{t("git_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm dark:!text-white text-white">
                            <h2 className="text-xl font-semibold">{t("git_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("git_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href={toLangHref("/contacts", lang)}
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("git_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.hash = "callback";
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("git_cta_btn_callback")}
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
                        serviceType: t("git_seo_headline"),
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
