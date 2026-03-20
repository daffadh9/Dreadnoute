export type ArchiveHistorySection = {
  title: string;
  icon?: string;
  content: string[] | string;
};

export type GhostArchiveReport = {
  id: string;
  username: string;
  badge?: string;
  credibilityScore: number;
  report: string;
};

export type ArchiveGalleryImage = {
  url: string;
  caption: string;
};

export type GhostArchiveEntry = {
  id: string;
  slug: string;
  name: string;
  category: string;
  origin: string;
  country: string;
  province: string;
  city?: string;
  aliases?: string[];
  era?: string;
  evidenceTags?: string[];
  sourceType?: string;
  dangerLevel: "Rendah" | "Sedang" | "Tinggi" | "Ekstrem";
  summary: string;
  history: string[];
  detailedHistory?: ArchiveHistorySection[];
  abilities: string[];
  weaknesses: string[];
  dangerZones: string[];
  survivalGuide?: string[];
  mainImage: string;
  gallery: string[] | ArchiveGalleryImage[];
  reports: GhostArchiveReport[];
};
