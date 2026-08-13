import React from 'react';
import { Link } from 'react-router-dom';

function VoirDetails({ to, label = 'Voir le détail', variant = 'primary' }) {
  const className = variant === 'primary'
    ? 'mt-5 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-200'
    : 'inline-flex rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800';

  return (
    <Link to={to} className={className}>
      {label}
    </Link>
  );
}

export default VoirDetails;
