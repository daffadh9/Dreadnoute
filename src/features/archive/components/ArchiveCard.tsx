import Image from "next/image";
import Link from "next/link";
import type { GhostArchiveEntry } from "../types/archive";

type ArchiveCardProps = {
  entry: GhostArchiveEntry;
};

const dangerLevelStyles: Record<GhostArchiveEntry["dangerLevel"], string> = {
  Rendah: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30",
  Sedang: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30",
  Tinggi: "bg-orange-500/15 text-orange-300 ring-1 ring-orange-400/30",
  Ekstrem: "bg-red-500/20 text-red-200 ring-1 ring-red-400/40"
};

export function ArchiveCard({ entry }: ArchiveCardProps) {
  return (
    <Link
      href={`/ghost-archive/${entry.slug}`}
      className="group block overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/80 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.9)] transition duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-[0_20px_45px_-22px_rgba(120,20,20,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/50"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={entry.mainImage}
          alt={entry.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/35 to-transparent" />
      </div>

      <div className="space-y-3 p-5">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
            {entry.category}
          </p>
          <h3 className="text-xl font-semibold text-zinc-100">{entry.name}</h3>
          <p className="text-sm text-zinc-300">{entry.origin}</p>
        </div>

        <div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${dangerLevelStyles[entry.dangerLevel]}`}
          >
            Tingkat Bahaya: {entry.dangerLevel}
          </span>
        </div>
      </div>
    </Link>
  );
}

