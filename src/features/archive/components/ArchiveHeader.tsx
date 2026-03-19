type ArchiveHeaderProps = {
  total: number;
  totalArchive: number;
};

export function ArchiveHeader({ total, totalArchive }: ArchiveHeaderProps) {
  const hasFilter = total !== totalArchive;

  return (
    <header className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[linear-gradient(165deg,rgba(24,24,27,0.96),rgba(9,9,11,0.98))] p-6 shadow-[0_16px_44px_-24px_rgba(0,0,0,0.9)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_80%_at_82%_12%,rgba(220,38,38,0.16),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_20%_100%,rgba(76,29,149,0.12),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-400/35 to-transparent" />

      <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            DreadNoute Curated Index
          </p>
          <h1 className="text-3xl font-semibold text-zinc-100 sm:text-4xl">
            Ghost Archive
          </h1>
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
          className={`shrink-0 rounded-xl border bg-zinc-900/90 px-4 py-3 text-right backdrop-blur-sm ${
            hasFilter
              ? "border-red-400/45 shadow-[0_0_0_1px_rgba(248,113,113,0.2)]"
              : "border-zinc-700"
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
