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

const INDONESIA_GEO: Record<string, string[]> = {
  "Aceh": ["Banda Aceh", "Sabang", "Lhokseumawe", "Langsa", "Subulussalam"],
  "Sumatera Utara": ["Medan", "Binjai", "Pematangsiantar", "Tanjungbalai", "Tebing Tinggi", "Sibolga", "Padangsidempuan"],
  "Sumatera Barat": ["Padang", "Bukittinggi", "Payakumbuh", "Pariaman", "Sawahlunto", "Solok", "Padang Panjang"],
  "Riau": ["Pekanbaru", "Dumai"],
  "Kepulauan Riau": ["Batam", "Tanjungpinang"],
  "Jambi": ["Jambi", "Sungai Penuh"],
  "Sumatera Selatan": ["Palembang", "Prabumulih", "Lubuklinggau", "Pagar Alam"],
  "Bangka Belitung": ["Pangkal Pinang"],
  "Bengkulu": ["Bengkulu"],
  "Lampung": ["Bandar Lampung", "Metro"],
  "DKI Jakarta": ["Jakarta Pusat", "Jakarta Utara", "Jakarta Barat", "Jakarta Selatan", "Jakarta Timur"],
  "Jawa Barat": ["Bandung", "Bekasi", "Bogor", "Cimahi", "Cirebon", "Depok", "Sukabumi", "Tasikmalaya", "Banjar"],
  "Banten": ["Serang", "Cilegon", "Tangerang", "Tangerang Selatan"],
  "Jawa Tengah": ["Semarang", "Surakarta", "Magelang", "Pekalongan", "Salatiga", "Tegal", "Banyumas", "Klaten"],
  "Daerah Istimewa Yogyakarta": ["Yogyakarta", "Sleman", "Bantul", "Gunungkidul", "Kulon Progo"],
  "Jawa Timur": ["Surabaya", "Malang", "Batu", "Kediri", "Blitar", "Madiun", "Mojokerto", "Pasuruan", "Probolinggo", "Banyuwangi", "Sidoarjo"],
  "Bali": ["Denpasar", "Badung", "Gianyar", "Buleleng", "Klungkung", "Tabanan"],
  "Nusa Tenggara Barat": ["Mataram", "Bima", "Sumbawa"],
  "Nusa Tenggara Timur": ["Kupang", "Ende", "Maumere"],
  "Kalimantan Barat": ["Pontianak", "Singkawang", "Ketapang"],
  "Kalimantan Tengah": ["Palangka Raya", "Sampit", "Pangkalan Bun"],
  "Kalimantan Selatan": ["Banjarmasin", "Banjarbaru", "Martapura"],
  "Kalimantan Timur": ["Samarinda", "Balikpapan", "Bontang", "Berau"],
  "Kalimantan Utara": ["Tarakan", "Tanjung Selor"],
  "Sulawesi Utara": ["Manado", "Bitung", "Tomohon", "Kotamobagu"],
  "Gorontalo": ["Gorontalo"],
  "Sulawesi Tengah": ["Palu", "Poso", "Luwuk"],
  "Sulawesi Barat": ["Mamuju", "Majene"],
  "Sulawesi Selatan": ["Makassar", "Parepare", "Palopo", "Bone", "Gowa"],
  "Sulawesi Tenggara": ["Kendari", "Baubau"],
  "Maluku": ["Ambon", "Tual"],
  "Maluku Utara": ["Ternate", "Tidore Kepulauan", "Tobelo"],
  "Papua": ["Jayapura", "Biak", "Serui"],
  "Papua Barat": ["Manokwari", "Sorong", "Fakfak"],
  "Papua Selatan": ["Merauke"],
  "Papua Tengah": ["Nabire", "Timika"],
  "Papua Pegunungan": ["Wamena"],
  "Papua Barat Daya": ["Sorong Raya"]
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

  let extraProvinces: string[] = [];
  if (normalizedCountry === "indonesia" || normalizedCountry.length === 0) {
    extraProvinces = Object.keys(INDONESIA_GEO);
  }

  const extractedOptions = countryScopedEntries.map((e) => e.province).filter(Boolean);
  return getUniqueValues([...extractedOptions, ...extraProvinces]).sort();
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

  let extraCities: string[] = [];
  const validProvince = Object.keys(INDONESIA_GEO).find(
    (p) => normalize(p) === normalizedProvince
  );
  if (validProvince) {
    extraCities = INDONESIA_GEO[validProvince] || [];
  }

  const extractedOptions = provinceScopedEntries.map((e) => e.city ?? "").filter(Boolean);
  return getUniqueValues([...extractedOptions, ...extraCities]).sort();
};

export const getRelatedEntities = (
  entry: GhostArchiveEntry,
  entries: GhostArchiveEntry[] = GHOST_ARCHIVE_ENTRIES
): GhostArchiveEntry[] => {
  return entries
    .filter((e) => e.id !== entry.id)
    .map((e) => {
      let score = 0;
      if (e.category === entry.category) score += 3; // Similar Type
      if (e.province === entry.province) score += 2; // Same Region
      const commonTags = (e.evidenceTags ?? []).filter((t) => (entry.evidenceTags ?? []).includes(t));
      score += commonTags.length; // Same Behavior / Tags
      return { entry: e, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.entry);
};
