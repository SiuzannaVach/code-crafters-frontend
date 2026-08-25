import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LoginCard } from '../pages/Login/LoginCard';
import { RegisterModal } from '../components/RegisterModal/RegisterModal';
import CreateEvent from '../pages/CreateEvent/CreateEvent';
import AuthenticatedLayout from '../components/AuthenticatedLayout/AuthenticatedLayout';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Páginas SIN Sidebar (Login, Register) */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={<LoginCard onNavigate={() => navigate('/register')} />}
      />
      <Route
        path="/register"
        element={<RegisterModal onNavigate={() => navigate('/login')} />}
      />

      {/* Páginas CON Sidebar — envueltas en el layout */}
      <Route element={<AuthenticatedLayout />}>
        <Route path="/create-event" element={<CreateEvent />} />
        {/* Aquí se añadirán después: /dashboard, /my-events, /stats, etc. */}
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;