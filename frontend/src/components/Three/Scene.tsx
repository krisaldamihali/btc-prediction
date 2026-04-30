'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BitcoinModel, AmbientGlows } from './BitcoinModel';

export function Scene() {
  return (
    <div className="fixed inset-0 -z-10 bg-void">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        
        <ambientLight intensity={0.2} />
        
        <Suspense fallback={null}>
          <BitcoinModel />
          <AmbientGlows />
          <Environment preset="night" />
          <ContactShadows 
            position={[0, -5, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2.4} 
            far={10} 
            color="#000000"
          />
        </Suspense>

        <EffectComposer>
          <Bloom luminanceThreshold={0.8} mipmapBlur intensity={1.5} radius={0.3} />
          <ChromaticAberration offset={[0.001, 0.001]} />
          <Noise opacity={0.03} />
          <Vignette offset={0.3} darkness={0.8} />
        </EffectComposer>
      </Canvas>
      
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(247,147,26,0.05)_0%,transparent_50%)]" />
    </div>
  );
}
