import { useState, useEffect } from 'react';
import ProductLayout from './ProductLayout.jsx';
import ProductHeader from './ProductHeader.jsx';
import ProductStats from './ProductStats.jsx';
import ProductCatalog from './ProductCatalog.jsx';
import productService from '../api/productService';

function Produit() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const fetchProducts = () => {
    setLoadingProducts(true);
    productService.getAll()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Erreur chargement produits:', err))
      .finally(() => setLoadingProducts(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductCreated = (newProduct) => {
    // Recharge la liste complète pour avoir warehouse_name enrichi
    fetchProducts();
  };

  return (
    <ProductLayout>
      <ProductHeader onCreated={handleProductCreated} />
      <ProductStats />
      <section className="grid gap-6 xl:grid-cols-3">
        <ProductCatalog products={products} loading={loadingProducts} />
      </section>
    </ProductLayout>
  );
}

export default Produit;
