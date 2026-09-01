import React from 'react';
import styles from '../../pages/EventDetail/EventDetail.module.scss';

interface Props {
  eventId: number;
  onClick: () => void; 
  isInscribed: boolean;
  isDesktop?: boolean;
}

export const EventDetailButton: React.FC<Props> = ({ eventId, onClick, isInscribed, isDesktop = false }) => {
  
  const buttonClass = `${styles['detail__btnSubmit']} ${isInscribed ? styles['detail__btnSubmit--success'] : ''}`;

       const pureButton = (
    <button 
      onClickCapture={(e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isInscribed) {
          onClick();
          console.log("Inscribiendo al evento ID:", eventId);
        }
      }}
      type="button"
      disabled={isInscribed}
      className={buttonClass}
    >
      {isInscribed ? '¡Ya estás inscrito! ✓' : (isDesktop ? 'Inscribirme Ahora →' : 'Inscribirme →')}
    </button>
  );

  if (isDesktop) {
    return (
      <div style={{ width: '100%' }}>
        {pureButton}
      </div>
    );
  }

  return (
    <div className={styles['detail__mobileAction']}>
      {pureButton}
    </div>
  );
};
