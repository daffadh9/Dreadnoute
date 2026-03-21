export type ArchiveHistorySection = {
  title: string;
  icon?: string;
  content: string[] | string;
};

export type DocumentChapter = {
  chapterNumber: number;
  title: string;
  subtitle?: string; // e.g. "Klasifikasi: MERAH"
  icon?: string;
  content: string[] | string;
  audioFile?: string; // path ke file audio lokal, e.g. "/sounds/chapters/pocong-ch1.mp3"
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
  chapters?: DocumentChapter[];
  abilities: string[];
  weaknesses: string[];
  dangerZones: string[];
  survivalGuide?: string[];
  mainImage: string;
  gallery: string[] | ArchiveGalleryImage[];
  reports: GhostArchiveReport[];
};
