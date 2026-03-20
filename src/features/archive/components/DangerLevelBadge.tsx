import type { GhostArchiveEntry } from "../types/archive";
import { Skull, AlertTriangle, ShieldAlert, BadgeInfo } from "lucide-react";

type DangerLevelBadgeProps = {
  dangerLevel: GhostArchiveEntry["dangerLevel"];
  className?: string;
};

const dangerIcons = {
  Rendah: BadgeInfo,
  Sedang: ShieldAlert,
  Tinggi: AlertTriangle,
  Ekstrem: Skull,
};

const dangerLevelStyles: Record<GhostArchiveEntry["dangerLevel"], string> = {
  Rendah: "border-zinc-500/50 bg-zinc-900/80 text-zinc-300 shadow-[inset_0_0_10px_rgba(161,161,170,0.1)]",
  Sedang: "border-amber-500/60 bg-amber-950/80 text-amber-200 shadow-[inset_0_0_12px_rgba(245,158,11,0.15)]",
  Tinggi: "border-orange-500/80 bg-orange-950/90 text-orange-200 shadow-[0_0_15px_rgba(249,115,22,0.4),inset_0_0_15px_rgba(249,115,22,0.2)] animate-pulse",
  Ekstrem: "border-red-600 bg-red-950 text-red-100 shadow-[0_0_20px_rgba(220,38,38,0.7),inset_0_0_20px_rgba(220,38,38,0.4)] animate-[pulse_1.5s_ease-in-out_infinite]"
};

const iconClass: Record<GhostArchiveEntry["dangerLevel"], string> = {
  Rendah: "text-zinc-400 h-3.5 w-3.5",
  Sedang: "text-amber-400 h-3.5 w-3.5",
  Tinggi: "text-orange-400 h-3.5 w-3.5 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]",
  Ekstrem: "text-red-400 h-4 w-4 drop-shadow-[0_0_10px_rgba(220,38,38,0.9)]",
};

export function DangerLevelBadge({
  dangerLevel,
  className = ""
}: DangerLevelBadgeProps) {
  const Icon = dangerIcons[dangerLevel];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] transition-all duration-500 ${dangerLevelStyles[dangerLevel]} ${className}`}
    >
      <Icon className={iconClass[dangerLevel]} />
      Tingkat Bahaya: {dangerLevel}
    </span>
  );
}
