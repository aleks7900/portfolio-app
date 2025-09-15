import React, { useEffect, useState } from "react";
import {
    deleteRequest,
    listRequests,
    type RequestItem,
    type RequestStatus,
    updateRequestStatus
} from "../../shared/api/requestsRepo";
import Container from "../../shared/Container.tsx";


export default function RequestsPage() {
    const [q, setQ] = useState("");
    const [status, setStatus] = useState<RequestStatus | "">("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [items, setItems] = useState<RequestItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    async function load() {
        setLoading(true); setErr(null);
        try {
            const res = await listRequests({ q, status, page, size });
            setItems(res.content);
            setTotalPages(res.totalPages);
            setPage(res.number);
            setSize(res.size);
        } catch (e: unknown) {
            setErr(e instanceof Error ? e.message : "Ошибка загрузки");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, [q, status, page, size]);

    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <Container>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Заявки</h2>
                    <div className="ml-auto flex gap-2">
                        <input
                            value={q}
                            onChange={(e) => { setPage(0); setQ(e.currentTarget.value); }}
                            placeholder="Поиск (имя, email, телефон, текст)"
                            className="w-64 rounded-xl border px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                        />
                        <select
                            value={status}
                            onChange={(e) => { setPage(0); setStatus(e.currentTarget.value as any); }}
                            className="rounded-xl border px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                        >
                            <option value="">Все статусы</option>
                            <option value="NEW">NEW</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                    </div>
                </div>

                {err && <div className="mb-4 rounded-xl bg-rose-50 p-3 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200">{err}</div>}

                <div className="overflow-x-auto rounded-2xl border dark:border-white/10">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-white/5">
                        <tr>
                            <Th>ID</Th><Th>Дата</Th><Th>Имя</Th><Th>Контакты</Th><Th>Тема</Th><Th>Сообщение</Th><Th>Статус</Th><Th className="text-right">Действия</Th>
                        </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-white/10">
                        {loading ? (
                            <tr><Td colSpan={8} className="py-10 text-center">Загрузка…</Td></tr>
                        ) : items.length === 0 ? (
                            <tr><Td colSpan={8} className="py-10 text-center">Пусто</Td></tr>
                        ) : items.map((r) => (
                            <tr key={r.id} className="align-top">
                                <Td className="whitespace-nowrap">{r.id}</Td>
                                <Td className="whitespace-nowrap">{new Date(r.createdAt).toLocaleString()}</Td>
                                <Td>{r.name}</Td>
                                <Td>
                                    {r.email && <div className="text-xs">{r.email}</div>}
                                    {r.phone && <div className="text-xs">{r.phone}</div>}
                                </Td>
                                <Td className="max-w-[220px] truncate">{r.subject || "—"}</Td>
                                <Td className="max-w-[360px]">
                                    <div className="line-clamp-3">{r.message}</div>
                                </Td>
                                <Td>
                                    <select
                                        value={r.status}
                                        onChange={async (e) => {
                                            const s = e.currentTarget.value as RequestStatus;
                                            await updateRequestStatus(r.id, s);
                                            load();
                                        }}
                                        className="rounded-lg border px-2 py-1 text-xs dark:border-white/20 dark:bg-black"
                                    >
                                        <option>NEW</option>
                                        <option>IN_PROGRESS</option>
                                        <option>DONE</option>
                                    </select>
                                </Td>
                                <Td className="text-right">
                                    <button
                                        onClick={async () => { await deleteRequest(r.id); load(); }}
                                        className="rounded-lg border px-3 py-1.5 text-xs hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                                    >
                                        Удалить
                                    </button>
                                </Td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex items-center justify-end gap-3">
                    <label className="flex items-center gap-2 text-sm">
                        по:
                        <select
                            value={size}
                            onChange={(e) => { setPage(0); setSize(Number(e.currentTarget.value)); }}
                            className="rounded-lg border px-2 py-1 text-sm dark:border-white/20 dark:bg-black"
                        >
                            {[10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </label>
                    {totalPages != null && totalPages > 1 && (
                        <>
                            <button onClick={() => setPage((p) => Math.max(0, p - 1))}
                                    disabled={page <= 0}
                                    className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50 dark:border-white/20">◀</button>
                            <span className="tabular-nums text-sm">{page + 1} / {totalPages}</span>
                            <button onClick={() => setPage((p) => totalPages != null ? Math.min(totalPages - 1, p + 1) : p)}
                                    disabled={totalPages != null ? page >= totalPages - 1 : true}
                                    className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50 dark:border-white/20">▶</button>
                        </>
                    )}
                </div>
            </Container>
        </section>
    );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${className}`}>{children}</th>;
}
function Td({ children, className = "", colSpan }: { children: React.ReactNode; className?: string; colSpan?: number }) {
    return <td colSpan={colSpan} className={`px-4 py-3 ${className}`}>{children}</td>;
}
