import { TransHTML, useI18n } from "../shared/i18n/i18n.tsx";
import Section from "./components/Section.tsx";
import React from "react";
import PageTransition from "../components/motion/PageTransition.tsx";
import { CheckCircle, ShieldCheck, Zap, Award } from "lucide-react";

export default function WebAppAboutPage() {
  const { t } = useI18n();

  const origin = typeof window !== "undefined" ? window.location.origin : "https://example.com";
  const pageUrl = `${origin}/about-webapps`;
  const siteName = t("seo_site_name") ?? "Alex-Lab";
  const orgName = t("seo_org_name") ?? "Alex-Lab Web Development";
  const phone = t("seo_phone") ?? "+373 79 449334";
  const sameAs = [t("seo_facebook") || "", t("seo_instagram") || ""].filter(Boolean);

  const jsonld = React.useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: origin,
        name: siteName,
        potentialAction: {
          "@type": "SearchAction",
          target: `${origin}/search?q={query}`,
          "query-input": "required name=query",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        url: origin,
        name: orgName,
        telephone: phone,
        sameAs: sameAs,
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: pageUrl,
        name: t("webapp_about_seo_title") || "Despre dezvoltarea aplicațiilor web",
        description:
          t("webapp_about_seo_description") ||
          "Echipă de dezvoltare web full-stack: React, Spring Boot, PWA, SPA.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: t("seo_breadcrumb_home_t") || "Главная",
              item: origin,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: t("seo_breadcrumb_about_webapps") || "О компании (Web Development)",
              item: pageUrl,
            },
          ],
        },
        about: {
          "@type": "Organization",
          name: orgName,
        },
      },
    ],
    [origin, pageUrl, siteName, orgName, phone, sameAs, t]
  );

  return (
    <PageTransition>
      <Section titleKey="webapp_about_title" leadKey="webapp_about_lead">
        <div className="space-y-10 max-w-5xl">
          {/* Intro Card */}
          <div className="rounded-3xl border border-border/80 bg-card/70 backdrop-blur-md p-8 sm:p-10 shadow-sm leading-relaxed text-muted-foreground space-y-4 text-base sm:text-lg">
            <p className="text-foreground font-medium">
              <TransHTML k="webapp_about_intro1" />
            </p>
            <p>
              <TransHTML k="webapp_about_intro2" />
            </p>
          </div>

          {/* Strengths & Services Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Strengths */}
            <div className="rounded-3xl border border-border/80 bg-card/70 backdrop-blur-md p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-border/60">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  {t("webapp_about_strengths_title")}
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <TransHTML k={`webapp_about_strengths_${i}`} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="rounded-3xl border border-border/80 bg-card/70 backdrop-blur-md p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-border/60">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  {t("webapp_about_services_title")}
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <TransHTML k={`webapp_about_services_${i}`} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Approach & Clients */}
          <div className="rounded-3xl border border-border/80 bg-card/70 backdrop-blur-md p-8 sm:p-10 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border/60">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                {t("webapp_about_approach_title")}
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground leading-relaxed">
              <p>
                <TransHTML k="webapp_about_approach1" />
              </p>
              <p>
                <TransHTML k="webapp_about_approach2" />
              </p>
            </div>

            <div className="pt-6 border-t border-border/60">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                {t("webapp_about_clients_title")}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <TransHTML k="webapp_about_clients" />
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-primary/5 p-8 sm:p-10 shadow-sm space-y-6">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              {t("webapp_about_why_title")}
            </h3>
            <ul className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <TransHTML k={`webapp_about_why_${i}`} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
        />
      </Section>
    </PageTransition>
  );
}
