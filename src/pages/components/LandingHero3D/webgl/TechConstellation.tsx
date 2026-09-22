import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ScrollDepthState } from "./hooks/useScrollProgress";

interface TechConstellationProps {
  isDark: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
  scrollRef: React.MutableRefObject<ScrollDepthState | { progress: number; current: number }>;
}

// 15 deterministic node target offsets corresponding loosely to the 5x3 technology grid
const CONSTELLATION_NODES = [
  { x: -3.6, y: 1.8, z: -14 },
  { x: -1.8, y: 2.2, z: -16 },
  { x: 0.0, y: 1.6, z: -12 },
  { x: 1.9, y: 2.3, z: -17 },
  { x: 3.7, y: 1.7, z: -13 },
  { x: -3.8, y: 0.0, z: -15 },
  { x: -1.9, y: 0.2, z: -12 },
  { x: 0.1, y: -0.2, z: -14 },
  { x: 2.0, y: 0.1, z: -16 },
  { x: 3.9, y: -0.1, z: -13 },
  { x: -3.5, y: -1.8, z: -13 },
  { x: -1.7, y: -1.6, z: -15 },
  { x: 0.0, y: -1.9, z: -12 },
  { x: 1.8, y: -1.7, z: -16 },
  { x: 3.6, y: -1.9, z: -14 },
];

export default function TechConstellation({
  isDark,
  isMobile,
  reducedMotion,
  scrollRef,
}: TechConstellationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);
  const nodePointsRef = useRef<THREE.Points>(null);
  const nodeMatRef = useRef<THREE.PointsMaterial>(null);

  // Generate constellation node positions & interconnecting edge segment geometry
  const { nodePositions, linePositions } = useMemo(() => {
    const nodePos = new Float32Array(CONSTELLATION_NODES.length * 3);
    const lineCoords: number[] = [];

    CONSTELLATION_NODES.forEach((node, i) => {
      nodePos[i * 3] = node.x;
      nodePos[i * 3 + 1] = node.y;
      nodePos[i * 3 + 2] = node.z;

      // Connect to 2 nearest neighbors to create delicate constellation webbing
      for (let j = i + 1; j < CONSTELLATION_NODES.length; j++) {
        const other = CONSTELLATION_NODES[j];
        const dist = Math.hypot(node.x - other.x, node.y - other.y, node.z - other.z);
        if (dist < 3.2) {
          lineCoords.push(node.x, node.y, node.z, other.x, other.y, other.z);
        }
      }
    });

    return {
      nodePositions: nodePos,
      linePositions: new Float32Array(lineCoords),
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion || isMobile) return;

    const scrollObj = scrollRef.current;
    const globalProgress =
      "currentGlobal" in scrollObj ? scrollObj.currentGlobal : 0;
    const time = state.clock.elapsedTime;

    // The constellation activates as the user scrolls towards the technology section (progress ~0.15 to 0.42)
    // 0.15 -> 0.28: Approaches from depth and forms
    // 0.28 -> 0.38: Moves forward, aligning towards grid
    // 0.38 -> 0.45: Cross-fades cleanly into the assembling DOM cards
    let activation = 0;
    if (globalProgress >= 0.15 && globalProgress <= 0.45) {
      if (globalProgress < 0.28) {
        activation = (globalProgress - 0.15) / 0.13; // Fading in & emerging
      } else if (globalProgress <= 0.36) {
        activation = 1.0; // Fully formed & approaching
      } else {
        activation = Math.max(0, 1.0 - (globalProgress - 0.36) / 0.09); // Cross-fade handoff to DOM
      }
    }

    // Approach along Z space: moves forward as scroll progresses
    const forwardZ = (globalProgress - 0.15) * 16;
    groupRef.current.position.z = Math.min(forwardZ, 8);

    // Subtle ambient orbital drift
    groupRef.current.rotation.z = Math.sin(time * 0.15) * 0.02;
    groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.03;

    // Apply smooth opacity fade
    if (nodeMatRef.current) {
      const pulse = Math.sin(time * 2.0) * 0.08;
      nodeMatRef.current.opacity = Math.max(0, (isDark ? 0.75 : 0.6) * activation + pulse * activation);
    }

    if (lineMatRef.current) {
      lineMatRef.current.opacity = Math.max(0, (isDark ? 0.22 : 0.16) * activation);
    }
  });

  if (isMobile || reducedMotion) return null;

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* 1. Constellation Nodes */}
      <points ref={nodePointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={nodeMatRef}
          size={0.14}
          color={isDark ? "#38bdf8" : "#0284c7"}
          transparent
          opacity={0}
          sizeAttenuation
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          depthWrite={false}
        />
      </points>

      {/* 2. Constellation Connecting Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMatRef}
          color={isDark ? "#10b981" : "#059669"}
          transparent
          opacity={0}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
