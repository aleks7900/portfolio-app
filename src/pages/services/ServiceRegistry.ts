import React, {lazy} from "react";

// Ключи — это slug из вашего ROUTER/URL
export const SERVICE_PAGE_MAP: Record<
    string,
    React.LazyExoticComponent<React.ComponentType<any>>
> = {
    "laser-cutting": lazy(() => import("./LaserCutStainlessPage.tsx")),
    "design-engineering": lazy(() => import("./DesignStainlessPage.tsx")),
    "bending": lazy(() => import("./BendStainlessPage.tsx")),
    "rolling": lazy(() => import("./RollStainlessPage.tsx")),

    "drilling-cutting": lazy(() => import("./FitStainlessPage.tsx")),
    "bandsaw-cutting": lazy(() => import("./FitStainlessPage.tsx")),
    "pipe-connection": lazy(() => import("./FitStainlessPage.tsx")),
    "grinder-cutting": lazy(() => import("./FitStainlessPage.tsx")),
    "stiffener": lazy(() => import("./FitStainlessPage.tsx")),

    "welding": lazy(() => import("./WeldStainlessPage.tsx")),
    "acid-treatment": lazy(() => import("./AcidTreatmentStainlessPage.tsx")),
    "guide": lazy(() => import("../StainlessGuidePage.tsx")),

    "guide_304": lazy(() => import("./AISI304Page.tsx")),
    "guide_316": lazy(() => import("./Aisi316StainlessPage.tsx")),
    "guide_321": lazy(() => import("./AISI321Page.tsx")),
    "guide_430": lazy(() => import("./AISI430Page.tsx")),
    // добавляйте дальше:
    // "welding-stainless": lazy(() => import("./WeldingStainlessPage")),
};