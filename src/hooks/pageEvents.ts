import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {track} from "../lib/analytics.ts";

export default function PageEvents() {
    const location = useLocation();
    useEffect(() => {
        track("page_view", {pathname: location.pathname, search: location.search});
    }, [location.pathname, location.search]);
    return null;
}