import { useMemo, useRef } from "react";
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

// Custom Fresnel Shader for high-end holographic edge glow
const fresnelVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fresnelFragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.6);
    
    vec3 col = mix(uColorA, uColorB, normal.y * 0.5 + 0.5);
    col = mix(col, uColorC, normal.x * 0.5 + 0.5);
    
    gl_FragColor = vec4(col, fresnel * uOpacity);
  }
`;

export default function MainObject({
  isDark,
  isMobile,
  reducedMotion,
  pointerRef,
  scrollRef,
}: MainObjectProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const outerSphereRef = useRef<THREE.Mesh>(null);
  const fresnelMeshRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Group>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const gyroRing1Ref = useRef<THREE.Mesh>(null);
  const gyroRing2Ref = useRef<THREE.Mesh>(null);

  // Orbital system references
  const orbitGroupRef = useRef<THREE.Group>(null);
  const orbitRing1Ref = useRef<THREE.Mesh>(null);
  const orbitRing2Ref = useRef<THREE.Mesh>(null);
  const orbitRing3Ref = useRef<THREE.Mesh>(null);

  const sat1Ref = useRef<THREE.Mesh>(null);
  const sat2Ref = useRef<THREE.Mesh>(null);
  const sat3Ref = useRef<THREE.Mesh>(null);
  const sat4Ref = useRef<THREE.Mesh>(null);
  const sat5Ref = useRef<THREE.Mesh>(null);

  // Material references
  const glassMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const innerCoreMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const fresnelMatRef = useRef<THREE.ShaderMaterial>(null);

  // Entrance animation progress (0 to 1)
  const entranceRef = useRef(0);

  // Inner floating energy quantum particles (35 deterministic points)
  const internalParticles = useMemo(() => {
    const count = 35;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = (i + 1) / (count + 1);
      const theta = u * Math.PI * 6.5;
      const r = 0.25 + (i % 7) * 0.08;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.sin(u * Math.PI * 4) * (r * 0.9);
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    return pos;
  }, []);

  // Uniforms for Fresnel edge glow
  const fresnelUniforms = useMemo(
    () => ({
      uColorA: { value: new THREE.Color(isDark ? "#06b6d4" : "#0284c7") },
      uColorB: { value: new THREE.Color(isDark ? "#3b82f6" : "#2563eb") },
      uColorC: { value: new THREE.Color(isDark ? "#8b5cf6" : "#6366f1") },
      uOpacity: { value: 0 },
    }),
    [isDark]
  );

  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;

    // 1. Coordinated Entrance Animation (0 -> 1 within first 1.3 seconds)
    if (entranceRef.current < 1) {
      entranceRef.current = Math.min(entranceRef.current + delta * 1.1, 1);
      const ease = 1 - Math.pow(1 - entranceRef.current, 3); // cubic out

      const baseScale = (isMobile ? 0.75 : 1.0) * (0.75 + 0.25 * ease);
      rootGroupRef.current.scale.set(baseScale, baseScale, baseScale);

      // Fade-in materials
      if (glassMatRef.current) glassMatRef.current.opacity = ease * (isDark ? 0.85 : 0.75);
      if (innerCoreMatRef.current) innerCoreMatRef.current.opacity = ease * 0.95;
      if (fresnelMatRef.current) fresnelMatRef.current.uniforms.uOpacity.value = ease * (isDark ? 0.85 : 0.65);
    }

    const scrollObj = scrollRef.current as any;
    const scroll =
      typeof scrollObj?.currentHero === "number"
        ? scrollObj.currentHero
        : (scrollObj?.current ?? 0);
    const pointer = pointerRef.current;
    const time = state.clock.elapsedTime;

    // 2. Base Responsive Composition with Hero Headline
    // On desktop: place sphere center at x: 2.15 to completely clear the headline
    // while allowing rings and atmosphere to extend behind the text.
    // On mobile: center and place slightly higher.
    const targetBaseX = isMobile ? 0 : 2.15;
    const targetBaseY = isMobile ? 0.6 : 0;
    const targetBaseZ = -scroll * 7.5; // Recedes smoothly into deep space on scroll

    rootGroupRef.current.position.x = targetBaseX;
    rootGroupRef.current.position.y = targetBaseY - scroll * 1.2;
    rootGroupRef.current.position.z = targetBaseZ;

    // Fade out smoothly as user scrolls past the hero into subsequent content
    const depthDissolve = Math.max(0, 1 - Math.max(0, scroll - 0.3) * 1.4);
    if (glassMatRef.current && entranceRef.current >= 1) {
      glassMatRef.current.opacity = (isDark ? 0.85 : 0.75) * depthDissolve;
    }
    if (fresnelMatRef.current && entranceRef.current >= 1) {
      fresnelMatRef.current.uniforms.uOpacity.value = (isDark ? 0.85 : 0.65) * depthDissolve;
    }

    // 3. Pointer Parallax Rotation (damped subtle angles: ±3° to 5°)
    if (!reducedMotion) {
      const maxRotX = 0.055;
      const maxRotY = 0.09;

      const targetRotX = pointer.currentY * maxRotX;
      const targetRotY = pointer.currentX * maxRotY;

      rootGroupRef.current.rotation.x +=
        (targetRotX - rootGroupRef.current.rotation.x) * Math.min(delta * 4, 1);
      rootGroupRef.current.rotation.y +=
        (targetRotY - rootGroupRef.current.rotation.y) * Math.min(delta * 4, 1);
    }

    // 4. Fluid Spherical & Inner Core Motion
    if (!reducedMotion) {
      // Outer shell rotates very slowly in direction A
      if (outerSphereRef.current) {
        outerSphereRef.current.rotation.y += delta * 0.08;
        outerSphereRef.current.rotation.x = Math.sin(time * 0.3) * 0.05;
      }
      if (fresnelMeshRef.current) {
        fresnelMeshRef.current.rotation.y += delta * 0.08;
      }

      // Inner glowing core counter-rotates in direction B with breathing pulse
      if (innerCoreRef.current) {
        innerCoreRef.current.rotation.y -= delta * 0.16;
        innerCoreRef.current.rotation.z += delta * 0.09;
      }

      if (innerSphereRef.current) {
        const pulse = 1 + Math.sin(time * 1.8) * 0.045;
        innerSphereRef.current.scale.set(pulse, pulse, pulse);
      }

      // Gyroscopic tech rings rotate independently
      if (gyroRing1Ref.current) {
        gyroRing1Ref.current.rotation.x += delta * 0.22;
        gyroRing1Ref.current.rotation.y += delta * 0.14;
      }
      if (gyroRing2Ref.current) {
        gyroRing2Ref.current.rotation.z -= delta * 0.25;
        gyroRing2Ref.current.rotation.x -= delta * 0.12;
      }

      // 5. Multi-Axis Orbital System Animation (Calm, Smooth Harmonic Travel)
      if (orbitGroupRef.current) {
        orbitGroupRef.current.rotation.y += delta * 0.04;
      }
      if (orbitRing1Ref.current) orbitRing1Ref.current.rotation.z += delta * 0.12;
      if (orbitRing2Ref.current) orbitRing2Ref.current.rotation.z -= delta * 0.1;
      if (orbitRing3Ref.current) orbitRing3Ref.current.rotation.x += delta * 0.08;

      // Orbit 1 Satellites (Equatorial inclination)
      const r1 = 2.45;
      const s1 = time * 0.45;
      if (sat1Ref.current) {
        sat1Ref.current.position.set(
          Math.cos(s1) * r1,
          Math.sin(s1) * (r1 * 0.4),
          Math.sin(s1) * (r1 * 0.75)
        );
      }
      if (sat2Ref.current) {
        sat2Ref.current.position.set(
          Math.cos(s1 + Math.PI) * r1,
          Math.sin(s1 + Math.PI) * (r1 * 0.4),
          Math.sin(s1 + Math.PI) * (r1 * 0.75)
        );
      }

      // Orbit 2 Satellite (Transverse diagonal)
      const r2 = 2.15;
      const s2 = -time * 0.52;
      if (sat3Ref.current) {
        sat3Ref.current.position.set(
          Math.cos(s2) * (r2 * 0.8),
          Math.sin(s2) * r2,
          Math.cos(s2) * (r2 * 0.6)
        );
      }

      // Orbit 3 Satellites (Polar ellipse)
      const r3 = 2.72;
      const s3 = time * 0.38;
      if (sat4Ref.current) {
        sat4Ref.current.position.set(
          Math.sin(s3) * (r3 * 0.45),
          Math.cos(s3) * r3,
          Math.sin(s3) * (r3 * 0.85)
        );
      }
      if (sat5Ref.current) {
        sat5Ref.current.position.set(
          Math.sin(s3 + Math.PI) * (r3 * 0.45),
          Math.cos(s3 + Math.PI) * r3,
          Math.sin(s3 + Math.PI) * (r3 * 0.85)
        );
      }
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* ── 1. Outer Glass Spherical Shell ── */}
      <mesh ref={outerSphereRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshPhysicalMaterial
          ref={glassMatRef}
          color={isDark ? "#1e1b4b" : "#ede9fe"}
          emissive={isDark ? "#312e81" : "#6366f1"}
          emissiveIntensity={isDark ? 0.25 : 0.1}
          roughness={0.08}
          metalness={0.12}
          transmission={0.92}
          thickness={2.2}
          ior={1.48}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          attenuationColor={isDark ? "#38bdf8" : "#818cf8"}
          attenuationDistance={2.0}
          transparent
          opacity={0}
        />
      </mesh>

      {/* ── 2. Authentic Fresnel Edge Glow Halo (Cyan → Blue → Violet) ── */}
      <mesh ref={fresnelMeshRef}>
        <sphereGeometry args={[1.515, 64, 64]} />
        <shaderMaterial
          ref={fresnelMatRef}
          vertexShader={fresnelVertexShader}
          fragmentShader={fresnelFragmentShader}
          uniforms={fresnelUniforms}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* ── 3. Inner Glowing Energy Core & Tech Arcs ── */}
      <group ref={innerCoreRef}>
        {/* Inner Glowing Core Sphere */}
        <mesh ref={innerSphereRef}>
          <sphereGeometry args={[0.72, 32, 32]} />
          <meshStandardMaterial
            ref={innerCoreMatRef}
            color={isDark ? "#38bdf8" : "#0284c7"}
            emissive={isDark ? "#06b6d4" : "#4f46e5"}
            emissiveIntensity={isDark ? 1.6 : 0.9}
            roughness={0.25}
            metalness={0.8}
            transparent
            opacity={0}
          />
        </mesh>

        {/* Gyroscopic Inner Tech Ring 1 (Cyan) */}
        <mesh ref={gyroRing1Ref} rotation={[0.45, 0.7, 0]}>
          <torusGeometry args={[0.96, 0.014, 16, 64]} />
          <meshBasicMaterial
            color={isDark ? "#06b6d4" : "#38bdf8"}
            transparent
            opacity={isDark ? 0.75 : 0.6}
          />
        </mesh>

        {/* Gyroscopic Inner Tech Ring 2 (Violet) */}
        <mesh ref={gyroRing2Ref} rotation={[-0.6, 0.2, 0.85]}>
          <torusGeometry args={[0.91, 0.012, 16, 64]} />
          <meshBasicMaterial
            color={isDark ? "#a855f7" : "#818cf8"}
            transparent
            opacity={isDark ? 0.65 : 0.5}
          />
        </mesh>

        {/* Internal Quantum Energy Nodes */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[internalParticles, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.055}
            color={isDark ? "#67e8f9" : "#38bdf8"}
            transparent
            opacity={isDark ? 0.8 : 0.65}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>

      {/* ── 4. Multi-Axis 3D Orbital Paths & Refined Satellites ── */}
      <group ref={orbitGroupRef}>
        {/* Orbital Ring 1: Equatorial tilt (r = 2.45) */}
        <mesh ref={orbitRing1Ref} rotation={[0.55, 0.2, -0.4]}>
          <torusGeometry args={[2.45, 0.012, 16, 128]} />
          <meshBasicMaterial
            color={isDark ? "#38bdf8" : "#60a5fa"}
            transparent
            opacity={isDark ? 0.45 : 0.35}
          />
        </mesh>

        {/* Orbital Ring 2: Transverse diagonal tilt (r = 2.15) */}
        <mesh ref={orbitRing2Ref} rotation={[-0.65, 0.5, 0.3]}>
          <torusGeometry args={[2.15, 0.01, 16, 128]} />
          <meshBasicMaterial
            color={isDark ? "#818cf8" : "#a78bfa"}
            transparent
            opacity={isDark ? 0.4 : 0.3}
          />
        </mesh>

        {/* Orbital Ring 3: Steep polar coordinate trace (r = 2.72) */}
        <mesh ref={orbitRing3Ref} rotation={[1.2, -0.3, 0.8]}>
          <torusGeometry args={[2.72, 0.008, 16, 128]} />
          <meshBasicMaterial
            color={isDark ? "#06b6d4" : "#2dd4bf"}
            transparent
            opacity={isDark ? 0.35 : 0.25}
          />
        </mesh>

        {/* Orbiting Satellite 1: Glowing Cyan Bead */}
        <mesh ref={sat1Ref}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Orbiting Satellite 2: Secondary Cyan Bead */}
        <mesh ref={sat2Ref}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>

        {/* Orbiting Satellite 3: Transverse Violet Node */}
        <mesh ref={sat3Ref}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>

        {/* Orbiting Satellite 4: Polar Electric Blue Bead */}
        <mesh ref={sat4Ref}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#60a5fa" />
        </mesh>

        {/* Orbiting Satellite 5: Polar Emerald Accent Bead */}
        <mesh ref={sat5Ref}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>
      </group>
    </group>
  );
}
