import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {trackPageView} from "../lib/analytics.ts";

export default function PageEvents() {
    const location = useLocation();
    useEffect(() => {
        trackPageView({path: location.pathname, referrer: location.search});
    }, [location.pathname, location.search]);
    return null;
}