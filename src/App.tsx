import React from "react";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {I18nProvider, useI18n} from "./shared/i18n";
import {ThemeProvider} from "./shared/theme";
import Navbar from "./shared/Navbar";
import CatalogPage from "./catalog/CatalogPage";
import {ArrowUpRight, Hammer} from "lucide-react";
import {motion} from "framer-motion";
import Slideshow from "./shared/Slideshow.tsx";
import MapEmbed from "./shared/MapEmbed.tsx";
import {AuthProvider} from "./shared/auth";
import ProtectedRoute from "./shared/ProtectedRoute";
import ProductsPrivate from "./private/ProductsPrivate";


function ContactsPage() {
    const {t} = useI18n();
    return (
        <Section titleKey="contacts_title" leadKey="contacts_lead">
            <form onSubmit={(e) => {
                e.preventDefault();
                alert("Demo");
            }} className="max-w-xl space-y-4">
                <div><label className="block text-sm font-medium">{t("contacts_name")}</label><input
                    className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"
                    placeholder={t("contacts_name")}/></div>
                <div><label className="block text-sm font-medium">{t("contacts_email")}</label><input type="email"
                                                                                                      className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"
                                                                                                      placeholder="you@example.com"/>
                </div>
                <div><label className="block text-sm font-medium">{t("contacts_msg")}</label><textarea
                    className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300 dark:bg-black dark:border-white/20 dark:focus:ring-white/20"
                    placeholder={t("contacts_msg")} rows={4}/></div>
                <button type="submit"
                        className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90">{t("contacts_send")}</button>
            </form>
        </Section>
    );
}

function AboutPage() {
    const {t} = useI18n();
    return (
        <Section titleKey="about_title" leadKey="about_lead">
            <div className="prose max-w-none prose-p:leading-relaxed dark:prose-invert"><p>{t("about_p1")}</p>
                <p>{t("about_p2")}</p></div>

            <div className="mt-8"><p></p><p></p></div>

            {/* Карта без ключа */}
            <MapEmbed query="Chișinău, strada Pădurii 21/1" zoom={16}/>

            <div className="mt-4 text-sm">
                <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Chișinău, strada Pădurii 21/1")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-xl px-4 py-2 border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                    Открыть маршрут в Google Maps
                </a>
            </div>
        </Section>
    );
}

// ============================
// Секции/страницы
// ============================
function Hero() {
    const {t} = useI18n();
    const navigate = useNavigate();
    return (
        <section className="pt-28 sm:pt-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}
                            className="grid gap-8 sm:gap-10 md:grid-cols-2 md:items-center">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                            <span
                                className="underline decoration-gray-300 dark:decoration-white/20">{t("hero_title")}</span>
                        </h1>
                        <p className="mt-4 max-w-prose text-gray-600 dark:text-gray-300">{t("hero_sub")}</p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <button onClick={() => navigate("/service")}
                                    className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90">
                                {t("hero_to_services")}
                            </button>
                            <button onClick={() => navigate("/contacts")}
                                    className="rounded-xl border px-4 py-2 text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                                {t("hero_to_contacts")}
                            </button>
                        </div>
                    </div>
                    <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-black dark:border-white/10">
                        <div className="grid grid-cols-2 gap-4">
                            <ServiceCard titleKey="services_spa" descKey="services_spa_desc"/>
                            <ServiceCard titleKey="services_opt" descKey="services_opt_desc"/>
                            <ServiceCard titleKey="services_base" descKey="services_base_desc"/>
                            <ServiceCard titleKey="services_uikit" descKey="services_uikit_desc"/>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Section({titleKey, leadKey, children}: { titleKey: string; leadKey: string; children: React.ReactNode }) {
    const {t} = useI18n();
    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <motion.h2 initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                           transition={{duration: 0.4}} className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    {t(titleKey)}
                </motion.h2>
                <motion.p initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                          transition={{duration: 0.45, delay: 0.05}}
                          className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-300">
                    {t(leadKey)}
                </motion.p>
                <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                            transition={{duration: 0.5, delay: 0.08}} className="mt-8">
                    {children}
                </motion.div>
            </div>
        </section>
    );
}

function ServiceCard({titleKey, descKey}: { titleKey: string; descKey: string }) {
    const {t} = useI18n();
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-black dark:border-white/10">
            <div className="flex items-center gap-3">
                <div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white dark:bg-white dark:text-black">
                    <Hammer className="h-5 w-5"/>
                </div>
                <h3 className="text-base font-medium">{t(titleKey)}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{t(descKey)}</p>
            <button
                className="mt-4 inline-flex items-center rounded-xl border px-4 py-2 text-sm hover:bg-black hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black transition">
                {t("more")} <ArrowUpRight className="ml-2 h-4 w-4"/>
            </button>
        </div>
    );
}

function ServicePage() {
    return (
        <>
            <Slideshow/>
            <Hero/>
            <Section titleKey="service_title" leadKey="service_lead">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <ServiceCard titleKey="services_spa" descKey="services_spa_desc"/>
                    <ServiceCard titleKey="services_opt" descKey="services_opt_desc"/>
                    <ServiceCard titleKey="services_base" descKey="services_base_desc"/>
                </div>
            </Section>
        </>
    );
}

function Footer() {
    const {t} = useI18n();
    return (
        <footer className="border-t bg-white/60 dark:bg-black/40 dark:border-white/10">
            <div
                className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm text-gray-500 dark:text-gray-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span>© {new Date().getFullYear()} ReactOne</span>
                <div className="flex items-center gap-4"><a href="/about"
                                                            className="hover:underline">{t("footer_about")}</a><a
                    href="/contacts" className="hover:underline">{t("footer_contacts")}</a></div>
            </div>
        </footer>
    );
}

export default function App() {
    return (
        <I18nProvider>
            <ThemeProvider>
                <AuthProvider>
                    <div
                        className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 dark:from-black dark:to-neutral-950 dark:text-white">
                        <BrowserRouter>
                            <Navbar/>
                            <main className="pt-24">
                                <Routes>
                                    {/* публичные */}
                                    <Route path="/" element={<ServicePage/>}/>
                                    <Route path="/service" element={<ServicePage/>}/>
                                    <Route path="/contacts" element={<ContactsPage/>}/>
                                    <Route path="/about" element={<AboutPage/>}/>
                                    <Route path="/catalog/:category" element={<CatalogPage/>}/>
                                    <Route path="/catalog/:category/:subcategory" element={<CatalogPage/>}/>

                                    {/* приватные */}
                                    <Route element={<ProtectedRoute/>}>
                                        <Route path="/products" element={<ProductsPrivate/>}/>
                                    </Route>
                                </Routes>
                            </main>
                            <Footer/>
                        </BrowserRouter>
                    </div>
                </AuthProvider>
            </ThemeProvider>
        </I18nProvider>
    );
}