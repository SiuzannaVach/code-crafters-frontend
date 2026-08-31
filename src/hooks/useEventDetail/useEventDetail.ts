import { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { mockEvents } from '../../data/EventDetailData/eventDetailMock';

export const useEventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Находим нужное событие по ID
  const event = mockEvents.find(e => e.id === Number(id)) || mockEvents[0];

  // Создаем состояние для отслеживания мобильного экрана (строго меньше или равно 768px)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      // Если ширина экрана МЕНЬШЕ или РАВНА 768px — это мобилка. Если БОЛЬШЕ — это ПК!
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    
    // Вызываем один раз сразу, чтобы зафиксировать точный текущий размер при загрузке
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBack = () => {
    navigate('/home');
  };

  // Возвращаем все данные наружу в компонент
  return {
    event,
    handleBack,
    isMobile,
  };
};
