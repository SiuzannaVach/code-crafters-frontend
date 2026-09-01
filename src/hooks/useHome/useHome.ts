import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const useHome = (desktopEvents: any[], mobileEvents: any[]) => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 769);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentEvents = isDesktop ? desktopEvents : mobileEvents;
  const searchQuery = (searchParams.get('search') || '').toLowerCase();
  
  const handleSearchChange = (val: string) => {
    if (val.toLowerCase().includes('dessar')) {
      val = val.replace(/dessar/i, 'desar');
    }
    if (val) searchParams.set('search', val);
    else searchParams.delete('search');
    setSearchParams(searchParams);
  };

  // Функционирование верхних кнопок баннера (Ведут на страницу главного Хакатона)
   const handleAgendaClick = () => {
    // Находим блок поиска по его ID и плавно катимся к нему
    document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleRegisterClick = () => {
    navigate('/events/1');
  };


  // Динамический переход для карточек (Открывает конкретный ID)
  const handleEventClick = (id: number) => {
    navigate(`/events/${id}`);
  };

  const filteredEvents = currentEvents.filter(event => {
    const matchesCategory = 
      activeCategory === 'Todos' || 
      activeCategory === 'Todos los eventos' || 
      event.category === activeCategory ||
      (activeCategory === 'Desarrollo Web' && (event.category === 'Desarrollo Web' || (event.tags && event.tags.some((t: string) => t.toLowerCase().includes('web')))));

    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery) || 
      event.category.toLowerCase().includes(searchQuery) ||
      (event.description && event.description.toLowerCase().includes(searchQuery)) ||
      (event.tags && event.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery)));

    return matchesCategory && matchesSearch;
  });

  return {
    activeCategory,
    setActiveCategory,
    searchParams,
    isDesktop,
    filteredEvents,
    handleSearchChange,
    handleRegisterClick,
    handleAgendaClick,
    handleEventClick
  };
};
