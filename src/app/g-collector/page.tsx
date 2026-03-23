import HeroSection from '@/features/g-collector/components/HeroSection'
import ProgressPanel from '@/features/g-collector/components/ProgressPanel'
import QuickActions from '@/features/g-collector/components/QuickActions'
import FeaturedEntity from '@/features/g-collector/components/FeaturedEntity'

export const metadata = {
  title: 'G-Collector | DreadNoute',
  description: 'Kumpulkan 105 Legions sebelum ritual kebangkitan selesai. Masuki dunia Nekrovia.',
}

export default function GCollectorPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0D]">
      {/* Page container */}
      <div className="mx-auto max-w-3xl px-4 py-8 md:py-12 space-y-6">
        {/* 1 — Hero / Ritual Gateway */}
        <HeroSection isNewUser={true} />

        {/* 2 — Mission Progress */}
        <ProgressPanel />

        {/* 3 — Quick Actions (2x2 grid) */}
        <QuickActions />

        {/* 4 — Featured Entity (Daily Omen) */}
        <FeaturedEntity />

        {/* Footer note */}
        <p className="text-center text-xs text-white/15 tracking-[0.25em] uppercase pb-4">
          — Nekrovia Realm · Cycle of 40 Seals —
        </p>
      </div>
    </main>
  )
}
