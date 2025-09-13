import { useEffect } from "react";
export default function Seo({ title }: { title: string }) {
    useEffect(() => {
        const prev = document.title;
        document.title = title;
        return () => { document.title = prev; };
    }, [title]);
    return null;
}