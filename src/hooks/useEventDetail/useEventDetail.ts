// src/hooks/useEventDetail/useEventDetail.ts
import { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { mockEvents } from '../../data/EventDetailData/eventDetailMock';

export const useEventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const event = mockEvents.find(e => e.id === Number(id));

 const mapUrl = event?.address || event?.location
  ? `https://www.google.com/maps?q=${encodeURIComponent(
      event.address || event.location || ''
    )}&t=&z=15&ie=UTF8&iwloc=&output=embed&hl=es`
  : '';

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBack = () => {
    navigate('/home');
  };

  return {
    event,
    mapUrl, 
    handleBack,
    isMobile,
  };
};
