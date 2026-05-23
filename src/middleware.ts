import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Middleware de next-intl · maneja redirect / → /<defaultLocale>/ y locale prefix.
 * Decisión referenciada: D-16 (bilingual V1 con routing /[locale]/).
 */
export default createMiddleware(routing);

export const config = {
  // Matcher excluye rutas estáticas, API routes y assets que no necesitan locale.
  matcher: [
    // Skip /_next, /_vercel, files con extension (assets), y rutas /api.
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
