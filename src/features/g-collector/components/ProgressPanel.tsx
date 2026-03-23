'use client'

import { motion } from 'framer-motion'

interface ProgressData {
  collected: number
  total: number
  countdown: number
  chapter: string
  rank: string
}

interface ProgressPanelProps {
  data?: ProgressData
}

const defaultData: ProgressData = {
  collected: 12,
  total: 105,
  countdown: 372,
  chapter: 'Chapter 2 — The Hollow Gate',
  rank: 'Seeker I',
}

const statVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

export default function ProgressPanel({ data = defaultData }: ProgressPanelProps) {
  const progress = (data.collected / data.total) * 100

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-2xl border border-white/5 bg-[#0f0f11] overflow-hidden p-6 md:p-8"
      >
        {/* Subtle red glow top-left */}
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-red-900/15 blur-[60px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-cinzel text-base font-semibold text-white/90 tracking-wider">
              Misi Penyelamatan
            </h2>
            <p className="text-xs text-white/30 mt-0.5 tracking-wide">Nekrovia — {data.chapter}</p>
          </div>
          <span className="px-3 py-1 rounded-full border border-red-900/40 bg-red-950/20 text-red-400 text-xs font-medium tracking-widest uppercase">
            {data.rank}
          </span>
        </div>

        {/* Legion Progress Bar */}
        <div className="mb-8">
          <div className="flex items-end justify-between mb-2">
            <span className="text-xs text-white/40 tracking-widest uppercase">Legions Collected</span>
            <div className="flex items-baseline gap-1">
              <span className="font-cinzel text-3xl font-bold text-white">{data.collected}</span>
              <span className="text-white/30 text-sm">/ {data.total}</span>
            </div>
          </div>

          {/* Bar track */}
          <div className="relative h-2 w-full rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-red-800 to-red-500"
            />
            {/* Shimmer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '400%' }}
              transition={{ duration: 2.5, delay: 1.5, repeat: Infinity, repeatDelay: 4 }}
              className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
          </div>

          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-white/20">{progress.toFixed(1)}% selesai</span>
            <span className="text-xs text-white/20">{data.total - data.collected} tersisa</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* Countdown */}
          <motion.div
            custom={0}
            variants={statVariants}
            initial="hidden"
            animate="visible"
            className="relative rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center overflow-hidden group"
          >
            <div className="absolute inset-0 bg-red-950/0 group-hover:bg-red-950/20 transition-colors duration-300 rounded-xl" />
            <div className="relative">
              <span className="block text-xs text-white/30 uppercase tracking-widest mb-2">Countdown</span>
              <span className="block font-cinzel text-2xl font-bold text-red-400">{data.countdown}</span>
              <span className="block text-xs text-white/25 mt-1">hari tersisa</span>
            </div>
          </motion.div>

          {/* Chapter */}
          <motion.div
            custom={1}
            variants={statVariants}
            initial="hidden"
            animate="visible"
            className="relative rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center overflow-hidden group col-span-2"
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-300 rounded-xl" />
            <div className="relative">
              <span className="block text-xs text-white/30 uppercase tracking-widest mb-2">Chapter Aktif</span>
              <span className="block font-cinzel text-sm font-semibold text-white/80 leading-snug">{data.chapter}</span>
              <span className="block text-xs text-white/25 mt-1">Story Progress</span>
            </div>
          </motion.div>
        </div>

        {/* Urgency hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-red-950/20 border border-red-900/20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
          <span className="text-xs text-red-400/70">
            Ritual kebangkitan berjalan. Kumpulkan <strong className="text-red-400">{data.total - data.collected} Legion</strong> lagi sebelum terlambat.
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
