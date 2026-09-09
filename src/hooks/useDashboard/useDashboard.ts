import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Evento } from "../../types/Evento";
import { readCreatedEvents } from "../../utils/eventStorage";
import {
  mockEventosCreados,
} from "../../data/Dashboard/moskDashboard";

import { useNotificationContext } from "../../context/NotificationContext";

export const useDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<
    "todos" | "proximos" | "borradores"
  >("todos");
  const [eventos, setEventos] = useState<Evento[]>(() => [
    ...mockEventosCreados,
    ...readCreatedEvents(),
  ]);

  const { addNotification } = useNotificationContext();

  const savedUserRaw = localStorage.getItem("logged_user");
  const user = savedUserRaw ? JSON.parse(savedUserRaw) : null;
  const currentName = user ? user.name : "Invitado";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 🔥 Безопасное удаление: отправляет уведомление и не ломает родителя
  const handleDeleteEvent = (id: string) => {
    // Находим имя события до удаления для красивого текста
    const targetEvent = eventos.find((event) => event.id === id);
    const eventTitle = targetEvent ? targetEvent.titulo : "Evento";

    if (confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      // 1. Удаляем из локального стейта, как и просит твой дашборд
      setEventos((prev) => prev.filter((event) => event.id !== id));

      // 2. В один клик шлем испанский текст в колокольчик shadcn
      addNotification(
        "Evento eliminado 🗑️",
        `El evento "${eventTitle}" ha sido eliminado correctamente de tu panel.`,
      );
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

  const stats = useMemo(() => {
    const getEstado = (evento: Evento) =>
      evento.estado ?? evento.status ?? "activo";

    return {
      eventosActivos: eventos.filter(
        (evento) => getEstado(evento) === "activo",
      ).length,
      asistentesTotales: eventos.reduce(
        (total, evento) => total + (Number.isFinite(evento.vistas) ? evento.vistas : 0),
        0,
      ),
      registradores: 0,
      borradores: eventos.filter(
        (evento) => getEstado(evento) === "borrador",
      ).length,
    };
  }, [eventos]);

  return {
    stats,
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
