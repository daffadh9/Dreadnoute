'use client'

import { motion } from 'framer-motion'

interface OnboardingActionsProps {
  primaryLabel: string
  onPrimary: () => void
  onSkip: () => void
  mobile?: boolean
}

export default function OnboardingActions({
  primaryLabel,
  onPrimary,
  onSkip,
  mobile = false,
}: OnboardingActionsProps) {
  return (
    <div
      className={
        mobile
          ? 'flex items-center justify-between gap-4 rounded-full border border-[#5b332f]/35 bg-black/45 px-3 py-2 backdrop-blur-sm'
          : 'flex items-center gap-5'
      }
    >
      <motion.button
        type="button"
        onClick={onPrimary}
        className="group relative overflow-hidden rounded-full border border-[#8a2f2f] bg-[linear-gradient(135deg,#4d1111,#801b1b,#c12929)] px-6 py-2.5 text-[11px] font-semibold tracking-[0.24em] text-[#fff6ea] uppercase shadow-[0_0_22px_rgba(190,42,42,0.42)]"
        whileHover={{
          scale: 1.02,
          boxShadow: '0 0 30px rgba(190,42,42,0.5)',
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative z-10">{primaryLabel}</span>
      </motion.button>

      <button
        type="button"
        onClick={onSkip}
        className="text-[10px] tracking-[0.3em] text-[#bcad97]/70 uppercase transition-colors hover:text-[#f3e2cd]"
      >
        Lewati
      </button>
    </div>
  )
}
