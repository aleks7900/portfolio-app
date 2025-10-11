export type Subcat = { key: string; labelKey: string };
export type Cat = { key: string; labelKey: string; children: Subcat[] };

export const CATS: Cat[] = [
    {
        key:  "custom_orders",
        children:  [
            {
                key:  "site_orders",
                labelKey:  "sub_site_orders"
            },
            {
                key:  "spa_orders",
                labelKey:  "sub_spa_orders"
            },
            {
                key:  "pwa_orders",
                labelKey:  "sub_pwa_orders"
            },
            {
                key:  "landing_orders",
                labelKey:  "sub_landing_orders"
            },
            {
                key:  "web_app_orders",
                labelKey:  "sub_web_app_orders"
            },
        ],
        labelKey:  "cat_custom_orders"
    },
    {
        key:  "non_standard_solutions",
        children:  [
            {
                key:  "site_non_standard_solutions",
                labelKey:  "sub_site_non_standard_solutions"
            },
            {
                key:  "spa_non_standard_solutions",
                labelKey:  "sub_spa_non_standard_solutions"
            },
            {
                key:  "pwa_non_standard_solutions",
                labelKey:  "sub_pwa_non_standard_solutions"
            },
            {
                key:  "landing_non_standard_solutions",
                labelKey:  "sub_landing_non_standard_solutions"
            },
            {
                key:  "web_app_non_standard_solutions",
                labelKey:  "sub_web_app_non_standard_solutions"
            },
        ],
        labelKey:  "cat_non_standard_solutions"
    },
    {
        key:  "android_apps",
        children:  [
            {
                key:  "site_android_apps",
                labelKey:  "sub_site_android_apps"
            },
            {
                key:  "spa_android_apps",
                labelKey:  "sub_spa_android_apps"
            },
            {
                key:  "pwa_android_apps",
                labelKey:  "sub_pwa_android_apps"
            },
            {
                key:  "landing_android_apps",
                labelKey:  "sub_landing_android_apps"
            },
            {
                key:  "web_app_android_apps",
                labelKey:  "sub_web_app_android_apps"
            },
        ],
        labelKey:  "cat_android_apps"
    },
];