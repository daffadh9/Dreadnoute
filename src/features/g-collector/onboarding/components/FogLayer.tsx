'use client'

import { motion } from 'framer-motion'

export default function FogLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -left-[30%] -bottom-[32%] h-[84%] w-[95%] rounded-[50%] bg-[radial-gradient(circle,rgba(112,14,14,0.25)_0%,rgba(14,7,7,0)_72%)] blur-[62px]"
        animate={{ x: [0, 58, 0], y: [0, -16, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-[20%] -bottom-[16%] h-[62%] w-[78%] rounded-[50%] bg-[radial-gradient(circle,rgba(83,41,31,0.24)_0%,rgba(11,8,8,0)_78%)] blur-[54px]"
        animate={{ x: [0, -44, 0], y: [0, 18, 0], opacity: [0.22, 0.5, 0.22] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-[12%] top-[8%] h-[42%] w-[58%] rounded-[50%] bg-[radial-gradient(circle,rgba(121,17,17,0.18)_0%,rgba(10,6,6,0)_70%)] blur-[46px]"
        animate={{ x: [0, 32, 0], y: [0, -12, 0], opacity: [0.16, 0.38, 0.16] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
