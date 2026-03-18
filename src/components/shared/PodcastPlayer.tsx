"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Mic2, 
  Activity,
  ChevronDown,
  X,
  Maximize2,
  Minimize2,
  ListMusic
} from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const PodcastPlayer = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const { currentTrack, isPlaying, setIsPlaying } = useStore();

  const waveBars = Array.from({ length: 40 });

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white shadow-2xl pulsing-red z-[100] border-2 border-white/20"
      >
        <Mic2 size={24} />
      </motion.button>
    );
  }

  return (
    <div className="fixed bottom-10 right-10 z-[100] font-cinzel">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="collapsed"
            layoutId="player-base"
            className="flex items-center gap-6 bg-black p-3 pr-6 rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 group overflow-hidden min-w-[320px]"
          >
             {/* Tiny Wave Background */}
             <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                <div className="flex items-end gap-1 h-full pt-6">
                   {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={isPlaying ? { height: ["10%", "80%", "20%"] } : {}}
                        transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                        className="w-2 bg-accent/20 rounded-full"
                      />
                   ))}
                </div>
             </div>

             <div className="relative">
                <div className="w-14 h-14 rounded-full border-2 border-accent p-0.5 bg-black overflow-hidden relative z-10">
                   <Image src="/assets/images/auth-bg.jpg" alt="Cover" fill className={cn("object-cover grayscale transition-all duration-1000", isPlaying && "grayscale-0 scale-110")} />
                </div>
                {/* Close Button UI Hover */}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-black border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-opacity opacity-0 group-hover:opacity-100 z-20"
                >
                  <X size={10} />
                </button>
             </div>

             <div className="flex flex-col flex-1 min-w-0 relative z-10">
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest truncate mb-0.5">
                   {isPlaying ? "Decoding Frequency..." : "Signal Standby"}
                </span>
                <span className="text-[12px] font-bold text-white uppercase tracking-[0.1em] truncate w-full">
                   {currentTrack?.title || "Bisikan Hutan Mati"}
                </span>
             </div>

             <div className="flex items-center gap-2 relative z-10">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white shadow-lg shadow-red-900/40 hover:scale-105 active:scale-95 transition-all pulsing-red"
                >
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                </button>

                <button 
                  onClick={() => setIsExpanded(true)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-600 hover:text-white transition-all border border-white/5"
                >
                    <ListMusic size={18} />
                </button>
             </div>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            layoutId="player-base"
            className="w-[400px] max-h-[70vh] bg-black/95 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-8 shadow-[0_40px_100px_rgba(0,0,0,1)] flex flex-col gap-6 overflow-hidden relative"
          >
             <div className="absolute inset-0 bg-accent/5 opacity-20 pointer-events-none" />
             
             {/* Header */}
             <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-accent/20 rounded-xl border border-accent/30">
                      <Mic2 size={24} className="text-accent animate-pulse" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em]">EVP SIGNAL MONITOR</span>
                      <span className="text-[8px] font-bold text-[#4efd54] tracking-widest animate-pulse mt-1">Status: Stable</span>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <button 
                     onClick={() => setIsExpanded(false)}
                     className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-all border border-white/5"
                   >
                     <ChevronDown size={20} />
                   </button>
                   <button 
                     onClick={() => setIsOpen(false)}
                     className="w-10 h-10 rounded-xl bg-red-950/20 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all border border-accent/20"
                   >
                     <X size={20} />
                   </button>
                </div>
             </div>

             {/* Scrollable Content Container */}
             <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-8 pr-2">

             {/* Main Info */}
             <div className="flex flex-col items-center text-center gap-10 relative z-10">
                <div className="w-56 h-56 rounded-[3rem] border-2 border-accent p-1 bg-black shadow-[0_0_50px_rgba(255,0,0,0.4)] overflow-hidden group">
                   <Image src="/assets/images/auth-bg.jpg" alt="Cover" fill className={cn("object-cover grayscale transition-all duration-1000", isPlaying && "grayscale-0 scale-110")} />
                </div>

                <div className="space-y-4">
                   <h4 className="text-3xl font-black text-white uppercase tracking-tight">{currentTrack?.title || "Bisikan Hutan Mati"}</h4>
                   <p className="text-[10px] font-bold text-accent uppercase tracking-[0.6em] opacity-60">Channel: SPIRITUAL_DATA_09 // Decrypting...</p>
                </div>
             </div>

             {/* WILD VISUALIZER */}
             <div className="h-16 flex items-end justify-center gap-1 overflow-hidden relative z-10 px-4">
                {waveBars.map((_, i) => (
                   <motion.div 
                      key={i}
                      animate={isPlaying ? { 
                         height: [
                           Math.random()*10, 
                           Math.random()*100 + "%", 
                           Math.random()*20, 
                           Math.random()*100 + "%", 
                           Math.random()*10
                         ],
                         opacity: [0.3, 1, 0.4, 1, 0.3]
                      } : { height: "4px", opacity: 0.1 }}
                      transition={{ 
                         duration: 0.3 + (i % 5) * 0.1, 
                         repeat: Infinity,
                         ease: "easeInOut"
                      }}
                      className="flex-1 bg-accent rounded-t-full shadow-[0_0_15px_rgba(255,0,0,0.5)]"
                   />
                ))}
             </div>

             {/* Controls */}
             <div className="flex flex-col gap-10 relative z-10">
                <div className="space-y-4">
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: "45%" }}
                         className="h-full bg-accent relative"
                      >
                         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]" />
                      </motion.div>
                   </div>
                   <div className="flex justify-between text-[11px] font-bold text-zinc-700 tracking-[0.2em]">
                      <span>12:04</span>
                      <span>-38:20</span>
                   </div>
                </div>

                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-8">
                      <button className="text-zinc-600 hover:text-white transition-all transform hover:scale-125"><SkipBack size={28} /></button>
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-white shadow-2xl pulsing-red hover:scale-105 active:scale-95 transition-all"
                      >
                         {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                      </button>
                      <button className="text-zinc-600 hover:text-white transition-all transform hover:scale-125"><SkipForward size={28} /></button>
                   </div>
                   
                   <button className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 hover:text-accent transition-all border border-white/5">
                      <Volume2 size={24} />
                   </button>
                </div>
             </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
