// src/shared/resolveImg.ts

/**
 * Унифицированная сборка URL для картинок.
 * Работает одинаково в DEV (Vite) и PROD (nginx/CDN).
 *
 * Правила:
 * - Абсолютные URL (http/https/data///) возвращаем как есть.
 * - Пути вида /images/... или images/... мапмим на IMAGES_BASE (ENV или "/images").
 * - Пути из public (/img/...) отдаём с текущего ORIGIN.
 * - Относительные пути (например, "catalog/...") считаем «картинками каталога» и тоже вешаем на IMAGES_BASE.
 */

type Nullable<T> = T | null | undefined;

/** SSR-safe наличие window */
const hasWindow: boolean =
    typeof window !== "undefined" && typeof window.location?.origin === "string";

/** Безопасный доступ к import.meta.env без any */
type EnvShape = { env?: Record<string, string | undefined> };
const rawEnv: Record<string, string | undefined> | undefined = (
    (import.meta as unknown as EnvShape).env
);

/** Получить переменную окружения Vite */
function env(name: string): string | undefined {
    return rawEnv?.[name];
}

/** Текущий origin: приоритет VITE_PUBLIC_ORIGIN, иначе window.location.origin */
export const ORIGIN: string = String(
    env("VITE_PUBLIC_ORIGIN") ?? (hasWindow ? window.location.origin : "")
).replace(/\/+$/, "");

export const UPLOADS_BASE: string = String(
    env("VITE_UPLOADS_BASE") ?? "/uploads"
).replace(/\/+$/, "");

/**
 * База для каталожных изображений, которые раздаёт nginx (volume /images) или CDN.
 * Можно переопределить через VITE_IMAGES_BASE (например, https://cdn.example.com/images).
 * По умолчанию: "/images".
 */
export const IMAGES_BASE: string = String(
    env("VITE_IMAGES_BASE") ?? "/images"
).replace(/\/+$/, "");

/** Проверка на абсолютный URL. */
const isAbsolute = (s: string) => {
    return !!s && /^(?:[a-z][a-z0-9+\-.]*:)?\/\//i.test(s);
};

/** Начинается с /images или images */
function isImagesPath(p: string): boolean {
    return /^\/?images\//i.test(p);
}

/** Начинается с /img или img (папка public/img) */
function isPublicImgPath(p: string): boolean {
    return /^\/?img\//i.test(p);
}

function isUploadsPathRaw(p: string): boolean {
    // uploads/... | /uploads/... | .../uploads/...
    return /^uploads[/\\]/i.test(p)          // ← НОВОЕ
        || /^\/?uploads\//i.test(p)
        || /[/\\]uploads[/\\]/i.test(p);
}

/** Абсолютный URL к текущему ORIGIN */
function absolutize(p: string): string {
    if (!p) return "";
    if (isAbsolute(p)) return p;
    const rel = p.startsWith("/") ? p : `/${p}`;
    return `${ORIGIN}${rel}`;
}

/** Склейка без лишних слешей, но с сохранением "http://". */
function joinUrl(base: string, path: string): string {
    const b = base.replace(/\/+$/, "");
    const p = path.replace(/^\/+/, "");
    return b ? `${b}/${p}` : `/${p}`;
}

function extractUploadsSubpath(p: string): string {
    // сначала нормализуем на всякий случай
    const s = p.replace(/\\/g, "/");
    const ix = s.indexOf("/uploads/");
    if (ix >= 0) return s.slice(ix + "/uploads/".length);
    if (s.startsWith("uploads/")) return s.slice("uploads/".length);  // ← НОВОЕ
    return s.replace(/^\/?uploads\//i, "");
}

/**
 * Сформировать конечный URL картинки.
 * @param input путь к картинке (абсолютный или относительный)
 * @param opts.placeholderFallback если true — вернуть плейсхолдер при пустом input
 */
export function resolveImg(input: Nullable<string>, opts?: { placeholderFallback?: boolean }): string {
    const raw = (input ?? "").trim();
    if (!raw) return opts?.placeholderFallback ? placeholderUrl() : "";

    const p = raw.replace(/\\/g, "/");

    // 1) абсолютные адреса
    if (isAbsolute(p)) return p;

    // 2) public assets (/img/...) → текущий origin
    if (isPublicImgPath(p)) {
        const normalized = p.startsWith("/") ? p : `/${p}`;
        return absolutize(normalized);
    }

    // 3) uploads: ОБЯЗАТЕЛЬНО раньше, чем images!
    if (isUploadsPathRaw(p)) {
        const sub = extractUploadsSubpath(p);
        return joinUrl(UPLOADS_BASE || "/uploads", sub);
    }

    // 4) catalog images (/images/...)
    if (isImagesPath(p)) {
        const noPrefix = p.replace(/^\/?images\//i, "");
        return joinUrl(IMAGES_BASE || "/images", noPrefix);
    }

    // 5) любые другие абсолютные от корня → origin
    if (p.startsWith("/")) return absolutize(p);

    // 6) относительные пути считаем каталожными
    return joinUrl(IMAGES_BASE || "/images", p);
}

/** URL плейсхолдера из public/img */
export function placeholderUrl(): string {
    const ph = "/img/elementor-placeholder-image.png";
    return ORIGIN ? absolutize(ph) : ph; // при SSR вернётся относительный путь
}

export default resolveImg;
