'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface Particle {
  size: number
  left: number
  bottom: number
  drift: number
  duration: number
  delay: number
}

function createParticles(): Particle[] {
  return Array.from({ length: 16 }).map((_, index) => ({
    size: 1 + (index % 3),
    left: (index * 17) % 100,
    bottom: 8 + ((index * 13) % 36),
    drift: (index % 2 === 0 ? 1 : -1) * (8 + (index % 4) * 3),
    duration: 8 + (index % 5) * 1.8,
    delay: (index % 7) * 0.55,
  }))
}

export default function OnboardingScene() {
  const particles = useMemo(() => createParticles(), [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(130deg,#020202_0%,#090606_45%,#10090b_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_70%,rgba(119,17,17,0.26)_0%,transparent_48%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_20%,rgba(66,42,32,0.2)_0%,transparent_44%)]" />

      <motion.div
        className="absolute -bottom-[10%] -left-[10%] h-[58%] w-[80%] rounded-[50%] bg-[radial-gradient(circle,rgba(122,18,18,0.18)_0%,rgba(18,8,8,0)_72%)] blur-[48px]"
        animate={{ x: [0, 28, 0], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[4%] right-[-8%] h-[42%] w-[58%] rounded-[50%] bg-[radial-gradient(circle,rgba(100,80,67,0.16)_0%,rgba(8,8,8,0)_72%)] blur-[42px]"
        animate={{ x: [0, -24, 0], opacity: [0.24, 0.42, 0.24] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-[#9b1b1b]/50"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            bottom: `${particle.bottom}%`,
            filter: 'blur(0.6px)',
          }}
          animate={{
            y: [0, -80, -115],
            x: [0, particle.drift, particle.drift * 0.45],
            opacity: [0, 0.58, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(0,0,0,0.76)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/82 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/88 to-transparent" />
    </div>
  )
}
