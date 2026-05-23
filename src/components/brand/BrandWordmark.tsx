import { cn } from "@/lib/utils";

/**
 * Wordmark de la marca · "Aqua+ Systems".
 *
 * Decisión referenciada: D-15 (brand identity revelada con logo).
 *
 * Renderizado:
 *   - "Aqua" + glifo `+` (en color accent teal) + " Systems".
 *   - El `+` es un <span> con `aria-hidden` para que las screen readers leen
 *     "Aqua plus Systems" (el aria-label en el contenedor), no "Aqua mas Systems".
 *
 * Variants:
 *   - `default` (sobre dark): "Aqua"/"Systems" en fg-primary, `+` en accent-primary.
 *   - `onPaper` (sobre fondos claros): "Aqua"/"Systems" en brand-navy, `+` en accent-primary.
 *   - `mono` (footer / micro): un solo color sin acento (`+` en currentColor).
 */
type BrandVariant = "default" | "onPaper" | "mono";

interface BrandWordmarkProps {
  variant?: BrandVariant;
  className?: string;
  /** Si true, oculta el "Systems" para usar solo "Aqua+". */
  abbreviated?: boolean;
}

export function BrandWordmark({
  variant = "default",
  className,
  abbreviated = false,
}: BrandWordmarkProps) {
  const textColor =
    variant === "onPaper"
      ? "var(--color-brand-navy)"
      : variant === "mono"
        ? "currentColor"
        : "var(--color-fg-primary)";

  const plusColor = variant === "mono" ? "currentColor" : "var(--color-accent-primary)";

  return (
    <span
      className={cn("inline-flex items-baseline whitespace-nowrap", className)}
      aria-label="Aqua plus Systems · drinking water purification"
      style={{
        fontFamily: "var(--font-display)",
        color: textColor,
        fontWeight: 600,
        letterSpacing: "var(--tracking-tight)",
      }}
    >
      <span>Aqua</span>
      <span
        aria-hidden="true"
        style={{
          color: plusColor,
          fontWeight: 700,
          marginInline: "0.05em",
          transform: "translateY(-0.05em)",
          display: "inline-block",
        }}
      >
        +
      </span>
      {!abbreviated && (
        <span
          style={{
            fontSize: "0.72em",
            marginLeft: "0.22em",
            letterSpacing: "var(--tracking-wide)",
            textTransform: "uppercase",
            fontWeight: 500,
            opacity: 0.95,
          }}
        >
          Systems
        </span>
      )}
    </span>
  );
}
