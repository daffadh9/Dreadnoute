"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Skull, 
  ChevronRight,
  TrendingUp,
  Heart
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  subtitle: string;
  icon: any;
  items?: { title: string; meta?: string; icon?: any }[];
  accentColor: "red" | "green" | "blue" | "purple";
  className?: string;
  image?: string;
}

export const DashboardCard = ({ title, subtitle, icon: Icon, items, accentColor, className, image }: DashboardCardProps) => {
  const accents = {
    red: "hover:border-accent/40 border-white/5 shadow-red-500/10",
    green: "hover:border-green-500/40 border-white/5 shadow-green-500/10",
    blue: "hover:border-blue-500/40 border-white/5 shadow-blue-500/10",
    purple: "hover:border-purple-500/40 border-white/5 shadow-purple-500/10",
  };

  const glowColors = {
    red: "group-hover:bg-red-500/5",
    green: "group-hover:bg-green-500/5",
    blue: "group-hover:bg-blue-500/5",
    purple: "group-hover:bg-purple-500/5",
  };

  const iconColors = {
    red: "text-accent",
    green: "text-green-500",
    blue: "text-blue-500",
    purple: "text-purple-500",
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={cn(
        "group bg-[#0f0f0f] rounded-[2.5rem] p-8 border transition-all duration-500 relative overflow-hidden shadow-2xl shadow-black",
        accents[accentColor],
        className
      )}
    >
      <div className={cn("absolute inset-0 transition-colors duration-500", glowColors[accentColor])} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div className="flex gap-5">
            <div className={cn("p-4 rounded-2xl bg-black/60 border border-white/5", iconColors[accentColor])}>
              <Icon size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-white font-black tracking-tight uppercase text-lg font-serif italic leading-none">{title}</h3>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">{subtitle}</p>
            </div>
          </div>
          <motion.div 
            whileHover={{ x: 2 }}
            className="text-gray-600 group-hover:text-white transition-colors cursor-pointer bg-white/5 p-2 rounded-full"
          >
            <ChevronRight size={20} />
          </motion.div>
        </div>

        {image && (
          <div className="mb-8 rounded-[1.5rem] overflow-hidden aspect-video relative border border-white/5">
            <Image src={image} alt={title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        )}

        {items && (
          <div className="space-y-5">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between group/item cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black border border-white/5 overflow-hidden flex items-center justify-center text-gray-600 group-hover/item:text-accent transition-all group-hover/item:border-accent/20">
                    {item.icon ? <item.icon size={18} /> : <Skull size={18} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 group-hover/item:text-white transition-colors">{item.title}</h4>
                    {item.meta && <div className="flex items-center gap-4 mt-1">
                      <span className="text-[10px] font-black text-gray-700 flex items-center gap-1 uppercase tracking-widest">
                         <TrendingUp size={10} className="text-green-900" /> {item.meta.split(" ")[0]}
                      </span>
                      <span className="text-[10px] font-black text-gray-700 flex items-center gap-1 uppercase tracking-widest">
                         <Heart size={10} className="text-red-900" /> {item.meta.split(" ")[1]}
                      </span>
                    </div>}
                  </div>
                </div>
                <div className="text-[9px] font-black text-accent opacity-0 group-hover/item:opacity-100 transition-all translate-x-2 group-hover/item:translate-x-0 uppercase">
                  Buka
                </div>
              </div>
            ))}
          </div>
        )}

        <button className={cn(
          "w-full mt-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border border-white/5 transition-all",
          accentColor === 'red' ? "bg-accent/10 text-accent border-accent/20 hover:bg-accent hover:text-white" : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white"
        )}>
          {accentColor === 'red' ? 'Akses Portal' : 'Lihat Produk'}
        </button>
      </div>

      {accentColor === 'red' && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors" />
      )}
    </motion.div>
  );
};
