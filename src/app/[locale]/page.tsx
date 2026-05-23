import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { WaterCanvasMount } from "@/components/3d/WaterCanvasMount";
import { Hero } from "@/components/sections/Hero";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import { StageOsmosis } from "@/components/sections/StageOsmosis";
import { EndorsementQuote } from "@/components/sections/EndorsementQuote";
import { StageConversion } from "@/components/sections/StageConversion";
import { StageMolecular } from "@/components/sections/StageMolecular";
import { StageIonization } from "@/components/sections/StageIonization";
import { SequenceCanvas } from "@/components/sections/SequenceCanvas";
import { DeferredSections } from "@/components/sections/DeferredSections";
import { Footer } from "@/components/sections/Footer";

/**
 * Home (Server Component) · monta el canvas via gate cliente para preservar SSR
 * del contenido del Hero (SEO + LCP rápido).
 *
 * Estructura del scroll storytelling Fase 1:
 *   1. <Hero/>                 200vh — pinning + headline reveal palabra-por-palabra
 *   2. <TrustMarquee/>         conceptos químicos en loop horizontal (C.P3)
 *   3. <DataStripSection/>     ficha clínica del agua ionizada (server)
 *   4. <StageOsmosis/>         300vh — partículas contaminantes vs membrana (C.2)
 *   5. <EndorsementQuote/>     bloque editorial con Spotlight follow (C.3)
 *   6. <StageConversion/>      300vh — esferas minerales + pH live (C.4)
 *   7. <StageMolecular/>       300vh — geometría cristalina + clúster live (Fase 3 nueva)
 *   8. <StageIonization/>      600vh — doble altura celular: hidratación + antioxidante (Fase 4 combinada)
 *   9. <ComparisonTable/>      6 muestras × 4 columnas científicas (C.6)
 *  10. <Calculator/>           ROI + huella plástica con NumberTicker (C.7)
 *  11. <LeadForm/>             análisis gratuito + Florida ZIP + Server Action (C.8)
 *  12. <CTASection/>           assembly 3D rotando + ShimmerButton (C.9)
 *  13. <Footer/>               grid 4-cols + Spotlight wordmark (C.10)
 */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Canvas WebGL global · vive en z:0 fijo detrás de todo el contenido (D-04). */}
      <Suspense fallback={null}>
        <WaterCanvasMount />
      </Suspense>

      {/* Reproductor de secuencias de imágenes 2D Canvas */}
      <SequenceCanvas />

      <main id="top" className="relative z-10">
        <Hero />
        <TrustMarquee />
        <StageOsmosis />
        <EndorsementQuote />
        <StageConversion />
        <StageMolecular />
        <StageIonization />
        <DeferredSections />
      </main>
      <Footer />
    </>
  );
}
