"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { ChevronLeft, Skull, Flame, BookOpen, UserCircle2 } from "lucide-react";
import Image from "next/image";

const MOCK_GHOSTS: Record<string, any> = {
  "1": { 
    id: "1", 
    name: "The Weeping Willow", 
    rarity: "Common", 
    origin_story: "A sorrowful spirit bound to a lonely tree in the misty valley.", 
    scarier_level: 4, 
    lore: "Legend says those who hear her weeping at night will never find their way home." 
  },
  "2": { 
    id: "2", 
    name: "Shadow Stalker", 
    rarity: "Uncommon", 
    origin_story: "Born from the collective fear of the dark in old sanitariums.", 
    scarier_level: 6, 
    lore: "It doesn't attack directly, but slowly drains the sanity of those it follows." 
  },
  "3": { 
    id: "3", 
    name: "The Grinning Man", 
    rarity: "Rare", 
    origin_story: "Appeared first during the 1960s industrial accidents.", 
    scarier_level: 8, 
    lore: "His smile never fades, even when he isn't happy. He is a harbinger of disaster." 
  },
};

export default function GhostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [ghost, setGhost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGhost() {
      try {
        const { data, error } = await supabase.from("ghost_cards").select("*").eq("id", id).single();
        if (error || !data) {
          setGhost(MOCK_GHOSTS[id as string] || MOCK_GHOSTS["1"]);
        } else {
          setGhost(data);
        }
      } catch (err) {
        setGhost(MOCK_GHOSTS[id as string] || MOCK_GHOSTS["1"]);
      } finally {
        setLoading(false);
      }
    }
    fetchGhost();
  }, [id]);

  if (loading) return <div className="p-20 text-center text-accent">Summoning entity...</div>;
  if (!ghost) return <div className="p-20 text-center">Entity not found.</div>;

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto pb-32">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Archive
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Visual Section */}
        <motion.div 
          layoutId={`card-${ghost.id}`}
          className="aspect-[3/4] rounded-3xl overflow-hidden glass-morphism border border-accent/20 relative group"
        >
          <div className="absolute inset-0 bg-accent/5" />
          {ghost.image_url ? (
            <motion.div layoutId={`image-${ghost.id}`} className="w-full h-full relative">
              <Image src={ghost.image_url} alt={ghost.name} fill className="object-cover" />
            </motion.div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white/20">
              <Skull size={100} className="animate-pulse text-accent/20" />
              <p className="font-serif italic text-sm">Visual spectral data corrupted</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="px-3 py-1 rounded bg-accent/20 border border-accent/40 text-[10px] font-bold tracking-widest text-accent mb-2 block w-fit">
              {ghost.rarity}
            </span>
            <motion.h1 layoutId={`title-${ghost.id}`} className="text-4xl font-bold text-white">
              {ghost.name}
            </motion.h1>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Scare Level */}
          <div className="glass-morphism rounded-2xl p-6 border-l-4 border-l-accent">
            <div className="flex items-center gap-3 mb-4">
              <Flame size={20} className="text-accent" />
              <h2 className="text-lg font-bold text-white">Scarier Level</h2>
            </div>
            <div className="flex gap-2">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-8 flex-1 rounded-sm ${i < ghost.scarier_level ? "bg-accent shadow-[0_0_8px_rgba(255,0,0,0.6)]" : "bg-white/5"}`} 
                />
              ))}
            </div>
            <p className="mt-2 text-right text-xs font-mono text-accent">{ghost.scarier_level}/10 THREAT LEVEL</p>
          </div>

          {/* Origin Story */}
          <section>
            <div className="flex items-center gap-3 mb-3">
              <UserCircle2 size={20} className="text-accent" />
              <h3 className="font-serif text-xl text-white">Origin Story</h3>
            </div>
            <p className="text-gray-400 leading-relaxed font-serif italic text-lg opacity-80 backdrop-blur-sm">
              "{ghost.origin_story}"
            </p>
          </section>

          {/* Lore */}
          <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen size={20} className="text-accent" />
              <h3 className="font-serif text-xl text-white">Ancient Lore</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {ghost.lore}
            </p>
          </section>

          {/* Action */}
          <button className="w-full py-4 rounded-xl bg-accent text-white font-bold tracking-widest uppercase hover:scale-[1.02] transition-transform active:scale-95 neon-glow">
            Seal this Entity
          </button>
        </motion.div>
      </div>
    </div>
  );
}
