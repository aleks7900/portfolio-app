// ServicePage.tsx (React 19 + react-head)
import {useEffect} from "react";
import {Meta, Title} from "react-head";
import {ADV} from "../data/data.ts";
import Hero from "./components/Hero.tsx";
import Section from "./components/Section.tsx";
import HeroDownServices from "./components/HeroDown.tsx";
import AdvantageCard from "./components/AdvantageCard.tsx";
import SlideshowServices from "../shared/SlideshowServices.tsx";
import Container from "../shared/Container.tsx";
import {useI18n} from "../shared/i18n/i18n.tsx";
import HeroTypes from "./components/HeroTypes.tsx";

export default function ServicePage() {

    const {t} = useI18n();

    const saved = (localStorage.getItem("lang") || "").toLowerCase();
    const lang = saved.startsWith("ro") ? "ro" : "ru";

    // Установим <html lang="..."> в CSR
    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    // Базовые настройки сайта (обнови при необходимости)
    const baseUrl = "https://rvsteel.md";
    const servicesPath = "/services";

    // RU/RO мета
    const seo = {
        ru: {
            title: "Услуги RVSteel — Изделия из нержавеющей стали на заказ",
            description:
                "RVSteel — услуги по изготовлению и монтажу изделий из нержавейки: перила, мойки, столы, каркасы, индивидуальные проекты. Качество и долговечность.",
            keywords:
                "услуги из нержавейки, производство на заказ, RVSteel, изготовление перил, изготовление моек, изготовление стоек, сварка нержавейки, металлические конструкции, нестандартные заказы",
        },
        ro: {
            title: "Servicii RVSteel — Produse din inox la comandă",
            description:
                "RVSteel oferă servicii de producere și montaj a produselor din inox: balustrade, chiuvete, mese, cadre și proiecte personalizate. Calitate și durabilitate.",
            keywords:
                "servicii inox, producție la comandă, RVSteel, fabricare balustrade, fabricare chiuvete, fabricare suporturi, sudură inox, construcții metalice, comenzi personalizate",
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
            name: "RVSteel",
            url: baseUrl,
            logo: `${baseUrl}/logo.png`,
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+373-xxx-xxx", // обнови на реальный
                contactType: lang === "ru" ? "customer service" : "serviciu clienți",
                areaServed: "MD",
                email: "info@rvsteel.md", // опционально
            },
        },
        description:
            lang === "ru"
                ? "RVSteel предлагает услуги по производству изделий из нержавейки: перила, мойки, столы, каркасы и нестандартные заказы."
                : "RVSteel oferă servicii de producere și montaj pentru produse din inox: balustrade, chiuvete, mese, cadre și comenzi personalizate.",
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
        name: "RVSteel",
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
        name: "RVSteel",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        email: "info@rvsteel.md", // обнови при необходимости
        telephone: "+373-xxx-xxx", // обнови при необходимости
        address: {
            "@type": "PostalAddress",
            addressCountry: "MD",
            addressLocality: "Chișinău",
            streetAddress: "ул. Примерная, 10", // обнови при необходимости
        },
        sameAs: [
            "https://www.facebook.com/rvsteel",
            "https://www.instagram.com/rvsteel",
            "https://www.linkedin.com/company/rvsteel",
        ],
    };

    return (
        <>
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

            {/* Контент страницы (сохранён как в исходнике) */}
            <SlideshowServices/>
            <Hero/>
            <HeroDownServices/>
            <HeroTypes/>
            <Section titleKey="service_title" leadKey="service_lead">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <AdvantageCard titleKey="adv_quality_title" descKey="adv_quality_desc" s={ADV[0]}/>
                    <AdvantageCard titleKey="adv_custom_title" descKey="adv_custom_desc" s={ADV[1]}/>
                    <AdvantageCard titleKey="adv_consult_title" descKey="adv_consult_desc" s={ADV[2]}/>
                </div>
            </Section>

            <Container>
                <div className="mt-8 mb-12 w-full flex items-end gap-3 dark:text-white text-right">
                    <p className="text-3xl w-full font-semibold text-right">{t("street_address")}, +373 60 174654</p>
                </div>
            </Container>
        </>
    );
}
