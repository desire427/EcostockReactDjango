import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../login/login';
import Accueil from './accueil';
import Entrepots from '../warehouse/entrepots';
import DetailEntrepots from '../warehouse/detail_entrepots';

function AccueilRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/accueil" element={<Accueil />} />
      <Route path="/entrepots" element={<Entrepots />} />
      <Route path="/entrepots/:id" element={<DetailEntrepots />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AccueilRoutes;
