import {BrowserRouter, Route, Routes} from "react-router-dom";
import {I18nProvider} from "./shared/i18n/i18n.tsx";
import {ThemeProvider} from "./shared/theme/theme.tsx";
import CatalogPage from "./pages/catalog/CatalogPage";
import {AuthProvider} from "./shared/auth/auth.tsx";
import {AdminRoute, ProtectedRoute} from "./shared/ProtectedRoute";
import ProductsPrivate from "./pages/private/ProductsPrivate";
import ScrollTopButton from "./shared/widgets/ScrollTopButton.tsx";
import CallWidget from "./shared/widgets/CallWidget.tsx";
import ServicePages from "./pages/services/ServicePages.tsx";
import MainPage from "./pages/MainPage.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import ContactsPage from "./pages/ContactsPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import Footer from "./pages/components/Footer.tsx";
import RequestsPage from "./pages/private/RequestsPage.tsx";
import UsersPage from "./pages/private/UsersPage.tsx";
import Navbar from "./shared/Navbar.tsx";

export default function App() {
    return (
        <I18nProvider>
            <ThemeProvider>
                <AuthProvider>
                    <div
                        className="min-h-screen bg-gradient-to-b from-white to-gray-500 text-gray-900 dark:from-gray-500 dark:to-gray-900 dark:text-white"
                        // style={{ backgroundImage: "url('/src/assets/img/bg/bg_dark.png')" }}
                    >
                        <BrowserRouter>
                            <Navbar/>
                            <main id="app-scroll-root" className="pt-24 min-h-dvh overflow-y-auto">
                                <Routes>
                                    {/* публичные */}
                                    <Route path="/" element={<MainPage/>}/>
                                    <Route path="/service" element={<ServicePage/>}/>
                                    <Route path="/contacts" element={<ContactsPage/>}/>
                                    <Route path="/about" element={<AboutPage/>}/>
                                    <Route path="/catalog" element={<CatalogPage/>}/>
                                    <Route path="/catalog/:category" element={<CatalogPage/>}/>
                                    <Route path="/catalog/:category/:subcategory" element={<CatalogPage/>}/>
                                    <Route path="/services/:slug" element={<ServicePages/>}/>
                                    {/* приватные */}
                                    <Route
                                        path="/products"
                                        element={
                                            <ProtectedRoute>
                                                <ProductsPrivate/>
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/admin/products"
                                        element={
                                            <AdminRoute>
                                                <ProductsPrivate/>
                                            </AdminRoute>
                                        }
                                    />
                                    <Route
                                        path="/admin/requests"
                                        element={
                                            <AdminRoute>
                                                <RequestsPage />
                                            </AdminRoute>
                                        }
                                    />
                                    <Route
                                        path="/admin/users"
                                        element={
                                            <AdminRoute>
                                                <UsersPage />
                                            </AdminRoute>
                                        }
                                    />
                                </Routes>
                            </main>
                            <Footer/>

                            {/* Кнопки */}
                            <ScrollTopButton threshold={300} side="left"/>
                            <CallWidget viber="37360000000" whatsapp="37360000000" telegram="@yourusername"/>
                        </BrowserRouter>
                    </div>
                </AuthProvider>
            </ThemeProvider>
        </I18nProvider>
    );
}