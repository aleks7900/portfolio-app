import ParticleSphere from "./ParticleSphere/ParticleSphere";
import type { PointerParallax } from "./hooks/usePointerParallax";
import type { ScrollDepthState } from "./hooks/useScrollProgress";

interface MainObjectProps {
  isDark: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
  pointerRef: React.MutableRefObject<PointerParallax>;
  scrollRef: React.MutableRefObject<ScrollDepthState | { progress: number; current: number }>;
}

/**
 * Main Hero Spatial Core
 * Delegated to the animated micro-particle sphere system.
 * Replaces the previous solid mesh sphere with pure GPU-animated micro-particles.
 */
export default function MainObject(props: MainObjectProps) {
  return <ParticleSphere {...props} />;
}
