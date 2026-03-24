'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface DialogueBubbleProps {
  text: string
  subtext: string
  stepKey: number
}

export default function DialogueBubble({ text, subtext, stepKey }: DialogueBubbleProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-[400px] w-full"
      >
        {/* Main bubble */}
        <div className="relative rounded-[20px] border border-red-950/40 bg-[linear-gradient(145deg,rgba(18,8,8,0.96),rgba(8,4,4,0.98))] backdrop-blur-md px-7 py-6 shadow-[0_24px_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,0,0,0.04)]">

          {/* Top shimmer line */}
          <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-red-900/40 to-transparent" />

          {/* Red corner accent */}
          <div className="absolute top-4 left-4 w-1 h-6 bg-gradient-to-b from-red-600/60 to-transparent rounded-full" />

          {/* Veyira label */}
          <p className="text-[8px] font-black tracking-[0.45em] text-red-800/60 uppercase mb-3 ml-3">
            Veyira
          </p>

          {/* Main text */}
          <h2 className="font-horror text-white text-2xl sm:text-3xl tracking-[0.08em] leading-tight mb-3 ml-3">
            {text}
          </h2>

          {/* Divider */}
          <div className="mx-3 mb-3 h-[1px] bg-gradient-to-r from-red-950/40 to-transparent" />

          {/* Subtext */}
          <p className="text-[12px] leading-relaxed text-zinc-500 ml-3 mr-2">
            {subtext}
          </p>

          {/* Bottom shimmer */}
          <div className="absolute bottom-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        </div>

        {/* Connector arrow (pointing left toward Veyira) */}
        <div
          className="absolute top-8 -left-3 w-0 h-0"
          style={{
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '12px solid rgba(40,8,8,0.97)',
          }}
        />
        <div
          className="absolute top-8 -left-[13px] w-0 h-0"
          style={{
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '12px solid rgba(120,0,0,0.25)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
