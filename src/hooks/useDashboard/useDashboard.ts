import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Evento } from "../../types/Evento";
import { useNotificationContext } from "../../context/NotificationContext";
import { useEventContext } from "../../context/EventContext";

export const useDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<
    "todos" | "proximos" | "borradores"
  >("todos");
  const { addNotification } = useNotificationContext();
  const { eventos, deleteEvent } = useEventContext();

  const savedUserRaw = localStorage.getItem("logged_user");
  const user = savedUserRaw ? JSON.parse(savedUserRaw) : null;
  const currentName = user ? user.name : "Invitado";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Safe deletion also sends a notification without breaking the parent.
  const handleDeleteEvent = (id: string) => {
    // Capture the event name before deletion for the notification.
    const targetEvent = eventos.find((event) => event.id === id);
    const eventTitle = targetEvent ? targetEvent.titulo : "Evento";

    if (confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      // Remove the event from the shared state.
      deleteEvent(id);

      // Send the Spanish notification to the bell.
      addNotification(
        "Centro de notificaciones",
        `El evento ${eventTitle} ha sido eliminado correctamente`,
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
