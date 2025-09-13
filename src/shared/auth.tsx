import React, {createContext, useContext, useMemo, useState} from "react";

export type User = {
    email: string;
    isAdmin: boolean;
};

type AuthCtx = {
    user: User | null;
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

// кто админ — укажи свои условия
const ADMIN_EMAILS = ["admin@example.com", "you@yourdomain.com"];

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const raw = localStorage.getItem("auth_user");
        return raw ? (JSON.parse(raw) as User) : null;
    });

    const login = async (email: string, password: string) => {
        if (!email || !password) throw new Error("Email and password are required");
        const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase()) || password === "admin";
        const u: User = {email, isAdmin};
        localStorage.setItem("auth_user", JSON.stringify(u));
        setUser(u);
    };

    const logout = () => {
        localStorage.removeItem("auth_user");
        setUser(null);
    };

    const value = useMemo(
        () => ({user, isAuth: !!user, login, logout}),
        [user]
    );

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}