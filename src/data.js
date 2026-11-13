// Semua data di file ini adalah DATA CONTOH untuk demo. Nama, angka, ulasan, dan dokumen fiktif.
// Dibangkitkan secara deterministik (seed tetap) supaya tampilan konsisten di setiap muat ulang.

export const CATEGORIES = [
  { id: 'bangunan', name: 'Tukang bangunan', short: 'Bangunan', icon: 'BrickWall', desc: 'Plester, pasang bata, keramik, cor dak, perbaikan retak.', price: 'Rp 150–200 rb / hari', unit: 'hari', base: 150 },
  { id: 'kayu', name: 'Tukang kayu', short: 'Kayu', icon: 'Axe', desc: 'Kusen, pintu, kitchen set, rak, plafon gypsum & kayu.', price: 'Rp 175–250 rb / hari', unit: 'hari', base: 180 },
  { id: 'listrik', name: 'Tukang listrik', short: 'Listrik', icon: 'Zap', desc: 'Instalasi baru, tambah titik lampu, MCB, korsleting.', price: 'Rp 75–150 rb / titik', unit: 'titik', base: 85 },
  { id: 'ledeng', name: 'Tukang ledeng', short: 'Ledeng', icon: 'Droplets', desc: 'Pipa bocor, toren, pompa air, kloset, saluran mampet.', price: 'Rp 150–250 rb / kunjungan', unit: 'kunjungan', base: 155 },
  { id: 'cat', name: 'Tukang cat', short: 'Cat', icon: 'PaintRoller', desc: 'Cat dinding dalam & luar, plamir, waterproofing.', price: 'Rp 25–45 rb / m²', unit: 'm²', base: 27 },
  { id: 'las', name: 'Tukang las', short: 'Las', icon: 'Flame', desc: 'Pagar, kanopi, teralis, tangga besi, railing.', price: 'Rp 350–650 rb / m²', unit: 'm²', base: 380 },
  { id: 'atap', name: 'Atap & baja ringan', short: 'Atap', icon: 'House', desc: 'Rangka baja ringan, genteng bocor, talang, lisplang.', price: 'Rp 120–180 rb / m²', unit: 'm²', base: 125 },
  { id: 'renovasi', name: 'Renovasi borongan', short: 'Renovasi', icon: 'Ruler', desc: 'Dapur, kamar mandi, tambah kamar. Survei, RAB, termin.', price: 'Rp 2,5–4,5 jt / m²', unit: 'm²', base: 2800, borongan: true },
]

export const CITY_AREAS = {
  Bandung: ['Antapani', 'Arcamanik', 'Buahbatu', 'Cicaheum', 'Cikutra', 'Dago', 'Setiabudi', 'Sukajadi', 'Ujungberung', 'Kopo', 'Gedebage', 'Lengkong'],
  Cimahi: ['Cimahi Utara', 'Cimahi Tengah', 'Cimahi Selatan', 'Leuwigajah', 'Cibabat'],
  Jakarta: ['Tebet', 'Cempaka Putih', 'Kebayoran', 'Cipete', 'Kelapa Gading', 'Duren Sawit'],
  Bogor: ['Bogor Barat', 'Tanah Sareal', 'Sentul', 'Cibinong'],
  Depok: ['Margonda', 'Cinere', 'Sawangan', 'Cimanggis'],
  Tangerang: ['BSD', 'Ciledug', 'Karawaci', 'Bintaro'],
  Bekasi: ['Bekasi Barat', 'Jatiasih', 'Harapan Indah', 'Tambun'],
  Semarang: ['Banyumanik', 'Tembalang', 'Ngaliyan', 'Candisari'],
  Yogyakarta: ['Condongcatur', 'Kotagede', 'Sleman', 'Bantul'],
  Surabaya: ['Rungkut', 'Wiyung', 'Gubeng', 'Kenjeran'],
  Malang: ['Lowokwaru', 'Sukun', 'Blimbing'],
  Denpasar: ['Renon', 'Sanur', 'Denpasar Utara'],
}
export const CITIES = Object.keys(CITY_AREAS)

const MITRA_SEED = [
  ['CV Karya Tikung Nusantara', 'Bandung', 'KT', '43301', 2017],
  ['Mandor Ujang & Tim', 'Cimahi', 'MU', '43211', 2014],
  ['PT Rumah Kokoh Sejahtera', 'Jakarta', 'RK', '41011', 2012],
  ['CV Baja Ringan Mandiri', 'Bekasi', 'BR', '43909', 2019],
  ['CV Griya Rapi Parahyangan', 'Bandung', 'GR', '43302', 2016],
  ['Tim Pak Sarip Renovasi', 'Bandung', 'SR', '43301', 2018],
  ['CV Sinar Bangun Pasundan', 'Bogor', 'SB', '41012', 2015],
  ['PT Hunian Prima Depok', 'Depok', 'HP', '41011', 2013],
  ['CV Tata Ruang Semarang', 'Semarang', 'TR', '43302', 2017],
  ['Mandor Slamet & Rekan', 'Yogyakarta', 'MS', '43211', 2011],
  ['CV Arek Bangun Jaya', 'Surabaya', 'AB', '41011', 2016],
  ['CV Dewata Karya Bali', 'Denpasar', 'DK', '43301', 2018],
]

function rng(seed) { let s = seed; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 } }
const rand = rng(1311)
const pick = (arr, r = rand) => arr[Math.floor(r() * arr.length)]
const between = (a, b, r = rand) => a + Math.floor(r() * (b - a + 1))

export const MITRA = MITRA_SEED.map(([name, city, initials, kbli, since], i) => ({
  id: `m${i + 1}`, name, city, initials, kbli, since,
  projects: between(40, 240), rating: Math.round((4.5 + rand() * 0.45) * 10) / 10,
  team: between(6, 34), deposit: pick([5, 5, 10, 15]) * 1_000_000,
  areas: CITY_AREAS[city].slice(0, 3),
}))

const FIRST = ['Asep', 'Ujang', 'Dedi', 'Cecep', 'Yayan', 'Iwan', 'Agus', 'Budi', 'Slamet', 'Rahmat', 'Joko', 'Wawan', 'Hendra', 'Dadang', 'Ade', 'Sutrisno', 'Eko', 'Nana', 'Endang', 'Rudi', 'Komang', 'Made', 'Toto', 'Herman', 'Imam', 'Dodi', 'Sapri', 'Udin', 'Engkos', 'Jajang', 'Tatang', 'Ridwan', 'Suherman', 'Wahyu', 'Bambang', 'Teguh', 'Sugeng', 'Mamat', 'Usep', 'Aris', 'Fajar', 'Gilang', 'Irfan', 'Yusuf', 'Ketut', 'Wayan', 'Andri', 'Darto', 'Sarip', 'Ojak']
const LAST = ['Suryana', 'Kurnia', 'Permana', 'Hidayat', 'Saputra', 'Wijaya', 'Rusmana', 'Taufik', 'Sukarna', 'Nugraha', 'Setiawan', 'Gunawan', 'Firmansyah', 'Ramdani', 'Supriatna', 'Mulyana', 'Kusnadi', 'Santoso', 'Prasetyo', 'Wibowo', 'Haryanto', 'Sudrajat', 'Maulana', 'Kartiwa', 'Pratama']
const SKILLS = {
  bangunan: ['Pasang keramik', 'Plester aci', 'Cor dak', 'Perbaikan retak', 'Pasang bata ringan', 'Bongkar pasang lantai', 'Tembok pagar'],
  kayu: ['Kitchen set', 'Kusen & pintu', 'Plafon gypsum', 'Rak dinding', 'Lantai parket', 'Lemari tanam', 'Kanopi kayu'],
  listrik: ['Instalasi rumah', 'Tambah titik lampu', 'Panel MCB', 'Cari korsleting', 'Pasang CCTV', 'Naik daya PLN', 'Stop kontak'],
  ledeng: ['Pipa bocor', 'Pasang toren', 'Pompa air', 'Kloset & wastafel', 'Saluran mampet', 'Water heater', 'Instalasi air panas'],
  cat: ['Cat interior', 'Cat eksterior', 'Waterproofing', 'Plamir', 'Cat tekstur', 'Cat pagar & kusen', 'Pelapis anti jamur'],
  las: ['Kanopi', 'Pagar besi', 'Teralis', 'Tangga besi', 'Railing', 'Pintu besi', 'Rak besi'],
  atap: ['Rangka baja ringan', 'Genteng bocor', 'Talang', 'Lisplang', 'Atap spandek', 'Skylight', 'Atap polikarbonat'],
  renovasi: ['Renovasi dapur', 'Kamar mandi', 'Tambah kamar', 'Fasad rumah', 'Ruko', 'Tambah lantai 2', 'Interior kantor'],
}
const PORTFOLIO = {
  bangunan: ['Keramik teras 60x60', 'Dinding kamar diplester ulang', 'Cor dak carport', 'Tembok pagar depan', 'Lantai dapur diganti', 'Perbaikan retak rambut'],
  kayu: ['Kitchen set HPL', 'Kusen jati pintu utama', 'Plafon gypsum ruang tamu', 'Rak buku tanam', 'Lemari kamar tidur', 'Lantai parket kamar'],
  listrik: ['Panel MCB baru', 'Titik lampu teras', 'Instalasi dapur', 'Stop kontak ruang kerja', 'Kabel ditata ulang', 'CCTV 4 kamera'],
  ledeng: ['Toren 1.000 L di dak', 'Wastafel dan pipa baru', 'Pompa air pendorong', 'Kloset duduk', 'Saluran dapur lancar', 'Water heater kamar mandi'],
  cat: ['Cat ruang tamu', 'Fasad rumah dua lantai', 'Waterproofing dak', 'Cat kamar anak', 'Cat pagar dan kusen', 'Tekstur dinding kafe'],
  las: ['Kanopi carport', 'Pagar minimalis', 'Teralis jendela', 'Tangga putar', 'Railing balkon', 'Pintu garasi besi'],
  atap: ['Rangka baja ringan 72 m²', 'Genteng bocor diganti', 'Talang baru', 'Lisplang GRC', 'Atap spandek gudang', 'Skylight dapur'],
  renovasi: ['Dapur 3x4 m', 'Kamar mandi utama', 'Tambah kamar lantai 2', 'Fasad ruko', 'Ruang kerja rumahan', 'Teras dan carport'],
}
const ABOUT = [
  'Biasa kerja rapi dan bersih-bersih setelah selesai. Bawa alat sendiri.',
  'Belasan tahun di proyek perumahan, sekarang fokus order rumahan.',
  'Spesialis perbaikan cepat. Datang tepat waktu, kabar jelas kalau ada kendala.',
  'Kerja bareng adik dan keponakan, bisa ambil borongan kecil sampai menengah.',
  'Pernah ikut pelatihan BNSP. Teliti soal ukuran dan kerapian sambungan.',
  'Selalu jelaskan biaya sebelum mulai, foto progres dikirim setiap hari.',
  'Terbiasa kerja di rumah yang tetap ditinggali, jadi menjaga kebersihan dan suara.',
  'Pengalaman di kontraktor besar, sekarang mandiri dengan dua orang kenek.',
]
const ALAT = ['Bawa alat sendiri', 'Punya motor bak', 'Bisa sediakan material', 'Ada kenek', 'Kerja hari Minggu', 'Bisa nota/kuitansi']

// Ciri visual avatar ilustrasi (bukan foto orang sungguhan)
const SKIN = ['#8D5524', '#A0673E', '#C68642', '#B97A57', '#9C6B4B', '#7A4A2A']
const SHIRT = ['#1D4E89', '#2F6B4F', '#7A3E2B', '#3F454D', '#5B4B8A', '#1F6F78', '#8A5A12', '#17191C']
const HAT = ['none', 'none', 'cap', 'helmet', 'helmet', 'none']
const BG = ['#FFE0CC', '#DCE8F5', '#E2F1E8', '#F2E6D8', '#E9E3F5', '#FBE7EE', '#E6EEF0', '#F5EFD8']

const tipeFor = (c, r) => (c.borongan ? 'Borongan' : r < 0.5 ? 'Harian & Borongan' : 'Harian')

export const TUKANG = Array.from({ length: 120 }, (_, i) => {
  const cat = CATEGORIES[i % CATEGORIES.length]
  const city = i < 40 ? (i % 4 === 0 ? 'Cimahi' : 'Bandung') : pick(CITIES)
  const area = pick(CITY_AREAS[city])
  const exp = between(3, 26)
  const rating = Math.round((4.3 + rand() * 0.7) * 10) / 10
  const reviews = between(4, 140)
  const mitra = rand() < 0.35 ? (MITRA.filter((m) => m.city === city)[0] || pick(MITRA)) : null
  const lo = Math.round(cat.base * (0.95 + rand() * 0.25) / 5) * 5
  const hi = Math.round(lo * (1.2 + rand() * 0.2) / 5) * 5
  const skills = [...SKILLS[cat.id]].sort(() => rand() - 0.5).slice(0, 4)
  const day = between(13, 40)
  const first = FIRST[(i * 7) % FIRST.length]
  const last = LAST[(i * 11 + 3) % LAST.length]
  const skk = rand() < 0.3
  const portfolio = [...PORTFOLIO[cat.id]].sort(() => rand() - 0.5).slice(0, between(4, 6))
  return {
    id: `t${i + 1}`,
    name: `${first} ${last[0]}.`,
    fullName: `${first} ${last}`,
    category: cat.id, city, area, exp, rating, reviews, mitra, lo, hi, unit: cat.unit, skills,
    tipe: tipeFor(cat, rand()),
    ready: day > 30 ? `${day - 30} Des` : `${day} Nov`,
    readySoon: day <= 15,
    skk, jobs: between(15, 340), age: between(24, 58),
    about: pick(ABOUT),
    extras: [...ALAT].sort(() => rand() - 0.5).slice(0, 3),
    distance: Math.round((0.8 + rand() * 14) * 10) / 10,
    response: pick(['< 30 menit', '< 1 jam', '< 1 jam', '< 3 jam']),
    repeat: between(18, 64),
    portfolio,
    look: { skin: pick(SKIN), shirt: pick(SHIRT), hat: pick(HAT), bg: pick(BG), mustache: rand() < 0.4, glasses: rand() < 0.15, hair: pick(['short', 'short', 'side', 'bald']) },
  }
})

export const formatPrice = (t) => {
  const f = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace('.', ',')} jt` : `${n} rb`)
  return `Rp ${f(t.lo)}–${f(t.hi)} / ${t.unit}`
}
export const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')

// ---------- Ulasan: dibangkitkan per tukang dari templat ----------
const CUSTOMERS = ['Bu Rina', 'Pak Gilang', 'Teh Nisa', 'Pak Haris', 'Bu Dewi', 'Pak Andri', 'Bu Sri', 'Pak Yudi', 'Teh Mira', 'Pak Bayu', 'Bu Lilis', 'Pak Agung', 'Bu Wulan', 'Kang Rizal', 'Bu Tuti', 'Pak Hendro', 'Teh Euis', 'Bu Ani', 'Pak Dimas', 'Bu Ratna', 'Pak Fikri', 'Bu Yanti', 'Kang Opik', 'Bu Mega']
const REVIEW_TPL = [
  [5, 'Datang sesuai jadwal, kerjanya rapi, puing dibawa sekalian.'],
  [5, 'Foto progres dikirim tiap sore, jadi saya tenang walau kerja di kantor.'],
  [5, 'Harga sesuai yang disepakati, tidak ada biaya tambahan diam-diam.'],
  [4, 'Hasil bagus, sempat mundur sehari karena hujan tapi dikabari dari pagi.'],
  [5, 'Menjelaskan masalahnya dengan bahasa yang gampang dimengerti.'],
  [4, 'Komunikatif. Ada satu bagian kurang rapi, langsung diperbaiki saat klaim garansi.'],
  [5, 'Sopan, menjaga kebersihan rumah, sepatu dilepas tanpa diminta.'],
  [5, 'Cepat ketemu sumber masalahnya. Akan pakai lagi.'],
  [4, 'Kerja cekatan. Datang agak telat 20 menit, tapi kabar lewat chat.'],
  [5, 'Tambahan material diajukan dulu di aplikasi lengkap dengan fotonya.'],
  [5, 'Rapi sekali, tetangga sampai minta nomornya (lewat aplikasi tentunya).'],
  [3, 'Hasil oke, tapi perlu diingatkan untuk membereskan sisa material.'],
  [5, 'Saran materialnya pas dan hemat, tidak memaksa beli yang mahal.'],
  [4, 'Pekerjaan beres dalam sehari, sesuai estimasi.'],
]
export function reviewsFor(t, n = 8) {
  const r = rng(parseInt(t.id.slice(1), 10) * 97 + 7)
  const months = ['Nov 2026', 'Okt 2026', 'Sep 2026', 'Agu 2026', 'Jul 2026', 'Jun 2026', 'Mei 2026', 'Apr 2026']
  return Array.from({ length: Math.min(n, t.reviews) }, (_, k) => {
    const [rating, text] = pick(REVIEW_TPL, r)
    const who = pick(CUSTOMERS, r)
    return { who: `${who}, ${pick(CITY_AREAS[t.city], r)}`, ini: who.split(' ').slice(-1)[0].slice(0, 2).toUpperCase(), rating, text, when: months[k % months.length], job: pick(t.skills, r) }
  })
}
export const REVIEWS = reviewsFor(TUKANG[0], 5)

export function ratingBars(t) {
  const r = rng(parseInt(t.id.slice(1), 10) * 13)
  const b = (x) => Math.min(5, Math.round((t.rating - 0.15 + r() * 0.3) * 10) / 10)
  return [['Tepat waktu', b()], ['Kerapian', b()], ['Komunikasi', b()], ['Sesuai harga', b()]].map(([label, v]) => ({ label, v, w: `${(v / 5) * 100}%` }))
}

// ---------- Proyek, order, RAB (dashboard) ----------
export const PROJECTS = [
  {
    id: 'P-2611-014', title: 'Renovasi dapur + kitchen set', address: 'Jl. Cikutra, Bandung', mitra: MITRA[0], status: 'Berjalan', progress: 55, total: 48_500_000, start: '3 Nov 2026', end: '15 Des 2026',
    termin: [
      { name: 'DP', pct: 30, status: 'cair', note: 'Cair 3 Nov saat kontrak disetujui' },
      { name: 'Progres 50%', pct: 40, status: 'review', note: 'Laporan progres masuk 11 Nov, menunggu persetujuan Anda' },
      { name: 'Serah terima', pct: 25, status: 'ditahan', note: 'Ditahan sampai pekerjaan Anda terima' },
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
      { date: '11 Nov', text: 'Kabinet bawah terpasang, menunggu top granit.', by: 'Mandor Dadang', photos: ['kayu', 'kayu', 'bangunan'] },
      { date: '8 Nov', text: 'Keramik lantai selesai, nat dikeringkan 24 jam.', by: 'Mandor Dadang', photos: ['bangunan', 'bangunan'] },
      { date: '5 Nov', text: 'Instalasi pipa dan listrik baru di dinding dapur.', by: 'Mandor Dadang', photos: ['ledeng', 'listrik', 'listrik'] },
      { date: '3 Nov', text: 'Pembongkaran selesai, puing diangkut.', by: 'Mandor Dadang', photos: ['bangunan'] },
    ],
  },
  {
    id: 'P-2610-087', title: 'Kanopi baja ringan carport', address: 'Jl. Sukajadi, Bandung', mitra: MITRA[3], status: 'Garansi', progress: 100, total: 11_200_000, start: '12 Okt 2026', end: '18 Okt 2026',
    termin: [
      { name: 'DP', pct: 30, status: 'cair', note: 'Cair 12 Okt' },
      { name: 'Serah terima', pct: 65, status: 'cair', note: 'Cair 19 Okt' },
      { name: 'Retensi garansi', pct: 5, status: 'ditahan', note: 'Cair 16 Jan 2027' },
    ],
    rab: [], updates: [],
  },
]

const ORDER_TITLES = { bangunan: 'Perbaiki dinding retak', kayu: 'Pasang rak dapur', listrik: 'Tambah titik lampu teras', ledeng: 'Pipa wastafel bocor', cat: 'Cat ulang kamar anak', las: 'Perbaiki engsel pagar', atap: 'Genteng bocor di kamar', renovasi: 'Survei renovasi teras' }
export const DAILY_ORDERS = TUKANG.slice(1, 9).map((t, i) => ({
  id: `H-2611-${200 + i * 7}`, title: ORDER_TITLES[t.category], tukang: t.name, tukangId: t.id, cat: t.category,
  date: ['Kam, 13 Nov · 09.00', 'Sab, 8 Nov', 'Sel, 4 Nov', 'Jum, 31 Okt', 'Sen, 27 Okt', 'Rab, 22 Okt', 'Sab, 18 Okt', 'Sel, 14 Okt'][i],
  status: i === 0 ? 'Terjadwal' : i === 1 ? 'Selesai · beri ulasan' : 'Selesai',
  amount: [200_000, 330_000, 275_000, 450_000, 180_000, 620_000, 250_000, 390_000][i],
}))

export const RAB_OFFERS = [
  { mitra: MITRA[0], total: 86_400_000, days: 45, note: 'Material termasuk, kualitas setara merek menengah.', survey: 'Survei 9 Nov' },
  { mitra: MITRA[1], total: 79_900_000, days: 52, note: 'Keramik & sanitair disediakan pelanggan.', survey: 'Survei 10 Nov' },
  { mitra: MITRA[4], total: 94_000_000, days: 40, note: 'Termasuk gambar 3D dan garansi struktur 1 tahun.', survey: 'Survei 10 Nov' },
]

export const STATS = { tukang: TUKANG.length, mitra: MITRA.length, kota: CITIES.length, ulasan: TUKANG.reduce((s, t) => s + t.reviews, 0) }

// ---------- Foto realistis (AI, fiktif) untuk sebagian tukang; sisanya ilustrasi ----------
const IMG = (f) => `${import.meta.env.BASE_URL}img/${f}`
const topIn = (cat) => TUKANG.filter((t) => t.category === cat && (t.city === 'Bandung' || t.city === 'Cimahi')).sort((a, b) => b.rating - a.rating)[0]
;[['bangunan', 'p01.png'], ['listrik', 'p02.png'], ['kayu', 'p03.png']].forEach(([c, f]) => { const t = topIn(c); if (t) { t.photo = IMG(f); t.readySoon = true } })
const kayuTop = topIn('kayu')
if (kayuTop) { kayuTop.portfolio = ['Kitchen set HPL', ...kayuTop.portfolio.filter((p) => p !== 'Kitchen set HPL')].slice(0, 6) }
export const PORTFOLIO_PHOTOS = { 'Kitchen set HPL': IMG('w-kayu-1.png') }
export const HERO_PHOTO = IMG('w-kayu-1.png')
