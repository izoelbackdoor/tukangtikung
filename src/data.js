// Semua data di file ini adalah DATA CONTOH untuk demo. Nama, angka, dan dokumen fiktif.

export const CATEGORIES = [
  { id: 'bangunan', name: 'Tukang Bangunan', short: 'Bangunan', icon: 'BrickWall', desc: 'Plester, pasang bata, keramik, cor dak, perbaikan retak.', price: 'Rp 150–200 rb / hari', unit: 'hari' },
  { id: 'kayu', name: 'Tukang Kayu', short: 'Kayu', icon: 'Axe', desc: 'Kusen, pintu, kitchen set, rak, plafon gypsum & kayu.', price: 'Rp 175–250 rb / hari', unit: 'hari' },
  { id: 'listrik', name: 'Tukang Listrik', short: 'Listrik', icon: 'Zap', desc: 'Instalasi baru, tambah titik lampu, MCB, korsleting.', price: 'Rp 75–150 rb / titik', unit: 'titik' },
  { id: 'ledeng', name: 'Tukang Ledeng', short: 'Ledeng', icon: 'Droplets', desc: 'Pipa bocor, toren, pompa air, kloset, saluran mampet.', price: 'Rp 150–250 rb / kunjungan', unit: 'kunjungan' },
  { id: 'cat', name: 'Tukang Cat', short: 'Cat', icon: 'PaintRoller', desc: 'Cat dinding dalam & luar, plamir, waterproofing.', price: 'Rp 25–45 rb / m²', unit: 'm²' },
  { id: 'las', name: 'Tukang Las', short: 'Las', icon: 'Flame', desc: 'Pagar, kanopi, teralis, tangga besi, railing.', price: 'Rp 350–650 rb / m²', unit: 'm²' },
  { id: 'atap', name: 'Atap & Baja Ringan', short: 'Atap', icon: 'House', desc: 'Rangka baja ringan, genteng bocor, talang, lisplang.', price: 'Rp 120–180 rb / m²', unit: 'm²' },
  { id: 'renovasi', name: 'Renovasi Borongan', short: 'Renovasi', icon: 'Ruler', desc: 'Dapur, kamar mandi, tambah kamar. Survei, RAB, termin.', price: 'Rp 2,5–4,5 jt / m²', unit: 'm²', borongan: true },
]

export const CITIES = ['Bandung', 'Cimahi', 'Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi', 'Semarang', 'Yogyakarta', 'Surabaya', 'Malang', 'Denpasar']

export const MITRA = [
  { id: 'm1', name: 'CV Karya Tikung Nusantara', city: 'Bandung', projects: 142, rating: 4.8, team: 18, since: 2017, kbli: '43301', initials: 'KT' },
  { id: 'm2', name: 'Mandor Ujang & Tim', city: 'Cimahi', projects: 96, rating: 4.9, team: 9, since: 2014, kbli: '43211', initials: 'MU' },
  { id: 'm3', name: 'PT Rumah Kokoh Sejahtera', city: 'Jakarta', projects: 211, rating: 4.7, team: 32, since: 2012, kbli: '41011', initials: 'RK' },
  { id: 'm4', name: 'CV Baja Ringan Mandiri', city: 'Bekasi', projects: 78, rating: 4.6, team: 11, since: 2019, kbli: '43909', initials: 'BR' },
]

const FIRST = ['Asep', 'Ujang', 'Dedi', 'Cecep', 'Yayan', 'Iwan', 'Agus', 'Budi', 'Slamet', 'Rahmat', 'Joko', 'Wawan', 'Hendra', 'Dadang', 'Ade', 'Sutrisno', 'Eko', 'Nana', 'Endang', 'Rudi', 'Komang', 'Made', 'Toto', 'Herman', 'Imam', 'Dodi', 'Sapri', 'Udin']
const LAST = ['S.', 'K.', 'R.', 'H.', 'M.', 'P.', 'W.', 'N.', 'A.', 'T.']
const SKILLS = {
  bangunan: ['Pasang keramik', 'Plester aci', 'Cor dak', 'Perbaikan retak', 'Pasang bata ringan'],
  kayu: ['Kitchen set', 'Kusen & pintu', 'Plafon gypsum', 'Rak dinding', 'Lantai parket'],
  listrik: ['Instalasi rumah', 'Tambah titik lampu', 'Panel MCB', 'Cari korsleting', 'Pasang CCTV'],
  ledeng: ['Pipa bocor', 'Pasang toren', 'Pompa air', 'Kloset & wastafel', 'Saluran mampet'],
  cat: ['Cat interior', 'Cat eksterior', 'Waterproofing', 'Plamir', 'Cat tekstur'],
  las: ['Kanopi', 'Pagar besi', 'Teralis', 'Tangga besi', 'Railing'],
  atap: ['Rangka baja ringan', 'Genteng bocor', 'Talang', 'Lisplang', 'Atap spandek'],
  renovasi: ['Renovasi dapur', 'Kamar mandi', 'Tambah kamar', 'Fasad rumah', 'Ruko'],
}
const ABOUT = [
  'Biasa kerja rapi, bersih-bersih setelah selesai. Bawa alat sendiri.',
  'Sudah belasan tahun di proyek perumahan, sekarang ambil order rumahan.',
  'Spesialis perbaikan cepat. Datang tepat waktu, kabar jelas kalau ada kendala.',
  'Kerja bareng adik dan keponakan. Bisa ambil borongan kecil sampai menengah.',
  'Pernah ikut pelatihan BNSP. Teliti soal ukuran dan kerapian sambungan.',
]

function rng(seed) {
  let s = seed
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
}

const rand = rng(42)
const pick = (arr) => arr[Math.floor(rand() * arr.length)]
const catIds = CATEGORIES.map((c) => c.id)

export const TUKANG = Array.from({ length: 48 }, (_, i) => {
  const cat = catIds[i % catIds.length]
  const c = CATEGORIES.find((x) => x.id === cat)
  const city = i < 14 ? (i % 3 === 0 ? 'Cimahi' : 'Bandung') : pick(CITIES)
  const exp = 3 + Math.floor(rand() * 22)
  const rating = Math.round((4.4 + rand() * 0.6) * 10) / 10
  const reviews = 6 + Math.floor(rand() * 90)
  const mitra = rand() < 0.35 ? pick(MITRA) : null
  const base = { bangunan: 150, kayu: 180, listrik: 85, ledeng: 160, cat: 28, las: 380, atap: 130, renovasi: 2800 }[cat]
  const lo = Math.round(base * (0.95 + rand() * 0.2) / 5) * 5
  const hi = Math.round(lo * (1.2 + rand() * 0.2) / 5) * 5
  const skills = [...SKILLS[cat]].sort(() => rand() - 0.5).slice(0, 3)
  const tipe = c.borongan ? 'Borongan' : rand() < 0.55 ? 'Harian & Borongan' : 'Harian'
  const ready = 12 + Math.floor(rand() * 18)
  const skk = rand() < 0.3
  return {
    id: `t${i + 1}`,
    name: `${FIRST[i % FIRST.length]} ${pick(LAST)}`,
    category: cat,
    city,
    exp,
    rating,
    reviews,
    mitra,
    lo,
    hi,
    unit: c.unit,
    skills,
    tipe,
    ready: `${ready > 30 ? ready - 30 : ready} ${ready > 30 ? 'Des' : 'Nov'}`,
    skk,
    jobs: 20 + Math.floor(rand() * 300),
    age: 24 + Math.floor(rand() * 32),
    about: pick(ABOUT),
    distance: Math.round((1 + rand() * 14) * 10) / 10,
  }
})

export const formatPrice = (t) => {
  const f = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace('.', ',')} jt` : `${n} rb`)
  return `Rp ${f(t.lo)}–${f(t.hi)} / ${t.unit}`
}

export const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')

export const REVIEWS = [
  { who: 'Bu Rina, Antapani', rating: 5, text: 'Datang sesuai jadwal, kerjanya rapi, puing dibawa sekalian. Ada tambahan biaya tapi diajukan dulu di aplikasi.', when: 'Okt 2026' },
  { who: 'Pak Gilang, Cimahi', rating: 5, text: 'Foto progres tiap hari, jadi saya tenang walau kerja di luar kota.', when: 'Sep 2026' },
  { who: 'Teh Nisa, Buahbatu', rating: 4, text: 'Hasil bagus, sempat mundur sehari karena hujan tapi dikabari dari pagi.', when: 'Agu 2026' },
  { who: 'Pak Haris, Dago', rating: 5, text: 'Harga sesuai RAB, tidak ada biaya siluman. Akan pakai lagi untuk renovasi lantai dua.', when: 'Jul 2026' },
  { who: 'Bu Dewi, Setiabudi', rating: 4, text: 'Komunikatif. Ada satu sambungan yang kurang rapi, langsung diperbaiki saat klaim garansi.', when: 'Jun 2026' },
]

// Proyek borongan contoh (untuk dashboard)
export const PROJECTS = [
  {
    id: 'P-2611-014',
    title: 'Renovasi dapur + kitchen set',
    address: 'Jl. Cikutra, Bandung',
    mitra: MITRA[0],
    status: 'Berjalan',
    progress: 55,
    total: 48_500_000,
    start: '3 Nov 2026',
    end: '15 Des 2026',
    termin: [
      { name: 'DP', pct: 30, status: 'cair', note: 'Cair 3 Nov' },
      { name: 'Termin 2 · progres 50%', pct: 40, status: 'review', note: 'Laporan progres menunggu persetujuan Anda' },
      { name: 'Termin 3 · serah terima', pct: 25, status: 'ditahan', note: 'Setelah serah terima' },
      { name: 'Retensi garansi', pct: 5, status: 'ditahan', note: 'Cair 90 hari setelah serah terima' },
    ],
    rab: [
      { item: 'Bongkar keramik & meja lama', vol: '1 ls', price: 1_800_000 },
      { item: 'Pasang keramik lantai 60x60', vol: '14 m²', price: 4_900_000 },
      { item: 'Backsplash keramik subway', vol: '6 m²', price: 2_700_000 },
      { item: 'Kitchen set HPL atas-bawah', vol: '4,5 m', price: 22_500_000 },
      { item: 'Meja granit + sink', vol: '3 m', price: 7_200_000 },
      { item: 'Instalasi listrik & stop kontak', vol: '8 titik', price: 1_600_000 },
      { item: 'Instalasi air & pembuangan', vol: '1 ls', price: 2_300_000 },
      { item: 'Cat ulang dinding & plafon', vol: '42 m²', price: 1_500_000 },
      { item: 'Pembersihan & buang puing', vol: '1 ls', price: 4_000_000 },
    ],
    updates: [
      { date: '11 Nov', text: 'Kabinet bawah terpasang, menunggu top granit.', by: 'Mandor Dadang' },
      { date: '8 Nov', text: 'Keramik lantai selesai, nat dikering 24 jam.', by: 'Mandor Dadang' },
      { date: '5 Nov', text: 'Instalasi pipa dan listrik baru di dinding dapur.', by: 'Mandor Dadang' },
      { date: '3 Nov', text: 'Pembongkaran selesai, puing diangkut.', by: 'Mandor Dadang' },
    ],
  },
  {
    id: 'P-2610-087',
    title: 'Kanopi baja ringan carport',
    address: 'Jl. Sukajadi, Bandung',
    mitra: MITRA[3],
    status: 'Garansi',
    progress: 100,
    total: 11_200_000,
    start: '12 Okt 2026',
    end: '18 Okt 2026',
    termin: [
      { name: 'DP', pct: 30, status: 'cair', note: 'Cair 12 Okt' },
      { name: 'Serah terima', pct: 65, status: 'cair', note: 'Cair 19 Okt' },
      { name: 'Retensi garansi', pct: 5, status: 'ditahan', note: 'Cair 16 Jan 2027' },
    ],
    rab: [],
    updates: [],
  },
]

export const DAILY_ORDERS = [
  { id: 'H-2611-221', title: 'Pipa wastafel bocor', tukang: 'Rahmat P.', cat: 'ledeng', date: 'Kam, 13 Nov · 09.00', status: 'Terjadwal', amount: 200_000 },
  { id: 'H-2611-198', title: 'Tambah 3 titik lampu teras', tukang: 'Dedi R.', cat: 'listrik', date: 'Sab, 8 Nov', status: 'Selesai · ulasan', amount: 330_000 },
]

export const RAB_OFFERS = [
  { mitra: MITRA[0], total: 86_400_000, days: 45, note: 'Material termasuk, kualitas setara Roman/Toto.', survey: 'Survei 9 Nov' },
  { mitra: MITRA[1], total: 79_900_000, days: 52, note: 'Material pelanggan untuk keramik & sanitair.', survey: 'Survei 10 Nov' },
  { mitra: MITRA[2], total: 94_000_000, days: 40, note: 'Termasuk desain 3D dan garansi struktur 1 tahun.', survey: 'Survei 10 Nov' },
]
