import {useI18n} from "../../shared/i18n/i18n.tsx";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {SERVICES} from "../../data/data.ts";
import ServiceCard from "./ServiceCard.tsx";
import ServiceCardOdd from "./ServiceCardOdd.tsx";


// ============================
// Секции/страницы
// ============================
export default function HeroDownServices() {
    const {t} = useI18n();
    const navigate = useNavigate();
    return (
        <section className="pt-28 sm:pt-32">
            <div className="mx-auto max-w-[72rem] xl:max-w-[80rem] 2xl:max-w-[90rem] px-4 sm:px-6">
                <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}
                            className="grid gap-8 sm:gap-10 md:grid-cols-2 md:items-center">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                            <span
                                className="underline decoration-gray-300 dark:decoration-white/20">{t("hero_title")}</span>
                        </h1>
                        <p className="mt-4 max-w-prose text-gray-600 dark:text-gray-300">{t("hero_sub")}</p>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <button onClick={() => navigate("/service")}
                                    className="w-56 rounded-2xl border px-8 py-4 !text-lg font-medium
                                               !bg-white !text-black shadow
                                               hover:!bg-black hover:!text-white hover:shadow-lg
                                               focus:outline-none focus:ring-2 focus:ring-black/40 active:scale-[0.99]
                                               dark:bg-white dark:text-black dark:hover:bg-neutral-800 dark:hover:text-white">
                                {t("hero_to_services")}
                            </button>
                            <button onClick={() => navigate("/contacts")}
                                    className="w-56 rounded-2xl border px-8 py-4 !text-lg font-medium
                                               !bg-green-500 !text-white shadow
                                               hover:!bg-green-600 hover:shadow-lg
                                               focus:outline-none focus:ring-2 focus:ring-green-400 active:scale-[0.99]
                                               dark:bg-green-600 dark:hover:bg-green-500">
                                {t("hero_to_contacts")}
                            </button>
                        </div>
                    </div>
                    <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-black dark:border-white/10">
                        <div className="grid grid-cols-2 gap-4">
                            <ServiceCardOdd titleKey="services_welding_title" descKey="services_welding_desc" s={SERVICES[8]}/>
                            <ServiceCard titleKey="services_stiffener_title" descKey="services_stiffener_desc" s={SERVICES[9]}/>
                            <ServiceCard titleKey="services_leg_title" descKey="services_leg_desc" s={SERVICES[10]}/>
                            <ServiceCardOdd titleKey="services_acid_title" descKey="services_acid_desc" s={SERVICES[11]}/>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}