import {Suspense, useMemo} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import Container from "../../shared/Container.tsx";
import {SERVICES} from "../../data/data.ts";
import {SERVICE_PAGE_MAP} from "./ServiceRegistry.ts";

// Базовый фолбэк, когда для slug нет отдельной страницы
function GenericServiceBlock({title, lead}: { title: string; lead?: string }) {
    return (
        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{title}</h2>
            {lead && <p className="mt-2 text-zinc-700">{lead}</p>}
            <p className="mt-4 text-sm text-zinc-500">
                Для этой услуги ещё нет отдельной страницы. Свяжитесь с нами — подскажем по срокам и цене.
            </p>
        </div>
    );
}

export default function ServicePages() {
    const {slug} = useParams();
    const svc = useMemo(() => SERVICES.find((s) => s.slug === slug), [slug]);

    if (!svc) return <Navigate to="/service" replace/>;

    // выбираем компонент по slug; если нет — фолбэк
    const LazyPage = slug ? SERVICE_PAGE_MAP[slug] : undefined;

    return (
        <section className="scroll-mt-24 py-10 sm:py-14">
            <Container>
                {/* Хлебные крошки */}
                <nav className="mb-6 mt-10 ml-37 text-sm text-gray-500 dark:text-gray-400">
                    <Link to="/" className="hover:underline">Главная</Link>
                    <span className="mx-2">/</span>
                    <Link to="/service" className="hover:underline">Услуги</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-700 dark:text-gray-200">{svc.title}</span>
                </nav>

                {/* Контент услуги по slug */}
                <div className="mt-6">
                    {LazyPage ? (
                        <Suspense
                            fallback={
                                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                                    <div className="h-5 w-40 bg-zinc-200 rounded animate-pulse mb-3"/>
                                    <div className="h-4 w-full bg-zinc-200 rounded animate-pulse mb-2"/>
                                    <div className="h-4 w-5/6 bg-zinc-200 rounded animate-pulse"/>
                                </div>
                            }
                        >
                            <LazyPage/>
                        </Suspense>
                    ) : (
                        <GenericServiceBlock title={svc.title} lead={svc.lead}/>
                    )}
                </div>

                {/* CTA */}
                <div className="mt-10 flex flex-wrap items-center gap-3">
                    <Link
                        to="/contacts"
                        className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg:white dark:text-black dark:hover:bg-white/90"
                    >
                        Связаться
                    </Link>
                    <Link
                        to="/catalog"
                        className="rounded-XL border px-4 py-2 text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                    >
                        Открыть каталог
                    </Link>
                </div>
            </Container>
        </section>
    );
}
