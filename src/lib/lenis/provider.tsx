"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger, registerGsapPlugins, gsap } from "@/lib/gsap/register";

/**
 * Provider global de Lenis (scroll inercial suavizado).
 *
 * Decisiones referenciadas:
 *   - D-02: Lenis es la única lib de smooth scroll del proyecto.
 *   - D-05: prefers-reduced-motion desactiva Lenis y deja scroll nativo.
 *
 * Sincroniza con GSAP ScrollTrigger.update para que los pinning + scrub queden
 * perfectamente alineados con la posición de scroll interpolada.
 *
 * No hidrata UI; solo monta el motor. Renderiza children sin envolver.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Scroll nativo, sin Lenis. Cumple D-05.
      return;
    }

    registerGsapPlugins();

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Wheel + touch unificados (Lenis 1.1+).
      smoothWheel: true,
      // touchMultiplier por defecto está bien para mobile.
    });

    // Sincronización con GSAP ScrollTrigger (scrub timelines).
    lenis.on("scroll", ScrollTrigger.update);

    // Driver con el ticker de GSAP (sin doble requestAnimationFrame).
    const tick = (time: number) => {
      // gsap.ticker entrega tiempo en segundos; Lenis espera milisegundos.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
