'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface HeroSectionProps {
  isNewUser?: boolean
}

export default function HeroSection({ isNewUser = true }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[420px] flex items-center justify-center overflow-hidden rounded-2xl">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0000] via-[#0B0B0D] to-[#0B0B0D]" />

      {/* Red glow orb — top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-red-900/20 blur-[120px] pointer-events-none" />

      {/* Altar glow — bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] rounded-full bg-red-700/10 blur-[80px] pointer-events-none" />

      {/* Thin ritual circle decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[340px] h-[340px] rounded-full border border-red-900/20" />
        <div className="absolute w-[260px] h-[260px] rounded-full border border-red-900/10" />
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] rounded-2xl"
        style={{ backgroundImage: 'url(/assets/grain.png)', backgroundSize: '200px' }}
      />

      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 gap-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-900/40 bg-red-950/30 text-red-400/80 text-xs tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Nekrovia Realm — 105 Legions
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cinzel text-5xl md:text-6xl font-bold tracking-wider text-white"
          style={{ textShadow: '0 0 60px rgba(255,0,0,0.25), 0 0 120px rgba(255,0,0,0.1)' }}
        >
          G-Collector
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-md text-white/50 text-sm md:text-base leading-relaxed font-light"
        >
          Kumpulkan <span className="text-red-400 font-medium">105 Legions</span> sebelum ritual kebangkitan selesai.
          Waktu terus berjalan. Apakah kamu siap menjadi Vessel-nya?
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Link
            href="/g-collector/ritual"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-cinzel text-sm tracking-widest uppercase text-white overflow-hidden transition-all duration-300 hover:scale-105"
          >
            {/* Button background */}
            <span className="absolute inset-0 bg-gradient-to-r from-red-950 to-red-900 rounded-xl" />
            <span className="absolute inset-0 rounded-xl border border-red-700/50 group-hover:border-red-500/70 transition-colors duration-300" />
            <span className="absolute inset-0 rounded-xl bg-red-600/0 group-hover:bg-red-600/10 transition-all duration-300" />
            {/* Glow on hover */}
            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-red-700/30" />

            <span className="relative z-10 flex items-center gap-2.5">
              {/* Ritual icon */}
              <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.72 17.72l1.061 1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.72 6.28l1.061-1.061" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              {isNewUser ? 'Mulai Misi' : 'Lanjutkan Ritual'}
            </span>
          </Link>
        </motion.div>

        {/* Decorative bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xs text-white/20 tracking-[0.3em] uppercase mt-2"
        >
          — Seal the Covenant. Claim the Darkness. —
        </motion.p>
      </div>
    </section>
  )
}
