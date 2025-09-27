// src/shared/resolveImg.ts

/**
 * Откуда брать origin:
 * - VITE_PUBLIC_ORIGIN (на проде можно прокинуть домен)
 * - иначе текущее window.location.origin
 */
const ORIGIN = (import.meta.env.VITE_PUBLIC_ORIGIN || window.location.origin).replace(/\/+$/, "");

/**
 * База для статики (можно направить на CDN отдельным ENV),
 * по умолчанию равна ORIGIN.
 */
export const IMG_BASE: string = (import.meta.env.VITE_IMG_BASE_URL || ORIGIN).replace(/\/+$/, "");

/** Проверка на абсолютный URL. */
const isAbsolute = (s: string) => /^https?:\/\//i.test(s);

/** Склейка без лишних слешей, но с сохранением "http://". */
function joinUrl(base: string, path: string): string {
    return `${base}/${path}`
        .replace(/([^:]\/)\/+/g, "$1") // убираем дубль-слеши кроме схемы
        .replace(/\/+$/, ""); // финальный слеш не нужен
}

/** Нормализация относительного пути под нужный bucket (`images` | `uploads`). */
function normalizePath(p: string, bucket: "images" | "uploads"): string {
    const clean = (p || "").replace(/^\/+/, ""); // убираем ведущие /
    // убираем дублирующий префикс bucket, если он уже в пути
    const stripped = clean.replace(new RegExp(`^(?:${bucket}\\/)+`, "i"), "");
    return joinUrl(IMG_BASE, `${bucket}/${stripped}`);
}

/**
 * URL для картинки из каталога статики (/images/...)
 * Примеры:
 *   imageUrl('catalog/custom_orders/perila.png') -> {ORIGIN}/images/catalog/custom_orders/perila.png
 *   imageUrl('/images/catalog/..')               -> {ORIGIN}/images/catalog/..
 *   imageUrl('http://cdn/..')                    -> вернётся как есть
 */
export function imageUrl(p: string): string {
    if (!p) return placeholderUrl();
    if (isAbsolute(p)) return p;
    return normalizePath(p, "images");
}

/**
 * URL для загруженных файлов (/uploads/...)
 */
export function uploadUrl(p: string): string {
    if (!p) return placeholderUrl();
    if (isAbsolute(p)) return p;
    return normalizePath(p, "uploads");
}

/**
 * Универсальный резолвер с выбором bucket и кастомным плейсхолдером.
 * По умолчанию плейсхолдер: /img/elementor-placeholder-image.png (лежит в public/img)
 */
export function resolveImg(
    p?: string | null,
    opts?: { bucket?: "images" | "uploads"; placeholder?: string }
): string {
    const bucket = opts?.bucket || "images";
    const ph = opts?.placeholder || "/img/elementor-placeholder-image.png";

    if (!p) return absolutize(ph);
    if (isAbsolute(p)) return p;
    return normalizePath(p, bucket);
}

/** Абсолютный URL из относительного к текущему ORIGIN. */
function absolutize(p: string): string {
    if (!p) return "";
    if (isAbsolute(p)) return p;
    const rel = p.startsWith("/") ? p : `/${p}`;
    return `${ORIGIN}${rel}`;
}

/** Путь плейсхолдера (из public/img). */
function placeholderUrl(): string {
    return absolutize("/img/elementor-placeholder-image.png");
}

export default resolveImg;
