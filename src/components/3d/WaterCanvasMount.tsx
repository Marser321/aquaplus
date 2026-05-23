"use client";

import dynamic from "next/dynamic";

/**
 * Gate cliente para cargar WaterCanvas con `ssr: false`.
 *
 * Razón: Next.js 15 prohíbe `dynamic({ ssr: false })` dentro de Server Components.
 * Este componente vive en el cliente y delega el dynamic import al runtime del browser,
 * permitiendo que `page.tsx` siga siendo Server Component (SEO + LCP).
 *
 * El canvas no se monta hasta después de la hidratación, lo que protege el LCP
 * del Hero: el headline + CTA pintan primero, el canvas entra después.
 */
const WaterCanvas = dynamic(
  () => import("@/components/3d/WaterCanvas").then((mod) => mod.WaterCanvas),
  {
    ssr: false,
    // Mientras carga el bundle WebGL, mostramos un fallback gradient estático
    // para que el background nunca esté en blanco (evita FOUC).
    loading: () => (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: [
            "radial-gradient(ellipse at 50% 30%, var(--color-accent-subtle) 0%, transparent 60%)",
            "linear-gradient(180deg, var(--color-bg-base) 0%, var(--color-bg-elevated) 100%)",
          ].join(", "),
        }}
      />
    ),
  },
);

export function WaterCanvasMount() {
  return <WaterCanvas />;
}
