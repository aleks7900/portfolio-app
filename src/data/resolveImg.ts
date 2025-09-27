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

/** Нормализация относительного пути под нужный bucket (`images` | `uploads`). */
function normalizePath(p: string, bucket: "images" | "uploads"): string {
    const clean = (p || "").replace(/^\/+/, ""); // убираем ведущие /
    // убираем дублирующий префикс bucket, если он уже в пути
    const stripped = clean.replace(new RegExp(`^(?:${bucket}\\/)+`, "i"), "");
    return joinUrl(IMAGES_BASE, `${bucket}/${stripped}`);
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
 * Сформировать конечный URL картинки.
 * @param input путь к картинке (абсолютный или относительный)
 * @param opts.placeholderFallback если true — вернуть плейсхолдер при пустом input
 */
export function resolveImg(
    input: Nullable<string>,
    opts?: { placeholderFallback?: boolean }
): string {
    const p: string = (input ?? "").trim();
    if (!p) return opts?.placeholderFallback ? placeholderUrl() : "";

    // Абсолютные URL — как есть.
    if (isAbsolute(p)) return p;

    // Публичные ассеты (public/img) — через текущий origin.
    if (isPublicImgPath(p)) {
        const normalized: string = p.startsWith("/") ? p : `/${p}`;
        return absolutize(normalized);
    }

    // Каталожные изображения (/images/...) — через IMAGES_BASE.
    if (isImagesPath(p)) {
        const noPrefix: string = p.replace(/^\/?images\//i, "images/");
        return joinUrl(IMAGES_BASE || "/images", noPrefix.replace(/^images\//i, ""));
    }

    // Если это другой абсолютный путь от корня ("/...") — считаем статикой текущего origin.
    if (p.startsWith("/")) {
        return absolutize(p);
    }

    // Иначе относительный путь ("catalog/...") — считаем каталожным и вешаем на IMAGES_BASE.
    return joinUrl(IMAGES_BASE || "/images", p);
}

/** URL плейсхолдера из public/img */
export function placeholderUrl(): string {
    const ph = "/img/elementor-placeholder-image.png";
    return ORIGIN ? absolutize(ph) : ph; // при SSR вернётся относительный путь
}

export default resolveImg;
