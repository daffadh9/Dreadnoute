import type { GhostArchiveEntry } from "../types/archive";

type DangerLevelBadgeProps = {
  dangerLevel: GhostArchiveEntry["dangerLevel"];
  className?: string;
};

const dangerLevelStyles: Record<GhostArchiveEntry["dangerLevel"], string> = {
  Rendah: "bg-zinc-500/18 text-zinc-200 ring-1 ring-zinc-400/30",
  Sedang: "bg-amber-500/16 text-amber-200 ring-1 ring-amber-400/35",
  Tinggi: "bg-orange-500/18 text-orange-200 ring-1 ring-orange-400/40",
  Ekstrem: "bg-red-500/22 text-red-100 ring-1 ring-red-400/50 shadow-[0_0_18px_rgba(220,38,38,0.2)]"
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
