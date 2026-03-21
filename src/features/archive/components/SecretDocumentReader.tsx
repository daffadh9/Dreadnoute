"use client";

import { useState, useEffect } from "react";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import type { DocumentChapter } from "../types/archive";

interface SecretDocumentReaderProps {
  ghostName: string;
  chapters: DocumentChapter[];
  activeChapterIndex?: number;
  onActiveChapterChange?: (index: number) => void;
}

export function SecretDocumentReader({
  ghostName,
  chapters,
  activeChapterIndex = 0,
  onActiveChapterChange,
}: SecretDocumentReaderProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [displayIndex, setDisplayIndex] = useState(activeChapterIndex);

  // Sync internal display index if it changes from outside
  useEffect(() => {
    if (activeChapterIndex !== displayIndex) {
      triggerPageTurnAnim(activeChapterIndex);
    }
  }, [activeChapterIndex, displayIndex]);

  const playPageFlipEvent = () => {
    try {
      // Create a weak white noise / paper rustle using Web Audio API to guarantee sound if no file exists
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const node = ctx.createBufferSource();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) {
        data[i] = (Math.random() - 0.5) * 0.5; // noise
      }
      node.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 800;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      node.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      node.start();
    } catch (e) {}
  };

  const triggerPageTurnAnim = (newIndex: number) => {
    if (isAnimating) return;
    setDirection(newIndex > displayIndex ? 'next' : 'prev');
    setIsAnimating(true);
    playPageFlipEvent();
    
    // Halfway through animation, swap content
    setTimeout(() => {
      setDisplayIndex(newIndex);
      onActiveChapterChange?.(newIndex);
    }, 250);

    // End animation
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (displayIndex < chapters.length - 1) {
      triggerPageTurnAnim(displayIndex + 1);
    }
  };

  const handlePrev = () => {
    if (displayIndex > 0) {
      triggerPageTurnAnim(displayIndex - 1);
    }
  };

  const activeChapter = chapters[displayIndex];
  if (!activeChapter) return null;

  const contentLines = Array.isArray(activeChapter.content) ? activeChapter.content : [activeChapter.content];

  const renderFormattedText = (text: string) => {
    // Regex to capture **bold**, __underline__, and *italic*
    const parts = text.split(/(\*\*.*?\*\*|__.*?__|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('__') && part.endsWith('__')) {
        return <u key={i} className="underline decoration-[#8b4513]/40 underline-offset-2">{part.slice(2, -2)}</u>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="italic text-[#8b4513] font-medium">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  return (
    <div className="relative overflow-hidden w-full rounded-xl border border-yellow-900/40 bg-[#ebd5b3] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(0deg,transparent,transparent_23px,#d2b48c_24px)]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.1]"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/old-wall.png')" }}
      />
      
      {/* Heavy Fog Effect */}
      <div className="pointer-events-none absolute -inset-x-[100%] inset-y-0 opacity-[0.15]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/smoke.png')] mix-blend-multiply [animation:driftFog_40s_linear_infinite_alternate]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#8b4513]/10 to-transparent" />
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes driftFog {
          0% { transform: translateX(0) scale(1.1); }
          100% { transform: translateX(20%) scale(1.0); }
        }
      `}} />
      
      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#8b4513]/30 px-5 py-4 font-serif bg-[#d2b48c]/40 backdrop-blur-sm shadow-md">
        <div className="flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-[#8b4513]" />
          <div>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-widest text-[#4a2e1b]">BAB {activeChapter.chapterNumber}</h3>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8b4513]">Berkas: {ghostName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs sm:text-sm font-black text-[#8b4513]/80 mr-1 bg-[#8b4513]/10 px-3 py-1 rounded-md border border-[#8b4513]/20 shadow-inner">
            {displayIndex + 1} / {chapters.length}
          </div>
        </div>
      </div>

      {/* Pages Container with 3D Corner Peel Roll Animation */}
      <div className="relative z-10 overflow-hidden bg-gradient-to-b from-transparent to-[#8b4513]/5" style={{ perspective: "1500px" }}>
        <div 
          style={{
             transformStyle: "preserve-3d",
             transformOrigin: direction === 'next' ? "bottom right" : "bottom left",
             transform: isAnimating 
               ? `rotate3d(${direction === 'next' ? '-1, 1, 0, 45deg' : '1, 1, 0, 45deg'}) translateZ(50px) scale(0.95)` 
               : "rotate3d(0, 1, 0, 0deg) translateZ(0) scale(1)",
          }}
          className={`px-5 py-8 sm:px-10 sm:py-10 font-serif flex flex-col min-h-[400px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isAnimating ? "opacity-20 blur-[2px]" : "opacity-100 blur-0"
          }`}
        >
          <div className="mb-8 border-b border-[#8b4513]/30 pb-5">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-normal text-[#3e2723]">
              {activeChapter.title}
            </h2>
            {activeChapter.subtitle && (
              <p className="mt-3 text-[11px] sm:text-xs font-bold tracking-widest uppercase text-red-800/90">
                ⚠ {activeChapter.subtitle}
              </p>
            )}
          </div>

          <div className="space-y-5">
            {contentLines.map((line, i) => (
              <p key={i} className="text-base sm:text-[17px] leading-relaxed text-[#3e2723]" style={{ textIndent: i === 0 ? "2rem" : "0" }}>
                {renderFormattedText(line)}
              </p>
            ))}
          </div>
          
          {/* End Wax Seal if Last Chapter */}
          {displayIndex === chapters.length - 1 && (
            <div className="absolute right-4 bottom-4 lg:right-8 lg:bottom-8 opacity-90 pointer-events-none">
              <div className="w-14 h-14 rounded-full border-2 border-[#8b3a0f]/50 flex items-center justify-center rotate-12 shadow-inner"
                style={{ background: "radial-gradient(circle, #a93226, #7b241c)", boxShadow: "0 5px 15px rgba(123,36,28,0.6)" }}
              >
                <span className="text-[7px] font-black text-white/90 text-center leading-tight tracking-[0.2em] uppercase drop-shadow-md">END<br/>REPORT</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Nav */}
      <div className="relative z-10 flex items-center justify-between border-t border-[#8b4513]/30 bg-[#cda975]/60 backdrop-blur-sm px-5 py-4">
        <button 
          onClick={handlePrev} 
          disabled={displayIndex === 0}
          className={`group flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-colors ${displayIndex === 0 ? "opacity-30 cursor-not-allowed text-[#8b4513]" : "text-[#4a2e1b] hover:text-[#8b4513]"}`}
        >
          <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Bab Sebelumnya
        </button>

        <button 
          onClick={handleNext} 
          disabled={displayIndex === chapters.length - 1}
          className={`group flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-colors ${displayIndex === chapters.length - 1 ? "opacity-30 cursor-not-allowed text-[#8b4513]" : "text-[#4a2e1b] hover:text-[#8b4513]"}`}
        >
          Bab Selanjutnya
          <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
