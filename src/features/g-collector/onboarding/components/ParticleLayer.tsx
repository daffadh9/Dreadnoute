'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface AshParticle {
  size: number
  left: number
  bottom: number
  rise: number
  drift: number
  duration: number
  delay: number
}

function createAshParticles(): AshParticle[] {
  return Array.from({ length: 28 }).map((_, index) => ({
    size: 1 + (index % 4) * 0.8,
    left: 3 + ((index * 11) % 95),
    bottom: 4 + ((index * 7) % 52),
    rise: 35 + (index % 5) * 26,
    drift: (index % 2 === 0 ? 1 : -1) * (5 + (index % 4) * 3),
    duration: 6.5 + (index % 6) * 1.2,
    delay: (index % 10) * 0.45,
  }))
}

export default function ParticleLayer() {
  const particles = useMemo(() => createAshParticles(), [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-[#b62323]/55"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            bottom: `${particle.bottom}%`,
            filter: 'blur(0.8px)',
          }}
          animate={{
            y: [0, -particle.rise, -(particle.rise + 22)],
            x: [0, particle.drift, particle.drift * 0.4],
            opacity: [0, 0.55, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
