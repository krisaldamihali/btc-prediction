import { Scene } from '@/components/Three/Scene';
import { Hero } from '@/components/Sections/Hero';
import { PredictionEngine } from '@/components/Sections/PredictionEngine';
import { ModelPerformance } from '@/components/Sections/ModelPerformance';
import { SystemInsights } from '@/components/Sections/SystemInsights';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden grid-bg">
      <div className="noise-overlay" />
      {/* 3D Background */}
      <Scene />
      
      {/* Content Layers */}
      <div className="relative z-10">
        <Hero />
        <PredictionEngine />
        <ModelPerformance />
        <SystemInsights />
      </div>
    </main>
  );
}
