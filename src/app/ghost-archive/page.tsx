"use client";

import { useMemo, useState } from "react";
import { ArchiveGrid } from "@/features/archive/components/ArchiveGrid";
import {
  ArchiveFilters,
  ArchiveFilterCategory
} from "@/features/archive/components/ArchiveFilters";
import { ArchiveHeader } from "@/features/archive/components/ArchiveHeader";
import { getAllGhostEntries } from "@/features/archive/utils/archiveHelpers";

export default function GhostArchivePage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ArchiveFilterCategory>("Semua");

  const entries = useMemo(() => getAllGhostEntries(), []);

  const filteredEntries = useMemo(() => {
    const query = searchValue.toLowerCase().trim();

    return entries.filter((entry) => {
      const normalizedCategory = entry.category.toLowerCase();
      const normalizedOrigin = entry.origin.toLowerCase();
      const normalizedName = entry.name.toLowerCase();
      const normalizedSummary = entry.summary.toLowerCase();

      const matchesSearch =
        query.length === 0 ||
        normalizedName.includes(query) ||
        normalizedCategory.includes(query) ||
        normalizedOrigin.includes(query) ||
        normalizedSummary.includes(query);

      const matchesCategory =
        selectedCategory === "Semua" ||
        normalizedCategory === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [entries, searchValue, selectedCategory]);

  return (
    <main className="min-h-screen bg-[radial-gradient(90%_65%_at_85%_0%,rgba(76,29,149,0.18),transparent_55%),#000] p-6 text-white md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <ArchiveHeader
          total={filteredEntries.length}
          totalArchive={entries.length}
        />

        <ArchiveFilters
          searchValue={searchValue}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchValue}
          onCategoryChange={setSelectedCategory}
        />

        <ArchiveGrid entries={filteredEntries} />
      </div>
    </main>
  );
}
