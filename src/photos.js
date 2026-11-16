// Foto stok nyata (Pexels + Unsplash). Semua ID dicek lewat HTTP 200 + content-type image.
// Foto contoh, bukan pekerjaan pelanggan sungguhan.

export const pex = (id, w = 960, h = 720) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`

export const uns = (id, w = 960, h = 720) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

const face = (id, src = 'pex') => ({
  key: `${src}-${id}`,
  url: src === 'pex' ? pex(id, 720, 960) : uns(id, 720, 960),
  focus: 'center',
})
const workShot = (id, src = 'pex') => ({
  key: `${src}-${id}`,
  url: src === 'pex' ? pex(id, 720, 960) : uns(id, 720, 960),
  focus: 'top',
})
const scene = (id, src = 'pex') => (src === 'pex' ? pex(id, 1200, 900) : uns(id, 1200, 900))

// Potret pekerja sesuai bidang. Dipakai dulu untuk tukang dengan rating tertinggi di kategori itu.
const TRADES = {
  bangunan: [
    workShot(16552838), workShot(2219024), workShot(585419), workShot(2760243), workShot(3862379),
    face(3932291), face(13474238), workShot(16552854), workShot(4981775), workShot(4981800),
    workShot(8961700), workShot(29181494), workShot(33497138), workShot(5493672), workShot(6474308),
  ],
  kayu: [
    workShot(544966), workShot(3637786), workShot(16850255), workShot(32357249), workShot(28513058),
    workShot(6790086), workShot(6790093), workShot(6790096), workShot(6790945), workShot(5691516),
    workShot(4491881),
  ],
  listrik: [
    workShot(21812146), workShot(17842834), workShot(14319099), workShot(33694019), workShot(34054464),
    workShot(6474312), workShot('1621905251918-48416bd8575a', 'uns'),
  ],
  ledeng: [
    workShot(32588548), workShot(29226620), workShot(6419128), workShot(16509869),
  ],
  cat: [
    workShot(6474447), workShot(6474301), workShot(6474295), workShot(5691610), workShot(31608474),
    workShot(37556460), workShot(6474339),
  ],
  las: [
    workShot(2381463), workShot(4025501), workShot(15324242), workShot(35383408), workShot(37431094),
    workShot('1504328345606-18bbc8c9d7d1', 'uns'),
  ],
  atap: [
    workShot(37623622), workShot(11467876), workShot(28812507), workShot(37623620), workShot(6474338),
  ],
  renovasi: [
    workShot(15124970), workShot(5493662), workShot(8961554), workShot(1216589), workShot(6474472),
  ],
}

const PORTRAITS = [
  220453, 614810, 91227, 834863, 937481, 1043471, 1222271, 1300402, 1516680, 1681010,
  2379004, 2379005, 1680172, 1844547, 2182970, 775358, 846741, 1139743, 428364, 736716,
  1812634, 3785079, 3777943, 3778603, 3785077, 3777931, 3785104, 3777557, 3777946, 3760263,
  1043474, 1040880, 1043473, 1040881, 1121796, 1138903, 1181391, 1181695, 1183266, 1212984,
  1370750, 1484801, 1484810, 1656684, 1699159, 1704488, 1819483, 1870163, 1933873, 1954524,
  1964970, 1974927,
].map((id) => face(id))

const EXTRA_PORTRAITS = [
  '1500648767791-00dcc994a43e', '1507003211169-0a1dd7228f2d', '1506794778202-cad84cf45f1d',
  '1492562080023-ab3db95bfbce', '1463453091185-61582044d556',
  '1519085360753-af0119f7cbe7', '1539571696357-5a69c17a67c6',
  '1488161628813-04466f872be2', '1496345875659-11f7dd282d1d', '1521119989659-a83eee488004',
  '1480429370139-e0132c086e2a', '1501196354995-cbb51c65aaea', '1522075469751-3a6694fb2f61',
  '1552374196-c4e7ffc6e126', '1548372290-8d01b6c8e78c',
  '1568602471122-7832951cc4c5', '1570295999919-56ceb5ecca61', '1599566150163-29194dcaad36',
  '1566492031773-4f4e44671857', '1557862921-37829c790f19', '1547425260-76bcadfb4f2c',
  '1552058544-f2b08422138a', '1633332755192-727a05c4013d', '1560250097-0b93528c311a',
  '1531427186611-ecfd6d936c79', '1527980965255-d3b416303d12', '1548142813-c348350df52b',
  '1530268729831-4b0b9e170218', '1522529599102-193c0d76b5b6', '1607346256330-dee7af15f7c5',
  '1618077360395-f3068be8e001', '1600486913747-55e5470d6f40', '1581092795360-fd1ca04f0952',
  '1581092921461-eab62e97a780', '1504257432389-52343af06ae3', '1564564321837-a57b7070ac4f',
  '1615109398623-88346a601842', '1545167622-3a6ac756afa4', '1556157382-97eda2d62296',
  '1607990281513-2c110a25bd8c', '1531891437562-4301cf35b7e4', '1504593811423-6dd665756598',
  '1474176857210-7287d38d27c6', '1480455624313-e29b44bbfde1', '1531384441138-2736e62e0919',
  '1513956589380-bad6acb9b9d4',
].map((id) => face(id, 'uns'))

const WORK = {
  'Keramik teras 60x60': scene(29181494),
  'Dinding kamar diplester ulang': scene(6474340),
  'Cor dak carport': scene(8961065),
  'Tembok pagar depan': scene(8961700),
  'Lantai dapur diganti': scene(8293686),
  'Perbaikan retak rambut': scene(6474308),
  'Kitchen set HPL': scene(7303848),
  'Kusen jati pintu utama': scene(21812159),
  'Plafon gypsum ruang tamu': scene(6474295),
  'Rak buku tanam': scene(6790093),
  'Lemari kamar tidur': scene(6790104),
  'Lantai parket kamar': scene(1249610),
  'Panel MCB baru': scene(257736),
  'Titik lampu teras': scene(21812141),
  'Instalasi dapur': scene(17842834),
  'Stop kontak ruang kerja': scene(5691676),
  'Kabel ditata ulang': scene(5691500),
  'CCTV 4 kamera': scene(430208),
  'Toren 1.000 L di dak': scene(15158150),
  'Wastafel dan pipa baru': scene('1585704032915-c3400ca199e7', 'uns'),
  'Pompa air pendorong': scene(32588548),
  'Kloset duduk': scene('1552321554-5fefe8c9ef14', 'uns'),
  'Saluran dapur lancar': scene(29226620),
  'Water heater kamar mandi': scene(16509869),
  'Cat ruang tamu': scene(5691610),
  'Fasad rumah dua lantai': scene(31608474),
  'Waterproofing dak': scene(6474301),
  'Cat kamar anak': scene(6474450),
  'Cat pagar dan kusen': scene(6474496),
  'Tekstur dinding kafe': scene(6474488),
  'Kanopi carport': scene(35383408),
  'Pagar minimalis': scene(37431094),
  'Teralis jendela': scene(2381463),
  'Tangga putar': scene(4025501),
  'Railing balkon': scene(15324242),
  'Pintu garasi besi': scene(209251),
  'Rangka baja ringan 72 m²': scene(6474338),
  'Genteng bocor diganti': scene(11467876),
  'Talang baru': scene(37623622),
  'Lisplang GRC': scene(28812507),
  'Atap spandek gudang': scene(37623620),
  'Skylight dapur': scene(31352262),
  'Dapur 3x4 m': scene(36035073),
  'Kamar mandi utama': scene(40701258),
  'Tambah kamar lantai 2': scene(30924413),
  'Fasad ruko': scene('1570129477492-45c003edd2be', 'uns'),
  'Ruang kerja rumahan': scene('1486946255434-2466348c2166', 'uns'),
  'Teras dan carport': scene(8961555),
}

const FALLBACK = {
  bangunan: scene(5493663),
  kayu: scene(7480720),
  listrik: scene(257736),
  ledeng: scene(6419128),
  cat: scene(6474452),
  las: scene(4025501),
  atap: scene(11467876),
  renovasi: scene(15124970),
}

export const HERO_PHOTOS = {
  bangunan: scene(29181494),
  kayu: scene(7303848),
  ledeng: scene(6419128),
}

export const MITRA_PHOTOS = [
  scene(1216589), scene(8961555), scene(11467876), scene(28812507), scene(15124970), scene(1078884),
  scene(5493662), scene(6474486), scene(37623620), scene(35383408), scene(6790106), scene(8961065),
]

export const PROGRESS_PHOTOS = {
  kabinet: [scene(7303848), scene(15124969), scene(6790093)],
  keramik: [scene(29181494), scene(1249610)],
  pipa: [scene(6419128)],
  listrik: [scene(257736), scene(5691676)],
  bongkar: [scene(8961065)],
}

// Antrian verifikasi admin: orang/perusahaan fiktif, foto tidak dipakai ulang di daftar tukang.
export const ADMIN_PHOTOS = [
  uns('1507591064344-4c6ce005b128', 480, 480),
  scene(15158150),
  uns('1540569014015-19a7be504e3a', 480, 480),
  uns('1472099645785-5658abf4ff4e', 480, 480),
]

function take(arr, used) {
  for (let i = 0; i < arr.length; i++) {
    if (!used.has(arr[i].key)) {
      used.add(arr[i].key)
      return arr[i]
    }
  }
  return null
}

export function assignTukangPhotos(list) {
  const pools = Object.fromEntries(Object.entries(TRADES).map(([k, v]) => [k, v.slice()]))
  const overflow = [
    workShot(6474340), workShot(6474471), workShot(8961555), workShot(6790106),
    workShot(1249611), workShot(5493663), workShot(5691528),
    workShot('1589939705384-5185137a7f0f', 'uns'),
  ]
  const people = [...PORTRAITS, ...EXTRA_PORTRAITS]
  const used = new Set()
  const ranked = [...list].sort((a, b) => b.rating - a.rating || (a.id < b.id ? -1 : 1))
  for (const t of ranked) {
    const hit = take(pools[t.category] || [], used) || take(overflow, used) || take(people, used)
    if (!hit) throw new Error(`Kehabisan foto unik untuk ${t.id}`)
    t.photo = hit.url
    t.photoFocus = hit.focus
    t.portfolioPhotos = t.portfolio.map((title) => WORK[title] || FALLBACK[t.category])
  }
}
