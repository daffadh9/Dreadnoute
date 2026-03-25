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

// Orchestrated timing — each value is the delay in seconds from scene mount
const T = {
  eyebrow: 0.25,
  phrase1: 0.55,
  phrase2: 0.78,
  description: 1.15,
  dots: 1.45,
  cta: 1.75,
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Eyebrow — word-by-word stagger, barely perceptible but ritualistic
function AnimatedEyebrow({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <p className="overflow-hidden text-[9px] font-semibold tracking-[0.52em] text-[#c87060]/88 uppercase">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ marginRight: i < words.length - 1 ? '0.4em' : 0 }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, delay: T.eyebrow + i * 0.085, ease: EASE }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
}

// Headline — phrase-by-phrase reveal, emerging from fog
function AnimatedHeadline({ phrases }: { phrases: [string, string] }) {
  const delays = [T.phrase1, T.phrase2]
  return (
    <h1 className="font-playfair text-[30px] leading-[1.16] text-[#f5ede2] sm:text-[38px] lg:text-[44px]">
      {phrases.map((phrase, i) => (
        <motion.span
          key={i}
          className="block"
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.78, delay: delays[i], ease: EASE }}
        >
          {phrase}
        </motion.span>
      ))}
    </h1>
  )
}

// Description — block fade, readable first
function AnimatedDescription({ text, className }: { text: string; className?: string }) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.82, delay: T.description, ease: EASE }}
    >
      {text}
    </motion.p>
  )
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

          {/* All narrative content — keyed by scene so every element re-animates */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="relative"
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)', transition: { duration: 0.36 } }}
            >
              <div className="space-y-4 md:space-y-5">
                <AnimatedEyebrow text={current.eyebrow} />
                <AnimatedHeadline phrases={current.headlinePhrases} />
                <AnimatedDescription
                  text={current.description}
                  className="max-w-[42ch] text-[13px] leading-[1.9] text-[#d9c4a8]/90 sm:text-[14px]"
                />
              </div>

              {/* Step progress */}
              <motion.div
                className="relative mt-7"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.38, delay: T.dots, ease: EASE }}
              >
                <StepDots total={totalSteps} current={step} />
              </motion.div>

              {/* CTA — last to appear, like an invitation */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: T.cta, ease: EASE }}
              >
                <OnboardingActions primaryLabel={current.primaryCta} onPrimary={onPrimary} onSkip={onSkip} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
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
                transition={{ duration: 0.48, ease: EASE }}
              >
                <p className="text-[9px] font-semibold tracking-[0.48em] text-[#c87060]/82 uppercase">
                  {current.eyebrow}
                </p>
                <h1 className="font-playfair text-[26px] leading-[1.18] text-[#f5ede2]">
                  {current.headlinePhrases[0]}{' '}
                  <span className="block">{current.headlinePhrases[1]}</span>
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
