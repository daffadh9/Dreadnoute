"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera, Wand2, Upload, Edit3, X,
  Users, Ghost, Trophy, Star, Heart,
  Eye, Clock, Shield, Zap, Flame, Crown,
  ChevronRight, Plus, AlertTriangle,
  ArrowLeft, Share2, PlaySquare, Bookmark, Film,
  LayoutGrid,
  ChevronDown, ChevronUp, User, HeartPulse
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GHOST_ENTITIES } from "@/lib/ghostData";
import { supabase } from "@/lib/supabase";

const LEVEL_COLORS: Record<string, { border: string; glow: string; text: string; label: string }> = {
  "1-5":   { border: "border-zinc-500",   glow: "shadow-[0_0_20px_rgba(113,113,122,0.2)]",  text: "text-zinc-400",   label: "Novice" },
  "6-10":  { border: "border-green-500",  glow: "shadow-[0_0_25px_rgba(34,197,94,0.3)]",   text: "text-green-400",  label: "Seeker" },
  "11-15": { border: "border-blue-500",   glow: "shadow-[0_0_30px_rgba(59,130,246,0.4)]",  text: "text-blue-400",   label: "Analyst" },
  "16-20": { border: "border-red-500",    glow: "shadow-[0_0_40px_rgba(255,0,0,0.4)]",     text: "text-red-400",    label: "Veteran" },
  "21-30": { border: "border-yellow-400", glow: "shadow-[0_0_50px_rgba(234,179,8,0.5)]",   text: "text-yellow-400", label: "Master" },
  "31+":   { border: "border-purple-400", glow: "shadow-[0_0_60px_rgba(147,51,234,0.6)]",  text: "text-purple-400", label: "Archivist" },
};

function getLevelConfig(level: number) {
  if (level <= 5)  return LEVEL_COLORS["1-5"];
  if (level <= 10) return LEVEL_COLORS["6-10"];
  if (level <= 15) return LEVEL_COLORS["11-15"];
  if (level <= 20) return LEVEL_COLORS["16-20"];
  if (level <= 30) return LEVEL_COLORS["21-30"];
  return LEVEL_COLORS["31+"];
}

const WEEKLY_LIMIT = 2;
const LIMIT_STORAGE_KEY = "void_ai_cover_gen_timestamps";

function getWeeklyUsage(): number[] {
  try {
    const raw = localStorage.getItem(LIMIT_STORAGE_KEY);
    if (!raw) return [];
    const timestamps: number[] = JSON.parse(raw);
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return timestamps.filter(t => t > oneWeekAgo);
  } catch { return []; }
}

function recordGeneration() {
  const usage = getWeeklyUsage();
  usage.push(Date.now());
  localStorage.setItem(LIMIT_STORAGE_KEY, JSON.stringify(usage));
}

function getDaysUntilReset(usage: number[]): number {
  if (usage.length === 0) return 0;
  const oldest = Math.min(...usage);
  const resetAt = oldest + 7 * 24 * 60 * 60 * 1000;
  return Math.ceil((resetAt - Date.now()) / (24 * 60 * 60 * 1000));
}

function AIGenerateButton({
  label, onGenerate, variant = "default"
}: { label: string; onGenerate: (url: string) => void; variant?: "default" | "minimal" }) {
  const [showModal, setShowModal] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weeklyUsage, setWeeklyUsage] = useState<number[]>([]);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  const LOADING_MESSAGES = [
    { text: "Memanggil entitas dari dimensi lain...", sub: "Kontak paranormal sedang diinisiasi" },
    { text: "Menjelajahi arsip tersembunyi V.O.I.D...", sub: "Mengakses lapisan realita ke-7" },
    { text: "Mengurai sinyal dari balik tirai...", sub: "Frekuensi gaib terdeteksi" },
    { text: "Membuka portal visual...", sub: "Gemini AI sedang bekerja" },
    { text: "Mewujudkan visi dari kegelapan...", sub: "Proses hampir selesai" },
    { text: "Menyusun realita baru untukmu...", sub: "Sabar, ini layak ditunggu..." },
  ];

  useEffect(() => {
    if (!generating) { setLoadingMsgIdx(0); return; }
    const interval = setInterval(() => {
      setLoadingMsgIdx(i => (i + 1) % LOADING_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [generating, LOADING_MESSAGES.length]);

  useEffect(() => {
    setWeeklyUsage(getWeeklyUsage());
  }, [showModal]);

  const remaining = WEEKLY_LIMIT - weeklyUsage.length;
  const isLimitReached = remaining <= 0;
  const daysUntilReset = getDaysUntilReset(weeklyUsage);

  const handleGenerate = async () => {
    if (!prompt.trim() || generating || isLimitReached) return;
    setGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: label.toLowerCase() }),
      });

      const data = await response.json();
      if (data.imageUrl) {
        recordGeneration();
        setWeeklyUsage(getWeeklyUsage());
        onGenerate(data.imageUrl);
        setShowModal(false);
        setPrompt("");
      } else {
        throw new Error(data.error || "Failed to generate image");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal membuat gambar.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 25px rgba(168,85,247,0.5)",
            backgroundColor: "rgba(147, 51, 234, 1)"
        }}
        animate={{ 
            boxShadow: ["0 0 10px rgba(168,85,247,0)", "0 0 25px rgba(168,85,247,0.2)", "0 0 10px rgba(168,85,247,0)"]
        }}
        transition={{ 
            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        onClick={() => {
            setShowModal(true);
            setError(null);
        }}
        className={cn(
            "flex items-center gap-2 font-black uppercase tracking-widest transition-all",
            variant === "minimal" 
                ? "w-9 h-9 bg-black/40 border border-white/10 text-white rounded-full hover:scale-110 active:scale-95"
                : "px-5 py-3 bg-purple-600/90 border border-purple-500 text-white rounded-xl text-[10px] active:scale-95"
        )}
      >
        <Wand2 size={14} className="animate-pulse" /> 
        {variant !== "minimal" && `Generate AI`}
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-6"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-[#0a0a0a] border border-white/5 rounded-[1.5rem] w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,1)] flex flex-col"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {/* Header */}
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-600/10 rounded-xl flex items-center justify-center text-purple-400 border border-purple-500/10">
                          <Wand2 size={20} />
                      </div>
                      <div>
                          <h3 className="text-xl font-black text-white italic tracking-tighter" style={{ textTransform: 'uppercase' }}>AI VISUAL STUDIO</h3>
                          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em] mt-1">POWERED BY GEMINI</p>
                      </div>
                  </div>
                  <button 
                      onClick={() => setShowModal(false)} 
                      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-600 hover:text-white hover:bg-white/10 transition-all"
                  >
                      <X size={20} />
                  </button>
              </div>
              
              {/* Content (Scrollable Area) */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">

                  {/* Loading State */}
                  <AnimatePresence>
                    {generating && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl rounded-[1.5rem]"
                      >
                        {/* Animated orb */}
                        <div className="relative w-32 h-32 mb-8">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-2 border-t-purple-500 border-r-transparent border-b-purple-500/30 border-l-transparent"
                          />
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-3 rounded-full border border-t-transparent border-r-red-500/60 border-b-transparent border-l-red-500/30"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center border border-purple-500/30"
                            >
                              <Wand2 size={20} className="text-purple-400" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Cycling messages */}
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={loadingMsgIdx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="text-center space-y-2 px-8"
                          >
                            <p className="text-white font-black uppercase tracking-widest text-sm">
                              {LOADING_MESSAGES[loadingMsgIdx].text}
                            </p>
                            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em]">
                              {LOADING_MESSAGES[loadingMsgIdx].sub}
                            </p>
                          </motion.div>
                        </AnimatePresence>

                        {/* Progress dots */}
                        <div className="flex gap-2 mt-8">
                          {LOADING_MESSAGES.map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ opacity: i === loadingMsgIdx ? 1 : 0.2, scale: i === loadingMsgIdx ? 1.3 : 1 }}
                              className="w-1.5 h-1.5 rounded-full bg-purple-500"
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-4">
                      {/* Weekly Limit Indicator */}
                      <div className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest",
                        isLimitReached
                          ? "bg-red-500/5 border-red-500/20 text-red-400"
                          : remaining === 1
                          ? "bg-yellow-500/5 border-yellow-500/20 text-yellow-400"
                          : "bg-purple-500/5 border-purple-500/10 text-purple-400"
                      )}>
                        <div className="flex items-center gap-2">
                          <Wand2 size={12} />
                          <span>Generate Tersisa Minggu Ini</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            {Array.from({ length: WEEKLY_LIMIT }).map((_, i) => (
                              <div key={i} className={cn(
                                "w-2 h-2 rounded-full",
                                i < weeklyUsage.length ? "bg-current opacity-20" : "bg-current"
                              )} />
                            ))}
                          </div>
                          <span>{remaining}/{WEEKLY_LIMIT}</span>
                        </div>
                      </div>

                      {isLimitReached && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 text-red-400 text-[11px] font-bold bg-red-500/5 p-4 rounded-xl border border-red-500/10"
                        >
                          <AlertTriangle size={14} />
                          <span>Limit mingguan tercapai. Reset dalam <span className="text-red-300">{daysUntilReset} hari</span>.</span>
                        </motion.div>
                      )}

                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 block ml-1">Enter Vision Prompt</label>
                      <textarea
                          value={prompt}
                          onChange={e => setPrompt(e.target.value)}
                          disabled={isLimitReached}
                          placeholder={isLimitReached ? "Limit mingguan tercapai..." : "ketik deskripsi anda di sini (contoh: hutan berkabut)..."}
                          className={cn(
                            "w-full bg-black border rounded-2xl p-6 text-md placeholder:text-zinc-800 focus:outline-none resize-none h-40 tracking-normal leading-relaxed transition-all",
                            isLimitReached
                              ? "border-white/5 text-white/20 cursor-not-allowed"
                              : "border-white/5 text-white/80 focus:border-purple-600/30"
                          )}
                          style={{
                            textTransform: 'none',
                            fontFamily: 'Inter, system-ui, sans-serif',
                            fontSize: '16px'
                          }}
                      />

                      {error && (
                          <motion.div
                              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-3 text-red-500 text-[10px] font-bold bg-red-500/5 p-4 rounded-xl border border-red-500/10"
                          >
                              <AlertTriangle size={14} /> {error}
                          </motion.div>
                      )}
                  </div>
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-white/5 flex justify-end bg-white/[0.01]">
                  <button
                      onClick={handleGenerate}
                      disabled={!prompt.trim() || generating || isLimitReached}
                      className="px-10 py-3.5 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-900 disabled:text-zinc-700 text-white font-black uppercase tracking-[0.3em] text-[11px] rounded-xl flex items-center gap-3 transition-all active:scale-95 shadow-lg"
                  >
                      {generating ? (
                          <>
                              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                              <span>GENERATING...</span>
                          </>
                      ) : isLimitReached ? (
                          <>
                              <AlertTriangle size={16} />
                              <span>LIMIT REACHED</span>
                          </>
                      ) : (
                          <>
                              <Wand2 size={16} />
                              <span>GENERATE ({remaining} LEFT)</span>
                          </>
                      )}
                  </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ProfilePage() {
  const LEVEL = 18;
  const levelCfg = getLevelConfig(LEVEL);

  const [editMode, setEditMode] = useState(false);
  const [alias, setAlias] = useState("Loading...");
  const [bio, setBio] = useState("Penyelidik anomali dari dimensi fana. Saya mengumpulkan jejak entitas yang telah terlupakan dan mendokumentasikan keberadaan mereka untuk generasi berikutnya.");
  const [age, setAge] = useState("24");
  const [status, setStatus] = useState("Single - Uncommitted");
  const [gender, setGender] = useState("Male");
  const [hobbies, setHobbies] = useState("Entity Collection, Urban Exploration");
  const [interests] = useState("Ancient Folklore, Spectral Physics");
  
  const DEFAULT_COVER = "/assets/images/GAME DASHBOARD.jpg";
  const DEFAULT_AVATAR = "/assets/images/profile.jpg";
  const COVER_STORAGE_KEY = "void_profile_cover_url";

  const getInitialCoverUrl = (): string => {
    if (typeof window === "undefined") {
      return DEFAULT_COVER;
    }
    try {
      return localStorage.getItem(COVER_STORAGE_KEY) || DEFAULT_COVER;
    } catch {
      return DEFAULT_COVER;
    }
  };

  const [coverUrl, setCoverUrlState] = useState(getInitialCoverUrl);
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);
  const [activeTab, setActiveTab] = useState("postingan");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setAlias(user.user_metadata?.full_name || user.email?.split('@')[0] || "Archivist");
        if (user.user_metadata?.avatar_url) {
          setAvatarUrl(user.user_metadata.avatar_url);
        }
      }
    };
    fetchUserProfile();
  }, []);

  // Persist cover to localStorage whenever it changes
  const setCoverUrl = (url: string) => {
    setCoverUrlState(url);
    try {
      if (url && url !== DEFAULT_COVER) {
        localStorage.setItem(COVER_STORAGE_KEY, url);
      } else {
        localStorage.removeItem(COVER_STORAGE_KEY);
      }
    } catch (e) {
      console.warn("Could not persist cover to localStorage:", e);
    }
  };
  
  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const favoriteEntities = GHOST_ENTITIES.slice(1, 4);

  const VISITOR_LOG = [
    { name: "SHADOW_WALKER",   time: "2 MENIT LALU",  avatar: "https://i.pravatar.cc/40?img=10" },
    { name: "VOIDHUNTER99",    time: "15 MENIT LALU", avatar: "https://i.pravatar.cc/40?img=11" },
    { name: "NOCTURNALAGENTX", time: "1 JAM LALU",    avatar: "https://i.pravatar.cc/40?img=12" },
  ];

  return (
    <div className="min-h-screen bg-[#020202] font-cinzel text-white selection:bg-accent pb-24 relative overflow-hidden">
      
      {/* ── FOG ANIMATION OVERLAY ── */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
         <motion.div 
            animate={{ 
               x: ["-5%", "5%", "-5%"],
               y: ["0%", "2%", "0%"],
               opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-[-10%] inset-y-[-10%] bg-[url('https://www.transparenttextures.com/patterns/fog.png')] opacity-10 pointer-events-none mix-blend-screen scale-125"
         />
      </div>

      {/* ── TOP HEADER (NAV) ── */}
      <header className="fixed top-0 left-0 lg:left-[100px] right-0 h-20 flex items-center justify-between px-8 z-[100] border-b border-white/5 backdrop-blur-3xl bg-black/40">
         <div className="flex items-center gap-8">
            <Link href="/">
               <motion.button 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 transition-all hover:bg-black hover:border-red-500 hover:text-red-500 shadow-lg hover:shadow-red-900/40 group"
               >
                  <ArrowLeft size={16} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] pr-1">Kembali</span>
               </motion.button>
            </Link>
            
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 relative group cursor-pointer">
                  <Image src="/assets/images/LOGO ID CARD VOID.png" alt="V" fill className="object-contain relative z-10 transition-transform group-hover:scale-110" />
               </div>
               <div>
                  <h2 className="text-xl font-black tracking-[0.2em] leading-none mb-0.5 text-white/90">V. O. I. D.</h2>
                  <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-[0.4em]">Vanguard of Occult Investigation</p>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-4">
             <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-zinc-600">
                Session: #XP-994
             </div>
         </div>
      </header>

      <div className="max-w-[1280px] mx-auto pt-28 px-6 space-y-6 relative z-10">
        
        {/* â•â•â•â•â•â•â•â• COVER AREA â•â•â•â•â•â•â•â• */}
        <section className="relative w-full h-[320px] rounded-[2rem] overflow-visible group/banner bg-[#080808]"
          style={{
            boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 0 40px rgba(255,0,0,0.08), 0 0 80px rgba(0,0,0,0.8)",
          }}
        >
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-[2rem] pointer-events-none z-10">
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-[2rem]"
              style={{ boxShadow: "inset 0 0 1px 1px rgba(255,0,0,0.15), 0 0 60px rgba(255,0,0,0.06)" }}
            />
          </div>
           <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
                {coverUrl ? (
                  <>
                    <Image 
                        src={coverUrl} 
                        alt="Cover" 
                        fill 
                        className="object-cover brightness-[0.4] group-hover/banner:scale-105 transition-all duration-[3000ms]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-black/20" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/20 border-2 border-dashed border-white/5 m-4 rounded-xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">Tidak ada sampul</p>
                  </div>
                )}
           </div>
           
           {/* Cover Action Tray (Static & Balanced) */}
           <div className="absolute bottom-6 right-6 flex gap-3 z-30 h-10 items-center">
              <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && setCoverUrl(URL.createObjectURL(e.target.files[0]))} />
              
              {coverUrl && (
                <button 
                  onClick={() => setCoverUrl("")}
                  className="w-10 h-10 bg-red-600/20 border border-red-500/20 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white transition-all shadow-xl group/del"
                  title="Hapus Sampul"
                >
                  <X size={16} />
                </button>
              )}

              <button 
                onClick={() => coverInputRef.current?.click()}
                className="px-5 py-3 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-black hover:border-white transition-all text-white shadow-2xl"
              >
                 <Upload size={14} /> {coverUrl ? "Ganti Sampul" : "Upload Sampul"}
              </button>
                      <AIGenerateButton label="Sampul" onGenerate={url => setCoverUrl(url)} />
           </div>

           {/* AVATAR OVERLAP (Half-in, Half-out) */}
           <div className="absolute -bottom-16 left-10 z-20">
              <div className="relative group/avatar">
                 <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="w-40 h-40 rounded-[1.8rem] border-[8px] border-[#020202] overflow-hidden shadow-2xl shadow-black relative bg-[#0c0c0c]"
                 >
                    <Image src={avatarUrl} alt="A" fill className="object-cover brightness-100" priority />
                    
                    {/* Status Dot */}
                    <div className="absolute top-3 right-3 w-3.5 h-3.5 bg-[#22c55e] border-2 border-[#020202] rounded-full shadow-[0_0_10px_#22c55e] animate-pulse z-20" />
                    
                    {/* Camera Button (Always Visible but Lower Opacity) */}
                    <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && setAvatarUrl(URL.createObjectURL(e.target.files[0]))} />
                    <button 
                        onClick={() => avatarInputRef.current?.click()}
                        className="absolute bottom-2 right-2 w-9 h-9 bg-black/60 border border-white/20 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-accent/80 hover:border-black transition-all z-30 shadow-xl"
                    >
                       <Camera size={16} />
                    </button>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* â•â•â•â•â•â•â•â• IDENTITY BLOC â•â•â•â•â•â•â•â• */}
        <div className="pl-4 pt-20 flex flex-col lg:flex-row gap-6 items-start relative max-w-full overflow-hidden">
           <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                 <h1 className="text-3xl font-black uppercase tracking-[0.15em] text-white">
                    {alias}
                 </h1>
                 <div className="flex gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-red-600/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-wider flex items-center gap-2">
                       <Shield size={10} /> AGEN ID: #0042
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-wider flex items-center gap-2">
                       <Crown size={10} /> LV.18
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 text-[9px] font-black uppercase tracking-wider flex items-center gap-2">
                       INDONESIA ðŸ‡®ðŸ‡©
                    </span>
                 </div>
              </div>

              <div className="relative">
                 <p className="text-[14px] text-zinc-400 font-medium leading-relaxed max-w-2xl font-sans opacity-90">
                    {bio}
                 </p>
              </div>
           </div>

           <div className="flex gap-3 items-center self-end pb-1 pr-2">
              <button 
                onClick={() => setEditMode(true)}
                className="px-6 py-3 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-xl hover:bg-accent hover:text-white transition-all active:scale-95 flex items-center gap-2 shadow-xl"
              >
                 <Edit3 size={14} /> EDIT PROFILE
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowShareModal(true)}
                className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all shadow-lg"
              >
                 <Share2 size={18} />
              </motion.button>
           </div>
        </div>

        {/* â•â•â•â•â•â•â•â• STATS STRIP â•â•â•â•â•â•â•â• */}
        <div className="grid grid-cols-5 gap-4 pt-6">
           {[
             { label: "LIKES", val: "1.2K", icon: Heart, color: "text-red-500", glow: "hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]" },
             { label: "FANS", val: "284", icon: Users, color: "text-orange-500", glow: "hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]" },
             { label: "ENTITAS", val: "12", icon: Ghost, color: "text-blue-500", glow: "hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]" },
             { label: "ACHIEVEMENT", val: "6/6", icon: Trophy, color: "text-yellow-500", glow: "hover:border-yellow-500/40 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)]" },
             { label: "LEVEL", val: "18", icon: Zap, color: "text-purple-500", glow: "hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]" },
           ].map((s, i) => (
             <motion.div 
               whileHover={{ y: -4 }}
               key={i} 
               className={cn(
                  "bg-[#080808] border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center transition-all cursor-default",
                  s.glow
               )}
             >
                <div className={cn("w-10 h-10 mb-3 flex items-center justify-center bg-black rounded-xl", s.color)}>
                   <s.icon size={20} />
                </div>
                <p className="text-xl font-black mb-1">{s.val}</p>
                <p className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">{s.label}</p>
             </motion.div>
           ))}
        </div>

        {/* â•â•â•â•â•â•â•â• HIGHLIGHTS â•â•â•â•â•â•â•â• */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar py-4">
           <div className="flex flex-col items-center gap-3 shrink-0 group cursor-pointer">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-zinc-800 flex items-center justify-center text-zinc-700 group-hover:border-accent group-hover:text-accent transition-all">
                 <Plus size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-700">Baru</span>
           </div>
           {[
             { label: "Investigasi", img: "/assets/images/GAME DASHBOARD.jpg", color: "border-red-500", glow: "group-hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]" },
             { label: "Artefak", img: "/assets/images/TRAILER DASHBOARD.jpg", color: "border-orange-500", glow: "group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]" },
             { label: "Anomali", img: "/assets/images/PODCAST BANNER DASHBOARD.jpg", color: "border-pink-500", glow: "group-hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]" },
             { label: "Tim Alpha", img: "/assets/images/COLLECTOR BANNER.jpg", color: "border-blue-500", glow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]" },
             { label: "Penampakan", img: "/assets/images/GHOST WIKI DASHBOARD.jpg", color: "border-purple-500", glow: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]" },
           ].map((h, i) => (
             <div key={i} className="flex flex-col items-center gap-3 shrink-0 group cursor-pointer">
                <div className={cn("w-20 h-20 rounded-full p-[3px] border-2 transition-all duration-300 group-hover:scale-110", h.color, h.glow)}>
                   <div className="w-full h-full rounded-full border-2 border-[#020202] overflow-hidden relative">
                      <Image src={h.img} alt="h" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500 group-hover:text-white transition-colors">{h.label}</span>
             </div>
           ))}
        </div>

        {/* â•â•â•â•â•â•â•â• MAIN GRID â•â•â•â•â•â•â•â• */}
        <div className="grid grid-cols-12 gap-8 mt-12 pb-12">
           
           {/* LEFT CONTENT (8/12) */}
           <div className="col-span-12 lg:col-span-8 space-y-12">
              
              {/* GHOST FAVORIT */}
              <section>
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white flex items-center gap-3">
                       <Ghost size={18} className="text-accent" /> Ghost Favorit
                    </h3>
                    <Link href="/ghost-archive" className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest hover:text-white transition-all flex items-center gap-1">
                       LIHAT SEMUA <ChevronRight size={12} />
                    </Link>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {favoriteEntities.map((ghost, i) => (
                       <motion.div 
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                        key={i} 
                        className="aspect-[4/5] bg-[#0c0c0c] rounded-[1.5rem] overflow-hidden relative group cursor-pointer border border-white/5 hover:border-accent/30 shadow-xl"
                      >
                          <Image src={ghost.image || "/assets/images/GHOST WIKI DASHBOARD.jpg"} alt="g" fill className="object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                          
                          {/* Rarity Tag */}
                          <div className="absolute top-4 left-4 px-2 py-1 bg-black/80 backdrop-blur-md rounded-lg border border-white/10">
                             <p className="text-[8px] font-black text-accent uppercase tracking-widest">{ghost.rarity}</p>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-center text-center">
                             <h4 className="text-md font-black uppercase tracking-widest text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                                {ghost.name}
                             </h4>
                          </div>
                          
                          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity">
                              <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
                          </div>
                       </motion.div>
                    ))}
                 </div>
              </section>

              {/* TABS & POSTS */}
              <section className="space-y-8">
                 <div className="grid grid-cols-4 border-b border-white/5">
                    {[
                      { id: "postingan", label: "POSTINGAN", icon: LayoutGrid },
                      { id: "reels", label: "REELS", icon: Film },
                      { id: "playlist", label: "PLAYLIST", icon: PlaySquare },
                      { id: "tersimpan", label: "TERSIMPAN", icon: Bookmark },
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={cn(
                           "flex items-center justify-center gap-2 py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group",
                           activeTab === t.id ? "text-white" : "text-zinc-600 hover:text-zinc-300"
                        )}
                      >
                         <t.icon size={15} className={cn("transition-all", activeTab === t.id ? "text-accent drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]" : "")} />
                         <span className={cn("transition-all", activeTab === t.id ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" : "")}>{t.label}</span>
                         {activeTab === t.id && (
                           <motion.div layoutId="tab-bar-prof" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
                         )}
                      </button>
                    ))}
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                       <div key={i} className="aspect-square bg-[#0c0c0c] rounded-[1.2rem] border border-white/5 overflow-hidden relative group cursor-pointer shadow-lg">
                          <Image 
                            src={`https://picsum.photos/600/600?random=${i + 120}`} 
                            alt="p" 
                            fill 
                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Heart className="text-white w-8 h-8" fill="white" />
                          </div>
                       </div>
                    ))}
                 </div>
              </section>
           </div>

           {/* RIGHT SIDEBAR (4/12) */}
           <div className="col-span-12 lg:col-span-4 space-y-8">
              
              {/* VOID ID CARD PREMIUM */}
              <div className="relative mt-32">

                {/* â”€â”€ LOGO CROWN â€” melayang besar di kepala card â”€â”€ */}
                <div className="absolute -top-28 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
                  {/* Outer energy ring behind logo */}
                  <motion.div
                    animate={{ rotate: -360, opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[240px] h-[240px] rounded-full"
                    style={{
                      background: "conic-gradient(from 0deg, rgba(255,0,0,0.6) 0%, transparent 25%, rgba(255,60,0,0.4) 50%, transparent 75%, rgba(255,0,0,0.6) 100%)",
                      filter: "blur(4px)",
                    }}
                  />
                  {/* Inner ring */}
                  <motion.div
                    animate={{ rotate: 360, scale: [0.92, 1.05, 0.92] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-[210px] h-[210px] rounded-full border border-red-600/30"
                    style={{ boxShadow: "0 0 20px rgba(255,0,0,0.3), inset 0 0 20px rgba(255,0,0,0.1)" }}
                  />
                  {/* Logo itself */}
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                      filter: [
                        "drop-shadow(0 0 15px rgba(255,0,0,0.4)) drop-shadow(0 0 40px rgba(255,0,0,0.2))",
                        "drop-shadow(0 0 35px rgba(255,0,0,1)) drop-shadow(0 0 80px rgba(255,0,0,0.5)) drop-shadow(0 0 120px rgba(255,40,0,0.3))",
                        "drop-shadow(0 0 15px rgba(255,0,0,0.4)) drop-shadow(0 0 40px rgba(255,0,0,0.2))",
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-56 h-56 relative"
                  >
                    <Image src="/assets/images/LOGO ID CARD VOID.png" alt="VOID" fill className="object-contain" />
                  </motion.div>
                  {/* Particle sparks orbiting logo */}
                  {[0,60,120,180,240,300].map((deg, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
                      className="absolute w-1.5 h-1.5 rounded-full bg-red-400"
                      style={{
                        top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 105}px)`,
                        left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 105}px)`,
                        boxShadow: "0 0 6px rgba(255,0,0,1), 0 0 12px rgba(255,0,0,0.6)",
                      }}
                    />
                  ))}
                </div>

                {/* â”€â”€ CARD WRAPPER â”€â”€ */}
                <div className="relative rounded-[2.5rem] overflow-visible">

                  {/* Border layer 1 â€” fast red conic spin */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-[2px] rounded-[2.5rem] z-0"
                    style={{
                      background: "conic-gradient(from 0deg, rgba(255,0,0,0.9) 0%, transparent 20%, rgba(255,30,0,0.3) 40%, transparent 60%, rgba(255,0,0,0.9) 80%, transparent 100%)",
                      filter: "blur(0.5px)",
                    }}
                  />
                  {/* Border layer 2 â€” slow counter-spin with purple accent */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-[3px] rounded-[2.6rem] z-0"
                    style={{
                      background: "conic-gradient(from 180deg, rgba(180,0,255,0.4) 0%, transparent 25%, rgba(255,0,0,0.5) 50%, transparent 75%, rgba(180,0,255,0.4) 100%)",
                      filter: "blur(2px)",
                    }}
                  />
                  {/* Border pulsing glow ring */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-[6px] rounded-[2.8rem] z-0"
                    style={{
                      boxShadow: "0 0 20px rgba(255,0,0,0.4), 0 0 50px rgba(255,0,0,0.2), 0 0 100px rgba(180,0,255,0.15)",
                    }}
                  />

                  {/* 8 energy nodes â€” corners + midpoints */}
                  {[
                    { pos: "top-3 left-3" }, { pos: "top-3 right-3" },
                    { pos: "bottom-3 left-3" }, { pos: "bottom-3 right-3" },
                    { pos: "top-3 left-1/2 -translate-x-1/2" }, { pos: "bottom-3 left-1/2 -translate-x-1/2" },
                    { pos: "left-3 top-1/2 -translate-y-1/2" }, { pos: "right-3 top-1/2 -translate-y-1/2" },
                  ].map(({ pos }, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.4, 0.6] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
                      className={`absolute ${pos} w-2 h-2 rounded-full z-20`}
                      style={{
                        background: i % 2 === 0 ? "rgb(255,50,50)" : "rgb(200,0,255)",
                        boxShadow: i % 2 === 0
                          ? "0 0 8px rgba(255,0,0,1), 0 0 18px rgba(255,0,0,0.6)"
                          : "0 0 8px rgba(200,0,255,1), 0 0 18px rgba(200,0,255,0.6)",
                      }}
                    />
                  ))}

                  {/* Card body */}
                  <div className="relative z-10 bg-[#040404] rounded-[2.4rem] pt-32 pb-8 px-8 space-y-6 overflow-hidden">

                    {/* Carbon texture */}
                    <div className="absolute inset-0 rounded-[2.4rem] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]" />

                    {/* Top red glow */}
                    <motion.div
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-red-700/30 via-red-600/10 to-transparent pointer-events-none rounded-t-[2.4rem]"
                    />

                    {/* Dual scan lines */}
                    <motion.div
                      animate={{ y: ["-100%", "200%"] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                      className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-red-500/8 to-transparent pointer-events-none z-10"
                    />
                    <motion.div
                      animate={{ y: ["200%", "-100%"] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                      className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none z-10"
                    />

                    {/* Header */}
                    <div className="flex flex-col items-center gap-2 relative z-10 pb-4 border-b border-white/5">
                      <div className="text-center">
                        <p className="text-[9px] font-black tracking-[0.6em] uppercase text-zinc-600">ID CARD</p>
                        <h4 className="text-[18px] font-black tracking-[0.4em] uppercase text-white mt-0.5 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">V.O.I.D.</h4>
                      </div>
                      <span className={cn("text-[8px] font-black px-3 py-1 rounded-lg border uppercase tracking-widest", levelCfg.border, levelCfg.text, levelCfg.glow)}>
                        {levelCfg.label}
                      </span>
                    </div>

                    {/* Avatar */}
                    <div className="flex flex-col items-center gap-4 relative z-10 py-2">
                      <div className={cn("w-32 h-32 rounded-[1.5rem] border-2 overflow-hidden shadow-xl relative", levelCfg.border)}>
                        <Image src={avatarUrl} alt="A" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="text-center space-y-1">
                        <h3 className="text-lg font-black uppercase tracking-wide">{alias}</h3>
                        <p className={cn("text-sm font-black uppercase tracking-widest", levelCfg.text)}>V.O.I.D. #0042</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 text-center border-t border-white/5 pt-6 relative z-10">
                      <div><p className="text-md font-black">{favoriteEntities.length}</p><p className="text-[7px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Entities</p></div>
                      <div><p className="text-md font-black">284</p><p className="text-[7px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Fans</p></div>
                      <div><p className="text-md font-black">6</p><p className="text-[7px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Badges</p></div>
                    </div>
                  </div>
                </div>
              </div>{/* end outer wrapper */}

              {/* DATA PROFILE (COLLAPSIBLE / EDITABLE) */}
              <div className="space-y-6 bg-[#080808]/40 p-6 rounded-[2rem] border border-white/5">
                 <div className="flex justify-between items-center cursor-pointer group" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-white/70 group-hover:text-white flex items-center gap-3 transition-colors">
                       <User size={16} className="text-accent" /> Data Profile
                    </h3>
                    <div className="text-zinc-600">
                        {isSidebarCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                    </div>
                 </div>

                 <AnimatePresence>
                    {!isSidebarCollapsed && (
                       <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: "auto", opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4 overflow-hidden"
                       >
                          {[
                            { l: "Gender", v: gender, i: User },
                            { l: "Usia", v: age, i: Clock },
                            { l: "Status", v: status, i: HeartPulse },
                            { l: "Hobi", v: hobbies, i: Flame },
                            { l: "Minat", v: interests, i: Star },
                          ].map((d, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-accent/10 transition-all group">
                               <div className="p-2.5 bg-black rounded-xl text-accent group-hover:scale-105 transition-transform"><d.i size={16} /></div>
                               <div className="flex-1 min-w-0">
                                  <p className="text-[7px] font-black text-zinc-600 uppercase tracking-widest mb-0.5">{d.l}</p>
                                  <p className="text-[11px] font-black uppercase tracking-widest text-white/80 truncate">{d.v}</p>
                               </div>
                            </div>
                          ))}
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>

              {/* VISITOR RECAP */}
              <div className="space-y-6 bg-[#080808]/40 p-6 rounded-[2rem] border border-white/5">
                 <h3 className="text-[11px] font-black uppercase tracking-widest text-white/30 flex items-center gap-3">
                    <Eye size={16} className="text-accent" /> Riwayat Pengunjung
                 </h3>
                 <div className="space-y-4">
                    {VISITOR_LOG.map((v, i) => (
                       <div key={i} className="flex items-center gap-4 p-2 rounded-xl hover:bg-white/5 transition-all group cursor-pointer">
                          <div className="w-9 h-9 rounded-full border border-white/10 overflow-hidden relative">
                             <Image src={v.avatar} alt="v" fill className="object-cover grayscale group-hover:grayscale-0" />
                          </div>
                          <div className="flex-1 min-w-0">
                             <p className="text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white truncate">{v.name}</p>
                             <p className="text-[7px] font-bold text-zinc-700 uppercase tracking-widest group-hover:text-zinc-500">{v.time}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

           </div>
        </div>
      </div>
      
      {/* â”€â”€ SHARE MODAL â”€â”€ */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-6"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#080808] border border-white/10 rounded-[2rem] w-full max-w-md p-8 space-y-8 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-[0.2em]">Bagikan Profil</h3>
                  <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">V.O.I.D. #0042</p>
                </div>
                <button onClick={() => setShowShareModal(false)} className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-all">
                  <X size={18} />
                </button>
              </div>

              {/* QR Code */}
	              <div className="flex flex-col items-center gap-4">
	                <div className="p-4 bg-white rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.1)]">
	                  {/* eslint-disable-next-line @next/next/no-img-element */}
	                  <img
	                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "https://dreadnoute.com/profile")}&bgcolor=ffffff&color=000000&margin=2`}
	                    alt="QR Code"
                    width={180}
                    height={180}
                    className="rounded-xl"
                  />
                </div>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest text-center">Scan QR untuk buka profil ini</p>
              </div>

              {/* Copy Link */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(typeof window !== "undefined" ? window.location.href : "");
                  alert("Link disalin!");
                }}
                className="w-full flex items-center gap-3 px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-white/10 hover:border-accent/30 transition-all"
              >
                <Share2 size={16} className="text-accent" />
                <span className="flex-1 text-left truncate text-zinc-400">{typeof window !== "undefined" ? window.location.href : "dreadnoute.com/profile"}</span>
                <span className="text-accent shrink-0">SALIN</span>
              </button>

              {/* Social Media */}
              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700 text-center">Bagikan Via</p>
                <div className="grid grid-cols-5 gap-3">
                  {[
                    { name: "WhatsApp", color: "hover:bg-green-600/20 hover:border-green-500/40", icon: "ðŸ’¬", url: (u: string) => `https://wa.me/?text=${encodeURIComponent("Cek profil V.O.I.D. saya di DreadNoute! " + u)}` },
                    { name: "Instagram", color: "hover:bg-pink-600/20 hover:border-pink-500/40", icon: "ðŸ“¸", url: () => `https://instagram.com` },
                    { name: "Twitter", color: "hover:bg-sky-600/20 hover:border-sky-500/40", icon: "ðŸ¦", url: (u: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent("Cek profil V.O.I.D. saya!")}&url=${encodeURIComponent(u)}` },
                    { name: "Facebook", color: "hover:bg-blue-600/20 hover:border-blue-500/40", icon: "ðŸ“˜", url: (u: string) => `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
                    { name: "TikTok", color: "hover:bg-zinc-600/20 hover:border-zinc-400/40", icon: "ðŸŽµ", url: () => `https://tiktok.com` },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.url(typeof window !== "undefined" ? window.location.href : "")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex flex-col items-center gap-2 py-3 rounded-xl border border-white/5 bg-white/[0.02] transition-all cursor-pointer",
                        s.color
                      )}
                    >
                      <span className="text-xl">{s.icon}</span>
                      <span className="text-[8px] font-black uppercase tracking-wider text-zinc-600">{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* â”€â”€ EDIT MODAL â”€â”€ */}
      <AnimatePresence>
         {editMode && (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
            >
               <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#0c0c0c] border border-white/10 rounded-[2rem] p-8 w-full max-w-2xl space-y-6"
               >
                  <div className="flex justify-between items-center">
                     <h2 className="text-xl font-black uppercase italic tracking-tighter">Modify Registry Data</h2>
                     <button onClick={() => setEditMode(false)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-all"><X size={20} /></button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-4">
                        <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-zinc-600 block ml-1">Alias Name</label>
                        <input value={alias} onChange={e => setAlias(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-4 text-white text-sm font-black uppercase tracking-widest focus:border-accent/40 focus:outline-none" />
                        
                        <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-zinc-600 block ml-1">Motto</label>
                        <textarea value={bio} onChange={e => setBio(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-4 text-white text-xs font-medium h-24 focus:border-accent/40 focus:outline-none resize-none font-sans" />
                     </div>
                     <div className="space-y-4">
                        <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-zinc-600 block ml-1">Detailed Info</label>
                        <div className="grid grid-cols-2 gap-2">
                           <input placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white text-[11px] focus:outline-none" />
                           <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white text-[11px] focus:outline-none" />
                        </div>
                        <input placeholder="Status" value={status} onChange={e => setStatus(e.target.value)} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white text-[11px] focus:outline-none" />
                        <input placeholder="Hobbies" value={hobbies} onChange={e => setHobbies(e.target.value)} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white text-[11px] focus:outline-none" />
                     </div>
                  </div>

                  <button 
                    onClick={() => setEditMode(false)}
                    className="w-full py-4 bg-accent text-white font-black uppercase tracking-[0.4em] text-[11px] rounded-xl hover:bg-red-700 transition-all"
                  >
                     SAVE DATA
                  </button>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}

