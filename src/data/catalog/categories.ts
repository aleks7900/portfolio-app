export type Subcat = { key: string; labelKey: string };
export type Cat = { key: string; labelKey: string; children: Subcat[] };

// пример (подставь свой реальный список)
export const CAT: Cat[] = [
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

export const CATS: Cat[] = [
    {
        key: "electronics", labelKey: "cat_electronics", children: [
            {key: "laptops", labelKey: "sub_laptops"},
            {key: "phones", labelKey: "sub_phones"},
            {key: "tablets", labelKey: "sub_tablets"},
        ]
    },
    {
        key: "home", labelKey: "cat_home", children: [
            {key: "vacuum", labelKey: "sub_vacuum"},
            {key: "fridges", labelKey: "sub_fridges"},
        ]
    },
    {
        key: "accessories", labelKey: "cat_accessories", children: [
            {key: "headphones", labelKey: "sub_headphones"},
            {key: "chargers", labelKey: "sub_chargers"},
        ]
    },
];