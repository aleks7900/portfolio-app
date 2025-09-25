// src/lib/analytics.ts
type AnalyticsPayload = {
    type: string;                   // например: "page_view", "product_click", "outbound_click"
    url?: string;                   // текущий URL
    referrer?: string | null;       // document.referrer
    userId?: string | null;         // если есть авторизация — id пользователя
    sessionId?: string;             // простой uuid для сессии
    meta?: Record<string, any>;     // любые доп. поля: { productId, category, price, ... }
};

const API = "/api/analytics/events"; // ваш backend маршрут (можно вынести в env)

const sessionId = (() => {
    const key = "rvsteel_session_id";
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const v = crypto.randomUUID();
    localStorage.setItem(key, v);
    return v;
})();

export function track(type: string, meta?: Record<string, any>) {
    const payload: AnalyticsPayload = {
        type,
        url: typeof window !== "undefined" ? window.location.href : undefined,
        referrer: typeof document !== "undefined" ? document.referrer : null,
        userId: null, // подставьте, если у вас есть auth (например, из JWT)
        sessionId,
        meta,
    };

    // Пытаемся использовать sendBeacon (надежнее при закрытии вкладки)
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    const ok = navigator.sendBeacon?.(API, blob);
    if (!ok) {
        // fallback
        fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
        }).catch(() => {});
    }
}
