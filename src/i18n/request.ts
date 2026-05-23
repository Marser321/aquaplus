import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type SupportedLocale = (typeof routing.locales)[number];

function isSupportedLocale(value: string | undefined): value is SupportedLocale {
  return value !== undefined && (routing.locales as readonly string[]).includes(value);
}

/**
 * Config server-side de next-intl.
 * Se llama en cada request RSC para cargar las translations correctas.
 *
 * Para cargar `messages/<locale>.json` usamos dynamic import — Next.js los chunkea.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: SupportedLocale = isSupportedLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
