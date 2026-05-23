"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "en", label: "EN", aria: "English" },
  { code: "es", label: "ES", aria: "Español" },
] as const;

type LocaleCode = (typeof LOCALES)[number]["code"];

/**
 * Toggle EN/ES segmentado para el Nav.
 *
 * Decisión referenciada: D-16 (bilingual V1, en default).
 *
 * Comportamiento:
 *   - Lee el locale activo de next-intl.
 *   - Al click, navega al mismo pathname en el otro locale (preserva ruta).
 *   - Sin reload completo: usa router.replace de next-intl.
 *   - Accesibilidad: `<nav aria-label="Language">`, botones con aria-pressed.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useLocale() as LocaleCode;

  const switchTo = (code: LocaleCode) => {
    if (code === activeLocale) return;
    // pathname incluye el segmento de locale; next-intl router lo reemplaza al cambiar.
    const pathWithoutLocale = pathname.replace(/^\/(en|es)/, "") || "/";
    router.replace(pathWithoutLocale, { locale: code });
  };

  return (
    <nav
      aria-label="Language"
      className={cn(
        "inline-flex items-center gap-px rounded-full p-1",
        "border border-[color:var(--color-border-subtle)]",
        className,
      )}
      style={{
        backgroundColor: "color-mix(in oklch, var(--color-bg-elevated) 70%, transparent)",
      }}
    >
      {LOCALES.map((locale) => {
        const isActive = activeLocale === locale.code;
        return (
          <button
            key={locale.code}
            type="button"
            onClick={() => switchTo(locale.code)}
            aria-pressed={isActive}
            aria-label={`Switch to ${locale.aria}`}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase transition-colors",
            )}
            style={{
              backgroundColor: isActive ? "var(--color-accent-primary)" : "transparent",
              color: isActive ? "var(--color-fg-on-accent)" : "var(--color-fg-secondary)",
              letterSpacing: "var(--tracking-wide)",
              transitionDuration: "var(--duration-fast)",
              transitionTimingFunction: "var(--ease-standard)",
            }}
          >
            {locale.label}
          </button>
        );
      })}
    </nav>
  );
}
