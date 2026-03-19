"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const galleryScrollRafRef = useRef(0);
  const [scrollY, setScrollY] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
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

  const heroTranslateY = Math.min(scrollY * 0.065, 30);
  const heroTranslateX = Math.min(scrollY * 0.02, 8);
  const heroScale = 1.01 + Math.min(scrollY * 0.0001, 0.04);

  const updateActiveGalleryItem = useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery) {
      return;
    }

    const items = Array.from(
      gallery.querySelectorAll<HTMLElement>("[data-gallery-item]")
    );
    if (items.length === 0) {
      return;
    }

    const galleryCenter = gallery.scrollLeft + gallery.clientWidth / 2;
    let closestIndex = 0;
    let smallestDistance = Number.POSITIVE_INFINITY;

    items.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(itemCenter - galleryCenter);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveGalleryIndex((previous) =>
      previous === closestIndex ? previous : closestIndex
    );
  }, []);

  const handleGalleryScroll = useCallback(() => {
    cancelAnimationFrame(galleryScrollRafRef.current);
    galleryScrollRafRef.current = requestAnimationFrame(updateActiveGalleryItem);
  }, [updateActiveGalleryItem]);

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

  useEffect(
    () => () => {
      cancelAnimationFrame(galleryScrollRafRef.current);
    },
    []
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(95%_70%_at_90%_0%,rgba(127,29,29,0.26),transparent_54%),radial-gradient(80%_60%_at_0%_30%,rgba(91,33,182,0.16),transparent_56%),#000] px-6 py-8 text-zinc-100 md:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="relative space-y-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">
          <div className="pointer-events-none absolute -right-24 top-[-6rem] h-80 w-80 rounded-full bg-red-500/28 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-900/24 via-transparent to-black" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-black" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.09)_0_1px,transparent_1px_3px)]" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_144px_rgba(0,0,0,0.7)]" />

          <div className="relative z-10 space-y-5">
            <Link
              href="/ghost-archive"
              className="inline-flex items-center text-sm text-zinc-300 transition duration-300 ease-out hover:text-red-300"
            >
              &larr; Kembali ke Arsip
            </Link>

            <div className="space-y-5">
              <div className="relative h-[22rem] overflow-hidden rounded-2xl border border-zinc-800 sm:h-[30rem] lg:h-[34rem]">
                <div className="absolute inset-0 [animation:archiveHeroDrift_18s_ease-in-out_infinite_alternate] will-change-transform">
                  <Image
                    src={entry.mainImage}
                    alt={entry.name}
                    fill
                    className="object-cover object-top brightness-[0.74] contrast-[1.18] saturate-[1.03] will-change-transform"
                    style={{
                      transform: `translate3d(${heroTranslateX}px,${heroTranslateY}px,0) scale(${heroScale})`
                    }}
                    sizes="100vw"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/48 via-black/34 to-black/94" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/64 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(72%_74%_at_84%_14%,rgba(220,38,38,0.42),transparent_58%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_72%_at_14%_100%,rgba(126,34,206,0.28),transparent_66%)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(80%_100%_at_50%_100%,rgba(255,255,255,0.12),transparent_70%)] opacity-35 blur-xl" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.1)_0_1px,transparent_1px_3px)]" />
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_130px_rgba(0,0,0,0.76)]" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
                  <div className="space-y-4 rounded-2xl border border-red-400/40 bg-[linear-gradient(155deg,rgba(7,7,9,0.62),rgba(7,7,9,0.88))] p-4 backdrop-blur-md shadow-[0_26px_52px_-28px_rgba(0,0,0,0.95),0_0_0_1px_rgba(239,68,68,0.2)] sm:max-w-4xl sm:p-5">
                    <div className="h-px w-28 bg-gradient-to-r from-red-400/85 via-purple-400/55 to-transparent" />
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
                      className="border-red-400/38 bg-black/52 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-red-500/35 bg-[linear-gradient(160deg,rgba(24,24,27,0.9),rgba(9,9,11,0.99))] p-4 shadow-[0_22px_46px_-30px_rgba(220,38,38,0.5),inset_0_1px_0_rgba(244,63,94,0.2)]">
                <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  Artifact Dossier
                </p>
                <div className="mt-2 h-px w-28 bg-gradient-to-r from-red-400/80 via-purple-400/50 to-transparent" />
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
              className="absolute left-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-600/70 bg-black/60 text-zinc-200 backdrop-blur transition duration-350 ease-out hover:scale-110 hover:border-red-400/70 hover:bg-black/80 hover:text-red-200 hover:shadow-[0_0_28px_rgba(220,38,38,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60"
              aria-label="Gambar sebelumnya"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={() => handleGalleryNav("right")}
              className="absolute right-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-600/70 bg-black/60 text-zinc-200 backdrop-blur transition duration-350 ease-out hover:scale-110 hover:border-red-400/70 hover:bg-black/80 hover:text-red-200 hover:shadow-[0_0_28px_rgba(220,38,38,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60"
              aria-label="Gambar berikutnya"
            >
              &rarr;
            </button>

            <div
              ref={galleryRef}
              onScroll={handleGalleryScroll}
              className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-2 pr-8 overscroll-x-contain sm:pr-10 lg:pr-12"
            >
              {entry.gallery.map((imagePath, index) => (
                <div
                  key={`${entry.id}-gallery-${index}`}
                  data-gallery-item
                  className={`group relative h-52 w-[78%] min-w-[15.5rem] snap-start overflow-hidden rounded-xl border transition duration-350 ease-out sm:w-[54%] lg:w-[34%] ${
                    activeGalleryIndex === index
                      ? "scale-[1.02] border-red-500/55 shadow-[0_24px_42px_-26px_rgba(239,68,68,0.68)]"
                      : "scale-[0.985] border-zinc-800/85 opacity-92"
                  }`}
                >
                  <Image
                    src={imagePath}
                    alt={`${entry.name} galeri ${index + 1}`}
                    fill
                    className={`object-cover transition duration-350 ease-out group-hover:scale-[1.045] ${
                      activeGalleryIndex === index
                        ? "brightness-[1.04] contrast-[1.1]"
                        : "brightness-[0.86] contrast-[1.04]"
                    }`}
                    sizes="(max-width: 768px) 78vw, (max-width: 1024px) 54vw, 34vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/68 via-transparent to-black/18" />
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
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/28 bg-zinc-900/58 p-3 shadow-[0_14px_34px_-24px_rgba(220,38,38,0.45)]">
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
                  className="rounded-lg border border-zinc-700 bg-zinc-950/85 px-2.5 py-1.5 text-xs text-zinc-200 outline-none transition duration-300 ease-out focus:border-red-400/70"
                >
                  <option value="latest">Terbaru</option>
                  <option value="credible">Paling Kredibel</option>
                </select>
              </label>
            </div>

            <div className="relative pl-1 sm:pl-2">
              <div className="pointer-events-none absolute bottom-2 left-4 top-2 w-px bg-gradient-to-b from-red-400/40 via-zinc-700/90 to-transparent" />
              <div className="pointer-events-none absolute bottom-2 left-4 top-2 w-px bg-gradient-to-b from-red-400/45 via-purple-400/30 to-transparent blur-[1.2px]" />
              <div className="space-y-3">
                {sortedReports.map((report) => (
                  <article
                    key={report.id}
                    className={`relative ml-8 rounded-xl border p-3 transition duration-350 ease-out hover:-translate-y-0.5 sm:p-4 ${
                      report.credibilityScore >= 85
                        ? "border-red-500/42 bg-[linear-gradient(160deg,rgba(24,24,27,0.8),rgba(8,8,11,0.98))] shadow-[0_20px_40px_-28px_rgba(239,68,68,0.62)]"
                        : "border-zinc-800/90 bg-zinc-900/62 hover:border-red-400/35"
                    }`}
                  >
                    <div className="pointer-events-none absolute -left-4 top-5 h-px w-4 bg-zinc-700/90" />
                    <div
                      className={`absolute -left-8 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border bg-zinc-900 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-200 ${
                        report.credibilityScore >= 85
                          ? "border-red-400/65 shadow-[0_0_22px_rgba(239,68,68,0.45)]"
                          : "border-zinc-700/80"
                      }`}
                    >
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
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] ${
                          report.credibilityScore >= 85
                            ? "border-red-400/50 bg-red-950/35 text-red-100"
                            : "border-zinc-700/90 bg-zinc-950/95 text-zinc-300"
                        }`}
                      >
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

      <style jsx global>{`
        @keyframes archiveHeroDrift {
          0% {
            transform: scale(1) translate3d(0%, 0%, 0);
          }
          50% {
            transform: scale(1.04) translate3d(-1.1%, 0.8%, 0);
          }
          100% {
            transform: scale(1.08) translate3d(1.4%, -0.7%, 0);
          }
        }
      `}</style>
    </main>
  );
}
