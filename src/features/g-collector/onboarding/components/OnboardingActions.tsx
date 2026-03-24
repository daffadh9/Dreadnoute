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
          ? 'flex items-center justify-between gap-4 rounded-full border border-[#5b2a2a]/45 bg-[rgba(5,3,3,0.68)] px-3 py-2 backdrop-blur-sm'
          : 'flex items-center gap-5'
      }
    >
      <motion.button
        type="button"
        onClick={onPrimary}
        className="group relative overflow-hidden rounded-full border border-[#a43a3a] bg-[linear-gradient(135deg,#521010_0%,#8c1d1d_52%,#ca2a2a_100%)] px-7 py-2.5 text-[11px] font-semibold tracking-[0.26em] text-[#fff6ea] uppercase"
        animate={{
          boxShadow: [
            '0 0 18px rgba(196,40,40,0.34), 0 4px 14px rgba(0,0,0,0.55)',
            '0 0 32px rgba(196,40,40,0.56), 0 4px 22px rgba(0,0,0,0.62)',
            '0 0 18px rgba(196,40,40,0.34), 0 4px 14px rgba(0,0,0,0.55)',
          ],
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{
          scale: 1.02,
          boxShadow: '0 0 54px rgba(214,47,47,0.72), 0 8px 24px rgba(0,0,0,0.65)',
        }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          className="absolute -inset-[16%] rounded-full bg-red-600/18 blur-xl"
          animate={{ opacity: [0.2, 0.46, 0.2], scale: [0.96, 1.08, 0.96] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/22 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative z-10">{primaryLabel}</span>
      </motion.button>

      <button
        type="button"
        onClick={onSkip}
        className="text-[10px] tracking-[0.34em] text-[#bfae95]/72 uppercase transition-colors hover:text-[#f3e2cd]"
      >
        Lewati
      </button>
    </div>
  )
}
