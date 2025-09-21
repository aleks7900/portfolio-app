const IMG_BASE = import.meta.env.VITE_IMG_BASE_URL ?? "";
export function resolveImg(src: string) {
    if (!src) return "";
    if (/^https?:\/\//i.test(src)) return src;   // уже полный URL
    if (src.startsWith("/")) return `${IMG_BASE}${src}`;
    return `${IMG_BASE}/${src}`;
}