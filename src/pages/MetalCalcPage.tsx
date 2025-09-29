import {useEffect, useMemo, useState} from "react";
import {useI18n} from "../shared/i18n/i18n.tsx";

/**
 * Калькулятор металла: масса листа/профиля, развёртка, K-factor справка.
 * Маршрут: <Route path="/calc/metal" element={<MetalCalcPage/>} />
 */

type DensityPresetKey = "AISI_304" | "AISI_316" | "Custom";

const DENSITY_PRESETS: Record<DensityPresetKey, number> = {
    AISI_304: 8030, // кг/м³
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
    } catch { /* empty */ }
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

function SectionTabs({
                         tabs,
                         active,
                         onChange,
                     }: { tabs: { id: string; title: string }[]; active: string; onChange: (id: string) => void }) {
    return (
        <div className="flex flex-wrap gap-2 border-b pb-2">
            {tabs.map((t) => (
                <button
                    key={t.id}
                    onClick={() => onChange(t.id)}
                    className={
                        "rounded-xl px-3 py-1.5 text-sm font-medium border transition " +
                        (active === t.id
                            ? "!bg-gray-900 text-white border-gray-900"
                            : "dark:text-black hover:bg-black/5 dark:hover:bg-white/10")
                    }
                >
                    {t.title}
                </button>
            ))}
        </div>
    );
}

/** ===== 1) Масса листа / пластины ===== */
function SheetMassCard() {
    const {t} = useI18n();
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
            <h3 className="text-lg font-semibold">{t("calc_sheet_title")}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <LabeledNumber label={t("calc_length_mm")} value={lengthMm} setValue={setLengthMm} min={1}/>
                <LabeledNumber label={t("calc_width_mm")} value={widthMm} setValue={setWidthMm} min={1}/>
                <LabeledNumber label={t("calc_thickness_mm")} value={thickMm} setValue={setThickMm} step={0.1}
                               min={0.1}/>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div>
                    <label className="text-sm">{t("calc_density_label")}</label>
                    <select
                        className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                        value={densityKey}
                        onChange={(e) => setDensityKey(e.target.value as DensityPresetKey)}
                    >
                        <option value="AISI_304">{t("calc_density_304_option")}</option>
                        <option value="AISI_316">{t("calc_density_316_option")}</option>
                        <option value="Custom">{t("calc_density_custom_option")}</option>
                    </select>
                </div>
                <div className="sm:col-span-2">
                    <label className="text-sm">{t("calc_density_value_label")}</label>
                    <input
                        type="number"
                        className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                        value={density}
                        step={5}
                        min={7000}
                        max={9000}
                        onChange={(e) => setDensity(+e.target.value)}
                        disabled={densityKey !== "Custom"}
                    />
                </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-4">
                <Stat label={t("calc_area_m2")} value={formatNum(area, 3)}/>
                <Stat label={t("calc_volume_m3")} value={formatNum(volume, 6)}/>
                <Stat label={t("calc_mass_kg")} value={formatNum(mass, 3)}/>
                <Stat label={t("calc_mass_per_m2")} value={formatNum(massPerM2, 2)}/>
            </div>
        </div>
    );
}

function LabeledNumber({
                           label, value, setValue, step = 1, min,
                       }: {
    label: string;
    value: number;
    setValue: (n: number) => void;
    step?: number;
    min?: number
}) {
    return (
        <div>
            <label className="text-sm">{label}</label>
            <input
                type="number"
                className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                value={value}
                step={step}
                min={min}
                onChange={(e) => setValue(+e.target.value)}
            />
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

/** ===== 2) Масса трубы / прутка ===== */
function ProfileMassCard() {
    const {t} = useI18n();
    type Shape = "round_tube" | "rect_tube" | "round_bar";
    const [shape, setShape] = useState<Shape>("round_tube");
    const [densityKey, setDensityKey] = useState<DensityPresetKey>(loadLS("calc_density_key2", "AISI_304"));
    const [density, setDensity] = useState<number>(loadLS("calc_density2", DENSITY_PRESETS[densityKey]));
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

    let area_m2 = 0; // поперечное сечение
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

    const volume = area_m2 * L;
    const mass = volume * density;

    const invalid =
        (shape === "round_tube" && wtMm * 2 >= odMm) ||
        (shape === "rect_tube" && (wtrMm * 2 >= Math.min(wMm, hMm)));

    return (
        <div className="rounded-2xl border bg-white dark:bg-zinc-800 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{t("calc_profile_title")}</h3>

            <div className="mt-3 flex flex-wrap gap-2">
                <button className={btn(shape === "round_tube")}
                        onClick={() => setShape("round_tube")}>{t("calc_shape_round_tube")}</button>
                <button className={btn(shape === "rect_tube")}
                        onClick={() => setShape("rect_tube")}>{t("calc_shape_rect_tube")}</button>
                <button className={btn(shape === "round_bar")}
                        onClick={() => setShape("round_bar")}>{t("calc_shape_round_bar")}</button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <LabeledNumber label={t("calc_length_mm")} value={lengthMm} setValue={setLengthMm} min={1}/>
                <div>
                    <label className="text-sm">{t("calc_density_label")}</label>
                    <select
                        className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                        value={densityKey}
                        onChange={(e) => setDensityKey(e.target.value as DensityPresetKey)}
                    >
                        <option value="AISI_304">{t("calc_density_304_option")}</option>
                        <option value="AISI_316">{t("calc_density_316_option")}</option>
                        <option value="Custom">{t("calc_density_custom_option")}</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm">{t("calc_density_value_label")}</label>
                    <input
                        type="number"
                        className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900"
                        value={density}
                        onChange={(e) => setDensity(+e.target.value)}
                        disabled={densityKey !== "Custom"}
                    />
                </div>
            </div>

            {shape === "round_tube" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <LabeledNumber label={t("calc_od_mm")} value={odMm} setValue={setOdMm} min={1}/>
                    <LabeledNumber label={t("calc_wall_mm")} value={wtMm} setValue={setWtMm} step={0.1} min={0.1}/>
                    <div className="sm:col-span-1 flex items-end">
                        {invalid && <div className="text-xs text-red-600">{t("calc_err_wall_vs_radius")}</div>}
                    </div>
                </div>
            )}

            {shape === "rect_tube" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-4">
                    <LabeledNumber label={t("calc_width_mm")} value={wMm} setValue={setWMm} min={1}/>
                    <LabeledNumber label={t("calc_height_mm")} value={hMm} setValue={setHMm} min={1}/>
                    <LabeledNumber label={t("calc_wall_mm")} value={wtrMm} setValue={setWtrMm} step={0.1} min={0.1}/>
                    <div className="sm:col-span-1 flex items-end">
                        {invalid && <div className="text-xs text-red-600">{t("calc_err_wall_too_big")}</div>}
                    </div>
                </div>
            )}

            {shape === "round_bar" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <LabeledNumber label={t("calc_diameter_mm")} value={barDm} setValue={setBarDm} min={1}/>
                </div>
            )}

            <div className="mt-4 grid gap-3 sm:grid-cols-4">
                <Stat label={t("calc_section_m2")} value={formatNum(area_m2, 6)}/>
                <Stat label={t("calc_volume_m3")} value={formatNum(volume, 6)}/>
                <Stat label={t("calc_mass_kg")} value={formatNum(mass, 3)}/>
                <Stat label={t("calc_mass_per_meter")} value={formatNum(mass / Math.max(L, 1e-9), 3)}/>
            </div>
        </div>
    );
}

const btn = (active: boolean) =>
    "rounded-xl border px-3 py-1.5 text-sm font-medium " +
    (active ? "!bg-gray-900 text-white border-gray-900" : "!text-black hover:bg-black/5 dark:hover:bg-white/10");

/** ===== 3) Развёртка: BA/BD ===== */
type BendRow = {
    id: string;
    flange: number; // длина фланца (Outside/Inside метод определяется переключателем)
    angle: number;  // градусы 0..180
    radius: number; // Rвн
    kfactor?: number;
    thick?: number;
};

function FlatPatternCard() {
    const {t} = useI18n();
    const [mode, setMode] = useState<"outside" | "inside">("outside");
    const [globalT, setGlobalT] = useState<number>(2);
    const [globalK, setGlobalK] = useState<number>(loadLS("calc_kfactor", 0.4));
    const [rows, setRows] = useState<BendRow[]>([
        {id: cryptoId(), flange: 80, angle: 90, radius: 1},
        {id: cryptoId(), flange: 120, angle: 90, radius: 1},
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
            const tth = r.thick ?? globalT;
            const k = clamp(r.kfactor ?? globalK, 0.2, 0.6);
            const theta = clamp(r.angle, 0, 180);
            const R = Math.max(0, r.radius);
            const thetaRad = rad(theta);

            const BA = thetaRad * (R + k * tth); // мм
            const BD = 2 * (R + tth) * Math.tan(thetaRad / 2) - BA;

            sumBA += BA;
            sumBD += BD;

            return {...r, t: tth, k, theta, BA, BD};
        });

        const sumFlanges = rows.reduce((acc, r) => acc + Math.max(0, r.flange), 0);

        if (mode === "outside") flat = sumFlanges - sumBD;
        else flat = sumFlanges + sumBA;

        return {result, sumFlanges, sumBA, sumBD, flat};
    }, [rows, globalT, globalK, mode]);

    const copyCSV = () => {
        const header = [
            t("calc_csv_col_index"),
            t("calc_csv_flange_mm"),
            t("calc_csv_angle_deg"),
            t("calc_csv_radius_mm"),
            t("calc_csv_t_mm"),
            t("calc_csv_k"),
            t("calc_csv_ba_mm"),
            t("calc_csv_bd_mm"),
        ];
        const lines = computed.result.map((r, i) =>
            [
                i + 1,
                r.flange,
                r.angle,
                r.radius,
                (r as any).t,
                (r as any).k,
                formatNum((r as any).BA, 3),
                formatNum((r as any).BD, 3),
            ].join(",")
        );
        const csv = [
            header.join(","),
            ...lines,
            `${t("calc_csv_total")},,,, , ,${formatNum(computed.sumBA, 3)},${formatNum(computed.sumBD, 3)}`,
            `${t("calc_csv_flat_length_mm")},${formatNum(computed.flat, 3)}`
        ].join("\n");

        navigator.clipboard.writeText(csv).catch(() => {
        });
    };

    return (
        <div className="rounded-2xl border bg-white dark:bg-zinc-800 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{t("calc_flat_title")}</h3>

            <div className="mt-3 flex flex-wrap gap-2">
                <button className={btn(mode === "outside")}
                        onClick={() => setMode("outside")}>{t("calc_flat_mode_outside")}</button>
                <button className={btn(mode === "inside")}
                        onClick={() => setMode("inside")}>{t("calc_flat_mode_inside")}</button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <LabeledNumber label={t("calc_flat_t_default")} value={globalT} setValue={setGlobalT} min={0.2}
                               step={0.1}/>
                <LabeledNumber label={t("calc_flat_k_default")} value={globalK} setValue={setGlobalK} min={0.2}
                               step={0.01}/>
                <div className="flex items-end">
                    <button onClick={add}
                            className="rounded-xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
                        {t("calc_flat_add_bend")}
                    </button>
                </div>
            </div>

            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm border divide-y">
                    <thead className="bg-zinc-50 dark:bg-zinc-700 dark:text-white">
                    <tr>
                        <th className="text-left p-3">#</th>
                        <th className="text-left p-3">{t("calc_flat_col_flange")}</th>
                        <th className="text-left p-3">{t("calc_flat_col_angle")}</th>
                        <th className="text-left p-3">{t("calc_flat_col_radius")}</th>
                        <th className="text-left p-3">{t("calc_flat_col_t")}</th>
                        <th className="text-left p-3">{t("calc_flat_col_k")}</th>
                        <th className="text-left p-3">{t("calc_flat_col_ba")}</th>
                        <th className="text-left p-3">{t("calc_flat_col_bd")}</th>
                        <th className="text-left p-3"></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y">
                    {computed.result.map((r: any, i: number) => (
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
                            <td className="p-2"><input type="number" placeholder={String(r.t ?? "")}
                                                       value={r.thick ?? ""}
                                                       onChange={(e) => patch(r.id, {thick: e.target.value === "" ? undefined : +e.target.value})}
                                                       className="w-20 rounded-lg border px-2 py-1 bg-white/70 dark:bg-zinc-900"/>
                            </td>
                            <td className="p-2"><input type="number" placeholder={String(r.k ?? "")} step={0.01}
                                                       min={0.2} max={0.6} value={r.kfactor ?? ""}
                                                       onChange={(e) => patch(r.id, {kfactor: e.target.value === "" ? undefined : +e.target.value})}
                                                       className="w-20 rounded-lg border px-2 py-1 bg-white/70 dark:bg-zinc-900"/>
                            </td>
                            <td className="p-2"><span className="inline-block min-w-20">{formatNum(r.BA, 3)}</span></td>
                            <td className="p-2"><span className="inline-block min-w-20">{formatNum(r.BD, 3)}</span></td>
                            <td className="p-2 text-right">
                                <button onClick={() => remove(r.id)}
                                        className="text-red-600 text-xs hover:underline">{t("calc_delete")}</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-5">
                <Stat label={t("calc_sum_flanges")} value={formatNum(computed.sumFlanges, 3)}/>
                <Stat label={t("calc_sum_ba")} value={formatNum(computed.sumBA, 3)}/>
                <Stat label={t("calc_sum_bd")} value={formatNum(computed.sumBD, 3)}/>
                <Stat label={t("calc_flat_length")} value={formatNum(computed.flat, 3)}/>
                <div className="flex items-end">
                    <button onClick={copyCSV}
                            className="w-full rounded-xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg:white/10">
                        {t("calc_copy_csv")}
                    </button>
                </div>
            </div>

            <p className="mt-3 text-xs text-zinc-500">
                {t("calc_flat_note")}
            </p>
        </div>
    );
}

function cryptoId() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return (crypto as any).randomUUID();
    return Math.random().toString(36).slice(2);
}

/** ===== 4) Справка по K-factor ===== */
function KFactorHelpCard() {
    const {t} = useI18n();
    const rows = [
        {label: t("calc_kref_row1_label"), k: "0.38 – 0.45"},
        {label: t("calc_kref_row2_label"), k: "0.30 – 0.36"},
        {label: t("calc_kref_row3_label"), k: "0.35 – 0.42"},
        {label: t("calc_kref_row4_label"), k: "0.33 – 0.40"},
    ];

    const hints = [
        t("calc_kref_hint1"),
        t("calc_kref_hint2"),
        t("calc_kref_hint3"),
        t("calc_kref_hint4"),
    ];

    return (
        <div className="rounded-2xl border bg-white dark:bg-zinc-800 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{t("calc_kref_title")}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                {t("calc_kref_lead")}
            </p>

            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm border divide-y">
                    <thead className="bg-zinc-50 dark:bg-zinc-700 dark:text-white">
                    <tr>
                        <th className="text-left p-3">{t("calc_kref_col_material")}</th>
                        <th className="text-left p-3">{t("calc_kref_col_range")}</th>
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
    const {t} = useI18n();

    const [tab, setTab] = useState("sheet");

    const tabs = [
        {id: "sheet", title: t("calc_tab_sheet")},
        {id: "profile", title: t("calc_tab_profile")},
        {id: "flat", title: t("calc_tab_flat")},
        {id: "kref", title: t("calc_tab_kref")},
    ];

    return (
        <main className="mx-auto max-w-6xl px-4 mt-14 sm:px-6 lg:px-8 py-8">
            <header className="mb-6">
                <p className="text-sm tracking-wide uppercase text-emerald-700 font-semibold">
                    {t("calc_badge")}
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold">
                    {t("calc_title")}
                </h1>
                <p className="mt-2 text-zinc-600 dark:text-zinc-300 max-w-3xl">
                    {t("calc_lead")}
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
