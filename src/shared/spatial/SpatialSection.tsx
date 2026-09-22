import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useSpatialProgress } from "./useSpatialProgress";

export interface SpatialSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  enterEnd?: number;
  exitStart?: number;
  disabled?: boolean;
}

/**
 * SpatialSection establishes a unified 3D spatial viewport for each landing page section.
 * Coordinates the ENTER (approaching), FOCUS (100% stable & readable), and EXIT (receding) phases.
 */
export function SpatialSection({
  children,
  id,
  className = "",
  enterEnd = 0.36,
  exitStart = 0.74,
  disabled = false,
}: SpatialSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { z, scale, opacity, blurFilter, isReducedMotion } = useSpatialProgress(
    sectionRef,
    { enterEnd, exitStart }
  );

  if (disabled) {
    return (
      <section id={id} className={`relative ${className}`}>
        {children}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative [perspective:1200px] [transform-style:preserve-3d] ${className}`}
    >
      <motion.div
        style={{
          z,
          scale,
          opacity,
          filter: isReducedMotion ? undefined : blurFilter,
          transformStyle: "preserve-3d",
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  );
}

export default SpatialSection;
