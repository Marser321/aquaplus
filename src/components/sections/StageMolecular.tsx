"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { ScrollTrigger, registerGsapPlugins } from "@/lib/gsap/register";
import {
  molecularProgressRef,
  activeStageRef,
  STORY_STAGE,
} from "@/components/3d/hooks/useScrollTimeline";
import { NumberTicker } from "@/components/ui/NumberTicker";

/**
 * Stage Reestructuración Molecular · Fase 3 del viaje molecular.
 *
 * Sidebar con:
 *   - Eyebrow + headline + lede.
 *   - Grilla informativa sobre estructuras de racimos de agua.
 *   - Tamaño de clúster live (12-14 H₂O → 6 H₂O hexagonales).
 *   - Alineación estructural live (0% → 99.8%).
 */

export function StageMolecular() {
  const t = useTranslations("stages.molecular");
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
          activeStageRef.current = STORY_STAGE.molecular;
        },
        onEnterBack: () => {
          activeStageRef.current = STORY_STAGE.molecular;
        },
        onLeaveBack: () => {
          molecularProgressRef.current = 0;
        },
        onUpdate: (self) => {
          molecularProgressRef.current = self.progress;
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
      id="molecular"
      className={reduced ? "relative overflow-hidden" : "relative min-h-[300vh] overflow-hidden"}
      aria-labelledby="molecular-headline"
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
          {/* Sidebar */}
          <div className="story-copy-shell md:col-span-6 md:col-start-1">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
              className="mb-4 inline-block text-xs uppercase"
              style={{
                letterSpacing: "var(--tracking-wide)",
                color: "var(--color-accent-primary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {t("phase_label")}
            </motion.span>

            <motion.h2
              id="molecular-headline"
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

            {/* Información cristalina */}
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
                {"Hexagonal Ring Structuring: "}
                <span style={{ color: "var(--color-accent-primary)" }}>(H₂O)₆</span>
                {" arrangement"}
              </p>
            </div>

            {/* Cluster size + Alignment live · usa .card-stat canónico */}
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
                  {t("metric_cluster_label")}
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
                  <NumberTicker value={6} from={14} decimals={0} suffix=" H₂O" driveBy={progress} />
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
                  {t("metric_alignment_label")}
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
                  <NumberTicker value={99.8} from={0} decimals={1} suffix="%" driveBy={progress} />
                </p>
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
