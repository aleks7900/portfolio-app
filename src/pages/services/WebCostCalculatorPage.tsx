import { useMemo, useState } from "react";
import { toLangHref, useI18n } from "../../shared/i18n/i18n.tsx";
import PageTransition from "../../components/motion/PageTransition.tsx";
import { Calculator, ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button.tsx";
import SEO from "../../shared/SEO.tsx";

export default function WebCostCalculatorPage() {
  const { t, lang } = useI18n();

  // --- FORM STATE -----------------------------------------------------------
  const [projectType, setProjectType] = useState<
    "landing" | "corporate" | "ecommerce" | "webapp"
  >("corporate");
  const [pages, setPages] = useState(8);
  const [design, setDesign] = useState<"basic" | "pro" | "brand">("pro");
  const [languages, setLanguages] = useState(2);
  const [auth, setAuth] = useState(true);
  const [admin, setAdmin] = useState(true);
  const [integrations, setIntegrations] = useState(2);
  const [seoPkg, setSeoPkg] = useState<"base" | "extended" | "max">("extended");
  const [performance, setPerformance] = useState(true);
  const [support, setSupport] = useState<0 | 10 | 20>(10);
  const [urgency, setUrgency] = useState<"normal" | "fast" | "rush">("normal");

  // --- PRICING MODEL --------------------------------------------------------
  const estimate = useMemo(() => {
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

    const typeK: Record<typeof projectType, number> = {
      landing: 1.0,
      corporate: 1.0,
      ecommerce: 1.15,
      webapp: 1.25,
    };

    const pagesCost = pages * pageRate[projectType];
    const langCost =
      Math.max(0, languages - 1) * 0.35 * (base[projectType] + pagesCost);
    const authCost = auth ? (projectType === "landing" ? 180 : 320) : 0;
    const adminCost = admin
      ? projectType === "ecommerce" || projectType === "webapp"
        ? 650
        : 420
      : 0;
    const intCost = integrations * (projectType === "ecommerce" ? 220 : 180);
    const perfCost = performance ? 280 : 0;
    const supportCost = support * 18;

    let subtotal =
      (base[projectType] +
        pagesCost +
        langCost +
        authCost +
        adminCost +
        intCost +
        perfCost +
        seoAdds[seoPkg] +
        supportCost) *
      typeK[projectType] *
      designMult[design];

    const urgK: Record<typeof urgency, number> = {
      normal: 1,
      fast: 1.15,
      rush: 1.35,
    };
    subtotal *= urgK[urgency];

    const min = Math.round(subtotal * 0.9);
    const max = Math.round(subtotal * 1.1);

    return { subtotal: Math.round(subtotal), min, max };
  }, [
    projectType,
    pages,
    design,
    languages,
    auth,
    admin,
    integrations,
    seoPkg,
    performance,
    support,
    urgency,
  ]);

  const currency = t("calc_currency", { defaultValue: "MDL" });
  const format = (v: number) => new Intl.NumberFormat(undefined).format(v);

  return (
    <PageTransition>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <SEO
          titleKey="calc_title"
          descriptionKey="calc_intro"
          pathname="/web/calc"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: t("calc_seo_headline", { defaultValue: "Калькулятор стоимости разработки веб-сайта" }),
            areaServed: ["MD", "RO", "EU"],
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: currency,
              lowPrice: estimate.min,
              highPrice: estimate.max,
            },
            inLanguage: lang === "ro" ? "ro-RO" : lang === "en" ? "en-US" : "ru-RU",
          }}
        />
        {/* HERO */}
        <header className="mb-12 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Calculator className="h-3.5 w-3.5" />
            <span>{t("calc_badge")}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            {t("calc_title")}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("calc_intro")}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* TOC (Sidebar navigation) */}
          <nav className="lg:col-span-3 order-last lg:order-first">
            <div className="sticky top-24 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md p-5 shadow-xs">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                {t("calc_toc_title")}
              </h2>
              <ul className="space-y-1.5 text-sm">
                {[
                  { id: "config", title: t("calc_toc_config") },
                  { id: "price", title: t("calc_toc_price") },
                  { id: "faq", title: t("calc_toc_faq") },
                ].map((s) => (
                  <li key={s.id}>
                    <a
                      className="block rounded-lg px-3 py-2 text-foreground/80 hover:text-foreground hover:bg-accent/60 transition-colors font-medium"
                      href={`#${s.id}`}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* MAIN ARTICLE */}
          <article className="lg:col-span-9 space-y-10">
            {/* Configurator */}
            <section id="config" className="scroll-mt-24">
              <div className="rounded-3xl border border-border/80 bg-card/80 backdrop-blur-md p-6 sm:p-8 shadow-sm space-y-8">
                <div className="flex items-center gap-2 pb-4 border-b border-border/60">
                  <Sparkles className="h-5 w-5 text-emerald-500" />
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    {t("calc_config_title")}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Project Type */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("calc_field_project")}
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) =>
                        setProjectType(
                          e.target.value as "landing" | "corporate" | "ecommerce" | "webapp"
                        )
                      }
                      className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground shadow-xs outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="landing">{t("calc_project_landing")}</option>
                      <option value="corporate">{t("calc_project_corporate")}</option>
                      <option value="ecommerce">{t("calc_project_ecommerce")}</option>
                      <option value="webapp">{t("calc_project_webapp")}</option>
                    </select>
                    <p className="text-xs text-muted-foreground">
                      {t("calc_help_project")}
                    </p>
                  </div>

                  {/* Pages Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {t("calc_field_pages", { count: pages })}
                      </label>
                      <span className="text-xs font-bold rounded-md bg-primary/10 text-primary px-2 py-0.5">
                        {pages}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={40}
                      value={pages}
                      onChange={(e) => setPages(parseInt(e.target.value, 10))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      {t("calc_help_pages")}
                    </p>
                  </div>

                  {/* Design Tier */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("calc_field_design")}
                    </label>
                    <div className="flex gap-2">
                      {(["basic", "pro", "brand"] as const).map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDesign(d)}
                          className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer select-none ${
                            design === d
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-secondary/60 hover:bg-secondary text-foreground border-border/80"
                          }`}
                        >
                          {t(`calc_design_${d}`)}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t("calc_help_design")}
                    </p>
                  </div>

                  {/* Languages Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {t("calc_field_langs", { count: languages })}
                      </label>
                      <span className="text-xs font-bold rounded-md bg-primary/10 text-primary px-2 py-0.5">
                        {languages}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={languages}
                      onChange={(e) => setLanguages(parseInt(e.target.value, 10))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      {t("calc_help_langs")}
                    </p>
                  </div>

                  {/* Features (Auth & Admin) */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        id="auth"
                        type="checkbox"
                        checked={auth}
                        onChange={(e) => setAuth(e.target.checked)}
                        className="h-4 w-4 rounded border-border accent-primary cursor-pointer"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {t("calc_field_auth")}
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        id="admin"
                        type="checkbox"
                        checked={admin}
                        onChange={(e) => setAdmin(e.target.checked)}
                        className="h-4 w-4 rounded border-border accent-primary cursor-pointer"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {t("calc_field_admin")}
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        id="perf"
                        type="checkbox"
                        checked={performance}
                        onChange={(e) => setPerformance(e.target.checked)}
                        className="h-4 w-4 rounded border-border accent-primary cursor-pointer"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {t("calc_field_perf")}
                      </span>
                    </label>
                  </div>

                  {/* Integrations */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {t("calc_field_integrations", { count: integrations })}
                      </label>
                      <span className="text-xs font-bold rounded-md bg-primary/10 text-primary px-2 py-0.5">
                        {integrations}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={6}
                      value={integrations}
                      onChange={(e) => setIntegrations(parseInt(e.target.value, 10))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      {t("calc_help_integrations")}
                    </p>
                  </div>

                  {/* SEO Package */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("calc_field_seo")}
                    </label>
                    <select
                      value={seoPkg}
                      onChange={(e) =>
                        setSeoPkg(e.target.value as "base" | "extended" | "max")
                      }
                      className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground shadow-xs outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="base">{t("calc_seo_base")}</option>
                      <option value="extended">{t("calc_seo_extended")}</option>
                      <option value="max">{t("calc_seo_max")}</option>
                    </select>
                    <p className="text-xs text-muted-foreground">
                      {t("calc_help_seo")}
                    </p>
                  </div>

                  {/* Support */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {t("calc_field_support", { count: support })}
                      </label>
                      <span className="text-xs font-bold rounded-md bg-primary/10 text-primary px-2 py-0.5">
                        {support} h
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={20}
                      step={10}
                      value={support}
                      onChange={(e) =>
                        setSupport(parseInt(e.target.value, 10) as 0 | 10 | 20)
                      }
                      className="w-full accent-primary cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      {t("calc_help_support")}
                    </p>
                  </div>

                  {/* Urgency */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("calc_field_urgency")}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["normal", "fast", "rush"] as const).map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setUrgency(u)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer select-none ${
                            urgency === u
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-secondary/60 hover:bg-secondary text-foreground border-border/80"
                          }`}
                        >
                          {t(`calc_urg_${u}`)}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t("calc_help_urgency")}
                    </p>
                  </div>
                </div>

                {/* Helpful Tips */}
                <div className="rounded-2xl bg-secondary/40 border border-border/60 p-5 text-xs text-muted-foreground space-y-2">
                  <div className="font-bold text-foreground">
                    {t("calc_tips_title")}
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-2 list-disc list-inside">
                    <li>{t("calc_tip_scope")}</li>
                    <li>{t("calc_tip_integrations")}</li>
                    <li>{t("calc_tip_languages")}</li>
                    <li>{t("calc_tip_timeline")}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Price Estimate Card */}
            <section id="price" className="scroll-mt-24">
              <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-card to-card p-6 sm:p-8 shadow-lg space-y-6">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  {t("calc_price_title")}
                </h2>

                <div className="grid sm:grid-cols-3 gap-4 items-stretch">
                  <div className="rounded-2xl border border-border/80 bg-card/60 p-5 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("calc_price_min")}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground mt-2">
                      {format(estimate.min)} {currency}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/15 p-5 text-center shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {t("calc_price_est")}
                    </p>
                    <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
                      {format(estimate.subtotal)} {currency}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/80 bg-card/60 p-5 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("calc_price_max")}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground mt-2">
                      {format(estimate.max)} {currency}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("calc_price_note")}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a href={toLangHref("/contacts", lang)}>
                    <Button variant="emerald" size="lg" className="gap-2">
                      <span>{t("calc_btn_contact")}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href={toLangHref("/contacts", lang)}>
                    <Button variant="outline" size="lg" className="gap-2">
                      <PhoneCall className="h-4 w-4" />
                      <span>{t("calc_btn_callback")}</span>
                    </Button>
                  </a>
                </div>
              </div>
            </section>

            {/* FAQ Accordions */}
            <section id="faq" className="scroll-mt-24">
              <div className="rounded-3xl border border-border/80 bg-card/80 backdrop-blur-md p-6 sm:p-8 shadow-sm space-y-6">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  {t("calc_faq_title")}
                </h2>

                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <details
                      key={i}
                      className="group rounded-2xl border border-border/80 bg-card/60 p-4 transition-colors"
                    >
                      <summary className="cursor-pointer font-semibold text-sm text-foreground flex items-center justify-between select-none">
                        <span>{t(`calc_faq_q${i}`)}</span>
                        <span className="ml-3 text-muted-foreground group-open:rotate-180 transition-transform duration-200">
                          ▾
                        </span>
                      </summary>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/50">
                        {t(`calc_faq_a${i}`)}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* Bottom CTA Banner */}
            <section className="scroll-mt-24">
              <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-600 to-teal-600 p-8 sm:p-10 shadow-xl text-white">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {t("calc_cta_title")}
                </h2>
                <p className="text-emerald-50 mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
                  {t("calc_cta_sub")}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={toLangHref("/contacts", lang)}>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="text-emerald-700 bg-white hover:bg-emerald-50 font-semibold"
                    >
                      {t("calc_cta_btn_contact")}
                    </Button>
                  </a>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>
    </PageTransition>
  );
}