/// <reference types="vite/client" />

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PUBLIC_ORIGIN?: string;
    readonly VITE_IMG_BASE_URL?: string;
    readonly VITE_IMAGES_BASE?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
