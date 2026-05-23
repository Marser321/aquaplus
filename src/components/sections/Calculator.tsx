"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { computeSavings } from "@/lib/calculator/computeSavings";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { WaterParallaxBackground } from "@/components/ui/WaterParallaxBackground";

/**
 * Calculator ROI · estima ahorro anual + botellas evitadas + CO₂eq evitado.
 *
 * - Inputs: habitantes (slider 1-12) + gasto mensual actual (slider $10-$300).
 * - Modificado para usar sliders cinemáticos (.premium-slider).
 * - OutputCards rediseñadas como paneles de cristal con iconos vectoriales dinámicos.
 */

export function Calculator() {
  const t = useTranslations("calculator");
  const reduced = useReducedMotion();

  const [people, setPeople] = useState(3);
  const [monthlySpend, setMonthlySpend] = useState(80);

  const savings = useMemo(
    () => computeSavings({ people, monthlySpendUsd: monthlySpend }),
    [people, monthlySpend],
  );

  const animKey = `${people}-${monthlySpend}`;

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-headline"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-elevated)",
        borderTop: "1px solid var(--color-border-subtle)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <WaterParallaxBackground />
      <div className="container-content relative z-10 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          {/* Left: Headline + sliders */}
          <div className="flex flex-col justify-center md:col-span-5">
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
              id="calculator-headline"
              initial={{ opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
              className="mb-8 text-balance"
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

            {/* Panel de Sliders */}
            <div className="space-y-10">
              {/* Slider 1: Habitantes */}
              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <label
                    htmlFor="cal-people"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-fg-muted)",
                      letterSpacing: "var(--tracking-wide)",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("label_people")}
                  </label>
                  <span
                    className="font-mono text-base font-semibold"
                    style={{
                      color: "var(--color-accent-primary)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {people}
                  </span>
                </div>
                <input
                  id="cal-people"
                  name="householdPeople"
                  type="range"
                  min={1}
                  max={12}
                  step={1}
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                  aria-valuemin={1}
                  aria-valuemax={12}
                  aria-valuenow={people}
                  aria-valuetext={`${people} people`}
                  className="premium-slider cursor-pointer"
                />
              </div>

              {/* Slider 2: Gasto Mensual */}
              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <label
                    htmlFor="cal-spend"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-fg-muted)",
                      letterSpacing: "var(--tracking-wide)",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("label_monthly_spend")}
                  </label>
                  <span
                    className="font-mono text-base font-semibold"
                    style={{
                      color: "var(--color-accent-primary)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    ${monthlySpend}
                  </span>
                </div>
                <input
                  id="cal-spend"
                  name="monthlyBottledWaterSpend"
                  type="range"
                  min={10}
                  max={300}
                  step={5}
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  aria-valuemin={10}
                  aria-valuemax={300}
                  aria-valuenow={monthlySpend}
                  aria-valuetext={`$${monthlySpend} per month`}
                  className="premium-slider cursor-pointer"
                />
              </div>
            </div>

            <p
              className="text-fg-muted mt-12"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                lineHeight: "var(--leading-body)",
              }}
            >
              {t("disclaimer")}
            </p>
          </div>

          {/* Right: Output dashboard cards */}
          <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-1">
              <OutputCard
                key={`savings-${animKey}`}
                label={t("output_savings")}
                value={savings.yearlySavingsUsd}
                prefix="$"
                accent="primary"
                delta={t("output_savings_delta")}
              />
              <OutputCard
                key={`bottles-${animKey}`}
                label={t("output_bottles")}
                value={savings.bottlesAvoided}
                accent="warm"
                delta={t("output_bottles_delta", {
                  trucks: Math.max(1, Math.round(savings.bottlesAvoided / 2000)),
                })}
              />
              <OutputCard
                key={`carbon-${animKey}`}
                label={t("output_carbon")}
                value={savings.carbonAvoidedKg}
                decimals={1}
                suffix=" kg"
                accent="mineral"
                delta={t("output_carbon_delta", {
                  trees: Math.max(1, Math.round(savings.carbonAvoidedKg / 22)),
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OutputCard({
  label,
  value,
  prefix,
  suffix,
  decimals = 0,
  accent,
  delta,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  accent: "primary" | "warm" | "mineral";
  delta?: string;
}) {
  const colorMap = {
    primary: "var(--color-accent-primary)",
    warm: "var(--color-warm-primary)",
    mineral: "var(--color-mineral-gold)",
  };

  const glowMap = {
    primary: "rgba(114, 208, 175, 0.08)",
    warm: "rgba(224, 185, 128, 0.08)",
    mineral: "rgba(235, 215, 140, 0.08)",
  };

  // Iconos vectoriales premium para los resultados
  const renderIcon = () => {
    switch (accent) {
      case "primary":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: colorMap[accent] }}
          >
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
            <path d="M3 20h18" />
          </svg>
        );
      case "warm":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: colorMap[accent] }}
          >
            <path d="M12 2v3M9 5h6M7 9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V9z" />
            <path d="M9 13h6" />
          </svg>
        );
      case "mineral":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: colorMap[accent] }}
          >
            <path d="M2 22c0-5.5 4.5-10 10-10h10" />
            <path d="M22 2c-5.5 0-10 4.5-10 10v10" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="glass-premium relative overflow-hidden rounded-[var(--radius-xl)] px-6 py-6"
      style={{
        backgroundColor: "color-mix(in oklch, var(--color-bg-base) 65%, transparent)",
        boxShadow: `0 8px 30px ${glowMap[accent]}, var(--shadow-sm)`,
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-fg-muted)",
            letterSpacing: "var(--tracking-wide)",
            textTransform: "uppercase",
          }}
        >
          {label}
        </p>
        <div
          className="rounded-xl p-2.5"
          style={{
            backgroundColor: `color-mix(in oklch, ${colorMap[accent]} 10%, transparent)`,
            boxShadow: `0 0 24px ${glowMap[accent]}, inset 0 0 0 1px color-mix(in oklch, ${colorMap[accent]} 20%, transparent)`,
          }}
        >
          {renderIcon()}
        </div>
      </div>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-4xl)",
          color: colorMap[accent],
          letterSpacing: "var(--tracking-data)",
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
          fontWeight: 650,
        }}
      >
        <NumberTicker
          value={value}
          decimals={decimals}
          durationMs={900}
          prefix={prefix}
          suffix={suffix}
        />
      </p>
      {delta && (
        <p
          className="mt-3"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-micro)",
            color: "var(--color-fg-muted)",
            letterSpacing: "var(--tracking-wide)",
            textTransform: "uppercase",
          }}
        >
          {delta}
        </p>
      )}
    </motion.div>
  );
}
