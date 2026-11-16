import { useMemo, useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react'
import { CATEGORIES, CITIES, TUKANG, formatPrice, reviewsFor } from '../data'
import { Stars } from '../components/ui'
import { Avatar } from '../components/art'

const PER_PAGE = 12

export default function Cari() {
  const [sp, setSp] = useSearchParams()
  const cat = sp.get('kategori') || ''
  const city = sp.get('kota') || ''
  const q = sp.get('q') || ''
  const [harian, setHarian] = useState(false)
  const [borongan, setBorongan] = useState(false)
  const [soon, setSoon] = useState(false)
  const [skk, setSkk] = useState(false)
  const [mitra, setMitra] = useState('')
  const [sort, setSort] = useState('cocok')
  const [page, setPage] = useState(1)
  const [showFilter, setShowFilter] = useState(false)

  const set = (k, v) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n) }
  useEffect(() => { setPage(1) }, [cat, city, q, harian, borongan, soon, skk, mitra, sort])

  const list = useMemo(() => {
    let l = TUKANG.filter((t) => (!cat || t.category === cat) && (!city || t.city === city))
    if (q) { const s = q.toLowerCase(); l = l.filter((t) => [t.fullName, t.area, ...t.skills, ...t.portfolio].join(' ').toLowerCase().includes(s)) }
    if (harian) l = l.filter((t) => t.tipe.includes('Harian'))
    if (borongan) l = l.filter((t) => t.tipe.includes('Borongan'))
    if (soon) l = l.filter((t) => t.readySoon)
    if (skk) l = l.filter((t) => t.skk)
    if (mitra === 'mitra') l = l.filter((t) => t.mitra)
    if (mitra === 'mandiri') l = l.filter((t) => !t.mitra)
    const s = { cocok: (a, b) => b.rating * Math.log(b.reviews + 2) - a.rating * Math.log(a.reviews + 2), rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews, murah: (a, b) => a.lo - b.lo, dekat: (a, b) => a.distance - b.distance, pengalaman: (a, b) => b.exp - a.exp }[sort]
    return [...l].sort(s)
  }, [cat, city, q, harian, borongan, soon, skk, mitra, sort])

  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const shown = list.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const catObj = CATEGORIES.find((c) => c.id === cat)
  const reset = () => { setSp({}); setHarian(false); setBorongan(false); setSoon(false); setSkk(false); setMitra('') }
  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const Check = ({ checked, onChange, children }) => (
    <label className="flex gap-2.5 items-center py-1.5 cursor-pointer"><input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="w-[18px] h-[18px] accent-[#C2410C]" />{children}</label>
  )
  const Filters = (
    <div className="flex flex-col gap-6 text-[15px]">
      <label className="block"><span className="font-extrabold">Kota</span>
        <select className="input mt-2" value={city} onChange={(e) => set('kota', e.target.value)}><option value="">Semua kota</option>{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
      </label>
      <fieldset><legend className="font-extrabold mb-2">Tipe pekerjaan</legend><Check checked={harian} onChange={setHarian}>Bisa dipanggil harian</Check><Check checked={borongan} onChange={setBorongan}>Bisa borongan</Check></fieldset>
      <fieldset><legend className="font-extrabold mb-2">Kapan mulai</legend><Check checked={soon} onChange={setSoon}>Siap minggu ini</Check></fieldset>
      <fieldset><legend className="font-extrabold mb-2">Status</legend><Check checked={skk} onChange={setSkk}>Bersertifikat SKK / BNSP</Check>
        <div className="flex flex-col mt-1">{[['', 'Semua'], ['mandiri', 'Tukang mandiri'], ['mitra', 'Tim mitra kontraktor']].map(([v, l]) => <label key={v} className="flex gap-2.5 items-center py-1.5 cursor-pointer"><input type="radio" name="mitra" checked={mitra === v} onChange={() => setMitra(v)} className="w-[18px] h-[18px] accent-[#C2410C]" />{l}</label>)}</div>
      </fieldset>
      <button onClick={reset} className="text-left text-ink-2 underline">Hapus semua filter</button>
      <div className="bg-soft rounded-2xl p-[18px] text-sm leading-relaxed text-ink-2">
        <div className="font-extrabold text-ink text-[15px]">Proyek renovasi?</div>
        Ajukan sekali, hingga 3 mitra survei dan mengirim rincian biaya untuk dibandingkan.
        <Link to="/proyek/baru" className="block mt-2.5 font-bold text-orange hover:text-orange-d">Ajukan proyek borongan</Link>
      </div>
    </div>
  )

  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
      <nav aria-label="Jejak" className="text-sm text-muted"><Link to="/" className="hover:text-ink">Beranda</Link> / <span className="text-ink">Cari tukang</span></nav>
      <div className="mt-3 flex flex-wrap justify-between items-end gap-4">
        <div>
          <h1 className="text-[30px] md:text-4xl font-extrabold">{catObj ? catObj.name : q ? `“${q}”` : 'Semua tukang'}{city && <span className="text-muted font-bold"> di {city}</span>}</h1>
          <p className="mt-1.5 text-ink-2">{list.length} tukang terverifikasi · data contoh</p>
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={() => setShowFilter(true)} className="btn btn-ghost text-sm lg:hidden"><SlidersHorizontal size={16} /> Filter</button>
          <label className="flex items-center gap-2 text-sm text-ink-2">Urutkan
            <select className="input !w-auto !py-2 text-sm font-semibold text-ink" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="cocok">Paling cocok</option><option value="rating">Rating tertinggi</option><option value="murah">Tarif termurah</option><option value="dekat">Terdekat</option><option value="pengalaman">Paling berpengalaman</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Jenis tukang">
        <button className="pill" aria-pressed={!cat} onClick={() => set('kategori', '')}>Semua</button>
        {CATEGORIES.map((c) => <button key={c.id} className="pill" aria-pressed={cat === c.id} onClick={() => set('kategori', c.id)}>{c.short}</button>)}
      </div>

      <div className="mt-7 flex flex-wrap gap-8 items-start">
        <aside className="hidden lg:block flex-[1_1_240px] max-w-[270px]" aria-label="Filter">{Filters}</aside>
        <div className="flex-[999_1_560px] min-w-0 flex flex-col gap-4">
          {shown.length === 0 && (
            <div className="border border-dashed border-line-2 rounded-[18px] p-10 text-center">
              <div className="text-lg font-extrabold">Belum ada tukang yang cocok</div>
              <p className="mt-1.5 text-ink-2">Coba kota lain, longgarkan filter, atau ajukan proyek borongan agar mitra di sekitar Anda yang menawarkan.</p>
              <button onClick={reset} className="btn btn-dark mt-4">Hapus semua filter</button>
            </div>
          )}
          {shown.map((t) => {
            const c = CATEGORIES.find((x) => x.id === t.category)
            const rv = reviewsFor(t, 1)[0]
            return (
              <article key={t.id} className="card lift !rounded-[18px] p-5 flex flex-wrap gap-5">
                <Link to={`/tukang/${t.id}`} aria-label={`Profil ${t.name}`}><Avatar look={t.look} photo={t.photo} focus={t.photoFocus} size={96} rounded={16} label={`Foto contoh ${t.name}`} /></Link>
                <div className="flex-[1_1_280px] min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link to={`/tukang/${t.id}`} className="text-[19px] font-extrabold hover:underline">{t.fullName}</Link>
                    <span className="chip bg-green-l text-green"><ShieldCheck size={13} /> Terverifikasi</span>
                    {t.skk && <span className="chip bg-blue-l text-blue">SKK</span>}
                    {t.mitra && <span className="chip bg-paper-2 text-ink-2">Tim {t.mitra.name}</span>}
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-3.5 gap-y-1 text-sm text-ink-2">
                    <Stars value={t.rating} count={`${t.reviews} ulasan`} /><span>{c.short}</span><span>{t.exp} tahun</span><span>{t.jobs} order</span><span>{t.area}, {t.city} · {String(t.distance).replace('.', ',')} km</span>
                  </div>
                  {rv && <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">“{rv.text}” <span className="text-muted">· {rv.who}</span></p>}
                </div>
                <div className="flex-[0_1_200px] ml-auto flex flex-col items-end justify-between gap-3">
                  <div className="text-right"><div className="text-lg font-extrabold">{formatPrice(t)}</div><div className="text-[13px] text-muted">Siap {t.ready} · balas {t.response}</div></div>
                  <Link to={`/tukang/${t.id}`} className="btn btn-primary text-[15px]">Lihat profil</Link>
                </div>
              </article>
            )
          })}
          {pages > 1 && (
            <nav className="mt-4 flex flex-wrap items-center justify-center gap-1.5" aria-label="Halaman hasil">
              <button className="btn btn-ghost !px-3" disabled={page === 1} onClick={() => go(page - 1)} aria-label="Sebelumnya"><ChevronLeft size={18} /></button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => go(p)} aria-current={p === page ? 'page' : undefined} className={`w-11 h-11 rounded-xl text-[15px] font-bold ${p === page ? 'bg-ink text-white' : 'hover:bg-soft'}`}>{p}</button>
              ))}
              <button className="btn btn-ghost !px-3" disabled={page === pages} onClick={() => go(page + 1)} aria-label="Berikutnya"><ChevronRight size={18} /></button>
              <span className="w-full text-center text-sm text-muted mt-2">Menampilkan {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, list.length)} dari {list.length}</span>
            </nav>
          )}
        </div>
      </div>

      {showFilter && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setShowFilter(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-[86vw] max-w-sm bg-white p-5 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5"><div className="text-xl font-extrabold">Filter</div><button onClick={() => setShowFilter(false)} aria-label="Tutup filter" className="w-11 h-11 grid place-items-center"><X /></button></div>
            {Filters}
            <button onClick={() => setShowFilter(false)} className="btn btn-dark w-full mt-6">Tampilkan {list.length} tukang</button>
          </div>
        </div>
      )}
    </main>
  )
}
