"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Mic2, 
  Activity, 
  Headphones, 
  Download, 
  Share2, 
  Heart,
  Search,
  Flame,
  Clock,
  Zap,
  Radio
} from "lucide-react";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const PODCAST_EPISODES = [
  { 
    id: "1", 
    title: "Bisikan Hutan Mati", 
    duration: "42:10", 
    date: "14 Mar 2026", 
    plays: "12.4k",
    description: "Rekaman lapangan di tengah rimbun Blackwood yang menangkap suara anomali frekuensi rendah.",
    image: "https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: "2", 
    title: "Saksi Bisu: Kamar 404", 
    duration: "28:45", 
    date: "10 Mar 2026", 
    plays: "8.1k",
    description: "Wawancara eksklusif dengan mantan perawat tentang kejadian 1966 di sanitarium terbengkalai.",
    image: "https://images.unsplash.com/photo-1502481851512-e9e2529bbbf9?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: "3", 
    title: "Frekuensi Terlarang", 
    duration: "55:20", 
    date: "05 Mar 2026", 
    plays: "15.9k",
    description: "Eksperimen siaran radio yang menyebabkan kepanikan massal di kota kecil.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1968&auto=format&fit=crop"
  }
];

export default function PodcastPage() {
  const { isPlaying, setIsPlaying, setCurrentTrack } = useStore();
  const [activeEpisode, setActiveEpisode] = useState(PODCAST_EPISODES[0]);

  const handlePlayEpisode = (ep: typeof PODCAST_EPISODES[0]) => {
    setActiveEpisode(ep);
    setCurrentTrack({
      title: ep.title,
      artist: "Sinar Gelap Podcast",
      cover: ep.image,
      url: "#" // Mock
    });
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen pt-10 pb-40 px-10 max-w-[1700px] mx-auto">
      {/* Investigative Header */}
      <header className="mb-20 flex flex-col md:flex-row gap-16 items-start">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full md:w-[450px] aspect-square rounded-[4rem] overflow-hidden border border-white/5 relative group shadow-2xl"
         >
            <Image 
              src={activeEpisode.image} 
              alt="Episode Cover" 
              fill 
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 brightness-50" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <motion.button 
                 whileTap={{ scale: 0.9 }}
                 onClick={() => handlePlayEpisode(activeEpisode)}
                 className="w-24 h-24 rounded-full bg-accent text-white flex items-center justify-center shadow-[0_0_40px_rgba(255,0,0,0.4)]"
               >
                  <Play size={32} fill="currentColor" />
               </motion.button>
            </div>
            
            {/* Rule of Thirds - Focus Element */}
            <div className="absolute top-10 right-10 flex flex-col items-end gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
               <span className="text-[8px] font-black uppercase text-accent tracking-[0.4em]">Signal Detected</span>
            </div>
         </motion.div>

         <div className="flex-1 space-y-10">
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                  <span className="px-4 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-accent text-[10px] font-black uppercase tracking-widest">The Investigative Tapes</span>
                  <div className="h-[1px] w-20 bg-white/5" />
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Season 04</span>
               </div>
               <h1 className="text-8xl font-black text-white uppercase font-serif italic tracking-tighter leading-none">{activeEpisode.title}</h1>
               <div className="flex items-center gap-8 pt-4">
                  <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                     <Clock size={14} />
                     {activeEpisode.duration}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                     <Heart size={14} />
                     {activeEpisode.plays} Saves
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                     <Zap size={14} />
                     480 DreadCoins Reward
                  </div>
               </div>
            </div>

            <p className="text-2xl font-serif italic text-zinc-400 leading-relaxed border-l-4 border-accent pl-10 max-w-3xl">
               "{activeEpisode.description}"
            </p>

            <div className="flex items-center gap-6 pt-6">
               <button onClick={() => handlePlayEpisode(activeEpisode)} className="px-12 py-6 bg-accent text-white rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-4 pulsing-red shadow-[0_20px_40px_rgba(255,0,0,0.2)]">
                  Mulai Analisa Suara
               </button>
               <button className="p-6 bg-white/5 border border-white/5 rounded-3xl text-zinc-600 hover:text-white transition-all">
                  <Download size={20} />
               </button>
               <button className="p-6 bg-white/5 border border-white/5 rounded-3xl text-zinc-600 hover:text-white transition-all">
                  <Share2 size={20} />
               </button>
            </div>

            {/* Binaural Prompt */}
            <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] flex items-center gap-6 max-w-xl">
               <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Headphones size={28} />
               </div>
               <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-[11px] mb-1 italic">Rekomendasi Archivist: Binaural Audio</h4>
                  <p className="text-[10px] text-zinc-600 leading-relaxed capitalize">Gunakan earphone untuk pengalaman suara 8D yang lebih tajam. Deteksi suara tersembunyi untuk reward koin.</p>
               </div>
            </div>
         </div>
      </header>

      {/* Interactive Visualizer / Waveform Section */}
      <section className="mb-24 bg-[#050505] rounded-[4rem] p-16 border border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02]" />
         
         <div className="flex items-center justify-between mb-16 relative z-10">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <Activity size={20} className="animate-pulse" />
               </div>
               <div>
                  <h3 className="text-white font-serif text-2xl italic uppercase tracking-tighter">Live EVP Spectrum</h3>
                  <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Anomali Terdeteksi di Sinyal</p>
               </div>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="text-right">
                  <span className="text-accent font-black font-mono text-xl tracking-widest drop-shadow-[0_0_10px_red]">66.6 MHZ</span>
                  <p className="text-[8px] font-black text-zinc-800 uppercase">Frequency Lock</p>
               </div>
               <div className="w-px h-10 bg-white/5" />
               <Radio size={24} className="text-zinc-800" />
            </div>
         </div>

         {/* Interactive Waveform Gimmick */}
         <div className="h-64 flex items-center justify-center gap-2 relative z-10 px-20">
            {[...Array(60)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ 
                  height: isPlaying ? [20, 120, 40, i % 2 === 0 ? 180 : 100, 20] : 20,
                  opacity: isPlaying ? [0.2, 0.8, 0.3] : 0.1,
                  backgroundColor: i % 10 === 0 ? "rgb(255, 0, 0)" : "rgb(255, 255, 255)"
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.03,
                  ease: "easeInOut"
                }}
                className="w-1.5 rounded-full"
              />
            ))}
            
            {/* Secret Reward Trigger Mark */}
            <motion.div 
              style={{ left: "75%" }}
              className="absolute top-1/2 -translate-y-1/2 h-full flex flex-col items-center justify-center p-4 group cursor-pointer"
            >
               <div className="h-full w-px bg-accent/20 group-hover:bg-accent transition-colors" />
               <div className="absolute bottom-0 text-[8px] font-black text-accent/40 group-hover:text-accent font-mono uppercase tracking-[0.3em] transition-colors">
                  [ Hidden Signal ]
               </div>
            </motion.div>
         </div>
      </section>

      {/* Episode List */}
      <section className="space-y-10">
         <div className="flex items-end justify-between px-2">
            <h2 className="text-3xl font-black text-white uppercase font-serif tracking-tight leading-none italic">Arsip Rekaman Lainnya</h2>
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={14} />
               <input 
                 type="text" 
                 placeholder="Cari Rekaman" 
                 className="bg-white/5 border border-white/5 rounded-full py-2.5 pl-10 pr-6 text-[9px] font-black uppercase text-white focus:outline-none focus:border-accent/40 transition-all placeholder:text-zinc-800"
               />
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PODCAST_EPISODES.map((ep) => (
               <motion.div 
                 key={ep.id}
                 whileHover={{ y: -8 }}
                 onClick={() => setActiveEpisode(ep)}
                 className={cn(
                    "group relative bg-[#080808] border border-white/5 p-8 rounded-[3.5rem] cursor-pointer transition-all duration-500 overflow-hidden shadow-2xl",
                    activeEpisode.id === ep.id && "border-accent/40 bg-accent/5"
                 )}
               >
                  <div className="flex gap-6 items-center">
                     <div className="w-24 h-24 rounded-[2rem] overflow-hidden border border-white/5 relative shrink-0">
                        <Image src={ep.image} alt={ep.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-accent/20">
                           <Play size={20} fill="white" className="text-white" />
                        </div>
                     </div>
                     <div className="overflow-hidden">
                        <span className="text-[8px] font-black text-accent/60 uppercase tracking-[0.3em] mb-1 block">EPISODE {ep.id.padStart(2, '0')}</span>
                        <h4 className="text-xl font-black text-white uppercase tracking-tighter truncate font-serif italic mb-1 group-hover:text-accent transition-colors">{ep.title}</h4>
                        <div className="flex gap-4 items-center opacity-40">
                           <span className="text-[9px] font-bold text-white uppercase tracking-widest">{ep.duration}</span>
                           <span className="text-[9px] font-bold text-white uppercase tracking-widest">{ep.date}</span>
                        </div>
                     </div>
                  </div>
                  
                  {activeEpisode.id === ep.id && (
                     <div className="absolute top-6 right-8">
                        <Activity size={16} className="text-accent animate-pulse" />
                     </div>
                  )}

                  <div className="mt-8 flex justify-between items-center relative z-10 px-2">
                     <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest group-hover:text-zinc-500">{ep.plays} LISTENS</span>
                     <button className="text-[9px] font-black text-accent uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Dengarkan Sekarang ⇀
                     </button>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>
    </div>
  );
}
