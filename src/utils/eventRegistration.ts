import { getSession } from "./authStorage";

export const REGISTRATION_CHANGED_EVENT = "code-crafters:registration-changed";
export const LOCAL_STORAGE_UPDATE_EVENT = "local-storage-update";

export const getRegistrationKey = (eventId: number | string): string | null => {
  const session = getSession();
  return session
    ? `code_crafters_event_inscribed_${session.id}_${eventId}`
    : null;
};

export const isEventRegistered = (eventId: number | string): boolean => {
  const key = getRegistrationKey(eventId);
  return key !== null && localStorage.getItem(key) === "true";
};

export const notifyRegistrationChange = (eventId: number | string): void => {
  window.dispatchEvent(
    new CustomEvent(REGISTRATION_CHANGED_EVENT, { detail: { eventId } }),
  );
};
