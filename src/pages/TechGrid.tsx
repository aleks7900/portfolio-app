import {
    SiCss3,
    SiGit,
    SiHtml5,
    SiJavascript,
    SiMongodb,
    SiNginx,
    SiPostgresql,
    SiReact,
    SiRedux,
    SiSass,
    SiSpring,
    SiSpringboot,
    SiSpringsecurity,
    SiTailwindcss,
    SiTypescript
} from "react-icons/si";
import {useI18n} from "../shared/i18n/i18n.tsx";
import {Link} from "react-router-dom";

const techs = [
    {icon: SiJavascript, label: "JavaScript", slug: "/dev/javascript", gradient: "from-yellow-400 to-amber-500", text: "text-yellow-400"},
    {icon: SiTypescript, label: "TypeScript", slug: "/dev/typescript", gradient: "from-blue-400 to-blue-600", text: "text-blue-400"},
    {icon: SiReact, label: "ReactJS", slug: "/dev/react", gradient: "from-sky-400 to-sky-600", text: "text-sky-400"},
    {icon: SiNginx, label: "Nginx", slug: "/dev/nginx", gradient: "from-zinc-500 to-zinc-700", text: "text-zinc-500"},
    {icon: SiSpring, label: "Spring", slug: "/dev/spring", gradient: "from-green-400 to-green-600", text: "text-green-400"},
    {icon: SiSpringsecurity, label: "Spring Security", slug: "/dev/spring-security", gradient: "from-emerald-400 to-green-500", text: "text-emerald-400"},
    {icon: SiSpringboot, label: "Spring Boot", slug: "/dev/spring-boot", gradient: "from-lime-400 to-green-600", text: "text-lime-400"},
    {icon: SiHtml5, label: "HTML", slug: "/dev/html5", gradient: "from-orange-400 to-orange-600", text: "text-orange-400"},
    {icon: SiCss3, label: "CSS", slug: "/dev/css3", gradient: "from-blue-400 to-blue-600", text: "text-blue-400"},
    {icon: SiSass, label: "SASS", slug: "/dev/sass", gradient: "from-pink-400 to-pink-600", text: "text-pink-400"},
    {icon: SiTailwindcss, label: "Tailwind CSS", slug: "/dev/tailwind", gradient: "from-cyan-400 to-teal-500", text: "text-cyan-400"},
    {icon: SiPostgresql, label: "PostgreSQL", slug: "/dev/postgresql", gradient: "from-sky-400 to-blue-700", text: "text-sky-400"},
    {icon: SiMongodb, label: "MongoDB", slug: "/dev/mongodb", gradient: "from-green-400 to-emerald-600", text: "text-green-400"},
    {icon: SiGit, label: "Git", slug: "/dev/git", gradient: "from-orange-400 to-red-600", text: "text-orange-400"},
    {icon: SiRedux, label: "Redux", slug: "/dev/redux", gradient: "from-violet-400 to-purple-600", text: "text-violet-400"},
];

export default function TechGrid() {
    const {t} = useI18n();

    return (
        <section className="py-16 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-6 text-zinc-900 dark:text-zinc-100">
                    {t("tech_stack_title")}
                </h2>
                <p className="text-lg text-center mb-12 text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
                    {t("tech_stack_subtitle")}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 text-center">
                    {techs.map(({icon: Icon, label, gradient, text, slug}) => (
                        <Link
                            to={slug}
                            key={label}
                            className={`relative rounded-2xl p-6 bg-white dark:bg-zinc-900 shadow-md transition-all duration-500 
                                        hover:bg-gradient-to-r ${gradient} group cursor-pointer hover:!shadow-2xl`}
                        >
                            <div
                                className="flex flex-col items-center justify-center space-y-3 transition-transform duration-300 group-hover:scale-105">
                                <Icon
                                    className={`w-16 h-16 ${text} dark:text-zinc-100 transition-colors duration-300 group-hover:text-white`}
                                />
                                <p className="font-medium text-sm uppercase tracking-wide text-zinc-700 dark:text-zinc-300 group-hover:text-white">
                                    {label}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
