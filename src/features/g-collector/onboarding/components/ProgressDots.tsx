'use client'

import { motion } from 'framer-motion'

interface ProgressDotsProps {
  total: number
  current: number
}

export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          animate={
            i === current
              ? {
                  width: 20,
                  height: 6,
                  backgroundColor: '#ff0000',
                  boxShadow: '0 0 8px rgba(255,0,0,0.7)',
                }
              : i < current
              ? {
                  width: 6,
                  height: 6,
                  backgroundColor: 'rgba(180,0,0,0.5)',
                  boxShadow: 'none',
                }
              : {
                  width: 6,
                  height: 6,
                  backgroundColor: 'rgba(80,20,20,0.4)',
                  boxShadow: 'none',
                }
          }
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
