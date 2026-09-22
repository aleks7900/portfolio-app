import React, { Component, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import HeroScene from "./HeroScene";
import { usePointerParallax } from "./hooks/usePointerParallax";
import type { PerformanceTier } from "./hooks/usePerformanceTier";

import type { ScrollDepthState } from "./hooks/useScrollProgress";

// Error Boundary for WebGL Canvas
interface ErrorBoundaryProps {
  fallback: ReactNode;
  onError?: () => void;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("WebGL rendering failed, falling back to CSS visual:", error);
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface HeroCanvasProps {
  tier: PerformanceTier;
  isDark: boolean;
  scrollRef: React.MutableRefObject<ScrollDepthState | { progress: number; current: number }>;
  updateScroll: (delta: number, speed?: number) => number;
  onWebGLError?: () => void;
  fallbackUI?: ReactNode;
  isFixed?: boolean;
}

export default function HeroCanvas({
  tier,
  isDark,
  scrollRef,
  updateScroll,
  onWebGLError,
  fallbackUI,
  isFixed = false,
}: HeroCanvasProps) {
  const { coordsRef: pointerRef, update: updatePointer } = usePointerParallax();

  return (
    <WebGLErrorBoundary fallback={fallbackUI || null} onError={onWebGLError}>
      <div
        className={`${
          isFixed ? "fixed inset-0 z-0" : "absolute inset-0 z-10"
        } w-full h-full pointer-events-none select-none overflow-hidden`}
      >
        <Canvas
          dpr={tier.dpr}
          camera={{ position: [0, 0, tier.isMobile ? 8.5 : 7.2], fov: 45, near: 0.1, far: 100 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0); // Pure transparent clear color
          }}
        >
          <HeroScene
            isDark={isDark}
            isMobile={tier.isMobile}
            reducedMotion={tier.prefersReducedMotion}
            particleCount={tier.particleCount}
            pointerRef={pointerRef}
            scrollRef={scrollRef}
            updatePointer={updatePointer}
            updateScroll={updateScroll}
          />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
