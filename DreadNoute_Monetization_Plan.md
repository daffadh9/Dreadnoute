# 📄 Dokumen Arsitektur Monetisasi: DreadNoute Ecosystem

Dokumen ini merancang strategi monetisasi yang komprehensif untuk proyek **DreadNoute**, dengan fokus pada keberlanjutan ekosistem melalui dua kanal utama: **Kesejahteraan Kreator** (Retensi Konten) dan **Keberlanjutan Platform** (Operasional & Profit).

---

## 🧛 Bagian 1: Model Monetisasi Kreator (Creator Revenue)
*Fokus: Memberikan alasan kuat bagi kreator untuk berpindah dari platform mainstream ke DreadNoute.*

### 1. The Bloodline Subscription (Ghost Pass)
Sistem langganan bulanan di mana penggemar membayar untuk akses konten eksklusif, di balik layar (*behind the scenes*), atau kompilasi video tanpa sensor. 
- **Revenue Split:** Kreator mendapatkan porsi terbesar (misal: 80/20 split).

### 2. Digital Ritual Gifting (Sesajen)
Fitur *tipping* interaktif saat *live stream* atau di kolom komentar. Hadiah berupa item tematik yang dapat diuangkan.
- **Item Tematik:** Kemenyan Digital, Lilin Merah, Darah Virtual.

### 3. Bounty & Quest Missions (Sayembara)
Komunitas dapat memberikan tantangan spesifik kepada kreator (misal: "Eksplorasi Bunker X jam 3 pagi").
- **Mekanisme:** Dana dikumpulkan melalui *crowdfunding* dan dicairkan setelah misi divalidasi oleh Agent DreadNoute.

### 4. Artifact Marketplace (Digital Collectibles)
Kreator dapat menjual "barang bukti" digital sebagai item koleksi unik di fitur **The Collector**.
- **Item:** Foto resolusi tinggi, rekaman EVP asli, atau potongan video eksklusif.

### 5. Licensed Ghost Consultation
Investigator senior atau ahli mistis dapat membuka jasa konsultasi privat melalui chat/video call untuk membantu pengguna menganalisis gangguan di lokasi mereka.

### 6. Pay-Per-View (PPV) Special Events
Tiket digital untuk acara spesial yang sangat langka, seperti *Live Ghost Hunting* di lokasi sakral yang hanya dibuka setahun sekali.

### 7. Featured Story Commissions
Penulis horor (Novel/Cerpen) dapat menerima pesanan cerita kustom di mana pengguna menjadi karakter utama dalam narasi tersebut.

---

## 🏛️ Bagian 2: Model Monetisasi Platform (Platform Revenue)
*Fokus: Menutupi biaya infrastruktur (Storage/AI) dan mendukung skalabilitas bisnis.*

### 1. The DreadCoin Spread (In-App Currency)
Keuntungan didapat dari selisih kurs saat pengguna membeli DreadCoin (top-up) dan saat kreator melakukan penarikan (*withdraw*) ke Rupiah.

### 2. Agentic Premium (AI-as-a-Service)
Peningkatan kapabilitas Agent DreadNoute untuk pengguna berbayar.
- **Fitur Premium:** Vision AI untuk analisis foto, Audio Analysis untuk EVP, dan proteksi pendampingan 24/7.

### 3. Platform Commission (Service Fee)
Potongan tetap (10% - 30%) dari setiap transaksi yang terjadi di Marketplace, Bounty, dan Subscription.

### 4. Immersive Audio Licensing
Penyediaan *library* musik ambient premium hasil kerja sama dengan produser audio horor yang dapat disewa oleh kreator konten.

### 5. Themed Native Advertising
Iklan yang menyatu dengan estetika aplikasi. Sponsor masuk ke dalam konten (misal: Brand otomotif mensponsori rute di *Itinerary Map* sebagai "Official Adventure Partner").

### 6. Physical Merchandise Fulfillment
DreadNoute bertindak sebagai produsen atau *dropshipper* merchandise resmi (kaos, jaket, alat investigasi) yang terintegrasi dengan akun kreator.

### 7. Ghost Tourism Partnership
Komisi dari setiap tiket fisik lokasi wisata horor (gedung tua, museum) yang terjual melalui fitur *Itinerary Map*.

### 8. Big Data & Trend Insights
Penjualan data agregat anonim mengenai tren horor dan lokasi populer kepada rumah produksi film untuk riset pasar.

---

## 📊 Tabel Ringkasan Strategi

| Model | Target | Sifat Pemasukan | Prioritas Launch |
| :--- | :--- | :--- | :--- |
| **Ghost Pass** | Kreator & Fans | Recurring (Bulanan) | Tinggi (Core) |
| **DreadCoins** | Seluruh User | Transactional | Tinggi (Infrastructure) |
| **Bounty Missions** | Hardcore Fans | Event-based | Sedang (Viral Potential) |
| **Agent Premium** | Power Users | SaaS / Subscription | Sedang (Value Added) |

---

## 🪙 Ekosistem Ekonomi: DreadCoin (In-App Currency)

Menggunakan mata uang internal memberikan kontrol penuh atas perputaran uang dan meminimalkan ketergantungan langsung pada API *payment gateway* di setiap fitur.

### 🌀 Alur Logika (User Flow) Transaksi

#### 1. The Offering (Top-Up Flow)
*User menukar Rupiah menjadi DreadCoin.*
- **Trigger:** User klik ikon "Vault" atau "Altar".
- **Process:** Pemilihan paket (misal: 100 Coins = Rp15.000) via Midtrans/Xendit.
- **Validation:** Notifikasi Agent: *"Tumbal diterima. Kekuatanmu di DreadNoute kini bertambah."*

#### 2. The Transaction (Consumption Flow)
*User menggunakan koin untuk konten atau aksi.*
- **Logic:** `if user_balance >= cost`:
    - Potong saldo User.
    - Split: 80% ke Kreator, 20% ke Kas DreadNoute.
    - Agent mencatat transaksi di *ledger*.
- **Feedback:** Visual efek tematik (misal: asap kemenyan) muncul di layar user.

#### 3. The Harvest (Withdrawal Flow)
*Kreator mencairkan koin menjadi Rupiah.*
- **Threshold:** Minimal saldo tertentu (misal: 500 Coins).
- **Verification:** Audit otomatis oleh Agent untuk memastikan transaksi sah (anti-fraud).

---

## 🗄️ Arsitektur Database (Supabase / PostgreSQL)

Struktur tabel inti yang diperlukan untuk mendukung ekosistem ini:

| Table | Columns | Deskripsi |
| :--- | :--- | :--- |
| **profiles** | `id, username, balance_coins` | Menyimpan saldo terkini setiap user. |
| **transactions** | `id, from_id, to_id, amount, type` | Log setiap perpindahan koin (Tips, Buy, etc). |
| **payouts** | `id, creator_id, amount_rp, status` | Record permintaan tarik tunai kreator. |

---

## 🕵️ Peran Agent DreadNoute sebagai "The Broker"

Agent tidak hanya sebagai asisten, tapi juga sebagai entitas pengelola ekonomi:
1. **Security:** Mendeteksi aktivitas mencurigakan. Jika ditemukan, Agent akan mengunci akun dan berbisik: *"Ada bau busuk di transaksimu. Saya perlu memeriksanya."*
2. **Gamification:** Memberikan diskon atau bonus koin jika user aktif dalam fitur interaktif seperti *Real or Fake*.

---

## 💡 Keuntungan Strategis (Platform Owner)
1. **Float Money:** Platform memegang uang tunai di depan saat user *top-up*, mendukung *cash flow* operasional.
2. **Psychological Pricing:** Pengguna lebih mudah mengeluarkan "10 Coins" dibandingkan "Rp1.500", yang berpotensi meningkatkan volume transaksi secara keseluruhan.

---
*Dokumen ini bersifat dinamis dan akan diperbarui seiring dengan perkembangan ekosistem DreadNoute.*
