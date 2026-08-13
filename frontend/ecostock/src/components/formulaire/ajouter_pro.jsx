import React, { useState, useEffect } from 'react';
import productService from '../api/productService';
import warehouseService from '../api/warehouseService';

function AjouterPro({ onClose, onCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    expiration_date: '',
    warehouse: '',
  });
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger la liste des entrepôts depuis l'API au montage
  useEffect(() => {
    warehouseService.getAll()
      .then((res) => {
        setWarehouses(res.data);
        // Pré-sélectionner le premier entrepôt s'il existe
        if (res.data.length > 0) {
          setFormData((prev) => ({ ...prev, warehouse: res.data[0].id }));
        }
      })
      .catch(() => setError("Impossible de charger les entrepôts."));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    productService.create({
      name: formData.name,
      quantity: parseInt(formData.quantity, 10),
      expiration_date: formData.expiration_date,
      warehouse: parseInt(formData.warehouse, 10),
    })
      .then((res) => {
        if (onCreated) onCreated(res.data);
        onClose();
      })
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("Non autorisé. Veuillez vous reconnecter.");
        } else if (err.response?.data) {
          const data = err.response.data;
          const firstKey = Object.keys(data)[0];
          const firstMsg = Array.isArray(data[firstKey]) ? data[firstKey][0] : data[firstKey];
          setError(`Erreur : ${firstKey} — ${firstMsg}`);
        } else {
          setError("Erreur lors de la création du produit.");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-950/70">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/50 animate-in fade-in zoom-in-95 duration-200">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Ajouter un produit</h3>
            <p className="mt-1 text-sm text-slate-400">Renseignez les détails du nouveau produit.</p>
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
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Nom du produit</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="ex: Produit A"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Quantité</label>
              <input
                type="number"
                name="quantity"
                required
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="ex: 84"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Date d'expiration</label>
              <input
                type="date"
                name="expiration_date"
                required
                value={formData.expiration_date}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Entrepôt de stockage</label>
            <select
              name="warehouse"
              required
              value={formData.warehouse}
              onChange={handleChange}
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
              disabled={loading || warehouses.length === 0}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-200 transition disabled:opacity-60"
            >
              {loading ? 'Création…' : 'Créer le produit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AjouterPro;
