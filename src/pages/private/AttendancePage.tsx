import {useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import {format} from "date-fns";
import {apiFetch, API_BASE} from "../../shared/api/api.ts"; // если используете RRv6


type MetaJson = {
    event?: string;
    type?: string;
    name?: string;
    path?: string;
    url?: string;
    route?: string;
    // можно хранить и другие поля, но без any:
    [key: string]: unknown;
};

type AnalyticsEvent = {
    id: number;
    sessionId: string | null;
    ip: string | null;
    userAgent: string | null;
    metaJson: MetaJson | null;   // ← никаких any
    createdAt: string; // ISO
};

type Page<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number; // current page
    size: number;
};

const isString = (v: unknown): v is string => typeof v === "string" && v.length > 0;

const getEventName = (m: MetaJson | null | undefined): string => {
    if (!m) return "";
    const cand = m.event ?? m.type ?? m.name;
    return isString(cand) ? cand : "";
};

const getPathFromMeta = (m: MetaJson | null | undefined): string => {
    if (!m) return "";
    const cand = m.path ?? m.url ?? m.route;
    return isString(cand) ? cand : "";
};

type SortState = { field: string; dir: "asc" | "desc" };

const sortableColumns: Array<{ key: keyof AnalyticsEvent | "meta.event" | "meta.path"; labelKey: string }> = [
    {key: "createdAt", labelKey: "attendance_col_createdAt"},
    {key: "sessionId", labelKey: "attendance_col_sessionId"},
    {key: "ip", labelKey: "attendance_col_ip"},
    {key: "userAgent", labelKey: "attendance_col_userAgent"},
    // отображаемые поля из metaJson (если есть):
    {key: "meta.event", labelKey: "attendance_col_event"},
    {key: "meta.path", labelKey: "attendance_col_path"},
];

export default function AttendancePage() {
    const {t} = useI18n();
    const [sp, setSp] = useSearchParams();
    const [data, setData] = useState<Page<AnalyticsEvent> | null>(null);
    const [loading, setLoading] = useState(false);

    const page = Number(sp.get("page") ?? 0);
    const size = Number(sp.get("size") ?? 20);
    const q = sp.get("q") ?? "";
    const from = sp.get("from") ?? "";
    const to = sp.get("to") ?? "";
    const sortParam = sp.get("sort") ?? "createdAt,desc";

    const sort: SortState = useMemo(() => {
        const [field, dir = "desc"] = sortParam.split(",");
        return {field, dir: dir.toLowerCase() === "asc" ? "asc" : "desc"};
    }, [sortParam]);

    useEffect(() => {
        const controller = new AbortController();
        const url = new URL(API_BASE + "/api/analytics/events", window.location.origin);
        url.searchParams.set("page", String(page));
        url.searchParams.set("size", String(size));
        url.searchParams.set("sort", sortParam);
        if (q) url.searchParams.set("q", q);
        if (from) url.searchParams.set("from", from);
        if (to) url.searchParams.set("to", to);

        setLoading(true);
        apiFetch(url.toString(), { signal: controller.signal })
            .then((r) => {
                // Response или уже JSON?
                if (r && typeof r === "object" && "ok" in (r as any) && typeof (r as any).json === "function") {
                    const res = r as Response;
                    if (!res.ok) throw new Error(`${res.status} ${res.statusText || ""}`.trim());
                    return res.json() as Promise<Page<AnalyticsEvent>>;
                }
                return Promise.resolve(r as Page<AnalyticsEvent>);
            })
            .then((json) => setData(json))
            .catch((e: unknown) => {
                if (e && typeof e === "object" && "name" in (e as any) && (e as any).name === "AbortError") return;
                setData({ content: [], totalElements: 0, totalPages: 0,number: 0, size: 0 });
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [page, size, q, from, to, sortParam]);

    const applySP = (patch: Record<string, string | number | null>) => {
        const next = new URLSearchParams(sp);
        Object.entries(patch).forEach(([k, v]) => {
            if (v === null || v === "") next.delete(k);
            else next.set(k, String(v));
        });
        setSp(next, {replace: true});
    };

    const toggleSort = (field: string) => {
        const nextDir = sort.field === field && sort.dir === "desc" ? "asc" : "desc";
        applySP({sort: `${field},${nextDir}`, page: 0});
    };

    const changePage = (p: number) => applySP({page: Math.max(0, p)});

    return (
        <div className="mx-auto max-w-7xl mt-20 px-4 py-6">
            <div className="mb-4 flex items-center justify-between gap-4">
                <h1 className="text-2xl font-semibold tracking-tight">{t("attendance_title")}</h1>
            </div>

            {/* Фильтры */}
            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <input
                    className="w-full rounded-xl border border-gray-200 bg-white/60 px-3 py-2 text-sm shadow-sm outline-none transition hover:border-gray-300 focus:border-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    placeholder={t("attendance_search_placeholder")}
                    value={q}
                    onChange={(e) => applySP({q: e.target.value, page: 0})}
                />
                <input
                    type="datetime-local"
                    className="w-full rounded-xl border border-gray-200 bg-white/60 px-3 py-2 text-sm shadow-sm outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                    value={from}
                    onChange={(e) => applySP({from: e.target.value || null, page: 0})}
                />
                <input
                    type="datetime-local"
                    className="w-full rounded-xl border border-gray-200 bg-white/60 px-3 py-2 text-sm shadow-sm outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                    value={to}
                    onChange={(e) => applySP({to: e.target.value || null, page: 0})}
                />
                <select
                    className="w-full rounded-xl border border-gray-200 bg-white/60 px-3 py-2 text-sm shadow-sm outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                    value={size}
                    onChange={(e) => applySP({size: e.target.value, page: 0})}
                >
                    {[10, 20, 50, 100].map(s => <option key={s}
                                                        value={s}>{t("attendance_pageSize", {count: s})}</option>)}
                </select>
            </div>

            {/* Таблица */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm dark:border-white/10">
                <div className="overflow-auto">
                    <table className="min-w-full border-collapse text-sm">
                        <thead className="sticky top-0 z-10 bg-gray-50/90 backdrop-blur-sm dark:bg-white/5">
                        <tr>
                            {sortableColumns.map(col => (
                                <th
                                    key={col.key as string}
                                    onClick={() => toggleSort(col.key as string)}
                                    className="select-none whitespace-nowrap px-4 py-3 text-left font-medium text-gray-600 transition hover:cursor-pointer hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                                >
                                    <span className="inline-flex items-center gap-1">
                                      {t(col.labelKey)}
                                        {sort.field === col.key && (
                                            <span className="text-xs">{sort.dir === "asc" ? "▲" : "▼"}</span>
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                        {loading && (
                            <tr>
                                <td className="px-4 py-6 text-center text-gray-500 dark:text-gray-300"
                                    colSpan={sortableColumns.length}>
                                    {t("attendance_loading")}
                                </td>
                            </tr>
                        )}
                        {!loading && data?.content?.length === 0 && (
                            <tr>
                                <td className="px-4 py-6 text-center text-gray-500 dark:text-gray-300"
                                    colSpan={sortableColumns.length}>
                                    {t("attendance_empty")}
                                </td>
                            </tr>
                        )}
                        {!loading && data?.content?.map(ev => {
                            const eventName =
                                getEventName(ev.metaJson) || "—";
                            const path =
                                getPathFromMeta(ev.metaJson) || "—";
                            return (
                                <tr
                                    key={ev.id}
                                    className="bg-white/60 transition hover:bg-white/80 even:bg-gray-50/50 dark:bg-white/5 dark:hover:bg-white/10 dark:even:bg-white/[0.04]"
                                >
                                    <td className="whitespace-nowrap px-4 py-3">
                                        {format(new Date(ev.createdAt), "yyyy-MM-dd HH:mm:ss")}
                                    </td>
                                    <td className="max-w-[240px] truncate px-4 py-3 font-mono text-xs text-gray-700 dark:text-gray-200">
                                        {ev.sessionId || "—"}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">{ev.ip || "—"}</td>
                                    <td className="max-w-[360px] truncate px-4 py-3 text-gray-600 dark:text-gray-300"
                                        title={ev.userAgent || ""}>
                                        {ev.userAgent || "—"}
                                    </td>
                                    <td className="max-w-[240px] truncate px-4 py-3" title={eventName}>
                                        {eventName || "—"}
                                    </td>
                                    <td className="max-w-[320px] truncate px-4 py-3" title={path}>
                                        {path || "—"}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                {/* Пагинация */}
                {!loading && data && (
                    <div
                        className="flex items-center justify-between gap-4 border-t border-gray-200 bg-gray-50/60 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5">
                        <div className="text-gray-600 dark:text-gray-300">
                            {t("attendance_pagination_info", {
                                from: data.number * data.size + 1,
                                to: data.number * data.size + data.content.length,
                                total: data.totalElements,
                            })}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                className="rounded-xl border border-gray-200 px-3 py-1.5 text-black transition hover:bg-white dark:border-white/10 dark:hover:bg-white/10"
                                disabled={data.number === 0}
                                onClick={() => changePage(0)}
                            >
                                « {t("attendance_first")}
                            </button>
                            <button
                                className="rounded-xl border border-gray-200 px-3 py-1.5 text-black transition hover:bg-white disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/10"
                                disabled={data.number === 0}
                                onClick={() => changePage(data.number - 1)}
                            >
                                {t("attendance_prev")}
                            </button>
                            <span className="px-2 text-gray-600 dark:text-gray-300">
                            {t("attendance_page_of", {page: data.number + 1, total: data.totalPages})}
                          </span>
                            <button
                                className="rounded-xl border border-gray-200 px-3 py-1.5 text-black transition hover:bg-white disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/10"
                                disabled={data.number + 1 >= data.totalPages}
                                onClick={() => changePage(data.number + 1)}
                            >
                                {t("attendance_next")}
                            </button>
                            <button
                                className="rounded-xl border border-gray-200 px-3 py-1.5 text-black transition hover:bg-white disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/10"
                                disabled={data.number + 1 >= data.totalPages}
                                onClick={() => changePage(data.totalPages - 1)}
                            >
                                {t("attendance_last")} »
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}