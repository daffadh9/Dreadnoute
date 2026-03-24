'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function VeyiraStage() {
  return (
    <div className="pointer-events-none absolute inset-0 md:relative md:w-[52%]">
      <motion.div
        className="absolute bottom-0 left-1/2 h-[72vh] w-[min(84vw,520px)] -translate-x-1/2 opacity-[0.88] md:left-6 md:w-[min(44vw,640px)] md:translate-x-0 md:opacity-[0.95]"
        initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
        animate={{ opacity: 0.95, x: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute bottom-[7%] left-1/2 h-[46%] w-[56%] -translate-x-1/2 rounded-full bg-[#7c1010]/28 blur-[70px]" />
          <div className="absolute bottom-[18%] left-[42%] h-[30%] w-[26%] rounded-full bg-[#991f1f]/18 blur-[46px]" />

          <Image
            src="/images/guide-character/Veyira.png"
            alt="Veyira"
            fill
            priority
            className="object-contain object-bottom drop-shadow-[0_20px_80px_rgba(126,20,20,0.55)] [mask-image:linear-gradient(to_bottom,black_68%,transparent_100%)]"
          />

          <motion.div
            className="absolute left-[50.5%] top-[19%] h-4 w-10 -translate-x-1/2 rounded-full bg-red-600/40 blur-md"
            animate={{ opacity: [0.45, 0.9, 0.45] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute left-[44.5%] top-[54%] h-16 w-16 rounded-full bg-red-700/25 blur-2xl"
            animate={{ opacity: [0.15, 0.42, 0.15] }}
            transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
