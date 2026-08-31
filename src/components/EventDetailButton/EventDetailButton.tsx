import React from 'react';
import styles from '../../pages/EventDetail/EventDetail.module.scss';

interface Props {
  eventId: number;
  onClick: (id: number) => void;
  isInscribed: boolean;
  isDesktop?: boolean;
}

export const EventDetailButton: React.FC<Props> = ({ eventId, onClick, isInscribed, isDesktop = false }) => {
  
  // Создаем динамический класс. Если пользователь записан, добавляем класс успеха
  const buttonClass = `${styles['detail__btnSubmit']} ${isInscribed ? styles['detail__btnSubmit--success'] : ''}`;

  // Текст кнопки меняется динамически на десктопе и мобилке
  const buttonText = isInscribed 
    ? '¡Ya estás inscrito! ✓' 
    : (isDesktop ? 'Inscribirme Ahora →' : 'Inscribirme →');

  const pureButton = (
    <button 
      onClick={() => !isInscribed && onClick(eventId)}
      type="button"
      disabled={isInscribed}
      className={buttonClass}
    >
      {buttonText}
    </button>
  );

  // Если десктоп — отдаем чистую кнопку без мобильной фиксированной обертки
  if (isDesktop) {
    return pureButton;
  }

  // Если мобилка — упаковываем в фиксированный у пола контейнер
  return (
    <div className={styles['detail__mobileAction']}>
      {pureButton}
    </div>
  );
};
