import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { PointerParallax } from "./hooks/usePointerParallax";
import type { ScrollDepthState } from "./hooks/useScrollProgress";

interface ArchitecturalPlanesProps {
  isDark: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
  pointerRef: React.MutableRefObject<PointerParallax>;
  scrollRef: React.MutableRefObject<ScrollDepthState | { progress: number; current: number }>;
}

export default function ArchitecturalPlanes({
  isDark,
  isMobile,
  reducedMotion,
  pointerRef,
  scrollRef,
}: ArchitecturalPlanesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const plane1Ref = useRef<THREE.Mesh>(null);
  const plane2Ref = useRef<THREE.Mesh>(null);
  const plane3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion || isMobile) return;

    const scrollObj = scrollRef.current;
    const globalProgress =
      "currentGlobal" in scrollObj ? scrollObj.currentGlobal : 0;
    const pointer = pointerRef.current;
    const time = state.clock.elapsedTime;

    // Gentle architectural parallax (fractional movement, slower than foreground)
    const targetY = globalProgress * 4.5;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * Math.min(delta * 2, 1);

    // Subtle pointer parallax tilt
    const targetRotX = pointer.currentY * 0.03;
    const targetRotY = pointer.currentX * 0.04;
    groupRef.current.rotation.x +=
      (targetRotX - groupRef.current.rotation.x) * Math.min(delta * 2, 1);
    groupRef.current.rotation.y +=
      (targetRotY - groupRef.current.rotation.y) * Math.min(delta * 2, 1);

    // Micro breathing in individual planes to catch lighting
    if (plane1Ref.current) {
      plane1Ref.current.rotation.z = Math.sin(time * 0.2) * 0.03;
    }
    if (plane2Ref.current) {
      plane2Ref.current.rotation.x = -0.15 + Math.cos(time * 0.18) * 0.025;
    }
    if (plane3Ref.current) {
      plane3Ref.current.rotation.y = 0.2 + Math.sin(time * 0.25) * 0.03;
    }
  });

  // Skip rendering in mobile or reduced motion for top performance
  if (isMobile || reducedMotion) return null;

  const planeColor = isDark ? "#334155" : "#cbd5e1";
  const edgeColor = isDark ? "#475569" : "#94a3b8";

  return (
    <group ref={groupRef}>
      {/* Plane 1: Far Left Depth Plane */}
      <mesh
        ref={plane1Ref}
        position={[-6.5, 3.5, -16]}
        rotation={[0.12, 0.45, -0.08]}
      >
        <planeGeometry args={[8, 14]} />
        <meshPhysicalMaterial
          color={planeColor}
          transparent
          opacity={isDark ? 0.09 : 0.06}
          roughness={0.2}
          metalness={0.15}
          transmission={0.65}
          clearcoat={0.4}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Plane 2: Deep Right Structural Plane */}
      <mesh
        ref={plane2Ref}
        position={[7.5, -2.5, -11]}
        rotation={[-0.15, -0.4, 0.06]}
      >
        <planeGeometry args={[11, 16]} />
        <meshPhysicalMaterial
          color={planeColor}
          transparent
          opacity={isDark ? 0.08 : 0.05}
          roughness={0.25}
          metalness={0.1}
          transmission={0.7}
          clearcoat={0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Plane 3: Lower Center Floor/Slab Accent */}
      <mesh
        ref={plane3Ref}
        position={[-1.5, -7.0, -7]}
        rotation={[1.1, 0.18, -0.2]}
      >
        <planeGeometry args={[14, 9]} />
        <meshPhysicalMaterial
          color={edgeColor}
          transparent
          opacity={isDark ? 0.06 : 0.04}
          roughness={0.35}
          metalness={0.2}
          transmission={0.5}
          clearcoat={0.2}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
