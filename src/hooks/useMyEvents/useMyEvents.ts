import { useEffect, useState } from "react";
import { useEventContext } from "../useEventContext/useEventContext";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "../useNotificationContext/useNotificationContext";
import { getSession } from "../../utils/authStorage";
import type { Evento } from "../../types/Evento";
import {
  getRegistrationKey,
  LOCAL_STORAGE_UPDATE_EVENT,
  notifyRegistrationChange,
} from "../../utils/eventRegistration";

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
    let isActive = true;

    Promise.resolve()
      .then(() => {
        const role =
          typeof sessionRole === "string"
            ? sessionRole.toLowerCase()
            : "";

        if (role !== "espectador") {
          return [];
        }

        return eventos.filter((evento) => {
          const registrationKey = getRegistrationKey(evento.id);
          return (
            registrationKey !== null &&
            localStorage.getItem(registrationKey) === "true"
          );
        });
      })
      .then((inscribedEvents) => {
        if (isActive) {
          setState({
            inscribedEvents,
            isLoading: false,
            error: null,
          });
        }
      })
      .catch((error: unknown) => {
        if (isActive) {
          console.error("Error al cargar los eventos registrados:", error);
          setState({
            inscribedEvents: [],
            isLoading: false,
            error: "No se pudieron cargar tus eventos.",
          });
        }
      });

    return () => {
      isActive = false;
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
