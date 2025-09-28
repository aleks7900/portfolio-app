import React, {useEffect, useMemo, useState} from "react";

/**
 * Максимально продвинутый калькулятор (React + Tailwind)
 * Разделы:
 *  1) Масса листа / профиля
 *  2) Масса трубы (круг / прямоугольник) + пруток
 *  3) Развёртка листа (упрощённо): BA/BD, итоговая длина
 *  4) Справка по K‑factor и типовым параметрам
 *
 * Подключение:
 *   import MetalCalcPage from "@/pages/MetalCalcPage";
 *   <Route path="/calc/metal" element={<MetalCalcPage/>} />
 */

type DensityPresetKey = "AISI_304" | "AISI_316" | "Custom";

const DENSITY_PRESETS: Record<DensityPresetKey, number> = {
    // кг/м³
    AISI_304: 8030,
    AISI_316: 8000,
    Custom: 8000,
};

const formatNum = (n: number, digits = 3) =>
    Number.isFinite(n) ? Number(n.toFixed(digits)) : 0;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

const rad = (deg: number) => (deg * Math.PI) / 180;

const saveLS = (k: string, v: any) => {
    try {
        localStorage.setItem(k, JSON.stringify(v));
    } catch {
    }
};
const loadLS = <T, >(k: string, fallback: T): T => {
    try {
        const raw = localStorage.getItem(k);
        if (!raw) return fallback;
        return JSON.parse(raw) as T;
    } catch {
        return fallback;
    }
};

function SectionTabs(
    {
        tabs,
        active,
        onChange,
    }: { tabs: { id: string; title: string }[]; active: string; onChange: (id: string) => void }
) {
    return (
        <div className="flex flex-wrap gap-2 border-b pb-2">
            {tabs.map((t) => (
                <button
                    key={t.id}
                    onClick={() => onChange(t.id)}
                    className={
                        "rounded-xl px-3 py-1.5 text-sm font-medium border transition " +
                        (active === t.id
                            ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black"
                            : "hover:bg-black/5 dark:hover:bg-white/10")
                    }
                >
                    {t.title}
                </button>
            ))}
        </div>
    );
}

/**
 * 1) Масса листа / профиля
 */
function SheetMassCard() {
    const [densityKey, setDensityKey] = useState<DensityPresetKey>(loadLS("calc_density_key", "AISI_304"));
    const [density, setDensity] = useState<number>(loadLS("calc_density", DENSITY_PRESETS[densityKey]));
    const [lengthMm, setLengthMm] = useState<number>(1000);
    const [widthMm, setWidthMm] = useState<number>(500);
    const [thickMm, setThickMm] = useState<number>(2);

    useEffect(() => {
        if (densityKey !== "Custom") {
            const d = DENSITY_PRESETS[densityKey];
            setDensity(d);
        }
        saveLS("calc_density_key", densityKey);
    }, [densityKey]);

    useEffect(() => saveLS("calc_density", density), [density]);

    const L = lengthMm / 1000; // m
    const W = widthMm / 1000; // m
    const T = thickMm / 1000; // m
    const area = L * W; // m²
    const volume = area * T; // m³
    const mass = volume * density; // kg
    const massPerM2 = density * T; // kg/m²

    return (
        <div className="rounded-2xl border bg-white dark:bg-zinc-800 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Масса листа / пластины</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div>
                    <label className="text-sm">Длина, мм</label>
                    <input type="number"
                           className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                           value={lengthMm} min={1} onChange={(e) => setLengthMm(+e.target.value)}/>
                </div>
                <div>
                    <label className="text-sm">Ширина, мм</label>
                    <input type="number"
                           className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                           value={widthMm} min={1} onChange={(e) => setWidthMm(+e.target.value)}/>
                </div>
                <div>
                    <label className="text-sm">Толщина, мм</label>
                    <input type="number"
                           className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                           value={thickMm} step={0.1} min={0.1} onChange={(e) => setThickMm(+e.target.value)}/>
                </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div>
                    <label className="text-sm">Плотность</label>
                    <select
                        className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                        value={densityKey}
                        onChange={(e) => setDensityKey(e.target.value as DensityPresetKey)}
                    >
                        <option value="AISI_304">AISI 304 (8030 кг/м³)</option>
                        <option value="AISI_316">AISI 316 (8000 кг/м³)</option>
                        <option value="Custom">Своя</option>
                    </select>
                </div>
                <div className="sm:col-span-2">
                    <label className="text-sm">Плотность, кг/м³</label>
                    <input type="number"
                           className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                           value={density} step={5} min={7000} max={9000}
                           onChange={(e) => setDensity(+e.target.value)} disabled={densityKey !== "Custom"}/>
                </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-4">
                <Stat label="Площадь, м²" value={formatNum(area, 3)}/>
                <Stat label="Объём, м³" value={formatNum(volume, 6)}/>
                <Stat label="Масса, кг" value={formatNum(mass, 3)}/>
                <Stat label="Удельная масса, кг/м²" value={formatNum(massPerM2, 2)}/>
            </div>
        </div>
    );
}

function Stat({label, value}: { label: string; value: number | string }) {
    return (
        <div className="rounded-xl border p-3 bg-white/60 dark:bg-zinc-900">
            <div className="text-xs text-zinc-500">{label}</div>
            <div className="text-lg font-semibold">{value}</div>
        </div>
    );
}

/**
 * 2) Масса трубы / прутка
 */
function ProfileMassCard() {
    type Shape = "round_tube" | "rect_tube" | "round_bar";
    const [shape, setShape] = useState<Shape>("round_tube");
    const [densityKey, setDensityKey] = useState<DensityPresetKey>(loadLS("calc_density_key2", "AISI_304"));
    const [density, setDensity] = useState<number>(loadLS("calc_density2", DENSITY_PRESETS[densityKey]));

    // общие
    const [lengthMm, setLengthMm] = useState(1000);

    // круглая труба
    const [odMm, setOdMm] = useState(40);
    const [wtMm, setWtMm] = useState(2);

    // прямоугольная труба
    const [wMm, setWMm] = useState(40);
    const [hMm, setHMm] = useState(20);
    const [wtrMm, setWtrMm] = useState(2);

    // круглый пруток
    const [barDm, setBarDm] = useState(12);

    useEffect(() => {
        if (densityKey !== "Custom") setDensity(DENSITY_PRESETS[densityKey]);
        saveLS("calc_density_key2", densityKey);
    }, [densityKey]);
    useEffect(() => saveLS("calc_density2", density), [density]);

    const L = lengthMm / 1000; // m

    let area_m2 = 0; // поперечное сечение в м²
    if (shape === "round_tube") {
        const R_o = (odMm / 1000) / 2;
        const t = wtMm / 1000;
        const R_i = Math.max(0, R_o - t);
        area_m2 = Math.PI * (R_o * R_o - R_i * R_i);
    } else if (shape === "rect_tube") {
        const W = wMm / 1000;
        const H = hMm / 1000;
        const t = wtrMm / 1000;
        const Wi = Math.max(0, W - 2 * t);
        const Hi = Math.max(0, H - 2 * t);
        area_m2 = W * H - Wi * Hi;
    } else if (shape === "round_bar") {
        const R = (barDm / 1000) / 2;
        area_m2 = Math.PI * R * R;
    }

    const volume = area_m2 * L; // m³
    const mass = volume * density; // kg

    const invalid =
        (shape === "round_tube" && wtMm * 2 >= odMm) ||
        (shape === "rect_tube" && (wtrMm * 2 >= Math.min(wMm, hMm)));

    return (
        <div className="rounded-2xl border bg-white dark:bg-zinc-800 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Масса труб/прутков</h3>

            <div className="mt-3 flex flex-wrap gap-2">
                <button className={btn(shape === "round_tube")} onClick={() => setShape("round_tube")}>Круглая труба
                </button>
                <button className={btn(shape === "rect_tube")} onClick={() => setShape("rect_tube")}>Прямоуг. труба
                </button>
                <button className={btn(shape === "round_bar")} onClick={() => setShape("round_bar")}>Круглый пруток
                </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div>
                    <label className="text-sm">Длина, мм</label>
                    <input type="number"
                           className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                           value={lengthMm} min={1}
                           onChange={(e) => setLengthMm(+e.target.value)}/>
                </div>

                <div>
                    <label className="text-sm">Плотность</label>
                    <select className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                            value={densityKey}
                            onChange={(e) => setDensityKey(e.target.value as DensityPresetKey)}>
                        <option value="AISI_304">AISI 304 (8030 кг/м³)</option>
                        <option value="AISI_316">AISI 316 (8000 кг/м³)</option>
                        <option value="Custom">Своя</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm">Плотность, кг/м³</label>
                    <input type="number"
                           className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                           value={density}
                           onChange={(e) => setDensity(+e.target.value)} disabled={densityKey !== "Custom"}/>
                </div>
            </div>

            {shape === "round_tube" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div>
                        <label className="text-sm">Наружный диаметр, мм</label>
                        <input type="number"
                               className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                               value={odMm} min={1}
                               onChange={(e) => setOdMm(+e.target.value)}/>
                    </div>
                    <div>
                        <label className="text-sm">Толщина стенки, мм</label>
                        <input type="number"
                               className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                               value={wtMm} step={0.1} min={0.1}
                               onChange={(e) => setWtMm(+e.target.value)}/>
                    </div>
                    <div className="sm:col-span-1 flex items-end">
                        {invalid && <div className="text-xs text-red-600">Толщина ≥ радиуса — проверьте OD/Wt.</div>}
                    </div>
                </div>
            )}

            {shape === "rect_tube" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-4">
                    <div>
                        <label className="text-sm">Ширина, мм</label>
                        <input type="number"
                               className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                               value={wMm} min={1}
                               onChange={(e) => setWMm(+e.target.value)}/>
                    </div>
                    <div>
                        <label className="text-sm">Высота, мм</label>
                        <input type="number"
                               className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                               value={hMm} min={1}
                               onChange={(e) => setHMm(+e.target.value)}/>
                    </div>
                    <div>
                        <label className="text-sm">Толщина стенки, мм</label>
                        <input type="number"
                               className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                               value={wtrMm} step={0.1} min={0.1}
                               onChange={(e) => setWtrMm(+e.target.value)}/>
                    </div>
                    <div className="sm:col-span-1 flex items-end">
                        {invalid &&
                            <div className="text-xs text-red-600">Толщина стенки слишком велика для габаритов.</div>}
                    </div>
                </div>
            )}

            {shape === "round_bar" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div>
                        <label className="text-sm">Диаметр, мм</label>
                        <input type="number"
                               className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                               value={barDm} min={1}
                               onChange={(e) => setBarDm(+e.target.value)}/>
                    </div>
                </div>
            )}

            <div className="mt-4 grid gap-3 sm:grid-cols-4">
                <Stat label="Сечение, м²" value={formatNum(area_m2, 6)}/>
                <Stat label="Объём, м³" value={formatNum(volume, 6)}/>
                <Stat label="Масса, кг" value={formatNum(mass, 3)}/>
                <Stat label="Масса на метр, кг/м" value={formatNum(mass / Math.max(L, 1e-9), 3)}/>
            </div>
        </div>
    );
}

const btn = (active: boolean) =>
    "rounded-xl border px-3 py-1.5 text-sm font-medium " +
    (active ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black" : "hover:bg-black/5 dark:hover:bg-white/10");

/**
 * 3) Развёртка: BA/BD и итоговая длина (упрощённо)
 */

type BendRow = {
    id: string;
    flange: number; // длина фланца, мм (внешний размер для Outside‑метода, либо внутренний для Inside)
    angle: number;  // градусы, 0..180
    radius: number; // Rвн, мм
    kfactor?: number; // если не задан, берём общий
    thick?: number;   // если не задан, берём общий
};

function FlatPatternCard() {
    const [mode, setMode] = useState<"outside" | "inside">("outside");
    const [globalT, setGlobalT] = useState<number>(2);
    const [globalK, setGlobalK] = useState<number>(loadLS("calc_kfactor", 0.4));
    const [rows, setRows] = useState<BendRow[]>([
        {id: cryptoId(), flange: 80, angle: 90, radius: 1, kfactor: undefined, thick: undefined},
        {id: cryptoId(), flange: 120, angle: 90, radius: 1, kfactor: undefined, thick: undefined},
    ]);

    useEffect(() => saveLS("calc_kfactor", globalK), [globalK]);

    const remove = (id: string) => setRows((xs) => xs.filter((r) => r.id !== id));
    const add = () => setRows((xs) => [...xs, {id: cryptoId(), flange: 50, angle: 90, radius: 1}]);
    const patch = (id: string, patch: Partial<BendRow>) =>
        setRows((xs) => xs.map((r) => (r.id === id ? {...r, ...patch} : r)));

    const computed = useMemo(() => {
        let sumBA = 0;
        let sumBD = 0;
        let flat = 0;

        const result = rows.map((r) => {
            const t = r.thick ?? globalT;
            const k = clamp(r.kfactor ?? globalK, 0.2, 0.6);
            const theta = clamp(r.angle, 0, 180);
            const R = Math.max(0, r.radius);
            const thetaRad = rad(theta);

            const BA = thetaRad * (R + k * t); // мм (т.к. все в мм)
            const BD = 2 * (R + t) * Math.tan(thetaRad / 2) - BA;

            sumBA += BA;
            sumBD += BD;

            return {...r, t, k, theta, BA, BD};
        });

        const sumFlanges = rows.reduce((acc, r) => acc + Math.max(0, r.flange), 0);

        if (mode === "outside") flat = sumFlanges - sumBD;
        else flat = sumFlanges + sumBA;

        return {result, sumFlanges, sumBA, sumBD, flat};
    }, [rows, globalT, globalK, mode]);

    const copyCSV = () => {
        const header = [
            "#", "Flange(mm)", "Angle(deg)", "R_in(mm)", "t(mm)", "K", "BA(mm)", "BD(mm)"
        ];
        const lines = computed.result.map((r, i) => [
            i + 1, r.flange, r.angle, r.radius, r.thick ?? globalT, r.kfactor ?? globalK, formatNum((r as any).BA, 3), formatNum((r as any).BD, 3)
        ].join(","));
        const csv = [header.join(","), ...lines, "Total,, , , , ," + formatNum(computed.sumBA, 3) + "," + formatNum(computed.sumBD, 3),
            `FlatLength(mm),${formatNum(computed.flat, 3)}`
        ].join("\n");

        navigator.clipboard.writeText(csv).catch(() => {
        });
    };

    return (
        <div className="rounded-2xl border bg-white dark:bg-zinc-800 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Развёртка листа (упрощённо)</h3>

            <div className="mt-3 flex flex-wrap gap-2">
                <button className={btn(mode === "outside")} onClick={() => setMode("outside")}>Outside (Σфланцы − ΣBD)
                </button>
                <button className={btn(mode === "inside")} onClick={() => setMode("inside")}>Inside (Σвнутр. + ΣBA)
                </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div>
                    <label className="text-sm">Толщина t, мм (по умолчанию)</label>
                    <input type="number"
                           className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                           value={globalT}
                           onChange={(e) => setGlobalT(+e.target.value)} min={0.2} step={0.1}/>
                </div>
                <div>
                    <label className="text-sm">K‑factor (по умолчанию)</label>
                    <input type="number"
                           className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                           value={globalK}
                           onChange={(e) => setGlobalK(+e.target.value)} min={0.2} max={0.6} step={0.01}/>
                </div>
                <div className="flex items-end">
                    <button onClick={add}
                            className="rounded-xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">+
                        Добавить гиб
                    </button>
                </div>
            </div>

            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm border divide-y">
                    <thead className="bg-zinc-50 dark:bg-zinc-700 dark:text-white">
                    <tr>
                        <th className="text-left p-3">#</th>
                        <th className="text-left p-3">Фланец, мм</th>
                        <th className="text-left p-3">Угол, °</th>
                        <th className="text-left p-3">Rвн, мм</th>
                        <th className="text-left p-3">t, мм</th>
                        <th className="text-left p-3">K</th>
                        <th className="text-left p-3">BA, мм</th>
                        <th className="text-left p-3">BD, мм</th>
                        <th className="text-left p-3"></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y">
                    {computed.result.map((r, i) => (
                        <tr key={r.id}>
                            <td className="p-2">{i + 1}</td>
                            <td className="p-2"><input type="number" value={r.flange}
                                                       onChange={(e) => patch(r.id, {flange: +e.target.value})}
                                                       className="w-28 rounded-lg border px-2 py-1 bg-white/70 dark:bg-zinc-900"/>
                            </td>
                            <td className="p-2"><input type="number" value={r.angle} min={0} max={180}
                                                       onChange={(e) => patch(r.id, {angle: +e.target.value})}
                                                       className="w-24 rounded-lg border px-2 py-1 bg-white/70 dark:bg-zinc-900"/>
                            </td>
                            <td className="p-2"><input type="number" value={r.radius}
                                                       onChange={(e) => patch(r.id, {radius: +e.target.value})}
                                                       className="w-24 rounded-lg border px-2 py-1 bg-white/70 dark:bg-zinc-900"/>
                            </td>
                            <td className="p-2"><input type="number" placeholder={String(globalT)} value={r.thick ?? ""}
                                                       onChange={(e) => patch(r.id, {thick: e.target.value === "" ? undefined : +e.target.value})}
                                                       className="w-20 rounded-lg border px-2 py-1 bg-white/70 dark:bg-zinc-900"/>
                            </td>
                            <td className="p-2"><input type="number" placeholder={String(globalK)} step={0.01} min={0.2}
                                                       max={0.6} value={r.kfactor ?? ""}
                                                       onChange={(e) => patch(r.id, {kfactor: e.target.value === "" ? undefined : +e.target.value})}
                                                       className="w-20 rounded-lg border px-2 py-1 bg-white/70 dark:bg-zinc-900"/>
                            </td>
                            <td className="p-2">
                                <span className="inline-block min-w-20">{formatNum((r as any).BA, 3)}</span>
                            </td>
                            <td className="p-2">
                                <span className="inline-block min-w-20">{formatNum((r as any).BD, 3)}</span>
                            </td>
                            <td className="p-2 text-right">
                                <button onClick={() => remove(r.id)}
                                        className="text-red-600 text-xs hover:underline">Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-5">
                <Stat label="Σ фланцев, мм" value={formatNum(computed.sumFlanges, 3)}/>
                <Stat label="Σ BA, мм" value={formatNum(computed.sumBA, 3)}/>
                <Stat label="Σ BD, мм" value={formatNum(computed.sumBD, 3)}/>
                <Stat label="Развёртка, мм" value={formatNum(computed.flat, 3)}/>
                <div className="flex items-end">
                    <button onClick={copyCSV}
                            className="w-full rounded-xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">Копировать
                        CSV
                    </button>
                </div>
            </div>

            <p className="mt-3 text-xs text-zinc-500">
                Примечание: формулы BA = θ·(R + K·t), BD = 2·(R + t)·tan(θ/2) − BA, где θ в радианах. Итог упрощён,
                реальные значения зависят от оснастки, финиша и пружинения.
            </p>
        </div>
    );
}

function cryptoId() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return (crypto as any).randomUUID();
    return Math.random().toString(36).slice(2);
}

/**
 * 4) Справка по K‑factor
 */
function KFactorHelpCard() {
    const rows = [
        {label: "Нерж. сталь AISI 304/316, air bending", k: "0.38 – 0.45"},
        {label: "Нерж. сталь, coining (осадка)", k: "0.30 – 0.36"},
        {label: "Обычная сталь (CRS), air bending", k: "0.35 – 0.42"},
        {label: "Алюминий, air bending", k: "0.33 – 0.40"},
    ];

    const hints = [
        "Выше K → больше припуск BA, меньше BD (длиннее развёртка).",
        "Типовая отправная точка для нержавейки при гибке по воздуху: K ≈ 0.40.",
        "При увеличении V‑матрицы (V/t) нейтральный слой смещается — корректируйте K.",
        "Фиксируйте согласованное значение K в техзадании и модели развёртки.",
    ];

    return (
        <div className="rounded-2xl border bg-white dark:bg-zinc-800 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Справка по K‑factor</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                K‑factor — безразмерный коэффициент, описывающий положение нейтрального слоя при гибке. Используется в
                формулах
                Bend Allowance (BA) и Bend Deduction (BD) для расчёта развёртки.
            </p>

            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm border divide-y">
                    <thead className="bg-zinc-50 dark:bg-zinc-700 dark:text-white">
                    <tr>
                        <th className="text-left p-3">Материал / режим</th>
                        <th className="text-left p-3">Диапазон K</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y">
                    {rows.map((r) => (
                        <tr key={r.label}>
                            <td className="p-3">{r.label}</td>
                            <td className="p-3">{r.k}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <ul className="mt-4 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-200 space-y-1">
                {hints.map((h, i) => (
                    <li key={i}>{h}</li>
                ))}
            </ul>
        </div>
    );
}

export default function MetalCalcPage() {
    const [tab, setTab] = useState("sheet");

    const tabs = [
        {id: "sheet", title: "Масса листа"},
        {id: "profile", title: "Масса трубы/прутка"},
        {id: "flat", title: "Развёртка (BA/BD)"},
        {id: "kref", title: "K‑factor"},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-6">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">Инструменты</p>
                <h1 className="text-3xl sm:text-4xl font-bold">Калькулятор по нержавейке</h1>
                <p className="mt-2 text-zinc-600 dark:text-zinc-300 max-w-3xl">
                    Быстрые расчёты массы и развёртки для AISI 304/316. Результаты носят ознакомительный характер —
                    подтверждайте на образцах и согласовывайте параметры с производством.
                </p>
            </header>

            <SectionTabs tabs={tabs} active={tab} onChange={setTab}/>

            <div className="mt-6 space-y-6">
                {tab === "sheet" && <SheetMassCard/>}
                {tab === "profile" && <ProfileMassCard/>}
                {tab === "flat" && <FlatPatternCard/>}
                {tab === "kref" && <KFactorHelpCard/>}
            </div>
        </main>
    );
}
