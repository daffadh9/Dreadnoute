"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Ghost, Zap, ShoppingCart, Trophy, Radio, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

function ToggleRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between gap-6 py-5 border-b border-white/5 last:border-0">
      <div>
        <p className="text-[12px] font-black text-white uppercase tracking-wider">{label}</p>
        <p className="text-[10px] text-zinc-500 mt-1 tracking-wide max-w-sm">{desc}</p>
      </div>
      <button onClick={onChange}
        className={cn("relative w-12 h-6 rounded-full border transition-all duration-300 flex-shrink-0",
          checked ? "bg-accent border-accent shadow-[0_0_15px_rgba(255,0,0,0.4)]" : "bg-zinc-800 border-zinc-700")}>
        <div className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300", checked ? "left-6" : "left-0.5")} />
      </button>
    </div>
  );
}

const NOTIFICATIONS = [
  { id: 1, type: "system",   icon: Ghost,  title: "Entitas Baru Ditambahkan",          body: "Genderuwo kini tersedia di Ghost Archive.",          time: "5 menit lalu",  read: false },
  { id: 2, type: "social",   icon: Bell,   title: "ShadowWalker mengikuti kamu",        body: "Agen baru bergabung ke dalam jaringan Fans kamu.", time: "30 menit lalu", read: false },
  { id: 3, type: "commerce", icon: ShoppingCart, title: "Pembelian Berhasil",           body: "Suster Ngesot telah masuk ke koleksi kamu.",        time: "1 jam lalu",    read: true },
  { id: 4, type: "event",    icon: Trophy, title: "Achievement Baru: Rare Collector",  body: "Kamu berhasil mendapatkan entitas Rare pertama.",   time: "2 jam lalu",    read: true },
  { id: 5, type: "system",   icon: Radio,  title: "Frekuensi Langka Terdeteksi",       body: "Entitas Legendary baru mendekati dimensi kamu.",    time: "kemarin",       read: true },
];

const TYPE_COLORS: Record<string, string> = {
  system:   "text-blue-400 bg-blue-500/10 border-blue-500/20",
  social:   "text-purple-400 bg-purple-500/10 border-purple-500/20",
  commerce: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  event:    "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
};

export default function NotificationsPage() {
  const [notifs,     setNotifs]     = useState(NOTIFICATIONS);
  const [notifSystem, setNotifSystem] = useState(true);
  const [notifSocial, setNotifSocial] = useState(true);
  const [notifCommerce, setNotifCommerce] = useState(true);
  const [notifEvents, setNotifEvents] = useState(false);

  const unread = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss = (id: number) => setNotifs(prev => prev.filter(n => n.id !== id));

  return (
    <div className="min-h-screen bg-[#020202] font-cinzel pb-40 pt-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">

        <div className="pt-10 mb-10">
          <p className="text-[10px] font-black text-accent uppercase tracking-[1em] mb-3">V.O.I.D. Network</p>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter ghost-glow">
              NOTIFIKASI <span className="text-accent">SINYAL</span>
            </h1>
            {unread > 0 && (
              <button onClick={markAllRead}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-zinc-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-white/20 hover:text-white transition-all">
                <Check size={12} /> Tandai Semua Dibaca
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Notification List ── */}
          <div className="lg:col-span-2 space-y-3">
            {unread > 0 && (
              <p className="text-[9px] font-black text-accent uppercase tracking-widest mb-4">
                {unread} sinyal belum dibaca
              </p>
            )}
            <AnimatePresence>
              {notifs.map((n, i) => (
                <motion.div key={n.id}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={cn(
                    "relative flex items-start gap-4 p-5 rounded-2xl border transition-all group",
                    !n.read ? "bg-[#0a0303]/80 border-accent/20" : "bg-[#080808]/60 border-white/5",
                  )}
                >
                  {!n.read && <div className="absolute top-5 left-3 w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_red]" />}
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border", TYPE_COLORS[n.type])}>
                    <n.icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-black text-white uppercase tracking-wider">{n.title}</p>
                    <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">{n.body}</p>
                    <p className="text-[9px] text-zinc-700 uppercase tracking-widest mt-2">{n.time}</p>
                  </div>
                  <button onClick={() => dismiss(n.id)} className="text-zinc-700 hover:text-white transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0">
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {notifs.length === 0 && (
              <div className="py-20 text-center opacity-30">
                <Bell size={48} className="mx-auto mb-4 text-zinc-700" />
                <p className="text-sm font-black uppercase tracking-[0.5em] text-zinc-600">Tidak ada sinyal.</p>
              </div>
            )}
          </div>

          {/* ── Settings Panel ── */}
          <div className="space-y-6">
            <div className="bg-[#080808]/60 border border-white/5 rounded-3xl p-6">
              <h3 className="text-[10px] font-black text-accent uppercase tracking-[0.6em] mb-1">Manajemen Notifikasi</h3>
              <p className="text-[10px] text-zinc-500 mb-5 tracking-wide">Pilih sinyal mana yang ingin kamu terima.</p>
              <ToggleRow label="Sistem Arsip" desc="Entitas baru, update fitur, pengumuman V.O.I.D." checked={notifSystem} onChange={() => setNotifSystem(p => !p)} />
              <ToggleRow label="Aktivitas Sosial" desc="Follower baru, kunjungan ke dossier, Fans." checked={notifSocial} onChange={() => setNotifSocial(p => !p)} />
              <ToggleRow label="Transaksi" desc="Konfirmasi pembelian, top-up, refund." checked={notifCommerce} onChange={() => setNotifCommerce(p => !p)} />
              <ToggleRow label="Event Terbatas" desc="Penawaran eksklusif, entitas langka muncul." checked={notifEvents} onChange={() => setNotifEvents(p => !p)} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
