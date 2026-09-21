import { useEffect, useState } from "react";

export interface PerformanceTier {
  isMobile: boolean;
  isTablet: boolean;
  prefersReducedMotion: boolean;
  isWebGLSupported: boolean;
  dpr: [number, number];
  particleCount: number;
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function usePerformanceTier(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>(() => {
    const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
    const isTablet =
      typeof window !== "undefined"
        ? window.innerWidth >= 768 && window.innerWidth < 1024
        : false;
    const prefersReducedMotion =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;
    const isWebGLSupported = checkWebGLSupport();

    return {
      isMobile,
      isTablet,
      prefersReducedMotion,
      isWebGLSupported,
      dpr: isMobile ? [1, 1.25] : [1, 1.75],
      particleCount: isMobile ? 80 : isTablet ? 180 : 360,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isWebGLSupported = checkWebGLSupport();

      setTier({
        isMobile,
        isTablet,
        prefersReducedMotion,
        isWebGLSupported,
        dpr: isMobile ? [1, 1.25] : [1, 1.75],
        particleCount: isMobile ? 80 : isTablet ? 180 : 360,
      });
    };

    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionMedia.addEventListener("change", handleResize);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      motionMedia.removeEventListener("change", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return tier;
}
