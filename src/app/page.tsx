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
  CreditCard,
  Activity,
  Gift,
  Share2,
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

const PORTAL_FEATURES = [
  { name: "Ghost Archive",  href: "/ghost-archive",   meta: "Ensiklopedia resmi",    icon: Ghost,          iconColor: "#ef4444", borderColor: "rgba(239,68,68,0.4)",   glowColor: "rgba(239,68,68,0.2)",   image: "/assets/images/GHOST WIKI DASHBOARD.jpg",         tier: 1 as const },
  { name: "Podcast",        href: "/podcast",          meta: "Siaran EVP",            icon: Mic2,           iconColor: "#f97316", borderColor: "rgba(249,115,22,0.4)",  glowColor: "rgba(249,115,22,0.2)",  image: "/assets/images/PODCAST BANNER DASHBOARD.jpg",     tier: 1 as const },
  { name: "Trailer Film",   href: "/trailers",         meta: "Visual imersif",        icon: Film,           iconColor: "#dc2626", borderColor: "rgba(220,38,38,0.4)",   glowColor: "rgba(220,38,38,0.2)",   image: "/assets/images/TRAILER DASHBOARD.jpg",            tier: 2 as const },
  { name: "Games",          href: "/games",            meta: "Teror interaktif",      icon: Gamepad2,       iconColor: "#7c3aed", borderColor: "rgba(124,58,237,0.4)",  glowColor: "rgba(124,58,237,0.2)",  image: "/assets/images/GAME BANNER DASHBOARD.jpg",        tier: 2 as const },
  { name: "Marketplace",    href: "/marketplace",      meta: "Aset black market",     icon: Store,          iconColor: "#ea580c", borderColor: "rgba(234,88,12,0.4)",   glowColor: "rgba(234,88,12,0.2)",   image: "/assets/images/MARKET DASHBOARD.jpg",             tier: 1 as const },
  { name: "Novel",          href: "/novels",           meta: "Narasi panjang",        icon: BookOpen,       iconColor: "#b45309", borderColor: "rgba(180,83,9,0.4)",    glowColor: "rgba(180,83,9,0.2)",    image: "/images/thumbnail-fitur-dashboard/Novel.png",     tier: 2 as const },
  { name: "Komik",          href: "/comics",           meta: "Narasi visual",         icon: BookMarked,     iconColor: "#be185d", borderColor: "rgba(190,24,93,0.4)",   glowColor: "rgba(190,24,93,0.2)",   image: "/images/thumbnail-fitur-dashboard/Komik.jpg",     tier: 2 as const },
  { name: "Cerpen",         href: "/short-stories",    meta: "Cerita singkat",        icon: PenTool,        iconColor: "#ca8a04", borderColor: "rgba(202,138,4,0.4)",   glowColor: "rgba(202,138,4,0.2)",   image: "/images/thumbnail-fitur-dashboard/Cerpen.png",    tier: 2 as const },
  { name: "Blog",           href: "/blog",             meta: "Artikel mendalam",      icon: Newspaper,      iconColor: "#d97706", borderColor: "rgba(217,119,6,0.4)",   glowColor: "rgba(217,119,6,0.2)",   image: "/images/thumbnail-fitur-dashboard/Blog.png",      tier: 2 as const },
  { name: "Laboratorium",   href: "/lab",              meta: "Eksperimen okultum",    icon: FlaskConical,   iconColor: "#059669", borderColor: "rgba(5,150,105,0.4)",   glowColor: "rgba(5,150,105,0.2)",   image: "/images/thumbnail-fitur-dashboard/Laboratorium.png", tier: 2 as const },
  { name: "Diary",          href: "/diary",            meta: "Catatan personal",      icon: BookHeart,      iconColor: "#7c3aed", borderColor: "rgba(124,58,237,0.4)",  glowColor: "rgba(124,58,237,0.2)",  image: "/images/thumbnail-fitur-dashboard/Diary.png",     tier: 2 as const },
  { name: "Komunitas",      href: "/community",        meta: "Forum komunitas",       icon: MessageCircle,  iconColor: "#dc2626", borderColor: "rgba(220,38,38,0.4)",   glowColor: "rgba(220,38,38,0.2)",   image: "/assets/images/KOMUNITAS BANNER DASHBOARD.jpg",   tier: 2 as const },
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
    <div className="min-h-screen relative bg-[#020202] font-cinzel overflow-x-hidden">

      {/* ─── HEADER: 3-Zone System ─── */}
      <header className="sticky top-0 z-[70] w-full h-20 bg-[#070709]/85 backdrop-blur-md border-b border-white/[0.05] flex items-center justify-between px-5 lg:px-8 shadow-[0_4px_40px_rgba(0,0,0,0.6)]">

        {/* ZONE 1 — BRAND */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-2xl font-horror text-white hover:text-accent transition-all duration-700 tracking-[0.25em] drop-shadow-[0_0_16px_rgba(255,80,80,0.35)] cursor-pointer hidden lg:block select-none">DREADNOUTE</span>
        </div>

        {/* ZONE 2 — RESOURCE CLUSTER */}
        <div className="flex items-center gap-3">
          {/* Resource Panel */}
          <div className="flex h-10 items-center rounded-full border border-white/[0.08] bg-white/[0.025] shadow-[0_2px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm overflow-hidden">
            {/* DCs */}
            <div className="flex items-center gap-2.5 px-4 h-full border-r border-white/[0.07] hover:bg-white/[0.03] transition-colors cursor-default">
              <div className="w-[18px] h-[18px] rounded-full overflow-hidden relative shrink-0 shadow-[0_0_8px_rgba(255,0,0,0.2)]">
                <Image src="/assets/icons/DREADCOINS.jpg" alt="DC" fill className="object-cover" />
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="text-[12px] text-white font-black tracking-wide">540</span>
                <span className="text-[7px] text-zinc-600 font-black uppercase tracking-[0.2em]">DCs</span>
              </div>
            </div>
            {/* Obsidian */}
            <div className="flex items-center gap-2.5 px-4 h-full border-r border-white/[0.07] hover:bg-white/[0.03] transition-colors cursor-default">
              <div className="w-[18px] h-[18px] rounded-full overflow-hidden relative shrink-0 shadow-[0_0_8px_rgba(197,160,89,0.2)]">
                <Image src="/assets/icons/OBSIDIAN.png" alt="OB" fill className="object-cover" />
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="text-[12px] text-[#c5a059] font-black tracking-wide">120</span>
                <span className="text-[7px] text-zinc-600 font-black uppercase tracking-[0.2em]">Obsidian</span>
              </div>
            </div>
            {/* Scan */}
            <button className="flex items-center gap-2 px-4 h-full hover:bg-white/[0.04] transition-all group">
              <QrCode size={13} className="text-accent/70 group-hover:text-accent transition-colors" />
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em] group-hover:text-zinc-300 transition-colors">Scan</span>
            </button>
          </div>

          {/* TOP UP CTA */}
          <button className="h-10 px-5 rounded-2xl bg-accent text-white font-black text-[9px] uppercase tracking-[0.25em] shadow-[0_6px_20px_rgba(229,9,20,0.3)] hover:-translate-y-[1px] hover:brightness-110 hover:shadow-[0_10px_28px_rgba(229,9,20,0.45)] active:scale-95 transition-all duration-200 flex items-center gap-2 shrink-0">
            <Wallet size={13} />
            Top Up
          </button>
        </div>

        {/* ZONE 3 — USER CONTROL CLUSTER */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Clock — passive info */}
          <div className="h-10 px-3 rounded-xl border border-white/[0.07] bg-white/[0.02] flex items-center opacity-70 hover:opacity-100 transition-opacity">
            <ClockWidget />
          </div>

          {/* Notification */}
          <Link href="/notifications">
            <button className="relative h-10 w-10 rounded-xl border border-white/[0.07] bg-white/[0.02] flex items-center justify-center text-zinc-500 hover:text-white hover:border-accent/30 hover:bg-white/[0.05] hover:shadow-[0_0_14px_rgba(229,9,20,0.15)] transition-all duration-200 group">
              <Bell size={15} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(229,9,20,0.8)] animate-pulse" />
            </button>
          </Link>

          {/* Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => setShowDossier(!showDossier)}
              className="relative h-10 w-10 rounded-full group flex items-center justify-center"
            >
              <div className="w-full h-full rounded-full border border-accent/50 p-[2px] shadow-[0_0_16px_rgba(255,0,0,0.25)] overflow-hidden group-hover:scale-105 group-hover:shadow-[0_0_28px_rgba(255,0,0,0.55)] group-hover:border-accent transition-all duration-250 bg-zinc-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={userProfile?.avatar || "/assets/images/profile.jpg"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    const n = userProfile?.name || 'Archivist';
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${n}&background=8b0000&color=fff`;
                  }}
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#070709] rounded-full flex items-center justify-center z-10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              </span>
            </button>

            {/* Tutorial Popup */}
            <AnimatePresence>
              {showTutorial && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute top-full right-0 mt-4 w-64 z-[200]"
                >
                  <div className="absolute -top-2 right-4 w-4 h-4 bg-accent rotate-45 border-t border-l border-accent/60" />
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

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showDossier && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-3 w-72 rounded-3xl border border-white/[0.08] bg-[#0a0a0d]/95 backdrop-blur-xl shadow-[0_32px_80px_rgba(0,0,0,0.9)] z-[100] overflow-hidden"
                >
                  {/* Top accent glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/[0.06] blur-[60px] pointer-events-none rounded-full" />

                  {/* User info strip */}
                  <div className="px-5 pt-5 pb-4 border-b border-white/[0.05] flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-full border border-accent/40 overflow-hidden shadow-[0_0_12px_rgba(255,0,0,0.2)] shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={userProfile?.avatar || "/assets/images/profile.jpg"} alt="" className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${userProfile?.name || 'A'}&background=8b0000&color=fff`; }} />
                    </div>
                    <div>
                      <p className="text-[13px] font-black text-white uppercase tracking-wide leading-none">{userProfile?.name || 'Archivist'}</p>
                      <p className="text-[9px] text-accent/80 font-bold uppercase tracking-[0.4em] mt-1">Level {userProfile?.level || 1} · Archivist</p>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="p-3 space-y-0.5 relative z-10">
                    {[
                      { href: "/notifications", icon: Bell,        label: "Manajemen Notifikasi", color: "text-red-400" },
                      { href: "/subscription",  icon: CreditCard,  label: "Langganan",             color: "text-purple-400" },
                      { href: "/settings",      icon: Settings,    label: "Settings",              color: "text-zinc-400" },
                      { href: "/activity",      icon: Activity,    label: "Aktivitas & Riwayat",   color: "text-blue-400" },
                      { href: "/collector",     icon: Trophy,      label: "Collection",            color: "text-[#c5a059]" },
                      { href: "/affiliate",     icon: Share2,      label: "Affiliate Program",     color: "text-emerald-400" },
                      { href: "/rewards",       icon: Gift,        label: "Reward",                color: "text-pink-400" },
                    ].map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setShowDossier(false)}>
                        <div className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl hover:bg-white/[0.04] transition-all group/item cursor-pointer">
                          <item.icon size={15} className={cn("shrink-0 transition-all group-hover/item:scale-110", item.color)} />
                          <span className="text-[11px] font-bold text-zinc-400 tracking-[0.15em] uppercase group-hover/item:text-white transition-colors">{item.label}</span>
                        </div>
                      </Link>
                    ))}

                    <div className="h-px bg-white/[0.04] my-2 mx-2" />

                    <button onClick={handleSignOut} className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl hover:bg-red-950/20 transition-all group/item">
                      <LogOut size={15} className="text-zinc-700 group-hover/item:text-accent transition-colors shrink-0" />
                      <span className="text-[11px] font-bold text-zinc-700 tracking-[0.15em] uppercase group-hover/item:text-accent transition-colors">Keluar</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </header>

      {/* ══════════════════════════════════════════════════
          1. HERO CAROUSEL — Full width, h-screen
      ══════════════════════════════════════════════════ */}
      <section className="relative w-full h-screen overflow-hidden group">
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
            {/* Stronger left vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent" />
            {/* Bottom fog */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-y-0 left-0 p-12 md:p-14 md:pl-16 flex flex-col justify-center items-start text-left max-w-3xl relative z-10 scale-95 origin-left">
              <motion.span initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-gold font-bold uppercase tracking-[0.8em] text-[10px] mb-8 flex items-center gap-6">
                <div className="h-px w-12 bg-gold/40" /> {HERO_SLIDES[currentHero].subtitle}
              </motion.span>
              <motion.h1 initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-6xl font-black text-white uppercase tracking-tighter mb-10 leading-[0.9] drop-shadow-[0_20px_40px_rgba(0,0,0,1)]">
                {HERO_SLIDES[currentHero].title}
              </motion.h1>
              <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 0.5 }} transition={{ delay: 0.2 }} className="text-zinc-400 text-lg mb-14 font-cinzel italic leading-relaxed tracking-wide">
                &ldquo;{HERO_SLIDES[currentHero].description}&rdquo;
              </motion.p>
              <button className="group relative px-14 py-6 bg-accent text-white font-bold uppercase tracking-[0.5em] text-[11px] rounded-2xl hover-glow flex items-center gap-6 transition-all active:scale-95 shadow-[0_20px_40px_rgba(255,0,0,0.3)] border border-white/10">
                <Play size={20} fill="currentColor" /> {HERO_SLIDES[currentHero].cta}
                <div className="absolute inset-0 rounded-2xl border border-white/20 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            </div>
            <div className="absolute -right-20 -bottom-20 w-[300px] h-[300px] pointer-events-none group-hover:translate-x-10 group-hover:-translate-y-10 transition-transform duration-[5s] opacity-15 filter blur-2xl">
              <Ghost size={300} className="text-accent" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Controls — inside section at bottom-8 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-12 z-30">
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

      {/* ══════════════════════════════════════════════════
          2. LATEST SIGNALS — Contained in max-w-6xl
      ══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 w-full">
        <AnimatedSection className="mt-16">
          <AnimatedTitle>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl font-cinzel font-semibold font-black text-white uppercase tracking-tight flex items-center gap-4 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_12px_red]" />
                  Latest Signals
                </h2>
                <p className="text-xs font-black text-red-500 uppercase tracking-[0.5em]">Arsip, siaran &amp; temuan terbaru dari ekosistem Dreadnoute</p>
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
                  className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/[0.07] bg-zinc-950 transition-all duration-500 group-hover:border-red-500/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_12px_40px_rgba(120,0,0,0.2)] group-hover:-translate-y-2"
                >
                  <Image src={sig.image} alt={sig.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.55] group-hover:brightness-75" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={cn("text-[9px] font-black tracking-[0.3em] uppercase bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10", sig.color)}>
                      {sig.type}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-white text-base font-black uppercase tracking-tight line-clamp-2 mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{sig.title}</h3>
                    <p className="text-zinc-400 text-[11px] font-bold uppercase tracking-widest group-hover:text-zinc-200 transition-colors">{sig.meta}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-500 transition-all duration-500 group-hover:w-full shadow-[0_0_10px_red]" />
                </motion.div>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* ══════════════════════════════════════════════════
          3. FEATURED ENTITY — Full width, taller
      ══════════════════════════════════════════════════ */}
      <AnimatedSection className="mt-16">
        <section className="relative w-full min-h-[700px] overflow-hidden border-y border-white/[0.06] bg-[linear-gradient(135deg,rgba(20,2,2,0.7),rgba(3,3,8,0.98))]">
          {/* Atmospheric FX */}
          <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/20 blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-purple-900/10 blur-[160px] rounded-full pointer-events-none" />
          <motion.div
            className="absolute top-0 right-1/3 w-80 h-80 bg-red-600/[0.07] blur-[100px] rounded-full pointer-events-none"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* INNER max-w container for content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center py-24 lg:py-28">
            {/* Text side — 58% */}
            <div className="flex-1 space-y-8 lg:pr-8">
              <AnimatedTitle>
                <div className="space-y-5">
                  <motion.span
                    className="text-red-500 font-black uppercase tracking-[0.7em] text-[11px] flex items-center gap-4"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="h-px w-10 bg-red-500/60" /> Featured Entity
                  </motion.span>
                  <h2 className="text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-[0_0_60px_rgba(255,0,0,0.2)]">
                    Wewe<br />Gombel
                  </h2>
                  <p className="text-zinc-400 text-base lg:text-lg font-cinzel italic leading-relaxed max-w-xl">
                    &ldquo;Entitas pengasuh supranatural yang mendiami perbatasan antara perlindungan dan ancaman. Selama berabad-abad, ia menjadi penjaga moral masyarakat Jawa.&rdquo;
                  </p>
                </div>
              </AnimatedTitle>
              <div className="flex items-center gap-5">
                <Link href="/ghost-archive/wewe-gombel">
                  <button className="px-10 py-5 bg-accent text-white font-black uppercase tracking-[0.4em] text-[11px] rounded-2xl hover:bg-red-700 transition-all shadow-[0_10px_40px_rgba(255,0,0,0.3)] active:scale-95">Buka Arsip</button>
                </Link>
                <Link href="/ghost-archive">
                  <button className="px-10 py-5 bg-white/[0.03] border border-white/10 text-zinc-400 font-black uppercase tracking-[0.4em] text-[11px] rounded-2xl hover:bg-white/[0.07] hover:border-white/20 transition-all">Semua Entitas</button>
                </Link>
              </div>
            </div>

            {/* Ghost image — 45%, taller, with cinematic animation */}
            <motion.div
              className="relative w-full lg:w-[45%] aspect-[2/3] max-h-[620px] rounded-3xl overflow-hidden border border-white/[0.08] shadow-[0_40px_80px_rgba(0,0,0,0.9),0_0_60px_rgba(255,0,0,0.1)] shrink-0 mt-10 lg:mt-0"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* Slow breathe zoom */}
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src="/images/ghost-archive/WEWE GOMBEL/Wewe Gombel - hero.jpg" alt="Wewe Gombel" fill className="object-cover object-top" />
              </motion.div>
              {/* Slow vertical drift */}
              <motion.div
                className="absolute inset-0"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
              </motion.div>
              {/* Red vignette side */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-transparent pointer-events-none" />
              {/* Pulse glow overlay */}
              <motion.div
                className="absolute inset-0 bg-red-900/[0.07] pointer-events-none"
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* ══════════════════════════════════════════════════
          4. PORTAL MISTERI + KOLEKSI + FOOTER — Contained
      ══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 w-full">

        {/* Portal Misteri */}
        <AnimatedSection className="mt-[72px]">
          {/* Section Heading — centered, horror animated */}
          <div className="mb-16 text-center relative">
            {/* Atmospheric red mist behind heading */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-red-900/15 blur-[80px] rounded-full pointer-events-none"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.p
              className="text-[11px] font-black text-red-500 uppercase tracking-[0.8em] mb-4 flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="w-8 h-px bg-red-500/60 block"
                animate={{ scaleX: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_12px_red]" />
              Akses Portal Misteri
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_12px_red]" />
              <motion.span
                className="w-8 h-px bg-red-500/60 block"
                animate={{ scaleX: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
            </motion.p>
            <motion.h2
              className="text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <motion.span
                className="relative inline-block"
                animate={{ textShadow: ["0 0 0px rgba(255,0,0,0)", "0 0 30px rgba(255,0,0,0.3)", "0 0 0px rgba(255,0,0,0)"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Portal Misteri
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-sm text-zinc-500 font-medium mt-4 tracking-[0.3em] uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Gerbang Ekosistem Dreadnoute
            </motion.p>
            <motion.div
              className="mt-6 h-px mx-auto bg-gradient-to-r from-transparent via-red-500/40 to-transparent"
              style={{ width: '60%' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          {/* Feature Grid — image thumbnails 3 cols × 4 rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PORTAL_FEATURES.map((feat, idx) => (
              <motion.div
                key={feat.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link href={feat.href} className="group block">
                  <motion.div
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 cursor-pointer"
                    style={{ border: `1px solid rgba(255,255,255,0.06)` }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {/* Background image */}
                    <Image
                      src={feat.image}
                      alt={feat.name}
                      fill
                      className="object-cover brightness-[0.35] grayscale group-hover:brightness-[0.55] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />

                    {/* Dark overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

                    {/* Colored border glow on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ boxShadow: `inset 0 0 0 1.5px ${feat.borderColor}, 0 0 30px ${feat.glowColor}` }}
                    />

                    {/* Top: icon + type badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-black/60 backdrop-blur-md transition-all duration-300 group-hover:scale-110"
                        style={{ color: feat.iconColor }}
                      >
                        <feat.icon size={18} strokeWidth={1.8} />
                      </div>
                      {feat.tier === 1 && (
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10" style={{ color: feat.iconColor }}>
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Bottom: name + meta */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <h3
                        className="text-lg font-black uppercase tracking-tight text-white group-hover:text-white transition-all duration-300 leading-tight mb-1"
                        style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
                      >
                        {feat.name}
                      </h3>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">{feat.meta}</p>
                    </div>

                    {/* Bottom accent line (per-feature color) */}
                    <div
                      className="absolute bottom-0 left-0 h-[2.5px] w-0 group-hover:w-full transition-all duration-600 rounded-full"
                      style={{ background: `linear-gradient(to right, ${feat.iconColor}, ${feat.iconColor}80)`, boxShadow: `0 0 12px ${feat.iconColor}` }}
                    />

                    {/* Subtle color vignette bottom */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(to top, ${feat.glowColor}, transparent)` }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* G-COLLECTOR — Premium centered card */}
          <motion.div
            className="mt-5 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link href="/collector" className="group block w-full max-w-lg">
              <motion.div
                className="relative aspect-[16/7] rounded-3xl overflow-hidden bg-zinc-950 cursor-pointer"
                style={{ border: '1px solid rgba(197,160,89,0.2)', boxShadow: '0 0 40px rgba(197,160,89,0.08)' }}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <Image
                  src="/images/thumbnail-fitur-dashboard/G-collector.png"
                  alt="G-Collector"
                  fill
                  className="object-cover brightness-[0.4] group-hover:brightness-[0.6] transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />

                {/* Gold glow border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ boxShadow: 'inset 0 0 0 1.5px rgba(197,160,89,0.5), 0 0 50px rgba(197,160,89,0.15)' }}
                />

                {/* Pulsing gold atmosphere */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: [0.05, 0.15, 0.05] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ background: 'radial-gradient(ellipse at center, rgba(197,160,89,0.2) 0%, transparent 70%)' }}
                />

                <div className="absolute inset-0 flex items-center px-10 gap-6 z-10">
                  <div className="w-14 h-14 rounded-2xl bg-black/70 border border-gold/30 flex items-center justify-center text-gold shadow-[0_0_20px_rgba(197,160,89,0.2)] shrink-0 group-hover:border-gold/60 transition-all">
                    <Gem size={26} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gold uppercase tracking-[0.5em] mb-1 opacity-80">Premium Feature</p>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none mb-1">G-Collector</h3>
                    <p className="text-[12px] text-zinc-400 uppercase tracking-[0.15em]">Koleksi kartu — sistem progres eksklusif</p>
                  </div>
                  <div className="ml-auto flex items-center gap-3">
                    <span className="text-[9px] font-black text-gold/70 uppercase tracking-[0.4em] hidden lg:block">Buka Koleksi</span>
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-all">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-600" style={{ background: 'linear-gradient(to right, #c5a059, #c5a05980)', boxShadow: '0 0 12px rgba(197,160,89,0.6)' }} />
              </motion.div>
            </Link>
          </motion.div>
        </AnimatedSection>

        {/* ══════════════════════════════════════════════════
            5. KOLEKSI TERDETEKSI
        ══════════════════════════════════════════════════ */}
        <AnimatedSection className="mt-[72px]">
          <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.07] bg-[linear-gradient(145deg,rgba(10,6,3,0.95),rgba(0,0,0,1))] p-8 lg:p-12">
            {/* Gold atmosphere */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[rgba(197,160,89,0.06)] blur-[100px] -mr-20 -mt-20 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[rgba(197,160,89,0.1)] border border-[rgba(197,160,89,0.2)] flex items-center justify-center text-[#c5a059]">
                  <Trophy size={26} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-[#c5a059] uppercase tracking-[0.5em] mb-1">G-Collector Progression System</p>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Koleksi Terdeteksi</h3>
                </div>
              </div>
              <Link href="/collector">
                <button className="px-8 py-4 bg-[rgba(197,160,89,0.15)] border border-[rgba(197,160,89,0.3)] text-[#c5a059] font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl hover:bg-[rgba(197,160,89,0.25)] hover:border-[rgba(197,160,89,0.5)] transition-all shadow-[0_0_20px_rgba(197,160,89,0.1)]">
                  Buka Koleksi
                </button>
              </Link>
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Capture Progress</span>
                <span className="text-[11px] font-black text-[#c5a059]">24 / 86 Entitas</span>
              </div>
              <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#c5a059] to-[#8a744a] shadow-[0_0_10px_rgba(197,160,89,0.4)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: '27%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {[
                "/assets/images/G-COLLECTOR DASHBOARD.png",
                "/images/ghost-archive/WEWE_GOMBEL_V2/hero.png",
                "/assets/images/GHOST WIKI DASHBOARD.jpg",
                "/assets/images/KOMUNITAS BANNER DASHBOARD.jpg",
                "/assets/images/NOVEL DASHBOARD.png",
                "/assets/images/DIARY DASHBOARD.png",
              ].map((src, i) => (
                <div key={i} className="shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-white/[0.08] relative group/thumb hover:border-[rgba(197,160,89,0.4)] transition-all">
                  <Image src={src} alt="" fill className="object-cover brightness-75 grayscale group-hover/thumb:grayscale-0 group-hover/thumb:brightness-100 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {i === 0 && (
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#c5a059] shadow-[0_0_6px_rgba(197,160,89,0.8)]" />
                  )}
                </div>
              ))}
              <div className="shrink-0 w-20 h-20 rounded-xl border border-white/[0.05] bg-white/[0.02] flex items-center justify-center text-zinc-700 hover:text-zinc-400 transition-colors cursor-pointer">
                <span className="text-[10px] font-black uppercase tracking-wider">+62</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ══════════════════════════════════════════════════
            6. FOOTER
        ══════════════════════════════════════════════════ */}
        <footer className="mt-[100px] pt-16 w-full border-t border-white/[0.03] text-center flex flex-col items-center gap-8 pb-16">
          <AnimatedSection>
            <div className="space-y-4">
              <motion.h2
                className="font-horror tracking-[0.6em] text-2xl text-white/40 select-none"
                animate={{ opacity: [0.35, 0.5, 0.35] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                DREADNOUTE
              </motion.h2>
              <p className="text-zinc-600 text-[10px] font-medium tracking-[0.35em] uppercase max-w-md mx-auto italic leading-loose opacity-60">
                &ldquo;Beberapa pintu sebaiknya tidak pernah terbuka. Beberapa rahasia sebaiknya tidak pernah diceritakan.&rdquo;
              </p>
            </div>
          </AnimatedSection>
          <div className="flex gap-10 text-[9px] font-bold text-zinc-700 uppercase tracking-[0.3em]">
            <Link href="/term" className="hover:text-zinc-500 transition-colors duration-200">V.O.I.D Term</Link>
            <Link href="/privacy" className="hover:text-zinc-500 transition-colors duration-200">Transmission Privacy</Link>
            <Link href="/status" className="hover:text-zinc-500 transition-colors duration-200">Signal Status</Link>
          </div>
          <p className="text-[8px] font-medium text-zinc-800 uppercase tracking-[0.4em] opacity-60">© 2026 Dreadnoute Ecosystem · Built by Team</p>
        </footer>

      </div>

    </div>
  );
}
