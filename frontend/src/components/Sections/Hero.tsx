'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Cpu, ShieldCheck } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-32 pb-20 dot-pattern">
      
      {/* Top Navbar Simulation */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-8 px-8 py-4 glass-panel thin-border z-50 whitespace-nowrap">
        <div className="flex items-center gap-3">
           <div className="w-2.5 h-2.5 rounded-full bg-brand shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">BITCOIN FORECAST</span>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
           <span className="hover:text-white transition-colors cursor-pointer">Forecast</span>
           <span className="hover:text-white transition-colors cursor-pointer">Accuracy</span>
           <span className="hover:text-white transition-colors cursor-pointer">Insights</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 max-w-6xl w-full"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-16 shadow-2xl mx-auto"
        >
           <Cpu size={14} className="text-brand animate-pulse" />
           <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/60">Historical Bitcoin price forecast</span>
        </motion.div>
        
        <h1 className="text-7xl md:text-[11rem] font-black tracking-[-0.05em] mb-12 leading-[0.85] text-white">
          Bitcoin <br />
          <span className="bg-gradient-to-r from-brand via-white to-gold bg-clip-text text-transparent italic px-4">Prediction</span>
        </h1>
        
        <p className="text-xl md:text-3xl text-white/40 max-w-3xl mx-auto mb-20 font-light leading-relaxed tracking-tight px-4">
          Explore a tested Bitcoin price forecast and compare predicted prices against real market values from historical data.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(59, 130, 246, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('predictor')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-14 py-7 bg-white text-black font-black rounded-[2rem] flex items-center gap-4 transition-all uppercase tracking-[0.2em] text-[11px] shadow-2xl"
          >
            View Forecast
            <ArrowRight size={20} strokeWidth={3} />
          </motion.button>
          
          <div className="flex items-center gap-16 text-left px-12 py-8 glass-panel thin-border group hover:border-brand/40 transition-all shadow-xl">
             <div className="flex items-center gap-5">
                <div className="p-3 bg-brand/10 rounded-2xl border border-brand/20">
                   <ShieldCheck size={26} className="text-brand" />
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase text-white/30 tracking-widest mb-1">Average error</p>
                   <p className="text-xl font-black text-white italic">$23.77</p>
                </div>
             </div>
             <div className="h-12 w-px bg-white/10" />
             <div className="flex items-center gap-5">
                <div className="p-3 bg-gold/10 rounded-2xl border border-gold/20">
                   <TrendingUp size={26} className="text-gold" />
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase text-white/30 tracking-widest mb-1">Tested points</p>
                   <p className="text-xl font-black text-white italic">2,350</p>
                </div>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Atmospheric Accents */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1)_0%,transparent_50%)] -z-10" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(247,147,26,0.05)_0%,transparent_50%)] -z-10" />
    </section>
  );
}
