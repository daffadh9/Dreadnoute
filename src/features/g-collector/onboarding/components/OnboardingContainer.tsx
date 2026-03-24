'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useOnboarding } from '../hooks/useOnboarding'
import OnboardingScene from './OnboardingScene'
import CharacterGuide from './CharacterGuide'
import DialogueBubble from './DialogueBubble'
import ProgressDots from './ProgressDots'
import ActionButton from './ActionButton'

export default function OnboardingContainer() {
  const { step, current, next, complete, isLast, isVisible, isLoading, totalSteps } =
    useOnboarding()

  // Don't render anything during SSR / loading check
  if (isLoading) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeIn' } }}
          transition={{ duration: 0.6 }}
        >
          {/* ── ATMOSPHERIC BACKGROUND ── */}
          <OnboardingScene />

          {/* ── SKIP BUTTON ── */}
          <motion.button
            className="absolute top-6 right-6 z-10 text-[9px] font-black tracking-[0.3em] text-zinc-700 uppercase hover:text-red-800 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={complete}
          >
            Lewati
          </motion.button>

          {/* ── STEP BADGE ── */}
          <motion.div
            className="absolute top-6 left-1/2 -translate-x-1/2 z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <p className="text-[8px] font-black tracking-[0.5em] text-red-950/60 uppercase">
              Inisiasi Ritual · {step + 1}/{totalSteps}
            </p>
          </motion.div>

          {/* ── MAIN LAYOUT ── */}
          <div className="relative z-10 flex h-full w-full items-end">
            {/* LEFT — Veyira Character */}
            <div className="hidden sm:flex shrink-0 items-end pb-12 pl-6 md:pl-10">
              <CharacterGuide />
            </div>

            {/* CENTER/RIGHT — Dialogue + Controls */}
            <div className="flex flex-1 flex-col items-center justify-end gap-6 pb-14 px-6 md:px-10 lg:pr-16">
              {/* Dialogue bubble */}
              <div className="w-full flex justify-center sm:justify-start max-w-[500px]">
                <DialogueBubble
                  key={step}
                  stepKey={step}
                  text={current.text}
                  subtext={current.subtext}
                />
              </div>

              {/* Controls row */}
              <div className="flex flex-col items-center gap-4 w-full max-w-[500px]">
                <ProgressDots total={totalSteps} current={step} />
                <ActionButton
                  label={current.buttonLabel}
                  isLast={isLast}
                  onClick={isLast ? complete : next}
                />
              </div>
            </div>
          </div>

          {/* ── TOP VIGNETTE line decoration ── */}
          <div className="absolute top-0 inset-x-0 flex justify-center pt-0">
            <div className="w-px h-12 bg-gradient-to-b from-red-900/30 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
