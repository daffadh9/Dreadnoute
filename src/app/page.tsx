"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Gamepad2, 
  ShoppingCart, 
  Users2, 
  Clapperboard,
  Play,
  Search,
  Ghost,
  Trophy,
  Flame,
  Activity,
  Mic2,
  ChevronLeft,
  ChevronRight,
  Eye,
  User,
  Briefcase,
  Wallet,
  Skull,
  QrCode,
  Settings,
  LogOut,
} from "lucide-react";
import { ClockWidget } from "@/components/ClockWidget";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const HERO_SLIDES = [
  {
    image: "/assets/images/COLLECTOR BANNER.jpg",
    title: "MASUK KE GHOST ARCHIVE",
    subtitle: "GHOST ARCHIVE // ENSIKLOPEDIA RESMI",
    description: "TELUSURI ENTITAS TERLARANG DARI BERBAGAI WILAYAH DENGAN ARSIP INVESTIGASI TERKURASI.",
    cta: "Buka Archive",
  },
  {
    image: "/assets/images/EXCLUSIVE PODCAST KONTEN.jpg",
    title: "BISIKAN YANG TAK MATI",
    subtitle: "PODCAST // REKAMAN RAHASIA",
    description: "REKAMAN FREKUENSI RENDAH DARI LOKASI YANG SEHARUSNYA TIDAK PERNAH KAU INJAK. JANGAN DENGARKAN SENDIRIAN.",
    cta: "Dengarkan Sekarang",
  },
  {
    image: "/assets/images/BLACK MARKETPLACE BANNER (1).jpg",
    title: "MILIKI ARTEFAK TERKUTUK",
    subtitle: "MARKETPLACE // BLACK MARKET",
    description: "DAPATKAN ASET DIGITAL EKSKLUSIF UNTUK RITUAL KREATIFMU DI BLACK MARKET.",
    cta: "Buka Market",
  }
];

const SEARCH_FILTERS = [
  { label: "Trending", icon: Flame },
  { label: "Terlangka", icon: Skull },
  { label: "Paling Dicari", icon: Eye },
  { label: "Eksklusif", icon: Trophy },
  { label: "Baru", icon: Activity },
];

const FEATURE_CARDS = [
  { title: "Podcast",    icon: Mic2,        href: "/podcast",    meta: "EVP Signals",     image: "/assets/images/PODCAST BANNER DASHBOARD.jpg" },
  { title: "Ghost Archive", icon: Ghost,    href: "/ghost-archive", meta: "Encyclopedia", image: "/assets/images/GHOST WIKI DASHBOARD.jpg" },
  { title: "Games",      icon: Gamepad2,    href: "/games",      meta: "The Crypt",       image: "/assets/images/GAME BANNER DASHBOARD.jpg" },
  { title: "Market",     icon: ShoppingCart,href: "/marketplace",meta: "Ancient Goods",   image: "/assets/images/MARKET DASHBOARD.jpg" },
  { title: "Trailers",   icon: Clapperboard,href: "/trailers",   meta: "Forbidden Media", image: "/assets/images/TRAILER DASHBOARD.jpg" },
  { title: "Komunitas",  icon: Users2,      href: "/community",  meta: "Deep Discussion", image: "/assets/images/KOMUNITAS BANNER DASHBOARD.jpg" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [currentHero, setCurrentHero] = useState(0);
  const [activeFilter, setActiveFilter] = useState("Trending");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showDossier, setShowDossier] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.replace("/auth");
  }, [router]);

  useEffect(() => {
    const seen = localStorage.getItem("void_tutorial_seen");
    if (!seen) {
      const t = setTimeout(() => setShowTutorial(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentHero((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentHero((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="min-h-screen pb-40 relative bg-[#020202] font-cinzel overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-8 w-full flex flex-col">
        {/* Top Bar - Total Reset */}
        <header className="sticky top-0 z-[70] bg-[#020202]/95 backdrop-blur-3xl border-b border-white/5 py-4 flex items-center justify-between w-full">
         <div className="flex items-center gap-10">
            {/* Logo area handled by Sidebar now to avoid double logos */}
            <div className="hidden lg:block relative group">
               <span className="text-3xl font-horror text-white hover:text-accent transition-all duration-700 tracking-[0.3em] drop-shadow-[0_0_20px_rgba(255,100,100,0.4)] cursor-pointer">DREADNOUTE</span>
            </div>
         </div>

         {/* CENTRALIZE PERSONAL PANEL */}
          {/* NAV GROUP: WALLET, CLOCK, PROFILE */}
          <div className="flex items-center gap-8">
            {/* WALLET & ACTION CONTAINER */}
            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/10 rounded-2xl p-1 shadow-2xl">
               {/* Currency Bar - Organized Gaps */}
               <div className="flex items-center gap-12 px-6 py-2 border-r border-white/10">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full border-2 border-white/10 shadow-[0_0_20px_rgba(255,0,0,0.2)] overflow-hidden relative">
                        <Image src="/assets/icons/DREADCOINS.jpg" alt="DC" fill className="object-cover" />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[13px] text-white font-black uppercase leading-none">540</span>
                       <span className="text-zinc-600 text-[7px] font-black uppercase mt-1">DCs</span>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full border-2 border-white/10 shadow-[0_0_20px_rgba(197,160,89,0.2)] overflow-hidden relative">
                        <Image src="/assets/icons/OBSIDIAN.png" alt="OB" fill className="object-cover" />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[13px] text-gold font-black uppercase leading-none">120</span>
                       <span className="text-zinc-600 text-[7px] font-black uppercase mt-1">Obsidian</span>
                     </div>
                  </div>
               </div>

               {/* Action Area: SCAN & TOPUP */}
               <div className="flex items-center gap-2 px-2">
                  <button className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-xl transition-all cursor-pointer group">
                     <QrCode size={16} className="text-accent" />
                     <span className="text-[8px] font-black text-zinc-500 uppercase">SCAN</span>
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2 bg-accent shadow-[0_0_20px_rgba(255,0,0,0.3)] text-white rounded-xl transition-all font-black text-[8px] uppercase active:scale-95">
                     <Wallet size={16} />
                     TOP UP
                  </button>
               </div>
            </div>

            <ClockWidget />
          </div>

            {/* Notification & Profile */}
            <div className="flex items-center gap-4">
                <Link href="/notifications">
                  <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-accent transition-all border border-white/10 group bg-white/[0.02] relative">
                    <Bell size={20} className="group-hover:rotate-12 transition-all" />
                    <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
                  </button>
                </Link>

            {/* Archivist ID Card & Avatar */}
            <div className="relative">
              <div
                onClick={() => setShowDossier(!showDossier)}
                className="flex items-center gap-4 p-2 px-5 bg-white/[0.04] border border-white/10 rounded-2xl hover:border-accent/50 transition-all cursor-pointer group shadow-2xl"
              >
                  <div className="flex flex-col items-end">
                    <span className="text-[13px] font-black text-white uppercase tracking-wider">Daffa</span>
                    <span className="text-[11px] font-black text-yellow-400 tracking-widest uppercase drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]">Archivist Lv.18</span>
                  </div>

                  <div className="relative">
                    <div className="w-14 h-14 rounded-full border-2 border-accent p-0.5 shadow-[0_0_25px_rgba(255,0,0,0.6)] overflow-hidden relative group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(255,0,0,0.9)] transition-all duration-300 bg-zinc-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/assets/images/profile.jpg"
                        alt="User Profile"
                        className="w-full h-full object-cover brightness-110 contrast-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Daffa&background=8b0000&color=fff";
                        }}
                      />
                    </div>
                    {/* Status Indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-black rounded-full flex items-center justify-center z-20">
                      <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_12px_#34d399]" />
                    </div>
                  </div>
              </div>

              {/* ── TUTORIAL POPUP ── */}
              <AnimatePresence>
                {showTutorial && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute top-full right-0 mt-4 w-64 z-[200]"
                  >
                    {/* Arrow */}
                    <div className="absolute -top-2 right-12 w-4 h-4 bg-accent rotate-45 border-t border-l border-accent/60" />
                    <div className="bg-[#0d0404] border border-accent/60 rounded-2xl p-5 shadow-[0_20px_60px_rgba(255,0,0,0.3)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
                      <div className="relative z-10">
                        <p className="text-[9px] font-black text-accent uppercase tracking-[0.5em] mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping inline-block" />
                          Misi Pertama
                        </p>
                        <p className="text-[12px] font-black text-white leading-snug mb-4">
                          Lengkapi profil kamu untuk mengaktifkan seluruh fitur jaringan V.O.I.D.
                        </p>
                        <div className="flex gap-2">
                          <Link
                            href="/profile"
                            onClick={() => { localStorage.setItem("void_tutorial_seen","1"); setShowTutorial(false); }}
                            className="flex-1 py-2.5 bg-accent text-white text-[10px] font-black uppercase tracking-wider rounded-xl text-center hover:bg-red-700 transition-colors"
                          >
                            Buka Profile
                          </Link>
                          <button
                            onClick={() => { localStorage.setItem("void_tutorial_seen","1"); setShowTutorial(false); }}
                            className="py-2.5 px-3 bg-white/5 border border-white/10 text-zinc-500 text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-white/10 transition-colors"
                          >
                            Nanti
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* THE SECRET DOSSIER DROPDOWN */}
              <AnimatePresence>
                {showDossier && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute top-full right-0 mt-4 w-72 glass-morphism-heavy rounded-3xl p-6 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,1)] z-[100]"
                  >
                     <div className="absolute inset-0 bg-accent/5 opacity-10 pointer-events-none rounded-3xl" />
                     
                     <div className="space-y-4 relative z-10">
                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.6em] mb-6 border-b border-white/5 pb-4">The Secret Dossier</p>
                        
                        <Link href="/profile" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all group/item">
                           <User size={16} className="text-gold group-hover/item:scale-110 transition-transform" />
                           <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.3em] group-hover/item:text-gold transition-colors">Bio & Profile</span>
                        </Link>
                        
                        <Link href="/inventory" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all group/item">
                           <Briefcase size={16} className="text-gold group-hover/item:scale-110 transition-transform" />
                           <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.3em] group-hover/item:text-gold transition-colors">Digital Inventory</span>
                        </Link>

                        <Link href="/settings" className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all group/item">
                           <Settings size={16} className="text-gold group-hover/item:scale-110 transition-transform" />
                           <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.3em] group-hover/item:text-gold transition-colors">Ritual Config</span>
                        </Link>

                        <div className="h-px bg-white/5 my-4" />

                        <Link href="/marketplace" className="flex items-center gap-4 p-4 rounded-xl bg-gold/10 border border-gold/20 hover:bg-gold/20 transition-all group/item">
                           <Wallet size={16} className="text-gold" />
                           <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Top-up Obsidian</span>
                        </Link>

                        <button
                           onClick={handleSignOut}
                           className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-950/30 transition-all group/item mt-4"
                        >
                           <LogOut size={16} className="text-zinc-600 group-hover/item:text-accent transition-colors" />
                           <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] group-hover/item:text-accent transition-colors">Leave Dimension</span>
                        </button>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="w-full pt-10 flex flex-col gap-20">
           
           {/* 1. Main Banner (Hero) - SAFE ALIGNMENT */}
           <section className="relative w-full h-[600px] rounded-[3rem] border border-white/5 group shadow-2xl overflow-hidden">
            <div className="absolute inset-0 rounded-[4rem] overflow-hidden border border-white/10 bg-black/40">
              <AnimatePresence mode="wait">
                 <motion.div
                    key={currentHero}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                 >
                    <Image 
                       src={HERO_SLIDES[currentHero].image} 
                       alt="Hero" 
                       fill 
                       className="object-cover brightness-[0.4] grayscale-[0.2]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
                    
                    {/* Text CONTENT - ALIGNED with Logo (pl-16) */}
                    <div className="absolute inset-y-0 left-0 p-12 md:p-14 md:pl-16 flex flex-col justify-center items-start text-left max-w-3xl relative z-10 scale-95 origin-left">
                       <motion.span 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="text-gold font-bold uppercase tracking-[0.8em] text-[10px] mb-8 flex items-center gap-6"
                       >
                          <div className="h-px w-12 bg-gold/40" /> {HERO_SLIDES[currentHero].subtitle}
                       </motion.span>

                       <motion.h1 
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="text-6xl font-black text-white uppercase tracking-tighter mb-10 leading-[0.9] drop-shadow-[0_20px_40px_rgba(0,0,0,1)]"
                       >
                          {HERO_SLIDES[currentHero].title}
                       </motion.h1>

                       <motion.p 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 0.5 }}
                          transition={{ delay: 0.2 }}
                          className="text-zinc-400 text-lg mb-14 font-cinzel italic leading-relaxed tracking-wide"
                       >
                          &ldquo;{HERO_SLIDES[currentHero].description}&rdquo;
                       </motion.p>
                       
                       <button className="group relative px-14 py-6 bg-accent text-white font-bold uppercase tracking-[0.5em] text-[11px] rounded-2xl hover-glow flex items-center gap-6 transition-all active:scale-95 shadow-[0_20px_40px_rgba(255,0,0,0.3)] border border-white/10">
                          <Play size={20} fill="currentColor" /> {HERO_SLIDES[currentHero].cta}
                          <div className="absolute inset-0 rounded-2xl border border-white/20 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all" />
                       </button>
                    </div>

                    {/* 3D LEAK ELEMENT - Subtle Hantu "out of bounds" placeholder or visual flair */}
                    <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] pointer-events-none group-hover:translate-x-10 group-hover:-translate-y-10 transition-transform duration-[5s] opacity-20 filter blur-2xl">
                        <Ghost size={400} className="text-accent" />
                    </div>
                 </motion.div>
              </AnimatePresence>
            </div>

            {/* Swipe Controls */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-12 z-30">
               <button onClick={prevSlide} className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-accent transition-all shadow-2xl">
                  <ChevronLeft size={28} />
               </button>
               <div className="flex gap-4">
                  {HERO_SLIDES.map((_, i) => (
                    <div key={i} className={cn("h-1.5 transition-all rounded-full", currentHero === i ? "w-12 bg-accent shadow-[0_0_15px_red]" : "w-4 bg-white/10")} />
                  ))}
               </div>
               <button onClick={nextSlide} className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-accent transition-all shadow-2xl">
                  <ChevronRight size={28} />
               </button>
            </div>
         </section>

         {/* 2. OMNISEARCH BAR - CENTERED & OPTIMIZED */}
         <section className="flex flex-col items-center gap-12 -mt-10 px-4">
            <div className="w-full max-w-[700px] group relative">
               <div className={cn(
                  "absolute inset-0 bg-accent/20 blur-[100px] rounded-full opacity-0 transition-opacity duration-1000",
                  searchFocused && "opacity-40"
               )} />
               
               <div className={cn(
                  "relative bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full flex items-center p-3 transition-all duration-700",
                  searchFocused ? "border-accent/60 shadow-[0_0_60px_rgba(255,0,0,0.4)]" : "hover:border-white/20"
               )}>
                  <div className="pl-8 pr-4 text-zinc-600 transition-colors group-hover:text-gold">
                     <Search size={20} className={cn("transition-all", searchFocused && "text-accent scale-110")} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="CARILAH FREKUENSI YANG HILANG..." 
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full bg-transparent border-none py-5 text-[12px] text-white focus:outline-none font-bold tracking-[0.4em] placeholder:text-zinc-800 uppercase"
                  />
                  <div className="pr-3">
                     <button className="px-10 py-4 bg-white/[0.03] border border-white/10 text-gold font-bold uppercase tracking-[0.6em] text-[9px] rounded-full hover:bg-gold hover:text-black transition-all active:scale-95 shadow-lg">
                        LOCATE
                     </button>
                  </div>
               </div>
            </div>

            {/* 3. Filter Categories - CENTERED */}
            <div className="relative w-full flex flex-wrap justify-center items-center gap-6">
               {SEARCH_FILTERS.map((filter) => (
                  <button
                     key={filter.label}
                     onClick={() => setActiveFilter(filter.label)}
                     className={cn(
                        "flex items-center gap-4 px-10 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] transition-all border group/f",
                        activeFilter === filter.label 
                           ? "bg-accent border-accent text-white shadow-[0_15px_40px_rgba(255,0,0,0.4)]" 
                           : "bg-white/[0.02] border-white/5 text-zinc-600 hover:text-white hover:bg-white/[0.05]"
                     )}
                  >
                     <filter.icon size={16} className={cn(activeFilter === filter.label ? "animate-pulse" : "opacity-30 group-hover/f:opacity-100 transition-opacity")} />
                     {filter.label}
                  </button>
               ))}
            </div>
         </section>

         {/* 4. Feature Cards Grid - FULLY RESPONSIVE 3-COLUMN */}
           <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {FEATURE_CARDS.map((card, i) => (
                 <Link key={i} href={card.href}>
                    <motion.div 
                       whileHover={{ y: -15, scale: 1.02 }}
                       className="group relative h-[360px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#080808] transition-all duration-700"
                    >
                       {/* Background Image */}
                       <Image src={card.image} alt={card.title} fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-transparent" />
                       
                       {/* Icon Position Top-Left */}
                       <div className="absolute top-8 left-8 w-14 h-14 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-accent group-hover:border-accent group-hover:shadow-[0_0_30px_rgba(255,0,0,0.3)] transition-all z-20">
                          <card.icon size={26} />
                       </div>

                       <div className="absolute top-8 right-8 flex items-center gap-3 px-4 py-2 bg-black/80 backdrop-blur-lg rounded-full border border-accent/20 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 z-20">
                          <Activity size={10} className="text-accent animate-pulse" />
                          <span className="text-[7px] font-bold tracking-[0.3em] text-white uppercase whitespace-nowrap">LINK ESTABLISHED</span>
                       </div>

                       {/* Content Overlay */}
                       <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                          <div className="mb-2">
                             <h3 className="text-2xl font-black text-white uppercase tracking-wider">{card.title}</h3>
                             <p className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mt-3 opacity-60 group-hover:opacity-100 transition-opacity">{card.meta}</p>
                          </div>
                          
                          <div className="mt-6 transition-all duration-700 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                             <div className="flex items-center gap-6 text-accent text-[9px] font-bold tracking-[0.4em] uppercase hover:gap-8 transition-all">
                                Initiate Access <ChevronRight size={14} />
                             </div>
                          </div>
                       </div>

                       {/* Spectral Glow Line */}
                       <div className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-1000 shadow-[0_0_20px_red]" />
                    </motion.div>
                 </Link>
              ))}
           </section>
        </main>
      </div>
    </div>
  );
}
