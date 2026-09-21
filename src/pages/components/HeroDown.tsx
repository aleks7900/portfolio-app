import { toLangHref, useI18n } from "../../shared/i18n/i18n.tsx";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { SERVICES } from "../../data/data.ts";
import ServiceCard from "./ServiceCard.tsx";
import ServiceCardOdd from "./ServiceCardOdd.tsx";
import { Button } from "../../components/ui/button.tsx";
import { ArrowRight, Layers } from "lucide-react";

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

export default function HeroDownServices() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-[76rem] xl:max-w-[84rem] px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="grid gap-12 lg:grid-cols-12 lg:items-center"
        >
          {/* Left: Text & Actions */}
          <motion.div variants={itemVariants} className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-500">
              <Layers className="h-3.5 w-3.5" />
              <span>Modular Scalable Solutions</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              <span className="bg-gradient-to-r from-foreground via-foreground to-sky-500 bg-clip-text text-transparent">
                {t("service_title_3")}
              </span>
            </h2>

            <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("hero_down_sub")}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                size="lg"
                variant="glow"
                onClick={() => {
                  navigate(toLangHref("/guide", lang));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="gap-2 text-base px-7"
              >
                <span>{t("hero_to_guide")}</span>
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

          {/* Right: Service Cards Grid */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 rounded-3xl border border-border/80 bg-card/40 backdrop-blur-xl p-4 sm:p-6 shadow-xl relative"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ServiceCardOdd
                titleKey="site_title"
                descKey="site_text"
                s={SERVICES[4]}
              />
              <ServiceCard
                titleKey="visit_title"
                descKey="visit_text"
                s={SERVICES[5]}
              />
              <ServiceCard
                titleKey="market_title"
                descKey="market_text"
                s={SERVICES[6]}
              />
              <ServiceCardOdd
                titleKey="lending_title"
                descKey="lending_text"
                s={SERVICES[7]}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
