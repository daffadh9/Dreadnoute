'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { SCENE_CONFIGS } from '../data/sceneConfig'

interface VeyiraStageProps {
  step: number
}

const FLOAT_VARIANTS = {
  'static-drift': {
    animate: { y: [0, -6, 0], x: [0, 2, 0] },
    duration: 9.8,
  },
  'gentle-float': {
    animate: { y: [0, -10, 0], x: [0, 3, 0], rotate: [0, 0.3, 0] },
    duration: 7.6,
  },
  'full-float': {
    animate: { y: [0, -14, 0], x: [0, 4, 0], rotate: [0, 0.55, 0] },
    duration: 6.6,
  },
}

export default function VeyiraStage({ step }: VeyiraStageProps) {
  const config = SCENE_CONFIGS[step] ?? SCENE_CONFIGS[0]
  const { veyira, fog } = config

  const float = FLOAT_VARIANTS[veyira.animationType]

  // Mask: soft radial fade + strong bottom dissolve into fog
  // The mask makes the character feel emergent from environment, not pasted on top
  const maskImage = [
    `radial-gradient(${veyira.maskRadius} at 44% 48%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 38%, rgba(0,0,0,0.3) 62%, transparent 86%)`,
    'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 22%, black 40%)',
  ].join(', ')

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* ── Veyira character — animates in and transitions per scene ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`veyira-${step}`}
          className="absolute"
          style={{
            bottom: veyira.bottom,
            left: veyira.left,
            height: '110vh',
            width: '80vw',
            maxWidth: '1080px',
            transformOrigin: 'bottom left',
          }}
          initial={{ opacity: 0, x: -32, filter: `blur(${veyira.blur + 10}px)` }}
          animate={{
            opacity: veyira.opacity,
            x: 0,
            scale: veyira.scale,
            filter: `blur(${veyira.blur}px)`,
          }}
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Inner float animation loop */}
          <motion.div
            className="relative h-full w-full"
            animate={float.animate}
            transition={{ duration: float.duration, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* ── Atmospheric red glow behind Veyira — part of the scene ── */}
            <div
              className="absolute -left-[6%] bottom-[5%] h-[58%] w-[60%] rounded-full"
              style={{
                background: `rgba(120,14,14,${0.14 + veyira.opacity * 0.22})`,
                filter: 'blur(92px)',
              }}
            />
            <div
              className="absolute left-[24%] top-[10%] h-[30%] w-[26%] rounded-full"
              style={{
                background: `rgba(160,24,24,${0.06 + veyira.opacity * 0.12})`,
                filter: 'blur(64px)',
              }}
            />

            {/* ── Main character image ── */}
            <Image
              src="/assets/onboarding/Veyira.png"
              alt="Veyira — Pemandu Ritual"
              fill
              priority
              className="object-contain object-bottom"
              style={{
                filter: `brightness(${veyira.brightness}) contrast(1.06) saturate(${veyira.saturation})`,
                maskImage,
                WebkitMaskImage: maskImage,
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
              }}
            />

            {/* ── Right edge dissolve — Veyira bleeds into void ── */}
            <div className="absolute inset-y-[3%] right-[-10%] w-[46%] bg-gradient-to-r from-transparent via-[#060303]/70 to-[#020202]" />

            {/* ── Left edge soft blend ── */}
            <div className="absolute inset-y-[10%] left-[-4%] w-[18%] bg-gradient-to-l from-transparent to-[#070405]/52 blur-xl" />

            {/* ── Bottom fog melt — feet dissolve into the ground fog ── */}
            <div
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/72 to-transparent"
              style={{ height: fog.bottomFogHeight }}
            />

            {/* ── Red rim light — present only when Veyira emerges ── */}
            {veyira.rimLight > 0 && (
              <motion.div
                className="absolute left-[-2%] top-[10%] h-[70%] w-[8%] rounded-full"
                style={{
                  background: `rgba(200,42,42,${veyira.rimLight})`,
                  filter: 'blur(28px)',
                }}
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            {/* ── Glowing eyes — only after scene 2 ── */}
            {veyira.eyeVisible && (
              <motion.div
                className="absolute left-[37.5%] top-[18.5%] h-[16px] w-[38px] rounded-full bg-red-500/44 blur-[7px]"
                animate={{ opacity: [0.3, 0.88, 0.3] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            {/* ── Soul pulse aura ── */}
            {veyira.opacity > 0.35 && (
              <motion.div
                className="absolute left-[30%] top-[54%] h-[90px] w-[90px] rounded-full bg-red-700/18 blur-3xl"
                animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.9, 1.12, 0.9] }}
                transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ── Front fog — THE KEY LAYER that binds Veyira to the world ──
          This layer sits ABOVE the character and "embeds" her into the environment.
          Without this, the character looks pasted on. With it, she emerges from the fog. */}
      <FogFront opacity={fog.frontOpacity} step={step} />
    </div>
  )
}

// Front atmospheric fog — sits above Veyira, below text layer
// This is the "glue" between character and environment
function FogFront({ opacity, step }: { opacity: number; step: number }) {
  return (
    <div className="pointer-events-none absolute inset-0" style={{ opacity }}>
      {/* Heavy ground-level fog bank */}
      <motion.div
        className="absolute -bottom-[8%] -left-[8%] h-[52%] w-[130%] rounded-[50%] blur-[56px]"
        style={{
          background:
            'radial-gradient(ellipse at 40% 80%, rgba(5,3,3,0.78) 0%, rgba(3,2,2,0.42) 50%, transparent 80%)',
        }}
        animate={{ x: [0, 28, 0], y: [0, -6, 0], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Mid-level wispy fog band */}
      <motion.div
        className="absolute bottom-[18%] -left-[4%] h-[18%] w-[90%] rounded-[50%] blur-[40px]"
        style={{
          background:
            'radial-gradient(ellipse at 35% 60%, rgba(7,4,4,0.52) 0%, rgba(2,2,2,0.18) 58%, transparent 84%)',
        }}
        animate={{ x: [0, -16, 0], y: [0, 4, 0], opacity: [0.48, 0.78, 0.48] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
      />

      {/* Drifting fog wisp — right side */}
      <motion.div
        className="absolute bottom-[28%] right-[-6%] h-[24%] w-[48%] rounded-[50%] blur-[44px]"
        style={{
          background:
            'radial-gradient(ellipse at 60% 70%, rgba(6,3,3,0.44) 0%, rgba(2,2,2,0.12) 62%, transparent 88%)',
        }}
        animate={{ x: [0, -12, 0], y: [0, -8, 0], opacity: [0.38, 0.62, 0.38] }}
        transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
      />

      {/* Ultra-subtle upper haze for scene 1 — heavy fog */}
      {step === 0 && (
        <motion.div
          className="absolute left-[10%] top-[30%] h-[40%] w-[55%] rounded-[50%] blur-[60px]"
          style={{
            background:
              'radial-gradient(ellipse, rgba(4,2,2,0.38) 0%, transparent 70%)',
          }}
          animate={{ opacity: [0.3, 0.56, 0.3], x: [0, 18, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  )
}
