"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Ghost, 
  Gamepad2, 
  Mic2, 
  ShoppingCart, 
  Settings, 
  LogOut,
  ChevronRight,
  ChevronLeft,
  Activity,
  Clapperboard,
  Users2
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "DASHBOARD",     href: "/" },
  { icon: Ghost,           label: "GHOST ARCHIVE", href: "/wiki" },
  { icon: Mic2,            label: "PODCASTS",      href: "/podcast" },
  { icon: Gamepad2,        label: "GAMES",         href: "/games" },
  { icon: ShoppingCart,    label: "MARKETPLACE",   href: "/marketplace" },
  { icon: Clapperboard,    label: "TRAILERS",      href: "/trailers" },
  { icon: Users2,          label: "KOMUNITAS",     href: "/community" },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 100 : 280 }}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      className="fixed left-0 top-0 h-screen bg-[#020202] border-r border-white/5 z-[60] flex flex-col transition-all duration-500 ease-in-out shadow-[20px_0_60px_rgba(0,0,0,1)]"
    >
      {/* Logo Section */}
      <div className="p-8 flex items-center justify-center relative">
        <div className="relative group">
           <div className="w-14 h-14 rounded-2xl bg-white p-1 border-2 border-accent/60 shadow-[0_0_30px_rgba(255,0,0,0.5)] cursor-pointer group-hover:scale-110 transition-transform relative z-10 overflow-hidden">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-br from-accent via-white/40 to-accent opacity-80"
              />
              <div className="w-full h-full rounded-xl bg-white overflow-hidden relative z-20">
                <Image src="/branding/logo.jpg" alt="Logo" width={50} height={50} className="object-cover" />
              </div>
           </div>
        </div>
        
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="ml-4"
            >
              <h1 className="text-xl font-horror text-white tracking-[0.2em]">DREADNOUTE</h1>
              <span className="text-[8px] font-bold text-accent tracking-[.5em] uppercase">Security Level 4</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 px-4 py-10 space-y-4">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div 
                className={cn(
                  "group relative flex items-center h-14 rounded-2xl transition-all duration-300 overflow-hidden",
                  isActive 
                    ? "bg-accent/10 border border-accent/40 shadow-[0_0_20px_rgba(255,0,0,0.2)]" 
                    : "hover:bg-accent/5 border border-transparent hover:border-accent/30 hover:shadow-[0_0_30px_rgba(255,0,0,0.1)]"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center min-w-[68px] h-full transition-all",
                  isActive ? "text-accent" : "text-zinc-600 group-hover:text-white"
                )}>
                  <item.icon size={22} className={cn(
                    "transition-all duration-300",
                    isActive ? "drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" : "group-hover:drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] group-hover:text-accent"
                  )} />
                </div>

                <AnimatePresence>
                   {!isCollapsed && (
                     <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className={cn(
                          "text-[10px] font-bold tracking-[0.4em] whitespace-nowrap",
                          isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-200"
                        )}
                     >
                       {item.label}
                     </motion.span>
                   )}
                </AnimatePresence>

                {isActive && (
                   <motion.div 
                     layoutId="active-pill"
                     className="absolute left-0 w-1 h-6 bg-accent rounded-r-full shadow-[0_0_15px_red]" 
                   />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 space-y-2 mb-4">
        <Link href="/settings">
          <div className={cn(
            "flex items-center h-12 rounded-2xl group cursor-pointer hover:bg-white/[0.03] transition-all",
            isCollapsed ? "justify-center" : "px-4",
            pathname === "/settings" && "bg-accent/10 border border-accent/30",
          )}>
            <Settings size={20} className={cn("transition-all min-w-[36px]", pathname === "/settings" ? "text-accent" : "text-zinc-600 group-hover:text-white")} />
            {!isCollapsed && (
              <span className={cn("text-[10px] font-bold tracking-[0.4em] ml-3", pathname === "/settings" ? "text-white" : "text-zinc-500 group-hover:text-zinc-200")}>SETTINGS</span>
            )}
          </div>
        </Link>

        <Link href="/notifications">
          <div className={cn(
            "flex items-center h-12 rounded-2xl group cursor-pointer hover:bg-white/[0.03] transition-all relative",
            isCollapsed ? "justify-center" : "px-4",
            pathname === "/notifications" && "bg-accent/10 border border-accent/30",
          )}>
            <ChevronRight size={20} className={cn("transition-all min-w-[36px]", pathname === "/notifications" ? "text-accent" : "text-zinc-600 group-hover:text-white")} />
            {!isCollapsed && (
              <span className={cn("text-[10px] font-bold tracking-[0.4em] ml-3", pathname === "/notifications" ? "text-white" : "text-zinc-500 group-hover:text-zinc-200")}>NOTIFIKASI</span>
            )}
            <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full" />
          </div>
        </Link>

        <div 
          onClick={handleLogout}
          className={cn(
            "flex items-center h-12 rounded-2xl group cursor-pointer hover:bg-red-950/20 border border-transparent hover:border-red-900/30 transition-all",
            isCollapsed ? "justify-center" : "px-4"
          )}
        >
           <LogOut size={20} className="text-zinc-600 group-hover:text-accent transition-all min-w-[36px]" />
           {!isCollapsed && (
             <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-500 group-hover:text-accent ml-3 uppercase">Abandon Archive</span>
           )}
        </div>
      </div>
    </motion.aside>
  );
};
