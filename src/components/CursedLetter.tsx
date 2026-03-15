"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skull, Flame, PartyPopper, Ghost, AlertTriangle, ChevronRight } from "lucide-react";
import Image from "next/image";

interface CursedLetterProps {
  username?: string;
  onComplete: () => void;
}

export const CursedLetter = ({ username = "Archivist", onComplete }: CursedLetterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [revealStep, setRevealStep] = useState(0); // 0: Closed, 1: Paper Up, 2: Final CTA
  const [displayText, setDisplayText] = useState("");
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);

  // No ambient loop — wolf howl plays once on open

  useEffect(() => {
    if (isOpen) {
      let i = 0;
      const fullText = username;
      const timer = setInterval(() => {
        setDisplayText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(timer);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isOpen, username]);

  const handleOpen = async () => {
    // Wolf howl — plays ONCE when the letter is opened
    try {
      const wolfAudio = new Audio("/assets/sounds/wolf-howl.mp3");
      wolfAudio.volume = 0.55;
      wolfAudio.loop = false;
      wolfAudio.play().catch(e => console.warn("Wolf SFX blocked:", e));
    } catch (e) {
      console.warn("Audio not available:", e);
    }
    
    setIsBroken(true);
    setTimeout(() => {
       setIsOpen(true);
       setShowCelebration(true);
       setRevealStep(1);
       setTimeout(() => setShowCelebration(false), 4000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/98 backdrop-blur-3xl overflow-y-auto no-scrollbar py-20 font-cinzel">
      
      {/* Background particulates */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      
      {/* User Avatar ABOVE Letter */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-14 relative group"
      >
        <div className="w-32 h-32 rounded-full border-4 border-accent p-1 shadow-[0_0_50px_rgba(255,0,0,0.6)] overflow-hidden relative z-10 transition-transform group-hover:scale-105 duration-700 bg-zinc-800">
           <img 
             src="/assets/images/profile.jpg"
             alt="User Avatar" 
             className="w-full h-full object-cover"
             onError={(e) => {
               (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + username + "&background=8b0000&color=fff";
             }}
           />
        </div>
        <div className="absolute -inset-6 bg-accent/30 blur-3xl opacity-60 animate-pulse rounded-full z-0" />
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 border-2 border-dashed border-accent/40 rounded-full" 
        />
      </motion.div>

      <div className="relative z-10 perspective-1000">
        
        {/* Horror Celebration Effects (Spooky Party) */}
        <AnimatePresence>
          {showCelebration && (
            <div className="absolute inset-0 z-[60] pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 1, 
                    scale: 0 
                  }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 800, 
                    y: (Math.random() - 0.5) * 800, 
                    opacity: 0,
                    scale: Math.random() * 3,
                    rotate: Math.random() * 720 
                  }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/2 text-accent"
                >
                  {i % 3 === 0 ? <Skull size={32} /> : i % 3 === 1 ? <Ghost size={32} /> : <PartyPopper size={32} />}
                </motion.div>
              ))}
              
              {/* Screen Flash */}
              <motion.div 
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 bg-accent/20 z-[70]"
              />
            </div>
          )}
        </AnimatePresence>

        {/* Envelope Container */}
        <motion.div 
          initial={{ scale: 0.8, y: 100, opacity: 0, rotateX: 20 }}
          animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
          className="relative w-[550px] h-[380px] cursor-pointer group"
          onClick={handleOpen}
        >
          {/* Shadow */}
          <div className="absolute inset-0 bg-black/80 blur-3xl -translate-y-10 scale-95" />

          {/* Envelope Body */}
          <div className="absolute inset-0 bg-[#120808] border border-white/10 rounded-lg shadow-[0_40px_100px_rgba(0,0,0,1)] overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-30" />
             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" />
          </div>
          
          {/* Top Flap (Animated) */}
          <motion.div 
            animate={{ 
              rotateX: isOpen ? -170 : 0,
              zIndex: isOpen ? 5 : 20 
            }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#1a0c0c] origin-top border-b border-black/50 overflow-hidden"
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-40" />
          </motion.div>

          {/* Red Glue/Wax Seal -> CLICK BUTTON */}
          <AnimatePresence>
            {!isBroken && (
              <motion.div 
                exit={{ scale: 3, opacity: 0, filter: "blur(20px)" }}
                whileHover={{ scale: 1.1, boxShadow: "0 0 70px rgba(255,0,0,1)" }}
                className="absolute top-[45%] left-1/2 -translate-x-1/2 z-[60] w-32 h-32 bg-accent rounded-full shadow-[0_0_50px_rgba(255,0,0,0.6)] border-4 border-red-950 flex items-center justify-center -translate-y-1/2 cursor-pointer group/seal"
              >
                <div className="flex flex-col items-center">
                   <span className="text-white font-black text-xl tracking-[0.3em] uppercase opacity-90 select-none group-hover/seal:scale-110 transition-transform">KLIK</span>
                   <div className="h-0.5 w-8 bg-white/40 mt-1" />
                </div>
                <div className="absolute inset-0 rounded-full animate-ping bg-accent/30" />
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="absolute -inset-2 border border-dashed border-white/20 rounded-full"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* The Paper (The Letter) */}
          <motion.div 
            animate={{ 
              y: isOpen ? (revealStep >= 2 ? -350 : -300) : 0,
              scale: isOpen ? 1.05 : 0.8,
              zIndex: isOpen ? 50 : 0,
              opacity: isOpen ? 1 : 0
            }}
            transition={{ 
              y: { duration: 1.2, ease: "easeOut" },
              scale: { duration: 1.2 },
              opacity: { duration: 0.5 }
            }}
            className="absolute left-4 right-4 top-4 bg-[#dcc9bc] p-12 sm:p-16 shadow-2xl border border-[#b2a08d] rounded-sm flex flex-col items-center text-center min-h-[750px] overflow-visible"
            style={{ 
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")',
              transformOrigin: "bottom",
              boxShadow: "inset 0 0 100px rgba(0,0,0,0.2), 0 20px 50px rgba(0,0,0,0.5)"
            }}
          >
             {/* BLACK FOG EFFECT - REDUCED OPACITY */}
             <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-10 mix-blend-multiply">
                <div className="animate-fog-move-slow bg-repeat-x w-[200%] h-full bg-[url('/assets/effects/black-smoke.png')]" />
             </div>

             <div className="absolute inset-0 border-[24px] border-transparent shadow-[inset_0_0_80px_rgba(67,40,24,0.4)] pointer-events-none" />
             
             <div className="relative z-30 text-[#3d2a2a] w-full">
                {/* Logo Above Letter */}
                <div className="mb-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                   <Image src="/branding/logo.jpg" alt="DreadNoute Logo" width={60} height={60} className="mx-auto rounded-lg" />
                </div>

                <div className="flex flex-col items-center gap-4 border-b-2 border-[#3d2a2a]/10 pb-8 mb-8">
                   <Skull size={40} className="text-[#8b0000] animate-pulse" />
                   <h2 className="text-5xl font-bold tracking-[0.3em] uppercase opacity-90 leading-tight">Selamat Datang</h2>
                </div>
                                <div className="space-y-8 pt-4">
                  <p className="text-2xl leading-[1.8] italic min-h-[100px]">
                    Senang melihatmu kembali, <br />
                    <span className="font-bold text-[#8b0000] not-italic tracking-[0.2em] uppercase text-4xl">{displayText}</span>
                    <span className="animate-pulse">|</span>.
                  </p>
                  
                  <div className="space-y-6 max-w-sm mx-auto">
                    <p className="text-[14px] font-bold text-[#4a3a31] uppercase tracking-[0.3em] leading-[2]">
                      "Dunia ini dipenuhi bisikan yang tak terlihat. Apakah kau siap untuk menggali kebenaran di balik kegelapan?"
                    </p>
                    <div className="h-px w-20 bg-[#8b0000]/30 mx-auto" />
                    <p className="text-[11px] font-bold text-[#8b0000] uppercase tracking-[0.4em] animate-pulse">
                      KEBERANIAN ADALAH KUNCI UTAMA.
                    </p>
                  </div>
                </div>

                 <div className="mt-14 flex flex-col gap-6 items-center">
                  <AnimatePresence mode="wait">
                    {revealStep === 1 ? (
                      <motion.button
                        key="next-btn"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onClick={(e) => { e.stopPropagation(); setRevealStep(2); }}
                        className="p-6 rounded-full bg-black/80 text-white hover:text-accent transition-all border border-white/20 hover:border-accent shadow-2xl group/next"
                      >
                         <ChevronRight size={32} className="group-hover/next:translate-x-1 transition-transform" />
                      </motion.button>
                    ) : revealStep === 2 ? (
                      <motion.div
                        key="final-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full flex flex-col items-center gap-6"
                      >
                        <motion.button 
                          whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff", borderColor: "#fff" }}
                          onClick={(e) => { e.stopPropagation(); onComplete(); }}
                          className="w-full py-6 bg-red-950 text-white font-bold uppercase tracking-[0.6em] text-[12px] border border-red-900 transition-all shadow-[0_0_50px_rgba(255,0,0,0.5)] flex items-center justify-center gap-4 group relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                          <Flame size={16} className="text-red-500 group-hover:scale-125 transition-transform" />
                          YA, SAYA BERANI !
                        </motion.button>
                        
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-40 mt-2">
                          Tekan untuk mengonfirmasi keberanianmu
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
             </div>
          </motion.div>
        </motion.div>
        
         {/* Removed helper text per request */}
      </div>
    </div>
  );
};
