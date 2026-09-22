/**
 * GLSL 3D Simplex noise and Spherical Curl-Noise Flow Field implementation.
 * Divergence-free tangential vector field over the spherical surface.
 */

export const simplex3DNoiseGLSL = `
//
// Description : Array and textureless GLSL 2D/3D/4D simplex 
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License.
//

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  // Permutations
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  float n_ = 0.142857142857; // 1.0 / 7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix contributions
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// Computes 3D vector curl noise
vec3 computeCurl(vec3 p) {
  const float e = 0.08;
  const float invE2 = 1.0 / (2.0 * e);

  // Vector potential Psi: 3 offset noise fields
  float psiX_yPlus  = snoise(p + vec3(12.3, e, 0.0));
  float psiX_yMinus = snoise(p + vec3(12.3, -e, 0.0));
  float psiX_zPlus  = snoise(p + vec3(12.3, 0.0, e));
  float psiX_zMinus = snoise(p + vec3(12.3, 0.0, -e));

  float psiY_xPlus  = snoise(p + vec3(0.0, 45.6 + e, 0.0));
  float psiY_xMinus = snoise(p + vec3(0.0, 45.6 - e, 0.0));
  float psiY_zPlus  = snoise(p + vec3(0.0, 45.6, e));
  float psiY_zMinus = snoise(p + vec3(0.0, 45.6, -e));

  float psiZ_xPlus  = snoise(p + vec3(e, 0.0, 78.9));
  float psiZ_xMinus = snoise(p + vec3(-e, 0.0, 78.9));
  float psiZ_yPlus  = snoise(p + vec3(0.0, e, 78.9));
  float psiZ_yMinus = snoise(p + vec3(0.0, -e, 78.9));

  float dPsiZ_dy = (psiZ_yPlus - psiZ_yMinus) * invE2;
  float dPsiY_dz = (psiY_zPlus - psiY_zMinus) * invE2;

  float dPsiX_dz = (psiX_zPlus - psiX_zMinus) * invE2;
  float dPsiZ_dx = (psiZ_xPlus - psiZ_xMinus) * invE2;

  float dPsiY_dx = (psiY_xPlus - psiY_xMinus) * invE2;
  float dPsiX_dy = (psiX_yPlus - psiX_yMinus) * invE2;

  return vec3(
    dPsiZ_dy - dPsiY_dz,
    dPsiX_dz - dPsiZ_dx,
    dPsiY_dx - dPsiX_dy
  );
}

// Arbitrary axis rotation matrix
mat3 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat3(
    oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c
  );
}
`;
