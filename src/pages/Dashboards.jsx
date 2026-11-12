import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Navigate, Link } from 'react-router-dom'
import * as I from '../icons'
import { PROJECTS, DAILY_ORDERS, RAB_OFFERS, MITRA, TUKANG, CATEGORIES, rupiah } from '../data'
import { useSession, ROLES, Avatar, Stars, StatusChip, Toast, DataContoh, Icon } from '../components/ui'
import { WorkArt, Avatar as ArtAvatar } from '../components/art'

const TABS = {
  pelanggan: [['ringkasan', 'Ringkasan', 'LayoutDashboard'], ['proyek', 'Proyek borongan', 'Ruler'], ['rab', 'RAB masuk', 'ClipboardList'], ['harian', 'Order harian', 'CalendarCheck'], ['garansi', 'Garansi & klaim', 'ShieldCheck']],
  mitra: [['ringkasan', 'Ringkasan', 'LayoutDashboard'], ['leads', 'Permintaan survei', 'Inbox'], ['rabbuilder', 'Buat RAB', 'Calculator'], ['proyek', 'Proyek berjalan', 'HardHat'], ['tim', 'Tim tukang', 'Users'], ['legal', 'Legalitas & deposit', 'FileCheck']],
  tukang: [['ringkasan', 'Ringkasan', 'LayoutDashboard'], ['order', 'Order masuk', 'Inbox'], ['jadwal', 'Jadwal', 'CalendarDays'], ['pendapatan', 'Pendapatan', 'Wallet'], ['dokumen', 'Dokumen & profil', 'FileCheck']],
  admin: [['ringkasan', 'Statistik', 'BarChart3'], ['verifikasi', 'Antrian verifikasi', 'BadgeCheck'], ['sengketa', 'Sengketa', 'Scale'], ['pencairan', 'Pencairan escrow', 'Banknote']],
}

const Stat = ({ label, value, sub, icon, tone = 'orange' }) => (
  <div className="card p-4">
    <div className="flex justify-between items-start"><div className="text-xs text-muted font-semibold uppercase tracking-wide">{label}</div><div className={`w-8 h-8 rounded-lg grid place-items-center ${tone === 'orange' ? 'bg-orange-l text-orange-d' : tone === 'green' ? 'bg-green-l text-green' : 'bg-blue-l text-blue'}`}><Icon name={icon} size={16} /></div></div>
    <div className="text-2xl font-extrabold mt-2">{value}</div>
    {sub && <div className="text-xs text-muted mt-0.5">{sub}</div>}
  </div>
)
const H = ({ children, sub }) => <div className="mb-5"><h2 className="text-2xl font-bold">{children}</h2>{sub && <p className="text-sm text-muted">{sub}</p>}</div>

export default function Dashboard() {
  const { role: param } = useParams()
  const { role, setRole } = useSession()
  const [sp, setSp] = useSearchParams()
  const [toast, setToast] = useState('')
  useEffect(() => { if (TABS[param] && role !== param) setRole(param) }, [param])
  useEffect(() => { window.scrollTo(0, 0) }, [param, sp.get('tab')])
  if (!TABS[param]) return <Navigate to="/masuk" />
  const tab = sp.get('tab') || 'ringkasan'
  const go = (t) => setSp({ tab: t })
  const notify = (m) => setToast(m)
  const props = { tab, go, notify }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[230px_1fr] gap-8">
      <aside className="lg:sticky lg:top-24 h-fit">
        <div className="card p-4 flex items-center gap-3">
          <Avatar name={ROLES[param].name} size={40} tone="dark" />
          <div className="min-w-0"><div className="font-semibold text-sm truncate">{ROLES[param].name}</div><div className="text-xs text-muted">{ROLES[param].label}</div></div>
        </div>
        <nav className="mt-3 flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
          {TABS[param].map(([id, label, icon]) => (
            <button key={id} onClick={() => go(id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${tab === id ? 'bg-ink text-white' : 'hover:bg-paper-2'}`}><Icon name={icon} size={16} />{label}</button>
          ))}
        </nav>
        <div className="mt-4 text-xs text-muted hidden lg:block">Semua data di dashboard ini adalah contoh. <Link to="/masuk" className="underline">Ganti peran</Link></div>
      </aside>
      <section className="min-w-0">
        {param === 'pelanggan' && <Pelanggan {...props} />}
        {param === 'mitra' && <Mitra {...props} />}
        {param === 'tukang' && <Tukang {...props} />}
        {param === 'admin' && <Admin {...props} />}
      </section>
      <Toast msg={toast} onClose={() => setToast('')} />
    </main>
  )
}

/* ---------------- PELANGGAN ---------------- */
function ProjectPanel({ p, notify }) {
  const [termin, setTermin] = useState(p.termin)
  const [openRab, setOpenRab] = useState(false)
  const approve = (i) => {
    setTermin(termin.map((t, j) => (j === i ? { ...t, status: 'cair', note: 'Disetujui hari ini, dana diteruskan ke mitra' } : t)))
    notify(`${termin[i].name} disetujui. ${rupiah(Math.round(p.total * termin[i].pct / 100))} diteruskan ke ${p.mitra.name}.`)
  }
  const escrow = termin.filter((t) => t.status !== 'cair').reduce((s, t) => s + t.pct, 0)
  return (
    <div className="card p-6">
      <div className="flex flex-wrap justify-between gap-3">
        <div>
          <div className="text-xs text-muted font-semibold">{p.id} · {p.address}</div>
          <div className="text-2xl font-extrabold">{p.title}</div>
          <div className="text-sm text-ink-2">{p.mitra.name} · {p.start} – {p.end}</div>
        </div>
        <div className="text-right"><span className={`chip ${p.status === 'Berjalan' ? 'bg-orange-l text-orange-d' : 'bg-green-l text-green'}`}>{p.status}</span><div className="text-xl font-extrabold mt-1">{rupiah(p.total)}</div><div className="text-xs text-muted">{escrow}% masih di escrow</div></div>
      </div>
      <div className="mt-4 h-2.5 rounded-full bg-paper-2 overflow-hidden"><div className="h-full bg-orange" style={{ width: `${p.progress}%` }} /></div>
      <div className="text-xs text-muted mt-1">Progres fisik {p.progress}%</div>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div>
          <div className="font-semibold mb-3">Termin pembayaran</div>
          <div className="space-y-2">
            {termin.map((t, i) => (
              <div key={t.name} className={`border rounded-xl p-3 ${t.status === 'review' ? 'border-orange bg-orange-l/40' : 'border-line'}`}>
                <div className="flex justify-between items-center gap-2"><div className="text-sm font-semibold">{t.name} · {t.pct}%</div><StatusChip s={t.status} /></div>
                <div className="flex justify-between text-xs text-muted mt-1"><span>{t.note}</span><span className="font-semibold text-ink">{rupiah(Math.round(p.total * t.pct / 100))}</span></div>
                {t.status === 'review' && (
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => approve(i)} className="btn btn-primary !py-1.5 text-xs flex-1">Setujui & cairkan</button>
                    <button onClick={() => notify('Keberatan dikirim ke mitra. Termin tetap ditahan sampai diselesaikan.')} className="btn btn-ghost !py-1.5 text-xs flex-1">Ajukan keberatan</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-2">Termin yang tidak ditanggapi 3×24 jam dianggap disetujui.</p>
        </div>
        <div>
          <div className="font-semibold mb-3">Laporan progres</div>
          {p.updates.length ? (
            <ol className="relative border-l-2 border-line ml-2 space-y-4">
              {p.updates.map((u) => (
                <li key={u.date} className="ml-4">
                  <div className="absolute -left-[7px] w-3 h-3 rounded-full bg-orange mt-1.5" />
                  <div className="text-xs text-muted">{u.date} · {u.by}</div>
                  <div className="text-sm">{u.text}</div>
                  <div className="flex gap-1.5 mt-2">{(u.photos || []).map((c, k) => <div key={k} className="w-[84px]"><WorkArt cat={c} seed={k + u.date.length} showTag={false} rounded={8} /></div>)}</div>
                </li>
              ))}
            </ol>
          ) : <div className="text-sm text-muted bg-paper-2 rounded-xl p-4">Proyek sudah serah terima 18 Okt. Masa garansi berjalan sampai 16 Jan 2027.</div>}
        </div>
      </div>

      {p.rab.length > 0 && (
        <div className="mt-6">
          <button onClick={() => setOpenRab(!openRab)} className="text-sm font-semibold flex items-center gap-1">{openRab ? <I.ChevronDown size={16} /> : <I.ChevronRight size={16} />} RAB disepakati ({p.rab.length} item)</button>
          {openRab && (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-left text-xs text-muted border-b border-line"><th className="py-2">Item pekerjaan</th><th>Volume</th><th className="text-right">Harga</th></tr></thead>
                <tbody>{p.rab.map((r) => <tr key={r.item} className="border-b border-line"><td className="py-2">{r.item}</td><td>{r.vol}</td><td className="text-right">{rupiah(r.price)}</td></tr>)}</tbody>
                <tfoot><tr className="font-bold"><td className="py-2" colSpan={2}>Total</td><td className="text-right">{rupiah(p.rab.reduce((s, r) => s + r.price, 0))}</td></tr></tfoot>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Pelanggan({ tab, go, notify }) {
  const [chosen, setChosen] = useState(null)
  if (tab === 'proyek') return <div><H sub="Termin hanya cair setelah Anda menyetujui laporan progres.">Proyek borongan</H><div className="space-y-6">{PROJECTS.map((p) => <ProjectPanel key={p.id} p={p} notify={notify} />)}</div></div>
  if (tab === 'rab') return (
    <div>
      <H sub="Renovasi kamar mandi + area cuci · 14 m² · Jl. Cikutra Baru, Bandung">RAB masuk (3 dari 3)</H>
      <div className="grid md:grid-cols-3 gap-4">
        {RAB_OFFERS.map((o, i) => {
          const min = Math.min(...RAB_OFFERS.map((x) => x.total))
          return (
            <div key={o.mitra.id} className={`card p-5 flex flex-col ${chosen === i ? '!border-green ring-2 ring-green-l' : ''}`}>
              <div className="flex gap-3 items-center"><Avatar name={o.mitra.initials} tone="dark" size={40} /><div><div className="font-semibold text-sm leading-tight">{o.mitra.name}</div><Stars value={o.mitra.rating} count={o.mitra.projects} /></div></div>
              <div className="text-2xl font-extrabold mt-4">{rupiah(o.total)}</div>
              {o.total === min && <span className="chip bg-green-l text-green w-fit mt-1">Termurah</span>}
              <div className="text-sm text-ink-2 mt-3 space-y-1 flex-1">
                <div className="flex gap-2"><I.Clock size={15} className="mt-0.5 shrink-0" /> {o.days} hari kerja</div>
                <div className="flex gap-2"><I.MapPin size={15} className="mt-0.5 shrink-0" /> {o.survey}</div>
                <div className="flex gap-2"><I.Info size={15} className="mt-0.5 shrink-0" /> {o.note}</div>
              </div>
              <div className="text-xs text-muted mt-3">Termin: DP 30% · 40% · 25% · retensi 5%</div>
              {chosen === i ? <div className="btn bg-green text-white mt-4">Dipilih · kontrak dikirim</div> : <button onClick={() => { setChosen(i); notify(`RAB ${o.mitra.name} dipilih. Kontrak digital siap ditandatangani.`) }} className="btn btn-dark mt-4">Pilih RAB ini</button>}
            </div>
          )
        })}
      </div>
      <p className="text-xs text-muted mt-4">Bandingkan per item, bukan hanya total. Selisih harga sering datang dari siapa yang menyediakan material.</p>
    </div>
  )
  if (tab === 'harian') return (
    <div>
      <H>Order harian</H>
      <div className="space-y-3">
        {DAILY_ORDERS.map((o) => {
          const c = CATEGORIES.find((x) => x.id === o.cat)
          return (
            <div key={o.id} className="card p-4 flex flex-wrap gap-4 items-center">
              <div className="w-11 h-11 rounded-xl bg-orange-l text-orange-d grid place-items-center"><Icon name={c.icon} size={20} /></div>
              <div className="flex-1 min-w-[180px]"><div className="font-semibold">{o.title}</div><div className="text-sm text-muted">{o.tukang} · {o.date} · {o.id}</div></div>
              <div className="text-right"><div className="font-semibold">{rupiah(o.amount)}</div><span className={`chip ${o.status === 'Terjadwal' ? 'bg-blue-l text-blue' : 'bg-green-l text-green'}`}>{o.status}</span></div>
              {o.status.startsWith('Selesai') ? <button onClick={() => notify('Terima kasih! Ulasan bintang 5 tersimpan.')} className="btn btn-ghost text-sm">Beri ulasan</button> : <button onClick={() => notify('Chat dibuka (demo).')} className="btn btn-ghost text-sm"><I.MessageCircle size={16} /> Chat</button>}
            </div>
          )
        })}
      </div>
      <Link to="/cari" className="btn btn-primary mt-5">Pesan tukang lagi</Link>
    </div>
  )
  if (tab === 'garansi') return (
    <div>
      <H sub="Klaim diajukan di sini supaya tercatat dan retensi bisa dipakai bila mitra tidak merespons.">Garansi & klaim</H>
      <div className="card p-5">
        <div className="flex justify-between flex-wrap gap-2"><div><div className="font-semibold">Kanopi baja ringan carport</div><div className="text-sm text-muted">CV Baja Ringan Mandiri · garansi s.d. 16 Jan 2027</div></div><span className="chip bg-green-l text-green">Garansi aktif · 65 hari lagi</span></div>
        <div className="mt-4 text-sm">Retensi ditahan: <b>{rupiah(560000)}</b></div>
        <button onClick={() => notify('Klaim garansi dibuat. Mitra wajib merespons dalam 3 hari kerja.')} className="btn btn-dark mt-4 text-sm">Ajukan klaim garansi</button>
      </div>
      <div className="card p-5 mt-4">
        <div className="flex justify-between flex-wrap gap-2"><div><div className="font-semibold">Tambah 3 titik lampu teras</div><div className="text-sm text-muted">Dedi R. · garansi kerja 30 hari s.d. 8 Des 2026</div></div><span className="chip bg-green-l text-green">Garansi aktif</span></div>
      </div>
    </div>
  )
  return (
    <div>
      <H sub="Selamat siang, Bu Rina. Ada 1 hal yang menunggu keputusan Anda.">Ringkasan</H>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <Stat label="Proyek aktif" value="1" sub="Renovasi dapur · 55%" icon="Ruler" />
        <Stat label="Dana di escrow" value={rupiah(36_935_000)} sub="Aman sampai disetujui" icon="Wallet" tone="green" />
        <Stat label="RAB masuk" value="3" sub="Renovasi kamar mandi" icon="ClipboardList" tone="blue" />
        <Stat label="Order harian" value="1" sub="Kamis 09.00" icon="CalendarCheck" tone="blue" />
      </div>
      <div className="card p-5 mt-6 !border-orange flex flex-wrap gap-4 items-center">
        <div className="w-11 h-11 rounded-xl bg-orange text-white grid place-items-center"><I.BellRing size={20} /></div>
        <div className="flex-1 min-w-[200px]"><div className="font-semibold">Termin 2 renovasi dapur menunggu persetujuan</div><div className="text-sm text-muted">Mandor Dadang mengunggah laporan progres 50% · {rupiah(19_400_000)}</div></div>
        <button onClick={() => go('proyek')} className="btn btn-primary text-sm">Tinjau laporan</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <button onClick={() => go('rab')} className="card p-5 text-left hover:border-ink"><div className="font-semibold">3 RAB siap dibandingkan</div><div className="text-sm text-muted mt-1">Rp 79,9 jt – Rp 94 jt · renovasi kamar mandi</div></button>
        <Link to="/cari" className="card p-5 hover:border-ink"><div className="font-semibold">Butuh perbaikan kecil?</div><div className="text-sm text-muted mt-1">Panggil tukang harian terverifikasi di Bandung</div></Link>
      </div>
    </div>
  )
}

/* ---------------- MITRA ---------------- */
function RabBuilder({ notify }) {
  const [rows, setRows] = useState([
    { item: 'Bongkar keramik & kloset lama', vol: 1, unit: 'ls', price: 1_500_000 },
    { item: 'Waterproofing lantai & dinding basah', vol: 18, unit: 'm²', price: 145_000 },
    { item: 'Pasang keramik dinding 30x60', vol: 22, unit: 'm²', price: 310_000 },
    { item: 'Pasang keramik lantai 40x40', vol: 6, unit: 'm²', price: 285_000 },
    { item: 'Kloset duduk + shower set (material)', vol: 1, unit: 'set', price: 6_800_000 },
  ])
  const [margin, setMargin] = useState(10)
  const sub = rows.reduce((s, r) => s + r.vol * r.price, 0)
  const total = Math.round(sub * (1 + margin / 100))
  const upd = (i, k, v) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: k === 'item' || k === 'unit' ? v : Number(v) || 0 } : r)))
  return (
    <div>
      <H sub="Untuk: Bu Rina K. · Renovasi kamar mandi · survei 9 Nov">Buat RAB</H>
      <div className="card p-5 overflow-x-auto">
        <table className="w-full text-sm min-w-[620px]">
          <thead><tr className="text-left text-xs text-muted border-b border-line"><th className="py-2 w-[42%]">Item pekerjaan</th><th>Vol</th><th>Sat</th><th>Harga satuan</th><th className="text-right">Jumlah</th><th /></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-line">
                <td className="py-1.5 pr-2"><input className="input !py-1.5" value={r.item} onChange={(e) => upd(i, 'item', e.target.value)} /></td>
                <td className="pr-2"><input className="input !py-1.5 w-16" value={r.vol} onChange={(e) => upd(i, 'vol', e.target.value)} /></td>
                <td className="pr-2"><input className="input !py-1.5 w-16" value={r.unit} onChange={(e) => upd(i, 'unit', e.target.value)} /></td>
                <td className="pr-2"><input className="input !py-1.5 w-32" value={r.price} onChange={(e) => upd(i, 'price', e.target.value)} /></td>
                <td className="text-right whitespace-nowrap">{rupiah(r.vol * r.price)}</td>
                <td className="pl-2"><button onClick={() => setRows(rows.filter((_, j) => j !== i))} className="text-muted hover:text-red"><I.Trash2 size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setRows([...rows, { item: 'Item baru', vol: 1, unit: 'ls', price: 0 }])} className="btn btn-ghost text-sm mt-3"><I.Plus size={16} /> Tambah item</button>
        <div className="mt-5 ml-auto max-w-xs space-y-1 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{rupiah(sub)}</span></div>
          <div className="flex justify-between items-center"><span>Overhead & jasa</span><span><input className="input !py-1 !w-14 inline" value={margin} onChange={(e) => setMargin(Number(e.target.value) || 0)} /> %</span></div>
          <div className="flex justify-between text-xl font-extrabold pt-2 border-t border-line"><span>Total</span><span>{rupiah(total)}</span></div>
        </div>
      </div>
      <div className="card p-5 mt-4 text-sm grid sm:grid-cols-4 gap-3">
        {[['DP', 30], ['Progres 50%', 40], ['Serah terima', 25], ['Retensi', 5]].map(([a, b]) => <div key={a} className="bg-paper-2 rounded-lg p-3"><div className="text-xs text-muted">{a} · {b}%</div><div className="font-semibold">{rupiah(Math.round(total * b / 100))}</div></div>)}
      </div>
      <div className="flex gap-2 mt-4"><button onClick={() => notify('Draf RAB disimpan.')} className="btn btn-ghost">Simpan draf</button><button onClick={() => notify(`RAB ${rupiah(total)} terkirim ke pelanggan.`)} className="btn btn-primary">Kirim RAB ke pelanggan</button></div>
    </div>
  )
}

function Mitra({ tab, go, notify }) {
  const [leads, setLeads] = useState([
    { id: 1, who: 'Bu Rina K.', job: 'Renovasi kamar mandi + area cuci', area: 'Cikutra, Bandung', budget: 'Rp 50–100 jt', when: 'Survei Sab 15 Nov', st: 'baru' },
    { id: 2, who: 'Pak Bayu S.', job: 'Tambah kamar lantai 2 (4x5 m)', area: 'Cimahi Utara', budget: 'Di atas Rp 100 jt', when: 'Survei Min 16 Nov', st: 'baru' },
    { id: 3, who: 'Teh Mira', job: 'Kanopi + pagar depan', area: 'Antapani, Bandung', budget: 'Rp 10–25 jt', when: 'Sudah survei 9 Nov', st: 'rab' },
  ])
  const setSt = (id, st, m) => { setLeads(leads.map((l) => (l.id === id ? { ...l, st } : l))); notify(m) }
  if (tab === 'leads') return (
    <div>
      <H sub="Permintaan dikirim ke maksimal 3 mitra. Respon cepat menaikkan peringkat Anda.">Permintaan survei</H>
      <div className="space-y-3">
        {leads.map((l) => (
          <div key={l.id} className="card p-4 flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[220px]"><div className="font-semibold">{l.job}</div><div className="text-sm text-muted">{l.who} · {l.area} · {l.budget}</div><div className="text-xs mt-1">{l.when}</div></div>
            {l.st === 'baru' && <><button onClick={() => setSt(l.id, 'ok', 'Jadwal survei dikonfirmasi ke pelanggan.')} className="btn btn-primary text-sm">Konfirmasi survei</button><button onClick={() => setSt(l.id, 'tolak', 'Permintaan dilewati.')} className="btn btn-ghost text-sm">Lewati</button></>}
            {l.st === 'ok' && <span className="chip bg-green-l text-green">Survei terjadwal</span>}
            {l.st === 'tolak' && <span className="chip bg-paper-2 text-muted">Dilewati</span>}
            {l.st === 'rab' && <button onClick={() => go('rabbuilder')} className="btn btn-dark text-sm">Buat RAB</button>}
          </div>
        ))}
      </div>
    </div>
  )
  if (tab === 'rabbuilder') return <RabBuilder notify={notify} />
  if (tab === 'proyek') return (
    <div>
      <H>Proyek berjalan</H>
      <div className="card p-5">
        <div className="flex justify-between flex-wrap gap-2"><div><div className="text-xs text-muted">{PROJECTS[0].id}</div><div className="text-xl font-extrabold">{PROJECTS[0].title}</div><div className="text-sm text-muted">Bu Rina K. · {PROJECTS[0].address}</div></div><div className="text-right"><div className="font-bold">{rupiah(PROJECTS[0].total)}</div><span className="chip bg-orange-l text-orange-d">Termin 2 menunggu pelanggan</span></div></div>
        <div className="mt-4 h-2.5 rounded-full bg-paper-2 overflow-hidden"><div className="h-full bg-orange" style={{ width: '55%' }} /></div>
        <div className="mt-5 border-2 border-dashed border-line rounded-xl p-4">
          <div className="font-semibold text-sm">Unggah laporan progres hari ini</div>
          <textarea className="input mt-2" rows={2} defaultValue="Top granit terpasang, sink dan kran sudah tersambung. Besok finishing silikon." />
          <div className="flex gap-2 mt-2"><button className="btn btn-ghost text-sm"><I.Camera size={16} /> Tambah foto</button><button onClick={() => notify('Laporan progres terkirim ke pelanggan.')} className="btn btn-primary text-sm">Kirim laporan</button></div>
        </div>
      </div>
    </div>
  )
  if (tab === 'tim') return (
    <div>
      <H sub="Tukang yang tampil sebagai bagian dari tim Anda. Dokumen tetap diverifikasi per orang.">Tim tukang</H>
      <div className="card divide-y divide-line">
        {TUKANG.filter((t) => t.mitra).slice(0, 14).map((t) => {
          const c = CATEGORIES.find((x) => x.id === t.category)
          return <div key={t.id} className="p-4 flex items-center gap-3"><ArtAvatar look={t.look} size={40} rounded={10} /><div className="flex-1"><div className="font-semibold text-sm">{t.name}</div><div className="text-xs text-muted">{c.short} · {t.exp} th</div></div><Stars value={t.rating} /><span className="chip bg-green-l text-green">Aktif</span></div>
        })}
      </div>
      <button onClick={() => notify('Undangan bergabung dikirim lewat WhatsApp (demo).')} className="btn btn-dark mt-4 text-sm"><I.UserPlus size={16} /> Undang tukang</button>
    </div>
  )
  if (tab === 'legal') return (
    <div>
      <H sub="Wajib lengkap sebelum profil tayang.">Legalitas & deposit</H>
      <div className="card divide-y divide-line">
        {[['NIB', '9120304567891', 'ok'], ['KBLI', '43301 · Pengerjaan pemasangan kaca & aluminium / finishing', 'ok'], ['NPWP badan', '01.234.***.*-423.000', 'ok'], ['Akta pendirian CV', 'Terverifikasi', 'ok'], ['Deposit jaminan', `${rupiah(5_000_000)} · ditahan`, 'ok'], ['SBU konstruksi', 'Opsional, belum diunggah', 'no']].map(([a, b, s]) => (
          <div key={a} className="p-4 flex justify-between items-center text-sm gap-3"><div><div className="font-semibold">{a}</div><div className="text-muted text-xs">{b}</div></div>{s === 'ok' ? <span className="chip bg-green-l text-green">Terverifikasi</span> : <button className="btn btn-ghost !py-1.5 text-xs">Unggah</button>}</div>
        ))}
      </div>
      <p className="text-xs text-muted mt-3">Deposit dapat dipakai untuk perbaikan bila mediasi sengketa buntu. Dikembalikan saat keluar dari platform tanpa sengketa terbuka.</p>
    </div>
  )
  return (
    <div>
      <H sub="CV Karya Tikung Nusantara · Bandung">Ringkasan</H>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <Stat label="Permintaan baru" value="2" sub="Respon < 2 jam" icon="Inbox" />
        <Stat label="Proyek berjalan" value="3" sub="Nilai Rp 162 jt" icon="HardHat" tone="blue" />
        <Stat label="Termin menunggu" value={rupiah(19_400_000)} sub="Renovasi dapur Cikutra" icon="Wallet" tone="green" />
        <Stat label="Win rate RAB" value="41%" sub="30 hari terakhir" icon="TrendingUp" tone="blue" />
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <button onClick={() => go('leads')} className="card p-5 text-left hover:border-ink"><I.Inbox className="text-orange" /><div className="font-semibold mt-2">2 permintaan survei baru</div><div className="text-sm text-muted">Konfirmasi jadwal dalam 24 jam</div></button>
        <button onClick={() => go('rabbuilder')} className="card p-5 text-left hover:border-ink"><I.Calculator className="text-orange" /><div className="font-semibold mt-2">1 RAB perlu dikirim</div><div className="text-sm text-muted">Kanopi + pagar, Antapani</div></button>
        <button onClick={() => go('proyek')} className="card p-5 text-left hover:border-ink"><I.Camera className="text-orange" /><div className="font-semibold mt-2">Laporan progres hari ini</div><div className="text-sm text-muted">Renovasi dapur, Cikutra</div></button>
      </div>
    </div>
  )
}

/* ---------------- TUKANG ---------------- */
function Tukang({ tab, go, notify }) {
  const [orders, setOrders] = useState([
    { id: 1, job: 'Pasang keramik teras 8 m²', who: 'Pak Andri', area: 'Arcamanik · 4,2 km', date: 'Sab 15 Nov', pay: 640_000, st: 'baru' },
    { id: 2, job: 'Perbaiki dinding retak kamar', who: 'Bu Sri', area: 'Antapani · 2,1 km', date: 'Sen 17 Nov', pay: 350_000, st: 'baru' },
    { id: 3, job: 'Plester aci pagar depan', who: 'Pak Yudi', area: 'Cicaheum · 3,0 km', date: 'Kam 13 Nov', pay: 450_000, st: 'ok' },
  ])
  const setSt = (id, st, m) => { setOrders(orders.map((o) => (o.id === id ? { ...o, st } : o))); notify(m) }
  if (tab === 'order') return (
    <div>
      <H sub="Upah sudah dibayar pelanggan ke escrow sebelum Anda berangkat.">Order masuk</H>
      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="card p-4 flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]"><div className="font-semibold">{o.job}</div><div className="text-sm text-muted">{o.who} · {o.area} · {o.date}</div></div>
            <div className="text-lg font-extrabold">{rupiah(o.pay)}</div>
            {o.st === 'baru' ? <><button onClick={() => setSt(o.id, 'ok', 'Order diterima. Nomor pelanggan sekarang terlihat.')} className="btn btn-primary text-sm">Terima</button><button onClick={() => setSt(o.id, 'tolak', 'Order ditolak.')} className="btn btn-ghost text-sm">Tolak</button></> : <span className={`chip ${o.st === 'ok' ? 'bg-green-l text-green' : 'bg-paper-2 text-muted'}`}>{o.st === 'ok' ? 'Diterima' : 'Ditolak'}</span>}
          </div>
        ))}
      </div>
    </div>
  )
  if (tab === 'jadwal') return (
    <div>
      <H>Jadwal minggu ini</H>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
        {['Sen 10', 'Sel 11', 'Rab 12', 'Kam 13', 'Jum 14', 'Sab 15', 'Min 16'].map((d, i) => (
          <div key={d} className={`card p-3 min-h-[110px] ${i === 2 ? '!border-orange' : ''}`}>
            <div className="text-xs font-semibold text-muted">{d}</div>
            {i === 3 && <div className="mt-2 text-xs bg-orange-l text-orange-d rounded p-1.5">08.00 Plester pagar · Cicaheum</div>}
            {i === 5 && <div className="mt-2 text-xs bg-blue-l text-blue rounded p-1.5">Menunggu: keramik teras</div>}
            {i === 6 && <div className="mt-2 text-xs text-muted">Libur</div>}
          </div>
        ))}
      </div>
    </div>
  )
  if (tab === 'pendapatan') return (
    <div>
      <H sub="Dicairkan ke rekening Anda maksimal 1×24 jam setelah pelanggan konfirmasi selesai.">Pendapatan</H>
      <div className="grid sm:grid-cols-3 gap-3">
        <Stat label="Bulan ini" value={rupiah(4_850_000)} sub="14 order selesai" icon="Wallet" tone="green" />
        <Stat label="Di escrow" value={rupiah(450_000)} sub="Cair setelah selesai" icon="Lock" />
        <Stat label="Potongan platform" value="Rp 0" sub="Tukang mandiri gratis" icon="BadgePercent" tone="blue" />
      </div>
      <div className="card mt-4 divide-y divide-line text-sm">
        {[['8 Nov', 'Tambah 3 titik lampu teras', 330000], ['6 Nov', 'Ganti keramik kamar mandi 4 m²', 720000], ['3 Nov', 'Tambal dinding retak', 280000], ['1 Nov', 'Pasang rak dinding dapur', 250000]].map(([d, j, v]) => <div key={j} className="p-3 flex justify-between"><span><span className="text-muted mr-3">{d}</span>{j}</span><span className="font-semibold text-green">+{rupiah(v)}</span></div>)}
      </div>
    </div>
  )
  if (tab === 'dokumen') return (
    <div>
      <H sub="Profil tayang setelah dokumen wajib terverifikasi.">Dokumen & profil</H>
      <div className="card divide-y divide-line">
        {[['KTP', 'ok'], ['Foto wajah', 'ok'], ['Portofolio (5 foto)', 'ok'], ['SKCK', 'proses'], ['Sertifikat SKK (opsional)', 'no']].map(([d, s]) => (
          <div key={d} className="p-4 flex justify-between items-center text-sm"><span className="font-semibold">{d}</span>{s === 'ok' ? <span className="chip bg-green-l text-green">Terverifikasi</span> : s === 'proses' ? <span className="chip bg-orange-l text-orange-d">Sedang diperiksa</span> : <button className="btn btn-ghost !py-1.5 text-xs"><I.Upload size={14} /> Unggah</button>}</div>
        ))}
      </div>
      <div className="card p-5 mt-4 flex items-center justify-between flex-wrap gap-3"><div className="text-sm"><div className="font-semibold">Siap menerima order</div><div className="text-muted">Matikan saat sedang penuh atau pulang kampung.</div></div><label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" defaultChecked className="accent-orange w-5 h-5" /> Aktif</label></div>
    </div>
  )
  return (
    <div>
      <H sub="Asep S. · Tukang bangunan · Bandung">Ringkasan</H>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <Stat label="Order baru" value="2" sub="Balas sebelum 18.00" icon="Inbox" />
        <Stat label="Pendapatan bulan ini" value={rupiah(4_850_000)} icon="Wallet" tone="green" />
        <Stat label="Rating" value="4,9" sub="dari 61 ulasan" icon="Star" tone="blue" />
        <Stat label="Tingkat terima" value="88%" sub="30 hari" icon="CheckCircle2" tone="blue" />
      </div>
      <div className="card p-5 mt-6 !border-orange flex flex-wrap gap-4 items-center">
        <I.Inbox className="text-orange" />
        <div className="flex-1"><div className="font-semibold">2 order baru di dekat Anda</div><div className="text-sm text-muted">Pasang keramik teras · Perbaiki dinding retak</div></div>
        <button onClick={() => go('order')} className="btn btn-primary text-sm">Lihat order</button>
      </div>
      <div className="card p-5 mt-4 text-sm flex gap-3"><I.FileWarning className="text-orange shrink-0" /><div><b>SKCK sedang diperiksa.</b> Profil tetap tayang dengan label "SKCK menyusul" sampai 26 Nov.</div></div>
    </div>
  )
}

/* ---------------- ADMIN ---------------- */
function Admin({ tab, notify }) {
  const [queue, setQueue] = useState([
    { id: 1, name: 'Hendra W.', type: 'Tukang listrik', docs: 'KTP, SKCK, selfie, portofolio', city: 'Bandung', st: 'baru' },
    { id: 2, name: 'CV Atap Prima', type: 'Mitra kontraktor', docs: 'NIB, KBLI 43909, NPWP, akta', city: 'Bekasi', st: 'baru' },
    { id: 3, name: 'Komang T.', type: 'Tukang kayu', docs: 'KTP, selfie, portofolio (SKCK menyusul)', city: 'Denpasar', st: 'baru' },
    { id: 4, name: 'Udin H.', type: 'Tukang cat', docs: 'KTP buram, selfie tidak cocok', city: 'Depok', st: 'baru', flag: true },
  ])
  const setSt = (id, st, m) => { setQueue(queue.map((q) => (q.id === id ? { ...q, st } : q))); notify(m) }
  if (tab === 'verifikasi') return (
    <div>
      <H sub="Periksa dokumen asli. Jangan menyimpan salinan NIK di luar sistem.">Antrian verifikasi</H>
      <div className="space-y-3">
        {queue.map((q) => (
          <div key={q.id} className={`card p-4 flex flex-wrap gap-4 items-center ${q.flag ? '!border-red' : ''}`}>
            <Avatar name={q.name} size={40} tone={q.type.startsWith('Mitra') ? 'dark' : 'orange'} />
            <div className="flex-1 min-w-[220px]"><div className="font-semibold">{q.name} <span className="text-muted font-normal text-sm">· {q.type} · {q.city}</span></div><div className="text-sm text-muted">{q.docs}</div>{q.flag && <div className="text-xs text-red font-semibold mt-1">Ditandai sistem: wajah tidak cocok dengan KTP</div>}</div>
            {q.st === 'baru' ? <><button onClick={() => setSt(q.id, 'ok', `${q.name} disetujui dan tayang.`)} className="btn btn-primary text-sm">Setujui</button><button onClick={() => setSt(q.id, 'no', `${q.name} diminta unggah ulang dokumen.`)} className="btn btn-ghost text-sm">Minta ulang</button></> : <span className={`chip ${q.st === 'ok' ? 'bg-green-l text-green' : 'bg-red-l text-red'}`}>{q.st === 'ok' ? 'Disetujui' : 'Dikembalikan'}</span>}
          </div>
        ))}
      </div>
    </div>
  )
  if (tab === 'sengketa') return (
    <div>
      <H>Sengketa</H>
      <div className="card p-5">
        <div className="flex justify-between flex-wrap gap-2"><div><div className="text-xs text-muted">SKT-0193 · proyek P-2609-041</div><div className="text-xl font-extrabold">Rembesan kamar mandi setelah serah terima</div><div className="text-sm text-muted">Pak Haris (Dago) vs Mandor Ujang & Tim · nilai retensi {rupiah(1_850_000)}</div></div><span className="chip bg-orange-l text-orange-d">Mediasi hari ke-4</span></div>
        <ol className="mt-4 text-sm space-y-2 border-l-2 border-line pl-4">
          <li><b>2 Nov</b> · Pelanggan ajukan klaim garansi + 4 foto rembesan.</li>
          <li><b>4 Nov</b> · Mitra survei ulang, mengakui sambungan pipa kurang rapat.</li>
          <li><b>6 Nov</b> · Mitra janji perbaikan 10 Nov, belum dikerjakan.</li>
        </ol>
        <div className="flex flex-wrap gap-2 mt-5">
          <button onClick={() => notify('Pengingat resmi dikirim ke mitra. Tenggat 14 Nov.')} className="btn btn-ghost text-sm">Kirim pengingat resmi</button>
          <button onClick={() => notify('Retensi dialihkan untuk tukang pengganti. Mitra mendapat poin pelanggaran.')} className="btn btn-dark text-sm">Pakai retensi untuk tukang pengganti</button>
        </div>
      </div>
    </div>
  )
  if (tab === 'pencairan') return (
    <div>
      <H sub="Pencairan otomatis setelah persetujuan pelanggan atau batas 3×24 jam.">Pencairan escrow</H>
      <div className="card divide-y divide-line text-sm">
        {[['Termin 2 · P-2611-014', 'CV Karya Tikung Nusantara', 19_400_000, 'Menunggu pelanggan'], ['H-2611-198', 'Dedi R.', 330_000, 'Cair'], ['DP · P-2611-022', 'PT Rumah Kokoh Sejahtera', 28_200_000, 'Cair'], ['Retensi · P-2608-007', 'CV Baja Ringan Mandiri', 420_000, 'Dijadwalkan 20 Nov']].map(([a, b, v, s]) => (
          <div key={a} className="p-3 flex flex-wrap justify-between gap-2 items-center"><div><div className="font-semibold">{a}</div><div className="text-muted text-xs">{b}</div></div><div className="text-right"><div className="font-semibold">{rupiah(v)}</div><span className={`chip ${s === 'Cair' ? 'bg-green-l text-green' : 'bg-paper-2 text-muted'}`}>{s}</span></div></div>
        ))}
      </div>
    </div>
  )
  const bars = [38, 52, 47, 63, 71, 84, 96]
  return (
    <div>
      <H sub="30 hari terakhir · data contoh">Statistik platform</H>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <Stat label="GMV" value="Rp 1,24 M" sub="+18% vs bulan lalu" icon="TrendingUp" tone="green" />
        <Stat label="Pendapatan layanan" value="Rp 52,6 jt" sub="Biaya layanan + komisi" icon="Banknote" />
        <Stat label="Tukang aktif" value="412" sub="31 mitra kontraktor" icon="HardHat" tone="blue" />
        <Stat label="Sengketa terbuka" value="3" sub="0,7% dari order" icon="Scale" tone="blue" />
      </div>
      <div className="card p-5 mt-6">
        <div className="font-semibold">Order per minggu</div>
        <div className="flex items-end gap-3 h-40 mt-4">
          {bars.map((b, i) => <div key={i} className="flex-1 flex flex-col items-center gap-1"><div className="text-xs text-muted">{b}</div><div className="w-full rounded-t-md bg-orange" style={{ height: `${b * 1.3}px` }} /><div className="text-[10px] text-muted">M{i + 39}</div></div>)}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="card p-5 text-sm"><div className="font-semibold mb-2">Kategori terlaris</div>{[['Tukang Ledeng', 24], ['Tukang Bangunan', 21], ['Renovasi Borongan', 17], ['Tukang Listrik', 15], ['Tukang Cat', 11]].map(([a, b]) => <div key={a} className="flex items-center gap-2 py-1"><span className="w-36">{a}</span><div className="flex-1 h-2 bg-paper-2 rounded"><div className="h-full bg-ink rounded" style={{ width: `${b * 4}%` }} /></div><span className="w-8 text-right text-muted">{b}%</span></div>)}</div>
        <div className="card p-5 text-sm"><div className="font-semibold mb-2">Kota teratas</div>{[['Bandung', 38], ['Cimahi', 14], ['Jakarta', 13], ['Bekasi', 9], ['Surabaya', 7]].map(([a, b]) => <div key={a} className="flex items-center gap-2 py-1"><span className="w-36">{a}</span><div className="flex-1 h-2 bg-paper-2 rounded"><div className="h-full bg-orange rounded" style={{ width: `${b * 2.5}%` }} /></div><span className="w-8 text-right text-muted">{b}%</span></div>)}</div>
      </div>
    </div>
  )
}
