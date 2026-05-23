import type { LeadInput, LeadResult } from "@/lib/validation/lead-schema";

/**
 * Interfaz del servicio de leads · permite swap mock ↔ GHL sin tocar el form.
 *
 * Decisión referenciada: D-09 (service layer abstracto · mock en V1; GHL en V1.5).
 */
export interface LeadService {
  submit(input: LeadInput): Promise<LeadResult>;
}
