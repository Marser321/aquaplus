import { getLocale, getTranslations } from "next-intl/server";
import { BrandWordmark } from "@/components/brand/BrandWordmark";
import { Spotlight } from "@/components/ui/Spotlight";
import { TAGLINE, CONTACT_EMAIL } from "@/lib/brand";

/**
 * Footer · 4-cols grid · spotlight reactivo sobre el wordmark grande.
 * Server component (lee i18n via getTranslations).
 */

export async function Footer() {
  const tFooter = await getTranslations("footer");
  const t = await getTranslations();
  const locale = await getLocale();

  const counties = (tFooter.raw("service_area_counties") as string[]) ?? [];

  const columns = [
    {
      title: tFooter("col_company_title"),
      links: [
        { href: "#osmosis", label: t("nav.process") },
        { href: "#endorsement", label: t("nav.endorsement") },
        { href: "#calculator", label: t("nav.calculator") },
      ],
    },
    {
      title: tFooter("col_science_title"),
      links: [
        { href: "#osmosis", label: tFooter("col_science_links.osmosis") },
        { href: "#conversion", label: tFooter("col_science_links.conversion") },
        { href: "#ionization", label: tFooter("col_science_links.ionization") },
      ],
    },
    {
      title: tFooter("col_legal_title"),
      links: [
        { href: `/${locale}/privacy`, label: tFooter("col_legal_links.privacy") },
        { href: `/${locale}/terms`, label: tFooter("col_legal_links.terms") },
        { href: "#endorsement", label: tFooter("col_legal_links.clinical") },
      ],
    },
    {
      title: tFooter("col_contact_title"),
      links: [
        { href: `mailto:${CONTACT_EMAIL}`, label: CONTACT_EMAIL },
        { href: "#contact", label: tFooter("col_contact_links.free_analysis") },
      ],
    },
  ];

  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-base)",
        borderTop: "1px solid var(--color-border-subtle)",
      }}
    >
      <Spotlight intensity={0.35} />

      <div className="container-content relative z-10 py-20 md:py-28">
        {/* Top · wordmark monumental + tagline */}
        <div className="mb-16 md:mb-20">
          <div style={{ fontSize: "clamp(2.5rem, 9vw, 6.5rem)" }}>
            <BrandWordmark className="text-[1em]" />
          </div>
          <p
            className="mt-3 max-w-md text-balance"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-lg)",
              color: "var(--color-fg-secondary)",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            {TAGLINE}
          </p>
          <p
            className="mt-4 max-w-md"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              color: "var(--color-fg-muted)",
            }}
          >
            {tFooter("tagline")}
          </p>
        </div>

        {/* Grid · 4 columnas con links */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h3
                className="mb-4 text-xs uppercase"
                style={{
                  letterSpacing: "var(--tracking-wide)",
                  color: "var(--color-fg-muted)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                }}
              >
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.href}`}>
                    <a
                      href={link.href}
                      className="inline-block text-sm transition-colors hover:text-[color:var(--color-accent-primary)]"
                      style={{
                        color: "var(--color-fg-secondary)",
                        fontFamily: "var(--font-body)",
                        transitionDuration: "var(--duration-fast)",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Service area · refuerza ZIP gate + posicionamiento Florida */}
        <section
          aria-labelledby="footer-service-area"
          className="mt-16 border-t pt-10"
          style={{ borderColor: "var(--color-border-subtle)" }}
        >
          <h3
            id="footer-service-area"
            className="mb-4 text-xs uppercase"
            style={{
              letterSpacing: "var(--tracking-wide)",
              color: "var(--color-accent-primary)",
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
            }}
          >
            {tFooter("service_area_title")}
          </h3>
          <ul
            className="flex flex-wrap gap-x-4 gap-y-2"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-sm)",
              color: "var(--color-fg-secondary)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
            }}
          >
            {counties.map((county) => (
              <li key={county} className="flex items-center gap-2">
                <span aria-hidden="true" style={{ color: "var(--color-accent-primary)" }}>
                  ·
                </span>
                <span>{county}</span>
              </li>
            ))}
          </ul>
          <p
            className="mt-3 max-w-2xl"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              color: "var(--color-fg-muted)",
              lineHeight: "var(--leading-body)",
            }}
          >
            {tFooter("service_area_disclaimer")}
          </p>
        </section>

        {/* Bottom · disclaimer + copyright (disclaimer con peso visual subido) */}
        <div
          className="mt-12 flex flex-col items-start justify-between gap-6 border-t pt-10 md:flex-row md:items-center"
          style={{ borderColor: "var(--color-border-strong)" }}
        >
          <p
            className="max-w-2xl"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              color: "var(--color-fg-secondary)",
              lineHeight: "var(--leading-body)",
            }}
          >
            {t("disclaimer_not_pool")}
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-fg-muted)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
            }}
          >
            © {new Date().getFullYear()} · {tFooter("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
