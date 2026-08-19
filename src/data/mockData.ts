// src/data/mockData.ts
import type { Usuario } from '../types/Usuario';
import type { Evento } from '../types/Evento';


export const mockUsuarios: Usuario[] = [
  {
    id: 'user-1',
    nombre: 'Admin Crafter',
    email: 'admin@codecrafters.com',
    password: 'password123'
  }
];

export const mockEventos: Evento[] = [
  {
    id: 'event-1',
    titulo: 'Masterclass de React 19 y TypeScript',
    descripcion: 'Aprende las novedades de React Compiler y el nuevo sistema de hooks.',
    fecha: '2026-09-15T18:00:00.000Z',
    imagen: 'https://unsplash.com',
    modalidad: 'online',
    ubicacion: 'Zoom Meet',
    categoria: 'Frontend',
    organizadorId: 'user-1',
    vistas: 42
  }
];
