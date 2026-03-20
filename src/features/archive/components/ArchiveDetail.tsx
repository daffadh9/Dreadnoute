"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, FolderLock, ShieldAlert, Radar, Zap, ShieldCheck, MapPin, Target, TrendingUp, CheckCircle2, FileText, BookOpen, Eye, Activity, Brain, Users } from "lucide-react";
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

type ReportSortMode = "latest" | "credible" | "location" | "witness" | "trending";

const getReportSequence = (reportId: string) => {
  const sequence = Number(reportId.replace(/\D/g, ""));
  return Number.isNaN(sequence) ? 0 : sequence;
};

const getAvatarInitial = (username: string) => {
  const initial = username.trim().charAt(0);
  return initial ? initial.toUpperCase() : "?";
};

const AccordionCard = ({ title, icon, defaultOpen = false, theme = "default", children }: { title: string, icon?: React.ReactNode, defaultOpen?: boolean, theme?: "glitch" | "warning" | "radar" | "shield" | "default", children: React.ReactNode }) => {
  const themeStyles = {
    glitch: "open:border-purple-500/50 group-open:animate-[glitchAppear_0.4s_ease-out_forwards]",
    warning: "open:border-orange-500/50 group-open:animate-[warningFlash_0.6s_ease-out_forwards]",
    radar: "open:border-green-500/50 group-open:animate-[radarPulse_1s_ease-out_forwards]",
    shield: "open:border-blue-500/50 group-open:animate-[shieldGlow_0.8s_ease-out_forwards]",
    default: "open:border-red-500/50 group-open:animate-in group-open:fade-in group-open:slide-in-from-top-2"
  };

  return (
    <details className={`group rounded-xl border border-zinc-800/80 bg-zinc-950/40 shadow-md transition-all duration-500 open:bg-zinc-900/60 ${themeStyles[theme].split(' ')[0]}`} open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-semibold tracking-wide text-zinc-200 outline-none transition-colors group-hover:text-red-400">
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-sm uppercase tracking-[0.16em]">{title}</span>
        </div>
        <ChevronDown className="h-4 w-4 text-zinc-500 transition-transform duration-500 group-open:-rotate-180 group-open:text-red-500" />
      </summary>
      <div className={`border-t border-zinc-800/80 px-4 pb-4 pt-3 text-sm text-zinc-300 ${themeStyles[theme].split(' ').slice(1).join(' ')}`}>
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

    if (reportSortMode === "location") {
      // Dummy logic for 'location', sorting randomly for now to show visual change
      return reports.sort((a,b) => b.id.length - a.id.length || a.username.length - b.username.length);
    }
    
    if (reportSortMode === "witness") {
      return reports.sort((a,b) => a.username.localeCompare(b.username));
    }
    
    if (reportSortMode === "trending") {
      return reports.sort((a,b) => b.credibilityScore - a.credibilityScore);
    }

    return reports.sort(
      (left, right) => getReportSequence(right.id) - getReportSequence(left.id)
    );
  }, [entry.reports, reportSortMode]);

  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollStep = galleryRef.current.clientWidth * 0.8;
      galleryRef.current.scrollBy({ left: direction === "right" ? scrollStep : -scrollStep, behavior: "smooth" });
    }
  };

  const heroTranslateY = Math.min(scrollY * 0.08, 36);
  const heroTranslateX = Math.min(scrollY * 0.03, 12);
  const heroScale = 1 + Math.min(scrollY * 0.00006, 0.02);



  return (
    <main 
      className="min-h-screen px-6 py-12 text-zinc-100 md:px-10 md:py-16 transition-colors duration-300"
      style={{
        background: `radial-gradient(95% 70% at ${90 + mousePos.x}% ${mousePos.y}%, rgba(127,29,29,0.28), transparent 50%), radial-gradient(80% 60% at ${mousePos.x}% ${30 + mousePos.y}%, rgba(91,33,182,0.18), transparent 54%), #0B0B0F`
      }}
    >
      <style>{`
        @keyframes unrollPaper {
          0% { clip-path: inset(0 0 100% 0); transform: translateY(-10px); }
          100% { clip-path: inset(0 0 0% 0); transform: translateY(0); }
        }
        @keyframes glitchAppear {
          0% { opacity: 0; filter: blur(4px) contrast(200%); transform: scale(0.98); }
          50% { opacity: 0.8; filter: blur(2px) contrast(150%); transform: scale(1.01); }
          100% { opacity: 1; filter: blur(0) contrast(100%); transform: scale(1); }
        }
        @keyframes warningFlash {
          0% { background-color: rgba(249, 115, 22, 0.4); }
          100% { background-color: transparent; }
        }
        @keyframes radarPulse {
          0% { box-shadow: inset 0 0 0 rgba(34, 197, 94, 0); }
          50% { box-shadow: inset 0 0 30px rgba(34, 197, 94, 0.25); }
          100% { box-shadow: inset 0 0 0 rgba(34, 197, 94, 0); }
        }
        @keyframes shieldGlow {
          0% { box-shadow: inset 0 0 0 rgba(59, 130, 246, 0); }
          100% { box-shadow: inset 0 0 40px rgba(59, 130, 246, 0.2); }
        }
        @keyframes flickerLight {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 0; }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.15; }
        }
        @keyframes archiveHeroDrift {
          0% { transform: scale(1.05) translate(0, 0); }
          100% { transform: scale(1.15) translate(-1%, 2%); }
        }
      `}</style>
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
                  <h1 className="text-3xl font-semibold text-zinc-100 sm:text-4xl lg:text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                    {entry.name}
                  </h1>
                  {aliases.length > 0 ? (
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E5E5E5]">
                      Alias: {aliases.join(" | ")}
                    </p>
                  ) : null}
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.12em] text-[#E5E5E5] font-medium">
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

                <details className="group relative rounded-xl border border-yellow-900/40 bg-[#1a1412] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-500 open:bg-[#201815]">
                  <summary className="flex cursor-pointer list-none flex-col gap-2 rounded-lg border border-yellow-800/30 bg-[linear-gradient(45deg,#2a1f1a,#3d2c24)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_10px_rgba(0,0,0,0.5)] transition-all hover:bg-[linear-gradient(45deg,#32251f,#4a352c)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FolderLock className="h-5 w-5 text-yellow-600/80" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-yellow-500/90">
                          Sejarah dan Asal Usul
                        </span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-yellow-600/80 transition-transform duration-500 group-open:rotate-180" />
                    </div>
                    
                    {/* Folder Tab Effect */}
                    <div className="mt-2 h-px w-full bg-gradient-to-r from-yellow-700/50 to-transparent" />
                  </summary>

                  <div className="relative mt-2 overflow-hidden rounded-b border-x border-b border-[#3b271d] bg-[#ebd5b3] px-5 py-6 shadow-[inset_0_5px_15px_rgba(0,0,0,0.5),inset_0_-15px_40px_rgba(139,69,19,0.2)] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] [clip-path:inset(0_0_100%_0)] group-open:animate-[unrollPaper_0.8s_forwards]">
                    {/* Paper Texture Overlay */}
                    <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(0deg,transparent,transparent_23px,#d2b48c_24px)]" />
                    <div className="pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/old-wall.png')]" />
                    <div className="pointer-events-none absolute inset-0 bg-[#3b271d] opacity-10 shadow-[inset_0_0_80px_rgba(59,39,29,0.8)]" />
                    
                    {evidenceTags.length > 0 ? (
                      <div className="relative mb-5 flex flex-wrap gap-2">
                        {evidenceTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded border border-[#8b4513]/30 bg-[#d2b48c]/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#5c3a21]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="relative space-y-6 font-serif text-sm leading-relaxed text-[#3e2723]">
                      <p className="border-l-2 border-[#8b4513]/40 pl-4 font-medium italic">
                        {entry.summary}
                      </p>
                      
                      {entry.detailedHistory ? (
                        <div className="space-y-6 pt-2">
                          {entry.detailedHistory.map((section, index) => {
                            const iconMap: Record<string, React.ReactNode> = {
                              FileText: <FileText className="h-4 w-4 text-[#8b4513]" />,
                              BookOpen: <BookOpen className="h-4 w-4 text-[#8b4513]" />,
                              MapPin: <MapPin className="h-4 w-4 text-[#8b4513]" />,
                              Eye: <Eye className="h-4 w-4 text-[#8b4513]" />,
                              Activity: <Activity className="h-4 w-4 text-[#8b4513]" />,
                              Brain: <Brain className="h-4 w-4 text-[#8b4513]" />,
                              Users: <Users className="h-4 w-4 text-[#8b4513]" />
                            };

                            return (
                              <div key={index} className="space-y-3">
                                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#4a2e1b] font-sans border-b border-[#8b4513]/20 pb-1">
                                  {section.icon && iconMap[section.icon]}
                                  {section.title}
                                </h3>
                                {Array.isArray(section.content) ? (
                                  <ul className="space-y-2 pl-4 list-disc marker:text-[#8b4513]/60">
                                    {section.content.map((p, i) => (
                                      <li key={i}>{p}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p>{section.content}</p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">
                          {entry.history.join("\n\n")}
                        </p>
                      )}
                    </div>
                    
                    {/* Stamp */}
                    <div className="pointer-events-none absolute bottom-4 right-4 h-16 w-16 rotate-12 rounded-full border-2 border-red-800/40 p-1 opacity-60">
                      <div className="flex h-full w-full items-center justify-center rounded-full border border-red-800/40 text-[8px] font-bold tracking-widest text-red-800/60">
                        VERIFIED
                      </div>
                    </div>
                  </div>
                </details>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative h-[24rem] w-full overflow-hidden rounded-md border border-red-500/20 shadow-2xl sm:h-[32rem] lg:h-[40rem]">
                  <div className="absolute inset-0 [animation:archiveHeroDrift_15s_ease-in-out_infinite_alternate] will-change-transform">
                    <Image
                      src={entry.mainImage}
                      alt={entry.name}
                      fill
                      className="object-cover object-top brightness-[0.8] contrast-[1.3] saturate-[1.0] sepia-[0.2] will-change-transform"
                      style={{
                        transform: `translate3d(${heroTranslateX}px,${heroTranslateY}px,0) scale(${heroScale})`
                      }}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-white/10 opacity-0 animate-[flickerLight_8s_infinite]" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.1)_0%,transparent_60%)] animate-[pulse_4s_alternate_infinite]" />
                  <div className="pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 mix-blend-multiply" />
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9),inset_0_0_60px_rgba(0,0,0,0.8)]" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-12 grid gap-8 lg:grid-cols-2 mb-12">
          <AccordionCard title="Kemampuan" icon={<Zap className="h-5 w-5 text-purple-400" />} theme="glitch" defaultOpen>
            <ul className="space-y-3">
              {entry.abilities.map((item) => (
                <li key={item} className="rounded-lg border border-purple-500/10 bg-black/40 p-3 leading-relaxed shadow-[inset_0_0_10px_rgba(168,85,247,0.05)]">
                  {item}
                </li>
              ))}
            </ul>
          </AccordionCard>

          <AccordionCard title="Kelemahan" icon={<ShieldAlert className="h-5 w-5 text-orange-400" />} theme="warning" defaultOpen>
            <ul className="space-y-3">
              {entry.weaknesses.map((item) => (
                <li key={item} className="rounded-lg border border-orange-500/10 bg-black/40 p-3 leading-relaxed shadow-[inset_0_0_10px_rgba(249,115,22,0.05)]">
                  {item}
                </li>
              ))}
            </ul>
          </AccordionCard>

          <AccordionCard title="Zona Rawan" icon={<Radar className="h-5 w-5 text-green-400" />} theme="radar" defaultOpen>
            <ul className="space-y-3">
              {entry.dangerZones.map((zone) => (
                <li key={zone} className="flex items-center gap-3 rounded-lg border border-green-500/10 bg-black/40 p-3 leading-relaxed shadow-[inset_0_0_10px_rgba(34,197,94,0.05)]">
                  <MapPin className="h-4 w-4 text-green-500/80 shrink-0" />
                  <span>{zone}</span>
                </li>
              ))}
            </ul>
          </AccordionCard>

          <AccordionCard title="Panduan Selamat" icon={<ShieldCheck className="h-5 w-5 text-blue-400" />} theme="shield" defaultOpen={true}>
            <ul className="space-y-3">
              {(entry.survivalGuide && entry.survivalGuide.length > 0) ? entry.survivalGuide.map((rule) => (
                <li key={rule} className="rounded-lg border border-blue-500/20 bg-blue-950/20 p-3 leading-relaxed text-zinc-200">
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

        <div className="pt-8">
          <div className="mb-8 flex flex-col items-center justify-center space-y-3 text-center">
            <h2 className="bg-gradient-to-br from-zinc-100 to-zinc-400 bg-clip-text text-3xl font-black uppercase tracking-[0.2em] text-transparent drop-shadow-[0_0_15px_rgba(220,38,38,0.5)] sm:text-4xl">
              Galeri
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
          </div>

          <div className="group/gallery relative rounded-2xl border border-red-500/20 bg-black/40 p-4 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]">
            <button
              onClick={() => scrollGallery("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-red-500/40 bg-zinc-950/80 text-white opacity-0 backdrop-blur transition-all duration-300 hover:scale-110 hover:border-red-400 hover:bg-black group-hover/gallery:opacity-100 focus:opacity-100"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => scrollGallery("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-red-500/40 bg-zinc-950/80 text-white opacity-0 backdrop-blur transition-all duration-300 hover:scale-110 hover:border-red-400 hover:bg-black group-hover/gallery:opacity-100 focus:opacity-100"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div
              ref={galleryRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
            >
              {entry.gallery.map((imagePath, index) => (
                <div
                  key={`${entry.id}-gallery-${index}`}
                  className="group relative h-64 w-[85vw] shrink-0 snap-center overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/60 shadow-md transition duration-500 hover:border-red-500/60 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)]"
                >
                  <Image
                    src={imagePath}
                    alt={`${entry.name} galeri visual ${index + 1}`}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 30vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 transition duration-500 group-hover:from-black/95 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
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
          </div>
        </div>

        <SectionWrapper title="Laporan Saksi" icon={<TrendingUp className="h-5 w-5" />} tone="featured">
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
                  <option value="location">Lokasi</option>
                  <option value="witness">Saksi Mata</option>
                  <option value="trending">Trending</option>
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
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-zinc-100">
                          @{report.username}
                        </p>
                        {report.credibilityScore > 80 && (
                          <span className="flex items-center gap-1 rounded bg-red-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-red-500 shadow-[inset_0_0_8px_rgba(220,38,38,0.15)]">
                            <CheckCircle2 className="h-2.5 w-2.5" />
                            SAKSI AKTIF
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {report.badge ? (
                          <p className="text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                            {report.badge}
                          </p>
                        ) : null}
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
