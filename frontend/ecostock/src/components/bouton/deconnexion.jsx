import React from 'react';

function Deconnexion({ label = 'Se déconnecter', onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 inline-flex rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
    >
      {label}
    </button>
  );
}

export default Deconnexion;
