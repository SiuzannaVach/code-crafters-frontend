import { useEffect, useState } from "react";
import { useEventContext } from "../useEventContext/useEventContext";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "../useNotificationContext/useNotificationContext";
import { getSession } from "../../utils/authStorage";
import type { Evento } from "../../types/Evento";
import { desktopEvents, mobileEvents } from "../../data/Home/HomeMosk";
import {
  getRegistrationKey,
  LOCAL_STORAGE_UPDATE_EVENT,
  REGISTRATION_CHANGED_EVENT,
  notifyRegistrationChange,
} from "../../utils/eventRegistration";
import { AUTH_SESSION_CHANGED_EVENT } from "../../utils/sessionEvents";

interface MyEventsState {
  inscribedEvents: Evento[];
  isLoading: boolean;
  error: string | null;
}

const INITIAL_STATE: MyEventsState = {
  inscribedEvents: [],
  isLoading: true,
  error: null,
};

export const useMyEvents = () => {
  const { eventos } = useEventContext();
  const navigate = useNavigate();
  const { addNotification } = useNotificationContext();
  const session = getSession();
  const sessionRole = session?.role;
  const [state, setState] = useState<MyEventsState>(INITIAL_STATE);

  useEffect(() => {
    const loadRegisteredEvents = () => {
      try {
        const role =
          typeof sessionRole === "string" ? sessionRole.toLowerCase() : "";

        if (role !== "espectador") {
          setState({ inscribedEvents: [], isLoading: false, error: null });
          return;
        }

        const homeEvents: Evento[] = [...desktopEvents, ...mobileEvents].map(
          (evento) => ({
            id: String(evento.id),
            titulo: evento.title,
            descripcion: Array.isArray(evento.description)
              ? evento.description.join(" ")
              : evento.description ?? "",
            fecha: evento.date,
            imagen: evento.image,
            modalidad:
              evento.modality.toLowerCase().includes("presencial")
                ? "presencial"
                : "online",
            ubicacion: evento.location,
            categoria: evento.category,
            organizadorId: "mock-organizer",
            vistas: evento.views ?? 0,
            estado: "activo",
          }),
        );
        const eventsById = new Map(
          [...eventos, ...homeEvents].map((evento) => [String(evento.id), evento]),
        );
        const inscribedEvents = [...eventsById.values()].filter((evento) => {
          const registrationKey = getRegistrationKey(evento.id);
          return (
            registrationKey !== null &&
            localStorage.getItem(registrationKey) === "true"
          );
        });

        setState({ inscribedEvents, isLoading: false, error: null });
      } catch (error: unknown) {
        console.error("Error al cargar los eventos registrados:", error);
        setState({
          inscribedEvents: [],
          isLoading: false,
          error: "No se pudieron cargar tus eventos.",
        });
      }
    };

    loadRegisteredEvents();
    window.addEventListener("storage", loadRegisteredEvents);
    window.addEventListener(LOCAL_STORAGE_UPDATE_EVENT, loadRegisteredEvents);
    window.addEventListener(REGISTRATION_CHANGED_EVENT, loadRegisteredEvents);
    window.addEventListener(AUTH_SESSION_CHANGED_EVENT, loadRegisteredEvents);

    return () => {
      window.removeEventListener("storage", loadRegisteredEvents);
      window.removeEventListener(LOCAL_STORAGE_UPDATE_EVENT, loadRegisteredEvents);
      window.removeEventListener(REGISTRATION_CHANGED_EVENT, loadRegisteredEvents);
      window.removeEventListener(AUTH_SESSION_CHANGED_EVENT, loadRegisteredEvents);
    };
  }, [eventos, sessionRole]);

  const cancelEnrollment = (evento: Evento) => {
    const registrationKey = getRegistrationKey(evento.id);
    if (registrationKey) {
      localStorage.removeItem(registrationKey);
    }
    notifyRegistrationChange(evento.id);
    window.dispatchEvent(new Event(LOCAL_STORAGE_UPDATE_EVENT));
    setState((previous) => ({
      ...previous,
      inscribedEvents: previous.inscribedEvents.filter(
        (currentEvent) => currentEvent.id !== evento.id,
      ),
    }));
    addNotification(
      "Centro de notificaciones",
      `Has cancelado tu inscripción en el evento: ${evento.titulo}`,
    );
  };

  const openEventDetails = (evento: Evento) => {
    navigate(`/events/${evento.id}`);
  };

  return {
    ...state,
    isGuest: session === null,
    cancelEnrollment,
    openEventDetails,
    goToLogin: () => navigate("/login"),
  };
};
