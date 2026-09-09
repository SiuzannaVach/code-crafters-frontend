import type { Evento } from "../types/Evento";

export const CREATED_EVENTS_KEY = "cc_created_events";

export const readCreatedEvents = (): Evento[] => {
  const storedEvents = localStorage.getItem(CREATED_EVENTS_KEY);

  if (!storedEvents) {
    return [];
  }

  const parsedEvents: unknown = JSON.parse(storedEvents);
  if (!Array.isArray(parsedEvents)) {
    throw new Error(`The "${CREATED_EVENTS_KEY}" value must be an array.`);
  }

  return parsedEvents as Evento[];
};
