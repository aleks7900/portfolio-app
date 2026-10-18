import { useI18n } from "../../shared/i18n/i18n.tsx";
import Container from "../../shared/Container.tsx";
import { PhoneCall, Sparkles } from "lucide-react";
import { useMagnetic } from "../../hooks/useMagnetic";
import { useAnimePerspectiveTilt } from "../../hooks/useAnimePerspectiveTilt";

export default function MainPageCta() {
  const { t } = useI18n();

  // 3D perspective tilt on the card banner
  const { ref: cardRef, glareRef, onMouseMove, onMouseLeave } =
    useAnimePerspectiveTilt<HTMLDivElement>({
      maxTiltX: 3.5,
      maxTiltY: 3.5,
      liftZ: 10,
      scale: 1.01,
      glare: true,
    });

  // Magnetic button on the phone action
  const magneticPhoneRef = useMagnetic<HTMLAnchorElement>({
    strength: 0.35,
    maxDistance: 16,
  });

  return (
    <Container>
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative mt-8 mb-16 rounded-3xl border border-primary/25 bg-gradient-to-r from-primary/15 via-card to-primary/10 p-8 sm:p-12 shadow-xl overflow-hidden [transform-style:preserve-3d]"
      >
        {/* Specular Glare */}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 opacity-0 [transform:translateZ(6px)]"
        />

        {/* Ambient background glow orb */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl opacity-60"
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8 [transform:translateZ(14px)]">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span>{t("contacts_ytitle") || "Прямая связь с разработчиком"}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              {t("cta_contact") || "Обсудить проект & Архитектуру"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Готовы запустить ваш следующий веб-проект на высшем уровне. Консультация, проектирование и реализация.
            </p>
          </div>

          <div ref={magneticPhoneRef as any} className="inline-block">
            <a
              href="tel:+37379449334"
              className="group inline-flex items-center gap-3.5 rounded-2xl bg-primary text-primary-foreground px-8 py-4 sm:px-10 sm:py-5 text-xl sm:text-2xl font-extrabold tracking-tight shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:brightness-110 active:scale-95 transition-all cursor-pointer select-none"
            >
              <div className="p-2 rounded-xl bg-primary-foreground/15 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <PhoneCall className="h-6 w-6 text-primary-foreground" />
              </div>
              <span>+373 79 449334</span>
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
