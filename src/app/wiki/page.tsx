import { redirect } from "next/navigation";

export default function WikiLegacyPage() {
  // Legacy route: Ghost Wiki dipensiunkan, gunakan Ghost Archive sebagai ensiklopedia resmi.
  redirect("/ghost-archive");
}
