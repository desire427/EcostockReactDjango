import React, { useState } from 'react';
import SupprimerF from '../formulaire/supprimer_f.jsx';

function Supprimer({ type = 'produit', onClick, label = 'Supprimer', warehouseId, productId, onDeleted }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (e) => {
    setIsOpen(true);
    if (onClick) onClick(e);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleButtonClick}
        className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        {label}
      </button>

      {isOpen && (
        <SupprimerF
          type={type}
          onClose={() => setIsOpen(false)}
          warehouseId={warehouseId}
          productId={productId}
          onDeleted={onDeleted}
        />
      )}
    </>
  );
}

export default Supprimer;
