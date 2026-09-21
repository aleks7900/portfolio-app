import {useEffect} from "react";
import {Meta, Title} from "react-head";
import {ADV} from "../data/data.ts";
import Hero from "./components/Hero.tsx";
import Section from "./components/Section.tsx";
import HeroDownServices from "./components/HeroDown.tsx";
import AdvantageCard from "./components/AdvantageCard.tsx";
import SlideshowServices from "../shared/SlideshowServices.tsx";
import Container from "../shared/Container.tsx";
import HeroTypes from "./components/HeroTypes.tsx";
import PageTransition from "../components/motion/PageTransition.tsx";

export default function ServicePage() {

    const saved = (localStorage.getItem("lang") || "").toLowerCase();
    const lang = saved.startsWith("ro") ? "ro" : "ru";

    // Установим <html lang="..."> в CSR
    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    // Базовые настройки сайта (обнови при необходимости)
    const baseUrl = "https://alex-lab.md";
    const servicesPath = "/services";

    // RU/RO мета
    const seo = {
        ru: {
            title: "Услуги Alex-Lab — Изделия из нержавеющей стали на заказ",
            description:
                "Alex-Lab — услуги по изготовлению и монтажу изделий из нержавейки: перила, мойки, столы, каркасы, индивидуальные проекты. Качество и долговечность.",
            keywords:
                "услуги из нержавейки, производство на заказ, Alex-Lab, изготовление перил, изготовление моек, изготовление стоек, сварка нержавейки, металлические конструкции, нестандартные заказы",
        },
        ro: {
            title: "Servicii Alex-Lab — Produse din inox la comandă",
            description:
                "Alex-Lab oferă servicii de producere și montaj a produselor din inox: balustrade, chiuvete, mese, cadre și proiecte personalizate. Calitate și durabilitate.",
            keywords:
                "servicii inox, producție la comandă, Alex-Lab, fabricare balustrade, fabricare chiuvete, fabricare suporturi, sudură inox, construcții metalice, comenzi personalizate",
        },
    } as const;

    const meta = seo[lang as "ru" | "ro"];

    // JSON-LD: Service
    const jsonldService = {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType:
            lang === "ru"
                ? "Изготовление изделий из нержавеющей стали"
                : "Producerea produselor din inox",
        provider: {
            "@type": "Organization",
            name: "Alex-Lab",
            url: baseUrl,
            logo: `${baseUrl}/logo.png`,
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+37379449334", // обнови на реальный
                contactType: lang === "ru" ? "customer service" : "serviciu clienți",
                areaServed: "MD",
                email: "alex.lab.webdev@gmail.com", // опционально
            },
        },
        description:
            lang === "ru"
                ? "Alex-Lab предлагает услуги по производству изделий из нержавейки: перила, мойки, столы, каркасы и нестандартные заказы."
                : "Alex-Lab oferă servicii de producere și montaj pentru produse din inox: balustrade, chiuvete, mese, cadre și comenzi personalizate.",
        areaServed: {"@type": "Country", name: "Moldova"},
    };

    // JSON-LD: BreadcrumbList (Главная → Услуги / Acasă → Servicii)
    const jsonldBreadcrumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: lang === "ru" ? "Главная" : "Acasă",
                item: `${baseUrl}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: lang === "ru" ? "Услуги" : "Servicii",
                item: `${baseUrl}${servicesPath}`,
            },
        ],
    };

    // JSON-LD: WebSite с SearchAction
    const jsonldWebsite = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: baseUrl,
        name: "Alex-Lab",
        potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };

    // JSON-LD: Organization с sameAs/email/телефоном
    const jsonldOrganization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Alex-Lab",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        email: "alex.lab.webdev@gmail.com", // обнови при необходимости
        telephone: "+37379449334", // обнови при необходимости
        address: {
            "@type": "PostalAddress",
            addressCountry: "MD",
            addressLocality: "Chișinău",
            streetAddress: "ул. Примерная, 10", // обнови при необходимости
        },
        sameAs: [
            "https://www.facebook.com/alexlab",
            "https://www.instagram.com/alexlab",
            "https://www.linkedin.com/company/alexlab",
        ],
    };

    return (
        <PageTransition>
            {/* SEO Head (react-head) */}
            <Title>{meta.title}</Title>
            <Meta name="description" content={meta.description}/>
            <Meta name="keywords" content={meta.keywords}/>
            <Meta name="robots" content="index, follow"/>
            <Meta name="language" content={lang}/>
            <script type="application/ld+json">{JSON.stringify(jsonldService)}</script>
            <script type="application/ld+json">{JSON.stringify(jsonldBreadcrumbs)}</script>
            <script type="application/ld+json">{JSON.stringify(jsonldWebsite)}</script>
            <script type="application/ld+json">{JSON.stringify(jsonldOrganization)}</script>

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
