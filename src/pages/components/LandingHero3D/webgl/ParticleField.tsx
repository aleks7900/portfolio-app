import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { PointerParallax } from "./hooks/usePointerParallax";
import type { ScrollDepthState } from "./hooks/useScrollProgress";

interface ParticleFieldProps {
  count: number;
  isDark: boolean;
  reducedMotion: boolean;
  pointerRef: React.MutableRefObject<PointerParallax>;
  scrollRef: React.MutableRefObject<ScrollDepthState | { progress: number; current: number }>;
}

/**
 * Deterministic pseudo-random number generator (LCG)
 * Prevents hydration mismatches and random re-render jumping.
 */
function createDeterministicRandom(seed: number = 42) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
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
  const geoRef = useRef<THREE.BufferGeometry>(null);

  // Deterministically generate continuous spatial particle coordinates
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const nextRandom = createDeterministicRandom(1337);

    for (let i = 0; i < count; i++) {
      // Cylindrical distribution around camera travel path
      const radius = 2.2 + nextRandom() * 9.5;
      const theta = nextRandom() * Math.PI * 2;
      const y = (nextRandom() - 0.5) * 11;
      const z = -32 + nextRandom() * 42; // Deep range: -32 to +10

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }

    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current || !geoRef.current) return;

    const pointer = pointerRef.current;
    const scrollObj = scrollRef.current;
    const velocity =
      "currentVelocity" in scrollObj ? scrollObj.currentVelocity : 0;
    const globalProgress =
      "currentGlobal" in scrollObj ? scrollObj.currentGlobal : 0;

    // 1. Subtle camera parallax drift
    if (!reducedMotion) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.12) * 0.03;

      const targetPosX = pointer.currentX * 0.35;
      const targetPosY = -pointer.currentY * 0.25;

      pointsRef.current.position.x +=
        (targetPosX - pointsRef.current.position.x) * Math.min(delta * 2.5, 1);
      pointsRef.current.position.y +=
        (targetPosY - pointsRef.current.position.y) * Math.min(delta * 2.5, 1);
    }

    // 2. Spatial Stream: forward particle travel along Z driven by scroll
    const posAttr = geoRef.current.getAttribute("position") as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    if (!reducedMotion) {
      // Speed up forward stream during scroll velocity
      const forwardDelta = (0.2 + velocity * 1.8) * delta * 5.0;

      for (let i = 0; i < count; i++) {
        const idx = i * 3 + 2;
        posArray[idx] += forwardDelta;

        // Wrap particles seamlessly when passing the camera plane (z > 9)
        if (posArray[idx] > 9) {
          posArray[idx] -= 42;
        }
      }
      posAttr.needsUpdate = true;
    }

    // 3. Subtle atmospheric opacity adaptation
    if (materialRef.current) {
      // Remains persistently visible across the entire landing page with subtle breathing
      const baseOpacity = isDark ? 0.65 : 0.45;
      const pulse = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      materialRef.current.opacity = Math.max(
        0.2,
        baseOpacity + pulse - globalProgress * 0.15
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={isDark ? 0.065 : 0.075}
        color={isDark ? "#38bdf8" : "#0284c7"}
        transparent
        opacity={isDark ? 0.65 : 0.45}
        sizeAttenuation
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}
