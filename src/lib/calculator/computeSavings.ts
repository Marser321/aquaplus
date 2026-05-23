/**
 * Calculadora de impacto financiero y ecológico · Aqua+ Systems.
 *
 * Premisas (Florida 2026):
 *   - Promedio consumo: 1.5 L/persona/día de agua potable de calidad.
 *   - Botella plástica estándar: 0.5 L.
 *   - Huella de carbono por botella PET: 82.8 g CO₂eq (referencia PMC 2021).
 *   - Sistema Aqua+ tiene un costo amortizado anual que estimamos ~15% del gasto
 *     mensual actual de embotellada → ahorro neto 85% del gasto actual.
 *
 * Función pura, sin side effects. Fácil de testear.
 */

export interface SavingsInput {
  /** Habitantes del hogar (1-12) */
  people: number;
  /** Gasto mensual actual en agua embotellada (USD) */
  monthlySpendUsd: number;
}

export interface SavingsOutput {
  /** USD ahorrados al año (vs continuar comprando embotellada) */
  yearlySavingsUsd: number;
  /** Botellas plásticas evitadas al año */
  bottlesAvoided: number;
  /** kgCO₂eq evitadas al año */
  carbonAvoidedKg: number;
}

const DAILY_LITERS_PER_PERSON = 1.5;
const DAYS_PER_YEAR = 365;
const BOTTLE_VOLUME_L = 0.5;
const CARBON_PER_BOTTLE_KG = 0.0828; // 82.8 g per 0.5L PET bottle
const AQUA_PLUS_COST_RATIO = 0.15; // 15% del gasto actual amortizado

export function computeSavings({ people, monthlySpendUsd }: SavingsInput): SavingsOutput {
  const safePeople = Math.max(1, Math.min(12, Math.round(people)));
  const safeSpend = Math.max(0, monthlySpendUsd);

  // Yearly savings · spend mensual * 12 * (1 - amortization ratio)
  const yearlySavingsUsd = safeSpend * 12 * (1 - AQUA_PLUS_COST_RATIO);

  // Bottles avoided · consumo total año / volumen botella
  const yearlyLiters = safePeople * DAILY_LITERS_PER_PERSON * DAYS_PER_YEAR;
  const bottlesAvoided = Math.round(yearlyLiters / BOTTLE_VOLUME_L);

  // Carbon avoided
  const carbonAvoidedKg = bottlesAvoided * CARBON_PER_BOTTLE_KG;

  return {
    yearlySavingsUsd: Math.round(yearlySavingsUsd),
    bottlesAvoided,
    carbonAvoidedKg: Math.round(carbonAvoidedKg * 10) / 10, // 1 decimal
  };
}
