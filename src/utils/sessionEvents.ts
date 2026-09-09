export const AUTH_SESSION_CHANGED_EVENT = "auth-session-changed";

export const notifySessionChange = (): void => {
  window.dispatchEvent(new Event(AUTH_SESSION_CHANGED_EVENT));
};
