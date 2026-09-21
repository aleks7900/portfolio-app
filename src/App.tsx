import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { I18nProvider } from "./shared/i18n/i18n.tsx";
import { ThemeProvider } from "./shared/theme/theme.tsx";
import { AuthProvider } from "./shared/auth/auth.tsx";
import { AdminRoute } from "./shared/ProtectedRoute";
import ScrollTopButton from "./shared/widgets/ScrollTopButton.tsx";
import CallWidget from "./shared/widgets/CallWidget.tsx";
import ServicePages from "./pages/services/ServicePages.tsx";
import MainPage from "./pages/MainPage.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import ContactsPage from "./pages/ContactsPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import Footer from "./pages/components/Footer.tsx";
import Navbar from "./shared/Navbar.tsx";
import PageEvents from "./hooks/pageEvents.ts";
import ScrollToTop from "./ScrollToTop.tsx";
import CallbackWidget from "./shared/widgets/CallbackWidget.tsx";
import TechChatWidget from "./shared/widgets/TechChatWidget.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

// Lazy-loaded routes for code splitting and optimal bundle size
const SpaPwaGuidePage = lazy(() => import("./pages/services/SpaPwaGuidePage.tsx"));
const WebCostCalculatorPage = lazy(() => import("./pages/services/WebCostCalculatorPage.tsx"));
const QualityGuaranteePage = lazy(() => import("./pages/services/QualityGuaranteePage.tsx"));
const CustomOrdersPage = lazy(() => import("./pages/services/CustomOrdersPage.tsx"));
const ConsultSpecialistsPage = lazy(() => import("./pages/services/ConsultSpecialistsPage.tsx"));

// Tech stack routes
const JavaScriptDevPage = lazy(() => import("./pages/services/stack/JavaScriptDevPage.tsx"));
const TypeScriptDevPage = lazy(() => import("./pages/services/stack/TypeScriptDevPage.tsx"));
const ReactDevPage = lazy(() => import("./pages/services/stack/ReactDevPage.tsx"));
const NginxDevPage = lazy(() => import("./pages/services/stack/NginxDevPage.tsx"));
const SpringDevPage = lazy(() => import("./pages/services/stack/SpringDevPage.tsx"));
const SpringSecurityDevPage = lazy(() => import("./pages/services/stack/SpringSecurityDevPage.tsx"));
const SpringBootDevPage = lazy(() => import("./pages/services/stack/SpringBootDevPage.tsx"));
const Html5DevPage = lazy(() => import("./pages/services/stack/Html5DevPage.tsx"));
const CssDevPage = lazy(() => import("./pages/services/stack/CssDevPage.tsx"));
const SassDevPage = lazy(() => import("./pages/services/stack/SassDevPage.tsx"));
const TailwindDevPage = lazy(() => import("./pages/services/stack/TailwindDevPage.tsx"));
const PostgreSQLDevPage = lazy(() => import("./pages/services/stack/PostgreSQLDevPage.tsx"));
const MongoDBDevPage = lazy(() => import("./pages/services/stack/MongoDBDevPage.tsx"));
const GitDevPage = lazy(() => import("./pages/services/stack/GitDevPage.tsx"));
const ReduxDevPage = lazy(() => import("./pages/services/stack/ReduxDevPage.tsx"));

// Private admin pages
const RequestsPage = lazy(() => import("./pages/private/RequestsPage.tsx"));
const UsersPage = lazy(() => import("./pages/private/UsersPage.tsx"));
const AttendancePage = lazy(() => import("./pages/private/AttendancePage.tsx"));
const VisitsPage = lazy(() => import("./pages/private/VisitsPage.tsx"));

function RouteSuspenseFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-background text-foreground relative">
            {/* Subtle ambient lighting for depth */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30 dark:opacity-20"
            >
              <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
            </div>

            <BrowserRouter>
              <PageEvents />
              {/* Global scroll handler on route transition */}
              <ScrollToTop />
              <Navbar />
              {/* Outer scroll root: div instead of nested main to ensure HTML5 compliance */}
              <div id="app-scroll-root" className="relative z-10 pt-20 min-h-dvh">
                <Suspense fallback={<RouteSuspenseFallback />}>
                  <Routes>
                    {/* Public primary routes */}
                    <Route path="/" element={<MainPage />} />
                    <Route path="/:lang" element={<MainPage />} />

                    <Route path="/service" element={<ServicePage />} />
                    <Route path="/service/:lang" element={<ServicePage />} />

                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/contacts/:lang" element={<ContactsPage />} />

                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/about/:lang" element={<AboutPage />} />

                    <Route path="/guide" element={<SpaPwaGuidePage />} />
                    <Route path="/guide/:lang" element={<SpaPwaGuidePage />} />

                    <Route path="/web/calc" element={<WebCostCalculatorPage />} />
                    <Route path="/web/calc/:lang" element={<WebCostCalculatorPage />} />

                    <Route path="/services/:slug" element={<ServicePages />} />
                    <Route path="/services/:slug/:lang" element={<ServicePages />} />

                    <Route path="/services/quality-guarantee" element={<QualityGuaranteePage />} />
                    <Route path="/services/quality-guarantee/:lang" element={<QualityGuaranteePage />} />

                    <Route path="/services/custom-orders" element={<CustomOrdersPage />} />
                    <Route path="/services/custom-orders/:lang" element={<CustomOrdersPage />} />

                    <Route path="/services/expert-consulting" element={<ConsultSpecialistsPage />} />
                    <Route path="/services/expert-consulting/:lang" element={<ConsultSpecialistsPage />} />

                    {/* Tech stack pages */}
                    <Route path="/dev/javascript" element={<JavaScriptDevPage />} />
                    <Route path="/dev/javascript/:lang" element={<JavaScriptDevPage />} />

                    <Route path="/dev/typescript" element={<TypeScriptDevPage />} />
                    <Route path="/dev/typescript/:lang" element={<TypeScriptDevPage />} />

                    <Route path="/dev/react" element={<ReactDevPage />} />
                    <Route path="/dev/react/:lang" element={<ReactDevPage />} />

                    <Route path="/dev/nginx" element={<NginxDevPage />} />
                    <Route path="/dev/nginx/:lang" element={<NginxDevPage />} />

                    <Route path="/dev/spring" element={<SpringDevPage />} />
                    <Route path="/dev/spring/:lang" element={<SpringDevPage />} />

                    <Route path="/dev/spring-security" element={<SpringSecurityDevPage />} />
                    <Route path="/dev/spring-security/:lang" element={<SpringSecurityDevPage />} />

                    <Route path="/dev/spring-boot" element={<SpringBootDevPage />} />
                    <Route path="/dev/spring-boot/:lang" element={<SpringBootDevPage />} />

                    <Route path="/dev/html5" element={<Html5DevPage />} />
                    <Route path="/dev/html5/:lang" element={<Html5DevPage />} />

                    <Route path="/dev/css3" element={<CssDevPage />} />
                    <Route path="/dev/css3/:lang" element={<CssDevPage />} />

                    <Route path="/dev/sass" element={<SassDevPage />} />
                    <Route path="/dev/sass/:lang" element={<SassDevPage />} />

                    <Route path="/dev/tailwind" element={<TailwindDevPage />} />
                    <Route path="/dev/tailwind/:lang" element={<TailwindDevPage />} />

                    <Route path="/dev/postgresql" element={<PostgreSQLDevPage />} />
                    <Route path="/dev/postgresql/:lang" element={<PostgreSQLDevPage />} />

                    <Route path="/dev/mongodb" element={<MongoDBDevPage />} />
                    <Route path="/dev/mongodb/:lang" element={<MongoDBDevPage />} />

                    <Route path="/dev/git" element={<GitDevPage />} />
                    <Route path="/dev/git/:lang" element={<GitDevPage />} />

                    <Route path="/dev/redux" element={<ReduxDevPage />} />
                    <Route path="/dev/redux/:lang" element={<ReduxDevPage />} />

                    {/* Private admin routes */}
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
                    <Route
                      path="/admin/analytics"
                      element={
                        <AdminRoute>
                          <AttendancePage />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/admin/visits"
                      element={
                        <AdminRoute>
                          <VisitsPage />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/admin/requests/:lang"
                      element={
                        <AdminRoute>
                          <RequestsPage />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/admin/users/:lang"
                      element={
                        <AdminRoute>
                          <UsersPage />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/admin/analytics/:lang"
                      element={
                        <AdminRoute>
                          <AttendancePage />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/admin/visits/:lang"
                      element={
                        <AdminRoute>
                          <VisitsPage />
                        </AdminRoute>
                      }
                    />

                    {/* 404: Dedicated NotFoundPage returning noindex */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </div>
              <Footer />

              {/* Floating Widgets */}
              <ScrollTopButton threshold={300} side="left" />
              <CallWidget
                viber="37379449334"
                whatsapp="37379449334"
                telegram="@alex_lab_webdev"
                bottom="1.5rem"
                zIndex={9999}
              />
              <CallbackWidget />
              <TechChatWidget offsetRight="1.5rem" bottom="1.5rem" zIndex={9997} />
            </BrowserRouter>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}