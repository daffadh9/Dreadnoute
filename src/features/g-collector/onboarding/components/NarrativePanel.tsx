'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { OnboardingStep } from '../types/onboarding.types'
import StepDots from './StepDots'
import OnboardingActions from './OnboardingActions'

interface NarrativePanelProps {
  step: number
  totalSteps: number
  current: OnboardingStep
  onPrimary: () => void
  onSkip: () => void
}

export default function NarrativePanel({
  step,
  totalSteps,
  current,
  onPrimary,
  onSkip,
}: NarrativePanelProps) {
  return (
    <section className="relative z-20 flex h-full w-full items-center justify-center px-6 pb-28 pt-16 md:w-[48%] md:justify-start md:px-8 md:pb-16 md:pt-10 lg:px-12">
      <div className="w-full max-w-[480px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="space-y-5"
            initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="text-[10px] font-medium tracking-[0.42em] text-[#b45f4c] uppercase"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              {current.eyebrow}
            </motion.p>

            <motion.h1
              className="font-playfair text-[31px] leading-[1.24] text-[#f7efe4] sm:text-[38px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              {current.title}
            </motion.h1>

            <motion.p
              className="max-w-[46ch] text-[14px] leading-8 text-[#d5c4ad]/95 sm:text-[15px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
            >
              {current.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.25 }}
        >
          <StepDots total={totalSteps} current={step} />
        </motion.div>

        <motion.div
          className="mt-5 hidden md:block"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.32 }}
        >
          <OnboardingActions primaryLabel={current.primaryCta} onPrimary={onPrimary} onSkip={onSkip} />
        </motion.div>
      </div>

      <motion.div
        className="fixed inset-x-0 bottom-6 z-30 px-5 md:hidden"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <OnboardingActions
          mobile
          primaryLabel={current.primaryCta}
          onPrimary={onPrimary}
          onSkip={onSkip}
        />
      </motion.div>
    </section>
  )
}
