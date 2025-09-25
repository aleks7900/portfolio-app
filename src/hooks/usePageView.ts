import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {track} from "../lib/analytics.ts";

export function usePageView(): void {
    const location = useLocation();

    useEffect(() => {
        track("page_view", {
            pathname: location.pathname,
            search: location.search,
        });
        // можно добавить scroll depth позже
    }, [location.pathname, location.search]);
}