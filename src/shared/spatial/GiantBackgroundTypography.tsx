import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface GiantBackgroundTypographyProps {
  text: string;
  className?: string;
  offsetY?: [number, number];
}

/**
 * Enormous, architectural background typography with very low contrast and slow parallax.
 * Reinforces spatial depth behind sections without competing with readable UI headings.
 */
export function GiantBackgroundTypography({
  text,
  className = "",
  offsetY = [-40, 40],
}: GiantBackgroundTypographyProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const isReduced = Boolean(prefersReduced);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Moves at slower parallax rate relative to foreground DOM content
  const y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : offsetY);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden z-0 w-full"
    >
      <motion.div
        style={{ y }}
        className={`whitespace-nowrap font-black uppercase tracking-[0.2em] sm:tracking-[0.35em] text-foreground/[0.035] dark:text-white/[0.03] text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] leading-none will-change-transform ${className}`}
      >
        {text}
      </motion.div>
    </div>
  );
}

export default GiantBackgroundTypography;
