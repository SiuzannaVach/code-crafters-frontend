import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es';
import { Wifi, MapPin, UploadCloud } from 'lucide-react';

// Импорт бизнес-логики (Кастомный хук)
import { useCreateEvent } from '../../hooks/useCreateEvent/useCreateEvent';

// Импорт элементов формы (Кирпичики)
import { 
  CreateEventFormGroup, 
  CreateEventInputField, 
  CreateEventModalityButton 
} from '../../components/CreateEvent/CreateEventForm';

// Импорт кнопок управления (Кирпичики)
import { 
  CreateEventDraftButton, 
  CreateEventPublishButton 
} from '../../components/CreateEvent/CreateEventButton';

import styles from './CreateEvent.module.scss';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('es', es);

const CreateEvent: React.FC = () => {
  const {
    formData,
    imagePreview,
    handleChange,
    handleDateChange,
    handleModalityChange,
    handleImageChange,
    handleSubmit
  } = useCreateEvent();

  return (
    <div className={styles.createEvent}>
      <header className={styles.header}>
        <h1 className={styles.title}>Crear Evento</h1>
        <p className={styles.subtitle}>Configura los detalles de tu próximo encuentro tecnológico.</p>
      </header>

      <form onSubmit={handleSubmit} className={styles.formCard}>

        {/* ЛЕВАЯ КОЛОНКА (Данные формы) */}
        <div className={styles.leftColumn}>
          
          {/* Секция 1: Основная информация */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Datos básicos</h2>

            <CreateEventInputField
              label="Nombre del Evento"
              id="title"
              name="title"
              type="text"
              placeholder="Ej. Hackathon Global de Next.js"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <CreateEventInputField
              label="Descripción"
              id="description"
              name="description"
              as="textarea"
              placeholder="Describe qué aprenderán los asistentes..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />

            <div className={styles.formRow}>
              <CreateEventInputField
                label="Categoría"
                id="category"
                name="category"
                as="select"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Selecciona una categoría</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="ai">AI &amp; Data Science</option>
              </CreateEventInputField>

              <CreateEventInputField
                label="Capacidad Máxima"
                id="maxCapacity"
                name="maxCapacity"
                type="number"
                placeholder="Ej. 150"
                value={formData.maxCapacity}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          {/* Секция 2: Время и место проведения */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Fecha y ubicación</h2>
             
            <div className={styles.formRow}>
              <CreateEventFormGroup label="Fecha" id="date">
                <DatePicker
                  id="date"
                  selected={formData.date}
                  onChange={handleDateChange}
                  locale="es"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Seleccionar fecha"
                  className={styles.input}
                  required
                />
              </CreateEventFormGroup>

              <CreateEventInputField
                label="Hora (Local)"
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Modalidad del evento</label>
              <div className={styles.modalityGroup}>
                <CreateEventModalityButton 
                  active={formData.isOnline} 
                  onClick={() => handleModalityChange(true)}
                  icon={<Wifi size={20} />}
                  text="Online / Virtual"
                />
                <CreateEventModalityButton 
                  active={!formData.isOnline} 
                  onClick={() => handleModalityChange(false)}
                  icon={<MapPin size={20} />}
                  text="Presencial"
                />
              </div>
            </div>

            <CreateEventInputField
              label={formData.isOnline ? "Enlace de la reunión" : "Dirección"}
              id="linkOrAddress"
              name="linkOrAddress"
              type="text"
              placeholder={formData.isOnline ? "https://zoom.us..." : "Ej. 123 Tech St."}
              value={formData.linkOrAddress}
              onChange={handleChange}
              required
            />
          </section>
        </div>

        {/* ПРАВАЯ КОЛОНКА (Загрузка изображения и действия) */}
        <div className={styles.rightColumn}>
          <section className={`${styles.section} ${styles.bannerSection}`}>
            
            <CreateEventFormGroup label="Imagen de evento" id="bannerUpload">
              <div className={styles.uploadBox}>
                <input
                  id="bannerUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.uploadInput}
                />
                <label htmlFor="bannerUpload" className={styles.uploadLabel}>
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px', objectFit: 'cover' }} 
                    />
                  ) : (
                    <UploadCloud size={28} />
                  )}
                  <span className={styles.uploadText}>
                    {formData.image ? formData.image.name : 'Seleccionar archivo'}
                  </span>
                </label>
              </div>
            </CreateEventFormGroup>

            <div className={styles.actions}>
              <CreateEventDraftButton onClick={() => console.log('Borrador guardado:', formData)}>
                GUARDAR BORRADOR
              </CreateEventDraftButton>
              <CreateEventPublishButton>
                PUBLICAR EVENTO
              </CreateEventPublishButton>
            </div>

          </section>
        </div>

      </form>
    </div>
  );
};

export default CreateEvent;
