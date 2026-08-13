import React, { useState, useEffect } from 'react';
import AccueilLayout from './AccueilLayout';
import Sidebar from '../sidebar/sidebar.jsx';
import AccueilHeader from './AccueilHeader';
import StatCard from './StatCard';
import ChartsSection from './ChartsSection';
import RecentProducts from './RecentProducts';
import RecentWarehouses from './RecentWarehouses';
import productService from '../api/productService';
import warehouseService from '../api/warehouseService';

function Accueil() {
  const [loading, setLoading] = useState(true);
  const [productStats, setProductStats] = useState({ total_products: 0, a_surveiller: 0 });
  const [occupation, setOccupation] = useState(0);

  useEffect(() => {
    setLoading(true);
    Promise.all([productService.getStats(), warehouseService.getAll()])
      .then(([prodRes, whRes]) => {
        setProductStats(prodRes.data || { total_products: 0, a_surveiller: 0 });

        const warehouses = whRes.data || [];
        const totalCapacity = warehouses.reduce((sum, w) => sum + (w.capacity || 0), 0);
        const totalProducts = warehouses.reduce((sum, w) => sum + (w.products_count || 0), 0);
        const occ = totalCapacity ? Math.round((totalProducts / totalCapacity) * 100) : 0;
        setOccupation(occ);
      })
      .catch(() => {
        // Silencieusement ignorer — on affiche des valeurs 0
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AccueilLayout sidebar={<Sidebar />}>
      <AccueilHeader />

      <section className="mb-6 grid gap-4 md:grid-cols-3 xl:grid-cols-3">
        <StatCard label="Produits enregistrés" value={loading ? '…' : productStats.total_products} />
        <StatCard label="Stock faible" value={loading ? '…' : productStats.a_surveiller} />
        <StatCard label="Taux d'occupation" value={loading ? '…' : `${occupation}%`} />
      </section>

      <ChartsSection />

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <RecentProducts />
        <RecentWarehouses />
      </section>
    </AccueilLayout>
  );
}

export default Accueil;

