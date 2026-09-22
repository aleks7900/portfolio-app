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
  const groupRef = useRef<THREE.Group>(null);
  const nearGeoRef = useRef<THREE.BufferGeometry>(null);
  const midGeoRef = useRef<THREE.BufferGeometry>(null);
  const farGeoRef = useRef<THREE.BufferGeometry>(null);

  const nearCount = Math.max(15, Math.floor(count * 0.15));
  const midCount = Math.max(40, Math.floor(count * 0.35));
  const farCount = Math.max(70, Math.floor(count * 0.5));

  // Stratum 1: Near particles (larger, sparse, fast depth stream)
  const nearPositions = useMemo(() => {
    const pos = new Float32Array(nearCount * 3);
    const rng = createDeterministicRandom(101);
    for (let i = 0; i < nearCount; i++) {
      const radius = 2.0 + rng() * 6.5;
      const theta = rng() * Math.PI * 2;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = (rng() - 0.5) * 8.0;
      pos[i * 3 + 2] = -14 + rng() * 22; // -14 to +8
    }
    return pos;
  }, [nearCount]);

  // Stratum 2: Mid particles (medium size, moderate speed)
  const midPositions = useMemo(() => {
    const pos = new Float32Array(midCount * 3);
    const rng = createDeterministicRandom(202);
    for (let i = 0; i < midCount; i++) {
      const radius = 3.0 + rng() * 8.5;
      const theta = rng() * Math.PI * 2;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = (rng() - 0.5) * 10.0;
      pos[i * 3 + 2] = -24 + rng() * 32; // -24 to +8
    }
    return pos;
  }, [midCount]);

  // Stratum 3: Far particles (tiny points, dense background dust, slow drift)
  const farPositions = useMemo(() => {
    const pos = new Float32Array(farCount * 3);
    const rng = createDeterministicRandom(303);
    for (let i = 0; i < farCount; i++) {
      const radius = 4.0 + rng() * 11.0;
      const theta = rng() * Math.PI * 2;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = (rng() - 0.5) * 12.0;
      pos[i * 3 + 2] = -34 + rng() * 40; // -34 to +6
    }
    return pos;
  }, [farCount]);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    if (groupRef.current) {
      const pointer = pointerRef.current;
      const targetX = pointer.currentX * 0.3;
      const targetY = -pointer.currentY * 0.2;
      groupRef.current.position.x +=
        (targetX - groupRef.current.position.x) * Math.min(delta * 2.5, 1);
      groupRef.current.position.y +=
        (targetY - groupRef.current.position.y) * Math.min(delta * 2.5, 1);
    }

    const scrollObj = scrollRef.current;
    const velocity =
      "currentVelocity" in scrollObj ? scrollObj.currentVelocity : 0;
    const baseStreamSpeed = (0.22 + velocity * 2.0) * delta * 5.0;

    // 1. Update Near Tier (fast stream: 1.8x)
    if (nearGeoRef.current) {
      const posAttr = nearGeoRef.current.getAttribute("position") as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      const step = baseStreamSpeed * 1.8;
      for (let i = 0; i < nearCount; i++) {
        const idx = i * 3 + 2;
        arr[idx] += step;
        if (arr[idx] > 8.5) arr[idx] -= 22.5;
      }
      posAttr.needsUpdate = true;
    }

    // 2. Update Mid Tier (moderate stream: 1.0x)
    if (midGeoRef.current) {
      const posAttr = midGeoRef.current.getAttribute("position") as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      const step = baseStreamSpeed * 1.0;
      for (let i = 0; i < midCount; i++) {
        const idx = i * 3 + 2;
        arr[idx] += step;
        if (arr[idx] > 8.5) arr[idx] -= 32.5;
      }
      posAttr.needsUpdate = true;
    }

    // 3. Update Far Tier (slow subtle drift: 0.45x)
    if (farGeoRef.current) {
      const posAttr = farGeoRef.current.getAttribute("position") as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      const step = baseStreamSpeed * 0.45;
      for (let i = 0; i < farCount; i++) {
        const idx = i * 3 + 2;
        arr[idx] += step;
        if (arr[idx] > 6.5) arr[idx] -= 40.5;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Stratum 1: Near Tier */}
      <points>
        <bufferGeometry ref={nearGeoRef}>
          <bufferAttribute attach="attributes-position" args={[nearPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isDark ? 0.095 : 0.105}
          color={isDark ? "#38bdf8" : "#0284c7"}
          transparent
          opacity={isDark ? 0.75 : 0.55}
          sizeAttenuation
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          depthWrite={false}
        />
      </points>

      {/* Stratum 2: Mid Tier */}
      <points>
        <bufferGeometry ref={midGeoRef}>
          <bufferAttribute attach="attributes-position" args={[midPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isDark ? 0.065 : 0.075}
          color={isDark ? "#818cf8" : "#4f46e5"}
          transparent
          opacity={isDark ? 0.6 : 0.4}
          sizeAttenuation
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          depthWrite={false}
        />
      </points>

      {/* Stratum 3: Far Tier */}
      <points>
        <bufferGeometry ref={farGeoRef}>
          <bufferAttribute attach="attributes-position" args={[farPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isDark ? 0.038 : 0.045}
          color={isDark ? "#a78bfa" : "#6366f1"}
          transparent
          opacity={isDark ? 0.45 : 0.3}
          sizeAttenuation
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
