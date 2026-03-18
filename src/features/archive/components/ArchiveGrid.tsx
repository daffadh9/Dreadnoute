import type { GhostArchiveEntry } from "../types/archive";
import { ArchiveCard } from "./ArchiveCard";

type ArchiveGridProps = {
  entries: GhostArchiveEntry[];
};

export function ArchiveGrid({ entries }: ArchiveGridProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-10 text-center">
        <p className="text-lg font-medium text-zinc-100">
          Tidak ada entitas yang cocok
        </p>
        <p className="mt-2 text-sm text-zinc-400">
          Ubah kata kunci pencarian atau pilih kategori lain.
        </p>
      </div>
    );
  }

  return (
    <section
      aria-label="Daftar entitas Ghost Archive"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
    >
      {entries.map((entry) => (
        <ArchiveCard key={entry.id} entry={entry} />
      ))}
    </section>
  );
}
