"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Lock, Eye, EyeOff, CreditCard, Clock, Smartphone,
  Key, Check, X, AlertTriangle, ChevronRight,
  Globe, Users, UserX, History, Zap, Wallet, Receipt, Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "privacy" | "security" | "economy";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "privacy",  label: "Protokol Privasi", icon: Shield },
  { id: "security", label: "V.O.I.D. Access",  icon: Lock },
  { id: "economy",  label: "Ekonomi",           icon: Wallet },
];

/* ─── Reusable Toggle Row ─── */
function ToggleRow({
  label, desc, checked, onChange, highlight
}: { label: string; desc: string; checked: boolean; onChange: () => void; highlight?: string }) {
  return (
    <div className="flex items-center justify-between gap-6 py-5 border-b border-white/5 last:border-0">
      <div>
        <p className="text-[12px] font-black text-white uppercase tracking-wider">{label}</p>
        <p className="text-[10px] text-zinc-500 mt-1 tracking-wide max-w-sm">{desc}</p>
      </div>
      <button
        onClick={onChange}
        className={cn(
          "relative w-12 h-6 rounded-full border transition-all duration-300 flex-shrink-0",
          checked ? "bg-accent border-accent shadow-[0_0_15px_rgba(255,0,0,0.4)]" : "bg-zinc-800 border-zinc-700",
        )}
      >
        <div className={cn(
          "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300",
          checked ? "left-6" : "left-0.5",
        )} />
      </button>
    </div>
  );
}

/* ─── Privacy Tab ─── */
function PrivacyTab() {
  const [isPublicProfile, setIsPublicProfile] = useState(true);
  const [hideAge,         setHideAge]         = useState(true);
  const [hideOccup,       setHideOccup]       = useState(false);
  const [hideStatus,      setHideStatus]      = useState(false);
  const [visitorLog,      setVisitorLog]      = useState(true);
  const [showInSearch,    setShowInSearch]    = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-[#080808]/60 border border-white/5 rounded-3xl p-6">
        <h3 className="text-[10px] font-black text-accent uppercase tracking-[0.6em] mb-1">Visibilitas Profil</h3>
        <p className="text-[11px] text-zinc-500 mb-6 tracking-wide">Kontrol siapa yang bisa melihat identitas V.O.I.D. kamu.</p>

        <ToggleRow label="Profil Publik" desc="Profil terlihat oleh semua agen dalam jaringan V.O.I.D. Jika dimatikan, hanya Fans yang bisa melihat." checked={isPublicProfile} onChange={() => setIsPublicProfile(p => !p)} />
        <ToggleRow label="Tampil di Pencarian" desc="Izinkan agen lain menemukan profil kamu melalui fitur pencarian komunitas." checked={showInSearch} onChange={() => setShowInSearch(p => !p)} />
      </div>

      <div className="bg-[#080808]/60 border border-white/5 rounded-3xl p-6">
        <h3 className="text-[10px] font-black text-accent uppercase tracking-[0.6em] mb-1">Field Masking</h3>
        <p className="text-[11px] text-zinc-500 mb-6 tracking-wide">Sembunyikan data sensitif dari profil publik kamu.</p>

        <ToggleRow label="Sembunyikan Umur" desc="Umur tidak akan ditampilkan di profil publik." checked={hideAge} onChange={() => setHideAge(p => !p)} />
        <ToggleRow label="Sembunyikan Pekerjaan" desc="Informasi pekerjaan tidak akan ditampilkan." checked={hideOccup} onChange={() => setHideOccup(p => !p)} />
        <ToggleRow label="Sembunyikan Status" desc="Status online/offline tidak akan terlihat." checked={hideStatus} onChange={() => setHideStatus(p => !p)} />
      </div>

      <div className="bg-[#080808]/60 border border-white/5 rounded-3xl p-6">
        <h3 className="text-[10px] font-black text-accent uppercase tracking-[0.6em] mb-1">Visitor Log</h3>
        <p className="text-[11px] text-zinc-500 mb-6 tracking-wide">Rekam jejak siapa saja yang mengunjungi dossier kamu.</p>

        <ToggleRow label="Aktifkan Log Pengunjung" desc="Lacak siapa saja yang melihat profil kamu. Catatan: agen lain tidak akan mengetahui bahwa mereka terekam." checked={visitorLog} onChange={() => setVisitorLog(p => !p)} />
      </div>
    </div>
  );
}

/* ─── Security Tab ─── */
function SecurityTab() {
  const [show2FA,        setShow2FA]        = useState(false);
  const [showPassChange, setShowPassChange] = useState(false);
  const [newPass,        setNewPass]        = useState("");
  const [confirmPass,    setConfirmPass]    = useState("");

  const LINKED_DEVICES = [
    { name: "Chrome · Windows 11",   location: "Jakarta, ID",          time: "Sekarang",    current: true },
    { name: "Firefox · MacOS",        location: "Bandung, ID",          time: "2 hari lalu", current: false },
    { name: "Mobile · Android",       location: "Surabaya, ID",         time: "5 hari lalu", current: false },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#080808]/60 border border-white/5 rounded-3xl p-6">
        <h3 className="text-[10px] font-black text-accent uppercase tracking-[0.6em] mb-1">Security Key</h3>
        <p className="text-[11px] text-zinc-500 mb-6 tracking-wide">Perbarui kunci akses ke dimensi V.O.I.D. kamu.</p>

        <AnimatePresence>
          {!showPassChange ? (
            <button onClick={() => setShowPassChange(true)}
              className="flex items-center gap-3 px-6 py-3.5 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-accent/40 hover:text-accent transition-all">
              <Key size={14} /> Ganti Password
            </button>
          ) : (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="space-y-4">
              <input type="password" placeholder="Password Baru" value={newPass} onChange={e => setNewPass(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-5 py-3.5 text-[12px] text-white focus:outline-none focus:border-accent/40 tracking-widest placeholder:text-zinc-700 max-w-sm" />
              <input type="password" placeholder="Konfirmasi Password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-5 py-3.5 text-[12px] text-white focus:outline-none focus:border-accent/40 tracking-widest placeholder:text-zinc-700 max-w-sm" />
              {confirmPass && newPass !== confirmPass && (
                <p className="text-[10px] text-red-400 flex items-center gap-2"><AlertTriangle size={12} /> Password tidak cocok</p>
              )}
              <div className="flex gap-3">
                <button
                  disabled={!newPass || newPass !== confirmPass}
                  className="px-6 py-3 bg-accent disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                  Simpan
                </button>
                <button onClick={() => { setShowPassChange(false); setNewPass(""); setConfirmPass(""); }}
                  className="px-6 py-3 bg-white/5 border border-white/10 text-zinc-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  Batal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-[#080808]/60 border border-white/5 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[10px] font-black text-accent uppercase tracking-[0.6em] mb-1">Verifikasi 2 Langkah</h3>
            <p className="text-[11px] text-zinc-500 tracking-wide">Tambahkan lapisan keamanan ekstra untuk akun V.O.I.D. kamu.</p>
          </div>
          <span className="px-3 py-1.5 bg-zinc-800 text-zinc-500 rounded-full text-[8px] font-black uppercase tracking-widest border border-zinc-700">
            Inactive
          </span>
        </div>
        <button onClick={() => setShow2FA(true)}
          className="flex items-center gap-3 px-6 py-3.5 bg-accent/10 border border-accent/30 text-accent rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all">
          <Shield size={14} /> Aktifkan 2FA
        </button>
      </div>

      <div className="bg-[#080808]/60 border border-white/5 rounded-3xl p-6">
        <h3 className="text-[10px] font-black text-accent uppercase tracking-[0.6em] mb-1">Linked Devices</h3>
        <p className="text-[11px] text-zinc-500 mb-6 tracking-wide">Perangkat yang sedang mengakses identitas V.O.I.D. kamu.</p>
        <div className="space-y-3">
          {LINKED_DEVICES.map((device, i) => (
            <div key={i} className="flex items-center justify-between gap-4 p-4 bg-black/40 rounded-2xl border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Smartphone size={18} className="text-zinc-400" />
                </div>
                <div>
                  <p className="text-[11px] font-black text-white">{device.name}</p>
                  <p className="text-[9px] text-zinc-500 mt-0.5">{device.location} · {device.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {device.current && (
                  <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-[8px] font-black uppercase tracking-widest">
                    Aktif
                  </span>
                )}
                {!device.current && (
                  <button className="text-zinc-600 hover:text-red-400 transition-colors">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Economy Tab ─── */
function EconomyTab() {
  const TRANSACTIONS = [
    { type: "buy",  item: "Nenek Gayung",   amount: "-10 OBS",  date: "12 Mar 2026",  icon: "👻" },
    { type: "buy",  item: "Suster Ngesot",  amount: "-50 OBS",  date: "8 Mar 2026",   icon: "🏥" },
    { type: "topup",item: "Top Up Obsidian",amount: "+100 OBS", date: "5 Mar 2026",   icon: "💎" },
    { type: "buy",  item: "Jerangkong",     amount: "-3 OBS",   date: "1 Mar 2026",   icon: "💀" },
    { type: "topup",item: "Top Up DCs",     amount: "+540 DC",  date: "25 Feb 2026",  icon: "🪙" },
  ];

  const PAYMENT_METHODS = [
    { name: "Dana",    last4: "••••2847", type: "e-wallet", active: true },
    { name: "GoPay",   last4: "••••9123", type: "e-wallet", active: false },
    { name: "OVO",     last4: "••••5566", type: "e-wallet", active: false },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#080808]/60 border border-white/5 rounded-3xl p-6">
        <h3 className="text-[10px] font-black text-accent uppercase tracking-[0.6em] mb-1">Payment Methods</h3>
        <p className="text-[11px] text-zinc-500 mb-6 tracking-wide">Metode pembayaran untuk pembelian Obsidian (powered by Xendit).</p>
        <div className="space-y-3 mb-5">
          {PAYMENT_METHODS.map((pm, i) => (
            <div key={i} className={cn(
              "flex items-center justify-between p-4 rounded-2xl border transition-all",
              pm.active ? "bg-accent/5 border-accent/30" : "bg-black/40 border-white/5",
            )}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <CreditCard size={16} className={pm.active ? "text-accent" : "text-zinc-500"} />
                </div>
                <div>
                  <p className="text-[12px] font-black text-white">{pm.name}</p>
                  <p className="text-[9px] text-zinc-500 mt-0.5">{pm.last4} · {pm.type}</p>
                </div>
              </div>
              {pm.active && <span className="px-2.5 py-1 bg-accent/10 border border-accent/30 text-accent text-[8px] font-black uppercase tracking-widest rounded-full">Default</span>}
            </div>
          ))}
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-zinc-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-white/20 hover:text-white transition-all">
          <span className="text-lg leading-none">+</span> Tambah Metode Pembayaran
        </button>
      </div>

      <div className="bg-[#080808]/60 border border-white/5 rounded-3xl p-6">
        <h3 className="text-[10px] font-black text-accent uppercase tracking-[0.6em] mb-1">Riwayat Transaksi</h3>
        <p className="text-[11px] text-zinc-500 mb-6 tracking-wide">Semua aktivitas ekonomi di dimensi V.O.I.D. kamu.</p>
        <div className="space-y-2">
          {TRANSACTIONS.map((tx, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-4 bg-black/30 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/60 flex items-center justify-center text-xl">
                  {tx.icon}
                </div>
                <div>
                  <p className="text-[12px] font-black text-white">{tx.item}</p>
                  <p className="text-[9px] text-zinc-600 mt-0.5">{tx.date}</p>
                </div>
              </div>
              <span className={cn(
                "text-[12px] font-black",
                tx.type === "topup" ? "text-emerald-400" : "text-red-400",
              )}>
                {tx.amount}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("privacy");

  return (
    <div className="min-h-screen bg-[#020202] font-cinzel pb-40 pt-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="pt-10 mb-10">
          <p className="text-[10px] font-black text-accent uppercase tracking-[1em] mb-3">V.O.I.D. System</p>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter ghost-glow">
            PENGATURAN <span className="text-accent">DOSSIER</span>
          </h1>
          <p className="text-zinc-500 text-sm italic mt-4 tracking-wide">
            Konfigurasi protokol keamanan dan privasi akun V.O.I.D. kamu.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-8 bg-[#080808]/60 border border-white/5 rounded-2xl p-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 flex-1 justify-center px-5 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300",
                activeTab === tab.id
                  ? "bg-accent text-white shadow-[0_6px_20px_rgba(255,0,0,0.3)]"
                  : "text-zinc-500 hover:text-white hover:bg-white/5",
              )}
            >
              <tab.icon size={14} className={activeTab === tab.id ? "animate-pulse" : ""} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
          >
            {activeTab === "privacy"  && <PrivacyTab />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "economy"  && <EconomyTab />}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
