import {useI18n} from "../../../shared/i18n/i18n.tsx";

/**
 * Страница: CSS3 — в разработке
 * Маршрут: <Route path="/services/css" element={<CssDevPage />} />
 * Требует i18n-ключи css_* (ru/ro словари). Можно временно полагаться на defaultValue.
 */
export default function CssDevPage() {
    const {t} = useI18n();

    const sections = [
        {id: "intro", title: t("css_toc_intro", {defaultValue: "Введение"})},
        {id: "modules", title: t("css_toc_modules", {defaultValue: "Модули CSS3"})},
        {id: "best", title: t("css_toc_best", {defaultValue: "Практики и архитектура"})},
        {id: "tools", title: t("css_toc_tools", {defaultValue: "Инструменты"})},
        {id: "perf", title: t("css_toc_perf", {defaultValue: "Производительность"})},
        {id: "faq", title: t("css_toc_faq", {defaultValue: "FAQ"})},
    ];

    const moduleCards = [
        "css_mod_selectors",
        "css_mod_flex",
        "css_mod_grid",
        "css_mod_vars",
        "css_mod_media",
        "css_mod_anim",
        "css_mod_typography",
        "css_mod_filters",
    ];

    const bestList = [
        "css_best_bem",
        "css_best_cascade",
        "css_best_tokens",
        "css_best_dark",
        "css_best_access",
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("css_badge", {defaultValue: "CSS3"})}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("css_title", {defaultValue: "Страница CSS3 в разработке"})}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">
                    {t("css_intro", {
                        defaultValue:
                            "Раздел готовится: соберём лучшие практики по современному CSS (Grid, Flexbox, переменные, контейнерные запросы, анимации). Ниже — предварительное содержание и черновые блоки.",
                    })}
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("css_toc_title", {defaultValue: "Содержание"})}
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
                            <h2 className="text-xl font-semibold mb-3">{t("css_toc_intro", {defaultValue: "Введение"})}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                <li>{t("css_intro_bul1", {defaultValue: "Единый стиль‑гайд и токены (цвет, размер, интерлиньяж)."})}</li>
                                <li>{t("css_intro_bul2", {defaultValue: "Сеточные системы: Flexbox и CSS Grid с адаптивом."})}</li>
                                <li>{t("css_intro_bul3", {defaultValue: "Тёмная тема и доступность: prefers-color-scheme, контраст."})}</li>
                                <li>{t("css_intro_bul4", {defaultValue: "Анимации, переходы, производительность рендеринга."})}</li>
                            </ul>
                        </div>
                    </section>

                    {/* Modules */}
                    <section id="modules" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("css_modules_title", {defaultValue: "Ключевые модули CSS3"})}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {moduleCards.map((k) => (
                                    <div key={k} className="rounded-xl border p-4 text-sm">
                                        {t(k, {defaultValue: k})}
                                    </div>
                                ))}
                            </div>
                            <div
                                className="mt-4 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700 dark:!text-black border">
                                <p className="font-medium">{t("css_modules_tip_title", {defaultValue: "Подсказка"})}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("css_modules_tip_1", {defaultValue: "Используйте container queries для более точного адаптива."})}</li>
                                    <li>{t("css_modules_tip_2", {defaultValue: "Переменные CSS упрощают темы и переиспользование."})}</li>
                                    <li>{t("css_modules_tip_3", {defaultValue: "Грид — для макета, флекс — для выравнивания внутри блоков."})}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Best practices */}
                    <section id="best" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("css_best_title", {defaultValue: "Практики и архитектура"})}</h2>
                            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:!text-white">
                                {bestList.map((k) => (
                                    <li key={k}>{t(k, {defaultValue: k})}</li>
                                ))}
                            </ul>
                            <p className="text-sm text-zinc-600 mt-3">
                                {t("css_best_note", {defaultValue: "БЭМ + утилитарные классы Tailwind хорошо сочетаются для больших проектов."})}
                            </p>
                        </div>
                    </section>

                    {/* Tooling */}
                    <section id="tools" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("css_tools_title", {defaultValue: "Инструменты"})}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("css_tool_postcss", {defaultValue: "PostCSS / Autoprefixer"}), t("css_tool_tailwind", {defaultValue: "Tailwind CSS v4"}), t("css_tool_linters", {defaultValue: "Stylelint / Prettier"}), t("css_tool_storybook", {defaultValue: "Storybook для визуальных регрессий"})].map((s) => (
                                    <div key={s} className="rounded-xl border p-4 text-sm">
                                        {s}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("css_tools_note", {defaultValue: "Настроим пайплайн сборки и визуальные снапшоты."})}</p>
                        </div>
                    </section>

                    {/* Performance */}
                    <section id="perf" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("css_perf_title", {defaultValue: "Производительность"})}</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[t("css_perf_critical", {defaultValue: "Critical CSS и lazy-loading стилей"}), t("css_perf_reduce", {defaultValue: "Снижение специфичности и веса"}), t("css_perf_gpu", {defaultValue: "Только композитные анимации (transform/opacity)"}), t("css_perf_audit", {defaultValue: "Аудит Lighthouse/DevTools"})].map((p) => (
                                    <div key={p} className="rounded-xl border p-4 text-sm">
                                        {p}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-600 mt-3">{t("css_perf_note", {defaultValue: "Избегаем layout thrashing и тяжёлых эффектов."})}</p>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white dark:bg-zinc-700 p-6 shadow-sm dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("css_toc_faq", {defaultValue: "FAQ"})}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("css_faq_q1", {defaultValue: "Tailwind или классический CSS?"})}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("css_faq_a1", {defaultValue: "Tailwind ускоряет разработку и устраняет каскадные конфликты. Классический CSS остаётся базой: переменные, гриды, анимации — всё то же."})}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("css_faq_q2", {defaultValue: "Нужен ли препроцессор (Sass/Less)?"})}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("css_faq_a2", {defaultValue: "В 2025 году чаще хватает нативного CSS + PostCSS. Sass полезен точечно, если есть наследие или сложные миксины."})}
                                    </p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("css_faq_q3", {defaultValue: "Как поддерживать тёмную тему?"})}
                                        <span className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:text-white">
                                        {t("css_faq_a3", {defaultValue: "Используйте CSS‑переменные и prefers-color-scheme. Tailwind упрощает переключение классов dark."})}
                                    </p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 dark:bg-zinc-700 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("css_cta_title", {defaultValue: "Нужна помощь с CSS?"})}</h2>
                            <p className="text-emerald-50 mt-1">{t("css_cta_sub", {defaultValue: "Оптимизируем стили, ускорим рендеринг и наведём порядок в коде."})}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">
                                    {t("css_cta_btn_contact", {defaultValue: "Связаться"})}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("css_cta_btn_callback", {defaultValue: "Обратный звонок"})}
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
                        serviceType: t("css_seo_headline", {defaultValue: "Консультации и разработка CSS"}),
                        areaServed: ["MD", "RO", "UA"],
                        offers: {
                            "@type": "Offer",
                            priceSpecification: {"@type": "PriceSpecification", priceCurrency: "MDL"}
                        },
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}
