'use client'

import { motion } from 'framer-motion'
import { Eye, Plus } from 'lucide-react'

const entity = {
  name: 'Kuntilanak Merah',
  rarity: 'Cursed',
  class: 'Possessor',
  type: 'Arwah',
  lore: 'Suara tangisnya dipercaya membuka retakan kecil menuju Nekrovia. Mereka yang mendengarnya di malam Jumat Kliwon tidak akan pernah kembali utuh.',
  sanityDrain: 25,
  power: 68,
}

export default function FeaturedEntity() {
  return (
    <section className="w-full">
      {/* Section label */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
            Entitas Unggulan Hari Ini
          </h2>
          <div className="h-px w-16 bg-zinc-800/60" />
        </div>
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-700">Daily Omen</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[28px] border border-red-950/50 bg-[linear-gradient(145deg,rgba(20,5,5,0.97)_0%,rgba(7,7,10,1)_100%)] shadow-[0_34px_78px_-34px_rgba(220,38,38,0.4)] md:rounded-[32px]"
      >
        {/* Glows */}
        <div className="pointer-events-none absolute -top-12 right-8 h-40 w-40 animate-pulse rounded-full bg-red-500/20 blur-2xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full bg-purple-900/15 blur-[80px]" />

        {/* Top shimmer */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/80 to-transparent" />

        <div className="relative z-10 flex flex-col md:flex-row">
          {/* Left — visual */}
          <div className="relative flex min-h-[200px] flex-shrink-0 items-center justify-center overflow-hidden border-b border-white/[0.04] md:w-56 md:border-b-0 md:border-r">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(180,0,0,0.15),transparent_70%)]" />

            {/* Ritual rings */}
            <div className="relative flex h-36 w-36 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-red-900/25" />
              <div className="absolute inset-3 rounded-full border border-red-900/15" />
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-red-800/30 bg-red-950/25 shadow-[0_0_40px_rgba(180,0,0,0.2)]">
                <svg className="h-10 w-10 text-red-400/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10A8 8 0 0 0 12 2zm-3 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
              </div>
            </div>

            {/* Rarity badge */}
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-red-800/50 bg-red-950/40 px-3 py-1 text-[8px] font-black uppercase tracking-[0.35em] text-red-400">
              {entity.rarity}
            </span>
          </div>

          {/* Right — info */}
          <div className="flex flex-1 flex-col justify-between gap-5 p-6 md:p-8">
            {/* Name */}
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,0,0,0.2)] md:text-3xl">
                {entity.name}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{entity.class}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-700" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{entity.type}</span>
              </div>
            </div>

            {/* Lore */}
            <p className="text-[13px] italic leading-relaxed text-zinc-400">
              &ldquo;{entity.lore}&rdquo;
            </p>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-24 flex-shrink-0 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                  Sanity Drain
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full border border-red-950/40 bg-black/30">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${entity.sanityDrain}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    className="h-full rounded-full bg-[linear-gradient(90deg,#991b1b,#ef4444)] shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                  />
                </div>
                <span className="w-8 text-right text-[9px] font-black text-zinc-500">{entity.sanityDrain}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-24 flex-shrink-0 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                  Kekuatan Aura
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full border border-purple-950/40 bg-black/30">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${entity.power}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.45 }}
                    className="h-full rounded-full bg-[linear-gradient(90deg,#581c87,#a855f7)] shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                  />
                </div>
                <span className="w-8 text-right text-[9px] font-black text-zinc-500">{entity.power}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-xl border border-red-900/40 bg-red-950/20 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.25em] text-red-400 transition-all hover:-translate-y-0.5 hover:border-red-700/50 hover:bg-red-950/35 hover:text-red-300 active:scale-95">
                <Eye size={13} />
                Lihat Detail
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500 transition-all hover:-translate-y-0.5 hover:border-white/15 hover:text-zinc-300 active:scale-95">
                <Plus size={13} />
                Simpan
              </button>
            </div>
          </div>
        </div>

        {/* Bottom shimmer */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-800/30 to-transparent" />
      </motion.div>
    </section>
  )
}
