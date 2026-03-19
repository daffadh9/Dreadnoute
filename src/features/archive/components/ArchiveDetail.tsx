"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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

const AccordionCard = ({ title, defaultOpen = false, children }: { title: string, defaultOpen?: boolean, children: React.ReactNode }) => {
  return (
    <details className="group rounded-xl border border-zinc-800/80 bg-zinc-950/40 shadow-md transition-all duration-300 open:border-red-500/50 open:bg-zinc-900/60" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-semibold tracking-wide text-zinc-200 outline-none transition-colors group-hover:text-red-400">
        <span className="text-sm uppercase tracking-[0.16em]">{title}</span>
        <ChevronDown className="h-4 w-4 text-zinc-500 transition-transform duration-300 group-open:rotate-180 group-open:text-red-500" />
      </summary>
      <div className="border-t border-zinc-800/80 px-4 pb-4 pt-3 text-sm text-zinc-300">
        {children}
      </div>
    </details>
  );
};

export function ArchiveDetail({ entry }: ArchiveDetailProps) {
  const meta = getArchiveMeta(entry);
  const aliases = getArchiveAlias(entry);
  const evidenceTags = getArchiveTags(entry);
  const [scrollY, setScrollY] = useState(0);
  const [reportSortMode, setReportSortMode] = useState<ReportSortMode>("latest");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePos({
          x: (e.clientX / window.innerWidth) * 20 - 10,
          y: (e.clientY / window.innerHeight) * 20 - 10,
        });
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

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

  const heroTranslateY = Math.min(scrollY * 0.08, 36);
  const heroTranslateX = Math.min(scrollY * 0.03, 12);
  const heroScale = 1 + Math.min(scrollY * 0.00006, 0.02);



  return (
    <main 
      className="min-h-screen px-6 py-8 text-zinc-100 md:px-10 transition-colors duration-300"
      style={{
        background: `radial-gradient(95% 70% at ${90 + mousePos.x}% ${mousePos.y}%, rgba(127,29,29,0.28), transparent 50%), radial-gradient(80% 60% at ${mousePos.x}% ${30 + mousePos.y}%, rgba(91,33,182,0.18), transparent 54%), #000`
      }}
    >
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="relative space-y-5 overflow-hidden rounded-2xl border border-red-500/28 bg-zinc-950/82 p-6 shadow-[0_32px_80px_-40px_rgba(220,38,38,0.55)]">
          <div className="pointer-events-none absolute -right-28 top-[-8rem] h-[26rem] w-[26rem] rounded-full bg-red-500/42 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute -left-28 -bottom-24 h-[22rem] w-[22rem] rounded-full bg-purple-500/30 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-900/30 via-transparent to-black" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-purple-900/24 via-transparent to-black" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.1)_0_1px,transparent_1px_3px)]" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.78)]" />

          <div className="relative z-10 space-y-6">
            <Link
              href="/ghost-archive"
              className="group inline-flex items-center text-sm text-zinc-300 transition duration-300 ease-out hover:-translate-x-1 hover:text-red-400"
            >
              &larr; <span className="ml-1">Kembali ke Arsip</span>
            </Link>

            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="order-2 space-y-6 lg:order-1">
                <div className="space-y-4 rounded-2xl border border-red-400/30 bg-[linear-gradient(155deg,rgba(7,7,9,0.56),rgba(7,7,9,0.86))] p-5 shadow-[0_34px_66px_-28px_rgba(0,0,0,0.98),0_0_0_1px_rgba(239,68,68,0.15)] backdrop-blur-lg sm:p-6">
                  <div className="h-px w-32 bg-gradient-to-r from-red-400/100 via-purple-400/70 to-transparent shadow-[0_0_16px_rgba(248,113,113,0.58)]" />
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-300/90">
                    {entry.category}
                  </p>
                  <h1 className="text-3xl font-semibold text-zinc-100 sm:text-4xl lg:text-5xl drop-shadow-md">
                    {entry.name}
                  </h1>
                  {aliases.length > 0 ? (
                    <p className="text-xs uppercase tracking-[0.12em] text-zinc-300/85">
                      Alias: {aliases.join(" | ")}
                    </p>
                  ) : null}
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.12em] text-zinc-300/90">
                    <span className="rounded-full border border-zinc-600/70 bg-black/45 px-3 py-1.5">
                      {meta.country}
                    </span>
                    <span className="rounded-full border border-zinc-600/70 bg-black/45 px-3 py-1.5">
                      {meta.regionLabel}
                    </span>
                    <span className="rounded-full border border-zinc-600/70 bg-black/45 px-3 py-1.5">
                      Asal: {entry.origin}
                    </span>
                    {meta.era ? (
                      <span className="rounded-full border border-zinc-600/70 bg-black/45 px-3 py-1.5">
                        Era: {meta.era}
                      </span>
                    ) : null}
                    {meta.sourceType ? (
                      <span className="rounded-full border border-zinc-600/70 bg-black/45 px-3 py-1.5">
                        Sumber: {meta.sourceType}
                      </span>
                    ) : null}
                  </div>
                  <DangerLevelBadge
                    dangerLevel={entry.dangerLevel}
                    className="border-red-400/58 bg-black/58 backdrop-blur-sm"
                  />
                </div>

                <div className="rounded-xl border border-red-500/30 bg-[linear-gradient(160deg,rgba(24,24,27,0.7),rgba(9,9,11,0.95))] p-5 shadow-[0_30px_58px_-30px_rgba(220,38,38,0.2),inset_0_1px_0_rgba(244,63,94,0.1)] sm:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Sejarah dan Asal Usul
                  </p>
                  <div className="mt-3 mb-4 h-px w-24 bg-gradient-to-r from-red-400/80 via-purple-400/40 to-transparent" />
                  {evidenceTags.length > 0 ? (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {evidenceTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-700/80 bg-zinc-900/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-zinc-300 font-medium italic border-l-2 border-red-500/50 pl-3">
                      {entry.summary}
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-300/90 whitespace-pre-wrap">
                      {entry.history.join("\n\n")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative h-[24rem] w-full overflow-hidden rounded-2xl border border-red-500/20 shadow-2xl sm:h-[32rem] lg:h-[40rem]">
                  <div className="absolute inset-0 [animation:archiveHeroDrift_10s_ease-in-out_infinite_alternate] will-change-transform">
                    <Image
                      src={entry.mainImage}
                      alt={entry.name}
                      fill
                      className="object-cover object-top brightness-[1.05] contrast-[1.2] saturate-[1.1] will-change-transform"
                      style={{
                        transform: `translate3d(${heroTranslateX}px,${heroTranslateY}px,0) scale(${heroScale})`
                      }}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
                  <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.1)_0_1px,transparent_1px_3px)]" />
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <AccordionCard title="Kemampuan" defaultOpen>
            <ul className="space-y-3">
              {entry.abilities.map((item) => (
                <li key={item} className="rounded-lg border border-red-500/10 bg-black/40 p-3 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </AccordionCard>

          <AccordionCard title="Kelemahan" defaultOpen>
            <ul className="space-y-3">
              {entry.weaknesses.map((item) => (
                <li key={item} className="rounded-lg border border-red-500/10 bg-black/40 p-3 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </AccordionCard>

          <AccordionCard title="Zona Rawan" defaultOpen>
            <ul className="space-y-3">
              {entry.dangerZones.map((zone) => (
                <li key={zone} className="rounded-lg border border-red-500/10 bg-black/40 p-3 leading-relaxed">
                  {zone}
                </li>
              ))}
            </ul>
          </AccordionCard>

          <AccordionCard title="Panduan Selamat" defaultOpen={true}>
            <ul className="space-y-3">
              {(entry.survivalGuide && entry.survivalGuide.length > 0) ? entry.survivalGuide.map((rule) => (
                <li key={rule} className="rounded-lg border border-green-500/20 bg-green-950/20 p-3 leading-relaxed text-zinc-200">
                  {rule}
                </li>
              )) : (
                <li className="rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-3 leading-relaxed italic text-zinc-500">
                  Tidak ada panduan selamat yang terdokumentasi secara resmi. Kontak secara langsung berisiko tinggi.
                </li>
              )}
            </ul>
          </AccordionCard>
        </section>

        <SectionWrapper title="Galeri" tone="featured">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {entry.gallery.map((imagePath, index) => (
              <div
                key={`${entry.id}-gallery-${index}`}
                className="group relative h-64 w-full overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/60 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.8)] transition duration-500 hover:border-red-500/60 hover:shadow-[0_12px_30px_-10px_rgba(220,38,38,0.3)]"
              >
                <Image
                  src={imagePath}
                  alt={`${entry.name} galeri visual ${index + 1}`}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 transition duration-500 group-hover:from-black/95 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-3 opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[10px] font-mono tracking-[0.2em] text-red-400 uppercase">
                    [ RECORD {index + 1} ]
                  </p>
                  <p className="mt-1 text-xs text-zinc-300">
                    Dokumentasi {entry.name} tertangkap kamera investigasi di lapangan.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper title="Laporan Saksi" tone="featured">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/45 bg-zinc-900/62 p-3 shadow-[0_20px_42px_-24px_rgba(220,38,38,0.58)]">
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
              <div className="pointer-events-none absolute bottom-2 left-4 top-2 w-px bg-gradient-to-b from-red-400/68 via-zinc-700/90 to-transparent" />
              <div className="pointer-events-none absolute bottom-2 left-4 top-2 w-px bg-gradient-to-b from-red-400/72 via-purple-400/44 to-transparent blur-[2px]" />
              <div className="space-y-3">
                {sortedReports.map((report) => (
                  <article
                    key={report.id}
                    className={`relative ml-8 rounded-xl border p-3 transition duration-350 ease-out hover:-translate-y-0.5 sm:p-4 ${
                      report.credibilityScore >= 85
                        ? "border-red-500/68 bg-[linear-gradient(160deg,rgba(24,24,27,0.84),rgba(8,8,11,0.99))] shadow-[0_26px_46px_-24px_rgba(239,68,68,0.75)]"
                        : "border-zinc-800/90 bg-zinc-900/62 hover:border-red-400/45"
                    }`}
                  >
                    <div className="pointer-events-none absolute -left-4 top-5 h-px w-4 bg-zinc-700/90" />
                    <div
                      className={`absolute -left-8 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border bg-zinc-900 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-200 ${
                        report.credibilityScore >= 85
                          ? "border-red-400/88 shadow-[0_0_34px_rgba(239,68,68,0.65)]"
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
                            ? "border-red-400/72 bg-red-950/52 text-red-100"
                            : "border-zinc-700/90 bg-zinc-950/95 text-zinc-300"
                        }`}
                      >
                        Kredibel {report.credibilityScore}
                      </span>
                    </div>

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

                  <p className="mt-4 text-sm leading-relaxed text-zinc-200 font-mono tracking-wide bg-black/20 p-3 rounded-lg border border-zinc-800 italic">
                    {report.report}
                  </p>
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
            transform: scale(1.06) translate3d(-1.4%, 1%, 0);
          }
          100% {
            transform: scale(1.1) translate3d(1.8%, -1.1%, 0);
          }
        }
      `}</style>
    </main>
  );
}
