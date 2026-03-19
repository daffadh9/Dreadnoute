"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

type ReportSortMode = "latest" | "credible";

const getReportSequence = (reportId: string) => {
  const sequence = Number(reportId.replace(/\D/g, ""));
  return Number.isNaN(sequence) ? 0 : sequence;
};

const getAvatarInitial = (username: string) => {
  const initial = username.trim().charAt(0);
  return initial ? initial.toUpperCase() : "?";
};

export function ArchiveDetail({ entry }: ArchiveDetailProps) {
  const meta = getArchiveMeta(entry);
  const aliases = getArchiveAlias(entry);
  const evidenceTags = getArchiveTags(entry);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [reportSortMode, setReportSortMode] = useState<ReportSortMode>("latest");

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

  const sortedReports = useMemo(() => {
    const reports = [...entry.reports];

    if (reportSortMode === "credible") {
      return reports.sort((left, right) => {
        if (right.credibilityScore !== left.credibilityScore) {
          return right.credibilityScore - left.credibilityScore;
        }

        return getReportSequence(right.id) - getReportSequence(left.id);
      });
    }

    return reports.sort(
      (left, right) => getReportSequence(right.id) - getReportSequence(left.id)
    );
  }, [entry.reports, reportSortMode]);

  const heroTranslateY = Math.min(scrollY * 0.05, 20);
  const heroScale = 1.03 + Math.min(scrollY * 0.00008, 0.03);

  const handleGalleryNav = (direction: "left" | "right") => {
    const gallery = galleryRef.current;
    if (!gallery) {
      return;
    }

    const firstItem = gallery.querySelector<HTMLElement>("[data-gallery-item]");
    const scrollStep = (firstItem?.offsetWidth ?? gallery.clientWidth * 0.74) + 16;

    gallery.scrollBy({
      left: direction === "right" ? scrollStep : -scrollStep,
      behavior: "smooth"
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(95%_70%_at_90%_0%,rgba(127,29,29,0.2),transparent_56%),radial-gradient(80%_60%_at_0%_30%,rgba(91,33,182,0.14),transparent_58%),#000] px-6 py-8 text-zinc-100 md:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="relative space-y-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-900/18 via-transparent to-black" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-purple-900/16 via-transparent to-black" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.09)_0_1px,transparent_1px_3px)]" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]" />

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
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/36 via-black/20 to-black/88" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/52 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_85%_12%,rgba(220,38,38,0.3),transparent_63%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_70%_at_14%_100%,rgba(126,34,206,0.22),transparent_68%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.1)_0_1px,transparent_1px_3px)]" />
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_92px_rgba(0,0,0,0.66)]" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
                  <div className="space-y-4 rounded-2xl border border-zinc-700/60 bg-[linear-gradient(155deg,rgba(10,10,10,0.62),rgba(10,10,10,0.84))] p-4 backdrop-blur-sm sm:max-w-4xl sm:p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-300/90">
                      {entry.category}
                    </p>
                    <h1 className="text-3xl font-semibold text-zinc-100 sm:text-4xl lg:text-5xl">
                      {entry.name}
                    </h1>
                    {aliases.length > 0 ? (
                      <p className="text-xs uppercase tracking-[0.12em] text-zinc-300/85">
                        Alias: {aliases.join(" | ")}
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
              </div>

              <div className="rounded-xl border border-zinc-700/70 bg-[linear-gradient(160deg,rgba(24,24,27,0.88),rgba(9,9,11,0.98))] p-4 shadow-[inset_0_1px_0_rgba(244,63,94,0.14)]">
                <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  Artifact Dossier
                </p>
                {evidenceTags.length > 0 ? (
                  <div className="mb-3 mt-3 flex flex-wrap gap-2">
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

        <SectionWrapper title="Galeri" tone="featured">
          <div className="relative">
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 hidden w-10 bg-gradient-to-r from-black to-transparent sm:block" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 hidden w-10 bg-gradient-to-l from-black to-transparent sm:block" />

            <button
              type="button"
              onClick={() => handleGalleryNav("left")}
              className="absolute left-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-600/70 bg-black/60 text-zinc-200 backdrop-blur transition duration-300 ease-out hover:border-red-400/55 hover:bg-black/75 hover:text-red-200 hover:shadow-[0_0_24px_rgba(220,38,38,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60"
              aria-label="Gambar sebelumnya"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={() => handleGalleryNav("right")}
              className="absolute right-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-600/70 bg-black/60 text-zinc-200 backdrop-blur transition duration-300 ease-out hover:border-purple-400/55 hover:bg-black/75 hover:text-purple-200 hover:shadow-[0_0_24px_rgba(147,51,234,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60"
              aria-label="Gambar berikutnya"
            >
              &rarr;
            </button>

            <div
              ref={galleryRef}
              className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-2 pr-8 overscroll-x-contain sm:pr-10 lg:pr-12"
            >
              {entry.gallery.map((imagePath, index) => (
                <div
                  key={`${entry.id}-gallery-${index}`}
                  data-gallery-item
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
              Gunakan panah atau geser untuk melihat dokumentasi visual tambahan.
            </p>
          </div>
        </SectionWrapper>

        <SectionWrapper title="Laporan Saksi" tone="featured">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/55 p-3">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">
                Thread Investigasi
              </p>
              <label className="inline-flex items-center gap-2 text-xs text-zinc-300">
                <span className="uppercase tracking-[0.12em] text-zinc-400">Urutkan</span>
                <select
                  value={reportSortMode}
                  onChange={(event) =>
                    setReportSortMode(event.target.value as ReportSortMode)
                  }
                  className="rounded-lg border border-zinc-700 bg-zinc-950/85 px-2.5 py-1.5 text-xs text-zinc-200 outline-none transition duration-200 focus:border-red-400/60"
                >
                  <option value="latest">Terbaru</option>
                  <option value="credible">Paling Kredibel</option>
                </select>
              </label>
            </div>

            <div className="relative pl-1 sm:pl-2">
              <div className="pointer-events-none absolute bottom-2 left-4 top-2 w-px bg-gradient-to-b from-red-400/40 via-zinc-700/90 to-transparent" />
              <div className="space-y-3">
                {sortedReports.map((report) => (
                  <article
                    key={report.id}
                    className="relative ml-8 rounded-xl border border-zinc-800/90 bg-zinc-900/62 p-3 transition duration-300 ease-out hover:border-red-400/35 sm:p-4"
                  >
                    <div className="pointer-events-none absolute -left-4 top-5 h-px w-4 bg-zinc-700/90" />
                    <div className="absolute -left-8 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-200">
                      {getAvatarInitial(report.username)}
                    </div>

                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-zinc-100">
                          @{report.username}
                        </p>
                        {report.badge ? (
                          <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                            {report.badge}
                          </p>
                        ) : null}
                      </div>
                      <span className="rounded-full border border-zinc-700/90 bg-zinc-950/95 px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-zinc-300">
                        Kredibel {report.credibilityScore}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">{report.report}</p>

                    {report.credibilityScore >= 85 ? (
                      <div className="mt-3 ml-2 border-l border-red-400/30 pl-3">
                        <p className="text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                          @arsip_editor
                        </p>
                        <p className="mt-1 text-xs text-zinc-400">
                          Laporan diprioritaskan untuk verifikasi lapangan lanjutan.
                        </p>
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </main>
  );
}
