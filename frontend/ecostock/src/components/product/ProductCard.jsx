import VoirDetails from '../bouton/voirdetails.jsx';

function ProductCard({ id, title, quantity, expiration, warehouse }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-lg font-semibold text-white">{title}</h4>
        </div>
        <div className="mt-4 space-y-2 text-sm text-slate-400">
          <div className="flex justify-between">
            <span>Quantité</span>
            <span className="font-medium text-slate-200">{quantity}</span>
          </div>
          <div className="flex justify-between">
            <span>Expiration</span>
            <span className="font-medium text-slate-200">{expiration}</span>
          </div>
          <div className="flex justify-between">
            <span>Entrepôt</span>
            <span className="font-medium text-slate-200">{warehouse}</span>
          </div>
        </div>
        <VoirDetails to={`/produits/${id}`} variant="primary" />
      </div>
    </div>
  );
}

export default ProductCard;
