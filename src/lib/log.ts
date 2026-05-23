/**
 * Logger no-op en producción · console.warn/error en dev.
 *
 * Reemplaza usos directos de console.* fuera de `lib/log.ts` (regla CLAUDE.md §3).
 * Para errores que necesitan reporte real, integrar Sentry aquí (TODO Fase 2).
 */

type LogLevel = "info" | "warn" | "error";

const isDev = process.env.NODE_ENV !== "production";

function emit(level: LogLevel, message: string, payload?: unknown): void {
  if (!isDev) return;
  if (level === "error") {
    // eslint-disable-next-line no-console
    console.error(message, payload);
    return;
  }
  if (level === "warn") {
    // eslint-disable-next-line no-console
    console.warn(message, payload);
    return;
  }
  // eslint-disable-next-line no-console
  console.info(message, payload);
}

export const log = {
  info: (message: string, payload?: unknown) => emit("info", message, payload),
  warn: (message: string, payload?: unknown) => emit("warn", message, payload),
  error: (message: string, payload?: unknown) => emit("error", message, payload),
};
