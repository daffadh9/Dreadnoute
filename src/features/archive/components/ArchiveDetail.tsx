"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GhostArchiveEntry } from "../types/archive";
import {
  getArchiveAlias,
  getArchiveMeta,
  getArchiveTags
} from "../utils/archiveHelpers";
import { DangerLevelBadge } from "./DangerLevelBadge";
import { SectionWrapper } from "./SectionWrapper";

type ArchiveDetailProps = {
  entry: GhostArchiveEntry;
};

export function ArchiveDetail({ entry }: ArchiveDetailProps) {
  const meta = getArchiveMeta(entry);
  const aliases = getArchiveAlias(entry);
  const evidenceTags = getArchiveTags(entry);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const heroTranslateY = Math.min(scrollY * 0.05, 20);
  const heroScale = 1.03 + Math.min(scrollY * 0.00008, 0.03);

  return (
    <main className="min-h-screen bg-[radial-gradient(95%_70%_at_90%_0%,rgba(127,29,29,0.16),transparent_58%),#000] px-6 py-8 text-zinc-100 md:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="relative space-y-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-black" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-black" />

          <div className="relative z-10 space-y-5">
            <Link
              href="/ghost-archive"
              className="inline-flex items-center text-sm text-zinc-300 transition duration-300 ease-out hover:text-red-300"
            >
              &larr; Kembali ke Arsip
            </Link>

            <div className="space-y-5">
              <div className="relative h-[22rem] overflow-hidden rounded-2xl border border-zinc-800 sm:h-[30rem] lg:h-[34rem]">
                <Image
                  src={entry.mainImage}
                  alt={entry.name}
                  fill
                  className="object-cover object-top will-change-transform"
                  style={{
                    transform: `translateY(${heroTranslateY}px) scale(${heroScale})`
                  }}
                  sizes="100vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/80" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 z-10 space-y-4 p-5 sm:p-7">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-300/90">
                    {entry.category}
                  </p>
                  <h1 className="text-3xl font-semibold text-zinc-100 sm:text-4xl lg:text-5xl">
                    {entry.name}
                  </h1>
                  {aliases.length > 0 ? (
                    <p className="text-xs uppercase tracking-[0.12em] text-zinc-300/85">
                      Alias: {aliases.join(" • ")}
                    </p>
                  ) : null}
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.12em] text-zinc-300/90">
                    <span className="rounded-full border border-zinc-600/70 bg-black/45 px-3 py-1">
                      {meta.country}
                    </span>
                    <span className="rounded-full border border-zinc-600/70 bg-black/45 px-3 py-1">
                      {meta.regionLabel}
                    </span>
                    <span className="rounded-full border border-zinc-600/70 bg-black/45 px-3 py-1">
                      Asal: {entry.origin}
                    </span>
                    {meta.era ? (
                      <span className="rounded-full border border-zinc-600/70 bg-black/45 px-3 py-1">
                        Era: {meta.era}
                      </span>
                    ) : null}
                    {meta.sourceType ? (
                      <span className="rounded-full border border-zinc-600/70 bg-black/45 px-3 py-1">
                        Sumber: {meta.sourceType}
                      </span>
                    ) : null}
                  </div>
                  <DangerLevelBadge
                    dangerLevel={entry.dangerLevel}
                    className="border-zinc-500/60 bg-black/45 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/45 p-4">
                {evidenceTags.length > 0 ? (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {evidenceTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-zinc-700 bg-zinc-900/75 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <p className="max-w-3xl leading-relaxed text-zinc-200">{entry.summary}</p>
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
          <div className="relative">
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 hidden w-10 bg-gradient-to-r from-black to-transparent sm:block" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 hidden w-10 bg-gradient-to-l from-black to-transparent sm:block" />

            <div className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-2 pr-8 overscroll-x-contain sm:pr-10 lg:pr-12">
              {entry.gallery.map((imagePath, index) => (
                <div
                  key={`${entry.id}-gallery-${index}`}
                  className="group relative h-52 w-[78%] min-w-[15.5rem] snap-start overflow-hidden rounded-xl border border-zinc-800 sm:w-[54%] lg:w-[34%]"
                >
                  <Image
                    src={imagePath}
                    alt={`${entry.name} galeri ${index + 1}`}
                    fill
                    className="object-cover transition duration-300 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 78vw, (max-width: 1024px) 54vw, 34vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15" />
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.12em] text-zinc-500">
              Geser galeri untuk melihat dokumentasi visual tambahan.
            </p>
          </div>
        </SectionWrapper>

        <SectionWrapper title="Laporan Saksi">
          <div className="space-y-4">
            {entry.reports.map((report) => (
              <article
                key={report.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 transition duration-300 ease-out hover:border-red-400/35"
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
