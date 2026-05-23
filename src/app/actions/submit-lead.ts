"use server";

import { headers } from "next/headers";
import { leadSchema } from "@/lib/validation/lead-schema";
import type { LeadResult } from "@/lib/validation/lead-schema";
import { mockLeadService } from "@/lib/lead/mock-service";
import { log } from "@/lib/log";

/**
 * Server Action · submit lead.
 *
 * Comportamiento:
 *   1. Parsea el FormData entrante.
 *   2. Valida con Zod schema (incluye Florida ZIP check, D-13).
 *   3. Rate limiting básico in-memory (max 5/IP/hora). En prod usar Vercel KV o
 *      Upstash Redis (`RATELIMIT_REDIS_URL` en .env).
 *   4. Despacha al `LeadService` (mock V1 · GHL V1.5).
 *
 * Decisiones referenciadas:
 *   - D-09: Server Action con Zod + rate limit + service layer.
 *   - D-12: consent checkbox obligatorio.
 *   - D-13: ZIP de todo el estado de Florida.
 */

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitBucket>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hora
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = rateLimitMap.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (bucket.count >= RATE_LIMIT_MAX) {
    return false;
  }
  bucket.count += 1;
  return true;
}

export async function submitLead(formData: FormData): Promise<LeadResult> {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return {
      ok: false,
      code: "rate_limit",
      message: "Too many requests · please try again later",
    };
  }

  // Parse FormData → plain object
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    zip: formData.get("zip"),
    consent: formData.get("consent") === "on",
    locale: formData.get("locale"),
    source: formData.get("source"),
    campaign: formData.get("campaign"),
    consentText: formData.get("consentText"),
  };

  // Validate with Zod
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const path = issue.path[0];
      if (typeof path === "string") {
        fieldErrors[path] = issue.message;
      }
    });
    return {
      ok: false,
      code: "validation",
      fieldErrors,
    };
  }

  try {
    return await mockLeadService.submit(parsed.data);
  } catch (err) {
    log.error("[lead·action] service error", err);
    return {
      ok: false,
      code: "service_error",
      message: "Service unavailable · please try again",
    };
  }
}
