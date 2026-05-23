"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Registra ScrollTrigger una sola vez en el cliente.
 * Llamar al montar el LenisProvider (efecto idempotente).
 * Server-safe: noop si window no existe.
 */
export function registerGsapPlugins(): void {
  if (typeof window === "undefined") return;
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };
