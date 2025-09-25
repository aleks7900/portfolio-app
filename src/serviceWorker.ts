/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */
const SW_VERSION = "v1.0.0";
const STATIC_CACHE = `rvsteel-static-${SW_VERSION}`;
const HTML_CACHE = `rvsteel-html-${SW_VERSION}`;

const STATIC_ASSETS = [
    "/",                         // можно убрать, если SPA «сама» отдает index.html
    "/favicon.ico",
    "/manifest.json",
    "/icons/icon-192.png",
    "/icons/icon-512.png",
    "/icons/maskable-192.png",
    "/icons/maskable-512.png"
];

// Установка: прогреваем статический кеш
(self as unknown as ServiceWorkerGlobalScope).addEventListener("install", (event: ExtendableEvent) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    // сразу активируем новый SW
    // @ts-ignore
    self.skipWaiting?.();
});

// Активация: чистим старые кеши
(self as unknown as ServiceWorkerGlobalScope).addEventListener("activate", (event: ExtendableEvent) => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            await Promise.all(
                keys
                    .filter((k) => ![STATIC_CACHE, HTML_CACHE].includes(k))
                    .map((k) => caches.delete(k))
            );
            // @ts-ignore
            self.clients?.claim?.();
        })()
    );
});

// Помощники
const isNavigationRequest = (req: Request) =>
    req.mode === "navigate" ||
    (req.method === "GET" && req.headers.get("accept")?.includes("text/html"));

// Stale-While-Revalidate для статики
async function staleWhileRevalidate(req: Request, cacheName: string): Promise<Response> {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    const fetchPromise = fetch(req)
        .then((res) => {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
        })
        .catch(() => cached || Promise.reject("offline"));
    return cached || fetchPromise;
}

// Network-First для HTML/навигации (SPA)
async function networkFirstHTML(req: Request): Promise<Response> {
    const cache = await caches.open(HTML_CACHE);
    try {
        const res = await fetch(req);
        if (res && res.ok) cache.put(req, res.clone());
        return res;
    } catch {
        const cached = await cache.match(req);
        if (cached) return cached;

        // Фоллбек на index.html (SPA), если прямого кеша нет
        const fallback = await caches.match("/");
        if (fallback) return fallback;

        return new Response("Offline", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
    }
}

(self as unknown as ServiceWorkerGlobalScope).addEventListener("fetch", (event: FetchEvent) => {
    const req = event.request;
    const url = new URL(req.url);

    // Не кешируем POST/PUT/DELETE и запросы к API (настрой по желанию)
    if (req.method !== "GET") return;
    if (url.pathname.startsWith("/api/")) return;

    // HTML/навигация → network-first
    if (isNavigationRequest(req)) {
        event.respondWith(networkFirstHTML(req));
        return;
    }

    // Статика (js/css/img/fonts) → stale-while-revalidate
    if (/\.(?:js|css|woff2?|ttf|otf|png|jpg|jpeg|webp|svg|gif|ico)$/i.test(url.pathname)) {
        event.respondWith(staleWhileRevalidate(req, STATIC_CACHE));
        return;
    }

    // Остальное: пробуем кеш, иначе сеть без записи
    event.respondWith(
        caches.match(req).then((cached) => cached || fetch(req))
    );
});
