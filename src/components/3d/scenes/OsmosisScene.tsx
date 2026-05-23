"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Instances, Instance } from "@react-three/drei";
import * as THREE from "three";
import {
  activeStageRef,
  osmosisProgressRef,
  STORY_STAGE,
} from "@/components/3d/hooks/useScrollTimeline";
import { THREE_COLORS } from "@/components/3d/theme";
import { membraneFragment, membraneVertex } from "@/components/3d/shaders/osmosisShaders";

/**
 * Stage Ósmosis · sub-escena WebGL del viaje molecular.
 *
 * Composición:
 *   - Membrana semipermeable: plano con shader de hexágonos pulsantes (poros).
 *     Posicionada en z=-1.0, ligeramente atrás del plano del agua.
 *   - Partículas contaminantes: 3 tipos (PFAS rojo, Metales gris, Microplásticos verde
 *     apagado) instanciadas con drei `Instances`. Vuelan hacia la membrana y se
 *     "consumen" (alpha decay + reposicionamiento).
 *
 * Visibilidad: el componente sólo renderiza geometría cuando `osmosisProgressRef`
 * supera el threshold mínimo. Fuera de ese rango devuelve `null` para liberar GPU.
 *
 * Cleanup: las geometrías y materiales se disponen automáticamente cuando R3F
 * unmonta el subárbol (al volver a null).
 */

const PARTICLE_COUNT = 1200;
const CONTAMINANT_COLORS = [
  new THREE.Color(THREE_COLORS.pfas),
  new THREE.Color(THREE_COLORS.metal),
  new THREE.Color(THREE_COLORS.microplastic),
];

interface ParticleState {
  basePos: THREE.Vector3;
  speed: number;
  type: 0 | 1 | 2;
  phase: number; // 0..1 cycle position
}

export function OsmosisScene() {
  const groupRef = useRef<THREE.Group | null>(null);
  const instancesRefs = useRef<Array<THREE.Object3D | null>>([]);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const membraneUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOsmosisProgress: { value: 0 },
    }),
    [],
  );

  // Partículas con posiciones aleatorias y tipo asignado
  const particles = useMemo<ParticleState[]>(() => {
    const arr: ParticleState[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.25 + Math.random() * 1.65;
      arr.push({
        basePos: new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          1.5 + Math.random() * 4.0, // empieza adelante (camera-facing)
        ),
        speed: 0.3 + Math.random() * 0.6,
        type: (i % 3) as 0 | 1 | 2,
        phase: Math.random(),
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const isActive = activeStageRef.current === STORY_STAGE.osmosis;
    const progress = isActive ? osmosisProgressRef.current : 0;
    const time = state.clock.elapsedTime;

    // Update membrane shader uniforms
    if (materialRef.current) {
      membraneUniforms.uTime.value = time;
      membraneUniforms.uOsmosisProgress.value = progress;
    }

    // Group opacity follows the progress curve (entrada + exit)
    const fadeIn = THREE.MathUtils.smoothstep(progress, 0.0, 0.15);
    const fadeOut = 1.0 - THREE.MathUtils.smoothstep(progress, 0.85, 1.0);
    const groupOpacity = fadeIn * fadeOut;
    groupRef.current.visible = groupOpacity > 0.02;
    if (!groupRef.current.visible) return;

    const desktopSceneOffset = state.viewport.width > 5 ? 1.25 : 0.3;
    const targetScale = state.viewport.width > 5 ? 0.82 : 0.68;
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      desktopSceneOffset,
      0.06,
    );
    groupRef.current.scale.setScalar(targetScale);

    // Update particle positions
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const inst = instancesRefs.current[i];
      if (!p || !inst) continue;

      // Cycle position: each particle has its own phase, cycles every ~3s adjusted by speed
      const cycle = (time * p.speed * 0.3 + p.phase) % 1.0;

      // Z travels from initial position to -0.5 (past the membrane)
      const z = p.basePos.z - cycle * (p.basePos.z + 0.5);

      // Slight wobble on x/y for organic feel
      const wobble = Math.sin(time * 2 + p.phase * 6.28) * 0.08;

      inst.position.set(p.basePos.x + wobble, p.basePos.y + wobble * 0.7, z);

      // Particle gets "absorbed" near membrane (z ~ -0.1): shrink rapidly
      const distToMembrane = Math.max(0, z + 0.5) / Math.max(0.5, p.basePos.z + 0.5);
      const scale = Math.min(1.0, distToMembrane * 1.4) * 0.026;
      inst.scale.setScalar(scale);

      inst.updateMatrix();
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Membrana semipermeable */}
      <mesh position={[0, 0, -1.0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[6, 6, 1, 1]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={membraneUniforms}
          vertexShader={membraneVertex}
          fragmentShader={membraneFragment}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Partículas contaminantes — tres colores */}
      {[0, 1, 2].map((typeIdx) => (
        <Instances key={typeIdx} limit={Math.ceil(PARTICLE_COUNT / 3) + 50}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial
            color={CONTAMINANT_COLORS[typeIdx]}
            transparent
            opacity={0.85}
            depthWrite={false}
          />
          {particles
            .map((p, idx) => ({ p, idx }))
            .filter(({ p }) => p.type === typeIdx)
            .map(({ idx }) => (
              <Instance
                key={idx}
                ref={(el: THREE.Object3D | null) => {
                  instancesRefs.current[idx] = el;
                }}
              />
            ))}
        </Instances>
      ))}
    </group>
  );
}
