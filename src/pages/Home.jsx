import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BadgeCheck, ShieldCheck, Wallet, Camera, FileSignature, Search, CalendarCheck, ClipboardList, Hammer, ArrowRight, Check, X, Star } from 'lucide-react'
import { CATEGORIES, CITIES, TUKANG, MITRA } from '../data'
import { Icon, TukangCard, Avatar, Stars, DataContoh, useSession } from '../components/ui'

export default function Home() {
  const nav = useNavigate()
  const { setRole } = useSession()
  const [cat, setCat] = useState('')
  const [city, setCity] = useState('')
  const [mode, setMode] = useState('harian')
  const featured = [TUKANG[0], TUKANG[9], TUKANG[2], TUKANG[13]]

  const search = (e) => {
    e.preventDefault()
    if (mode === 'borongan') return nav('/proyek/baru' + (city ? `?kota=${city}` : ''))
    const q = new URLSearchParams()
    if (cat) q.set('kategori', cat)
    if (city) q.set('kota', city)
    nav('/cari?' + q.toString())
  }
  const login = (r) => { setRole(r); nav(`/app/${r}`) }

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-paper opacity-40" />
        <div className="relative max-w-6xl mx-auto px-4 pt-14 pb-16 grid lg:grid-cols-[1.15fr_.85fr] gap-10 items-center">
          <div>
            <span className="chip bg-ink text-white"><Hammer size={12} /> Marketplace tukang terverifikasi</span>
            <h1 className="mt-4 text-5xl md:text-6xl font-extrabold leading-[1.02]">Tukang jelas orangnya. <span className="text-orange">Harga jelas</span> di depan.</h1>
            <p className="mt-5 text-lg text-ink-2 max-w-xl">Tukang bangunan, kayu, listrik, ledeng, cat, dan las yang dokumennya kami periksa. Servis cepat harian atau borongan dengan RAB, dan uang Anda ditahan di escrow sampai pekerjaan beres.</p>

            <form onSubmit={search} className="mt-7 card p-3 shadow-sm">
              <div className="flex gap-1 p-1 bg-paper-2 rounded-lg w-fit mb-3 text-sm font-semibold">
                <button type="button" onClick={() => setMode('harian')} className={`px-3 py-1.5 rounded-md ${mode === 'harian' ? 'bg-white shadow-sm' : 'text-muted'}`}>Panggil harian</button>
                <button type="button" onClick={() => setMode('borongan')} className={`px-3 py-1.5 rounded-md ${mode === 'borongan' ? 'bg-white shadow-sm' : 'text-muted'}`}>Borongan / renovasi</button>
              </div>
              <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-2">
                {mode === 'harian' ? (
                  <label className="text-xs font-semibold text-muted">Butuh tukang apa?
                    <select className="input mt-1 text-ink" value={cat} onChange={(e) => setCat(e.target.value)}>
                      <option value="">Semua tukang</option>
                      {CATEGORIES.filter((c) => !c.borongan).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </label>
                ) : (
                  <label className="text-xs font-semibold text-muted">Jenis proyek
                    <select className="input mt-1 text-ink"><option>Renovasi dapur</option><option>Kamar mandi</option><option>Tambah kamar / lantai</option><option>Kanopi & pagar</option><option>Atap baja ringan</option></select>
                  </label>
                )}
                <label className="text-xs font-semibold text-muted">Lokasi
                  <select className="input mt-1 text-ink" value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="">Semua kota</option>
                    {CITIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <button className="btn btn-primary self-end h-[42px]"><Search size={16} /> {mode === 'harian' ? 'Cari tukang' : 'Minta survei'}</button>
              </div>
            </form>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2">
              <span className="flex items-center gap-1.5"><BadgeCheck size={16} className="text-green" /> KTP, SKCK & portofolio dicek</span>
              <span className="flex items-center gap-1.5"><Wallet size={16} className="text-green" /> Dana aman di escrow</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-green" /> Garansi & retensi 5%</span>
            </div>
          </div>

          {/* hero visual */}
          <div className="relative hidden lg:block">
            <div className="card p-5 shadow-xl rotate-1">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-muted">PROYEK P-2611-014</div><DataContoh />
              </div>
              <div className="font-display text-xl font-bold mt-1">Renovasi dapur + kitchen set</div>
              <div className="text-sm text-muted">CV Karya Tikung Nusantara · Bandung</div>
              <div className="mt-4 h-2.5 rounded-full bg-paper-2 overflow-hidden"><div className="h-full bg-orange" style={{ width: '55%' }} /></div>
              <div className="flex justify-between text-xs mt-1 text-muted"><span>Progres 55%</span><span>Target 15 Des</span></div>
              <div className="mt-4 space-y-2 text-sm">
                {[['DP 30%', 'Cair', 'bg-green-l text-green'], ['Termin 2 · 40%', 'Menunggu Anda', 'bg-orange-l text-orange-d'], ['Termin 3 · 25%', 'Di escrow', 'bg-paper-2 text-muted'], ['Retensi 5%', 'Di escrow', 'bg-paper-2 text-muted']].map(([a, b, c]) => (
                  <div key={a} className="flex justify-between items-center py-1.5 border-b border-line last:border-0"><span>{a}</span><span className={`chip ${c}`}>{b}</span></div>
                ))}
              </div>
            </div>
            <div className="card p-3 shadow-lg absolute -bottom-16 -left-10 w-64 -rotate-2 flex gap-3 items-center">
              <div className="w-12 h-12 rounded-lg bg-paper-2 grid place-items-center"><Camera size={20} className="text-orange" /></div>
              <div className="text-sm"><div className="font-semibold">Laporan progres baru</div><div className="text-muted text-xs">Kabinet bawah terpasang · 11 Nov</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORI */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Pekerjaan apa yang mau dibereskan?</h2>
            <p className="text-ink-2 mt-2">Kisaran tarif pasar, disepakati langsung dengan tukang atau mitra kontraktor sebelum mulai.</p>
          </div>
          <Link to="/cari" className="btn btn-ghost text-sm">Lihat semua tukang <ArrowRight size={16} /></Link>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={c.borongan ? '/proyek/baru' : `/cari?kategori=${c.id}`} className={`card p-4 hover:border-ink transition group ${c.borongan ? '!bg-ink text-white !border-ink' : ''}`}>
              <div className={`w-11 h-11 rounded-xl grid place-items-center ${c.borongan ? 'bg-orange text-white' : 'bg-orange-l text-orange-d'}`}><Icon name={c.icon} size={22} /></div>
              <div className="font-semibold mt-3">{c.name}</div>
              <div className={`text-xs mt-1 ${c.borongan ? 'text-white/70' : 'text-muted'}`}>{c.desc}</div>
              <div className="text-sm font-semibold mt-3">{c.price}</div>
            </Link>
          ))}
        </div>
        <p className="text-xs text-muted mt-3">Kisaran ilustrasi untuk demo, belum survei harga resmi. Harga akhir tergantung volume, material, dan lokasi.</p>
      </section>

      {/* CARA KERJA */}
      <section id="cara-kerja" className="bg-ink text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold">Dua jalur, satu prinsip: semua tercatat.</h2>
          <p className="text-white/70 mt-2 max-w-2xl">Tidak ada janji lisan yang hilang. Lingkup kerja, harga, jadwal, dan tambahan biaya disetujui di aplikasi.</p>
          <div className="mt-10 grid lg:grid-cols-2 gap-6">
            {[
              { title: 'Panggil harian', sub: 'Bocor, korslet, pasang rak, perbaikan kecil', steps: [
                [Search, 'Pilih tukang', 'Saring kategori, kota, tarif, rating, dan jarak.'],
                [CalendarCheck, 'Pesan jadwal', 'Tukang konfirmasi. Nomor HP tampil setelah itu.'],
                [Wallet, 'Bayar ke escrow', 'Estimasi biaya ditahan TukangTikung, bukan ke rekening pribadi.'],
                [Camera, 'Konfirmasi selesai', 'Foto sebelum/sesudah, dana cair, garansi 7–30 hari.'],
              ] },
              { title: 'Borongan / renovasi', sub: 'Dapur, kamar mandi, kanopi, tambah ruang', steps: [
                [ClipboardList, 'Survei & RAB', 'Hingga 3 mitra survei lalu kirim RAB per item untuk dibandingkan.'],
                [FileSignature, 'Kontrak digital', 'Lingkup, material, jadwal, dan termin tertulis dari templat.'],
                [Camera, 'Termin per progres', 'Termin cair setelah laporan progres Anda setujui.'],
                [ShieldCheck, 'Retensi garansi 5%', 'Ditahan 60–90 hari setelah serah terima untuk klaim.'],
              ] },
            ].map((j) => (
              <div key={j.title} className="rounded-2xl border border-white/15 p-6 bg-white/[.03]">
                <div className="font-display text-2xl font-bold">{j.title}</div>
                <div className="text-white/60 text-sm">{j.sub}</div>
                <ol className="mt-6 space-y-5">
                  {j.steps.map(([I, a, b], i) => (
                    <li key={a} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-orange grid place-items-center shrink-0"><I size={18} /></div>
                      <div><div className="font-semibold"><span className="text-orange mr-1">{i + 1}.</span>{a}</div><div className="text-sm text-white/70">{b}</div></div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIAP KERJA */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Siap kerja minggu ini</h2>
            <p className="text-ink-2 mt-2">Dokumen sudah diperiksa tim TukangTikung. Nama di bawah adalah contoh. <DataContoh /></p>
          </div>
          <Link to="/cari" className="btn btn-ghost text-sm">Lihat {TUKANG.length} profil <ArrowRight size={16} /></Link>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{featured.map((t) => <TukangCard key={t.id} t={t} />)}</div>
      </section>

      {/* KEJUJURAN */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="card p-8 md:p-10 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold">Kami perantara, dan kami jujur soal itu.</h2>
            <p className="mt-3 text-ink-2">Kontrak kerja dibuat antara Anda dan tukang atau mitra kontraktor. Tugas TukangTikung menjaga pintunya: siapa yang boleh masuk, bagaimana uang disimpan, dan siapa yang dikeluarkan bila melanggar.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {['Legalitas mitra diperiksa sebelum tayang: NIB, KBLI konstruksi, NPWP, dan deposit jaminan.', 'Dokumen tukang dicek: KTP, SKCK, foto wajah, portofolio; sertifikat SKK/BNSP jadi badge tambahan.', 'Uang ditahan di escrow dan cair per termin setelah progres disetujui.', 'Tambahan biaya wajib diajukan dan disetujui di aplikasi, bukan di lokasi.'].map((x) => (
                <li key={x} className="flex gap-2"><Check size={18} className="text-green shrink-0 mt-0.5" />{x}</li>
              ))}
            </ul>
          </div>
          <div className="bg-paper-2 rounded-xl p-6">
            <div className="font-semibold">Yang tidak kami lakukan</div>
            <ul className="mt-4 space-y-3 text-sm">
              {['Menjamin perilaku seseorang. Verifikasi adalah pemeriksaan dokumen.', 'Menampilkan NIK atau dokumen asli. Hanya statusnya (UU PDP).', 'Memungut biaya dari tukang mandiri untuk mendaftar.', 'Menerima pembayaran di luar aplikasi. Transfer pribadi tidak dilindungi.'].map((x) => (
                <li key={x} className="flex gap-2"><X size={18} className="text-red shrink-0 mt-0.5" />{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* MITRA */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold">Mitra kontraktor terverifikasi</h2>
        <p className="text-ink-2 mt-2">Contoh daftar. Nama perusahaan fiktif.</p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MITRA.map((m) => (
            <div key={m.id} className="card p-4">
              <div className="flex gap-3 items-center"><Avatar name={m.initials} tone="dark" size={42} /><div><div className="font-semibold text-sm leading-tight">{m.name}</div><div className="text-xs text-muted">{m.city} · {m.projects} proyek</div></div></div>
              <div className="flex justify-between items-center mt-4 text-xs"><Stars value={m.rating} /><span className="text-muted">Tim {m.team} · KBLI {m.kbli}</span></div>
            </div>
          ))}
        </div>
        <p className="text-sm text-ink-2 mt-4">Garansi pekerjaan milik mitra. Bila sengketa buntu, TukangTikung memfasilitasi mediasi dan dapat memakai retensi atau deposit mitra untuk perbaikan.</p>
      </section>

      {/* TESTIMONI + LOGIN */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="card p-8 text-center">
          <div className="flex justify-center gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-orange text-orange" />)}</div>
          <p className="font-display text-2xl md:text-3xl font-bold mt-3 max-w-3xl mx-auto">“Foto progres tiap hari, termin baru cair setelah saya cek. Pertama kali renovasi tanpa deg-degan.”</p>
          <p className="text-sm text-muted mt-3">Pak Gilang, Cimahi · renovasi kamar mandi · testimoni contoh</p>
        </div>
      </section>

      <section id="masuk" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold">Masuk sesuai peran Anda</h2>
        <p className="text-ink-2 mt-2">Ini demo: setiap tombol langsung masuk ke akun contoh, tanpa kata sandi.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            ['pelanggan', 'Pelanggan', 'Cari tukang, minta survei, bandingkan RAB, setujui termin, klaim garansi, beri ulasan.'],
            ['mitra', 'Mitra kontraktor', 'Onboarding legalitas & deposit, kelola tim, kirim RAB dari templat, laporan progres, tagih termin.'],
            ['tukang', 'Tukang mandiri', 'Daftar gratis. Unggah dokumen & portofolio, atur area dan tarif, terima atau tolak order.'],
          ].map(([r, t, d]) => (
            <div key={r} className="card p-6 flex flex-col">
              <div className="font-display text-xl font-bold">{t}</div>
              <p className="text-sm text-ink-2 mt-2 flex-1">{d}</p>
              <button onClick={() => login(r)} className="btn btn-dark mt-5">Masuk sebagai {t.toLowerCase()}</button>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted mt-4">Tim internal? <button onClick={() => login('admin')} className="underline font-semibold text-ink">Masuk sebagai admin platform</button> untuk verifikasi, sengketa, dan statistik.</p>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-2xl bg-orange text-white p-8 md:p-12 flex flex-col md:flex-row gap-6 md:items-center justify-between relative overflow-hidden">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Mulai dari pekerjaan di rumah Anda.</h2>
            <p className="mt-2 text-white/90">Ceritakan masalahnya, kirim foto. Kami tunjukkan tukang yang cocok di kota Anda.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/cari" className="btn bg-white text-ink hover:bg-paper">Cari tukang</Link>
            <Link to="/proyek/baru" className="btn btn-dark">Ajukan borongan</Link>
          </div>
        </div>
        <p className="text-center text-sm text-muted mt-4">Anda tukang? <Link to="/daftar-tukang" className="underline font-semibold text-ink">Daftar gratis selamanya</Link></p>
      </section>
    </main>
  )
}
