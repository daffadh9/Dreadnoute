'use client'

import { useState } from 'react'
import { onboardingSteps } from '../data/onboardingSteps'
import type { UseOnboardingReturn } from '../types/onboarding.types'

export function useOnboarding(): UseOnboardingReturn {
  const [step, setStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const next = () => {
    setStep((prev) => Math.min(prev + 1, onboardingSteps.length - 1))
  }

  const complete = () => {
    setIsVisible(false)
  }

  const isLast = step === onboardingSteps.length - 1

  return {
    step,
    current: onboardingSteps[step],
    next,
    complete,
    isLast,
    isVisible,
    totalSteps: onboardingSteps.length,
  }
}
