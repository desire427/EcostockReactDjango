import { useEffect, useState } from 'react';
import productService from '../api/productService';

function ProductStats() {
  const [stats, setStats] = useState({ total_products: 0, disponibles: 0, a_surveiller: 0 });

  useEffect(() => {
    productService.getStats()
      .then((res) => setStats(res.data))
      .catch((err) => console.error('Erreur stats produits:', err));
  }, []);

  return (
    <section className="mb-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Produits au total</p>
        <p className="mt-2 text-3xl font-semibold text-white">{stats.total_products}</p>
      </div>

      <div className="rounded-2xl border border-emerald-900/50 bg-emerald-950/70 p-5">
        <p className="text-sm text-emerald-300">Disponibles</p>
        <p className="mt-2 text-3xl font-semibold text-white">{stats.disponibles}</p>
      </div>

      <div className="rounded-2xl border border-amber-900/40 bg-amber-950/60 p-5">
        <p className="text-sm text-amber-300">À surveiller</p>
        <p className="mt-2 text-3xl font-semibold text-white">{stats.a_surveiller}</p>
      </div>
    </section>
  );
}

export default ProductStats;
