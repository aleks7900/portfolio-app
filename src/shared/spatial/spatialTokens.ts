/**
 * Global 3D Coordinate and Motion Tokens
 * Enforces one unified physical spatial model across the entire landing page.
 */

export const SPATIAL_DEPTH = {
  FAR: -480,
  APPROACH: -240,
  FOCUS: 0,
  LEAVE: 110,
} as const;

export const SPATIAL_SCALE = {
  FAR: 0.86,
  FOCUS: 1.0,
  LEAVE: 1.03,
} as const;

export const SPATIAL_OPACITY = {
  FAR: 0,
  APPROACH: 0.4,
  FOCUS: 1.0,
  LEAVE: 0,
} as const;

export const SPATIAL_BLUR = {
  FAR: 4,
  FOCUS: 0,
  LEAVE: 2,
} as const;

export const POINTER_TILT = {
  MAX_DEG_X: 6,
  MAX_DEG_Y: 7,
  LIFT_Z: 16,
  HOVER_SCALE: 1.02,
} as const;

/**
 * Deterministic initial 3D positions for the 15 technology stack cards.
 * Prevents hydration mismatches or Math.random() jumping during re-renders.
 */
export interface TechCardSpatialOffset {
  z: number;
  x: number;
  y: number;
  rotX: number;
  rotY: number;
  scale: number;
}

export const TECH_CARD_SPATIAL_OFFSETS: readonly TechCardSpatialOffset[] = [
  { z: -420, x: -18, y: 15, rotX: -5, rotY: 6, scale: 0.85 },
  { z: -580, x: 22, y: -20, rotX: 6, rotY: -6, scale: 0.82 },
  { z: -360, x: -12, y: 24, rotX: -4, rotY: 4, scale: 0.88 },
  { z: -640, x: 16, y: -16, rotX: 7, rotY: -5, scale: 0.8 },
  { z: -320, x: -24, y: 18, rotX: -5, rotY: 7, scale: 0.89 },
  { z: -500, x: 12, y: -24, rotX: 4, rotY: -5, scale: 0.84 },
  { z: -380, x: -20, y: 14, rotX: -6, rotY: 5, scale: 0.87 },
  { z: -610, x: 26, y: -12, rotX: 6, rotY: -7, scale: 0.81 },
  { z: -440, x: -16, y: 22, rotX: -4, rotY: 4, scale: 0.85 },
  { z: -550, x: 14, y: -18, rotX: 6, rotY: -5, scale: 0.83 },
  { z: -340, x: -22, y: 26, rotX: -4, rotY: 6, scale: 0.88 },
  { z: -470, x: 18, y: -22, rotX: 5, rotY: -4, scale: 0.85 },
  { z: -620, x: -14, y: 16, rotX: -7, rotY: 5, scale: 0.8 },
  { z: -330, x: 20, y: -26, rotX: 4, rotY: -6, scale: 0.89 },
  { z: -520, x: -16, y: 20, rotX: -5, rotY: 5, scale: 0.83 },
] as const;
