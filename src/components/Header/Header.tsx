import React from 'react';
import { useLocation } from 'react-router-dom'; // Импортируем хук отслеживания адреса
import styles from './Header.module.scss';

import iconCode from '../../assets/icons/icon-code.svg'; 
import iconProfile from '../../assets/icons/icon-profile.svg';
import iconBell from '../../assets/icons/icon-bell.svg';

interface HeaderProps {
  isAuthenticated?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated = false }) => {
  const location = useLocation(); // Получаем текущий путь в браузере

  // Проверяем, находится ли пользователь на странице создания события
  const isCreateEventPage = location.pathname === '/create-event';

  // Динамически добавляем специальный класс для мобильного хедера события
  const headerClass = `${styles.header} ${isCreateEventPage ? styles['header--event-mobile'] : ''}`;

  return (
    <header className={headerClass}>
    
      <div className={styles['header__logo-block']}>
        <img 
          src={iconCode} 
          className={styles['header__logo-icon']} 
          alt="Code Crafters Logo" 
        />
        <span className={styles['header__logo-text']}>Code Crafters</span>
      </div>

      {isAuthenticated && (
        <div className={styles.header__content}>
          
          <div className={styles.header__search}>
            <span className={styles['header__search-icon-wrapper']}>
              <svg 
                className={styles['header__search-icon']} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#a1a1aa" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                xmlns="http://w3.org"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Buscar..." 
              className={styles.header__input} 
            />
          </div>
          
          <div className={styles.header__actions}>
            <div className={styles.header__profile} aria-label="Perfil">
              <img src={iconProfile} className={styles['header__action-img']} alt="Perfil" />
            </div>
            <div className={styles.header__divider}></div>
            <button className={styles['header__action-btn']} aria-label="Notificaciones">
              <img src={iconBell} className={styles['header__action-img']} alt="Notificaciones" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
