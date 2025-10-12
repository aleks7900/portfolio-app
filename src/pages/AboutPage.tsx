import {TransHTML, useI18n} from "../shared/i18n/i18n.tsx";
import Section from "./components/Section.tsx";
import React from "react";

export default function WebAppAboutPage() {
    const {t} = useI18n();

    const origin = typeof window !== "undefined" ? window.location.origin : "https://example.com";
    const pageUrl = `${origin}/about-webapps`;
    const siteName = t("seo_site_name") ?? "RVWeb";
    const orgName = t("seo_org_name") ?? "RVWeb Development";
    const phone = t("seo_phone") ?? "+373 79 449334";
    const sameAs = [
        t("seo_facebook") || "",
        t("seo_instagram") || ""
    ].filter(Boolean);

    const jsonld = React.useMemo(() => ([
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": origin,
            "name": siteName,
            "potentialAction": {
                "@type": "SearchAction",
                "target": `${origin}/search?q={query}`,
                "query-input": "required name=query"
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": origin,
            "name": orgName,
            "telephone": phone,
            "sameAs": sameAs
        },
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "url": pageUrl,
            "name": t("webapp_about_seo_title") || "Despre dezvoltarea aplicațiilor web",
            "description": t("webapp_about_seo_description") || "Echipă de dezvoltare web full-stack: React, Spring Boot, PWA, SPA.",
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": t("seo_breadcrumb_home_t") || "Главная",
                        "item": origin
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": t("seo_breadcrumb_about_webapps") || "О компании (Web Development)",
                        "item": pageUrl
                    }
                ]
            },
            "about": {
                "@type": "Organization",
                "name": orgName
            }
        }
    ]), [origin, pageUrl, siteName, orgName, phone, sameAs, t]);

    return (
        <Section titleKey="webapp_about_title" leadKey="webapp_about_lead">
            <div className="prose max-w-none dark:prose-invert space-y-6 prose-p:leading-relaxed">
                <p><TransHTML k="webapp_about_intro1"/></p>
                <p><TransHTML k="webapp_about_intro2"/></p>

                <h3 className="mt-8 mb-4">{t("webapp_about_strengths_title")}</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><TransHTML k="webapp_about_strengths_1"/></li>
                    <li><TransHTML k="webapp_about_strengths_2"/></li>
                    <li><TransHTML k="webapp_about_strengths_3"/></li>
                    <li><TransHTML k="webapp_about_strengths_4"/></li>
                    <li><TransHTML k="webapp_about_strengths_5"/></li>
                    <li><TransHTML k="webapp_about_strengths_6"/></li>
                </ul>

                <h3 className="mt-8 mb-4">{t("webapp_about_services_title")}</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><TransHTML k="webapp_about_services_1"/></li>
                    <li><TransHTML k="webapp_about_services_2"/></li>
                    <li><TransHTML k="webapp_about_services_3"/></li>
                    <li><TransHTML k="webapp_about_services_4"/></li>
                    <li><TransHTML k="webapp_about_services_5"/></li>
                </ul>

                <h3 className="mt-8 mb-4">{t("webapp_about_clients_title")}</h3>
                <p><TransHTML k="webapp_about_clients"/></p>

                <h3 className="mt-8 mb-4">{t("webapp_about_approach_title")}</h3>
                <p><TransHTML k="webapp_about_approach1"/></p>
                <p><TransHTML k="webapp_about_approach2"/></p>

                <h3 className="mt-8 mb-4">{t("webapp_about_why_title")}</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><TransHTML k="webapp_about_why_1"/></li>
                    <li><TransHTML k="webapp_about_why_2"/></li>
                    <li><TransHTML k="webapp_about_why_3"/></li>
                    <li><TransHTML k="webapp_about_why_4"/></li>
                    <li><TransHTML k="webapp_about_why_5"/></li>
                </ul>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonld)}}/>
        </Section>
    );
}
