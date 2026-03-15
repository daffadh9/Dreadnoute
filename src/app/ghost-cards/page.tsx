"use client";

import React, { useEffect, useState } from "react";
import { GhostCard } from "@/components/GhostCard";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import Link from "next/link";

// Mock data as fallback
const MOCK_GHOSTS = [
  { id: "1", name: "The Weeping Willow", rarity: "Common", image_url: "", danger_lvl: 3, role: "Watcher", price: { dc: 100, obsidian: 0 }, tags: [] },
  { id: "2", name: "Shadow Stalker", rarity: "Uncommon", image_url: "", danger_lvl: 5, role: "Aggressor", price: { dc: 250, obsidian: 0 }, tags: [] },
  { id: "3", name: "The Grinning Man", rarity: "Rare", image_url: "", danger_lvl: 7, role: "Manipulator", price: { dc: 500, obsidian: 1 }, tags: [] },
  { id: "4", name: "Bloody Mary", rarity: "Epic", image_url: "", danger_lvl: 8, role: "Aggressor", price: { dc: 1000, obsidian: 2 }, tags: [] },
  { id: "5", name: "The Pale Lady", rarity: "Legendary", image_url: "", danger_lvl: 10, role: "Manipulator", price: { dc: 2500, obsidian: 5 }, tags: [] },
  { id: "6", name: "Looming Mirror", rarity: "Common", image_url: "", danger_lvl: 2, role: "Passive", price: { dc: 100, obsidian: 0 }, tags: [] },
];

export default function GhostCardsPage() {
  const [ghosts, setGhosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGhosts() {
      try {
        const { data, error } = await supabase.from("ghost_cards").select("*");
        if (error) throw error;
        if (data && data.length > 0) {
          setGhosts(data);
        } else {
          setGhosts(MOCK_GHOSTS);
        }
      } catch (err) {
        console.error("Error fetching ghosts:", err);
        setGhosts(MOCK_GHOSTS);
      } finally {
        setLoading(false);
      }
    }

    fetchGhosts();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto pb-32">
      <header className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-white mb-2 tracking-tighter"
        >
          Ghost <span className="text-accent ring-accent/30 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">Archive</span>
        </motion.h1>
        <p className="text-gray-500 font-serif">A compilation of entities encountered across the realms.</p>
        
        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search entities..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-accent/40 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[2/3] rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
        >
          {ghosts.map((ghost) => (
            <Link key={ghost.id} href={`/ghost-cards/${ghost.id}`}>
              <GhostCard
                id={ghost.id}
                name={ghost.name}
                rarity={ghost.rarity}
                image_url={ghost.image_url}
                danger_lvl={ghost.danger_lvl ?? 1}
                role={ghost.role ?? "Passive"}
                price={ghost.price ?? { dc: 0, obsidian: 0 }}
                tags={ghost.tags ?? []}
              />
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
