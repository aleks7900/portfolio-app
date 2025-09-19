import {useI18n} from "../../shared/i18n/i18n.tsx";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {SERVICES} from "../../data/data.ts";
import ServiceCard from "./ServiceCard.tsx";
import ServiceCardOdd from "./ServiceCardOdd.tsx";

// ===== Варианты анимаций =====
const containerVariants = {
    hidden: {opacity: 0, y: 10},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.5, when: "beforeChildren", staggerChildren: 0.06},
    },
} as const;

const cardVariants = {
    hidden: {opacity: 0, y: 12, scale: 0.98},
    visible: {opacity: 1, y: 0, scale: 1, transition: {type: "spring", stiffness: 420, damping: 32, mass: 0.6}},
} as const;

export default function Hero() {
    const {t} = useI18n();
    const navigate = useNavigate();

    return (
        <section className="pt-28 sm:pt-32">
            {/* Локальные keyframes (не требует правок tailwind.config) */}
            <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes icon-float { 0%{ transform: translateY(0) } 50%{ transform: translateY(-4px) } 100%{ transform: translateY(0) } }
          @keyframes soft-glow { from { box-shadow: 0 0 0 rgba(0,0,0,0) } to { box-shadow: 0 12px 32px rgba(0,0,0,.18) } }
          .card-icon-anim svg, .card-icon-anim [data-icon], .card-icon-anim .icon { animation: icon-float 2.4s ease-in-out infinite; }
          .card-appear { animation: soft-glow .35s ease both; }
        }
        @media (prefers-reduced-motion: reduce) {
          .card-icon-anim svg, .card-icon-anim [data-icon], .card-icon-anim .icon { animation: none !important; }
          .card-appear { animation: none !important; }
        }
      `}</style>

            <div className="mx-auto max-w-[72rem] xl:max-w-[80rem] 2xl:max-w-[90rem] px-4 sm:px-6">
                <motion.div initial="hidden" animate="visible" variants={containerVariants}
                            className="grid gap-8 sm:gap-10 md:grid-cols-2 md:items-center">
                    {/* Левая часть */}
                    <motion.div variants={cardVariants}>
                        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                            <span
                                className="underline decoration-gray-300 dark:decoration-white/20">{t("hero_title")}</span>
                        </h1>
                        <p className="mt-4 max-w-prose text-gray-600 dark:text-gray-300">{t("hero_sub")}</p>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <motion.button
                                whileHover={{y: -1}}
                                whileTap={{scale: 0.985}}
                                onClick={() => navigate("/service")}
                                className="w-56 rounded-2xl border px-8 py-4 !text-lg font-medium !bg-white !text-black shadow hover:!bg-black hover:!text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black/40 active:scale-[0.99] dark:bg-white dark:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
                            >
                                {t("hero_to_services")}
                            </motion.button>
                            <motion.button
                                whileHover={{y: -1}}
                                whileTap={{scale: 0.985}}
                                onClick={() => navigate("/contacts")}
                                className="w-56 rounded-2xl border px-8 py-4 !text-lg font-medium !bg-green-500 !text-white shadow hover:!bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 active:scale-[0.99] dark:bg-green-600 dark:hover:bg-green-500"
                            >
                                {t("hero_to_contacts")}
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Правая — карточки услуг с анимацией */}
                    <motion.div variants={cardVariants}
                                className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-black dark:border-white/10">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{hidden: {}, visible: {transition: {staggerChildren: 0.05}}}}
                            className="grid grid-cols-2 gap-4"
                        >
                            {[0, 1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    variants={cardVariants}
                                    whileHover={{y: -2}}
                                    whileTap={{scale: 0.995}}
                                    className="card-appear rounded-xl"
                                >
                                    {/* Обёртка добавляет класс для анимации иконок внутри карточки */}
                                    {i === 0 && <ServiceCardOdd titleKey="services_laser_title"
                                                                descKey="services_laser_desc" s={SERVICES[0]}/>}
                                    {i === 1 && <ServiceCard titleKey="services_shearing_title"
                                                             descKey="services_shearing_desc" s={SERVICES[1]}/>}
                                    {i === 2 && <ServiceCard titleKey="services_bending_title"
                                                             descKey="services_bending_desc" s={SERVICES[2]}/>}
                                    {i === 3 && <ServiceCardOdd titleKey="services_rolling_title"
                                                                descKey="services_rolling_desc" s={SERVICES[3]}/>}
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
