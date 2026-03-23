'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Flame, Shield } from 'lucide-react'

interface HeroSectionProps {
  isNewUser?: boolean
}

export default function HeroSection({ isNewUser = true }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden rounded-[28px] border border-red-950/40 bg-[linear-gradient(145deg,rgba(20,4,4,0.97)_0%,rgba(6,6,8,1)_100%)] shadow-[0_34px_80px_-24px_rgba(180,0,0,0.35)] md:rounded-[32px]">
      {/* Radial glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 bg-red-900/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 bg-purple-900/10 blur-[100px]" />

      {/* Top shimmer line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-10 lg:p-12">
        {/* Left */}
        <div className="flex flex-col gap-5 md:max-w-xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex w-fit items-center gap-2 rounded-full border border-red-900/50 bg-red-950/30 px-3 py-1.5"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-red-400">
              Nekrovia Realm — 105 Legions
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-horror text-5xl tracking-[0.12em] text-white drop-shadow-[0_0_40px_rgba(255,0,0,0.25)] md:text-6xl lg:text-7xl"
          >
            G-COLLECTOR
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="max-w-sm text-[13px] font-semibold leading-relaxed text-zinc-400"
          >
            Kumpulkan <span className="font-black text-accent">105 Legions</span> sebelum ritual kebangkitan selesai.
            Waktu terus berjalan. Apakah kamu siap menjadi Vessel-nya?
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link href="/g-collector/ritual">
              <button className="flex items-center gap-2 rounded-xl border border-red-700/40 bg-accent px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-[0_0_20px_rgba(255,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(255,0,0,0.4)] active:scale-95">
                <Flame size={14} />
                {isNewUser ? 'Mulai Misi' : 'Lanjutkan Ritual'}
              </button>
            </Link>
            <Link href="/g-collector/collection">
              <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/40 hover:text-white active:scale-95">
                <Shield size={14} />
                Lihat Koleksi
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Right — ritual circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex items-center justify-center"
        >
          <div className="relative flex h-52 w-52 items-center justify-center lg:h-60 lg:w-60">
            <div className="absolute inset-0 rounded-full border border-red-900/30" />
            <div className="absolute inset-4 rounded-full border border-red-900/20" />
            <div className="absolute inset-8 rounded-full border border-red-900/15" />
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-red-800/40 bg-red-950/30 shadow-[0_0_60px_rgba(180,0,0,0.25)]">
              <span className="font-horror text-3xl tracking-widest text-red-400/80 drop-shadow-[0_0_20px_rgba(255,0,0,0.5)]">
                105
              </span>
            </div>
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-red-600/50"
                style={{
                  top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 94}px - 4px)`,
                  left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 94}px - 4px)`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.04] px-6 py-3 md:px-10">
        <p className="text-[9px] font-black uppercase tracking-[0.45em] text-zinc-700">
          — Seal the Covenant. Claim the Darkness. —
        </p>
      </div>
    </section>
  )
}
