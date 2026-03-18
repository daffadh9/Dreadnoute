import Image from "next/image";
import Link from "next/link";
import type { GhostArchiveEntry } from "../types/archive";
import { DangerLevelBadge } from "./DangerLevelBadge";

type ArchiveCardProps = {
  entry: GhostArchiveEntry;
};

export function ArchiveCard({ entry }: ArchiveCardProps) {
  return (
    <Link
      href={`/ghost-archive/${entry.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-zinc-800/70 bg-[linear-gradient(160deg,rgba(24,24,27,0.94),rgba(9,9,11,0.96))] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.95)] transition duration-300 hover:-translate-y-1 hover:border-zinc-600/80 hover:shadow-[0_24px_50px_-24px_rgba(96,56,173,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/40"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_85%_8%,rgba(139,92,246,0.18),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative h-56 overflow-hidden">
        <Image
          src={entry.mainImage}
          alt={entry.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-zinc-950/90" />
      </div>

      <div className="relative space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            {entry.category}
          </p>
          <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
            {entry.origin}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold leading-tight text-zinc-100">
            {entry.name}
          </h3>
          <p className="overflow-hidden text-sm leading-relaxed text-zinc-300 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
            {entry.summary}
          </p>
        </div>

        <DangerLevelBadge
          dangerLevel={entry.dangerLevel}
          className="backdrop-blur-sm"
        />
      </div>
    </Link>
  );
}
