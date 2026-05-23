/**
 * Shaders del Stage Ósmosis Inversa · Aqua+ Systems
 *
 *  - membraneVertex   · plano estático, pasa UV al fragment.
 *  - membraneFragment · cuadrícula hexagonal con "poros" pulsantes en teal.
 *                       Representa la membrana semipermeable de 0.1 nm.
 *
 * Uniforms:
 *   uTime, uOsmosisProgress (0..1)
 *
 * Notas:
 *   - El shader simula hexágonos via fract() + distancia al centro de la celda.
 *   - Los "poros" pulsan en luminancia para sugerir actividad.
 */

export const membraneVertex = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const membraneFragment = `
uniform float uTime;
uniform float uOsmosisProgress;

varying vec2 vUv;

const vec3 NAVY    = vec3(0.040, 0.073, 0.155);
const vec3 IONIZED = vec3(0.040, 0.770, 0.730);
const vec3 DEEP    = vec3(0.085, 0.145, 0.240);

// Cuadrícula hexagonal · devuelve distancia al centro del hex más cercano.
float hexDist(vec2 p) {
  p = abs(p);
  float c = max(p.x * 0.866025 + p.y * 0.5, p.y);
  return c;
}

vec4 hexCoords(vec2 uv) {
  vec2 r = vec2(1.0, 1.7320508); // 1, sqrt(3)
  vec2 h = r * 0.5;
  vec2 a = mod(uv, r) - h;
  vec2 b = mod(uv - h, r) - h;
  vec2 gv = dot(a, a) < dot(b, b) ? a : b;
  float dist = hexDist(gv);
  return vec4(dist, gv.x, gv.y, 0.0);
}

void main() {
  vec2 uv = vUv - 0.5;
  uv *= 14.0; // densidad de hexágonos

  vec4 hc = hexCoords(uv);
  float dist = hc.x;

  // Borde del hexágono (luz teal en los bordes, oscuro en el centro = "poro")
  float edge = smoothstep(0.46, 0.50, dist);
  float core = 1.0 - smoothstep(0.0, 0.30, dist);

  // Pulso temporal: los poros se "activan" en intervalos aleatorios por celda
  float cellHash = fract(sin(dot(floor(uv), vec2(12.9898, 78.233))) * 43758.5453);
  float pulse = sin(uTime * 1.2 + cellHash * 6.2831) * 0.5 + 0.5;
  pulse = smoothstep(0.3, 0.9, pulse);

  // Resultado: fondo oscuro + bordes teal + núcleos pulsantes en navy claro
  vec3 col = NAVY;
  col = mix(col, IONIZED, edge * (0.6 + 0.4 * pulse));
  col = mix(col, DEEP, core * 0.8);

  // Vignette suave hacia los bordes del plano
  float vig = smoothstep(0.85, 0.2, length(vUv - 0.5));
  col *= mix(0.5, 1.0, vig);

  // Intensidad global driven por scroll progress
  float intensity = 0.4 + 0.6 * uOsmosisProgress;
  col *= intensity;

  // Alpha decae en los bordes del plano para que se funda con el background
  float alpha = vig * (0.85 + 0.1 * uOsmosisProgress);
  gl_FragColor = vec4(col, alpha);
}
`;
