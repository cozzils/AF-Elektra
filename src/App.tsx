import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'

const Home = lazy(() => import('./pages/Home'))
const ChiSiamo = lazy(() => import('./pages/ChiSiamo'))
const Catalogo = lazy(() => import('./pages/Catalogo'))
const Prodotto = lazy(() => import('./pages/Prodotto'))
const CasiStudio = lazy(() => import('./pages/CasiStudio'))
const Contatti = lazy(() => import('./pages/Contatti'))
const Privacy = lazy(() => import('./pages/Privacy'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white" role="status" aria-live="polite">
      <span className="text-sm text-white/55">Caricamento…</span>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/catalogo/:slug" element={<Prodotto />} />
        <Route path="/casi-studio" element={<CasiStudio />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
