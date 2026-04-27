'use client';

import React, { useEffect, useState } from 'react';
import { getModelInfo, ModelInfo } from '@/lib/api';
import { Layers, Activity, Cpu, ShieldCheck, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function SystemInsights() {
  const [info, setInfo] = useState<ModelInfo | null>(null);

  useEffect(() => {
    getModelInfo().then(setInfo).catch(console.error);
  }, []);

  if (!info) return null;

  return (
    <section className="py-64 px-6 relative overflow-hidden dot-pattern">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-40">
           <div className="flex items-center gap-3 mb-8 opacity-40">
              <div className="h-[1px] w-12 bg-white" />
              <span className="text-[10px] font-black tracking-[0.5em] uppercase">Deep_Lab_Insights</span>
           </div>
           <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">Architectural <br /> Anatomy</h2>
           <p className="text-white/30 text-xl font-light max-w-2xl leading-relaxed">
             A high-fidelity breakdown of the dimensional vectors and algorithmic throughput driving our global forecasting engine.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="md:col-span-3 lg:col-span-4 glass-panel p-16 thin-border flex flex-col justify-between group overflow-hidden relative"
          >
             <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                <Layers size={300} />
             </div>
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-12">
                   <div className="p-4 rounded-2xl bg-brand/10 border border-brand/20">
                      <Layers className="text-brand" size={24} />
                   </div>
                   <h3 className="text-2xl font-black tracking-tight uppercase italic">Feature_Vectors</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {info.features.map((f, i) => (
                    <span key={i} className="px-6 py-3 bg-white/5 rounded-2xl text-[10px] font-black tracking-[0.3em] uppercase text-white/50 border border-white/5 hover:border-brand/50 hover:text-white transition-all cursor-crosshair">
                      {f}
                    </span>
                  ))}
                </div>
             </div>
          </motion.div>

          <div className="md:col-span-1 lg:col-span-2 glass-panel p-12 thin-border group hover:bg-brand/[0.02] transition-colors">
            <Activity className="text-brand mb-8 animate-pulse" size={32} />
            <h3 className="text-5xl font-black tracking-tighter mb-2 text-brand">{info.metrics.R2}</h3>
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20">Vector_Precision_R2</p>
          </div>

          <div className="md:col-span-1 lg:col-span-2 glass-panel p-12 thin-border group hover:bg-gold/[0.02] transition-colors">
            <Zap className="text-gold mb-8" size={32} />
            <h3 className="text-5xl font-black tracking-tighter mb-2 text-gold">{info.metrics.MAE}</h3>
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20">Absolute_Error_Mean</p>
          </div>

          <div className="md:col-span-2 lg:col-span-2 glass-panel p-12 thin-border flex flex-col justify-between">
             <div className="flex justify-between items-center">
                <Globe className="text-white/20" size={24} />
                <span className="px-3 py-1 rounded bg-green-500/10 text-[9px] font-black text-green-500 uppercase tracking-widest">Online</span>
             </div>
             <div>
                <p className="text-sm font-bold text-white mb-2 uppercase tracking-tighter italic">Mainnet-Global-Node</p>
                <p className="text-[9px] font-black tracking-[0.3em] uppercase text-white/20">Node_ID: 0x4A...2F</p>
             </div>
          </div>

          <div className="md:col-span-2 lg:col-span-2 glass-panel p-12 thin-border flex items-center gap-6 group">
             <div className="w-16 h-16 rounded-full border-4 border-brand/20 border-t-brand animate-spin" />
             <div>
                <p className="text-xl font-black tracking-tighter">99.98%</p>
                <p className="text-[9px] font-black tracking-[0.3em] uppercase text-white/20">Uptime_Metric</p>
             </div>
          </div>

          <div className="md:col-span-3 lg:col-span-6 glass-panel p-16 thin-border flex flex-col md:flex-row justify-between items-center gap-12 bg-gradient-to-r from-transparent via-brand/5 to-transparent">
             <div className="max-w-md">
                <div className="flex items-center gap-4 mb-6">
                   <ShieldCheck className="text-brand" size={24} />
                   <h3 className="text-2xl font-black tracking-tight italic uppercase">Infrastructure</h3>
                </div>
                <p className="text-white/30 text-sm font-light leading-relaxed">
                  Our decentralized node network processes millions of temporal price points per second, ensuring sub-50ms inference latency across all global access points.
                </p>
             </div>
             <div className="flex gap-4">
                {[1,2,3,4,5,6,7,8].map(i => (
                   <div key={i} className="w-2 h-16 bg-white/5 rounded-full relative overflow-hidden">
                      <motion.div 
                        initial={{ height: '20%' }}
                        animate={{ height: ['20%', '80%', '40%', '90%', '30%'] }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                        className="absolute bottom-0 left-0 w-full bg-brand"
                      />
                   </div>
                ))}
             </div>
          </div>
        </div>

        <div className="mt-64 flex flex-wrap justify-between items-center gap-12 opacity-10">
           <div className="text-[10px] font-black tracking-[1em] uppercase">Quantum_Forecasting_System</div>
           <div className="text-[10px] font-black tracking-[1em] uppercase">Neural_Core_Active</div>
           <div className="text-[10px] font-black tracking-[1em] uppercase">All_Rights_Reserved_2026</div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand/5 blur-[200px] -z-10" />
    </section>
  );
}
