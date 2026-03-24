'use client'

import { motion } from 'framer-motion'

interface StepDotsProps {
  total: number
  current: number
}

export default function StepDots({ total, current }: StepDotsProps) {
  return (
    <div
      className="flex items-center gap-2.5"
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
                    width: 22,
                    height: 5,
                    opacity: 1,
                    backgroundColor: 'rgba(228,68,68,0.95)',
                    boxShadow: '0 0 14px rgba(228,68,68,0.66)',
                  }
                : isPassed
                  ? {
                      width: 7,
                      height: 7,
                      opacity: 0.72,
                      backgroundColor: 'rgba(162,65,65,0.74)',
                      boxShadow: 'none',
                    }
                  : {
                      width: 6,
                      height: 6,
                      opacity: 0.4,
                      backgroundColor: 'rgba(110,86,74,0.5)',
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
