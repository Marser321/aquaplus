"use client";

import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { waterFragment, waterVertex } from "./shaders/waterShaders";
import {
  activeStageRef,
  conversionProgressRef,
  ionizationProgressRef,
  osmosisProgressRef,
  scrollProgressRef,
  STORY_STAGE,
} from "./hooks/useScrollTimeline";

/**
 * Plano principal del Hero · simulación líquida via ShaderMaterial custom.
 *
 * Uniforms:
 *   uTime           - reloj global, avanza cada frame.
 *   uScrollProgress - 0..1 progreso del scroll en el hero (200vh).
 *   uMouse          - posición normalizada del puntero, interpolada con lerp.
 *   uResolution     - tamaño del canvas en pixels (para shaders dependientes).
 *
 * Performance:
 *   - Plane 1x1 subdividido 128x128 = 16.5k vertices. Aceptable mobile mid-range.
 *   - Una sola passada de shader, transparent + depthWrite=false (no Z-buffer).
 *   - `useFrame` se desactiva con frameloop="demand" o cuando se ocultan secciones (TODO siguientes slices).
 */
export function WaterScene() {
  const { viewport, pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScrollProgress: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useFrame((state) => {
    if (activeStageRef.current !== STORY_STAGE.hero) return;

    // Mutamos uniforms locales directamente (Three.js los lee por referencia).
    // Esto evita los undefined-checks de TypeScript sobre Material.uniforms record.
    uniforms.uTime.value = state.clock.elapsedTime;

    // Lerp suave del mouse para evitar saltos bruscos cuando se mueve rápido.
    uniforms.uMouse.value.lerp(pointer, 0.07);

    // Progreso de scroll · driven por GSAP ScrollTrigger del Hero (singleton ref).
    // Si el Hero no montó todavía o ScrollTrigger no se inicializó, el ref queda
    // en 0 y el shader renderiza el estado inicial limpio.
    uniforms.uScrollProgress.value = scrollProgressRef.current;

    uniforms.uResolution.value.set(state.size.width, state.size.height);
  });

  // El plano cubre el viewport completo (escala con el tamaño físico de la cámara perspective).
  return (
    <mesh scale={[viewport.width * 1.6, viewport.height * 1.6, 1]} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1, 128, 128]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={waterVertex}
        fragmentShader={waterFragment}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * Lightweight camera director for the molecular journey.
 * It turns the global canvas from a static background into a controlled sequence.
 */
export function StoryCameraRig() {
  const target = useMemo(() => new THREE.Vector3(0, 0, 3.5), []);
  const lookAt = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const { camera } = useThree();

  useFrame(() => {
    if (activeStageRef.current !== STORY_STAGE.hero) return;

    const stage = activeStageRef.current;

    if (stage === STORY_STAGE.hero) {
      target.set(
        THREE.MathUtils.lerp(0, -0.35, scrollProgressRef.current),
        THREE.MathUtils.lerp(0, 0.1, scrollProgressRef.current),
        THREE.MathUtils.lerp(3.5, 3.05, scrollProgressRef.current),
      );
      lookAt.set(0.1, 0, 0);
    } else if (stage === STORY_STAGE.osmosis) {
      target.set(
        THREE.MathUtils.lerp(0.45, 0.95, osmosisProgressRef.current),
        THREE.MathUtils.lerp(0.1, -0.08, osmosisProgressRef.current),
        THREE.MathUtils.lerp(3.15, 2.35, osmosisProgressRef.current),
      );
      lookAt.set(0.9, 0, -0.35);
    } else if (stage === STORY_STAGE.conversion) {
      target.set(
        THREE.MathUtils.lerp(-0.55, -1.05, conversionProgressRef.current),
        THREE.MathUtils.lerp(0.1, 0.28, conversionProgressRef.current),
        THREE.MathUtils.lerp(3, 2.55, conversionProgressRef.current),
      );
      lookAt.set(-0.75, 0.05, 0);
    } else if (stage === STORY_STAGE.ionization) {
      target.set(
        THREE.MathUtils.lerp(0.15, 0.55, ionizationProgressRef.current),
        0,
        THREE.MathUtils.lerp(2.85, 2.1, ionizationProgressRef.current),
      );
      lookAt.set(0.1, 0, 0);
    } else {
      target.set(0, 0.15, 3.2);
      lookAt.set(0, 0, 0);
    }

    camera.position.lerp(target, 0.055);
    camera.lookAt(lookAt);
  });

  return null;
}

/**
 * Hook explícito de cleanup del contexto WebGL.
 * Decisión referenciada: D-04 (cleanup obligatorio para evitar leaks de GPU al cambiar de página).
 * Aunque R3F ya dispone el renderer al unmount, este extra asegura que ningún navegador
 * (Safari especialmente) retenga el contexto en memoria.
 */
export function WebGLContextCleanup() {
  const { gl } = useThree();

  useEffect(() => {
    return () => {
      const context = gl.getContext();
      const loseContext = context.getExtension("WEBGL_lose_context");
      if (loseContext) {
        loseContext.loseContext();
      }
      gl.dispose();
    };
  }, [gl]);

  return null;
}
