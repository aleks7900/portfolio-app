import React from "react";
import { motion } from "framer-motion";
import { usePointerTilt, type PointerTiltProps } from "./usePointerTilt";

export interface SpatialCardProps extends PointerTiltProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  showGlare?: boolean;
}

/**
 * SpatialCard provides physical 3D depth and subtle pointer tilt for desktop users.
 * Inner elements utilize translateZ offsets for genuine depth layering:
 *   - Card Surface: z = 0
 *   - Global Pointer Light Glare: z = +5px
 *   - Title & Text: z = +15px
 *   - Icon / Badge: z = +28px
 */
export function SpatialCard({
  children,
  className = "",
  onClick,
  maxTiltX,
  maxTiltY,
  liftZ,
  scale,
  showGlare = true,
}: SpatialCardProps) {
  const { ref, style, glarePos, onMouseMove, onMouseLeave } = usePointerTilt<HTMLDivElement>({
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
      {/* Surface Glare reacting to the global virtual pointer light (z = +5px) */}
      {showGlare && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 [transform:translateZ(5px)]"
          style={{
            opacity: glarePos.active ? 1 : 0,
            background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(16, 185, 129, 0.12), transparent 75%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

export default SpatialCard;
