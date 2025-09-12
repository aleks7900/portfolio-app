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
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "light");
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") root.classList.add("dark"); else root.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);
    const toggle = () => setTheme(t => t === "dark" ? "light" : "dark");
    const value = useMemo(() => ({theme, toggle}), [theme]);
    return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}