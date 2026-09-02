import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

import iconCode from '../../assets/icons/icon-code.svg'; 
import iconProfile from '../../assets/icons/icon-profile.svg';
import iconBell from '../../assets/icons/icon-bell.svg';

interface HeaderProps {
  isAuthenticated?: boolean;
}

// Разделы сайта, доступные через поиск в шапке
const SITE_PAGES = [
  { label: 'Explorar eventos', path: '/home' },
  { label: 'Crear evento', path: '/create-event' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Mis eventos', path: '/my-events' },
  { label: 'Notificaciones', path: '/notifications' },
];

const Header: React.FC<HeaderProps> = ({ isAuthenticated = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Проверяем, находится ли пользователь на странице создания события
  const isCreateEventPage = location.pathname === '/create-event';

  // Динамически добавляем специальный класс для мобильного хедера события
  const headerClass = `${styles.header} ${isCreateEventPage ? styles['header--event-mobile'] : ''}`;

  const results = query.trim()
    ? SITE_PAGES.filter(page => page.label.toLowerCase().includes(query.trim().toLowerCase()))
    : [];

  // Закрываем выпадающий список при клике снаружи
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoClick = () => {
    navigate(isAuthenticated ? '/home' : '/login');
  };

  const goToPage = (path: string) => {
    navigate(path);
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && results.length > 0) {
      goToPage(results[0].path);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <header className={headerClass}>
    
      <div
        className={styles['header__logo-block']}
        onClick={handleLogoClick}
        role="button"
        tabIndex={0}
        style={{ cursor: 'pointer' }}
      >
        <img 
          src={iconCode} 
          className={styles['header__logo-icon']} 
          alt="Code Crafters Logo" 
        />
        <span className={styles['header__logo-text']}>Code Crafters</span>
      </div>

      {isAuthenticated && (
        <div className={styles.header__content}>
          
          <div className={styles.header__search} ref={searchRef}>
            <span className={styles['header__search-icon-wrapper']}>
              <svg 
                className={styles['header__search-icon']} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#a1a1aa" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Buscar páginas..." 
              className={styles.header__input}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
            />

            {isOpen && results.length > 0 && (
              <ul className={styles['header__search-results']}>
                {results.map(page => (
                  <li key={page.path}>
                    <button
                      type="button"
                      className={styles['header__search-result-item']}
                      onClick={() => goToPage(page.path)}
                    >
                      {page.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {isOpen && query.trim() && results.length === 0 && (
              <ul className={styles['header__search-results']}>
                <li className={styles['header__search-empty']}>Sin resultados</li>
              </ul>
            )}
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