# TukangTikung — Demo

Demo klikabel marketplace tukang (konsep NADI). Data contoh, tanpa backend.

## Jalankan lokal
npm install
npm run dev

## Deploy ke Vercel
npx vercel --prod      # framework: Vite, output: dist
`vercel.json` (root) berisi rewrite SPA supaya /cari, /tukang/:id, /app/:role bisa dibuka langsung.

## Struktur
- src/data.js            data contoh (kategori, tukang, mitra, proyek, RAB)
- src/pages/Home.jsx     beranda
- src/pages/Cari.jsx     daftar + filter tukang
- src/pages/Profil.jsx   profil tukang + modal pesan
- src/pages/Forms.jsx    ajukan proyek borongan, masuk demo, daftar tukang
- src/pages/Dashboards.jsx  dashboard pelanggan, mitra, tukang, admin
