'use client'

import { useState, useEffect } from 'react'
import { onboardingSteps } from '../data/onboardingSteps'
import type { UseOnboardingReturn } from '../types/onboarding.types'

const STORAGE_KEY = 'hasCompletedGCollectorOnboarding'
const LEGACY_STORAGE_KEY = 'dreadnoute_gcollector_onboarding_v1'

export function useOnboarding(): UseOnboardingReturn {
  const [step, setStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    try {
      const completed = localStorage.getItem(STORAGE_KEY) === 'true'
      const legacyCompleted = localStorage.getItem(LEGACY_STORAGE_KEY) === 'true'

      if (!completed) {
        // Keep backwards compatibility for users that finished the old flow.
        if (!legacyCompleted) {
          // Small delay so the page hydrates first, then overlay fades in.
          timer = setTimeout(() => setIsVisible(true), 300)
        }
      }
    } catch {
      // localStorage might be unavailable in some environments.
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [])

  const next = () => {
    setStep((prev) => Math.min(prev + 1, onboardingSteps.length - 1))
  }

  const complete = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
      localStorage.setItem(LEGACY_STORAGE_KEY, 'true')
    } catch {
      // Fail silently.
    }
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
