// Общий HTTP клиент под Spring Boot + JWT
export const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8181";

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

export async function apiFetch<T = unknown>(
    path: string,
    opts: FetchOptions = {}
): Promise<T> {
    const url: string = path.startsWith("http") ? path : `${BASE_URL}${path}`;
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
