import apiClient from './axios';

// Endpoints warehouse du backend : /api/v1/warehouse/
const BASE = '/warehouse';

const warehouseService = {
  // GET /api/v1/warehouse/
  getAll: () => apiClient.get(`${BASE}/`),

  // GET /api/v1/warehouse/:id/
  getOne: (id) => apiClient.get(`${BASE}/${id}/`),

  // GET /api/v1/warehouse/:id/audit/  → total produits dans l'entrepôt
  getAudit: (id) => apiClient.get(`${BASE}/${id}/audit/`),

  // POST /api/v1/warehouse/
  create: (data) => apiClient.post(`${BASE}/`, data),

  // PUT /api/v1/warehouse/:id/
  update: (id, data) => apiClient.put(`${BASE}/${id}/`, data),

  // DELETE /api/v1/warehouse/:id/
  remove: (id) => apiClient.delete(`${BASE}/${id}/`),
};

export default warehouseService;
