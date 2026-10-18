import { useEffect, useRef } from "react";
import { animate, prefersReducedMotion } from "../../../lib/anime/animeCore";

interface FloatingItem {
  id: string;
  label: string;
  x: string; // CSS position
  y: string;
  size: string;
  color: string;
  depth: number;
  rotation: number;
  duration: number;
  delay: number;
}

const FLOATING_ITEMS: FloatingItem[] = [
  {
    id: "code-bracket",
    label: "</>",
    x: "12%",
    y: "18%",
    size: "text-base sm:text-lg font-mono font-bold",
    color: "text-indigo-400/40 dark:text-indigo-300/40 border-indigo-500/20 bg-indigo-500/5",
    depth: 18,
    rotation: -12,
    duration: 5200,
    delay: 200,
  },
  {
    id: "lambda",
    label: "λ => fn()",
    x: "82%",
    y: "22%",
    size: "text-xs sm:text-sm font-mono font-medium",
    color: "text-cyan-400/40 dark:text-cyan-300/40 border-cyan-500/20 bg-cyan-500/5",
    depth: 25,
    rotation: 8,
    duration: 6400,
    delay: 600,
  },
  {
    id: "react-hook",
    label: "useAnime()",
    x: "78%",
    y: "68%",
    size: "text-xs sm:text-sm font-mono font-semibold",
    color: "text-sky-400/40 dark:text-sky-300/40 border-sky-500/20 bg-sky-500/5",
    depth: 20,
    rotation: -6,
    duration: 5800,
    delay: 400,
  },
  {
    id: "spring-boot",
    label: "@SpringBoot",
    x: "8%",
    y: "74%",
    size: "text-xs sm:text-sm font-mono font-medium",
    color: "text-emerald-400/40 dark:text-emerald-300/40 border-emerald-500/20 bg-emerald-500/5",
    depth: 22,
    rotation: 14,
    duration: 6800,
    delay: 800,
  },
  {
    id: "binary-pill",
    label: "0101 • 60FPS",
    x: "48%",
    y: "12%",
    size: "text-[11px] font-mono tracking-wider",
    color: "text-violet-400/35 dark:text-violet-300/35 border-violet-500/20 bg-violet-500/5",
    depth: 15,
    rotation: 4,
    duration: 6000,
    delay: 1000,
  },
];

export default function HeroFloatingElements() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>("[data-floating-item]");
    const animInstances: Array<{ pause?: () => void }> = [];

    items.forEach((item, idx) => {
      const config = FLOATING_ITEMS[idx];
      if (!config) return;

      // Animate floating up and down with gentle sine ease
      const floatAnim = animate(item, {
        translateY: [-config.depth, config.depth],
        rotate: [config.rotation - 4, config.rotation + 4],
        duration: config.duration,
        delay: config.delay,
        alternate: true,
        loop: true,
        ease: "easeInOutSine",
      });

      animInstances.push(floatAnim);
    });

    // Parallax response on subtle mouse move across hero
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const normY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      items.forEach((item, idx) => {
        const config = FLOATING_ITEMS[idx];
        if (!config) return;

        const factor = (idx + 1) * 6;
        item.style.transform = `translate3d(${normX * factor}px, ${normY * factor}px, 0px)`;
      });
    };

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      animInstances.forEach((inst) => {
        if (typeof inst?.pause === "function") inst.pause();
      });
      if (!isTouch) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden select-none"
    >
      {FLOATING_ITEMS.map((item) => (
        <div
          key={item.id}
          data-floating-item
          style={{
            left: item.x,
            top: item.y,
            transform: `rotate(${item.rotation}deg)`,
          }}
          className={`absolute rounded-xl border backdrop-blur-xs px-3 py-1.5 shadow-sm transition-transform duration-300 ${item.size} ${item.color}`}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
