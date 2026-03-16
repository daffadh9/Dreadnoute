"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Skull, Shield, Eye, Zap, AlertTriangle,
  MapPin, Headphones, Users, Trophy, Activity, Clock, ShieldAlert,
  Swords, Target, Radio, MessageCircle, Star, ShoppingCart,
  Flame, Wind, Volume2, FileSearch, TriangleAlert,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface ThreatBar { name: string; value: number; colorFrom: string; colorTo: string; pct: string }
interface GhostData {
  id: string; name: string; rarity: string; role: string; danger_lvl: number;
  image_url: string; price?: { dc: number; obsidian: number }; tags?: string[];
  threats?: ThreatBar[];
  active_times?: { kritis: string; aktif: string; dormant: string };
  origin_story?: string; lore?: string;
  abilities?: { passive: string[]; active: string[] };
  weaknesses?: string[]; danger_zones?: string[]; survival_tips?: string[];
  eyewitness?: { user: string; avatar: string; level: number; text: string; time: string; location: string }[];
  collector_ranks?: { rank: number; user: string; level: number; badge: string }[];
  evp_transcript?: string; evp_frequency?: string; ambient_sounds?: string[];
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_GHOSTS: Record<string, GhostData> = {
  "1": {
    id: "1", name: "JERANGKONG", rarity: "Common", role: "Aggressor", danger_lvl: 4,
    image_url: "/assets/images/jerangkong.jpg", price: { dc: 500, obsidian: 3 },
    tags: ["TIER 4 — BERBAHAYA", "ENTITAS TANAH", "WILAYAH JAWA"],
    threats: [
      { name: "AGRESI ENTITAS", value: 60, colorFrom: "from-red-600", colorTo: "to-red-400", pct: "60%" },
      { name: "INTELEGENSI GAIB", value: 40, colorFrom: "from-blue-600", colorTo: "to-blue-400", pct: "40%" },
      { name: "KEKUATAN KUTUKAN", value: 55, colorFrom: "from-purple-600", colorTo: "to-purple-400", pct: "55%" },
      { name: "KEMAMPUAN MANIPULASI", value: 30, colorFrom: "from-yellow-600", colorTo: "to-yellow-400", pct: "30%" },
    ],
    active_times: { kritis: "22:00 - 02:00", aktif: "17:00 - 22:00", dormant: "06:00 - 17:00" },
    origin_story: "Jerangkong terbentuk dari sisa-sisa tulang belulang para korban wabah pes yang melanda Batavia pada abad ke-17. Ketika ribuan jasad dikuburkan tanpa ritual yang benar di kuburan massal Batavia, energi kematian terkonsentrasi selama berabad-abad membentuk entitas baru yang haus akan kehidupan manusia.",
    lore: "Menurut arsip V.O.I.D. nomor 0047-JRK, Jerangkong pertama kali didokumentasikan oleh agen lapangan pada tahun 1973 di kompleks pemakaman tua Jawa Tengah. Entitas ini mampu memanipulasi struktur tulangnya sendiri sebagai senjata proyektil. Tingkat ancamannya meningkat signifikan pada malam tanpa bulan.",
    abilities: {
      passive: ["Aura mencekam mengurangi kecepatan gerak manusia dalam radius 10m", "Kehadirannya menyebabkan suhu udara turun hingga 8°C secara instan"],
      active: ["Serangan proyektil tulang dari jarak maksimum 5 meter", "Restrukturisasi rangka tubuh untuk serangan mendadak dengan kecepatan tinggi"],
    },
    weaknesses: ["Lingkaran garam kasar memblokir seluruh mobilitas", "Cahaya ultraviolet 365nm melemahkan ikatan spiritual tulang", "Mantra pemutusan dari Kitab Kuno Jawa efektif pada jarak <2m"],
    danger_zones: ["Kompleks pemakaman tua abad 17–19", "Ruang bawah tanah tanpa ventilasi", "Bangunan terbengkalai dengan lantai tanah langsung"],
    survival_tips: ["Selalu bergerak dalam kelompok minimal 3 orang", "Bawa kantong garam kasar tersegel rapat", "Hindari area pemakaman antara pukul 22:00–02:00"],
    eyewitness: [
      { user: "ShadowHunter_X", avatar: "SH", level: 23, text: "Saya melihat bayangannya di makam tua jam 01:30 pagi. Tulang-tulangnya bergerak sendiri seperti ada yang menggerakkan dari dalam...", time: "2 hari lalu", location: "Semarang, Jawa Tengah" },
      { user: "VoidAgent_47", avatar: "VA", level: 31, text: "Di gudang tua Surabaya, entitas ini muncul 3 malam berturut-turut. Suhu turun drastis sebelum kemunculannya.", time: "5 hari lalu", location: "Surabaya, Jawa Timur" },
      { user: "NightReaper99", avatar: "NR", level: 45, text: "Sudah 4x bertemu. Kuncinya adalah jangan panik dan jaga jarak minimum 15m. Lingkaran garam terbukti efektif.", time: "1 minggu lalu", location: "Solo, Jawa Tengah" },
    ],
    collector_ranks: [
      { rank: 1, user: "NightReaper99", level: 99, badge: "CURSED" },
      { rank: 2, user: "ShadowHunter_X", level: 45, badge: "LEGENDARY" },
      { rank: 3, user: "VoidAgent_47", level: 31, badge: "MYTHIC" },
      { rank: 4, user: "PhantomSeeker", level: 22, badge: "RARE" },
      { rank: 5, user: "DarkArchivst", level: 18, badge: "UNCOMMON" },
    ],
    evp_transcript: '"Sakit... tulangku... tolong lepaskan aku..."',
    evp_frequency: "120Hz — Rentang infrasonik rendah",
    ambient_sounds: ["Suara tulang bergesekan berulang", "Erangan rendah bernada monoton", "Langkah kaki berderak berirama genap"],
  },
  "2": {
    id: "2", name: "NENEK GAYUNG", rarity: "Rare", role: "Watcher", danger_lvl: 7,
    image_url: "/assets/images/nenek-gayung.jpg", price: { dc: 1500, obsidian: 10 },
    tags: ["TIER 7 — SANGAT BERBAHAYA", "ENTITAS AIR", "WILAYAH JAWA BARAT"],
    threats: [
      { name: "AGRESI ENTITAS", value: 55, colorFrom: "from-red-600", colorTo: "to-red-400", pct: "55%" },
      { name: "INTELEGENSI GAIB", value: 85, colorFrom: "from-blue-600", colorTo: "to-blue-400", pct: "85%" },
      { name: "KEKUATAN KUTUKAN", value: 70, colorFrom: "from-purple-600", colorTo: "to-purple-400", pct: "70%" },
      { name: "KEMAMPUAN MANIPULASI", value: 90, colorFrom: "from-yellow-600", colorTo: "to-yellow-400", pct: "90%" },
    ],
    active_times: { kritis: "00:00 - 03:00", aktif: "19:00 - 00:00", dormant: "07:00 - 19:00" },
    origin_story: "Nenek Gayung diyakini berasal dari arwah seorang dukun beranak yang terbunuh secara tragis saat melakukan ritual pada masa penjajahan kolonial. Ia mencari korban menggunakan gayung berisi air keramat yang mampu menghipnotis siapapun yang menatap pantulannya.",
    lore: "Catatan V.O.I.D. klasifikasi MERAH — entitas ini dikenal mampu berkomunikasi dengan alam hidup melalui medium air. Tingkat kecerdasan gaibnya melampaui rata-rata entitas tingkat 5. Teknik mirroring-nya telah mengakibatkan hilangnya 12 agen lapangan sejak 1985.",
    abilities: {
      passive: ["Memanggil mangsa melalui suara percikan air yang hipnotis", "Tidak kasat mata jika berada di dekat sumber air"],
      active: ["Serangan menggunakan air sebagai medium kutukan kontak", "Kemampuan mirroring — meniru suara korban untuk menarik mangsa lain"],
    },
    weaknesses: ["Api terbuka dalam radius 3m membakar aura air", "Air mengalir deras membatalkan kemampuan stalking", "Bawang putih dan tembakau melemahkan konsentrasi aura"],
    danger_zones: ["Kolam dan sumber mata air tua tak terawat", "Kamar mandi dan sumur terbuka malam hari", "Area persawahan terpencil setelah gelap"],
    survival_tips: ["Jangan pernah sendirian di dekat sumber air malam hari", "Bawa korek api atau senter mode strobe 5000Hz", "Hindari memanggil nama seseorang di dekat kolam/sungai malam hari"],
    eyewitness: [
      { user: "AquaPhantom", avatar: "AP", level: 38, text: "Terdengar suara gayung di sumur rumah kosong jam 02:00. Ketika kami mendekat, air di sumur bergerak sendiri dalam pola spiral yang sangat presisi.", time: "3 hari lalu", location: "Bandung, Jawa Barat" },
      { user: "GhostTracker_ID", avatar: "GT", level: 55, text: "Sudah 6 tahun tracking entitas ini. Pola kemunculannya selalu dekat sumber air stagnan, tidak pernah di air mengalir.", time: "1 minggu lalu", location: "Bogor, Jawa Barat" },
    ],
    collector_ranks: [
      { rank: 1, user: "GhostTracker_ID", level: 55, badge: "LEGENDARY" },
      { rank: 2, user: "AquaPhantom", level: 38, badge: "MYTHIC" },
      { rank: 3, user: "WaterWatcher", level: 29, badge: "RARE" },
      { rank: 4, user: "NightArchive", level: 21, badge: "UNCOMMON" },
      { rank: 5, user: "ShadowHunter_X", level: 23, badge: "UNCOMMON" },
    ],
    evp_transcript: '"Ayo ke sini nak... airnya segar... ayo kemari..."',
    evp_frequency: "85Hz — Frekuensi hipnotik rendah, optimal untuk manipulasi kognitif",
    ambient_sounds: ["Suara percikan air ritmis seperti ketukan kode", "Tawa rendah menyerupai suara orang tua", "Langkah air seperti seseorang berjalan di kubangan"],
  },
  "3": {
    id: "3", name: "SUSTER NGESOT", rarity: "Mythic", role: "Manipulator", danger_lvl: 9,
    image_url: "/assets/images/suster-ngesot.jpg", price: { dc: 5000, obsidian: 50 },
    tags: ["TIER 9 — KRITIS", "ENTITAS RUMAH SAKIT", "WILAYAH URBAN"],
    threats: [
      { name: "AGRESI ENTITAS", value: 90, colorFrom: "from-red-600", colorTo: "to-red-400", pct: "90%" },
      { name: "INTELEGENSI GAIB", value: 100, colorFrom: "from-blue-600", colorTo: "to-blue-400", pct: "100%" },
      { name: "KEKUATAN KUTUKAN", value: 85, colorFrom: "from-purple-600", colorTo: "to-purple-400", pct: "85%" },
      { name: "KEMAMPUAN MANIPULASI", value: 70, colorFrom: "from-yellow-600", colorTo: "to-yellow-400", pct: "70%" },
    ],
    active_times: { kritis: "23:00 - 01:00", aktif: "18:00 - 23:00", dormant: "06:00 - 17:00" },
    origin_story: "Dulunya seorang perawat yang terbunuh secara brutal di lorong rumah sakit jiwa yang kini terbengkalai pada tahun 1987. Kematiannya yang penuh amarah dan pengkhianatan membuatnya terikat pada dunia ini sebagai entitas pendendam berkekuatan tinggi yang tak dapat ditenangkan.",
    lore: "Arsip V.O.I.D. Klasifikasi HITAM — Suster Ngesot merupakan salah satu entitas paling aktif di wilayah urban Indonesia. Mobilitas geraknya yang tidak konvensional membuat prediksi jalur serangannya sangat sulit bahkan bagi agen berpengalaman.",
    abilities: {
      passive: ["Aura kepanikan yang melumpuhkan kemampuan kognitif manusia normal", "Manipulasi sistem listrik dan elektronik dalam radius 20m"],
      active: ["Serangan mendadak dari bawah dengan kecepatan supranatural", "Teleportasi jarak pendek (maks 5m) dalam kondisi kegelapan penuh"],
    },
    weaknesses: ["Cahaya terang di atas 5000 lux melemahkan mobilitasnya secara signifikan", "Doa Komplit dibacakan secara berulang membentuk penghalang energi", "Simbol perlindungan Jawa Kuno di pintu masuk mencegah akses masuk"],
    danger_zones: ["Lorong rumah sakit terbengkalai tanpa penerangan", "Ruang bawah tangga gedung tua bertingkat", "Area basement dengan sirkulasi udara buruk"],
    survival_tips: ["Selalu periksa area lantai sebelum berjalan di lorong gelap", "Bawa senter dengan luminositas minimal 5000 lux", "Jangan pernah masuk basement sendirian tanpa komunikasi aktif"],
    eyewitness: [
      { user: "RS_Explorer_88", avatar: "RE", level: 61, text: "Saya melihat bayangannya di RS Sentosa jam 02:00 pagi. Gerakannya secepat kilat — dari ujung lorong ke ujung lainnya dalam hitungan detik.", time: "1 hari lalu", location: "Jakarta, DKI Jakarta" },
      { user: "VoidAgent_47", avatar: "VA", level: 31, text: "Kamera CCTV kami berhasil merekam gerakannya. Frame rate 60fps pun hampir tidak cukup untuk menangkap kecepatan penuh mobilitasnya.", time: "4 hari lalu", location: "Tangerang, Banten" },
      { user: "HorrorDoc_", avatar: "HD", level: 72, text: "10 tahun penelitian paranormal, dan ini yang paling berbahaya yang pernah saya temui. Jangan pernah masuk RS terbengkalai tanpa tim lengkap.", time: "2 minggu lalu", location: "Surabaya, Jawa Timur" },
    ],
    collector_ranks: [
      { rank: 1, user: "HorrorDoc_", level: 72, badge: "CURSED" },
      { rank: 2, user: "RS_Explorer_88", level: 61, badge: "LEGENDARY" },
      { rank: 3, user: "PhantomMD", level: 49, badge: "MYTHIC" },
      { rank: 4, user: "VoidAgent_47", level: 31, badge: "EPIC" },
      { rank: 5, user: "DarkArchivst", level: 18, badge: "RARE" },
    ],
    evp_transcript: '"Dokter... di mana dokternya... sakit... sakit sekali..."',
    evp_frequency: "60Hz — Resonansi infrasonik, efek kecemasan akut pada pendengar",
    ambient_sounds: ["Suara seretan kain di permukaan lantai keras", "Nafas berat dan tersengal-sengal", "Roda kursi roda berputar tanpa henti di lorong"],
  },
  "4": {
    id: "4", name: "NYI RORO KIDUL", rarity: "Legendary", role: "Watcher", danger_lvl: 10,
    image_url: "/assets/images/nyi-roro-kidul.jpg", price: { dc: 15000, obsidian: 200 },
    tags: ["TIER 10 — ABADI", "ENTITAS AIR", "WILAYAH PANTAI SELATAN"],
    threats: [
      { name: "AGRESI ENTITAS", value: 75, colorFrom: "from-red-600", colorTo: "to-red-400", pct: "75%" },
      { name: "INTELEGENSI GAIB", value: 100, colorFrom: "from-blue-600", colorTo: "to-blue-400", pct: "100%" },
      { name: "KEKUATAN KUTUKAN", value: 100, colorFrom: "from-purple-600", colorTo: "to-purple-400", pct: "100%" },
      { name: "KEMAMPUAN MANIPULASI", value: 95, colorFrom: "from-yellow-600", colorTo: "to-yellow-400", pct: "95%" },
    ],
    active_times: { kritis: "Pasang Malam Purnama", aktif: "Saat Ombak Besar", dormant: "Siang Hari Tenang" },
    origin_story: "Menurut legenda kuno Jawa, Nyi Roro Kidul adalah putri kerajaan yang dikutuk dan dibuang ke laut selatan karena penyakit yang dianggap kutukan ilahi. Kemarahannya selama berabad-abad bertransformasi menjadi kekuatan supranatural yang menguasai seluruh Samudra Hindia bagian selatan.",
    lore: "PERINGATAN KRITIS — V.O.I.D. mengklasifikasikan Nyi Roro Kidul sebagai Entitas Kelas OMEGA. Tidak ada agen yang pernah menghadapinya secara langsung dan kembali dalam kondisi mental yang utuh. Kontak langsung hanya diizinkan untuk agen dengan clearance level tertinggi.",
    abilities: {
      passive: ["Kendali penuh atas arus dan gelombang laut selatan", "Hipnosis ekstrem pada siapapun yang memandang laut di malam hari"],
      active: ["Kemampuan menarik jiwa manusia ke kedalaman laut secara paksa", "Manipulasi cuaca dalam radius 100km dari posisinya"],
    },
    weaknesses: ["Persembahan ritual resmi dari keraton (prosedur sangat spesifik)", "Tidak memasuki daratan lebih dari 100m dari garis pantai", "Benda pusaka keraton Mataram menetralisir sebagian kekuatannya"],
    danger_zones: ["Sepanjang Pantai Selatan Jawa dari Banten hingga Banyuwangi", "Laut terbuka tanpa penjaga saat malam purnama", "Pantai sepi dengan ombak tidak biasa"],
    survival_tips: ["Jangan memakai pakaian berwarna hijau di sepanjang Pantai Selatan", "Hindari berenang sendirian saat matahari terbenam", "Selalu minta izin secara verbal sebelum masuk ke laut"],
    eyewitness: [
      { user: "OceanWatcher_", avatar: "OW", level: 88, text: "Kamera termal kami mendeteksi anomali cahaya bawah laut pada kedalaman 50m di Pantai Parangtritis. Suhu air naik mendadak 12°C dalam 3 detik.", time: "3 hari lalu", location: "Parangtritis, Yogyakarta" },
      { user: "CoastalAgent", avatar: "CA", level: 77, text: "20 tahun memantau Pantai Selatan. Pola kemunculannya selalu terkait siklus bulan purnama dan fenomena pasang ekstrem.", time: "1 minggu lalu", location: "Pelabuhan Ratu, Sukabumi" },
    ],
    collector_ranks: [
      { rank: 1, user: "OceanWatcher_", level: 88, badge: "CURSED" },
      { rank: 2, user: "CoastalAgent", level: 77, badge: "CURSED" },
      { rank: 3, user: "TidalForce_X", level: 66, badge: "LEGENDARY" },
      { rank: 4, user: "AbyssalHunter", level: 51, badge: "MYTHIC" },
      { rank: 5, user: "HorrorDoc_", level: 72, badge: "LEGENDARY" },
    ],
    evp_transcript: '"Kemari... di sini indah... ikutlah bersamaku ke bawah..."',
    evp_frequency: "20Hz — Batas infrasonik, hampir tidak terdeteksi peralatan standar",
    ambient_sounds: ["Gemuruh ombak berirama seperti detak jantung", "Melodi gamelan dari kedalaman laut", "Bisikan suara perempuan dalam angin laut malam"],
  },
};

// ─── RARITY CONFIG ────────────────────────────────────────────────────────────
const rarityColor: Record<string, string> = {
  Common: "text-zinc-400", Uncommon: "text-blue-400", Rare: "text-green-400",
  Epic: "text-purple-400", Mythic: "text-red-400", Legendary: "text-yellow-400", Cursed: "text-purple-300",
};
const badgeColor: Record<string, string> = {
  CURSED: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  LEGENDARY: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  MYTHIC: "bg-red-500/20 text-red-300 border-red-500/40",
  EPIC: "bg-purple-600/20 text-purple-400 border-purple-600/40",
  RARE: "bg-green-500/20 text-green-300 border-green-500/40",
  UNCOMMON: "bg-blue-500/20 text-blue-300 border-blue-500/40",
};

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
function TypewriterText({ text, className, delay = 30 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) { setDisplayed(text.slice(0, i)); i++; }
      else { setDone(true); clearInterval(timer); }
    }, delay);
    return () => clearInterval(timer);
  }, [isInView, text, delay]);

  return (
    <div ref={ref} className={className}>
      {displayed}
      {!done && isInView && <span className="animate-pulse text-red-500">|</span>}
    </div>
  );
}

// ─── GLITCH SEPARATOR ────────────────────────────────────────────────────────
function GlitchSeparator() {
  return (
    <div className="relative my-12 flex items-center gap-4 overflow-hidden">
      <motion.div
        animate={{ scaleX: [1, 1.02, 0.98, 1], x: [0, 2, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-red-500/80 to-transparent"
      />
      <motion.div
        animate={{ opacity: [1, 0.2, 1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-[9px] font-black tracking-[0.5em] text-red-500/70 whitespace-nowrap select-none"
      >
        ◈ V.O.I.D. ARCHIVE DATA ◈
      </motion.div>
      <motion.div
        animate={{ scaleX: [1, 0.98, 1.02, 1], x: [0, -2, 2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-red-500/80 to-transparent"
      />
      {[20, 50, 80].map((top) => (
        <motion.div
          key={top}
          animate={{ x: ["-100%", "200%"], opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: top / 100, ease: "linear" }}
          className="absolute h-[1px] w-16 bg-red-400/60"
          style={{ top: `${top}%` }}
        />
      ))}
    </div>
  );
}

// ─── SIGHTING LOGS CAROUSEL ──────────────────────────────────────────────────
const SIGHTING_LABELS = [
  "PENAMPAKAN LANGSUNG", "REKAMAN CCTV", "FOTO LAPANGAN",
  "SKETSA ANATOMIS", "GAMBAR ARSIP 1900an",
  "SCAN TERMAL", "SCAN SPEKTRAL",
];

function SightingLogsCarousel({ images }: { images?: string[] }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);
  const SHOW = 3;
  const TOTAL = 7;
  const maxIdx = TOTAL - SHOW;

  const go = (d: number) => {
    setDir(d);
    setIdx((prev) => Math.max(0, Math.min(prev + d, maxIdx)));
  };

  const slots = Array.from({ length: TOTAL }, (_, i) => ({
    label: SIGHTING_LABELS[i],
    img: images?.[i] || null,
  }));

  return (
    <section className="mb-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileSearch size={14} className="text-red-500" />
            <span className="text-[9px] font-black tracking-[0.35em] text-red-500 uppercase">Forensic Evidence</span>
          </div>
          <h3 className="text-xl font-bold text-white uppercase tracking-wider">Sighting Logs</h3>
          <p className="text-xs text-gray-600 mt-0.5">Dokumentasi bukti lapangan V.O.I.D. — {TOTAL} file tersedia</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => go(-1)} disabled={idx === 0}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500/40 transition-all disabled:opacity-20"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => go(1)} disabled={idx >= maxIdx}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500/40 transition-all disabled:opacity-20"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl">
        <motion.div
          animate={{ x: `${-idx * (100 / SHOW)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
          className="flex gap-4"
          style={{ width: `${(TOTAL / SHOW) * 100}%` }}
        >
          {slots.map((slot, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="relative flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] cursor-pointer group"
              style={{ width: `${100 / TOTAL}%`, aspectRatio: "4/5" }}
            >
              {slot.img ? (
                <Image src={slot.img} alt={slot.label} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <motion.div
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                    className="w-12 h-12 rounded-full border-2 border-dashed border-red-500/30 flex items-center justify-center"
                  >
                    <span className="text-red-500/40 text-lg font-black">{i + 1}</span>
                  </motion.div>
                  <div className="text-center px-3">
                    <p className="text-[8px] font-black tracking-widest text-gray-700 uppercase leading-tight">{slot.label}</p>
                    <p className="text-[7px] text-gray-800 mt-1">FILE BELUM DIUNGGAH</p>
                  </div>
                </div>
              )}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                <span className="text-[7px] font-black tracking-widest text-white/40 bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                  LOG {String(i + 1).padStart(2, "0")}
                </span>
                {!slot.img && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                    className="text-[7px] text-red-500/60 font-black tracking-widest"
                  >
                    EMPTY
                  </motion.span>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <p className="text-[8px] font-black tracking-wider text-white/80 uppercase">{slot.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center gap-1.5 mt-4">
        {Array.from({ length: maxIdx + 1 }).map((_, i) => (
          <button
            key={i} onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
            className={cn("rounded-full transition-all duration-300", i === idx ? "w-6 h-1.5 bg-red-500" : "w-1.5 h-1.5 bg-white/20")}
          />
        ))}
      </div>
    </section>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function GhostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [ghost, setGhost] = useState<GhostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"file" | "data" | "lore" | "panduan">("data");

  useEffect(() => {
    async function fetchGhost() {
      try {
        const { data, error } = await supabase.from("ghost_cards").select("*").eq("id", id).single();
        if (error || !data) {
          setGhost(MOCK_GHOSTS[id as string] || MOCK_GHOSTS["1"]);
        } else {
          const rich = MOCK_GHOSTS[id as string] || {};
          setGhost({ ...rich, ...data });
        }
      } catch {
        setGhost(MOCK_GHOSTS[id as string] || MOCK_GHOSTS["1"]);
      } finally {
        setLoading(false);
      }
    }
    fetchGhost();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <Skull size={48} className="text-red-500/40 mx-auto mb-4" />
        <p className="text-gray-600 text-sm font-mono tracking-widest">MENGAKSES ARSIP V.O.I.D...</p>
      </motion.div>
    </div>
  );
  if (!ghost) return <div className="p-20 text-center text-gray-500">Entitas tidak ditemukan.</div>;

  const rarityClass = rarityColor[ghost.rarity] || "text-gray-400";

  const TABS = [
    { key: "file" as const, label: "FILE EXPLORER", icon: FileSearch },
    { key: "data" as const, label: "DATA ANALISIS", icon: Activity },
    { key: "lore" as const, label: "BERKAS LORE", icon: Radio },
    { key: "panduan" as const, label: "PANDUAN SELAMAT", icon: Shield },
  ];

  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-6xl mx-auto px-6 pt-8">

        {/* ── BACK BUTTON ── */}
        <motion.button
          onClick={() => router.back()}
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-gray-600 hover:text-white mb-8 transition-colors group text-sm font-black tracking-widest uppercase"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Arsip
        </motion.button>

        {/* ── ENTITY HEADER ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[9px] font-black tracking-[0.5em] text-red-500 uppercase">Entity Overview</span>
          </div>
          <h1 className="font-horror text-6xl md:text-7xl text-white uppercase tracking-wider drop-shadow-[0_0_20px_rgba(255,0,0,0.4)] leading-none">
            {ghost.name}
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <span className={cn("text-xs font-black tracking-widest uppercase", rarityClass)}>
              ◆ {ghost.rarity}
            </span>
            <span className="text-gray-700">·</span>
            <span className="text-xs text-gray-500 tracking-widest uppercase">{ghost.role}</span>
            <span className="text-gray-700">·</span>
            <span className="text-xs text-red-500/80 font-black tracking-widest">DANGER {ghost.danger_lvl}/10</span>
          </div>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-8 items-start mb-16">

          {/* LEFT: IMAGE CARD */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 bg-[#050505] group"
          >
            {ghost.image_url ? (
              <Image src={ghost.image_url} alt={ghost.name} fill sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Skull size={80} className="text-white/10 animate-pulse" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

            {/* Rarity / Role badges */}
            <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
              <span className={cn("px-3 py-1.5 rounded-full border bg-black/70 backdrop-blur-sm text-[9px] font-black tracking-[0.4em] uppercase", rarityClass, "border-current/30")}>
                {ghost.rarity}
              </span>
              <span className="px-3 py-1.5 rounded-full border bg-black/70 backdrop-blur-sm border-white/20 text-[9px] font-black tracking-[0.3em] text-gray-300 uppercase">
                {ghost.role}
              </span>
            </div>

            {/* Bottom tags */}
            <div className="absolute bottom-5 left-5 right-5 z-10">
              <div className="flex flex-wrap gap-1.5">
                {(ghost.tags || []).map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-sm text-[8px] font-black tracking-widest text-white/60 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Scan animation */}
            <motion.div
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="absolute inset-0 bg-gradient-to-b from-red-500/10 via-transparent to-transparent pointer-events-none"
            />
          </motion.div>

          {/* RIGHT: TABS + CONTENT */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            {/* Tab Navigation */}
            <div className="flex border-b border-white/10 mb-6 overflow-x-auto gap-0 scrollbar-hide">
              {TABS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-3 text-[10px] font-black tracking-[0.25em] uppercase whitespace-nowrap transition-all border-b-2 -mb-[1px]",
                    activeTab === key
                      ? "border-red-500 text-red-400"
                      : "border-transparent text-gray-600 hover:text-gray-400"
                  )}
                >
                  <Icon size={11} />
                  {label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >

                {/* ──── FILE EXPLORER TAB ──── */}
                {activeTab === "file" && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-[9px] font-black tracking-[0.3em] text-gray-600 uppercase mb-3">// VISUAL ARCHIVE — 7 EVIDENCE FILES</p>
                      <div className="grid grid-cols-3 gap-2">
                        {Array.from({ length: 7 }, (_, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="aspect-square rounded-xl border border-dashed border-white/10 bg-black/40 flex flex-col items-center justify-center gap-1.5 cursor-pointer group/file hover:border-red-500/30 transition-colors"
                          >
                            <motion.div
                              animate={{ opacity: [0.3, 0.7, 0.3] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                            >
                              <FileSearch size={18} className="text-white/20 group-hover/file:text-red-500/40 transition-colors" />
                            </motion.div>
                            <span className="text-[7px] text-white/20 font-black tracking-wider">LOG {String(i + 1).padStart(2, "0")}</span>
                            <span className="text-[6px] text-gray-800 uppercase tracking-wider">{SIGHTING_LABELS[i].slice(0, 12)}</span>
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-[8px] text-gray-700 text-center mt-3 font-mono">SLOT KOSONG — Gambar akan diisi oleh Agen V.O.I.D.</p>
                    </div>
                    {ghost.evp_frequency && (
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-[9px] font-black tracking-[0.3em] text-gray-600 uppercase mb-2">// EVP QUICK ACCESS</p>
                        <p className="text-xs text-green-400 font-mono">{ghost.evp_transcript}</p>
                        <p className="text-[9px] text-gray-600 mt-1 font-mono">{ghost.evp_frequency}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* ──── DATA ANALISIS TAB ──── */}
                {activeTab === "data" && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-[9px] font-black tracking-[0.35em] text-gray-600 uppercase mb-4">// ATRIBUT ANCAMAN</p>
                      <div className="space-y-4">
                        {(ghost.threats || []).map((t) => (
                          <div key={t.name}>
                            <div className="flex justify-between mb-1.5">
                              <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">{t.name}</span>
                              <span className={cn("text-[11px] font-black tabular-nums", t.value >= 90 ? "text-red-400" : t.value >= 70 ? "text-blue-400" : t.value >= 50 ? "text-purple-400" : "text-yellow-400")}>
                                {t.value}%
                              </span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: t.pct }}
                                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                className={cn("h-full rounded-full bg-gradient-to-r", t.colorFrom, t.colorTo)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {ghost.active_times && (
                      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock size={13} className="text-gray-500" />
                          <p className="text-[9px] font-black tracking-[0.35em] text-gray-600 uppercase">Waktu Aktif Paling Berbahaya</p>
                        </div>
                        <div className="space-y-2">
                          {[
                            { label: "KRITIS", time: ghost.active_times.kritis, color: "text-red-400", dot: "bg-red-500" },
                            { label: "AKTIF", time: ghost.active_times.aktif, color: "text-orange-400", dot: "bg-orange-500" },
                            { label: "DORMANT", time: ghost.active_times.dormant, color: "text-gray-500", dot: "bg-gray-600" },
                          ].map(({ label, time, color, dot }) => (
                            <div key={label} className="flex items-center gap-2.5">
                              <div className={cn("w-2 h-2 rounded-full", dot)} />
                              <span className={cn("text-[9px] font-black tracking-widest", color)}>{label}</span>
                              <span className="text-[9px] text-gray-600 ml-auto font-mono">{time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {(ghost.tags || []).length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {ghost.tags!.map((tag) => (
                          <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-black tracking-wider text-gray-500 uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ──── BERKAS LORE TAB ──── */}
                {activeTab === "lore" && (
                  <div className="space-y-5">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-[9px] font-black tracking-[0.35em] text-gray-600 uppercase mb-3">// ASAL USUL TRAGEDI</p>
                      <p className="text-sm text-gray-400 leading-relaxed font-serif italic">&ldquo;{ghost.origin_story}&rdquo;</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-red-950/10 border border-red-500/10">
                      <p className="text-[9px] font-black tracking-[0.35em] text-gray-600 uppercase mb-3">// CATATAN ARSIP V.O.I.D.</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{ghost.lore}</p>
                    </div>
                  </div>
                )}

                {/* ──── PANDUAN SELAMAT TAB ──── */}
                {activeTab === "panduan" && (
                  <div className="space-y-5">
                    {ghost.abilities && (
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <Swords size={13} className="text-red-500" />
                          <p className="text-[9px] font-black tracking-[0.35em] text-red-500/80 uppercase">Kemampuan Entitas</p>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-[8px] font-black tracking-widest text-gray-700 uppercase mb-1.5">PASIF</p>
                            {ghost.abilities.passive.map((a, i) => (
                              <div key={i} className="flex gap-2 mb-1.5">
                                <span className="text-red-500/60 text-xs mt-0.5 flex-shrink-0">◆</span>
                                <p className="text-xs text-gray-400 leading-relaxed">{a}</p>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-white/5 pt-3">
                            <p className="text-[8px] font-black tracking-widest text-gray-700 uppercase mb-1.5">AKTIF</p>
                            {ghost.abilities.active.map((a, i) => (
                              <div key={i} className="flex gap-2 mb-1.5">
                                <span className="text-orange-500/60 text-xs mt-0.5 flex-shrink-0">◆</span>
                                <p className="text-xs text-gray-400 leading-relaxed">{a}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {ghost.weaknesses && (
                      <div className="p-4 rounded-2xl bg-green-950/10 border border-green-500/10">
                        <div className="flex items-center gap-2 mb-3">
                          <Target size={13} className="text-green-500" />
                          <p className="text-[9px] font-black tracking-[0.35em] text-green-500/80 uppercase">Titik Lemah</p>
                        </div>
                        {ghost.weaknesses.map((w, i) => (
                          <div key={i} className="flex gap-2 mb-1.5">
                            <span className="text-green-500/60 text-xs mt-0.5 flex-shrink-0">✓</span>
                            <p className="text-xs text-gray-400 leading-relaxed">{w}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {ghost.survival_tips && (
                      <div className="p-4 rounded-2xl bg-yellow-950/10 border border-yellow-500/10">
                        <div className="flex items-center gap-2 mb-3">
                          <TriangleAlert size={13} className="text-yellow-500" />
                          <p className="text-[9px] font-black tracking-[0.35em] text-yellow-500/80 uppercase">Protokol Evakuasi</p>
                        </div>
                        {ghost.survival_tips.map((t, i) => (
                          <div key={i} className="flex gap-2 mb-1.5">
                            <span className="text-yellow-500/60 font-black text-xs mt-0.5 flex-shrink-0">{i + 1}.</span>
                            <p className="text-xs text-gray-400 leading-relaxed">{t}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── SIGHTING LOGS CAROUSEL ── */}
        <SightingLogsCarousel images={[]} />

        {/* ── GLITCH SEPARATOR ── */}
        <GlitchSeparator />

        {/* ══════════════════════════════════════════════
            WIKIPEDIA SECTIONS
        ══════════════════════════════════════════════ */}

        {/* 1 — SEJARAH & LORE */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-red-500 rounded-full" />
            <div>
              <p className="text-[9px] font-black tracking-[0.4em] text-red-500 uppercase">01 — Wikipedia V.O.I.D.</p>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Sejarah &amp; Lore</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#080808] border border-white/8">
              <p className="text-[9px] font-black tracking-widest text-gray-700 uppercase mb-3">// ASAL USUL</p>
              <TypewriterText
                text={ghost.origin_story || "Data tidak tersedia dalam arsip V.O.I.D."}
                className="text-sm text-gray-400 leading-relaxed font-serif italic"
                delay={25}
              />
            </div>
            <div className="p-6 rounded-2xl bg-[#080808] border border-white/8">
              <p className="text-[9px] font-black tracking-widest text-gray-700 uppercase mb-3">// CATATAN LAPANGAN</p>
              <TypewriterText
                text={ghost.lore || "Klasifikasi data masih dalam proses verifikasi."}
                className="text-sm text-gray-500 leading-relaxed"
                delay={15}
              />
            </div>
          </div>
        </section>

        {/* 2 — TACTICAL DATA */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-orange-500 rounded-full" />
            <div>
              <p className="text-[9px] font-black tracking-[0.4em] text-orange-500 uppercase">02 — Tactical Guide</p>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Kemampuan &amp; Kelemahan</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-red-950/10 border border-red-500/15">
              <div className="flex items-center gap-2 mb-4">
                <Swords size={16} className="text-red-500" />
                <p className="text-xs font-black tracking-widest text-red-400 uppercase">Kemampuan</p>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[8px] font-black tracking-widest text-gray-700 uppercase mb-1.5">Pasif</p>
                  {(ghost.abilities?.passive || []).map((a, i) => (
                    <p key={i} className="text-xs text-gray-500 leading-relaxed mb-2 pl-3 border-l border-red-500/20">{a}</p>
                  ))}
                </div>
                <div className="pt-2 border-t border-white/5">
                  <p className="text-[8px] font-black tracking-widest text-gray-700 uppercase mb-1.5">Aktif</p>
                  {(ghost.abilities?.active || []).map((a, i) => (
                    <p key={i} className="text-xs text-gray-500 leading-relaxed mb-2 pl-3 border-l border-orange-500/20">{a}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-green-950/10 border border-green-500/15">
              <div className="flex items-center gap-2 mb-4">
                <Target size={16} className="text-green-500" />
                <p className="text-xs font-black tracking-widest text-green-400 uppercase">Titik Lemah</p>
              </div>
              <div className="space-y-2">
                {(ghost.weaknesses || []).map((w, i) => (
                  <div key={i} className="flex gap-2.5">
                    <span className="text-green-500/70 text-xs mt-0.5 flex-shrink-0">✓</span>
                    <p className="text-xs text-gray-500 leading-relaxed">{w}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-yellow-950/10 border border-yellow-500/15">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-yellow-500" />
                <p className="text-xs font-black tracking-widest text-yellow-400 uppercase">Zona Bahaya</p>
              </div>
              <div className="space-y-2">
                {(ghost.danger_zones || []).map((z, i) => (
                  <div key={i} className="flex gap-2.5">
                    <span className="text-yellow-500/70 text-xs mt-0.5 flex-shrink-0">⚠</span>
                    <p className="text-xs text-gray-500 leading-relaxed">{z}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3 — COMMUNITY SIGHTINGS */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-blue-500 rounded-full" />
            <div>
              <p className="text-[9px] font-black tracking-[0.4em] text-blue-500 uppercase">03 — Community Reports</p>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Laporan Saksi Mata</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-[9px] font-black tracking-widest text-gray-700 uppercase mb-4">// {(ghost.eyewitness || []).length} LAPORAN TERVERIFIKASI</p>
              <div className="relative">
                <div className="absolute left-5 top-6 bottom-6 w-[1px] bg-white/5" />
                <div className="space-y-4">
                  {(ghost.eyewitness || []).map((ew, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-3 pl-0"
                    >
                      <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 text-[10px] font-black text-red-400 z-10">
                        {ew.avatar}
                      </div>
                      <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/8 hover:border-white/15 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-black text-white">{ew.user}</span>
                          <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded-full text-gray-500 font-black">LVL {ew.level}</span>
                          <span className="text-[8px] text-gray-700 ml-auto">{ew.time}</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed mb-2">&ldquo;{ew.text}&rdquo;</p>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={9} className="text-gray-700" />
                          <span className="text-[9px] text-gray-700 font-mono">{ew.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="text-[9px] font-black tracking-widest text-gray-700 uppercase mb-4">// TOP COLLECTOR RANKINGS</p>
              <div className="space-y-3">
                {(ghost.collector_ranks || []).map((cr, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/8 hover:border-white/15 transition-colors"
                  >
                    <span className={cn("text-lg font-black tabular-nums w-7 text-center",
                      cr.rank === 1 ? "text-yellow-400" : cr.rank === 2 ? "text-gray-300" : cr.rank === 3 ? "text-orange-400" : "text-gray-600"
                    )}>#{cr.rank}</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-black text-gray-400">
                      {cr.user.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-white truncate">{cr.user}</p>
                      <p className="text-[9px] text-gray-600">Level {cr.level}</p>
                    </div>
                    <span className={cn("text-[7px] font-black tracking-widest px-2 py-1 rounded-full border uppercase", badgeColor[cr.badge] || "bg-white/5 text-gray-500 border-white/10")}>
                      {cr.badge}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4 — AUDIO-VISUAL ARCHIVE */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-green-500 rounded-full" />
            <div>
              <p className="text-[9px] font-black tracking-[0.4em] text-green-500 uppercase">04 — Audio Archive</p>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wider">EVP &amp; Ambient Record</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#050808] border border-green-500/15 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <Radio size={14} className="text-green-500" />
                <p className="text-[9px] font-black tracking-[0.35em] text-green-500/80 uppercase">EVP Transcript</p>
              </div>
              <div className="bg-black/60 rounded-xl p-4 border border-green-500/20 font-mono mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[9px] text-green-500/60 tracking-widest">REC ● LIVE</span>
                </div>
                <p className="text-sm text-green-400 leading-relaxed">{ghost.evp_transcript || '"[DATA TIDAK TERSEDIA]"'}</p>
              </div>
              <div className="flex items-center gap-2">
                <Headphones size={11} className="text-gray-700" />
                <p className="text-[9px] text-gray-700 font-mono">{ghost.evp_frequency}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 flex items-end justify-center gap-0.5 opacity-10 overflow-hidden">
                {Array.from({ length: 40 }, (_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scaleY: [0.3, Math.random() * 0.8 + 0.2, 0.3] }}
                    transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.05 }}
                    className="flex-1 bg-green-500 rounded-t"
                    style={{ height: `${Math.random() * 100}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-[#050808] border border-purple-500/15">
              <div className="flex items-center gap-2 mb-4">
                <Volume2 size={14} className="text-purple-500" />
                <p className="text-[9px] font-black tracking-[0.35em] text-purple-500/80 uppercase">Ambient Soundscape</p>
              </div>
              <p className="text-[9px] text-gray-700 mb-4">Suara yang menandai kemunculan entitas ini:</p>
              <div className="space-y-3">
                {(ghost.ambient_sounds || []).map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/8 group hover:border-purple-500/20 transition-colors"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                      className="w-1.5 h-1.5 rounded-full bg-purple-500/60 flex-shrink-0"
                    />
                    <p className="text-xs text-gray-400">{s}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── COLLECT BUTTON ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 py-8"
        >
          {ghost.price && (
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="relative w-5 h-5 rounded-full overflow-hidden">
                  <Image src="/assets/icons/DREADCOINS.jpg" alt="DC" fill className="object-cover" />
                </div>
                <span className="font-black text-white">{ghost.price.dc.toLocaleString()} DC</span>
              </div>
              {ghost.price.obsidian > 0 && (
                <>
                  <span className="text-gray-700">+</span>
                  <div className="flex items-center gap-2">
                    <div className="relative w-5 h-5">
                      <Image src="/assets/icons/OBSIDIAN.png" alt="OBS" fill className="object-contain" />
                    </div>
                    <span className="font-black text-yellow-400">{ghost.price.obsidian} OBS</span>
                  </div>
                </>
              )}
            </div>
          )}
          <button className="flex items-center gap-3 px-12 py-5 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black tracking-[0.3em] uppercase text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(255,0,0,0.4)]">
            <ShoppingCart size={18} />
            Collect Entity Now
          </button>
          <p className="text-[9px] text-gray-700 tracking-widest">TRANSAKSI DIPROSES MELALUI SISTEM V.O.I.D. SECURE</p>
        </motion.div>

      </div>
    </div>
  );
}
