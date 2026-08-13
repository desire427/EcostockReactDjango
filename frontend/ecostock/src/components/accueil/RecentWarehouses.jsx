import React from 'react';

function RecentWarehouses() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Derniers entrepôts</h3>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-slate-200">3 sites</span>
      </div>
      <div className="space-y-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between">
            <p className="font-medium text-white">Entrepôt principal</p>
          </div>
          <p className="mt-1 text-sm text-slate-400">Quartier central • Capacité 4 200 m²</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between">
            <p className="font-medium text-white">Entrepôt secondaire</p>
          </div>
          <p className="mt-1 text-sm text-slate-400">Zone industrielle • Capacité 3 100 m²</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between">
            <p className="font-medium text-white">Entrepôt nord</p>
          </div>
          <p className="mt-1 text-sm text-slate-400">Périphérie • Capacité 2 500 m²</p>
        </div>
      </div>
    </div>
  );
}

export default RecentWarehouses;
