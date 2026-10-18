import { useRef, useEffect } from "react";
import { animate, createTimeline, stagger, SPRING_PRESETS, EASINGS, prefersReducedMotion } from "../lib/anime/animeCore";

export interface ScrollRevealOptions {
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale" | "depth";
  distance?: number;
  duration?: number;
  delay?: number;
  staggerChildren?: number;
  childSelector?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Hook to trigger cinematic Anime.js v4 entrance animations when elements enter the viewport.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const {
    direction = "up",
    distance = 32,
    duration = 750,
    delay = 0,
    staggerChildren = 0,
    childSelector,
    threshold = 0.15,
    rootMargin = "0px 0px -60px 0px",
    once = true,
  } = options;

  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined" ||
      prefersReducedMotion()
    ) {
      el.style.opacity = "1";
      el.style.transform = "none";
      if (childSelector) {
        const children = el.querySelectorAll<HTMLElement>(childSelector);
        children.forEach((child) => {
          child.style.opacity = "1";
          child.style.transform = "none";
        });
      }
      return;
    }

    // Prepare initial state
    const getInitialTransforms = () => {
      switch (direction) {
        case "up":
          return { translateY: distance, opacity: 0 };
        case "down":
          return { translateY: -distance, opacity: 0 };
        case "left":
          return { translateX: distance, opacity: 0 };
        case "right":
          return { translateX: -distance, opacity: 0 };
        case "scale":
          return { scale: 0.92, opacity: 0 };
        case "depth":
          return { translateZ: -80, scale: 0.95, opacity: 0 };
        case "fade":
        default:
          return { opacity: 0 };
      }
    };

    const initial = getInitialTransforms();

    let targets: HTMLElement | HTMLElement[] = el;
    let hasChildren = false;

    if (childSelector) {
      const children = Array.from(el.querySelectorAll<HTMLElement>(childSelector));
      if (children.length > 0) {
        targets = children;
        hasChildren = true;
      }
    }

    // Set initial styling before triggering
    if (Array.isArray(targets)) {
      targets.forEach((target) => {
        Object.assign(target.style, {
          opacity: "0",
          willChange: "transform, opacity",
        });
      });
    } else {
      Object.assign(targets.style, {
        opacity: "0",
        willChange: "transform, opacity",
      });
    }

    let hasRevealed = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!hasRevealed || !once)) {
            hasRevealed = true;

            const tl = createTimeline({
              defaults: {
                ease: SPRING_PRESETS.snappy,
                duration: duration,
              },
            });

            if (hasChildren && Array.isArray(targets)) {
              (tl as any).add(targets, {
                opacity: [0, 1],
                translateX: initial.translateX !== undefined ? [initial.translateX, 0] : undefined,
                translateY: initial.translateY !== undefined ? [initial.translateY, 0] : undefined,
                scale: initial.scale !== undefined ? [initial.scale, 1] : undefined,
                delay: stagger(staggerChildren, { start: delay }),
                ease: EASINGS.easeOutCubic,
              });
            } else {
              (tl as any).add(targets, {
                opacity: [0, 1],
                translateX: initial.translateX !== undefined ? [initial.translateX, 0] : undefined,
                translateY: initial.translateY !== undefined ? [initial.translateY, 0] : undefined,
                scale: initial.scale !== undefined ? [initial.scale, 1] : undefined,
                delay: delay,
                ease: EASINGS.easeOutCubic,
              });
            }

            if (once) {
              observer.unobserve(el);
            }
          } else if (!entry.isIntersecting && !once && hasRevealed) {
            // Revert when scrolling away if repeat is requested
            animate(targets as any, {
              opacity: 0,
              duration: 250,
              ease: EASINGS.easeInOutCubic,
            });
            hasRevealed = false;
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [
    direction,
    distance,
    duration,
    delay,
    staggerChildren,
    childSelector,
    threshold,
    rootMargin,
    once,
  ]);

  return elementRef;
}
