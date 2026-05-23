"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { WaterParallaxBackground } from "@/components/ui/WaterParallaxBackground";

/**
 * Comparison Table científica · 6 muestras × 4 columnas (Sample / pH / ORP / TDS / Effect).
 *
 * - Convertida a un diseño de panel científico premium.
 * - Indicador visual del espectro de pH.
 * - Indicador de escala ORP (Antioxidante vs Oxidante).
 * - Indicador de volumen TDS.
 * - Fila "Ionized Aqua+" con gradiente brillante, insignia animada y glow activo.
 * - Mobile-friendly y accesible.
 */

interface Sample {
  id: string;
  highlight?: boolean;
  ph: string;
  orp: string;
  tds: string;
}

const SAMPLES: Sample[] = [
  { id: "tap_florida", ph: "6.5–7.5", orp: "+300 to +350", tds: "150–250" },
  { id: "bottled", ph: "5.5–6.8", orp: "+350 to +400", tds: "< 10" },
  { id: "ro_pure", ph: "5.5–6.2", orp: "+200 to +250", tds: "≈ 0" },
  { id: "remineralized", ph: "7.2–8.0", orp: "+100 to +150", tds: "30–80" },
  { id: "ionized_aqua", ph: "8.5–9.5", orp: "−350 to −450", tds: "40–100", highlight: true },
  { id: "acidic_external", ph: "3.0–5.0", orp: "+600 to +800", tds: "n/a" },
];

// Helper para extraer el promedio numérico de los rangos científicos
function parseRange(val: string): number {
  const clean = val
    .replace(/[−-]/g, "-")
    .replace(/[^\d.-]/g, " ")
    .trim();
  const parts = clean
    .split(/\s+/)
    .map(Number)
    .filter((n) => !isNaN(n));
  const first = parts[0];
  const second = parts[1];
  if (first === undefined) return 7;
  if (second === undefined) return first;
  return (first + second) / 2;
}

function parseORP(val: string): number {
  const cleaned = val
    .replace(/−/g, "-")
    .replace(/[^\d.-]/g, " ")
    .trim();
  const parts = cleaned
    .split(/\s+/)
    .map(Number)
    .filter((n) => !isNaN(n));
  const first = parts[0];
  const second = parts[1];
  if (first === undefined) return 200;
  if (second === undefined) return first;
  return (first + second) / 2;
}

// 1. Componente de Espectro pH
function PHSpectrum({ val }: { val: string }) {
  const avg = parseRange(val);
  // Mapea pH de 3.0 a 11.0 en porcentaje
  const pct = Math.min(95, Math.max(5, ((avg - 3) / 8) * 100));

  let dotColor = "var(--color-data-alkaline)";
  if (avg < 6) dotColor = "var(--color-data-acidic)";
  else if (avg <= 8) dotColor = "var(--color-data-neutral)";
  else dotColor = "var(--color-data-alkaline)";

  return (
    <div className="flex w-full max-w-[140px] min-w-[110px] flex-col gap-1">
      <div className="relative h-2 w-full rounded-full bg-gradient-to-r from-amber-500 via-emerald-400 to-indigo-500/80">
        <div
          className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-white bg-current shadow-md transition-all duration-300"
          style={{
            left: `${pct}%`,
            transform: "translate(-50%, -50%)",
            color: dotColor,
            boxShadow: `0 0 10px ${dotColor}`,
          }}
        />
      </div>
      <span
        className="font-mono"
        style={{ fontSize: "var(--text-micro)", color: "var(--color-fg-muted)" }}
      >
        {val}
      </span>
    </div>
  );
}

// 2. Componente de Potencial Antioxidante (ORP)
function ORPIndicator({ val }: { val: string }) {
  const avg = parseORP(val);
  // Mapea ORP de -500 a +800 en porcentaje
  const pct = Math.min(95, Math.max(5, ((avg + 500) / 1300) * 100));
  const isAntioxidant = avg < 0;
  const dotColor = isAntioxidant ? "var(--color-data-alkaline)" : "var(--color-data-antioxidant)";

  return (
    <div className="flex w-full max-w-[140px] min-w-[110px] flex-col gap-1">
      <div
        className="relative h-2 w-full overflow-visible rounded-full"
        style={{ backgroundColor: "var(--color-border-subtle)" }}
      >
        {/* Marcador de Cero */}
        <div className="absolute top-0 bottom-0 left-[38%] w-[1.5px] bg-white/20" />

        {/* Zona antioxidante activa */}
        {isAntioxidant && (
          <div
            className="absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r from-teal-500/40 to-emerald-400/40"
            style={{ right: `${100 - pct}%` }}
          />
        )}

        <div
          className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-white bg-current shadow-md transition-all duration-300"
          style={{
            left: `${pct}%`,
            transform: "translate(-50%, -50%)",
            color: dotColor,
            boxShadow: isAntioxidant ? "0 0 12px var(--color-accent-glow)" : "none",
          }}
        />
      </div>
      <span
        className="font-mono"
        style={{
          fontSize: "var(--text-micro)",
          color: isAntioxidant ? "var(--color-accent-primary)" : "var(--color-fg-muted)",
          fontWeight: isAntioxidant ? 600 : 400,
        }}
      >
        {val}
      </span>
    </div>
  );
}

// 3. Componente de Minerales Disueltos (TDS)
function TDSIndicator({ val }: { val: string }) {
  let avg = 50;
  if (val === "n/a") {
    avg = 0;
  } else if (val.includes("<")) {
    avg = 5;
  } else if (val.includes("≈")) {
    avg = 0;
  } else {
    avg = parseRange(val);
  }

  // Mapea TDS de 0 a 300 en porcentaje
  const pct = Math.min(100, Math.max(0, (avg / 300) * 100));

  let barColor = "var(--color-data-alkaline)";
  if (avg > 120) barColor = "var(--color-data-warn)";
  else if (avg < 15) barColor = "var(--color-fg-muted)";

  return (
    <div className="flex w-full max-w-[100px] min-w-[80px] flex-col gap-1">
      <div
        className="relative h-1.5 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--color-border-subtle)" }}
      >
        <div
          className="absolute top-0 bottom-0 left-0 rounded-full transition-all duration-300"
          style={{
            width: val === "n/a" ? "0%" : `${pct}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
      <span
        className="font-mono"
        style={{ fontSize: "var(--text-micro)", color: "var(--color-fg-muted)" }}
      >
        {val}
      </span>
    </div>
  );
}

export function ComparisonTable() {
  const t = useTranslations("comparison");
  const reduced = useReducedMotion();

  return (
    <section
      id="comparison"
      aria-labelledby="comparison-headline"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-base)",
        borderTop: "1px solid var(--color-border-subtle)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <WaterParallaxBackground />
      <div className="container-content relative z-10 py-24 md:py-32">
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
          id="comparison-headline"
          initial={{ opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="mb-12 max-w-3xl text-balance"
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

        {/* Contenedor de Cristal de la Tabla */}
        <div className="glass-premium overflow-hidden rounded-[var(--radius-2xl)]">
          <div className="overflow-x-auto p-4 md:p-6">
            <table
              className="w-full min-w-[800px] border-collapse"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
              }}
            >
              <thead>
                <tr
                  className="border-b"
                  style={{
                    borderColor: "var(--color-border-strong)",
                    color: "var(--color-fg-muted)",
                    fontSize: "var(--text-xs)",
                    letterSpacing: "var(--tracking-wide)",
                    textTransform: "uppercase",
                  }}
                >
                  <th scope="col" className="py-5 pr-4 text-left font-mono font-medium">
                    {t("columns.sample")}
                  </th>
                  <th scope="col" className="px-4 py-5 text-left font-mono font-medium">
                    {t("columns.ph")}
                  </th>
                  <th scope="col" className="px-4 py-5 text-left font-mono font-medium">
                    {t("columns.orp")}
                  </th>
                  <th scope="col" className="px-4 py-5 text-left font-mono font-medium">
                    {t("columns.tds")}
                  </th>
                  <th scope="col" className="py-5 pl-4 text-left font-mono font-medium">
                    {t("columns.effect")}
                  </th>
                </tr>
              </thead>

              <motion.tbody
                initial="hidden"
                whileInView={reduced ? undefined : "visible"}
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
              >
                {SAMPLES.map((s) => (
                  <motion.tr
                    key={s.id}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: [0.2, 0, 0, 1] },
                      },
                    }}
                    className="group relative border-b transition-colors hover:bg-white/[0.02]"
                    style={{
                      borderColor: "var(--color-border-subtle)",
                      color: s.highlight ? "var(--color-fg-primary)" : "var(--color-fg-secondary)",
                      backgroundColor: s.highlight
                        ? "color-mix(in oklch, var(--color-accent-primary) 12%, transparent)"
                        : undefined,
                      boxShadow: s.highlight
                        ? "inset 3px 0 0 var(--color-accent-primary), 0 0 20px color-mix(in oklch, var(--color-accent-primary) 8%, transparent)"
                        : undefined,
                    }}
                  >
                    {/* Nombre de la Muestra */}
                    <th
                      scope="row"
                      className="py-5 pr-4 text-left align-middle"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: s.highlight ? 600 : 500,
                        letterSpacing: "var(--tracking-tight)",
                        paddingLeft: s.highlight ? "1rem" : 0,
                        color: s.highlight
                          ? "var(--color-accent-primary)"
                          : "var(--color-fg-primary)",
                      }}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span>{t(`samples.${s.id}.label`)}</span>
                        {s.highlight && (
                          <span
                            className="inline-flex animate-pulse items-center rounded-full px-2 py-0.5 font-semibold uppercase"
                            style={{
                              fontSize: "var(--text-nano)",
                              letterSpacing: "var(--tracking-wide)",
                              color: "var(--color-accent-primary)",
                              backgroundColor:
                                "color-mix(in oklch, var(--color-accent-primary) 10%, transparent)",
                              border:
                                "1px solid color-mix(in oklch, var(--color-accent-primary) 20%, transparent)",
                              boxShadow:
                                "0 0 6px color-mix(in oklch, var(--color-accent-primary) 18%, transparent)",
                            }}
                          >
                            {t("badge_optimal")}
                          </span>
                        )}
                      </div>
                    </th>

                    {/* pH */}
                    <td className="px-4 py-5 align-middle">
                      <PHSpectrum val={s.ph} />
                    </td>

                    {/* ORP */}
                    <td className="px-4 py-5 align-middle">
                      <ORPIndicator val={s.orp} />
                    </td>

                    {/* TDS */}
                    <td className="px-4 py-5 align-middle">
                      <TDSIndicator val={s.tds} />
                    </td>

                    {/* Efecto Biológico */}
                    <td
                      className="py-5 pl-4 align-middle"
                      style={{
                        fontFamily: "var(--font-body)",
                        maxWidth: "28ch",
                        fontSize: "var(--text-xs)",
                        color: s.highlight ? "var(--color-fg-primary)" : "var(--color-fg-muted)",
                        lineHeight: "1.4",
                      }}
                    >
                      {t(`samples.${s.id}.effect`)}
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </div>

        <p
          className="mt-8 max-w-2xl"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: "var(--color-fg-muted)",
            lineHeight: "var(--leading-body)",
          }}
        >
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}
