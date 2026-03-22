"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Bell,
  ShoppingCart,
  Users2,
  Clapperboard,
  Play,
  Ghost,
  Trophy,
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  Wallet,
  QrCode,
  Settings,
  LogOut,
  FlaskConical,
  Newspaper,
  Mic2,
  Film,
  Gamepad2,
  BookOpen,
  BookMarked,
  PenTool,
  MessageCircle,
  BookHeart,
  Gem,
  Store,
} from "lucide-react";
import { ClockWidget } from "@/components/ClockWidget";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

/* ─── Scroll-triggered animation wrapper ─── */
function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
    description: "REKAMAN FREKUENSI RENDAH DARI LOKASI YANG SEHARUSNYA TIDAK PERNAH KAU INJAK.",
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

const CATEGORIES = [
  {
    id: "explore",
    title: "Explore",
    subtitle: "PELAJARI & EKSPLOR DUNIA MISTIS",
    icon: Ghost,
    features: [
      { name: "Ghost Archive", href: "/ghost-archive", meta: "Ensiklopedia Resmi", icon: Ghost },
      { name: "Laboratorium", href: "/lab", meta: "Riset Eksperimental", icon: FlaskConical },
      { name: "Blog", href: "/blog", meta: "Artikel Okultisme", icon: Newspaper },
    ]
  },
  {
    id: "experience",
    title: "Experience",
    subtitle: "MERASAKAN PENGALAMAN HORROR",
    icon: Play,
    features: [
      { name: "Podcast", href: "/podcast", meta: "Sinyal EVP", icon: Mic2 },
      { name: "Trailer Film", href: "/trailers", meta: "Visual Imersif", icon: Film },
      { name: "Games", href: "/games", meta: "Teror Interaktif", icon: Gamepad2 },
    ]
  },
  {
    id: "stories",
    title: "Stories",
    subtitle: "KONSUMSI & CIPTAKAN CERITA",
    icon: Clapperboard,
    features: [
      { name: "Novel", href: "/novels", meta: "Narasi Panjang", icon: BookOpen },
      { name: "Komik", href: "/comics", meta: "Narasi Visual", icon: BookMarked },
      { name: "Cerpen", href: "/short-stories", meta: "Cerita Singkat", icon: PenTool },
    ]
  },
  {
    id: "community",
    title: "Community",
    subtitle: "INTERAKSI & KONEKSI PERSONAL",
    icon: Users2,
    features: [
      { name: "Komunitas", href: "/community", meta: "Diskusi Mendalam", icon: MessageCircle },
      { name: "Diary", href: "/diary", meta: "Catatan Pribadi", icon: BookHeart },
    ]
  },
  {
    id: "collection",
    title: "Collection",
    subtitle: "PROGRES & ARTEFAK DIGITAL",
    icon: Trophy,
    features: [
      { name: "G-Collector", href: "/collector", meta: "Sistem Progres", icon: Gem },
    ]
  },
  {
    id: "market",
    title: "Market",
    subtitle: "PERDAGANGAN ASET DIGITAL",
    icon: ShoppingCart,
    features: [
      { name: "Marketplace", href: "/marketplace", meta: "Aset Black Market", icon: Store },
    ]
  }
];

const LATEST_SIGNALS = [
  { id: "sig-1", type: "ENTITY", title: "Wewe Gombel", meta: "Arsip Diperbarui 3j Lalu", image: "/images/ghost-archive/WEWE_GOMBEL_V2/hero.png", href: "/ghost-archive/wewe-gombel", color: "text-red-500" },
  { id: "sig-2", type: "PODCAST", title: "Jeruk Purut: Lorong Tak Kembali", meta: "Durasi 21 Menit", image: "/assets/images/EXCLUSIVE PODCAST KONTEN.jpg", href: "/podcast/1", color: "text-orange-500" },
  { id: "sig-3", type: "DIARY", title: "\u201cSuara itu manggil nama saya...\u201d", meta: "oleh @anon_surabaya", image: "/assets/images/DIARY DASHBOARD.png", href: "/diary/1", color: "text-purple-500" },
  { id: "sig-4", type: "NOVEL", title: "Malam Saat Rumah Itu Menjawab", meta: "Bab 1 Tersedia", image: "/assets/images/NOVEL DASHBOARD.png", href: "/novels/1", color: "text-amber-500" },
  { id: "sig-5", type: "COLLECTOR", title: "Fragmen Cermin Kutukan", meta: "Artefak Langka Ditemukan", image: "/assets/images/G-COLLECTOR DASHBOARD.png", href: "/collector/1", color: "text-emerald-500" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [currentHero, setCurrentHero] = useState(0);
  const [showDossier, setShowDossier] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [userProfile, setUserProfile] = useState<{name: string, avatar: string, level: number} | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserProfile({
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || "Archivist",
          avatar: user.user_metadata?.avatar_url || "/assets/images/profile.jpg",
          level: 18,
        });
      }
    };
    fetchUser();
  }, []);

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollSignals = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentHero((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentHero((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="min-h-screen pb-20 relative bg-[#020202] font-cinzel overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 w-full flex flex-col">

        {/* ─── HEADER ─── */}
        <header className="sticky top-0 z-[70] bg-[#020202]/95 backdrop-blur-3xl border-b border-white/5 py-4 flex items-center justify-between w-full">
          <div className="flex items-center gap-10">
            <div className="hidden lg:block relative group">
              <span className="text-3xl font-horror text-white hover:text-accent transition-all duration-700 tracking-[0.3em] drop-shadow-[0_0_20px_rgba(255,100,100,0.4)] cursor-pointer">DREADNOUTE</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/10 rounded-2xl p-1 shadow-2xl">
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

          <div className="flex items-center gap-4">
            <Link href="/notifications">
              <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-accent transition-all border border-white/10 group bg-white/[0.02] relative">
                <Bell size={20} className="group-hover:rotate-12 transition-all" />
                <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
              </button>
            </Link>

            <div className="relative">
              <div
                onClick={() => setShowDossier(!showDossier)}
                className="flex items-center gap-4 p-2 px-5 bg-white/[0.04] border border-white/10 rounded-2xl hover:border-accent/50 transition-all cursor-pointer group shadow-2xl"
              >
                <div className="flex flex-col items-end">
                  <span className="text-[13px] font-black text-white uppercase tracking-wider">{userProfile?.name || 'Loading...'}</span>
                  <span className="text-[11px] font-black text-yellow-400 tracking-widest uppercase drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]">Archivist Lv.{userProfile?.level || 1}</span>
                </div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-2 border-accent p-0.5 shadow-[0_0_25px_rgba(255,0,0,0.6)] overflow-hidden relative group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(255,0,0,0.9)] transition-all duration-300 bg-zinc-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={userProfile?.avatar || "/assets/images/profile.jpg"}
                      alt="User Profile"
                      className="w-full h-full object-cover brightness-110 contrast-105"
                      onError={(e) => {
                        const fallbackName = userProfile?.name || 'Archivist';
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${fallbackName}&background=8b0000&color=fff`;
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-black rounded-full flex items-center justify-center z-20">
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_12px_#34d399]" />
                  </div>
                </div>
              </div>

              {/* Tutorial Popup */}
              <AnimatePresence>
                {showTutorial && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute top-full right-0 mt-4 w-64 z-[200]"
                  >
                    <div className="absolute -top-2 right-12 w-4 h-4 bg-accent rotate-45 border-t border-l border-accent/60" />
                    <div className="bg-[#0d0404] border border-accent/60 rounded-2xl p-5 shadow-[0_20px_60px_rgba(255,0,0,0.3)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
                      <div className="relative z-10">
                        <p className="text-[9px] font-black text-accent uppercase tracking-[0.5em] mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping inline-block" />
                          Misi Pertama
                        </p>
                        <p className="text-[12px] font-black text-white leading-snug mb-4">Lengkapi profil kamu untuk mengaktifkan seluruh fitur jaringan V.O.I.D.</p>
                        <div className="flex gap-2">
                          <Link href="/profile" onClick={() => { localStorage.setItem("void_tutorial_seen","1"); setShowTutorial(false); }} className="flex-1 py-2.5 bg-accent text-white text-[10px] font-black uppercase tracking-wider rounded-xl text-center hover:bg-red-700 transition-colors">
                            Buka Profile
                          </Link>
                          <button onClick={() => { localStorage.setItem("void_tutorial_seen","1"); setShowTutorial(false); }} className="py-2.5 px-3 bg-white/5 border border-white/10 text-zinc-500 text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-white/10 transition-colors">
                            Nanti
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dossier Dropdown */}
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
                      <button onClick={handleSignOut} className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-950/30 transition-all group/item mt-4">
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

        {/* ─── MAIN CONTENT ─── */}
        <main className="w-full pt-10 flex flex-col">

          {/* ══════════════════════════════════════════════════
              1. HERO CAROUSEL
          ══════════════════════════════════════════════════ */}
          <section className="relative w-full aspect-[16/9] max-h-[560px] rounded-[2rem] border border-white/5 group shadow-2xl overflow-hidden">
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 bg-black/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHero}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0"
                >
                  <Image src={HERO_SLIDES[currentHero].image} alt="Hero" fill className="object-cover brightness-[0.4] grayscale-[0.2]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
                  <div className="absolute inset-y-0 left-0 p-10 md:p-14 flex flex-col justify-center items-start text-left max-w-2xl relative z-10">
                    <motion.span initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-gold font-bold uppercase tracking-[0.8em] text-[10px] mb-6 flex items-center gap-6">
                      <div className="h-px w-10 bg-gold/40" /> {HERO_SLIDES[currentHero].subtitle}
                    </motion.span>
                    <motion.h1 initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9] drop-shadow-[0_20px_40px_rgba(0,0,0,1)]">
                      {HERO_SLIDES[currentHero].title}
                    </motion.h1>
                    <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 0.5 }} transition={{ delay: 0.2 }} className="text-zinc-400 text-sm lg:text-base mb-10 font-cinzel italic leading-relaxed tracking-wide">
                      &ldquo;{HERO_SLIDES[currentHero].description}&rdquo;
                    </motion.p>
                    <button className="group relative px-10 py-5 bg-accent text-white font-bold uppercase tracking-[0.5em] text-[10px] rounded-2xl hover-glow flex items-center gap-5 transition-all active:scale-95 shadow-[0_20px_40px_rgba(255,0,0,0.3)] border border-white/10">
                      <Play size={18} fill="currentColor" /> {HERO_SLIDES[currentHero].cta}
                    </button>
                  </div>
                  <div className="absolute -right-20 -bottom-20 w-[300px] h-[300px] pointer-events-none group-hover:translate-x-10 group-hover:-translate-y-10 transition-transform duration-[5s] opacity-15 filter blur-2xl">
                    <Ghost size={300} className="text-accent" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-8 z-30">
              <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-accent transition-all">
                <ChevronLeft size={22} />
              </button>
              <div className="flex gap-3">
                {HERO_SLIDES.map((_, i) => (
                  <div key={i} className={cn("h-1.5 transition-all rounded-full", currentHero === i ? "w-10 bg-accent shadow-[0_0_12px_red]" : "w-3 bg-white/15")} />
                ))}
              </div>
              <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-accent transition-all">
                <ChevronRight size={22} />
              </button>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════
              2. LATEST SIGNALS — Square cards, swipeable
          ══════════════════════════════════════════════════ */}
          <AnimatedSection className="mt-20">
            <AnimatedTitle>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-[11px] font-black text-red-500 uppercase tracking-[0.5em] mb-2 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_red]" />
                    LATEST SIGNALS
                  </h2>
                  <p className="text-zinc-600 text-xs font-medium tracking-wider uppercase">Arsip, siaran, dan temuan terbaru dari ekosistem Dreadnoute.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => scrollSignals('left')} className="p-3 bg-white/[0.04] border border-white/10 rounded-xl hover:bg-white/10 hover:border-accent/30 transition-all text-zinc-500 hover:text-white"><ChevronLeft size={18} /></button>
                  <button onClick={() => scrollSignals('right')} className="p-3 bg-white/[0.04] border border-white/10 rounded-xl hover:bg-white/10 hover:border-accent/30 transition-all text-zinc-500 hover:text-white"><ChevronRight size={18} /></button>
                </div>
              </div>
            </AnimatedTitle>

            <div ref={scrollRef} className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
              {LATEST_SIGNALS.map((sig, idx) => (
                <Link key={sig.id} href={sig.href} className="group snap-start shrink-0" style={{ width: 'calc((100% - 60px) / 4)' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative aspect-square rounded-2xl overflow-hidden border border-white/[0.06] bg-zinc-950 transition-all duration-500 group-hover:border-red-500/30 group-hover:shadow-[0_20px_40px_rgba(255,0,0,0.15)] group-hover:-translate-y-2"
                  >
                    <Image src={sig.image} alt={sig.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.6] group-hover:brightness-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={cn("text-[9px] font-black tracking-[0.3em] uppercase bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10", sig.color)}>
                        {sig.type}
                      </span>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="text-white text-sm font-black uppercase tracking-tight line-clamp-2 mb-1.5">{sig.title}</h3>
                      <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider group-hover:text-zinc-300 transition-colors">{sig.meta}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-500 transition-all duration-500 group-hover:w-full shadow-[0_0_10px_red]" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </AnimatedSection>

          {/* ══════════════════════════════════════════════════
              3. FEATURED ENTITY — Bigger ghost, animated
          ══════════════════════════════════════════════════ */}
          <AnimatedSection className="mt-24">
            <section className="relative py-16 lg:py-20 px-10 lg:px-14 rounded-[2.5rem] overflow-hidden border border-white/[0.06] bg-[linear-gradient(135deg,rgba(30,4,4,0.6),rgba(5,5,10,0.95))]">
              <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-red-900/25 blur-[120px] rounded-full pointer-events-none" />
              <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
              <div className="absolute top-0 right-1/4 w-60 h-60 bg-red-600/8 blur-[80px] rounded-full pointer-events-none animate-pulse" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* Text side */}
                <div className="flex-1 space-y-6">
                  <AnimatedTitle>
                    <div className="space-y-4">
                      <span className="text-red-500 font-black uppercase tracking-[0.6em] text-[10px] flex items-center gap-3">
                        <div className="h-px w-8 bg-red-500/50" /> FEATURED ENTITY
                      </span>
                      <h2 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">Wewe<br />Gombel</h2>
                      <p className="text-zinc-400 text-base font-cinzel italic leading-relaxed max-w-lg">
                        &ldquo;Entitas pengasuh supranatural yang mendiami perbatasan antara perlindungan dan ancaman. Selama berabad-abad, ia menjadi penjaga moral masyarakat Jawa.&rdquo;
                      </p>
                    </div>
                  </AnimatedTitle>
                  <div className="flex items-center gap-5 pt-4">
                    <Link href="/ghost-archive/wewe-gombel">
                      <button className="px-8 py-4 bg-accent text-white font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl hover:bg-red-700 transition-all shadow-[0_10px_30px_rgba(255,0,0,0.25)] active:scale-95">Buka Arsip</button>
                    </Link>
                    <Link href="/ghost-archive">
                      <button className="px-8 py-4 bg-white/[0.03] border border-white/10 text-zinc-400 font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl hover:bg-white/[0.07] hover:border-white/20 transition-all">Semua Entitas</button>
                    </Link>
                  </div>
                </div>

                {/* Ghost image — 50% width, with zoom animation */}
                <motion.div
                  className="relative w-full lg:w-[50%] aspect-[3/4] max-h-[520px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] shrink-0"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Image src="/images/ghost-archive/WEWE GOMBEL/Wewe Gombel - hero.jpg" alt="Wewe Gombel" fill className="object-cover object-top" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-red-950/20" />
                  <div className="absolute bottom-6 left-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_red]" />
                      <span className="text-[9px] font-black text-red-400 uppercase tracking-[0.4em]">Aktif // Bahaya Tinggi</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          </AnimatedSection>

          {/* ══════════════════════════════════════════════════
              4. CATEGORY SECTIONS — Each section separate, big cards, no header images
          ══════════════════════════════════════════════════ */}
          <div className="mt-28 space-y-24">
            {CATEGORIES.map((cat, catIdx) => (
              <AnimatedSection key={cat.id} delay={catIdx * 0.05}>
                {/* Section Title — text only, with icon */}
                <AnimatedTitle className="mb-8">
                  <div className="flex items-center gap-5 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(255,0,0,0.15)]">
                      <cat.icon size={22} />
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">{cat.title}</h2>
                      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] mt-1">{cat.subtitle}</p>
                    </div>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-accent/30 via-white/[0.04] to-transparent" />
                </AnimatedTitle>

                {/* Feature Cards — big, responsive */}
                <div className={cn(
                  "grid gap-5",
                  cat.features.length === 1 ? "grid-cols-1 max-w-lg" :
                  cat.features.length === 2 ? "grid-cols-1 md:grid-cols-2" :
                  "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                )}>
                  {cat.features.map((feat, featIdx) => (
                    <motion.div
                      key={feat.href}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: featIdx * 0.1, duration: 0.5 }}
                    >
                      <Link href={feat.href} className="group block">
                        <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-zinc-950/80 transition-all duration-500 group-hover:border-accent/30 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_rgba(255,0,0,0.1)]">
                          {/* Card content */}
                          <div className="p-6 lg:p-8 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-500 group-hover:text-accent group-hover:border-accent/30 group-hover:bg-accent/10 transition-all duration-500 shrink-0 shadow-lg">
                              <feat.icon size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors duration-300">{feat.name}</h3>
                              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mt-1 group-hover:text-zinc-400 transition-colors">{feat.meta}</p>
                            </div>
                            <ChevronRight size={18} className="text-zinc-800 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                          </div>

                          {/* Bottom accent line */}
                          <div className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-hover:w-full transition-all duration-700 shadow-[0_0_10px_red]" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* ══════════════════════════════════════════════════
              5. G-COLLECTOR PREVIEW — Bigger, more prominent
          ══════════════════════════════════════════════════ */}
          <AnimatedSection className="mt-28">
            <section className="p-10 lg:p-16 rounded-[2.5rem] bg-[linear-gradient(145deg,rgba(12,6,3,0.9),rgba(0,0,0,1))] border border-white/[0.06] relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[120px] -mr-20 -mt-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-gold/5 blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shadow-[0_0_25px_rgba(197,160,89,0.25)]">
                      <Trophy size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight">Koleksi Terdeteksi</h3>
                      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">G-Collector Progression System</p>
                    </div>
                  </div>
                  <Link href="/collector">
                    <button className="px-10 py-5 bg-gold text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-xl active:scale-95 transition-all shadow-[0_10px_25px_rgba(197,160,89,0.25)] hover:brightness-110">
                      Buka Koleksi
                    </button>
                  </Link>
                </div>

                {/* Progress bar */}
                <div className="mb-10">
                  <div className="flex justify-between text-xs font-black text-zinc-400 uppercase tracking-wider mb-3">
                    <span>Capture Progress</span>
                    <span className="text-accent">12 / 87 Entitas</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent to-red-700 rounded-full shadow-[0_0_12px_red]"
                      initial={{ width: 0 }}
                      whileInView={{ width: "14%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Artifact previews — bigger */}
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                  {["/assets/images/nyi-roro-kidul.jpg", "/assets/images/kuntilanak-peek.png", "/assets/images/suster-ngesot.jpg", "/assets/images/nenek-gayung.jpg", "/assets/images/nyi-roro-kidul.jpg", "/assets/images/kuntilanak-peek.png", "/assets/images/suster-ngesot.jpg", "/assets/images/nenek-gayung.jpg"].map((src, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="aspect-[3/4] rounded-xl bg-zinc-950 border border-white/[0.06] relative group cursor-pointer hover:border-accent/30 transition-all overflow-hidden"
                    >
                      <Image src={src} alt="Artifact" fill className="object-cover grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-90 transition-all duration-500" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-500" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </AnimatedSection>

          {/* ══════════════════════════════════════════════════
              6. FOOTER — Bigger, more spacious
          ══════════════════════════════════════════════════ */}
          <footer className="mt-28 pt-20 w-full border-t border-white/[0.04] text-center flex flex-col items-center gap-10 pb-16">
            <AnimatedSection>
              <div className="space-y-5">
                <h2 className="text-zinc-100 text-3xl font-horror tracking-[0.5em] opacity-20">DREADNOUTE</h2>
                <p className="text-zinc-600 text-xs font-black uppercase tracking-[0.4em] max-w-lg mx-auto italic leading-relaxed">
                  &ldquo;Beberapa pintu sebaiknya tidak pernah terbuka. Beberapa rahasia sebaiknya tidak pernah diceritakan.&rdquo;
                </p>
              </div>
            </AnimatedSection>
            <div className="flex gap-12 text-[10px] font-black text-zinc-700 uppercase tracking-widest">
              <Link href="/term" className="hover:text-zinc-400 transition-colors">V.O.I.D Term</Link>
              <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Transmission Privacy</Link>
              <Link href="/status" className="hover:text-zinc-400 transition-colors">Signal Status</Link>
            </div>
            <p className="text-[9px] font-bold text-zinc-800 uppercase tracking-widest">© 2024 DREADNOUTE ECOSYSTEM // BUILT BY ARCHIVISTS</p>
          </footer>

        </main>
      </div>
    </div>
  );
}
