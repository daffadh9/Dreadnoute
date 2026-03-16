"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Eye, Zap, Flame, Activity, Wind } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type Rarity = "Common" | "Rare" | "Mythic" | "Legendary" | "Cursed";
export type GhostTag = "Aggressor" | "Lurker" | "Ancient";
export type GhostRole = "Aggressor" | "Watcher" | "Manipulator" | "Passive";

interface GhostCardProps {
  id: string;
  name: string;
  rarity: Rarity;
  role?: GhostRole;
  tag?: GhostTag;
  price?: { dc?: number; obsidian?: number };
  image_url: string;
  danger_lvl?: number;
  spectral_aura?: number;
  className?: string;
  index?: number;
}

const rarityConfig: Record<Rarity, {
  color: string; glow: string; text: string; bg: string; label: string;
  defaultDC: number; defaultOBS: number; nameShadow: string; glowLine: string;
}> = {
  Common: {
    color: "border-zinc-500/50",
    glow: "shadow-[0_0_20px_rgba(113,113,122,0.15)]",
    text: "text-zinc-400",
    bg: "bg-zinc-500/10",
    label: "COMMON",
    defaultDC: 500, defaultOBS: 0,
    nameShadow: "drop-shadow-[0_2px_8px_rgba(113,113,122,0.7)]",
    glowLine: "from-zinc-500/60",
  },
  Rare: {
    color: "border-green-600/50",
    glow: "shadow-[0_0_30px_rgba(22,101,52,0.25)]",
    text: "text-green-400",
    bg: "bg-green-800/10",
    label: "RARE",
    defaultDC: 1500, defaultOBS: 5,
    nameShadow: "drop-shadow-[0_2px_12px_rgba(34,197,94,0.8)]",
    glowLine: "from-green-600/60",
  },
  Mythic: {
    color: "border-red-500/60",
    glow: "shadow-[0_0_45px_rgba(255,0,0,0.35)]",
    text: "text-red-400",
    bg: "bg-red-950/20",
    label: "MYTHIC",
    defaultDC: 5000, defaultOBS: 50,
    nameShadow: "drop-shadow-[0_2px_16px_rgba(255,0,0,1)]",
    glowLine: "from-red-500/70",
  },
  Legendary: {
    color: "border-yellow-500/60",
    glow: "shadow-[0_0_55px_rgba(202,138,4,0.45)]",
    text: "text-yellow-400",
    bg: "bg-yellow-600/10",
    label: "LEGENDARY",
    defaultDC: 15000, defaultOBS: 250,
    nameShadow: "drop-shadow-[0_2px_16px_rgba(234,179,8,1)]",
    glowLine: "from-yellow-500/70",
  },
  Cursed: {
    color: "border-purple-500/60",
    glow: "shadow-[0_0_65px_rgba(147,51,234,0.55)]",
    text: "text-purple-400",
    bg: "bg-purple-600/10",
    label: "CURSED",
    defaultDC: 50000, defaultOBS: 1000,
    nameShadow: "drop-shadow-[0_2px_20px_rgba(147,51,234,1)]",
    glowLine: "from-purple-500/70",
  },
};

const roleConfig: Record<GhostRole, { color: string; bg: string; border: string; icon: React.ElementType; label: string }> = {
  Aggressor:   { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/30",    icon: Flame,    label: "AGGRESSOR" },
  Watcher:     { color: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/30",   icon: Eye,      label: "WATCHER" },
  Manipulator: { color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", icon: Zap,      label: "MANIPULATOR" },
  Passive:     { color: "text-teal-400",   bg: "bg-teal-500/10",   border: "border-teal-500/30",   icon: Wind,     label: "PASSIVE" },
};

// Danger color per filled segment (index)
const dangerSegmentColor = [
  "bg-zinc-400",
  "bg-yellow-400 shadow-[0_0_6px_rgba(234,179,8,0.8)]",
  "bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.8)]",
  "bg-red-400 shadow-[0_0_10px_rgba(255,80,0,0.9)]",
  "bg-red-600 shadow-[0_0_12px_rgba(255,0,0,1)]",
];

export const GhostCard = ({
  name,
  rarity,
  role = "Aggressor",
  price,
  image_url,
  danger_lvl,
  className,
  index = 0,
}: GhostCardProps) => {
  const config = rarityConfig[rarity] || rarityConfig.Common;
  const roleInfo = roleConfig[role] || roleConfig.Aggressor;
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const displayPrice = {
    dc: price?.dc ?? config.defaultDC,
    obsidian: price?.obsidian ?? config.defaultOBS,
  };

  const dangerSegments = 5;
  const filledSegments = Math.round((danger_lvl / 10) * dangerSegments);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    setRotate({ x: dy / -15, y: dx / 15 });
    if (Math.random() > 0.98) {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }
  };

  return (
    <div className={cn("flex flex-col group/wrap", className)}>

      {/* ──────────── CARD VISUAL ──────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: 1,
          y: 0,
          rotateX: rotate.x,
          rotateY: rotate.y,
          filter: glitch ? "invert(1) contrast(2) hue-rotate(90deg)" : "invert(0)",
        }}
        transition={{ delay: index * 0.08, duration: 0.7, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { setRotate({ x: 0, y: 0 }); setGlitch(false); setIsHovered(false); }}
        onMouseEnter={() => setIsHovered(true)}
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
        className={cn(
          "relative w-full aspect-[2/3] rounded-[2.5rem] border-2 overflow-hidden bg-[#050505] cursor-pointer transition-all duration-500",
          config.color,
          config.glow,
          isHovered && "scale-[1.02]",
        )}
      >
        {/* BG texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-[1]" />

        {/* Ambient rarity glow */}
        <div className={cn("absolute -top-20 -left-20 w-56 h-56 blur-[100px] opacity-30 transition-opacity duration-700 z-[1]", config.bg, isHovered && "opacity-60")} />
        <div className={cn("absolute -bottom-20 -right-20 w-56 h-56 blur-[100px] opacity-15 transition-opacity duration-700 z-[1]", config.bg, isHovered && "opacity-40")} />

        {/* ── FULL IMAGE — no name blocking ── */}
        <div className="absolute inset-0 z-[2]">
          <Image
            src={image_url}
            alt={name}
            fill
            className="object-cover grayscale group-hover/wrap:grayscale-0 transition-all duration-1000 group-hover/wrap:scale-108"
          />
          {/* Gradient: transparent in middle, dark only at edges for UI readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50" />
        </div>

        {/* ── TOP BADGES: Rarity + Role ── */}
        <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-[20]">
          {/* Rarity */}
          <div className={cn(
            "px-4 py-1.5 rounded-full border backdrop-blur-xl bg-black/60 text-[8px] font-black uppercase tracking-[0.5em]",
            config.text, "border-current/40",
          )}>
            {config.label}
          </div>
          {/* Role */}
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-xl",
            roleInfo.color, roleInfo.border, roleInfo.bg,
          )}>
            <roleInfo.icon size={10} />
            <span className="text-[8px] font-black uppercase tracking-wider">{roleInfo.label}</span>
          </div>
        </div>

        {/* ── BOTTOM INFO STRIP ── */}
        <div className="absolute bottom-0 left-0 right-0 z-[10] px-5 py-5 bg-gradient-to-t from-black via-black/85 to-transparent">
          {/* Danger bar */}
          <div className="flex items-center gap-2.5 mb-4">
            <ShieldAlert size={11} className="text-zinc-400 flex-shrink-0" />
            <div className="flex gap-1.5 flex-1">
              {Array.from({ length: dangerSegments }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 h-2 rounded-full transition-all duration-500",
                    i < filledSegments ? dangerSegmentColor[Math.min(i, dangerSegmentColor.length - 1)] : "bg-white/10",
                  )}
                />
              ))}
            </div>
            <span className={cn(
              "text-[11px] font-black tabular-nums",
              filledSegments >= 5 ? "text-red-400" : filledSegments >= 4 ? "text-orange-400" : filledSegments >= 3 ? "text-yellow-400" : "text-zinc-500",
            )}>
              {danger_lvl}/10
            </span>
          </div>

          {/* Price row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <div className="relative w-5 h-5 overflow-hidden flex-shrink-0 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                <Image src="/assets/icon/DREADCOINS.jpg" alt="DC" fill className="object-cover" />
              </div>
              <span className="text-[13px] font-black text-white tracking-wider">
                {displayPrice.dc.toLocaleString()}
              </span>
            </div>
            {displayPrice.obsidian > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 bg-yellow-600/15 border border-yellow-500/40 rounded-xl shadow-[0_0_12px_rgba(202,138,4,0.25)]">
                <div className="relative w-5 h-5 overflow-hidden flex-shrink-0">
                  <Image src="/assets/icon/OBSIDIAN.png" alt="OBS" fill className="object-contain" />
                </div>
                <span className="text-[13px] font-black text-yellow-400 tracking-wider">{displayPrice.obsidian} <span className="text-[10px]">OBS</span></span>
              </div>
            )}
          </div>
        </div>

        {/* Rarity glow line at bottom border */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r to-transparent opacity-0 transition-all duration-700 z-[25]",
          config.glowLine,
          isHovered && "opacity-100",
        )} />

        {/* Glitch overlay */}
        <AnimatePresence>
          {glitch && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-accent/10 z-[30] pointer-events-none mix-blend-overlay"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* ──────────── NAME BELOW CARD ──────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 + 0.15, duration: 0.5 }}
        className="mt-4 px-2 text-center"
      >
        <h3 className={cn(
          "text-2xl md:text-3xl font-horror text-white uppercase tracking-wider leading-tight transition-all duration-500",
          config.nameShadow,
          isHovered && config.text,
        )}>
          {name}
        </h3>
      </motion.div>

    </div>
  );
};
