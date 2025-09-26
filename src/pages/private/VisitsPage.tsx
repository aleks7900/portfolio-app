import {type SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "../../components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select";
import {Button} from "../../components/ui/button";
import {Input} from "../../components/ui/input";
import {Alert, AlertDescription} from "../../components/ui/alert";
import {Download, RefreshCw} from "lucide-react";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import {Skeleton} from "../../components/ui/skeleton.tsx";
import {BASE_URL} from "../../shared/api/api.ts";

type Period = "day" | "month" | "year";

type VisitPoint = {
    label: string;
    count: number;
};
type VisitsResponse = VisitPoint[];

// CSV export
function exportToCSV(filename: string, rows: VisitPoint[]) {
    const headers = ["label", "count"];
    const csv = [headers.join(","), ...rows.map((r) => `${JSON.stringify(r.label)},${r.count}`)].join("\n");
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

export default function VisitsPage() {
    const {t} = useI18n();

    const tf = (key: string, fallback: string) => {
        const v = t(key);
        return v === key || !v ? fallback : v;
    };

    const [period, setPeriod] = useState<Period>("day");
    const [pathFilter, setPathFilter] = useState<string>("");
    // Новые поля под /visits: from, to (ISO YYYY-MM-DD) и tz
    const [from, setFrom] = useState<string>(""); // пример: "2025-09-01"
    const [to, setTo] = useState<string>("");     // пример: "2025-09-26"
    const tz = useMemo(
        () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
        []
    );

    const [data, setData] = useState<VisitPoint[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    const numberFmt = useMemo(() => new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}), []);
    const total = useMemo(
        () => data.reduce((acc, d) => acc + (Number.isFinite(d.count) ? d.count : 0), 0),
        [data]
    );

    const subtitle = useMemo(() => {
        const map: Record<Period, string> = {
            day: tf("visits_subtitle_day", "Сумма по дням"),
            month: tf("visits_subtitle_month", "Сумма по месяцам"),
            year: tf("visits_subtitle_year", "Сумма по годам"),
        };
        return map[period];
    }, [period, tf]);

    // Собираем URL с поддержкой period, path, from, to, tz
    function buildUrl(): string {
        const params = new URLSearchParams();
        params.set("period", period);
        if (pathFilter.trim()) params.set("path", pathFilter.trim());
        if (from.trim()) params.set("from", from.trim()); // формат ISO: YYYY-MM-DD
        if (to.trim()) params.set("to", to.trim());       // формат ISO: YYYY-MM-DD
        params.set("tz", tz);
        return `${BASE_URL}/api/analytics/visits?${params.toString()}`;
    }

    async function fetchData() {
        setLoading(true);
        setError(null);

        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const res = await fetch(buildUrl(), {signal: controller.signal});
            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
            const json: VisitsResponse = await res.json();
            setData(Array.isArray(json) ? json : []);
        } catch (e: unknown) {
            if ((e as any)?.name === "AbortError") return;
            setError(e instanceof Error ? e.message : String(e));
            setData([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [period, tz]); // path/from/to применяем вручную кнопкой

    const applyFilters = () => fetchData();

    const onExport = () => {
        const filenameParts = ["visits", period];
        if (pathFilter.trim()) filenameParts.push(pathFilter.replaceAll("/", "_"));
        if (from.trim() || to.trim()) filenameParts.push(`${from || "from"}_${to || "to"}`);
        exportToCSV(`${filenameParts.join("_")}.csv`, data);
    };

    return (
        <div className="mx-auto w-full max-w-7xl p-4 mt-20 md:p-6 space-y-6 ">
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
                        <SelectContent className=" dark:bg-gray-600" >
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
                        {/* Диапазон дат (опционально) */}
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
                        <Button onClick={onExport} variant="outline" className="gap-2 dark:text-black">
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
                                    <Tooltip formatter={(value: any) => numberFmt.format(Number(value))}
                                             labelClassName="font-medium"/>
                                    <Bar dataKey="count" radius={[6, 6, 0, 0]}/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
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
