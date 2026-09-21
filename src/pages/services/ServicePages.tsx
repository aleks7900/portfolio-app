import { Suspense, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Container from "../../shared/Container.tsx";
import { SERVICES } from "../../data/data.ts";
import { SERVICE_PAGE_MAP } from "./ServiceRegistry.ts";
import { dict, toLangHref, useI18n } from "../../shared/i18n/i18n.tsx";
import PageTransition from "../../components/motion/PageTransition.tsx";
import { Button } from "../../components/ui/button.tsx";
import SEO, { CANONICAL_ORIGIN } from "../../shared/SEO.tsx";

// Fallback block when no custom component is registered for a slug
function GenericServiceBlock({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
      {lead && <p className="mt-2 text-muted-foreground">{lead}</p>}
      <p className="mt-4 text-sm text-muted-foreground/80">
        Для этой услуги ещё нет отдельной страницы. Свяжитесь с нами — подскажем по срокам и цене.
      </p>
    </div>
  );
}

export default function ServicePages() {
  const { slug } = useParams();
  const { t, lang } = useI18n();
  const svc = useMemo(() => SERVICES.find((s) => s.slug === slug), [slug]);

  if (!svc) return <Navigate to={toLangHref("/service", lang)} replace />;

  const serviceTitle = (svc.titleKey && dict[lang]?.[svc.titleKey]) ? t(svc.titleKey) : svc.title;
  const serviceDesc = (svc.descKey && dict[lang]?.[svc.descKey])
    ? t(svc.descKey)
    : (svc.lead || "Профессиональная разработка и создание веб-решений от студии Alex-Lab.");
  const pagePath = `/services/${slug}`;

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "ro" ? "Acasă" : lang === "en" ? "Home" : "Главная",
        item: `${CANONICAL_ORIGIN}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: lang === "ro" ? "Servicii" : lang === "en" ? "Services" : "Услуги",
        item: `${CANONICAL_ORIGIN}/service`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: serviceTitle,
        item: `${CANONICAL_ORIGIN}${pagePath}`,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceTitle,
    description: serviceDesc,
    provider: {
      "@type": "Organization",
      name: "Alex-Lab",
      url: CANONICAL_ORIGIN,
      logo: `${CANONICAL_ORIGIN}/logo.png`,
    },
    areaServed: ["MD", "RO", "EU"],
    url: `${CANONICAL_ORIGIN}${pagePath}`,
  };

  // Select component by slug; if not mapped, render generic block
  const LazyPage = slug ? SERVICE_PAGE_MAP[slug] : undefined;

  return (
    <PageTransition>
      <SEO
        title={`${serviceTitle} | Alex-Lab`}
        description={serviceDesc}
        pathname={pagePath}
        structuredData={[serviceJsonLd, breadcrumbsJsonLd]}
      />

      <section className="scroll-mt-24 py-8 sm:py-12">
        <Container>
          {/* Breadcrumb navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 mt-4 text-sm text-muted-foreground flex items-center gap-2"
          >
            <Link
              to={toLangHref("/", lang)}
              className="hover:text-foreground transition-colors"
            >
              Главная
            </Link>
            <span>/</span>
            <Link
              to={toLangHref("/service", lang)}
              className="hover:text-foreground transition-colors"
            >
              {lang === "ro" ? "Servicii" : lang === "en" ? "Services" : "Услуги"}
            </Link>
            <span>/</span>
            <span className="font-medium text-foreground">{svc.title}</span>
          </nav>

          {/* Service Content */}
          <div className="mt-6">
            {LazyPage ? (
              <Suspense
                fallback={
                  <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                    <div className="h-6 w-48 bg-muted rounded-md animate-pulse mb-4" />
                    <div className="h-4 w-full bg-muted rounded-md animate-pulse mb-2.5" />
                    <div className="h-4 w-5/6 bg-muted rounded-md animate-pulse" />
                  </div>
                }
              >
                <LazyPage />
              </Suspense>
            ) : (
              <GenericServiceBlock title={svc.title} lead={svc.lead} />
            )}
          </div>

          {/* CTA Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild variant="glow" size="lg">
              <Link to={toLangHref("/contacts", lang)}>
                {lang === "ro" ? "Contactează-ne" : lang === "en" ? "Contact Us" : "Связаться"}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to={toLangHref("/service", lang)}>
                {lang === "ro" ? "Toate serviciile" : lang === "en" ? "All Services" : "Все услуги"}
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
