import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import productService from '../api/productService';
import warehouseService from '../api/warehouseService';

const ChartsSection = () => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    let barChartInstance;
    let pieChartInstance;

    // Récupérer produits et entrepôts, puis construire les séries
    Promise.all([productService.getAll(), warehouseService.getAll()])
      .then(([prodRes, whRes]) => {
        const products = prodRes.data || [];
        const warehouses = whRes.data || [];

        // 1) Volume stocké par mois — regrouper par mois d'expiration (6 derniers mois)
        const now = new Date();
        const months = [];
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          months.push({
            key: `${d.getFullYear()}-${d.getMonth() + 1}`,
            label: d.toLocaleString('fr-FR', { month: 'short' }),
          });
        }

        const monthData = months.map((m) => 0);
        products.forEach((p) => {
          if (!p.expiration_date) return;
          const d = new Date(p.expiration_date);
          const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
          const idx = months.findIndex((m) => m.key === key);
          if (idx !== -1) {
            monthData[idx] += p.quantity || 0;
          }
        });

        // 2) Capacité globale — part de volume occupé par entrepôt (somme des quantités)
        const occupiedByWarehouse = warehouses.map((w) => ({ id: w.id, name: w.name, capacity: w.capacity, occupied: 0 }));
        const occupiedMap = {};
        products.forEach((p) => {
          const wid = p.warehouse;
          if (!wid) return;
          occupiedMap[wid] = (occupiedMap[wid] || 0) + (p.quantity || 0);
        });
        occupiedByWarehouse.forEach((w) => {
          w.occupied = occupiedMap[w.id] || 0;
        });

        const pieLabels = occupiedByWarehouse.map((w) => w.name);
        const pieData = occupiedByWarehouse.map((w) => w.occupied);

        // Création des charts
        if (barChartRef.current) {
          const barCtx = barChartRef.current.getContext('2d');
          barChartInstance = new Chart(barCtx, {
            type: 'bar',
            data: {
              labels: months.map((m) => m.label),
              datasets: [{
                label: 'Volume stocké (unités)',
                data: monthData,
                backgroundColor: months.map(() => 'rgba(52, 211, 153, 0.8)'),
                borderColor: months.map(() => '#34d399'),
                borderWidth: 2,
                borderRadius: 6
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(148, 163, 184, 0.1)' }, ticks: { color: '#94a3b8' } },
                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
              }
            }
          });
        }

        if (pieChartRef.current) {
          const pieCtx = pieChartRef.current.getContext('2d');
          pieChartInstance = new Chart(pieCtx, {
            type: 'doughnut',
            data: {
              labels: pieLabels,
              datasets: [{
                data: pieData,
                backgroundColor: pieLabels.map((_, i) => i === 0 ? '#f8fafc' : (i % 2 ? '#34d399' : '#64748b')),
                borderColor: '#0f172a',
                borderWidth: 3
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 15, usePointStyle: true, pointStyle: 'circle' } }
              },
              cutout: '60%'
            }
          });
        }
      })
      .catch(() => {
        // en cas d'erreur on garde les graphiques vides
      });

    return () => {
      if (barChartInstance) barChartInstance.destroy();
      if (pieChartInstance) pieChartInstance.destroy();
    };
  }, []);

  return (
    <section className="mb-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      {/* Diagramme en barre */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Volume stocké par mois</h3>
            <p className="mt-1 text-sm text-slate-400">Volume stocké par mois sur les 6 derniers mois</p>
          </div>
        </div>
        <div className="mt-4 h-[250px]"><canvas ref={barChartRef}></canvas></div>
      </div>

      {/* Diagramme circulaire */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Capacité globale</h3>
            <p className="mt-1 text-sm text-slate-400">Part de capacité occupée par entrepôt</p>
          </div>
        </div>
        <div className="mt-4 flex h-[250px] justify-center"><canvas ref={pieChartRef}></canvas></div>
      </div>
    </section>
  );
};

export default ChartsSection;