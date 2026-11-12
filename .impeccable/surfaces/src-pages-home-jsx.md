---
version: 1
slug: "src-pages-home-jsx"
primary_target: "src/pages/Home.jsx"
related_targets: ["src/pages/Cari.jsx","src/pages/Profil.jsx","src/pages/Dashboards.jsx"]
---

# TukangTikung redesign — beranda, cari, profil, dashboard pelanggan

Scope: beranda (Persuade), cari / profil / dashboard pelanggan (Operate). Delivered first as a Design canvas, then ported to the React demo.
Audience: pemilik rumah kelas menengah, sering dari HP. Action: cari tukang atau ajukan borongan. Proof: verifikasi dokumen + escrow per termin (semua angka data contoh).

## Direction contract
THESIS: Standar kategori marketplace jasa, dikerjakan setingkat Thumbtack/Airbnb/Gojek: pencarian dulu, kepercayaan terlihat, uang terlihat. Menolak hiasan tematik (konstruksi, garis hazard, kertas grid) yang dipakai versi lama.
OWN-WORLD: Latar putih dan abu dingin, tinta #17191C, satu aksen oranye merek (#F26A1B dekor, #C2410C untuk tombol/teks), hijau #1A7F4B khusus status terverifikasi/cair. Figtree 400–800, angka tabular. Radius 12–16, bayangan lembut ber-offset, garis 1px #E6E8EB.
STORY: Pengunjung paham "tukang terverifikasi, harga di depan, uang ditahan sampai beres", lalu langsung mencari.
FIRST VIEWPORT: Judul besar kiri-atas, kotak pencarian lebar (pekerjaan + lokasi + tombol Cari) sebagai aksi utama, chip pekerjaan populer di bawahnya; di kanan panel status termin nyata (contoh) sebagai bukti mekanisme escrow.
FORM: canon (standing exit dipilih pengguna); seed: 6cc593b530b08b61. Signature interaction: menyetujui termin dari laporan progres (dashboard) dan toggle harian/borongan di pencarian.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
