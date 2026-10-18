import { useEffect, useRef, type DependencyList } from "react";
import { prefersReducedMotion } from "../lib/anime/animeCore";

export type AnimeCleanup = (() => void) | { revert: () => void } | { pause: () => void } | void;

/**
 * Lifecycle-safe hook for running Anime.js v4 animations.
 * Automatically cleans up or reverts animations when the component unmounts
 * or when dependencies change.
 */
export function useAnime(
  effect: () => AnimeCleanup,
  deps: DependencyList = []
) {
  const cleanupRef = useRef<AnimeCleanup>(undefined);

  useEffect(() => {
    // If user prefers reduced motion, we still run the effect but animations
    // can check prefersReducedMotion() for instant application
    cleanupRef.current = effect();

    return () => {
      const cleanup = cleanupRef.current;
      if (typeof cleanup === "function") {
        cleanup();
      } else if (cleanup && typeof (cleanup as { revert?: () => void }).revert === "function") {
        (cleanup as { revert: () => void }).revert();
      } else if (cleanup && typeof (cleanup as { pause?: () => void }).pause === "function") {
        (cleanup as { pause: () => void }).pause();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { prefersReducedMotion };
