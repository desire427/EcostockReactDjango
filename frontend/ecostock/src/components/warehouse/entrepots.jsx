import React, { useState, useEffect } from 'react';
import WarehousePageShell from './WarehousePageShell';
import Ajouter from '../bouton/ajouter.jsx';
import Sidebar from '../sidebar/sidebar.jsx';
import WarehouseHeader from './WarehouseHeader';
import StatCard from './StatCard';
import WarehouseCard from './WarehouseCard';
import warehouseService from '../api/warehouseService';

function Entrepots() {
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // L'utilisateur connecté est le responsable de tous les entrepôts créés sur cette session
    const username = localStorage.getItem('username') || '–';

    useEffect(() => {
        warehouseService.getAll()
            .then((response) => setWarehouses(response.data))
            .catch(() => setError('Impossible de charger les entrepôts.'))
            .finally(() => setLoading(false));
    }, []);

    const totalCapacity = warehouses.reduce((sum, w) => sum + (w.capacity || 0), 0);

    const sidebar = <Sidebar />;

    return (
        <WarehousePageShell sidebar={sidebar}>
            <WarehouseHeader
                eyebrow="Infrastructure"
                title="Entrepôts"
                description="Suivi de la capacité, de l'emplacement et du niveau d'occupation de chaque site de stockage."
                actions={
                    <div className="flex items-center gap-3">
                        <Ajouter
                            type="entrepot"
                            onCreated={(newWarehouse) => setWarehouses((prev) => [...prev, newWarehouse])}
                        />
                    </div>
                }
            />

            <section className="mb-6 grid gap-4 md:grid-cols-3">
                <StatCard label="Sites actifs" value={loading ? '…' : warehouses.length} />
                <StatCard label="Capacité totale" value={loading ? '…' : `${totalCapacity.toLocaleString('fr-FR')} m²`} />
                <StatCard label="Produits stockés" value={loading ? '…' : warehouses.reduce((sum, w) => sum + (w.products_count || 0), 0)} accent />
            </section>

            {error && (
                <p className="mb-4 rounded-xl border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-400">
                    {error}
                </p>
            )}

            {loading ? (
                <p className="text-sm text-slate-400">Chargement des entrepôts…</p>
            ) : warehouses.length === 0 ? (
                <p className="text-sm text-slate-400">Aucun entrepôt enregistré.</p>
            ) : (
                <section className="grid gap-6 xl:grid-cols-2">
                    {warehouses.map((warehouse) => {
                        const occupation = warehouse.capacity
                            ? Math.round(((warehouse.products_count ?? 0) / warehouse.capacity) * 100)
                            : 0;

                        return (
                            <WarehouseCard
                                key={warehouse.id}
                                title={warehouse.name}
                                location={warehouse.location}
                                capacity={`${warehouse.capacity.toLocaleString('fr-FR')} m²`}
                                occupation={occupation}
                                responsable={username}
                                products={warehouse.products_count ?? 0}
                                actionLabel="Voir les détails"
                                actionHref={`/entrepots/${warehouse.id}`}
                            />
                        );
                    })}
                </section>
            )}
        </WarehousePageShell>
    );
}

export default Entrepots;
