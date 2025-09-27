import React, { lazy } from "react";

// Ключи — это slug из вашего ROUTER/URL
export const SERVICE_PAGE_MAP: Record<
    string,
    React.LazyExoticComponent<React.ComponentType<any>>
> = {
    "laser-cutting": lazy(() => import("./LaserCutStainlessPage")),
    "guide": lazy(() => import("./StainlessGuidePage")),
    // добавляйте дальше:
    // "welding-stainless": lazy(() => import("./WeldingStainlessPage")),
};