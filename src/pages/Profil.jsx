import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, Check, Lock, ShieldCheck, Phone, Heart, Star } from 'lucide-react'
import { TUKANG, CATEGORIES, formatPrice, reviewsFor, ratingBars } from '../data'
import { Stars, Toast, useSession, TukangCard } from '../components/ui'
import { Avatar, WorkArt } from '../components/art'

export default function Profil() {
  const { id } = useParams()
  const nav = useNavigate()
  const { role, setRole } = useSession()
  const t = TUKANG.find((x) => x.id === id)
  const [toast, setToast] = useState('')
  const [all, setAll] = useState(false)
  const [date, setDate] = useState('Jum, 14 Nov')
  if (!t) return <main className="max-w-3xl mx-auto px-4 py-24 text-center"><h1 className="text-3xl font-extrabold">Profil tidak ditemukan</h1><Link to="/cari" className="btn btn-dark mt-6">Kembali ke pencarian</Link></main>
  const cat = CATEGORIES.find((c) => c.id === t.category)
  const reviews = reviewsFor(t, all ? 14 : 4)
  const bars = ratingBars(t)
  const similar = TUKANG.filter((x) => x.category === t.category && x.id !== t.id).sort((a, b) => (a.city === t.city ? -1 : 1) - (b.city === t.city ? -1 : 1) || b.rating - a.rating).slice(0, 4)
  const nik = (1000 + parseInt(t.id.slice(1)) * 37).toString().slice(-4)
  const first = t.fullName.split(' ')[0]

  const book = (e) => {
    e.preventDefault()
    if (!role) setRole('pelanggan')
    setToast(`Permintaan terkirim ke ${t.name}. Menunggu konfirmasi jadwal.`)
    setTimeout(() => nav('/app/pelanggan?tab=harian'), 1600)
  }

  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
      <Link to="/cari" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink-2 hover:text-ink"><ChevronLeft size={18} /> Kembali ke hasil</Link>
      <div className="mt-5 flex flex-wrap gap-12 items-start">
        <div className="flex-[999_1_560px] min-w-0">
          <div className="flex flex-wrap gap-6 items-center">
            <Avatar look={t.look} photo={t.photo} focus={t.photoFocus} size={128} rounded={28} label={`Foto contoh ${t.name}`} />
            <div className="flex-1 min-w-[240px]">
              <h1 className="text-[32px] md:text-[38px] font-extrabold">{t.fullName}</h1>
              <p className="mt-1 text-[17px] text-ink-2">{cat.name} · {t.area}, {t.city} · {t.mitra ? `tim ${t.mitra.name}` : 'tukang mandiri'}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="chip bg-green-l text-green !text-[13px] !py-1.5 !px-2.5"><ShieldCheck size={14} /> Terverifikasi</span>
                {t.skk && <span className="chip bg-blue-l text-blue !text-[13px] !py-1.5 !px-2.5">SKK {cat.short}</span>}
                <span className="chip bg-paper-2 text-ink-2 !text-[13px] !py-1.5 !px-2.5">Data contoh</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 border border-line rounded-2xl">
            {[[<span className="flex items-center gap-1.5"><Star size={20} className="fill-ink" />{String(t.rating).replace('.', ',')}</span>, `${t.reviews} ulasan`], [t.jobs, 'order selesai'], [`${t.exp} th`, 'pengalaman'], [t.response, 'waktu balas']].map(([a, b], i) => (
              <div key={b} className={`px-5 py-[18px] ${i < 3 ? 'md:border-r' : ''} ${i % 2 === 0 ? 'border-r md:border-r' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''} border-paper-2`}><div className="text-2xl font-extrabold">{a}</div><div className="text-sm text-muted">{b}</div></div>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-extrabold">Tentang {first}</h2>
            <p className="mt-2.5 text-[17px] leading-relaxed text-ink-2 max-w-[65ch]">{t.about} {t.repeat}% pelanggannya memesan lagi.</p>
            <div className="mt-4 flex flex-wrap gap-2">{t.skills.map((s) => <span key={s} className="text-sm font-semibold px-3 py-2 border border-line-2 rounded-full">{s}</span>)}</div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-2">{t.extras.map((x) => <span key={x} className="flex items-center gap-1.5"><Check size={15} className="text-green" />{x}</span>)}</div>
          </section>

          <section className="mt-10 pt-9 border-t border-line">
            <h2 className="text-2xl font-extrabold">Hasil kerja</h2>
            <p className="mt-1.5 text-[15px] text-muted">Foto stok contoh, sesuai jenis pekerjaannya. Di produk nyata, foto diunggah tukang dan dicek tim kami.</p>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">{t.portfolio.map((p, i) => <WorkArt key={p} cat={t.category} label={p} photo={t.portfolioPhotos[i]} />)}</div>
          </section>

          <section className="mt-10 pt-9 border-t border-line">
            <h2 className="text-2xl font-extrabold">Dokumen yang sudah diperiksa</h2>
            <p className="mt-1.5 text-[15px] text-muted max-w-[65ch]">Dokumen asli dicek tim TukangTikung. Sesuai UU PDP hanya statusnya yang ditampilkan.</p>
            <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-8">
              {['KTP', 'SKCK', 'Foto wajah (liveness)', `Portofolio ${t.portfolio.length} pekerjaan`, ...(t.skk ? [`SKK ${cat.short}`] : []), 'Referensi 2 pelanggan'].map((d) => <div key={d} className="flex items-center gap-3 py-3 border-b border-paper-2"><Check size={20} className="text-green" />{d}</div>)}
            </div>
            <p className="mt-3.5 text-sm text-muted">NIK 3273 •••• •••• {nik} · verifikasi adalah pemeriksaan dokumen, bukan jaminan perilaku.</p>
          </section>

          <section className="mt-10 pt-9 border-t border-line">
            <h2 className="text-2xl font-extrabold flex items-center gap-2"><Star size={22} className="fill-ink" />{String(t.rating).replace('.', ',')} · {t.reviews} ulasan</h2>
            <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-8 gap-y-2.5 text-sm">
              {bars.map((b) => <div key={b.label} className="flex items-center gap-2.5"><span className="w-[110px] text-ink-2">{b.label}</span><span className="flex-1 h-1 bg-paper-2 rounded"><span className="block h-full bg-ink rounded" style={{ width: b.w }} /></span><b>{String(b.v).replace('.', ',')}</b></div>)}
            </div>
            <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-10 gap-y-7">
              {reviews.map((r, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3"><span className="w-10 h-10 rounded-full bg-paper-2 grid place-items-center font-extrabold text-sm">{r.ini}</span><div><div className="text-[15px] font-bold">{r.who}</div><div className="text-[13px] text-muted">{r.when} · {r.job} · {r.rating}/5</div></div></div>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">{r.text}</p>
                </div>
              ))}
            </div>
            {!all && t.reviews > 4 && <button onClick={() => setAll(true)} className="btn btn-outline mt-6">Tampilkan lebih banyak ulasan</button>}
          </section>

          {similar.length > 0 && (
            <section className="mt-12 pt-9 border-t border-line">
              <h2 className="text-2xl font-extrabold">{cat.name} lain yang mirip</h2>
              <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">{similar.map((x) => <TukangCard key={x.id} t={x} />)}</div>
            </section>
          )}
        </div>

        <aside className="flex-[1_1_340px] max-w-[400px] min-w-0 lg:sticky lg:top-24" aria-label={`Pesan ${t.name}`}>
          <form onSubmit={book} className="border border-line-2 rounded-[20px] p-6 shadow-[0_16px_40px_-18px_rgba(23,25,28,.22)]">
            <div className="text-[26px] font-extrabold leading-tight">{formatPrice(t)}</div>
            <div className="mt-1 text-sm text-ink-2">Siap mulai {t.ready} · {t.tipe}</div>
            <div className="mt-4 border border-line-2 rounded-[14px] overflow-hidden">
              <div className="grid grid-cols-2">
                <label className="px-3.5 py-2.5 border-r border-line-2 flex flex-col gap-0.5"><span className="text-[11px] font-extrabold tracking-wide">TANGGAL</span><select value={date} onChange={(e) => setDate(e.target.value)} className="text-[15px] font-medium bg-transparent outline-none"><option>Jum, 14 Nov</option><option>Sab, 15 Nov</option><option>Sen, 17 Nov</option></select></label>
                <label className="px-3.5 py-2.5 flex flex-col gap-0.5"><span className="text-[11px] font-extrabold tracking-wide">JAM</span><select className="text-[15px] font-medium bg-transparent outline-none"><option>08.00</option><option>10.00</option><option>13.00</option><option>15.00</option></select></label>
              </div>
              <label className="px-3.5 py-2.5 border-t border-line-2 flex flex-col gap-1"><span className="text-[11px] font-extrabold tracking-wide">MASALAHNYA</span><textarea required rows={3} className="resize-none text-[15px] leading-snug outline-none" defaultValue={`Perlu ${t.skills[0].toLowerCase()} di rumah, mohon dicek dulu.`} /></label>
            </div>
            {t.tipe.includes('Harian') ? <button className="btn btn-primary w-full mt-3.5 min-h-[52px] text-base">Pesan jadwal</button> : <Link to={`/proyek/baru?tukang=${t.id}`} className="btn btn-primary w-full mt-3.5 min-h-[52px] text-base">Minta survei & RAB</Link>}
            {t.tipe === 'Harian & Borongan' && <Link to={`/proyek/baru?tukang=${t.id}`} className="btn btn-ghost w-full mt-2">Minta survei & RAB</Link>}
            <p className="mt-2.5 text-center text-[13px] text-muted">Belum ditagih. Bayar setelah {first} mengonfirmasi.</p>
            <div className="mt-4 pt-4 border-t border-paper-2 flex flex-col gap-3 text-sm text-ink-2">
              <div className="flex gap-2.5"><Lock size={18} className="text-ink shrink-0" />Pembayaran ditahan TukangTikung sampai Anda konfirmasi selesai.</div>
              <div className="flex gap-2.5"><ShieldCheck size={18} className="text-ink shrink-0" />Garansi kerja {t.category === 'listrik' || t.category === 'ledeng' ? '30' : '14'} hari{t.mitra ? `, ditanggung ${t.mitra.name}` : ''}.</div>
              <div className="flex gap-2.5"><Phone size={18} className="text-ink shrink-0" />Nomor HP tampil setelah jadwal dikonfirmasi.</div>
            </div>
            <button type="button" onClick={() => setToast('Profil disimpan ke favorit.')} className="btn btn-ghost w-full mt-4 text-sm"><Heart size={16} /> Simpan profil</button>
          </form>
          <p className="mt-3.5 mx-1 text-[13px] leading-relaxed font-semibold text-orange-d">Bayar hanya lewat TukangTikung. Transfer ke rekening pribadi tidak dilindungi.</p>
        </aside>
      </div>
      <Toast msg={toast} onClose={() => setToast('')} />
    </main>
  )
}
