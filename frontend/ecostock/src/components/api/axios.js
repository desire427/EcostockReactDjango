import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Intercepteur de requête ──────────────────────────────────────────────────
// Attache le token JWT (access) à chaque requête sortante
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Intercepteur de réponse ──────────────────────────────────────────────────
// Si le serveur répond 401 (token expiré), on tente un refresh silencieux.
// Exclure /token et /refresh pour éviter toute boucle infinie.
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest.url || '';

    // Ne jamais tenter de refresh sur les routes d'auth elles-mêmes
    const isAuthCall = url.includes('/token') || url.includes('/refresh');
    const is401 = error.response?.status === 401;

    if (is401 && !originalRequest._retry && !isAuthCall) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        _logout();
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${API_URL}/refresh`, {
          refresh: refreshToken,
        });

        localStorage.setItem('access_token', data.access);
        originalRequest.headers['Authorization'] = `Bearer ${data.access}`;

        return apiClient(originalRequest);
      } catch {
        _logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

function _logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('username');
  window.location.href = '/login';
}

export default apiClient;
