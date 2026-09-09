import { useState, useEffect } from "react";
import type { Evento } from "../types/Evento";
import { mockEventosCreados } from "../data/Dashboard/moskDashboard";
import {
  CREATED_EVENTS_KEY,
  readCreatedEvents,
} from "../utils/eventStorage";
import { EventContext } from "./EventContextValue";

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [eventos, setEventos] = useState<Evento[]>(() => {
    const storedEvents = readCreatedEvents();
    const storedById = new Map(storedEvents.map((evento) => [evento.id, evento]));
    return mockEventosCreados.map((evento) => storedById.get(evento.id) ?? evento)
      .concat(
        storedEvents.filter(
          (evento) => !mockEventosCreados.some((mock) => mock.id === evento.id),
        ),
      );
  });

  useEffect(() => {
    const defaultEventsById = new Map(
      mockEventosCreados.map((evento) => [evento.id, evento]),
    );
    const persistedEvents = eventos.filter((evento) => {
      const defaultEvent = defaultEventsById.get(evento.id);
      return !defaultEvent || JSON.stringify(defaultEvent) !== JSON.stringify(evento);
    });
    localStorage.setItem(CREATED_EVENTS_KEY, JSON.stringify(persistedEvents));
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
