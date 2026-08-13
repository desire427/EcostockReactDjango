import Retour from '../bouton/retour.jsx';
import Modifier from '../bouton/modifier.jsx';
import Supprimer from '../bouton/supprimer.jsx';

function DetailHeader({ product, onDeleted, onUpdated }) {
  return (
    <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Produit</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">{product?.name || '–'}</h2>
        <p className="mt-2 text-sm text-slate-400">Informations détaillées et état actuel du produit dans l'inventaire.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Retour to="/produits" />
        <Modifier
          type="produit"
          initialData={product}
          onUpdated={onUpdated}
        />
        <Supprimer
          type="produit"
          productId={product?.id}
          onDeleted={onDeleted}
        />
      </div>
    </header>
  );
}

export default DetailHeader;
