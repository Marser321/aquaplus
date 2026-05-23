"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * ShimmerButton · botón con un sweep gradient que pasa cada ~2s en estado idle.
 * Reduced-motion → sin shimmer, mantiene look base.
 */
type ShimmerButtonProps =
  | (ButtonHTMLAttributes<HTMLButtonElement> & {
      children: React.ReactNode;
      asAnchor?: false;
    })
  | (Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "color"> & {
      children: React.ReactNode;
      asAnchor: true;
    });

export function ShimmerButton(props: ShimmerButtonProps) {
  const reduced = useReducedMotion();
  // Strip asAnchor del spread para evitar pasarlo al DOM.
  const { children, className, ...rest } = props;
  const isAnchor = "asAnchor" in props && props.asAnchor === true;
  if ("asAnchor" in rest) {
    delete (rest as Record<string, unknown>).asAnchor;
  }

  const baseClass = cn(
    "relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 font-medium transition-[background-color,box-shadow,opacity,transform]",
    className,
  );
  const baseStyle: React.CSSProperties = {
    backgroundColor: "var(--color-accent-primary)",
    color: "var(--color-fg-on-accent)",
    fontFamily: "var(--font-body)",
    transitionDuration: "var(--duration-base)",
    transitionTimingFunction: "var(--ease-standard)",
    boxShadow: "var(--shadow-glow)",
    isolation: "isolate",
  };

  const shimmer = !reduced && (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0"
      style={{
        width: "60%",
        background:
          "linear-gradient(110deg, transparent 0%, color-mix(in oklch, white 70%, transparent) 50%, transparent 100%)",
        mixBlendMode: "overlay",
        zIndex: 1,
      }}
      initial={{ x: "-120%" }}
      animate={{ x: "200%" }}
      transition={{
        repeat: Infinity,
        duration: 2.4,
        ease: "linear",
        repeatDelay: 1.2,
      }}
    />
  );

  if (isAnchor) {
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...anchorProps}
        className={baseClass}
        style={{ ...baseStyle, ...(anchorProps.style ?? {}) }}
      >
        {shimmer}
        <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      {...buttonProps}
      className={baseClass}
      style={{ ...baseStyle, ...(buttonProps.style ?? {}) }}
    >
      {shimmer}
      <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
    </button>
  );
}
