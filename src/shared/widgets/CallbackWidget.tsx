// src/widgets/CallbackWidget.tsx
import React, { useMemo, useState, useEffect } from 'react';

// Если у тебя общий клиент уже есть — замени на свой:
async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
    const base = (import.meta.env.VITE_API_BASE || '/api').replace(/\/+$/, '');
    const url = `${base}${path.startsWith('/') ? path : `/${path}`}`.replace(/\/api\/api(\/|$)/, '/api$1');
    const res = await fetch(url, { headers: { Accept: 'application/json' }, ...init });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return (await res.json().catch(() => ({}))) as T;
}

type Payload = {
    name: string;
    phone: string;             // E.164 предпочтительно
    date?: string | null;      // YYYY-MM-DD (локальная)
    time?: string | null;      // HH:mm (локальная)
    tz: string;                // Europe/Moscow и т.п.
    comment?: string | null;
    consent: boolean;
    source?: string | null;    // страница/utm
    page: string;
};

const TIME_START = 9;   // 09:00
const TIME_END   = 21;  // 21:00
const STEP_MIN   = 15;  // шаг 15 минут

function buildSlots() {
    const out: string[] = [];
    for (let h = TIME_START; h <= TIME_END; h++) {
        for (let m = 0; m < 60; m += STEP_MIN) {
            if (h === TIME_END && m > 0) break;
            const hh = String(h).padStart(2, '0');
            const mm = String(m).padStart(2, '0');
            out.push(`${hh}:${mm}`);
        }
    }
    return out;
}

function phoneClean(v: string) {
    return v.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, ''); // один плюс в начале
}

function validPhone(v: string) {
    const s = phoneClean(v);
    return /^\+?\d{7,15}$/.test(s);
}

type WidgetPosProps = {
    offsetRight?: string | number; // смещение от правого края (px или любое CSS)
    bottom?: string | number;      // отступ снизу
    zIndex?: number;               // порядок наложения
};

// ...в сигнатуре компонента:
export default function CallbackWidget({
                                           offsetRight = 'calc(1.5rem + 3.5rem + 0.75rem)', // 24px + 56px + 12px
                                           bottom = '1.5rem',                                // как у CallWidget: bottom-6
                                           zIndex = 9998,                                    // чтобы не перекрывать CallWidget (9999)
                                       }: WidgetPosProps = {}) {
    const [open, setOpen] = useState(false);

    // form
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>(''); // пусто = любое время
    const [comment, setComment] = useState('');
    const [consent, setConsent] = useState(true);

    const [submitting, setSubmitting] = useState(false);
    const [ok, setOk] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);

    const tz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC', []);
    const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
    const slots = useMemo(buildSlots, []);

    // запомним пользователя между сессиями
    useEffect(() => {
        const saved = localStorage.getItem('cb_profile');
        if (saved) {
            const p = JSON.parse(saved);
            setName(p.name ?? '');
            setPhone(p.phone ?? '');
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('cb_profile', JSON.stringify({ name, phone }));
    }, [name, phone]);

    function resetForm() {
        setDate('');
        setTime('');
        setComment('');
        setConsent(true);
        setErr(null);
        setOk(null);
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setErr(null);
        setOk(null);

        if (!name.trim()) return setErr('Укажите имя');
        if (!validPhone(phone)) return setErr('Неверный номер телефона');
        if (!consent) return setErr('Нужно согласие на обработку данных');

        setSubmitting(true);
        try {
            const payload: Payload = {
                name: name.trim(),
                phone: phoneClean(phone),
                date: date || null,
                time: time || null,
                tz,
                comment: comment?.trim() || null,
                consent: true,
                source: (window as any).__APP_SOURCE__ ?? null,
                page: location.pathname + location.search,
            };

            await apiFetch('/callbacks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            setOk('Спасибо! Мы перезвоним в выбранное время.');
            resetForm();
            // авто-закрытие
            setTimeout(() => setOpen(false), 1400);
        } catch (e: any) {
            setErr(e?.message || 'Ошибка отправки. Попробуйте ещё раз.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            {/* Смещаем сам FAB контейнером */}
            <div
                className="fixed"
                style={{
                    right: typeof offsetRight === 'number' ? `${offsetRight}px` : offsetRight,
                    bottom: typeof bottom === 'number' ? `${bottom}px` : bottom,
                    zIndex,
                }}
            >
                <button
                    aria-label="Перезвоните мне"
                    onClick={() => { setOpen(true); setOk(null); setErr(null); }}
                    className="rounded-full shadow-xl !bg-emerald-600 !hover:bg-emerald-700 !text-white w-auto h-14 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-300"
                >
                    Перезвонить
                </button>
            </div>

            {/* Modal */}
            {open && (
                <div aria-modal className="fixed inset-0 z-50 flex items-end sm:items-center justify-center ">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
                    <div className="relative dark:bg-zinc-800 w-full sm:max-w-md bg-white rounded-2xl shadow-2xl p-5 m-3">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold">Перезвоните мне</h3>
                            <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-zinc-100" aria-label="Закрыть">✕</button>
                        </div>

                        <form onSubmit={submit} className="space-y-3 dark:bg-zinc-800">
                            <div>
                                <label className="block text-sm mb-1">Имя *</label>
                                <input
                                    className="w-full rounded-xl !border px-3 py-2 outline-none focus:ring-2 ring-emerald-300 dark:bg-zinc-900 dark:text-white"
                                    value={name} onChange={e => setName(e.target.value)} placeholder="Как к вам обращаться"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Телефон *</label>
                                <input
                                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ring-emerald-300 dark:bg-zinc-900 dark:text-white"
                                    value={phone} onChange={e => setPhone(e.target.value)}
                                    placeholder="+373 60 000 000"
                                    inputMode="tel"
                                />
                                <p className="text-xs text-zinc-500 mt-1">Мы позвоним по вашему локальному времени ({tz})</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm mb-1">Дата звонка</label>
                                    <input
                                        type="date" min={today}
                                        className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ring-emerald-300 dark:bg-zinc-900 dark:text-white"
                                        value={date} onChange={e => setDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Время</label>
                                    <select
                                        className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ring-emerald-300 dark:bg-zinc-900 dark:text-white"
                                        value={time} onChange={e => setTime(e.target.value)}
                                    >
                                        <option value="">Любое время</option>
                                        {slots.map(s => (<option key={s} value={s}>{s}</option>))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Комментарий</label>
                                <textarea
                                    rows={3}
                                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ring-emerald-300 resize-none dark:bg-zinc-900 dark:text-white"
                                    value={comment} onChange={e => setComment(e.target.value)} placeholder="Удобный способ связи или вопрос"
                                />
                            </div>

                            <label className="flex items-start gap-2 text-sm">
                                <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1"/>
                                <span>Согласен(а) на обработку персональных данных для обратного звонка</span>
                            </label>

                            {err && <div className="text-sm text-red-600">{err}</div>}
                            {ok && <div className="text-sm text-emerald-700">{ok}</div>}

                            <div className="flex gap-2 justify-end pt-1">
                                <button type="button" onClick={() => setOpen(false)} className="text-black px-4 py-2 rounded-xl border hover:bg-zinc-50">Отмена</button>
                                <button
                                    type="submit" disabled={submitting}
                                    className="px-4 py-2 rounded-xl !bg-emerald-600 !text-white hover:bg-emerald-700 disabled:opacity-60"
                                >
                                    {submitting ? 'Отправка…' : 'Жду звонка'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
