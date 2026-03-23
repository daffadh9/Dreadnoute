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
    <div className="min-h-screen pb-40 bg-[#020202]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-6 pt-6 md:gap-8 md:pt-8">

        {/* 1 — Hero */}
        <HeroSection isNewUser={true} />

        {/* 2 — Mission Progress */}
        <ProgressPanel />

        {/* 3 — Quick Actions */}
        <QuickActions />

        {/* 4 — Featured Entity */}
        <FeaturedEntity />

        {/* Footer */}
        <footer className="mt-8 flex flex-col items-center gap-2 border-t border-white/5 py-10 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-800">
            — Nekrovia Realm · Cycle of 40 Seals —
          </p>
        </footer>
      </div>
    </div>
  )
}
