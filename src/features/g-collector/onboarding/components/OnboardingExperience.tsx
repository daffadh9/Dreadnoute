'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { OnboardingStep } from '../types/onboarding.types'
import OnboardingScene from './OnboardingScene'
import VeyiraStage from './VeyiraStage'
import NarrativePanel from './NarrativePanel'

interface OnboardingExperienceProps {
  step: number
  totalSteps: number
  current: OnboardingStep
  isLast: boolean
  next: () => void
  complete: () => void
}

export default function OnboardingExperience({
  step,
  totalSteps,
  current,
  isLast,
  next,
  complete,
}: OnboardingExperienceProps) {
  const handlePrimary = () => {
    if (isLast) {
      complete()
      return
    }
    next()
  }

  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
      transition={{ duration: 0.55 }}
    >
      <OnboardingScene />

      <AnimatePresence mode="wait">
        <motion.div
          key={`veil-${step}`}
          className="pointer-events-none absolute inset-0 z-[16] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.08)_42%,transparent_80%)]"
          initial={{ opacity: 0.34 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0.22 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      <div className="relative z-10 h-full">
        <VeyiraStage />
        <NarrativePanel
          step={step}
          totalSteps={totalSteps}
          current={current}
          onPrimary={handlePrimary}
          onSkip={complete}
        />
      </div>
    </motion.div>
  )
}
