// src/widgets/TechChatWidget.tsx
import {useEffect, useMemo} from "react";
import {useI18n} from "../i18n/i18n.tsx";

type Provider = "crisp" | "tawk" | "none";

type Props = {
    /** Смещение от правого края: по умолчанию встанет левее двух FAB (Call + Callback) */
    offsetRight?: string | number;
    bottom?: string | number;
    zIndex?: number;
    /** Сообщение по умолчанию для WhatsApp */
    defaultMessage?: string;
};

// Расширяем Window глобально
declare global {
    interface Window {
        $crisp?: any[];
        CRISP_WEBSITE_ID?: string;
        Tawk_API?: {
            toggle?: () => void;
            maximize?: () => void;
        };
    }
}

const ORIGIN =
    (import.meta.env.VITE_PUBLIC_ORIGIN || window.location.origin).replace(/\/+$/, "");

const CHAT_PROVIDER = (import.meta.env.VITE_CHAT_PROVIDER || "none").toLowerCase() as Provider;
const CRISP_WEBSITE_ID = import.meta.env.VITE_CRISP_WEBSITE_ID as string | undefined;
const TAWK_PROPERTY_ID = import.meta.env.VITE_TAWK_PROPERTY_ID as string | undefined;
const TAWK_WIDGET_ID = import.meta.env.VITE_TAWK_WIDGET_ID as string | undefined;
const TECH_WHATSAPP = (import.meta.env.VITE_TECH_WHATSAPP || "").toString();

function injectCrisp() {
    if (window.$crisp) return;
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;
    const d = document, s = d.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = true;
    d.head.appendChild(s);
}

function injectTawk() {
    if (window.Tawk_API) return;
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode?.insertBefore(s1, s0);
    window.Tawk_API = {};
}

function openCrisp() {
    window.$crisp?.push?.(["do", "chat:open"]);
}

function openTawk() {
    if (window.Tawk_API?.toggle) window.Tawk_API.toggle();
    else window.Tawk_API?.maximize?.();
}

function waLink(phone: string, text: string) {
    const clean = (phone || "").replace(/[^\d]/g, "");
    const msg = encodeURIComponent(text);
    return `https://wa.me/${clean}?text=${msg}`;
}

export default function TechChatWidget({
                                           offsetRight = "calc(1.5rem + (3.5rem + 0.75rem) * 3.23)",
                                           bottom = "1.5rem",
                                           zIndex = 9997,
                                           defaultMessage,
                                       }: Props) {

    const { t } = useI18n();

    const tz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC", []);
    const page = useMemo(() => location.pathname + location.search, []);
    const when = useMemo(() => new Date().toLocaleString(), []);
    const text =
        defaultMessage ??
        t("techchat_default_message", { page, origin: ORIGIN, when, tz });

    useEffect(() => {
        if (CHAT_PROVIDER === "crisp" && CRISP_WEBSITE_ID) injectCrisp();
        if (CHAT_PROVIDER === "tawk" && TAWK_PROPERTY_ID && TAWK_WIDGET_ID) injectTawk();
    }, []);

    function handleClick() {
        if (CHAT_PROVIDER === "crisp" && CRISP_WEBSITE_ID) return openCrisp();
        if (CHAT_PROVIDER === "tawk" && TAWK_PROPERTY_ID && TAWK_WIDGET_ID) return openTawk();
        window.open(waLink(TECH_WHATSAPP, text), "_blank", "noopener,noreferrer");
    }

    return (
        <div
            className="fixed"
            style={{
                right: typeof offsetRight === "number" ? `${offsetRight}px` : offsetRight,
                bottom: typeof bottom === "number" ? `${bottom}px` : bottom,
                zIndex,
            }}
        >
            <button
                aria-label={t("techchat_button_label")}
                title={t("techchat_button_label")}
                onClick={handleClick}
                className="rounded-full w-14 h-14 !text-white !bg-blue-400 hover:!bg-blue-600 shadow-2xl
                   flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-300"
            >
                {/* Иконка */}
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path
                        d="M12 2a10 10 0 00-8.94 14.56L2 22l5.6-1.47A10 10 0 1012 2zm-3 6.5c.17-.39.26-.84.14-1.29-.1-.37-.45-.6-.8-.6-.3 0-.63.02-.96.02-.34 0-.7 0-.97.23-.33.29-.54.73-.56 1.17-.08 1.72.9 3.23 2.09 4.37 1.21 1.16 2.8 2.04 4.49 2.05.44 0 .89-.21 1.18-.53.24-.27.25-.65.25-.99 0-.32.03-.64-.08-.95-.14-.42-.58-.63-.99-.77-.32-.1-.66.04-.93.23-.23.16-.44.36-.65.55-.22.2-.5.3-.8.21-1.24-.39-2.2-1.35-2.58-2.59-.08-.3.01-.57.22-.8.19-.21.39-.42.55-.65.19-.26.33-.6.24-.92z"/>
                </svg>
            </button>
        </div>
    );
}
