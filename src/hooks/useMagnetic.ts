import { useRef, useEffect, useCallback } from "react";
import { animate, SPRING_PRESETS, prefersReducedMotion } from "../lib/anime/animeCore";

interface MagneticOptions {
  strength?: number; // 0 to 1, default 0.35
  maxDistance?: number; // max pull distance in px, default 24
  disabled?: boolean;
}

/**
 * Hook for creating magnetic buttons and interactive UI controls with Anime.js v4.
 * Smoothly pulls the element toward the cursor on hover with spring physics.
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  options: MagneticOptions = {}
) {
  const { strength = 0.35, maxDistance = 20, disabled = false } = options;
  const elementRef = useRef<T | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = elementRef.current;
      if (!el || disabled || prefersReducedMotion()) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      // Clamp distance
      const distance = Math.hypot(deltaX, deltaY);
      const clampedX = distance > maxDistance ? (deltaX / distance) * maxDistance : deltaX;
      const clampedY = distance > maxDistance ? (deltaY / distance) * maxDistance : deltaY;

      animate(el, {
        translateX: clampedX,
        translateY: clampedY,
        ease: SPRING_PRESETS.magnetic,
        duration: 350,
      });
    },
    [strength, maxDistance, disabled]
  );

  const handleMouseLeave = useCallback(() => {
    const el = elementRef.current;
    if (!el || disabled) return;

    animate(el, {
      translateX: 0,
      translateY: 0,
      ease: SPRING_PRESETS.bouncy,
      duration: 550,
    });
  }, [disabled]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || disabled) return;

    // Skip on touch screens
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      // reset translation on unmount
      if (el) {
        el.style.transform = "";
      }
    };
  }, [handleMouseMove, handleMouseLeave, disabled]);

  return elementRef;
}
