'use client'

import { motion } from 'framer-motion'

interface Entity {
  name: string
  rarity: string
  rarityColor: string
  lore: string
  class: string
  type: string
  sanityDrain: number
  power: number
}

const featuredEntity: Entity = {
  name: 'Kuntilanak Merah',
  rarity: 'Cursed',
  rarityColor: 'text-red-400 border-red-800/50 bg-red-950/30',
  lore: 'Suara tangisnya dipercaya membuka retakan kecil menuju Nekrovia. Mereka yang mendengarnya di malam Jumat Kliwon tidak akan pernah kembali utuh.',
  class: 'Possessor',
  type: 'Arwah',
  sanityDrain: 25,
  power: 68,
}

const rarityGlow: Record<string, string> = {
  Cursed: 'bg-red-700/25',
  Forbidden: 'bg-purple-700/25',
  Primordial: 'bg-amber-700/25',
  Bound: 'bg-blue-700/20',
  Whispered: 'bg-slate-700/15',
}

export default function FeaturedEntity() {
  const entity = featuredEntity
  const glow = rarityGlow[entity.rarity] ?? 'bg-red-700/20'

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-cinzel text-sm font-semibold text-white/60 tracking-widest uppercase">
          Entitas Unggulan Hari Ini
        </h2>
        <span className="text-xs text-white/25 tracking-wide">Daily Omen</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-2xl border border-white/5 bg-[#0f0f11] overflow-hidden"
      >
        {/* Top glow */}
        <div className={`absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-48 rounded-full blur-[80px] pointer-events-none ${glow}`} />

        <div className="relative z-10 flex flex-col md:flex-row gap-0">
          {/* Left — Entity Visual */}
          <div className="relative md:w-52 flex-shrink-0 flex items-center justify-center min-h-[220px] overflow-hidden">
            {/* Gradient bg for card art area */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-[#120008] to-[#0B0B0D]" />

            {/* Ritual circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border border-red-900/20" />
              <div className="absolute w-24 h-24 rounded-full border border-red-900/15" />
            </div>

            {/* Entity silhouette placeholder */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full border-2 border-red-900/40 bg-gradient-to-b from-red-950/60 to-red-900/20 flex items-center justify-center shadow-lg"
                style={{ boxShadow: '0 0 40px rgba(180,0,0,0.3), inset 0 0 20px rgba(180,0,0,0.1)' }}>
                {/* Ghost icon SVG */}
                <svg className="w-12 h-12 text-red-400/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10A8 8 0 0 0 12 2zm-3 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
              </div>

              {/* Rarity badge */}
              <span className={`px-2.5 py-0.5 rounded-full border text-xs font-medium tracking-widest uppercase ${entity.rarityColor}`}>
                {entity.rarity}
              </span>
            </div>
          </div>

          {/* Right — Entity Info */}
          <div className="flex-1 p-6 md:p-7 flex flex-col justify-between gap-5">
            {/* Name + Class */}
            <div>
              <h3 className="font-cinzel text-xl font-bold text-white tracking-wide leading-tight"
                style={{ textShadow: '0 0 30px rgba(255,0,0,0.2)' }}>
                {entity.name}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-white/35 tracking-wide">{entity.class}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-xs text-white/35 tracking-wide">{entity.type}</span>
              </div>
            </div>

            {/* Lore */}
            <p className="text-sm text-white/45 leading-relaxed italic">
              &ldquo;{entity.lore}&rdquo;
            </p>

            {/* Stats bar */}
            <div className="flex flex-col gap-2.5">
              {/* Sanity Drain */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/30 w-24 flex-shrink-0">Sanity Drain</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${entity.sanityDrain}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                    className="h-full rounded-full bg-gradient-to-r from-red-800 to-red-500"
                  />
                </div>
                <span className="text-xs text-red-400/70 w-8 text-right">{entity.sanityDrain}</span>
              </div>

              {/* Power */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/30 w-24 flex-shrink-0">Kekuatan Aura</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${entity.power}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.55 }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-900 to-purple-500"
                  />
                </div>
                <span className="text-xs text-purple-400/70 w-8 text-right">{entity.power}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <button className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-red-900/40 bg-red-950/20 text-red-400/80 text-xs font-medium tracking-wide hover:border-red-700/60 hover:bg-red-950/40 hover:text-red-300 transition-all duration-300">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                Lihat Detail
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.03] text-white/35 text-xs font-medium tracking-wide hover:border-white/10 hover:text-white/50 transition-all duration-300">
                + Simpan
              </button>
            </div>
          </div>
        </div>

        {/* Bottom shine border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-800/30 to-transparent" />
      </motion.div>
    </section>
  )
}
