import { z } from "zod";
import { isFloridaZip } from "./florida-zip";

/**
 * Schema de validación del lead form.
 * Usa Zod refinements para reglas de negocio (Florida ZIP, US phone format).
 *
 * Versión bilingual: los mensajes de error son genéricos (codes); el componente
 * resuelve cada code a un string traducido vía next-intl.
 */

export const leadSchema = z.object({
  name: z
    .string({ required_error: "required" })
    .trim()
    .min(2, "name_too_short")
    .max(80, "name_too_long"),

  email: z.string({ required_error: "required" }).trim().toLowerCase().email("email_invalid"),

  phone: z
    .string({ required_error: "required" })
    .trim()
    .min(7, "phone_too_short")
    .max(20, "phone_too_long")
    // Acepta números US con o sin formato (e.g., 305-555-0123 / (305) 555 0123 / +1 305 555 0123)
    .regex(/^[\d\s\-\(\)\+\.]+$/, "phone_format"),

  address: z
    .string({ required_error: "required" })
    .trim()
    .min(5, "address_too_short")
    .max(160, "address_too_long"),

  zip: z.string({ required_error: "required" }).trim().refine(isFloridaZip, "zip_not_florida"),

  consent: z.boolean({ required_error: "required" }).refine((v) => v === true, "consent_required"),

  locale: z.enum(["en", "es"]).optional(),
  source: z.string().trim().max(80).optional(),
  campaign: z.string().trim().max(80).optional(),
  consentText: z.string().trim().max(240).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/**
 * Resultado del Server Action.
 * Discriminated union para que el cliente reaccione a éxito/error de forma exhaustiva.
 */
export type LeadResult =
  | { ok: true; id: string }
  | {
      ok: false;
      code: "rate_limit" | "validation" | "service_error";
      fieldErrors?: Partial<Record<keyof LeadInput, string>>;
      message?: string;
    };
