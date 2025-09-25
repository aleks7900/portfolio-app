export type Subcat = { key: string; labelKey: string };
export type Cat = { key: string; labelKey: string; children: Subcat[] };

export const CATS: Cat[] = [
    {
        key:  "custom_orders",
        children:  [
            {
                key:  "balustrade_perila",
                labelKey:  "sub_balustrade_perila"
            },
            {
                key:  "boxes",
                labelKey:  "sub_boxes"
            },
            {
                key:  "cafe",
                labelKey:  "sub_cafe"
            },
            {
                key:  "carcase",
                labelKey:  "sub_carcase"
            },
            {
                key:  "caruciors",
                labelKey:  "sub_caruciors"
            },
            {
                key:  "cauldrons",
                labelKey:  "sub_cauldrons"
            },
            {
                key:  "decor",
                labelKey:  "sub_decor"
            },
            {
                key:  "furnitura",
                labelKey:  "sub_furnitura"
            },
            {
                key:  "ladder",
                labelKey:  "sub_ladder"
            },
            {
                key:  "mangal_and_grill",
                labelKey:  "sub_mangal_and_grill"
            },
            {
                key:  "masa",
                labelKey:  "sub_masa"
            },
            {
                key:  "melochi",
                labelKey:  "sub_melochi"
            },
            {
                key:  "mobila",
                labelKey:  "sub_mobila"
            },
            {
                key:  "other",
                labelKey:  "sub_other"
            },
            {
                key:  "podstavki",
                labelKey:  "sub_podstavki"
            },
            {
                key:  "prom",
                labelKey:  "sub_prom"
            },
            {
                key:  "reshetki",
                labelKey:  "sub_reshetki"
            },
            {
                key:  "sckaph",
                labelKey:  "sub_sckaph"
            },
            {
                key:  "sinks",
                labelKey:  "sub_sinks"
            },
            {
                key:  "tandoors",
                labelKey:  "sub_tandoors"
            },
            {
                key:  "tanks",
                labelKey:  "sub_tanks"
            },
            {
                key:  "tavas",
                labelKey:  "sub_tavas"
            },
            {
                key:  "towel",
                labelKey:  "sub_towel"
            },
            {
                key:  "trash_bins",
                labelKey:  "sub_trash_bins"
            },
            {
                key:  "wheels",
                labelKey:  "sub_wheels"
            }
        ],
        labelKey:  "cat_custom_orders"
    },
    {
        key:  "non-standard_products",
        children:  [
            {
                key:  "street_mobil",
                labelKey:  "sub_street_mobil"
            },
            {
                key:  "signs",
                labelKey:  "sub_signs"
            },
            {
                key:  "tanks",
                labelKey:  "sub_tanks"
            },
            {
                key:  "air",
                labelKey:  "sub_air"
            },
            {
                key:  "water",
                labelKey:  "sub_water"
            },
            {
                key:  "stock",
                labelKey:  "sub_stock"
            },
            {
                key:  "containers",
                labelKey:  "sub_containers"
            },
            {
                key:  "pools",
                labelKey:  "sub_pools"
            },
            {
                key:  "fountains",
                labelKey:  "sub_fountains"
            },
            {
                key:  "food_industry",
                labelKey:  "sub_food_industry"
            },
            {
                key:  "pharmaceutical_industry",
                labelKey:  "sub_pharmaceutical_industry"
            },
            {
                key:  "medical_industry",
                labelKey:  "sub_medical_industry"
            },
            {
                key:  "store",
                labelKey:  "sub_store"
            },
            {
                key:  "wine",
                labelKey:  "sub_wine"
            },
            {
                key:  "sport",
                labelKey:  "sub_sport"
            },
        ],
        labelKey:  "cat_non_standard_products"
    },
    {
        key:  "standard_products",
        children:  [
            {
                key:  "0_podtovarniki",
                labelKey:  "sub_0_podtovarniki"
            },
            {
                key:  "1_proizvodstvennye_moyki",
                labelKey:  "sub_1_proizvodstvennye_moyki"
            },
            {
                key:  "2_proizvodstvennye_stellazhy",
                labelKey:  "sub_2_proizvodstvennye_stellazhy"
            },
            {
                key:  "3_poruchni_opornye",
                labelKey:  "sub_3_poruchni_opornye"
            },
            {
                key:  "4_proizvodstvenye_polki",
                labelKey:  "sub_4_proizvodstvenye_polki"
            },
            {
                key:  "5_kompleksnye_resheniya",
                labelKey:  "sub_5_kompleksnye_resheniya"
            },
            {
                key:  "6_stoli_tumba_na_zakaz",
                labelKey:  "sub_6_stoli_tumba_na_zakaz"
            },
            {
                key:  "7_proizvodstvennye_stoly_s_razdvizhnymi_yaschikami_katalog",
                labelKey:  "sub_7_proizvodstvennye_stoly_s_razdvizhnymi_yaschikami_katalog"
            },
            {
                key:  "8_proizvodstvennye_stoly_katalog",
                labelKey:  "sub_8_proizvodstvennye_stoly_katalog"
            }
        ],
        labelKey:  "cat_standard_products"
    },
    // {
    //     key: "accessories", labelKey: "cat_accessories", children: [
    //         {key: "headphones", labelKey: "sub_headphones"},
    //         {key: "chargers", labelKey: "sub_chargers"},
    //     ]
    // },
];