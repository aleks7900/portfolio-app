import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    ru: { translation: {} },
    ro: { translation: {} },
};

const saved = (localStorage.getItem("lang") || "").toLowerCase();
const initial = saved.startsWith("ro") ? "ro" : "ru";

// ВАЖНО: не переинициализировать при HMR
if (!i18n.isInitialized) {
    i18n
        .use(initReactI18next)
        .init({
            resources,
            lng: initial,
            fallbackLng: "ru",
            supportedLngs: ["ru", "ro"],
            load: "languageOnly",          // ro-RO -> ro
            interpolation: { escapeValue: false },
            returnNull: false,
        })
        .catch(console.error);
}

export default i18n;