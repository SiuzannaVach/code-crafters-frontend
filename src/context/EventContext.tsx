import { createContext, useContext, useState, useEffect } from "react";
import type { Evento } from "../types/Evento";
import { mockEventosCreados } from "../data/Dashboard/moskDashboard";
import {
  CREATED_EVENTS_KEY,
  readCreatedEvents,
} from "../utils/eventStorage";

type EventContextType = {
  eventos: Evento[];
  addEvent: (evento: Evento) => void;
  updateEvent: (id: string, data: Partial<Evento>) => void;
  deleteEvent: (id: string) => void;
};

const EventContext = createContext<EventContextType | null>(null);

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [eventos, setEventos] = useState<Evento[]>(() => {
    return [...mockEventosCreados, ...readCreatedEvents()];
  });

  useEffect(() => {
    const defaultEventIds = new Set(mockEventosCreados.map((evento) => evento.id));
    const createdEvents = eventos.filter(
      (evento) => !defaultEventIds.has(evento.id),
    );
    localStorage.setItem(CREATED_EVENTS_KEY, JSON.stringify(createdEvents));
  }, [eventos]);

  const addEvent = (evento: Evento) => {
    setEventos((prev) => [...prev, evento]);
  };

  const updateEvent = (id: string, data: Partial<Evento>) => {
    setEventos((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...data } : e))
    );
  };

  // Delete an event.
  const deleteEvent = (id: string) => {
    setEventos((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <EventContext.Provider
      value={{ eventos, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Hook for accessing the event context.
export const useEventContext = () => {
  const ctx = useContext(EventContext);
  if (!ctx) {
    throw new Error("useEventContext must be used inside EventProvider");
  }
  return ctx;
};
