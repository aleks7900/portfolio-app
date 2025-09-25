// src/lib/analytics.ts (strict, no-any)

// 1) Описываем конкретные payload’ы для частых событий.
// Можешь расширять EventMap своими типами.
import {BASE_URL} from "../shared/api/api.ts";

type PageViewMeta = {
    path: string;
    title?: string;
    referrer?: string | null;
};

type ProductClickMeta = {
    productId: string;
    category?: string;
    price?: number;
};

type OutboundClickMeta = {
    href: string;
};

type EventMap = {
    page_view: PageViewMeta;
    product_click: ProductClickMeta;
    outbound_click: OutboundClickMeta;
    // запасной вариант: для редких кастомных событий
    // разрешаем произвольный объект, но без any:
    [custom: string]: Record<string, unknown>;
};

type AnalyticsPayload<K extends keyof EventMap = keyof EventMap> = {
    type: K & string;
    url?: string;
    referrer?: string | null;
    userId?: string | null;
    sessionId?: string;
    meta?: EventMap[K];
};

const API = BASE_URL + "/api/analytics/events";

// 2) Безопасное получение sessionId (SSR-safe)
function getSessionId(): string | undefined {
    if (typeof window === "undefined") return undefined;
    try {
        const key = "rvsteel_session_id";
        const existing = window.localStorage.getItem(key);
        if (existing) return existing;

        const uuid =
            (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function")
                ? crypto.randomUUID()
                : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

        window.localStorage.setItem(key, uuid);
        return uuid;
    } catch {
        return undefined;
    }
}

// 3) Узлы окружения читаем лениво и безопасно (SSR-safe)
function getCurrentUrl(): string | undefined {
    return typeof window !== "undefined" ? window.location.href : undefined;
}

function getReferrer(): string | null {
    return typeof document !== "undefined" ? document.referrer : null;
}

// 4) Тип для Navigator с sendBeacon без any
interface NavigatorSendBeacon {
    sendBeacon(url: string, data?: BodyInit | null): boolean;
}

// 5) Базовый низкоуровневый отправитель
function sendPayload(payload: AnalyticsPayload): void {
    // Пытаемся beacon
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
        const nav = navigator as Navigator & NavigatorSendBeacon;
        try {
            const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
            const ok = nav.sendBeacon(API, blob);
            if (ok) return;
        } catch {
            // падаем в fetch
        }
    }

    // Fallback на fetch
    if (typeof fetch !== "undefined") {
        // без await — огонь и забыли
        void fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
        }).catch(() => {});
    }
}

// 6) Универсальный трекер с дженериком: без any
export function track<K extends keyof EventMap>(
    type: K,
    meta?: EventMap[K]
): void {
    const payload: AnalyticsPayload<K> = {
        type: type as K & string,
        url: getCurrentUrl(),
        referrer: getReferrer(),
        userId: null,         // подставь при наличии auth
        sessionId: getSessionId(),
        meta,
    };

    sendPayload(payload);
}

// 7) Удобные шорткаты с точной типизацией (необязательно, но приятно)
export const trackPageView = (meta: PageViewMeta) => track("page_view", meta);
export const trackProductClick = (meta: ProductClickMeta) => track("product_click", meta);
export const trackOutboundClick = (meta: OutboundClickMeta) => track("outbound_click", meta);
