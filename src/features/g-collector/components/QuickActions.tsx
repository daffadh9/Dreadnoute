'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Swords, LayoutGrid, ShoppingBag, BookOpen } from 'lucide-react'

const actions = [
  {
    id: 'ritual',
    label: 'Mulai Ritual',
    description: 'Masuk ke arena & kendalikan entitas',
    href: '/g-collector/ritual',
    icon: Swords,
    badge: 'AKTIF',
    borderClass: 'border-red-950/50 hover:border-red-600/50',
    glowClass: 'bg-red-900/15 hover:bg-red-900/25',
    iconColor: 'text-accent',
    iconBg: 'bg-red-950/50 border-red-900/40',
  },
  {
    id: 'collection',
    label: 'Koleksi',
    description: '12 dari 105 Legion terkumpul',
    href: '/g-collector/collection',
    icon: LayoutGrid,
    badge: null,
    borderClass: 'border-zinc-800/80 hover:border-zinc-600/60',
    glowClass: 'bg-zinc-900/10 hover:bg-zinc-900/20',
    iconColor: 'text-zinc-300',
    iconBg: 'bg-zinc-900/50 border-zinc-800/50',
  },
  {
    id: 'market',
    label: 'Market',
    description: 'Tukar & perdagangkan entitas',
    href: '/g-collector/market',
    icon: ShoppingBag,
    badge: null,
    borderClass: 'border-zinc-800/80 hover:border-amber-700/40',
    glowClass: 'bg-zinc-900/10 hover:bg-amber-900/10',
    iconColor: 'text-amber-400/80',
    iconBg: 'bg-amber-950/30 border-amber-900/30',
  },
  {
    id: 'story',
    label: 'Cerita',
    description: 'Lanjutkan Chapter 2 — The Hollow Gate',
    href: '/g-collector/story',
    icon: BookOpen,
    badge: null,
    borderClass: 'border-zinc-800/80 hover:border-zinc-600/60',
    glowClass: 'bg-zinc-900/10 hover:bg-zinc-900/20',
    iconColor: 'text-zinc-300',
    iconBg: 'bg-zinc-900/50 border-zinc-800/50',
  },
]

export default function QuickActions() {
  return (
    <section className="w-full">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Aksi Cepat</h2>
        <div className="h-px flex-1 bg-zinc-800/60" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {actions.map((action, i) => {
          const Icon = action.icon
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link href={action.href}>
                <div
                  className={`group relative overflow-hidden rounded-[20px] border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.4)] ${action.borderClass} ${action.glowClass} bg-[linear-gradient(145deg,rgba(18,18,22,0.95),rgba(8,8,10,0.98))]`}
                >
                  {/* Shine on hover */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full rounded-[20px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  {/* Top line */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div className="relative flex flex-col gap-4">
                    {/* Icon row */}
                    <div className="flex items-start justify-between">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${action.iconBg}`}>
                        <Icon size={18} className={action.iconColor} />
                      </div>
                      {action.badge && (
                        <span className="rounded-full border border-accent/40 bg-accent/15 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.3em] text-accent">
                          {action.badge}
                        </span>
                      )}
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="text-[13px] font-black uppercase tracking-[0.08em] text-white transition-colors group-hover:text-white">
                        {action.label}
                      </h3>
                      <p className="mt-1 text-[10px] font-semibold leading-snug text-zinc-600 transition-colors group-hover:text-zinc-400">
                        {action.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight
                      size={14}
                      className="ml-auto text-zinc-700 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-zinc-400"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
