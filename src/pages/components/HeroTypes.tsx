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

export default function HeroTypes() {
    const {t} = useI18n();
    const navigate = useNavigate();

    return (
        <section className="pt-28 sm:pt-32">
            {/* Локальные keyframes (не требует правок tailwind.config) */}
            <style>{`
                @media (prefers-reduced-motion: no-preference) {
                    @keyframes icon-float { 0%{ transform: translateY(0) } 50%{ transform: translateY(-4px) } 100%{ transform: translateY(0) } }
                    @keyframes soft-glow { from { box-shadow: 0 0 0 rgba(0,0,0,0) } to { box-shadow: 0 12px 32px rgba(0,0,0,.18) } }
                    @keyframes card-gradient-glow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .card-icon-anim svg, .card-icon-anim [data-icon], .card-icon-anim .icon { animation: icon-float 2.4s ease-in-out infinite; }
                .card-appear { animation: soft-glow .35s ease both; }
                .card-glow-bg {
                    position: relative;
                    overflow: hidden;
                }
                .card-glow-bg::before {
                    content: '';
                    position: absolute;
                    inset: -2px;
                    z-index: 0;
                    background: linear-gradient(120deg, rgba(99,102,241,0.4), rgba(236,72,153,0.4), rgba(20,184,166,0.4), rgba(99,102,241,0.4));
                    background-size: 300% 300%;
                    animation: card-gradient-glow 6s ease-in-out infinite;
                    filter: blur(12px);
                    opacity: 0.7;
                    border-radius: 1rem;
                }
                .card-glow-bg > * { position: relative; z-index: 1; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .card-icon-anim svg, .card-icon-anim [data-icon], .card-icon-anim .icon { animation: none !important; }
                    .card-appear { animation: none !important; }
                    .card-glow-bg::before { animation: none !important; }
                }
            `}</style>

            <div className="mx-auto max-w-[72rem] xl:max-w-[80rem] 2xl:max-w-[90rem] px-4 sm:px-6">
                <motion.div initial="hidden" animate="visible" variants={containerVariants}
                            className="grid gap-8 sm:gap-10 md:grid-cols-2 md:items-center">
                    {/* Левая часть */}
                    <motion.div variants={cardVariants}>
                        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                            <span
                                className="underline decoration-gray-300 dark:decoration-white/20">{t("hero_types_title")}</span>
                        </h1>
                        <p className="mt-4 max-w-prose text-gray-600 dark:text-gray-300">{t("hero_types_sub")}</p>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <motion.button
                                whileHover={{y: -1}}
                                whileTap={{scale: 0.985}}
                                onClick={() => {
                                    navigate("/guide");
                                    window.scrollTo({top: 0, behavior: "smooth"});
                                }}
                                className="w-56 rounded-2xl border px-8 py-4 !text-lg font-medium !bg-white !text-black
                                shadow hover:!bg-black hover:!text-white hover:shadow-lg focus:outline-none focus:ring-2
                                focus:ring-black/40 active:scale-[0.99] dark:bg-white dark:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
                            >
                                {t("hero_to_guide")}
                            </motion.button>
                            <motion.button
                                whileHover={{y: -1}}
                                whileTap={{scale: 0.985}}
                                onClick={() => {
                                    navigate("/contacts");
                                    window.scrollTo({top: 0, behavior: "smooth"});
                                }}
                                className="w-56 rounded-2xl border px-8 py-4 !text-lg font-medium !bg-green-500 !text-white
                                shadow hover:!bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 active:scale-[0.99] dark:bg-green-600 dark:hover:bg-green-500"
                            >
                                {t("hero_to_contacts")}
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Правая — карточки услуг с анимацией */}
                    <motion.div variants={cardVariants}
                                className="rounded-2xl border !bg-gray-200 p-6 shadow-sm dark:bg-zinc-800 dark:border-white/10 card-glow-bg">
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
                                    {i === 0 && <ServiceCardOdd titleKey="android_title"
                                                                descKey="android_text" s={SERVICES[8]}/>}
                                    {i === 1 && <ServiceCard titleKey="full_title"
                                                             descKey="full_text" s={SERVICES[9]}/>}
                                    {i === 2 && <ServiceCard titleKey="content_title"
                                                             descKey="content_text" s={SERVICES[10]}/>}
                                    {i === 3 && <ServiceCardOdd titleKey="support_title"
                                                                descKey="support_text" s={SERVICES[11]}/>}
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
