// src/data/Home/HomeMosk.ts
import imgReactEvent from '../../assets/images/event-react.png';
import imgAi from '../../assets/images/event-ai.png'; 
import imgCloud from '../../assets/images/event-cloud.png';
import imgPatrones from '../../assets/images/patrones.png'; 
import imgAiEngineering from '../../assets/images/event-ai-engineering.png';
import imgTailwind from '../../assets/images/event-tailwind-css.png';
import imgServerless from '../../assets/images/event-serverless-architecture.png'; 
import imgHackathonFintech from '../../assets/images/event-hackathon-fintech.png';

export interface EventItem {
  id: number;
  title: string;
  category: string;
  modality: string;
  location: string;
  date: string;
  image: string;
  description?: string | string[];
  time?: string;         
  address?: string; 
  points?: string[];
  tags?: string[];      
  views?: number;       
  registered?: string;
  mapUrl?: string;
   
}

export const categories: string[] = [
  'Todos',
  'Desarrollo Web',
  'Inteligencia Artificial',
  'Ciberseguridad',
  'Diseño UI/UX',
  'Data Science',
  'Mis Registros'

];

// 💻 ДЕСКТОПНЫЕ СОБЫТИЯ (КАРТА И СЛОВО ОНЛАЙН СТОЯТ ДЛЯ КАЖДОГО ID)
export const desktopEvents: EventItem[] = [
  {
    id: 11,
    title: 'React Conf Latam 2026',
    category: 'Desarrollo Web',
    modality: 'Online',
    location: 'Buenos Aires, Argentina',
    date: '20 Noviembre, 2026',
    views: 142,        
    registered: '35/100', 
    image: imgReactEvent,
    mapUrl: 'https://google.com',
    description: [
      'Únete a desarrolladores de todo el mundo para construir la próxima generación de aplicaciones descentralizadas.',
      'Sácale provecho a contratos inteligentes, protocolos DeFi y soluciones de escalabilidad en el evento Web3 más grande del año.'
    ],
    points: [
      'Premios en Cripto: Mentorías exclusivas y miles de dólares en premios para los mejores proyectos.',
      'Talleres Técnicos: Aprende Solidity, Rust y seguridad en Smart Contracts desde cero.',
      'Networking Global: Conecta con fundadores de protocolos y firmas de Venture Capital.'
    ]
  },

  {
    id: 12,
    title: 'Meetup IA y Data Science con Python',
    category: 'Inteligencia Artificial',
    modality: 'Online (Zoom)',
    location: 'Online (Zoom)',
    date: '25 Noviembre, 2026',
    views: 142,
    registered: '35/150',
    image: imgAi,
    mapUrl: 'https://google.com',
    description: [
      'Sumérgete en la concurrencia de React, Hooks personalizados avanzados y optimización de renderizado.',
      'Aprende a estructurar aplicaciones escalables utilizando patrones de diseño modernos que evitan re-renders innecesarios.'
    ],
    points: [
      'Hooks Personalizados: Diseña lógica de estado completamente reutilizable y limpia.',
      'Optimización Real: Uso profesional de useMemo, useCallback y la nueva API de transiciones.',
      'Estudios de Caso: Analizamos repositorios reales de producción para corregir cuellos de botella.'
    ]
  },
  {
    id: 13,
    title: 'Cloud Architecture Summit 2026',
    category: 'Data Science', 
    modality: 'Presencial',
    location: 'Ciudad de México, MX',
    date: '05 Diciembre, 2026',
    views: 142,
    registered: '35/120',
    image: imgCloud,
    mapUrl: 'https://google.com',
    description: [
      'El principal encuentro para desarrolladores que construyen el futuro con modelos de lenguaje a gran escala.',
      'Analizaremos integraciones con LLMs, arquitecturas RAG (Retrieval-Augmented Generation) y despliegue local de modelos.'
    ],
    points: [
      'Modelos de Lenguaje (LLMs): Técnicas avanzadas de Prompt Engineering y Fine-Tuning.',
      'Arquitecturas RAG: Conecta modelos de IA con bases de datos vectoriales de forma segura.',
      'Infraestructura: Optimización de costos y rendimiento en servidores con GPUs de última generation.'
    ]
  }
];

// 📱 МОБИЛЬНЫЕ СОБЫТИЯ
export const mobileEvents: EventItem[] = [
  {
    id: 2,
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
    id: 3,
    title: 'Cumbre de Ingeniería de IA 2026',
    category: 'Inteligencia Artificial',
    modality: 'Presencial',
    location: 'SF, CA',
    date: '2-4 Nov',
    description: 'El premier encuentro para desarrolladores que construyen el futuro con modelos de lenguaje a gran escala.',
    tags: ['AI & ML', 'Conference'],
    image: imgAiEngineering
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
    title: 'Hackathon de Innovación FinTech',
    category: 'Ciberseguridad', 
    modality: 'Presencial',
    location: 'Austin, TX',
    date: '1-2 Dic • 48 Horas',
    description: 'Construye la próxima disrupción en finanzas personales, security transaccional o criptomonedas.',
    tags: ['Hackathon', 'Fintech'],
    image: imgHackathonFintech
  }
];
