'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Action {
  id: string
  label: string
  description: string
  href: string
  icon: React.ReactNode
  accent: string
  glowColor: string
  badge?: string
}

const actions: Action[] = [
  {
    id: 'ritual',
    label: 'Mulai Ritual',
    description: 'Masuk ke arena & kendalikan entitas',
    href: '/g-collector/ritual',
    accent: 'from-red-950/60 to-red-900/20 border-red-900/30 hover:border-red-700/50',
    glowColor: 'bg-red-600/20',
    badge: 'AKTIF',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.72 17.72l1.061 1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.72 6.28l1.061-1.061" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    id: 'collection',
    label: 'Koleksi',
    description: '12 dari 105 Legion terkumpul',
    href: '/g-collector/collection',
    accent: 'from-purple-950/40 to-purple-900/10 border-purple-900/20 hover:border-purple-700/40',
    glowColor: 'bg-purple-600/15',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
      </svg>
    ),
  },
  {
    id: 'market',
    label: 'Market',
    description: 'Tukar & perdagangkan entitas',
    href: '/g-collector/market',
    accent: 'from-amber-950/40 to-amber-900/10 border-amber-900/20 hover:border-amber-700/40',
    glowColor: 'bg-amber-600/15',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016 2.993 2.993 0 0 0 2.25-1.016 3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
      </svg>
    ),
  },
  {
    id: 'story',
    label: 'Cerita',
    description: 'Lanjutkan Chapter 2 — The Hollow Gate',
    href: '/g-collector/story',
    accent: 'from-slate-900/60 to-slate-800/20 border-slate-700/20 hover:border-slate-500/40',
    glowColor: 'bg-slate-400/10',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08 },
  }),
}

export default function QuickActions() {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-cinzel text-sm font-semibold text-white/60 tracking-widest uppercase">
          Aksi Cepat
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, i) => (
          <motion.div
            key={action.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              href={action.href}
              className={`group relative flex flex-col gap-3 p-5 rounded-2xl border bg-gradient-to-br transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 overflow-hidden ${action.accent}`}
            >
              {/* Glow on hover */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl ${action.glowColor}`} />

              {/* Content */}
              <div className="relative z-10 flex items-start justify-between">
                {/* Icon */}
                <div className="p-2 rounded-lg bg-white/5 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                  {action.icon}
                </div>

                {/* Badge */}
                {action.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-[10px] font-medium tracking-widest uppercase">
                    {action.badge}
                  </span>
                )}
              </div>

              <div className="relative z-10">
                <h3 className="font-cinzel text-sm font-semibold text-white/90 tracking-wide group-hover:text-white transition-colors duration-300">
                  {action.label}
                </h3>
                <p className="text-xs text-white/35 mt-0.5 leading-relaxed group-hover:text-white/50 transition-colors duration-300">
                  {action.description}
                </p>
              </div>

              {/* Arrow indicator */}
              <div className="relative z-10 flex justify-end">
                <svg
                  className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
