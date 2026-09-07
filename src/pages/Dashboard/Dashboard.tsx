import React from "react";
import { useDashboard } from "../../hooks/useDashboard/useDashboard";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import type { Evento } from "../../types/Evento";
import {
  ActionButton,
  DeleteButton,
  Button,
} from "../../components/Dashboard/DashboardButton";
import { Calendar, Users, Plus, Search } from "lucide-react";

export const Dashboard: React.FC = () => {
  const {
    stats,
    eventos,
    searchTerm,
    activeFilter,
    currentName,
    setActiveFilter,
    handleSearch,
    handleDeleteEvent,
  } = useDashboard();

  const navigate = useNavigate();
  const savedUserRaw = localStorage.getItem("logged_user");
  const currentUser = savedUserRaw ? JSON.parse(savedUserRaw) : null;
  const displayName = currentUser?.name || currentUser?.fullName || "";
  const userAvatar = currentUser?.avatar || "";
  const isOrganizer =
    currentUser?.role === "administrador" ||
    currentUser?.role === "organizador";

  return (
    <div className={`pageLayout ${styles.dashboardContainer}`}>
      <div className={styles.mobileLayout}>
        <div className={styles.mobileLayout__profile}>
          <div className={styles.mobileLayout__profileHeader}>
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={displayName}
                className={styles.mobileLayout__avatar}
              />
            ) : (
              <div className={styles.mobileLayout__avatarPlaceholder}>
                <span>
                  {displayName ? displayName.slice(0, 2).toUpperCase() : "US"}
                </span>
              </div>
            )}
            <div className={styles.mobileLayout__profileInfo}>
              <h4>{displayName || currentName}</h4>
              {isOrganizer && <span>Modo Organizador</span>}
            </div>
          </div>

          <div className={styles.mobileLayout__profileDesc}>
            <h3>Mis Eventos</h3>
            <p>Gestiona tus próximos hackathons, meetups y talleres.</p>
          </div>
        </div>

        <div className={styles.mobileLayout__btnWrapper}>
          <Button onClick={() => navigate("/create-event")}>
            <Plus size={16} /> Crear Nuevo Evento
          </Button>
        </div>

        <section className={styles.mobileLayout__statsGrid}>
          <div className={`baseCard ${styles.dashboardStatCard}`}>
            <div className={styles.dashboardStatCard__header}>
              <span>Eventos Activos</span>
              <Calendar size={14} />
            </div>
            <div className={styles.dashboardStatCard__value}>
              {stats.eventosActivos}
            </div>
          </div>

          <div className={`baseCard ${styles.dashboardStatCard}`}>
            <div className={styles.dashboardStatCard__header}>
              <span>Total Asistentes</span>
              <Users size={14} />
            </div>
            <div className={styles.dashboardStatCard__value}>
              {stats.asistentesTotales}
            </div>
          </div>
        </section>

        <div className={styles.mobileLayout__filterRow}>
          <div className={styles.mobileLayout__filterTabs}>
            <button
              type="button"
              className={activeFilter === "todos" ? styles.tabActive : ""}
              onClick={() => setActiveFilter("todos")}
            >
              Todos los eventos
            </button>
            <button
              type="button"
              className={activeFilter === "proximos" ? styles.tabActive : ""}
              onClick={() => setActiveFilter("proximos")}
            >
              Próximos
            </button>
          </div>

          <div className={styles.mobileLayout__searchBar}>
            <Search size={14} />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <section className={styles.mobileLayout__eventsSection}>
          {eventos
            ?.filter((e: Evento) => e.id !== "4")
            .map((evento: Evento) => (
              <div key={evento.id} className={styles.eventCardMobile}>
                <div className={styles.eventCardMobile__imageBox}>
                  <img src={evento.imagen} alt={evento.titulo} />
                </div>

                <h3>{evento.titulo}</h3>

                <p className={styles.eventCardMobile__meta}>
                  <Calendar size={12} /> {evento.fecha}
                </p>
                <p className={styles.eventCardMobile__meta}>
                  📍 {evento.ubicacion}
                </p>
                <p className={styles.eventCardMobile__meta}>
                  👥 {evento.vistas} / 1000
                </p>

                <div className={styles.eventCardMobile__divider} />

                <div className={styles.eventCardMobile__actions}>
                  <ActionButton
                    onClick={() => navigate(`/edit-event/${evento.id}`)}
                  >
                    Editar
                  </ActionButton>

                  <DeleteButton onClick={() => handleDeleteEvent(evento.id)}>
                    Eliminar
                  </DeleteButton>
                </div>
              </div>
            ))}
        </section>
      </div>
      <div className={styles.desktopLayout}>
        <header className={styles.desktopLayout__header}>
          <div className={styles.desktopLayout__headerInfo}>
            <h1 className={styles.mainTitle}>Resumen del Organizador</h1>
            <p className="subTitle">
              Gestione sus eventos, monitoree la asistencia.
            </p>
          </div>

          <Button
            className={styles.desktopLayout__btnCreate}
            onClick={() => navigate("/create-event")}
          >
            <Plus size={16} /> Crear Evento
          </Button>
        </header>

        <section className={styles.desktopLayout__statsGrid}>
          <div className={`baseCard ${styles.dashboardStatCard}`}>
            <div className={styles.dashboardStatCard__header}>
              <span>Eventos Activos</span>
              <Calendar />
            </div>
            <div className={styles.dashboardStatCard__value}>
              {stats.eventosActivos}
            </div>
          </div>
          <div className={`baseCard ${styles.dashboardStatCard}`}>
            <div className={styles.dashboardStatCard__header}>
              <span>Asistentes Totales</span>
              <Users />
            </div>
            <div className={styles.dashboardStatCard__value}>
              {stats.asistentesTotales}
            </div>
          </div>
        </section>

        <section className={styles.desktopLayout__filterSection}>
          <div className={styles.desktopLayout__titleRow}>
            <h2 className={styles.desktopLayout__mainSectionTitle}>
              Eventos Creados
            </h2>
          </div>

          <div className={styles.desktopLayout__filterRow}>
            <div className={styles.desktopLayout__filterTabs}>
              <button
                type="button"
                className={activeFilter === "todos" ? styles.tabActive : ""}
                onClick={() => setActiveFilter("todos")}
              >
                Todos los eventos
              </button>
              <button
                type="button"
                className={activeFilter === "proximos" ? styles.tabActive : ""}
                onClick={() => setActiveFilter("proximos")}
              >
                Próximos
              </button>
            </div>

            <div className={styles.desktopLayout__searchBarInline}>
              <Search size={16} />
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </section>

        <section className={styles.desktopLayout__mainWrapper}>
          {(() => {
            const evento = eventos?.find((e: Evento) => e.id === "4");
            if (!evento) return null;

            return (
              <div
                key={String(evento.id)}
                className={`baseCard ${styles.eventCardDesktop}`}
              >
                <div className={styles["eventCardDesktop__image-wrapper"]}>
                  <span className={styles["eventCardDesktop__status-badge"]}>
                    {evento.status === "activo" ? "Activo" : "Borrador"}
                  </span>
                  <img
                    src={evento.imagen}
                    alt={evento.titulo}
                    className={styles["eventCardDesktop__image"]}
                  />
                </div>

                <div className={styles.eventCardDesktop__info}>
                  <h3>{evento.titulo}</h3>
                  <p className={styles.eventCardDesktop__meta}>
                    {evento.fecha} • {evento.ubicacion} ({evento.modalidad})
                  </p>
                  <span className={styles.eventCardDesktop__vistas}>
                    INSCRITOS: {evento.vistas} / 1000
                  </span>

                  <div className={styles.eventCardDesktop__footerActions}>
                    <ActionButton
                      onClick={() => navigate(`/edit-event/${evento.id}`)}
                    >
                      Editar
                    </ActionButton>

                    <DeleteButton
                      onClick={() => handleDeleteEvent(evento.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
