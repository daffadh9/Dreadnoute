import Image from "next/image";
import Link from "next/link";
import type { GhostArchiveEntry } from "../types/archive";
import { DangerLevelBadge } from "./DangerLevelBadge";

type ArchiveCardProps = {
  entry: GhostArchiveEntry;
};

export function ArchiveCard({ entry }: ArchiveCardProps) {

  return (
    <>
      <Link
        href={`/ghost-archive/${entry.slug}`}
        className="group relative block overflow-hidden rounded-3xl border border-zinc-800/82 bg-[linear-gradient(160deg,rgba(24,24,27,0.97),rgba(9,9,11,0.99))] shadow-[0_30px_74px_-34px_rgba(0,0,0,0.98)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:border-red-500 hover:shadow-[0_48px_120px_-32px_rgba(220,38,38,0.85),inset_0_0_30px_rgba(220,38,38,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_84%_at_86%_10%,rgba(220,38,38,0.58),transparent_50%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(78%_68%_at_14%_100%,rgba(126,34,206,0.36),transparent_60%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_190px_rgba(0,0,0,0.62)]" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 shadow-[inset_0_0_0_1px_rgba(248,113,113,0.72),inset_0_0_64px_rgba(220,38,38,0.54)]" />
      <div className="relative aspect-[3/4] min-h-[26rem] overflow-hidden bg-zinc-950">
        <Image
          src={entry.mainImage}
          alt={entry.name}
          fill
          className={`glitch-img-${entry.id} object-cover object-top filter grayscale-[0.35] contrast-[1.25] brightness-[0.75] sepia-[0.3] saturate-[0.8] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.08] group-focus-visible:scale-[1.08]`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Cinematc LUT Overlay for unification */}
        <div className="pointer-events-none absolute inset-0 bg-[#0B0B0F]/20 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 bg-red-900/10 mix-blend-color" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/95" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/95 via-black/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-red-950/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />
          <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 backdrop-blur-0 transition-all duration-350 ease-out group-hover:opacity-100 group-hover:backdrop-blur-[2px] group-focus-visible:opacity-100 group-focus-visible:backdrop-blur-[2px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.5)_100%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_3px)]" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.7)]" />

          <div className="absolute inset-x-0 bottom-0 z-10 space-y-3 p-6 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-8">
            <h3 className="text-2xl font-bold tracking-wide text-zinc-100 drop-shadow-[0_4px_15px_rgba(0,0,0,1)]">
              {entry.name}
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              {entry.city ? `${entry.city}, ${entry.province}` : entry.province}
            </p>
            <DangerLevelBadge
              dangerLevel={entry.dangerLevel}
              className="w-fit border-zinc-500/60 bg-black/60 text-[#E5E5E5] backdrop-blur-md"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 translate-y-[100%] border-t border-red-900/40 bg-[linear-gradient(180deg,rgba(11,11,15,0.85),rgba(0,0,0,0.98))] p-6 opacity-0 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <div className="space-y-4">
              <p className="overflow-hidden text-sm leading-relaxed text-[#E5E5E5] line-clamp-3">
                {entry.summary}
              </p>
              <div className="flex w-full items-center justify-center rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-red-500 transition-colors group-hover:bg-red-950/50 group-hover:text-red-400">
                Open File
              </div>
            </div>
          </div>
        </div>
      </Link>
      <style>{`
        @keyframes glitchHero-${entry.id} {
          0% { transform: scale(1.08) translate(0) }
          20% { transform: scale(1.08) translate(-2px, 1px) }
          40% { transform: scale(1.08) translate(-1px, -2px) }
          60% { transform: scale(1.08) translate(2px, 1px) }
          80% { transform: scale(1.08) translate(1px, -1px) }
          100% { transform: scale(1.08) translate(0) }
        }
        .group:hover .glitch-img-${entry.id} {
          animation: glitchHero-${entry.id} 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
          filter: sepia(0.8) hue-rotate(320deg) saturate(2) brightness(1.2) contrast(1.4);
        }
        .glitch-img-${entry.id} {
          transition: filter 0.4s ease-out, transform 0.7s cubic-bezier(0.25, 1, 0.5, 1);
        }
      `}</style>
    </>
  );
}
