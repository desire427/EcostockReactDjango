import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Enveloppe une route privée.
 * Si aucun access_token n'est présent dans localStorage,
 * redirige vers /login en mémorisant la page demandée (state.from).
 */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('access_token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
