'use client'

import { motion } from 'framer-motion'

// Background fog — sits BEHIND Veyira, part of the environment
// This layer establishes the atmospheric depth of the scene
export default function FogLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Left-bottom deep fog mass */}
      <motion.div
        className="absolute -bottom-[28%] -left-[24%] h-[80%] w-[90%] rounded-[50%] bg-[radial-gradient(circle,rgba(108,12,12,0.22)_0%,rgba(12,6,6,0)_70%)] blur-[66px]"
        animate={{ x: [0, 52, 0], y: [0, -14, 0], opacity: [0.38, 0.62, 0.38] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Right-bottom secondary fog mass */}
      <motion.div
        className="absolute -bottom-[12%] -right-[18%] h-[58%] w-[72%] rounded-[50%] bg-[radial-gradient(circle,rgba(76,36,28,0.22)_0%,rgba(10,7,7,0)_76%)] blur-[58px]"
        animate={{ x: [0, -38, 0], y: [0, 16, 0], opacity: [0.2, 0.44, 0.2] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Upper haze — soft atmospheric depth */}
      <motion.div
        className="absolute -left-[10%] top-[6%] h-[40%] w-[54%] rounded-[50%] bg-[radial-gradient(circle,rgba(114,16,16,0.14)_0%,rgba(8,5,5,0)_68%)] blur-[50px]"
        animate={{ x: [0, 28, 0], y: [0, -10, 0], opacity: [0.14, 0.32, 0.14] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Center mid-depth haze — adds volumetric feel */}
      <motion.div
        className="absolute left-[18%] top-[38%] h-[32%] w-[48%] rounded-[50%] bg-[radial-gradient(circle,rgba(90,18,18,0.12)_0%,rgba(6,4,4,0)_72%)] blur-[62px]"
        animate={{ x: [0, 16, 0], y: [0, 8, 0], opacity: [0.1, 0.24, 0.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
    </div>
  )
}
