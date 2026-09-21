import {Suspense, useMemo} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import Container from "../../shared/Container.tsx";
import {SERVICES} from "../../data/data.ts";
import {SERVICE_PAGE_MAP} from "./ServiceRegistry.ts";
import {toLangHref, useI18n} from "../../shared/i18n/i18n.tsx";
import PageTransition from "../../components/motion/PageTransition.tsx";
import {Button} from "../../components/ui/button.tsx";

// Базовый фолбэк, когда для slug нет отдельной страницы
function GenericServiceBlock({title, lead}: { title: string; lead?: string }) {
    return (
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
            {lead && <p className="mt-2 text-muted-foreground">{lead}</p>}
            <p className="mt-4 text-sm text-muted-foreground/80">
                Для этой услуги ещё нет отдельной страницы. Свяжитесь с нами — подскажем по срокам и цене.
            </p>
        </div>
    );
}

export default function ServicePages() {
    const {slug} = useParams();
    const {lang} = useI18n();
    const svc = useMemo(() => SERVICES.find((s) => s.slug === slug), [slug]);

    if (!svc) return <Navigate to={toLangHref("/service", lang)} replace/>;

    // выбираем компонент по slug; если нет — фолбэк
    const LazyPage = slug ? SERVICE_PAGE_MAP[slug] : undefined;

    return (
        <PageTransition>
            <section className="scroll-mt-24 py-8 sm:py-12">
                <Container>
                    {/* Хлебные крошки */}
                    <nav className="mb-6 mt-4 text-sm text-muted-foreground flex items-center gap-2">
                        <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
                        <span>/</span>
                        <Link to={toLangHref("/service", lang)} className="hover:text-foreground transition-colors">Услуги</Link>
                        <span>/</span>
                        <span className="font-medium text-foreground">{svc.title}</span>
                    </nav>

                    {/* Контент услуги по slug */}
                    <div className="mt-6">
                        {LazyPage ? (
                            <Suspense
                                fallback={
                                    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                                        <div className="h-6 w-48 bg-muted rounded-md animate-pulse mb-4"/>
                                        <div className="h-4 w-full bg-muted rounded-md animate-pulse mb-2.5"/>
                                        <div className="h-4 w-5/6 bg-muted rounded-md animate-pulse"/>
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
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <Button asChild variant="glow" size="lg">
                            <Link to={toLangHref("/contacts", lang)}>
                                Связаться
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link to="/catalog">
                                Открыть каталог
                            </Link>
                        </Button>
                    </div>
                </Container>
            </section>
        </PageTransition>
    );
}
