import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, BadgeCheck, Award, MapPin, Briefcase, Clock, Phone, Heart, ShieldAlert, Image as ImageIcon, CalendarDays } from 'lucide-react'
import { TUKANG, CATEGORIES, REVIEWS, formatPrice } from '../data'
import { Avatar, Stars, DataContoh, Icon, Toast, useSession } from '../components/ui'

export default function Profil() {
  const { id } = useParams()
  const nav = useNavigate()
  const { role, setRole } = useSession()
  const t = TUKANG.find((x) => x.id === id)
  const [modal, setModal] = useState(false)
  const [toast, setToast] = useState('')
  const [showAll, setShowAll] = useState(false)
  if (!t) return <main className="max-w-3xl mx-auto px-4 py-20 text-center"><h1 className="text-3xl font-bold">Profil tidak ditemukan</h1><Link to="/cari" className="btn btn-dark mt-6">Kembali ke pencarian</Link></main>
  const cat = CATEGORIES.find((c) => c.id === t.category)
  const reviews = showAll ? REVIEWS : REVIEWS.slice(0, 3)
  const nikTail = (1000 + parseInt(t.id.slice(1)) * 37).toString().slice(-4)

  const book = (e) => {
    e.preventDefault()
    setModal(false)
    if (!role) setRole('pelanggan')
    setToast(`Permintaan terkirim ke ${t.name}. Menunggu konfirmasi jadwal.`)
    setTimeout(() => nav('/app/pelanggan'), 1600)
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/cari" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink"><ArrowLeft size={16} /> Kembali ke hasil</Link>
      <div className="mt-4 grid lg:grid-cols-[1fr_340px] gap-8">
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex flex-wrap gap-5 items-start">
              <Avatar name={t.name} size={88} tone="dark" />
              <div className="flex-1 min-w-[200px]">
                <div className="flex flex-wrap items-center gap-2"><h1 className="text-3xl font-bold">{t.name}</h1><DataContoh /></div>
                <div className="text-ink-2 flex items-center gap-1.5 mt-1"><Icon name={cat.icon} size={16} /> {cat.name}</div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="chip bg-green-l text-green"><BadgeCheck size={12} /> Terverifikasi</span>
                  {t.skk && <span className="chip bg-blue-l text-blue"><Award size={12} /> SKK / BNSP</span>}
                  <span className="chip bg-paper-2 text-ink-2">{t.mitra ? `Tim ${t.mitra.name}` : 'Tukang mandiri'}</span>
                </div>
              </div>
              <div className="text-right"><Stars value={t.rating} /><div className="text-xs text-muted">dari {t.reviews} ulasan</div></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {[[Briefcase, 'Pengalaman', `${t.exp} tahun`], [MapPin, 'Area kerja', `${t.city} · radius 15 km`], [CalendarDays, 'Pekerjaan selesai', `${t.jobs} order`], [Clock, 'Tipe', t.tipe]].map(([I, a, b]) => (
                <div key={a} className="bg-paper-2 rounded-xl p-3"><I size={16} className="text-orange" /><div className="text-xs text-muted mt-1">{a}</div><div className="text-sm font-semibold">{b}</div></div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold">Tentang {t.name.split(' ')[0]}</h2>
            <p className="text-ink-2 mt-2">{t.about}</p>
            <div className="font-semibold text-sm mt-4">Keahlian</div>
            <div className="flex flex-wrap gap-1.5 mt-2">{t.skills.map((s) => <span key={s} className="chip bg-orange-l text-orange-d !text-sm">{s}</span>)}</div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold">Dokumen yang sudah kami periksa</h2>
            <p className="text-sm text-muted mt-1">Dokumen asli dicek tim TukangTikung. Sesuai UU PDP, berkas dan NIK lengkap tidak pernah ditampilkan, hanya statusnya.</p>
            <div className="mt-4 divide-y divide-line">
              {['KTP', 'SKCK', 'Foto wajah (liveness)', 'Portofolio 5 pekerjaan', ...(t.skk ? [`SKK ${cat.short} (contoh)`] : []), 'Referensi 2 pelanggan'].map((d) => (
                <div key={d} className="flex justify-between py-2.5 text-sm"><span>{d}</span><span className="chip bg-green-l text-green"><BadgeCheck size={12} /> Terverifikasi</span></div>
              ))}
            </div>
            <div className="text-sm mt-3">NIK <span className="font-mono">3273********{nikTail}</span> <span className="text-muted">(disamarkan)</span></div>
            <p className="text-xs text-muted mt-3 flex gap-1.5"><ShieldAlert size={14} className="shrink-0" /> Verifikasi adalah pemeriksaan dokumen, bukan jaminan perilaku.</p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold">Portofolio</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {t.skills.concat(['Sebelum / sesudah', 'Detail sambungan', 'Serah terima']).slice(0, 6).map((s, i) => (
                <div key={s} className={`aspect-[4/3] rounded-xl grid place-items-center text-center p-3 ${i % 3 === 0 ? 'bg-ink text-white' : i % 3 === 1 ? 'bg-paper-2' : 'bg-orange-l text-orange-d'}`}>
                  <div><ImageIcon size={22} className="mx-auto opacity-60" /><div className="text-xs font-semibold mt-2">{s}</div><div className="text-[10px] opacity-60">foto contoh</div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold">Ulasan pelanggan</h2>
            <div className="mt-4 space-y-4">
              {reviews.map((r) => (
                <div key={r.who} className="border-b border-line last:border-0 pb-4 last:pb-0">
                  <div className="flex justify-between text-sm"><span className="font-semibold">{r.who}</span><Stars value={r.rating.toFixed(1)} /></div>
                  <p className="text-sm text-ink-2 mt-1">{r.text}</p>
                  <div className="text-xs text-muted mt-1">{r.when} · ulasan contoh</div>
                </div>
              ))}
            </div>
            {!showAll && <button onClick={() => setShowAll(true)} className="btn btn-ghost text-sm mt-4">Lihat ulasan lainnya</button>}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit space-y-4">
          <div className="card p-5">
            <div className="text-xs text-muted">Tarif</div>
            <div className="font-display text-2xl font-bold">{formatPrice(t)}</div>
            <div className="text-sm text-ink-2 mt-1">Siap mulai {t.ready} 2026</div>
            <div className="mt-4 bg-paper-2 rounded-lg p-3 text-sm flex gap-2"><Phone size={16} className="shrink-0 mt-0.5" /><div><b>Nomor HP disembunyikan</b><div className="text-muted text-xs">Tampil setelah jadwal dikonfirmasi tukang.</div></div></div>
            {t.tipe.includes('Harian') && <button onClick={() => setModal(true)} className="btn btn-primary w-full mt-4">Pesan jadwal harian</button>}
            {t.tipe.includes('Borongan') && <Link to={`/proyek/baru?tukang=${t.id}`} className={`btn w-full mt-2 ${t.tipe.includes('Harian') ? 'btn-ghost' : 'btn-primary'}`}>Minta survei & RAB</Link>}
            <button onClick={() => setToast('Profil disimpan ke daftar favorit.')} className="btn btn-ghost w-full mt-2 text-sm"><Heart size={16} /> Simpan profil</button>
            <p className="text-xs text-muted mt-4">Biaya layanan 5% dibayar pelanggan hanya bila order berjalan. Tukang mandiri tidak dipungut biaya.</p>
          </div>
          <div className="card p-5 text-sm">
            <div className="font-semibold">{t.mitra ? 'Bagian dari tim mitra kontraktor' : 'Tukang mandiri'}</div>
            <p className="text-ink-2 mt-1">{t.mitra ? `Kontrak dan garansi pekerjaan ditanggung ${t.mitra.name} sesuai perjanjian.` : 'Kontrak dibuat langsung antara Anda dan tukang dengan templat TukangTikung. Garansi kerja 7–30 hari sesuai kategori, plus mediasi bila ada sengketa.'}</p>
            <p className="mt-3 text-red text-xs font-semibold">Bayar hanya lewat TukangTikung. Jangan transfer ke rekening pribadi.</p>
          </div>
        </aside>
      </div>

      {modal && (
        <div className="fixed inset-0 z-40 bg-black/40 grid place-items-center p-4" onClick={() => setModal(false)}>
          <form onSubmit={book} className="card p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold">Pesan {t.name}</h3>
            <p className="text-sm text-muted">{cat.name} · {formatPrice(t)}</p>
            <label className="block mt-4 text-sm font-semibold">Masalahnya apa?<textarea required className="input mt-1" rows={3} defaultValue={`Contoh: ${t.skills[0].toLowerCase()} di rumah, perlu dicek dulu.`} /></label>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <label className="text-sm font-semibold">Tanggal<input type="date" className="input mt-1" defaultValue="2026-11-14" /></label>
              <label className="text-sm font-semibold">Jam<select className="input mt-1"><option>08.00</option><option>10.00</option><option>13.00</option><option>15.00</option></select></label>
            </div>
            <label className="block mt-3 text-sm font-semibold">Alamat<input className="input mt-1" defaultValue="Jl. Antapani Lama No. 12, Bandung" /></label>
            <div className="mt-4 bg-paper-2 rounded-lg p-3 text-xs text-ink-2">Estimasi dibayar ke escrow setelah tukang konfirmasi. Tambahan biaya di lokasi wajib diajukan lewat aplikasi.</div>
            <div className="flex gap-2 mt-5"><button type="button" onClick={() => setModal(false)} className="btn btn-ghost flex-1">Batal</button><button className="btn btn-primary flex-1">Kirim permintaan</button></div>
          </form>
        </div>
      )}
      <Toast msg={toast} onClose={() => setToast('')} />
    </main>
  )
}
