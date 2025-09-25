// SEO.tsx — версия для React 19 (без Helmet)
import {useTranslation} from "react-i18next";

type HreflangAlt = { lang: string; href: string };
type SEOProps = {
    titleKey?: string; descriptionKey?: string; keywordsKey?: string | string[];
    title?: string; description?: string; keywords?: string | string[];
    pathname?: string; canonicalBase?: string;
    ogImage?: string; ogType?: string; siteName?: string;
    noindex?: boolean; alternates?: HreflangAlt[];
    structuredData?: object | object[];
};

const DEFAULTS: Record<string, { title: string; description: string; keywords: string[] }> = {
    ru: {
        title: "Изделия из нержавеющей стали | RVSteel",
        description: "Производство и продажа столов, моек, стеллажей и мебели из нержавейки. Индивидуальные заказы по Кишинёву и всей Молдове.",
        keywords: ["изделия из нержавеющей стали", "столы из нержавейки", "мойки из нержавейки", "стеллажи нержавейка", "мебель из нержавейки"],
    },
    ro: {
        title: "Produse din oțel inoxidabil | RVSteel",
        description: "Producție și vânzare de mese, chiuvete, rafturi și mobilier din inox. Comenzi personalizate în Chișinău și toată Moldova.",
        keywords: ["produse inox", "mese inox", "chiuvete inox", "rafturi inox", "mobilier inox"],
    },
};

const ensureArray = (v?: string | string[]) => (Array.isArray(v) ? v : v ? [v] : []);
const joinKeywords = (arr: string[]) =>
    Array.from(new Set(arr.map(s => s.trim()).filter(Boolean))).join(", ");

export default function SEO(props: SEOProps) {
    const {t, i18n} = useTranslation();
    const lang = i18n?.language?.split("-")[0] || "ru";
    const def = DEFAULTS[lang] || DEFAULTS.ru;

    const title = props.titleKey ? t(props.titleKey) : props.title || def.title;
    const description = props.descriptionKey ? t(props.descriptionKey) : props.description || def.description;
    const kwFromKey = props.keywordsKey
        ? ensureArray(props.keywordsKey).flatMap(k => t(k).split(",").map(s => s.trim()))
        : [];
    const keywords = joinKeywords([...kwFromKey, ...ensureArray(props.keywords), ...def.keywords]);

    const origin =
        typeof window !== "undefined" && window.location?.origin
            ? window.location.origin
            : props.canonicalBase || "";
    const path = props.pathname ?? (typeof window !== "undefined" ? window.location.pathname : "");
    const canonical = origin && path ? `${origin}${path}` : "";

    const ld = Array.isArray(props.structuredData) ? props.structuredData : props.structuredData ? [props.structuredData] : [];

    return (
        <>
            <title>{title}</title>
            {description && <meta name="description" content={description}/>}
            {keywords && <meta name="keywords" content={keywords}/>}

            <meta name="robots" content={props.noindex ? "noindex,nofollow" : "index,follow"}/>

            {canonical && <link rel="canonical" href={canonical}/>}

            {props.alternates?.map(({lang, href}) => (
                <link key={lang + href} rel="alternate" hrefLang={lang} href={href}/>
            ))}

            {/* Open Graph */}
            <meta property="og:title" content={title}/>
            {description && <meta property="og:description" content={description}/>}
            {canonical && <meta property="og:url" content={canonical}/>}
            <meta property="og:type" content={props.ogType ?? "website"}/>
            <meta property="og:site_name" content={props.siteName ?? "RVSteel"}/>
            {props.ogImage && <meta property="og:image" content={props.ogImage}/>}

            {/* Twitter */}
            <meta name="twitter:card" content={props.ogImage ? "summary_large_image" : "summary"}/>
            <meta name="twitter:title" content={title}/>
            {description && <meta name="twitter:description" content={description}/>}
            {props.ogImage && <meta name="twitter:image" content={props.ogImage}/>}

            {/* JSON-LD */}
            {ld.map((obj, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(obj)}}/>
            ))}
        </>
    );
}
