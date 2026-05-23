/**
 * Shaders del Hero WebGL · Aqua+ Systems
 *
 * Inlined como TS template strings para que Turbopack los procese sin loader custom.
 * Estructura:
 *   - waterVertex  · displacement multi-octava + reactividad mouse/scroll
 *   - waterFragment· gradiente brand + caustics + mouse halo concéntrico + edge glow superior
 *
 * Uniforms:
 *   uTime (s), uScrollProgress (0..1), uMouse (-1..1 vec2), uResolution (vec2 px)
 *
 * Colores en sRGB (aprox del UI-SPEC v1.1):
 *   ABYSSAL  ≈ --color-bg-base       oklch(13% 0.05 260)
 *   DEEP     ≈ --color-bg-elevated   oklch(20% 0.06 260)
 *   IONIZED  ≈ --color-accent-primary oklch(72% 0.13 175) · teal del logo
 *   SAND     ≈ --color-warm-primary  oklch(82% 0.06 80)
 */

export const waterVertex = `
uniform float uTime;
uniform float uScrollProgress;
uniform vec2 uMouse;

varying vec2 vUv;
varying float vElevation;
varying vec3 vWorldPosition;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
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
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
  vUv = uv;
  vec3 displaced = position;

  // Octava 1 · onda primaria lenta
  float wave = snoise(vec3(position.x * 0.6, position.y * 0.6, uTime * 0.15)) * 0.45;
  // Octava 2 · flujo direccional acelerado por scroll
  float flow = snoise(vec3(
    position.x * 1.2 + uTime * 0.3,
    position.y * 1.2,
    uScrollProgress * 2.5
  )) * 0.25;
  // Octava 3 · sub-onda cruzada (frecuencia 2x, amplitud 0.4x) — añade detalle micro
  float subwave = snoise(vec3(
    position.x * 2.4 - uTime * 0.22,
    position.y * 2.4 + uTime * 0.18,
    uTime * 0.4
  )) * 0.18;

  // Influencia del cursor (gaussiana exponencial) — más amplia para que se note
  float mouseDist = distance(position.xy, uMouse * 2.5);
  float mouseInfluence = exp(-mouseDist * 1.4) * 0.65;

  float elevation = wave + flow + subwave + mouseInfluence;
  displaced.z += elevation;

  vElevation = elevation;
  vWorldPosition = (modelMatrix * vec4(displaced, 1.0)).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

export const waterFragment = `
uniform float uTime;
uniform float uScrollProgress;
uniform vec2 uMouse;
uniform vec2 uResolution;

varying vec2 vUv;
varying float vElevation;
varying vec3 vWorldPosition;

const vec3 ABYSSAL  = vec3(0.040, 0.073, 0.155);
const vec3 DEEP     = vec3(0.085, 0.145, 0.240);
const vec3 IONIZED  = vec3(0.040, 0.770, 0.730);
const vec3 SAND     = vec3(0.925, 0.820, 0.620);

void main() {
  vec2 uv = vUv;

  // ---------- Vignette suave ----------
  float vignette = smoothstep(1.15, 0.25, length(uv - 0.5));

  // ---------- Gradiente vertical base (navy abisal → navy elevado arriba) ----------
  vec3 gradient = mix(ABYSSAL, DEEP, uv.y);

  // ---------- Edge glow superior (luz cenital sugerida) ----------
  // El borde de arriba recibe un boost de IONIZED tenue, suficiente para que el ojo
  // ubique de dónde viene la "luz" sin gritar.
  float topGlow = smoothstep(0.55, 1.0, uv.y) * 0.18;
  gradient += IONIZED * topGlow;

  // ---------- Caustics simulados ----------
  // sin/cos cruzados con frecuencias diferentes generan el patrón clásico de
  // refracción de luz al fondo de una piscina iluminada desde arriba.
  float caustics = sin(uv.x * 32.0 + uTime * 0.6) * cos(uv.y * 38.0 - uTime * 0.4);
  caustics = smoothstep(0.55, 0.95, caustics);
  gradient += IONIZED * caustics * 0.10 * (0.4 + 0.6 * uv.y);

  // ---------- Crestas iluminadas por elevación del vertex ----------
  float crest = smoothstep(-0.1, 0.7, vElevation);
  gradient = mix(gradient, IONIZED * 0.95, crest * 0.55);

  // ---------- Mouse spot (núcleo + halo concéntrico pulsante) ----------
  vec2 mouseUv = uMouse * 0.5 + 0.5;
  float mouseDist = distance(uv, mouseUv);

  // Núcleo del spot — radio cercano, intensidad alta
  float mouseCore = exp(-mouseDist * 4.0);
  gradient += IONIZED * mouseCore * 0.55;

  // Halo concéntrico que pulsa cada ~4 segundos (anillo de luz emergente)
  float ringPulse = fract(uTime * 0.25); // 0..1 cada 4s
  float ringRadius = ringPulse * 0.35;
  float ringWidth = 0.04;
  float ring = smoothstep(ringRadius - ringWidth, ringRadius, mouseDist) *
               (1.0 - smoothstep(ringRadius, ringRadius + ringWidth, mouseDist));
  // Fade del anillo conforme se expande (más sutil al final)
  ring *= (1.0 - ringPulse) * 0.8;
  gradient += IONIZED * ring;

  // ---------- Halo del scroll progress (sale del centro de la pantalla) ----------
  float ionGlow = smoothstep(0.5, 1.0, uScrollProgress);
  vec3 ionHalo = IONIZED * (0.22 + 0.38 * ionGlow);
  float ionMask = smoothstep(0.85, 0.15, length(uv - 0.5));
  gradient += ionHalo * ionMask * (0.35 + 0.6 * ionGlow);

  // ---------- Estela mineral dorada durante la fase de conversión ----------
  float mineralPulse = smoothstep(0.25, 0.65, uScrollProgress) *
                       (1.0 - smoothstep(0.65, 0.95, uScrollProgress));
  float mineralStripes = sin(uv.y * 60.0 + uTime * 0.4) * 0.5 + 0.5;
  gradient += SAND * mineralStripes * mineralPulse * 0.10;

  // ---------- Vignette aplicado al final ----------
  gradient *= mix(0.62, 1.0, vignette);

  // ---------- Micro-burbujas H₂ ----------
  // Aleatorias en el viewport, sólo activas en la fase de ionización (uScrollProgress > 0.5)
  float bubbleSeed = fract(sin(dot(uv * 250.0, vec2(12.9898, 78.233)) + uTime * 1.8) * 43758.5453);
  float bubbles = step(0.982, bubbleSeed);
  gradient += vec3(0.6, 1.0, 0.95) * bubbles * ionGlow * 0.7;

  // ---------- Alpha: alta cobertura (canvas se SIENTE como fondo) ----------
  // El edge fade existe pero arranca más arriba y se mantiene robusto en el centro.
  float edgeFade = smoothstep(0.0, 0.08, uv.y) *
                   smoothstep(1.0, 0.92, uv.y) *
                   smoothstep(0.0, 0.06, uv.x) *
                   smoothstep(1.0, 0.94, uv.x);

  float alpha = edgeFade * (0.92 + 0.06 * ionGlow);

  gl_FragColor = vec4(gradient, alpha);
}
`;
