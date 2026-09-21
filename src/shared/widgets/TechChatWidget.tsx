// src/widgets/TechChatWidget.tsx
import {useEffect, useMemo, useState} from "react";
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
        $crisp?: unknown[];
        CRISP_WEBSITE_ID?: string;
        Tawk_API?: {
            toggle?: () => void;
            maximize?: () => void;
            minimize?: () => void;
            hideWidget?: () => void;
            showWidget?: () => void;
            onLoad?: () => void;
            onChatMaximized?: () => void;
            onChatMinimized?: () => void;
        } & Record<string, unknown>;
        __CHAT_VISIBLE?: boolean;
    }
}

const ORIGIN =
    (import.meta.env.VITE_PUBLIC_ORIGIN || window.location.origin).replace(/\/+$/, "");

const CHAT_PROVIDER = (import.meta.env.VITE_CHAT_PROVIDER || "none").toLowerCase() as Provider;
const CRISP_WEBSITE_ID = import.meta.env.VITE_CRISP_WEBSITE_ID as string | undefined;
const TAWK_PROPERTY_ID = import.meta.env.VITE_TAWK_PROPERTY_ID as string | undefined;
const TAWK_WIDGET_ID = import.meta.env.VITE_TAWK_WIDGET_ID as string | undefined;
const TECH_WHATSAPP = (import.meta.env.VITE_TECH_WHATSAPP || "").toString();


// Key for localStorage persistence (scoped by origin + provider)
const UNREAD_KEY = `techchat_unread:${ORIGIN}:${CHAT_PROVIDER}`;

function injectCrisp() {
    if (window.$crisp) return;
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;
    const d = document, s = d.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = true;
    d.head.appendChild(s);
}

// Глобальный сеттер видимости чата с событием
function setChatVisible(visible: boolean) {
    try {
        if (window.__CHAT_VISIBLE === visible) return;
        window.__CHAT_VISIBLE = visible;
        window.dispatchEvent(new CustomEvent("chat-visibility-change", {detail: {visible}}));
    } catch { /* no-op */
    }
}


function injectTawk(hideBubble = true) {
    if (window.Tawk_API) return;
    // Prepare API object and hook BEFORE inserting the script
    window.Tawk_API = window.Tawk_API || {};
    if (hideBubble) {
        // 1) Keep widget hidden by default
        window.Tawk_API.onLoad = function () {
            try {
                window.Tawk_API?.hideWidget?.();
                // виджет загрузился — по умолчанию скрыт
                setChatVisible(false);
            } catch { /* empty */
            }
        };
        // 2) When chat opens, allow it to be visible
        window.Tawk_API.onChatMaximized = function () {
            try {
                window.Tawk_API?.showWidget?.();
                setChatVisible(true);
            } catch { /* empty */
            }
        };
        // 3) When user minimizes/“closes”, hide again (removes any residual launcher/close pill)
        window.Tawk_API.onChatMinimized = function () {
            try {
                window.Tawk_API?.hideWidget?.();
                setChatVisible(false);
            } catch { /* empty */
            }
        };
    }
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode?.insertBefore(s1, s0);
}

function openCrisp() {
    window.$crisp?.push?.(["do", "chat:open"]);
}

function openTawk() {
    // Ensure widget is visible only while opened
    const tryOpen = () => {
        if (window.Tawk_API?.maximize) {
            window.Tawk_API.showWidget?.();   // make container visible
            window.Tawk_API.maximize();       // open panel
            return true;
        }
        if (window.Tawk_API?.toggle) {
            window.Tawk_API.showWidget?.();
            window.Tawk_API.toggle();
            return true;
        }
        return false;
    };
    if (tryOpen()) return;
    const start = Date.now();
    const timer = setInterval(() => {
        if (tryOpen() || Date.now() - start > 5000) clearInterval(timer);
    }, 200);
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

    const {t} = useI18n();

    const tz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC", []);
    const page = useMemo(() => location.pathname + location.search, []);
    const when = useMemo(() => new Date().toLocaleString(), []);
    const text =
        defaultMessage ??
        t("techchat_default_message", {page, origin: ORIGIN, when, tz});

    // 1) Initialize from localStorage (lazy initializer, SSR-safe via try/catch)
    const [unreadCount, setUnreadCount] = useState<number>(() => {
        try {
            const raw = localStorage.getItem(UNREAD_KEY);
            const n = raw == null ? 0 : parseInt(raw, 10);
            return Number.isFinite(n) ? Math.max(0, Math.min(n, 99)) : 0;
        } catch {
            return 0;
        }
    });

    useEffect(() => {
        if (CHAT_PROVIDER === "crisp" && CRISP_WEBSITE_ID) injectCrisp();
        if (CHAT_PROVIDER === "tawk" && TAWK_PROPERTY_ID && TAWK_WIDGET_ID) injectTawk(true);
        // если провайдер отсутствует или экран мобильный — считаем чат скрытым
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        if (CHAT_PROVIDER === "none" || isMobile) {
            setChatVisible(false);
            // полностью скрываем Tawk на мобильных (если всё же подгружен)
            try {
                window.Tawk_API?.hideWidget?.();
            } catch { /* empty */
            }
        }
    }, []); // loads provider scripts :contentReference[oaicite:0]{index=0}

    // 2) Persist to localStorage whenever unreadCount changes
    useEffect(() => {
        try {
            localStorage.setItem(UNREAD_KEY, String(unreadCount));
        } catch { /* empty */
        }
    }, [unreadCount]);

    // 3) Cross-tab sync (updates badge if another tab receives a message)
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === UNREAD_KEY && e.newValue != null) {
                const n = parseInt(e.newValue, 10);
                if (Number.isFinite(n)) setUnreadCount(Math.max(0, Math.min(n, 99)));
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    // 4) Bind Tawk callbacks to increment/reset unread
    useEffect(() => {
        if (CHAT_PROVIDER !== "tawk") return;
        let stop = false;
        const bind = () => {
            const api = window.Tawk_API;
            if (!api) return false;
            // New incoming message -> increment (cap 99)
            api.onChatMessage = function () {
                setUnreadCount((prev) => Math.min(prev + 1, 99));
            };
            // When chat is opened/maximized -> reset
            api.onChatMaximized = function () {
                setUnreadCount(0);
            };
            return true;
        };
        if (!bind()) {
            const started = Date.now();
            const timer = setInterval(() => {
                if (stop) return clearInterval(timer);
                if (bind() || Date.now() - started > 5000) clearInterval(timer);
            }, 200);
        }
        return () => {
            stop = true;
        };
    }, []);

    function handleClick() {
        if (CHAT_PROVIDER === "crisp" && CRISP_WEBSITE_ID) return openCrisp();
        if (CHAT_PROVIDER === "tawk" && TAWK_PROPERTY_ID && TAWK_WIDGET_ID) return openTawk();
        window.open(waLink(TECH_WHATSAPP, text), "_blank", "noopener,noreferrer");
    }

    return (
        <div
            className="fixed hidden md:block"
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
                className="!rounded-full w-16 h-16 !text-white !bg-blue-400 hover:!bg-blue-600 shadow-2xl
                   flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-300"
            >
                {/* Иконка */}
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path
                        d="M12 2a10 10 0 00-8.94 14.56L2 22l5.6-1.47A10 10 0 1012 2zm-3 6.5c.17-.39.26-.84.14-1.29-.1-.37-.45-.6-.8-.6-.3 0-.63.02-.96.02-.34 0-.7 0-.97.23-.33.29-.54.73-.56 1.17-.08 1.72.9 3.23 2.09 4.37 1.21 1.16 2.8 2.04 4.49 2.05.44 0 .89-.21 1.18-.53.24-.27.25-.65.25-.99 0-.32.03-.64-.08-.95-.14-.42-.58-.63-.99-.77-.32-.1-.66.04-.93.23-.23.16-.44.36-.65.55-.22.2-.5.3-.8.21-1.24-.39-2.2-1.35-2.58-2.59-.08-.3.01-.57.22-.8.19-.21.39-.42.55-.65.19-.26.33-.6.24-.92z"/>
                </svg>
                {/* 🔴 Numeric unread badge (render if > 0).
                   If you've already replaced the button per earlier steps,
                   keep your styled version and just reuse `unreadCount` below. */}
                {unreadCount > 0 && (
                    <span
                        className="absolute -top-1 -right-1 flex items-center justify-center
                                   min-w-[1.25rem] h-5 px-1.5 text-[0.75rem] font-bold
                                   bg-red-500 text-white !rounded-full ring-2 ring-white animate-pulse"
                    >
                         {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>
        </div>
    );
}
