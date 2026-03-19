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
  selectedProvince: string;
  selectedCity: string;
  hasActiveFilters: boolean;
  activeFilterCount: number;
  categoryOptions: string[];
  countryOptions: string[];
  provinceOptions: string[];
  cityOptions: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: ArchiveFilterCategory) => void;
  onCountryChange: (country: string) => void;
  onProvinceChange: (province: string) => void;
  onCityChange: (city: string) => void;
  onResetFilters: () => void;
  totalEntries: number;
};

export function ArchiveFilters({
  searchValue,
  selectedCategory,
  selectedCountry,
  selectedProvince,
  selectedCity,
  hasActiveFilters,
  activeFilterCount,
  categoryOptions,
  countryOptions,
  provinceOptions,
  cityOptions,
  onSearchChange,
  onCategoryChange,
  onCountryChange,
  onProvinceChange,
  onCityChange,
  onResetFilters,
  totalEntries
}: ArchiveFiltersProps) {
  const categories = [ALL_CATEGORY_FILTER, ...categoryOptions];
  const countries = [ALL_COUNTRY_FILTER, ...countryOptions];
  const provinces = [ALL_REGION_FILTER, ...provinceOptions];
  const cities = ["Semua Kota", ...cityOptions];

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

      <div className="grid gap-3 md:grid-cols-3">
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
            value={selectedProvince}
            onChange={(event) => onProvinceChange(event.target.value)}
            className="w-full appearance-none bg-transparent py-3 pl-10 pr-10 text-sm text-zinc-100 outline-none"
          >
            {provinces.map((province) => (
              <option key={province} value={province} className="bg-zinc-900 text-zinc-100">
                {province}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        </label>

        <label className={`group relative block overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900/75 transition ${selectedProvince === ALL_REGION_FILTER ? "opacity-50" : ""} focus-within:border-red-400/45 focus-within:shadow-[0_0_0_1px_rgba(248,113,113,0.22)]`}>
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-red-300" />
          <select
            value={selectedCity}
            onChange={(event) => onCityChange(event.target.value)}
            disabled={selectedProvince === ALL_REGION_FILTER}
            className="w-full appearance-none bg-transparent py-3 pl-10 pr-10 text-sm text-zinc-100 outline-none disabled:cursor-not-allowed"
          >
            {cities.map((city) => (
              <option key={city} value={city} className="bg-zinc-900 text-zinc-100">
                {city}
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
          {selectedProvince !== ALL_REGION_FILTER && (
            <span className="rounded-full border border-zinc-700 bg-zinc-900/75 px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-zinc-300">
              Provinsi: {selectedProvince}
            </span>
          )}
          {selectedCity !== "Semua Kota" && (
            <span className="rounded-full border border-zinc-700 bg-zinc-900/75 px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-zinc-300">
              Kota: {selectedCity}
            </span>
          )}
          {selectedCategory !== ALL_CATEGORY_FILTER && (
            <span className="rounded-full border border-zinc-700 bg-zinc-900/75 px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-zinc-300">
              Kategori: {selectedCategory}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2.5">
          {categories.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`group relative overflow-hidden rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.08em] transition-all duration-300 ${
                  isActive
                    ? "border-red-400/60 bg-red-600/20 text-red-100 shadow-[0_0_12px_rgba(248,113,113,0.3)]"
                    : "border-zinc-700 bg-zinc-900/70 text-zinc-300 hover:scale-[1.03] hover:border-red-400/40 hover:bg-zinc-800 hover:text-zinc-100 hover:shadow-[0_0_10px_rgba(220,38,38,0.2)]"
                }`}
              >
                {/* Subtle shine effect on hover */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full"></span>
                <span className="relative">{category}</span>
              </button>
            );
          })}
        </div>
        
        <div className="ml-auto rounded-xl border border-zinc-800/80 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
           <p className="text-xs font-medium text-zinc-300">
            <span className="text-red-400 font-bold">{totalEntries}</span> entitas
           </p>
        </div>
      </div>
    </section>
  );
}
