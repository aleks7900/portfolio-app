import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { animate, prefersReducedMotion } from "../../../lib/anime/animeCore";

interface ScrollIndicatorProps {
  hasScrolled: boolean;
  onScrollClick?: () => void;
}

export default function ScrollIndicator({
  hasScrolled,
  onScrollClick,
}: ScrollIndicatorProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const chevronRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const dot = dotRef.current;
    const chevron = chevronRef.current;

    // Anime.js looping dot animation
    const dotAnim = dot
      ? animate(dot, {
          translateY: [0, 11],
          opacity: [0.3, 1, 0.3],
          duration: 1600,
          loop: true,
          ease: "easeInOutQuad",
        })
      : null;

    // Anime.js subtle chevron bounce
    const chevronAnim = chevron
      ? animate(chevron, {
          translateY: [0, 4, 0],
          duration: 1400,
          loop: true,
          ease: "easeInOutSine",
        })
      : null;

    return () => {
      if (dotAnim && typeof dotAnim.pause === "function") dotAnim.pause();
      if (chevronAnim && typeof chevronAnim.pause === "function") chevronAnim.pause();
    };
  }, []);

  if (hasScrolled) return null;

  return (
    <div
      ref={rootRef}
      className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-25 flex flex-col items-center gap-2 pointer-events-auto cursor-pointer select-none transition-opacity duration-300 hover:opacity-100 opacity-80"
      onClick={onScrollClick}
      role="button"
      tabIndex={0}
      aria-label="Scroll to explore"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onScrollClick?.();
        }
      }}
    >
      <span className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground/80">
        Scroll
      </span>

      {/* Minimalist animated capsule */}
      <div className="w-5 h-8 rounded-full border border-border/80 bg-background/40 backdrop-blur-md p-1 flex justify-center shadow-xs">
        <div
          ref={dotRef}
          className="w-1.5 h-2 rounded-full bg-primary"
        />
      </div>

      <ChevronDown
        ref={chevronRef}
        className="w-3.5 h-3.5 text-muted-foreground/70"
      />
    </div>
  );
}
