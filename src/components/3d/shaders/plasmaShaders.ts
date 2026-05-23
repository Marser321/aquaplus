/**
 * Shaders del Stage Ionización · Aqua+ Systems
 *
 *  - plasmaVertex    · plano estático, pasa UV al fragment.
 *  - plasmaFragment  · campo eléctrico entre electrodos. Multi-octave noise FBM
 *                      con chromatic aberration sutil para sugerir arco de plasma.
 *
 * Uniforms:
 *   uTime, uIonizationProgress (0..1)
 */

export const plasmaVertex = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const plasmaFragment = `
uniform float uTime;
uniform float uIonizationProgress;

varying vec2 vUv;

const vec3 IONIZED = vec3(0.040, 0.770, 0.730); // teal del logo Aqua+
const vec3 BRIGHT  = vec3(0.70, 1.00, 0.95);    // teal-blanco caliente

// Hash + noise 2D
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise2(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// Fractional Brownian Motion · 3 octavas (ligero para mobile)
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise2(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;

  // Centro de la columna de plasma (vertical entre las placas)
  vec2 center = vec2(0.5, uv.y);
  float distToCenter = abs(uv.x - 0.5);

  // Núcleo del plasma (cerca del centro X)
  float core = smoothstep(0.18, 0.0, distToCenter);

  // FBM animado para el cuerpo del plasma
  float t = uTime * 0.6;
  float n = fbm(vec2(uv.x * 4.0, uv.y * 8.0 + t));
  n += fbm(vec2(uv.x * 8.0 - t, uv.y * 12.0)) * 0.5;

  // Chromatic aberration sutil (offset R vs B en el borde)
  float r = fbm(vec2(uv.x * 6.0 + 0.02, uv.y * 10.0 + t));
  float b = fbm(vec2(uv.x * 6.0 - 0.02, uv.y * 10.0 + t));

  vec3 col = vec3(0.0);
  col += IONIZED * core * (0.6 + 0.4 * n);
  col += BRIGHT * core * pow(n, 3.0) * 0.7;
  col.r += core * (r - 0.5) * 0.15;
  col.b += core * (b - 0.5) * 0.15;

  // "Branches" del plasma laterales (sugieren rayos eléctricos secundarios)
  float branch = fbm(vec2(uv.y * 16.0 + t * 0.8, uv.x * 3.0));
  float branchMask = smoothstep(0.6, 1.0, branch) * smoothstep(0.5, 0.05, distToCenter);
  col += IONIZED * branchMask * 0.5;

  // Modular por scroll progress (entra desvanecido)
  float intensity = smoothstep(0.0, 0.3, uIonizationProgress);
  col *= intensity;

  // Alpha decae fuera del centro
  float alpha = (core + branchMask * 0.5) * intensity;
  alpha = min(alpha, 1.0);

  gl_FragColor = vec4(col, alpha);
}
`;
