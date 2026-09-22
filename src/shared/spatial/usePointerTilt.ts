import React, { useRef, useCallback, useEffect, useState } from "react";
import { useSpring, useReducedMotion } from "framer-motion";
import { POINTER_TILT } from "./spatialTokens";

export interface PointerTiltProps {
  maxTiltX?: number;
  maxTiltY?: number;
  liftZ?: number;
  scale?: number;
}

export function usePointerTilt<T extends HTMLElement = HTMLDivElement>(
  options?: PointerTiltProps
) {
  const elementRef = useRef<T | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false,
  });
  const prefersReduced = useReducedMotion();

  const maxTiltX = options?.maxTiltX ?? POINTER_TILT.MAX_DEG_X;
  const maxTiltY = options?.maxTiltY ?? POINTER_TILT.MAX_DEG_Y;
  const liftZ = options?.liftZ ?? POINTER_TILT.LIFT_Z;
  const targetScale = options?.scale ?? POINTER_TILT.HOVER_SCALE;

  // Spring physics for smooth tilt and natural neutral recovery
  const springConfig = { stiffness: 340, damping: 24, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const z = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(isCoarse);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (isTouchDevice || prefersReduced || !elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalized offsets (-1 to +1)
      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      // Subtle tilt: top tilts forward (rotateX > 0), right tilts right (rotateY > 0)
      rotateX.set(-normY * maxTiltX);
      rotateY.set(normX * maxTiltY);
      z.set(liftZ);
      scale.set(targetScale);

      // Relative light glare position (0% to 100%)
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        active: true,
      });
    },
    [isTouchDevice, prefersReduced, maxTiltX, maxTiltY, liftZ, targetScale, rotateX, rotateY, z, scale]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    z.set(0);
    scale.set(1);
    setGlarePos((prev) => ({ ...prev, active: false }));
  }, [rotateX, rotateY, z, scale]);

  return {
    ref: elementRef,
    style: {
      rotateX,
      rotateY,
      z,
      scale,
      transformStyle: "preserve-3d" as const,
    },
    glarePos,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
