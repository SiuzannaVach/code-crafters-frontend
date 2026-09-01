// src/data/EventDetailData/eventDetailMock.ts
import iconBuilding from '../../assets/icons/icon-building.svg';
import iconSpeaker from '../../assets/icons/icon-speaker.svg';
import iconNetworking from '../../assets/icons/icon-networking.svg';
import iconTools from '../../assets/icons/icon-tools.svg';
import iconCreative from '../../assets/icons/creative.svg';
import iconCheckCustom from '../../assets/icons/check-icon.svg';

export const eventIcons = {
  building: iconBuilding,
  speaker: iconSpeaker,
  networking: iconNetworking,
  tools: iconTools,
  creative: iconCreative,
  check: iconCheckCustom
};

export const mockEvents = [
  // 💻 EVENTOS DESKTOP (ID: 11, 12, 13)
  {
    id: 11,
    title: 'React Conf Latam 2026',
    location: 'Buenos Aires, Argentina',
    address: 'Palacio San Miguel, Buenos Aires',
    date: '20 Noviembre, 2026',
    time: '09:00 AM - 18:00 PM',
    tags: ['Web Dev', 'React', 'Conference'],
    description: [
      '¡La conferencia de React más grande de Latinoamérica! Únete a expertos internacionales para discutir sobre el futuro de React, Server Components y optimización de rendimiento.',
      'Aprende de casos de estudio reales y comparte con una comunidad vibrante de desarrolladores.'
    ],
    points: [
      'Ponentes Internacionales: Charlas exclusivas de core-contributors de React.',
      'Talleres Prácticos: Implementación de nuevas APIs y Server Actions desde cero.',
      'Networking Exclusivo: Conecta con las empresas tecnológicas líderes de la región.'
    ]
  },
  {
    id: 12,
    title: 'Meetup IA y Data Science con Python',
    location: 'Online (Zoom)',
    address: 'Transmisión en Vivo (Zoom / Meet)',
    date: '25 Noviembre, 2026',
    time: '19:00 PM EST',
    tags: ['AI & ML', 'Python', 'Online'],
    description: [
      'Sumérgete en el mundo de la Inteligencia Artificial y la Ciencia de Datos utilizando Python.',
      'Analizaremos integraciones con grandes modelos de lenguaje (LLMs), visualización de datos complejos y pipelines de entrenamiento.'
    ],
    points: [
      'Modelos de Lenguaje: Introducción práctica a Prompt Engineering y Fine-Tuning.',
      'Librerías Clave: Uso profesional de Pandas, NumPy y Scikit-Learn.',
      'Casos de Éxito: Descubre cómo las startups están automatizando procesos con IA.'
    ]
  },
  {
    id: 13,
    title: 'Cloud Architecture Summit 2026',
    category: 'Data Science',
    modality: 'Presencial',
    location: 'Ciudad de México, MX',
    address: 'Centro Citibanamex, Ciudad de México',
    date: '05 Diciembre, 2026',
    time: '09:00 AM - 17:00 PM CST',
    tags: ['Cloud', 'Architecture', 'Presencial'],
    description: [
      'El principal encuentro para arquitectos de software y líderes de infraestructura en la nube.',
      'Explora las mejores prácticas para diseñar sistemas altamente escalables, tolerantes a fallos y optimizados en costos.'
    ],
    points: [
      'Arquitecturas Serverless: Diseña servicios basados en eventos sin preocuparte por servidores.',
      'Seguridad en la Nube: Implementación de políticas de acceso estricto.',
      'Optimización de Costos: Estrategias avanzadas para reducir la facturación cloud.'
    ]
  },

  // 📱 EVENTOS MOBILE (ID: 1, 2, 3, 4, 5, 6)
  {
    id: 1,
    title: 'Global Web3 Hackathon 2026',
    location: 'Online / Global',
    address: 'Plataforma del Hackathon (Discord & GitHub)',
    date: 'Diciembre 2026',
    time: '24/7 Sprints de Código',
    tags: ['Hackathon', 'Web3', 'Blockchain'],
    description: [
      'Únete a desarrolladores de todo el mundo para construir la próxima generación de aplicaciones descentralizadas.',
      'Sácale provecho a contratos inteligentes, protocolos DeFi y soluciones de escalabilidad en el evento Web3 más grande del año.'
    ],
    points: [
      'Premios en Cripto: Mentorías exclusivas y miles de dólares en premios.',
      'Talleres Técnicos: Aprende Solidity, Rust y seguridad en Smart Contracts.',
      'Networking Global: Conecta con fundadores de protocolos.'
    ]
  },
  {
    id: 2,
    title: 'Taller de Patrones Avanzados en React',
    location: 'Online',
    address: 'Transmisión en Vivo (Zoom / Meet)',
    date: '15 Octubre, 2026',
    time: '10:00 AM EST',
    tags: ['Web Dev', 'React', 'Online'],
    description: [
      'Sumérgete en la concurrencia de React, Hooks personalizados avanzados y optimización de renderizado.',
      'Aprende a estructurar aplicaciones escalables utilizando patrones de diseño modernos.'
    ],
    points: [
      'Hooks Personalizados: Diseña lógica de estado completamente reutilizable.',
      'Optimización Real: Uso profesional de useMemo, useCallback.',
      'Estudios de Caso: Analizamos repositorios reales.'
    ]
  },
  {
    id: 3,
    title: 'Cumbre de Ingeniería de IA 2026',
    location: 'SF, CA',
    address: 'Moscone Center, San Francisco, California',
    date: '2-4 Noviembre, 2026',
    time: '09:00 AM - 17:00 PM PST',
    tags: ['AI & ML', 'Conference', 'Presencial'],
    description: [
      'El principal encuentro para desarrolladores que construyen el futuro con modelos de lenguaje.',
      'Analizaremos integraciones con LLMs, arquitecturas RAG.'
    ],
    points: [
      'Modelos de Lenguaje (LLMs): Técnicas avanzadas de Prompt Engineering.',
      'Arquitecturas RAG: Conecta modelos de IA con bases de datos vectoriales.',
      'Infraestructura: Optimización de servidores con GPUs de última generación.'
    ]
  },
  {
    id: 4,
    title: 'Dominando Tailwind CSS v3',
    location: 'Online',
    address: 'Plataforma Educativa Code Crafters',
    date: 'Diciembre 2026',
    time: 'Próximamente / On-Demand',
    tags: ['Design', 'Tailwind', 'Online'],
    description: [
      'Aprende a construir layouts complejos y componentes responsivos utilizando utilidades de Tailwind.',
      'Domina el sistema de diseño basado en utilidades, configuración de temas personalizados.'
    ],
    points: [
      'Layouts Complejos: Diseña grids y flexboxes avanzados.',
      'Temas Personalizados: Extiende la configuración de Tailwind.',
      'Buenas Prácticas: Mantén tus clases legibles.'
    ]
  },
  {
    id: 5,
    title: 'Inmersión en Arquitectura Serverless',
    location: 'Online',
    address: 'Sesión Virtual Interactiva',
    date: '15 Noviembre, 2026',
    time: '1:00 PM EST',
    tags: ['Cloud', 'AWS', 'Online'],
    description: [
      'Explora los pros y contras de arquitecturas basadas en eventos utilizando proveedores cloud modernos.',
      'Diseña sistemas completamente escalables sin preocuparte por servidores.'
    ],
    points: [
      'AWS Lambda & DynamoDB: Despliega funciones serverless.',
      'Arquitecturas de Eventos: Uso de colas y mensajería.',
      'Costos Optimizados: Infraestructura con оплатой por milisegundos.'
    ]
  },
  {
    id: 6,
    title: 'Hackathon de Innovación FinTech',
    location: 'Austin, TX',
    address: 'Tech Hub Austin, Texas, USA',
    date: '1-2 Diciembre, 2026',
    time: '48 Horas Seguidas',
    tags: ['Hackathon', 'Fintech', 'Presencial'],
    description: [
      'Construye la próxima disrupción en finanzas personales, seguridad transaccional o criptomonedas.',
      'Colabora con diseñadores, desarrolladores y expertos.'
    ],
    points: [
      'APIs Bancarias Abiertas: Acceso exclusivo a sandboxes.',
      'Seguridad Transaccional: Implementación de biometría.',
      'Pitch de Negocios: Presentación ante inversionistas.'
    ]
  }
];
