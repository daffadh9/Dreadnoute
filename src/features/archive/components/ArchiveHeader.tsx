type ArchiveHeaderProps = {
  total: number;
  totalArchive: number;
};

export function ArchiveHeader({ total, totalArchive }: ArchiveHeaderProps) {
  const hasFilter = total !== totalArchive;

  return (
    <header className="relative overflow-hidden rounded-2xl border border-zinc-800/90 bg-[linear-gradient(165deg,rgba(24,24,27,0.97),rgba(8,8,11,0.99))] p-6 shadow-[0_22px_54px_-28px_rgba(0,0,0,0.95)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_82%_at_84%_10%,rgba(220,38,38,0.26),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_78%_at_16%_100%,rgba(126,34,206,0.2),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.12)_0_1px,transparent_1px_3px)]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_110px_rgba(0,0,0,0.58)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-400/45 to-transparent" />

      <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            DreadNoute Curated Index
          </p>
          <div className="relative inline-flex">
            <div className="pointer-events-none absolute -inset-x-7 -inset-y-4 bg-[radial-gradient(circle,rgba(239,68,68,0.34)_0%,rgba(168,85,247,0.16)_35%,transparent_74%)] blur-2xl" />
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
