/**
 * Three.js color tokens.
 *
 * CSS `oklch(...)` works in the DOM, but Three.js does not parse it.
 * These sRGB approximations mirror the UI-SPEC palette for WebGL materials.
 */
export const THREE_COLORS = {
  bgBase: "#07152d",
  bgElevated: "#112845",
  brandNavy: "#173a75",
  brandNavySoft: "#265889",
  accentTeal: "#55d8c3",
  accentTealSoft: "#9cf0e3",
  mineralGold: "#d7b85b",
  warmSand: "#d0bd86",
  pfas: "#c56454",
  metal: "#9aa8ba",
  microplastic: "#79c58f",
  titanium: "#586579",
  acidWarm: "#d89270",
  pearl: "#e6f4f4",
} as const;

export type ThreeColorToken = keyof typeof THREE_COLORS;
