'use client'

import { motion } from 'framer-motion'
import { Trophy, Clock, BookOpen, Star } from 'lucide-react'

interface ProgressData {
  collected: number
  total: number
  countdown: number
  chapter: string
  rank: string
}

const defaultData: ProgressData = {
  collected: 12,
  total: 105,
  countdown: 372,
  chapter: 'Chapter 2 — The Hollow Gate',
  rank: 'Seeker I',
}

export default function ProgressPanel({ data = defaultData }: { data?: ProgressData }) {
  const progress = (data.collected / data.total) * 100

  return (
    <section className="relative w-full overflow-hidden rounded-[28px] border border-red-950/35 bg-[linear-gradient(145deg,rgba(14,7,7,0.9)_0%,rgba(6,6,8,0.96)_100%)] p-5 shadow-[0_22px_52px_rgba(0,0,0,0.5)] md:rounded-[32px] md:p-8">
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 bg-red-900/20 blur-[110px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

      <div className="relative z-10 flex flex-col gap-7 md:flex-row md:flex-wrap md:items-start md:justify-between xl:flex-nowrap">
        {/* Left — main progress */}
        <div className="min-w-0 flex-[1_1_480px]">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold shadow-[0_0_18px_rgba(197,160,89,0.2)]">
              <Trophy size={18} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white md:text-2xl">
                Misi Penyelamatan
              </h3>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                Nekrovia — {data.chapter}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300">
              <span>Legions Collected</span>
              <span className="text-accent">
                {data.collected} / {data.total} Entitas
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full border border-red-950/50 bg-black/40">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full rounded-full bg-[linear-gradient(90deg,#ff0000,#ff4d4d)] shadow-[0_0_14px_rgba(255,0,0,0.6)]"
              />
            </div>
            <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
              <span>{progress.toFixed(1)}% selesai</span>
              <span>{data.total - data.collected} tersisa</span>
            </div>
          </div>

          {/* Urgency alert */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-5 flex items-center gap-2 rounded-xl border border-red-950/40 bg-red-950/20 px-4 py-2.5"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent flex-shrink-0" />
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-400/80">
              Ritual kebangkitan berjalan. Kumpulkan{' '}
              <span className="text-accent">{data.total - data.collected} Legion</span> lagi sebelum terlambat.
            </p>
          </motion.div>
        </div>

        {/* Right — stat cards */}
        <div className="flex w-full flex-wrap gap-3 md:w-auto md:min-w-[200px] md:flex-col md:items-end">
          {/* Countdown */}
          <div className="flex-1 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 md:w-full md:flex-none md:text-right">
            <div className="flex items-center gap-2 md:justify-end">
              <Clock size={12} className="text-zinc-500" />
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-zinc-500">Countdown</p>
            </div>
            <p className="mt-1 text-2xl font-black uppercase tracking-[0.12em] text-accent">{data.countdown}</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">hari tersisa</p>
          </div>

          {/* Rank */}
          <div className="flex-1 rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 md:w-full md:flex-none md:text-right">
            <div className="flex items-center gap-2 md:justify-end">
              <Star size={12} className="text-gold" />
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-zinc-500">Collector Rank</p>
            </div>
            <p className="mt-1 text-lg font-black uppercase tracking-[0.12em] text-gold">{data.rank}</p>
          </div>

          {/* Chapter */}
          <div className="w-full rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 md:text-right">
            <div className="flex items-center gap-2 md:justify-end">
              <BookOpen size={12} className="text-zinc-500" />
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-zinc-500">Chapter Aktif</p>
            </div>
            <p className="mt-1 text-[11px] font-black uppercase tracking-[0.1em] text-white">{data.chapter}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
