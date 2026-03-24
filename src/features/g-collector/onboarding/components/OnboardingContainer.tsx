'use client'

import { AnimatePresence } from 'framer-motion'
import { useOnboarding } from '../hooks/useOnboarding'
import OnboardingExperience from './OnboardingExperience'

export default function OnboardingContainer() {
  const { step, current, next, complete, isLast, isVisible, totalSteps } = useOnboarding()

  return (
    <AnimatePresence>
      {isVisible && (
        <OnboardingExperience
          step={step}
          totalSteps={totalSteps}
          current={current}
          isLast={isLast}
          next={next}
          complete={complete}
        />
      )}
    </AnimatePresence>
  )
}
