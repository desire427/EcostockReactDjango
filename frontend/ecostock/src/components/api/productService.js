import apiClient from './axios';

// Endpoints produits du backend : /api/v1/products/
const BASE = '/products';

const productService = {
  // GET /api/v1/products/
  getAll: () => apiClient.get(`${BASE}/`),

  // GET /api/v1/products/?warehouse=<id>
  getByWarehouse: (warehouseId) => apiClient.get(`${BASE}/?warehouse=${warehouseId}`),

  // GET /api/v1/products/:id/
  getOne: (id) => apiClient.get(`${BASE}/${id}/`),

  // GET /api/v1/products/stats/  → { total_products, disponibles, a_surveiller }
  getStats: () => apiClient.get(`${BASE}/stats/`),

  // POST /api/v1/products/
  create: (data) => apiClient.post(`${BASE}/`, data),

  // PUT /api/v1/products/:id/
  update: (id, data) => apiClient.put(`${BASE}/${id}/`, data),

  // DELETE /api/v1/products/:id/
  remove: (id) => apiClient.delete(`${BASE}/${id}/`),

  // POST /api/v1/products/:id/move/
  move: (id, warehouseId) => apiClient.post(`${BASE}/${id}/move/`, { warehouse: warehouseId }),
};

export default productService;
