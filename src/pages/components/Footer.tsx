import { Link } from "react-router-dom";
import { toLangHref, useI18n } from "../../shared/i18n/i18n.tsx";
import Container from "../../shared/Container.tsx";
import { Code2, Heart } from "lucide-react";

export default function Footer() {
  const { t, lang } = useI18n();

  return (
    <footer className="relative mt-20 border-t border-border/80 bg-card/60 backdrop-blur-md">
      {/* Top subtle glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Col */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                  <Code2 className="h-4 w-4" />
                </div>
                <span className="text-lg font-bold tracking-tight text-foreground">
                  {t("brandLogo") || "Alex-Lab"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                {t("seo_main_intro") ||
                  "Modern full-stack web applications, SPA, PWA, and tailored solutions with React, TypeScript & Spring Boot."}
              </p>
            </div>

            {/* Quick Navigation */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-foreground">
                {t("nav_service") || "Навигация"}
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to={toLangHref("/service", lang)}
                    className="hover:text-primary transition-colors"
                  >
                    {t("nav_service")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={toLangHref("/about", lang)}
                    className="hover:text-primary transition-colors"
                  >
                    {t("footer_about")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={toLangHref("/contacts", lang)}
                    className="hover:text-primary transition-colors"
                  >
                    {t("footer_contacts")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tools & Resources */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-foreground">
                {t("footer_guide") || "Инструменты"}
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to={toLangHref("/web/calc", lang)}
                    className="hover:text-primary transition-colors"
                  >
                    {t("calc_title") || "Web Calculator"}
                  </Link>
                </li>
                <li>
                  <Link
                    to={toLangHref("/guide", lang)}
                    className="hover:text-primary transition-colors"
                  >
                    {t("footer_guide")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Alex-LAB. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <span>Crafted with</span>
              <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
              <span>React & TypeScript</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}