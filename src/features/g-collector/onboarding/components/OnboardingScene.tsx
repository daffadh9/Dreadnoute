'use client'

import { motion } from 'framer-motion'
import FogLayer from './FogLayer'
import ParticleLayer from './ParticleLayer'
import RitualSigilLayer from './RitualSigilLayer'

export default function OnboardingScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(124deg,#010101_0%,#060304_38%,#0f0708_64%,#030202_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_24%_70%,rgba(116,13,13,0.27)_0%,rgba(19,8,8,0.42)_36%,rgba(4,3,3,0.95)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_76%_16%,rgba(97,26,26,0.18)_0%,rgba(11,7,7,0)_48%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(36,9,9,0.72)_0%,rgba(10,5,5,0.62)_34%,rgba(5,4,4,0.95)_70%,rgba(2,2,2,1)_100%)]" />

      <FogLayer />
      <RitualSigilLayer />
      <ParticleLayer />

      <motion.div
        className="absolute left-[6%] top-[44%] h-[35%] w-[48%] rounded-[50%] bg-[radial-gradient(circle,rgba(156,23,23,0.21)_0%,rgba(19,8,8,0)_70%)] blur-[70px]"
        animate={{ x: [0, 34, 0], opacity: [0.22, 0.4, 0.22] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-14%] top-[8%] h-[56%] w-[64%] rounded-[50%] bg-[radial-gradient(circle,rgba(94,41,31,0.17)_0%,rgba(8,8,8,0)_70%)] blur-[64px]"
        animate={{ x: [0, -28, 0], opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_24%,rgba(0,0,0,0.86)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/90 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/92 to-transparent" />

      <motion.div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.26) 0px, rgba(255,255,255,0.26) 1px, transparent 1px, transparent 3px)',
          backgroundSize: '100% 3px',
        }}
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
