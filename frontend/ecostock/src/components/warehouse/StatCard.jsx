import React from 'react';

function StatCard({ label, value, accent = false }) {
  return (
    <div className={`rounded-2xl border border-slate-800 bg-slate-900 p-5 ${accent ? 'border-emerald-900/40' : ''}`}>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

export default StatCard;
