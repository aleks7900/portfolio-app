import {useEffect, useMemo, useRef, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "../../components/ui/card";
import {Input} from "../../components/ui/input";
import {Button} from "../../components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select";
import {Alert, AlertDescription} from "../../components/ui/alert";
import {Skeleton} from "../../components/ui/skeleton";
import {Download, RefreshCw, ChevronLeft, ChevronRight, ArrowUpDown} from "lucide-react";
import {apiFetch, API_BASE} from "../../shared/api/api";
import {useI18n} from "../../shared/i18n/i18n.tsx";

type UsersSummary = {
    totalUsers: number;
    active7d: number;
    active30d: number;
    newToday: number;
    avgSessionDurationSec: number;
};

type UserRow = {
    userId: string;
    firstSeen: string;  // ISO
    lastSeen: string;   // ISO
    sessions: number;
    views: number;
    avgSessionDurationSec: number;
    bounceRate: number; // 0..1
};

type UsersListResponse = {
    items: UserRow[];
    total: number;
    page: number;
    size: number;
};

type SortKey = "lastSeen" | "sessions" | "views" | "avgSessionDurationSec" | "bounceRate";

function qs(obj: Record<string, any>) {
    const p = new URLSearchParams();
    Object.entries(obj).forEach(([k, v]) => {
        if (v !== undefined && v !== null && String(v).trim() !== "") p.set(k, String(v));
    });
    return p.toString();
}

async function getJSON<T>(url: string, signal?: AbortSignal): Promise<T> {
    const r = await apiFetch(url, { signal });

    // Если это Response — проверим статус и распарсим JSON
    if (r && typeof r === "object" && "ok" in (r as any) && typeof (r as any).json === "function") {
        const res = r as Response;
        if (!res.ok) throw new Error(`${res.status} ${res.statusText || ""}`.trim());
        return (await res.json()) as T;
    }
    // Иначе apiFetch уже вернул JSON
    return r as T;
}

export default function UsersPage() {
    const {t} = useI18n();
    const tf = (k: string, fb: string) => { const v = t(k); return v === k || !v ? fb : v; };

    const tz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC", []);
    const [from, setFrom] = useState<string>("");   // YYYY-MM-DD
    const [to, setTo] = useState<string>("");
    const [q, setQ] = useState<string>("");         // поиск по userId/email и т.п.

    const [sortKey, setSortKey] = useState<SortKey>("lastSeen");
    const [sortDir, setSortDir] = useState<"asc"|"desc">("desc");
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(20);

    const [summary, setSummary] = useState<UsersSummary | null>(null);
    const [list, setList] = useState<UsersListResponse | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
    const abortRef = useRef<AbortController|null>(null);

    const numberFmt = useMemo(() => new Intl.NumberFormat(undefined, {maximumFractionDigits: 0}), []);
    const pctFmt = useMemo(() => new Intl.NumberFormat(undefined, {style: "percent", maximumFractionDigits: 1}), []);
    const durFmt = (sec: number) => {
        if (!Number.isFinite(sec)) return "-";
        const s = Math.floor(sec);
        const h = Math.floor(s/3600);
        const m = Math.floor((s%3600)/60);
        const r = s%60;
        return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}`;
    };

    const params = {from, to, tz, q, sort: sortKey, dir: sortDir, page, size};

    async function loadAll() {
        setLoading(true); setError(null);
        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController(); abortRef.current = controller;
        try {
            const [sum, lst] = await Promise.all([
                getJSON<UsersSummary>(`${API_BASE}/users/summary?${qs({from,to,tz})}`, controller.signal),
                getJSON<UsersListResponse>(`${API_BASE}/users/list?${qs(params)}`, controller.signal),
            ]);
            setSummary(sum); setList(lst);
        } catch (e:any) {
            if (e?.name !== "AbortError") setError(e?.message || String(e));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { loadAll(); /* eslint-disable-next-line */ }, [tz]);
    const applyFilters = () => { setPage(0); loadAll(); };

    const onExportCSV = async () => {
        try {
            const all = await getJSON<UsersListResponse>(`${API_BASE}/users/list?${qs({...params, page:0, size:10000})}`);
            const headers = ["userId","firstSeen","lastSeen","sessions","views","avgSessionDurationSec","bounceRate"];
            const rows = all.items.map(x => ({
                userId: x.userId,
                firstSeen: x.firstSeen,
                lastSeen: x.lastSeen,
                sessions: x.sessions,
                views: x.views,
                avgSessionDurationSec: x.avgSessionDurationSec,
                bounceRate: x.bounceRate
            }));
            const csv = [headers.join(","), ...rows.map(r => headers.map(h => JSON.stringify((r as any)[h] ?? "")).join(","))].join("\n");
            const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = `users_${from||"from"}_${to||"to"}.csv`;
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (e) {
            console.error(e);
        }
    };

    const toggleSort = (key: SortKey) => {
        if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
        else { setSortKey(key); setSortDir("desc"); }
    };

    const canPrev = (list?.page ?? 0) > 0;
    const canNext = list ? ((list.page+1) * list.size < list.total) : false;

    return (
        <div className="mx-auto w-full max-w-7xl p-4 mt-20 md:p-6 space-y-6">
            {/* Header & Filters */}
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{tf("users_title","Пользователи")}</h1>
                    <p className="text-sm text-muted-foreground">TZ: {tz}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder={tf("users_searchPlaceholder","Поиск по userId/email")} className="w-56" />
                    <Input type="date" value={from} onChange={(e)=>setFrom(e.target.value)} className="w-36" title="from" />
                    <Input type="date" value={to} onChange={(e)=>setTo(e.target.value)} className="w-36" title="to" />
                    <Select value={String(size)} onValueChange={(v)=>setSize(Number(v))}>
                        <SelectTrigger className="w-28 dark:text-black"><SelectValue placeholder="20 / стр."/></SelectTrigger>
                        <SelectContent className="dark:bg-gray-600">
                            {[10,20,50,100].map(n => <SelectItem key={n} value={String(n)}>{n} / стр.</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Button onClick={applyFilters} variant="secondary" className="gap-2 dark:text-black">
                        <RefreshCw className="h-4 w-4"/>{tf("users_apply","Применить")}
                    </Button>
                    <Button onClick={onExportCSV} variant="outline" className="gap-2 dark:text-black">
                        <Download className="h-4 w-4"/>{tf("users_exportCsv","Экспорт CSV")}
                    </Button>
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {loading && !summary ? (
                    Array.from({length:5}).map((_,i)=>(
                        <Card key={i} className="dark:bg-zinc-800">
                            <CardHeader className="pb-2"><Skeleton className="h-4 w-28"/></CardHeader>
                            <CardContent><Skeleton className="h-8 w-20"/></CardContent>
                        </Card>
                    ))
                ) : summary ? (
                    <>
                        <Card className="dark:bg-zinc-800"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{tf("users_total","Всего пользователей")}</CardTitle></CardHeader><CardContent className="pt-0"><div className="text-2xl font-bold">{numberFmt.format(summary.totalUsers)}</div></CardContent></Card>
                        <Card className="dark:bg-zinc-800"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{tf("users_active7d","Активные 7д")}</CardTitle></CardHeader><CardContent className="pt-0"><div className="text-2xl font-bold">{numberFmt.format(summary.active7d)}</div></CardContent></Card>
                        <Card className="dark:bg-zinc-800"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{tf("users_active30d","Активные 30д")}</CardTitle></CardHeader><CardContent className="pt-0"><div className="text-2xl font-bold">{numberFmt.format(summary.active30d)}</div></CardContent></Card>
                        <Card className="dark:bg-zinc-800"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{tf("users_newToday","Новые сегодня")}</CardTitle></CardHeader><CardContent className="pt-0"><div className="text-2xl font-bold">{numberFmt.format(summary.newToday)}</div></CardContent></Card>
                        <Card className="dark:bg-zinc-800"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{tf("users_avgDuration","Средняя длительность")}</CardTitle></CardHeader><CardContent className="pt-0"><div className="text-2xl font-bold">{durFmt(summary.avgSessionDurationSec)}</div></CardContent></Card>
                    </>
                ) : error ? (
                    <div className="col-span-full">
                        <Alert variant="destructive"><AlertDescription>{tf("users_error","Ошибка загрузки")}: {error}</AlertDescription></Alert>
                    </div>
                ) : null}
            </div>

            {/* Table */}
            <Card className="overflow-hidden dark:bg-zinc-800">
                <CardHeader className="pb-2"><CardTitle className="text-base text-muted-foreground">{tf("users_tableTitle","Список пользователей")}</CardTitle></CardHeader>
                <CardContent>
                    {loading && !list ? (
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-64"/><Skeleton className="h-40 w-full"/>
                        </div>
                    ) : error ? (
                        <Alert variant="destructive"><AlertDescription>{tf("users_error","Ошибка загрузки")}: {error}</AlertDescription></Alert>
                    ) : !list || list.items.length === 0 ? (
                        <div className="text-sm text-muted-foreground py-8">{tf("users_empty","Нет данных")}</div>
                    ) : (
                        <>
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="text-left text-muted-foreground border-b">
                                    <th className="py-2 px-2">{tf("users_user","Пользователь")}</th>
                                    <th className="py-2 px-2 cursor-pointer select-none" onClick={()=>toggleSort("lastSeen")}>
                                        {tf("users_lastSeen","Последний визит")} <ArrowUpDown className="inline h-4 w-4 ml-1"/>
                                    </th>
                                    <th className="py-2 px-2 cursor-pointer select-none text-right" onClick={()=>toggleSort("sessions")}>
                                        {tf("users_sessions","Сессии")} <ArrowUpDown className="inline h-4 w-4 ml-1"/>
                                    </th>
                                    <th className="py-2 px-2 cursor-pointer select-none text-right" onClick={()=>toggleSort("views")}>
                                        {tf("users_views","Просмотры")} <ArrowUpDown className="inline h-4 w-4 ml-1"/>
                                    </th>
                                    <th className="py-2 px-2 cursor-pointer select-none text-right" onClick={()=>toggleSort("avgSessionDurationSec")}>
                                        {tf("users_avgDur","Средн. длит.")} <ArrowUpDown className="inline h-4 w-4 ml-1"/>
                                    </th>
                                    <th className="py-2 px-2 cursor-pointer select-none text-right" onClick={()=>toggleSort("bounceRate")}>
                                        {tf("users_bounce","Bounce")} <ArrowUpDown className="inline h-4 w-4 ml-1"/>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {list.items.map(u => (
                                    <tr key={u.userId} className="border-b last:border-0 hover:bg-muted/30">
                                        <td className="py-2 px-2 font-mono text-xs">{u.userId}</td>
                                        <td className="py-2 px-2">{new Date(u.lastSeen).toLocaleString()}</td>
                                        <td className="py-2 px-2 text-right">{numberFmt.format(u.sessions)}</td>
                                        <td className="py-2 px-2 text-right">{numberFmt.format(u.views)}</td>
                                        <td className="py-2 px-2 text-right">{durFmt(u.avgSessionDurationSec)}</td>
                                        <td className="py-2 px-2 text-right">{pctFmt.format(u.bounceRate ?? 0)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-xs text-muted-foreground">
                                    {tf("users_totalRows","Всего записей")}: {numberFmt.format(list.total)}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" onClick={()=>{setPage(p=>Math.max(0,p-1)); loadAll();}} disabled={!canPrev} className="dark:text-black">
                                        <ChevronLeft className="h-4 w-4"/>{tf("users_prev","Назад")}
                                    </Button>
                                    <div className="text-sm">{list.page+1} / {Math.max(1, Math.ceil(list.total / list.size))}</div>
                                    <Button variant="outline" size="sm" onClick={()=>{setPage(p=>p+1); loadAll();}} disabled={!canNext} className="dark:text-black">
                                        {tf("users_next","Вперёд")}<ChevronRight className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            <p className="text-xs text-muted-foreground">
                {tf("users_hint","Подсказка: фильтруй по дате и строке поиска. Сортируй кликом по заголовку.")}
            </p>
        </div>
    );
}
