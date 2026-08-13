import React from 'react';

function StatCard({ label, value, detail, accent = false }) {
  return (
    <div className={`rounded-2xl border border-slate-800 bg-slate-900 p-5 ${accent ? 'border-emerald-900/40' : ''}`}>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      <p className={`mt-2 text-sm ${accent ? 'text-emerald-300' : 'text-slate-400'}`}>{detail}</p>
    </div>
  );
}

export default StatCard;
