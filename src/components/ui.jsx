import { useState, createContext, useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import * as Icons from '../icons'
import { CATEGORIES, formatPrice } from '../data'

export const Icon = ({ name, ...p }) => {
  const C = Icons[name] || Icons.Wrench
  return <C {...p} />
}

const SessionCtx = createContext(null)
export function SessionProvider({ children }) {
  const read = () => { try { return localStorage.getItem('tt-role') } catch { return null } }
  const [role, setRoleState] = useState(read)
  const setRole = (r) => { setRoleState(r); try { r ? localStorage.setItem('tt-role', r) : localStorage.removeItem('tt-role') } catch {} }
  return <SessionCtx.Provider value={{ role, setRole }}>{children}</SessionCtx.Provider>
}
export const useSession = () => useContext(SessionCtx)

export const ROLES = {
  pelanggan: { label: 'Pelanggan', name: 'Bu Rina Kartika', icon: 'House' },
  mitra: { label: 'Mitra kontraktor', name: 'CV Karya Tikung Nusantara', icon: 'Building2' },
  tukang: { label: 'Tukang mandiri', name: 'Asep S.', icon: 'HardHat' },
  admin: { label: 'Admin platform', name: 'Tim TukangTikung', icon: 'ShieldCheck' },
}

export function Logo({ light }) {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="TukangTikung beranda">
      <svg width="30" height="30" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill={light ? '#fff' : '#1f2328'} /><path d="M8 22 L16 9 L24 22" fill="none" stroke="#f26a1b" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /><rect x="13" y="17" width="6" height="5" fill={light ? '#1f2328' : '#f5f1ea'} /></svg>
      <span className={`font-display text-xl font-extrabold ${light ? 'text-white' : ''}`}>Tukang<span className="text-orange">Tikung</span></span>
    </Link>
  )
}

export function Header() {
  const { role, setRole } = useSession()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const link = ({ isActive }) => `px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-paper-2' : 'hover:bg-paper-2'}`
  return (
    <>
      <div className="bg-ink text-white text-xs text-center py-1.5 px-4">
        Demo klikabel. Semua nama, dokumen, harga, dan angka adalah <b className="text-orange">data contoh</b>. Bukan layanan nyata.
      </div>
      <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur border-b border-line">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
          <Logo />
          <span className="chip bg-orange-l text-orange-d hidden sm:inline-flex">Demo</span>
          <nav className="hidden md:flex items-center gap-1 ml-auto">
            <NavLink to="/cari" className={link}>Cari tukang</NavLink>
            <NavLink to="/proyek/baru" className={link}>Proyek borongan</NavLink>
            <Link to="/#cara-kerja" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-paper-2">Cara kerja</Link>
            <NavLink to="/masuk?peran=mitra" className={link}>Untuk mitra</NavLink>
          </nav>
          <div className="ml-auto md:ml-2 flex items-center gap-2">
            {role ? (
              <div className="relative">
                <button onClick={() => setOpen(!open)} className="btn btn-ghost !py-2 text-sm">
                  <Icon name={ROLES[role].icon} size={16} /> {ROLES[role].label} <Icons.ChevronDown size={14} />
                </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-56 card p-1 shadow-lg" onMouseLeave={() => setOpen(false)}>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-paper-2 text-sm" onClick={() => { setOpen(false); nav(`/app/${role}`) }}>Dashboard</button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-paper-2 text-sm" onClick={() => { setOpen(false); nav('/masuk') }}>Ganti peran</button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-paper-2 text-sm text-red" onClick={() => { setOpen(false); setRole(null); nav('/') }}>Keluar</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/masuk" className="btn btn-dark !py-2 text-sm whitespace-nowrap">Masuk demo</Link>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export function Footer() {
  return (
    <footer className="bg-ink text-white/80 mt-20">
      <div className="hazard h-2" />
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8 text-sm">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-3 max-w-sm">Marketplace tukang terverifikasi. Harga jelas di depan, uang aman sampai pekerjaan beres. Sebuah konsep dari Nagara Digital Lab Indonesia (NADI).</p>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Layanan</div>
          <ul className="space-y-1">{CATEGORIES.slice(0, 5).map((c) => <li key={c.id}><Link to={`/cari?kategori=${c.id}`} className="hover:text-orange">{c.name}</Link></li>)}</ul>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Demo</div>
          <ul className="space-y-1">
            <li><Link to="/masuk" className="hover:text-orange">Masuk sesuai peran</Link></li>
            <li><Link to="/proyek/baru" className="hover:text-orange">Ajukan proyek borongan</Link></li>
            <li><Link to="/daftar-tukang" className="hover:text-orange">Daftar sebagai tukang</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 text-xs text-center py-4 text-white/50">© 2026 TukangTikung (demo). Data contoh, bukan layanan nyata.</div>
    </footer>
  )
}

export const Avatar = ({ name, size = 48, tone = 'orange' }) => {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  const tones = { orange: 'bg-orange-l text-orange-d', dark: 'bg-ink text-white', blue: 'bg-blue-l text-blue', green: 'bg-green-l text-green' }
  return <div className={`rounded-xl grid place-items-center font-display font-bold shrink-0 ${tones[tone]}`} style={{ width: size, height: size, fontSize: size * 0.36 }}>{initials}</div>
}

export const Stars = ({ value, count }) => (
  <span className="inline-flex items-center gap-1 text-sm font-semibold"><Icons.Star size={14} className="fill-orange text-orange" />{String(value).replace('.', ',')}{count != null && <span className="text-muted font-normal">({count})</span>}</span>
)

export const DataContoh = () => <span className="chip bg-paper-2 text-muted">Data contoh</span>

export function TukangCard({ t }) {
  const cat = CATEGORIES.find((c) => c.id === t.category)
  const tones = ['orange', 'blue', 'green', 'dark']
  return (
    <Link to={`/tukang/${t.id}`} className="card p-4 flex flex-col gap-3 hover:border-ink hover:-translate-y-0.5 transition">
      <div className="flex gap-3">
        <Avatar name={t.name} tone={tones[parseInt(t.id.slice(1)) % 4]} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="font-semibold truncate">{t.name}</div>
            <Stars value={t.rating} count={t.reviews} />
          </div>
          <div className="text-sm text-muted flex items-center gap-1"><Icon name={cat.icon} size={14} /> {cat.short} · {t.city} · {t.exp} th</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">{t.skills.map((s) => <span key={s} className="chip bg-paper-2 text-ink-2">{s}</span>)}</div>
      <div className="text-sm font-semibold">{formatPrice(t)}</div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted">Siap mulai {t.ready} · {t.tipe}</span>
      </div>
      <div className="flex flex-wrap gap-1 pt-2 border-t border-line">
        <span className="chip bg-green-l text-green"><Icons.BadgeCheck size={12} /> Terverifikasi</span>
        {t.skk && <span className="chip bg-blue-l text-blue"><Icons.Award size={12} /> SKK</span>}
        <span className="chip bg-paper-2 text-ink-2">{t.mitra ? 'Mitra kontraktor' : 'Mandiri'}</span>
      </div>
    </Link>
  )
}

export function StatusChip({ s }) {
  const map = {
    cair: ['bg-green-l text-green', 'Sudah cair'],
    review: ['bg-orange-l text-orange-d', 'Menunggu persetujuan'],
    ditahan: ['bg-paper-2 text-muted', 'Ditahan di escrow'],
  }
  const [cls, label] = map[s] || ['bg-paper-2', s]
  return <span className={`chip ${cls}`}>{label}</span>
}

export function Toast({ msg, onClose }) {
  if (!msg) return null
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-ink text-white rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 text-sm max-w-[92vw]">
      <Icons.CheckCircle2 size={18} className="text-orange shrink-0" /> {msg}
      <button onClick={onClose} className="text-white/60 hover:text-white"><Icons.X size={16} /></button>
    </div>
  )
}
