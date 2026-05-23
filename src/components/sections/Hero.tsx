"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { ScrollTrigger, registerGsapPlugins } from "@/lib/gsap/register";
import {
  activeStageRef,
  scrollProgressRef,
  STORY_STAGE,
} from "@/components/3d/hooks/useScrollTimeline";
import { BrandWordmark } from "@/components/brand/BrandWordmark";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TAGLINE } from "@/lib/brand";

/**
 * Hero · pieza cinemática de apertura del scrollytelling (T-5).
 *
 * Comportamiento:
 *   - Container `min-h-[200vh]` con un wrapper `sticky top-0 h-screen` adentro.
 *   - GSAP ScrollTrigger sincroniza `scrollProgressRef` (0..1) con el progreso del scroll
 *     dentro del rango del Hero. El `WaterScene` lee ese ref por frame para animar el shader.
 *   - Headline aparece palabra-por-palabra con Framer Motion stagger al cargar.
 *   - Reduced-motion: sin pin, sin stagger, headline visible directo, canvas reemplazado
 *     por el fallback estático del WaterCanvas.
 */
export function Hero() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      if (!containerRef.current) return;

      registerGsapPlugins();

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stickyRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        scrub: 1.2,
        onEnter: () => {
          activeStageRef.current = STORY_STAGE.hero;
        },
        onEnterBack: () => {
          activeStageRef.current = STORY_STAGE.hero;
        },
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
        },
      });

      return () => {
        trigger.kill();
        scrollProgressRef.current = 0;
      };
    },
    { dependencies: [reduced] },
  );

  const headline = {
    lead: t("headline_lead"),
    accent: t("headline_accent"),
    tail: t("headline_tail"),
  };
  const allWords = `${headline.lead} ${headline.accent} ${headline.tail}`.split(" ");
  const accentStart = headline.lead.trim().split(" ").length;
  const accentEnd = accentStart + headline.accent.trim().split(" ").length;

  return (
    <section
      ref={containerRef}
      className={reduced ? "relative overflow-hidden" : "relative min-h-[240vh] overflow-hidden"}
      aria-labelledby="hero-headline"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklch, var(--color-bg-base) 94%, transparent) 0%, color-mix(in oklch, var(--color-bg-base) 72%, transparent) 38%, color-mix(in oklch, var(--color-bg-base) 18%, transparent) 68%, transparent 100%)",
        }}
      />
      <div
        ref={stickyRef}
        className={
          reduced ? "relative z-10" : "relative z-10 flex min-h-screen flex-col justify-center"
        }
      >
        <div className="container-content py-24 md:py-32">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
            className="mb-3 inline-block text-xs uppercase"
            style={{
              letterSpacing: "var(--tracking-wide)",
              color: "var(--color-accent-primary)",
            }}
          >
            {t("eyebrow")}
          </motion.span>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0, 0, 1] }}
            className="mb-10 flex flex-wrap items-baseline gap-x-3 text-sm uppercase"
            style={{
              letterSpacing: "var(--tracking-wide)",
              color: "var(--color-fg-muted)",
              fontFamily: "var(--font-display)",
              fontWeight: 500,
            }}
          >
            <BrandWordmark abbreviated variant="mono" className="text-sm" />
            <span aria-hidden="true" style={{ opacity: 0.5 }}>
              ·
            </span>
            <span style={{ opacity: 0.92 }}>{TAGLINE}</span>
          </motion.p>

          <motion.h1
            id="hero-headline"
            initial={reduced ? false : "hidden"}
            animate={reduced ? undefined : "visible"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.06, delayChildren: 0.2 },
              },
            }}
            className="mb-8 max-w-5xl text-balance"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 8vw, var(--text-7xl))",
              lineHeight: "var(--leading-heading)",
              letterSpacing: "var(--tracking-tighter)",
              fontWeight: 600,
              textShadow: "0 2px 24px rgba(0,0,0,0.55)",
            }}
          >
            {allWords.map((word, idx) => {
              const isAccent = idx >= accentStart && idx < accentEnd;
              return (
                <motion.span
                  key={`${word}-${idx}`}
                  variants={{
                    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.7, ease: [0.2, 0, 0, 1] },
                    },
                  }}
                  className={isAccent ? "glow-cyan" : undefined}
                  style={{
                    display: "inline-block",
                    marginRight: "0.25em",
                    color: isAccent ? "var(--color-accent-primary)" : undefined,
                  }}
                >
                  {word}
                </motion.span>
              );
            })}
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.2, 0, 0, 1] }}
            className="mb-12 max-w-2xl text-pretty"
            style={{
              fontSize: "var(--text-xl)",
              lineHeight: "var(--leading-body)",
              color: "var(--color-fg-secondary)",
              textShadow: "0 1px 12px rgba(0,0,0,0.55)",
            }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.2, 0, 0, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#contact"
              strength={0.3}
              className="rounded-full px-8 py-4 font-medium transition-[background-color,box-shadow,transform]"
              style={{
                backgroundColor: "var(--color-accent-primary)",
                color: "var(--color-fg-on-accent)",
                fontFamily: "var(--font-body)",
                transitionDuration: "var(--duration-base)",
                transitionTimingFunction: "var(--ease-standard)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              {t("cta_primary")}
            </MagneticButton>
            <a
              href="#osmosis"
              className="rounded-full border px-8 py-4 font-medium transition-[background-color,border-color,color,transform]"
              style={{
                borderColor: "var(--color-border-strong)",
                color: "var(--color-fg-primary)",
                fontFamily: "var(--font-body)",
                backgroundColor: "rgba(15, 30, 60, 0.45)",
                backdropFilter: "blur(8px)",
                transitionDuration: "var(--duration-base)",
                transitionTimingFunction: "var(--ease-standard)",
              }}
            >
              {t("cta_secondary")} ↓
            </a>
          </motion.div>

          {/* Scroll hint discreto */}
          {!reduced && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mt-20 flex items-center gap-3 text-xs uppercase"
              style={{
                letterSpacing: "var(--tracking-wide)",
                color: "var(--color-fg-muted)",
                fontFamily: "var(--font-mono)",
              }}
              aria-hidden="true"
            >
              <span
                style={{
                  display: "inline-block",
                  width: "2.5rem",
                  height: "1px",
                  background: "linear-gradient(to right, transparent, var(--color-fg-muted))",
                }}
              />
              Scroll · the molecular journey begins
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                style={{ color: "var(--color-accent-primary)" }}
              >
                ↓
              </motion.span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
