import { redirect } from "next/navigation";

type WikiLegacyDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function WikiLegacyDetailPage({
  params
}: WikiLegacyDetailPageProps) {
  await params;

  // Legacy route detail tidak lagi menjadi implementasi aktif.
  // Untuk migration aman, semua detail lama diarahkan ke Ghost Archive utama.
  redirect("/ghost-archive");
}
