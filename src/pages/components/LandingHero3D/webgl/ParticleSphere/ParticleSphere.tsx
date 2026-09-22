import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { PointerParallax } from "../hooks/usePointerParallax";
import type { ScrollDepthState } from "../hooks/useScrollProgress";
import { generateSphereParticles, getDeviceParticleCount } from "./generateSphereParticles";
import { createParticleMaterial } from "./ParticleMaterial";
import OrbitSystem from "./OrbitSystem";

interface ParticleSphereProps {
  isDark: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
  pointerRef: React.MutableRefObject<PointerParallax>;
  scrollRef: React.MutableRefObject<ScrollDepthState | { progress?: number; current?: number; currentHero?: number }>;
}

export default function ParticleSphere({
  isDark,
  isMobile,
  reducedMotion,
  pointerRef,
  scrollRef,
}: ParticleSphereProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const particleGroupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const entranceRef = useRef(0);

  const { viewport } = useThree();
  const isTablet =
    typeof window !== "undefined"
      ? window.innerWidth >= 768 && window.innerWidth < 1024
      : false;

  // Base sphere radius: 1.40 for balanced composition with typography
  const baseRadius = 1.40;

  // ── 1. Construct Procedural Geometry with Custom Attributes ──
  const geometry = useMemo(() => {
    const { surfaceCount, internalCount } = getDeviceParticleCount(isMobile, isTablet);
    const data = generateSphereParticles(surfaceCount, internalCount, baseRadius, 0.065);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(data.seeds, 2));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(data.speeds, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(data.sizes, 1));
    geo.setAttribute("aRadiusOffset", new THREE.BufferAttribute(data.radiusOffsets, 1));
    geo.setAttribute("aBand", new THREE.BufferAttribute(data.bands, 1));
    geo.setAttribute("aColorBias", new THREE.BufferAttribute(data.colorBiases, 1));

    return geo;
  }, [isMobile, isTablet, baseRadius]);

  // ── 2. Create GPU ShaderMaterial ──
  const material = useMemo(() => {
    return createParticleMaterial(isDark);
  }, [isDark]);

  // Update theme uniform dynamically when theme changes
  useEffect(() => {
    if (material) {
      material.uniforms.uIsDark.value = isDark ? 1.0 : 0.0;
      material.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
      material.needsUpdate = true;
    }
  }, [isDark, material]);

  // Cleanup geometry & material on unmount
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  // ── 3. Frame Animation Loop ──
  useFrame((state, delta) => {
    if (!rootGroupRef.current || !material) return;

    const time = state.clock.elapsedTime;
    const scrollObj = scrollRef.current;
    const scroll =
      "currentHero" in scrollObj && typeof scrollObj.currentHero === "number"
        ? scrollObj.currentHero
        : "current" in scrollObj && typeof scrollObj.current === "number"
        ? scrollObj.current
        : 0;
    const pointer = pointerRef.current;

    // 1. Entrance Assembly Progress (0 to 1 over first 1.3s)
    if (entranceRef.current < 1) {
      entranceRef.current = Math.min(entranceRef.current + delta * 1.1, 1.0);
    }
    const easeEntrance = 1 - Math.pow(1 - entranceRef.current, 3);

    // 2. Uniform Updates
    material.uniforms.uTime.value = time;
    material.uniforms.uEntrance.value = entranceRef.current;
    material.uniforms.uScroll.value = scroll;
    material.uniforms.uReducedMotion.value = reducedMotion ? 1.0 : 0.0;
    material.uniforms.uPixelRatio.value = Math.min(viewport.dpr, 2.0);

    // Damped 3D Pointer projection for subtle local disturbance
    material.uniforms.uMouse3D.value.set(
      pointer.currentX * 1.8,
      -pointer.currentY * 1.5,
      0.5
    );

    // 3. Responsive Positioning with Typography
    // Desktop: x = 2.35 ensures headline text in HeroDOMOverlay has complete legibility
    // Mobile: centered at x = 0, y = 0.65
    const targetBaseX = isMobile ? 0 : 2.35;
    const targetBaseY = isMobile ? 0.65 : 0;
    const targetBaseZ = -scroll * 7.5;

    rootGroupRef.current.position.x = targetBaseX;
    rootGroupRef.current.position.y = targetBaseY - scroll * 1.2;
    rootGroupRef.current.position.z = targetBaseZ;

    // Responsive Base Scale with Entrance Easing
    const baseScale = (isMobile ? 0.72 : 1.0) * (0.80 + 0.20 * easeEntrance);
    rootGroupRef.current.scale.set(baseScale, baseScale, baseScale);

    // 4. Pointer Parallax Rotation (Subtle angles ±3° to 5°)
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

    // 5. Macro System Motion: Secondary very slow rotation of the particle system
    if (!reducedMotion && particleGroupRef.current) {
      particleGroupRef.current.rotation.y += delta * 0.045;
      particleGroupRef.current.rotation.x = Math.sin(time * 0.25) * 0.035;
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* ── 1. Integrated Multi-Axis Orbital Paths & Satellites ── */}
      <OrbitSystem isDark={isDark} reducedMotion={reducedMotion} />

      {/* ── 2. The Micro-Particle Sphere (Surface & Inner Particles) ── */}
      <group ref={particleGroupRef} renderOrder={2}>
        <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />
      </group>
    </group>
  );
}
