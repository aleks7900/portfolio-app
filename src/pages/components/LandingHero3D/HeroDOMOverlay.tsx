import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { toLangHref, useI18n } from "../../../shared/i18n/i18n.tsx";
import { Button } from "../../../components/ui/button.tsx";
import { useMagnetic } from "../../../hooks/useMagnetic";
import {
  createTimeline,
  SPRING_PRESETS,
  EASINGS,
  prefersReducedMotion,
} from "../../../lib/anime/animeCore";

export default function HeroDOMOverlay() {
  const { t, lang } = useI18n();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaContainerRef = useRef<HTMLDivElement | null>(null);
  const pillarsRef = useRef<HTMLDivElement | null>(null);

  // Magnetic interactive CTA buttons
  const magneticBtnServices = useMagnetic<HTMLButtonElement>({ strength: 0.3, maxDistance: 18 });
  const magneticBtnContacts = useMagnetic<HTMLButtonElement>({ strength: 0.3, maxDistance: 18 });

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const eyebrow = eyebrowRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaContainerRef.current;
    const pillars = pillarsRef.current;

    if (!title || !eyebrow || !subtitle || !cta || !pillars) return;

    // Orchestrated Anime.js v4 Entrance Timeline
    const tl = createTimeline({
      defaults: {
        ease: SPRING_PRESETS.snappy,
      },
    });

    // 1. Eyebrow badge entrance
    (tl as any).add(eyebrow, {
      opacity: [0, 1],
      translateY: [-18, 0],
      scale: [0.95, 1],
      duration: 650,
      ease: SPRING_PRESETS.bouncy,
    }, 100);

    // 2. Title entrance with spring physics and depth
    (tl as any).add(title, {
      opacity: [0, 1],
      translateY: [28, 0],
      scale: [0.96, 1],
      duration: 800,
      ease: SPRING_PRESETS.snappy,
    }, 220);

    // 3. Subtitle fade and slide
    (tl as any).add(subtitle, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 700,
      ease: EASINGS.easeOutCubic,
    }, 450);

    // 4. CTA buttons spring entrance
    (tl as any).add(cta, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 750,
      ease: SPRING_PRESETS.snappy,
    }, 600);

    // 5. Architectural pillars
    (tl as any).add(pillars, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      ease: SPRING_PRESETS.gentle,
    }, 750);

    return () => {
      if (tl && typeof (tl as any).revert === "function") {
        (tl as any).revert();
      } else if (tl && typeof (tl as any).pause === "function") {
        (tl as any).pause();
      }
    };
  }, [lang, t]);

  const rawTitle = t("service_title_2") || "Создание современных веб-приложений";

  return (
    <div
      ref={containerRef}
      className="relative z-30 mx-auto max-w-[76rem] xl:max-w-[84rem] px-4 sm:px-6 w-full py-16 sm:py-24 lg:py-32 flex items-center min-h-[88vh] [perspective:1200px]"
    >
      <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl space-y-8 pointer-events-auto">
        {/* Eyebrow badge with glowing border */}
        <div ref={eyebrowRef}>
          <div className="group inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 dark:bg-primary/20 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary shadow-xs transition-colors hover:border-primary/50">
            <Sparkles className="h-4 w-4 text-primary animate-pulse group-hover:rotate-12 transition-transform" />
            <span>Full-Stack Engineering • Next-Gen Web • SPA • PWA</span>
          </div>
        </div>

        {/* Hero Title with Anime.js v4 typography reveal */}
        <div className="space-y-3">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]"
          >
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              {rawTitle}
            </span>
          </h1>
        </div>

        {/* Supporting Description */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl font-normal"
        >
          {t("hero_sub")} — {t("hero_sub_1")} {t("hero_sub_2")}
        </p>

        {/* Magnetic CTA Actions */}
        <div ref={ctaContainerRef} className="flex flex-wrap items-center gap-4 pt-2">
          <div ref={magneticBtnServices as any} className="inline-block">
            <Button
              asChild
              size="lg"
              variant="glow"
              className="group gap-2.5 text-base px-8 py-6 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 cursor-pointer active:scale-95 transition-transform"
            >
              <Link
                role="button"
                to={toLangHref("/service", lang)}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span>{t("hero_to_services") || "Все услуги"}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div ref={magneticBtnContacts as any} className="inline-block">
            <Button
              asChild
              size="lg"
              variant="emerald"
              className="text-base px-8 py-6 rounded-2xl cursor-pointer active:scale-95 transition-transform hover:brightness-110 shadow-lg shadow-emerald-600/20"
            >
              <Link
                role="button"
                to={toLangHref("/contacts", lang)}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span>{t("hero_to_contacts") || "Связаться с нами"}</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Micro architectural pillars */}
        <div
          ref={pillarsRef}
          className="pt-6 border-t border-border/60 grid grid-cols-3 gap-4 text-xs sm:text-sm text-muted-foreground max-w-lg"
        >
          <div className="flex items-center gap-2 group hover:text-foreground transition-colors cursor-default">
            <div className="p-1.5 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
              <Zap className="h-4 w-4 text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-medium text-foreground/90">React 19 & Spring</span>
          </div>
          <div className="flex items-center gap-2 group hover:text-foreground transition-colors cursor-default">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-medium text-foreground/90">Enterprise Grade</span>
          </div>
          <div className="flex items-center gap-2 group hover:text-foreground transition-colors cursor-default">
            <div className="p-1.5 rounded-lg bg-sky-500/10 group-hover:bg-sky-500/20 transition-colors">
              <Code2 className="h-4 w-4 text-sky-500 shrink-0 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-medium text-foreground/90">Zero Compromise</span>
          </div>
        </div>
      </div>
    </div>
  );
}
