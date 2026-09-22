import Slideshow from "../shared/Slideshow.tsx";
import {ADV} from "../data/data.ts";
import LandingHero3D from "./components/LandingHero3D/LandingHero3D.tsx";
import Hero from "./components/Hero.tsx";
import Section from "./components/Section.tsx";
import AdvantageCard from "./components/AdvantageCard.tsx";
import {useI18n} from "../shared/i18n/i18n.tsx";
import Container from "../shared/Container.tsx";
import HeroTypes from "./components/HeroTypes.tsx";
import TechGrid from "./TechGrid.tsx";
import PageTransition from "../components/motion/PageTransition.tsx";
import { SpatialSection } from "../shared/spatial/SpatialSection.tsx";

import SEO from "../shared/SEO.tsx";

export default function MainPage() {
    const {t} = useI18n();

    // --- JSON-LD объекты ---
    const jsonLdService = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Web development SPA PWA React Spring Boot",
        serviceType: "Software & Web Development",
        provider: {
            "@type": "LocalBusiness",
            name: "Alex-Lab",
            image: "https://alex-lab.md/logo.png",
            address: {
                "@type": "PostalAddress",
                addressCountry: "MD",
                addressLocality: "Chișinău",
                streetAddress: "Str. Padurii 21/1"
            },
            telephone: "+373 79 449 334",
            email: "alex.lab.webdev@gmail.com",
            areaServed: [
                {"@type": "Country", name: "Moldova"},
                {"@type": "Country", name: "Romania"}
            ],
            openingHoursSpecification: [
                {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    opens: "09:00",
                    closes: "18:00"
                }
            ],
            url: "https://alex-lab.md",
            sameAs: ["https://facebook.com/alex-lab", "https://instagram.com/alex-lab"]
        },
        areaServed: ["Moldova", "Romania"],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Web Development Services",
            itemListElement: [
                {
                    "@type": "OfferCatalog",
                    name: "SPA & PWA Solutions",
                    itemListElement: [
                        {"@type": "Offer", itemOffered: {"@type": "Service", name: "Single Page Applications (SPA)"}},
                        {"@type": "Offer", itemOffered: {"@type": "Service", name: "Progressive Web Apps (PWA)"}}
                    ]
                },
                {
                    "@type": "OfferCatalog",
                    name: "Custom Software Engineering",
                    itemListElement: [
                        {"@type": "Offer", itemOffered: {"@type": "Service", name: "Full-Stack Development (React & Spring Boot)"}}
                    ]
                }
            ]
        },
        url: "https://alex-lab.md"
    };

    const jsonLdOrganization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Alex-Lab",
        url: "https://alex-lab.md",
        logo: "https://alex-lab.md/logo.png",
        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: "+373 79 449 334",
                contactType: "customer service",
                areaServed: "MD",
                availableLanguage: ["ru", "ro", "en"]
            }
        ],
        sameAs: ["https://facebook.com/alexlab", "https://instagram.com/alexlab"]
    };

    const jsonLdWebsite = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Alex-Lab",
        url: "https://alex-lab.md"
    };

    const jsonLdWebPage = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Alex-Lab — Web Development & Solutions",
        url: "https://alex-lab.md/",
        isPartOf: {"@type": "WebSite", url: "https://alex-lab.md"},
        about: [
            {"@type": "Thing", name: "Web Application Development"},
            {"@type": "Thing", name: "React and TypeScript"},
            {"@type": "Thing", name: "Spring Boot"}
        ],
        primaryImageOfPage: {
            "@type": "ImageObject",
            url: "https://alex-lab.md/logo.png"
        }
    };

    const jsonLdBreadcrumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {"@type": "ListItem", position: 1, name: "Home", item: "https://alex-lab.md/"}
        ]
    };

    return (
        <PageTransition>
            <SEO
                structuredData={[
                    jsonLdService,
                    jsonLdOrganization,
                    jsonLdWebsite,
                    jsonLdWebPage,
                    jsonLdBreadcrumbs
                ]}
            />

            {/* ── 1. WebGL 3D Interactive Hero Experience ── */}
            <LandingHero3D />

            {/* ── 2. Showcase Portfolio Slider (3D Spatial Emergence) ── */}
            <SpatialSection id="landing-showcase" className="pt-4 sm:pt-8">
                <Slideshow />
            </SpatialSection>

            {/* ── 3. High-Level Services Overview ── */}
            <SpatialSection>
                <Hero />
            </SpatialSection>

            {/* ── 4. Deep 3D Converging Technology Stack Grid ── */}
            <SpatialSection>
                <TechGrid />
            </SpatialSection>

            {/* ── 5. Standard & Custom Solutions / SEO Deep Architecture ── */}
            <SpatialSection>
                <Section>
                    <div className="rounded-3xl border border-border/80 bg-card/60 backdrop-blur-md p-8 sm:p-12 shadow-sm space-y-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
                                {t("seo_main_title")}
                            </h2>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                {t("seo_main_intro")}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-border/60">
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-foreground">
                                    {t("seo_standard_title")}
                                </h3>
                                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                                    <li>{t("seo_standard_item1")}</li>
                                    <li>{t("seo_standard_item2")}</li>
                                    <li>{t("seo_standard_item3")}</li>
                                    <li>{t("seo_standard_item4")}</li>
                                    <li>{t("seo_standard_item5")}</li>
                                </ul>
                                <p className="text-xs text-muted-foreground italic pt-1">
                                    {t("seo_standard_note")}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-foreground">
                                    {t("seo_custom_title")}
                                </h3>
                                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                                    <li>{t("seo_custom_item1")}</li>
                                    <li>{t("seo_custom_item2")}</li>
                                    <li>{t("seo_custom_item3")}</li>
                                    <li>{t("seo_custom_item4")}</li>
                                </ul>
                                <p className="text-xs text-muted-foreground italic pt-1">
                                    {t("seo_custom_note")}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border/60">
                            <h3 className="text-lg font-bold text-foreground mb-3">
                                {t("seo_advantages_title")}
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                                    <span>{t("seo_advantages_item1")}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                                    <span>{t("seo_advantages_item2")}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                                    <span>{t("seo_advantages_item3")}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                                    <span>{t("seo_advantages_item4")}</span>
                                </div>
                            </div>
                            <p className="text-sm text-foreground/80 mt-6 font-medium">
                                {t("seo_closing")}
                            </p>
                        </div>
                    </div>
                </Section>
            </SpatialSection>

            {/* ── 6. Tailored Engineering Section ── */}
            <SpatialSection>
                <HeroTypes />
            </SpatialSection>

            {/* ── 7. Detailed Service Advantage Cards ── */}
            <SpatialSection>
                <Section titleKey="service_title" leadKey="service_lead">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <AdvantageCard titleKey="adv_quality_title" descKey="adv_quality_desc" s={ADV[0]}/>
                        <AdvantageCard titleKey="adv_custom_title" descKey="adv_custom_desc" s={ADV[1]}/>
                        <AdvantageCard titleKey="adv_consult_title" descKey="adv_consult_desc" s={ADV[2]}/>
                    </div>
                </Section>
            </SpatialSection>

            {/* ── 8. Direct Call to Action Banner ── */}
            <SpatialSection>
                <Container>
                    <div className="mt-8 mb-16 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-primary/5 p-8 sm:p-10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                                {t("contacts_ytitle") || "Прямая связь"}
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                                {t("cta_contact") || "Обсудить проект"}
                            </h3>
                        </div>
                        <a
                            href="tel:+37379449334"
                            className="inline-flex items-center gap-3 rounded-2xl bg-primary text-primary-foreground px-8 py-4 text-xl sm:text-2xl font-bold tracking-tight shadow-md hover:brightness-110 active:scale-95 transition-all"
                        >
                            <span>+373 79 449334</span>
                        </a>
                    </div>
                </Container>
            </SpatialSection>
        </PageTransition>
    );
}