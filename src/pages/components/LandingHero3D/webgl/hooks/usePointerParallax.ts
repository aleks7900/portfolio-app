import { useEffect, useRef } from "react";

export interface PointerParallax {
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
}

export function usePointerParallax() {
  const coordsRef = useRef<PointerParallax>({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      // Normalize to [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      coordsRef.current.targetX = Math.max(-1, Math.min(1, x));
      coordsRef.current.targetY = Math.max(-1, Math.min(1, y));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = (touch.clientY / window.innerHeight) * 2 - 1;

        coordsRef.current.targetX = Math.max(-1, Math.min(1, x * 0.5));
        coordsRef.current.targetY = Math.max(-1, Math.min(1, y * 0.5));
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const update = (delta: number, dampingSpeed: number = 3.5) => {
    const ref = coordsRef.current;
    const factor = Math.min(delta * dampingSpeed, 1);
    ref.currentX += (ref.targetX - ref.currentX) * factor;
    ref.currentY += (ref.targetY - ref.currentY) * factor;
    return ref;
  };

  return { coordsRef, update };
}
