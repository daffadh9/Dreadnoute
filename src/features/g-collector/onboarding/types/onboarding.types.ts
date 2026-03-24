export type StepType = 'intro' | 'story' | 'objective' | 'guide' | 'action'

export interface OnboardingStep {
  id: number
  text: string
  subtext: string
  type: StepType
  buttonLabel: string
}

export interface UseOnboardingReturn {
  step: number
  current: OnboardingStep
  next: () => void
  complete: () => void
  isLast: boolean
  isVisible: boolean
  isLoading: boolean
  totalSteps: number
}
