"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Skull } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { CursedLetter } from "@/components/CursedLetter";

export default function AuthPage() {
  const [showIntro, setShowIntro] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const setHasSeenIntro = useStore((state) => state.setHasSeenIntro);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSummon = (e: React.FormEvent) => {
    e.preventDefault();
    setShowIntro(true);
  };

  const proceedToDashboard = () => {
    setHasSeenIntro(true);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#020202]">
      {/* Background with Assets, Kuntilanak Peek, and Smooth Fog */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          src="/assets/images/auth-bg.jpg"
          alt="DreadNoute Background" 
          fill 
          className="object-cover opacity-80 brightness-200" 
        />

        {/* Subtle Kuntilanak Peek with Parallax - Smoother Visibility */}
        <motion.div 
          animate={{ x: mousePos.x, y: mousePos.y }}
          className="absolute right-[8%] top-[10%] w-[450px] h-[450px] opacity-[0.45] pointer-events-none"
          style={{ 
             maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
             WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
          }}
        >
           <Image 
             src="/assets/images/kuntilanak-peek.png"
             alt="The Observer" 
             fill 
             className="object-contain grayscale blur-[1px] drop-shadow-[0_0_35px_rgba(255,0,0,0.6)] mix-blend-lighten" 
           />
        </motion.div>
        
        {/* Layered Fog Effects */}
        <div className="absolute inset-0 moving-fog opacity-50 pointer-events-none scale-150 mix-blend-screen" />
        <div className="absolute inset-0 moving-fog opacity-40 pointer-events-none scale-125 mix-blend-screen" style={{ transform: 'scaleX(-1)' }} />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      <AnimatePresence mode="wait">
        {!showIntro ? (
          <motion.div 
            key="auth-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            className="w-full max-w-lg z-10"
          >
            <div className="text-center mb-10 flex flex-col items-center">
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-flex p-1.5 rounded-3xl bg-white border-4 border-accent/60 mb-10 shadow-[0_0_60px_rgba(255,0,0,0.4)] relative overflow-hidden"
              >
                <div className="p-4 bg-white rounded-2xl relative overflow-hidden cursor-pointer group">
                  <Image 
                    src="/branding/logo.jpg" 
                    alt="Logo" 
                    width={90} 
                    height={90} 
                    className="rounded-lg transition-all duration-700 relative z-10"
                  />
                  <motion.div 
                    animate={{ x: [-100, 200] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 top-0 h-full w-20 bg-accent/20 skew-x-12 z-0"
                  />
                </div>
              </motion.div>
              
            <div className="flex flex-col items-center relative z-10">
              <h1 className="text-8xl font-horror text-white tracking-widest uppercase mb-1 drop-shadow-[0_0_40px_rgba(255,0,0,1)] animate-flicker">
                DREAD<span className="text-accent horror-reveal drop-shadow-[0_0_50px_rgba(255,0,0,0.8)]">NOUTE</span>
              </h1>
              
              <div className="relative flex flex-col items-center mt-8">
                {/* Animasi Kabut di Belakang Teks */}
                <div className="absolute -inset-20 animated-fog z-0 pointer-events-none" />
                
                <div className="h-px w-16 bg-white/20 relative z-10 mb-4" />
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="relative z-10 text-[#E0E0E0] font-cinzel text-[13px] tracking-[0.5em] uppercase text-center drop-shadow-[4px_4px_10px_rgba(0,0,0,0.9)] whitespace-nowrap"
                >
                  Dimana Ketakutan Menemukan Rumahnya
                </motion.p>
                <div className="h-px w-16 bg-white/20 relative z-10 mt-4" />
              </div>
            </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-morphism-heavy rounded-[4rem] p-16 relative shadow-2xl shadow-black overflow-hidden border border-white/5 font-cinzel"
            >
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
               <div className="absolute top-8 right-10 text-accent/20 animate-pulse"><Skull size={32} /></div>
               
              <form onSubmit={handleSummon} className="space-y-10 relative z-10">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-bold tracking-[0.6em] text-zinc-500 block ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-accent transition-all duration-300" size={18} />
                    <input 
                      type="email" 
                      placeholder="ENTER EMAIL"
                      defaultValue="jiwa@void.com"
                      suppressHydrationWarning
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-white focus:outline-none focus:border-accent/40 focus:bg-white/[0.06] transition-all text-xs font-bold tracking-widest placeholder:text-zinc-800"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-bold tracking-[0.6em] text-zinc-500 block ml-1">Security Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-accent transition-all duration-300" size={18} />
                    <input 
                      type="password" 
                      placeholder="ENTER PASSWORD"
                      defaultValue="••••••••"
                      suppressHydrationWarning
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-white focus:outline-none focus:border-accent/40 focus:bg-white/[0.06] transition-all text-xs font-bold tracking-widest placeholder:text-zinc-800"
                    />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px #FF0000" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  suppressHydrationWarning
                  className="w-full bg-[#8b0000] text-white py-6 rounded-2xl font-bold uppercase tracking-[0.5em] text-[13px] border border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)] transition-all flex items-center justify-center gap-4 relative overflow-hidden group mt-12"
                >
                  <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                  <span className="relative z-10">YA, SAYA BERANI</span>
                  <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform opacity-70" />
                </motion.button>
              </form>

              <div className="mt-14 flex items-center gap-6 py-4 relative z-10">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[9px] font-bold uppercase text-zinc-600 tracking-[0.4em] whitespace-nowrap">Portal Alternatif</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <motion.button 
                whileHover={{ 
                  scale: 1.02, 
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(255, 255, 255, 0.3)"
                }}
                suppressHydrationWarning 
                className="w-full flex items-center justify-center gap-8 bg-white/[0.02] border border-white/10 py-6 rounded-2xl text-[11px] font-bold uppercase tracking-[0.5em] text-zinc-400 hover:text-white transition-all group relative z-10"
              >
                <div className="p-3 bg-white rounded-xl group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <span>Connect via Google</span>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <CursedLetter username="Daffa" onComplete={proceedToDashboard} />
        )}
      </AnimatePresence>
    </div>
  );
}
