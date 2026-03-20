import { BookOpenText, Flame, Skull, Users } from "lucide-react";

type ArchiveHeaderProps = {
  total: number;
  totalArchive: number;
};

export function ArchiveHeader({ }: ArchiveHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-[linear-gradient(165deg,rgba(24,24,27,0.98),rgba(6,6,9,1))] p-6 shadow-[0_36px_86px_-36px_rgba(0,0,0,0.98)]">
      <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-red-500/42 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-purple-500/30 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_90%_at_86%_8%,rgba(220,38,38,0.42),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_82%_at_12%_100%,rgba(126,34,206,0.32),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.13)_0_1px,transparent_1px_3px)]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.75)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-400/90 to-transparent" />

      <style>{`
        @keyframes headerTitleGlitch {
          0%, 100% { transform: translate(0); text-shadow: 0 0 12px rgba(220, 38, 38, 0.6); }
          10% { transform: translate(-3px, 1px); text-shadow: 3px 0 rgba(239, 68, 68, 0.9), -3px 0 rgba(168, 85, 247, 0.7); }
          20% { transform: translate(2px, -2px); text-shadow: -3px 0 rgba(239, 68, 68, 0.9), 3px 0 rgba(168, 85, 247, 0.7); }
          30% { transform: translate(0); text-shadow: 0 0 12px rgba(220, 38, 38, 0.6); }
        }
        .animate-glitch-title {
          animation: headerTitleGlitch 5s infinite alternate-reverse;
        }
      `}</style>

      <div className="relative z-10 space-y-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-500">
          DreadNoute Curated Index
        </p>
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6 py-2">
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="pointer-events-none absolute -inset-x-12 -inset-y-6 bg-[radial-gradient(circle,rgba(239,68,68,0.5)_0%,rgba(147,51,234,0.2)_40%,transparent_75%)] blur-2xl animate-[pulse_5s_ease-in-out_infinite]" />
            
            <div className="relative flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center rounded-2xl border border-red-500/40 bg-[radial-gradient(circle_at_center,rgba(69,10,10,0.6)_0%,rgba(0,0,0,0.85)_100%)] shadow-[0_0_35px_rgba(220,38,38,0.4),inset_0_0_20px_rgba(239,68,68,0.25)] transition-transform duration-500 hover:scale-105 hover:border-red-400/80 hover:shadow-[0_0_45px_rgba(220,38,38,0.55)]">
              <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-2xl border border-red-500/20 border-t-red-500/70" />
              <div className="absolute inset-2 animate-[spin_14s_linear_infinite_reverse] rounded-xl border border-purple-500/20 border-b-purple-500/60" />
              
              <Skull className="absolute h-14 w-14 text-zinc-950/80 drop-shadow-md blur-[1px]" />
              <BookOpenText className="relative z-10 h-11 w-11 text-red-100 drop-shadow-[0_0_12px_rgba(248,113,113,0.9)]" />
              <div className="absolute bottom-2 right-2 z-20 overflow-hidden animate-pulse">
                <Flame className="h-5 w-5 text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,1)]" />
              </div>
            </div>

            <div className="relative">
              <h1 className="relative inline-block bg-gradient-to-br from-zinc-100 via-zinc-200 to-red-400 bg-clip-text text-4xl font-black tracking-widest text-transparent drop-shadow-[0_0_18px_rgba(220,38,38,0.5)] sm:text-5xl lg:text-6xl animate-glitch-title">
                GHOST ARCHIVE
              </h1>
              <div className="absolute -inset-1 z-[-1] animate-[pulse_4s_infinite] bg-gradient-to-r from-red-600/30 to-transparent blur-2xl" />
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-red-500/20 bg-black/40 w-fit p-2 pr-5 shadow-[inset_0_0_15px_rgba(220,38,38,0.1),0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition duration-500 hover:border-red-500/40 hover:bg-black/60">
            <div className="flex -space-x-3">
              <div className="relative z-30 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-xs font-bold text-red-500 shadow-md">
                J
              </div>
              <div className="relative z-20 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-xs font-bold text-orange-400 shadow-md">
                R
              </div>
              <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-xs font-bold text-purple-400 shadow-md">
                v
              </div>
              <div className="relative z-0 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-xs font-bold text-zinc-400 shadow-md">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="flex flex-col ml-1">
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-semibold drop-shadow-sm">
                Saksi Terhubung
              </span>
              <span className="text-base font-black tracking-widest text-zinc-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                13,400<span className="text-red-500">+</span>
              </span>
            </div>
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-300">
          Arsip resmi entitas terlarang Nusantara yang dikurasi dari jejak saksi, laporan lapangan, dan observasi malam.
        </p>
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
          Klasifikasi editorial • investigasi terverifikasi • pembaruan berkala
        </p>
        <p className="text-xs italic text-zinc-400/85">
          Setiap entitas dicatat sebagai arsip terkurasi, bukan sekadar legenda malam.
        </p>
      </div>
    </header>
  );
}
