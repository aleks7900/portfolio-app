import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Code2, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { toLangHref, useI18n } from "../../../shared/i18n/i18n.tsx";
import { Button } from "../../../components/ui/button.tsx";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.35,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 26,
    },
  },
};

export default function HeroDOMOverlay() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="relative z-30 mx-auto max-w-[76rem] xl:max-w-[84rem] px-4 sm:px-6 w-full py-16 sm:py-24 lg:py-32 flex items-center min-h-[88vh]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl lg:max-w-xl xl:max-w-2xl space-y-8 pointer-events-auto"
      >
        {/* Eyebrow badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 dark:bg-primary/20 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary shadow-xs">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span>Full-Stack Engineering • Next-Gen Web • SPA • PWA</span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]">
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              {t("service_title_2") || "Создание современных веб-приложений"}
            </span>
          </h1>
        </motion.div>

        {/* Supporting Description */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl font-normal"
        >
          {t("hero_sub")} — {t("hero_sub_1")} {t("hero_sub_2")}
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <Button
            size="lg"
            variant="glow"
            onClick={() => {
              navigate(toLangHref("/service", lang));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="gap-2.5 text-base px-8 py-6 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 cursor-pointer"
          >
            <span>{t("hero_to_services") || "Все услуги"}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            size="lg"
            variant="emerald"
            onClick={() => {
              navigate(toLangHref("/contacts", lang));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-base px-8 py-6 rounded-2xl cursor-pointer"
          >
            <span>{t("hero_to_contacts") || "Связаться с нами"}</span>
          </Button>
        </motion.div>

        {/* Micro architectural pillars */}
        <motion.div
          variants={itemVariants}
          className="pt-6 border-t border-border/60 grid grid-cols-3 gap-4 text-xs sm:text-sm text-muted-foreground max-w-lg"
        >
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="font-medium text-foreground/90">React 19 & Spring</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span className="font-medium text-foreground/90">Enterprise Grade</span>
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-sky-500 shrink-0" />
            <span className="font-medium text-foreground/90">Zero Compromise</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
