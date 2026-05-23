"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { ScrollTrigger, registerGsapPlugins } from "@/lib/gsap/register";
import {
  conversionProgressRef,
  activeStageRef,
  STORY_STAGE,
} from "@/components/3d/hooks/useScrollTimeline";
import { NumberTicker } from "@/components/ui/NumberTicker";

/**
 * Stage Conversión Inversa · Fase 2 del viaje molecular.
 *
 * Sidebar con:
 *   - Eyebrow + headline + lede.
 *   - Ecuación química balanceada en mono.
 *   - pH live driven by scroll progress (5.8 → 7.4).
 *   - Quote del endorsement clínico.
 */

export function StageConversion() {
  const t = useTranslations("stages.conversion");
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
          activeStageRef.current = STORY_STAGE.conversion;
        },
        onEnterBack: () => {
          activeStageRef.current = STORY_STAGE.conversion;
        },
        onLeaveBack: () => {
          conversionProgressRef.current = 0;
        },
        onUpdate: (self) => {
          conversionProgressRef.current = self.progress;
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

  return (
    <section
      ref={containerRef}
      id="conversion"
      className={reduced ? "relative overflow-hidden" : "relative min-h-[300vh] overflow-hidden"}
      aria-labelledby="conversion-headline"
    >
      <div
        aria-hidden="true"
        className="section-readable-scrim-right pointer-events-none absolute inset-0 z-[1]"
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
          {/* Sidebar — cambia a la derecha (asimetría editorial) */}
          <div className="story-copy-shell story-copy-shell-right md:col-span-6 md:col-start-7">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
              className="mb-4 inline-block text-xs uppercase"
              style={{
                letterSpacing: "var(--tracking-wide)",
                color: "var(--color-mineral-gold)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {t("phase_label")}
            </motion.span>

            <motion.h2
              id="conversion-headline"
              initial={{ opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
              className="mb-6 text-balance"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, var(--text-5xl))",
                lineHeight: "var(--leading-heading)",
                letterSpacing: "var(--tracking-tighter)",
                fontWeight: 600,
              }}
            >
              {t("headline")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0, 0, 1] }}
              className="mb-8 max-w-xl text-pretty"
              style={{
                fontSize: "var(--text-lg)",
                lineHeight: "var(--leading-body)",
                color: "var(--color-fg-secondary)",
              }}
            >
              {t("lede")}
            </motion.p>

            {/* Ecuación química balanceada */}
            <div
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
                {t("equation_label")}
              </p>
              <p style={{ lineHeight: 1.5 }}>
                <span style={{ color: "var(--color-mineral-gold)" }}>CaCO₃</span>
                {" + H₂O + CO₂ ⇌ "}
                <span style={{ color: "var(--color-accent-primary)" }}>Ca²⁺</span>
                {" + 2HCO₃⁻"}
              </p>
            </div>

            {/* pH live driven by scroll progress · usa .card-stat canónico */}
            <div className="card-stat mb-10 grid grid-cols-2 gap-6">
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
                  {t("metric_ph_label")}
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
                  <NumberTicker value={7.4} from={5.8} decimals={1} driveBy={progress} />
                </p>
              </div>
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
                  {t("metric_tds_label")}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-4xl)",
                    color: "var(--color-mineral-gold)",
                    letterSpacing: "var(--tracking-data)",
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: 1,
                  }}
                >
                  <NumberTicker value={70} from={0} suffix=" mg/L" driveBy={progress} />
                </p>
              </div>
            </div>

            <motion.blockquote
              initial={{ opacity: 0, y: 18 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
              className="card-quote card-quote--warm"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-base)",
                lineHeight: "var(--leading-body)",
                color: "var(--color-fg-primary)",
                fontStyle: "italic",
                opacity: 0.92,
                maxWidth: "38ch",
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
