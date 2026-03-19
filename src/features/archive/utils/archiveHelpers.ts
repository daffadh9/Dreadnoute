import { GHOST_ARCHIVE_ENTRIES } from "../data/ghostData";
import type { GhostArchiveEntry } from "../types/archive";

const normalize = (value: string): string => value.trim().toLowerCase();

export type GhostArchiveFilterParams = {
  query?: string;
  category?: string;
  country?: string;
  province?: string;
  city?: string;
};

export type GhostArchiveMeta = {
  country: string;
  province: string;
  city?: string;
  regionLabel: string;
  locationLabel: string;
  era?: string;
  sourceType?: string;
};

const buildSearchIndex = (entry: GhostArchiveEntry): string => {
  return [
    entry.name,
    ...(entry.aliases ?? []),
    entry.category,
    entry.origin,
    entry.summary,
    entry.country,
    entry.province,
    entry.city ?? "",
    ...(entry.evidenceTags ?? []),
    entry.era ?? "",
    entry.sourceType ?? ""
  ]
    .join(" ")
    .toLowerCase();
};

export const getGhostRegionLabel = (entry: GhostArchiveEntry): string => {
  return entry.city ? `${entry.city}, ${entry.province}` : entry.province;
};

export const getArchiveAlias = (entry: GhostArchiveEntry): string[] => {
  return (entry.aliases ?? []).filter((alias) => alias.trim().length > 0);
};

export const getArchiveTags = (entry: GhostArchiveEntry): string[] => {
  return (entry.evidenceTags ?? []).filter((tag) => tag.trim().length > 0);
};

export const getArchiveMeta = (entry: GhostArchiveEntry): GhostArchiveMeta => {
  const regionLabel = getGhostRegionLabel(entry);

  return {
    country: entry.country,
    province: entry.province,
    city: entry.city,
    regionLabel,
    locationLabel: [entry.city, entry.province, entry.country]
      .filter(Boolean)
      .join(", "),
    era: entry.era,
    sourceType: entry.sourceType
  };
};

const getUniqueValues = (values: string[]): string[] => {
  return Array.from(new Set(values));
};

export const getAllGhostEntries = (): GhostArchiveEntry[] => {
  return [...GHOST_ARCHIVE_ENTRIES];
};

export const getGhostEntryBySlug = (
  slug: string
): GhostArchiveEntry | undefined => {
  const normalizedSlug = normalize(slug);
  return GHOST_ARCHIVE_ENTRIES.find(
    (entry) => normalize(entry.slug) === normalizedSlug
  );
};

export const getGhostEntriesByCategory = (
  category: string
): GhostArchiveEntry[] => {
  const normalizedCategory = normalize(category);
  return GHOST_ARCHIVE_ENTRIES.filter(
    (entry) => normalize(entry.category) === normalizedCategory
  );
};

export const getGhostEntriesByFilters = (
  filters: GhostArchiveFilterParams
): GhostArchiveEntry[] => {
  const normalizedQuery = normalize(filters.query ?? "");
  const normalizedCategory = normalize(filters.category ?? "");
  const normalizedCountry = normalize(filters.country ?? "");
  const normalizedProvince = normalize(filters.province ?? "");
  const normalizedCity = normalize(filters.city ?? "");

  return GHOST_ARCHIVE_ENTRIES.filter((entry) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      buildSearchIndex(entry).includes(normalizedQuery);

    const matchesCategory =
      normalizedCategory.length === 0 ||
      normalize(entry.category) === normalizedCategory;

    const matchesCountry =
      normalizedCountry.length === 0 ||
      normalize(entry.country) === normalizedCountry;

    const matchesProvince =
      normalizedProvince.length === 0 ||
      normalize(entry.province) === normalizedProvince;

    const matchesCity =
      normalizedCity.length === 0 ||
      normalize(entry.city ?? "") === normalizedCity;

    return matchesQuery && matchesCategory && matchesCountry && matchesProvince && matchesCity;
  });
};

export const getArchiveCategoryOptions = (
  entries: GhostArchiveEntry[] = GHOST_ARCHIVE_ENTRIES
): string[] => {
  return getUniqueValues(entries.map((entry) => entry.category));
};

export const getArchiveCountryOptions = (
  entries: GhostArchiveEntry[] = GHOST_ARCHIVE_ENTRIES
): string[] => {
  return getUniqueValues(entries.map((entry) => entry.country));
};

export const getArchiveProvinceOptions = (
  entries: GhostArchiveEntry[] = GHOST_ARCHIVE_ENTRIES,
  country?: string
): string[] => {
  const normalizedCountry = normalize(country ?? "");

  const countryScopedEntries =
    normalizedCountry.length === 0
      ? entries
      : entries.filter((entry) => normalize(entry.country) === normalizedCountry);

  return getUniqueValues(countryScopedEntries.map((e) => e.province).filter(Boolean));
};

export const getArchiveCityOptions = (
  entries: GhostArchiveEntry[] = GHOST_ARCHIVE_ENTRIES,
  province?: string
): string[] => {
  const normalizedProvince = normalize(province ?? "");

  const provinceScopedEntries =
    normalizedProvince.length === 0
      ? entries
      : entries.filter((entry) => normalize(entry.province) === normalizedProvince);

  return getUniqueValues(provinceScopedEntries.map((e) => e.city ?? "").filter(Boolean));
};
