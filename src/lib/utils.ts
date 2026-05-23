import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Concatena clases de Tailwind respetando overrides (last-wins).
 * Patrón estándar del ecosistema shadcn/cva.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
