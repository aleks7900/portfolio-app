import React, { lazy } from "react";

// Ключи — это slug из вашего ROUTER/URL
export const SERVICE_PAGE_MAP: Record<
    string,
    React.LazyExoticComponent<React.ComponentType<any>>
> = {
    "laser-cutting": lazy(() => import("./LaserCutStainlessPage.tsx")),
    "design-engineering": lazy(() => import("./DesignStainlessPage.tsx")),
    "bending": lazy(() => import("./BendStainlessPage.tsx")),
    "rolling": lazy(() => import("./RollStainlessPage.tsx")),

    // "drilling-cutting": lazy(() => import("./BendStainlessPage.tsx")),
    // "bandsaw-cutting": lazy(() => import("./BendStainlessPage.tsx")),
    // "pipe-connection": lazy(() => import("./BendStainlessPage.tsx")),
    // "grinder-cutting": lazy(() => import("./BendStainlessPage.tsx")),

    "welding": lazy(() => import("./WeldStainlessPage.tsx")),
    "acid-treatment": lazy(() => import("./AcidTreatmentStainlessPage.tsx")),
    "guide": lazy(() => import("../StainlessGuidePage.tsx")),
    // добавляйте дальше:
    // "welding-stainless": lazy(() => import("./WeldingStainlessPage")),
};