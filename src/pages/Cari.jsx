import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { CATEGORIES, CITIES, TUKANG } from '../data'
import { TukangCard, DataContoh } from '../components/ui'

export default function Cari() {
  const [sp, setSp] = useSearchParams()
  const cat = sp.get('kategori') || ''
  const city = sp.get('kota') || ''
  const [tipe, setTipe] = useState('')
  const [verif, setVerif] = useState('')
  const [sort, setSort] = useState('rating')
  const [showFilter, setShowFilter] = useState(false)

  const set = (k, v) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n) }

  const list = useMemo(() => {
    let l = TUKANG.filter((t) => (!cat || t.category === cat) && (!city || t.city === city))
    if (tipe === 'harian') l = l.filter((t) => t.tipe.includes('Harian'))
    if (tipe === 'borongan') l = l.filter((t) => t.tipe.includes('Borongan'))
    if (verif === 'skk') l = l.filter((t) => t.skk)
    if (verif === 'mitra') l = l.filter((t) => t.mitra)
    if (verif === 'mandiri') l = l.filter((t) => !t.mitra)
    const s = { rating: (a, b) => b.rating - a.rating, murah: (a, b) => a.lo - b.lo, pengalaman: (a, b) => b.exp - a.exp, jarak: (a, b) => a.distance - b.distance }[sort]
    return [...l].sort(s)
  }, [cat, city, tipe, verif, sort])

  const catObj = CATEGORIES.find((c) => c.id === cat)
  const reset = () => { setSp({}); setTipe(''); setVerif('') }

  const Filters = (
    <div className="space-y-5 text-sm">
      <div>
        <div className="font-semibold mb-2">Kategori</div>
        <div className="space-y-1">
          <button onClick={() => set('kategori', '')} className={`w-full text-left px-3 py-1.5 rounded-lg ${!cat ? 'bg-ink text-white' : 'hover:bg-paper-2'}`}>Semua tukang</button>
          {CATEGORIES.map((c) => <button key={c.id} onClick={() => set('kategori', c.id)} className={`w-full text-left px-3 py-1.5 rounded-lg ${cat === c.id ? 'bg-ink text-white' : 'hover:bg-paper-2'}`}>{c.name}</button>)}
        </div>
      </div>
      <label className="block"><span className="font-semibold">Kota</span>
        <select className="input mt-2" value={city} onChange={(e) => set('kota', e.target.value)}><option value="">Semua kota</option>{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
      </label>
      <label className="block"><span className="font-semibold">Tipe pekerjaan</span>
        <select className="input mt-2" value={tipe} onChange={(e) => setTipe(e.target.value)}><option value="">Semua</option><option value="harian">Bisa harian</option><option value="borongan">Bisa borongan</option></select>
      </label>
      <label className="block"><span className="font-semibold">Status</span>
        <select className="input mt-2" value={verif} onChange={(e) => setVerif(e.target.value)}><option value="">Semua terverifikasi</option><option value="skk">Bersertifikat SKK/BNSP</option><option value="mitra">Tim mitra kontraktor</option><option value="mandiri">Tukang mandiri</option></select>
      </label>
      <button onClick={reset} className="text-muted underline">Reset filter</button>
    </div>
  )

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-4xl font-bold">{catObj ? catObj.name : 'Semua tukang'}{city && <span className="text-muted"> di {city}</span>}</h1>
          <p className="text-ink-2 mt-1">{list.length} tukang terverifikasi ditemukan. <DataContoh /></p>
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={() => setShowFilter(true)} className="btn btn-ghost text-sm lg:hidden"><SlidersHorizontal size={16} /> Filter</button>
          <select className="input !w-auto text-sm" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="rating">Rating tertinggi</option><option value="murah">Tarif termurah</option><option value="pengalaman">Paling berpengalaman</option><option value="jarak">Terdekat</option>
          </select>
        </div>
      </div>

      {catObj?.borongan && (
        <div className="mt-6 card p-4 flex flex-wrap items-center justify-between gap-3 !bg-orange-l !border-orange/30">
          <div className="text-sm"><b>Proyek renovasi?</b> Ajukan sekali, hingga 3 mitra survei dan mengirim RAB untuk Anda bandingkan.</div>
          <Link to="/proyek/baru" className="btn btn-primary text-sm">Ajukan proyek borongan</Link>
        </div>
      )}

      <div className="mt-8 grid lg:grid-cols-[220px_1fr] gap-8">
        <aside className="hidden lg:block">{Filters}</aside>
        <div>
          {list.length === 0 ? (
            <div className="card p-10 text-center"><div className="font-semibold">Belum ada tukang yang cocok.</div><p className="text-sm text-muted mt-1">Coba kota lain atau longgarkan filter.</p><button onClick={reset} className="btn btn-dark mt-4 text-sm">Reset filter</button></div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">{list.map((t) => <TukangCard key={t.id} t={t} />)}</div>
          )}
        </div>
      </div>

      {showFilter && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setShowFilter(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-paper p-5 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4"><div className="font-display text-xl font-bold">Filter</div><button onClick={() => setShowFilter(false)}><X /></button></div>
            {Filters}
          </div>
        </div>
      )}
    </main>
  )
}
