"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * NumberTicker · animación del contador desde `from` hasta `value` cuando el
 * elemento entra al viewport. Reducido a snap directo con prefers-reduced-motion.
 *
 * Props:
 *   - value: número final.
 *   - from?: valor inicial (default 0).
 *   - decimals?: cantidad de decimales (default 0).
 *   - durationMs?: duración de la animación (default 1200).
 *   - prefix? / suffix?: strings opcionales.
 *
 * También expone modo "driven" via `driveBy` (number entre 0 y 1) que mapea
 * `from → value` linealmente. Útil para conectar a `scrollProgress` y animar
 * el counter conforme el usuario scrollea (sin esperar al viewport).
 */
interface NumberTickerProps {
  value: number;
  from?: number;
  decimals?: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  driveBy?: number; // 0..1 — si está presente, ignora el viewport y mapea linearmente.
}

export function NumberTicker({
  value,
  from = 0,
  decimals = 0,
  durationMs = 1200,
  prefix = "",
  suffix = "",
  className,
  driveBy,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    // Modo "driven": mapeo directo del valor externo.
    if (typeof driveBy === "number") {
      const t = Math.min(1, Math.max(0, driveBy));
      setDisplay(from + (value - from) * t);
      return;
    }

    // Modo "in-view": animación una vez al entrar.
    if (!isInView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      // EaseOut cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (value - from) * eased);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, reduced, value, from, durationMs, driveBy]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
