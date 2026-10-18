import {
  animate,
  createTimeline,
  stagger,
  onScroll,
  splitText,
  svg,
  cubicBezier,
  spring,
} from "animejs";

/**
 * Check if the user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Spring easing presets tuned for natural, premium UI motion
 */
export const SPRING_PRESETS = {
  snappy: spring({ mass: 1, stiffness: 90, damping: 12 }),
  gentle: spring({ mass: 1, stiffness: 70, damping: 14 }),
  bouncy: spring({ mass: 1, stiffness: 100, damping: 8 }),
  tight: spring({ mass: 1, stiffness: 120, damping: 16 }),
  magnetic: spring({ mass: 1, stiffness: 85, damping: 10 }),
};

/**
 * Common easings
 */
export const EASINGS = {
  easeOutCubic: cubicBezier(0.215, 0.61, 0.355, 1),
  easeOutQuart: cubicBezier(0.165, 0.84, 0.44, 1),
  easeOutExpo: cubicBezier(0.19, 1, 0.22, 1),
  easeInOutCubic: cubicBezier(0.645, 0.045, 0.355, 1),
};

export { animate, createTimeline, stagger, onScroll, splitText, svg, cubicBezier, spring };
