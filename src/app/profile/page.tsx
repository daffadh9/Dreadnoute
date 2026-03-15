"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera, Wand2, Upload, Lock, Unlock, Edit3, Save, X,
  Users, Ghost, Trophy, Star, MapPin, Briefcase, Heart,
  Eye, EyeOff, Clock, Shield, Zap, Flame, Wind, Crown,
  ChevronRight, Image as ImageIcon, Plus, Check, AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { GHOST_ENTITIES } from "@/lib/ghostData";

/* ─── V.O.I.D. concept ──────────────────────────────────────────
   V.O.I.D. = Vanguard of Occult Investigation & Documentation
   "Kehampaan adalah awal dari setiap penyelidikan. Dari kegelapan,
   kebenaran menunjukkan dirinya."
──────────────────────────────────────────────────────────────── */

const LEVEL_COLORS: Record<string, { border: string; glow: string; text: string; label: string }> = {
  "1-5":   { border: "border-zinc-500",   glow: "shadow-[0_0_20px_rgba(113,113,122,0.5)]",  text: "text-zinc-400",   label: "Novice" },
  "6-10":  { border: "border-green-500",  glow: "shadow-[0_0_25px_rgba(34,197,94,0.5)]",   text: "text-green-400",  label: "Seeker" },
  "11-15": { border: "border-blue-500",   glow: "shadow-[0_0_30px_rgba(59,130,246,0.6)]",  text: "text-blue-400",   label: "Analyst" },
  "16-20": { border: "border-red-500",    glow: "shadow-[0_0_40px_rgba(255,0,0,0.6)]",     text: "text-red-400",    label: "Veteran" },
  "21-30": { border: "border-yellow-400", glow: "shadow-[0_0_50px_rgba(234,179,8,0.7)]",   text: "text-yellow-400", label: "Master" },
  "31+":   { border: "border-purple-400", glow: "shadow-[0_0_60px_rgba(147,51,234,0.8)]",  text: "text-purple-400", label: "Archivist" },
};

const ACHIEVEMENTS = [
  { id: "first_entity",   label: "First Contact",    icon: Ghost,   color: "text-zinc-400",   desc: "Koleksi entitas pertama" },
  { id: "lore_hunter",    label: "Lore Hunter",      icon: Eye,     color: "text-blue-400",   desc: "Baca 10 berkas lore" },
  { id: "entity_tamer",   label: "Entity Tamer",     icon: Flame,   color: "text-red-400",    desc: "Koleksi 5 entitas" },
  { id: "rare_collector", label: "Rare Collector",   icon: Star,    color: "text-green-400",  desc: "Miliki 1 entitas Rare+" },
  { id: "void_veteran",   label: "V.O.I.D. Veteran", icon: Shield,  color: "text-purple-400", desc: "Aktif 30 hari" },
  { id: "legend_seeker",  label: "Legend Seeker",    icon: Crown,   color: "text-yellow-400", desc: "Temukan entitas Legendary" },
];

const INTERESTS = ["Urban Exploration","Paranormal","Folklore","Dark History","Cryptids","Occult","Horror Games","Ghost Photography"];
const HOBBIES   = ["Collecting Entities","Lore Research","Field Investigation","Archive Writing"];

function getLevelConfig(level: number) {
  if (level <= 5)  return LEVEL_COLORS["1-5"];
  if (level <= 10) return LEVEL_COLORS["6-10"];
  if (level <= 15) return LEVEL_COLORS["11-15"];
  if (level <= 20) return LEVEL_COLORS["16-20"];
  if (level <= 30) return LEVEL_COLORS["21-30"];
  return LEVEL_COLORS["31+"];
}

function AIGenerateButton({
  label, storageKey, onGenerate
}: { label: string; storageKey: string; onGenerate: (prompt: string) => void }) {
  const [cooldown, setCooldown] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem(storageKey);
    if (last) {
      const diff = Date.now() - parseInt(last);
      const days = Math.ceil((7 * 86400000 - diff) / 86400000);
      if (days > 0) setCooldown(days);
    }
  }, [storageKey]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    await onGenerate(prompt);
    localStorage.setItem(storageKey, Date.now().toString());
    setCooldown(7);
    setGenerating(false);
    setShowModal(false);
    setPrompt("");
  };

  if (cooldown && cooldown > 0) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-black/60 border border-white/5 rounded-xl text-[9px] font-black text-zinc-500 uppercase tracking-widest">
        <Clock size={11} className="text-zinc-600" />
        Cooldown: {cooldown}h tersisa
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 text-purple-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-purple-600/30 transition-all"
      >
        <Wand2 size={12} /> Generate AI
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-[#0a0a0a] border border-purple-500/30 rounded-3xl p-8 w-full max-w-md shadow-[0_40px_100px_rgba(147,51,234,0.3)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[9px] font-black text-purple-400 uppercase tracking-[0.6em] mb-1">Gemini AI Generator</p>
                  <h3 className="text-xl font-black text-white uppercase">Generate {label}</h3>
                </div>
                <button onClick={() => setShowModal(false)} className="text-zinc-600 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Deskripsikan visual yang kamu inginkan:</p>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Contoh: Dark atmospheric horror portrait, mysterious archivist in shadows, red glowing eyes..."
                className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-[12px] text-white placeholder:text-zinc-700 focus:outline-none focus:border-purple-500/50 resize-none h-28 tracking-wide"
              />
              <p className="text-[9px] text-zinc-700 mt-2 mb-6">⚠ Fitur AI dapat digunakan 1x per minggu. Sisa: 7 hari.</p>
              <div className="flex gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || generating}
                  className="flex-1 py-3.5 bg-purple-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-black uppercase tracking-[0.4em] text-[10px] rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  {generating ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</> : <><Wand2 size={14} /> Generate</>}
                </button>
                <button onClick={() => setShowModal(false)}
                  className="px-5 py-3.5 bg-white/5 border border-white/10 text-zinc-400 font-black uppercase tracking-wider text-[10px] rounded-xl hover:bg-white/10 transition-all">
                  Batal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Main Page ────────────────────────────────────────────── */
export default function ProfilePage() {
  const LEVEL = 18;
  const levelCfg = getLevelConfig(LEVEL);

  const [editMode,        setEditMode]        = useState(false);
  const [bio,             setBio]             = useState("Penyelidik anomali dari dimensi fana. Saya mengumpulkan jejak entitas yang telah terlupakan dan mendokumentasikan keberadaan mereka untuk generasi berikutnya.");
  const [alias,           setAlias]           = useState("DarkArchivist_ID");
  const [country,         setCountry]         = useState("Indonesia 🇮🇩");
  const [occupation,      setOccupation]      = useState("Paranormal Researcher");
  const [age,             setAge]             = useState("24");
  const [status,          setStatus]          = useState("Online");
  const [isAgePublic,     setIsAgePublic]     = useState(false);
  const [isOccupPublic,   setIsOccupPublic]   = useState(true);
  const [isStatusPublic,  setIsStatusPublic]  = useState(true);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Paranormal","Folklore","Horror Games"]);
  const [selectedHobbies, setSelectedHobbies]     = useState<string[]>(["Collecting Entities","Lore Research"]);
  const [coverUrl,        setCoverUrl]        = useState("/assets/images/GHOST WIKI DASHBOARD.jpg");
  const [avatarUrl,       setAvatarUrl]       = useState("/assets/images/profile.jpg");
  const [saving,          setSaving]          = useState(false);
  const [saved,           setSaved]           = useState(false);

  const coverInputRef  = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const favoriteEntities = GHOST_ENTITIES.slice(1, 4);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").upsert({
          id: user.id, alias, bio, country, occupation,
          age: parseInt(age), status,
          is_age_public: isAgePublic,
          is_occupation_public: isOccupPublic,
          is_status_public: isStatusPublic,
          updated_at: new Date().toISOString(),
        });
      }
    } catch (e) { /* Supabase not connected: save locally */ }
    setSaving(false);
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleFileUpload = (type: "cover" | "avatar", file: File) => {
    const url = URL.createObjectURL(file);
    if (type === "cover")  setCoverUrl(url);
    if (type === "avatar") setAvatarUrl(url);
  };

  const toggleInterest = (item: string) =>
    setSelectedInterests(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);
  const toggleHobby = (item: string) =>
    setSelectedHobbies(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);

  const VISITOR_LOG = [
    { name: "Shadow_Walker",   time: "2 menit lalu",  avatar: "https://i.pravatar.cc/40?img=10" },
    { name: "VoidHunter99",    time: "15 menit lalu", avatar: "https://i.pravatar.cc/40?img=11" },
    { name: "NocturnalAgentX", time: "1 jam lalu",    avatar: "https://i.pravatar.cc/40?img=12" },
    { name: "GhostDiver27",    time: "3 jam lalu",    avatar: "https://i.pravatar.cc/40?img=13" },
    { name: "MysticSeeker",    time: "kemarin",       avatar: "https://i.pravatar.cc/40?img=14" },
  ];

  return (
    <div className="min-h-screen bg-[#020202] font-cinzel pb-40 overflow-x-hidden">

      {/* ════════ COVER ════════ */}
      <div className="relative w-full h-[320px] md:h-[380px] overflow-hidden">
        <Image src={coverUrl} alt="Cover" fill className="object-cover brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202]/40 to-transparent" />

        {/* Cover edit controls */}
        <div className="absolute top-6 right-6 flex gap-2 z-20">
          <input ref={coverInputRef} type="file" accept="image/*" className="hidden"
            onChange={e => e.target.files?.[0] && handleFileUpload("cover", e.target.files[0])} />
          <button onClick={() => coverInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-black/70 border border-white/10 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-white/30 transition-all backdrop-blur-xl">
            <Upload size={11} /> Upload
          </button>
          <AIGenerateButton label="Cover" storageKey="ai_cover_last_update"
            onGenerate={(prompt) => console.log("Generate cover:", prompt)} />
        </div>

        {/* V.O.I.D. label top-left */}
        <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
          <div className="w-8 h-8 relative">
            <Image src="/assets/images/LOGO ID CARD VOID.png" alt="V.O.I.D." fill className="object-contain" onError={() => {}} />
          </div>
          <div>
            <p className="text-[8px] font-black text-accent uppercase tracking-[0.8em]">V.O.I.D.</p>
            <p className="text-[7px] font-bold text-zinc-500 uppercase tracking-widest">Vanguard of Occult Investigation</p>
          </div>
        </div>
      </div>

      {/* ════════ IDENTITY SECTION ════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── Avatar + V.O.I.D. Frame ── */}
          <div className="relative flex-shrink-0">
            <div className={cn(
              "relative w-36 h-36 md:w-44 md:h-44 rounded-2xl border-4 overflow-hidden transition-all duration-500",
              levelCfg.border, levelCfg.glow,
            )}>
              <Image src={avatarUrl} alt="Avatar" fill
                className="object-cover brightness-110 contrast-105"
                onError={(e: any) => { e.target.src = "https://ui-avatars.com/api/?name=DA&background=8b0000&color=fff"; }} />

              {/* Scan line overlay (V.O.I.D. frame effect) */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(255,0,0,0.03)_4px)] pointer-events-none" />

              {/* Corner decorations */}
              <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-accent/60 rounded-tl" />
              <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-accent/60 rounded-tr" />
              <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-accent/60 rounded-bl" />
              <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-accent/60 rounded-br" />
            </div>

            {/* Status dot */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#020202] rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399] animate-pulse" />
            </div>

            {/* Avatar edit */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 mt-2">
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden"
                onChange={e => e.target.files?.[0] && handleFileUpload("avatar", e.target.files[0])} />
              <button onClick={() => avatarInputRef.current?.click()}
                className="p-1.5 bg-[#0a0a0a] border border-white/10 rounded-lg hover:border-white/30 transition-all">
                <Camera size={11} className="text-zinc-400" />
              </button>
              <AIGenerateButton label="Avatar" storageKey="ai_avatar_last_update"
                onGenerate={(prompt) => console.log("Generate avatar:", prompt)} />
            </div>
          </div>

          {/* ── Identity Info ── */}
          <div className="flex-1 pt-4 lg:pt-10 space-y-3">
            {/* Name row */}
            <div className="flex items-center gap-4 flex-wrap">
              {editMode
                ? <input value={alias} onChange={e => setAlias(e.target.value)}
                    className="bg-transparent border-b border-accent/50 text-3xl font-black text-white focus:outline-none tracking-widest uppercase" />
                : <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest ghost-glow">{alias}</h1>
              }

              {/* Level badge */}
              <div className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest",
                levelCfg.border, levelCfg.text, "bg-black/50",
              )}>
                <Crown size={12} />
                Lv.{LEVEL} · {levelCfg.label}
              </div>

              {/* V.O.I.D. ID */}
              <div className="flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/30 rounded-full">
                <Shield size={10} className="text-accent" />
                <span className="text-[9px] font-black text-accent tracking-widest uppercase">V.O.I.D.-#0042</span>
              </div>
            </div>

            {/* Country */}
            <div className="flex items-center gap-2 text-zinc-400">
              <MapPin size={13} className="text-accent" />
              {editMode
                ? <input value={country} onChange={e => setCountry(e.target.value)}
                    className="bg-transparent border-b border-white/20 text-[13px] focus:outline-none text-white" />
                : <span className="text-[13px] font-bold tracking-wider">{country}</span>
              }
            </div>

            {/* Bio */}
            <div className="relative max-w-2xl">
              {editMode ? (
                <div>
                  <textarea value={bio} onChange={e => setBio(e.target.value.slice(0, 500))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-[13px] text-zinc-300 focus:outline-none focus:border-accent/40 resize-none h-24 tracking-wide italic"
                    placeholder="Bio deskripsi (max 500 karakter)..." />
                  <span className={cn("text-[9px] absolute bottom-3 right-3", bio.length > 480 ? "text-accent" : "text-zinc-600")}>
                    {bio.length}/500
                  </span>
                </div>
              ) : (
                <p className="text-zinc-400 text-sm italic leading-relaxed tracking-wide opacity-80">{bio}</p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              {editMode ? (
                <>
                  <button onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all">
                    {saving ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={13} />}
                    {saving ? "Saving..." : "Simpan"}
                  </button>
                  <button onClick={() => setEditMode(false)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 text-zinc-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                    <X size={13} /> Batal
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 text-zinc-300 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-accent/40 hover:text-white transition-all">
                    <Edit3 size={13} /> Edit Dossier
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-accent/10 border border-accent/30 text-accent rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all">
                    <Users size={13} /> 284 Fans
                  </button>
                </>
              )}
              {saved && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                  <Check size={13} /> Tersimpan
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: "Fans",             value: "284",   icon: Heart,   color: "text-red-400",    glow: "shadow-[0_0_20px_rgba(255,0,0,0.15)]" },
            { label: "Entitas Koleksi",  value: "12",    icon: Ghost,   color: "text-blue-400",   glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]" },
            { label: "Achievement",      value: "6/6",   icon: Trophy,  color: "text-yellow-400", glow: "shadow-[0_0_20px_rgba(234,179,8,0.15)]" },
            { label: "Archivist Level",  value: `${LEVEL}`, icon: Crown, color: levelCfg.text,   glow: "" },
          ].map(stat => (
            <motion.div key={stat.label}
              whileHover={{ scale: 1.02 }}
              className={cn("bg-[#080808]/80 border border-white/5 rounded-2xl p-5 text-center", stat.glow)}>
              <stat.icon size={22} className={cn("mx-auto mb-3", stat.color)} />
              <p className={cn("text-2xl font-black", stat.color)}>{stat.value}</p>
              <p className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ════════ MAIN CONTENT GRID ════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">

          {/* ── LEFT 2/3 ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Ghost Favorites */}
            <div className="bg-[#080808]/60 border border-white/5 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[11px] font-black text-white uppercase tracking-[0.5em] flex items-center gap-3">
                  <Ghost size={16} className="text-accent" /> Ghost Favorit
                </h2>
                <Link href="/wiki" className="text-[9px] text-zinc-500 hover:text-accent uppercase tracking-widest flex items-center gap-1 transition-colors">
                  Lihat Semua <ChevronRight size={11} />
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {favoriteEntities.map(ghost => (
                  <Link key={ghost.id} href={`/wiki/${ghost.id}`}>
                    <motion.div whileHover={{ scale: 1.03, y: -4 }}
                      className="relative h-44 rounded-2xl overflow-hidden border border-white/5 group cursor-pointer">
                      <Image src={ghost.image} alt={ghost.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-[11px] font-black text-white uppercase tracking-wider leading-tight">{ghost.name}</p>
                        <p className="text-[8px] text-accent uppercase tracking-widest mt-0.5">{ghost.rarity}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-[#080808]/60 border border-white/5 rounded-3xl p-6">
              <h2 className="text-[11px] font-black text-white uppercase tracking-[0.5em] mb-6 flex items-center gap-3">
                <Trophy size={16} className="text-yellow-400" /> Achievements
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {ACHIEVEMENTS.map((ach, i) => (
                  <motion.div key={ach.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ scale: 1.04 }}
                    className="bg-black/40 border border-white/5 rounded-2xl p-4 text-center group hover:border-white/15 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-black/60 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <ach.icon size={20} className={ach.color} />
                    </div>
                    <p className="text-[10px] font-black text-white uppercase tracking-wider leading-tight">{ach.label}</p>
                    <p className="text-[8px] text-zinc-600 mt-1 tracking-widest">{ach.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interests & Hobbies */}
            <div className="bg-[#080808]/60 border border-white/5 rounded-3xl p-6">
              <h2 className="text-[11px] font-black text-white uppercase tracking-[0.5em] mb-6 flex items-center gap-3">
                <Star size={16} className="text-gold" /> Minat & Hobi
              </h2>
              <div className="space-y-5">
                <div>
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-3">Minat</p>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map(item => (
                      <button key={item} onClick={() => editMode && toggleInterest(item)}
                        className={cn(
                          "px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-wider transition-all",
                          selectedInterests.includes(item)
                            ? "bg-accent/15 border-accent/40 text-accent"
                            : "bg-white/[0.02] border-white/5 text-zinc-600 hover:text-zinc-400",
                          editMode && "cursor-pointer hover:border-white/20",
                        )}>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-3">Hobi</p>
                  <div className="flex flex-wrap gap-2">
                    {HOBBIES.map(item => (
                      <button key={item} onClick={() => editMode && toggleHobby(item)}
                        className={cn(
                          "px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-wider transition-all",
                          selectedHobbies.includes(item)
                            ? "bg-blue-500/15 border-blue-500/40 text-blue-400"
                            : "bg-white/[0.02] border-white/5 text-zinc-600 hover:text-zinc-400",
                          editMode && "cursor-pointer",
                        )}>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT 1/3 ── */}
          <div className="space-y-6">

            {/* V.O.I.D. ID Card */}
            <div className={cn(
              "bg-[#080808]/80 border-2 rounded-3xl p-6 relative overflow-hidden",
              levelCfg.border, levelCfg.glow,
            )}>
              {/* Scan lines */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,rgba(255,255,255,0.01)_5px)] pointer-events-none" />
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 blur-3xl rounded-full pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 relative">
                      <Image src="/assets/images/LOGO ID CARD VOID.png" alt="VOID" fill className="object-contain" onError={() => {}} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-accent uppercase tracking-[0.6em]">V.O.I.D.</p>
                      <p className="text-[6px] font-bold text-zinc-600 uppercase tracking-wider">Digital ID</p>
                    </div>
                  </div>
                  <div className={cn("px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest", levelCfg.border, levelCfg.text, "bg-black/40")}>
                    {levelCfg.label}
                  </div>
                </div>

                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/10 mx-auto">
                  <Image src={avatarUrl} alt="Avatar" width={56} height={56} className="object-cover w-full h-full brightness-110" />
                </div>

                <div className="text-center">
                  <p className="text-[13px] font-black text-white uppercase tracking-widest">{alias}</p>
                  <p className="text-[9px] text-accent uppercase tracking-widest mt-1">V.O.I.D.-#0042</p>
                  <p className={cn("text-[9px] font-black mt-0.5", levelCfg.text)}>Level {LEVEL} · {levelCfg.label}</p>
                </div>

                <div className="h-px bg-white/5" />
                <div className="flex justify-between text-center">
                  <div><p className="text-sm font-black text-white">12</p><p className="text-[7px] text-zinc-600 uppercase tracking-widest">Entities</p></div>
                  <div><p className="text-sm font-black text-white">284</p><p className="text-[7px] text-zinc-600 uppercase tracking-widest">Fans</p></div>
                  <div><p className="text-sm font-black text-white">6</p><p className="text-[7px] text-zinc-600 uppercase tracking-widest">Badges</p></div>
                </div>
                <p className="text-[7px] text-zinc-700 text-center uppercase tracking-widest border-t border-white/5 pt-3">
                  Issued by V.O.I.D. Registry · 2025
                </p>
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-[#080808]/60 border border-white/5 rounded-3xl p-6 space-y-4">
              <h2 className="text-[11px] font-black text-white uppercase tracking-[0.5em] flex items-center gap-3">
                <Shield size={14} className="text-accent" /> Data Personel
              </h2>

              {[
                {
                  label: "Pekerjaan", value: occupation, isPublic: isOccupPublic,
                  onToggle: () => setIsOccupPublic(p => !p),
                  onChange: (v: string) => setOccupation(v), icon: Briefcase,
                },
                {
                  label: "Status", value: status, isPublic: isStatusPublic,
                  onToggle: () => setIsStatusPublic(p => !p),
                  onChange: (v: string) => setStatus(v), icon: Zap,
                },
                {
                  label: "Umur", value: age, isPublic: isAgePublic,
                  onToggle: () => setIsAgePublic(p => !p),
                  onChange: (v: string) => setAge(v), icon: Clock,
                },
              ].map(field => (
                <div key={field.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-black/60 flex items-center justify-center flex-shrink-0">
                    <field.icon size={14} className="text-accent/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{field.label}</p>
                    {editMode
                      ? <input value={field.value} onChange={e => field.onChange(e.target.value)}
                          className="bg-transparent border-b border-white/10 text-[12px] text-white focus:outline-none focus:border-accent/40 w-full mt-0.5" />
                      : <p className={cn("text-[12px] font-bold tracking-wide mt-0.5", !field.isPublic && "blur-sm select-none")}>
                          {field.isPublic ? field.value : "••••••"}
                        </p>
                    }
                  </div>
                  {editMode && (
                    <button onClick={field.onToggle}
                      className={cn("p-1.5 rounded-lg border transition-all", field.isPublic ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-white/5 border-white/10 text-zinc-500")}>
                      {field.isPublic ? <Unlock size={11} /> : <Lock size={11} />}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Visitor Log */}
            <div className="bg-[#080808]/60 border border-white/5 rounded-3xl p-6 space-y-4">
              <h2 className="text-[11px] font-black text-white uppercase tracking-[0.5em] flex items-center gap-3">
                <Eye size={14} className="text-accent" /> Riwayat Pengunjung
              </h2>
              <div className="space-y-3">
                {VISITOR_LOG.map((v, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                      <Image src={v.avatar} alt={v.name} width={32} height={32} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-black text-white/80 truncate">{v.name}</p>
                    </div>
                    <p className="text-[9px] text-zinc-600 uppercase tracking-widest flex-shrink-0">{v.time}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
