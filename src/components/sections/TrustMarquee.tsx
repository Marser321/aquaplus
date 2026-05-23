import { getTranslations } from "next-intl/server";
import { Marquee } from "@/components/ui/Marquee";

/**
 * Trust Marquee · banda entre Hero y Stage Ósmosis con conceptos científicos
 * que la marca controla. Refuerza posicionamiento clínico sin requerir logos de
 * partners reales.
 *
 * Server component · lee i18n via getTranslations. El Marquee primitive es client.
 */

export async function TrustMarquee() {
  const t = await getTranslations("marquee");
  const items = (t.raw("terms") as string[]) ?? [];

  return (
    <section
      aria-label="Aqua+ Systems · science vocabulary"
      className="relative"
      style={{
        backgroundColor: "color-mix(in oklch, var(--color-bg-elevated) 80%, transparent)",
        borderTop: "1px solid var(--color-border-subtle)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <Marquee speed={45} pauseOnHover className="py-6">
        {items.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="flex items-center"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-base)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
              color: "var(--color-fg-secondary)",
              padding: "0 2.5rem",
            }}
          >
            <span style={{ color: "var(--color-accent-primary)", marginRight: "1rem" }}>·</span>
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
