import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./output.css";
import {I18nextProvider} from "react-i18next";
import i18n from "./shared/i18n/i18n.ts"; // tailwind компилируется сюда

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <App/>
        </I18nextProvider>
    </React.StrictMode>
);

// --- PWA Service Worker ---
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then((reg) => console.log("SW registered:", reg))
            .catch((err) => console.error("SW registration failed:", err));
    });
}
