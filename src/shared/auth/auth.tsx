import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {apiFetch} from "../api/api.ts";
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
        typeof payload["sub"] === "string"
            ? payload["sub"]
            : typeof payload["email"] === "string"
                ? payload["email"]
                : "";

    let roles: string[] = [];
    const r = payload["roles"] ?? payload["role"] ?? payload["authorities"];
    if (Array.isArray(r)) {
        roles = r.map(String);
    } else if (typeof r === "string") {
        roles = [r];
    }

    const isAdmin =
        roles.includes("ROLE_ADMIN") ||
        roles.includes("ADMIN") ||
        roles.some((x) => x.toLowerCase().includes("admin"));

    return {email, roles, isAdmin};
}

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem(LS_TOKEN));
    const [user, setUser] = useState<User | null>(() => (token ? extractUser(token) : null));

    const logout = useCallback(() => {
        localStorage.removeItem(LS_TOKEN);
        setToken(null);
        setUser(null);
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const body = JSON.stringify({email, password});

        const data: Record<string, unknown> = await apiFetch<Record<string, unknown>>("/auth/login", {
            method: "POST",
            body,
            auth: false,
        });

        const tokenVal =
            (typeof data["token"] === "string" && data["token"]) ||
            (typeof data["accessToken"] === "string" && data["accessToken"]) ||
            (typeof data["jwt"] === "string" && data["jwt"]) ||
            (typeof data["tokenType"] === "string" &&
            typeof data["accessToken"] === "string"
                ? `${data["tokenType"]} ${data["accessToken"]}`
                : null);

        const tok = tokenVal ? tokenVal.replace(/^Bearer\s+/i, "") : null;
        if (!tok) throw new Error("No token in response");

        const u = extractUser(tok);
        if (!u) throw new Error("Invalid token");

        localStorage.setItem(LS_TOKEN, tok);
        setToken(tok);
        setUser(u);
    }, []);

    useEffect(() => {
        const onUnauthorized = () => logout();
        window.addEventListener("auth:unauthorized", onUnauthorized as EventListener);
        return () => window.removeEventListener("auth:unauthorized", onUnauthorized as EventListener);
    }, [logout]);

    // При монтировании — выкинуть «протухший» токен
    useEffect(() => {
        if (token && isExpired(token)) logout();
    }, [token, logout]);

    const value = useMemo(
        () => ({user, isAuth: !!user, token, login, logout}),
        [user, token, login, logout]
    );

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}