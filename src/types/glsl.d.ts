/**
 * Type definitions para imports de shaders GLSL con la query `?raw`.
 *
 * El loader está configurado en next.config.ts con `asset/source` para
 * `resourceQuery: /raw/`, lo que devuelve el contenido como string.
 *
 * Uso:
 *   import vertexShader from "./shader.glsl?raw";
 *   // vertexShader: string
 */

declare module "*.glsl?raw" {
  const content: string;
  export default content;
}

declare module "*.vert?raw" {
  const content: string;
  export default content;
}

declare module "*.frag?raw" {
  const content: string;
  export default content;
}
