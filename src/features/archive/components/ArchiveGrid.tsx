import type { GhostArchiveEntry } from "../types/archive";
import { ArchiveCard } from "./ArchiveCard";

type ArchiveGridProps = {
  entries: GhostArchiveEntry[];
};

export function ArchiveGrid({ entries }: ArchiveGridProps) {
  return (
    <section aria-label="Daftar entitas Ghost Archive" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800/80 bg-zinc-950/70 px-4 py-3">
        <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          Hasil Terkurasi
        </p>
        <p className="text-sm font-medium text-zinc-200">
          {entries.length} entitas ditemukan
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-[linear-gradient(145deg,rgba(24,24,27,0.9),rgba(9,9,11,0.95))] p-10 text-center">
          <p className="text-lg font-semibold text-zinc-100">
            Arsip tidak menemukan entitas yang sesuai
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
            Coba kata kunci lain atau ubah kategori untuk membuka hasil investigasi yang berbeda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {entries.map((entry) => (
            <ArchiveCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </section>
  );
}
