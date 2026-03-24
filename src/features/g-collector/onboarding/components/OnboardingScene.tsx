'use client'

import { motion } from 'framer-motion'

export default function OnboardingScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base black */}
      <div className="absolute inset-0 bg-[#010101]" />

      {/* Deep red radial glow — bottom left (character area) */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[600px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(120,0,0,0.18)_0%,transparent_70%)]" />

      {/* Subtle center vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />

      {/* Top dark overlay */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent" />

      {/* Bottom fog */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/90 to-transparent" />

      {/* Animated floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-red-900/30"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 40}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -(80 + Math.random() * 120)],
            opacity: [0, 0.6, 0],
            x: [0, (Math.random() - 0.5) * 40],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Scan line texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
          backgroundSize: '100% 3px',
        }}
      />
    </div>
  )
}
