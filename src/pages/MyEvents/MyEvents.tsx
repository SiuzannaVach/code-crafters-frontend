import { useMyEvents } from "../../hooks/useMyEvents/useMyEvents";
import styles from "./MyEvents.module.scss";

const MyEvents = () => {
  const {
    inscribedEvents,
    isLoading,
    error,
    isGuest,
    cancelEnrollment,
    openEventDetails,
    goToLogin,
  } = useMyEvents();

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Mis Eventos</h1>

      <section className={styles.list}>
        {isGuest ? (
          <div className={styles.guestPlaceholder}>
            <h2>Inicia sesión para ver tus eventos</h2>
            <p>
              Para ver tus eventos inscritos y gestionarlos, inicia sesión.
            </p>
            <button
              type="button"
              className={styles.loginButton}
              onClick={goToLogin}
            >
              Iniciar Sesión
            </button>
          </div>
        ) : isLoading ? (
          <p>Cargando tus eventos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : inscribedEvents.length > 0 ? (
          inscribedEvents.map((evento) => (
            <article
              key={evento.id}
              className={`baseCard ${styles.card}`}
              onClick={() => openEventDetails(evento)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={evento.imagen}
                  alt={evento.titulo}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h2>{evento.titulo}</h2>
                <p className={styles.meta}>
                  {evento.fecha} · {evento.ubicacion}
                </p>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.detailsButton}
                    onClick={(event) => {
                      event.stopPropagation();
                      openEventDetails(evento);
                    }}
                  >
                    Ver Detalle
                  </button>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={(event) => {
                      event.stopPropagation();
                      cancelEnrollment(evento);
                    }}
                  >
                    Cancelar inscripción
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p>No tienes inscripciones activas en este momento.</p>
        )}
      </section>
    </main>
  );
};

export default MyEvents;
