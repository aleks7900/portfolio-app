import React, { Suspense, useState, useCallback } from "react";
import HeroDOMOverlay from "./HeroDOMOverlay";
import ScrollIndicator from "./ScrollIndicator";
import WebGLFallback from "./WebGLFallback";
import { usePerformanceTier } from "./webgl/hooks/usePerformanceTier";
import { useScrollProgress } from "./webgl/hooks/useScrollProgress";
import { useTheme } from "../../../shared/theme/theme.tsx";

// Lazy-load WebGL Canvas to keep initial bundle light and HTML paint immediate
const HeroCanvas = React.lazy(() => import("./webgl/HeroCanvas"));

export default function LandingHero3D() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const tier = usePerformanceTier();
  const { scrollRef, hasScrolled, update: updateScroll } = useScrollProgress();
  const [webGLFailed, setWebGLFailed] = useState(false);

  const handleWebGLError = useCallback(() => {
    setWebGLFailed(true);
  }, []);

  const handleScrollClick = useCallback(() => {
    const nextSection = document.getElementById("landing-showcase");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight * 0.85,
        behavior: "smooth",
      });
    }
  }, []);

  const showWebGL = tier.isWebGLSupported && !webGLFailed;

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden w-full">
      {/* ── Layer 0: Ambient Background Lighting & Atmosphere ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Soft primary glow */}
        <div
          className={`absolute -top-32 -left-32 h-[34rem] w-[34rem] rounded-full blur-3xl transition-opacity duration-700 ${
            isDark ? "bg-primary/20 opacity-40" : "bg-primary/15 opacity-50"
          }`}
        />
        {/* Secondary accent glow behind 3D object */}
        <div
          className={`absolute top-1/4 -right-28 h-[38rem] w-[38rem] rounded-full blur-3xl transition-opacity duration-700 ${
            isDark ? "bg-indigo-500/15 opacity-40" : "bg-indigo-400/10 opacity-60"
          }`}
        />
        <div
          className={`absolute -bottom-24 left-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl transition-opacity duration-700 ${
            isDark ? "bg-cyan-500/10 opacity-30" : "bg-sky-400/10 opacity-40"
          }`}
        />
      </div>

      {/* ── Layer 0: Persistent Page-Wide WebGL 3D Atmosphere ── */}
      {showWebGL ? (
        <Suspense fallback={<WebGLFallback isDark={isDark} />}>
          <HeroCanvas
            tier={tier}
            isDark={isDark}
            scrollRef={scrollRef}
            updateScroll={updateScroll}
            onWebGLError={handleWebGLError}
            fallbackUI={<WebGLFallback isDark={isDark} />}
            isFixed={true}
          />
        </Suspense>
      ) : (
        <WebGLFallback isDark={isDark} />
      )}

      {/* ── Layer 30: Semantic HTML DOM Content (Headings, Buttons, CTAs) ── */}
      <HeroDOMOverlay />

      {/* ── Layer 25: Subtle Animated Scroll Indicator ── */}
      <ScrollIndicator
        hasScrolled={hasScrolled}
        onScrollClick={handleScrollClick}
      />

      {/* ── Soft Gradient Veil for Smooth Transition ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/30 to-transparent z-20"
      />
    </section>
  );
}
