import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, MemoryRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
const Router = import.meta.env.VITE_ROUTER === 'memory' ? MemoryRouter : BrowserRouter
import './index.css'
import { SessionProvider, Header, Footer } from './components/ui'
import Home from './pages/Home'
import Cari from './pages/Cari'
import Profil from './pages/Profil'
import { ProyekBaru, Masuk, DaftarTukang } from './pages/Forms'
import Dashboard from './pages/Dashboards'

function ScrollTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) { const el = document.getElementById(hash.slice(1)); if (el) { el.scrollIntoView(); return } }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function NotFound() {
  return <main className="max-w-3xl mx-auto px-4 py-24 text-center"><h1 className="text-4xl font-bold">Halaman tidak ditemukan</h1><Link to="/" className="btn btn-dark mt-6">Ke beranda</Link></main>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <SessionProvider>
      <ScrollTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cari" element={<Cari />} />
        <Route path="/tukang/:id" element={<Profil />} />
        <Route path="/proyek/baru" element={<ProyekBaru />} />
        <Route path="/masuk" element={<Masuk />} />
        <Route path="/daftar-tukang" element={<DaftarTukang />} />
        <Route path="/app/:role" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </SessionProvider>
  </Router>
)
