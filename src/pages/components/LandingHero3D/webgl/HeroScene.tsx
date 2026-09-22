import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import EnvironmentLighting from "./EnvironmentLighting";
import MainObject from "./MainObject";
import ParticleField from "./ParticleField";
import ArchitecturalPlanes from "./ArchitecturalPlanes";
import TechConstellation from "./TechConstellation";
import type { PointerParallax } from "./hooks/usePointerParallax";
import type { ScrollDepthState } from "./hooks/useScrollProgress";

interface HeroSceneProps {
  isDark: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
  particleCount: number;
  pointerRef: React.MutableRefObject<PointerParallax>;
  scrollRef: React.MutableRefObject<ScrollDepthState | { progress: number; current: number }>;
  updatePointer: (delta: number, speed?: number) => PointerParallax;
  updateScroll: (delta: number, speed?: number) => number;
}

export default function HeroScene({
  isDark,
  isMobile,
  reducedMotion,
  particleCount,
  pointerRef,
  scrollRef,
  updatePointer,
  updateScroll,
}: HeroSceneProps) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    // 1. Update damped inputs directly inside animation frame (0 React re-renders)
    updatePointer(delta, 3.5);
    updateScroll(delta, 4.0);

    const pointer = pointerRef.current;
    const scrollObj = scrollRef.current;
    const heroScroll =
      "currentHero" in scrollObj
        ? scrollObj.currentHero
        : "current" in scrollObj
        ? scrollObj.current
        : 0;
    const globalScroll = "currentGlobal" in scrollObj ? scrollObj.currentGlobal : 0;

    // 2. Subtle camera dolly / tracking with parallax
    if (!reducedMotion) {
      const targetCamX = pointer.currentX * 0.35;
      const targetCamY = -pointer.currentY * 0.25;

      camera.position.x +=
        (targetCamX - camera.position.x) * Math.min(delta * 2.5, 1);
      camera.position.y +=
        (targetCamY - camera.position.y) * Math.min(delta * 2.5, 1);
    }

    // 3. Forward Camera Progression: camera slowly advances through space with global scroll
    const baseCamZ = isMobile ? 8.5 : 7.2;
    const targetCamZ = baseCamZ - (reducedMotion ? 0 : globalScroll * 2.4);
    camera.position.z += (targetCamZ - camera.position.z) * Math.min(delta * 2.5, 1);

    // Look-at centers as user scrolls past the hero into subsequent content
    const lookAtX = isMobile ? 0 : 0.8 * Math.max(0, 1 - heroScroll * 1.5);
    camera.lookAt(new THREE.Vector3(lookAtX, 0, 0));
  });

  return (
    <>
      {/* Volumetric Depth Fog for continuous spatial immersion */}
      <fogExp2 attach="fog" args={[isDark ? "#090d16" : "#f8fafc", 0.022]} />

      <EnvironmentLighting isDark={isDark} pointerRef={pointerRef} />

      {/* Floating Translucent Architectural Glass Planes */}
      <ArchitecturalPlanes
        isDark={isDark}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
        pointerRef={pointerRef}
        scrollRef={scrollRef}
      />

      {/* Technical Node Constellation that approaches and transitions into the Tech Grid */}
      <TechConstellation
        isDark={isDark}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
        scrollRef={scrollRef}
      />

      {/* 3-Tier Multi-Stratum Particle Depth */}
      <ParticleField
        count={particleCount}
        isDark={isDark}
        reducedMotion={reducedMotion}
        pointerRef={pointerRef}
        scrollRef={scrollRef}
      />

      {/* Hero Spatial Core Geometry */}
      <MainObject
        isDark={isDark}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
        pointerRef={pointerRef}
        scrollRef={scrollRef}
      />
    </>
  );
}
