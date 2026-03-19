import Image from "next/image";
import Link from "next/link";
import type { GhostArchiveEntry } from "../types/archive";
import { DangerLevelBadge } from "./DangerLevelBadge";

type ArchiveCardProps = {
  entry: GhostArchiveEntry;
};

export function ArchiveCard({ entry }: ArchiveCardProps) {
  const regionLabel = entry.city ? `${entry.city}, ${entry.province}` : entry.province;
  const locationLabel = [entry.city, entry.province, entry.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Link
      href={`/ghost-archive/${entry.slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-zinc-800/82 bg-[linear-gradient(160deg,rgba(24,24,27,0.97),rgba(9,9,11,0.99))] shadow-[0_30px_74px_-34px_rgba(0,0,0,0.98)] transition duration-350 ease-out hover:-translate-y-2 hover:border-red-500/82 hover:shadow-[0_48px_100px_-32px_rgba(220,38,38,0.72)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_84%_at_86%_10%,rgba(220,38,38,0.58),transparent_50%)] opacity-0 transition-opacity duration-350 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(78%_68%_at_14%_100%,rgba(126,34,206,0.36),transparent_60%)] opacity-0 transition-opacity duration-350 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_190px_rgba(0,0,0,0.62)]" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-350 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 shadow-[inset_0_0_0_1px_rgba(248,113,113,0.72),inset_0_0_64px_rgba(220,38,38,0.34)]" />
      <div className="relative aspect-[3/4] min-h-[26rem] overflow-hidden">
        <Image
          src={entry.mainImage}
          alt={entry.name}
          fill
          className="object-cover object-top saturate-[1.1] contrast-[1.28] brightness-[1.1] transition duration-350 ease-out group-hover:scale-[1.1] group-focus-visible:scale-[1.1]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/44 via-black/30 to-black/90" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/95 via-black/86 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-red-950/58 via-purple-950/18 to-transparent opacity-78 transition-opacity duration-350 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />
        <div className="pointer-events-none absolute inset-0 bg-black/22 opacity-0 backdrop-blur-0 transition-all duration-350 ease-out group-hover:opacity-100 group-hover:backdrop-blur-[2px] group-focus-visible:opacity-100 group-focus-visible:backdrop-blur-[2px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.42)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_3px)]" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_74px_rgba(0,0,0,0.62)]" />

        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-5">
          <p className="rounded-full border border-zinc-700/70 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-200 backdrop-blur">
            {entry.category}
          </p>
          <p className="max-w-[52%] truncate rounded-full border border-zinc-700/60 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-zinc-300/90 backdrop-blur">
            {entry.country}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 space-y-3 p-5">
          <h3 className="text-2xl font-semibold leading-tight text-zinc-100 drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)]">
            {entry.name}
          </h3>
          <p className="text-xs uppercase tracking-[0.12em] text-zinc-300/85">
            {entry.origin}
          </p>
          <DangerLevelBadge
            dangerLevel={entry.dangerLevel}
            className="w-fit border-zinc-500/60 bg-black/45 text-zinc-100 backdrop-blur-sm"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-[102%] border-t border-red-500/55 bg-[linear-gradient(180deg,rgba(24,24,27,0.66),rgba(9,9,11,0.98))] p-5 opacity-0 backdrop-blur-sm transition-all duration-[380ms] ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:backdrop-blur-lg group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:backdrop-blur-lg">
          <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-400">
            {entry.category} • {regionLabel}
          </p>
          <h4 className="mt-1 text-xl font-semibold leading-tight text-zinc-100">
            {entry.name}
          </h4>
          <p className="mt-2 overflow-hidden text-sm leading-relaxed text-zinc-200 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
            {entry.summary}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.1em] text-zinc-400">
            Lokasi: {locationLabel}
          </p>
          <DangerLevelBadge
            dangerLevel={entry.dangerLevel}
            className="mt-3 w-fit border-zinc-500/60 bg-black/45 text-zinc-100 backdrop-blur-sm"
          />
        </div>
      </div>
    </Link>
  );
}
