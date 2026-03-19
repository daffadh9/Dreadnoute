"use client";

import { ChevronDown, Globe2, MapPin, Search } from "lucide-react";

export const ALL_CATEGORY_FILTER = "Semua";
export const ALL_COUNTRY_FILTER = "Semua Negara";
export const ALL_REGION_FILTER = "Semua Daerah";

export type ArchiveFilterCategory = string;

type ArchiveFiltersProps = {
  searchValue: string;
  selectedCategory: ArchiveFilterCategory;
  selectedCountry: string;
  selectedRegion: string;
  hasActiveFilters: boolean;
  activeFilterCount: number;
  categoryOptions: string[];
  countryOptions: string[];
  regionOptions: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: ArchiveFilterCategory) => void;
  onCountryChange: (country: string) => void;
  onRegionChange: (region: string) => void;
  onResetFilters: () => void;
};

export function ArchiveFilters({
  searchValue,
  selectedCategory,
  selectedCountry,
  selectedRegion,
  hasActiveFilters,
  activeFilterCount,
  categoryOptions,
  countryOptions,
  regionOptions,
  onSearchChange,
  onCategoryChange,
  onCountryChange,
  onRegionChange,
  onResetFilters
}: ArchiveFiltersProps) {
  const categories = [ALL_CATEGORY_FILTER, ...categoryOptions];
  const countries = [ALL_COUNTRY_FILTER, ...countryOptions];
  const regions = [ALL_REGION_FILTER, ...regionOptions];

  return (
    <section className="space-y-5 rounded-2xl border border-zinc-800 bg-[linear-gradient(160deg,rgba(24,24,27,0.94),rgba(9,9,11,0.95))] p-5 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.9)]">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            Filter Arsip
          </p>

          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <span className="rounded-full border border-red-400/40 bg-red-500/12 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-red-100">
                {activeFilterCount} filter aktif
              </span>
            )}
            <button
              type="button"
              onClick={onResetFilters}
              disabled={!hasActiveFilters}
              className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${
                hasActiveFilters
                  ? "border-zinc-600 bg-zinc-900/80 text-zinc-200 hover:border-red-300/50 hover:text-red-100"
                  : "cursor-not-allowed border-zinc-800 bg-zinc-900/60 text-zinc-600"
              }`}
            >
              Reset
            </button>
          </div>
        </div>

        <label
          htmlFor="archive-search"
          className="group relative block overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900/75 transition focus-within:border-red-400/45 focus-within:shadow-[0_0_0_1px_rgba(248,113,113,0.24)]"
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-red-300" />
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

      <div className="grid gap-3 md:grid-cols-2">
        <label className="group relative block overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900/75 transition focus-within:border-red-400/45 focus-within:shadow-[0_0_0_1px_rgba(248,113,113,0.22)]">
          <Globe2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-red-300" />
          <select
            value={selectedCountry}
            onChange={(event) => onCountryChange(event.target.value)}
            className="w-full appearance-none bg-transparent py-3 pl-10 pr-10 text-sm text-zinc-100 outline-none"
          >
            {countries.map((country) => (
              <option key={country} value={country} className="bg-zinc-900 text-zinc-100">
                {country}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        </label>

        <label className="group relative block overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900/75 transition focus-within:border-red-400/45 focus-within:shadow-[0_0_0_1px_rgba(248,113,113,0.22)]">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-red-300" />
          <select
            value={selectedRegion}
            onChange={(event) => onRegionChange(event.target.value)}
            className="w-full appearance-none bg-transparent py-3 pl-10 pr-10 text-sm text-zinc-100 outline-none"
          >
            {regions.map((region) => (
              <option key={region} value={region} className="bg-zinc-900 text-zinc-100">
                {region}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        </label>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchValue.trim().length > 0 && (
            <span className="rounded-full border border-zinc-700 bg-zinc-900/75 px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-zinc-300">
              Kata kunci: {searchValue.trim()}
            </span>
          )}
          {selectedCountry !== ALL_COUNTRY_FILTER && (
            <span className="rounded-full border border-zinc-700 bg-zinc-900/75 px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-zinc-300">
              Negara: {selectedCountry}
            </span>
          )}
          {selectedRegion !== ALL_REGION_FILTER && (
            <span className="rounded-full border border-zinc-700 bg-zinc-900/75 px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-zinc-300">
              Daerah: {selectedRegion}
            </span>
          )}
          {selectedCategory !== ALL_CATEGORY_FILTER && (
            <span className="rounded-full border border-zinc-700 bg-zinc-900/75 px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-zinc-300">
              Kategori: {selectedCategory}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2.5">
        {categories.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.08em] transition ${
                isActive
                  ? "border-red-300/45 bg-red-500/16 text-red-100 shadow-[0_0_0_1px_rgba(248,113,113,0.22)]"
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
