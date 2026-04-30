'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPrediction, PredictionResponse } from '@/lib/api';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { ChevronRight, Globe, Zap, Cpu, Database } from 'lucide-react';

export function PredictionEngine() {
  const [horizon, setHorizon] = useState(30);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPrediction(horizon);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('The forecast service is not responding. Please make sure the backend is running, then try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function loadInitialForecast() {
      try {
        const data = await getPrediction(30);
        if (!cancelled) {
          setResult(data);
          setError(null);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError('The forecast service is not responding. Please make sure the backend is running, then try again.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadInitialForecast();

    return () => {
      cancelled = true;
    };
  }, []);

  const chartData = result ? result.dates.map((date, i) => ({
    date,
    prediction: result.predictions[i],
    actual: result.actuals[i],
    error: result.errors[i],
    lower: result.lower_bound[i],
    upper: result.upper_bound[i],
  })) : [];

  return (
    <section id="predictor" className="py-64 px-6 relative overflow-hidden dot-pattern">
      <div className="absolute top-1/2 -left-12 -translate-y-1/2 rotate-90 text-[100px] font-black text-white/[0.02] select-none pointer-events-none">
        FORECAST
      </div>

      <div className="max-w-7xl mx-auto">
        
        <div className="mb-32">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-6"
          >
            Forecast Explorer
          </motion.h2>
          <p className="text-white/30 text-xl font-light max-w-xl">
            Choose how many recent hourly results to view, then compare the forecast with the real Bitcoin price.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-panel p-12 thin-border h-full flex flex-col justify-between bg-gradient-to-b from-white/[0.05] to-transparent shadow-2xl"
            >
              <div className="space-y-16">
                <div>
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-[10px] font-black tracking-[0.5em] uppercase text-brand flex items-center gap-2">
                      <Zap size={14} className="fill-brand" />
                      View Range
                    </h3>
                    <span className="px-3 py-1 bg-brand/10 rounded text-[9px] font-bold text-brand uppercase">Historical</span>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex justify-between items-end">
                       <p className="text-[10px] font-black uppercase text-white/30 tracking-widest">Recent hours</p>
                       <p className="text-4xl font-black text-white italic">{horizon}<span className="text-sm not-italic opacity-30 ml-1">HRS</span></p>
                    </div>
                    <input 
                      type="range" min="6" max="60" value={horizon}
                      onChange={(e) => setHorizon(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-brand"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col gap-4">
                    <Globe size={20} className="text-brand" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 leading-tight">Predicted vs real price</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col gap-4">
                    <Database size={20} className="text-gold" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 leading-tight">2,350 tested points</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePredict}
                disabled={loading}
                className="mt-16 w-full py-6 bg-white text-black font-black rounded-3xl flex items-center justify-center gap-4 hover:bg-brand hover:text-white transition-all shadow-xl uppercase tracking-[0.2em] text-[10px]"
              >
                {loading ? 'Loading...' : 'Show Forecast'}
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!result && !loading && !error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[650px] glass-panel flex flex-col items-center justify-center thin-border border-dashed relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Cpu size={64} className="text-white/5 mb-8 animate-pulse" />
                  <p className="text-[10px] font-black tracking-[0.6em] uppercase text-white/10">Preparing forecast</p>
                </motion.div>
              )}

              {error && !loading && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[650px] glass-panel flex flex-col items-center justify-center thin-border border-dashed relative group overflow-hidden px-8 text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent" />
                  <Cpu size={64} className="text-gold/30 mb-8" />
                  <p className="text-lg font-black tracking-tight text-white mb-3">Forecast unavailable</p>
                  <p className="text-sm text-white/40 max-w-md leading-relaxed mb-8">{error}</p>
                  <button
                    onClick={handlePredict}
                    className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-brand hover:text-white transition-all uppercase tracking-[0.2em] text-[10px]"
                  >
                    Retry
                  </button>
                </motion.div>
              )}

              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="h-full min-h-[650px] glass-panel flex flex-col items-center justify-center thin-border overflow-hidden"
                >
                   <div className="relative w-48 h-48">
                      <div className="absolute inset-0 border-2 border-brand/20 rounded-full animate-ping" />
                      <div className="absolute inset-4 border-2 border-brand/40 rounded-full animate-spin [animation-duration:3s]" />
                      <div className="absolute inset-8 border-2 border-brand rounded-full animate-spin [animation-duration:1s]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <p className="text-[10px] font-black text-brand tracking-widest uppercase">Loading</p>
                      </div>
                   </div>
                </motion.div>
              )}

              {result && !loading && (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="glass-panel p-12 thin-border bg-white/[0.02] relative overflow-hidden group">
                       <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 blur-[80px] group-hover:bg-gold/20 transition-all" />
                       <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] mb-4 font-black">Actual price</p>
                       <p className="text-7xl font-black tracking-tighter text-gold">${result.actuals[result.actuals.length - 1].toLocaleString()}</p>
                       <p className="text-[10px] text-white/25 uppercase tracking-[0.3em] mt-5 font-bold">Real market value</p>
                    </div>
                    <div className="glass-panel p-12 thin-border bg-white/[0.02] relative overflow-hidden group">
                       <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/10 blur-[80px] group-hover:bg-brand/20 transition-all" />
                       <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] mb-4 font-black">Predicted price</p>
                       <div className="flex flex-col gap-5">
                          <p className="text-7xl font-black tracking-tighter text-white">${result.predictions[result.predictions.length - 1].toLocaleString()}</p>
                          <div className="w-fit px-4 py-2 rounded-xl bg-brand/10 border border-brand/20 text-[10px] font-black text-brand uppercase tracking-widest">
                            Difference ${Math.abs(result.errors[result.errors.length - 1]).toFixed(2)}
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="glass-panel p-12 h-[550px] thin-border relative group">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorBrand" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.02)" />
                        <XAxis 
                          dataKey="date" 
                          axisLine={false} tickLine={false} fontSize={9} 
                          tick={{ fill: 'rgba(255,255,255,0.2)', fontWeight: 'bold' }}
                          tickFormatter={(v) => v.split('-').slice(1).join('/')}
                        />
                        <YAxis hide domain={['auto', 'auto']} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(10,17,37,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', backdropFilter: 'blur(10px)', padding: '20px' }}
                          itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="upper" stroke="none" fill="rgba(59,130,246,0.03)" />
                        <Area type="monotone" dataKey="lower" stroke="none" fill="transparent" />
                        <Area 
                          type="monotone" dataKey="prediction" 
                          stroke="#3b82f6" strokeWidth={4} 
                          fill="url(#colorBrand)" 
                          animationDuration={2000}
                        />
                        <Area 
                          type="monotone" dataKey="actual" 
                          stroke="#f7931a" strokeWidth={2} 
                          fill="transparent" 
                          animationDuration={1600}
                        />
                        <ReferenceLine y={result.predictions[0]} stroke="rgba(255,255,255,0.05)" strokeDasharray="10 10" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
