import { toLangHref, useI18n } from "../../shared/i18n/i18n.tsx";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { SERVICES } from "../../data/data.ts";
import ServiceCard from "./ServiceCard.tsx";
import ServiceCardOdd from "./ServiceCardOdd.tsx";
import { Button } from "../../components/ui/button.tsx";
import { ArrowRight, Sparkles } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 28,
    },
  },
};

export default function Hero() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-12 lg:grid-cols-12 lg:items-center"
        >
          {/* Left Column: Heading & Value Proposition */}
          <motion.div variants={itemVariants} className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Full-Stack Development • SPA • PWA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                {t("service_title_2")}
              </span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("hero_sub")}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                size="lg"
                variant="glow"
                onClick={() => {
                  navigate(toLangHref("/service", lang));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="gap-2 text-base px-7"
              >
                <span>{t("hero_to_services")}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="emerald"
                onClick={() => {
                  navigate(toLangHref("/contacts", lang));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-base px-7"
              >
                {t("hero_to_contacts")}
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Interactive Services Grid */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 rounded-3xl border border-border/80 bg-card/40 backdrop-blur-xl p-4 sm:p-6 shadow-xl relative"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.99 }}
                  className="rounded-2xl"
                >
                  {i === 0 && (
                    <ServiceCardOdd
                      titleKey="web_title"
                      descKey="web_text"
                      s={SERVICES[0]}
                    />
                  )}
                  {i === 1 && (
                    <ServiceCard
                      titleKey="spa_title"
                      descKey="spa_text"
                      s={SERVICES[1]}
                    />
                  )}
                  {i === 2 && (
                    <ServiceCard
                      titleKey="individual_title"
                      descKey="individual_text"
                      s={SERVICES[2]}
                    />
                  )}
                  {i === 3 && (
                    <ServiceCardOdd
                      titleKey="business_title"
                      descKey="business_text"
                      s={SERVICES[3]}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
