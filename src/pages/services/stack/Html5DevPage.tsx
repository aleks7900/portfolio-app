import { useI18n } from "../../../shared/i18n/i18n.tsx";

/**
 * Страница: HTML5 — в разработке (under construction)
 * Маршрут: <Route path="/docs/html5" element={<Html5DevPage />} />
 * Требует i18n-ключи html5_* (ru/ro словари).
 *
 * Подсказка: структура и стили созданы по образцу EcommerceDevPage, но
 * контент помечен как «в разработке», чтобы быстро подключить страницу и
 * позже наполнить её реальными разделами.
 */
export default function Html5DevPage() {
    const {t, lang} = useI18n();

    const sections = [
        {id: "intro", title: t("html5_toc_intro", {defaultValue: "Введение"})},
        {id: "semantics", title: t("html5_toc_semantics", {defaultValue: "Семантика"})},
        {id: "forms", title: t("html5_toc_forms", {defaultValue: "Формы"})},
        {id: "media", title: t("html5_toc_media", {defaultValue: "Мультимедиа"})},
        {id: "best", title: t("html5_toc_best", {defaultValue: "Лучшие практики"})},
        {id: "faq", title: t("html5_toc_faq", {defaultValue: "FAQ"})},
    ];

    const placeholder = (
        <div className="rounded-xl border bg-zinc-50 p-4 text-sm text-zinc-700">
            <p className="font-medium">{t("html5_dev_placeholder_title", {defaultValue: "Раздел в разработке"})}</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>{t("html5_dev_placeholder_1", {defaultValue: "Подготовка структуры контента"})}</li>
                <li>{t("html5_dev_placeholder_2", {defaultValue: "Добавление примеров и сниппетов"})}</li>
                <li>{t("html5_dev_placeholder_3", {defaultValue: "SEO/JSON-LD и внутренние ссылки"})}</li>
            </ul>
        </div>
    );

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("html5_badge", {defaultValue: "HTML5 — документация"})}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("html5_title", {defaultValue: "HTML5: руководство (в разработке)"})}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">
                    {t("html5_intro", {
                        defaultValue:
                            "Мы готовим подробное, практичное руководство по HTML5: семантика, формы, мультимедиа, доступность, SEO и лучшие практики.",
                    })}
                </p>

                {/* Under construction ribbon */}
                <div className="mt-4 flex items-center gap-3 rounded-2xl border bg-amber-50 p-4 text-amber-900">
          <span className="text-2xl" aria-hidden>
            🚧
          </span>
                    <div>
                        <p className="font-semibold">
                            {t("html5_uc_title", {defaultValue: "Страница в разработке"})}
                        </p>
                        <p className="text-sm opacity-90">
                            {t("html5_uc_text", {
                                defaultValue: "Скоро добавим примеры кода, чек-листы и наглядные кейсы.",
                            })}
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("html5_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">
                                {t("html5_toc_intro", {defaultValue: "Введение"})}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("html5_intro_bul1", {defaultValue: "Роль HTML5 в современном вебе"})}</li>
                                <li>{t("html5_intro_bul2", {defaultValue: "Принципы семантики и доступности"})}</li>
                                <li>{t("html5_intro_bul3", {defaultValue: "Стандарты, валидаторы, совместимость"})}</li>
                                <li>{t("html5_intro_bul4", {defaultValue: "Интеграция с CSS/JS и SEO"})}</li>
                            </ul>
                            <div className="mt-4">{placeholder}</div>
                        </div>
                    </section>

                    {/* Semantics */}
                    <section id="semantics" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">
                                {t("html5_semantics_title", {defaultValue: "Семантические теги"})}
                            </h2>
                            <p className="text-zinc-700 mb-3">
                                {t("html5_semantics_p1", {
                                    defaultValue:
                                        "header, nav, main, section, article, aside, footer — когда и зачем их использовать.",
                                })}
                            </p>
                            {placeholder}
                        </div>
                    </section>

                    {/* Forms */}
                    <section id="forms" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">
                                {t("html5_forms_title", {defaultValue: "Формы и валидация"})}
                            </h2>
                            <p className="text-zinc-700 mb-3">
                                {t("html5_forms_p1", {
                                    defaultValue: "input types, pattern, required, aria-* и UX подсказки.",
                                })}
                            </p>
                            {placeholder}
                        </div>
                    </section>

                    {/* Media */}
                    <section id="media" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">
                                {t("html5_media_title", {defaultValue: "Мультимедиа: audio, video, picture"})}
                            </h2>
                            <p className="text-zinc-700 mb-3">
                                {t("html5_media_p1", {
                                    defaultValue:
                                        "Фоллбеки, форматы, производительность и доступность мультимедиа-контента.",
                                })}
                            </p>
                            {placeholder}
                        </div>
                    </section>

                    {/* Best practices */}
                    <section id="best" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">
                                {t("html5_best_title", {defaultValue: "Лучшие практики"})}
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                                <li>{t("html5_best_bul1", {defaultValue: "Правильные метатеги и языковые атрибуты"})}</li>
                                <li>{t("html5_best_bul2", {defaultValue: "Доступность: alt, label, landmarks"})}</li>
                                <li>{t("html5_best_bul3", {defaultValue: "SEO: structured data, breadcrumbs"})}</li>
                                <li>{t("html5_best_bul4", {defaultValue: "Производительность и валидность разметки"})}</li>
                            </ul>
                            <div className="mt-4">{placeholder}</div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">
                                {t("html5_toc_faq", {defaultValue: "FAQ"})}
                            </h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("html5_faq_q1", {defaultValue: "Чем HTML5 отличается от XHTML/HTML4?"})}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">
                                        {t("html5_faq_a1", {defaultValue: "Новая семантика, мультимедиа, API и упрощённый синтаксис."})}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("html5_faq_q2", {defaultValue: "Нужно ли всегда использовать семантические теги?"})}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700">
                                        {t("html5_faq_a2", {defaultValue: "Да, когда это улучшает структуру, доступность и SEO страницы."})}
                                    </p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("html5_cta_title", {defaultValue: "Нужна помощь с вёрсткой?"})}</h2>
                            <p className="text-emerald-50 mt-1">
                                {t("html5_cta_sub", {defaultValue: "Подскажем по структуре, семантике, доступности и SEO."})}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href={toLangHref("/contacts", lang)}
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("html5_cta_btn_contact", {defaultValue: "Связаться"})}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("html5_cta_btn_callback", {defaultValue: "Обратный звонок"})}
                                </a>
                            </div>
                        </div>
                    </section>
                </article>
            </div>

            {/* SEO JSON-LD (минимум) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TechArticle",
                        headline: t("html5_seo_headline", {defaultValue: "HTML5 — руководство"}),
                        inLanguage: "ru-RU",
                        about: ["HTML5", "семантика", "forms", "media", "accessibility"],
                    }),
                }}
            />
        </main>
    );
}
