import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { PointerParallax } from "./hooks/usePointerParallax";

interface EnvironmentLightingProps {
  isDark: boolean;
  pointerRef: React.MutableRefObject<PointerParallax>;
}

export default function EnvironmentLighting({
  isDark,
  pointerRef,
}: EnvironmentLightingProps) {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const accentLightRef = useRef<THREE.PointLight>(null);

  // Smoothly move lights based on pointer for lively specular glints
  useFrame((_, delta) => {
    if (keyLightRef.current) {
      const targetX = 4 + pointerRef.current.currentX * 1.5;
      const targetY = 5 + pointerRef.current.currentY * 1.0;
      keyLightRef.current.position.x +=
        (targetX - keyLightRef.current.position.x) * Math.min(delta * 2, 1);
      keyLightRef.current.position.y +=
        (targetY - keyLightRef.current.position.y) * Math.min(delta * 2, 1);
    }
  });

  return (
    <>
      {/* Soft ambient hemisphere light */}
      <hemisphereLight
        args={[
          isDark ? "#1e1b4b" : "#e0e7ff",
          isDark ? "#020617" : "#f1f5f9",
          isDark ? 1.4 : 1.8,
        ]}
      />

      {/* Primary directional key light */}
      <directionalLight
        ref={keyLightRef}
        position={[4, 5, 4]}
        intensity={isDark ? 2.5 : 2.8}
        color={isDark ? "#818cf8" : "#4338ca"}
      />

      {/* Subtle secondary fill light */}
      <directionalLight
        position={[-4, -2, -2]}
        intensity={isDark ? 1.0 : 0.8}
        color={isDark ? "#38bdf8" : "#6366f1"}
      />

      {/* Glowing accent rim light */}
      <pointLight
        ref={accentLightRef}
        position={[-3, -1, 3]}
        intensity={isDark ? 2.2 : 1.6}
        distance={12}
        color={isDark ? "#06b6d4" : "#4f46e5"}
      />

      {/* Rear rim light to highlight geometric silhouette */}
      <pointLight
        position={[0, -3, -4]}
        intensity={isDark ? 3.0 : 1.8}
        distance={14}
        color={isDark ? "#a855f7" : "#818cf8"}
      />
    </>
  );
}
