import React from "react";
import { useI18n } from "../../shared/i18n/i18n.tsx";
import { motion } from "framer-motion";

export default function Section({
  titleKey,
  leadKey,
  children,
}: {
  titleKey?: string;
  leadKey?: string;
  children: React.ReactNode;
}) {
  const { t } = useI18n();

  return (
    <section className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-[76rem] xl:max-w-[84rem] px-4 sm:px-6">
        {titleKey && (
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
          >
            {t(titleKey)}
          </motion.h2>
        )}
        {leadKey && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-3 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            {t(leadKey)}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className={titleKey || leadKey ? "mt-10" : ""}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}