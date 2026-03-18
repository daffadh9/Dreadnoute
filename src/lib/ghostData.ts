import { GHOST_ARCHIVE_ENTRIES } from "@/features/archive/data/ghostData";
import type { GhostArchiveEntry } from "@/features/archive/types/archive";

type LegacyGhostEntity = {
  id: string;
  slug: string;
  name: string;
  image: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  category: string;
  origin: string;
  summary: string;
};

const DANGER_TO_RARITY: Record<GhostArchiveEntry["dangerLevel"], LegacyGhostEntity["rarity"]> = {
  Rendah: "Common",
  Sedang: "Rare",
  Tinggi: "Epic",
  Ekstrem: "Legendary",
};

export const GHOST_ENTITIES: LegacyGhostEntity[] = GHOST_ARCHIVE_ENTRIES.map((entry) => ({
  id: entry.id,
  slug: entry.slug,
  name: entry.name,
  image: entry.mainImage,
  rarity: DANGER_TO_RARITY[entry.dangerLevel],
  category: entry.category,
  origin: entry.origin,
  summary: entry.summary,
}));

export default GHOST_ENTITIES;
