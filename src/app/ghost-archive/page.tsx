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
  getArchiveProvinceOptions,
  getArchiveCityOptions,
  getGhostEntriesByFilters
} from "@/features/archive/utils/archiveHelpers";

export default function GhostArchivePage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ArchiveFilterCategory>(ALL_CATEGORY_FILTER);
  const [selectedCountry, setSelectedCountry] = useState(ALL_COUNTRY_FILTER);
  const [selectedProvince, setSelectedProvince] = useState(ALL_REGION_FILTER); // Reusing ALL_REGION_FILTER as "Semua Daerah"
  const [selectedCity, setSelectedCity] = useState("Semua Kota");

  const entries = useMemo(() => getAllGhostEntries(), []);
  const categoryOptions = useMemo(() => getArchiveCategoryOptions(entries), [entries]);
  const dataCountryOptions = useMemo(() => getArchiveCountryOptions(entries), [entries]);

  // Combine fixed countries with any missing from data
  const fixedCountries = ["Indonesia", "Jepang", "Filipina", "Korea", "Thailand", "Malaysia", "Amerika Serikat", "Meksiko", "Inggris", "Spanyol", "Arab Saudi", "Brasil", "India", "Turki"];
  const countryOptions = useMemo(() => Array.from(new Set([...fixedCountries, ...dataCountryOptions])), [dataCountryOptions]);

  const selectedCountryFilter =
    selectedCountry === ALL_COUNTRY_FILTER ? undefined : selectedCountry;
  const selectedProvinceFilter = 
    selectedProvince === ALL_REGION_FILTER ? undefined : selectedProvince;

  const provinceOptions = useMemo(
    () => getArchiveProvinceOptions(entries, selectedCountryFilter),
    [entries, selectedCountryFilter]
  );

  const cityOptions = useMemo(
    () => getArchiveCityOptions(entries, selectedProvinceFilter),
    [entries, selectedProvinceFilter]
  );

  const filteredEntries = useMemo(() => {
    return getGhostEntriesByFilters({
      query: searchValue,
      category:
        selectedCategory === ALL_CATEGORY_FILTER ? undefined : selectedCategory,
      country: selectedCountryFilter,
      province: selectedProvinceFilter,
      city: selectedCity === "Semua Kota" ? undefined : selectedCity
    });
  }, [searchValue, selectedCategory, selectedCountryFilter, selectedProvinceFilter, selectedCity]);

  const hasActiveFilters =
    searchValue.trim().length > 0 ||
    selectedCategory !== ALL_CATEGORY_FILTER ||
    selectedCountry !== ALL_COUNTRY_FILTER ||
    selectedProvince !== ALL_REGION_FILTER ||
    selectedCity !== "Semua Kota";

  const activeFilterCount = [
    searchValue.trim().length > 0,
    selectedCategory !== ALL_CATEGORY_FILTER,
    selectedCountry !== ALL_COUNTRY_FILTER,
    selectedProvince !== ALL_REGION_FILTER,
    selectedCity !== "Semua Kota"
  ].filter(Boolean).length;

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedProvince(ALL_REGION_FILTER);
    setSelectedCity("Semua Kota");
  };
  
  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setSelectedCity("Semua Kota");
  };

  const handleResetFilters = () => {
    setSearchValue("");
    setSelectedCategory(ALL_CATEGORY_FILTER);
    setSelectedCountry(ALL_COUNTRY_FILTER);
    setSelectedProvince(ALL_REGION_FILTER);
    setSelectedCity("Semua Kota");
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
          selectedProvince={selectedProvince}
          selectedCity={selectedCity}
          hasActiveFilters={hasActiveFilters}
          activeFilterCount={activeFilterCount}
          categoryOptions={categoryOptions}
          countryOptions={countryOptions}
          provinceOptions={provinceOptions}
          cityOptions={cityOptions}
          onSearchChange={setSearchValue}
          onCategoryChange={setSelectedCategory}
          onCountryChange={handleCountryChange}
          onProvinceChange={handleProvinceChange}
          onCityChange={setSelectedCity}
          onResetFilters={handleResetFilters}
          totalEntries={filteredEntries.length}
        />

        <ArchiveGrid entries={filteredEntries} />
      </div>
    </main>
  );
}
