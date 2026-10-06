import React, {createContext, useContext, useEffect, useMemo, useState} from "react";

export type Theme = "light" | "dark";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void } | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
    const ctx = useContext(ThemeCtx);
    if (!ctx) throw new Error("Theme provider missing");
    return ctx;
}

export function ThemeProvider({children}: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem("theme") as Theme | null;
        if (saved === "light" || saved === "dark") return saved;
        if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") root.classList.add("dark"); else root.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e: MediaQueryListEvent) => {
            const userManual = localStorage.getItem("theme_user_override");
            if (!userManual) {
                setTheme(e.matches ? "dark" : "light");
            }
        };
        mediaQuery.addEventListener?.("change", handler);
        return () => mediaQuery.removeEventListener?.("change", handler);
    }, []);

    const toggle = () => {
        localStorage.setItem("theme_user_override", "true");
        setTheme(t => t === "dark" ? "light" : "dark");
    };

    const value = useMemo(() => ({theme, toggle}), [theme]);
    return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}