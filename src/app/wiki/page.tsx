"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { GhostCard } from "@/components/GhostCard";
import {
  Search, Flame, Activity, MapPin, Skull, TrendingUp, Award,
  Star, Zap, Eye, Wind, ChevronDown, Ghost, Filter, Users,
  Radio, Clock, Crown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GHOST_ENTITIES } from "@/lib/ghostData";

/* ─── Live Activity Ticker ─────────────────────────── */
const LIVE_ACTIVITY = [
  "Shadow_Walker mengkoleksi Kuntilanak",
  "DarkArchivist_ID menambahkan Genderuwo",
  "VoidHunter99 mencapai Level 12",
  "MysticSeeker mengkoleksi Wewe Gombel",
  "NocturnalAgentX menemukan Nyi Blorong",
  "GhostDiver27 melengkapi Bio Dossier",
];

/* ─── Animated Counter ─────────────────────────────── */
function AnimatedCounter({ to, duration = 1.5 }: { to: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v).toLocaleString());

  useEffect(() => {
    const controls = animate(count, to, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [to]);

  return <motion.span>{rounded}</motion.span>;
}

/* ─── Constants ────────────────────────────────────── */
const CATEGORY_FILTERS = [
  { id: "all",       label: "Semua",         icon: Activity,   count: 4 },
  { id: "trending",  label: "Trending",      icon: TrendingUp, count: 2 },
  { id: "rare",      label: "Terlangka",     icon: Award,      count: 1 },
  { id: "hot",       label: "Banyak Dicari", icon: Flame,      count: 3 },
  { id: "exclusive", label: "Eksklusif",     icon: Crown,      count: 1 },
];

const ROLE_FILTERS = [
  { id: "all",         label: "All Role",    icon: Ghost,  activeClass: "bg-zinc-700 border-zinc-500 text-white" },
  { id: "Aggressor",   label: "Aggressor",   icon: Flame,  activeClass: "bg-red-600/80 border-red-500 text-white shadow-[0_6px_20px_rgba(255,0,0,0.4)]" },
  { id: "Watcher",     label: "Watcher",     icon: Eye,    activeClass: "bg-blue-600/80 border-blue-500 text-white shadow-[0_6px_20px_rgba(59,130,246,0.4)]" },
  { id: "Manipulator", label: "Manipulator", icon: Zap,    activeClass: "bg-purple-600/80 border-purple-500 text-white shadow-[0_6px_20px_rgba(147,51,234,0.4)]" },
  { id: "Passive",     label: "Passive",     icon: Wind,   activeClass: "bg-teal-600/80 border-teal-500 text-white shadow-[0_6px_20px_rgba(20,184,166,0.4)]" },
];

const LOCATIONS = [
  { id: "jawa-barat",     name: "Jawa Barat",     sub: ["Bandung", "Bogor", "Bekasi", "Depok", "Cirebon"] },
  { id: "jawa-tengah",    name: "Jawa Tengah",    sub: ["Semarang", "Solo", "Yogyakarta", "Magelang"] },
  { id: "jawa-timur",     name: "Jawa Timur",     sub: ["Surabaya", "Malang", "Sidoarjo", "Banyuwangi"] },
  { id: "jakarta",        name: "Jakarta",        sub: ["Jak. Utara", "Jak. Selatan", "Jak. Pusat", "Jak. Barat", "Jak. Timur"] },
  { id: "bali",           name: "Bali",           sub: ["Denpasar", "Badung", "Ubud", "Kuta"] },
  { id: "sumatera",       name: "Sumatera",       sub: ["Medan", "Palembang", "Padang", "Pekanbaru"] },
  { id: "pantai-selatan", name: "Pantai Selatan", sub: ["Parangtritis", "Palabuhanratu"] },
  { id: "urban",          name: "Urban",          sub: ["Rumah Sakit", "Sekolah", "Pabrik", "Gedung Tua"] },
];

/* ─── ARCHIVE letters animation ───────────────────── */
const ARCHIVE_CHARS = "ARCHIVE".split("");

/* ─── Page ─────────────────────────────────────────── */
export default function WikiPage() {
  const [searchQuery,    setSearchQuery]    = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeRole,     setActiveRole]     = useState("all");
  const [activeLoc,      setActiveLoc]      = useState("");
  const [openRegion,     setOpenRegion]     = useState<string | null>(null);
  const [searchFocused,  setSearchFocused]  = useState(false);
  const [tickerIdx,      setTickerIdx]      = useState(0);
  const [mounted,        setMounted]        = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setTickerIdx(p => (p + 1) % LIVE_ACTIVITY.length), 3000);
    return () => clearInterval(t);
  }, []);

  const filteredEntities = GHOST_ENTITIES.filter(ghost => {
    if (!ghost) return false;
    const matchesSearch   = (ghost.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    const ghostRarity     = (ghost.rarity || "").toLowerCase();
    const matchesCategory = activeCategory === "all" || ghostRarity === activeCategory.toLowerCase() || activeCategory === "trending";
    const matchesRole     = activeRole === "all" || ghost.role === activeRole;
    const matchesLoc      = !activeLoc || ghost.location === activeLoc || activeLoc.includes(ghost.location || "");
    return matchesSearch && matchesCategory && matchesRole && matchesLoc;
  });

  const toggleRegion = (id: string) => setOpenRegion(prev => prev === id ? null : id);

  return (
    <div className="min-h-screen pt-10 pb-40 px-4 sm:px-8 w-full font-cinzel overflow-x-hidden bg-[#020202]">
      <div className="max-w-7xl mx-auto">

        {/* ════════════════ HEADER ════════════════ */}
        <header className="mb-14 pt-10">

          {/* Title LEFT · Social Proof RIGHT */}
          <div className="flex flex-col xl:flex-row xl:items-start gap-10 mb-14">

            {/* ── LEFT: Title ── */}
            <div className="flex-1 space-y-5 min-w-0">
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-4">
                <div className="p-2.5 bg-red-950/30 rounded-xl border border-red-900/40">
                  <Skull size={16} className="text-accent" />
                </div>
                <span className="text-[10px] font-black text-accent uppercase tracking-[1em]">WIKI GHOST</span>
              </motion.div>

              {/* GHOST + ARCHIVE with per-letter animation */}
              <motion.h1
                initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-[55px] md:text-[75px] lg:text-[90px] font-black text-white uppercase tracking-tighter leading-none select-none"
              >
                GHOST{" "}
                <span className="text-accent">
                  {ARCHIVE_CHARS.map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.35 + i * 0.07, duration: 0.45, ease: "easeOut" }}
                      whileHover={{
                        y: -10,
                        scale: 1.2,
                        filter: "drop-shadow(0 0 20px rgba(255,0,0,1))",
                        transition: { duration: 0.12 }
                      }}
                      className="inline-block cursor-default"
                      style={{ textShadow: "0 0 30px rgba(255,0,0,0.4)" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>

              <motion.p
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-zinc-400 font-bold text-base md:text-lg max-w-xl italic opacity-70 leading-relaxed tracking-wide"
              >
                Katalogisasi entitas anomali lintas dimensi yang telah terverifikasi oleh para penjaga arsip terdahulu.
              </motion.p>
            </div>

            {/* ── RIGHT: Social Proof (alive) ── */}
            <motion.div
              initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="bg-[#080808]/90 backdrop-blur-3xl p-7 rounded-[2.5rem] border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.9)] relative overflow-hidden w-full xl:w-[360px] flex-shrink-0"
            >
              {/* Ambient pulse */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 blur-[80px] rounded-full animate-pulse" />

              <div className="relative z-10 space-y-5">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-accent uppercase tracking-[0.5em]">Active Registry</span>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-full">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
                    <span className="text-[9px] font-black text-accent tracking-widest">LIVE</span>
                  </div>
                </div>

                {/* Avatars + counter */}
                <div className="flex items-center gap-5">
                  <div className="flex -space-x-4 flex-shrink-0">
                    {[1, 2, 3, 4].map(i => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="w-12 h-12 rounded-full border-4 border-[#080808] bg-zinc-900 overflow-hidden hover:scale-110 hover:z-20 transition-all shadow-xl"
                      >
                        <Image src={`https://i.pravatar.cc/150?img=${i + 25}`} alt="User"
                          width={48} height={48}
                          className="grayscale hover:grayscale-0 transition-all w-full h-full object-cover" />
                      </motion.div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-4 border-[#080808] bg-accent flex items-center justify-center text-white text-[10px] font-black z-10 shadow-[0_0_25px_rgba(255,0,0,0.5)]">
                      +12K
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-white uppercase tracking-wider">
                      {mounted && <AnimatedCounter to={12847} />}
                    </p>
                    <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">Verified Archivists</p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
                  <div className="text-center">
                    <p className="text-lg font-black text-white">{mounted && <AnimatedCounter to={GHOST_ENTITIES.length} />}</p>
                    <p className="text-[8px] text-zinc-600 uppercase tracking-widest mt-0.5">Entities</p>
                  </div>
                  <div className="text-center border-x border-white/5">
                    <p className="text-lg font-black text-accent">{mounted && <AnimatedCounter to={2} />}</p>
                    <p className="text-[8px] text-zinc-600 uppercase tracking-widest mt-0.5">Rare+</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-black text-yellow-400">{mounted && <AnimatedCounter to={1} />}</p>
                    <p className="text-[8px] text-zinc-600 uppercase tracking-widest mt-0.5">Legendary</p>
                  </div>
                </div>

                {/* Live activity ticker */}
                <div className="flex items-center gap-3 bg-black/40 rounded-xl px-4 py-2.5 border border-white/5 overflow-hidden">
                  <Radio size={10} className="text-accent animate-pulse flex-shrink-0" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={tickerIdx}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest truncate"
                    >
                      {LIVE_ACTIVITY[tickerIdx]}
                    </motion.span>
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          </div>

          {/* ════════════════ FILTER PANEL ════════════════ */}
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#080808]/70 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-6 space-y-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            {/* ── Search ── */}
            <div className="relative group">
              <div className={cn("absolute inset-0 bg-accent/15 blur-[60px] rounded-full opacity-0 transition-opacity duration-700", searchFocused && "opacity-100")} />
              <div className={cn(
                "relative flex items-center bg-black/60 border rounded-2xl p-2 transition-all duration-500",
                searchFocused ? "border-accent/50 shadow-[0_0_40px_rgba(255,0,0,0.2)]" : "border-white/5 hover:border-white/10",
              )}>
                <div className="pl-4 pr-3">
                  <Search size={18} className={cn("transition-all duration-300", searchFocused ? "text-accent" : "text-zinc-600")} />
                </div>
                <input
                  type="text" placeholder="CARILAH ENTITAS..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
                  className="flex-1 bg-transparent border-none py-3.5 text-[13px] text-white focus:outline-none placeholder:text-zinc-800 font-black tracking-[0.3em] uppercase"
                />
                {searchQuery && <button onClick={() => setSearchQuery("")} className="text-zinc-600 hover:text-white pr-3 transition-colors">✕</button>}
                <button className="px-6 py-3 bg-accent/10 hover:bg-accent border border-accent/30 hover:border-accent text-accent hover:text-white font-black uppercase tracking-[0.5em] text-[9px] rounded-xl mr-1 transition-all duration-300">
                  LOCATE
                </button>
              </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* ── Category (redesigned) ── */}
            <div className="space-y-3">
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.6em] flex items-center gap-2">
                <Filter size={10} /> Kategori
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_FILTERS.map(f => (
                  <button
                    key={f.id} onClick={() => setActiveCategory(f.id)}
                    className={cn(
                      "relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 overflow-hidden",
                      activeCategory === f.id
                        ? "bg-accent border-accent text-white shadow-[0_0_25px_rgba(255,0,0,0.3)]"
                        : "bg-white/[0.02] border-white/5 text-zinc-500 hover:text-white hover:border-white/15 hover:bg-white/[0.05]",
                    )}
                  >
                    {activeCategory === f.id && (
                      <motion.div layoutId="cat-glow"
                        className="absolute inset-0 bg-accent/20 blur-md" />
                    )}
                    <f.icon size={13} className={cn("relative z-10", activeCategory === f.id && "animate-pulse")} />
                    <span className="relative z-10">{f.label}</span>
                    <span className={cn(
                      "relative z-10 text-[8px] px-1.5 py-0.5 rounded-full font-black",
                      activeCategory === f.id ? "bg-white/20 text-white" : "bg-white/5 text-zinc-600",
                    )}>{f.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Role ── */}
            <div className="space-y-3">
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.6em] flex items-center gap-2">
                <Ghost size={10} /> Role
              </p>
              <div className="flex flex-wrap gap-2">
                {ROLE_FILTERS.map(r => (
                  <button key={r.id} onClick={() => setActiveRole(r.id)}
                    className={cn(
                      "flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300",
                      activeRole === r.id ? r.activeClass : "bg-white/[0.02] border-white/5 text-zinc-500 hover:text-white hover:border-white/15 hover:bg-white/[0.05]",
                    )}>
                    <r.icon size={13} />{r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Region — horizontal with sub-dropdown ── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.6em] flex items-center gap-2">
                  <MapPin size={10} /> Wilayah
                </p>
                {activeLoc && (
                  <button onClick={() => { setActiveLoc(""); setOpenRegion(null); }}
                    className="text-[9px] text-zinc-500 hover:text-accent transition-colors uppercase tracking-widest">
                    Reset
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button onClick={() => { setActiveLoc(""); setOpenRegion(null); }}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                    !activeLoc ? "bg-white/10 border-white/20 text-white" : "bg-white/[0.02] border-white/5 text-zinc-500 hover:text-white hover:bg-white/[0.05]",
                  )}>
                  <Activity size={11} /> Global
                </button>
                {LOCATIONS.map(loc => {
                  const isOpen   = openRegion === loc.id;
                  const isActive = activeLoc.startsWith(loc.name);
                  return (
                    <button key={loc.id} onClick={() => toggleRegion(loc.id)}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                        isOpen || isActive
                          ? "bg-accent/10 border-accent/40 text-accent"
                          : "bg-white/[0.02] border-white/5 text-zinc-500 hover:text-white hover:bg-white/[0.05]",
                      )}>
                      <MapPin size={11} />
                      {loc.name}
                      <ChevronDown size={11} className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {openRegion && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="flex flex-wrap gap-2 pt-2 pl-4 border-l-2 border-accent/30">
                      {LOCATIONS.find(l => l.id === openRegion)?.sub.map(sub => {
                        const locName = LOCATIONS.find(l => l.id === openRegion)?.name ?? "";
                        const fullLoc = `${locName} - ${sub}`;
                        return (
                          <button key={sub} onClick={() => { setActiveLoc(fullLoc); setOpenRegion(null); }}
                            className={cn(
                              "px-4 py-2 rounded-lg border text-[9px] font-bold uppercase tracking-widest transition-all duration-200",
                              activeLoc === fullLoc
                                ? "bg-accent text-white border-accent"
                                : "bg-black/50 border-white/5 text-zinc-400 hover:text-white hover:border-accent/30 hover:bg-accent/5",
                            )}>
                            {sub}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </header>

        {/* ════════════════ GHOST GRID ════════════════ */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredEntities.length > 0 ? (
              filteredEntities.map((ghost, i) => (
                <motion.div key={ghost.id} layout
                  initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.4 }}>
                  <Link href={`/wiki/${ghost.id}`} className="block cursor-pointer">
                    <GhostCard
                      id={ghost.id} name={ghost.name} rarity={ghost.rarity}
                      role={ghost.role} price={ghost.price}
                      image_url={ghost.image} danger_lvl={ghost.danger} index={i}
                    />
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-60 flex flex-col items-center justify-center text-center opacity-30">
                <Skull size={80} className="mb-10 text-accent/20" />
                <h3 className="text-3xl font-black uppercase tracking-[0.5em] text-white/50">Signal Lost</h3>
                <p className="mt-4 text-sm tracking-[0.3em] uppercase text-zinc-700">No entities detected in this spectral frequency.</p>
              </div>
            )}
          </AnimatePresence>
        </section>

      </div>
    </div>
  );
}
