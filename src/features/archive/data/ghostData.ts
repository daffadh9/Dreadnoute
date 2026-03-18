import type { GhostArchiveEntry } from "../types/archive";

export const GHOST_ARCHIVE_ENTRIES: GhostArchiveEntry[] = [
  {
    id: "GA-001",
    slug: "nyi-roro-kidul",
    name: "Nyi Roro Kidul",
    category: "Makhluk Mitologi",
    origin: "Pantai Selatan Jawa",
    dangerLevel: "Ekstrem",
    summary:
      "Entitas penguasa laut selatan yang diyakini mampu memengaruhi arus, cuaca, dan kondisi batin orang yang memasuki wilayah pantai tertentu tanpa hormat.",
    history: [
      "Cerita paling tua berasal dari tradisi lisan pesisir selatan Jawa, jauh sebelum era modern.",
      "Sejumlah laporan nelayan menyebut kemunculan sosok berbusana hijau sebelum ombak besar tiba.",
      "Dalam catatan komunitas lokal, kejadian hilang mendadak sering dikaitkan dengan pelanggaran pantangan adat."
    ],
    abilities: [
      "Mengendalikan arus dan gelombang di zona pantai tertentu.",
      "Memicu ilusi suara panggilan dari arah laut pada malam hari.",
      "Mempengaruhi keputusan korban melalui tekanan psikologis halus."
    ],
    weaknesses: [
      "Batas pengaruh berkurang jauh dari garis pesisir selatan.",
      "Ritual penghormatan adat dan pendamping lokal menurunkan risiko interaksi negatif.",
      "Korban yang menjaga fokus kelompok cenderung lebih sulit terisolasi."
    ],
    dangerZones: ["Parangtritis", "Pelabuhan Ratu", "Cilacap Selatan"],
    mainImage: "/assets/images/nyi-roro-kidul.jpg",
    gallery: [
      "/assets/images/nyi-roro-kidul.jpg",
      "/assets/images/GHOST WIKI DASHBOARD.jpg"
    ],
    reports: [
      {
        id: "RPT-001",
        username: "nelayan_selatan",
        badge: "Saksi Lapangan",
        credibilityScore: 91,
        report:
          "Jam 02.10 terdengar suara perempuan memanggil dari arah ombak, lalu kompas kapal memutar tidak stabil selama beberapa menit."
      },
      {
        id: "RPT-002",
        username: "penjaga_pantai08",
        credibilityScore: 84,
        report:
          "Dua pengunjung memakai pakaian hijau mengalami disorientasi dan berjalan ke bibir pantai saat arus sedang kuat."
      }
    ]
  },
  {
    id: "GA-002",
    slug: "kuntilanak",
    name: "Kuntilanak",
    category: "Hantu",
    origin: "Permukiman tua dan area rimbun",
    dangerLevel: "Tinggi",
    summary:
      "Sosok perempuan bergaun putih dengan suara tawa khas, sering muncul di lokasi sepi dan menargetkan individu yang sendirian pada malam hari.",
    history: [
      "Laporan modern paling sering muncul di dekat pohon besar, rumah kosong, dan jalur kampung minim penerangan.",
      "Dalam berbagai kisah lokal, kemunculannya diawali aroma bunga yang datang tiba-tiba.",
      "Komunitas warga mencatat peningkatan kejadian setelah beberapa rumah lama ditinggalkan."
    ],
    abilities: [
      "Memanipulasi suara tawa untuk memancing korban mendekat.",
      "Berpindah cepat antar titik gelap tanpa terlihat jelas.",
      "Menciptakan rasa takut mendadak yang memicu panik."
    ],
    weaknesses: [
      "Area terang dengan aktivitas ramai mengurangi frekuensi kemunculan.",
      "Pendekatan berkelompok lebih aman dibanding bergerak sendiri.",
      "Penerangan tetap dan pengawasan rutin efektif menekan gangguan."
    ],
    dangerZones: ["Gang sempit minim lampu", "Pohon beringin tua", "Rumah kosong"],
    mainImage: "/assets/images/kuntilanak-peek.png",
    gallery: [
      "/assets/images/kuntilanak-peek.png",
      "/assets/images/auth-bg.jpg"
    ],
    reports: [
      {
        id: "RPT-003",
        username: "warga_cempaka",
        badge: "Relawan RW",
        credibilityScore: 79,
        report:
          "Terdengar tawa melengking dari belakang pos ronda, tapi kamera CCTV hanya menangkap bayangan putih sepersekian detik."
      },
      {
        id: "RPT-004",
        username: "ojol_malam",
        credibilityScore: 73,
        report:
          "Penumpang membatalkan pesanan setelah saya lewat gang gelap, lalu aplikasi sempat menampilkan titik jemput bergerak sendiri."
      }
    ]
  },
  {
    id: "GA-003",
    slug: "pocong",
    name: "Pocong",
    category: "Tempat Angker",
    origin: "Area pemakaman dan lahan kosong",
    dangerLevel: "Sedang",
    summary:
      "Entitas terbungkus kain kafan yang bergerak melompat, biasanya terlihat di sekitar pemakaman lama atau jalan desa yang sepi.",
    history: [
      "Kasus klasik sering berhubungan dengan pemakaman yang jarang dirawat atau minim penerangan.",
      "Sejumlah saksi menyebut suara gesekan kain sebagai tanda awal kemunculan.",
      "Fenomena ini kerap meningkat saat cuaca lembap dan berkabut."
    ],
    abilities: [
      "Muncul tiba-tiba di titik buta penglihatan korban.",
      "Menimbulkan efek kaget ekstrem yang membuat korban tidak bergerak.",
      "Memanfaatkan kabut tipis untuk menyamarkan pergerakan."
    ],
    weaknesses: [
      "Respons lambat terhadap area dengan pencahayaan menyebar.",
      "Tidak agresif bila korban tidak memancing interaksi.",
      "Patroli rutin di zona rawan dapat mencegah eskalasi kejadian."
    ],
    dangerZones: ["TPU lama", "Jalan desa berkabut", "Lahan kosong belakang kampung"],
    mainImage: "/assets/images/jerangkong.jpg",
    gallery: [
      "/assets/images/jerangkong.jpg",
      "/assets/images/GHOST WIKI DASHBOARD.jpg"
    ],
    reports: [
      {
        id: "RPT-005",
        username: "satpam_makam",
        badge: "Petugas Malam",
        credibilityScore: 82,
        report:
          "Pukul 01.40 terlihat sosok melompat di antara dua nisan, hilang saat disorot senter dari jarak dekat."
      },
      {
        id: "RPT-006",
        username: "anak_kampung",
        credibilityScore: 68,
        report:
          "Saya dengar suara kain diseret di dekat pagar makam, lalu anjing sekitar mendadak menggonggong serempak."
      }
    ]
  },
  {
    id: "GA-004",
    slug: "wewe-gombel",
    name: "Wewe Gombel",
    category: "Urban Legend",
    origin: "Permukiman pinggir kota dan kebun kosong",
    dangerLevel: "Tinggi",
    summary:
      "Entitas perempuan tua yang dalam folklor dikenal menculik anak-anak yang berkeliaran malam tanpa pengawasan.",
    history: [
      "Cerita rakyat Jawa menyebutkan target utama adalah anak yang tersesat atau ditelantarkan.",
      "Laporan kontemporer banyak datang dari area kebun kosong dekat permukiman padat.",
      "Di beberapa wilayah, namanya digunakan sebagai peringatan sosial bagi anak agar tidak keluar larut malam."
    ],
    abilities: [
      "Menyamarkan suara menjadi panggilan yang terdengar familier bagi anak.",
      "Menciptakan ilusi arah sehingga korban menjauh dari rumah.",
      "Berpindah antar semak dan area gelap dengan cepat."
    ],
    weaknesses: [
      "Pengawasan keluarga dan penerangan lingkungan menurunkan risiko.",
      "Korban yang didampingi orang dewasa jarang menjadi target.",
      "Area pemukiman aktif dengan ronda malam membatasi ruang gerak."
    ],
    dangerZones: ["Kebun kosong", "Bantaran sungai gelap", "Gang belakang sekolah"],
    mainImage: "/assets/images/nenek-gayung.jpg",
    gallery: [
      "/assets/images/nenek-gayung.jpg",
      "/assets/images/profile.jpg"
    ],
    reports: [
      {
        id: "RPT-007",
        username: "ibu_rt04",
        badge: "Pengurus RT",
        credibilityScore: 86,
        report:
          "Anak warga sempat hilang 20 menit setelah mengaku dipanggil suara ibunya dari arah kebun, padahal ibunya ada di rumah."
      },
      {
        id: "RPT-008",
        username: "ronda_sukamaju",
        credibilityScore: 77,
        report:
          "Kami menemukan jejak kaki kecil menuju semak, lalu jejak terputus total di titik yang sama."
      }
    ]
  },
  {
    id: "GA-005",
    slug: "genderuwo",
    name: "Genderuwo",
    category: "Fenomena Supranatural",
    origin: "Hutan pinggir desa dan bangunan terbengkalai",
    dangerLevel: "Tinggi",
    summary:
      "Entitas bertubuh besar dengan kekuatan fisik dominan, sering dikaitkan dengan gangguan berat pada individu yang memasuki wilayahnya.",
    history: [
      "Cerita lama menyebut Genderuwo menghuni area lembap, gelap, dan jarang dilalui manusia.",
      "Saksi modern melaporkan suara langkah berat dan bau tanah basah sebelum kemunculan.",
      "Di beberapa kasus, korban mengalami kehilangan waktu singkat setelah kontak visual."
    ],
    abilities: [
      "Tekanan fisik kuat yang mampu merusak benda ringan di sekitar.",
      "Menciptakan gangguan sensorik seperti rasa diawasi terus-menerus.",
      "Menimbulkan kebingungan arah dalam radius terbatas."
    ],
    weaknesses: [
      "Tidak stabil di ruang sempit dengan pencahayaan terang konstan.",
      "Tim dengan komunikasi rapat lebih tahan terhadap efek disorientasi.",
      "Menghindari area inti kemunculan adalah strategi mitigasi paling aman."
    ],
    dangerZones: ["Gudang kosong", "Hutan bambu", "Bangunan pabrik lama"],
    mainImage: "/assets/images/suster-ngesot.jpg",
    gallery: [
      "/assets/images/suster-ngesot.jpg",
      "/assets/images/market-hero.png"
    ],
    reports: [
      {
        id: "RPT-009",
        username: "tim_eksplor_11",
        badge: "Penelusur",
        credibilityScore: 88,
        report:
          "Terdengar tiga kali hentakan berat dari lantai dua gudang kosong, lalu pintu besi tertutup sendiri tanpa angin."
      },
      {
        id: "RPT-010",
        username: "fotografer_lokal",
        credibilityScore: 75,
        report:
          "Kamera menangkap siluet besar di belakang pilar, tetapi objek menghilang ketika disorot langsung."
      }
    ]
  }
];


