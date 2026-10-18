import { useRef, useEffect } from "react";
import { splitText, animate, stagger, SPRING_PRESETS, prefersReducedMotion } from "../../lib/anime/animeCore";

export interface AnimeTextRevealProps {
  children: string;
  type?: "chars" | "words";
  delay?: number;
  staggerMs?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  direction?: "up" | "down" | "fade";
}

/**
 * Cinematic typography reveal powered by Anime.js v4 splitText & spring easing.
 * Splits text into accessible words or characters and animates them into view.
 */
export function AnimeTextReveal({
  children,
  type = "words",
  delay = 100,
  staggerMs = 35,
  className = "",
  as: Component = "span",
  direction = "up",
}: AnimeTextRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      return;
    }

    try {
      const splitter = splitText(el, {
        accessible: true,
      });

      const targets = type === "chars" ? splitter.chars : splitter.words;

      if (!targets || targets.length === 0) {
        return;
      }

      // Initial state
      targets.forEach((t: HTMLElement) => {
        t.style.display = "inline-block";
        t.style.opacity = "0";
        t.style.willChange = "transform, opacity";
      });

      const fromY = direction === "up" ? 30 : direction === "down" ? -30 : 0;

      const anim = animate(targets, {
        opacity: [0, 1],
        translateY: [fromY, 0],
        rotateX: [fromY !== 0 ? -25 : 0, 0],
        delay: stagger(staggerMs, { start: delay }),
        duration: 850,
        ease: SPRING_PRESETS.snappy,
      });

      return () => {
        if (anim && typeof anim.pause === "function") {
          anim.pause();
        }
        splitter.revert();
      };
    } catch {
      // Fallback: ensure text is visible
      el.style.opacity = "1";
    }
  }, [children, type, delay, staggerMs, direction]);

  const Tag = Component as any;

  return (
    <Tag
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ perspective: "1000px" }}
    >
      {children}
    </Tag>
  );
}

export default AnimeTextReveal;
