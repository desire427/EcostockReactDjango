import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DetailLayout from './DetailLayout.jsx';
import DetailHeader from './DetailHeader.jsx';
import DetailOverview from './DetailOverview.jsx';
import DetailSummary from './DetailSummary.jsx';
import productService from '../api/productService';

function DetailProduit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    productService.getOne(id)
      .then((res) => setProduct(res.data))
      .catch(() => setError('Produit introuvable.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDeleted = () => navigate('/produits');
  const handleUpdated = (updated) => setProduct(updated);

  if (loading) {
    return (
      <DetailLayout>
        <p className="text-sm text-slate-400">Chargement du produit…</p>
      </DetailLayout>
    );
  }

  if (error || !product) {
    return (
      <DetailLayout>
        <p className="rounded-xl border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-400">
          {error || 'Produit introuvable.'}
        </p>
      </DetailLayout>
    );
  }

  return (
    <DetailLayout>
      <DetailHeader
        product={product}
        onDeleted={handleDeleted}
        onUpdated={handleUpdated}
      />
      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <DetailOverview product={product} />
        <DetailSummary product={product} />
      </section>
    </DetailLayout>
  );
}

export default DetailProduit;
