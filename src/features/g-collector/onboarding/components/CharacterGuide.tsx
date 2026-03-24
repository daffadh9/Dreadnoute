'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function CharacterGuide() {
  return (
    <motion.div
      className="relative select-none pointer-events-none"
      style={{ width: 220, height: '74vh', maxHeight: 580, minHeight: 420 }}
      initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
      animate={{ opacity: 0.93, x: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Floating animation wrapper */}
      <motion.div
        className="relative w-full h-full"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Ambient red glow behind figure */}
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-48 h-72 bg-red-950/30 blur-3xl rounded-full" />
        <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-24 h-48 bg-red-900/15 blur-2xl rounded-full" />

        {/* Character image */}
        <div className="relative w-full h-full">
          <Image
            src="/images/guide-character/Veyira.png"
            alt="Veyira — The Watcher of Nekrovia"
            fill
            className="object-contain object-bottom drop-shadow-[0_0_50px_rgba(180,0,0,0.35)]"
            priority
          />
        </div>

        {/* Eye glow overlay — pulsing red light at top area of character */}
        <motion.div
          className="absolute top-[14%] left-1/2 -translate-x-1/2 w-8 h-4"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-full h-full bg-red-600/40 rounded-full blur-md" />
        </motion.div>

        {/* Ground mist */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/70 via-red-950/10 to-transparent blur-sm" />
      </motion.div>

      {/* Name label */}
      <motion.div
        className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <p className="text-[8px] font-black tracking-[0.45em] text-red-900/50 uppercase whitespace-nowrap">
          — Veyira —
        </p>
      </motion.div>
    </motion.div>
  )
}
