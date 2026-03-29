"use client";

import React, { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  Float,
  Html,
  OrbitControls,
} from "@react-three/drei";
import type { RobotMode } from "@/components/RobotModePicker";

function modeColors(mode: RobotMode) {
  // change glow + accent lights per mode (movie vibe)
  switch (mode) {
    case "Tutor":
      return { glow: "#5de7ff", warm: "#ffb86b" };
    case "Interviewer":
      return { glow: "#ff4d6d", warm: "#ffd166" };
    case "Analyst":
      return { glow: "#7c5cff", warm: "#5de7ff" };
    case "Builder":
      return { glow: "#22c55e", warm: "#a3ff7a" };
    case "Support":
      return { glow: "#fbbf24", warm: "#5de7ff" };
    default:
      return { glow: "#5de7ff", warm: "#ffb86b" };
  }
}

function RobotCore({
  followCursor = true,
  mode = "Tutor",
}: {
  followCursor?: boolean;
  mode?: RobotMode;
}) {
  const group = useRef<THREE.Group>(null);

  const colors = modeColors(mode);

  // “movie” metal material
  const metal = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#d7dbe0"),
        metalness: 1,
        roughness: 0.22,
        clearcoat: 0.6,
        clearcoatRoughness: 0.15,
      }),
    []
  );

  const dark = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#121417"),
        metalness: 0.7,
        roughness: 0.55,
      }),
    []
  );

  // glow changes with mode
  const emissive = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0b1220"),
      emissive: new THREE.Color(colors.glow),
      emissiveIntensity: 1.7,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors.glow]);

  useFrame((state) => {
    if (!group.current) return;

    // gentle breathing + micro movements
    const t = state.clock.getElapsedTime();

    // slightly different motion per mode
    const sway =
      mode === "Interviewer"
        ? 0.12
        : mode === "Analyst"
        ? 0.08
        : mode === "Builder"
        ? 0.16
        : 0.2;

    group.current.position.y = 0.02 + Math.sin(t * 1.4) * 0.03;
    group.current.rotation.y = Math.sin(t * 0.55) * sway;

    if (followCursor) {
      const x = (state.pointer.x ?? 0) * 0.35;
      const y = (state.pointer.y ?? 0) * 0.15;
      group.current.rotation.y += x;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -y,
        0.08
      );
    }
  });

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      {/* Torso */}
      <mesh material={metal} castShadow receiveShadow>
        <capsuleGeometry args={[0.45, 0.7, 10, 18]} />
      </mesh>

      {/* Chest “reactor” */}
      <mesh material={emissive} position={[0, 0.12, 0.46]} castShadow>
        <circleGeometry args={[0.12, 32]} />
      </mesh>

      {/* Head */}
      <mesh material={metal} position={[0, 0.78, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.28, 32, 32]} />
      </mesh>

      {/* Visor */}
      <mesh material={dark} position={[0, 0.78, 0.19]} castShadow>
        <boxGeometry args={[0.38, 0.13, 0.12]} />
      </mesh>

      {/* Eyes glow */}
      <mesh material={emissive} position={[-0.09, 0.78, 0.255]} castShadow>
        <sphereGeometry args={[0.03, 24, 24]} />
      </mesh>
      <mesh material={emissive} position={[0.09, 0.78, 0.255]} castShadow>
        <sphereGeometry args={[0.03, 24, 24]} />
      </mesh>

      {/* Arms */}
      <group position={[-0.58, 0.28, 0]}>
        <mesh material={metal} castShadow receiveShadow>
          <capsuleGeometry args={[0.13, 0.38, 10, 16]} />
        </mesh>
        <mesh material={dark} position={[0, -0.3, 0]} castShadow>
          <sphereGeometry args={[0.12, 24, 24]} />
        </mesh>
      </group>

      <group position={[0.58, 0.28, 0]}>
        <mesh material={metal} castShadow receiveShadow>
          <capsuleGeometry args={[0.13, 0.38, 10, 16]} />
        </mesh>
        <mesh material={dark} position={[0, -0.3, 0]} castShadow>
          <sphereGeometry args={[0.12, 24, 24]} />
        </mesh>
      </group>

      {/* Base */}
      <mesh material={dark} position={[0, -0.62, 0]} receiveShadow>
        <cylinderGeometry args={[0.55, 0.65, 0.18, 36]} />
      </mesh>

      {/* Soft glow ring */}
      <mesh material={emissive} position={[0, -0.53, 0]} receiveShadow>
        <torusGeometry args={[0.42, 0.02, 24, 96]} />
      </mesh>
    </group>
  );
}

export default function RobotScene({
  followCursor = true,
  mode = "Tutor",
}: {
  followCursor?: boolean;
  mode?: RobotMode;
}) {
  const colors = modeColors(mode);

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-3xl border border-neutral-800 bg-black">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.3, 2.5], fov: 45 }}
      >
        <color attach="background" args={["#05070a"]} />

        {/* cinematic lights */}
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[3, 3, 2]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* mode lights */}
        <pointLight
          position={[-2.5, 1.2, 2]}
          intensity={0.9}
          color={colors.glow}
        />
        <pointLight
          position={[2.2, 0.5, -2]}
          intensity={0.65}
          color={colors.warm}
        />

        <Suspense
          fallback={
            <Html center className="text-white/70">
              Loading robot…
            </Html>
          }
        >
          <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.35}>
            <RobotCore followCursor={followCursor} mode={mode} />
          </Float>

          <Environment preset="city" />
          <ContactShadows
            position={[0, -0.85, 0]}
            opacity={0.55}
            blur={2.2}
            far={2}
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2.9}
        />
      </Canvas>

      {/* overlay UI label */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70 backdrop-blur">
        Shynvo Robot • Mode: {mode}
      </div>
    </div>
  );
}