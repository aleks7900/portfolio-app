import React from "react";
import { motion } from "framer-motion";
import { usePointerTilt, type PointerTiltProps } from "./usePointerTilt";

export interface SpatialCardProps extends PointerTiltProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * SpatialCard provides physical 3D depth and subtle pointer tilt for desktop users.
 * Inner elements can utilize translateZ offsets for genuine depth layering:
 *   - Card Surface: z = 0
 *   - Glow / Halo: z = +5px
 *   - Title: z = +12px
 *   - Icon / Badge: z = +24px
 */
export function SpatialCard({
  children,
  className = "",
  onClick,
  maxTiltX,
  maxTiltY,
  liftZ,
  scale,
}: SpatialCardProps) {
  const { ref, style, onMouseMove, onMouseLeave } = usePointerTilt<HTMLDivElement>({
    maxTiltX,
    maxTiltY,
    liftZ,
    scale,
  });

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`relative [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default SpatialCard;
