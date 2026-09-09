import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { EventItem } from "../../data/Home/HomeMosk";
import type { Evento } from "../../types/Evento";
import { readCreatedEvents } from "../../utils/eventStorage";
import { getSession } from "../../utils/authStorage";
import {
  isEventRegistered,
  LOCAL_STORAGE_UPDATE_EVENT,
  REGISTRATION_CHANGED_EVENT,
} from "../../utils/eventRegistration";
import { AUTH_SESSION_CHANGED_EVENT } from "../../utils/sessionEvents";

export const useHome = (
  desktopEvents: EventItem[],
  mobileEvents: EventItem[],
) => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);
  const [, setRegistrationVersion] = useState(0);
  const navigate = useNavigate();
  const isGuest = getSession() === null;

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 769);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key?.startsWith("code_crafters_event_inscribed_") || event.key === null) {
        setRegistrationVersion((version) => version + 1);
      }
    };

    const checkRegistrationStatus = () => {
      setRegistrationVersion((version) => version + 1);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(REGISTRATION_CHANGED_EVENT, checkRegistrationStatus);
    window.addEventListener(LOCAL_STORAGE_UPDATE_EVENT, checkRegistrationStatus);
    window.addEventListener(AUTH_SESSION_CHANGED_EVENT, checkRegistrationStatus);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        REGISTRATION_CHANGED_EVENT,
        checkRegistrationStatus,
      );
      window.removeEventListener(
        LOCAL_STORAGE_UPDATE_EVENT,
        checkRegistrationStatus,
      );
      window.removeEventListener(
        AUTH_SESSION_CHANGED_EVENT,
        checkRegistrationStatus,
      );
    };
  }, []);

  const currentEvents = isDesktop ? desktopEvents : mobileEvents;
  const createdEvents = readCreatedEvents().map<EventItem>((event: Evento) => ({
    id: event.id,
    title: event.titulo,
    category: event.categoria,
    modality: event.modalidad,
    location: event.ubicacion,
    date: event.fecha,
    image: event.imagen,
    description: event.descripcion,
    views: event.vistas,
  }));
  const allEvents = [...currentEvents, ...createdEvents];
  const searchQuery = (searchParams.get("search") || "").toLowerCase();

  const handleSearchChange = (val: string) => {
    if (val) searchParams.set("search", val);
    else searchParams.delete("search");
    setSearchParams(searchParams);
  };

  const handleAgendaClick = () => {
    document
      .getElementById("events-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  const handleRegisterClick = () => {
    navigate("/events/1");
  };

  const handleEventClick = (id: number | string) => {
    navigate(`/events/${id}`);
  };

  const filteredEvents = allEvents.filter((event) => {
    const matchesCategory =
      activeCategory === "Todos" ||
      activeCategory === "Todos los eventos" ||
      event.category === activeCategory ||
      (activeCategory === "Desarrollo Web" &&
        (event.category === "Desarrollo Web" ||
          (event.tags &&
            event.tags.some((t: string) => t.toLowerCase().includes("web")))));

    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery) ||
      event.category.toLowerCase().includes(searchQuery) ||
      (typeof event.description === "string" &&
        event.description.toLowerCase().includes(searchQuery)) ||
      (Array.isArray(event.description) &&
        event.description.some((d: string) =>
          d.toLowerCase().includes(searchQuery),
        )) ||
      (event.tags &&
        event.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchQuery),
        ));

    return matchesCategory && matchesSearch;
  });

  return {
    activeCategory,
    setActiveCategory,
    searchParams,
    isDesktop,
    filteredEvents,
    handleSearchChange,
    handleRegisterClick,
    handleAgendaClick,
    handleEventClick,
    isEventRegistered,
    isGuest,
  };
};
