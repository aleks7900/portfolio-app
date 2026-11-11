import { useRef, useCallback, useState } from "react";
import { animate, SPRING_PRESETS, prefersReducedMotion } from "../lib/anime/animeCore";

export interface AnimeTiltOptions {
  maxTiltX?: number; // max tilt degrees on X, default 6
  maxTiltY?: number; // max tilt degrees on Y, default 6
  liftZ?: number; // translateZ lift in px, default 16
  scale?: number; // hover scale, default 1.025
  glare?: boolean;
}

/**
 * High-performance 3D perspective tilt hook powered by Anime.js v4 spring physics.
 * Animates DOM transforms directly without React render cycle overhead for buttery smooth 60fps.
 */
export function useAnimePerspectiveTilt<T extends HTMLElement = HTMLDivElement>(
  options: AnimeTiltOptions = {}
) {
  const {
    maxTiltX = 6,
    maxTiltY = 6,
    liftZ = 16,
    scale = 1.025,
    glare = true,
  } = options;

  const ref = useRef<T | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const [isTouchDevice] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el || isTouchDevice || prefersReducedMotion()) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      const rotX = -normY * maxTiltX;
      const rotY = normX * maxTiltY;

      // Animate card with Anime.js v4 spring
      animate(el, {
        rotateX: rotX,
        rotateY: rotY,
        translateZ: liftZ,
        scale: scale,
        ease: SPRING_PRESETS.snappy,
        duration: 350,
      });

      // Update glare highlight if element exists
      if (glare && glareRef.current) {
        const pctX = (x / rect.width) * 100;
        const pctY = (y / rect.height) * 100;
        glareRef.current.style.opacity = "1";
        glareRef.current.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.18) 0%, transparent 70%)`;
      }
    },
    [isTouchDevice, maxTiltX, maxTiltY, liftZ, scale, glare]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el || isTouchDevice) return;

    animate(el, {
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
      scale: 1,
      ease: SPRING_PRESETS.bouncy,
      duration: 600,
    });

    if (glare && glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  }, [isTouchDevice, glare]);

  return {
    ref,
    glareRef,
    onMouseMove,
    onMouseLeave,
    isTouchDevice,
  };
}
