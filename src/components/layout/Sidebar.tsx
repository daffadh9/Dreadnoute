"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Ghost,
  Gamepad2,
  Mic2,
  ShoppingCart,
  ChevronRight,
  ChevronDown,
  Clapperboard,
  Users2,
  Trophy,
  Play,
  BookOpen,
  Newspaper,
  FlaskConical,
  Film,
  PenTool,
  BookMarked,
  MessageCircle,
  BookHeart,
  Gem,
  Store,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SIDEBAR_GROUPS = [
  {
    id: "dashboard",
    label: "DASHBOARD",
    icon: LayoutDashboard,
    href: "/",
    features: [],
  },
  {
    id: "explore",
    label: "EXPLORE",
    icon: Ghost,
    features: [
      { name: "Ghost Archive", href: "/ghost-archive", icon: Ghost },
      { name: "Laboratorium", href: "/lab", icon: FlaskConical },
      { name: "Blog", href: "/blog", icon: Newspaper },
    ],
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    icon: Play,
    features: [
      { name: "Podcast", href: "/podcast", icon: Mic2 },
      { name: "Trailer Film", href: "/trailers", icon: Film },
      { name: "Games", href: "/games", icon: Gamepad2 },
    ],
  },
  {
    id: "stories",
    label: "STORIES",
    icon: Clapperboard,
    features: [
      { name: "Novel", href: "/novels", icon: BookOpen },
      { name: "Komik", href: "/comics", icon: BookMarked },
      { name: "Cerpen", href: "/short-stories", icon: PenTool },
    ],
  },
  {
    id: "community",
    label: "COMMUNITY",
    icon: Users2,
    features: [
      { name: "Komunitas", href: "/community", icon: MessageCircle },
      { name: "Diary", href: "/diary", icon: BookHeart },
    ],
  },
  {
    id: "collection",
    label: "COLLECTION",
    icon: Trophy,
    features: [
      { name: "G-Collector", href: "/g-collector", icon: Gem },
    ],
  },
  {
    id: "market",
    label: "MARKET",
    icon: ShoppingCart,
    features: [
      { name: "Marketplace", href: "/marketplace", icon: Store },
    ],
  },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const isGroupActive = (group: typeof SIDEBAR_GROUPS[0]) => {
    if (group.href) return pathname === group.href;
    return group.features.some((f) => pathname === f.href || pathname?.startsWith(f.href + "/"));
  };

  const isFeatureActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => { setIsCollapsed(true); setExpandedGroups([]); }}
      className="fixed left-0 top-0 h-screen bg-[#030303] border-r border-white/[0.06] z-[60] flex flex-col overflow-hidden shadow-[20px_0_60px_rgba(0,0,0,1)]"
      style={{ transition: "width 0.35s cubic-bezier(0.4, 0, 0.2, 1)" }}
    >
      {/* Logo */}
      <div className="p-5 flex items-center justify-center border-b border-white/[0.04] min-h-[80px]">
        <div className="relative group">
          <div className="w-12 h-12 rounded-xl bg-white p-0.5 border-2 border-accent/50 shadow-[0_0_25px_rgba(255,0,0,0.4)] cursor-pointer group-hover:scale-105 transition-transform overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-br from-accent via-white/40 to-accent opacity-60"
            />
            <div className="w-full h-full rounded-lg bg-white overflow-hidden relative z-20">
              <Image src="/branding/logo.jpg" alt="Logo" width={44} height={44} className="object-cover" />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="ml-4 overflow-hidden"
            >
              <h1 className="text-lg font-horror text-white tracking-[0.15em]">DREADNOUTE</h1>
              <span className="text-[7px] font-bold text-accent/80 tracking-[.4em] uppercase">Security Level 4</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1 scrollbar-hide">
        {SIDEBAR_GROUPS.map((group) => {
          const active = isGroupActive(group);
          const isExpanded = expandedGroups.includes(group.id);
          const hasFeatures = group.features.length > 0;

          // Dashboard (no sub-items)
          if (!hasFeatures) {
            return (
              <Link key={group.id} href={group.href!}>
                <div
                  className={cn(
                    "group relative flex items-center h-12 rounded-xl transition-all duration-300 cursor-pointer mb-2",
                    active
                      ? "bg-accent/15 border border-accent/30 shadow-[0_0_20px_rgba(255,0,0,0.15)]"
                      : "border border-transparent hover:bg-accent/15 hover:border-accent/25"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center min-w-[56px] h-full transition-all",
                    active ? "text-accent" : "text-zinc-600 group-hover:text-accent"
                  )}>
                    <group.icon size={20} className={cn("transition-all duration-300", active && "drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]")} />
                  </div>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={cn("text-[10px] font-black tracking-[0.3em] whitespace-nowrap", active ? "text-white" : "text-zinc-500 group-hover:text-zinc-200")}
                      >
                        {group.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {active && <div className="absolute left-0 w-[3px] h-5 bg-accent rounded-r-full shadow-[0_0_10px_red]" />}
                </div>
              </Link>
            );
          }

          // Groups with sub-items
          return (
            <div key={group.id} className="mb-1">
              <div
                onClick={() => !isCollapsed && toggleGroup(group.id)}
                className={cn(
                  "group relative flex items-center h-12 rounded-xl transition-all duration-300 cursor-pointer",
                  active
                    ? "bg-accent/15 border border-accent/30"
                    : "border border-transparent hover:bg-accent/15 hover:border-accent/25"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center min-w-[56px] h-full transition-all",
                  active ? "text-accent" : "text-zinc-600 group-hover:text-accent"
                )}>
                  <group.icon size={20} className={cn("transition-all duration-300", active && "drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]")} />
                </div>

                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex items-center justify-between pr-3"
                    >
                      <span className={cn("text-[10px] font-black tracking-[0.3em] whitespace-nowrap", active ? "text-white" : "text-zinc-500 group-hover:text-white")}>
                        {group.label}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={12} className={cn("transition-colors", active ? "text-accent/60" : "text-zinc-700")} />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {active && <div className="absolute left-0 w-[3px] h-5 bg-accent rounded-r-full shadow-[0_0_10px_red]" />}
              </div>

              {/* Collapsible Sub-items */}
              <AnimatePresence>
                {!isCollapsed && isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="ml-5 pl-4 border-l border-white/[0.06] py-1.5 space-y-1">
                      {group.features.map((feat) => {
                        const featActive = isFeatureActive(feat.href);
                        return (
                          <Link key={feat.href} href={feat.href}>
                            <div className={cn(
                              "group/feat flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                              featActive
                                ? "bg-accent/20 text-white border border-accent/20"
                                : "text-zinc-500 hover:text-white hover:bg-accent/15 border border-transparent hover:border-accent/20"
                            )}>
                              <feat.icon size={16} className={cn("transition-all shrink-0", featActive ? "text-accent" : "group-hover/feat:text-white")} />
                              <span className={cn("text-[11px] font-bold tracking-[0.15em] uppercase whitespace-nowrap", featActive ? "text-white" : "group-hover/feat:text-white")}>{feat.name}</span>
                              {featActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_red]" />}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom: Version tag only */}
      <div className="p-4 border-t border-white/[0.04] flex items-center justify-center">
        <AnimatePresence>
          {!isCollapsed ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[7px] font-bold text-zinc-800 uppercase tracking-[0.4em]"
            >
              v2.0 · Dreadnoute
            </motion.span>
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-accent/30 animate-pulse" />
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};
