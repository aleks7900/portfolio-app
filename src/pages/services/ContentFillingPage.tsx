import {toLangHref, useI18n} from "../../shared/i18n/i18n.tsx";

/**
 * Страница: Наполнение контентом
 * Маршрут: <Route path="/services/content-filling" element={<ContentFillingPage />} />
 * Требует i18n-ключи content_* (ru/ro словари).
 */

export default function ContentFillingPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("content_toc_intro")},
        {id: "types", title: t("content_toc_types")},
        {id: "process", title: t("content_toc_process")},
        {id: "seo", title: t("content_toc_seo")},
        {id: "multimedia", title: t("content_toc_multimedia")},
        {id: "tools", title: t("content_toc_tools")},
        {id: "faq", title: t("content_toc_faq")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("content_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("content_title_t")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("content_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("content_toc_title", {defaultValue: "Содержание"})}
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
                                {t("content_toc_intro")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("content_intro_bul1")}</li>
                                <li>{t("content_intro_bul2")}</li>
                                <li>{t("content_intro_bul3")}</li>
                                <li>{t("content_intro_bul4")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Types */}
                    <section id="types" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("content_types_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4 text-zinc-700 dark:!text-white">
                                    <p>{t("content_types_text")}</p>
                                </div>
                                <div className="rounded-xl border p-4 text-zinc-700 dark:!text-white">
                                    <p>{t("content_types_image")}</p>
                                </div>
                                <div className="rounded-xl border p-4 text-zinc-700 dark:!text-white">
                                    <p>{t("content_types_video")}</p>
                                </div>
                                <div className="rounded-xl border p-4 text-zinc-700 dark:!text-white">
                                    <p>{t("content_types_audio")}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Process */}
                    <section id="process" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("content_process_title")}
                            </h2>
                            <ol className="list-decimal pl-5 space-y-2 text-zinc-700 dark:!text-white">
                                <li>{t("content_process_1")}</li>
                                <li>{t("content_process_2")}</li>
                                <li>{t("content_process_3")}</li>
                                <li>{t("content_process_4")}</li>
                            </ol>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("content_process_note")}
                            </p>
                        </div>
                    </section>

                    {/* SEO */}
                    <section id="seo" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("content_seo_title")}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("content_seo_1")}</li>
                                <li>{t("content_seo_2")}</li>
                                <li>{t("content_seo_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Multimedia */}
                    <section id="multimedia" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("content_multimedia_title")}
                            </h2>
                            <p className="mb-3">{t("content_multimedia_p1")}</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>{t("content_multimedia_1")}</li>
                                <li>{t("content_multimedia_2")}</li>
                                <li>{t("content_multimedia_3")}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Tools */}
                    <section id="tools" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("content_tools_title")}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="rounded-xl border p-4 text-sm">
                                    <p>{t("content_tools_1")}</p>
                                </div>
                                <div className="rounded-xl border p-4 text-sm">
                                    <p>{t("content_tools_2")}</p>
                                </div>
                                <div className="rounded-xl border p-4 text-sm">
                                    <p>{t("content_tools_3")}</p>
                                </div>
                                <div className="rounded-xl border p-4 text-sm">
                                    <p>{t("content_tools_4")}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("content_toc_faq")}
                            </h2>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <details key={i} className="group rounded-xl border p-4">
                                        <summary
                                            className="cursor-pointer font-medium flex items-center justify-between">
                                            {t(`content_faq_q${i}`)}
                                            <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">
                        ▾
                      </span>
                                        </summary>
                                        <p className="mt-2 text-zinc-700 dark:text-white">
                                            {t(`content_faq_a${i}`)}
                                        </p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">
                                {t("content_cta_title")}
                            </h2>
                            <p className="text-emerald-50 mt-1">{t("content_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href={toLangHref("/contacts", lang)}
                                    className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("content_cta_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.hash = "callback";
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("content_cta_btn_callback")}
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
                        headline: t("content_seo_headline"),
                        about: ["Контент", "SEO", "Изображения", "Мультимедиа"],
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
