"use client";

import { useRef, useMemo, useCallback, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

// â”€â”€â”€ Neural Network Particle System â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = 120;
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const { nodePositions, nodeColors, connections, pulseOffsets } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const offsets = new Float32Array(nodeCount);
    const conn: number[] = [];
    const accentColor = new THREE.Color("#38bdf8");
    const dimColor = new THREE.Color("#233554");

    // Create layered distribution for depth
    for (let i = 0; i < nodeCount; i++) {
      const layer = Math.floor(Math.random() * 4);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + layer * 1.5 + Math.random() * 1.2;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const blend = Math.random();
      const c = accentColor.clone().lerp(dimColor, blend * 0.7);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      offsets[i] = Math.random() * Math.PI * 2;
    }

    // Build connections between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.5) {
          conn.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
        }
      }
    }

    return {
      nodePositions: pos,
      nodeColors: colors,
      connections: new Float32Array(conn),
      pulseOffsets: offsets,
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Smooth rotation with mouse influence
    groupRef.current.rotation.y = t * 0.025 + mousePos.current.x * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.015) * 0.1 + mousePos.current.y * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Neural nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={nodeCount} array={nodePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={nodeCount} array={nodeColors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Synaptic connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={connections.length / 3} array={connections} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.035} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

// â”€â”€â”€ AI Core Sphere â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function AICoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.1;
      meshRef.current.rotation.y = t * 0.08;
      meshRef.current.rotation.z = t * 0.05;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(0.35 + Math.sin(t * 1.5) * 0.05);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.3;
      ring1Ref.current.rotation.z = t * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.25;
      ring2Ref.current.rotation.x = t * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = -t * 0.2;
      ring3Ref.current.rotation.y = t * 0.12;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group>
        {/* Inner distorted icosahedron */}
        <mesh ref={meshRef} scale={1.5}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshDistortMaterial
            color="#0a192f"
            emissive="#38bdf8"
            emissiveIntensity={0.15}
            roughness={0.3}
            metalness={0.9}
            distort={0.2}
            speed={2}
            wireframe
          />
        </mesh>

        {/* Center glow core */}
        <mesh ref={glowRef} scale={0.35}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={2}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Orbital rings */}
        <mesh ref={ring1Ref} scale={2.2}>
          <torusGeometry args={[1, 0.008, 16, 128]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} transparent opacity={0.4} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]} scale={2.6}>
          <torusGeometry args={[1, 0.005, 16, 128]} />
          <meshStandardMaterial color="#8892b0" emissive="#8892b0" emissiveIntensity={0.4} transparent opacity={0.25} />
        </mesh>
        <mesh ref={ring3Ref} rotation={[Math.PI / 2.5, -Math.PI / 4, Math.PI / 8]} scale={3.0}>
          <torusGeometry args={[1, 0.003, 16, 128]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.3} transparent opacity={0.15} />
        </mesh>

        {/* Orbital node dots */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <OrbitalDot key={i} index={i} />
        ))}
      </group>
    </Float>
  );
}

function OrbitalDot({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const radius = 2.2 + (index % 3) * 0.4;
  const speed = 0.3 + index * 0.08;
  const offset = (index / 6) * Math.PI * 2;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.y = Math.sin(t * 0.7) * radius * 0.3;
    ref.current.position.z = Math.sin(t) * radius;
  });

  return (
    <mesh ref={ref} scale={0.04}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5} />
    </mesh>
  );
}

// â”€â”€â”€ Data Stream Particles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DataStreamParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 600;

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
      spd[i] = 0.001 + Math.random() * 0.003;
    }
    return { positions: pos, speeds: spd };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const posArr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] -= speeds[i];
      if (posArr[i * 3 + 1] < -12.5) posArr[i * 3 + 1] = 12.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.008}
        color="#e6f1ff"
        transparent
        opacity={0.2}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// â”€â”€â”€ Floating Energy Orbs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function EnergyOrbs() {
  const orbConfigs = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
        ] as [number, number, number],
        scale: 0.05 + Math.random() * 0.08,
        speed: 0.8 + Math.random() * 1.5,
        intensity: 0.4 + Math.random() * 0.8,
      })),
    []
  );

  return (
    <>
      {orbConfigs.map((orb, i) => (
        <Float key={i} speed={orb.speed} rotationIntensity={0.1} floatIntensity={0.8} position={orb.position}>
          <mesh scale={orb.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={orb.intensity} transparent opacity={0.5} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

// â”€â”€â”€ Interactive Grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function HolographicGrid() {
  const ref = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = -4;
      (ref.current.material as THREE.Material).opacity = 0.04 + Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
    }
  });

  return (
    <gridHelper
      ref={ref}
      args={[30, 30, "#38bdf8", "#112240"]}
      position={[0, -4, 0]}
      rotation={[0, 0, 0]}
    >
      <meshBasicMaterial attach="material" color="#38bdf8" transparent opacity={0.04} />
    </gridHelper>
  );
}

// â”€â”€â”€ Main Scene Export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function HeroScene() {
  return (
    <div className="absolute inset-0 opacity-80">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        style={{ background: "transparent" }}
      >
        <fog attach="fog" args={["#0a192f", 8, 25]} />
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#38bdf8" />
        <pointLight position={[-10, -5, -10]} intensity={0.25} color="#8892b0" />
        <pointLight position={[0, 8, -5]} intensity={0.15} color="#38bdf8" />

        <NeuralNetwork />
        <AICoreSphere />
        <DataStreamParticles />
        <EnergyOrbs />
        <HolographicGrid />
      </Canvas>
    </div>
  );
}
