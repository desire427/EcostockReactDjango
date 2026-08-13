import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Entrepots from './entrepots';
import DetailEntrepots from './detail_entrepots';

function WarehouseRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/entrepots" element={<Entrepots />} />
      <Route path="/entrepots/:id" element={<DetailEntrepots />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default WarehouseRoutes;
