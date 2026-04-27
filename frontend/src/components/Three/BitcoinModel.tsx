'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useTexture, MeshTransmissionMaterial, Sparkles, Text } from '@react-three/drei';
import * as THREE from 'three';

export function BitcoinModel() {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useTexture('/btc_texture.png');

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Main Coin Group - Rotated to stand upright */}
        <group rotation={[Math.PI / 2, 0, 0]}>
          {/* Main Gold Core */}
          <mesh>
            <cylinderGeometry args={[3.2, 3.2, 0.4, 128]} />
            <meshStandardMaterial 
              map={texture}
              metalness={1}
              roughness={0.1}
              emissive="#f7931a"
              emissiveIntensity={0.1}
            />
          </mesh>
          
          {/* Outer Glass Shell - Refractive */}
          <mesh>
            <cylinderGeometry args={[3.4, 3.4, 0.5, 64]} />
            <MeshTransmissionMaterial
              backside
              samples={16}
              thickness={0.2}
              chromaticAberration={0.05}
              anisotropy={0.1}
              distortion={0.1}
              distortionScale={0.1}
              temporalDistortion={0.1}
              clearcoat={1}
              attenuationDistance={0.5}
              attenuationColor="#ffffff"
              color="#ffffff"
            />
          </mesh>

          {/* Bitcoin Symbol - Front side */}
          <Text
            position={[0, 0.31, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={2.5}
            color="#f7931a"
            anchorX="center"
            anchorY="middle"
            fillOpacity={1}
            strokeWidth={0.02}
            strokeColor="#ffffff"
          >
            ₿
          </Text>

          {/* Bitcoin Symbol - Back side */}
          <Text
            position={[0, -0.31, 0]}
            rotation={[Math.PI / 2, 0, Math.PI]}
            fontSize={2.5}
            color="#f7931a"
            anchorX="center"
            anchorY="middle"
            fillOpacity={1}
            strokeWidth={0.02}
            strokeColor="#ffffff"
          >
            ₿
          </Text>
        </group>

        <Sparkles count={50} scale={8} size={2} speed={0.4} color="#f7931a" />
        <Sparkles count={30} scale={10} size={1} speed={0.2} color="#3b82f6" />

        {/* Orbiting Tech Rings */}
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh rotation={[0.2, 0.4, 0]}>
            <torusGeometry args={[4.5, 0.005, 16, 100]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
          </mesh>
          <mesh rotation={[-0.3, -0.2, 0]}>
            <torusGeometry args={[4.8, 0.002, 16, 100]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

export function AmbientGlows() {
  return (
    <group>
      <pointLight position={[10, 10, 10]} intensity={2} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#f7931a" />
      <spotLight position={[0, 10, 0]} intensity={3} color="#ffffff" angle={0.5} penumbra={1} />
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}
