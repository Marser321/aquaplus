import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

/**
 * Configuración de routing bilingual para Aqua+ Systems.
 * Decisión referenciada: D-16 (V1 bilingual en + es, default en).
 *
 * - `localePrefix: "always"` fuerza /en/ y /es/ explícitos (mejor para SEO + claridad).
 * - `defaultLocale: "en"` por el tagline oficial en inglés.
 */
export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

// Wrappers de navigation con tipos de locale embebidos.
// Uso:
//   import { Link, useRouter, usePathname, redirect } from "@/i18n/routing";
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
