type ArchiveHeaderProps = {
  total: number;
  totalArchive: number;
};

export function ArchiveHeader({ total, totalArchive }: ArchiveHeaderProps) {
  const hasFilter = total !== totalArchive;

  return (
    <header className="relative overflow-hidden rounded-2xl border border-zinc-800/95 bg-[linear-gradient(165deg,rgba(24,24,27,0.98),rgba(6,6,9,0.99))] p-6 shadow-[0_28px_66px_-30px_rgba(0,0,0,0.98)]">
      <div className="pointer-events-none absolute -right-16 -top-28 h-72 w-72 rounded-full bg-red-500/24 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_82%_at_84%_10%,rgba(220,38,38,0.34),transparent_54%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_78%_at_16%_100%,rgba(126,34,206,0.24),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.12)_0_1px,transparent_1px_3px)]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.65)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent" />

      <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            DreadNoute Curated Index
          </p>
          <div className="relative inline-flex">
            <div className="pointer-events-none absolute -inset-x-9 -inset-y-5 bg-[radial-gradient(circle,rgba(239,68,68,0.46)_0%,rgba(168,85,247,0.2)_35%,transparent_74%)] blur-2xl" />
            <h1 className="relative text-3xl font-semibold text-zinc-100 sm:text-4xl">
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
              ? "border-red-400/65 shadow-[0_0_0_1px_rgba(248,113,113,0.36),0_14px_30px_-18px_rgba(239,68,68,0.65)]"
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
