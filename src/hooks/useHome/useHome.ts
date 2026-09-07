import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { EventItem } from "../../data/Home/HomeMosk";

export const useHome = (
  desktopEvents: EventItem[],
  mobileEvents: EventItem[],
) => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 769);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentEvents = isDesktop ? desktopEvents : mobileEvents;
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

  const handleEventClick = (id: number) => {
    navigate(`/events/${id}`);
  };

  const filteredEvents = currentEvents.filter((event) => {
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
  };
};
