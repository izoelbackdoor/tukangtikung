import { useState, createContext, useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown, Star, ShieldCheck, CheckCircle2, X, Menu } from 'lucide-react'
import * as Icons from '../icons'
import { CATEGORIES, formatPrice } from '../data'
import { Avatar as ArtAvatar } from './art'

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
  tukang: { label: 'Tukang mandiri', name: 'Asep Suryana', icon: 'HardHat' },
  admin: { label: 'Admin platform', name: 'Tim TukangTikung', icon: 'ShieldCheck' },
}

export function Logo({ light, size = 34 }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="TukangTikung beranda">
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill={light ? '#fff' : '#17191C'} /><path d="M8 22 L16 9 L24 22" fill="none" stroke="#F26A1B" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /><rect x="13" y="17" width="6" height="5" fill={light ? '#17191C' : '#fff'} /></svg>
      <span className={`text-[21px] font-extrabold tracking-[-0.02em] ${light ? 'text-white' : 'text-ink'}`}>Tukang<span className={light ? 'text-brand' : 'text-[#E2560C]'}>Tikung</span></span>
    </Link>
  )
}

export function Header() {
  const { role, setRole } = useSession()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const [mob, setMob] = useState(false)
  const cls = ({ isActive }) => `navlink ${isActive ? 'active' : ''}`
  return (
    <>
      <div className="bg-ink text-[#E6E8EB] text-[13px] text-center py-2 px-4">Demo klikabel. Semua nama, harga, ulasan, foto, dan angka adalah data contoh.</div>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-line">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-[72px] flex items-center gap-6">
          <Logo />
          <nav className="hidden lg:flex items-center gap-1" aria-label="Utama">
            <NavLink to="/cari" className={cls}>Cari tukang</NavLink>
            <NavLink to="/proyek/baru" className={cls}>Proyek borongan</NavLink>
            <Link to="/#cara-kerja" className="navlink">Cara kerja</Link>
            <NavLink to="/masuk?peran=mitra" className={cls}>Untuk mitra</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            {!role && <Link to="/daftar-tukang" className="navlink hidden md:inline-flex">Daftar sebagai tukang</Link>}
            {role ? (
              <div className="relative">
                <button onClick={() => setOpen(!open)} className="btn btn-ghost !py-2 text-sm" aria-expanded={open}>
                  <Icon name={ROLES[role].icon} size={16} /> <span className="hidden sm:inline">{ROLES[role].label}</span> <ChevronDown size={14} />
                </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-56 card p-1 shadow-lg" onMouseLeave={() => setOpen(false)}>
                    <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-soft text-sm" onClick={() => { setOpen(false); nav(`/app/${role}`) }}>Dashboard</button>
                    <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-soft text-sm" onClick={() => { setOpen(false); nav('/masuk') }}>Ganti peran</button>
                    <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-soft text-sm text-red" onClick={() => { setOpen(false); setRole(null); nav('/') }}>Keluar</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/masuk" className="btn btn-outline !py-2 text-[15px]">Masuk</Link>
            )}
            <button className="lg:hidden w-11 h-11 rounded-xl border border-line-2 grid place-items-center" aria-label="Buka menu" aria-expanded={mob} onClick={() => setMob(!mob)}>{mob ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        {mob && (
          <nav className="lg:hidden border-t border-line px-4 py-3 flex flex-col gap-1" aria-label="Menu HP" onClick={() => setMob(false)}>
            <NavLink to="/cari" className={cls}>Cari tukang</NavLink>
            <NavLink to="/proyek/baru" className={cls}>Proyek borongan</NavLink>
            <Link to="/#cara-kerja" className="navlink">Cara kerja</Link>
            <NavLink to="/masuk?peran=mitra" className={cls}>Untuk mitra</NavLink>
            <NavLink to="/daftar-tukang" className={cls}>Daftar sebagai tukang</NavLink>
          </nav>
        )}
      </header>
    </>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-soft mt-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-10 flex flex-wrap gap-8 justify-between text-sm text-ink-2">
        <div className="max-w-xs">
          <Logo size={28} />
          <p className="mt-3 leading-relaxed">Marketplace tukang terverifikasi. Konsep dari Nagara Digital Lab Indonesia (NADI). Demo, bukan layanan nyata.</p>
        </div>
        <div className="flex gap-12 flex-wrap">
          <div className="flex flex-col gap-2"><span className="font-bold text-ink">Layanan</span>{CATEGORIES.slice(0, 5).map((c) => <Link key={c.id} to={`/cari?kategori=${c.id}`} className="hover:text-ink">{c.name}</Link>)}</div>
          <div className="flex flex-col gap-2"><span className="font-bold text-ink">Bergabung</span><Link to="/daftar-tukang" className="hover:text-ink">Daftar tukang</Link><Link to="/masuk?peran=mitra" className="hover:text-ink">Mitra kontraktor</Link><Link to="/proyek/baru" className="hover:text-ink">Ajukan borongan</Link><Link to="/masuk" className="hover:text-ink">Masuk demo</Link></div>
        </div>
      </div>
      <div className="border-t border-line text-xs text-center py-4 text-muted">© 2026 TukangTikung (demo). Data, foto, dan ilustrasi adalah contoh.</div>
    </footer>
  )
}

export const Stars = ({ value, count, size = 14 }) => (
  <span className="inline-flex items-center gap-1 text-sm font-bold"><Star size={size} className="fill-ink text-ink" />{String(value).replace('.', ',')}{count != null && <span className="text-muted font-normal">({count})</span>}</span>
)

export const DataContoh = () => <span className="chip bg-paper-2 text-ink-2">Data contoh</span>
export const Verified = ({ small }) => <span className={`chip bg-green-l text-green ${small ? '' : '!text-[13px] !py-1.5 !px-2.5'}`}><ShieldCheck size={small ? 12 : 14} /> Terverifikasi</span>

export function TukangCard({ t }) {
  const cat = CATEGORIES.find((c) => c.id === t.category)
  return (
    <Link to={`/tukang/${t.id}`} className="card lift overflow-hidden flex flex-col text-ink">
      <div className="relative">
        {t.photo ? <img src={t.photo} alt={`Foto contoh ${t.name}`} loading="lazy" className="h-[150px] w-full object-cover object-top" /> : (
        <div className="h-[150px] grid place-items-end justify-center" style={{ background: t.look.bg }}>
          <ArtAvatar look={t.look} size={140} rounded={0} label={`Ilustrasi ${t.name}`} />
        </div>)}
        <span className="absolute left-3 top-3"><Verified small /></span>
        {t.skk && <span className="absolute right-3 top-3 chip bg-white text-blue">SKK</span>}
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <div className="flex justify-between gap-2 items-baseline"><span className="text-[17px] font-extrabold truncate">{t.name}</span><Stars value={t.rating} count={t.reviews} /></div>
        <span className="text-sm text-ink-2">{cat.name} · {t.exp} tahun</span>
        <span className="text-sm text-muted">{t.area}, {t.city} · siap {t.ready}</span>
        <span className="text-base font-extrabold mt-1">{formatPrice(t)}</span>
      </div>
    </Link>
  )
}

export function StatusChip({ s }) {
  const map = { cair: ['bg-green-l text-green', 'Sudah cair'], review: ['bg-orange-l text-orange-d', 'Menunggu persetujuan'], ditahan: ['bg-paper-2 text-ink-2', 'Ditahan'] }
  const [cls, label] = map[s] || ['bg-paper-2', s]
  return <span className={`chip ${cls}`}>{label}</span>
}

export function Toast({ msg, onClose }) {
  if (!msg) return null
  return (
    <div role="status" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-ink text-white rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 text-sm max-w-[92vw]">
      <CheckCircle2 size={18} className="text-brand shrink-0" /> {msg}
      <button onClick={onClose} className="text-white/70 hover:text-white" aria-label="Tutup"><X size={16} /></button>
    </div>
  )
}

export const Avatar = ({ name, size = 48, tone = 'orange' }) => {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  const tones = { orange: 'bg-orange-l text-orange-d', dark: 'bg-ink text-white', blue: 'bg-blue-l text-blue', green: 'bg-green-l text-green' }
  return <div className={`rounded-xl grid place-items-center font-extrabold shrink-0 ${tones[tone]}`} style={{ width: size, height: size, fontSize: size * 0.36 }}>{initials}</div>
}
