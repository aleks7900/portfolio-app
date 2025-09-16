import React from "react";
import {useI18n} from "../../shared/i18n/i18n.tsx";
import {motion} from "framer-motion";

export default function Section({titleKey, leadKey, children}: { titleKey: string; leadKey: string; children: React.ReactNode }) {
    const {t} = useI18n();
    return (
        <section className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-[72rem] xl:max-w-[80rem] 2xl:max-w-[90rem] px-4 sm:px-6">
                <motion.h2 initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                           transition={{duration: 0.4}} className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    {t(titleKey)}
                </motion.h2>
                <motion.p initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                          transition={{duration: 0.45, delay: 0.05}}
                          className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-300">
                    {t(leadKey)}
                </motion.p>
                <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                            transition={{duration: 0.5, delay: 0.08}} className="mt-8">
                    {children}
                </motion.div>
            </div>
        </section>
    );
}