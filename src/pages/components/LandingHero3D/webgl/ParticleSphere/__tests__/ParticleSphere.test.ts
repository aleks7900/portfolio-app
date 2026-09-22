import { describe, expect, it } from "vitest";
import {
  generateSphereParticles,
  getDeviceParticleCount,
} from "../generateSphereParticles";
import { createParticleMaterial, particleVertexShader, particleFragmentShader } from "../ParticleMaterial";

describe("ParticleSphere generator & math distribution", () => {
  it("adapts particle counts across device tiers", () => {
    const mobileCounts = getDeviceParticleCount(true, false);
    expect(mobileCounts.surfaceCount).toBe(6200);
    expect(mobileCounts.internalCount).toBe(800);
    expect(mobileCounts.surfaceCount + mobileCounts.internalCount).toBe(7000);

    const tabletCounts = getDeviceParticleCount(false, true);
    expect(tabletCounts.surfaceCount).toBe(12000);
    expect(tabletCounts.internalCount).toBe(1800);
    expect(tabletCounts.surfaceCount + tabletCounts.internalCount).toBe(13800);

    const desktopCounts = getDeviceParticleCount(false, false);
    expect(desktopCounts.surfaceCount).toBe(27500);
    expect(desktopCounts.internalCount).toBe(4000);
    expect(desktopCounts.surfaceCount + desktopCounts.internalCount).toBe(31500);
  });

  it("distributes surface particles uniformly on the sphere surface", () => {
    const surfaceCount = 500;
    const internalCount = 50;
    const baseRadius = 1.40;
    const shellThickness = 0.065;

    const data = generateSphereParticles(surfaceCount, internalCount, baseRadius, shellThickness);

    expect(data.totalCount).toBe(550);
    expect(data.positions.length).toBe(550 * 3);
    expect(data.seeds.length).toBe(550 * 2);
    expect(data.speeds.length).toBe(550);
    expect(data.sizes.length).toBe(550);
    expect(data.radiusOffsets.length).toBe(550);
    expect(data.bands.length).toBe(550);

    // Verify surface particles have unit length positions: sqrt(x^2 + y^2 + z^2) ≈ 1
    for (let i = 0; i < surfaceCount; i++) {
      const x = data.positions[i * 3];
      const y = data.positions[i * 3 + 1];
      const z = data.positions[i * 3 + 2];
      const len = Math.sqrt(x * x + y * y + z * z);
      expect(len).toBeCloseTo(1.0, 3);

      // Verify shell offsets are bounded
      expect(data.radiusOffsets[i]).toBeGreaterThanOrEqual(-shellThickness * 1.5);
      expect(data.radiusOffsets[i]).toBeLessThanOrEqual(shellThickness * 2.0);

      // Verify speeds are positive
      expect(data.speeds[i]).toBeGreaterThan(0.5);

      // Verify valid bands
      expect(data.bands[i]).toBeGreaterThanOrEqual(0);
    }

    // Verify internal particles have negative radius offsets and internal flag (-1)
    for (let j = 0; j < internalCount; j++) {
      const idx = surfaceCount + j;
      expect(data.bands[idx]).toBe(-1.0);
      expect(data.radiusOffsets[idx]).toBeLessThan(0);
      expect(data.speeds[idx]).toBeLessThan(0.6); // Slower internal flow
    }
  });

  it("creates micro-particle hierarchy with majority tiny particles", () => {
    const data = generateSphereParticles(1000, 100);
    let tinyCount = 0;
    let smallCount = 0;
    let accentCount = 0;

    for (let i = 0; i < 1000; i++) {
      const size = data.sizes[i];
      if (size <= 2.6) tinyCount++;
      else if (size <= 4.0) smallCount++;
      else if (size >= 7.0) accentCount++;
    }

    // ~70% tiny particles
    expect(tinyCount / 1000).toBeGreaterThanOrEqual(0.60);
    // ~20% small particles
    expect(smallCount / 1000).toBeGreaterThanOrEqual(0.12);
    // ~2% accent particles
    expect(accentCount / 1000).toBeGreaterThanOrEqual(0.01);
  });
});

describe("ParticleMaterial shader configuration", () => {
  it("initializes custom ShaderMaterial with all required uniforms", () => {
    const matDark = createParticleMaterial(true);
    expect(matDark.transparent).toBe(true);
    expect(matDark.depthWrite).toBe(false);
    expect(matDark.depthTest).toBe(true);
    expect(matDark.uniforms.uTime).toBeDefined();
    expect(matDark.uniforms.uBaseRadius.value).toBe(1.40);
    expect(matDark.uniforms.uEntrance.value).toBe(0);
    expect(matDark.uniforms.uIsDark.value).toBe(1.0);
    expect(matDark.uniforms.uMouse3D).toBeDefined();
    expect(matDark.uniforms.uScroll).toBeDefined();
    expect(matDark.uniforms.uPixelRatio).toBeDefined();

    const matLight = createParticleMaterial(false);
    expect(matLight.uniforms.uIsDark.value).toBe(0.0);
  });

  it("contains simplex noise, curl flow, and soft point sprite GLSL", () => {
    expect(particleVertexShader).toContain("snoise");
    expect(particleVertexShader).toContain("computeCurl");
    expect(particleVertexShader).toContain("rotationMatrix");
    expect(particleVertexShader).toContain("aRadiusOffset");
    expect(particleVertexShader).toContain("gl_PointSize");

    expect(particleFragmentShader).toContain("gl_PointCoord");
    expect(particleFragmentShader).toContain("smoothstep");
    expect(particleFragmentShader).toContain("gl_FragColor");
  });
});
