import { Link } from "react-router-dom";
import { Home, Layers, MessageSquare } from "lucide-react";
import Container from "../shared/Container.tsx";
import { toLangHref, useI18n } from "../shared/i18n/i18n.tsx";
import SEO from "../shared/SEO.tsx";
import PageTransition from "../components/motion/PageTransition.tsx";
import { Button } from "../components/ui/button.tsx";

export default function NotFoundPage() {
  const { t, lang } = useI18n();

  return (
    <PageTransition>
      <SEO
        title={t("not_found_title", { defaultValue: "404 — Страница не найдена | Alex-Lab" })}
        description={t("not_found_desc", {
          defaultValue: "Запрашиваемая страница не существует или была перемещена.",
        })}
        noindex
      />

      <section className="relative min-h-[75vh] flex items-center justify-center py-16 sm:py-24">
        {/* Ambient background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-30"
        >
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        </div>

        <Container>
          <div className="relative z-10 max-w-xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
              <span>Error 404</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
              {lang === "ro"
                ? "Pagina nu a fost găsită"
                : lang === "en"
                ? "Page Not Found"
                : "Страница не найдена"}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {lang === "ro"
                ? "Adresa URL accesată nu există sau a fost mutată. Folosiți navigarea de mai jos pentru a reveni la secțiunile principale."
                : lang === "en"
                ? "The requested URL does not exist or has been moved. Use the links below to return to the main sections."
                : "Запрошенный адрес не существует или был перемещён. Воспользуйтесь ссылками ниже, чтобы перейти к основным разделам."}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" variant="glow" className="gap-2 text-base px-6">
                <Link to={toLangHref("/", lang)}>
                  <Home className="h-4 w-4" />
                  <span>{lang === "ro" ? "Acasă" : lang === "en" ? "Home" : "Главная"}</span>
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="gap-2 text-base px-6">
                <Link to={toLangHref("/service", lang)}>
                  <Layers className="h-4 w-4" />
                  <span>{t("nav_service", { defaultValue: "Услуги" })}</span>
                </Link>
              </Button>

              <Button asChild size="lg" variant="secondary" className="gap-2 text-base px-6">
                <Link to={toLangHref("/contacts", lang)}>
                  <MessageSquare className="h-4 w-4" />
                  <span>{t("nav_contacts", { defaultValue: "Контакты" })}</span>
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
