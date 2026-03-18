export type GhostArchiveReport = {
  id: string;
  username: string;
  badge?: string;
  credibilityScore: number;
  report: string;
};

export type GhostArchiveEntry = {
  id: string;
  slug: string;
  name: string;
  category: string;
  origin: string;
  dangerLevel: "Rendah" | "Sedang" | "Tinggi" | "Ekstrem";
  summary: string;
  history: string[];
  abilities: string[];
  weaknesses: string[];
  dangerZones: string[];
  mainImage: string;
  gallery: string[];
  reports: GhostArchiveReport[];
};
