import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OrbitSystemProps {
  isDark: boolean;
  reducedMotion: boolean;
}

export default function OrbitSystem({ isDark, reducedMotion }: OrbitSystemProps) {
  const orbitGroupRef = useRef<THREE.Group>(null);
  const orbitRing1Ref = useRef<THREE.Mesh>(null);
  const orbitRing2Ref = useRef<THREE.Mesh>(null);
  const orbitRing3Ref = useRef<THREE.Mesh>(null);

  const sat1Ref = useRef<THREE.Mesh>(null);
  const sat2Ref = useRef<THREE.Mesh>(null);
  const sat3Ref = useRef<THREE.Mesh>(null);
  const sat4Ref = useRef<THREE.Mesh>(null);
  const sat5Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const time = state.clock.elapsedTime;

    // Harmonic multi-axis orbit precession
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += delta * 0.045;
    }
    if (orbitRing1Ref.current) orbitRing1Ref.current.rotation.z += delta * 0.11;
    if (orbitRing2Ref.current) orbitRing2Ref.current.rotation.z -= delta * 0.09;
    if (orbitRing3Ref.current) orbitRing3Ref.current.rotation.x += delta * 0.075;

    // Orbit 1 Satellites (Equatorial inclination, r = 2.35)
    const r1 = 2.35;
    const s1 = time * 0.42;
    if (sat1Ref.current) {
      sat1Ref.current.position.set(
        Math.cos(s1) * r1,
        Math.sin(s1) * (r1 * 0.38),
        Math.sin(s1) * (r1 * 0.75)
      );
    }
    if (sat2Ref.current) {
      sat2Ref.current.position.set(
        Math.cos(s1 + Math.PI) * r1,
        Math.sin(s1 + Math.PI) * (r1 * 0.38),
        Math.sin(s1 + Math.PI) * (r1 * 0.75)
      );
    }

    // Orbit 2 Satellite (Transverse diagonal, r = 2.08)
    const r2 = 2.08;
    const s2 = -time * 0.48;
    if (sat3Ref.current) {
      sat3Ref.current.position.set(
        Math.cos(s2) * (r2 * 0.82),
        Math.sin(s2) * r2,
        Math.cos(s2) * (r2 * 0.62)
      );
    }

    // Orbit 3 Satellites (Polar ellipse, r = 2.65)
    const r3 = 2.65;
    const s3 = time * 0.35;
    if (sat4Ref.current) {
      sat4Ref.current.position.set(
        Math.sin(s3) * (r3 * 0.44),
        Math.cos(s3) * r3,
        Math.sin(s3) * (r3 * 0.82)
      );
    }
    if (sat5Ref.current) {
      sat5Ref.current.position.set(
        Math.sin(s3 + Math.PI) * (r3 * 0.44),
        Math.cos(s3 + Math.PI) * r3,
        Math.sin(s3 + Math.PI) * (r3 * 0.82)
      );
    }
  });

  return (
    <group ref={orbitGroupRef} renderOrder={1}>
      {/* Orbital Ring 1: Equatorial tilt (r = 2.35) */}
      <mesh ref={orbitRing1Ref} rotation={[0.55, 0.2, -0.4]}>
        <torusGeometry args={[2.35, 0.011, 16, 128]} />
        <meshBasicMaterial
          color={isDark ? "#38bdf8" : "#0284c7"}
          transparent
          opacity={isDark ? 0.45 : 0.35}
          depthWrite={true}
          depthTest={true}
        />
      </mesh>

      {/* Orbital Ring 2: Transverse diagonal tilt (r = 2.08) */}
      <mesh ref={orbitRing2Ref} rotation={[-0.65, 0.5, 0.3]}>
        <torusGeometry args={[2.08, 0.009, 16, 128]} />
        <meshBasicMaterial
          color={isDark ? "#818cf8" : "#6366f1"}
          transparent
          opacity={isDark ? 0.40 : 0.30}
          depthWrite={true}
          depthTest={true}
        />
      </mesh>

      {/* Orbital Ring 3: Steep polar coordinate trace (r = 2.65) */}
      <mesh ref={orbitRing3Ref} rotation={[1.2, -0.3, 0.8]}>
        <torusGeometry args={[2.65, 0.008, 16, 128]} />
        <meshBasicMaterial
          color={isDark ? "#06b6d4" : "#0ea5e9"}
          transparent
          opacity={isDark ? 0.35 : 0.25}
          depthWrite={true}
          depthTest={true}
        />
      </mesh>

      {/* Orbiting Satellites with emissive highlights */}
      <mesh ref={sat1Ref}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color={isDark ? "#38bdf8" : "#0284c7"} />
      </mesh>

      <mesh ref={sat2Ref}>
        <sphereGeometry args={[0.048, 16, 16]} />
        <meshBasicMaterial color={isDark ? "#22d3ee" : "#06b6d4"} />
      </mesh>

      <mesh ref={sat3Ref}>
        <sphereGeometry args={[0.052, 16, 16]} />
        <meshBasicMaterial color={isDark ? "#a855f7" : "#8b5cf6"} />
      </mesh>

      <mesh ref={sat4Ref}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color={isDark ? "#60a5fa" : "#2563eb"} />
      </mesh>

      <mesh ref={sat5Ref}>
        <sphereGeometry args={[0.040, 16, 16]} />
        <meshBasicMaterial color={isDark ? "#34d399" : "#10b981"} />
      </mesh>
    </group>
  );
}
