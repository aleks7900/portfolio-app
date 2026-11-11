import {type SetStateAction, useCallback, useEffect, useMemo, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "../../components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select";
import {Button} from "../../components/ui/button";
import {Input} from "../../components/ui/input";
import {Alert, AlertDescription} from "../../components/ui/alert";
import {Download, RefreshCw} from "lucide-react";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import {Skeleton} from "../../components/ui/skeleton.tsx";
import {API_BASE, apiFetch} from "../../shared/api/api.ts";
import SEO from "../../shared/SEO.tsx";

type Period = "day" | "month" | "year";

type VisitPoint = { label: string; count: number };

// NEW: Top paths DTO
type TopPath = { path: string; count: number };

function exportToCSV(filename: string, rows: { [k: string]: unknown }[], headers?: string[]) {
    const keys = headers ?? Object.keys(rows[0] ?? {});
    const csv = [keys.join(","), ...rows.map((r) => keys.map((k) => JSON.stringify(r[k] ?? "")).join(","))].join("\n");
    const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Fetches an analytics JSON array for `url`. Bumping `reloadTick` refetches the same URL.
 * loading/error are derived from whether the response for the current request has arrived.
 */
function useAnalyticsQuery<T>(url: string, reloadTick: number) {
    const key = `${reloadTick}|${url}`;
    const [state, setState] = useState<{ key: string; data: T[]; error: string | null } | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        apiFetch(url, {signal: controller.signal})
            .then(async (r) => {
                if (r instanceof Response) {
                    if (!r.ok) throw new Error(`${r.status} ${r.statusText || ""}`.trim());
                    return (await r.json()) as unknown;
                }
                return r as unknown; // apiFetch уже вернул JSON
            })
            .then((json) => setState({key, data: Array.isArray(json) ? (json as T[]) : [], error: null}))
            .catch((e: unknown) => {
                if (e instanceof Error && e.name === "AbortError") return;
                const msg = e instanceof Error && e.message ? e.message : "Неизвестная ошибка";
                setState({key, data: [], error: msg});
            });
        return () => controller.abort();
    }, [url, key]);

    return {
        data: state?.data ?? [],
        loading: state?.key !== key,
        error: state?.key === key ? state.error : null,
    };
}

export default function VisitsPage() {
    const {t} = useI18n();

    const tf = useCallback((key: string, fallback: string) => {
        const v = t(key);
        return v === key || !v ? fallback : v;
    }, [t]);

    const [period, setPeriod] = useState<Period>("day");
    const [pathFilter, setPathFilter] = useState<string>("");
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const tz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC", []);

    // Filters (path/from/to) are applied explicitly via the button; period/tz changes reload immediately
    const [applied, setApplied] = useState({pathFilter: "", from: "", to: "", tick: 0});

    // --- URLs builders
    const chartUrl = useMemo(() => {
        const params = new URLSearchParams();
        params.set("period", period);
        if (applied.pathFilter.trim()) params.set("path", applied.pathFilter.trim());
        if (applied.from.trim()) params.set("from", applied.from.trim());
        if (applied.to.trim()) params.set("to", applied.to.trim());
        params.set("tz", tz);
        return `${API_BASE}/analytics/visits?${params.toString()}`;
    }, [period, applied, tz]);

    const topUrl = useMemo(() => {
        const params = new URLSearchParams();
        if (applied.pathFilter.trim()) params.set("path", applied.pathFilter.trim()); // префикс-фильтр
        if (applied.from.trim()) params.set("from", applied.from.trim());
        if (applied.to.trim()) params.set("to", applied.to.trim());
        params.set("tz", tz);
        params.set("limit", "20");
        return `${API_BASE}/analytics/top-paths?${params.toString()}`;
    }, [applied, tz]);

    // Chart data
    const {data, loading, error} = useAnalyticsQuery<VisitPoint>(chartUrl, applied.tick);

    // Top paths data
    const {data: topData, loading: topLoading, error: topError} = useAnalyticsQuery<TopPath>(topUrl, applied.tick);

    const numberFmt = useMemo(() => new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}), []);
    const total = useMemo(() => data.reduce((acc, d) => acc + (Number.isFinite(d.count) ? d.count : 0), 0), [data]);

    const subtitle = useMemo(() => {
        const map: Record<Period, string> = {
            day: tf("visits_subtitle_day", "Сумма по дням"),
            month: tf("visits_subtitle_month", "Сумма по месяцам"),
            year: tf("visits_subtitle_year", "Сумма по годам"),
        };
        return map[period];
    }, [period, tf]);

    // Применение фильтров вручную — одновременно грузим график и топ
    const applyFilters = () => {
        setApplied((prev) => ({pathFilter, from, to, tick: prev.tick + 1}));
    };

    const onExportChart = () => {
        const filenameParts = ["visits_chart", period];
        if (pathFilter.trim()) filenameParts.push(pathFilter.replaceAll("/", "_"));
        if (from.trim() || to.trim()) filenameParts.push(`${from || "from"}_${to || "to"}`);
        exportToCSV(`${filenameParts.join("_")}.csv`, data, ["label", "count"]);
    };

    const onExportTop = () => {
        const filenameParts = ["visits_top20"];
        if (pathFilter.trim()) filenameParts.push(pathFilter.replaceAll("/", "_"));
        if (from.trim() || to.trim()) filenameParts.push(`${from || "from"}_${to || "to"}`);
        exportToCSV(`${filenameParts.join("_")}.csv`, topData, ["path", "count"]);
    };

    return (
        <div className="mx-auto w-full max-w-7xl p-4 mt-20 md:p-6 space-y-6 ">
            <SEO title="Admin | Visits" noindex />
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                        {tf("visits_title", "Посещаемость")}
                    </h1>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                    <p className="text-xs text-muted-foreground mt-1">TZ: {tz}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                    <Select value={period} onValueChange={(v: Period) => setPeriod(v)}>
                        <SelectTrigger className="w-44 dark:text-black">
                            <SelectValue placeholder={tf("visits_selectPeriod", "Выберите период")}/>
                        </SelectTrigger>
                        <SelectContent className=" dark:bg-gray-600">
                            <SelectItem value="day">{tf("visits_day", "По дням")}</SelectItem>
                            <SelectItem value="month">{tf("visits_month", "По месяцам")}</SelectItem>
                            <SelectItem value="year">{tf("visits_year", "По годам")}</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex items-center gap-2">
                        <Input
                            value={pathFilter}
                            onChange={(e: {
                                target: { value: SetStateAction<string> }
                            }) => setPathFilter(e.target.value)}
                            placeholder={tf("visits_pathPlaceholder", "Фильтр по пути, напр. /catalog")}
                            className="w-48"
                            spellCheck={false}
                        />
                        <Input
                            type="date"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="w-36"
                            placeholder="YYYY-MM-DD"
                            title="from"
                        />
                        <Input
                            type="date"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-36"
                            placeholder="YYYY-MM-DD"
                            title="to"
                        />

                        <Button onClick={applyFilters} variant="secondary" className="gap-2 dark:text-black">
                            <RefreshCw className="h-4 w-4"/>
                            {tf("visits_apply", "Применить")}
                        </Button>
                        <Button onClick={onExportChart} variant="outline" className="gap-2 dark:text-black">
                            <Download className="h-4 w-4"/>
                            {tf("visits_exportCsv", "Экспорт CSV")}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Totals */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="overflow-hidden dark:bg-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-muted-foreground">
                            {tf("visits_total", "Всего запросов")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl font-bold">{numberFmt.format(total)}</div>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden dark:bg-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-muted-foreground">
                            {tf("visits_points", "Точек на графике")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl font-bold">{numberFmt.format(data.length)}</div>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden dark:bg-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-muted-foreground">
                            {tf("visits_currentPeriod", "Текущий период")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl font-bold">
                            {period === "day" && tf("visits_period_day", "День")}
                            {period === "month" && tf("visits_period_month", "Месяц")}
                            {period === "year" && tf("visits_period_year", "Год")}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Chart */}
            <Card className="dark:bg-zinc-800">
                <CardHeader className="pb-2 ">
                    <CardTitle className="text-base text-muted-foreground">
                        {tf("visits_chartTitle", "График посещаемости")}
                    </CardTitle>
                </CardHeader>
                <CardContent className="dark:bg-gray-500">
                    {loading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-40"/>
                            <Skeleton className="h-72 w-full"/>
                        </div>
                    ) : error ? (
                        <Alert variant="destructive">
                            <AlertDescription>
                                {tf("visits_error", "Ошибка загрузки")}: {error}
                            </AlertDescription>
                        </Alert>
                    ) : data.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            {tf("visits_empty", "Нет данных за выбранный период")}
                        </div>
                    ) : (
                        <div className="h-[420px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data} barSize={28}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                    <XAxis dataKey="label" tickLine={false} axisLine={false}
                                           interval="preserveStartEnd"/>
                                    <YAxis allowDecimals={false} tickLine={false} axisLine={false}/>
                                    <Tooltip formatter={(value: unknown) => numberFmt.format(Number(value))}
                                             labelClassName="font-medium"/>
                                    <Bar dataKey="count" radius={[6, 6, 0, 0]}/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Top 20 URL paths */}
            <Card className="dark:bg-zinc-800">
                <CardHeader className="pb-2 flex items-center justify-between">
                    <CardTitle className="text-base text-muted-foreground">
                        {tf("visits_top20", "Топ-20 посещаемых URL")}
                    </CardTitle>
                    <Button onClick={onExportTop} variant="outline" className="gap-2 dark:text-black">
                        <Download className="h-4 w-4"/>
                        {tf("visits_exportCsv", "Экспорт CSV")}
                    </Button>
                </CardHeader>
                <CardContent>
                    {topLoading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-64"/>
                            <Skeleton className="h-32 w-full"/>
                        </div>
                    ) : topError ? (
                        <Alert variant="destructive">
                            <AlertDescription>
                                {tf("visits_error", "Ошибка загрузки")}: {topError}
                            </AlertDescription>
                        </Alert>
                    ) : topData.length === 0 ? (
                        <div className="text-muted-foreground text-sm">
                            {tf("visits_noTopUrls", "Нет данных")}
                        </div>
                    ) : (
                        <table className="w-full text-sm table-fixed">
                            <thead>
                            <tr className="text-left text-muted-foreground border-b">
                                <th className="py-1 px-2 w-12">#</th>
                                <th className="py-1 px-2 w-[80%]">{tf("visits_url", "URL")}</th>
                                <th className="py-1 px-2 text-right">{tf("visits_visits", "Посещения")}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {topData.map((u, i) => (
                                <tr key={u.path} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="py-1 px-2">{i + 1}</td>
                                    <td className="py-1 px-2 font-mono text-xs whitespace-pre-wrap break-words [overflow-wrap:anywhere]"
                                        title={u.path}>
                                        {u.path}
                                    </td>
                                    <td className="py-1 px-2 text-right">{numberFmt.format(u.count)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </CardContent>
            </Card>

            {/* Footer helper */}
            <p className="text-xs text-muted-foreground">
                {tf(
                    "visits_hint",
                    "Подсказка: можно указать диапазон дат (from/to) формата YYYY-MM-DD и фильтр по пути; таймзона отправляется автоматически."
                )}
            </p>
        </div>
    );
}
