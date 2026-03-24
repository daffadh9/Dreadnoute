export interface OnboardingStep {
  id: number
  eyebrow: string
  title: string
  description: string
  primaryCta: string
}

export interface UseOnboardingReturn {
  step: number
  current: OnboardingStep
  next: () => void
  complete: () => void
  isLast: boolean
  isVisible: boolean
  totalSteps: number
}
