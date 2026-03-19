import { BookOpenText } from "lucide-react";

type ArchiveHeaderProps = {
  total: number;
  totalArchive: number;
};

export function ArchiveHeader({ total, totalArchive }: ArchiveHeaderProps) {
  const hasFilter = total !== totalArchive;

  return (
    <header className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-[linear-gradient(165deg,rgba(24,24,27,0.98),rgba(6,6,9,1))] p-6 shadow-[0_36px_86px_-36px_rgba(0,0,0,0.98)]">
      <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-red-500/42 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-purple-500/30 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_90%_at_86%_8%,rgba(220,38,38,0.42),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_82%_at_12%_100%,rgba(126,34,206,0.32),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.13)_0_1px,transparent_1px_3px)]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.75)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-400/90 to-transparent" />

      <div className="relative z-10 space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-500">
          DreadNoute Curated Index
        </p>
        <div className="relative flex items-center gap-4">
          <div className="pointer-events-none absolute -inset-x-12 -inset-y-6 bg-[radial-gradient(circle,rgba(239,68,68,0.62)_0%,rgba(168,85,247,0.3)_35%,transparent_74%)] blur-2xl" />
          <div className="relative rounded-xl border border-red-500/40 bg-zinc-950/60 p-3 shadow-[0_0_24px_rgba(220,38,38,0.5),inset_0_0_12px_rgba(248,113,113,0.2)] animate-[pulse_3s_ease-in-out_infinite]">
            <BookOpenText className="h-9 w-9 text-red-400 drop-shadow-[0_0_12px_rgba(248,113,113,0.9)]" />
          </div>
          <h1 className="relative text-3xl font-bold tracking-tight text-zinc-100 drop-shadow-[0_0_22px_rgba(248,113,113,0.6)] sm:text-5xl">
            Ghost Archive
          </h1>
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
