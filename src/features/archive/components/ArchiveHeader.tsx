type ArchiveHeaderProps = {
  total: number;
};

export function ArchiveHeader({ total }: ArchiveHeaderProps) {
  return (
    <header className="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-950 to-zinc-900/90 p-6 sm:flex-row sm:items-start">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Arsip Paranormal</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-100 sm:text-4xl">
          Ghost Archive
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">
          Katalog jejak entitas dari berbagai sudut Nusantara, disusun dari laporan saksi dan catatan investigasi malam.
        </p>
      </div>

      <div className="shrink-0 rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-3 text-right">
        <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">Total Data</p>
        <p className="mt-1 text-lg font-semibold text-zinc-100">
          {total} entitas ditemukan
        </p>
      </div>
    </header>
  );
}
