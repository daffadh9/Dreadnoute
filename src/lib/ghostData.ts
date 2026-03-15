export type Rarity = "Common" | "Rare" | "Mythic" | "Legendary" | "Cursed";
export type GhostRole = "Aggressor" | "Watcher" | "Manipulator" | "Passive";

export interface GhostEntity {
  id: string;
  name: string;
  rarity: Rarity;
  role: GhostRole;
  price: { dc: number; obsidian: number };
  location: string;
  image: string;
  danger: number;
  lore: string;
  analysis: {
    aggression: number;
    intelligence: number;
    spectral_aura: number;
    discovery_date: string;
  };
  survival_guide: string[];
}

export const GHOST_ENTITIES: GhostEntity[] = [
  {
    id: "1",
    name: "Jerangkong",
    rarity: "Common",
    role: "Aggressor",
    price: { dc: 500, obsidian: 3 },
    location: "Jawa Tengah",
    image: "/assets/image/jerangkong.jpg",
    danger: 4,
    lore: "Jerangkong adalah hantu yang berwujud tulang belulang manusia yang gemar mencuri telur ayam. Konon, ia lahir dari roh pencuri yang dihukum untuk selamanya merasa lapar.",
    analysis: {
      spectral_aura: 45,
      aggression: 6,
      intelligence: 3,
      discovery_date: "12 Oct 1998"
    },
    survival_guide: [
      "Jangan menyimpan telur di area terbuka.",
      "Gunakan garam kasar di sekeliling pintu masuk.",
      "Mantra pengusir roh rendah biasanya efektif."
    ]
  },
  {
    id: "2",
    name: "Nenek Gayung",
    rarity: "Rare",
    role: "Watcher",
    price: { dc: 1500, obsidian: 10 },
    location: "Jakarta",
    image: "/assets/image/nenek-gayung.jpg",
    danger: 7,
    lore: "Seorang wanita tua misterius yang muncul di pinggir jalan pada malam hari membawa gayung dan tikar. Siapapun yang berbicara dengannya konon akan meninggal beberapa hari kemudian sebagai tumbal.",
    analysis: {
      spectral_aura: 88,
      aggression: 2,
      intelligence: 9,
      discovery_date: "04 Jan 2012"
    },
    survival_guide: [
      "Jangan pernah menjawab pertanyaannya.",
      "Hindari kontak mata langsung terlalu lama.",
      "Gunakan air suci jika ia mulai mendekat."
    ]
  },
  {
    id: "3",
    name: "Suster Ngesot",
    rarity: "Mythic",
    role: "Manipulator",
    price: { dc: 5000, obsidian: 50 },
    location: "Urban",
    image: "/assets/image/suster-ngesot.jpg",
    danger: 6,
    lore: "Roh seorang perawat yang tewas secara tragis di sebuah rumah sakit tua. Ia merangkak di lantai karena kakinya yang lumpuh, sering muncul di lorong-lorong gelap rumah sakit.",
    analysis: {
      spectral_aura: 72,
      aggression: 5,
      intelligence: 6,
      discovery_date: "21 Mar 2005"
    },
    survival_guide: [
      "Jangan berlari di dekatnya, ia bereaksi terhadap getaran lantai.",
      "Matikan semua sumber cahaya jika mendengar suara seretan.",
      "Gunakan perlindungan spiritual tingkat menengah."
    ]
  },
  {
    id: "4",
    name: "Nyi Roro Kidul",
    rarity: "Legendary",
    role: "Watcher",
    price: { dc: 15000, obsidian: 200 },
    location: "Pantai Selatan",
    image: "/assets/image/nyi-roro-kidul.jpg",
    danger: 10,
    lore: "Ratu Laut Selatan yang legendaris. Ia menguasai samudera dan memiliki kerangka pasukan gaib yang sangat besar. Mengenakan warna hijau di wilayahnya dianggap sebagai undangan untuk ditarik ke kerajaannya.",
    analysis: {
      spectral_aura: 100,
      aggression: 1,
      intelligence: 10,
      discovery_date: "Ancient"
    },
    survival_guide: [
      "Dilarang keras memakai pakaian berwarna hijau di pantai selatan.",
      "Mintalah izin secara batin sebelum memasuki wilayah airnya.",
      "Hormati adat istiadat setempat dengan sangat ketat."
    ]
  }
];
