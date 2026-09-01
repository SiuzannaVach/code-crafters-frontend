// src/pages/Home/Home.tsx
import React from 'react';
import styles from './Home.module.scss';

import { useHome } from '../../hooks/useHome/useHome';

import { desktopEvents, mobileEvents, categories } from '../../data/Home/HomeMosk';
import type { EventItem } from '../../data/Home/HomeMosk';
import { 
  HomePrimaryButton, 
  HomeOutlineButton, 
  HomeFilterChip, 
  HomeDetailsButton 
} from '../../components/Home/HomeButton';

import heroBg from '../../assets/images/hero-bg.png';
import imgBannerGlobal from '../../assets/images/banner-global-web3.png'; 

const Home: React.FC = () => {
  
  const {
    activeCategory,
    setActiveCategory,
    searchParams,
    isDesktop,
    filteredEvents,
    handleSearchChange,
    handleRegisterClick,
    handleAgendaClick,
    handleEventClick
  } = useHome(desktopEvents, mobileEvents);

  return (
    <div className={styles.home}>
      {/* 🟣 BANNER PRINCIPAL (Hero Section) */}
      <section className={styles['hero']}>
        <div className={styles['hero__imageWrapper']}>
          <picture>
            <source media="(min-width: 769px)" srcSet={heroBg} />
            <img src={imgBannerGlobal} alt="Global Web3 Hackathon" className={styles['hero__bg']} />
          </picture>
          <div className={styles['hero__overlay']}></div>
        </div>

        <div className={styles['hero__content']}>
          <h1 className={styles['hero__title']}>
            Global Web3 <br className={styles['hero__brOnlyMobile']} />
            Hackathon <br className={styles['hero__brBoth']} /> 2026
          </h1>

          <p className={styles.hero__description}>
            Únete a desarrolladores de todo el mundo para construir la próxima generación de aplicaciones descentralizadas.
          </p>
          <div className={styles.hero__infoRow}>
            <span>📅 15 - 17 Noviembre</span>
            <span>📍 Híbrido (Global)</span>
          </div>

          <div className={styles.hero__actions}>
            <HomePrimaryButton onClick={handleRegisterClick}>
              Registrarse Ahora →
            </HomePrimaryButton>
            <HomeOutlineButton onClick={handleAgendaClick}>
              Ver Agenda
            </HomeOutlineButton>
          </div>
        </div>
      </section>
   
      <div className={styles.searchAndFilters}>
        {/* 🔍 BUSCADOR */}
        <div className={styles.searchBar}>
          <div className={styles.searchBar__inputWrapper}>
            <span className={styles.searchBar__icon}>🔍</span>
            <input 
              type="text" 
              placeholder="Buscar eventos, tecnologías o ciudades..." 
              className={styles.searchBar__input}
              value={searchParams.get('search') || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* 🔍 FILTROS */}
        <div className={styles.filters}>
          <div className={styles.filters__container}>
            {(!isDesktop ? ["Todos los eventos", "Desarrollo Web"] : categories).map((category) => (
              <HomeFilterChip
                key={category}
                active={activeCategory === category || (category === "Todos los eventos" && activeCategory === "Todos")}
                onClick={() => setActiveCategory(category === "Todos los eventos" ? "Todos" : category)}
              >
                {category}
              </HomeFilterChip>
            ))}
          </div>
        </div>
      </div>

      {/* 💻 REJILLA DE TARJETAS */}
      <div className={styles.grid}>
        {filteredEvents.map((event: EventItem) => (
          <article 
            key={event.id} 
            className={styles.card}
            onClick={() => !isDesktop && handleEventClick(event.id)}
            style={{ cursor: !isDesktop ? 'pointer' : 'default' }}
          >
            <div className={styles['card__imageWrapper']}>
              <img src={event.image} alt={event.title} className={styles['card__img']} />
            </div>
            
            <div className={styles['card__content']}>
              <h3 className={styles['card__title']}>{event.title}</h3>
              
              <div className={styles['card__infoRow']}>
                <span>📅 {event.date}</span>
                <span>📍 {event.location}</span>
              </div>

              {isDesktop && event.views !== undefined && event.registered !== undefined && (
                <div className={styles['card__statsRow']}>
                  <span className={styles['card__statItem']}>👁️ {event.views}</span>
                  <span className={styles['card__statItem']}>👤 {event.registered}</span>
                </div>
              )}

              {!isDesktop && event.description && (
                <p className={styles['card__description']}>{event.description}</p>
              )}
              
              {!isDesktop && event.tags && (
                <div className={styles['card__badgeRow']}>
                  {event.tags.map(tag => (
                    <span key={tag} className={styles['card__categoryBadge']}>{tag}</span>
                  ))}
                </div>
              )}

              {isDesktop && (
                <HomeDetailsButton onClick={() => handleEventClick(event.id)}>
                  Ver Detalles
                </HomeDetailsButton>
              )}
            </div>
          </article>
        ))}

        {filteredEvents.length === 0 && (
          <div className={styles['grid__empty']}>
            <p>No se encontraron eventos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;
