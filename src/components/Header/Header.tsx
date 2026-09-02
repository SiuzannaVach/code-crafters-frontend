import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

import iconCode from '../../assets/icons/icon-code.svg'; 
import iconProfile from '../../assets/icons/icon-profile.svg';
import iconBell from '../../assets/icons/icon-bell.svg';
import { LogOut } from 'lucide-react'; // Импортируем иконку выхода для мобилки

interface HeaderProps {
  isAuthenticated?: boolean;
}

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

  const savedUserRaw = localStorage.getItem('logged_user');
  const user = savedUserRaw ? JSON.parse(savedUserRaw) : null;
  const isUserLoggedIn = isAuthenticated || !!user;

  const isCreateEventPage = location.pathname === '/create-event';
  const headerClass = `${styles.header} ${isCreateEventPage ? styles['header--event-mobile'] : ''}`;

  const results = query.trim()
    ? SITE_PAGES.filter(page => page.label.toLowerCase().includes(query.trim().toLowerCase()))
    : [];

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
    navigate('/home');
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

  // Функция выхода
  const handleLogout = () => {
    console.clear();
    localStorage.removeItem('logged_user');
    navigate('/login');
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

      {isUserLoggedIn && (
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
                xmlns="http://w3.org"
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
            {/* Кнопка выхода для мобилок (на десктопе скроем через CSS) */}
            <button 
              className={styles.header__logoutMobile} 
              onClick={handleLogout}
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <LogOut size={20} color="#f43f5e" />
            </button>

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
