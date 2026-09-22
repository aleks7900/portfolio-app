/**
 * Generates Fibonacci spherical surface and inner volumetric particle attributes.
 * Eliminates polar clustering and establishes micro-particle hierarchies.
 */

export interface ParticleAttributesData {
  positions: Float32Array;
  seeds: Float32Array;
  speeds: Float32Array;
  sizes: Float32Array;
  radiusOffsets: Float32Array;
  bands: Float32Array;
  colorBiases: Float32Array;
  totalCount: number;
}

export function getDeviceParticleCount(isMobile: boolean, isTablet: boolean): {
  surfaceCount: number;
  internalCount: number;
} {
  if (isMobile) {
    return { surfaceCount: 6200, internalCount: 800 }; // 7,000 total
  }
  if (isTablet) {
    return { surfaceCount: 12000, internalCount: 1800 }; // 13,800 total
  }
  return { surfaceCount: 27500, internalCount: 4000 }; // 31,500 total
}

function pseudoRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateSphereParticles(
  surfaceCount: number,
  internalCount: number,
  baseRadius: number = 1.40,
  shellThickness: number = 0.065
): ParticleAttributesData {
  const totalCount = surfaceCount + internalCount;

  const positions = new Float32Array(totalCount * 3);
  const seeds = new Float32Array(totalCount * 2);
  const speeds = new Float32Array(totalCount);
  const sizes = new Float32Array(totalCount);
  const radiusOffsets = new Float32Array(totalCount);
  const bands = new Float32Array(totalCount);
  const colorBiases = new Float32Array(totalCount);

  const rng = pseudoRandom(1337);
  const goldenAngle = Math.PI * (1 + Math.sqrt(5)); // ~2.3999632

  // ── 1. Surface Particles (Fibonacci Spherical Distribution) ──
  for (let i = 0; i < surfaceCount; i++) {
    // Uniform Fibonacci distribution on sphere surface
    const phi = Math.acos(1 - (2 * (i + 0.5)) / surfaceCount);
    const theta = goldenAngle * i;

    const nx = Math.sin(phi) * Math.cos(theta);
    const ny = Math.cos(phi);
    const nz = Math.sin(phi) * Math.sin(theta);

    positions[i * 3] = nx;
    positions[i * 3 + 1] = ny;
    positions[i * 3 + 2] = nz;

    const seedX = rng();
    const seedY = rng();
    seeds[i * 2] = seedX;
    seeds[i * 2 + 1] = seedY;

    // Speeds: 0.85 to 1.25 with subtle variations
    speeds[i] = 0.85 + seedX * 0.4;

    // Sizing Hierarchy:
    // 70% micro-tiny (1.8-2.4)
    // 20% small (2.8-3.8)
    // 8% medium (4.5-6.0)
    // 2% accent bright (7.5-9.5)
    let size = 2.0;
    if (seedX < 0.70) {
      size = 1.8 + seedY * 0.7;
    } else if (seedX < 0.90) {
      size = 3.0 + seedY * 1.0;
    } else if (seedX < 0.98) {
      size = 4.8 + seedY * 1.4;
    } else {
      size = 7.5 + seedY * 2.2; // Brighter accent point
    }
    sizes[i] = size;

    // Shell thickness: most close to surface, some slightly above
    const rDist = rng();
    let rOffset = (rDist - 0.5) * 2 * shellThickness;
    if (seedX > 0.92) {
      rOffset += shellThickness * 0.75; // slightly above surface
    }
    radiusOffsets[i] = rOffset;

    // Organic stream band affiliation (strictly in range 0..4)
    const bandPhase = Math.floor((ny * 2.8 + Math.sin(theta * 3.0) * 0.35 + 10.0) % 5.0);
    bands[i] = bandPhase;

    // Color bias: electric blue (0.0), cyan (0.25), indigo (0.6), violet (0.85), white accent (1.0)
    if (seedX > 0.97) {
      colorBiases[i] = 1.0; // bright accent
    } else {
      colorBiases[i] = (ny * 0.5 + 0.5) * 0.65 + seedY * 0.35;
    }
  }

  // ── 2. Internal Volumetric Particles (10–15% of total) ──
  for (let j = 0; j < internalCount; j++) {
    const idx = surfaceCount + j;

    // Uniform sphere volume distribution: r = R * u^(1/3)
    const u = 0.12 + rng() * 0.75;
    const innerR = Math.cbrt(u);

    const costheta = (rng() - 0.5) * 2;
    const phi = Math.acos(costheta);
    const theta = rng() * Math.PI * 2;

    const nx = Math.sin(phi) * Math.cos(theta);
    const ny = Math.cos(phi);
    const nz = Math.sin(phi) * Math.sin(theta);

    positions[idx * 3] = nx;
    positions[idx * 3 + 1] = ny;
    positions[idx * 3 + 2] = nz;

    const seedX = rng();
    const seedY = rng();
    seeds[idx * 2] = seedX;
    seeds[idx * 2 + 1] = seedY;

    // Internal particles move slower (0.28 to 0.45x)
    speeds[idx] = 0.28 + seedX * 0.17;

    // Softer micro-sizes inside
    sizes[idx] = 1.6 + seedY * 1.4;

    // Internal radial offset is deeply negative (defining inner volume)
    // When baseRadius is applied, particle radius is baseRadius + radiusOffsets[idx]
    radiusOffsets[idx] = (innerR - 1.0) * baseRadius;

    bands[idx] = -1.0; // Internal flag
    colorBiases[idx] = 0.15 + seedY * 0.5; // Deep glowing cyan / electric indigo
  }

  return {
    positions,
    seeds,
    speeds,
    sizes,
    radiusOffsets,
    bands,
    colorBiases,
    totalCount,
  };
}
