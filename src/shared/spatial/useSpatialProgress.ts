import { type RefObject } from "react";
import { useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { SPATIAL_DEPTH, SPATIAL_SCALE, SPATIAL_BLUR } from "./spatialTokens";

export interface SpatialProgressValues {
  z: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  blurFilter: MotionValue<string>;
  rawProgress: MotionValue<number>;
  isReducedMotion: boolean;
}

/**
 * Calculates continuous 3D spatial values for a section based on its scroll position.
 * The section transitions smoothly through three phases:
 *  1. ENTER (scroll 0.0 -> 0.35): approaches from depth toward the viewer.
 *  2. FOCUS (scroll 0.35 -> 0.70): stays completely stable, crisp, and readable.
 *  3. EXIT  (scroll 0.70 -> 1.00): recedes past the camera as the next section approaches.
 */
export function useSpatialProgress(
  targetRef: RefObject<HTMLElement | null>,
  customRange?: {
    enterEnd?: number;
    exitStart?: number;
  }
): SpatialProgressValues {
  const prefersReduced = useReducedMotion();
  const isReducedMotion = Boolean(prefersReduced);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const enterEnd = customRange?.enterEnd ?? 0.38;
  const exitStart = customRange?.exitStart ?? 0.72;

  // 1. Z-Depth: Far depth -> 0 (focus) -> +leave (moves past viewer)
  const z = useTransform(
    scrollYProgress,
    [0, enterEnd, exitStart, 1],
    isReducedMotion
      ? [0, 0, 0, 0]
      : [SPATIAL_DEPTH.FAR, SPATIAL_DEPTH.FOCUS, SPATIAL_DEPTH.FOCUS, SPATIAL_DEPTH.LEAVE]
  );

  // 2. Scale: Approaches from smaller to natural size, then slightly enlarges past viewer
  const scale = useTransform(
    scrollYProgress,
    [0, enterEnd, exitStart, 1],
    isReducedMotion
      ? [1, 1, 1, 1]
      : [SPATIAL_SCALE.FAR, SPATIAL_SCALE.FOCUS, SPATIAL_SCALE.FOCUS, SPATIAL_SCALE.LEAVE]
  );

  // 3. Opacity: Fades in as it approaches, remains 1.0 while focused, fades out on exit
  const opacity = useTransform(
    scrollYProgress,
    [0, enterEnd * 0.7, enterEnd, exitStart, exitStart + (1 - exitStart) * 0.7, 1],
    [0, 0.6, 1, 1, 0.4, 0]
  );

  // 4. Subtle depth blur filter (clears as section arrives into focus)
  const blurFilter = useTransform(
    scrollYProgress,
    [0, enterEnd, exitStart, 1],
    isReducedMotion
      ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"]
      : [
          `blur(${SPATIAL_BLUR.FAR}px)`,
          `blur(${SPATIAL_BLUR.FOCUS}px)`,
          `blur(${SPATIAL_BLUR.FOCUS}px)`,
          `blur(${SPATIAL_BLUR.LEAVE}px)`,
        ]
  );

  return {
    z,
    scale,
    opacity,
    blurFilter,
    rawProgress: scrollYProgress,
    isReducedMotion,
  };
}
