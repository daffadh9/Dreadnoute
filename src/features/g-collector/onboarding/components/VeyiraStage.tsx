'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function VeyiraStage() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <motion.div
        className="absolute bottom-[-10%] left-[-18%] h-[92vh] w-[118vw] max-w-[1060px] md:bottom-[-13%] md:left-[-12%] md:h-[108vh] md:w-[78vw] md:max-w-[1120px]"
        initial={{ opacity: 0, x: -70, filter: 'blur(10px)' }}
        animate={{ opacity: 0.98, x: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ y: [0, -10, 0], x: [0, 3, 0], rotate: [0, 0.5, 0] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute -left-[3%] bottom-[8%] h-[54%] w-[54%] rounded-full bg-[#7c1111]/30 blur-[86px]" />
          <div className="absolute left-[28%] top-[14%] h-[26%] w-[22%] rounded-full bg-[#a71d1d]/16 blur-[58px]" />
          <div className="absolute right-[16%] top-[34%] h-[34%] w-[30%] rounded-full bg-[#461a1a]/18 blur-[56px]" />

          <Image
            src="/images/guide-character/Veyira.png"
            alt="Veyira"
            fill
            priority
            className="object-contain object-bottom brightness-[0.9] contrast-[1.07] saturate-[1.12] drop-shadow-[0_0_80px_rgba(255,0,0,0.24)] [mask-image:radial-gradient(76%_88%_at_40%_52%,black_58%,transparent_96%)]"
          />

          <div className="absolute inset-y-[4%] right-[-14%] w-[50%] bg-gradient-to-r from-transparent via-[#070304]/78 to-[#030203]" />
          <div className="absolute inset-y-[12%] left-[-8%] w-[24%] bg-gradient-to-l from-transparent to-[#080405]/60 blur-lg" />
          <div className="absolute -bottom-[2%] inset-x-[8%] h-[24%] bg-gradient-to-t from-black via-black/45 to-transparent blur-md" />

          <motion.div
            className="absolute left-[37.8%] top-[19%] h-[18px] w-[40px] rounded-full bg-red-500/46 blur-[7px]"
            animate={{ opacity: [0.38, 0.92, 0.38] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute left-[32%] top-[56%] h-[86px] w-[86px] rounded-full bg-red-700/24 blur-3xl"
            animate={{ opacity: [0.12, 0.5, 0.12] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
