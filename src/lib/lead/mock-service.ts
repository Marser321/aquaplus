import { randomUUID } from "node:crypto";
import type { LeadService } from "./service";
import type { LeadInput, LeadResult } from "@/lib/validation/lead-schema";
import { log } from "@/lib/log";

/**
 * Implementación mock del LeadService.
 *
 * - Loguea por consola server-side (los logs aparecen en la terminal del dev server
 *   y en Vercel Functions logs en producción).
 * - Simula latencia de red corta (200-400ms).
 * - Devuelve un UUID como ID del lead.
 *
 * Para V1.5 se reemplaza por `ghl-service.ts` que llamará la API real de
 * GoHighLevel y respetará el contrato LeadService idéntico.
 */
export const mockLeadService: LeadService = {
  async submit(input: LeadInput): Promise<LeadResult> {
    // Simular latencia
    await new Promise((resolve) => setTimeout(resolve, 250 + Math.random() * 200));

    // Log estructurado (server-side; visible en logs de Vercel cuando NODE_ENV !== production)
    log.warn("[lead·mock] received", {
      name: input.name,
      email: input.email,
      zip: input.zip,
      locale: input.locale ?? "unknown",
      source: input.source ?? "unknown",
      campaign: input.campaign ?? "none",
      ts: new Date().toISOString(),
    });

    return {
      ok: true,
      id: randomUUID(),
    };
  },
};
