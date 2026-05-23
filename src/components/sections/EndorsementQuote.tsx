"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Spotlight } from "@/components/ui/Spotlight";
import { WaterParallaxBackground } from "@/components/ui/WaterParallaxBackground";

/**
 * Endorsement Quote · bloque editorial con aval clínico-nutricional.
 *
 * Decisión referenciada: D-14 (sin hardcoded "Denis Blanco").
 *
 * - Convertido a Client Component para animaciones premium.
 * - Carga por defecto el retrato de estudio nutritionist_portrait.png.
 * - Tarjeta 3D interactiva que rota al pasar el mouse.
 * - Bloque de cita con cristal y bordes suaves de gran diámetro (radius-2xl/3xl).
 */

interface EndorsementQuoteProps {
  name?: string;
  roleOverride?: string;
  quoteOverride?: string;
  photo?: { src: string; alt: string };
}

export function EndorsementQuote({
  name,
  roleOverride,
  quoteOverride,
  photo,
}: EndorsementQuoteProps) {
  const t = useTranslations("endorsement_quote_hero");
  const reduced = useReducedMotion();

  const role = roleOverride ?? t("attribution_role");
  const quote = quoteOverride ?? t("quote");
  const tag = t("tag");
  // Si no se pasa name por prop, leemos attribution_name de i18n (default: "Denis Blanco").
  const displayName = name ?? t("attribution_name");

  // [VERIFY: foto real Denis Blanco]. Placeholder duplica nutritionist_portrait.png hasta entrega cliente.
  const activePhoto = photo ?? {
    src: "/assets/denis-blanco.png",
    alt: `${displayName} · ${role}`,
  };

  // Lógica de Tilt 3D
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), {
    stiffness: 80,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), {
    stiffness: 80,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section
      id="endorsement"
      aria-labelledby="endorsement-headline"
      className="relative overflow-hidden border-t border-b"
      style={{
        backgroundColor: "var(--color-bg-base)",
        borderColor: "var(--color-border-subtle)",
      }}
    >
      <WaterParallaxBackground />
      <Spotlight intensity={0.35} />

      <div className="container-content relative z-10 grid grid-cols-1 gap-12 py-24 md:grid-cols-12 md:py-32">
        {/* Foto / Portrait · 4 cols en desktop con efecto Tilt 3D */}
        <div className="flex justify-center md:col-span-4">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: reduced ? 0 : rotateX,
              rotateY: reduced ? 0 : rotateY,
              transformStyle: "preserve-3d",
              perspective: "800px",
            }}
            className="group relative aspect-[4/5] w-full max-w-[320px] cursor-pointer overflow-hidden rounded-[var(--radius-2xl)]"
          >
            {/* Gradiente de borde luminoso */}
            <div
              className="absolute inset-0 z-0 rounded-[var(--radius-2xl)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                padding: "1.5px",
                background:
                  "linear-gradient(135deg, var(--color-accent-primary), var(--color-warm-primary))",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* Imagen de fondo real */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                backgroundImage: `url(${activePhoto.src})`,
              }}
              aria-label={activePhoto.alt}
            />

            {/* Capa de sombra interna para legibilidad */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 transition-opacity duration-300"
              style={{ transform: "translateZ(10px)" }}
            />

            {/* Tag flotante */}
            <span
              className="absolute bottom-4 left-4 inline-block rounded-full px-3 py-1.5"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                letterSpacing: "var(--tracking-wide)",
                textTransform: "uppercase",
                color: "var(--color-fg-on-accent)",
                backgroundColor: "var(--color-accent-primary)",
                fontWeight: 500,
                transform: "translateZ(20px)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              {tag}
            </span>
          </motion.div>
        </div>

        {/* Quote + atribución · 7 cols */}
        <div className="md:col-span-7 md:col-start-6 md:self-center">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
            className="glass-premium relative rounded-[var(--radius-2xl)] p-8 md:p-12"
            style={{
              backgroundColor: "color-mix(in oklch, var(--color-bg-elevated) 70%, transparent)",
            }}
          >
            {/* Comilla elegante */}
            <span
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "5rem",
                color: "var(--color-accent-primary)",
                lineHeight: "0.5",
                display: "block",
                marginBottom: "0.5rem",
                opacity: 0.6,
              }}
            >
              &ldquo;
            </span>

            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.25rem, 2.5vw, var(--text-2xl))",
                lineHeight: "var(--leading-tight)",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--color-fg-primary)",
                fontWeight: 450,
                fontStyle: "italic",
              }}
            >
              <span id="endorsement-headline">{quote}</span>
            </blockquote>

            <footer className="mt-8 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="block h-px w-8"
                style={{
                  background: "linear-gradient(to right, transparent, var(--color-accent-primary))",
                }}
              />
              <div>
                {displayName && (
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 700,
                      color: "var(--color-fg-primary)",
                      letterSpacing: "var(--tracking-tight)",
                      lineHeight: 1.1,
                    }}
                  >
                    {displayName}
                  </p>
                )}
                <p
                  className="mt-1"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    letterSpacing: "var(--tracking-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-fg-muted)",
                  }}
                >
                  {role}
                </p>
              </div>
            </footer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
