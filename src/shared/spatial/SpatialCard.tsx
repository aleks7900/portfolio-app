import React from "react";
import { useAnimePerspectiveTilt, type AnimeTiltOptions } from "../../hooks/useAnimePerspectiveTilt";

export interface SpatialCardProps extends AnimeTiltOptions {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  showGlare?: boolean;
}

/**
 * SpatialCard provides physical 3D depth and subtle pointer tilt powered by Anime.js v4 spring physics.
 * Direct GPU-accelerated CSS transforms ensure fluid 60-120fps motion without React render overhead.
 */
export function SpatialCard({
  children,
  className = "",
  onClick,
  maxTiltX = 5,
  maxTiltY = 5,
  liftZ = 12,
  scale = 1.02,
  showGlare = true,
}: SpatialCardProps) {
  const { ref, glareRef, onMouseMove, onMouseLeave } =
    useAnimePerspectiveTilt<HTMLDivElement>({
      maxTiltX,
      maxTiltY,
      liftZ,
      scale,
      glare: showGlare,
    });

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`relative [transform-style:preserve-3d] ${className}`}
    >
      {/* Specular glare reacting to pointer position */}
      {showGlare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 z-10 [transform:translateZ(6px)]"
        />
      )}
      {children}
    </div>
  );
}

export default SpatialCard;
