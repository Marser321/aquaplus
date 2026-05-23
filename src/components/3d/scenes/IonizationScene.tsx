"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Instances, Instance, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { ionizationProgressRef } from "@/components/3d/hooks/useScrollTimeline";
import { THREE_COLORS } from "@/components/3d/theme";
import { plasmaFragment, plasmaVertex } from "@/components/3d/shaders/plasmaShaders";

/**
 * Stage Ionización · sub-escena WebGL del viaje molecular (Fase 3 · clímax).
 *
 * Composición:
 *   - 2 placas verticales (electrodos titanio/platino) izquierda + derecha.
 *   - Columna de plasma teal en el centro, generada por shader FBM con
 *     chromatic aberration sutil.
 *   - GPU particles de microburbujas H₂ ascendiendo desde la placa catódica.
 *   - Sparkles densas en la parte superior (drei) que sugieren activación del
 *     hidrógeno molecular.
 */

const BUBBLE_COUNT = 280;

interface BubbleState {
  baseX: number;
  baseZ: number;
  startY: number;
  speed: number;
  phase: number;
}

export function IonizationScene() {
  const groupRef = useRef<THREE.Group | null>(null);
  const bubbleRefs = useRef<Array<THREE.Object3D | null>>([]);
  const plasmaMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  const plasmaUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIonizationProgress: { value: 0 },
    }),
    [],
  );

  const bubbles = useMemo<BubbleState[]>(() => {
    const arr: BubbleState[] = [];
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      arr.push({
        baseX: (Math.random() - 0.5) * 0.6, // cerca del centro entre placas
        baseZ: (Math.random() - 0.5) * 0.4,
        startY: -1.5 - Math.random() * 0.5,
        speed: 0.6 + Math.random() * 0.8,
        phase: Math.random(),
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const progress = ionizationProgressRef.current;
    const time = state.clock.elapsedTime;

    const fadeIn = THREE.MathUtils.smoothstep(progress, 0.0, 0.15);
    const fadeOut = 1.0 - THREE.MathUtils.smoothstep(progress, 0.9, 1.0);
    const opacity = fadeIn * fadeOut;

    groupRef.current.visible = opacity > 0.02;
    if (!groupRef.current.visible) return;

    if (plasmaMaterialRef.current) {
      plasmaUniforms.uTime.value = time;
      plasmaUniforms.uIonizationProgress.value = progress;
    }

    // Bubbles ascend from cathode (bottom) to top
    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i];
      const inst = bubbleRefs.current[i];
      if (!b || !inst) continue;

      // Cycle: each bubble travels from startY to +1.5 over its phase
      const cycle = (time * b.speed * 0.25 + b.phase) % 1.0;
      const y = b.startY + cycle * 3.0;

      // Slight horizontal wobble
      const wobble = Math.sin(time * 1.6 + b.phase * 6.28) * 0.1;

      inst.position.set(b.baseX + wobble, y, b.baseZ);
      // Bubble grows as it ascends, then fades at top
      const lifeT = Math.min(1, cycle * 1.4);
      const fadeTop = 1.0 - THREE.MathUtils.smoothstep(cycle, 0.85, 1.0);
      const scale = lifeT * fadeTop * 0.035 * opacity;
      inst.scale.setScalar(scale);
      inst.updateMatrix();
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* Plasma columna central */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.6, 3.2, 1, 1]} />
        <shaderMaterial
          ref={plasmaMaterialRef}
          uniforms={plasmaUniforms}
          vertexShader={plasmaVertex}
          fragmentShader={plasmaFragment}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Electrodo izquierda (cátodo) */}
      <mesh position={[-1.0, 0, -0.3]}>
        <boxGeometry args={[0.04, 2.8, 0.5]} />
        <meshStandardMaterial
          color={THREE_COLORS.titanium}
          emissive={THREE_COLORS.accentTeal}
          emissiveIntensity={0.18}
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* Electrodo derecha (ánodo) */}
      <mesh position={[1.0, 0, -0.3]}>
        <boxGeometry args={[0.04, 2.8, 0.5]} />
        <meshStandardMaterial
          color={THREE_COLORS.titanium}
          emissive={THREE_COLORS.acidWarm}
          emissiveIntensity={0.1}
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* Microburbujas H₂ — ascienden desde el cátodo */}
      <Instances limit={BUBBLE_COUNT + 10}>
        <sphereGeometry args={[1, 6, 4]} />
        <meshBasicMaterial color={THREE_COLORS.accentTealSoft} transparent opacity={0.78} />
        {bubbles.map((_, idx) => (
          <Instance
            key={idx}
            ref={(el: THREE.Object3D | null) => {
              bubbleRefs.current[idx] = el;
            }}
          />
        ))}
      </Instances>

      {/* Sparkles superiores · activación H₂ */}
      <Sparkles
        count={120}
        scale={[3, 1.5, 1]}
        position={[0, 1.4, 0]}
        size={2.5}
        speed={0.5}
        color={THREE_COLORS.accentTeal}
        opacity={0.9}
      />

      {/* Iluminación que resalta los electrodos */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 1.5]} intensity={1.6} color={THREE_COLORS.accentTeal} />
    </group>
  );
}
