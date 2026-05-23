"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Instances, Instance, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { conversionProgressRef } from "@/components/3d/hooks/useScrollTimeline";
import { THREE_COLORS } from "@/components/3d/theme";

/**
 * Stage Conversión Inversa · sub-escena WebGL del viaje molecular (Fase 2).
 *
 * Composición:
 *   - 6 "esferas minerales" doradas (Ca²⁺ + Mg²⁺) en arreglo curvado.
 *   - Partículas teal de "agua purificada" en flujo continuo cruzando entre ellas.
 *   - Sparkles dorados que sugieren la disolución mineral activa.
 *
 * El conjunto rota lentamente sobre el eje Y; el alpha global se modula por
 * `conversionProgressRef`.
 */

const MINERAL_COUNT = 7;
const WATER_PARTICLE_COUNT = 600;

interface WaterParticle {
  basePos: THREE.Vector3;
  speed: number;
  phase: number;
}

export function ConversionScene() {
  const groupRef = useRef<THREE.Group | null>(null);
  const mineralRefs = useRef<Array<THREE.Object3D | null>>([]);
  const waterRefs = useRef<Array<THREE.Object3D | null>>([]);

  // Posiciones fijas para las esferas minerales (arreglo curvo)
  const mineralPositions = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < MINERAL_COUNT; i++) {
      const t = i / (MINERAL_COUNT - 1); // 0..1
      const angle = (t - 0.5) * Math.PI * 0.8;
      arr.push(new THREE.Vector3(Math.sin(angle) * 1.6, (t - 0.5) * 1.4, Math.cos(angle) * 0.5));
    }
    return arr;
  }, []);

  const waterParticles = useMemo<WaterParticle[]>(() => {
    const arr: WaterParticle[] = [];
    for (let i = 0; i < WATER_PARTICLE_COUNT; i++) {
      arr.push({
        basePos: new THREE.Vector3(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 1.5,
        ),
        speed: 0.5 + Math.random() * 0.8,
        phase: Math.random(),
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const progress = conversionProgressRef.current;
    const time = state.clock.elapsedTime;

    const fadeIn = THREE.MathUtils.smoothstep(progress, 0.0, 0.15);
    const fadeOut = 1.0 - THREE.MathUtils.smoothstep(progress, 0.85, 1.0);
    const opacity = fadeIn * fadeOut;

    groupRef.current.visible = opacity > 0.02;
    if (!groupRef.current.visible) return;

    // Group rotates slowly to give 3D depth
    groupRef.current.rotation.y = time * 0.08;

    // Mineral spheres pulse subtly
    for (let i = 0; i < mineralPositions.length; i++) {
      const inst = mineralRefs.current[i];
      const pos = mineralPositions[i];
      if (!inst || !pos) continue;
      const pulse = 1 + Math.sin(time * 1.5 + i * 0.7) * 0.08;
      inst.position.copy(pos);
      inst.scale.setScalar(0.25 * pulse * opacity);
      inst.updateMatrix();
    }

    // Water particles flow through the mineral array
    for (let i = 0; i < waterParticles.length; i++) {
      const inst = waterRefs.current[i];
      const p = waterParticles[i];
      if (!inst || !p) continue;
      const cycle = (time * p.speed * 0.2 + p.phase) % 1.0;
      const x = -2.5 + cycle * 5.0;
      const y = p.basePos.y + Math.sin(time * 0.7 + p.phase * 6.28) * 0.15;
      const z = p.basePos.z + Math.cos(time * 0.4 + p.phase * 3.14) * 0.1;
      inst.position.set(x, y, z);
      inst.scale.setScalar(0.018 * opacity);
      inst.updateMatrix();
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* Esferas minerales doradas */}
      <Instances limit={MINERAL_COUNT + 2}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial
          color={THREE_COLORS.mineralGold}
          emissive={THREE_COLORS.mineralGold}
          emissiveIntensity={0.35}
          roughness={0.4}
          metalness={0.7}
        />
        {mineralPositions.map((_, idx) => (
          <Instance
            key={idx}
            ref={(el: THREE.Object3D | null) => {
              mineralRefs.current[idx] = el;
            }}
          />
        ))}
      </Instances>

      {/* Partículas de agua teal */}
      <Instances limit={WATER_PARTICLE_COUNT + 10}>
        <sphereGeometry args={[1, 6, 4]} />
        <meshBasicMaterial color={THREE_COLORS.accentTeal} transparent opacity={0.58} />
        {waterParticles.map((_, idx) => (
          <Instance
            key={idx}
            ref={(el: THREE.Object3D | null) => {
              waterRefs.current[idx] = el;
            }}
          />
        ))}
      </Instances>

      {/* Sparkles doradas */}
      <Sparkles
        count={42}
        scale={[3, 3, 1.5]}
        size={2}
        speed={0.35}
        color={THREE_COLORS.warmSand}
        opacity={0.55}
      />

      {/* Ambient subtle light to lift the minerals */}
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 3]} intensity={1.2} color={THREE_COLORS.warmSand} />
    </group>
  );
}
