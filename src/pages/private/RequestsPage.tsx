import React, {useEffect, useMemo, useState} from "react";
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

// ===== Types & helpers (strict, no any) =====
type RequestVM = Omit<
    RequestItem,
    | "id"
    | "createdAt"
    | "name"
    | "email"
    | "phone"
    | "subject"
    | "message"
    | "images"
    | "imageUrls"
    | "attachments"
> & {
    id: number;                         // нормализуем в число
    createdAt: Date;                    // нормализуем в Date
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    subject?: string | null;
    message?: string | null;
    images?: readonly string[] | null;
    imageUrls?: readonly string[] | null;
    attachments?: readonly (string | { url?: string | null | undefined })[] | null;
};

function toVM(r: RequestItem): RequestVM {
    // читаем из «неизвестного» рекорда, но без any
    const rec = r as Record<string, unknown>;

    const rawId = rec["id"];
    const id =
        typeof rawId === "number"
            ? rawId
            : typeof rawId === "string"
                ? Number(rawId)
                : 0;

    const rawCreated = rec["createdAt"];
    const createdAt =
        rawCreated instanceof Date
            ? rawCreated
            : typeof rawCreated === "number"
                ? new Date(rawCreated)
                : typeof rawCreated === "string"
                    ? new Date(rawCreated)
                    : new Date();

    return {
        ...(r as RequestItem), // сохраняем прочие поля RequestItem
        id,
        createdAt,
        name: (rec["name"] as string | null | undefined) ?? null,
        email: (rec["email"] as string | null | undefined) ?? null,
        phone: (rec["phone"] as string | null | undefined) ?? null,
        subject: (rec["subject"] as string | null | undefined) ?? null,
        message: (rec["message"] as string | null | undefined) ?? null,
        images: (rec["images"] as string[] | null | undefined) ?? null,
        imageUrls: (rec["imageUrls"] as string[] | null | undefined) ?? null,
        attachments:
            (rec["attachments"] as (string | { url?: string | null | undefined })[] | null | undefined) ??
            null,
    };
}

function extractImages(r: RequestVM): string[] {
    const out: string[] = [];
    if (Array.isArray(r.images)) out.push(...r.images.filter((u): u is string => !!u));
    if (Array.isArray(r.imageUrls)) out.push(...r.imageUrls.filter((u): u is string => !!u));
    if (Array.isArray(r.attachments)) {
        for (const a of r.attachments) {
            if (typeof a === "string") out.push(a);
            else if (a?.url) out.push(a.url);
        }
    }
    return out.filter((u) => /\.(png|jpe?g|webp|gif|bmp|svg)(\?|$)/i.test(u));
}

// ===== Page =====
export default function RequestsPage() {
    const {t} = useI18n();

    const [q, setQ] = useState("");
    const [status, setStatus] = useState<RequestStatus | "">("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [items, setItems] = useState<RequestVM[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingDelete, setPendingDelete] = useState<{ id: number; label?: string } | null>(null);

    const [selected, setSelected] = useState<RequestVM | null>(null);
    const isMobile = useMediaQuery("(max-width: 1024px)");

    async function load() {
        setLoading(true);
        setErr(null);
        try {
            const res = await listRequests({q, status, page, size});
            setItems(res.content.map(toVM));
            setTotalPages(res.totalPages);
            setPage(res.number);
            setSize(res.size);
        } catch (e) {
            setErr(e instanceof Error ? e.message : "Ошибка загрузки");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q, status, page, size]);

    function askDelete(r: RequestVM) {
        setPendingDelete({id: r.id, label: r.name || r.email || r.phone || `#${r.id}`});
        setConfirmOpen(true);
    }

    async function confirmDelete() {
        if (!pendingDelete) return;
        await deleteRequest(pendingDelete.id);
        setConfirmOpen(false);
        setPendingDelete(null);
        void load();
    }

    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <Container>
                {/* Top bar */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-semibold tracking-tight">{t("requests_title")}</h2>

                    <div className="ml-auto flex gap-2">
                        <div className="relative">
                            <input
                                value={q}
                                onChange={(e) => {
                                    setPage(0);
                                    setQ(e.currentTarget.value);
                                }}
                                placeholder={t("requests_searchPlaceholder")}
                                className="w-72 rounded-2xl border border-gray-200 bg-white/70 px-4 py-2 text-sm outline-none ring-0 transition focus:border-gray-300 focus:shadow-sm dark:border-white/15 dark:bg-black/40 dark:focus:border-white/25"
                            />
                            <span
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">⌕</span>
                        </div>

                        <select
                            value={status}
                            onChange={(e) => {
                                setPage(0);
                                setStatus(e.currentTarget.value as RequestStatus);
                            }}
                            className="rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 text-sm transition hover:bg-white focus:border-gray-300 focus:shadow-sm dark:border-white/15 dark:bg-black/40 dark:hover:bg-black/50"
                        >
                            <option value="">{t("requests_statusAll")}</option>
                            <option value="NEW">{t("requests_statusNew")}</option>
                            <option value="IN_PROGRESS">{t("requests_statusInProgress")}</option>
                            <option value="DONE">{t("requests_statusDone")}</option>
                        </select>
                    </div>
                </div>

                {/* Error */}
                {err && (
                    <div
                        className="mb-4 rounded-2xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-rose-700 shadow-sm dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200">
                        {err}
                    </div>
                )}

                {/* Table / Cards */}
                {!isMobile ? (
                    <Container>
                        <div
                            className="overflow-x-auto rounded-2xl border border-gray-200 bg-white/60 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-black/30">
                            <table className="min-w-full text-sm">
                                <thead>
                                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 dark:from-white/5 dark:to-white/10 dark:text-gray-200">
                                    <Th className="rounded-tl-2xl">{t("requests_id")}</Th>
                                    <Th>{t("requests_date")}</Th>
                                    <Th>{t("requests_name")}</Th>
                                    <Th>{t("requests_contacts")}</Th>
                                    <Th>{t("requests_subject")}</Th>
                                    <Th>{t("requests_message")}</Th>
                                    <Th>{t("requests_status")}</Th>
                                    <Th className="text-right rounded-tr-2xl">{t("requests_actions")}</Th>
                                </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                                {loading ? (
                                    <tr>
                                        <Td colSpan={8} className="py-12 text-center text-gray-500 dark:text-gray-400">
                                            {t("requests_loading")}
                                        </Td>
                                    </tr>
                                ) : items.length === 0 ? (
                                    <tr>
                                        <Td colSpan={8} className="py-12 text-center text-gray-500 dark:text-gray-400">
                                            {t("requests_empty")}
                                        </Td>
                                    </tr>
                                ) : (
                                    items.map((r, i) => (
                                        <tr
                                            key={r.id}
                                            onClick={() => setSelected(r)}
                                            className={[
                                                "align-top cursor-pointer transition-colors",
                                                i % 2 === 0 ? "bg-white/80 dark:bg-black/20" : "bg-gray-50/80 dark:bg-black/10",
                                                "hover:bg-gray-100/80 dark:hover:bg-white/10",
                                            ].join(" ")}
                                        >
                                            <Td className="whitespace-nowrap font-mono text-xs text-gray-600 dark:text-gray-300">#{r.id}</Td>

                                            <Td className="whitespace-nowrap text-gray-600 dark:text-gray-400">
                                                {new Date(r.createdAt).toLocaleString()}
                                            </Td>

                                            <Td className="font-medium text-gray-900 dark:text-gray-100">{r.name}</Td>

                                            <Td>
                                                {r.email && (
                                                    <div
                                                        className="text-xs text-blue-600 underline decoration-blue-200 underline-offset-2 dark:text-blue-400">
                                                        {r.email}
                                                    </div>
                                                )}
                                                {r.phone && (
                                                    <div
                                                        className="text-xs text-emerald-600 dark:text-emerald-400">{r.phone}</div>
                                                )}
                                            </Td>

                                            <Td className="max-w-[240px] truncate text-gray-700 dark:text-gray-200">{r.subject || "—"}</Td>

                                            <Td className="max-w-[420px] text-gray-700 dark:text-gray-300">
                                                <div className="line-clamp-3 leading-relaxed">{r.message}</div>
                                            </Td>

                                            <Td>
                                                <div className="flex items-center gap-2"
                                                     onClick={(e) => e.stopPropagation()}>
                            <span
                                className={[
                                    "inline-block h-2 w-2 rounded-full",
                                    r.status === "DONE" ? "bg-emerald-500" : r.status === "IN_PROGRESS" ? "bg-amber-500" : "bg-sky-500",
                                ].join(" ")}
                            />
                                                    <select
                                                        value={r.status}
                                                        onChange={async (e) => {
                                                            const s = e.currentTarget.value as RequestStatus;
                                                            await updateRequestStatus(r.id, s);
                                                            void load();
                                                        }}
                                                        className="rounded-xl border border-gray-200 bg-white/70 px-2 py-1 text-xs shadow-sm transition focus:border-gray-300 dark:border-white/15 dark:bg-black/40"
                                                    >
                                                        <option value="NEW">{t("requests_statusNew")}</option>
                                                        <option
                                                            value="IN_PROGRESS">{t("requests_statusInProgress")}</option>
                                                        <option value="DONE">{t("requests_statusDone")}</option>
                                                    </select>
                                                </div>
                                            </Td>

                                            <Td className="text-right"
                                                onClick={(e: React.MouseEvent<HTMLTableCellElement>) => {
                                                    e.stopPropagation();
                                                }}>
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setSelected(r)}
                                                        className="rounded-xl border border-gray-200 bg-white/70 px-3 py-1.5 text-xs font-medium shadow-sm transition hover:bg-white dark:border-white/15 dark:bg-black/40"
                                                    >
                                                        {t("requests_open", {fallback: "Открыть"} as unknown as Record<string, string>)}
                                                    </button>
                                                    <button
                                                        onClick={() => askDelete(r)}
                                                        className="rounded-xl border border-rose-200/60 bg-rose-50/60 px-3 py-1.5 text-xs font-medium text-rose-700 shadow-sm transition hover:!bg-red-500 hover:!text-white dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/15"
                                                    >
                                                        {t("requests_delete")}
                                                    </button>
                                                </div>
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
                        {/* Mobile cards */}
                        <div className="grid gap-4">
                            {loading ? (
                                <div
                                    className="rounded-2xl border border-gray-200 bg-white/60 px-4 py-10 text-center text-gray-500 shadow-sm dark:border-white/10 dark:bg-black/30">
                                    {t("requests_loading")}
                                </div>
                            ) : items.length === 0 ? (
                                <div
                                    className="rounded-2xl border border-gray-200 bg-white/60 px-4 py-10 text-center text-gray-500 shadow-sm dark:border-white/10 dark:bg-black/30">
                                    {t("requests_empty")}
                                </div>
                            ) : (
                                items.map((r) => (
                                    <div
                                        key={r.id}
                                        className="rounded-2xl border border-gray-200 bg-white/70 p-4 text-sm shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-black/30"
                                    >
                                        <div
                                            className="mb-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                            <span className="font-mono">#{r.id}</span>
                                            <span>{new Date(r.createdAt).toLocaleString()}</span>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <div className="font-medium text-gray-900 dark:text-gray-100">{r.name}</div>
                                            <span
                                                className={[
                                                    "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                                                    r.status === "DONE"
                                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                                                        : r.status === "IN_PROGRESS"
                                                            ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                                                            : "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
                                                ].join(" ")}
                                            >
                        {r.status === "DONE"
                            ? t("requests_statusDone")
                            : r.status === "IN_PROGRESS"
                                ? t("requests_statusInProgress")
                                : t("requests_statusNew")}
                      </span>
                                        </div>

                                        {r.email && (
                                            <div
                                                className="mt-1 text-xs text-blue-600 underline decoration-blue-200 underline-offset-2 dark:text-blue-400">
                                                {r.email}
                                            </div>
                                        )}
                                        {r.phone && <div
                                            className="text-xs text-emerald-600 dark:text-emerald-400">{r.phone}</div>}

                                        {r.subject && (
                                            <div
                                                className="mt-2 text-xs text-gray-600 dark:text-gray-300">{r.subject}</div>
                                        )}

                                        <div
                                            className="mt-1 leading-relaxed text-gray-700 dark:text-gray-300">{r.message}</div>

                                        <div className="mt-3 flex items-center justify-between gap-2">
                                            <select
                                                value={r.status}
                                                onChange={async (e) => {
                                                    const s = e.currentTarget.value as RequestStatus;
                                                    await updateRequestStatus(r.id, s);
                                                    void load();
                                                }}
                                                className="rounded-xl border border-gray-200 bg-white/70 px-2 py-1 text-xs shadow-sm dark:border-white/15 dark:bg-black/40"
                                            >
                                                <option value="NEW">{t("requests_statusNew")}</option>
                                                <option value="IN_PROGRESS">{t("requests_statusInProgress")}</option>
                                                <option value="DONE">{t("requests_statusDone")}</option>
                                            </select>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setSelected(r)}
                                                    className="rounded-xl border border-gray-200 bg-white/70 px-3 py-1.5 text-xs font-medium shadow-sm transition hover:bg-white dark:border-white/15 dark:bg-black/40"
                                                >
                                                    {t("requests_open", {fallback: "Открыть"} as unknown as Record<string, string>)}
                                                </button>
                                                <button
                                                    onClick={() => askDelete(r)}
                                                    className="rounded-xl border border-rose-200/60 bg-rose-50/60 px-3 py-1.5 text-xs font-medium text-rose-700 shadow-sm transition hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/15"
                                                >
                                                    {t("requests_delete")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Container>
                )}

                {/* Footer controls */}
                <div className="mt-4 flex items-center justify-end gap-3">
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                        {t("requests_perPage")}
                        <select
                            value={size}
                            onChange={(e) => {
                                setPage(0);
                                setSize(Number(e.currentTarget.value));
                            }}
                            className="rounded-xl border border-gray-200 bg-white/70 px-2 py-1 text-sm shadow-sm dark:border-white/15 dark:bg-black/40"
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
                                className="rounded-xl border border-gray-200 bg-white/70 px-3 py-1.5 text-sm shadow-sm transition hover:bg-white disabled:opacity-50 dark:border-white/15 dark:bg-black/40"
                            >
                                ◀
                            </button>
                            <span className="tabular-nums text-sm text-gray-700 dark:text-gray-200">
                {page + 1} / {totalPages}
              </span>
                            <button
                                onClick={() => setPage((p) => (totalPages != null ? Math.min(totalPages - 1, p + 1) : p))}
                                disabled={totalPages != null ? page >= totalPages - 1 : true}
                                className="rounded-xl border border-gray-200 bg-white/70 px-3 py-1.5 text-sm shadow-sm transition hover:bg-white disabled:opacity-50 dark:border-white/15 dark:bg-black/40"
                            >
                                ▶
                            </button>
                        </>
                    )}
                </div>
            </Container>

            {/* Details Dialog */}
            {selected && (
                <RequestDetailsDialog
                    request={selected}
                    onClose={() => setSelected(null)}
                    onUpdateStatus={async (s) => {
                        await updateRequestStatus(selected.id, s);
                        void load();
                    }}
                />
            )}

            {/* Confirmation Dialog */}
            {confirmOpen && (
                <div
                    className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="confirm-title"
                >
                    <div
                        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-zinc-900">
                        <div className="mb-3 flex items-start gap-3">
                            <div
                                className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">
                                !
                            </div>
                            <div>
                                <h3 id="confirm-title" className="text-base font-semibold">
                                    {t("requests_confirmDelete_title")}
                                </h3>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                    {t("requests_confirmDelete_desc")} {" "}
                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                    {pendingDelete?.label ? `(${pendingDelete.label})` : ""}
                  </span>
                                    ?
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setConfirmOpen(false);
                                    setPendingDelete(null);
                                }}
                                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 dark:border-white/15 dark:bg-transparent dark:hover:bg-white/10"
                            >
                                {t("requests_confirmDelete_secondary")}
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="rounded-xl border border-rose-300 !bg-rose-600 px-4 py-2 text-sm font-semibold !text-white shadow-sm hover:bg-rose-700 dark:border-rose-500/30"
                            >
                                {t("requests_confirmDelete_primary")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

function Th({children, className = ""}: { children: React.ReactNode; className?: string }) {
    return (
        <th
            className={[
                "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide",
                "first:rounded-l-2xl last:rounded-r-2xl",
                className,
            ].join(" ")}
        >
            {children}
        </th>
    );
}

type TdProps = {
    children: React.ReactNode;
    className?: string;
    colSpan?: number;
    onClick?: React.MouseEventHandler<HTMLTableCellElement>;
};

function Td({ children, className = "", colSpan, onClick }: TdProps) {
    return (
        <td
            colSpan={colSpan}
            className={["px-4 py-3 align-top", className].join(" ")}
            onClick={onClick}
        >
            {children}
        </td>
    );
}
function RequestDetailsDialog({
                                  request,
                                  onClose,
                                  onUpdateStatus,
                              }: {
    request: RequestVM;
    onClose: () => void;
    onUpdateStatus: (s: RequestStatus) => Promise<void> | void;
}) {
    const {t} = useI18n();
    const images = useMemo(() => extractImages(request), [request]);
    const [statusLocal, setStatusLocal] = useState<RequestStatus>(request.status);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const title = `${t("requests_card_title") || "Заявка"} #${request.id}`;

    return (
        <div className="fixed inset-0 z-[350] flex items-center justify-center bg-black/60 p-4" role="dialog"
             aria-modal>
            <div
                className="w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-zinc-900">
                <div
                    className="flex items-start justify-between gap-4 border-b border-gray-100 p-5 dark:border-white/10">
                    <div>
                        <h3 className="text-xl font-semibold">{title}</h3>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {new Date(request.createdAt).toLocaleString()}
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-gray-50 dark:border-white/15 dark:bg-transparent dark:hover:bg-white/10"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid gap-6 p-5 md:grid-cols-2">
                    {/* Left: details */}
                    <div className="space-y-2 text-sm">
                        <Detail label={t("requests_date")} value={new Date(request.createdAt).toLocaleString()}/>
                        <Detail label={t("requests_name")} value={request.name}/>
                        <Detail label={t("requests_contacts")} value={request.email || request.phone} multiline/>
                        <Detail label={t("requests_subject")} value={request.subject || "—"}/>
                        <Detail label={t("requests_message")} value={request.message} multiline/>

                        <div className="pt-2">
                            <div
                                className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                {t("requests_status")}
                            </div>
                            <div className="flex items-center gap-2">
                <span
                    className={[
                        "inline-block h-2 w-2 rounded-full",
                        statusLocal === "DONE" ? "bg-emerald-500" : statusLocal === "IN_PROGRESS" ? "bg-amber-500" : "bg-sky-500",
                    ].join(" ")}
                />
                                <select
                                    value={statusLocal}
                                    onChange={async (e) => {
                                        const s = e.currentTarget.value as RequestStatus;
                                        setStatusLocal(s);
                                        await onUpdateStatus(s);
                                    }}
                                    className="rounded-xl border border-gray-200 bg-white/70 px-2 py-1 text-xs shadow-sm transition focus:border-gray-300 dark:border-white/15 dark:bg-black/40"
                                >
                                    <option value="NEW">{t("requests_statusNew")}</option>
                                    <option value="IN_PROGRESS">{t("requests_statusInProgress")}</option>
                                    <option value="DONE">{t("requests_statusDone")}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Right: slideshow */}
                    <div>{images.length > 0 ? <Slideshow images={images}/> : <NoImages/>}</div>
                </div>
            </div>
        </div>
    );
}

function Detail({label, value, multiline = false}: { label: string; value?: React.ReactNode; multiline?: boolean }) {
    return (
        <div>
            <div
                className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</div>
            <div
                className={[
                    "rounded-xl border border-gray-100 bg-white/70 px-3 py-2 text-sm text-gray-800 shadow-sm dark:border-white/10 dark:bg-black/30 dark:text-gray-100",
                    multiline ? "whitespace-pre-wrap" : "truncate",
                ].join(" ")}
            >
                {value ?? "—"}
            </div>
        </div>
    );
}

function NoImages() {
    const {t} = useI18n();
    return (
        <div
            className="grid h-full place-items-center rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">
            {t("requests_noImages") || "Нет приложенных изображений"}
        </div>
    );
}

function Slideshow({images}: { images: string[] }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index >= images.length) setIndex(0);
    }, [images, index]);

    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
    const next = () => setIndex((i) => (i + 1) % images.length);

    return (
        <div className="relative">
            <div
                className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-100 bg-black/5 dark:border-white/10">
                <img src={images[index]} alt={`Фото ${index + 1}`} className="h-full w-full object-contain"/>

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white backdrop-blur hover:bg-black/60"
                            aria-label="Previous"
                        >
                            ◀
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white backdrop-blur hover:bg-black/60"
                            aria-label="Next"
                        >
                            ▶
                        </button>

                        <div className="pointer-events-none absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                            {images.map((_, i) => (
                                <span key={i}
                                      className={["h-1.5 w-1.5 rounded-full", i === index ? "bg-white" : "bg-white/50"].join(" ")}/>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="mt-3 grid grid-cols-6 gap-2">
                    {images.map((u, i) => (
                        <button
                            key={`${u}-${i}`}
                            onClick={() => setIndex(i)}
                            className={["overflow-hidden rounded-lg border", i === index ? "border-blue-500" : "border-gray-200 dark:border-white/10"].join(" ")}
                            aria-label={`Go to ${i + 1}`}
                        >
                            <img src={u} alt={`Миниатюра ${i + 1}`} className="aspect-[4/3] w-full object-cover"/>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
