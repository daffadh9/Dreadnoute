import { GHOST_ARCHIVE_ENTRIES } from "../data/ghostData";
import type { GhostArchiveEntry } from "../types/archive";

const normalize = (value: string): string => value.trim().toLowerCase();

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
