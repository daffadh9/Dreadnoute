import { notFound } from "next/navigation";
import { ArchiveDetail } from "@/features/archive/components/ArchiveDetail";
import {
  getAllGhostEntries,
  getGhostEntryBySlug
} from "@/features/archive/utils/archiveHelpers";

type GhostArchiveDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllGhostEntries().map((entry) => ({ slug: entry.slug }));
}

export default async function GhostArchiveDetailPage({
  params
}: GhostArchiveDetailPageProps) {
  const { slug } = await params;
  const entry = getGhostEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  return <ArchiveDetail entry={entry} />;
}
