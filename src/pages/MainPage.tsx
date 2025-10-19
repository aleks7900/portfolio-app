import Slideshow from "../shared/Slideshow.tsx";
import {ADV} from "../data/data.ts";
import Hero from "./components/Hero.tsx";
import Section from "./components/Section.tsx";
import AdvantageCard from "./components/AdvantageCard.tsx";
import {useI18n} from "../shared/i18n/i18n.tsx";
import {useEffect} from "react";
import Container from "../shared/Container.tsx";
import HeroTypes from "./components/HeroTypes.tsx";
import TechGrid from "./TechGrid.tsx";

export default function MainPage() {

    const {t, lang} = useI18n();

    // --- мета-теги без Helmet ---
    useEffect(() => {
        const title = "Alex-Lab — Web development | Разработка и услуги";
        const description =
            "Alex-Lab: Web development SPA PWA React Spring Boot Typescript. Индивидуальные проекты";

        document.title = title;

        // meta description
        let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
        if (!metaDesc) {
            metaDesc = document.createElement("meta");
            metaDesc.setAttribute("name", "description");
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute("content", description);
    }, []);

    // --- JSON-LD объекты ---
    const jsonLdService = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Web development SPA PWA React",
        serviceType: "Web development",
        provider: {
            "@type": "LocalBusiness",
            name: "Alex-Lab",
            image: "https://alex-lab.md/images/og-main.jpg",
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
            name: "Каталог услуг и стандартных решений",
            itemListElement: [
                {
                    "@type": "OfferCatalog",
                    name: "Стандартные изделия",
                    itemListElement: [
                        {"@type": "Offer", itemOffered: {"@type": "Product", name: "Sites"}},
                    ]
                },
                {
                    "@type": "OfferCatalog",
                    name: "Изделия на заказ",
                    itemListElement: [
                        {"@type": "Offer", itemOffered: {"@type": "Service", name: "Sites"}}
                    ]
                }
            ]
        },
        termsOfService: "https://alex-lab.md/terms",
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
                availableLanguage: ["ru", "ro"]
            }
        ],
        sameAs: ["https://facebook.com/alexlab", "https://instagram.com/alexlab"]
    };

    const jsonLdWebsite = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Alex-Lab",
        url: "https://alex-lab.md",
        potentialAction: {
            "@type": "SearchAction",
            target: "https://alexe-lab.md/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const jsonLdWebPage = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Услуги Alex-Lab — Разработка WEB-приложений",
        url: "https://alex-lab.md/",
        isPartOf: {"@type": "WebSite", url: "https://alex-lab.md"},
        about: [
            {"@type": "Thing", name: "изготовление на заказ"},
        ],
        primaryImageOfPage: {
            "@type": "ImageObject",
            url: "https://alex-lab.md/images/og-main.jpg"
        },
        speakable: {
            "@type": "SpeakableSpecification",
            xpath: ["/html/head/title", "/html/body//h1", "/html/body//h2"]
        }
    };

    const jsonLdBreadcrumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {"@type": "ListItem", position: 1, name: "Главная", item: "https://alex-lab.md/"},
            {"@type": "ListItem", position: 2, name: "Услуги", item: "https://alex-lab.md/#services"}
        ]
    };

    return (
        <>
            {/* JSON-LD скрипты без Helmet */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLdService)}}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLdOrganization)}}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLdWebsite)}}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLdWebPage)}}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLdBreadcrumbs)}}
            />

            <div className="mt-4"></div>
            {/* 🎞️ Твой слайдер (Keen-slider) */}
            <Slideshow/>
            <Hero/>

            <TechGrid />

            {/* 🔽 SEO-текстовый блок */}
            <Section>
                <h2 className="text-2xl font-bold mb-4">{t("seo_main_title")}</h2>
                <p className="mb-4">{t("seo_main_intro")}</p>

                <h3 className="text-xl font-semibold mt-6 mb-2">{t("seo_standard_title")}</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>{t("seo_standard_item1")}</li>
                    <li>{t("seo_standard_item2")}</li>
                    <li>{t("seo_standard_item3")}</li>
                    <li>{t("seo_standard_item4")}</li>
                    <li>{t("seo_standard_item5")}</li>
                </ul>
                <p className="mb-4">{t("seo_standard_note")}</p>

                <h3 className="text-xl font-semibold mt-6 mb-2">{t("seo_custom_title")}</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>{t("seo_custom_item1")}</li>
                    <li>{t("seo_custom_item2")}</li>
                    <li>{t("seo_custom_item3")}</li>
                    <li>{t("seo_custom_item4")}</li>
                </ul>
                <p className="mb-4">{t("seo_custom_note")}</p>

                <h3 className="text-xl font-semibold mt-6 mb-2">{t("seo_advantages_title")}</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                    <li>{t("seo_advantages_item1")}</li>
                    <li>{t("seo_advantages_item2")}</li>
                    <li>{t("seo_advantages_item3")}</li>
                    <li>{t("seo_advantages_item4")}</li>
                </ul>

                <p>{t("seo_closing")}</p>
            </Section>

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
                    <p className="text-3xl w-full font-semibold text-right">+373 79 449334</p>
                </div>
            </Container>
        </>
    );
}