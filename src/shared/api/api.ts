// Общий HTTP клиент под Spring Boot + JWT
export const API_BASE = (import.meta.env.VITE_API_BASE || '/api').replace(/\/+$/, '');

function getToken() {
    // если у вас есть свой AuthProvider — возьмите токен из него
    // здесь — простой вариант: из localStorage
    return localStorage.getItem("auth_token") || "";
}

type FetchOptions = Omit<RequestInit, "headers" | "body"> & {
    body?: BodyInit | object;
    headers?: Record<string, string>;
    auth?: boolean; // по умолчанию true — добавлять Authorization
};

function join(base: string, path: string) {
    if (/^https?:\/\//i.test(path)) return path;           // абсолютный URL — не трогаем
    const p = path.startsWith('/') ? path : `/${path}`;
    // убираем двойные /api
    return `${base}${p}`.replace(/\/api\/api(\/|$)/, '/api$1');
}

export async function apiFetch<T = unknown>(
    path: string,
    opts: FetchOptions = {}
): Promise<T> {
    const url = join(API_BASE, path);
    const headers: Record<string, string> = {
        "Accept": "application/json",
        ...(opts.body instanceof FormData ? {} : {"Content-Type": "application/json"}),
        ...(opts.headers || {}),
    };

    // auth header
    if (opts.auth !== false) {
        const token = getToken();
        if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
        ...opts,
        headers,
        body:
            opts.body instanceof FormData
                ? opts.body
                : typeof opts.body === "object" && opts.body !== null
                    ? JSON.stringify(opts.body)
                    : opts.body,
    });

    if (res.status === 204) return undefined as unknown as T;

    const text = await res.text();
    let data: unknown;
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    if (!res.ok) {
        let message: string;
        if (
            typeof data === "object" &&
            data !== null && "message" in data &&
            typeof (data as Record<string, unknown>).message === "string"
        ) {
            message = (data as Record<string, unknown>).message as string;
        } else {
            message = res.statusText || "Request error";
        }

        throw new Error(message);
    }

    return data as T;
}
