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
    <section className="relative z-30 flex h-full w-full items-center justify-end px-6 pb-28 pt-20 md:px-12 md:pb-16 md:pt-16 lg:px-16">
      <div className="relative w-full max-w-[520px] md:mr-3 lg:mr-8">
        <div className="pointer-events-none absolute inset-[-14%] bg-[radial-gradient(ellipse_at_left_center,rgba(26,8,8,0.74)_0%,rgba(8,4,4,0.48)_42%,rgba(2,2,2,0)_82%)] blur-xl" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="relative space-y-5 md:space-y-6"
            initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -24, filter: 'blur(5px)' }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="text-[10px] font-semibold tracking-[0.46em] text-[#d07a67]/92 uppercase"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              {current.eyebrow}
            </motion.p>

            <motion.h1
              className="font-playfair text-[33px] leading-[1.18] text-[#f7efe4] sm:text-[42px] lg:text-[48px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              {current.title}
            </motion.h1>

            <motion.p
              className="max-w-[44ch] text-[14px] leading-8 text-[#dbc7ac]/95 sm:text-[15px] sm:leading-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
            >
              {current.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="relative mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.25 }}
        >
          <StepDots total={totalSteps} current={step} />
        </motion.div>

        <motion.div
          className="mt-6 hidden md:block"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.32 }}
        >
          <OnboardingActions primaryLabel={current.primaryCta} onPrimary={onPrimary} onSkip={onSkip} />
        </motion.div>
      </div>

      <motion.div
        className="fixed inset-x-0 bottom-6 z-40 px-5 md:hidden"
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
