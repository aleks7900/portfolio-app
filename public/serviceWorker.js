/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */
const SW_VERSION = 'v1.0.2';

const STATIC_CACHE = `alexlab-static-${SW_VERSION}`;

const HTML_CACHE = `alexlab-html-${SW_VERSION}`;

const STATIC_ASSETS = [
    '/index.html',
    '/favicon.ico',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    '/icons/maskable-192.png',
    '/icons/maskable-512.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(STATIC_CACHE);
        await Promise.all(
            STATIC_ASSETS.map(async (url) => {
                try {
                    await cache.add(new Request(url, {cache: 'reload'}));
                } catch (e) {
                    // не валим установку из-за 404/сетевых сбоев
                    console.warn('[SW] skip caching', url, e);
                }
            })
        );
    })());
    self.skipWaiting?.();
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(
            keys.filter(k => ![STATIC_CACHE, HTML_CACHE].includes(k)).map(k => caches.delete(k))
        );
        self.clients?.claim?.();
    })());
});

function isHttp(req) {
    const u = typeof req === 'string' ? req : req.url;
    const p = new URL(u, self.location.origin).protocol;
    return p === 'http:' || p === 'https:';
}

function isNav(req) {
    return req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept')?.includes('text/html'));
}

// SWR для статики — не бросаем исключения
async function swr(req, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    try {
        const net = await fetch(req);
        if (net && net.ok) cache.put(req, net.clone());
        return net;
    } catch {
        // оффлайн — вернём кэш, если он есть, иначе вежливый ответ
        if (cached) return cached;
        return new Response('Offline', {status: 503, headers: {'Content-Type': 'text/plain; charset=utf-8'}});
    }
}

// Network-first для HTML/навигации
async function networkFirstHtml(req) {
    const cache = await caches.open(HTML_CACHE);
    try {
        const net = await fetch(req);
        if (net && net.ok) cache.put(req, net.clone());
        return net;
    } catch {
        const cached = await cache.match(req);
        if (cached) return cached;
        // финальный фолбэк — индекс из статика
        const index = await caches.match('/index.html');
        return index || new Response('Offline', {status: 503});
    }
}

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (!isHttp(req) || req.method !== 'GET') return;

    const url = new URL(req.url);

    // НЕ трогаем API и медиа-статику (пусть их обслуживает nginx)
    if (url.pathname.startsWith('/api/') ||
        url.pathname.startsWith('/images/') ||
        url.pathname.startsWith('/uploads/')) {
        return; // не вызываем respondWith => обычный сетевой запрос
    }

    // НЕ трогаем backend API, чтобы не мешать /api/ запросам
    if (url.pathname.startsWith('/api/')) return;

    if (isNav(req)) {
        event.respondWith(networkFirstHtml(req));
        return;
    }

    // статика (js/css/fonts/img)
    if (/\.(?:js|css|woff2?|ttf|otf|png|jpg|jpeg|webp|svg|gif|ico)$/i.test(url.pathname)) {
        event.respondWith(swr(req, STATIC_CACHE));
        return;
    }

    // остальное — кэш если есть, иначе сеть
    event.respondWith(caches.match(req).then(c => c || fetch(req)));
});