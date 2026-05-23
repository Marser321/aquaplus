"use client";

import { useEffect, useRef } from "react";

/**
 * Singleton ref que mantiene el progreso global del scroll del Hero (0..1).
 * Sincronizado vía ScrollTrigger desde el Hero component (lado cliente).
 *
 * Por qué un singleton: el WaterScene (que vive dentro del Canvas R3F) y el
 * Hero component no comparten árbol React. Necesitan acceso compartido a un
 * valor mutado por frame sin re-renderear. La ref module-scope lo resuelve
 * sin context provider ni state managers.
 *
 * Lectura por frame en WaterScene:
 *   import { scrollProgressRef } from "@/components/3d/hooks/useScrollTimeline";
 *   ... uniforms.uScrollProgress.value = scrollProgressRef.current;
 *
 * Escritura desde Hero (GSAP ScrollTrigger onUpdate):
 *   scrollProgressRef.current = self.progress;
 */
export const scrollProgressRef = { current: 0 };

/**
 * Progreso del scroll dentro del Stage Ósmosis (0..1).
 * Escrito por `StageOsmosis` vía ScrollTrigger; leído por `OsmosisScene` cada frame.
 */
export const osmosisProgressRef = { current: 0 };

/**
 * Progreso del scroll dentro del Stage Conversión (0..1).
 */
export const conversionProgressRef = { current: 0 };

/**
 * Progreso del scroll dentro del Stage Reestructuración Molecular (0..1).
 */
export const molecularProgressRef = { current: 0 };

/**
 * Progreso del scroll dentro del Stage Ionización (0..1).
 */
export const ionizationProgressRef = { current: 0 };

/**
 * Progreso del scroll dentro del CTA section (assembly 3D).
 */
export const assemblyProgressRef = { current: 0 };

/**
 * Indicador de stage activo (0=hero, 1=osmosis, 2=conversion, 3=molecular, 4=ionization, 5=cta).
 * El WaterCanvas decide qué sub-escenas renderizar y cómo posicionar la cámara.
 */
export const STORY_STAGE = {
  hero: "hero",
  osmosis: "osmosis",
  conversion: "conversion",
  molecular: "molecular",
  ionization: "ionization",
  cta: "cta",
} as const;

export type StageId = keyof typeof STORY_STAGE;
export type StoryStage = (typeof STORY_STAGE)[StageId];

export const activeStageRef: { current: StoryStage } = {
  current: STORY_STAGE.hero,
};

/**
 * Hook React opcional para componentes que quieran reactivamente saber el progreso
 * (no usado por el shader, pero útil para sidebars/text reveals que necesitan re-render).
 *
 * NO uses esto en useFrame del Canvas; ahí leés `scrollProgressRef.current` directo
 * para no triggerear renders por frame.
 */
export function useScrollProgress(): React.MutableRefObject<number> {
  const ref = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      ref.current = scrollProgressRef.current;
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return ref;
}
