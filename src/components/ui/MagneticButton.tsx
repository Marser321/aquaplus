"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Magnetic wrapper · aplica una pequeña traslación al elemento siguiendo el cursor
 * cuando el mouse está cerca. Reduced-motion lo desactiva.
 *
 * Uso:
 *   <MagneticButton href="#contact" strength={0.3}>Schedule analysis</MagneticButton>
 */

interface MagneticProps {
  children: React.ReactNode;
  /** Multiplicador de movimiento (0..1). Default 0.25 = sutil. */
  strength?: number;
  /** Radio en px en el que el efecto se activa. Default 80. */
  radius?: number;
  className?: string;
  href: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  strength = 0.25,
  radius = 90,
  className,
  href,
  style,
  ariaLabel,
}: MagneticProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 200, damping: 18, mass: 0.6 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 18, mass: 0.6 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius) {
      const factor = 1 - dist / radius;
      x.set(dx * strength * factor);
      y.set(dy * strength * factor);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        x: reduced ? 0 : xSpring,
        y: reduced ? 0 : ySpring,
        display: "inline-flex",
        ...style,
      }}
      className={cn(className)}
      aria-label={ariaLabel}
    >
      {children}
    </motion.a>
  );
}
