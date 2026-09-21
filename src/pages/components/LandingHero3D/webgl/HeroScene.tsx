import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import EnvironmentLighting from "./EnvironmentLighting";
import MainObject from "./MainObject";
import ParticleField from "./ParticleField";
import type { PointerParallax } from "./hooks/usePointerParallax";

interface HeroSceneProps {
  isDark: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
  particleCount: number;
  pointerRef: React.MutableRefObject<PointerParallax>;
  scrollRef: React.MutableRefObject<{ progress: number; current: number }>;
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
    const scroll = scrollRef.current.current;

    // 2. Subtle camera dolly / tracking with parallax
    if (!reducedMotion) {
      const targetCamX = pointer.currentX * 0.35;
      const targetCamY = -pointer.currentY * 0.25;

      camera.position.x +=
        (targetCamX - camera.position.x) * Math.min(delta * 2.5, 1);
      camera.position.y +=
        (targetCamY - camera.position.y) * Math.min(delta * 2.5, 1);
    }

    // Scroll slightly pulls camera back to give a cinematic wide transition
    const baseCamZ = isMobile ? 8.5 : 7.2;
    const targetCamZ = baseCamZ + scroll * 1.5;
    camera.position.z += (targetCamZ - camera.position.z) * Math.min(delta * 3, 1);

    camera.lookAt(new THREE.Vector3(isMobile ? 0 : 0.8, 0, 0));
  });

  return (
    <>
      <EnvironmentLighting isDark={isDark} pointerRef={pointerRef} />

      <ParticleField
        count={particleCount}
        isDark={isDark}
        reducedMotion={reducedMotion}
        pointerRef={pointerRef}
        scrollRef={scrollRef}
      />

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
