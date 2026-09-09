import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import explorerIcon from "../../assets/icons/explorer.svg";
import gestionIcon from "../../assets/icons/gestión.svg";
import organizerAvatar from "../../assets/icons/organizador.svg";
import { LogOut, User } from "lucide-react";
import { clearSession } from "../../utils/authStorage";

interface SidebarUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role?: string;
}

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user] = useState<SidebarUser | null>(() => {
    const savedUserRaw = localStorage.getItem("logged_user");
    if (!savedUserRaw) {
      return null;
    }
    try {
      return JSON.parse(savedUserRaw) as SidebarUser;
    } catch (error: unknown) {
      console.error("Error al parsear logged_user en Sidebar:", error);
      return null;
    }
  });

  const isAuthenticated = user !== null;
  const currentName = user?.name ?? "Invitado";

  // Normalize the role before comparing it.
  const userRoleLower = user && user.role ? user.role.toLowerCase() : "";
  const isOrganizer =
    userRoleLower === "organizador" ||
    userRoleLower === "administrador" ||
    userRoleLower === "admin";

  const currentRole = user
    ? isOrganizer
      ? "Organizador"
      : "Espectador"
    : "Visitante";
  const managementPath = isOrganizer ? "/dashboard" : "/my-events";
  const managementLabel = isOrganizer ? "GESTIÓN" : "MIS EVENTOS";

  const handleLogout = () => {
    console.clear();
    clearSession();
    navigate("/login");
  };

  return (
    <aside className={styles.appSidebar}>
      <div className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          {!isAuthenticated ? (
            <div className={styles.avatarPlaceholderBox}>
              <User size={22} color="#a1a1aa" />
            </div>
          ) : (
            <img
              src={organizerAvatar}
              alt={currentName}
              className={styles.avatarImage}
            />
          )}
        </div>
        <div className={styles.profileInfo}>
          <h3 className={styles.profileName}>{currentName}</h3>
          <span className={styles.profileRole}>{currentRole}</span>
        </div>
      </div>

      <nav className={styles.sidebarNav}>
        <button
          type="button"
          className={`${styles.navButton} ${location.pathname === "/home" ? styles.navButtonActive : ""}`}
          onClick={() => navigate("/home")}
        >
          <img src={explorerIcon} alt="Explorar" className={styles.navIcon} />
          <span>EXPLORAR</span>
        </button>

        {/* The management button opens the dashboard. */}
        <button
          type="button"
          className={`${styles.navButton} ${
            location.pathname === managementPath ||
            location.pathname === "/create-event"
              ? styles.navButtonActive
              : ""
          }`}
          onClick={() => navigate(managementPath)}
        >
          <img
            src={gestionIcon}
            alt="Gestión de eventos"
            className={styles.navIcon}
          />
          <span>{managementLabel}</span>
        </button>
      </nav>

      <div className={styles.sidebarFooter}>
        <button
          type="button"
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
