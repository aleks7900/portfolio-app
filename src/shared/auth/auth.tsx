import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {apiFetch, configureApi} from "../api/api.ts";
import {decodeJwt, isExpired, type JwtPayload} from "./jwt.ts";

export type User = {
    email: string;
    roles: string[];
    isAdmin: boolean;
};

type AuthCtx = {
    user: User | null;
    isAuth: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("AuthProvider missing");
    return ctx;
};

const LS_TOKEN = "auth_token";

function extractUser(token: string): User | null {
    const payload: JwtPayload | null = decodeJwt(token);
    if (!payload) return null;
    const email =
        payload.email ||
        (typeof payload.sub === "string" ? payload.sub : "") ||
        "";
    const roles: string[] = Array.isArray(payload.roles)
        ? payload.roles
        : Array.isArray(payload.authorities)
            ? payload.authorities
            : [];
    const isAdmin = roles.includes("ROLE_ADMIN") || roles.includes("ADMIN");
    return {email, roles, isAdmin};
}

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem(LS_TOKEN));
    const [user, setUser] = useState<User | null>(() => (token ? extractUser(token) : null));

    // Подключаем перехватчики API
    useEffect(() => {
        configureApi({
            getToken: () => token,
            onUnauthorized: () => logout(),
        });
    }, [token]);

    // При монтировании — выкинуть протухший токен
    useEffect(() => {
        if (token && isExpired(token)) {
            logout();
        }
    }, []); // один раз

    const login = async (email: string, password: string) => {
        // соответствуйте вашему ответу бэка:
        // допустимые варианты: { token }, { accessToken }, { jwt }, { tokenType, accessToken }, ...
        const body = JSON.stringify({email, password}); // если бэк ждёт username — смените ключ
        const data = await apiFetch("/api/auth/login", {
            method: "POST",
            body,
            auth: false, // логин — без Bearer
        });

        const raw =
            data?.token ||
            data?.accessToken ||
            data?.jwt ||
            (data?.tokenType && data?.accessToken ? `${data.tokenType} ${data.accessToken}` : null);

        // если вернули "Bearer xxx", вырежем префикс
        const tok = typeof raw === "string" ? raw.replace(/^Bearer\s+/i, "") : null;
        if (!tok) throw new Error("No token in response");

        const u = extractUser(tok);
        if (!u) throw new Error("Invalid token");

        localStorage.setItem(LS_TOKEN, tok);
        setToken(tok);
        setUser(u);
    };

    const logout = () => {
        localStorage.removeItem(LS_TOKEN);
        setToken(null);
        setUser(null);
    };

    const value = useMemo(
        () => ({user, isAuth: !!user, token, login, logout}),
        [user, token]
    );

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}