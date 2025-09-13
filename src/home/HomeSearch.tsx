import {useEffect, useMemo, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {loadAdminProducts} from "../catalog/data";
import type {Product} from "../catalog/types";
import {useI18n} from "../shared/i18n";
import Container from "../shared/Container";
import {createPortal} from "react-dom";

function normalize(s: string) {
    return s.toLowerCase().trim();
}

function highlight(text: string, q: string) {
    const n = normalize(text);
    const m = normalize(q);
    const idx = n.indexOf(m);
    if (idx < 0 || !m) return <>{text}</>;
    return (
        <>
            {text.slice(0, idx)}
            <mark className="rounded bg-yellow-200/70 px-0.5 dark:bg-yellow-500/20">
                {text.slice(idx, idx + m.length)}
            </mark>
            {text.slice(idx + m.length)}
        </>
    );
}

export default function HomeSearch() {
    const {t} = useI18n();
    const [all, setAll] = useState<Product[]>(() => loadAdminProducts());
    const [q, setQ] = useState("");
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const nav = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [portalOpen, setPortalOpen] = useState(false);   // смонтирован ли портал
    const [leaving, setLeaving] = useState(false);         // идёт ли анимация закрытия

    // Для портала: координаты поля поиска
    const [rect, setRect] = useState<DOMRect | null>(null);

    // обновляем товары при изменениях
    useEffect(() => {
        const reload = () => setAll(loadAdminProducts());
        window.addEventListener("products:updated", reload);
        window.addEventListener("storage", reload);
        return () => {
            window.removeEventListener("products:updated", reload);
            window.removeEventListener("storage", reload);
        };
    }, []);

    useEffect(() => {
        if (open) {
            setPortalOpen(true);
            setLeaving(false);
        } else if (portalOpen) {
            // начинаем анимацию закрытия и размонтируем через 150мс
            setLeaving(true);
            const t = setTimeout(() => {
                setPortalOpen(false);
                setLeaving(false);
            }, 150); // длительность должна совпадать с duration-150
            return () => clearTimeout(t);
        }
    }, [open, portalOpen]);

    // пересчёт позиции подсказок при открытии/resize/scroll
    useEffect(() => {
        if (!open || !inputRef.current) return;
        const update = () => {
            if (inputRef.current) {
                setRect(inputRef.current.getBoundingClientRect());
            }
        };
        update();
        window.addEventListener("resize", update);
        window.addEventListener("scroll", update, true);
        return () => {
            window.removeEventListener("resize", update);
            window.removeEventListener("scroll", update, true);
        };
    }, [open]);

    const suggestions = useMemo(() => {
        const s = normalize(q);
        if (!s) return [];
        const scored = all
            .map((p) => {
                const hay = `${p.title} ${p.brand} ${p.category} ${p.subcategory}`.toLowerCase();
                if (!hay.includes(s)) return null;
                const titleMatch = p.title.toLowerCase().includes(s) ? 2 : 0;
                const brandMatch = p.brand.toLowerCase().includes(s) ? 1 : 0;
                const score = (p.inStock ? 10 : 0) + titleMatch + brandMatch;
                return {p, score};
            })
            .filter(Boolean) as { p: Product; score: number }[];
        return scored.sort((a, b) => b.score - a.score).slice(0, 8).map((x) => x.p);
    }, [all, q]);

    const goSearch = (query: string) => {
        const qp = new URLSearchParams({q: query, page: "1"});
        nav(`/catalog?${qp.toString()}`);
        setOpen(false);
    };

    return (
        <div className="pt-6">
            <div className="mt-4"></div>
            <Container>
                <div className="relative">
                    <label htmlFor="home-search" className="sr-only">
                        {t("search_all_products") ?? "Поиск по товарам"}
                    </label>
                    <div className="mt-4"></div>
                    <div
                        className="flex items-center gap-2 rounded-2xl border bg-white p-2 shadow-sm focus-within:ring-2 focus-within:ring-gray-300 dark:border-white/10 dark:bg-black dark:focus-within:ring-white/20">
                        <svg
                            width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"
                            className="ml-2 opacity-60"
                        >
                            <path fill="currentColor"
                                  d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"/>
                        </svg>
                        <input
                            id="home-search"
                            ref={inputRef}
                            value={q}
                            onChange={(e) => {
                                setQ(e.currentTarget.value);
                                setOpen(true);
                                setActive(0);
                            }}
                            onFocus={() => setOpen(true)}
                            onKeyDown={(e) => {
                                if (e.key === "ArrowDown") {
                                    e.preventDefault();
                                    setActive((a) => Math.min(a + 1, Math.max(0, suggestions.length - 1)));
                                }
                                if (e.key === "ArrowUp") {
                                    e.preventDefault();
                                    setActive((a) => Math.max(a - 1, 0));
                                }
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    if (open && suggestions[active]) goSearch(suggestions[active].title);
                                    else goSearch(q);
                                }
                                if (e.key === "Escape") setOpen(false);
                            }}
                            placeholder={t("search_placehold") ?? "Поиск по товарам, брендам, категориям…"}
                            className="w-full rounded-xl bg-transparent px-2 py-2 text-sm outline-none placeholder:opacity-60"
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={() => goSearch(q)}
                            className="mr-1 rounded-xl bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
                        >
                            {t("search") ?? "Искать"}
                        </button>
                    </div>
                </div>

                {/* Портал для подсказок */}
                {portalOpen && q && suggestions.length > 0 && rect &&
                    createPortal(
                        <div
                            role="listbox"
                            // базовые стили портала
                            className={`
                              absolute z-[1000] overflow-hidden rounded-2xl border bg-white shadow-xl
                              dark:border-white/10 dark:bg-black
                              transform-gpu transition duration-150 ease-out
          ${leaving
                                ? "opacity-0 -translate-y-1" // закрытие: fade + slide-up
                                : "opacity-100 translate-y-0"} // открытие: fade-in + slide-down (из 0)
        `}
                            style={{
                                position: "absolute",
                                top: rect.bottom + window.scrollY + 4,
                                left: rect.left + window.scrollX,
                                width: rect.width,
                            }}
                        >
                            {suggestions.map((p, i) => (
                                <button
                                    key={p.id}
                                    role="option"
                                    aria-selected={i === active}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => goSearch(p.title)}
                                    onMouseEnter={() => setActive(i)}
                                    className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm
                        transition-colors
                        hover:bg-black/5 dark:hover:bg-white/10
                        ${i === active ? "bg-black/5 dark:bg-white/10" : ""}`}
                                >
                                    <div className="min-w-0">
                                        <div className="truncate font-medium">{highlight(p.title, q)}</div>
                                        <div className="truncate text-xs text-gray-500">
                                            {highlight(p.brand, q)} • {p.category}/{p.subcategory}
                                        </div>
                                    </div>
                                    <div className="shrink-0 text-xs font-semibold">${p.price}</div>
                                </button>
                            ))}
                        </div>,
                        document.body
                    )
                }
            </Container>
            <div className="mt-6"></div>
        </div>
    );
}
