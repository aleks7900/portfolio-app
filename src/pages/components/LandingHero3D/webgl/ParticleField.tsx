import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { PointerParallax } from "./hooks/usePointerParallax";

interface ParticleFieldProps {
  count: number;
  isDark: boolean;
  reducedMotion: boolean;
  pointerRef: React.MutableRefObject<PointerParallax>;
  scrollRef: React.MutableRefObject<{ progress: number; current: number }>;
}

export default function ParticleField({
  count,
  isDark,
  reducedMotion,
  pointerRef,
  scrollRef,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  // Generate particle coordinate buffer
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Cylindrical/spherical spatial distribution around center with depth
      const radius = 2.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 9;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius + (Math.random() - 0.5) * 4;
    }

    return pos;
  }, [count]);

  // Subtle drift and scroll dissipation
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const scroll = scrollRef.current.current;
    const pointer = pointerRef.current;

    if (!reducedMotion) {
      // Gentle ambient drift
      pointsRef.current.rotation.y += delta * 0.035;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.04;

      // Pointer parallax offset
      const targetPosX = pointer.currentX * 0.4;
      const targetPosY = -pointer.currentY * 0.3;

      pointsRef.current.position.x +=
        (targetPosX - pointsRef.current.position.x) * Math.min(delta * 2, 1);
      pointsRef.current.position.y +=
        (targetPosY - pointsRef.current.position.y) * Math.min(delta * 2, 1);
    }

    // Scroll reaction: particles disperse outward and recede
    const spread = 1 + scroll * 0.8;
    pointsRef.current.scale.set(spread, spread, spread);

    if (materialRef.current) {
      // Smooth fade out as user scrolls into the next section
      const targetOpacity = Math.max(0, (isDark ? 0.75 : 0.6) * (1 - scroll * 1.2));
      materialRef.current.opacity = targetOpacity;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={isDark ? 0.07 : 0.08}
        color={isDark ? "#818cf8" : "#4f46e5"}
        transparent
        opacity={isDark ? 0.75 : 0.6}
        sizeAttenuation
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}
