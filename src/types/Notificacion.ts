export interface Notificacion {
  id: string;
  usuarioId: string;
  tipo: 'cambio_evento' | 'recordatorio' | 'nuevo_evento';
  mensaje: string;
  leida: boolean;
  fecha: string;
}
