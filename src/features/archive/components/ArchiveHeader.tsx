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

      <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            DreadNoute Curated Index
          </p>
          <div className="relative inline-flex">
            <div className="pointer-events-none absolute -inset-x-12 -inset-y-6 bg-[radial-gradient(circle,rgba(239,68,68,0.62)_0%,rgba(168,85,247,0.3)_35%,transparent_74%)] blur-2xl" />
            <h1 className="relative text-3xl font-semibold text-zinc-100 drop-shadow-[0_0_22px_rgba(248,113,113,0.6)] sm:text-4xl">
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

        <div
          className={`shrink-0 rounded-xl border bg-zinc-900/92 px-4 py-3 text-right backdrop-blur-sm transition duration-350 ease-out ${
            hasFilter
              ? "border-red-400/85 shadow-[0_0_0_1px_rgba(248,113,113,0.48),0_20px_42px_-20px_rgba(239,68,68,0.8),0_0_34px_rgba(239,68,68,0.42)]"
              : "border-zinc-700/90"
          }`}
        >
          <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">Status Hasil</p>
          <p className="mt-1 text-lg font-semibold text-zinc-100">
            {hasFilter ? `${total} dari ${totalArchive}` : totalArchive} entitas
          </p>
          <p className={`mt-1 text-xs ${hasFilter ? "text-red-200/85" : "text-zinc-400"}`}>
            {hasFilter ? "Filter aktif" : "Semua arsip ditampilkan"}
          </p>
        </div>
      </div>
    </header>
  );
}
