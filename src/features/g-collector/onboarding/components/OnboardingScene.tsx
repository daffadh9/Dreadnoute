'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { SCENE_CONFIGS } from '../data/sceneConfig'
import FogLayer from './FogLayer'
import ParticleLayer from './ParticleLayer'
import RitualSigilLayer from './RitualSigilLayer'

interface OnboardingSceneProps {
  step: number
}

export default function OnboardingScene({ step }: OnboardingSceneProps) {
  const config = SCENE_CONFIGS[step] ?? SCENE_CONFIGS[0]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* ── Background Image — cross-fades per scene ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`scene-bg-${step}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Slow ambient parallax drift on background */}
          <motion.div
            className="absolute inset-[-5%] h-[110%] w-[110%]"
            animate={{ x: [0, -22, 0], y: [0, -10, 0] }}
            transition={{ duration: 44, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src={config.bg}
              alt=""
              fill
              priority={step === 0}
              className="object-cover object-center"
              style={{
                filter: `brightness(${config.bgBrightness}) saturate(${config.bgSaturation}) contrast(1.04)`,
              }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ── Base dark color grade ── */}
      <div className="absolute inset-0 bg-[linear-gradient(154deg,rgba(2,1,1,0.28)_0%,rgba(6,3,3,0.10)_48%,rgba(3,2,2,0.36)_100%)]" />

      {/* ── Cold cinematic tone — blue-gray tint ── */}
      <div className="absolute inset-0 bg-[rgba(5,7,16,0.10)] mix-blend-color" />

      {/* ── Light source boost — lifts crushed mid-tones back to life ── */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_32%_22%,rgba(255,248,240,0.10),transparent_44%)]" />

      {/* ── Red void glow — left-bottom (where Veyira lives) ── */}
      <motion.div
        className="absolute -bottom-[8%] -left-[4%] h-[68%] w-[60%] rounded-[50%] bg-[radial-gradient(circle,rgba(136,16,16,0.26)_0%,rgba(12,6,6,0)_72%)] blur-[88px]"
        animate={{ x: [0, 38, 0], y: [0, -12, 0], opacity: [0.26, 0.44, 0.26] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Red void glow — top-right ── */}
      <motion.div
        className="absolute right-[-18%] top-[2%] h-[52%] w-[56%] rounded-[50%] bg-[radial-gradient(circle,rgba(88,22,22,0.18)_0%,rgba(8,8,8,0)_68%)] blur-[76px]"
        animate={{ x: [0, -28, 0], opacity: [0.16, 0.3, 0.16] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Background fog layer ── */}
      <FogLayer />

      {/* ── Ritual sigils — only in later scenes ── */}
      {config.sigilVisible && <RitualSigilLayer />}

      {/* ── Floating ash particles ── */}
      <ParticleLayer />

      {/* ── Edge vignette — cinematic framing ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_90%_at_50%_50%,transparent_28%,rgba(0,0,0,0.60)_100%)]" />

      {/* ── Top bar fade ── */}
      <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/68 to-transparent" />

      {/* ── Bottom ground fade ── */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/76 to-transparent" />

      {/* ── Left column fade — Veyira area bleeds into void ── */}
      <div className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-black/52 to-transparent" />

      {/* ── Film grain & scanlines ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 1px, transparent 1px, transparent 3px)',
          backgroundSize: '100% 3px',
        }}
        animate={{ opacity: [0.022, 0.054, 0.022] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
