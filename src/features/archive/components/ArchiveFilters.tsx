"use client";

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
    <section className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
      <div className="space-y-2">
        <label
          htmlFor="archive-search"
          className="text-xs uppercase tracking-[0.16em] text-zinc-400"
        >
          Pencarian Entitas
        </label>
        <input
          id="archive-search"
          type="text"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cari nama, asal, atau kata kunci..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-500/30"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {ARCHIVE_FILTER_CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${
                isActive
                  ? "border border-red-300/50 bg-red-500/20 text-red-100"
                  : "border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
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
