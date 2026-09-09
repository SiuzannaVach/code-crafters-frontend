import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginCard } from "../pages/Login/LoginCard";
import { RegisterModal } from "../components/RegisterModal/RegisterModal";
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import Home from "../pages/Home/Home";
import AuthenticatedLayout from "../components/AuthenticatedLayout/AuthenticatedLayout";
import EventDetail from "../pages/EventDetail/EventDetail";
import { Dashboard } from "../pages/Dashboard/Dashboard";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redirect the root route to login. */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginCard />} />
      <Route path="/register" element={<RegisterModal />} />

      {/* Main pages share the authenticated layout. */}
      <Route element={<AuthenticatedLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Unknown routes return to login. */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
