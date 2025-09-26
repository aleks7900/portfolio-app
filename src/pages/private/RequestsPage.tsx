import React, {useEffect, useState} from "react";
import {
    deleteRequest,
    listRequests,
    type RequestItem,
    type RequestStatus,
    updateRequestStatus,
} from "../../shared/api/requestsRepo";
import Container from "../../shared/Container.tsx";
import useMediaQuery from "../../shared/theme/mediaQuery.tsx";
import {useI18n} from "../../shared/i18n/i18n.tsx";


export default function RequestsPage() {
    const {t} = useI18n();

    const [q, setQ] = useState("");
    const [status, setStatus] = useState<RequestStatus | "">("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [items, setItems] = useState<RequestItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    const isMobile = useMediaQuery("(max-width: 1024px)");

    async function load() {
        setLoading(true);
        setErr(null);
        try {
            const res = await listRequests({q, status, page, size});
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

    useEffect(() => {
        load();
    }, [q, status, page, size]);

    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <Container>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        {t("requests_title")}
                    </h2>
                    <div className="ml-auto flex gap-2">
                        <input
                            value={q}
                            onChange={(e) => {
                                setPage(0);
                                setQ(e.currentTarget.value);
                            }}
                            placeholder={t("requests_searchPlaceholder")}
                            className="w-64 rounded-xl border px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                        />
                        <select
                            value={status}
                            onChange={(e) => {
                                setPage(0);
                                setStatus(e.currentTarget.value as RequestStatus);
                            }}
                            className="rounded-xl border px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                        >
                            <option value="">{t("requests_statusAll")}</option>
                            <option value="NEW">{t("requests_statusNew")}</option>
                            <option value="IN_PROGRESS">{t("requests_statusInProgress")}</option>
                            <option value="DONE">{t("requests_statusDone")}</option>
                        </select>
                    </div>
                </div>

                {err && (
                    <div
                        className="mb-4 rounded-xl bg-rose-50 p-3 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200">
                        {err}
                    </div>
                )}

                {!isMobile ? (
                    <Container>
                        {/* ——— Desktop (таблица) ——— */}
                        <div className="overflow-x-auto rounded-2xl border dark:border-white/10 sm:block">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-white/5">
                                <tr>
                                    <Th>{t("requests_id")}</Th>
                                    <Th>{t("requests_date")}</Th>
                                    <Th>{t("requests_name")}</Th>
                                    <Th>{t("requests_contacts")}</Th>
                                    <Th>{t("requests_subject")}</Th>
                                    <Th>{t("requests_message")}</Th>
                                    <Th>{t("requests_statusAll").split(" ")[0]}</Th>
                                    <Th className="text-right">{t("requests_actions")}</Th>
                                </tr>
                                </thead>
                                <tbody className="divide-y dark:divide-white/10">
                                {loading ? (
                                    <tr>
                                        <Td colSpan={8} className="py-10 text-center">
                                            {t("requests_loading")}
                                        </Td>
                                    </tr>
                                ) : items.length === 0 ? (
                                    <tr>
                                        <Td colSpan={8} className="py-10 text-center">
                                            {t("requests_empty")}
                                        </Td>
                                    </tr>
                                ) : (
                                    items.map((r) => (
                                        <tr key={r.id} className="align-top">
                                            <Td className="whitespace-nowrap">#{r.id}</Td>
                                            <Td className="whitespace-nowrap">
                                                {new Date(r.createdAt).toLocaleString()}
                                            </Td>
                                            <Td>{r.name}</Td>
                                            <Td>
                                                {r.email && <div className="text-xs">{r.email}</div>}
                                                {r.phone && <div className="text-xs">{r.phone}</div>}
                                            </Td>
                                            <Td className="max-w-[220px] truncate">
                                                {r.subject || "—"}
                                            </Td>
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
                                                    <option value="NEW">{t("requests_statusNew")}</option>
                                                    <option value="IN_PROGRESS">
                                                        {t("requests_statusInProgress")}
                                                    </option>
                                                    <option value="DONE">{t("requests_statusDone")}</option>
                                                </select>
                                            </Td>
                                            <Td className="text-right">
                                                <button
                                                    onClick={async () => {
                                                        await deleteRequest(r.id);
                                                        load();
                                                    }}
                                                    className="rounded-lg border px-3 py-1.5 text-xs hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                                                >
                                                    {t("requests_delete")}
                                                </button>
                                            </Td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </Container>
                ) : (
                    <Container>
                        {/* ——— Mobile (карточки) ——— */}
                        <div className="grid gap-4 sm:hidden">
                            {loading ? (
                                <div className="py-10 text-center">{t("requests_loading")}</div>
                            ) : items.length === 0 ? (
                                <div className="py-10 text-center">{t("requests_empty")}</div>
                            ) : (
                                items.map((r) => (
                                    <div
                                        key={r.id}
                                        className="rounded-2xl border p-4 text-sm dark:border-white/10 dark:bg-black/30"
                                    >
                                        <div
                                            className="mb-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                            <span>#{r.id}</span>
                                            <span>{new Date(r.createdAt).toLocaleString()}</span>
                                        </div>
                                        <div className="font-medium">{r.name}</div>
                                        {r.email && <div className="text-xs">{r.email}</div>}
                                        {r.phone && <div className="text-xs">{r.phone}</div>}
                                        {r.subject && (
                                            <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                                                {r.subject}
                                            </div>
                                        )}
                                        <div className="mt-1">{r.message}</div>
                                        <div className="mt-3 flex items-center justify-between">
                                            <select
                                                value={r.status}
                                                onChange={async (e) => {
                                                    const s = e.currentTarget.value as RequestStatus;
                                                    await updateRequestStatus(r.id, s);
                                                    load();
                                                }}
                                                className="rounded-lg border px-2 py-1 text-xs dark:border-white/20 dark:bg-black"
                                            >
                                                <option value="NEW">{t("requests_statusNew")}</option>
                                                <option value="IN_PROGRESS">
                                                    {t("requests_statusInProgress")}
                                                </option>
                                                <option value="DONE">{t("requests_statusDone")}</option>
                                            </select>
                                            <button
                                                onClick={async () => {
                                                    await deleteRequest(r.id);
                                                    load();
                                                }}
                                                className="rounded-lg border px-3 py-1.5 text-xs hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                                            >
                                                {t("requests_delete")}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Container>
                )}

                <div className="mt-4 flex items-center justify-end gap-3">
                    <label className="flex items-center gap-2 text-sm">
                        {t("requests_perPage")}
                        <select
                            value={size}
                            onChange={(e) => {
                                setPage(0);
                                setSize(Number(e.currentTarget.value));
                            }}
                            className="rounded-lg border px-2 py-1 text-sm dark:border-white/20 dark:bg-black"
                        >
                            {[10, 20, 50].map((n) => (
                                <option key={n} value={n}>
                                    {n}
                                </option>
                            ))}
                        </select>
                    </label>

                    {totalPages != null && totalPages > 1 && (
                        <>
                            <button
                                onClick={() => setPage((p) => Math.max(0, p - 1))}
                                disabled={page <= 0}
                                className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50 dark:border-white/20"
                            >
                                ◀
                            </button>
                            <span className="tabular-nums text-sm">
                {page + 1} / {totalPages}
              </span>
                            <button
                                onClick={() =>
                                    setPage((p) =>
                                        totalPages != null ? Math.min(totalPages - 1, p + 1) : p
                                    )
                                }
                                disabled={totalPages != null ? page >= totalPages - 1 : true}
                                className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50 dark:border-white/20"
                            >
                                ▶
                            </button>
                        </>
                    )}
                </div>
            </Container>
        </section>
    );
}

function Th({
                children,
                className = "",
            }: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${className}`}>
            {children}
        </th>
    );
}

function Td({
                children,
                className = "",
                colSpan,
            }: {
    children: React.ReactNode;
    className?: string;
    colSpan?: number;
}) {
    return (
        <td colSpan={colSpan} className={`px-4 py-3 ${className}`}>
            {children}
        </td>
    );
}
