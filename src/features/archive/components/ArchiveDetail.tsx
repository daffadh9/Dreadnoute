import Image from "next/image";
import Link from "next/link";
import type { GhostArchiveEntry } from "../types/archive";
import { DangerLevelBadge } from "./DangerLevelBadge";
import { SectionWrapper } from "./SectionWrapper";

type ArchiveDetailProps = {
  entry: GhostArchiveEntry;
};

export function ArchiveDetail({ entry }: ArchiveDetailProps) {
  return (
    <main className="min-h-screen bg-black px-6 py-8 text-zinc-100 md:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="relative space-y-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-black" />

          <div className="relative z-10 space-y-5">
            <Link
              href="/ghost-archive"
              className="inline-flex items-center text-sm text-zinc-300 transition hover:text-purple-400"
            >
              &larr; Kembali ke Arsip
            </Link>

            <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {entry.category}
                </p>
                <h1 className="text-3xl font-semibold sm:text-4xl">{entry.name}</h1>
                <p className="text-sm text-zinc-300">Asal: {entry.origin}</p>
                <DangerLevelBadge dangerLevel={entry.dangerLevel} />
                <p className="max-w-2xl leading-relaxed text-zinc-200">{entry.summary}</p>
              </div>

              <div className="relative h-64 overflow-hidden rounded-xl border border-zinc-800 sm:h-80 lg:h-full">
                <Image
                  src={entry.mainImage}
                  alt={entry.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <SectionWrapper title="Riwayat">
            <ul className="space-y-3 text-sm leading-relaxed text-zinc-300">
              {entry.history.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </SectionWrapper>

          <SectionWrapper title="Kemampuan">
            <ul className="space-y-2 text-sm text-zinc-300">
              {entry.abilities.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </SectionWrapper>

          <SectionWrapper title="Kelemahan">
            <ul className="space-y-2 text-sm text-zinc-300">
              {entry.weaknesses.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </SectionWrapper>

          <SectionWrapper title="Zona Rawan">
            <div className="flex flex-wrap gap-2">
              {entry.dangerZones.map((zone) => (
                <span
                  key={zone}
                  className="rounded-full border border-zinc-700 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-200"
                >
                  {zone}
                </span>
              ))}
            </div>
          </SectionWrapper>
        </section>

        <SectionWrapper title="Galeri">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entry.gallery.map((imagePath, index) => (
              <div
                key={`${entry.id}-gallery-${index}`}
                className="relative h-44 overflow-hidden rounded-xl border border-zinc-800"
              >
                <Image
                  src={imagePath}
                  alt={`${entry.name} galeri ${index + 1}`}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper title="Laporan Saksi">
          <div className="space-y-4">
            {entry.reports.map((report) => (
              <article
                key={report.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 transition hover:border-purple-500/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-zinc-100">@{report.username}</p>
                  <p className="text-xs text-zinc-400">
                    Kredibilitas: {report.credibilityScore}
                  </p>
                </div>
                {report.badge ? (
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-zinc-500">
                    {report.badge}
                  </p>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{report.report}</p>
              </article>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </main>
  );
}
