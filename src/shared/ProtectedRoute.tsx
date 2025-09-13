import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "./auth";
import {useI18n} from "./i18n";

export default function ProtectedRoute() {
    const {isAuth} = useAuth();
    const {t} = useI18n();
    const loc = useLocation();
    if (!isAuth) {
        return (
            <div className="mx-auto max-w-2xl px-4 sm:px-6 py-24 text-center">
                <div className="mb-4 text-lg">{t("need_auth")}</div>
                <Navigate to="/" replace state={{from: loc}}/>
            </div>
        );
    }
    return <Outlet/>;
}