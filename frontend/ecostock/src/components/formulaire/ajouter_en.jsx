import React, { useState } from 'react';
import warehouseService from '../api/warehouseService';

function AjouterEn({ onClose, onCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    warehouseService.create({
      name: formData.name,
      location: formData.location,
      capacity: parseInt(formData.capacity, 10),
    })
      .then((response) => {
        if (onCreated) onCreated(response.data);
        onClose();
      })
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("Non autorisé. Veuillez vous reconnecter.");
        } else if (err.response?.data) {
          // Affiche le premier message d'erreur retourné par le sérialiseur Django
          const data = err.response.data;
          const firstKey = Object.keys(data)[0];
          const firstMsg = Array.isArray(data[firstKey]) ? data[firstKey][0] : data[firstKey];
          setError(`Erreur : ${firstKey} — ${firstMsg}`);
        } else {
          setError("Impossible de contacter le serveur. Vérifiez que le backend est démarré.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-950/70">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/50 animate-in fade-in zoom-in-95 duration-200">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Ajouter un entrepôt</h3>
            <p className="mt-1 text-sm text-slate-400">Renseignez les détails du nouveau site de stockage.</p>
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
            <label className="mb-2 block text-sm font-medium text-slate-300">Nom de l'entrepôt</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="ex: Entrepôt principal"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Localisation</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="ex: Zone industrielle, Quartier central"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Capacité (m²)</label>
            <input
              type="number"
              name="capacity"
              required
              min="1"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="ex: 4200"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
            />
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
              disabled={loading}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition disabled:opacity-60"
            >
              {loading ? 'Création…' : "Créer l'entrepôt"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AjouterEn;
