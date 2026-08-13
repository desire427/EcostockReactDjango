import React from 'react';

function AccueilHeader() {
  return (
    <header className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="mt-2 text-3xl font-semibold text-white">Tableau de bord EcoStock</h2>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-2.5 text-sm text-slate-300">
          Aujourd'hui • 08 juillet 2026
        </div>
      </div>
    </header>
  );
}

export default AccueilHeader;
