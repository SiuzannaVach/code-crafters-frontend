import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Evento } from "../../types/Evento";
import {
  mockStats,
  mockEventosCreados,
} from "../../data/Dashboard/moskDashboard";

export const useDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<
    "todos" | "proximos" | "borradores"
  >("todos");
  const [eventos, setEventos] = useState<Evento[]>(mockEventosCreados);

  const savedUserRaw = localStorage.getItem("logged_user");
  const user = savedUserRaw ? JSON.parse(savedUserRaw) : null;
  const currentName = user ? user.name : "Invitado";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      setEventos((prev) => prev.filter((event) => event.id !== id));
    }
  };

  const handleLogout = () => {
    console.clear();
    localStorage.removeItem("logged_user");
    navigate("/login");
  };

  const filteredEventos = useMemo<Evento[]>(() => {
    return eventos.filter((evento) => {
      const matchesSearch = evento.titulo
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      if (activeFilter === "borradores") {
        return evento.modalidad === "online";
      }
      if (activeFilter === "proximos") {
        return evento.modalidad === "presencial";
      }

      return true;
    });
  }, [eventos, searchTerm, activeFilter]);

  return {
    stats: mockStats,
    eventos: filteredEventos,
    searchTerm,
    activeFilter,
    currentName,
    setActiveFilter,
    handleSearch,
    handleDeleteEvent,
    handleLogout,
  };
};
