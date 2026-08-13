import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WarehousePageShell from './WarehousePageShell';
import Retour from '../bouton/retour.jsx';
import Modifier from '../bouton/modifier.jsx';
import Supprimer from '../bouton/supprimer.jsx';
import Sidebar from '../sidebar/sidebar.jsx';
import WarehouseHeader from './WarehouseHeader';
import DetailWarehouseInfo from './DetailWarehouseInfo';
import WarehouseProductsList from './WarehouseProductsList';
import warehouseService from '../api/warehouseService';
import productService from '../api/productService';

function DetailEntrepots() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [warehouse, setWarehouse] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

            // Charger le warehouse et ses produits en parallèle
            Promise.all([
                warehouseService.getOne(id),
                productService.getByWarehouse(id),
            ])
                .then(([warehouseRes, productsRes]) => {
                    setWarehouse(warehouseRes.data);
                    setProducts(productsRes.data);
                })
            .catch(() => {
                setError("Impossible de charger les données de l'entrepôt.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleDeleted = () => {
        // Après suppression, revenir à la liste
        navigate('/entrepots');
    };

    const handleUpdated = (updatedWarehouse) => {
        setWarehouse(updatedWarehouse);
    };

    const sidebar = <Sidebar />;

    if (loading) {
        return (
            <WarehousePageShell sidebar={sidebar}>
                <p className="text-sm text-slate-400">Chargement de l'entrepôt…</p>
            </WarehousePageShell>
        );
    }

    if (error || !warehouse) {
        return (
            <WarehousePageShell sidebar={sidebar}>
                <p className="rounded-xl border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-400">
                    {error || 'Entrepôt introuvable.'}
                </p>
            </WarehousePageShell>
        );
    }

    return (
        <WarehousePageShell sidebar={sidebar}>
            <WarehouseHeader
                eyebrow="Site de stockage"
                title={warehouse.name}
                description="Informations complètes sur la capacité, la localisation et les produits actuellement stockés."
                actions={
                    <div className="flex items-center gap-3">
                        <Retour to="/entrepots" />
                        <Modifier
                            type="entrepot"
                            warehouseId={id}
                            initialData={warehouse}
                            onUpdated={handleUpdated}
                        />
                        <Supprimer
                            type="entrepot"
                            warehouseId={id}
                            onDeleted={handleDeleted}
                        />
                    </div>
                }
            />

            <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <DetailWarehouseInfo
                    title="Informations générales"
                    subtitle="Vue d'ensemble de l'installation et de ses performances."
                    statusLabel="Actif"
                    items={[
                        { label: 'Nom', value: warehouse.name },
                        { label: 'Localisation', value: warehouse.location },
                        { label: 'Capacité', value: `${warehouse.capacity.toLocaleString('fr-FR')} m²` },
                        { label: 'Créé le', value: new Date(warehouse.created_at).toLocaleDateString('fr-FR') },
                    ]}
                />

                <WarehouseProductsList
                    title="Produits dans l'entrepôt"
                    subtitle="Liste des articles actuellement enregistrés."
                    countLabel={`${products.length} article${products.length !== 1 ? 's' : ''}`}
                    products={products.map((p) => ({
                        name: p.name,
                        details: `${p.quantity} unité${p.quantity !== 1 ? 's' : ''} • Exp. ${new Date(p.expiration_date).toLocaleDateString('fr-FR')}`,
                    }))}
                />
            </section>
        </WarehousePageShell>
    );
}

export default DetailEntrepots;
