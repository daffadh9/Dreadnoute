'use client'

import { motion } from 'framer-motion'

interface StepDotsProps {
  total: number
  current: number
}

export default function StepDots({ total, current }: StepDotsProps) {
  return (
    <div
      className="flex items-center gap-2"
      aria-label={`Tahap onboarding ${current + 1} dari ${total}`}
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current
        const isPassed = index < current

        return (
          <motion.span
            key={index}
            className="rounded-full"
            animate={
              isActive
                ? {
                    width: 24,
                    height: 6,
                    opacity: 1,
                    backgroundColor: 'rgba(225,53,53,0.95)',
                    boxShadow: '0 0 10px rgba(225,53,53,0.55)',
                  }
                : isPassed
                  ? {
                      width: 7,
                      height: 7,
                      opacity: 0.75,
                      backgroundColor: 'rgba(161,58,58,0.75)',
                      boxShadow: 'none',
                    }
                  : {
                      width: 7,
                      height: 7,
                      opacity: 0.45,
                      backgroundColor: 'rgba(113,95,80,0.55)',
                      boxShadow: 'none',
                    }
            }
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}
