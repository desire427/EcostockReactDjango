import { useState } from 'react';
import ProductCard from './ProductCard';

function ProductCatalog({ products = [], loading = false }) {
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20 xl:col-span-3">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-semibold text-white">Catalogue des produits</h3>
        <input
          type="text"
          placeholder="Rechercher"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-slate-500 sm:w-64"
        />
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Chargement des produits…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-slate-400">Aucun produit trouvé.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.name}
              quantity={`${product.quantity} unité${product.quantity !== 1 ? 's' : ''}`}
              expiration={product.expiration_date}
              warehouse={product.warehouse_name || '–'}
            />
          ))}
        </div>
      )}
    </article>
  );
}

export default ProductCatalog;
