import {ADV} from "../data/data.ts";
import Hero from "./components/Hero.tsx";
import Section from "./components/Section.tsx";
import HeroDownServices from "./components/HeroDown.tsx";
import AdvantageCard from "./components/AdvantageCard.tsx";
import SlideshowServices from "../shared/SlideshowServices.tsx";
import Container from "../shared/Container.tsx";
import HeroTypes from "./components/HeroTypes.tsx";
import PageTransition from "../components/motion/PageTransition.tsx";
import SEO from "../shared/SEO.tsx";
import {useI18n} from "../shared/i18n/i18n.tsx";

export default function ServicePage() {
    const {t, lang} = useI18n();
    const baseUrl = "https://alex-lab.md";

    const jsonldService = {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType:
            lang === "ro"
                ? "Dezvoltare aplicații web și soluții digitale"
                : lang === "en"
                ? "Web Application Development & Digital Solutions"
                : "Разработка веб-приложений и цифровых решений",
        provider: {
            "@type": "Organization",
            name: "Alex-Lab",
            url: baseUrl,
            logo: `${baseUrl}/logo.png`,
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+373 79 449 334",
                contactType: "customer service",
                areaServed: "MD",
                availableLanguage: ["ru", "ro", "en"],
            },
        },
        description:
            lang === "ro"
                ? "Alex-Lab oferă servicii de dezvoltare web full-stack: SPA, PWA, React, TypeScript, Spring Boot și comenzi personalizate."
                : lang === "en"
                ? "Alex-Lab offers full-stack web application development: SPA, PWA, React, TypeScript, Spring Boot, and custom enterprise software."
                : "Alex-Lab предлагает услуги full-stack веб-разработки: SPA, PWA, React, TypeScript, Spring Boot и индивидуальные проекты.",
        areaServed: [
            {"@type": "Country", name: "Moldova"},
            {"@type": "Country", name: "Romania"}
        ],
    };

    const jsonldBreadcrumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: lang === "ro" ? "Acasă" : lang === "en" ? "Home" : "Главная",
                item: `${baseUrl}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: lang === "ro" ? "Servicii" : lang === "en" ? "Services" : "Услуги",
                item: `${baseUrl}/service`,
            },
        ],
    };

    const jsonldWebsite = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: baseUrl,
        name: "Alex-Lab",
    };

    const jsonldOrganization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Alex-Lab",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        email: "alex.lab.webdev@gmail.com",
        telephone: "+373 79 449 334",
        address: {
            "@type": "PostalAddress",
            addressCountry: "MD",
            addressLocality: "Chișinău",
            streetAddress: "Str. Padurii 21/1",
        },
        sameAs: [
            "https://facebook.com/alex-lab",
            "https://instagram.com/alex-lab",
        ],
    };

    return (
        <PageTransition>
            <SEO
                titleKey="service_title_2"
                descriptionKey="service_lead"
                pathname="/service"
                structuredData={[jsonldService, jsonldBreadcrumbs, jsonldWebsite, jsonldOrganization]}
            />

            {/* Semantic top heading */}
            <h1 className="sr-only">
                {t("service_title_2", { defaultValue: "Разработка современных веб-приложений и цифровых решений" })}
            </h1>

            {/* Контент страницы */}
            <div className="pt-4">
                <SlideshowServices/>
            </div>
            <Hero/>
            <HeroDownServices/>
            <HeroTypes/>
            <Section titleKey="service_title" leadKey="service_lead">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <AdvantageCard titleKey="adv_quality_title" descKey="adv_quality_desc" s={ADV[0]}/>
                    <AdvantageCard titleKey="adv_custom_title" descKey="adv_custom_desc" s={ADV[1]}/>
                    <AdvantageCard titleKey="adv_consult_title" descKey="adv_consult_desc" s={ADV[2]}/>
                </div>
            </Section>

            {/* Direct Call Banner */}
            <Container>
                <div className="mt-8 mb-16 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-primary/5 p-8 sm:p-10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                            {lang === "ro" ? "Contact direct" : "Прямая связь"}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                            {lang === "ro" ? "Discută proiectul" : "Обсудить проект"}
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
        </PageTransition>
    );
}
