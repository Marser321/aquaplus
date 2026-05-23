/**
 * Fragment shader · color y refracción del agua del Hero
 *
 * Combina:
 *   - Gradiente de fondo del abisal `oklch(8% 0.02 260)` al cian eléctrico de
 *     ionización `oklch(75% 0.20 220)`. Como WebGL trabaja en RGB linealizado,
 *     hacemos la mezcla en sRGB y dejamos que Three.js (color management) la
 *     promueva a linear si está activo.
 *   - Modulación por elevación del vertex shader (vElevation): crestas más claras,
 *     valles más oscuros — sugiere refracción.
 *   - Highlight especular falso siguiendo el mouse + un halo de "ionización" cuando
 *     uScrollProgress se acerca a 1.
 *
 * uniforms:
 *   uTime, uScrollProgress, uMouse, uResolution.
 */

uniform float uTime;
uniform float uScrollProgress;
uniform vec2 uMouse;
uniform vec2 uResolution;

varying vec2 vUv;
varying float vElevation;
varying vec3 vWorldPosition;

// Colores canónicos del UI-SPEC (aproximación sRGB)
const vec3 ABYSSAL  = vec3(0.020, 0.043, 0.094); // bg-base
const vec3 DEEP     = vec3(0.047, 0.110, 0.180); // bg-elevated profundo
const vec3 IONIZED  = vec3(0.050, 0.700, 0.945); // accent-primary cian eléctrico
const vec3 SAND     = vec3(0.925, 0.820, 0.620); // warm-primary arena

void main() {
  vec2 uv = vUv;

  // Vignette suave para enfocar el centro
  float vignette = smoothstep(1.1, 0.25, length(uv - 0.5));

  // Gradiente vertical principal (más oscuro abajo, más cian arriba)
  vec3 gradient = mix(ABYSSAL, DEEP, uv.y);

  // Modulación por elevación de las olas
  float crest = smoothstep(-0.2, 0.6, vElevation);
  gradient = mix(gradient, IONIZED * 0.85, crest * 0.55);

  // Highlight especular falso siguiendo el mouse
  vec2 mouseUv = uMouse * 0.5 + 0.5;
  float mouseSpot = exp(-distance(uv, mouseUv) * 4.2);
  gradient += IONIZED * mouseSpot * 0.35;

  // Halo de ionización: se activa cuando el scroll avanza
  float ionGlow = smoothstep(0.5, 1.0, uScrollProgress);
  vec3 ionHalo = IONIZED * (0.18 + 0.32 * ionGlow);
  float ionMask = smoothstep(0.85, 0.15, length(uv - 0.5));
  gradient += ionHalo * ionMask * (0.4 + 0.6 * ionGlow);

  // Pista de "minerales dorados" sutiles cuando vienen del scroll medio
  float mineralPulse = smoothstep(0.25, 0.65, uScrollProgress) *
                       (1.0 - smoothstep(0.65, 0.95, uScrollProgress));
  float mineralStripes = sin(uv.y * 60.0 + uTime * 0.4) * 0.5 + 0.5;
  gradient += SAND * mineralStripes * mineralPulse * 0.08;

  // Aplicar vignette
  gradient *= mix(0.55, 1.0, vignette);

  // Burbujas micro · simulan H₂ activo (visible cerca del clímax)
  float bubbles = step(0.985, fract(sin(dot(uv * 200.0, vec2(12.9898, 78.233)) + uTime * 2.0) * 43758.5453));
  gradient += vec3(bubbles) * ionGlow * 0.6;

  // Alpha decae en los bordes para fundirse con el background del HTML
  float edgeFade = smoothstep(0.0, 0.15, uv.y) *
                   smoothstep(1.0, 0.85, uv.y) *
                   smoothstep(0.0, 0.10, uv.x) *
                   smoothstep(1.0, 0.90, uv.x);

  gl_FragColor = vec4(gradient, edgeFade * (0.78 + 0.18 * ionGlow));
}
