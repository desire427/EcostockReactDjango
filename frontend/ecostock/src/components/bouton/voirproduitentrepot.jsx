import React from 'react';
import { Link } from 'react-router-dom';

function VoirProduitEntrepot({ to, label }) {
  return (
    <Link
      to={to}
      className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
    >
      {label}
    </Link>
  );
}

export default VoirProduitEntrepot;
