"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 bg-black/40 border border-white/5 rounded-2xl px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:border-accent/40 transition-all cursor-default relative overflow-hidden"
    >
      {/* LED Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%]" />
      
      <div className="flex items-baseline gap-2 relative z-10 font-mono">
        <div className="flex flex-col items-center">
          <span className="text-[20px] font-black text-accent drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] leading-none tracking-tighter">
            {hours}
          </span>
          <span className="text-[6px] text-zinc-600 font-bold uppercase tracking-widest mt-1">HR</span>
        </div>
        
        <span className="text-[20px] font-black text-accent/40 animate-pulse">:</span>
        
        <div className="flex flex-col items-center">
          <span className="text-[20px] font-black text-accent drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] leading-none tracking-tighter">
            {minutes}
          </span>
          <span className="text-[6px] text-zinc-600 font-bold uppercase tracking-widest mt-1">MIN</span>
        </div>

        <span className="text-[20px] font-black text-accent/40 animate-pulse">:</span>

        <div className="flex flex-col items-center">
          <span className="text-[16px] font-black text-accent/60 drop-shadow-[0_0_8px_rgba(255,0,0,0.4)] leading-none tracking-tighter self-end mb-1">
            {seconds}
          </span>
          <span className="text-[6px] text-zinc-600 font-bold uppercase tracking-widest">SEC</span>
        </div>
      </div>
    </motion.div>
  );
};
