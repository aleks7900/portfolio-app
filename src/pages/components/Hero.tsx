import { toLangHref, useI18n } from "../../shared/i18n/i18n.tsx";
import { Link } from "react-router-dom";
import { SERVICES } from "../../data/data.ts";
import ServiceCard from "./ServiceCard.tsx";
import ServiceCardOdd from "./ServiceCardOdd.tsx";
import { Button } from "../../components/ui/button.tsx";
import { ArrowRight, Sparkles } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useMagnetic } from "../../hooks/useMagnetic";

export default function Hero() {
  const { t, lang } = useI18n();

  const sectionRevealRef = useScrollReveal<HTMLDivElement>({
    direction: "up",
    distance: 28,
    duration: 800,
    staggerChildren: 80,
    childSelector: "[data-anime-card]",
  });

  const magneticBtnServices = useMagnetic<HTMLButtonElement>({ strength: 0.3, maxDistance: 14 });
  const magneticBtnContacts = useMagnetic<HTMLButtonElement>({ strength: 0.3, maxDistance: 14 });

  return (
    <section ref={sectionRevealRef} className="relative py-16 sm:py-24 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 -z-10 h-96 w-96 rounded-full bg-primary/15 blur-3xl opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl opacity-40"
      />

      <div className="mx-auto max-w-[76rem] xl:max-w-[84rem] px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Full-Stack Development • SPA • PWA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                {t("service_title_2")}
              </span>
            </h2>

            <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("hero_sub")}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div ref={magneticBtnServices as any} className="inline-block">
                <Button
                  asChild
                  size="lg"
                  variant="glow"
                  className="gap-2 text-base px-7 cursor-pointer active:scale-95 transition-transform"
                >
                  <Link
                    to={toLangHref("/service", lang)}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    <span>{t("hero_to_services")}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div ref={magneticBtnContacts as any} className="inline-block">
                <Button
                  asChild
                  size="lg"
                  variant="emerald"
                  className="text-base px-7 cursor-pointer active:scale-95 transition-transform"
                >
                  <Link
                    to={toLangHref("/contacts", lang)}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    {t("hero_to_contacts")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Services Grid */}
          <div className="lg:col-span-6 rounded-3xl border border-border/80 bg-card/40 backdrop-blur-xl p-4 sm:p-6 shadow-xl relative">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div data-anime-card className="rounded-2xl">
                <ServiceCardOdd
                  titleKey="web_title"
                  descKey="web_text"
                  s={SERVICES[0]}
                />
              </div>
              <div data-anime-card className="rounded-2xl">
                <ServiceCard
                  titleKey="spa_title"
                  descKey="spa_text"
                  s={SERVICES[1]}
                />
              </div>
              <div data-anime-card className="rounded-2xl">
                <ServiceCard
                  titleKey="individual_title"
                  descKey="individual_text"
                  s={SERVICES[2]}
                />
              </div>
              <div data-anime-card className="rounded-2xl">
                <ServiceCardOdd
                  titleKey="business_title"
                  descKey="business_text"
                  s={SERVICES[3]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
