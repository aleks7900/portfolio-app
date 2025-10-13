import {useMemo, useState} from "react";
import {useI18n} from "../../shared/i18n/i18n.tsx";


/**
 * Страница: Калькулятор стоимости — Разработка сайтов и веб‑приложений любой сложности
 * Пример маршрута: <Route path="/services/calc" element={<WebCostCalculatorPage />} />
 * Требуются i18n‑ключи calc_* (ru/ro словари ниже внизу файла как export const calcLocaleRu/Ro)
 *
 * Дизайн ориентирован на TailwindCSS v4 и общий стиль ваших сервис‑страниц.
 */
export default function WebCostCalculatorPage() {
    const {t} = useI18n();

    // --- FORM STATE -----------------------------------------------------------
    const [projectType, setProjectType] = useState<
        "landing" | "corporate" | "ecommerce" | "webapp"
    >("corporate");
    const [pages, setPages] = useState(8); // количество уникальных страниц/экранов
    const [design, setDesign] = useState<"basic" | "pro" | "brand">("pro");
    const [languages, setLanguages] = useState(2);
    const [auth, setAuth] = useState(true);
    const [admin, setAdmin] = useState(true);
    const [integrations, setIntegrations] = useState(2); // внешние интеграции
    const [seoPkg, setSeoPkg] = useState<"base" | "extended" | "max">("extended");
    const [performance, setPerformance] = useState(true); // CDN+кэш+опт.изображений
    const [support, setSupport] = useState<0 | 10 | 20>(10); // часов/мес
    const [urgency, setUrgency] = useState<"normal" | "fast" | "rush">("normal");

    // --- PRICING MODEL --------------------------------------------------------
    const estimate = useMemo(() => {
        // Базовые ставки (примерные, валюта задаётся в i18n)
        const base: Record<typeof projectType, number> = {
            landing: 600,
            corporate: 1200,
            ecommerce: 2200,
            webapp: 2600,
        };

        const pageRate: Record<typeof projectType, number> = {
            landing: 60,
            corporate: 120,
            ecommerce: 160,
            webapp: 220,
        };

        const designMult: Record<typeof design, number> = {
            basic: 1.0,
            pro: 1.25,
            brand: 1.5,
        };

        const seoAdds: Record<typeof seoPkg, number> = {
            base: 0,
            extended: 350,
            max: 700,
        };

        // Коэффициенты по типу проекта
        const typeK: Record<typeof projectType, number> = {
            landing: 1.0,
            corporate: 1.0,
            ecommerce: 1.15,
            webapp: 1.25,
        };

        // Функции стоимости
        const pagesCost = pages * pageRate[projectType];
        const langCost = Math.max(0, languages - 1) * 0.35 * (base[projectType] + pagesCost); // доп.языки как %
        const authCost = auth ? (projectType === "landing" ? 180 : 320) : 0;
        const adminCost = admin ? (projectType === "ecommerce" || projectType === "webapp" ? 650 : 420) : 0;
        const intCost = integrations * (projectType === "ecommerce" ? 220 : 180);
        const perfCost = performance ? 280 : 0;
        const supportCost = support * 18; // 18 / час (пример)

        let subtotal = (base[projectType] + pagesCost + langCost + authCost + adminCost + intCost + perfCost + seoAdds[seoPkg] + supportCost) * typeK[projectType] * designMult[design];

        // Срочность
        const urgK: Record<typeof urgency, number> = {normal: 1, fast: 1.15, rush: 1.35};
        subtotal *= urgK[urgency];

        // Диапазон (±10%)
        const min = Math.round(subtotal * 0.9);
        const max = Math.round(subtotal * 1.1);

        return {subtotal: Math.round(subtotal), min, max};
    }, [projectType, pages, design, languages, auth, admin, integrations, seoPkg, performance, support, urgency]);

    // Валюта и короткая подпись
    const currency = t("calc_currency", {defaultValue: "MDL"});
    const format = (v: number) => new Intl.NumberFormat(undefined).format(v);

    // --- UI -------------------------------------------------------------------
    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            {/* HERO */}
            <header className="mb-8">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("calc_badge")}
                </p>
                <h1 className="mt-2 non-prose !text-3xl sm:!text-4xl md:!text-5xl font-bold text-zinc-900">
                    {t("calc_title")}
                </h1>
                <p className="mt-3 text-zinc-600 max-w-3xl">{t("calc_intro")}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* TOC */}
                <nav className="lg:col-span-3 order-last lg:order-first">
                    <div className="sticky top-4 rounded-2xl border bg-white p-4 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-700 mb-3">
                            {t("calc_toc_title")}
                        </h2>
                        <ul className="space-y-2 text-sm">
                            {[
                                {id: "config", title: t("calc_toc_config")},
                                {id: "price", title: t("calc_toc_price")},
                                {id: "faq", title: t("calc_toc_faq")},
                            ].map((s) => (
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
                    {/* Configurator */}
                    <section id="config" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("calc_config_title")}</h2>
                            <div className="grid md:grid-cols-2 gap-5">
                                {/* Тип проекта */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">{t("calc_field_project")}</label>
                                    <select
                                        value={projectType}
                                        onChange={(e) => setProjectType(e.target.value as any)}
                                        className="w-full rounded-xl border p-2"
                                    >
                                        <option value="landing">{t("calc_project_landing")}</option>
                                        <option value="corporate">{t("calc_project_corporate")}</option>
                                        <option value="ecommerce">{t("calc_project_ecommerce")}</option>
                                        <option value="webapp">{t("calc_project_webapp")}</option>
                                    </select>
                                    <p className="text-xs text-zinc-500 mt-1">{t("calc_help_project")}</p>
                                </div>

                                {/* Кол-во страниц */}
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1">{t("calc_field_pages", {count: pages})}</label>
                                    <input
                                        type="range"
                                        min={1}
                                        max={40}
                                        value={pages}
                                        onChange={(e) => setPages(parseInt(e.target.value, 10))}
                                        className="w-full"
                                    />
                                    <div className="text-xs text-zinc-500 mt-1">{t("calc_help_pages")}</div>
                                </div>

                                {/* Дизайн */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">{t("calc_field_design")}</label>
                                    <div className="flex gap-2">
                                        {(["basic", "pro", "brand"] as const).map((d) => (
                                            <button
                                                key={d}
                                                onClick={() => setDesign(d)}
                                                className={`px-3 py-2 rounded-xl border text-sm ${
                                                    design === d ? "!bg-emerald-600 !text-white !border-emerald-600" : "bg-white text-black"
                                                }`}
                                            >
                                                {t(`calc_design_${d}`)}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-zinc-500 mt-1">{t("calc_help_design")}</p>
                                </div>

                                {/* Языки */}
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1">{t("calc_field_langs", {count: languages})}</label>
                                    <input
                                        type="range"
                                        min={1}
                                        max={5}
                                        value={languages}
                                        onChange={(e) => setLanguages(parseInt(e.target.value, 10))}
                                        className="w-full"
                                    />
                                    <div className="text-xs text-zinc-500 mt-1">{t("calc_help_langs")}</div>
                                </div>

                                {/* Авторизация */}
                                <div className="flex items-center gap-2">
                                    <input id="auth" type="checkbox" checked={auth}
                                           onChange={(e) => setAuth(e.target.checked)}/>
                                    <label htmlFor="auth" className="text-sm font-medium">{t("calc_field_auth")}</label>
                                </div>

                                {/* Админка */}
                                <div className="flex items-center gap-2">
                                    <input id="admin" type="checkbox" checked={admin}
                                           onChange={(e) => setAdmin(e.target.checked)}/>
                                    <label htmlFor="admin"
                                           className="text-sm font-medium">{t("calc_field_admin")}</label>
                                </div>

                                {/* Интеграции */}
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1">{t("calc_field_integrations", {count: integrations})}</label>
                                    <input
                                        type="range"
                                        min={0}
                                        max={6}
                                        value={integrations}
                                        onChange={(e) => setIntegrations(parseInt(e.target.value, 10))}
                                        className="w-full"
                                    />
                                    <div className="text-xs text-zinc-500 mt-1">{t("calc_help_integrations")}</div>
                                </div>

                                {/* SEO */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">{t("calc_field_seo")}</label>
                                    <select value={seoPkg} onChange={(e) => setSeoPkg(e.target.value as any)}
                                            className="w-full rounded-xl border p-2">
                                        <option value="base">{t("calc_seo_base")}</option>
                                        <option value="extended">{t("calc_seo_extended")}</option>
                                        <option value="max">{t("calc_seo_max")}</option>
                                    </select>
                                    <p className="text-xs text-zinc-500 mt-1">{t("calc_help_seo")}</p>
                                </div>

                                {/* Performance */}
                                <div className="flex items-center gap-2">
                                    <input id="perf" type="checkbox" checked={performance}
                                           onChange={(e) => setPerformance(e.target.checked)}/>
                                    <label htmlFor="perf" className="text-sm font-medium">{t("calc_field_perf")}</label>
                                </div>

                                {/* Support */}
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1">{t("calc_field_support", {count: support})}</label>
                                    <input
                                        type="range"
                                        min={0}
                                        max={40}
                                        step={10}
                                        value={support}
                                        onChange={(e) => setSupport(parseInt(e.target.value, 10) as 0 | 10 | 20)}
                                        className="w-full"
                                    />
                                    <div className="text-xs text-zinc-500 mt-1">{t("calc_help_support")}</div>
                                </div>

                                {/* Срочность */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">{t("calc_field_urgency")}</label>
                                    <div className="flex gap-2">
                                        {(["normal", "fast", "rush"] as const).map((u) => (
                                            <button
                                                key={u}
                                                onClick={() => setUrgency(u)}
                                                className={`px-3 py-2 rounded-xl border text-sm ${
                                                    urgency === u ? "!bg-emerald-600 !text-white !border-emerald-600" : "bg-white text-black"
                                                }`}
                                            >
                                                {t(`calc_urg_${u}`)}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-zinc-500 mt-1">{t("calc_help_urgency")}</p>
                                </div>
                            </div>

                            {/* Hints */}
                            <div className="mt-5 rounded-xl bg-zinc-50 border p-4 text-sm text-zinc-700">
                                <p className="font-medium">{t("calc_tips_title")}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>{t("calc_tip_scope")}</li>
                                    <li>{t("calc_tip_integrations")}</li>
                                    <li>{t("calc_tip_languages")}</li>
                                    <li>{t("calc_tip_timeline")}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Price */}
                    <section id="price" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("calc_price_title")}</h2>
                            <div className="grid md:grid-cols-3 gap-4 items-stretch">
                                <div className="rounded-xl border p-4">
                                    <p className="text-sm text-zinc-500">{t("calc_price_min")}</p>
                                    <p className="text-3xl font-bold">{format(estimate.min)} {currency}</p>
                                </div>
                                <div className="rounded-xl border p-4">
                                    <p className="text-sm text-zinc-500">{t("calc_price_est")}</p>
                                    <p className="text-3xl font-bold">{format(estimate.subtotal)} {currency}</p>
                                </div>
                                <div className="rounded-xl border p-4">
                                    <p className="text-sm text-zinc-500">{t("calc_price_max")}</p>
                                    <p className="text-3xl font-bold">{format(estimate.max)} {currency}</p>
                                </div>
                            </div>
                            <p className="text-xs text-zinc-500 mt-3">{t("calc_price_note")}</p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-emerald-600 text-white px-4 py-2 font-medium hover:bg-emerald-700">
                                    {t("calc_btn_contact")}
                                </a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-emerald-600 text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50"
                                >
                                    {t("calc_btn_callback")}
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className="scroll-mt-24">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-700 dark:!text-white">
                            <h2 className="text-xl font-semibold mb-4">{t("calc_faq_title")}</h2>
                            <div className="space-y-4">
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("calc_faq_q1")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("calc_faq_a1")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("calc_faq_q2")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("calc_faq_a2")}</p>
                                </details>
                                <details className="group rounded-xl border p-4">
                                    <summary className="cursor-pointer font-medium flex items-center justify-between">
                                        {t("calc_faq_q3")}<span
                                        className="ml-3 text-zinc-400 group-open:rotate-180 transition">▾</span>
                                    </summary>
                                    <p className="mt-2 text-zinc-700 dark:!text-white">{t("calc_faq_a3")}</p>
                                </details>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="scroll-mt-24">
                        <div
                            className="rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-600 p-6 shadow-sm text-white">
                            <h2 className="text-xl font-semibold">{t("calc_cta_title")}</h2>
                            <p className="text-emerald-50 mt-1">{t("calc_cta_sub")}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="/contacts"
                                   className="inline-flex items-center rounded-xl bg-white text-emerald-700 px-4 py-2 font-medium hover:bg-emerald-50">{t("calc_cta_btn_contact")}</a>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        (window as any).open?.("/#callback", "_self");
                                    }}
                                    className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2 font-medium hover:bg-white/10"
                                >
                                    {t("calc_cta_btn_callback")}
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
                        serviceType: t("calc_seo_headline"),
                        areaServed: ["MD", "RO", "UA"],
                        offers: {
                            "@type": "AggregateOffer",
                            priceCurrency: currency,
                            lowPrice: estimate.min,
                            highPrice: estimate.max,
                        },
                        inLanguage: "ru-RU",
                    }),
                }}
            />
        </main>
    );
}