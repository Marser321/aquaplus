"use client";

import { useEffect, useState, useTransition } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { submitLead } from "@/app/actions/submit-lead";
import type { LeadResult } from "@/lib/validation/lead-schema";
import { WaterParallaxBackground } from "@/components/ui/WaterParallaxBackground";

/**
 * Lead form · Schedule free at-home water analysis.
 *
 * - Formulario con Server Action.
 * - Inputs rediseñados con "floating labels" animadas.
 * - Checkbox de consentimiento personalizado y accesible.
 * - Pantalla de éxito cinemática con micro-animaciones.
 */

type FormState =
  | { phase: "idle" }
  | { phase: "submitting" }
  | { phase: "success"; leadId: string }
  | { phase: "error"; result: Extract<LeadResult, { ok: false }> };

const ERROR_KEY_MAP: Record<string, string> = {
  required: "error_required",
  name_too_short: "error_name",
  name_too_long: "error_name",
  email_invalid: "error_email",
  phone_too_short: "error_phone",
  phone_too_long: "error_phone",
  phone_format: "error_phone",
  address_too_short: "error_address",
  address_too_long: "error_address",
  zip_not_florida: "error_zip_invalid",
  consent_required: "error_consent",
};

export function LeadForm() {
  const t = useTranslations("lead_form");
  const locale = useLocale();
  const reduced = useReducedMotion();
  const [state, setState] = useState<FormState>({ phase: "idle" });
  const [isPending, startTransition] = useTransition();

  const [consent, setConsent] = useState(false);

  async function handleSubmit(formData: FormData) {
    setState({ phase: "submitting" });
    startTransition(async () => {
      const result = await submitLead(formData);
      if (result.ok) {
        setState({ phase: "success", leadId: result.id });
      } else {
        setState({ phase: "error", result });
      }
    });
  }

  const errorForField = (field: string): string | undefined => {
    if (state.phase !== "error" || state.result.code !== "validation") return undefined;
    const code = state.result.fieldErrors?.[field as keyof typeof state.result.fieldErrors];
    if (!code) return undefined;
    const key = ERROR_KEY_MAP[code] ?? "error_generic";
    if (key === "error_zip_invalid") return t("error_zip_invalid");
    if (key === "error_required")
      return t.has?.("error_required") ? t("error_required") : t("error_generic");
    return t(key as Parameters<typeof t>[0]);
  };

  useEffect(() => {
    if (state.phase !== "error" || state.result.code !== "validation") return;
    const firstField = Object.keys(state.result.fieldErrors ?? {})[0];
    if (!firstField) return;
    document.getElementById(`lf-${firstField}`)?.focus();
  }, [state]);

  return (
    <section
      id="contact"
      aria-labelledby="lead-form-headline"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-base)",
        borderTop: "1px solid var(--color-border-subtle)",
      }}
    >
      <WaterParallaxBackground />
      <div className="container-content relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
            className="mb-4 inline-block text-xs uppercase"
            style={{
              letterSpacing: "var(--tracking-wide)",
              color: "var(--color-accent-primary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {t("eyebrow")}
          </motion.span>

          <motion.h2
            id="lead-form-headline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
            className="mb-4 text-balance"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, var(--text-5xl))",
              lineHeight: "var(--leading-heading)",
              letterSpacing: "var(--tracking-tighter)",
              fontWeight: 600,
            }}
          >
            {t("headline")}
          </motion.h2>

          <p
            className="mb-12 max-w-2xl text-pretty"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--leading-body)",
              color: "var(--color-fg-secondary)",
            }}
          >
            {t("lede")}
          </p>

          <AnimatePresence mode="wait">
            {state.phase === "success" ? (
              <motion.div
                key="success"
                initial={reduced ? false : { opacity: 0, y: 24, scale: 0.96 }}
                animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="glass-premium border p-12 text-center"
                style={{
                  borderColor: "var(--color-accent-primary)",
                  borderRadius: "var(--radius-2xl)",
                  backgroundColor:
                    "color-mix(in oklch, var(--color-accent-primary) 5%, var(--color-bg-elevated))",
                  boxShadow: "var(--shadow-glow)",
                }}
                role="status"
                aria-live="polite"
              >
                <motion.div
                  initial={reduced ? false : { scale: 0, rotate: -45 }}
                  animate={reduced ? undefined : { scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 15 }}
                  aria-hidden="true"
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "var(--color-accent-primary)",
                    color: "var(--color-fg-on-accent)",
                    boxShadow: "0 0 20px var(--color-accent-glow)",
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-3xl)",
                    color: "var(--color-fg-primary)",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  {t("success_title")}
                </h3>
                <p style={{ color: "var(--color-fg-secondary)", fontSize: "var(--text-base)" }}>
                  {t("success_lede")}
                </p>
                <p
                  className="mt-6"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-fg-muted)",
                    letterSpacing: "var(--tracking-wide)",
                  }}
                >
                  ref: {state.leadId.slice(0, 8)}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                action={handleSubmit}
                noValidate
                className="border p-8 md:p-12"
                style={{
                  borderColor: "var(--color-border-subtle)",
                  borderRadius: "var(--radius-2xl)",
                  backgroundColor: "color-mix(in oklch, var(--color-bg-elevated) 82%, transparent)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="source" value="website_scrollytelling" />
                <input type="hidden" name="campaign" value="free_home_water_analysis" />
                <input type="hidden" name="consentText" value={t("consent")} />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field
                    label={t("label_name")}
                    name="name"
                    autoComplete="name"
                    required
                    error={errorForField("name")}
                  />
                  <Field
                    label={t("label_email")}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    error={errorForField("email")}
                  />
                  <Field
                    label={t("label_phone")}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    error={errorForField("phone")}
                  />
                  <Field
                    label={t("label_zip")}
                    name="zip"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    required
                    error={errorForField("zip")}
                  />
                </div>
                <div className="mt-6">
                  <Field
                    label={t("label_address")}
                    name="address"
                    autoComplete="street-address"
                    required
                    error={errorForField("address")}
                  />
                </div>

                {/* Consentimiento accesible personalizado · focus ring via peer */}
                <label className="group mt-8 flex cursor-pointer items-start gap-3.5 select-none">
                  <input
                    id="lf-consent"
                    type="checkbox"
                    name="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    aria-invalid={errorForField("consent") ? "true" : undefined}
                    aria-describedby={errorForField("consent") ? "lf-consent-err" : undefined}
                    className="peer sr-only"
                  />
                  <div
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-all duration-200 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2"
                    style={{
                      borderColor: errorForField("consent")
                        ? "var(--color-danger)"
                        : consent
                          ? "var(--color-accent-primary)"
                          : "var(--color-border-strong)",
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: consent ? "var(--color-accent-primary)" : "transparent",
                      boxShadow: consent ? "0 0 8px var(--color-accent-glow)" : "none",
                      outlineColor: "var(--color-accent-primary)",
                    }}
                  >
                    {consent && (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-fg-on-accent)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--color-fg-secondary)",
                      lineHeight: "var(--leading-body)",
                    }}
                  >
                    {t("consent")}
                  </span>
                </label>

                <AnimatePresence>
                  {errorForField("consent") && (
                    <motion.p
                      id="lf-consent-err"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mt-2 px-1 text-sm"
                      style={{ color: "var(--color-danger)", fontFamily: "var(--font-mono)" }}
                      role="alert"
                    >
                      {errorForField("consent")}
                    </motion.p>
                  )}
                </AnimatePresence>

                {state.phase === "error" && state.result.code !== "validation" && (
                  <p
                    className="mt-6 rounded-lg border px-4 py-3 text-sm"
                    style={{
                      borderColor: "var(--color-danger)",
                      color: "var(--color-danger)",
                      backgroundColor: "color-mix(in oklch, var(--color-danger) 8%, transparent)",
                    }}
                    role="alert"
                  >
                    {t("error_generic")}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={state.phase === "submitting" || isPending}
                  className="mt-10 inline-flex w-full cursor-pointer items-center justify-center rounded-full px-8 py-4 font-medium transition-[background-color,box-shadow,opacity,transform] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                  style={{
                    backgroundColor: "var(--color-accent-primary)",
                    color: "var(--color-fg-on-accent)",
                    fontFamily: "var(--font-body)",
                    transitionDuration: "var(--duration-base)",
                    transitionTimingFunction: "var(--ease-standard)",
                    boxShadow: "var(--shadow-glow)",
                  }}
                >
                  {state.phase === "submitting" || isPending ? t("submitting") : t("submit")}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");

  const isFloating = focused || val.length > 0;

  return (
    <div className="relative mt-2 w-full">
      <input
        id={`lf-${name}`}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `lf-${name}-err` : undefined}
        spellCheck={type === "email" ? false : undefined}
        value={val}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setVal(e.target.value)}
        className="w-full border bg-transparent px-4 pt-6 pb-2 transition-all focus:outline-none"
        style={{
          borderColor: error
            ? "var(--color-danger)"
            : focused
              ? "var(--color-accent-primary)"
              : "var(--color-border-subtle)",
          borderRadius: "var(--radius-lg)",
          color: "var(--color-fg-primary)",
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-base)",
          boxShadow: focused ? "0 0 10px var(--color-accent-glow)" : "none",
          transitionDuration: "var(--duration-fast)",
        }}
      />
      <label
        htmlFor={`lf-${name}`}
        className="pointer-events-none absolute left-4 transition-all duration-200"
        style={{
          top: isFloating ? "6px" : "17px",
          fontSize: isFloating ? "var(--text-xs)" : "var(--text-base)",
          fontFamily: "var(--font-mono)",
          color: error
            ? "var(--color-danger)"
            : focused
              ? "var(--color-accent-primary)"
              : "var(--color-fg-muted)",
          letterSpacing: "var(--tracking-wide)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>

      <AnimatePresence>
        {error && (
          <motion.p
            id={`lf-${name}-err`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 px-1 text-xs"
            style={{ color: "var(--color-danger)", fontFamily: "var(--font-mono)" }}
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
