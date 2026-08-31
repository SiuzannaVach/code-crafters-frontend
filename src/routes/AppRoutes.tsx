import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LoginCard } from '../pages/Login/LoginCard';
import { RegisterModal } from '../components/RegisterModal/RegisterModal';
import CreateEvent from '../pages/CreateEvent/CreateEvent';
import Home from '../pages/Home/Home';
import AuthenticatedLayout from '../components/AuthenticatedLayout/AuthenticatedLayout';
import EventDetail from '../pages/EventDetail/EventDetail'; 


const AppRoutes: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Páginas SIN Sidebar/Header (Login, Register) */}
      <Route path="/" element={<Navigate to="/home" replace />} />
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
        <Route path="/home" element={<Home />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Route>


      {/* Редирект для всех остальных несуществующих страниц */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
