import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "./auth/auth.tsx";
import type {JSX} from "react";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuth } = useAuth();
    const loc = useLocation();
    if (!isAuth) return <Navigate to="/" replace state={{ from: loc }} />;
    return children;
}

export function AdminRoute({ children }: { children: JSX.Element }) {
    const { isAuth, user } = useAuth();
    const loc = useLocation();
    if (!isAuth || !user?.isAdmin) return <Navigate to="/" replace state={{ from: loc }} />;
    return children;
}