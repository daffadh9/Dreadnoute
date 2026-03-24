'use client'

import { motion } from 'framer-motion'

interface ActionButtonProps {
  label: string
  isLast: boolean
  onClick: () => void
}

export default function ActionButton({ label, isLast, onClick }: ActionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl font-black text-[11px] tracking-[0.35em] uppercase text-white"
      style={{
        padding: '14px 36px',
        background: isLast
          ? 'linear-gradient(135deg,#cc0000,#ff1a1a,#cc0000)'
          : 'rgba(30,6,6,0.8)',
        border: isLast ? '1px solid rgba(255,50,50,0.5)' : '1px solid rgba(180,0,0,0.25)',
        boxShadow: isLast
          ? '0 0 28px rgba(255,0,0,0.4), 0 4px 20px rgba(0,0,0,0.6)'
          : '0 4px 16px rgba(0,0,0,0.5)',
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: isLast
          ? '0 0 40px rgba(255,0,0,0.6), 0 4px 24px rgba(0,0,0,0.6)'
          : '0 0 20px rgba(255,0,0,0.25), 0 4px 20px rgba(0,0,0,0.6)',
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      {/* Shine pass */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Pulsing glow for last step */}
      {isLast && (
        <motion.span
          className="absolute inset-0 rounded-xl"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'rgba(255,0,0,0.2)' }}
        />
      )}

      <span className="relative z-10">{label}</span>
    </motion.button>
  )
}
