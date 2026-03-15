"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Skull, 
  ShieldAlert, 
  Activity, 
  BookOpen, 
  Zap, 
  Volume2, 
  Flame,
  ChevronRight,
  ChevronLeft,
  Info,
  CreditCard,
  X,
  CheckCircle2,
  Clock,
  Eye,
  ShoppingCart,
  Target,
  Thermometer,
  Mic,
  Radio
} from "lucide-react";
import Image from "next/image";
import { GHOST_ENTITIES } from "@/lib/ghostData";
import { cn } from "@/lib/utils";

const ActiveTimeClock = ({ peakTime = "00:00" }: { peakTime?: string }) => {
  return (
    <div className="flex items-center gap-10 bg-[#0e0e0e] p-8 rounded-3xl border border-white/5">
      <div className="relative flex-shrink-0">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1a1a1a" strokeWidth="2" />
          {/* Active Arc (Red): 23:00 - 03:00 (approx 4 hours = ~60 degrees) */}
          <circle 
            cx="50" cy="50" r="38" 
            fill="none" 
            stroke="#ff0000" 
            strokeWidth="8" 
            strokeDasharray="238.7" 
            strokeDashoffset="179"
            transform="rotate(-120 50 50)"
            className="opacity-80"
          />
          <text x="50" y="45" textAnchor="middle" fill="#555" fontSize="8" className="font-bold tracking-widest">PUNCAK</text>
          <text x="50" y="62" textAnchor="middle" fill="#ff0000" fontSize="14" className="font-black drop-shadow-[0_0_10px_red]">{peakTime}</text>
        </svg>
      </div>
      <div className="flex flex-col gap-4">
        {[
          { label: "Kritis: 23:00 – 03:00", color: "bg-red-600" },
          { label: "Aktif: 18:00 – 23:00", color: "bg-orange-500" },
          { label: "Dormant: 06:00 – 17:00", color: "bg-zinc-800" }
        ].map(row => (
          <div key={row.label} className="flex items-center gap-4">
            <div className={cn("w-2 h-2 rounded-full", row.color)} />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{row.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const InfographicPanel = ({ ghost }: { ghost: any }) => {
  const [activeTab, setActiveTab] = useState<"analisis" | "lore" | "survival">("analisis");

  return (
    <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col min-h-[600px]">
      <div className="flex border-b border-white/5">
        {[
          { id: "analisis", label: "Data Analisis" },
          { id: "lore", label: "Berkas Lore" },
          { id: "survival", label: "Panduan Selamat" }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex-1 py-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative",
              activeTab === tab.id ? "text-accent bg-accent/5" : "text-zinc-600 hover:text-white"
            )}
          >
            {tab.label}
            {activeTab === tab.id && <motion.div layoutId="info-tab" className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />}
          </button>
        ))}
      </div>

      <div className="p-10 flex-1 overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === "analisis" && (
            <motion.div key="a" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-10">
               <div>
                  <h4 className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em] mb-8">Atribut Ancaman</h4>
                  <div className="space-y-8">
                     {[
                       { label: "Agresi Entitas", value: 90, color: "bg-red-600", textColor: "text-red-600" },
                       { label: "Intelegensi Gaib", value: 100, color: "bg-blue-500", textColor: "text-blue-500" },
                       { label: "Kekuatan Kutukan", value: 85, color: "bg-purple-600", textColor: "text-purple-600" },
                       { label: "Kemampuan Manipulasi", value: 70, color: "bg-orange-500", textColor: "text-orange-500" }
                     ].map(stat => (
                       <div key={stat.label} className="space-y-4">
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</span>
                            <span className={cn("text-[12px] font-black", stat.textColor)}>{stat.value}%</span>
                         </div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${stat.value}%` }} className={cn("h-full", stat.color)} />
                         </div>
                       </div>
                     ))}
                  </div>
               </div>
               
               <div className="pt-6 border-t border-white/5">
                  <h4 className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em] mb-8">Waktu Aktif Paling Berbahaya</h4>
                  <ActiveTimeClock />
               </div>

               <div className="flex flex-wrap gap-4 pt-6 mt-6">
                  <span className="px-4 py-2 rounded-lg bg-red-950/20 border border-red-900/40 text-red-500 text-[9px] font-black uppercase">Tier S — Berbahaya</span>
                  <span className="px-4 py-2 rounded-lg bg-blue-950/20 border border-blue-900/40 text-blue-500 text-[9px] font-black uppercase">Entitas Air</span>
                  <span className="px-4 py-2 rounded-lg bg-orange-950/20 border border-orange-900/40 text-orange-500 text-[9px] font-black uppercase">Wilayah Jawa</span>
               </div>
            </motion.div>
          )}

          {activeTab === "lore" && (
            <motion.div key="l" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-10">
               <div className="flex items-center gap-4 bg-red-950/30 border border-red-900/40 p-6 rounded-2xl text-red-500">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-[12px] font-black uppercase tracking-widest font-mono">Ancaman Kelas S — Sangat Kritis</span>
               </div>
               
               <div className="space-y-8">
                  {[
                    { label: "Asal Usul", value: "Dipercaya sebagai manifestasi energi negatif yang terakumulasi. Tercatat dalam folklore lokal sebagai entitas yang menuntut penghormatan." },
                    { label: "Kemunculan Terverifikasi", value: "Area hutan belantara, pemakaman tua, dan lokasi dengan anomali EMF tinggi." },
                    { label: "Kelemahan Diketahui", value: "Cermin perak, ritual penyucian garam, dan penempatan jimat pelindung di ambang pintu." }
                  ].map(sec => (
                    <div key={sec.label} className="space-y-3">
                       <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em]">{sec.label}</span>
                       <p className="text-[14px] text-zinc-400 font-bold leading-relaxed">{sec.value}</p>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

          {activeTab === "survival" && (
            <motion.div key="s" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-10">
               <div className="bg-[#0e0e0e] border border-white/5 rounded-3xl p-10 text-center">
                  <div className="text-5xl font-black text-orange-500 mb-2">23%</div>
                  <div className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">Peluang Selamat Tanpa Persiapan</div>
               </div>

               <div className="grid grid-cols-2 gap-6">
                  <div className="bg-green-950/10 border border-green-900/30 rounded-2xl p-6">
                     <span className="text-[9px] font-black text-green-500 uppercase tracking-widest block mb-4">✓ Lakukan</span>
                     <ul className="space-y-2 text-[10px] text-zinc-500 font-bold">
                        <li>Bawa garam suci</li>
                        <li>Hindari kontak mata</li>
                        <li>Jangan menoleh jika dipanggil</li>
                     </ul>
                  </div>
                  <div className="bg-red-950/10 border border-red-900/30 rounded-2xl p-6">
                     <span className="text-[9px] font-black text-red-500 uppercase tracking-widest block mb-4">✗ Jangan</span>
                     <ul className="space-y-2 text-[10px] text-zinc-500 font-bold">
                        <li>Bersiul di malam hari</li>
                        <li>Menggunakan pakaian merah</li>
                        <li>Lari membelakangi entitas</li>
                     </ul>
                  </div>
               </div>

               <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em] mb-4">Deteksi Sensor Aktif</h4>
                  {[
                    { label: "Deteksi EVP", status: "AKTIF — Frekuensi Tinggi", icon: Mic, color: "text-red-500", bg: "bg-red-900/20" },
                    { label: "Sinyal EMF", status: "STABIL — 2.4 mG", icon: Radio, color: "text-green-500", bg: "bg-green-900/20" },
                    { label: "Anomali Suhu", status: "WASPADA — Drop 12°C", icon: Thermometer, color: "text-orange-500", bg: "bg-orange-900/20" },
                  ].map(sensor => (
                    <div key={sensor.label} className="flex items-center gap-6 bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                       <div className={cn("p-3 rounded-xl", sensor.bg)}>
                          <sensor.icon size={18} className={sensor.color} />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[11px] font-black text-zinc-300 uppercase tracking-widest mb-1">{sensor.label}</span>
                          <span className={cn("text-[8px] font-black uppercase tracking-widest", sensor.color)}>● {sensor.status}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function GhostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const ghost = GHOST_ENTITIES.find((g) => g.id === params.id);

  if (!isMounted || !ghost) return <div className="min-h-screen bg-[#020202]" />;

  const handleCheckout = () => {
    setCheckoutStep(2);
    setTimeout(() => {
       setCheckoutStep(3);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-cinzel overflow-x-hidden relative pb-32">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[60] px-12 py-10 flex items-center justify-between pointer-events-none">
         <button 
           onClick={() => router.back()}
           className="group flex items-center gap-4 px-10 py-4 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full hover:bg-accent pointer-events-auto shadow-2xl transition-all transform hover:translate-x-2"
         >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-white" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em]">KEMBALI KE ARSIP</span>
         </button>
      </nav>

      <div className="max-w-[1700px] mx-auto pt-44 px-10 md:px-20">
         
         {/* HEADER - CLEAN & RESTRUCTURED */}
         <header className="mb-20 space-y-6">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-4"
            >
               <div className="w-2 h-2 rounded-full bg-[#4efd54] animate-pulse shadow-[0_0_15px_#4efd54]" />
               <span className="text-[11px] font-black uppercase tracking-[0.8em] text-accent">ENTITY OVERVIEW</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl lg:text-[100px] font-horror text-white uppercase tracking-widest leading-none"
            >
               {ghost.name}
            </motion.h1>
         </header>

         {/* MAIN SPLIT CONTENT */}
         <div className="flex flex-col xl:flex-row gap-20">
            
            {/* LEFT COLUMN: VISUAL INVESTIGATION */}
            <div className="w-full xl:w-[55%] flex flex-col gap-12">
               <div className="relative aspect-square xl:aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.8)] group bg-black/40">
                  <motion.div 
                     initial={{ scale: 1.1, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ duration: 1.5 }}
                     className="absolute inset-0"
                  >
                     <Image 
                       src={ghost.image} 
                       alt={ghost.name} 
                       fill 
                       className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-[15s]" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-80" />
                  </motion.div>

                  {/* Interaction Controls */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-10 bg-black/70 backdrop-blur-3xl border border-white/5 px-12 py-6 rounded-full shadow-2xl">
                     <ChevronLeft size={20} className="text-accent animate-pulse" />
                     <div className="flex flex-col items-center">
                       <span className="text-[11px] font-black uppercase tracking-[0.6em] text-white">File Explorer</span>
                       <span className="text-[8px] text-zinc-600 font-bold tracking-[0.8em] mt-2 uppercase">ANALYSIS SENSOR</span>
                     </div>
                     <ChevronRight size={20} className="text-accent animate-pulse" />
                  </div>
               </div>

               <button className="w-full flex items-center justify-center gap-5 bg-white/[0.03] border border-white/5 py-10 rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.6em] text-white hover:bg-white/10 transition-all group overflow-hidden relative shadow-2xl">
                  <Volume2 size={24} className="text-gold group-hover:scale-110 transition-transform relative z-10" />
                  <span className="relative z-10">AKSES EVP RECORD</span>
                  <div className="absolute inset-0 bg-gold/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
               </button>
            </div>

            {/* RIGHT COLUMN: INFOGRAPHIC & ACTION */}
            <div className="w-full xl:w-[45%] flex flex-col gap-12">
               <InfographicPanel ghost={ghost} />

               {/* FINAL CTA BUTTON */}
               <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-10 bg-accent text-white rounded-[2.5rem] text-[14px] font-black uppercase tracking-[0.6em] shadow-[0_30px_60px_rgba(255,0,0,0.4)] relative overflow-hidden group"
               >
                  <div className="relative z-10 flex items-center justify-center gap-6">
                     <ShoppingCart size={24} className="group-hover:rotate-12 transition-transform" />
                     COLLECT ENTITY NOW
                  </div>
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-[1s] skew-x-12" />
               </motion.button>
            </div>

         </div>
      </div>

      {/* RE-IMPLEMENTED RESPONSIVE CHECKOUT MODAL */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 sm:p-12">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCheckout(false)} className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
             <motion.div initial={{ scale: 0.9, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 40 }} className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[3.5rem] p-12 sm:p-20 shadow-[0_60px_120px_rgba(0,0,0,0.9)] text-center overflow-hidden">
                <button onClick={() => setShowCheckout(false)} className="absolute top-10 right-10 text-zinc-700 hover:text-white transition-colors"><X size={32} /></button>
                
                {checkoutStep === 1 && (
                  <>
                     <div className="w-24 h-24 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mx-auto mb-10 shadow-[0_0_40px_rgba(255,0,0,0.3)]">
                        <ShoppingCart size={36} className="text-accent" />
                     </div>
                     <h2 className="text-4xl font-black text-white uppercase tracking-[0.4em] mb-6 leading-tight">Confirm Secure Archive</h2>
                     <p className="text-zinc-600 font-bold uppercase tracking-widest text-[10px] mb-12">Mendekripsi otoritas kepemilikan untuk entitas {ghost.name}.</p>
                     
                     <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 mb-12 flex justify-between items-center text-left">
                        <div className="space-y-2">
                           <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block">Subjek Arkeologi</span>
                           <span className="text-xl font-black text-white uppercase tracking-tighter">{ghost.name}</span>
                        </div>
                        <div className="text-right space-y-2">
                           <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block">Biaya Obsidian</span>
                           <div className="flex items-center gap-3 justify-end">
                              <Image src="/assets/icon/OBSIDIAN.png" alt="OB" width={22} height={22} className="object-contain" />
                              <span className="text-2xl font-black text-gold">10</span>
                           </div>
                        </div>
                     </div>

                     <button onClick={handleCheckout} className="w-full py-8 bg-accent text-white font-black uppercase tracking-[0.5em] rounded-2xl shadow-2xl hover:brightness-125 transition-all">Lanjutkan Otorisasi</button>
                  </>
                )}

                {checkoutStep === 2 && (
                  <div className="py-24 flex flex-col items-center">
                     <div className="w-20 h-20 border-4 border-accent border-t-white rounded-full animate-spin mb-10" />
                     <h2 className="text-2xl font-black text-white uppercase tracking-[0.4em] animate-pulse">Scanning Soul Frequency...</h2>
                  </div>
                )}

                {checkoutStep === 3 && (
                  <div className="py-12 flex flex-col items-center">
                     <div className="w-28 h-28 bg-green-500/10 border-2 border-green-500 rounded-full flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                        <CheckCircle2 size={64} className="text-green-500" />
                     </div>
                     <h2 className="text-5xl font-black text-white uppercase tracking-[0.5em] mb-6">Archive Secured</h2>
                     <p className="text-zinc-500 font-bold uppercase tracking-widest text-[11px] mb-14 leading-relaxed">Entitas kini telah sepenuhnya terintegrasi dalam vault pribadi Anda.</p>
                     <button onClick={() => { setShowCheckout(false); setCheckoutStep(1); }} className="px-16 py-6 bg-white/[0.05] border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-[0.5em] hover:bg-white/10 transition-colors">Selesai</button>
                  </div>
                )}
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
