import {apiFetch} from "./api.ts";

export type RequestStatus = "NEW" | "IN_PROGRESS" | "DONE";

export type RequestItem = {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    subject?: string;
    message: string;
    createdAt: string;       // ISO
    status: RequestStatus;
};

export type RequestsPage = {
    content: RequestItem[];
    totalPages: number | null;
    number: number;
    size: number;
};

/* ---------- вспомогательные типы и type guard'ы ---------- */

type PageMeta = { totalPages?: number; number?: number; size?: number };
type PageResponse<T> = { content: T[] } & PageMeta;
type HalResponse<T> = { _embedded?: Record<string, T[]>; page?: PageMeta };

function isObject(v: unknown): v is Record<string, unknown> {
    return v !== null && typeof v === "object";
}

function isPageResponse<T>(v: unknown): v is PageResponse<T> {
    return isObject(v) && Array.isArray((v as { content?: unknown }).content);
}

function isHalResponse<T>(v: unknown): v is HalResponse<T> {
    return isObject(v) && "_embedded" in v;
}

/* ---------- listRequests без any ---------- */

export async function listRequests(params: {
    page?: number;
    size?: number;
    q?: string;
    status?: RequestStatus | "";
} = {}): Promise<RequestsPage> {
    const usp = new URLSearchParams();
    if (params.page != null) usp.set("page", String(params.page));
    if (params.size != null) usp.set("size", String(params.size));
    if (params.q) usp.set("q", params.q);
    if (params.status) usp.set("status", params.status);

    const data = await apiFetch<unknown>(`/api/requests?${usp.toString()}`);

    // 1) массив элементов
    if (Array.isArray(data)) {
        const arr = data as RequestItem[];
        return {content: arr, totalPages: null, number: 0, size: arr.length};
    }

    // 2) стандартная страница Spring Data { content, totalPages, number, size }
    if (isPageResponse<RequestItem>(data)) {
        return {
            content: data.content,
            totalPages: typeof data.totalPages === "number" ? data.totalPages : null,
            number: typeof data.number === "number" ? data.number : 0,
            size: typeof data.size === "number" ? data.size : data.content.length,
        };
    }

    // 3) HAL: { _embedded: { <collectionName>: [...] }, page?: {...} }
    if (isHalResponse<RequestItem>(data)) {
        const emb = data._embedded ?? {};
        const firstKey = (Object.keys(emb)[0] ?? "") as keyof typeof emb | "";
        const arr: RequestItem[] = firstKey ? (emb[firstKey] ?? []) : [];
        const p = data.page;

        return {
            content: arr,
            totalPages: typeof p?.totalPages === "number" ? p.totalPages : null,
            number: typeof p?.number === "number" ? p.number : 0,
            size: typeof p?.size === "number" ? p.size : arr.length,
        };
    }

    // fallback
    return {content: [], totalPages: null, number: 0, size: 0};
}

/* ---------- остальное (создание/обновление/удаление) без изменений ---------- */

export async function createRequest(body: {
    name: string;
    email?: string;
    phone?: string;
    subject?: string;
    message: string;
}): Promise<RequestItem> {
    return apiFetch<RequestItem>("/api/requests", {method: "POST", body, auth: false});
}

export async function updateRequestStatus(id: number, status: RequestStatus): Promise<RequestItem> {
    return apiFetch<RequestItem>(`/api/requests/${id}/status`, {method: "PATCH", body: {status}});
}

export async function deleteRequest(id: number): Promise<void> {
    await apiFetch<void>(`/api/requests/${id}`, {method: "DELETE"});
}