import { toLangHref, useI18n } from "../../shared/i18n/i18n.tsx";
import { useNavigate } from "react-router-dom";
import { SERVICES } from "../../data/data.ts";
import ServiceCard from "./ServiceCard.tsx";
import ServiceCardOdd from "./ServiceCardOdd.tsx";
import { Button } from "../../components/ui/button.tsx";
import { ArrowRight, Sparkles } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useMagnetic } from "../../hooks/useMagnetic";

export default function HeroTypes() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();

  const sectionRevealRef = useScrollReveal<HTMLDivElement>({
    direction: "up",
    distance: 28,
    duration: 800,
    staggerChildren: 80,
    childSelector: "[data-anime-card]",
  });

  const magneticBtnGuide = useMagnetic<HTMLButtonElement>({ strength: 0.3, maxDistance: 14 });
  const magneticBtnContacts = useMagnetic<HTMLButtonElement>({ strength: 0.3, maxDistance: 14 });

  return (
    <section ref={sectionRevealRef} className="relative py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-[76rem] xl:max-w-[84rem] px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left: Text & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-500">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Tailored Digital Engineering</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              <span className="bg-gradient-to-r from-foreground via-foreground to-indigo-500 bg-clip-text text-transparent">
                {t("hero_types_title")}
              </span>
            </h2>

            <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("hero_types_sub")}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div ref={magneticBtnGuide as any} className="inline-block">
                <Button
                  size="lg"
                  variant="glow"
                  onClick={() => {
                    navigate(toLangHref("/guide", lang));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="gap-2 text-base px-7 cursor-pointer active:scale-95 transition-transform"
                >
                  <span>{t("hero_to_guide")}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div ref={magneticBtnContacts as any} className="inline-block">
                <Button
                  size="lg"
                  variant="emerald"
                  onClick={() => {
                    navigate(toLangHref("/contacts", lang));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-base px-7 cursor-pointer active:scale-95 transition-transform"
                >
                  {t("hero_to_contacts")}
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Service Cards Grid */}
          <div className="lg:col-span-6 rounded-3xl border border-border/80 bg-card/40 backdrop-blur-xl p-4 sm:p-6 shadow-xl relative">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div data-anime-card className="rounded-2xl">
                <ServiceCardOdd
                  titleKey="android_title"
                  descKey="android_text"
                  s={SERVICES[8]}
                />
              </div>
              <div data-anime-card className="rounded-2xl">
                <ServiceCard
                  titleKey="full_title"
                  descKey="full_text"
                  s={SERVICES[9]}
                />
              </div>
              <div data-anime-card className="rounded-2xl">
                <ServiceCard
                  titleKey="content_title"
                  descKey="content_text"
                  s={SERVICES[10]}
                />
              </div>
              <div data-anime-card className="rounded-2xl">
                <ServiceCardOdd
                  titleKey="support_title"
                  descKey="support_text"
                  s={SERVICES[11]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
