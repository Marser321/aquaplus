"use client";

/**
 * WaterParallaxBackground - Versión ultra-ligera y optimizada para rendimiento (GPU accelerated).
 *
 * - Elimina todos los listeners de scroll de JS, transformaciones de Framer Motion y resortes.
 * - Utiliza gradientes de fondo estáticos nativos y burbujas aceleradas por hardware (translate3d + will-change).
 * - Garantiza un rendimiento de scroll nativo a 60fps en dispositivos móviles y de escritorio.
 */
export function WaterParallaxBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
      style={{
        // Dos halos radiales muy suaves e integrados que dan color al fondo sin ralentizar
        background: `
          radial-gradient(circle at 15% 20%, oklch(72% 0.13 175 / 0.05) 0%, transparent 45%),
          radial-gradient(circle at 85% 75%, oklch(72% 0.13 175 / 0.03) 0%, transparent 50%)
        `,
      }}
    >
      {/* Estilos CSS locales para asegurar aceleración de hardware por GPU y cero repaints */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes floatBubble1 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(15px, -30px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes floatBubble2 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-20px, -25px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes floatBubble3 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(10px, -20px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .gpu-bubble {
          will-change: transform;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.08) 0%, rgba(114, 208, 175, 0.02) 70%, transparent 100%);
          border: 1px solid rgba(114, 208, 175, 0.08);
          box-shadow: inset 0 0 10px rgba(114, 208, 175, 0.03);
        }
      `,
        }}
      />

      {/* Burbujas estables aceleradas por hardware */}
      <div
        className="gpu-bubble absolute h-24 w-24 rounded-full"
        style={{
          left: "8%",
          top: "25%",
          animation: "floatBubble1 16s infinite ease-in-out",
        }}
      />
      <div
        className="gpu-bubble absolute h-32 w-32 rounded-full"
        style={{
          right: "10%",
          top: "15%",
          animation: "floatBubble2 20s infinite ease-in-out",
        }}
      />
      <div
        className="gpu-bubble absolute h-20 w-20 rounded-full"
        style={{
          left: "75%",
          bottom: "20%",
          animation: "floatBubble3 18s infinite ease-in-out",
        }}
      />
      <div
        className="gpu-bubble absolute h-16 w-16 rounded-full"
        style={{
          left: "25%",
          bottom: "15%",
          animation: "floatBubble1 22s infinite ease-in-out",
        }}
      />
    </div>
  );
}
