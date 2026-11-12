import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Check, Upload, ArrowLeft, ArrowRight, Building2, HardHat, House, ShieldCheck } from 'lucide-react'
import { CITIES, CATEGORIES, TUKANG } from '../data'
import { useSession, Toast, ROLES } from '../components/ui'

const Steps = ({ steps, cur }) => (
  <div className="flex items-center gap-2 mb-8">
    {steps.map((s, i) => (
      <div key={s} className="flex items-center gap-2 flex-1">
        <div className={`w-8 h-8 rounded-full grid place-items-center text-sm font-bold shrink-0 ${i < cur ? 'bg-green text-white' : i === cur ? 'bg-orange text-white' : 'bg-paper-2 text-muted'}`}>{i < cur ? <Check size={16} /> : i + 1}</div>
        <div className={`text-sm hidden sm:block ${i === cur ? 'font-semibold' : 'text-muted'}`}>{s}</div>
        {i < steps.length - 1 && <div className="h-px bg-line flex-1" />}
      </div>
    ))}
  </div>
)

export function ProyekBaru() {
  const [sp] = useSearchParams()
  const nav = useNavigate()
  const { setRole } = useSession()
  const [step, setStep] = useState(0)
  const [toast, setToast] = useState('')
  const [f, setF] = useState({ jenis: 'Renovasi dapur', luas: 12, kota: sp.get('kota') || 'Bandung', budget: '50-100', material: 'mitra', mulai: 'Desember 2026', desc: 'Dapur lama 3x4 m, ingin ganti keramik, kitchen set atas-bawah, dan meja granit. Instalasi air perlu dipindah sedikit.' })
  const target = TUKANG.find((t) => t.id === sp.get('tukang'))
  const up = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const steps = ['Pekerjaan', 'Lokasi & jadwal', 'Ringkasan']

  const submit = () => {
    setRole('pelanggan')
    setToast('Permintaan proyek terkirim. 3 mitra akan menghubungi untuk jadwal survei.')
    setTimeout(() => nav('/app/pelanggan?tab=rab'), 1700)
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <span className="chip bg-ink text-white">Borongan / renovasi</span>
      <h1 className="text-4xl font-bold mt-3">Ajukan proyek, terima hingga 3 RAB.</h1>
      <p className="text-ink-2 mt-2">Gratis mengajukan. Biaya survei Rp 100.000 dipotong dari nilai proyek bila lanjut.{target && <> Permintaan juga dikirim langsung ke <b>{target.name}</b>.</>}</p>
      <div className="card p-6 mt-8">
        <Steps steps={steps} cur={step} />
        {step === 0 && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold">Jenis proyek
              <select className="input mt-1" value={f.jenis} onChange={up('jenis')}>{['Renovasi dapur', 'Renovasi kamar mandi', 'Tambah kamar / lantai 2', 'Kanopi & pagar', 'Atap baja ringan', 'Cat ulang seluruh rumah', 'Lainnya'].map((x) => <option key={x}>{x}</option>)}</select>
            </label>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="text-sm font-semibold">Perkiraan luas (m²)<input type="number" className="input mt-1" value={f.luas} onChange={up('luas')} /></label>
              <label className="text-sm font-semibold">Anggaran kasar
                <select className="input mt-1" value={f.budget} onChange={up('budget')}><option value="10-25">Rp 10–25 jt</option><option value="25-50">Rp 25–50 jt</option><option value="50-100">Rp 50–100 jt</option><option value="100+">Di atas Rp 100 jt</option></select>
              </label>
            </div>
            <label className="block text-sm font-semibold">Ceritakan pekerjaannya<textarea rows={4} className="input mt-1" value={f.desc} onChange={up('desc')} /></label>
            <div className="text-sm font-semibold">Material disediakan oleh</div>
            <div className="grid sm:grid-cols-3 gap-2">
              {[['mitra', 'Mitra (termasuk RAB)'], ['saya', 'Saya sendiri'], ['campur', 'Sebagian-sebagian']].map(([v, l]) => (
                <button type="button" key={v} onClick={() => setF({ ...f, material: v })} className={`card p-3 text-sm text-left ${f.material === v ? '!border-orange ring-2 ring-orange-l' : ''}`}>{l}</button>
              ))}
            </div>
            <div className="border-2 border-dashed border-line rounded-xl p-6 text-center text-sm text-muted"><Upload className="mx-auto mb-2" size={22} />Tarik foto kondisi sekarang ke sini (demo: tidak diunggah)</div>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="text-sm font-semibold">Kota<select className="input mt-1" value={f.kota} onChange={up('kota')}>{CITIES.map((c) => <option key={c}>{c}</option>)}</select></label>
              <label className="text-sm font-semibold">Ingin mulai<select className="input mt-1" value={f.mulai} onChange={up('mulai')}><option>Secepatnya</option><option>Desember 2026</option><option>Januari 2027</option><option>Masih fleksibel</option></select></label>
            </div>
            <label className="block text-sm font-semibold">Alamat lokasi<input className="input mt-1" defaultValue="Jl. Cikutra Baru No. 41" /></label>
            <div className="text-sm font-semibold">Waktu survei yang nyaman</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">{['Sab 15 Nov pagi', 'Sab 15 Nov siang', 'Min 16 Nov pagi', 'Sen 17 Nov sore'].map((x, i) => <label key={x} className="card p-3 flex gap-2 items-center"><input type="checkbox" defaultChecked={i < 2} className="accent-orange" />{x}</label>)}</div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4 text-sm">
            <div className="grid sm:grid-cols-2 gap-3">
              {[['Proyek', f.jenis], ['Luas', `${f.luas} m²`], ['Anggaran', `Rp ${f.budget} jt`], ['Material', { mitra: 'Disediakan mitra', saya: 'Disediakan sendiri', campur: 'Sebagian' }[f.material]], ['Lokasi', f.kota], ['Mulai', f.mulai]].map(([a, b]) => <div key={a} className="bg-paper-2 rounded-lg p-3"><div className="text-xs text-muted">{a}</div><div className="font-semibold">{b}</div></div>)}
            </div>
            <div className="bg-paper-2 rounded-lg p-3"><div className="text-xs text-muted">Deskripsi</div>{f.desc}</div>
            <div className="card p-4 !bg-orange-l !border-orange/30">
              <div className="font-semibold">Yang terjadi setelah ini</div>
              <ol className="list-decimal ml-5 mt-2 space-y-1 text-ink-2">
                <li>Hingga 3 mitra terverifikasi di {f.kota} mengonfirmasi jadwal survei.</li>
                <li>Setelah survei, masing-masing mengirim RAB per item untuk Anda bandingkan.</li>
                <li>Pilih satu, setujui kontrak digital, lalu bayar DP ke escrow.</li>
              </ol>
            </div>
          </div>
        )}
        <div className="flex justify-between mt-8">
          {step > 0 ? <button onClick={() => setStep(step - 1)} className="btn btn-ghost"><ArrowLeft size={16} /> Kembali</button> : <span />}
          {step < 2 ? <button onClick={() => setStep(step + 1)} className="btn btn-dark">Lanjut <ArrowRight size={16} /></button> : <button onClick={submit} className="btn btn-primary">Kirim permintaan proyek</button>}
        </div>
      </div>
      <Toast msg={toast} onClose={() => setToast('')} />
    </main>
  )
}

export function Masuk() {
  const nav = useNavigate()
  const { setRole } = useSession()
  const [sp] = useSearchParams()
  const hl = sp.get('peran')
  const go = (r) => { setRole(r); nav(`/app/${r}`) }
  const items = [
    ['pelanggan', House, 'Cari tukang, minta survei, bandingkan RAB, setujui termin, klaim garansi, beri ulasan.'],
    ['mitra', Building2, 'Onboarding legalitas & deposit, kelola tim tukang, kirim RAB, laporan progres, tagih termin.'],
    ['tukang', HardHat, 'Daftar gratis. Unggah dokumen & portofolio, atur area dan tarif, terima atau tolak order.'],
    ['admin', ShieldCheck, 'Antrian verifikasi, sengketa & mediasi, pencairan dana, statistik platform.'],
  ]
  return (
    <main className="max-w-4xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-bold">Masuk sesuai peran Anda</h1>
      <p className="text-ink-2 mt-2">Ini demo: setiap tombol langsung masuk ke akun contoh, tanpa kata sandi.</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        {items.map(([r, I, d]) => (
          <button key={r} onClick={() => go(r)} className={`card p-6 text-left hover:border-ink transition ${hl === r ? '!border-orange ring-2 ring-orange-l' : ''}`}>
            <div className="w-11 h-11 rounded-xl bg-orange-l text-orange-d grid place-items-center"><I size={22} /></div>
            <div className="font-display text-xl font-bold mt-3">{ROLES[r].label}</div>
            <div className="text-xs text-muted">Akun contoh: {ROLES[r].name}</div>
            <p className="text-sm text-ink-2 mt-2">{d}</p>
            <div className="text-sm font-semibold text-orange-d mt-4 flex items-center gap-1">Masuk <ArrowRight size={14} /></div>
          </button>
        ))}
      </div>
      <p className="text-sm text-muted mt-6">Belum punya akun? <Link to="/daftar-tukang" className="underline text-ink font-semibold">Daftar sebagai tukang</Link> atau <Link to="/proyek/baru" className="underline text-ink font-semibold">ajukan proyek</Link>.</p>
    </main>
  )
}

export function DaftarTukang() {
  const nav = useNavigate()
  const { setRole } = useSession()
  const [step, setStep] = useState(0)
  const [cats, setCats] = useState(['bangunan'])
  const toggle = (id) => setCats(cats.includes(id) ? cats.filter((x) => x !== id) : [...cats, id])
  const steps = ['Data diri', 'Keahlian & area', 'Dokumen']
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <span className="chip bg-green-l text-green">Gratis selamanya untuk tukang</span>
      <h1 className="text-4xl font-bold mt-3">Dapat order tanpa calo, dibayar tepat waktu.</h1>
      <p className="text-ink-2 mt-2">Upah Anda ditahan di escrow sebelum kerja dimulai, jadi tidak ada lagi cerita pelanggan kabur setelah pekerjaan selesai.</p>
      <div className="card p-6 mt-8">
        <Steps steps={steps} cur={step} />
        {step === 0 && (
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="text-sm font-semibold sm:col-span-2">Nama lengkap sesuai KTP<input className="input mt-1" defaultValue="Asep Suryana" /></label>
            <label className="text-sm font-semibold">No. WhatsApp<input className="input mt-1" defaultValue="0812-0000-0000" /></label>
            <label className="text-sm font-semibold">Kota domisili<select className="input mt-1">{CITIES.map((c) => <option key={c}>{c}</option>)}</select></label>
            <label className="text-sm font-semibold">Pengalaman (tahun)<input type="number" className="input mt-1" defaultValue={12} /></label>
            <label className="text-sm font-semibold">Bekerja sebagai<select className="input mt-1"><option>Tukang mandiri</option><option>Anggota tim mitra (undangan)</option></select></label>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-sm font-semibold">Keahlian (boleh lebih dari satu)</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">{CATEGORIES.filter((c) => !c.borongan).map((c) => <button key={c.id} type="button" onClick={() => toggle(c.id)} className={`card p-3 text-sm ${cats.includes(c.id) ? '!border-orange ring-2 ring-orange-l font-semibold' : ''}`}>{c.short}</button>)}</div>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="text-sm font-semibold">Tarif harian (Rp)<input className="input mt-1" defaultValue="175.000" /></label>
              <label className="text-sm font-semibold">Radius kerja<select className="input mt-1"><option>10 km</option><option>15 km</option><option>25 km</option></select></label>
            </div>
            <label className="flex gap-2 items-center text-sm"><input type="checkbox" defaultChecked className="accent-orange" /> Saya juga menerima pekerjaan borongan kecil</label>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-3">
            {['KTP', 'SKCK (boleh menyusul 14 hari)', 'Foto wajah (selfie)', 'Foto 3–5 hasil kerja', 'Sertifikat SKK/BNSP (opsional)'].map((d) => (
              <div key={d} className="flex justify-between items-center border border-line rounded-lg p-3 text-sm"><span>{d}</span><button className="btn btn-ghost !py-1.5 text-xs"><Upload size={14} /> Unggah</button></div>
            ))}
            <p className="text-xs text-muted">Dokumen asli tidak boleh ditahan siapa pun. Tim kami memeriksa dalam 1–2 hari kerja.</p>
          </div>
        )}
        <div className="flex justify-between mt-8">
          {step > 0 ? <button onClick={() => setStep(step - 1)} className="btn btn-ghost"><ArrowLeft size={16} /> Kembali</button> : <span />}
          {step < 2 ? <button onClick={() => setStep(step + 1)} className="btn btn-dark">Lanjut <ArrowRight size={16} /></button> : <button onClick={() => { setRole('tukang'); nav('/app/tukang?tab=dokumen') }} className="btn btn-primary">Kirim pendaftaran</button>}
        </div>
      </div>
    </main>
  )
}
