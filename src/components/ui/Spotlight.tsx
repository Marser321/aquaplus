"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Spotlight follow · halo radial teal sutil que sigue al cursor.
 *
 * Decisión referenciada: D-05 (reduced-motion first-class) y D-17 (paleta brand).
 *
 * - Renderiza un div absoluto con `radial-gradient` cuyo centro es controlado por
 *   `useMotionValue` interpolado con spring para suavizado.
 * - Cuando `prefers-reduced-motion: reduce`, el spotlight queda centrado y estático.
 * - `pointer-events: none` para no interferir con la interacción del contenido debajo.
 */
export function Spotlight({
  className,
  intensity = 0.45,
}: {
  className?: string;
  intensity?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 60, damping: 25, mass: 0.6 });
  const ySpring = useSpring(y, { stiffness: 60, damping: 25, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    const el = containerRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    const onLeave = () => {
      const rect = el.getBoundingClientRect();
      x.set(rect.width / 2);
      y.set(rect.height / 2);
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    // Init centered
    const rect = el.getBoundingClientRect();
    x.set(rect.width / 2);
    y.set(rect.height / 2);

    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, x, y]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        className="absolute"
        style={{
          x: reduced ? "50%" : xSpring,
          y: reduced ? "50%" : ySpring,
          translateX: "-50%",
          translateY: "-50%",
          width: "60vw",
          maxWidth: "900px",
          aspectRatio: "1 / 1",
          background: `radial-gradient(circle at center, color-mix(in oklch, var(--color-accent-primary) ${Math.round(
            intensity * 100,
          )}%, transparent) 0%, transparent 60%)`,
          filter: "blur(30px)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
