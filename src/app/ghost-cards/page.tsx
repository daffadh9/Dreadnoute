"use client";

import React, { useEffect, useState } from "react";
import { GhostCard } from "@/components/GhostCard";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown, Radio } from "lucide-react";
import Link from "next/link";

const MOCK_GHOSTS = [
  { id: "1", name: "Jerangkong", rarity: "Common" as const, image_url: "/assets/images/jerangkong.jpg", danger_lvl: 4, role: "Aggressor" as const, price: { dc: 500, obsidian: 3 }, tags: [] },
  { id: "2", name: "Nenek Gayung", rarity: "Rare" as const, image_url: "/assets/images/nenek-gayung.jpg", danger_lvl: 7, role: "Watcher" as const, price: { dc: 1500, obsidian: 10 }, tags: [] },
  { id: "3", name: "Suster Ngesot", rarity: "Mythic" as const, image_url: "/assets/images/suster-ngesot.jpg", danger_lvl: 9, role: "Manipulator" as const, price: { dc: 5000, obsidian: 50 }, tags: [] },
  { id: "4", name: "Nyi Roro Kidul", rarity: "Legendary" as const, image_url: "/assets/images/nyi-roro-kidul.jpg", danger_lvl: 10, role: "Watcher" as const, price: { dc: 15000, obsidian: 200 }, tags: [] },
];

const CATEGORIES = [
  { label: "SEMUA", count: 4 },
  { label: "TRENDING", count: 2 },
  { label: "TERLANGKA", count: 1 },
  { label: "BANYAK DICARI", count: 3 },
  { label: "EKSKLUSIF", count: 1 },
];

const ROLES = ["ALL ROLE", "AGGRESSOR", "WATCHER", "MANIPULATOR", "PASSIVE"];

const WILAYAHS = ["GLOBAL", "JAWA BARAT", "JAWA TENGAH", "JAWA TIMUR", "JAKARTA", "BALI", "SUMATERA", "PANTAI SELATAN", "URBAN"];

export default function GhostCardsPage() {
  const [ghosts, setGhosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("SEMUA");
  const [activeRole, setActiveRole] = useState("ALL ROLE");
  const [activeWilayah, setActiveWilayah] = useState("GLOBAL");
  const [search, setSearch] = useState("");

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

  const filteredGhosts = ghosts.filter((g) => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchRole = activeRole === "ALL ROLE" || (g.role || "").toUpperCase() === activeRole;
    return matchSearch && matchRole;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto pb-32">
      {/* ─── HEADER ─── */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Radio size={11} className="text-red-500 animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.4em] text-red-500 uppercase">Wiki Ghost</span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-white mb-2 tracking-tighter"
        >
          Ghost <span className="text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">Archive</span>
        </motion.h1>
        <p className="text-gray-500 font-serif text-sm max-w-lg">
          Katalogisasi entitas anomali lintas dimensi yang telah terverifikasi oleh para Penjaga Arsip terdahulu.
        </p>
      </header>

      {/* ─── SEARCH + STATS ─── */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari entitas..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-red-500/40 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
          <Filter size={14} />
          Filter Lanjutan
          <ChevronDown size={14} />
        </button>
      </div>

      {/* ─── FILTER TABS: KATEGORI ─── */}
      <div className="mb-4">
        <p className="text-[9px] font-black tracking-[0.3em] text-gray-600 uppercase mb-2">// KATEGORI</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-wider transition-all ${
                activeCategory === cat.label
                  ? "bg-red-500/20 border-red-500/60 text-red-400"
                  : "bg-white/5 border-white/10 text-gray-500 hover:text-gray-300"
              }`}
            >
              {cat.label}
              <span className="opacity-50 text-[9px]">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── FILTER TABS: ROLE ─── */}
      <div className="mb-4">
        <p className="text-[9px] font-black tracking-[0.3em] text-gray-600 uppercase mb-2">// ROLE</p>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-4 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-wider transition-all ${
                activeRole === role
                  ? "bg-white/10 border-white/30 text-white"
                  : "bg-white/5 border-white/10 text-gray-500 hover:text-gray-300"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* ─── FILTER TABS: WILAYAH ─── */}
      <div className="mb-10">
        <p className="text-[9px] font-black tracking-[0.3em] text-gray-600 uppercase mb-2">// WILAYAH</p>
        <div className="flex flex-wrap gap-2">
          {WILAYAHS.map((w) => (
            <button
              key={w}
              onClick={() => setActiveWilayah(w)}
              className={`px-4 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-wider transition-all ${
                activeWilayah === w
                  ? "bg-white/10 border-white/30 text-white"
                  : "bg-white/5 border-white/10 text-gray-500 hover:text-gray-300"
              }`}
            >
              {w} <span className="opacity-30">↓</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── GHOST GRID ─── */}
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
          {filteredGhosts.map((ghost, i) => (
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
                index={i}
                cardNumber={i + 1}
              />
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
