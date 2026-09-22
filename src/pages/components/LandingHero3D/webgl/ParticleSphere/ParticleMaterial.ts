import * as THREE from "three";
import { simplex3DNoiseGLSL } from "./flowFieldShaders";

export const particleVertexShader = `
${simplex3DNoiseGLSL}

attribute vec2 aSeed;
attribute float aSpeed;
attribute float aSize;
attribute float aRadiusOffset;
attribute float aBand;
attribute float aColorBias;

uniform float uTime;
uniform float uPixelRatio;
uniform float uBaseRadius;
uniform float uEntrance;
uniform vec3 uMouse3D;
uniform float uScroll;
uniform float uIsDark;
uniform float uReducedMotion;

varying vec3 vColor;
varying float vAlpha;
varying float vDepthFacing;
varying float vCoreGlow;

void main() {
  bool isInternal = aBand < -0.5;
  vec3 p0 = normalize(position);

  vec3 pSurface;
  float escapeAlpha = 1.0;
  float driftOut = 0.0;

  if (uReducedMotion > 0.5) {
    // Calm, subtle static positioning for prefers-reduced-motion
    pSurface = p0;
  } else if (!isInternal) {
    // ── 1. Planetary Differential Zonal Stream Flow (Surface) ──
    // Equatorial & latitudinal jet streams wrapping the sphere
    float latitude = p0.y;
    float zonalSpeed = cos(latitude * 3.14159 * 2.6) * 0.38 + sin(latitude * 3.14159 * 5.2) * 0.16;
    float currentTheta = uTime * 0.24 * aSpeed * (1.0 + zonalSpeed);

    // Primary zonal circulation around Y-axis
    vec3 p1 = rotationMatrix(vec3(0.0, 1.0, 0.0), currentTheta) * p0;

    // Secondary diagonal atmospheric jet stream (tilted at 42 degrees)
    vec3 tiltAxis = normalize(vec3(0.65, 0.76, 0.0));
    float diagSpeed = sin(p1.y * 3.2 + uTime * 0.18) * 0.22;
    vec3 p2 = rotationMatrix(tiltAxis, uTime * 0.12 * aSpeed + diagSpeed) * p1;

    // ── 2. GPU 3D Curl Noise for Meandering Micro-Currents ──
    vec3 noiseCoord = p2 * 1.35 + vec3(uTime * 0.12, uTime * 0.09, uTime * 0.11);
    vec3 curl = computeCurl(noiseCoord);

    // Tangential projection: strictly restrict flow to the spherical surface
    vec3 tangentCurl = curl - p2 * dot(curl, p2);

    // Re-normalize onto unit sphere shell
    pSurface = normalize(p2 + tangentCurl * 0.24);

    // ── 3. Escaping Particles (~1.5% Living Energy Drift) ──
    if (aSeed.x > 0.983) {
      float cycle = fract(uTime * 0.14 + aSeed.y * 6.31);
      if (cycle < 0.60) {
        float progress = cycle / 0.60;
        driftOut = sin(progress * 3.14159) * 0.32;
        escapeAlpha = 1.0 - progress * 0.65;
      }
    }
  } else {
    // ── 4. Internal Volumetric Energy Flow ──
    // Slower counter-current flow through the core
    vec3 intAxis = normalize(vec3(0.2, 1.0, -0.3));
    vec3 pInt = rotationMatrix(intAxis, -uTime * 0.15 * aSpeed) * p0;
    vec3 curlInt = computeCurl(pInt * 1.8 + vec3(uTime * 0.07));
    pSurface = normalize(pInt + curlInt * 0.15);
  }

  // ── 5. Radial Shell Depth & Entrance Assembly ──
  float effectiveRadius = uBaseRadius + aRadiusOffset + driftOut;

  // Entrance assembly: cubic ease dispersing outward at t=0
  float ease = 1.0 - pow(1.0 - clamp(uEntrance, 0.0, 1.0), 3.0);
  float disperse = (1.0 - ease) * (1.25 + aSeed.x * 0.85);
  vec3 animatedPos = pSurface * (effectiveRadius * (1.0 + disperse));

  // ── 6. Damped Mouse Interaction (Gentle Repulsion & Swirl) ──
  vec3 toMouse = animatedPos - uMouse3D;
  float mouseDist = length(toMouse);
  float mouseInfluence = smoothstep(1.35, 0.0, mouseDist);
  if (mouseInfluence > 0.001 && uReducedMotion < 0.5) {
    vec3 pushDir = normalize(toMouse);
    vec3 swirlDir = cross(pushDir, pSurface);
    animatedPos += (pushDir * 0.14 + swirlDir * 0.08) * mouseInfluence;
  }

  // ── 7. Transform to View Coordinates ──
  vec4 mvPosition = modelViewMatrix * vec4(animatedPos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Camera facing angle for 3D depth perception & Fresnel halo
  vec3 viewNormal = normalize(normalMatrix * pSurface);
  float facing = dot(viewNormal, vec3(0.0, 0.0, 1.0));
  vDepthFacing = facing;

  // ── 8. Energy Bands & Pulse Wave ──
  float bandGlow = 0.0;
  if (!isInternal) {
    // Procedural coherent energy rivers wrapping diagonally
    float bandCoord = sin(pSurface.y * 4.2 + pSurface.x * 2.8 + uTime * 0.45);
    bandGlow = pow(clamp(bandCoord * 0.5 + 0.5, 0.0, 1.0), 4.5);
  }

  // Traveling data wave pulse across the sphere
  vec3 pulseOrigin = normalize(vec3(0.6, 0.8, 0.4));
  float pulseDist = length(pSurface - pulseOrigin);
  float pulseWave = smoothstep(0.35, 0.0, abs(pulseDist - fract(uTime * 0.16) * 2.5));

  // ── 9. Micro-Particle Sizing ──
  float pointSize = aSize;
  if (isInternal) {
    pointSize *= 0.82;
  }
  if (bandGlow > 0.25) {
    pointSize *= (1.0 + bandGlow * 0.4);
  }
  if (pulseWave > 0.1) {
    pointSize *= (1.0 + pulseWave * 0.35);
  }

  // Attenuate point size by distance to camera
  gl_PointSize = pointSize * (uPixelRatio * 105.0 / -mvPosition.z);
  gl_PointSize = clamp(gl_PointSize, 1.2, 32.0);

  // ── 10. Color System (Site Palette) ──
  // Palette: Electric Blue (#2563EB), Cyan (#22D3EE), Blue (#3B82F6), Indigo (#6366F1), Violet (#8B5CF6), White Accent
  vec3 cElectricBlue = vec3(0.145, 0.388, 0.922);
  vec3 cCyan         = vec3(0.133, 0.827, 0.933);
  vec3 cBlue         = vec3(0.231, 0.510, 0.965);
  vec3 cIndigo       = vec3(0.388, 0.400, 0.945);
  vec3 cViolet       = vec3(0.545, 0.361, 0.965);
  vec3 cWhite        = vec3(0.94, 0.98, 1.0);

  // Blend colors based on particle properties and location
  vec3 baseCol;
  if (aColorBias > 0.95) {
    baseCol = cWhite; // Accent sparkles
  } else if (aColorBias < 0.25) {
    baseCol = mix(cCyan, cElectricBlue, aColorBias * 4.0);
  } else if (aColorBias < 0.65) {
    baseCol = mix(cElectricBlue, cIndigo, (aColorBias - 0.25) * 2.5);
  } else {
    baseCol = mix(cIndigo, cViolet, (aColorBias - 0.65) * 3.3);
  }

  // Shift flowing streams and energy bands towards glowing cyan/white
  if (bandGlow > 0.2) {
    baseCol = mix(baseCol, mix(cCyan, cWhite, 0.6), bandGlow * 0.7);
  }
  if (pulseWave > 0.1) {
    baseCol = mix(baseCol, cWhite, pulseWave * 0.8);
  }

  // In light mode, deepen color tones slightly for crisp contrast against #f8fafc
  if (uIsDark < 0.5) {
    baseCol = mix(baseCol, vec3(0.08, 0.25, 0.75), 0.22);
    if (aColorBias > 0.95) {
      baseCol = vec3(0.15, 0.45, 0.95);
    }
  }

  vColor = baseCol;
  vCoreGlow = bandGlow + pulseWave * 0.8;
  vAlpha = escapeAlpha;
}
`;

export const particleFragmentShader = `
uniform float uIsDark;
uniform float uScroll;

varying vec3 vColor;
varying float vAlpha;
varying float vDepthFacing;
varying float vCoreGlow;

void main() {
  // ── 1. Circular Soft Micro-Point Sprite ──
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  if (dist > 0.5) discard;

  // Soft circular edge falloff and glowing inner core
  float edgeAlpha = smoothstep(0.5, 0.08, dist);
  float coreSpot = smoothstep(0.20, 0.0, dist);

  // ── 2. Volumetric Depth & Fresnel Perception ──
  // Front hemisphere (facing > 0): crisp and luminous
  // Silhouette rim (|facing| < 0.35): luminous Fresnel glow
  // Rear hemisphere (facing < 0): soft translucent view through sphere
  float depthMultiplier;
  if (vDepthFacing >= 0.0) {
    // Front hemisphere: high visibility + subtle grazing angle boost
    float rim = pow(1.0 - vDepthFacing, 2.0) * 0.45;
    depthMultiplier = 0.82 + vDepthFacing * 0.18 + rim;
  } else {
    // Rear hemisphere: softly visible through the front cloud for true 3D volume
    depthMultiplier = 0.28 + (1.0 + vDepthFacing) * 0.16;
  }

  // Base opacity adapted to theme
  float baseOpacity = uIsDark > 0.5 ? 0.92 : 0.82;
  float finalAlpha = edgeAlpha * depthMultiplier * baseOpacity * vAlpha;

  // Core brightness boost on accents and energy streams
  vec3 finalColor = vColor + vec3(coreSpot * (0.35 + vCoreGlow * 0.45));

  // Global scroll dissolve
  float scrollDissolve = clamp(1.0 - (uScroll - 0.25) * 1.5, 0.0, 1.0);
  finalAlpha *= scrollDissolve;

  gl_FragColor = vec4(finalColor, finalAlpha);
}
`;

export function createParticleMaterial(isDark: boolean): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
      uBaseRadius: { value: 1.40 },
      uEntrance: { value: 0 },
      uMouse3D: { value: new THREE.Vector3(999, 999, 999) },
      uScroll: { value: 0 },
      uIsDark: { value: isDark ? 1.0 : 0.0 },
      uReducedMotion: { value: 0.0 },
    },
    transparent: true,
    depthWrite: false, // Prevents points from blocking orbital rings and enables volumetric see-through
    depthTest: true,
    blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
}
