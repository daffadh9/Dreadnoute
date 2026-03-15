"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Ghost, Zap, Check, Star, Shield, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "free", label: "Void Walker",
    price: "Gratis", period: "",
    color: "border-zinc-600", glow: "", text: "text-zinc-400", icon: Ghost,
    features: ["Akses Ghost Archive (Terbatas)", "Koleksi hingga 5 entitas", "Bio Dossier Basic", "1 Ghost Favorit"],
    cta: "Plan Aktif", active: true,
  },
  {
    id: "collector", label: "Collector",
    price: "Rp 29.000", period: "/bulan",
    color: "border-red-500", glow: "shadow-[0_0_40px_rgba(255,0,0,0.2)]", text: "text-red-400", icon: Zap,
    features: ["Akses Ghost Archive (Penuh)", "Koleksi tak terbatas", "AI Avatar/Cover 4x/bulan", "Ghost Favorit 10 Entitas", "Badge Eksklusif Collector", "Prioritas di Visitor Log"],
    cta: "Pilih Plan", active: false,
  },
  {
    id: "master", label: "Master Archivist",
    price: "Rp 79.000", period: "/bulan",
    color: "border-yellow-400", glow: "shadow-[0_0_50px_rgba(234,179,8,0.3)]", text: "text-yellow-400", icon: Crown,
    features: ["Semua fitur Collector", "AI Unlimited (tak terbatas)", "Entitas Legendary Akses Awal", "V.O.I.D. Gold ID Frame", "Custom Archive Theme", "Akses Beta Fitur Baru"],
    cta: "Pilih Plan", active: false,
  },
];

const BILLING = [
  { date: "1 Mar 2026",  plan: "Void Walker", amount: "Gratis",      status: "active" },
  { date: "1 Feb 2026",  plan: "Void Walker", amount: "Gratis",      status: "completed" },
];

export default function SubscriptionPage() {
  const [activePlan, setActivePlan] = useState("free");

  return (
    <div className="min-h-screen bg-[#020202] font-cinzel pb-40 pt-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="pt-10 mb-12">
          <p className="text-[10px] font-black text-accent uppercase tracking-[1em] mb-3">V.O.I.D. Access Tier</p>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter ghost-glow">
            MANAJEMEN <span className="text-accent">LANGGANAN</span>
          </h1>
          <p className="text-zinc-500 text-sm italic mt-4 tracking-wide">
            Tingkatkan akses ke dimensi yang lebih dalam dari jaringan V.O.I.D.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PLANS.map((plan, i) => (
            <motion.div key={plan.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={cn(
                "relative bg-[#080808]/80 border-2 rounded-3xl p-7 flex flex-col transition-all duration-500",
                plan.color, plan.glow,
                activePlan === plan.id && "ring-2 ring-offset-1 ring-offset-[#020202] ring-accent/40",
              )}
            >
              {plan.id === "collector" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent rounded-full text-[9px] font-black text-white uppercase tracking-widest shadow-[0_0_20px_rgba(255,0,0,0.5)]">
                  Popular
                </div>
              )}

              <div className={cn("w-12 h-12 rounded-2xl bg-black/60 flex items-center justify-center mb-5 border", plan.color)}>
                <plan.icon size={22} className={plan.text} />
              </div>

              <h3 className={cn("text-xl font-black uppercase tracking-widest mb-1", plan.text)}>{plan.label}</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-3xl font-black text-white">{plan.price}</span>
                <span className="text-[11px] text-zinc-600 mb-1">{plan.period}</span>
              </div>

              <div className="flex-1 space-y-3 mb-8">
                {plan.features.map(f => (
                  <div key={f} className="flex items-start gap-3">
                    <Check size={12} className={cn("mt-0.5 flex-shrink-0", plan.text)} />
                    <p className="text-[11px] text-zinc-400 tracking-wide">{f}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActivePlan(plan.id)}
                disabled={plan.active || activePlan === plan.id}
                className={cn(
                  "w-full py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] transition-all",
                  activePlan === plan.id || plan.active
                    ? cn("bg-transparent border text-zinc-600 cursor-default", plan.color)
                    : cn("border text-white hover:opacity-90 active:scale-95", plan.color, "hover:bg-current/10"),
                  plan.id === "collector" && activePlan !== "collector" && "bg-accent border-accent hover:bg-red-700",
                  plan.id === "master"    && activePlan !== "master"    && "bg-yellow-600/20 border-yellow-500 text-yellow-300 hover:bg-yellow-600/30",
                )}
              >
                {activePlan === plan.id ? "✓ Plan Aktif" : plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Billing History */}
        <div className="bg-[#080808]/60 border border-white/5 rounded-3xl p-6">
          <h3 className="text-[10px] font-black text-accent uppercase tracking-[0.6em] mb-1">Riwayat Billing</h3>
          <p className="text-[11px] text-zinc-500 mb-6 tracking-wide">Rekam jejak langganan dan pembayaran V.O.I.D. kamu.</p>
          <div className="space-y-3">
            {BILLING.map((b, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/30 border border-white/5 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Clock size={16} className="text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-[12px] font-black text-white">{b.plan}</p>
                    <p className="text-[9px] text-zinc-600 mt-0.5">{b.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-black text-white">{b.amount}</span>
                  <span className={cn("px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
                    b.status === "active" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-zinc-800 border-zinc-700 text-zinc-500")}>
                    {b.status === "active" ? "Aktif" : "Selesai"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
