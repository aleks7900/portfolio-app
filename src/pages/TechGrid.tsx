import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Cpu } from "lucide-react";
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
  SiTypescript,
} from "react-icons/si";
import { useI18n } from "../shared/i18n/i18n.tsx";
import { usePointerTilt } from "../shared/spatial/usePointerTilt";
import {
  TECH_CARD_SPATIAL_OFFSETS,
  type TechCardSpatialOffset,
} from "../shared/spatial/spatialTokens";

interface TechItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  slug: string;
  color: string;
}

const techs: TechItem[] = [
  { icon: SiReact, label: "React", slug: "/dev/react", color: "text-sky-400 group-hover:text-sky-400" },
  { icon: SiTypescript, label: "TypeScript", slug: "/dev/typescript", color: "text-blue-500 group-hover:text-blue-500" },
  { icon: SiJavascript, label: "JavaScript", slug: "/dev/javascript", color: "text-yellow-400 group-hover:text-yellow-400" },
  { icon: SiSpringboot, label: "Spring Boot", slug: "/dev/spring-boot", color: "text-emerald-500 group-hover:text-emerald-500" },
  { icon: SiSpring, label: "Spring", slug: "/dev/spring", color: "text-green-500 group-hover:text-green-500" },
  { icon: SiSpringsecurity, label: "Security", slug: "/dev/spring-security", color: "text-teal-500 group-hover:text-teal-500" },
  { icon: SiPostgresql, label: "PostgreSQL", slug: "/dev/postgresql", color: "text-sky-600 group-hover:text-sky-600" },
  { icon: SiMongodb, label: "MongoDB", slug: "/dev/mongodb", color: "text-emerald-600 group-hover:text-emerald-600" },
  { icon: SiTailwindcss, label: "Tailwind CSS", slug: "/dev/tailwind", color: "text-cyan-400 group-hover:text-cyan-400" },
  { icon: SiRedux, label: "Redux", slug: "/dev/redux", color: "text-violet-500 group-hover:text-violet-500" },
  { icon: SiNginx, label: "Nginx", slug: "/dev/nginx", color: "text-emerald-600 group-hover:text-emerald-600" },
  { icon: SiGit, label: "Git", slug: "/dev/git", color: "text-orange-500 group-hover:text-orange-500" },
  { icon: SiHtml5, label: "HTML5", slug: "/dev/html5", color: "text-orange-600 group-hover:text-orange-600" },
  { icon: SiCss3, label: "CSS3", slug: "/dev/css3", color: "text-blue-600 group-hover:text-blue-600" },
  { icon: SiSass, label: "SASS", slug: "/dev/sass", color: "text-pink-500 group-hover:text-pink-500" },
];

function TechCardItem({
  tech,
  offset,
  scrollProgress,
  isReducedMotion,
}: {
  tech: TechItem;
  offset: TechCardSpatialOffset;
  scrollProgress: MotionValue<number>;
  isReducedMotion: boolean;
}) {
  const { ref: tiltRef, style: tiltStyle, onMouseMove, onMouseLeave } =
    usePointerTilt<HTMLDivElement>({
      maxTiltX: 6,
      maxTiltY: 6,
      liftZ: 14,
      scale: 1.02,
    });

  // Convergence from disparate 3D depths to the clean 2D grid
  const z = useTransform(
    scrollProgress,
    [0, 1],
    isReducedMotion ? [0, 0] : [offset.z, 0]
  );
  const x = useTransform(
    scrollProgress,
    [0, 1],
    isReducedMotion ? [0, 0] : [offset.x, 0]
  );
  const y = useTransform(
    scrollProgress,
    [0, 1],
    isReducedMotion ? [0, 0] : [offset.y, 0]
  );
  const rotX = useTransform(
    scrollProgress,
    [0, 1],
    isReducedMotion ? [0, 0] : [offset.rotX, 0]
  );
  const rotY = useTransform(
    scrollProgress,
    [0, 1],
    isReducedMotion ? [0, 0] : [offset.rotY, 0]
  );
  const scale = useTransform(
    scrollProgress,
    [0, 1],
    isReducedMotion ? [1, 1] : [offset.scale, 1]
  );
  const opacity = useTransform(scrollProgress, [0, 0.6, 1], [0.2, 0.7, 1]);

  const Icon = tech.icon;

  return (
    <motion.div
      style={{
        z,
        x,
        y,
        rotateX: rotX,
        rotateY: rotY,
        scale,
        opacity,
        transformStyle: "preserve-3d",
      }}
      className="will-change-transform"
    >
      <motion.div
        ref={tiltRef}
        style={tiltStyle}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="h-full [transform-style:preserve-3d]"
      >
        <Link
          to={tech.slug}
          className="group relative flex flex-col items-center justify-center rounded-2xl border border-border/80 bg-card/80 dark:bg-card/60 p-6 shadow-xs hover:shadow-xl hover:border-primary/40 backdrop-blur-sm transition-colors duration-300 cursor-pointer text-center h-full [transform-style:preserve-3d]"
        >
          {/* Layer 1: Glow / Highlight (z = +5px) */}
          <div className="absolute inset-0 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none [transform:translateZ(5px)]" />

          {/* Layer 2: Technology Icon (z = +25px) */}
          <div className="mb-3 transition-transform duration-300 group-hover:scale-110 [transform:translateZ(25px)]">
            <Icon className={`w-12 h-12 ${tech.color} transition-colors duration-300`} />
          </div>

          {/* Layer 3: Text Label (z = +10px) */}
          <p className="font-semibold text-xs tracking-wider uppercase text-foreground/80 group-hover:text-foreground transition-colors [transform:translateZ(10px)]">
            {tech.label}
          </p>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function TechGrid() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const isReducedMotion = Boolean(prefersReduced);

  // Tracks convergence scroll progress as section enters the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  return (
    <div
      ref={sectionRef}
      className="relative py-20 overflow-hidden [perspective:1200px] [transform-style:preserve-3d]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Cpu className="h-3.5 w-3.5" />
            <span>Modern Technology Stack</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("tech_stack_title")}
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("tech_stack_subtitle")}
          </p>
        </div>

        {/* 3D Converging Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 [transform-style:preserve-3d]">
          {techs.map((tech, index) => {
            const offset =
              TECH_CARD_SPATIAL_OFFSETS[index % TECH_CARD_SPATIAL_OFFSETS.length];
            return (
              <TechCardItem
                key={tech.label}
                tech={tech}
                offset={offset}
                scrollProgress={scrollYProgress}
                isReducedMotion={isReducedMotion}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
