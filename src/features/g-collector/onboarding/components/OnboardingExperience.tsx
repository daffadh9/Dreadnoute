'use client'

import { motion } from 'framer-motion'
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

      <div className="relative z-10 flex h-full flex-col md:flex-row">
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
