import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import ChiSiamo from './pages/ChiSiamo'
import Catalogo from './pages/Catalogo'
import CasiStudio from './pages/CasiStudio'
import Contatti from './pages/Contatti'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chi-siamo" element={<ChiSiamo />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/casi-studio" element={<CasiStudio />} />
      <Route path="/contatti" element={<Contatti />} />
    </Routes>
  )
}
