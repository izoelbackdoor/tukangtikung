import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Check, X, Camera, Lock, Star, ChevronRight } from 'lucide-react'
import { CATEGORIES, CITIES, TUKANG, MITRA, STATS, rupiah } from '../data'
import { HERO_PHOTOS } from '../photos'
import { Icon, TukangCard, useSession } from '../components/ui'
import { WorkArt } from '../components/art'

const POPULER = [['Pipa bocor', 'ledeng'], ['Pasang keramik', 'bangunan'], ['Tambah titik lampu', 'listrik'], ['Cat ulang kamar', 'cat'], ['Kanopi carport', 'las'], ['Genteng bocor', 'atap']]

export default function Home() {
  const nav = useNavigate()
  const { setRole } = useSession()
  const [mode, setMode] = useState('harian')
  const [q, setQ] = useState('')
  const [city, setCity] = useState('Bandung')
  const featured = TUKANG.filter((t) => (t.city === 'Bandung' || t.city === 'Cimahi') && !CATEGORIES.find((c) => c.id === t.category).borongan).sort((a, b) => (!!b.photo - !!a.photo) || (b.readySoon - a.readySoon) || b.rating - a.rating).slice(0, 8)

  const submit = (e) => {
    e.preventDefault()
    if (mode === 'borongan') return nav(`/proyek/baru?kota=${city}`)
    const p = new URLSearchParams({ kota: city })
    const match = CATEGORIES.find((c) => q && (c.name.toLowerCase().includes(q.toLowerCase()) || q.toLowerCase().includes(c.short.toLowerCase())))
    if (match) p.set('kategori', match.id); else if (q) p.set('q', q)
    nav('/cari?' + p.toString())
  }
  const login = (r) => { setRole(r); nav(`/app/${r}`) }

  return (
    <main>
      <section className="bg-soft border-b border-line">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-12 md:pt-[72px] pb-16 md:pb-20 flex flex-wrap gap-14 items-center">
          <div className="flex-[999_1_560px] min-w-0">
            <h1 className="text-[40px] md:text-[58px] leading-[1.04] font-extrabold tracking-[-0.035em] max-w-[14ch]">Tukang terverifikasi, uang aman sampai beres.</h1>
            <p className="mt-5 text-lg md:text-[19px] leading-relaxed text-ink-2 max-w-[52ch]">Bangunan, kayu, listrik, ledeng, cat, dan las. Harga disepakati di depan, pembayaran ditahan TukangTikung dan baru cair setelah Anda setujui hasilnya.</p>

            <form onSubmit={submit} className="mt-8 bg-white border border-line-2 rounded-[20px] p-2.5 shadow-[0_12px_32px_-12px_rgba(23,25,28,.16)]">
              <div role="tablist" aria-label="Jenis pekerjaan" className="flex gap-1 p-1 pb-2.5">
                {[['harian', 'Panggil harian'], ['borongan', 'Borongan / renovasi']].map(([id, l]) => (
                  <button key={id} type="button" role="tab" aria-selected={mode === id} onClick={() => setMode(id)} className={`px-4 py-2.5 rounded-[10px] text-[15px] font-bold min-h-[44px] ${mode === id ? 'bg-ink text-white' : 'text-ink-2 hover:bg-soft'}`}>{l}</button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <label className="flex-[3_1_260px] flex flex-col gap-0.5 px-4 py-2.5 rounded-[14px] bg-soft">
                  <span className="text-xs font-bold text-ink-2">{mode === 'harian' ? 'Butuh tukang apa?' : 'Proyek apa?'}</span>
                  <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={mode === 'harian' ? 'mis. listrik, ledeng, keramik' : 'mis. renovasi dapur 12 m²'} className="bg-transparent text-[17px] font-medium outline-none py-0.5 placeholder:text-[#6B7280]" />
                </label>
                <label className="flex-[1_1_160px] flex flex-col gap-0.5 px-4 py-2.5 rounded-[14px] bg-soft">
                  <span className="text-xs font-bold text-ink-2">Lokasi</span>
                  <select value={city} onChange={(e) => setCity(e.target.value)} className="bg-transparent text-[17px] font-medium outline-none py-0.5">{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
                </label>
                <button className="btn btn-primary flex-[0_1_auto] min-h-[60px] !px-7 text-base"><Search size={20} /> {mode === 'harian' ? 'Cari tukang' : 'Minta survei'}</button>
              </div>
            </form>
            <div className="mt-5 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-ink-2 mr-1">Populer di Bandung:</span>
              {POPULER.map(([l, c]) => <Link key={l} to={`/cari?kategori=${c}&kota=Bandung`} className="pill !min-h-[38px] !font-medium">{l}</Link>)}
              <Link to="/proyek/baru" className="pill !min-h-[38px] !font-medium">Renovasi dapur</Link>
            </div>
          </div>

          <aside className="flex-[1_1_360px] min-w-0 max-w-[440px] bg-white border border-line rounded-[20px] p-6 shadow-[0_20px_48px_-20px_rgba(23,25,28,.22)]" aria-label="Contoh proyek dengan pembayaran per termin">
            <div className="flex justify-between items-start gap-3">
              <div><div className="text-[13px] text-muted">Contoh proyek · Cikutra, Bandung</div><div className="text-xl font-extrabold mt-0.5">Renovasi dapur + kitchen set</div></div>
              <span className="chip bg-orange-l text-orange-d whitespace-nowrap">Berjalan</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <WorkArt cat="bangunan" showTag={false} rounded={10} photo={HERO_PHOTOS.bangunan} alt="Foto contoh pemasangan keramik" />
              <WorkArt cat="kayu" showTag={false} rounded={10} photo={HERO_PHOTOS.kayu} alt="Foto contoh kitchen set kayu" />
              <WorkArt cat="ledeng" showTag={false} rounded={10} photo={HERO_PHOTOS.ledeng} alt="Foto contoh instalasi pipa" />
            </div>
            <div className="mt-4 h-2 bg-paper-2 rounded-full overflow-hidden"><div className="h-full bg-brand rounded-full" style={{ width: '55%' }} /></div>
            <div className="flex justify-between text-[13px] text-muted mt-1.5"><span>Progres 55%</span><span>Target 15 Des</span></div>
            <div className="mt-3 flex flex-col text-[15px]">
              <div className="flex items-center gap-3 py-2.5 border-t border-paper-2"><span className="w-7 h-7 rounded-full bg-green-l text-green grid place-items-center"><Check size={16} /></span><span className="flex-1">DP · 30%</span><b>Rp 14,55 jt</b><span className="text-xs font-bold text-green w-[88px] text-right">Sudah cair</span></div>
              <div className="flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-xl bg-[#FFF6F0]"><span className="w-7 h-7 rounded-full bg-brand text-white grid place-items-center"><Camera size={15} /></span><span className="flex-1">Progres · 40%</span><b>Rp 19,4 jt</b><span className="text-xs font-bold text-orange-d w-[88px] text-right">Cek foto dulu</span></div>
              <div className="flex items-center gap-3 py-2.5 border-b border-paper-2"><span className="w-7 h-7 rounded-full bg-paper-2 text-muted grid place-items-center"><Lock size={15} /></span><span className="flex-1">Sisa · 30%</span><b>Rp 14,55 jt</b><span className="text-xs font-bold text-muted w-[88px] text-right">Ditahan</span></div>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">Tukang mengunggah foto progres. Termin baru cair setelah Anda menyetujuinya.</p>
          </aside>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 pt-16 md:pt-[72px]">
        <div className="flex flex-wrap justify-between items-end gap-4">
          <h2 className="text-[28px] md:text-[34px] font-extrabold">Pekerjaan apa yang mau dibereskan?</h2>
          <Link to="/cari" className="text-[15px] font-bold text-orange hover:text-orange-d">Lihat semua {STATS.tukang} tukang</Link>
        </div>
        <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] border border-line rounded-2xl overflow-hidden">
          {CATEGORIES.map((c) => {
            const n = TUKANG.filter((t) => t.category === c.id).length
            return (
              <Link key={c.id} to={c.borongan ? '/proyek/baru' : `/cari?kategori=${c.id}`} className="flex items-center gap-3.5 px-5 py-[18px] border-b border-r border-paper-2 hover:bg-soft text-ink">
                <span className={`w-11 h-11 rounded-xl grid place-items-center shrink-0 ${c.borongan ? 'bg-ink text-[#FFB27A]' : 'bg-orange-l text-orange-d'}`}><Icon name={c.icon} size={20} /></span>
                <span className="flex-1 min-w-0"><span className="block font-bold">{c.name}</span><span className="block text-sm text-muted mt-0.5">{c.borongan ? 'Survei, RAB, termin' : c.price} · {n} tukang</span></span>
                <ChevronRight size={16} className="text-[#8A9099]" />
              </Link>
            )
          })}
        </div>
        <p className="mt-3 text-[13px] text-muted">Kisaran ilustrasi untuk demo, belum survei harga resmi.</p>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 pt-14">
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div>
            <h2 className="text-[28px] md:text-[34px] font-extrabold">Siap kerja di Bandung dan Cimahi</h2>
            <p className="mt-2 text-ink-2">Dokumen sudah diperiksa tim TukangTikung. Nama, ulasan, dan foto adalah contoh (foto stok, bukan tukang sungguhan).</p>
          </div>
          <Link to="/cari?kota=Bandung" className="text-[15px] font-bold text-orange hover:text-orange-d">Lihat semua di Bandung</Link>
        </div>
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">{featured.map((t) => <TukangCard key={t.id} t={t} />)}</div>
      </section>

      <section id="cara-kerja" className="max-w-[1200px] mx-auto px-4 md:px-6 pt-20 scroll-mt-24">
        <h2 className="text-[28px] md:text-[34px] font-extrabold">Dua cara memesan, semua tercatat</h2>
        <p className="mt-2 text-ink-2 max-w-[60ch]">Lingkup kerja, harga, jadwal, dan tambahan biaya disetujui di aplikasi, bukan janji lisan di lokasi.</p>
        <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
          {[
            { id: 'harian', title: 'Panggil harian', sub: 'bocor, korsleting, pasang rak', steps: [['Pilih tukang', 'Bandingkan rating, tarif, jarak, dan status verifikasi.'], ['Pesan jadwal', 'Tukang mengonfirmasi. Nomor HP baru tampil setelah itu.'], ['Bayar ke TukangTikung', 'Estimasi biaya ditahan, bukan dikirim ke rekening pribadi.'], ['Setujui hasilnya', 'Dana cair ke tukang, garansi kerja 7–30 hari berjalan.']], cta: ['Cari tukang', '/cari'] },
            { id: 'borongan', title: 'Borongan / renovasi', sub: 'dapur, kamar mandi, kanopi', steps: [['Survei dan 3 penawaran harga', 'Hingga 3 mitra survei lalu mengirim RAB (rincian biaya per item).'], ['Kontrak digital', 'Lingkup, material, jadwal, dan termin tertulis sebelum mulai.'], ['Bayar per tahap', 'Setiap termin cair setelah Anda menyetujui foto progres.'], ['Garansi dengan dana jaminan', '5% ditahan 60–90 hari setelah serah terima untuk perbaikan.']], cta: ['Ajukan proyek borongan', '/proyek/baru'] },
          ].map((j) => (
            <div key={j.id} id={j.id === 'borongan' ? 'borongan' : undefined} className="border border-line rounded-[20px] p-7">
              <div className="flex flex-wrap items-baseline gap-3"><span className="text-[22px] font-extrabold">{j.title}</span><span className="text-[13px] text-muted">{j.sub}</span></div>
              <ol className="mt-5 flex flex-col gap-4">
                {j.steps.map(([a, b], i) => (
                  <li key={a} className="flex gap-3.5"><span className="w-[30px] h-[30px] rounded-full bg-ink text-white text-sm font-extrabold grid place-items-center shrink-0">{i + 1}</span><div><div className="font-bold">{a}</div><div className="text-[15px] text-ink-2 mt-0.5">{b}</div></div></li>
                ))}
              </ol>
              <Link to={j.cta[1]} className={`btn mt-6 ${j.id === 'borongan' ? 'btn-primary' : 'btn-outline'}`}>{j.cta[0]}</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 pt-20">
        <div className="bg-ink text-white rounded-3xl p-8 md:p-12 flex flex-wrap gap-12 items-center">
          <div className="flex-[1_1_340px] min-w-0">
            <h2 className="text-[28px] md:text-[34px] font-extrabold leading-[1.1]">Uang Anda tidak pernah langsung ke tukang.</h2>
            <p className="mt-3.5 text-[17px] leading-relaxed text-[#C9CDD2] max-w-[46ch]">TukangTikung menahan pembayaran dan meneruskannya per tahap. Contoh proyek {rupiah(48_500_000)}:</p>
          </div>
          <div className="flex-[2_1_520px] min-w-0">
            <div className="flex h-14 rounded-[14px] overflow-hidden gap-[3px] font-extrabold text-ink">
              <div className="bg-brand flex items-center px-3.5" style={{ flex: 30 }}>30%</div>
              <div className="bg-[#FFB27A] flex items-center px-3.5" style={{ flex: 40 }}>40%</div>
              <div className="bg-[#FFE0CC] flex items-center px-3.5" style={{ flex: 25 }}>25%</div>
              <div className="bg-white" style={{ flex: 5 }} />
            </div>
            <div className="mt-3.5 grid gap-[3px] text-sm text-[#C9CDD2]" style={{ gridTemplateColumns: '30fr 40fr 25fr 5fr' }}>
              <div><div className="text-white font-bold">DP</div>saat kontrak</div>
              <div><div className="text-white font-bold">Progres 50%</div>setelah foto disetujui</div>
              <div><div className="text-white font-bold">Serah terima</div>pekerjaan diterima</div><div />
            </div>
            <div className="mt-4 pt-3.5 border-t border-[#33373D] text-sm text-[#C9CDD2]"><b className="text-white">Retensi 5%</b> ditahan 60–90 hari sebagai dana garansi.</div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 pt-20">
        <div className="flex flex-wrap justify-between items-end gap-4">
          <h2 className="text-[28px] md:text-[34px] font-extrabold">Hasil kerja dari tukang di TukangTikung</h2>
          <span className="text-sm text-muted">Foto stok contoh, bukan pekerjaan nyata</span>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {TUKANG.slice(0, 8).map((t) => (
            <Link key={t.id} to={`/tukang/${t.id}`} className="group"><WorkArt cat={t.category} label={t.portfolio[0]} photo={t.portfolioPhotos[0]} /><div className="mt-2 text-sm"><b className="group-hover:underline">{t.name}</b> <span className="text-muted">· {t.city}</span></div></Link>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 pt-20 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-12">
        <div>
          <h2 className="text-[26px] md:text-[30px] font-extrabold">Yang kami periksa</h2>
          <ul className="mt-5 flex flex-col gap-3.5 leading-relaxed">
            {['KTP, SKCK, foto wajah, dan portofolio setiap tukang.', 'NIB, KBLI konstruksi, NPWP, dan deposit jaminan setiap mitra kontraktor.', 'Sertifikat SKK atau BNSP, bila ada, tampil sebagai lencana tambahan.', 'Tambahan biaya wajib diajukan dan disetujui di aplikasi.'].map((x) => <li key={x} className="flex gap-3"><Check size={20} className="text-green shrink-0 mt-0.5" />{x}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-[26px] md:text-[30px] font-extrabold">Yang tidak kami janjikan</h2>
          <ul className="mt-5 flex flex-col gap-3.5 leading-relaxed text-ink-2">
            {['Menjamin perilaku seseorang. Verifikasi adalah pemeriksaan dokumen.', 'Menampilkan NIK atau dokumen asli. Hanya statusnya (UU PDP).', 'Melindungi pembayaran di luar aplikasi. Transfer pribadi tidak tercatat.', 'Memungut biaya pendaftaran dari tukang mandiri.'].map((x) => <li key={x} className="flex gap-3"><X size={20} className="text-[#8A9099] shrink-0 mt-0.5" />{x}</li>)}
          </ul>
        </div>
      </section>

      <section id="mitra" className="max-w-[1200px] mx-auto px-4 md:px-6 pt-20 scroll-mt-24">
        <h2 className="text-[26px] md:text-[30px] font-extrabold">{MITRA.length} mitra kontraktor terverifikasi</h2>
        <p className="mt-2 text-ink-2">Contoh daftar, nama perusahaan fiktif. Garansi pekerjaan ditanggung mitra sesuai kontrak.</p>
        <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] border-t border-line">
          {MITRA.map((m) => (
            <div key={m.id} className="flex items-center gap-3 py-4 pr-2 border-b border-line">
              <img src={m.photo} alt={`Foto contoh pekerjaan ${m.name}`} width={44} height={44} loading="lazy" className="w-11 h-11 rounded-xl object-cover shrink-0" />
              <div className="min-w-0"><div className="text-[15px] font-bold truncate">{m.name}</div><div className="text-[13px] text-muted">{m.city} · {m.projects} proyek · {String(m.rating).replace('.', ',')}</div></div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 pt-20">
        <figure className="text-center">
          <div className="flex justify-center gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-ink text-ink" />)}</div>
          <blockquote className="mt-3 mx-auto max-w-[30ch] text-2xl md:text-[30px] leading-snug font-bold tracking-[-0.02em]">“Foto progres tiap hari, termin baru cair setelah saya cek. Pertama kali renovasi tanpa deg-degan.”</blockquote>
          <figcaption className="mt-3.5 text-sm text-muted">Pak Gilang, Cimahi · renovasi kamar mandi · testimoni contoh</figcaption>
        </figure>
      </section>

      <section id="masuk" className="max-w-[1200px] mx-auto px-4 md:px-6 pt-20">
        <h2 className="text-[26px] md:text-[30px] font-extrabold">Coba demo sesuai peran</h2>
        <p className="mt-2 text-ink-2">Setiap tombol langsung masuk ke akun contoh, tanpa kata sandi.</p>
        <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {[['pelanggan', 'Pelanggan', 'Cari tukang, bandingkan RAB, setujui termin, klaim garansi.'], ['mitra', 'Mitra kontraktor', 'Permintaan survei, buat RAB, laporan progres, tagih termin.'], ['tukang', 'Tukang mandiri', 'Terima atau tolak order, jadwal, pendapatan, dokumen.'], ['admin', 'Admin platform', 'Verifikasi dokumen, sengketa, pencairan, statistik.']].map(([r, t, d]) => (
            <button key={r} onClick={() => login(r)} className="card lift p-5 text-left flex flex-col">
              <span className="text-lg font-extrabold">{t}</span>
              <span className="text-sm text-ink-2 mt-1.5 flex-1">{d}</span>
              <span className="text-sm font-bold text-orange mt-4 flex items-center gap-1">Masuk sebagai {t.toLowerCase()} <ChevronRight size={14} /></span>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 pt-16">
        <div className="bg-orange-l rounded-3xl px-6 md:px-12 py-10 flex flex-wrap gap-6 items-center justify-between">
          <div className="max-w-[560px]">
            <h2 className="text-[26px] md:text-[30px] font-extrabold">Anda tukang? Daftar gratis, dibayar tepat waktu.</h2>
            <p className="mt-2.5 leading-relaxed text-ink-2">Upah dibayar pelanggan ke TukangTikung sebelum Anda berangkat. Tanpa potongan untuk tukang mandiri.</p>
          </div>
          <div className="flex gap-2.5 flex-wrap"><Link to="/daftar-tukang" className="btn btn-primary">Daftar sebagai tukang</Link><Link to="/masuk?peran=mitra" className="btn btn-outline">Daftarkan perusahaan</Link></div>
        </div>
      </section>
    </main>
  )
}
