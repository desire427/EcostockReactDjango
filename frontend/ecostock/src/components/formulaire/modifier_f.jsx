import React, { useState, useEffect } from 'react';
import warehouseService from '../api/warehouseService';
import productService from '../api/productService';

function ModifierF({ type = 'produit', onClose, warehouseId, initialData, onUpdated }) {
  const normalizedType = String(type || '').toLowerCase().trim();
  const isProduct = ['produit', 'product', 'produits'].includes(normalizedType);

  // ── État produit ────────────────────────────────────────────────────────────
  const [productData, setProductData] = useState({
    name: initialData?.name || '',
    quantity: initialData?.quantity ?? '',
    expiration_date: initialData?.expiration_date || '',
    warehouse: initialData?.warehouse ?? '',
  });

  // ── État entrepôt ───────────────────────────────────────────────────────────
  const [warehouseData, setWarehouseData] = useState({
    name: initialData?.name || '',
    location: initialData?.location || '',
    capacity: initialData?.capacity || '',
  });

  // Liste des entrepôts pour le select produit
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger les entrepôts seulement pour le formulaire produit
  useEffect(() => {
    if (isProduct) {
      warehouseService.getAll()
        .then((res) => setWarehouses(res.data))
        .catch(() => setError("Impossible de charger les entrepôts."));
    }
  }, [isProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isProduct) {
      productService.update(initialData.id, {
        name: productData.name,
        quantity: parseInt(productData.quantity, 10),
        expiration_date: productData.expiration_date,
        warehouse: parseInt(productData.warehouse, 10),
      })
        .then((res) => {
          if (onUpdated) onUpdated(res.data);
          onClose();
        })
        .catch((err) => {
          if (err.response?.status === 401 || err.response?.status === 403) {
            setError("Non autorisé. Veuillez vous reconnecter.");
          } else {
            setError("Erreur lors de la modification du produit.");
          }
        })
        .finally(() => setLoading(false));
    } else {
      warehouseService.update(warehouseId, {
        name: warehouseData.name,
        location: warehouseData.location,
        capacity: parseInt(warehouseData.capacity, 10),
      })
        .then((res) => {
          if (onUpdated) onUpdated(res.data);
          onClose();
        })
        .catch((err) => {
          if (err.response?.status === 401 || err.response?.status === 403) {
            setError("Non autorisé. Veuillez vous reconnecter.");
          } else {
            setError("Erreur lors de la modification de l'entrepôt.");
          }
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-950/70">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/50 animate-in fade-in zoom-in-95 duration-200">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {isProduct ? 'Modifier le produit' : "Modifier l'entrepôt"}
            </h3>
            <p className="mt-1 text-sm text-slate-400">Ajustez les informations ci-dessous.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-800 p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition"
          >
            <span className="sr-only">Fermer</span>
            &times;
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-xl border border-red-800 bg-red-950/50 px-4 py-2.5 text-sm text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isProduct ? (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Nom du produit</label>
                <input
                  type="text"
                  required
                  value={productData.name}
                  onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Quantité</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={productData.quantity}
                    onChange={(e) => setProductData({ ...productData, quantity: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Date d'expiration</label>
                  <input
                    type="date"
                    required
                    value={productData.expiration_date}
                    onChange={(e) => setProductData({ ...productData, expiration_date: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Entrepôt de stockage</label>
                <select
                  required
                  value={productData.warehouse}
                  onChange={(e) => setProductData({ ...productData, warehouse: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
                >
                  {warehouses.length === 0 ? (
                    <option value="">Chargement…</option>
                  ) : (
                    warehouses.map((w) => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))
                  )}
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Nom de l'entrepôt</label>
                <input
                  type="text"
                  required
                  value={warehouseData.name}
                  onChange={(e) => setWarehouseData({ ...warehouseData, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Localisation</label>
                <input
                  type="text"
                  required
                  value={warehouseData.location}
                  onChange={(e) => setWarehouseData({ ...warehouseData, location: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Capacité (m²)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={warehouseData.capacity}
                  onChange={(e) => setWarehouseData({ ...warehouseData, capacity: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
                />
              </div>
            </>
          )}

          <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-350 hover:bg-slate-800 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-200 transition disabled:opacity-60"
            >
              {loading ? 'Enregistrement…' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModifierF;
