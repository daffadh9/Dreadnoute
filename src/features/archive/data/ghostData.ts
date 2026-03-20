import type { GhostArchiveEntry } from "../types/archive";

export const GHOST_ARCHIVE_ENTRIES: GhostArchiveEntry[] = [
  {
    id: "GA-001",
    slug: "nyi-roro-kidul",
    name: "Nyi Roro Kidul",
    category: "Makhluk Mitologi",
    origin: "Pesisir Laut Selatan Jawa",
    country: "Indonesia",
    province: "Daerah Istimewa Yogyakarta",
    city: "Bantul",
    aliases: ["Kanjeng Ratu Kidul", "Ratu Laut Selatan"],
    era: "Kuno",
    evidenceTags: ["Penampakan", "Suara", "Anomali Cuaca", "Disorientasi"],
    sourceType: "Tradisi Lisan",
    dangerLevel: "Ekstrem",
    summary:
      "Figur penguasa Laut Selatan yang dipercaya memiliki pengaruh kuat terhadap arus, cuaca, dan kondisi mental pengunjung pesisir. Laporan paling berisiko muncul setelah pelanggaran pantangan adat setempat.",
    history: [
      "Catatan tradisi lisan pesisir selatan Jawa menempatkan sosok ini sebagai otoritas gaib penjaga batas laut dan daratan.",
      "Laporan komunitas nelayan menyebut kemunculan siluet berbusana hijau sebagai penanda perubahan arus yang tidak normal.",
      "Dalam arsip lapangan modern, kejadian hilang orientasi sering terjadi ketika pengunjung mengabaikan peringatan warga lokal."
    ],
    abilities: [
      "Memengaruhi pola arus dan gelombang pada radius pesisir tertentu.",
      "Memunculkan ilusi panggilan suara dari arah laut untuk memisahkan target dari kelompok.",
      "Menekan kestabilan psikologis korban melalui rasa cemas dan impuls berjalan ke zona berbahaya."
    ],
    weaknesses: [
      "Intensitas gangguan menurun signifikan di area jauh dari garis pantai selatan.",
      "Pendampingan pemandu lokal dan kepatuhan terhadap pantangan adat menurunkan eskalasi kejadian.",
      "Pergerakan tim dengan komunikasi rapat membuat target lebih sulit terisolasi."
    ],
    dangerZones: [
      "Pantai Parangtritis, Bantul",
      "Pelabuhan Ratu, Sukabumi",
      "Pesisir Nusakambangan, Cilacap"
    ],
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
          "Pukul 02.10 kompas perahu berputar tidak stabil selama hampir dua menit, disusul suara perempuan dari arah ombak meski garis pantai kosong."
      },
      {
        id: "RPT-002",
        username: "penjaga_pantai08",
        credibilityScore: 84,
        report:
          "Dua pengunjung mendadak berjalan lurus ke bibir air saat arus naik, keduanya mengaku mendengar dipanggil dari area gelap di sisi barat pantai."
      }
    ]
  },
  {
    id: "GA-002",
    slug: "kuntilanak",
    name: "Kuntilanak",
    category: "Hantu",
    origin: "Permukiman tua dan koridor minim cahaya",
    country: "Indonesia",
    province: "Jawa Barat",
    city: "Bandung",
    aliases: ["Pontianak", "Kunti"],
    era: "Modern",
    evidenceTags: ["Penampakan", "Suara", "Gangguan CCTV", "Aroma Melati"],
    sourceType: "Urban Legend",
    dangerLevel: "Tinggi",
    summary:
      "Entitas perempuan bergaun pucat yang kerap muncul di area sepi dengan pola suara tawa bernada tinggi. Kemunculannya sering didahului aroma floral tajam dan gangguan visual singkat pada perangkat kamera.",
    history: [
      "Kisah kuntilanak berkembang luas di kawasan urban sebagai kelanjutan dari motif cerita rakyat tentang arwah perempuan yang meninggal tragis.",
      "Arsip kejadian modern mencatat kemunculan tertinggi pada jalur kampung tua dengan pencahayaan tidak merata.",
      "Banyak laporan menyatakan kemunculan terjadi setelah korban berjalan sendirian melewati titik pohon besar atau rumah kosong."
    ],
    abilities: [
      "Menggunakan spektrum suara tawa untuk memancing target bergerak menuju titik buta.",
      "Muncul dan menghilang cepat di area gelap sehingga menyulitkan verifikasi visual langsung.",
      "Memicu reaksi panik mendadak yang menurunkan kemampuan orientasi korban."
    ],
    weaknesses: [
      "Aktivitas cenderung berkurang pada area dengan penerangan konsisten dan lalu-lintas manusia tinggi.",
      "Target berkelompok menunjukkan tingkat gangguan yang lebih rendah dibanding target tunggal.",
      "Pemantauan lingkungan berbasis patroli berkala efektif menekan frekuensi kejadian."
    ],
    dangerZones: [
      "Gang tua Braga Timur, Bandung",
      "Kompleks rumah kosong Arcamanik",
      "Koridor pohon beringin Cibiru"
    ],
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
          "Tawa melengking terdengar dua kali dari belakang pos ronda, lalu kamera gang merekam frame putih kabur selama kurang dari satu detik."
      },
      {
        id: "RPT-004",
        username: "ojol_malam",
        credibilityScore: 73,
        report:
          "Saat melintas jalur sempit, aplikasi peta sempat kehilangan orientasi dan titik jemput meloncat ke area rumah kosong yang tidak berpenghuni."
      }
    ]
  },
  {
    id: "GA-003",
    slug: "pocong",
    name: "Pocong",
    category: "Entitas Kafan",
    origin: "Ritual Pemakaman Klasik",
    country: "Indonesia",
    province: "Nusantara",
    city: "Rural Area & Pemakaman Tua",
    aliases: ["Hantu Kafan", "Mayat Berjalan"],
    era: "Klasik & Modern",
    evidenceTags: ["Penampakan Visual", "Jejak Suara", "Aroma Kapur Barus"],
    sourceType: "Cerita Rakyat & Kasus Urban",
    dangerLevel: "Sedang",
    summary:
      "Manifestasi arwah yang terjebak dalam kain kafan, dipercaya muncul ketika ikatan kematian tidak dilepaskan. Ia tidak berjalan, melainkan meloncat—namun sering kali penampakannya justru terlihat bergerak menembus logika ruang tanpa gaya gesek.",
    history: [
      "Pocong dipercaya sebagai perwujudan roh yang tidak tenang akibat tali kafan yang gagal dilepaskan sebelum tanah ditimbun.",
      "Arsip kejadian mencatat entitas ini tidak hanya mendiami area pemakaman, melainkan juga merambah ke permukiman via sugesti trauma masyarakat setempat."
    ],
    detailedHistory: [
      {
        title: "Ringkasan Singkat (Hook)",
        icon: "FileText",
        content: "Pocong adalah manifestasi arwah yang terjebak dalam kain kafan, dipercaya muncul ketika ikatan kematian tidak dilepaskan. Ia tidak berjalan, melainkan meloncat — namun rentetan laporan paling mencekam mendeskripsikannya bergerak mulus tanpa gaya gesek, melayang tanpa suara mendekati sang saksi."
      },
      {
        title: "Asal Usul (Origin Story)",
        icon: "BookOpen",
        content: [
          "Dalam tradisi pemakaman di Indonesia, jenazah dibungkus dengan kain kafan dan diikat pada beberapa bagian tubuh—kepala, leher, dan kaki. Ikatan ini bukan sekadar ritual, melainkan simbol bahwa tubuh telah dikembalikan sepenuhnya kepada sang pencipta dan tanah tempat ia berasal.",
          "Namun dalam pusaran mitologi kelam masyarakat, terdapat satu ketakutan terdistorsi yang mengakar kuat: bagaimana jika ikatan tersebut tidak dilepas oleh para pekuasa liang lahat?",
          "Mitologi ini menetaskan kepercayaan bahwa arwah tersebut tertahan di ambang dunia fana. Ia bangkit dan melampaui pelindung maut demi 'meminta tolong' atau membawa bala peringatan. Transisi dari sebuah roh yang tersiksa menjadi entitas ektoplasma pemburu teror inilah yang mendefinisikan keberadaan mutlak Sang Pocong."
        ]
      },
      {
        title: "Lokasi & Kemunculan",
        icon: "MapPin",
        content: "Entitas kafan ini sangat bertalian dengan elemen kelembapan. Laporan penampakan meroket drastis pada areal kuburan yang basah tergenang, belukar kebun pisang yang rimbun dan minim drainase, hingga koridor ujung gang mati. Skala interaksi terkuat tercatat antara titik jam 01:15 hingga 03:00 dini hari."
      },
      {
        title: "Ciri-Ciri Penampakan",
        icon: "Eye",
        content: [
          "Siluet asimetris berupa bungkusan kain kafan usang yang basah, sobek, dan dililit kotoran liang lahat.",
          "Jahitan simpul wajah sering kali terbuka, merilis pemandangan kulit kering kehitaman dengan liang mata kosong lebam.",
          "Tidak memiliki bayangan yang memantulkan geometri sekitarnya. Pergerakan berkedip; melaporkan 'ada di ujung jalan', merunduk sesaat, lalu entitas 'telah berdiri tepat di samping telinga'."
        ]
      },
      {
        title: "Perilaku & Pola",
        icon: "Activity",
        content: "Entitas ini nyaris tidak pernah menunjukkan agresi mutilatif. Namun, siksaan mental yang ia sebar berkaliber ekstrem. Metode serangannya berkisar pada terror pengawasan statis—muncul tiba-tiba dari ambang cermin gelap lemarimu, berdiri mendadak dari balik bagasi mobil di perjalanan sepi, atau sekadar memiringkan kepala mengintip saksi mata selama berjam-jam secara membisu."
      },
      {
        title: "Interpretasi / Teori",
        icon: "Brain",
        content: "Keberadaan kolektifnya melahirkan friksi antar peneliti DreadNoute. Kalangan pakar folklor menyepakati adanya endapan energi negatif *(residual haunting)*, yang dikirim melalui dendam pribadi mendiang. Sedangkan divisi neuropsikologi percaya fenomena ini 90% lahir dari proyeksi phobia kolektif (thanatophobia) otak masyarakat tropis yang direfleksikan secara visual lewat anomali gelombang cahaya."
      },
      {
        title: "Cerita Rakyat / Kasus Nyata",
        icon: "Users",
        content: "Salah satu rilis arsip level merah kami merekam kesaksian seorang relawan Poskamling Jatingaleh tahun 1998. 'Malam itu gerimis. Rekan saya menyorot senter ke pohon beringin ujung karena ada bayangan guling jatuh. Kami baru tersadar, guling itu bergetar... kainnya merembes cairan tanah. Lalu saat ia loncat memutar menghadap kami, aromanya seketika mengunci leher seisi pos. Kami tak ingat apa-apa lagi sampai azan Subuh.' - Eks-Saksi #DRD-1998."
      }
    ],
    abilities: [
      "Micro-Blinking: Menipulasi letak presensi secara sporadis yang menggugurkan keharusan berjalan.",
      "Radiasi Kapur Barus: Menyebarkan gelombang miasma tak kasat mata yang mencekik oksigen saksi mata.",
      "Distorsi Mekanik: Mengacaukan kelistrikan kendaraan dan memadamkan sumber cahaya intensitas rendah."
    ],
    weaknesses: [
      "Pandangan Pariferal Terbatas: Postur kaku membuat manuver saksi dengan arah menyamping sulit dilacak entitas.",
      "Penghalang Fisik Solid: Tidak memiliki manifestasi lengan atau kontrol motorik untuk mendobrak halangan masif tebal.",
      "Area Penerangan Ambien Intens: Agregasi entitas gagal total saat dipaksa muncul di bawah spektrum cahaya kuat yang konsisten."
    ],
    dangerZones: [
      "Komplek Pemakaman Sepi di pinggiran kota",
      "Jalur lintas antar pedesaan di lereng dataran tinggi",
      "Infrastruktur tak terawat berlumpur"
    ],
    mainImage: "/images/ghost-archive/POCONG/POCONG - Hero.png",
    gallery: [
      "/images/ghost-archive/POCONG/Galery 1.png",
      "/images/ghost-archive/POCONG/Galery 2.png",
      "/images/ghost-archive/POCONG/Gallery 3.png",
      "/images/ghost-archive/POCONG/Gallery 4.png"
    ],
    reports: [
      {
        id: "RPT-005",
        username: "satpam_makam",
        badge: "Petugas Malam",
        credibilityScore: 82,
        report:
          "Jam 01.40 terlihat objek putih melompat di antara dua nisan sisi utara, hilang saat lampu sorot diarahkan dari jarak kurang lebih lima meter."
      },
      {
        id: "RPT-006",
        username: "anak_kampung",
        credibilityScore: 68,
        report:
          "Dari balik pagar terdengar suara kain terseret, beberapa detik kemudian anjing sekitar menggonggong serempak tanpa sumber terlihat."
      }
    ]
  },
  {
    id: "GA-004",
    slug: "wewe-gombel",
    name: "Wewe Gombel",
    category: "Urban Legend",
    origin: "Sabuk permukiman dan kebun kosong pinggir kota",
    country: "Indonesia",
    province: "Jawa Tengah",
    city: "Salatiga",
    aliases: ["Nenek Gombel"],
    era: "Klasik",
    evidenceTags: ["Panggilan Suara", "Jejak", "Disorientasi"],
    sourceType: "Cerita Rakyat",
    dangerLevel: "Tinggi",
    summary:
      "Entitas perempuan tua dalam folklore Jawa yang dikaitkan dengan hilangnya anak pada jam rawan malam. Pola kejadian sering melibatkan ilusi suara familier yang mengarahkan korban menjauh dari area aman.",
    history: [
      "Narasi tradisional menempatkan Wewe Gombel sebagai figur peringatan sosial bagi anak yang berkeliaran tanpa pengawasan.",
      "Arsip komunitas menunjukkan laporan meningkat di zona peralihan antara perumahan padat dan kebun kosong.",
      "Sebagian kasus kontemporer menyebut korban mengaku dipanggil suara orang terdekat sebelum kehilangan arah."
    ],
    abilities: [
      "Meniru intonasi suara yang dikenali target untuk memancing respons spontan.",
      "Mengacaukan orientasi arah pada koridor gelap dengan minim penanda visual.",
      "Berpindah cepat melalui area vegetasi rapat tanpa jejak konsisten."
    ],
    weaknesses: [
      "Pengawasan aktif keluarga dan patroli lingkungan secara signifikan menekan peluang insiden.",
      "Area dengan pencahayaan perimeter stabil mengurangi efektivitas ilusi suara.",
      "Target yang didampingi orang dewasa relatif lebih sulit dipisahkan dari kelompok."
    ],
    dangerZones: [
      "Kebun kosong Sidorejo, Salatiga",
      "Bantaran sungai Kalitaman",
      "Gang belakang kompleks sekolah lama"
    ],
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
          "Seorang anak ditemukan di tepi kebun setelah 20 menit hilang; ia bersikeras mengikuti suara ibunya, padahal ibunya berada di rumah sepanjang waktu."
      },
      {
        id: "RPT-008",
        username: "ronda_sukamaju",
        credibilityScore: 77,
        report:
          "Jejak kaki kecil tercatat menuju semak sisi timur, lalu berhenti mendadak tanpa jejak balik pada radius pemeriksaan lima belas meter."
      }
    ]
  },
  {
    id: "GA-005",
    slug: "genderuwo",
    name: "Genderuwo",
    category: "Fenomena Supranatural",
    origin: "Hutan pinggir desa dan bangunan terbengkalai",
    country: "Indonesia",
    province: "Jawa Timur",
    city: "Malang",
    aliases: ["Gendruwo", "Penunggu Rimbun"],
    era: "Kuno",
    evidenceTags: ["Siluet", "Hentakan Berat", "Gangguan Fisik"],
    sourceType: "Tradisi Lisan",
    dangerLevel: "Tinggi",
    summary:
      "Entitas bertubuh besar dengan tekanan fisik kuat yang dikaitkan dengan gangguan berat di area tertutup dan minim aktivitas manusia. Kemunculan sering diawali bunyi langkah berat dan perubahan atmosfer mendadak.",
    history: [
      "Dalam tradisi lisan Jawa, Genderuwo diposisikan sebagai penghuni lama zona rimbun dan lembap yang jarang dilalui manusia.",
      "Dokumen investigasi lokal mencatat korelasi antara kemunculan dengan bangunan kosong yang memiliki sirkulasi udara buruk.",
      "Kasus modern menunjukkan pola hilang waktu singkat setelah korban melakukan kontak visual langsung."
    ],
    abilities: [
      "Menghasilkan tekanan fisik yang mampu memindahkan objek ringan di sekitar target.",
      "Menciptakan sensasi diawasi intens untuk melemahkan fokus dan keputusan korban.",
      "Mengganggu persepsi arah pada ruang tertutup dengan sedikit titik referensi."
    ],
    weaknesses: [
      "Gangguan berkurang pada ruang terbuka terang dengan visibilitas tinggi.",
      "Komunikasi tim yang disiplin menekan dampak disorientasi dan panik.",
      "Menghindari area inti kemunculan tetap menjadi mitigasi paling aman."
    ],
    dangerZones: [
      "Gudang pabrik lama Singosari",
      "Hutan bambu pinggir Tumpang",
      "Bangunan kosong koridor Dau"
    ],
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
          "Tiga hentakan berat terdengar dari lantai dua gudang kosong, lalu pintu besi sisi barat menutup sendiri ketika tim berada di lantai dasar."
      },
      {
        id: "RPT-010",
        username: "fotografer_lokal",
        credibilityScore: 75,
        report:
          "Siluet besar muncul di belakang pilar pada frame RAW, namun hilang total ketika area yang sama diperiksa ulang dengan sorot lampu langsung."
      }
    ]
  }
];
