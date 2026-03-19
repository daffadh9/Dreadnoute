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
      className="group relative block overflow-hidden rounded-3xl border border-zinc-800/80 bg-[linear-gradient(160deg,rgba(24,24,27,0.97),rgba(9,9,11,0.99))] shadow-[0_24px_56px_-32px_rgba(0,0,0,0.96)] transition duration-500 ease-out hover:-translate-y-1.5 hover:border-zinc-500/85 hover:shadow-[0_34px_74px_-34px_rgba(220,38,38,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_85%_8%,rgba(220,38,38,0.3),transparent_56%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_60%_at_15%_90%,rgba(126,34,206,0.2),transparent_64%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.5)]" />
      <div className="relative aspect-[3/4] min-h-[26rem] overflow-hidden">
        <Image
          src={entry.mainImage}
          alt={entry.name}
          fill
          className="object-cover object-top saturate-[0.98] contrast-[1.12] brightness-[0.92] transition duration-500 ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/32 via-black/20 to-black/86" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/95 via-black/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-red-950/34 via-purple-950/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.42)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_3px)]" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_36px_rgba(0,0,0,0.45)]" />

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

        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-[102%] border-t border-zinc-700/70 bg-[linear-gradient(180deg,rgba(24,24,27,0.82),rgba(9,9,11,0.98))] p-5 opacity-0 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
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
