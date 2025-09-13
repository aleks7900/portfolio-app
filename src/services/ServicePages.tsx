import { useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import Container from "../shared/Container";
import {SERVICES} from "../catalog/data.ts";

export default function ServicePages() {
    const { slug } = useParams();
    const svc = useMemo(() => SERVICES.find(s => s.slug === slug), [slug]);

    if (!svc) return <Navigate to="/service" replace />;

    return (
        <section className="scroll-mt-24 py-10 sm:py-14">
            <Container>
                {/* Хлебные крошки */}
                <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    <Link to="/" className="hover:underline">Главная</Link>
                    <span className="mx-2">/</span>
                    <Link to="/service" className="hover:underline">Услуги</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-700 dark:text-gray-200">{svc.title}</span>
                </nav>

                {/* Хедер */}
                <div className="grid gap-6 sm:grid-cols-[1.2fr,1fr]">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{svc.title}</h1>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">{svc.lead}</p>

                        {/* Факты */}
                        <div className="mt-5 flex flex-wrap gap-3 text-sm">
                            {svc.priceFrom != null && (
                                <span className="rounded-full border px-3 py-1 dark:border-white/10">
                  от {svc.priceFrom} MDL
                </span>
                            )}
                            {svc.duration && (
                                <span className="rounded-full border px-3 py-1 dark:border-white/10">
                  {svc.duration}
                </span>
                            )}
                        </div>

                        {svc.features && (
                            <ul className="mt-6 grid gap-2 text-sm">
                                {svc.features.map(f => (
                                    <li key={f} className="flex items-start gap-2">
                                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {svc.hero && (
                        <div className="rounded-2xl border bg-white p-2 shadow-sm dark:bg-black dark:border-white/10">
                            <img src={svc.hero} alt="" className="h-56 w-full rounded-xl object-cover" />
                        </div>
                    )}
                </div>

                {/* Контентные секции */}
                <div className="mt-10 grid gap-8">
                    {svc.sections.map((sec) => (
                        <section key={sec.heading}>
                            <h2 className="text-xl font-semibold">{sec.heading}</h2>
                            <div
                                className="prose prose-sm dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: sec.html }}
                            />
                        </section>
                    ))}
                </div>

                {/* FAQ */}
                {svc.faqs?.length ? (
                    <div className="mt-10 rounded-2xl border p-4 dark:border-white/10">
                        <h3 className="text-lg font-semibold">Частые вопросы</h3>
                        <div className="mt-4 space-y-4">
                            {svc.faqs.map((f) => (
                                <details key={f.q} className="rounded-xl bg-black/5 p-3 dark:bg-white/5">
                                    <summary className="cursor-pointer select-none text-sm font-medium">{f.q}</summary>
                                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">{f.a}</div>
                                </details>
                            ))}
                        </div>
                    </div>
                ) : null}

                {/* CTA */}
                <div className="mt-10 flex flex-wrap items-center gap-3">
                    <Link
                        to="/contacts"
                        className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
                    >
                        Связаться
                    </Link>
                    <Link
                        to="/catalog"
                        className="rounded-xl border px-4 py-2 text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                    >
                        Открыть каталог
                    </Link>
                </div>
            </Container>
        </section>
    );
}
