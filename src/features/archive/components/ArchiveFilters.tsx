"use client";

import { Search } from "lucide-react";

export const ARCHIVE_FILTER_CATEGORIES = [
  "Semua",
  "Hantu",
  "Makhluk Mitologi",
  "Urban Legend",
  "Tempat Angker",
  "Fenomena Supranatural"
] as const;

export type ArchiveFilterCategory =
  (typeof ARCHIVE_FILTER_CATEGORIES)[number];

type ArchiveFiltersProps = {
  searchValue: string;
  selectedCategory: ArchiveFilterCategory;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: ArchiveFilterCategory) => void;
};

export function ArchiveFilters({
  searchValue,
  selectedCategory,
  onSearchChange,
  onCategoryChange
}: ArchiveFiltersProps) {
  return (
    <section className="space-y-5 rounded-2xl border border-zinc-800 bg-[linear-gradient(160deg,rgba(24,24,27,0.94),rgba(9,9,11,0.95))] p-5 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.9)]">
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          Filter Arsip
        </p>

        <label
          htmlFor="archive-search"
          className="group relative block overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900/75 transition focus-within:border-purple-400/45 focus-within:shadow-[0_0_0_1px_rgba(168,85,247,0.18)]"
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-purple-300" />
          <input
            id="archive-search"
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Cari nama entitas, asal, atau deskripsi..."
            className="w-full bg-transparent py-3 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {ARCHIVE_FILTER_CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.08em] transition ${
                isActive
                  ? "border-purple-300/45 bg-purple-500/18 text-purple-100 shadow-[0_0_0_1px_rgba(168,85,247,0.2)]"
                  : "border-zinc-700 bg-zinc-900/70 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
}
