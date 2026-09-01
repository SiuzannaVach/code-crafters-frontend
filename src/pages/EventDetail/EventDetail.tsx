import React, { useState } from 'react';
import styles from './EventDetail.module.scss';
import { EventDetailButton } from '../../components/EventDetailButton/EventDetailButton';
import { useEventDetail } from '../../hooks/useEventDetail/useEventDetail';
import { getItem, setItem } from '../../utils/storage'; 
import bannerDesktopDefault from '../../assets/images/detalle-banner.png';
import bannerMobileDefault from '../../assets/images/event-hero-stage.png';
import { eventIcons } from '../../data/EventDetailData/eventDetailMock';

const EventDetail: React.FC = () => {
 const { event, mapUrl, handleBack } = useEventDetail();

    if (!event) {
    return <div className={styles['detail']}>Cargando...</div>;
  }

  const storageKey = `code_crafters_event_${event?.id}`;

  const [isInscribed, setIsInscribed] = useState<boolean>(() => {
    if (!event?.id) return false;
    return getItem<boolean>(storageKey, false);
  });
  const handleEnrollmentFlow = () => {
    const confirmEnrollment = window.confirm('¿Estás seguro de que deseas inscribirte a este evento?');

    
    if (confirmEnrollment) {
      setItem<boolean>(storageKey, true);
      setIsInscribed(true);
    }
  };

  return (
    <div className={styles['detail']}>
      
    {/*mobile*/}  

      <div className={styles['detail__mobileView']}>
        <button className={styles['detail__back']} onClick={handleBack}>
          ← VOLVER 
        </button>

        <div className={styles['detail__mobileBanner']}>
          <img src={bannerMobileDefault} alt={event.title} className={styles['detail__mobileBannerImg']} />
          <div className={styles['detail__mobileBannerOverlay']} />
        </div>

        <div className={styles['detail__mobileContent']}>
          <div className={styles['detail__badgeRow']}>
            {event.tags?.map(tag => (
              <span key={tag} className={styles['detail__badge']}>{tag}</span>
            ))}
          </div>

          <h1 className={styles['detail__mobileTitle']}>{event.title}</h1>

          <div className={styles['detail__mobileCards']}>
            <div className={styles['detail__infoCard']}>
              <div className={styles['detail__infoCardIcon']}>📅</div>
              <div className={styles['detail__infoCardText']}>
                <span>{event.date}</span>
                <small>{event.time}</small>
              </div>
            </div>

            <div className={styles['detail__infoCard']}>
              <div className={styles['detail__infoCardIcon']}>📍</div>
              <div className={styles['detail__infoCardText']}>
                <span>{event.location}</span>
               <small>{event?.address || ''}</small>

              </div>
            </div>
          </div>

        
          <section className={styles['detail__section']}>
            <h2>Sobre el evento</h2>
                  <div className={styles['detail__description']}>
          {Array.isArray(event.description) ? (
            event.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : (
            <p>{event.description}</p>
          )}
        </div>

          </section>

         
                    <section className={styles['detail__section']}>
              <h2>Puntos clave</h2>
              <ul className={styles['detail__pointsList']}>
                {event.points?.map((point, index) => {
                  return (
                    <li key={index} className={styles['detail__pointItem']}>
                      
                      <img 
                        src={eventIcons.check}

                        alt="Check" 
                        className={styles['detail__pointIcon']} 
                        width="22" 
                        height="22" 
                      />
                      <p>{point}</p>
                    </li>
                  );
                })}
              </ul>
            </section>


        
          <div className={styles['detail__organizer']}>
            <small>ORGANIZADO POR</small>
            <div className={styles['detail__organizerBody']}>
              <img src={eventIcons.creative}
alt="Organizer" className={styles['detail__organizerAvatar']} />
              <span className={styles['detail__organizerName']}>Creative Code Collective</span>
            </div>
          </div>
        </div>

      
     <EventDetailButton 
  eventId={event.id} 
  onClick={handleEnrollmentFlow} 
  isInscribed={isInscribed} 
/>

      </div>

    {/*desktop*/}

      <div className={styles['detail__desktopView']}>
      
        <div className={styles['detail__desktopMainContent']}>
          
          <div className={styles['detail__desktopBanner']}>
            <img src={bannerDesktopDefault} alt={event.title} className={styles['detail__desktopBannerImg']} />
            <div className={styles['detail__desktopBannerOverlay']} />
          </div>

          {/* Двухколоночный грид контента (Левая часть + Сайдбар карточки события) */}
          <div className={styles['detail__desktopGrid']}>
            
            {/* Левая колонка контента */}
            <main className={styles['detail__desktopLeft']}>
              <section className={styles['detail__desktopCardBox']}>
                <h2>📄 Acerca del Evento</h2>
          {Array.isArray(event.description) ? (
  event.description.map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  ))
) : (
  <p>{event.description}</p>
)}

              </section>

              <section className={styles['detail__desktopPointsSection']}>
                <h2>Puntos Destacados</h2>

                <div className={styles['detail__desktopPointsGrid']}>

                  {/* Карточка 1 */}
                  <div className={styles['detail__highlightCard']}>
                    <div className={styles['detail__highlightIconBox']}>
                      <img src={eventIcons.speaker} alt="Speaker" />
                    </div>
                    <h3>{event.points?.[0]?.includes(': ') ? event.points[0].split(': ')[0] : 'Ponentes Avanzados'}</h3>      
                    <p>{event.points?.[0]?.includes(': ') ? event.points[0].split(': ')[1] : event.points?.[0]}</p>
                  </div>

                  {/* Карточка 2 */}
                  <div className={styles['detail__highlightCard']}>
                    <div className={styles['detail__highlightIconBox']}>
                      <img src={eventIcons.tools} alt="Tools" />
                    </div>
                    <h3>{event.points?.[1]?.includes(': ') ? event.points[1].split(': ')[0] : 'Talleres Prácticos'}</h3>
                    <p>{event.points?.[1]?.includes(': ') ? event.points[1].split(': ')[1] : event.points?.[1]}</p>
                  </div>

                  {/* Карточка 3 (Нижняя длинная) */}
                  <div className={`${styles['detail__highlightCard']} ${styles['detail__highlightCard--full']}`}>
                    <div className={styles['detail__highlightIconBox']}>
                      <img src={eventIcons.networking} alt="Networking" />
                    </div>
                    <h3>{event.points?.[2]?.includes(': ') ? event.points[2].split(': ')[0] : 'Networking Exclusivo'}</h3>
                    <p>{event.points?.[2]?.includes(': ') ? event.points[2].split(': ')[1] : event.points?.[2]}</p>
                  </div>

                </div>
              </section>
            </main>
            
            {/* Правая колонка контента (Сайдбар) */}
            <aside className={styles['detail__desktopRightSidebar']}>
              <div className={styles['detail__sidebarStickyBlock']}>
                
                <div className={styles['detail__deskInfoItem']}>
                  <span className={styles['detail__deskInfoIcon']}>📅</span>
                  <div>
                    <h4>{event.date}</h4>
                    <p>{event.time}</p>
                  </div>
                </div>

                <div className={styles['detail__deskInfoItem']}>
                  <div className={styles['detail__deskInfoIconBox']}></div>
                  <span className={styles['detail__deskInfoIcon']}>📍</span>
                  <div>
                    <h4>{event.location}</h4>
                    <p>{event.address}</p>
                  </div>
                </div>

              {/* mapa*/}
<div className={styles['detail__desktopMapWrapper']} style={{ marginTop: '16px' }}>
 <iframe
 src="https://google.com"
  width="100%"
  height="180"
  style={{ border: 0, borderRadius: '8px' }}
  allowFullScreen={false}
  loading="lazy"
  title="Google Map Desktop"
/>


</div>

                <div className={styles['detail__sidebarFooterDivider']} />

                <div className={styles['detail__deskOrganizer']}>
                  <div className={styles['detail__deskOrganizerIconBox']}>
                    <img src={eventIcons.building} alt="Building" width="20" height="20" />
                  </div>
                  <div>
                    <small>Organizado por</small>
                    <h4>Code Crafters Labs</h4>
                  </div>
                </div>

              <div className={styles['detail__desktopActionWrapper']}>
  <EventDetailButton 
    eventId={event.id} 
    onClick={handleEnrollmentFlow} 
    isInscribed={isInscribed} 
    isDesktop={true} 
  />
</div>

              </div>
            </aside>

          </div>
        
        </div>
      </div>

    </div>
  );
};

export default EventDetail;
