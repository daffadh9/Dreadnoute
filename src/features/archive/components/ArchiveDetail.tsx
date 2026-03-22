"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, FolderLock, ShieldAlert, Radar, Zap, ShieldCheck, MapPin, Target, TrendingUp, CheckCircle2, FileText, BookOpen, Eye, Activity, Brain, Users, X, ZoomIn, ZoomOut, Volume2, Headphones, Disc3, Mic2, Network, Waves, Settings2, Loader2 } from "lucide-react";
import type { GhostArchiveEntry } from "../types/archive";
import {
  getArchiveAlias,
  getArchiveMeta,
  getArchiveTags,
  getRelatedEntities
} from "../utils/archiveHelpers";
import { DangerLevelBadge } from "./DangerLevelBadge";
import { SectionWrapper } from "./SectionWrapper";

import { useStore } from "@/lib/store/store";
import { SecretDocumentReader } from "./SecretDocumentReader";

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
  const [selectedImage, setSelectedImage] = useState<{url: string, caption: string} | null>(null);
  
  // Experience Engine State
  const [voiceStyle, setVoiceStyle] = useState("kurator");
  const [useAmbience, setUseAmbience] = useState(false);
  const [activeReadingIndex, setActiveReadingIndex] = useState(-1);
  const [isGeneratingSpeech, setIsGeneratingSpeech] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ambienceAudioRef = useRef<HTMLAudioElement | null>(null);
  const [audioProgress, setAudioProgress] = useState(0); // 0-1 float
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  const { isPlaying, currentTrack, setIsPlaying, setCurrentTrack } = useStore();
  const baseTrackTitle = `Arsip Suara: ${entry.name}`;
  const trackTitle = entry.chapters && entry.chapters.length > 0 
    ? `${baseTrackTitle} (Bab ${activeChapterIndex + 1})` 
    : baseTrackTitle;
  const isThisTrackPlaying = isPlaying && currentTrack?.title === trackTitle;

  // Prepare sections for TTS: If chapters exist, ONLY read the active chapter.
  // Otherwise fallback to summary + detailedHistory.
  const fullNarrativeSections = useMemo(() => {
    if (entry.chapters && entry.chapters.length > 0) {
      const chapter = entry.chapters[activeChapterIndex];
      return [{
        title: chapter.title,
        content: Array.isArray(chapter.content) ? chapter.content.join(". ") : chapter.content
      }];
    }

    const sections: { title: string; content: string }[] = [
      { title: "Ringkasan", content: entry.summary }
    ];
    if (entry.detailedHistory) {
      for (const section of entry.detailedHistory) {
        sections.push({
          title: section.title,
          content: Array.isArray(section.content) ? section.content.join(". ") : section.content
        });
      }
    }
    return sections;
  }, [entry, activeChapterIndex]);

  // Restart/Clear Audio whenever the Active Chapter changes so it forces regeneration
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (isThisTrackPlaying) {
      setIsPlaying(false);
    }
  }, [activeChapterIndex]);

  // Sync the actual <audio> playback with the isThisTrackPlaying state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isThisTrackPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isThisTrackPlaying]);

  // Reading index highlight sync — accurate via audio timeupdate
  useEffect(() => {
    const audio = audioRef.current;
    if (!isThisTrackPlaying || !audio) {
      setActiveReadingIndex(-1);
      setAudioProgress(0);
      return;
    }

    const totalSections = fullNarrativeSections.length;
    const handleTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        const progress = audio.currentTime / audio.duration;
        setAudioProgress(progress);
        const currentSection = Math.min(Math.floor(progress * totalSections), totalSections - 1);
        setActiveReadingIndex(currentSection);
      }
    };
    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isThisTrackPlaying, fullNarrativeSections.length]);

  // Ambient audio using real MP3 file from public/sounds
  useEffect(() => {
    if (useAmbience) {
      const ambienceAudio = new Audio("/sounds/Background Music (BGM)/ES_Mental Stillness - Jay Varton.mp3");
      ambienceAudio.loop = true;
      ambienceAudio.volume = 0;
      ambienceAudio.play().catch(() => {});
      ambienceAudioRef.current = ambienceAudio;

      // Fade in over 3 seconds — max 0.08 sehingga vocal SELALU lebih keras dan ada "distant feeling"
      let vol = 0;
      const fadeIn = setInterval(() => {
        vol = Math.min(vol + 0.005, 0.08);
        if (ambienceAudio) ambienceAudio.volume = vol;
        if (vol >= 0.12) clearInterval(fadeIn);
      }, 100);

      return () => {
        clearInterval(fadeIn);
        let v = ambienceAudio.volume;
        const fadeOut = setInterval(() => {
          v = Math.max(v - 0.02, 0);
          ambienceAudio.volume = v;
          if (v <= 0) { clearInterval(fadeOut); ambienceAudio.pause(); ambienceAudio.src = ""; }
        }, 80);
        ambienceAudioRef.current = null;
      };
    } else {
      if (ambienceAudioRef.current) {
        const a = ambienceAudioRef.current;
        let v = a.volume;
        const fadeOut = setInterval(() => {
          v = Math.max(v - 0.02, 0);
          a.volume = v;
          if (v <= 0) { clearInterval(fadeOut); a.pause(); a.src = ""; }
        }, 80);
        ambienceAudioRef.current = null;
      }
    }
  }, [useAmbience]);

  // Cleanup all audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; audioRef.current = null; }
      if (ambienceAudioRef.current) { ambienceAudioRef.current.pause(); ambienceAudioRef.current.src = ""; ambienceAudioRef.current = null; }
    };
  }, []);

  const handlePlayAudio = async () => {
    // Toggle pause
    if (isThisTrackPlaying) {
      setIsPlaying(false);
      return;
    }

    // Resume if already generated for THIS specific section
    if (audioRef.current && currentTrack?.title === trackTitle) {
      setIsPlaying(true);
      return;
    }

    // Generate new audio from ElevenLabs with FULL sections
    try {
      setIsGeneratingSpeech(true);

      // PENTING: Stop & destroy audio sebelumnya agar tidak muncul double voice
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sections: fullNarrativeSections,
          voiceStyle
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const audioUrl = `data:audio/mpeg;base64,${data.audioBase64}`;

      // Create single Audio element — playback dikendalikan HANYA via useEffect sync
      const audio = new Audio(audioUrl);
      audio.volume = 1.0;
      audio.onended = () => {
        setIsPlaying(false);
      };
      audioRef.current = audio;

      setCurrentTrack({
        title: trackTitle,
        artist: `DreadNoute AI Curator`,
        cover: entry.mainImage,
        url: audioUrl
      });
      // Setting isPlaying will trigger useEffect sync yang memanggil audio.play() SEKALI saja
      setIsPlaying(true);
    } catch (err: any) {
      console.error("Gagal generate audio:", err);
      alert("Gagal memanggil arsip suara: " + err.message);
    } finally {
      setIsGeneratingSpeech(false);
    }
  };

  const relatedEntities = useMemo(() => getRelatedEntities(entry).slice(0, 3), [entry]);

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
      <div className="mx-auto max-w-6xl space-y-8" style={{ overflow: 'visible' }}>
        <header className="relative space-y-5 rounded-2xl border border-red-500/28 bg-zinc-950/82 p-6 shadow-[0_32px_80px_-40px_rgba(220,38,38,0.55)]" style={{ overflow: 'visible' }}>
          <div className="pointer-events-none absolute -right-28 top-[-8rem] h-[26rem] w-[26rem] rounded-full bg-red-500/42 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute -left-28 -bottom-24 h-[22rem] w-[22rem] rounded-full bg-purple-500/30 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-900/30 via-transparent to-black/60" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-purple-900/24 via-transparent to-black/50" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.1)_0_1px,transparent_1px_3px)]" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.6)]" />

          <div className="relative z-10 space-y-6">
            <Link
              href="/ghost-archive"
              className="group inline-flex items-center text-sm text-zinc-300 transition duration-300 ease-out hover:-translate-x-1 hover:text-red-400"
            >
              &larr; <span className="ml-1">Kembali ke Arsip</span>
            </Link>

            <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
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

                {/* ── DOKUMEN RAHASIA (Main Column) ── */}
                <AccordionCard 
                  title={entry.chapters && entry.chapters.length > 0 ? "Dokumen Rahasia (Arsip Lengkap)" : "Sejarah & Asal Usul"} 
                  icon={<FolderLock className={`h-5 w-5 ${entry.chapters ? 'text-yellow-500' : 'text-zinc-400'}`} />} 
                  theme={entry.chapters ? "warning" : "default"} 
                  defaultOpen
                >
                  {entry.chapters && entry.chapters.length > 0 ? (
                    <SecretDocumentReader
                      ghostName={entry.name}
                      chapters={entry.chapters}
                      activeChapterIndex={activeChapterIndex}
                      onActiveChapterChange={setActiveChapterIndex}
                    />
                  ) : (
                    /* Fallback for entries without chapters yet */
                    <div className="relative overflow-hidden rounded-xl border border-yellow-900/40 bg-[#ebd5b3] px-5 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(0deg,transparent,transparent_23px,#d2b48c_24px)]" />
                      <div className="relative space-y-4 font-serif text-sm leading-relaxed text-[#3e2723]">
                        <p className="border-l-2 border-[#8b4513]/40 pl-4 font-medium italic">{entry.summary}</p>
                        {entry.detailedHistory?.map((section, i) => (
                          <div key={i} className="space-y-2 pt-2">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-[#4a2e1b] border-b border-[#8b4513]/20 pb-1">{section.title}</h3>
                            {Array.isArray(section.content)
                              ? <ul className="space-y-1 pl-4 list-disc marker:text-[#8b4513]/60 text-[#3e2723]">{section.content.map((p,j)=><li key={j}>{p}</li>)}</ul>
                              : <p>{section.content}</p>
                            }
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </AccordionCard>
              </div>

              {/* ── RIGHT MODULAR SIDEBAR ── */}
              <div className="order-1 lg:order-2">
                <div className="flex w-full flex-col gap-5 overflow-visible pb-6 pr-2">
                  
                  {/* Hero Image Block */}
                  <div className="relative h-[24rem] w-full shrink-0 overflow-hidden rounded-md border border-red-500/20 shadow-2xl sm:h-[32rem] lg:h-[40rem]">
                    <div className="absolute inset-0 [animation:archiveHeroDrift_15s_ease-in-out_infinite_alternate] will-change-transform">
                      <Image
                        src={entry.mainImage}
                        alt={entry.name}
                        fill
                        className="object-cover object-top brightness-[1] contrast-[1.2] saturate-[1.0] sepia-[0.3] will-change-transform"
                        style={{
                          transform: `translate3d(${heroTranslateX}px,${heroTranslateY}px,0) scale(${heroScale})`
                        }}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-white/10 opacity-0 animate-[flickerLight_8s_infinite]" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.15)_0%,transparent_50%)] animate-[pulse_4s_alternate_infinite]" />
                    <div className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent mix-blend-multiply" />
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.7),inset_0_0_30px_rgba(0,0,0,0.6)]" />
                  </div>

                  {/* Audio Player Sticky */}
                  <div className="group relative shrink-0 overflow-hidden rounded-xl border border-red-900/40 bg-[linear-gradient(160deg,#120909,#0a0505)] p-4 shadow-[0_10px_30px_-15px_rgba(220,38,38,0.4)]">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-600/10 blur-3xl transition-all group-hover:bg-red-500/20" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay" />
                    
                    <div className="relative flex items-center gap-3">
                      <button
                        onClick={handlePlayAudio}
                        className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                          isThisTrackPlaying 
                            ? "border-red-500 bg-red-950/80 text-red-100 shadow-[0_0_20px_rgba(220,38,38,0.5)] scale-105" 
                            : "border-red-900/60 bg-black/60 text-red-500 hover:border-red-500 hover:bg-red-950/40 hover:text-red-400"
                        }`}
                      >
                        {isGeneratingSpeech ? (
                          <Loader2 className="h-5 w-5 animate-spin text-red-500" />
                        ) : isThisTrackPlaying ? (
                          <div className="flex items-center justify-center gap-[3px]">
                            <span className="h-2.5 w-[3px] animate-[bounce_1s_infinite_100ms] rounded-full bg-red-400" />
                            <span className="h-3.5 w-[3px] animate-[bounce_1s_infinite_200ms] rounded-full bg-red-500" />
                            <span className="h-2.5 w-[3px] animate-[bounce_1s_infinite_300ms] rounded-full bg-red-400" />
                          </div>
                        ) : (
                          <Volume2 className="h-5 w-5 ml-0.5" />
                        )}
                        <div className={`absolute inset-0 rounded-full border border-red-500/30 ${isThisTrackPlaying || isGeneratingSpeech ? "animate-ping opacity-50" : "opacity-0"}`} />
                      </button>
                      <div className="flex-1 space-y-1 overflow-hidden">
                        <h3 className="text-sm font-bold tracking-wide text-zinc-100 truncate">
                          Arsip Suara
                        </h3>
                        <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.15em] text-red-500/80">
                          <span className="flex items-center gap-1"><Headphones className="h-3 w-3" /> Kurator Narator</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 mt-3 flex items-center gap-2 border-t border-red-900/40 pt-3">
                      <button 
                        onClick={() => setUseAmbience(!useAmbience)}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                          useAmbience 
                            ? "border-purple-500/40 bg-purple-950/30 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]" 
                            : "border-zinc-800 bg-black/40 text-zinc-500 hover:bg-zinc-900/60"
                        }`}
                      >
                        <Waves className={`h-3 w-3 ${useAmbience ? "animate-pulse" : ""}`} />
                        Ambient
                      </button>
                    </div>
                  </div>

                  {/* Active Status & Quick Facts */}
                  <div className="shrink-0 space-y-3 rounded-xl border border-zinc-800 bg-[#0d0a09]/80 p-4 shadow-md backdrop-blur-md">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-zinc-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Status Entitas</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-red-400">Aktif</span>
                      </div>
                    </div>
                    <ul className="space-y-2.5 pt-1 text-xs">
                      <li className="flex items-start justify-between gap-4">
                        <span className="text-zinc-500">Tingkat Bahaya</span>
                        <span className="font-semibold text-zinc-300 text-right">{entry.dangerLevel}</span>
                      </li>
                      <li className="flex items-start justify-between gap-4">
                        <span className="text-zinc-500">Era Asal</span>
                        <span className="font-semibold text-zinc-300 text-right">{meta.era || "-"}</span>
                      </li>
                      <li className="flex items-start justify-between gap-4">
                        <span className="text-zinc-500">Laporan Terakhir</span>
                        <span className="font-semibold text-zinc-300 text-right">3 Hari Lalu</span>
                      </li>
                    </ul>
                  </div>

                  {/* Navigasi Mini (TOC) */}
                  {entry.chapters && entry.chapters.length > 0 && (
                    <div className="shrink-0 space-y-3 rounded-xl border border-zinc-800 bg-[#0d0a09]/80 p-4 shadow-md backdrop-blur-md">
                      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                        <BookOpen className="h-4 w-4 text-zinc-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Navigasi Berkas</span>
                      </div>
                      <ul className="space-y-2 pt-1">
                        {entry.chapters.map((ch, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => {
                                setActiveChapterIndex(idx);
                              }}
                              className={`w-full flex items-center gap-2 rounded px-2 py-2 text-left text-[13px] font-medium transition-colors ${
                                activeChapterIndex === idx 
                                  ? "bg-yellow-900/40 text-yellow-500 border border-yellow-700/40" 
                                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                              }`}
                            >
                              <ChevronRight className={`h-4 w-4 shrink-0 ${activeChapterIndex === idx ? "opacity-100 text-yellow-500" : "opacity-0"}`} />
                              <span className="truncate">{ch.title}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}


                  
                </div>
              </div>

            </div>
          </div>
        </header>

        <section className="mt-12 grid gap-8 lg:grid-cols-2 mb-12">
          <AccordionCard title="Kemampuan" icon={<Zap className="h-5 w-5 text-purple-400" />} theme="glitch" defaultOpen>
            <ul className="space-y-4">
              {entry.abilities.map((item) => (
                <li key={item} className="rounded-lg border border-purple-500/10 bg-black/40 p-4 leading-relaxed shadow-[inset_0_0_10px_rgba(168,85,247,0.05)] text-[15px]">
                  {item}
                </li>
              ))}
            </ul>
          </AccordionCard>

          <AccordionCard title="Kelemahan" icon={<ShieldAlert className="h-5 w-5 text-orange-400" />} theme="warning" defaultOpen>
            <ul className="space-y-4">
              {entry.weaknesses.map((item) => (
                <li key={item} className="rounded-lg border border-orange-500/10 bg-black/40 p-4 leading-relaxed shadow-[inset_0_0_10px_rgba(249,115,22,0.05)] text-[15px]">
                  {item}
                </li>
              ))}
            </ul>
          </AccordionCard>

          <AccordionCard title="Zona Rawan" icon={<Radar className="h-5 w-5 text-green-400" />} theme="radar" defaultOpen>
            <ul className="space-y-4">
              {entry.dangerZones.map((zone) => (
                <li key={zone} className="flex items-center gap-3 rounded-lg border border-green-500/10 bg-black/40 p-4 leading-relaxed shadow-[inset_0_0_10px_rgba(34,197,94,0.05)] text-[15px]">
                  <MapPin className="h-4 w-4 text-green-500/80 shrink-0" />
                  <span>{zone}</span>
                </li>
              ))}
            </ul>
          </AccordionCard>

          <AccordionCard title="Panduan Selamat" icon={<ShieldCheck className="h-5 w-5 text-blue-400" />} theme="shield" defaultOpen={true}>
            <ul className="space-y-4">
              {(entry.survivalGuide && entry.survivalGuide.length > 0) ? entry.survivalGuide.map((rule) => (
                <li key={rule} className="rounded-lg border border-blue-500/20 bg-blue-950/20 p-4 leading-relaxed text-zinc-200 text-[15px]">
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
              {entry.gallery.map((item, index) => {
                const isObject = typeof item !== 'string';
                const url = isObject ? item.url : item;
                const caption = isObject ? item.caption : `Dokumentasi ${entry.name} tertangkap kamera investigasi di lapangan.`;

                return (
                  <div
                    key={`${entry.id}-gallery-${index}`}
                    onClick={() => setSelectedImage({ url, caption })}
                    className="group relative h-64 w-[85vw] shrink-0 cursor-zoom-in snap-center overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/60 shadow-md transition duration-500 hover:border-red-500/60 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)]"
                  >
                    <Image
                      src={url}
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
                      <p className="mt-1 text-xs text-zinc-300 line-clamp-2">
                        {caption}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Gallery Zoom Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md transition-all animate-in fade-in duration-300">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute right-6 top-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="relative h-[70vh] w-[90vw] max-w-5xl overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl">
              <Image
                src={selectedImage.url}
                alt="Selected"
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            
            <div className="mt-6 max-w-3xl px-6 text-center">
              <p className="text-zinc-100 text-lg font-medium">
                {selectedImage.caption}
              </p>
              <p className="mt-2 text-zinc-500 text-xs uppercase tracking-[0.2em]">
                Archives // Classified // {entry.id}
              </p>
            </div>
          </div>
        )}

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

        {relatedEntities.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 text-center text-zinc-100">
              <h2 className="bg-gradient-to-br from-zinc-100 to-zinc-400 bg-clip-text text-3xl font-black uppercase tracking-[0.2em] text-transparent drop-shadow-[0_0_15px_rgba(220,38,38,0.5)] sm:text-4xl flex items-center justify-center gap-3">
                <Network className="h-8 w-8 text-red-500" /> ENTITAS TERKAIT
              </h2>
              <div className="mt-4 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
              <p className="mt-4 text-sm text-zinc-400 max-w-2xl mx-auto tracking-wide">
                Arsip entitas dengan klasifikasi teror, pola, atau keterkaitan folklor yang sering muncul berdampingan dalam laporan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {relatedEntities.map((ghost) => (
                <Link
                  key={ghost.slug}
                  href={`/ghost-archive/${ghost.slug}`}
                  className="group flex flex-col rounded-2xl border border-red-900/40 bg-[#0A0505] overflow-hidden shadow-[0_0_40px_rgba(120,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-red-500/60"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={ghost.mainImage}
                      alt={ghost.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                    
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                      <h3 className="text-xl font-bold tracking-wide text-zinc-100 group-hover:text-red-400 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {ghost.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col items-start gap-3 justify-between bg-[linear-gradient(160deg,#120909,#0a0505)]">
                    <p className="text-xs leading-5 text-zinc-400 line-clamp-3">
                      {ghost.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
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
