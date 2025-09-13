// Универсальный fetch-клиент с автоподстановкой Authorization и обработкой 401
const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8181";

let getToken: () => string | null = () => null;
let onUnauthorized: () => void = () => {};

export function configureApi(opts: {
    getToken: () => string | null;
    onUnauthorized: () => void;
}) {
    getToken = opts.getToken;
    onUnauthorized = opts.onUnauthorized;
}

type FetchOptions = RequestInit & { auth?: boolean };

export async function apiFetch(path: string, options: FetchOptions = {}) {
    const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
    const headers = new Headers(options.headers || {});
    headers.set("Content-Type", "application/json");

    if (options.auth !== false) {
        const token = getToken();
        if (token) headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
        onUnauthorized();
        throw new Error("Unauthorized");
    }
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
    }
    const ct = res.headers.get("content-type") || "";
    return ct.includes("application/json") ? res.json() : res.text();
}
