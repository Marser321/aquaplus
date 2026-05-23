"use client";

import { useEffect, useState } from "react";

/**
 * Hook que devuelve true cuando el usuario tiene `prefers-reduced-motion: reduce`.
 * Reactivo: si el usuario cambia la preferencia en tiempo real, el componente recibe el update.
 * Server-safe: en SSR devuelve `false` por default; el cliente lo corrige en el primer effect.
 *
 * Decisión referenciada: D-05 (reduced-motion first-class).
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}
