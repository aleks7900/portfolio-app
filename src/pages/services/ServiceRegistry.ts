import React, {lazy} from "react";

// Ключи — это slug из вашего ROUTER/URL
export const SERVICE_PAGE_MAP: Record<
    string,
    React.LazyExoticComponent<React.ComponentType<any>>
> = {
    "web": lazy(() => import("./WebDevServicesPage.tsx")),
    "spa": lazy(() => import("./SpaPwaDevPage.tsx")),
    "individual": lazy(() => import("./IndividualWebDevPage.tsx")),
    "business": lazy(() => import("./BusinessWebDevPage.tsx")),
    "site": lazy(() => import("./WebDevPage.tsx")),
    "visit": lazy(() => import("./WebVCardPage.tsx")),
    "market": lazy(() => import("./EcommerceDevPage.tsx")),
    "lending": lazy(() => import("./LandingDevelopmentPage.tsx")),
    "android": lazy(() => import("./AndroidDevPage.tsx")),
    "full": lazy(() => import("./FullWebsitePage.tsx")),
    "content": lazy(() => import("./ContentFillingPage.tsx")),
    "support": lazy(() => import("./SupportPage.tsx")),

    // добавляйте дальше:
    // "welding-stainless": lazy(() => import("./WeldingStainlessPage")),
};