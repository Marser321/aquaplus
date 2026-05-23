"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { ScrollTrigger, registerGsapPlugins } from "@/lib/gsap/register";
import {
  osmosisProgressRef,
  activeStageRef,
  STORY_STAGE,
} from "@/components/3d/hooks/useScrollTimeline";
import { cn } from "@/lib/utils";

/**
 * Stage Ósmosis Inversa · Fase 1 del viaje molecular.
 *
 * Estructura:
 *   - Container `min-h-[300vh]` que ocupa scroll vertical largo.
 *   - Wrapper interno sticky `top-0 h-screen` que mantiene el contenido fijo.
 *   - Sidebar izquierda con eyebrow + headline + 3 milestones (PFAS / Heavy Metals
 *     / Microplastics blocked). Cada milestone se "activa" según scroll progress.
 *   - Quote del aval clínico al final de la fase.
 *   - El área 3D (canvas global) muestra las partículas chocando contra la membrana.
 *
 * Conexión 3D:
 *   - GSAP ScrollTrigger actualiza `osmosisProgressRef` (0..1) y `activeStageRef = 1`
 *     cuando la sección entra al viewport. OsmosisScene lee esos refs por frame.
 */

const MILESTONES = [
  { id: "pfas", numeral: "01" },
  { id: "metals", numeral: "02" },
  { id: "microplastics", numeral: "03" },
] as const;

export function StageOsmosis() {
  const t = useTranslations("stages.osmosis");
  const tCommon = useTranslations("stages.osmosis.milestones");
  const tEndorsement = useTranslations("endorsement_quote_hero");
  const containerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

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
          activeStageRef.current = STORY_STAGE.osmosis;
        },
        onEnterBack: () => {
          activeStageRef.current = STORY_STAGE.osmosis;
        },
        onLeaveBack: () => {
          if (activeStageRef.current === STORY_STAGE.osmosis) {
            activeStageRef.current = STORY_STAGE.hero;
          }
          osmosisProgressRef.current = 0;
        },
        onUpdate: (self) => {
          osmosisProgressRef.current = self.progress;
          // Active milestone follows progress: 0-33% → milestone 0, 33-66% → 1, 66-100% → 2
          const idx = Math.min(2, Math.floor(self.progress * 3));
          setActiveIndex((current) => (current === idx ? current : idx));
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
      id="osmosis"
      className={reduced ? "relative overflow-hidden" : "relative min-h-[300vh] overflow-hidden"}
      aria-labelledby="osmosis-headline"
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
          {/* Sidebar narrativa */}
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
              id="osmosis-headline"
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
              className="mb-12 max-w-xl text-pretty"
              style={{
                fontSize: "var(--text-lg)",
                lineHeight: "var(--leading-body)",
                color: "var(--color-fg-secondary)",
              }}
            >
              {t("lede")}
            </motion.p>

            {/* 3 milestones que se activan con el scroll */}
            <ol className="space-y-6">
              {MILESTONES.map((m, i) => {
                const isActive = !reduced ? activeIndex === i : true;
                const isPast = !reduced ? activeIndex > i : true;
                return (
                  <li
                    key={m.id}
                    className={cn(
                      "grid grid-cols-[3rem_1fr] items-baseline gap-4 transition-[opacity,color]",
                    )}
                    style={{
                      transitionDuration: "var(--duration-base)",
                      transitionTimingFunction: "var(--ease-standard)",
                      opacity: isActive || isPast ? 1 : 0.42,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-base)",
                        color: isActive ? "var(--color-accent-primary)" : "var(--color-fg-muted)",
                        letterSpacing: "var(--tracking-data)",
                        fontWeight: 500,
                      }}
                    >
                      {m.numeral}
                    </span>
                    <div>
                      <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "var(--text-xl)",
                            lineHeight: "var(--leading-tight)",
                            color: isActive
                              ? "var(--color-fg-primary)"
                              : "var(--color-fg-secondary)",
                            fontWeight: 600,
                            letterSpacing: "var(--tracking-tight)",
                          }}
                        >
                          {tCommon(`${m.id}.title`)}
                        </h3>
                        {/* Mini-stat rejection rate · [VERIFY: rangos específicos equipo cliente] */}
                        <span
                          aria-label={t("milestone_metric_label")}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-xs)",
                            color: isActive
                              ? "var(--color-accent-primary)"
                              : "var(--color-fg-muted)",
                            letterSpacing: "var(--tracking-data)",
                            fontWeight: 600,
                            fontVariantNumeric: "tabular-nums",
                            padding: "0.15rem 0.5rem",
                            borderRadius: "var(--radius-pill)",
                            border: `1px solid ${isActive ? "var(--color-accent-primary)" : "var(--color-border-subtle)"}`,
                            transition:
                              "color var(--duration-base), border-color var(--duration-base)",
                          }}
                        >
                          {tCommon(`${m.id}.rejection`)}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--color-fg-muted)",
                          lineHeight: "var(--leading-body)",
                          maxWidth: "32ch",
                        }}
                      >
                        {tCommon(`${m.id}.description`)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Quote del aval clínico · derecha · aparece más al final del scroll */}
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
              className="card-quote"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-lg)",
                lineHeight: "var(--leading-body)",
                color: "var(--color-fg-primary)",
                fontStyle: "italic",
                opacity: 0.92,
              }}
            >
              &ldquo;{t("endorsement_quote")}&rdquo;
              <footer
                className="mt-4 not-italic"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-fg-muted)",
                  letterSpacing: "var(--tracking-wide)",
                  textTransform: "uppercase",
                }}
              >
                — {tEndorsement("attribution_name")} · {tEndorsement("attribution_role")}
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
