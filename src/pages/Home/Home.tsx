import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Home.module.scss';

import heroBg from '../../assets/images/hero-bg.png';
import imgBannerGlobal from '../../assets/images/banner-global-web3.png'; 
import imgAiEngineering from '../../assets/images/event-ai-engineering.png';
import imgAi from '../../assets/images/event-ai.png'; 
import imgCloud from '../../assets/images/event-cloud.png';
import imgHackathonFintech from '../../assets/images/event-hackathon-fintech.png';
import imgReactEvent from '../../assets/images/event-react.png';
import imgServerless from '../../assets/images/event-serverless-architecture.png'; 
import imgTailwind from '../../assets/images/event-tailwind-css.png';
import imgPatrones from '../../assets/images/patrones.png'; 


interface EventItem {
  id: number;
  title: string;
  category: string;
  modality: string;
  location: string;
  date: string;
  image: string;
  description?: string; 
  tags?: string[];      
  views?: number;       
  registered?: string;  
}

const categories = [
  'Todos',
  'Desarrollo Web',
  'Inteligencia Artificial',
  'Ciberseguridad',
  'Diseño UI/UX',
  'Data Science',
  'Mis Registros'
];


const desktopEvents: EventItem[] = [
  {
    id: 1,
    title: 'React Conf Latam 2026',
    category: 'Desarrollo Web',
    modality: 'Online',
    location: 'Buenos Aires, Argentina',
    date: '20 Noviembre, 2026',
    views: 142,        
    registered: '35/100', 
    image: imgReactEvent
  },
  {
    id: 2,
    title: 'Meetup IA y Data Science con Python',
    category: 'Inteligencia Artificial',
    modality: 'Online (Zoom)',
    location: 'Online (Zoom)',
    date: '25 Noviembre, 2026',
    views: 142,
    registered: '35/150',
    image: imgAi
  },
  {
    id: 3,
    title: 'Cloud Architecture Summit 2026',
    category: 'Data Science', 
    modality: 'Presencial',
    location: 'Ciudad de México, MX',
    date: '05 Diciembre, 2026',
    views: 142,
    registered: '35/120',
    image: imgCloud
  }
];


const mobileEvents: EventItem[] = [
  {
    id: 1,
    title: 'Taller de Patrones Avanzados en React',
    category: 'Desarrollo Web',
    modality: 'Online',
    location: 'Online',
    date: '15 Oct • 10:00 AM EST',
    description: 'Sumérgete en la concurrencia de React, Hooks personalizados avanzados y optimización de renderizado.',
    tags: ['Web Dev', 'React'],
    image: imgPatrones
  },
  {
    id: 2,
    title: 'Cumbre de Ingeniería de IA 2026',
    category: 'Inteligencia Artificial',
    modality: 'Presencial',
    location: 'SF, CA',
    date: '2-4 Nov',
    description: 'El principal encuentro para desarrolladores que construyen el futuro con modelos de lenguaje a gran escala.',
    tags: ['AI & ML', 'Conference'],
    image: imgAiEngineering
  },
  {
    id: 3,
    title: 'Dominando Tailwind CSS v3',
    category: 'Desarrollo Web',
    modality: 'Online',
    location: 'Online',
    date: 'Próximamente / Diciembre 2026',
description: 'Aprende a construir layouts complejos y componentes responsivos utilizando utilidades de Tailwind.',
    tags: ['Design', 'Tailwind'],
    image: imgTailwind
  },
  {
    id: 4,
    title: 'Inmersión en Arquitectura Serverless',
    category: 'Data Science', 
    modality: 'Online',
    location: 'Online',
    date: '15 Nov • 1:00 PM EST',
    description: 'Explora los pros y contras de arquitecturas basadas en eventos utilizando proveedores cloud modernos.',
    tags: ['Cloud', 'AWS'],
    image: imgServerless
  },
  {
    id: 5,
    title: 'Hackathon de Innovación FinTech',
    category: 'Ciberseguridad', 
    modality: 'Presencial',
    location: 'Austin, TX',
    date: '1-2 Dic • 48 Horas',
    description: 'Construye la próxima disrupción en finanzas personales, seguridad transaccional o criptomonedas.',
    tags: ['Hackathon', 'Fintech'],
    image: imgHackathonFintech
  }
];

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 769);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    const currentEvents = isDesktop ? desktopEvents : mobileEvents;
  const searchQuery = (searchParams.get('search') || '').toLowerCase();
  
  const filteredEvents = currentEvents.filter(event => {
   
    const matchesCategory = 
      activeCategory === 'Todos' || 
      activeCategory === 'Todos los eventos' || 
      event.category === activeCategory ||
      (activeCategory === 'Desarrollo Web' && (event.category === 'Desarrollo Web' || (event.tags && event.tags.some(t => t.toLowerCase().includes('web')))));

    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery) || 
      event.category.toLowerCase().includes(searchQuery) ||
      (event.description && event.description.toLowerCase().includes(searchQuery)) ||
      (event.tags && event.tags.some(tag => tag.toLowerCase().includes(searchQuery)));

    return matchesCategory && matchesSearch;
  });


  return (
    <div className={styles.home}>
      {/* 🟣 BANNER PRINCIPAL (Hero Section) */}
      <section className={styles['hero']}>
  <div className={styles['hero__imageWrapper']}>
    <picture>
      <source media="(min-width: 769px)" srcSet={heroBg} />
      <img 
        src={imgBannerGlobal} 
        alt="Global Web3 Hackathon" 
        className={styles['hero__bg']} 
      />
    </picture>
    <div className={styles['hero__overlay']}></div>
  </div>

  <div className={styles['hero__content']}>
    <h1 className={styles['hero__title']}>
      Global Web3{" "}
      <br className={styles['hero__brOnlyMobile']} />
      Hackathon{" "}
      <br className={styles['hero__brBoth']} />
      2026
    </h1>


          <p className={styles.hero__description}>
            Únete a desarrolladores de todo el
            mundo para construir la próxima
            generación de aplicaciones
            descentralizadas.
          </p>
          <div className={styles.hero__infoRow}>
            <span>📅 15 - 17 Noviembre</span>
            <span>📍 Híbrido (Global)</span>
          </div>

          <div className={styles.hero__actions}>
          <button className={`${styles.hero__btn} ${styles['hero__btn--primary']}`}>
  Registrarse Ahora →
</button>

            
            <button className={`${styles.hero__btn} ${styles['hero__btn--outline']}`}>
              Ver Agenda
            </button>
          </div>
        </div>
      </section>
   
   <div className={styles.searchAndFilters}>

      {/* 🔍 BUSCADOR*/}
      <div className={styles.searchBar}>
        <div className={styles.searchBar__inputWrapper}>
          <span className={styles.searchBar__icon}>🔍</span>
          <input 
            type="text" 
            placeholder="Buscar eventos, tecnologías o ciudades..." 
            className={styles.searchBar__input}
            value={searchParams.get('search') || ''}
           onChange={(e) => {
  let val = e.target.value;
  
  if (val.toLowerCase().includes('dessar')) {
    val = val.replace(/dessar/i, 'desar');
  }

  if (val) searchParams.set('search', val);
  else searchParams.delete('search');
  setSearchParams(searchParams);
}}

          />
        </div>
      </div>

      {/* 🔍 FILTROS*/}
      <div className={styles.filters}>
        <div className={styles.filters__container}>
       {(!isDesktop ? ["Todos los eventos", "Desarrollo Web"] : categories).map((category) => (
  <button
    key={category}
    className={`${styles.filters__chip} ${
      activeCategory === category || (category === "Todos los eventos" && activeCategory === "Todos")
        ? styles['filters__chip--active'] 
        : ''
    }`}
    onClick={() => setActiveCategory(category === "Todos los eventos" ? "Todos" : category)}
  >
    {category}
  </button>
))}

        </div>
      </div>
</div>

           {/* 💻 REJILLA DE TARJETAS */}
      <div className={styles.grid}>
        {filteredEvents.map((event: EventItem) => (
          <article key={event.id} className={styles.card}>
            
           
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
                <button className={styles['card__btnDetails']}>
                  Ver Detalles
                </button>
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
