'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BarChart3, AlertCircle, Maximize2 } from 'lucide-react';

export function ModelPerformance() {
  const plots = [
    { title: 'Forecast vs Real Price', img: '/plots/results.png', desc: 'A side-by-side view of estimated Bitcoin prices and the real prices from the same period.' },
    { title: 'Forecast Errors', img: '/plots/error_dist.png', desc: 'Most forecast misses stayed close to the real value, with an average error of $23.77.' },
    { title: 'Data Coverage', img: '/plots/splits.png', desc: 'A visual summary of how much historical price data was used to check the forecast.' }
  ];

  return (
    <section id="performance" className="py-64 px-6 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-40">
           <div className="flex items-center gap-3 mb-8 opacity-40">
              <div className="h-[1px] w-12 bg-white" />
              <span className="text-[10px] font-black tracking-[0.5em] uppercase">Accuracy check</span>
           </div>
           <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic">Clear <br /> Results.</h2>
           <p className="text-white/30 text-xl font-light max-w-2xl leading-relaxed">
             These charts show how close the forecast came to real Bitcoin prices during the tested period.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {plots.map((plot, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="glass-panel group overflow-hidden thin-border hover:border-brand/40 transition-all flex flex-col"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-white/60">{plot.title}</h3>
                <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              </div>
              <div className="relative aspect-video overflow-hidden bg-white/5">
                 <Image
                   src={plot.img} 
                   alt={plot.title} 
                   fill
                   sizes="(min-width: 1024px) 33vw, 100vw"
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
                 />
                 <div className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-white" size={32} />
                 </div>
              </div>
              <div className="p-10 bg-white/[0.02]">
                <p className="text-white/40 text-sm font-light leading-relaxed">
                  {plot.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-16 glass-panel thin-border bg-gradient-to-br from-brand/10 to-transparent flex flex-col lg:flex-row items-center gap-12">
           <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                 <AlertCircle className="text-brand" size={24} />
                 <h3 className="text-2xl font-black italic uppercase">Accuracy Summary</h3>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                Across 2,350 tested Bitcoin price points, the forecast missed the real price by $23.77 on average. A second larger-error score is $40.03, with a mean bias of +$11.30 and an average error equal to 0.47% of the price.
              </p>
              <div className="flex gap-10">
                 <div>
                    <p className="text-2xl font-black text-brand">23.77</p>
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Average error</p>
                 </div>
                 <div>
                    <p className="text-2xl font-black text-gold">40.03</p>
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Larger-error score</p>
                 </div>
                 <div>
                    <p className="text-2xl font-black text-white">0.47%</p>
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Avg error share</p>
                 </div>
              </div>
           </div>
           <div className="w-full lg:w-96 h-48 bg-white/5 rounded-3xl overflow-hidden border border-white/10 relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                 <BarChart3 size={100} />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-brand/20 blur-[50px]" />
           </div>
        </div>
      </div>
    </section>
  );
}
