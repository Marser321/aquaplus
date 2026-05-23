"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Marquee · loop infinito horizontal accesible.
 *
 * Implementación: dos copias del contenido side-by-side animadas por CSS
 * `animation: marquee` (definida inline). El segundo set tiene `aria-hidden`
 * para evitar lectura duplicada en screen readers.
 *
 * Reduced-motion: la animación se detiene; el contenido queda estático.
 */
interface MarqueeProps {
  children: ReactNode;
  /** Velocidad en segundos (ciclo completo). Default 30s. Más bajo = más rápido. */
  speed?: number;
  /** Pausar on hover */
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({ children, speed = 30, pauseOnHover = true, className }: MarqueeProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn("relative flex w-full overflow-hidden", className)}
      style={{
        // Mask sutil en bordes para sugerir continuidad
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <style>{`
        @keyframes marquee-x {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-x ${speed}s linear infinite;
        }
        ${pauseOnHover ? ".marquee-host:hover .marquee-track { animation-play-state: paused; }" : ""}
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; transform: none !important; }
        }
      `}</style>
      <div className={cn("marquee-host w-full")} style={{ display: "flex" }}>
        <div
          className={reduced ? "" : "marquee-track"}
          style={{ display: "flex", flexShrink: 0, gap: 0 }}
        >
          <div className="flex shrink-0 items-center">{children}</div>
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
