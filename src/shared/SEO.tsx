// SEO.tsx — Enterprise SEO component for React 19
import { useEffect } from "react";
import { useI18n } from "./i18n/i18n.tsx";

export type HreflangAlt = { lang: string; href: string };

export type SEOProps = {
  titleKey?: string;
  descriptionKey?: string;
  keywordsKey?: string | string[];
  title?: string;
  description?: string;
  keywords?: string | string[];
  pathname?: string;
  canonicalBase?: string;
  image?: string;
  ogImage?: string;
  ogType?: string;
  siteName?: string;
  noindex?: boolean;
  alternates?: HreflangAlt[];
  structuredData?: object | object[];
};

export const CANONICAL_ORIGIN = "https://alex-lab.md";

const DEFAULTS: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  ru: {
    title: "Alex-Lab — Разработка веб-приложений, SPA и PWA",
    description:
      "Alex-Lab: Профессиональная разработка веб-приложений, SPA, PWA на React, TypeScript и Spring Boot. Индивидуальные цифровые решения для бизнеса.",
    keywords: [
      "разработка веб-приложений",
      "создание сайтов",
      "react",
      "typescript",
      "spring boot",
      "spa",
      "pwa",
      "веб студия",
      "alex-lab",
    ],
  },
  ro: {
    title: "Alex-Lab — Dezvoltare aplicații web, SPA și PWA",
    description:
      "Alex-Lab: Dezvoltare profesională de aplicații web, SPA, PWA pe React, TypeScript și Spring Boot. Soluții digitale personalizate pentru afaceri.",
    keywords: [
      "dezvoltare aplicatii web",
      "creare site",
      "react",
      "typescript",
      "spring boot",
      "spa",
      "pwa",
      "agentie web",
      "alex-lab",
    ],
  },
  en: {
    title: "Alex-Lab — Web Application Development, SPA & PWA",
    description:
      "Alex-Lab: Modern full-stack web application engineering, SPA, PWA with React, TypeScript, and Spring Boot. Custom digital solutions for business.",
    keywords: [
      "web application development",
      "spa",
      "pwa",
      "react",
      "typescript",
      "spring boot",
      "custom software",
      "web agency",
      "alex-lab",
    ],
  },
};

const ensureArray = (v?: string | string[]) =>
  Array.isArray(v) ? v : v ? [v] : [];

const joinKeywords = (arr: string[]) =>
  Array.from(new Set(arr.map((s) => s.trim()).filter(Boolean))).join(", ");

function cleanPath(p: string): string {
  if (!p || p === "/") return "";
  return p.replace(/\/+$/, "");
}

export function buildCanonical(pathname?: string, base: string = CANONICAL_ORIGIN): string {
  let path = pathname ?? (typeof window !== "undefined" ? window.location.pathname : "");
  // strip query or hash if accidentally passed in pathname
  path = path.split("?")[0].split("#")[0];
  const cleaned = cleanPath(path);
  return `${base}${cleaned ? cleaned : "/"}`;
}

export function buildDefaultAlternates(pathname?: string, base: string = CANONICAL_ORIGIN): HreflangAlt[] {
  let path = pathname ?? (typeof window !== "undefined" ? window.location.pathname : "");
  path = path.split("?")[0].split("#")[0];
  // Strip existing trailing lang (/ru, /ro, /en) if present to get clean base path
  const parts = cleanPath(path).split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  if (last === "ru" || last === "ro" || last === "en") {
    parts.pop();
  }
  const cleanBase = parts.length ? `/${parts.join("/")}` : "";

  return [
    { lang: "x-default", href: `${base}${cleanBase ? cleanBase : "/"}` },
    { lang: "ru", href: `${base}${cleanBase ? cleanBase : ""}/ru` },
    { lang: "ro", href: `${base}${cleanBase ? cleanBase : ""}/ro` },
    { lang: "en", href: `${base}${cleanBase ? cleanBase : ""}/en` },
  ];
}

export default function SEO(props: SEOProps) {
  const { t, lang } = useI18n();
  const currentLang = lang in DEFAULTS ? lang : "ru";
  const def = DEFAULTS[currentLang] || DEFAULTS.ru;

  const title = props.titleKey ? t(props.titleKey) : props.title || def.title;
  const description = props.descriptionKey
    ? t(props.descriptionKey)
    : props.description || def.description;

  const kwFromKey = props.keywordsKey
    ? ensureArray(props.keywordsKey).flatMap((k) =>
        t(k)
          .split(",")
          .map((s) => s.trim())
      )
    : [];
  const keywords = joinKeywords([
    ...kwFromKey,
    ...ensureArray(props.keywords),
    ...def.keywords,
  ]);

  const origin = props.canonicalBase || CANONICAL_ORIGIN;
  const canonical = buildCanonical(props.pathname, origin);

  const alternates = props.alternates || buildDefaultAlternates(props.pathname, origin);

  const ogImage = props.ogImage || props.image || `${CANONICAL_ORIGIN}/logo.png`;
  const ogType = props.ogType ?? "website";
  const siteName = props.siteName ?? "Alex-Lab";

  const ld = Array.isArray(props.structuredData)
    ? props.structuredData
    : props.structuredData
    ? [props.structuredData]
    : [];

  const robotsContent = props.noindex ? "noindex, nofollow" : "index, follow";

  // Ensure DOM head reflects tags immediately in client/test environments
  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    let metaRobots = document.querySelector(
      'meta[name="robots"]'
    ) as HTMLMetaElement | null;
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.name = "robots";
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = robotsContent;

    if (keywords) {
      let metaKw = document.querySelector(
        'meta[name="keywords"]'
      ) as HTMLMetaElement | null;
      if (!metaKw) {
        metaKw = document.createElement("meta");
        metaKw.name = "keywords";
        document.head.appendChild(metaKw);
      }
      metaKw.content = keywords;
    }

    if (canonical) {
      let linkCan = document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement | null;
      if (!linkCan) {
        linkCan = document.createElement("link");
        linkCan.rel = "canonical";
        document.head.appendChild(linkCan);
      }
      linkCan.href = canonical;
    }

    const setMetaTag = (selector: string, attr: "name" | "property", val: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMetaTag('meta[property="og:title"]', "property", "og:title", title);
    if (description) setMetaTag('meta[property="og:description"]', "property", "og:description", description);
    if (ogImage) setMetaTag('meta[property="og:image"]', "property", "og:image", ogImage);
    setMetaTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title);
    if (description) setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    if (ogImage) setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", ogImage);
  }, [title, description, robotsContent, keywords, canonical, ogImage]);

  return (
    <>
      {/* React 19 hoisted tags */}
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Alternate hreflangs */}
      {!props.noindex &&
        alternates.map(({ lang: altLang, href }) => (
          <link
            key={altLang + href}
            rel="alternate"
            hrefLang={altLang}
            href={href}
          />
        ))}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImage} />
      <meta
        property="og:locale"
        content={
          currentLang === "ro"
            ? "ro_RO"
            : currentLang === "en"
            ? "en_US"
            : "ru_RU"
        }
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {ld.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </>
  );
}
