"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { assemblyProgressRef } from "@/components/3d/hooks/useScrollTimeline";
import { THREE_COLORS } from "@/components/3d/theme";

/**
 * Assembly 3D · premium abstract cabinet.
 *
 * Represents the real product more credibly than loose primitives: a dark
 * cabinet, glass face, membrane cartridge, mineral reactor and ionization cell.
 */
export function AssemblyScene() {
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Quitamos la rotación manual en Y para evitar conflictos con OrbitControls
    groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.03 + 0.05;
    groupRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.008);
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[1.45, 3.4, 0.62]} />
        <meshStandardMaterial
          color={THREE_COLORS.bgElevated}
          emissive={THREE_COLORS.brandNavy}
          emissiveIntensity={0.12}
          metalness={0.55}
          roughness={0.28}
        />
      </mesh>

      <mesh position={[0, 0, 0.285]}>
        <boxGeometry args={[1.28, 3.08, 0.035]} />
        <meshPhysicalMaterial
          color={THREE_COLORS.accentTealSoft}
          roughness={0.08}
          metalness={0.05}
          transparent
          opacity={0.18}
          transmission={0.55}
        />
      </mesh>

      <group position={[0, 1.05, 0.34]}>
        <mesh>
          <cylinderGeometry args={[0.36, 0.36, 0.74, 32, 1, true]} />
          <meshStandardMaterial
            color={THREE_COLORS.brandNavySoft}
            emissive={THREE_COLORS.accentTeal}
            emissiveIntensity={0.18}
            metalness={0.7}
            roughness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      <group position={[0, 0.05, 0.34]}>
        <mesh>
          <icosahedronGeometry args={[0.48, 1]} />
          <meshStandardMaterial
            color={THREE_COLORS.mineralGold}
            emissive={THREE_COLORS.mineralGold}
            emissiveIntensity={0.25}
            metalness={0.6}
            roughness={0.35}
          />
        </mesh>
      </group>

      <mesh position={[0, 0, 0.38]}>
        <cylinderGeometry args={[0.045, 0.045, 2.52, 16]} />
        <meshStandardMaterial
          color={THREE_COLORS.accentTeal}
          emissive={THREE_COLORS.accentTeal}
          emissiveIntensity={0.25}
        />
      </mesh>

      <group position={[0, -1.08, 0.34]}>
        <mesh>
          <boxGeometry args={[0.92, 0.62, 0.34]} />
          <meshStandardMaterial
            color={THREE_COLORS.bgBase}
            emissive={THREE_COLORS.accentTeal}
            emissiveIntensity={0.32}
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[0, 0.31, 0]}>
          <ringGeometry args={[0.43, 0.45, 32]} />
          <meshBasicMaterial
            color={THREE_COLORS.accentTeal}
            side={THREE.DoubleSide}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh position={[0, -0.31, 0]} rotation={[Math.PI, 0, 0]}>
          <ringGeometry args={[0.43, 0.45, 32]} />
          <meshBasicMaterial
            color={THREE_COLORS.accentTeal}
            side={THREE.DoubleSide}
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>

      <ambientLight intensity={0.45} />
      <pointLight position={[2, 3, 3]} intensity={1.4} color={THREE_COLORS.accentTeal} />
      <pointLight position={[-2, -1, 2]} intensity={0.8} color={THREE_COLORS.mineralGold} />
      <SilentProgressReader />
    </group>
  );
}

function SilentProgressReader() {
  useFrame(() => {
    void assemblyProgressRef.current;
  });
  return null;
}
