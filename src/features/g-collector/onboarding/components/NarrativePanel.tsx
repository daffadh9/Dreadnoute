'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { OnboardingStep } from '../types/onboarding.types'
import { SCENE_CONFIGS } from '../data/sceneConfig'
import StepDots from './StepDots'
import OnboardingActions from './OnboardingActions'

interface NarrativePanelProps {
  step: number
  totalSteps: number
  current: OnboardingStep
  onPrimary: () => void
  onSkip: () => void
}

// Per-scene text placement — ensures text floats in the "safe" readable zone
// and never competes with Veyira's position in the scene
const TEXT_AREA_CLASSES: Record<string, string> = {
  'top-right': 'items-start justify-end pt-20 pb-10 md:pt-24',
  'upper-right': 'items-start justify-end pt-16 pb-10 md:pt-20',
  'center-right': 'items-center justify-end pb-16 pt-16 md:pb-12',
}

export default function NarrativePanel({
  step,
  totalSteps,
  current,
  onPrimary,
  onSkip,
}: NarrativePanelProps) {
  const config = SCENE_CONFIGS[step] ?? SCENE_CONFIGS[0]
  const positionClass = TEXT_AREA_CLASSES[config.textArea] ?? TEXT_AREA_CLASSES['center-right']

  return (
    <>
      {/* ── Desktop: floating text block — right area of the cinematic canvas ── */}
      <section
        className={`relative z-30 hidden h-full w-full px-8 md:flex md:px-12 lg:px-16 ${positionClass}`}
      >
        <div className="relative w-full max-w-[480px] lg:max-w-[520px]">
          {/* Soft atmospheric backing — not a card, just a glow that aids readability */}
          <div className="pointer-events-none absolute inset-[-18%] bg-[radial-gradient(ellipse_at_left_center,rgba(18,6,6,0.78)_0%,rgba(6,3,3,0.44)_46%,rgba(2,2,2,0)_82%)] blur-2xl" />

          {/* Top accent line — thin ritual mark */}
          <motion.div
            className="mb-5 h-px w-10 bg-gradient-to-r from-[#c13030]/0 via-[#c13030]/72 to-[#c13030]/0"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="relative space-y-4 md:space-y-5"
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, filter: 'blur(4px)' }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Eyebrow — scene label */}
              <motion.p
                className="text-[9px] font-semibold tracking-[0.52em] text-[#c87060]/88 uppercase"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.38, delay: 0.06 }}
              >
                {current.eyebrow}
              </motion.p>

              {/* Title */}
              <motion.h1
                className="font-playfair text-[30px] leading-[1.16] text-[#f5ede2] sm:text-[38px] lg:text-[44px]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.44, delay: 0.12 }}
              >
                {current.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                className="max-w-[42ch] text-[13px] leading-[1.9] text-[#d9c4a8]/90 sm:text-[14px]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: 0.18 }}
              >
                {current.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Step progress */}
          <motion.div
            className="relative mt-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.34, delay: 0.28 }}
          >
            <StepDots total={totalSteps} current={step} />
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.44, delay: 0.34 }}
          >
            <OnboardingActions primaryLabel={current.primaryCta} onPrimary={onPrimary} onSkip={onSkip} />
          </motion.div>
        </div>
      </section>

      {/* ── Mobile: anchored bottom bar ── */}
      <div className="fixed inset-0 z-30 flex flex-col justify-between md:hidden">
        {/* Text block — top section */}
        <section className="px-5 pt-16">
          <div className="relative">
            <div className="pointer-events-none absolute inset-[-24%] bg-[radial-gradient(ellipse_at_center,rgba(12,4,4,0.72)_0%,rgba(4,2,2,0.36)_52%,transparent_82%)] blur-xl" />

            {/* Accent line */}
            <motion.div
              className="mb-4 h-px w-8 bg-gradient-to-r from-[#c13030]/0 via-[#c13030]/68 to-[#c13030]/0"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={`m-${current.id}`}
                className="relative space-y-3"
                initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[9px] font-semibold tracking-[0.48em] text-[#c87060]/82 uppercase">
                  {current.eyebrow}
                </p>
                <h1 className="font-playfair text-[26px] leading-[1.18] text-[#f5ede2]">
                  {current.title}
                </h1>
                <p className="max-w-[38ch] text-[12px] leading-[1.88] text-[#d9c4a8]/88">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Bottom bar — progress + CTA */}
        <motion.div
          className="mx-4 mb-6 rounded-2xl border border-[#4a2020]/40 bg-[rgba(4,2,2,0.72)] px-4 py-3 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
        >
          <div className="mb-3">
            <StepDots total={totalSteps} current={step} />
          </div>
          <OnboardingActions mobile primaryLabel={current.primaryCta} onPrimary={onPrimary} onSkip={onSkip} />
        </motion.div>
      </div>
    </>
  )
}
