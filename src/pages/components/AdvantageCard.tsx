import { ADV } from "../../data/data.ts";
import { useI18n } from "../../shared/i18n/i18n.tsx";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdvantageCard({
  titleKey,
  descKey,
  s,
}: {
  titleKey: string;
  descKey: string;
  s: (typeof ADV)[number];
}) {
  const { t } = useI18n();

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card/85 dark:bg-card/60 p-6 shadow-xs hover:shadow-lg hover:border-emerald-500/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 min-h-full">
      <div>
        <div className="flex items-center gap-3">
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/20 transition-transform duration-300 group-hover:scale-105">
            <s.icon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold tracking-tight text-foreground leading-snug">
            {t(titleKey)}
          </h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {t(descKey)}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
        <Link
          to={`/services/${s.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors"
        >
          <span>{t("more") ?? "Подробнее"}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}