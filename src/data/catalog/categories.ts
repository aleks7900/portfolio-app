export type Subcat = { key: string; labelKey: string };
export type Cat = { key: string; labelKey: string; children: Subcat[] };

// пример (подставь свой реальный список)
export const CATS: Cat[] = [
    {
        key: "metal",
        labelKey: "cat_metal",
        children: [
            {key: "sheet", labelKey: "cat_metal_sheet"},
            {key: "profile-pipe", labelKey: "cat_metal_profile_pipe"},
            {key: "round-pipe", labelKey: "cat_metal_round_pipe"},
            {key: "strip", labelKey: "cat_metal_strip"},
            {key: "angle", labelKey: "cat_metal_angle"},
            {key: "rod", labelKey: "cat_metal_rod"},
        ],
    },
    {
        key: "vinification",
        labelKey: "cat_vini",
        children: [
            {key: "tanks", labelKey: "cat_vini_tanks"},
            {key: "pumps", labelKey: "cat_vini_pumps"},
            {key: "fittings", labelKey: "cat_vini_fittings"},
        ],
    },
    {
        key: "furniture",
        labelKey: "cat_furniture",
        children: [
            {key: "tables", labelKey: "cat_furniture_tables"},
            {key: "shelves", labelKey: "cat_furniture_shelves"},
            {key: "legs", labelKey: "cat_furniture_legs"},
        ],
    },
];