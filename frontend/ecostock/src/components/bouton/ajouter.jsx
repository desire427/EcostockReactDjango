import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AjouterEn from '../formulaire/ajouter_en.jsx';
import AjouterPro from '../formulaire/ajouter_pro.jsx';

function Ajouter({ type = 'produit', to, onClick, onCreated, label, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const isWarehouse = type === 'entrepot';
  const defaultLabel = isWarehouse ? '+ Ajouter un entrepôt' : 'Ajouter un produit';
  const className = isWarehouse
    ? 'rounded-xl bg-emerald-600 px-2 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700'
    : 'rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-200';

  const content = children || label || defaultLabel;

  const handleButtonClick = (e) => {
    setIsOpen(true);
    if (onClick) onClick(e);
  };

  return (
    <>
      {to ? (
        <Link to={to} className={className} onClick={onClick}>
          {content}
        </Link>
      ) : (
        <button type="button" className={className} onClick={handleButtonClick}>
          {content}
        </button>
      )}

      {isOpen && (
        isWarehouse ? (
          <AjouterEn onClose={() => setIsOpen(false)} onCreated={onCreated} />
        ) : (
          <AjouterPro onClose={() => setIsOpen(false)} onCreated={onCreated} />
        )
      )}
    </>
  );
}

export default Ajouter;
