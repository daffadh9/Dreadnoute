"use client";

import { useMemo, useState } from "react";
import { ArchiveGrid } from "@/features/archive/components/ArchiveGrid";
import {
  ALL_CATEGORY_FILTER,
  ALL_COUNTRY_FILTER,
  ALL_REGION_FILTER,
  ArchiveFilters,
  ArchiveFilterCategory
} from "@/features/archive/components/ArchiveFilters";
import { ArchiveHeader } from "@/features/archive/components/ArchiveHeader";
import {
  getAllGhostEntries,
  getArchiveCategoryOptions,
  getArchiveCountryOptions,
  getArchiveRegionOptions,
  getGhostEntriesByFilters
} from "@/features/archive/utils/archiveHelpers";

export default function GhostArchivePage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ArchiveFilterCategory>(ALL_CATEGORY_FILTER);
  const [selectedCountry, setSelectedCountry] = useState(ALL_COUNTRY_FILTER);
  const [selectedRegion, setSelectedRegion] = useState(ALL_REGION_FILTER);

  const entries = useMemo(() => getAllGhostEntries(), []);
  const categoryOptions = useMemo(() => getArchiveCategoryOptions(entries), [entries]);
  const countryOptions = useMemo(() => getArchiveCountryOptions(entries), [entries]);

  const selectedCountryFilter =
    selectedCountry === ALL_COUNTRY_FILTER ? undefined : selectedCountry;

  const regionOptions = useMemo(
    () => getArchiveRegionOptions(entries, selectedCountryFilter),
    [entries, selectedCountryFilter]
  );

  const filteredEntries = useMemo(() => {
    return getGhostEntriesByFilters({
      query: searchValue,
      category:
        selectedCategory === ALL_CATEGORY_FILTER ? undefined : selectedCategory,
      country: selectedCountryFilter,
      region: selectedRegion === ALL_REGION_FILTER ? undefined : selectedRegion
    });
  }, [searchValue, selectedCategory, selectedCountryFilter, selectedRegion]);

  const hasActiveFilters =
    searchValue.trim().length > 0 ||
    selectedCategory !== ALL_CATEGORY_FILTER ||
    selectedCountry !== ALL_COUNTRY_FILTER ||
    selectedRegion !== ALL_REGION_FILTER;

  const activeFilterCount = [
    searchValue.trim().length > 0,
    selectedCategory !== ALL_CATEGORY_FILTER,
    selectedCountry !== ALL_COUNTRY_FILTER,
    selectedRegion !== ALL_REGION_FILTER
  ].filter(Boolean).length;

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedRegion(ALL_REGION_FILTER);
  };

  const handleResetFilters = () => {
    setSearchValue("");
    setSelectedCategory(ALL_CATEGORY_FILTER);
    setSelectedCountry(ALL_COUNTRY_FILTER);
    setSelectedRegion(ALL_REGION_FILTER);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(95%_70%_at_85%_0%,rgba(127,29,29,0.2),transparent_56%),radial-gradient(75%_60%_at_15%_12%,rgba(76,29,149,0.12),transparent_58%),#000] p-6 text-white md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <ArchiveHeader
          total={filteredEntries.length}
          totalArchive={entries.length}
        />

        <ArchiveFilters
          searchValue={searchValue}
          selectedCategory={selectedCategory}
          selectedCountry={selectedCountry}
          selectedRegion={selectedRegion}
          hasActiveFilters={hasActiveFilters}
          activeFilterCount={activeFilterCount}
          categoryOptions={categoryOptions}
          countryOptions={countryOptions}
          regionOptions={regionOptions}
          onSearchChange={setSearchValue}
          onCategoryChange={setSelectedCategory}
          onCountryChange={handleCountryChange}
          onRegionChange={setSelectedRegion}
          onResetFilters={handleResetFilters}
        />

        <ArchiveGrid entries={filteredEntries} />
      </div>
    </main>
  );
}
