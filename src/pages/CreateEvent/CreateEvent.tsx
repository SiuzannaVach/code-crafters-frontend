import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es';
import styles from './CreateEvent.module.scss';
import { UploadCloud, Wifi, MapPin } from 'lucide-react';

import "react-datepicker/dist/react-datepicker.css";
registerLocale('es', es);

interface EventFormState {
  title: string;
  description: string;
  category: string;
  maxCapacity: string;
  date: Date | null;
  time: string;
  isOnline: boolean;
  linkOrAddress: string;
  image: File | null;
}

const CreateEvent: React.FC = () => {
  const [formData, setFormData] = useState<EventFormState>({
    title: '',
    description: '',
    category: '',
    maxCapacity: '',
    date: null,
    time: '',
    isOnline: true,
    linkOrAddress: '',
    image: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
  };

  return (
    <div className={styles.createEvent}>
      <header className={styles.header}>
        <h1 className={styles.title}>Crear Evento</h1>
        <p className={styles.subtitle}>Configura los detalles de tu próximo encuentro tecnológico.</p>
      </header>

      <form onSubmit={handleSubmit} className={styles.formCard}>

        {/* ЛЕВАЯ КОЛОНКА (Данные формы) */}
        <div className={styles.leftColumn}>
          
          {/* Секция 1: Datos básicos */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Datos básicos</h2>

            <div className={styles.formGroup}>
              <label htmlFor="title">Nombre del Evento</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Ej. Hackathon Global de Next.js"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe qué aprenderán los asistentes..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="category">Categoría</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Selecciona una categoría</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="ai">AI &amp; Data Science</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="maxCapacity">Capacidad Máxima</label>
                <input
                  id="maxCapacity"
                  name="maxCapacity"
                  type="number"
                  placeholder="Ej. 150"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </section>

          {/* Секция 2: Fecha y ubicación */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Fecha y ubicación</h2>
             
             <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="date">Fecha</label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                locale="es"
                dateFormat="dd/MM/yyyy"
                placeholderText="Seleccionar fecha"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="time">Hora (Local)</label>
              <input
                id="time"
                name="time"
                type="time"
                className={styles.input}
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            </div>

            <div className={styles.formGroup}>
              <label>Modalidad del evento</label>
              <div className={styles.modalityGroup}>
                <button
                  type="button"
                  className={`${styles.modalityCard} ${formData.isOnline ? styles.modalityCardActive : ''}`}
                  onClick={() => setFormData((prev) => ({ ...prev, isOnline: true }))}
                >
                  <Wifi size={20} />
                  <span>Online / Virtual</span>
                </button>
                <button
                  type="button"
                  className={`${styles.modalityCard} ${!formData.isOnline ? styles.modalityCardActive : ''}`}
                  onClick={() => setFormData((prev) => ({ ...prev, isOnline: false }))}
                >
                  <MapPin size={20} />
                  <span>Presencial</span>
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="linkOrAddress">Enlace de la reunión / Dirección</label>
              <input
                id="linkOrAddress"
                name="linkOrAddress"
                type="text"
                placeholder="https://zoom.us... o 123 Tech St."
                value={formData.linkOrAddress}
                onChange={handleChange}
                required
              />
            </div>
          </section>
        </div>

              {/* ПРАВАЯ КОЛОНКА */}
      <div className={styles.rightColumn}>
    
        <section className={`${styles.section} ${styles.bannerSection}`}>
         

          <div className={styles.formGroup}>
            <label htmlFor="bannerUpload">Imagen de evento</label>
            <div className={styles.uploadBox}>
              <input
                id="bannerUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.uploadInput}
              />
              <label htmlFor="bannerUpload" className={styles.uploadLabel}>
                <UploadCloud size={28} />
                <span className={styles.uploadText}>
                  {formData.image ? formData.image.name : 'Selecccionar archivo'}
                </span>
             
              </label>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.draftButton}>
              GUARDAR BORRADOR
            </button>
            <button type="submit" className={styles.publishButton}>
              PUBLICAR EVENTO
            </button>
          </div>
        </section>
      </div>


      </form>
    </div>
  );
};

export default CreateEvent;
