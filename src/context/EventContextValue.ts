import { createContext } from "react";
import type { Evento } from "../types/Evento";

export type EventContextType = {
  eventos: Evento[];
  addEvent: (evento: Evento) => void;
  updateEvent: (id: string, data: Partial<Evento>) => void;
  deleteEvent: (id: string) => void;
};

export const EventContext = createContext<EventContextType | null>(null);
