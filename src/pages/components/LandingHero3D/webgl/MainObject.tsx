import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { PointerParallax } from "./hooks/usePointerParallax";

interface MainObjectProps {
  isDark: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
  pointerRef: React.MutableRefObject<PointerParallax>;
  scrollRef: React.MutableRefObject<any>;
}

export default function MainObject({
  isDark,
  isMobile,
  reducedMotion,
  pointerRef,
  scrollRef,
}: MainObjectProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const outerScaffoldRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Group>(null);
  const innerOcta1Ref = useRef<THREE.Mesh>(null);
  const innerOcta2Ref = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Material references for coordinated entrance fade-in
  const scaffoldMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const wireMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const coreMat1Ref = useRef<THREE.MeshStandardMaterial>(null);
  const coreMat2Ref = useRef<THREE.MeshStandardMaterial>(null);

  // Satellite node references
  const node1Ref = useRef<THREE.Mesh>(null);
  const node2Ref = useRef<THREE.Mesh>(null);
  const node3Ref = useRef<THREE.Mesh>(null);
  const node4Ref = useRef<THREE.Mesh>(null);

  // Entrance animation progress (0 to 1)
  const entranceRef = useRef(0);

  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;

    // 1. Entrance animation coordinator (0 -> 1 within first 1.2 seconds)
    if (entranceRef.current < 1) {
      entranceRef.current = Math.min(entranceRef.current + delta * 1.2, 1);
      const ease = 1 - Math.pow(1 - entranceRef.current, 3); // cubic out

      const baseScale = (isMobile ? 0.8 : 1.05) * (0.7 + 0.3 * ease);
      rootGroupRef.current.scale.set(baseScale, baseScale, baseScale);

      // Fade-in materials
      if (scaffoldMatRef.current) scaffoldMatRef.current.opacity = ease * (isDark ? 0.75 : 0.85);
      if (wireMatRef.current) wireMatRef.current.opacity = ease * (isDark ? 0.8 : 0.7);
      if (coreMat1Ref.current) coreMat1Ref.current.opacity = ease * 0.9;
    }

    const scrollObj = scrollRef.current as any;
    const scroll = typeof scrollObj?.currentHero === "number" ? scrollObj.currentHero : (scrollObj?.current ?? 0);
    const pointer = pointerRef.current;
    const time = state.clock.elapsedTime;

    // 2. Base Responsive Positioning
    // On desktop, position the object to the right of the text (x: ~1.7)
    // On mobile, position slightly above center (x: 0, y: 0.3)
    const targetBaseX = isMobile ? 0 : 1.7;
    const targetBaseY = isMobile ? 0.4 : 0;
    // Recedes deep into spatial background as user leaves hero
    const targetBaseZ = -scroll * 7.5;

    rootGroupRef.current.position.x = targetBaseX;
    rootGroupRef.current.position.y = targetBaseY - scroll * 1.2;
    rootGroupRef.current.position.z = targetBaseZ;

    // Fade out smoothly as user scrolls past the hero into subsequent content
    const depthDissolve = Math.max(0, 1 - Math.max(0, scroll - 0.3) * 1.4);
    if (scaffoldMatRef.current && entranceRef.current >= 1) {
      scaffoldMatRef.current.opacity = (isDark ? 0.75 : 0.85) * depthDissolve;
    }
    if (wireMatRef.current && entranceRef.current >= 1) {
      wireMatRef.current.opacity = (isDark ? 0.8 : 0.7) * depthDissolve;
    }

    // 3. Pointer Parallax Rotation (damped small angles: max X: ±5°, Y: ±8°)
    if (!reducedMotion) {
      const maxRotX = 0.08; // ~4.5 degrees
      const maxRotY = 0.14; // ~8.0 degrees

      const targetRotX = pointer.currentY * maxRotX;
      const targetRotY = pointer.currentX * maxRotY;

      // Soft damping towards target
      rootGroupRef.current.rotation.x +=
        (targetRotX - rootGroupRef.current.rotation.x) * Math.min(delta * 4, 1);
      rootGroupRef.current.rotation.y +=
        (targetRotY - rootGroupRef.current.rotation.y) * Math.min(delta * 4, 1);
    }

    // 4. Subtle Ambient Rotations
    if (!reducedMotion) {
      // Outer scaffold rotates slowly
      if (outerScaffoldRef.current) {
        outerScaffoldRef.current.rotation.y += delta * 0.15;
        outerScaffoldRef.current.rotation.x += delta * 0.08;
      }

      // Inner logic core counter-rotates with rhythmic pulsing
      if (innerCoreRef.current) {
        innerCoreRef.current.rotation.y -= delta * 0.25;
        innerCoreRef.current.rotation.z += delta * 0.12;
      }

      if (innerOcta1Ref.current) {
        innerOcta1Ref.current.rotation.x += delta * 0.3;
        // Breathing scale pulse
        const pulse = 1 + Math.sin(time * 2.5) * 0.05;
        innerOcta1Ref.current.scale.set(pulse, pulse, pulse);
      }

      if (innerOcta2Ref.current) {
        innerOcta2Ref.current.rotation.y -= delta * 0.4;
      }

      // Orbital rings rotation
      if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.2;
      if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 0.15;

      // Orbital nodes orbiting in harmonic paths
      const orbitRadius = 2.4;
      const orbitSpeed = time * 0.6;

      if (node1Ref.current) {
        node1Ref.current.position.x = Math.cos(orbitSpeed) * orbitRadius;
        node1Ref.current.position.y = Math.sin(orbitSpeed) * (orbitRadius * 0.45);
        node1Ref.current.position.z = Math.sin(orbitSpeed) * (orbitRadius * 0.7);
      }

      if (node2Ref.current) {
        node2Ref.current.position.x = Math.cos(orbitSpeed + Math.PI * 0.5) * orbitRadius;
        node2Ref.current.position.y = Math.sin(orbitSpeed + Math.PI * 0.5) * (orbitRadius * 0.45);
        node2Ref.current.position.z = Math.sin(orbitSpeed + Math.PI * 0.5) * (orbitRadius * 0.7);
      }

      if (node3Ref.current) {
        node3Ref.current.position.x = Math.cos(orbitSpeed + Math.PI) * orbitRadius;
        node3Ref.current.position.y = Math.sin(orbitSpeed + Math.PI) * (orbitRadius * 0.45);
        node3Ref.current.position.z = Math.sin(orbitSpeed + Math.PI) * (orbitRadius * 0.7);
      }

      if (node4Ref.current) {
        node4Ref.current.position.x = Math.cos(orbitSpeed + Math.PI * 1.5) * orbitRadius;
        node4Ref.current.position.y = Math.sin(orbitSpeed + Math.PI * 1.5) * (orbitRadius * 0.45);
        node4Ref.current.position.z = Math.sin(orbitSpeed + Math.PI * 1.5) * (orbitRadius * 0.7);
      }
    }

    // 5. Scroll progression scaling and rotation
    const scrollRot = scroll * Math.PI * 0.6;
    if (outerScaffoldRef.current) {
      outerScaffoldRef.current.rotation.y += scrollRot * delta;
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* ── 1. Outer Client / Frontend Structural Scaffold ── */}
      <mesh ref={outerScaffoldRef}>
        <icosahedronGeometry args={[1.75, 0]} />
        <meshPhysicalMaterial
          ref={scaffoldMatRef}
          color={isDark ? "#312e81" : "#e0e7ff"}
          emissive={isDark ? "#4338ca" : "#6366f1"}
          emissiveIntensity={isDark ? 0.35 : 0.15}
          roughness={0.2}
          metalness={0.15}
          transmission={0.65}
          thickness={1.5}
          transparent
          opacity={0}
          wireframe={false}
          side={THREE.DoubleSide}
        />
        {/* Crisp faceted wireframe edge overlay */}
        <lineSegments>
          <wireframeGeometry args={[new THREE.IcosahedronGeometry(1.752, 0)]} />
          <lineBasicMaterial
            ref={wireMatRef}
            color={isDark ? "#818cf8" : "#4338ca"}
            transparent
            opacity={0}
            linewidth={1}
          />
        </lineSegments>
      </mesh>

      {/* ── 2. Inner Dynamic Backend / Microservice Logic Core ── */}
      <group ref={innerCoreRef}>
        {/* Primary crystalline octahedron */}
        <mesh ref={innerOcta1Ref}>
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            ref={coreMat1Ref}
            color={isDark ? "#4f46e5" : "#6366f1"}
            emissive={isDark ? "#6366f1" : "#4338ca"}
            emissiveIntensity={isDark ? 0.8 : 0.4}
            roughness={0.3}
            metalness={0.8}
            transparent
            opacity={0}
          />
        </mesh>

        {/* Nested inverted octahedron for structural depth */}
        <mesh ref={innerOcta2Ref} rotation={[Math.PI / 4, 0, Math.PI / 4]}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            ref={coreMat2Ref}
            color={isDark ? "#38bdf8" : "#0284c7"}
            emissive={isDark ? "#06b6d4" : "#0ea5e9"}
            emissiveIntensity={isDark ? 1.0 : 0.5}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* ── 3. Orbital Rings (API Coordination & Transport) ── */}
      <group ref={orbitGroupRef} rotation={[0.4, 0.2, -0.3]}>
        {/* Outer orbital trace ring */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.4, 0.015, 16, 100]} />
          <meshBasicMaterial
            color={isDark ? "#6366f1" : "#818cf8"}
            transparent
            opacity={isDark ? 0.5 : 0.4}
          />
        </mesh>

        {/* Counter-tilted secondary coordinate ring */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.1, 0.012, 16, 100]} />
          <meshBasicMaterial
            color={isDark ? "#38bdf8" : "#60a5fa"}
            transparent
            opacity={isDark ? 0.35 : 0.25}
          />
        </mesh>

        {/* ── 4. Orbital Technology Nodes (React, TypeScript, Spring, Cloud) ── */}
        {/* Node 1: React (Cyan Luminescence) */}
        <mesh ref={node1Ref}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={isDark ? 1.8 : 1.0}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Node 2: TypeScript (Sapphire Blue) */}
        <mesh ref={node2Ref}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#2563eb"
            emissiveIntensity={isDark ? 1.6 : 0.9}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Node 3: Spring Boot (Emerald Core) */}
        <mesh ref={node3Ref}>
          <octahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#059669"
            emissiveIntensity={isDark ? 1.8 : 1.1}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Node 4: Cloud Architecture (Purple/Indigo) */}
        <mesh ref={node4Ref}>
          <dodecahedronGeometry args={[0.13, 0]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#9333ea"
            emissiveIntensity={isDark ? 1.6 : 1.0}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      </group>
    </group>
  );
}
