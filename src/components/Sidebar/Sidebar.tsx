import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import explorerIcon from '../../assets/icons/explorer.svg';
import gestionIcon from '../../assets/icons/gestión.svg';
import organizerAvatar from '../../assets/icons/organizador.svg'; 
import { LogOut, User } from 'lucide-react'; 

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const savedUserRaw = localStorage.getItem('logged_user');
  const user = savedUserRaw ? JSON.parse(savedUserRaw) : null;
  const isAuthenticated = !!user;

  const currentName = user ? user.name : 'Invitado';
  const currentRole = user 
    ? (user.role === 'administrador' || user.role === 'organizador' ? 'Organizador' : 'Espectador')
    : 'Visitante';

  const isOrganizer = user?.role === 'administrador' || user?.role === 'organizador';

  const getInitials = (name: string) => {
    if (!name) return '';
        const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    return name.slice(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    console.clear();
    localStorage.removeItem('logged_user');
    navigate('/login');
  };

  return (
    <aside className={styles.appSidebar}>
      
      <div className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          {!isAuthenticated ? (
            <div className={styles.avatarPlaceholderBox}>
              <User size={22} color="#a1a1aa" />
            </div>
          ) : isOrganizer ? (
            <img src={organizerAvatar} alt={currentName} className={styles.avatarImage} />
          ) : (
            <div className={styles.avatarInitials}>
              {getInitials(currentName)}
            </div>
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
          className={`${styles.navButton} ${location.pathname === '/home' ? styles.navButtonActive : ''}`} 
          onClick={() => navigate('/home')}
        >
          <img src={explorerIcon} alt="Explorar" className={styles.navIcon} />
          <span>EXPLORAR</span>
        </button>

    
        <button 
          type="button" 
          className={`${styles.navButton} ${location.pathname === '/create-event' ? styles.navButtonActive : ''}`}
          onClick={() => navigate('/create-event')}
        >
          <img src={gestionIcon} alt="Gestión de eventos" className={styles.navIcon} />
          <span>GESTIÓN</span>
        </button>
      </nav>

      <div className={styles.sidebarFooter}>
        <button type="button" className={styles.logoutButton} onClick={handleLogout}>
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
