import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import explorerIcon from '../../assets/icons/explorer.svg';
import gestionIcon from '../../assets/icons/gestión.svg';
import organizerAvatar from '../../assets/icons/organizador.svg';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={styles.appSidebar}>
    
      <div className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          
          <img src={organizerAvatar} alt="SiuzannaVach" className={styles.avatarImage} />
        </div>
        <div className={styles.profileInfo}>
          <h3 className={styles.profileName}>SiuzannaVach</h3>
          <span className={styles.profileRole}>Organizador</span>
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
          <img src={gestionIcon} alt="Gestión" className={styles.navIcon} />
          <span>GESTIÓN</span>
        </button>
      </nav>

    </aside>
  );
};

export default Sidebar;
