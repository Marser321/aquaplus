"use client";

import { Canvas } from "@react-three/fiber";
import { StoryCameraRig, WaterScene, WebGLContextCleanup } from "./WaterScene";
import { usePrefersReducedMotion } from "./hooks/useReducedMotionFallback";

/**
 * Canvas WebGL del Hero · fondo cinemático de la página.
 *
 * Comportamiento:
 *   - Posición fixed, pointer-events: none, z: -10 → no captura clicks; el contenido
 *     del Hero se sienta encima sin interferir.
 *   - aria-hidden: true → el canvas es decorativo. El significado se transmite por el
 *     headline y el contenido textual del Hero (REQ-008).
 *   - prefers-reduced-motion: reduce → no monta el canvas, renderiza un fallback
 *     con gradient CSS estático que respeta la paleta del UI-SPEC.
 *
 * Cleanup vía `WebGLContextCleanup` (D-04).
 */
export function WaterCanvas() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <HeroStaticFallback />;
  }

  return (
    <div
      id="water-canvas-container"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 ease-in-out"
      style={{ willChange: "opacity" }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 35, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
      >
        <WebGLContextCleanup />
        <StoryCameraRig />
        <WaterScene />
      </Canvas>
    </div>
  );
}

/**
 * Fallback estático cuando el usuario tiene reduced-motion activo.
 * Cumple D-05: no es un afterthought; mantiene la dirección de arte (paleta dark + cian).
 */
function HeroStaticFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: [
          "radial-gradient(ellipse at 50% 30%, var(--color-accent-subtle) 0%, transparent 60%)",
          "linear-gradient(180deg, var(--color-bg-base) 0%, var(--color-bg-elevated) 100%)",
        ].join(", "),
      }}
    />
  );
}
