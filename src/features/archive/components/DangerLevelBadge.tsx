import type { GhostArchiveEntry } from "../types/archive";

type DangerLevelBadgeProps = {
  dangerLevel: GhostArchiveEntry["dangerLevel"];
  className?: string;
};

const dangerLevelStyles: Record<GhostArchiveEntry["dangerLevel"], string> = {
  Rendah: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30",
  Sedang: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30",
  Tinggi: "bg-orange-500/15 text-orange-300 ring-1 ring-orange-400/30",
  Ekstrem: "bg-red-500/20 text-red-200 ring-1 ring-red-400/40"
};

export function DangerLevelBadge({
  dangerLevel,
  className = ""
}: DangerLevelBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${dangerLevelStyles[dangerLevel]} ${className}`}
    >
      Tingkat Bahaya: {dangerLevel}
    </span>
  );
}
