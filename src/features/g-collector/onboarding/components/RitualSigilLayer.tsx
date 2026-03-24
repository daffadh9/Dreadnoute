'use client'

import { motion } from 'framer-motion'

export default function RitualSigilLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute right-[14%] top-[18%] h-[42vw] w-[42vw] max-h-[460px] max-w-[460px] min-h-[240px] min-w-[240px] rounded-full opacity-[0.12]"
        style={{
          background:
            'conic-gradient(from 20deg, rgba(188,36,36,0.35), rgba(188,36,36,0.02), rgba(92,26,26,0.08), rgba(188,36,36,0.32))',
          WebkitMaskImage:
            'radial-gradient(circle, transparent 55%, black 58%, black 65%, transparent 68%)',
          maskImage:
            'radial-gradient(circle, transparent 55%, black 58%, black 65%, transparent 68%)',
          filter: 'blur(0.4px)',
        }}
        animate={{ rotate: [0, 360], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute right-[23%] top-[26%] h-[25vw] w-[25vw] max-h-[260px] max-w-[260px] min-h-[150px] min-w-[150px] rounded-full border border-[#6e2525]/25"
        animate={{ rotate: [0, -360], opacity: [0.14, 0.22, 0.14] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
