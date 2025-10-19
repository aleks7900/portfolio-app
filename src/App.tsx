import {BrowserRouter, Route, Routes} from "react-router-dom";
import {I18nProvider} from "./shared/i18n/i18n.tsx";
import {ThemeProvider} from "./shared/theme/theme.tsx";
import {AuthProvider} from "./shared/auth/auth.tsx";
import {AdminRoute} from "./shared/ProtectedRoute";
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
import PageEvents from "./hooks/pageEvents.ts";
import AttendancePage from "./pages/private/AttendancePage.tsx";
import VisitsPage from "./pages/private/VisitsPage.tsx";
import ScrollToTop from "./ScrollToTop.tsx";
import CallbackWidget from "./shared/widgets/CallbackWidget.tsx";
import TechChatWidget from "./shared/widgets/TechChatWidget.tsx";
import QualityGuaranteePage from "./pages/services/QualityGuaranteePage.tsx";
import CustomOrdersPage from "./pages/services/CustomOrdersPage.tsx";
import ConsultSpecialistsPage from "./pages/services/ConsultSpecialistsPage.tsx";
import SpaPwaGuidePage from "./pages/services/SpaPwaGuidePage.tsx";
import WebCostCalculatorPage from "./pages/services/WebCostCalculatorPage.tsx";
import JavaScriptDevPage from "./pages/services/stack/JavaScriptDevPage.tsx";
import TypeScriptDevPage from "./pages/services/stack/TypeScriptDevPage.tsx";
import ReactDevPage from "./pages/services/stack/ReactDevPage.tsx";
import NginxDevPage from "./pages/services/stack/NginxDevPage.tsx";
import SpringDevPage from "./pages/services/stack/SpringDevPage.tsx";
import Html5DevPage from "./pages/services/stack/Html5DevPage.tsx";
import CssDevPage from "./pages/services/stack/CssDevPage.tsx";
import SassDevPage from "./pages/services/stack/SassDevPage.tsx";
import TailwindDevPage from "./pages/services/stack/TailwindDevPage.tsx";
import PostgreSQLDevPage from "./pages/services/stack/PostgreSQLDevPage.tsx";
import MongoDBDevPage from "./pages/services/stack/MongoDBDevPage.tsx";
import GitDevPage from "./pages/services/stack/GitDevPage.tsx";
import ReduxDevPage from "./pages/services/stack/ReduxDevPage.tsx";


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
                            <PageEvents/>
                            {/* Глобальный слушатель изменения маршрута */}
                            <ScrollToTop/>
                            <Navbar/>
                            <main id="app-scroll-root" className="pt-24 min-h-dvh overflow-y-auto">
                                <Routes>
                                    {/* публичные */}
                                    <Route path="/" element={<MainPage/>}/>
                                    <Route path="/service" element={<ServicePage/>}/>
                                    <Route path="/contacts" element={<ContactsPage/>}/>
                                    <Route path="/about" element={<AboutPage/>}/>
                                    <Route path="/guide" element={<SpaPwaGuidePage/>}/>
                                    <Route path="/web/calc" element={<WebCostCalculatorPage/>}/>
                                    <Route path="/services/:slug" element={<ServicePages/>}/>
                                    <Route path="/services/quality-guarantee" element={<QualityGuaranteePage/>}/>
                                    <Route path="/services/custom-orders" element={<CustomOrdersPage/>}/>
                                    <Route path="/services/expert-consulting" element={<ConsultSpecialistsPage/>}/>

                                    <Route path="/dev/javascript" element={<JavaScriptDevPage/>}/>
                                    <Route path="/dev/typescript" element={<TypeScriptDevPage/>}/>
                                    <Route path="/dev/react" element={<ReactDevPage/>}/>
                                    <Route path="/dev/nginx" element={<NginxDevPage/>}/>
                                    <Route path="/dev/spring" element={<SpringDevPage/>}/>
                                    <Route path="/dev/spring-security" element={<SpringDevPage/>}/>
                                    <Route path="/dev/spring-boot" element={<SpringDevPage/>}/>
                                    <Route path="/dev/html5" element={<Html5DevPage/>}/>
                                    <Route path="/dev/css3" element={<CssDevPage/>}/>
                                    <Route path="/dev/sass" element={<SassDevPage/>}/>
                                    <Route path="/dev/tailwind" element={<TailwindDevPage/>}/>
                                    <Route path="/dev/postgresql" element={<PostgreSQLDevPage/>}/>
                                    <Route path="/dev/mongodb" element={<MongoDBDevPage/>}/>
                                    <Route path="/dev/git" element={<GitDevPage/>}/>
                                    <Route path="/dev/redux" element={<ReduxDevPage/>}/>

                                    {/* приватные */}
                                    <Route
                                        path="/admin/requests"
                                        element={
                                            <AdminRoute>
                                                <RequestsPage/>
                                            </AdminRoute>
                                        }
                                    />
                                    <Route
                                        path="/admin/users"
                                        element={
                                            <AdminRoute>
                                                <UsersPage/>
                                            </AdminRoute>
                                        }
                                    />
                                    <Route
                                        path="/admin/analytics"
                                        element={
                                            <AdminRoute>
                                                <AttendancePage/>
                                            </AdminRoute>
                                        }
                                    />
                                    <Route
                                        path="/admin/visits"
                                        element={
                                            <AdminRoute>
                                                <VisitsPage/>
                                            </AdminRoute>
                                        }
                                    />
                                </Routes>
                            </main>
                            <Footer/>

                            {/* Кнопки */}
                            <ScrollTopButton threshold={300} side="left"/>
                            <CallWidget viber="37379449334" whatsapp="37379449334" telegram="@alex_lab_webdev"
                                        bottom="1.5rem"
                                        zIndex={9999}/>
                            <CallbackWidget/>
                            <TechChatWidget offsetRight="1.5rem" bottom="1.5rem" zIndex={9997}/>
                        </BrowserRouter>
                    </div>
                </AuthProvider>
            </ThemeProvider>
        </I18nProvider>
    );
}