export interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen: string;
  modalidad: 'online' | 'presencial';
  ubicacion: string;
  categoria: string;
  organizadorId: string;
  vistas: number;
}

