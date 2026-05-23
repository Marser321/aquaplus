/**
 * Validador de ZIP del estado de Florida (USA).
 *
 * Decisión: D-13 en docs/CONTEXT.md · el lead form acepta ZIP de TODO Florida.
 *
 * Rango oficial USPS para Florida: 32003–34997 (continuos en su mayoría).
 * Hay excepciones documentadas: 32099, 33999, 34999 no están asignados a uso postal.
 *
 * Si en el futuro se restringe a tri-county metropolitano (Miami-Dade + Broward + Palm Beach),
 * versionar como D-13.1 y cambiar la implementación de `isFloridaZip` sin tocar el resto.
 */

const FLORIDA_ZIP_MIN = 32003;
const FLORIDA_ZIP_MAX = 34997;

/**
 * Algunos códigos del rango no están asignados a uso postal (USPS database).
 * Lista mantenida explícitamente para evitar falsos positivos legítimos.
 */
const UNASSIGNED_FLORIDA_ZIPS = new Set<number>([32099, 33999, 34999]);

/**
 * @param zip Código postal en formato string (5 dígitos US).
 * @returns true si el ZIP corresponde a una zona postal válida del estado de Florida.
 */
export function isFloridaZip(zip: string): boolean {
  const trimmed = zip.trim();
  if (!/^\d{5}$/.test(trimmed)) {
    return false;
  }
  const numeric = Number.parseInt(trimmed, 10);
  if (Number.isNaN(numeric)) {
    return false;
  }
  if (numeric < FLORIDA_ZIP_MIN || numeric > FLORIDA_ZIP_MAX) {
    return false;
  }
  if (UNASSIGNED_FLORIDA_ZIPS.has(numeric)) {
    return false;
  }
  return true;
}
