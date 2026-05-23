"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { WaterParallaxBackground } from "@/components/ui/WaterParallaxBackground";

const AssemblyScene = dynamic(
  () => import("@/components/3d/scenes/AssemblyScene").then((m) => m.AssemblyScene),
  { ssr: false },
);

/**
 * CTA Section · cierre comercial antes del footer.
 *
 * - Split asimétrico con AssemblyScene 3D interactivo.
 * - OrbitControls integrados para rotar libremente con el cursor.
 * - Etiquetas flotantes de indicación interactiva.
 * - Botón secundario con hover magnético/escala de Framer Motion.
 */

export function CTASection() {
  const t = useTranslations("cta");
  const tLead = useTranslations("lead_form");
  const reduced = useReducedMotion();
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <section
      id="cta"
      aria-labelledby="cta-headline"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-elevated)",
        borderTop: "1px solid var(--color-border-subtle)",
      }}
    >
      <WaterParallaxBackground />
      <div className="container-content relative z-10 grid grid-cols-1 gap-12 py-24 md:grid-cols-12 md:py-32">
        {/* Lado izquierdo: Textos y botones */}
        <div className="md:col-span-7 md:self-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
            className="mb-4 inline-block text-xs uppercase"
            style={{
              letterSpacing: "var(--tracking-wide)",
              color: "var(--color-accent-primary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {t("eyebrow")}
          </motion.span>

          <motion.h2
            id="cta-headline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
            className="mb-6 text-balance"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5.5vw, var(--text-6xl))",
              lineHeight: "var(--leading-heading)",
              letterSpacing: "var(--tracking-tighter)",
              fontWeight: 600,
            }}
          >
            {t("headline_a")}{" "}
            <span style={{ color: "var(--color-accent-primary)" }} className="glow-cyan">
              {t("headline_accent")}
            </span>{" "}
            {t("headline_b")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0, 0, 1] }}
            className="mb-10 max-w-xl text-pretty"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--leading-body)",
              color: "var(--color-fg-secondary)",
            }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0, 0, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <ShimmerButton asAnchor href="#contact">
              {tLead("submit")}
            </ShimmerButton>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#osmosis"
              className="cursor-pointer rounded-full border px-8 py-4 font-medium transition-[background-color,border-color,color]"
              style={{
                borderColor: "var(--color-border-strong)",
                color: "var(--color-fg-primary)",
                fontFamily: "var(--font-body)",
                backgroundColor: "rgba(15, 30, 60, 0.35)",
                backdropFilter: "blur(8px)",
                transitionDuration: "var(--duration-base)",
                transitionTimingFunction: "var(--ease-standard)",
              }}
            >
              {t("cta_secondary")} ↑
            </motion.a>
          </motion.div>
        </div>

        {/* Lado derecho: Ensamble 3D interactivo */}
        <div className="md:col-span-5 md:col-start-8">
          <div
            className="relative aspect-square overflow-hidden border"
            style={{
              borderColor: "var(--color-border-subtle)",
              borderRadius: "var(--radius-2xl)",
              background:
                "radial-gradient(circle at 50% 40%, color-mix(in oklch, var(--color-accent-primary) 10%, var(--color-bg-base)) 0%, var(--color-bg-base) 75%)",
            }}
          >
            {/* Tag indicador flotante */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
              </span>
              <span
                className="font-mono tracking-wider uppercase"
                style={{ fontSize: "var(--text-nano)", color: "var(--color-fg-secondary)" }}
              >
                {t("tag_3d")}
              </span>
            </div>

            {/* Toggle de AutoRotación */}
            {!reduced && (
              <button
                type="button"
                onClick={() => setAutoRotate(!autoRotate)}
                className="hover:text-fg-primary absolute right-4 bottom-4 z-10 cursor-pointer rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-mono tracking-wider uppercase backdrop-blur-md transition-colors"
                style={{ fontSize: "var(--text-nano)", color: "var(--color-fg-secondary)" }}
                aria-pressed={autoRotate}
                aria-label={t("tag_3d_pause")}
              >
                {t("tag_3d_pause")} · {autoRotate ? "ON" : "OFF"}
              </button>
            )}

            {reduced ? (
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "5rem",
                  color: "var(--color-accent-primary)",
                  fontWeight: 200,
                }}
              >
                ⌬
              </div>
            ) : (
              <Suspense fallback={null}>
                <div aria-hidden="true" className="absolute inset-0">
                  <Canvas
                    camera={{ position: [0, 0, 5.2], fov: 38 }}
                    dpr={[1, 2]}
                    gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                  >
                    <OrbitControls
                      enableZoom={false}
                      enablePan={false}
                      autoRotate={autoRotate}
                      autoRotateSpeed={1.5}
                    />
                    <AssemblyScene />
                  </Canvas>
                </div>
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
