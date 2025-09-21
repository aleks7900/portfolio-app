const IMG_BASE = import.meta.env.VITE_IMG_BASE_URL ?? "http://localhost:8081";

export function resolveImg(src?: string | null): string {
    if (!src) return "";

    // уже полный http(s) — ничего не делаем
    if (/^https?:\/\//i.test(src)) return src;

    // нормализуем разделители
    const s = src.replace(/\\/g, "/").replace(/^\/+/, "");

    // гарантируем префикс /images/
    const withPrefix = s.startsWith("images/") ? `/${s}` : `/images/${s}`;

    return `${IMG_BASE}${withPrefix}`;
}