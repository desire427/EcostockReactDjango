function DetailSummary({ product }) {
  const today = new Date();
  const expDate = product?.expiration_date ? new Date(product.expiration_date) : null;
  const isExpired = expDate && expDate < today;
  const stockFaible = product?.quantity <= 10;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20">
        <h3 className="text-lg font-semibold text-white">Résumé opérationnel</h3>
        <div className="mt-4 space-y-3 text-sm text-slate-400">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span>Quantité</span>
            <span className="font-medium text-white">{product?.quantity ?? '–'} unité{product?.quantity !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span>Expiration</span>
            <span className={`font-medium ${isExpired ? 'text-red-400' : 'text-white'}`}>
              {expDate ? expDate.toLocaleDateString('fr-FR') : '–'}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span>Stock faible</span>
            <span className={`font-medium ${stockFaible ? 'text-amber-300' : 'text-emerald-300'}`}>
              {stockFaible ? 'À surveiller' : 'Normal'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Disponibilité</span>
            <span className={`font-medium ${isExpired ? 'text-red-400' : 'text-emerald-300'}`}>
              {isExpired ? 'Indisponible' : 'Satisfaisante'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailSummary;
