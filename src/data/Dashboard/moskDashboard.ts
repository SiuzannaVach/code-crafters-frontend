import type { Evento } from '../../types/Evento';
import globalHackathonImg from '../../assets/images/event-global-hackathon.png';
import aiSummitImg from '../../assets/images/event-ai-summit.png'; 
import openSourceImg from '../../assets/images/event-open-source.png';
import nightSkyPoster from '../../assets/images/night-sky-poster.png';

export interface StatsOrganizador {
  eventosActivos: number;
  asistentesTotales: number;
  registradores: number;
  borradores: number;
}

export const mockStats: StatsOrganizador = {
  eventosActivos: 0,
  asistentesTotales: 0,
  registradores: 0,
  borradores: 0,
};

export const mockEventosCreados: Evento[] = [
  {
    id: '1',
    titulo: 'Global Web3 Hackathon 2026',
    descripcion: 'Construye el futuro de la web decentralizada.',
    fecha: 'Oct 15 - 17, 2026',
    imagen: globalHackathonImg,
    modalidad: 'online', 
    status: 'activo',       
    ubicacion: 'Online & San Francisco',
    categoria: 'Hackathon',
    organizadorId: 'org_1',
    vistas: 850
  },
  {
    id: '2',
    titulo: 'AI Founders Summit',
    descripcion: 'Summit de fundadores de IA.',
    fecha: 'Nov 12, 2026',
    imagen: aiSummitImg,
    modalidad: 'presencial',     
    status: 'activo',    
    ubicacion: 'New York City',
    categoria: 'Summit',
    organizadorId: 'org_1',
    vistas: 0
  },
  {
    id: '3',
    titulo: 'Open Source Contribution Workshop',
    descripcion: 'Workshop de open source.',
    fecha: 'Sep 05, 2026',
    imagen: openSourceImg,
    modalidad: 'online',     
    status: 'activo',    
    ubicacion: 'Online',
    categoria: 'Workshop',
    organizadorId: 'org_1',
    vistas: 120
  },
  {
    id: '4',
    titulo: 'Global AI Hackathon 2026',
    descripcion: 'Únete al evento tecnológico más grande del año para desarrollar soluciones con IA.',
    fecha: 'Oct 15 - Oct 17, 2026',
    imagen: nightSkyPoster,
    modalidad: 'presencial', 
    status: 'activo',       
    ubicacion: 'Virtual / SF',
    categoria: 'Hackathon',
    organizadorId: 'org_1',
    vistas: 850
  }
];
