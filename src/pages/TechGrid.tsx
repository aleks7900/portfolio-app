import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Cpu, Terminal, Sparkles, Network } from "lucide-react";
import {
  SiCss,
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
import { useI18n, toLangHref } from "../shared/i18n/i18n.tsx";
import { useAnimePerspectiveTilt } from "../hooks/useAnimePerspectiveTilt";
import {
  animate,
  createTimeline,
  stagger,
  SPRING_PRESETS,
  prefersReducedMotion,
} from "../lib/anime/animeCore";

type CategoryId = "all" | "frontend" | "backend" | "data";

interface TechItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  slug: string;
  category: "frontend" | "backend" | "data";
  role: string;
  brandHex: string;
  color: string;
}

const techs: TechItem[] = [
  {
    icon: SiReact,
    label: "React",
    slug: "/dev/react",
    category: "frontend",
    role: "UI Architecture",
    brandHex: "#38bdf8",
    color: "text-sky-400 group-hover:text-sky-300",
  },
  {
    icon: SiTypescript,
    label: "TypeScript",
    slug: "/dev/typescript",
    category: "frontend",
    role: "Type Integrity",
    brandHex: "#3b82f6",
    color: "text-blue-500 group-hover:text-blue-400",
  },
  {
    icon: SiSpringboot,
    label: "Spring Boot",
    slug: "/dev/spring-boot",
    category: "backend",
    role: "Enterprise Microservices",
    brandHex: "#10b981",
    color: "text-emerald-500 group-hover:text-emerald-400",
  },
  {
    icon: SiPostgresql,
    label: "PostgreSQL",
    slug: "/dev/postgresql",
    category: "data",
    role: "ACID Relational Storage",
    brandHex: "#0284c7",
    color: "text-sky-600 group-hover:text-sky-400",
  },
  {
    icon: SiTailwindcss,
    label: "Tailwind CSS",
    slug: "/dev/tailwind",
    category: "frontend",
    role: "Modern Utility Design",
    brandHex: "#22d3ee",
    color: "text-cyan-400 group-hover:text-cyan-300",
  },
  {
    icon: SiSpring,
    label: "Spring Framework",
    slug: "/dev/spring",
    category: "backend",
    role: "Core Dependency Injection",
    brandHex: "#22c55e",
    color: "text-green-500 group-hover:text-green-400",
  },
  {
    icon: SiSpringsecurity,
    label: "Spring Security",
    slug: "/dev/spring-security",
    category: "backend",
    role: "JWT & OAuth2 RBAC",
    brandHex: "#14b8a6",
    color: "text-teal-500 group-hover:text-teal-400",
  },
  {
    icon: SiJavascript,
    label: "JavaScript ES6+",
    slug: "/dev/javascript",
    category: "frontend",
    role: "Modern ECMAScript Core",
    brandHex: "#facc15",
    color: "text-yellow-400 group-hover:text-yellow-300",
  },
  {
    icon: SiRedux,
    label: "Redux",
    slug: "/dev/redux",
    category: "frontend",
    role: "Predictable State Store",
    brandHex: "#8b5cf6",
    color: "text-violet-500 group-hover:text-violet-400",
  },
  {
    icon: SiMongodb,
    label: "MongoDB",
    slug: "/dev/mongodb",
    category: "data",
    role: "Document / NoSQL DB",
    brandHex: "#059669",
    color: "text-emerald-600 group-hover:text-emerald-400",
  },
  {
    icon: SiNginx,
    label: "Nginx",
    slug: "/dev/nginx",
    category: "backend",
    role: "Reverse Proxy & TLS 1.3",
    brandHex: "#16a34a",
    color: "text-emerald-600 group-hover:text-emerald-400",
  },
  {
    icon: SiGit,
    label: "Git & CI/CD",
    slug: "/dev/git",
    category: "data",
    role: "VCS & Deployment Pipelines",
    brandHex: "#f97316",
    color: "text-orange-500 group-hover:text-orange-400",
  },
  {
    icon: SiHtml5,
    label: "HTML5 Semantic",
    slug: "/dev/html5",
    category: "frontend",
    role: "Accessible Web Standards",
    brandHex: "#ea580c",
    color: "text-orange-600 group-hover:text-orange-500",
  },
  {
    icon: SiCss,
    label: "CSS3 / Modern Web",
    slug: "/dev/css3",
    category: "frontend",
    role: "Responsive Fluid Layouts",
    brandHex: "#2563eb",
    color: "text-blue-600 group-hover:text-blue-400",
  },
  {
    icon: SiSass,
    label: "SASS / SCSS",
    slug: "/dev/sass",
    category: "frontend",
    role: "Modular Preprocessing",
    brandHex: "#ec4899",
    color: "text-pink-500 group-hover:text-pink-400",
  },
];

type Lang = "ru" | "ro" | "en";

const CATEGORIES: Array<{ id: CategoryId; labels: Record<Lang, string> }> = [
  { id: "all", labels: { ru: "Все технологии", ro: "Toate tehnologiile", en: "All Technologies" } },
  { id: "frontend", labels: { ru: "Frontend & UI", ro: "Frontend & UI", en: "Frontend & UI" } },
  { id: "backend", labels: { ru: "Backend & Архитектура", ro: "Backend & Arhitectură", en: "Backend & Architecture" } },
  { id: "data", labels: { ru: "Базы данных & DevOps", ro: "Baze de date & DevOps", en: "Databases & DevOps" } },
];

function TechCardItem({ tech }: { tech: TechItem }) {
  const { lang } = useI18n();
  const Icon = tech.icon;

  const { ref: cardRef, glareRef, onMouseMove, onMouseLeave } =
    useAnimePerspectiveTilt<HTMLDivElement>({
      maxTiltX: 7,
      maxTiltY: 7,
      liftZ: 16,
      scale: 1.04,
      glare: true,
    });

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-tech-card
      className="relative [perspective:1000px] [transform-style:preserve-3d] h-full"
    >
      <Link
        to={toLangHref(tech.slug, lang)}
        className="group relative flex flex-col items-center justify-center rounded-2xl border border-border/80 bg-card/85 dark:bg-card/60 p-5 sm:p-6 shadow-xs hover:shadow-2xl transition-all duration-300 cursor-pointer text-center h-full [transform-style:preserve-3d]"
        style={{
          boxShadow: `0 0 0 1px var(--border)`,
        }}
      >
        {/* Dynamic Specular Pointer Glare */}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 [transform:translateZ(6px)]"
        />

        {/* Ambient colored hover glow backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300 -z-10"
          style={{ backgroundColor: tech.brandHex }}
        />

        {/* Top Mini Role Pill (translateZ = 12px) */}
        <div className="mb-2 [transform:translateZ(12px)]">
          <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground group-hover:text-foreground/90 transition-colors">
            {tech.role}
          </span>
        </div>

        {/* Technology Icon (translateZ = 24px) */}
        <div className="my-2 transition-transform duration-300 group-hover:scale-115 [transform:translateZ(24px)]">
          <Icon className={`w-11 h-11 sm:w-12 sm:h-12 ${tech.color} transition-colors duration-300`} />
        </div>

        {/* Text Label (translateZ = 16px) */}
        <p className="font-bold text-sm tracking-tight text-foreground/90 group-hover:text-foreground transition-colors [transform:translateZ(16px)]">
          {tech.label}
        </p>
      </Link>
    </div>
  );
}

export default function TechGrid() {
  const { t, lang } = useI18n();
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const svgLinesRef = useRef<SVGSVGElement | null>(null);

  const filteredTechs = useMemo(() => {
    if (activeCategory === "all") return techs;
    return techs.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Anime.js Stagger entrance animation on category change or initial mount
  const triggerCategoryStagger = useCallback(() => {
    if (prefersReducedMotion()) return;
    const container = gridContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll("[data-tech-card]");
    if (!cards || cards.length === 0) return;

    // Reset cards to start state
    cards.forEach((card) => {
      const el = card as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translate3d(0, 24px, 0) scale(0.92)";
    });

    const tl = createTimeline({
      defaults: {
        ease: SPRING_PRESETS.snappy,
      },
    });

    (tl as any).add(Array.from(cards), {
      opacity: [0, 1],
      translateY: [24, 0],
      scale: [0.92, 1],
      duration: 600,
      delay: stagger(35),
      ease: SPRING_PRESETS.snappy,
    }, 0);
  }, []);

  useEffect(() => {
    triggerCategoryStagger();
  }, [activeCategory, triggerCategoryStagger]);

  // Anime.js SVG Constellation Data Flow Animation
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const svg = svgLinesRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll<SVGPathElement>("[data-flow-path]");
    const animInstances: any[] = [];

    paths.forEach((path, idx) => {
      // Calculate length for dashoffset
      const len = path.getTotalLength ? path.getTotalLength() : 300;
      path.style.strokeDasharray = `${len * 0.3} ${len * 0.7}`;

      const flowAnim = animate(path, {
        strokeDashoffset: [len, -len],
        duration: 3500 + idx * 800,
        loop: true,
        ease: "linear",
      });

      animInstances.push(flowAnim);
    });

    return () => {
      animInstances.forEach((anim) => {
        if (anim && typeof anim.pause === "function") anim.pause();
      });
    };
  }, []);

  return (
    <div className="relative py-20 overflow-hidden [perspective:1200px]">
      {/* ── Background SVG Technology Constellation Network ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-25 dark:opacity-20"
      >
        <svg
          ref={svgLinesRef}
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="techLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Connected Constellation Paths */}
          <path
            data-flow-path
            d="M 100 200 Q 400 120 700 260 T 1300 200"
            fill="none"
            stroke="url(#techLineGrad)"
            strokeWidth="1.5"
          />
          <path
            data-flow-path
            d="M 150 480 Q 550 400 850 520 T 1400 450"
            fill="none"
            stroke="url(#techLineGrad)"
            strokeWidth="1.5"
          />
          <path
            data-flow-path
            d="M 300 100 Q 600 300 900 150 T 1200 350"
            fill="none"
            stroke="url(#techLineGrad)"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Section Title & Value Proposition ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Cpu className="h-4 w-4 text-primary animate-pulse" />
            <span>Modern Production Technology Stack</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            {t("tech_stack_title") || "Архитектура и стек технологий"}
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("tech_stack_subtitle") ||
              "Проверенный временем инженерный стек: реактивный фронтенд, надёжный бэкенд и масштабируемые базы данных."}
          </p>
        </div>

        {/* ── Interactive Category Filtering Tabs ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer outline-none select-none ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-102"
                    : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary/90 border border-border/60"
                }`}
              >
                {cat.labels[lang] || cat.labels.ru}
              </button>
            );
          })}
        </div>

        {/* ── Interactive 3D Perspective Tech Nodes Grid ── */}
        <div
          ref={gridContainerRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          {filteredTechs.map((tech) => (
            <TechCardItem key={tech.label} tech={tech} />
          ))}
        </div>

        {/* ── Live Architecture Guarantee Strip ── */}
        <div className="mt-14 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-md p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-mono text-foreground font-medium">100% Type-Safe TypeScript</span>
          </div>
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-emerald-500" />
            <span className="font-mono text-foreground font-medium">Spring Boot 3 Reactive APIs</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-sky-400" />
            <span className="font-mono text-foreground font-medium">Anime.js v4 60FPS Fluid Motion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
