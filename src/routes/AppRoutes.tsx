import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginCard } from '../pages/Login/LoginCard';
import { RegisterModal } from '../components/RegisterModal/RegisterModal';
import CreateEvent from '../pages/CreateEvent/CreateEvent';
import Home from '../pages/Home/Home';
import AuthenticatedLayout from '../components/AuthenticatedLayout/AuthenticatedLayout';
import EventDetail from '../pages/EventDetail/EventDetail'; 

// Временная макетная заглушка для Дашборда, чтобы проект сразу скомпилировался без ошибок
const DashboardStub: React.FC = () => (
  <div style={{ padding: '2rem', color: '#fff' }}>
    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Panel de Control (Dashboard)</h1>
    <p style={{ color: '#a1a1aa' }}>Listado de Eventos (CC-19) и аналитика хакатонов будут отображаться здесь.</p>
  </div>
);

const AppRoutes: React.FC = () => {
  
  return (
       <Routes>
      {/* Páginas SIN Sidebar/Header (Login, Register) */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginCard />} />
      <Route path="/register" element={<RegisterModal />} />


      {/* Páginas CON Sidebar — envueltas en el layout */}
      <Route element={<AuthenticatedLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/create-event" element={<CreateEvent />} />
        {/* 🔥 ПОДКЛЮЧИЛИ ДАШБОРД: Теперь роут официально зарегистрирован в системе! */}
        <Route path="/dashboard" element={<DashboardStub />} />
      </Route>

      {/* Редирект для всех остальных несуществующих страниц */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
