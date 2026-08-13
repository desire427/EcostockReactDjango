import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/login/login.jsx'
import Produit from './components/product/produit.jsx'
import DetailProduit from './components/product/detail_produit.jsx'
import Accueil from './components/accueil/accueil.jsx'
import Entrepots from './components/warehouse/entrepots.jsx'
import DetailEntrepots from './components/warehouse/detail_entrepots.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirection racine */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Route publique */}
        <Route path="/login" element={<Login />} />

        {/* Routes privées — redirigent vers /login si non connecté */}
        <Route path="/accueil" element={<ProtectedRoute><Accueil /></ProtectedRoute>} />
        <Route path="/produits" element={<ProtectedRoute><Produit /></ProtectedRoute>} />
        <Route path="/produits.html" element={<ProtectedRoute><Produit /></ProtectedRoute>} />
        <Route path="/produits/:id" element={<ProtectedRoute><DetailProduit /></ProtectedRoute>} />
        <Route path="/detail_produits" element={<ProtectedRoute><DetailProduit /></ProtectedRoute>} />
        <Route path="/detail_produits.html" element={<ProtectedRoute><DetailProduit /></ProtectedRoute>} />
        <Route path="/entrepots" element={<ProtectedRoute><Entrepots /></ProtectedRoute>} />
        <Route path="/entrepots.html" element={<ProtectedRoute><Entrepots /></ProtectedRoute>} />
        <Route path="/entrepots/:id" element={<ProtectedRoute><DetailEntrepots /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
