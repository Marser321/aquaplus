"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { ScrollTrigger, registerGsapPlugins } from "@/lib/gsap/register";
import {
  ionizationProgressRef,
  activeStageRef,
  STORY_STAGE,
} from "@/components/3d/hooks/useScrollTimeline";
import { NumberTicker } from "@/components/ui/NumberTicker";

/**
 * Stage Ionización Electrolítica y Salud Celular · Fase 4 del viaje molecular.
 *
 * Esta sección es de DOBLE ALTURA (min-h-[600vh]) y combina dos secuencias celulares:
 *   - Primera mitad (0.0 - 0.5): Hidratación Celular Profunda (Secuencia 3).
 *   - Segunda mitad (0.5 - 1.0): Escudo Antioxidante Celular (Secuencia 5).
 *
 * La sidebar cambia dinámicamente sus textos y fórmulas químicas a mitad de camino.
 */

export function StageIonization() {
  const t = useTranslations("stages.ionization");
  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      if (reduced) return;
      if (!containerRef.current) return;
      registerGsapPlugins();

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        scrub: 1.2,
        onEnter: () => {
          activeStageRef.current = STORY_STAGE.ionization;
        },
        onEnterBack: () => {
          activeStageRef.current = STORY_STAGE.ionization;
        },
        onLeaveBack: () => {
          ionizationProgressRef.current = 0;
        },
        onUpdate: (self) => {
          ionizationProgressRef.current = self.progress;
          setProgress((current) =>
            Math.abs(current - self.progress) > 0.015 ? self.progress : current,
          );
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { dependencies: [reduced] },
  );

  const isSecondHalf = progress >= 0.5;

  return (
    <section
      ref={containerRef}
      id="ionization"
      className={reduced ? "relative overflow-hidden" : "relative min-h-[600vh] overflow-hidden"}
      aria-labelledby="ionization-headline"
    >
      <div
        aria-hidden="true"
        className="section-readable-scrim pointer-events-none absolute inset-0 z-[1]"
      />
      <div
        ref={contentRef}
        className={
          reduced
            ? "container-content relative z-10 py-24"
            : "relative z-10 flex min-h-screen items-center"
        }
      >
        <div className="container-content grid w-full grid-cols-1 gap-12 md:grid-cols-12">
          <div className="story-copy-shell md:col-span-6 md:col-start-1">
            <div className="story-block-soft">
              <motion.span
                key={isSecondHalf ? "phase-label-def" : "phase-label-hydra"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 inline-block text-xs uppercase"
                style={{
                  letterSpacing: "var(--tracking-wide)",
                  color: "var(--color-accent-primary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {isSecondHalf ? t("phase_label_def") : t("phase_label_hydra")}
              </motion.span>

              <motion.h2
                id="ionization-headline"
                key={isSecondHalf ? "headline-def" : "headline-hydra"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                className="mb-6 text-balance"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 5vw, var(--text-5xl))",
                  lineHeight: "var(--leading-heading)",
                  letterSpacing: "var(--tracking-tighter)",
                  fontWeight: 600,
                }}
              >
                {isSecondHalf ? t("headline_def") : t("headline_hydra")}
              </motion.h2>

              <motion.p
                key={isSecondHalf ? "lede-def" : "lede-hydra"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.2, 0, 0, 1] }}
                className="max-w-xl text-pretty md:mb-8"
                style={{
                  fontSize: "var(--text-lg)",
                  lineHeight: "var(--leading-body)",
                  color: "var(--color-fg-secondary)",
                }}
              >
                {isSecondHalf ? t("lede_def") : t("lede_hydra")}
              </motion.p>
            </div>

            <div className="story-block-data mb-10">
              {/* Ecuación dinámica */}
              <motion.div
                key={isSecondHalf ? "equation-def" : "equation-hydra"}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-8 border px-5 py-4"
                style={{
                  borderColor: "var(--color-border-subtle)",
                  borderRadius: "var(--radius-xl)",
                  backgroundColor: "color-mix(in oklch, var(--color-bg-base) 65%, transparent)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-base)",
                  letterSpacing: "var(--tracking-data)",
                  color: "var(--color-fg-primary)",
                }}
              >
                <p
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-fg-muted)",
                    marginBottom: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-wide)",
                  }}
                >
                  {isSecondHalf ? t("equation_title_def") : t("equation_title_hydra")}
                </p>
                <p style={{ lineHeight: 1.5 }}>
                  {isSecondHalf ? (
                    <>
                      {"H• + •OH → "}
                      <span style={{ color: "var(--color-accent-primary)" }}>H₂O</span>
                      {" (neutralization)"}
                    </>
                  ) : (
                    <>
                      {"2H₂O + 2e⁻ → "}
                      <span style={{ color: "var(--color-accent-primary)" }}>H₂(g)</span>
                      {" + 2OH⁻"}
                    </>
                  )}
                </p>
              </motion.div>

              {/* ORP + H₂ / Escudo live · usa .card-stat canónico */}
              <div className="card-stat grid grid-cols-2 gap-6">
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-fg-muted)",
                      letterSpacing: "var(--tracking-wide)",
                      textTransform: "uppercase",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {t("metric_orp_label")}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-4xl)",
                      color: "var(--color-accent-primary)",
                      letterSpacing: "var(--tracking-data)",
                      fontVariantNumeric: "tabular-nums",
                      lineHeight: 1,
                    }}
                  >
                    {isSecondHalf ? (
                      "-350 mV"
                    ) : (
                      <NumberTicker value={-350} from={0} suffix=" mV" driveBy={progress * 2} />
                    )}
                  </p>
                </div>

                <div>
                  <p
                    key={isSecondHalf ? "lbl-shield" : "lbl-hydra"}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-fg-muted)",
                      letterSpacing: "var(--tracking-wide)",
                      textTransform: "uppercase",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {isSecondHalf ? t("indicator_def") : t("indicator_hydra")}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-4xl)",
                      color: "var(--color-accent-primary)",
                      letterSpacing: "var(--tracking-data)",
                      fontVariantNumeric: "tabular-nums",
                      lineHeight: 1,
                    }}
                  >
                    {isSecondHalf ? (
                      <NumberTicker
                        value={99.9}
                        from={0}
                        decimals={1}
                        suffix="%"
                        driveBy={(progress - 0.5) * 2}
                      />
                    ) : (
                      <NumberTicker
                        value={1.2}
                        from={0}
                        decimals={1}
                        suffix=" ppm"
                        driveBy={progress * 2}
                      />
                    )}
                  </p>
                </div>
              </div>
            </div>

            <motion.blockquote
              initial={{ opacity: 0, y: 18 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
              className="card-quote"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-base)",
                lineHeight: "var(--leading-body)",
                color: "var(--color-fg-primary)",
                fontStyle: "italic",
                opacity: 0.92,
                maxWidth: "40ch",
              }}
            >
              &ldquo;{t("endorsement_quote")}&rdquo;
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
