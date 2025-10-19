import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    ru: {translation: {}},
    ro: {translation: {}},
    en: {translation: {}},
};

type Lang = "ru" | "ro" | "en";
const SUPPORTED: Lang[] = ["ru", "ro", "en"];

function langFromPath(pathname: string): Lang | null {
    const path = pathname.replace(/\/+$/, "");
    const last = path.split("/").pop()?.toLowerCase();
    return (last && SUPPORTED.includes(last as Lang)) ? (last as Lang) : null;
}

function pickInitialLang(): Lang {
    const urlLang = typeof window !== "undefined" ? langFromPath(window.location.pathname) : null;
    if (urlLang) return urlLang;
    const saved = (localStorage.getItem("lang") || "").toLowerCase();
    if (saved.startsWith("ro")) return "ro";
    if (saved.startsWith("en")) return "en";
    const nav = typeof navigator !== "undefined" ? (navigator.language || navigator.languages?.[0] || "") : "";
    if (nav.toLowerCase().startsWith("ro")) return "ro";
    if (nav.toLowerCase().startsWith("en")) return "en";
    return "ru";
}

const initial: Lang = pickInitialLang();

// ВАЖНО: не переинициализировать при HMR
if (!i18n.isInitialized) {
    i18n
        .use(initReactI18next)
        .init({
            resources,
            lng: initial,
            fallbackLng: "ru",
            supportedLngs: ["ru", "ro", "en"],
            load: "languageOnly",          // ro-RO -> ro
            interpolation: {escapeValue: false},
            returnNull: false,
        })
        .catch(console.error);
}

export default i18n;