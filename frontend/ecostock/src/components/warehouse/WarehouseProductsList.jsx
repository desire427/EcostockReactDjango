import React from 'react';

function WarehouseProductsList({ title, subtitle, countLabel, products }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-slate-200">{countLabel}</span>
      </div>

      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
            <div>
              <p className="font-medium text-white">{product.name}</p>
              <p className="text-sm text-slate-400">{product.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WarehouseProductsList;
