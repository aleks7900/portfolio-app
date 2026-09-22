import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Code2, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { toLangHref, useI18n } from "../../../shared/i18n/i18n.tsx";
import { Button } from "../../../components/ui/button.tsx";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// Depth-linked initial emergence coordinates
const eyebrowVariants: Variants = {
  hidden: { opacity: 0, z: -100, scale: 0.94 },
  visible: {
    opacity: 1,
    z: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 24 },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, z: -150, scale: 0.92 },
  visible: {
    opacity: 1,
    z: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, z: -220, scale: 0.9 },
  visible: {
    opacity: 1,
    z: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 26 },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, z: -280, scale: 0.88 },
  visible: {
    opacity: 1,
    z: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 26 },
  },
};

const pillarVariants: Variants = {
  hidden: { opacity: 0, z: -180, scale: 0.94 },
  visible: {
    opacity: 1,
    z: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 290, damping: 25 },
  },
};

export default function HeroDOMOverlay() {
  const { t, lang } = useI18n();

  return (
    <div className="relative z-30 mx-auto max-w-[76rem] xl:max-w-[84rem] px-4 sm:px-6 w-full py-16 sm:py-24 lg:py-32 flex items-center min-h-[88vh] [perspective:1200px] [transform-style:preserve-3d]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl lg:max-w-xl xl:max-w-2xl space-y-8 pointer-events-auto [transform-style:preserve-3d]"
      >
        {/* Eyebrow badge */}
        <motion.div variants={eyebrowVariants}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 dark:bg-primary/20 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary shadow-xs">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span>Full-Stack Engineering • Next-Gen Web • SPA • PWA</span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div variants={headingVariants} className="space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]">
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              {t("service_title_2") || "Создание современных веб-приложений"}
            </span>
          </h1>
        </motion.div>

        {/* Supporting Description */}
        <motion.p
          variants={subtitleVariants}
          className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl font-normal"
        >
          {t("hero_sub")} — {t("hero_sub_1")} {t("hero_sub_2")}
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          variants={ctaVariants}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <Button
            asChild
            size="lg"
            variant="glow"
            className="gap-2.5 text-base px-8 py-6 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 cursor-pointer"
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

          <Button
            asChild
            size="lg"
            variant="emerald"
            className="text-base px-8 py-6 rounded-2xl cursor-pointer"
          >
            <Link
              role="button"
              to={toLangHref("/contacts", lang)}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span>{t("hero_to_contacts") || "Связаться с нами"}</span>
            </Link>
          </Button>
        </motion.div>

        {/* Micro architectural pillars */}
        <motion.div
          variants={pillarVariants}
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
