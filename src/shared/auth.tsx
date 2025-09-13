import React, {createContext, useContext, useMemo, useState} from "react";

type AuthCtx = {
    isAuth: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};
const Ctx = createContext<AuthCtx | null>(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const c = useContext(Ctx);
    if (!c) throw new Error("Auth provider missing");
    return c;
};

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem("auth_token"));

    const login = async (email: string, password: string) => {
        if (!email || !password) throw new Error("Email and password are required");
        // демо: авторизуем любого — сохраняем «токен»
        localStorage.setItem("auth_token", "demo-token");
        setIsAuth(true);
    };

    const logout = () => {
        localStorage.removeItem("auth_token");
        setIsAuth(false);
    };

    const value = useMemo(() => ({isAuth, login, logout}), [isAuth]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}