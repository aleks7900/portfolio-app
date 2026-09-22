import { SERVICES } from "../../data/data.ts";
import { useI18n } from "../../shared/i18n/i18n.tsx";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SpatialCard } from "../../shared/spatial/SpatialCard";

export default function ServiceCard({
  titleKey,
  descKey,
  s,
}: {
  titleKey: string;
  descKey: string;
  s: (typeof SERVICES)[number];
}) {
  const { t } = useI18n();

  return (
    <SpatialCard className="h-full">
      <div className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card/85 dark:bg-card/60 p-6 shadow-xs hover:shadow-xl hover:border-primary/40 backdrop-blur-sm transition-colors duration-300 min-h-full [transform-style:preserve-3d]">
        <div className="[transform-style:preserve-3d]">
          <div className="flex items-center gap-3 [transform:translateZ(14px)]">
            <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20 transition-transform duration-300 group-hover:scale-105 [transform:translateZ(18px)]">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold tracking-tight text-foreground leading-snug">
              {t(titleKey)}
            </h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground [transform:translateZ(8px)]">
            {t(descKey)}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between [transform:translateZ(12px)]">
          <Link
            to={`/services/${s.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <span>{t("more") ?? "Подробнее"}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </SpatialCard>
  );
}